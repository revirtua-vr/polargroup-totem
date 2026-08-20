import fs from 'fs'
import path from 'path'

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY

if (!DEEPSEEK_API_KEY) {
  console.error('DEEPSEEK_API_KEY environment variable is required')
  process.exit(1)
}

const dataDir = path.resolve(import.meta.dirname, '../src/data')
const API_URL = 'https://api.deepseek.com/chat/completions'
const PRODUCT_CHUNK_SIZE = 8

async function callDeepSeek(prompt: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 8192,
    }),
  })

  const data = await response.json() as {
    choices?: { message: { content: string } }[]
    error?: { message: string }
  }

  if (data.error) {
    throw new Error(`DeepSeek API error: ${data.error.message}`)
  }

  if (!data.choices || data.choices.length === 0) {
    throw new Error('DeepSeek API returned no choices')
  }

  return data.choices[0].message.content.replace(/```json|```/g, '').trim()
}

async function translateValue(value: unknown, lang: string): Promise<unknown> {
  const prompt = `Translate the following JSON content from pt-BR to ${lang}. 
Return ONLY valid JSON with the exact same structure and keys. Do not translate keys, only values.
Do not include any explanation, markdown formatting, or code blocks. Output raw JSON only.
Make sure your response is COMPLETE and ends with the closing brace of the JSON.

Content to translate:
${JSON.stringify(value, null, 2)}`

  let lastError: unknown
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const raw = await callDeepSeek(prompt)
      return JSON.parse(raw)
    } catch (error) {
      lastError = error
      console.warn(`  parse attempt ${attempt} failed, retrying...`)
    }
  }
  throw lastError
}

async function translateCompany(
  company: { id: string; products?: unknown[] },
  lang: string,
): Promise<unknown> {
  const { products, ...rest } = company as { products?: unknown[] } & Record<string, unknown>
  const base = await translateValue(rest, lang) as Record<string, unknown>

  if (!products || products.length === 0) {
    return base
  }

  const translatedProducts: unknown[] = []
  for (let i = 0; i < products.length; i += PRODUCT_CHUNK_SIZE) {
    const chunk = products.slice(i, i + PRODUCT_CHUNK_SIZE)
    console.log(`  products ${i + 1}-${Math.min(i + PRODUCT_CHUNK_SIZE, products.length)} of ${products.length} ...`)
    translatedProducts.push(...(await translateValue(chunk, lang) as unknown[]))
  }

  return { ...base, products: translatedProducts }
}

async function main() {
  const args = process.argv.slice(2)
  const onlyCompanies = args.includes('--companies-only')
  const langs = args.filter((a) => !a.startsWith('--'))
  const targets = langs.length > 0 ? langs : ['en', 'es']

  for (const lang of targets) {
    const source = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'companies', 'pt-BR.json'), 'utf-8'),
    ) as { categories: unknown; companies: { id: string; products?: unknown[] }[] }

    const translatedCategories = await translateValue(source.categories, lang)

    const translatedCompanies: unknown[] = []
    for (const company of source.companies) {
      console.log(`[${lang}] translating company: ${company.id} ...`)
      translatedCompanies.push(await translateCompany(company, lang))
    }

    fs.writeFileSync(
      path.join(dataDir, 'companies', `${lang}.json`),
      JSON.stringify({ categories: translatedCategories, companies: translatedCompanies }, null, 2),
      'utf-8',
    )
    console.log(`Translated: companies/${lang}.json`)

    if (!onlyCompanies) {
      const quiz = JSON.parse(fs.readFileSync(path.join(dataDir, 'quiz', 'pt-BR.json'), 'utf-8'))
      const translatedQuiz = await translateValue(quiz, lang)
      fs.writeFileSync(path.join(dataDir, 'quiz', `${lang}.json`), JSON.stringify(translatedQuiz, null, 2), 'utf-8')
      console.log(`Translated: quiz/${lang}.json`)
    }
  }

  console.log('\nTranslation complete!')
}

main().catch(console.error)
