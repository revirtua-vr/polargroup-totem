import fs from 'fs'
import path from 'path'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

if (!OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY environment variable is required')
  process.exit(1)
}

const dataDir = path.resolve(import.meta.dirname, '../src/data')

async function translateJSON(
  sourcePath: string,
  targetLang: string,
  targetPath: string,
) {
  const source = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'))
  const prompt = `Translate the following JSON content from pt-BR to ${targetLang}. 
Return ONLY valid JSON with the exact same structure and keys. Do not translate keys, only values.
Do not include any explanation, markdown formatting, or code blocks. Output raw JSON only.

Content to translate:
${JSON.stringify(source, null, 2)}`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    }),
  })

  const data = await response.json() as { choices: { message: { content: string } }[] }
  const translated = JSON.parse(data.choices[0].message.content)
  fs.writeFileSync(targetPath, JSON.stringify(translated, null, 2), 'utf-8')
  console.log(`Translated: ${path.basename(targetPath)}`)
}

async function main() {
  const langs = ['en', 'es']

  for (const lang of langs) {
    await translateJSON(
      path.join(dataDir, 'companies', 'pt-BR.json'),
      lang,
      path.join(dataDir, 'companies', `${lang}.json`),
    )
    await translateJSON(
      path.join(dataDir, 'quiz', 'pt-BR.json'),
      lang,
      path.join(dataDir, 'quiz', `${lang}.json`),
    )
  }

  console.log('\nTranslation complete!')
}

main().catch(console.error)
