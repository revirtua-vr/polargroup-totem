import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionDivider } from '@/components/BrandDecor'
import { ProductImage } from '@/components/ProductImage'
import { BrandLogo } from '@/components/BrandLogo'
import { BrandCard } from '@/components/BrandCard'
import { cn } from '@/lib/utils'
import companiesData from '@/data/companies/pt-BR.json'

type Category = {
  id: string
  label: string
  subcategories?: Subcategory[]
}

type Subcategory = {
  companyId: string
  label?: string
  logo?: string
  intro?: string
  productIds?: string[]
}

type Company = {
  id: string
  name: string
  logo: string
  categories?: string[]
  products?: Product[]
  productGroups?: {
    groups: { id: string; label: string; subgroups: { id: string; label: string; productIds: string[] }[] }[]
  }
}

type Product = {
  id: string
  name: string
  description: string
  image?: string | null
  badge?: string
  categories?: string[]
}

const categories = (companiesData.categories ?? []) as Category[]
const companies = companiesData.companies as unknown as Company[]
const companyById = new Map(companies.map((c) => [c.id, c]))

function productInCategory(product: Product, company: Company, categoryId: string): boolean {
  const cats = product.categories ?? company.categories ?? []
  return cats.includes(categoryId)
}

export default function Produtos() {
  const { t } = useTranslation()
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [subIndex, setSubIndex] = useState<number | null>(null)
  const [oliverGroup, setOliverGroup] = useState<string | null>(null)
  const [oliverSubgroup, setOliverSubgroup] = useState<string | null>(null)

  const category = categories.find((c) => c.id === categoryId) ?? null
  const sub = category && subIndex !== null ? (category.subcategories ?? [])[subIndex] : null
  const company = sub ? companyById.get(sub.companyId) : undefined
  const isOliverFlow = Boolean(sub && company?.id === 'oliver' && !sub.productIds)
  const oliverData = isOliverFlow ? company?.productGroups ?? null : null

  const pickCategory = (id: string) => {
    setCategoryId(id)
    setSubIndex(null)
    setOliverGroup(null)
    setOliverSubgroup(null)
  }

  const pickSub = (index: number) => {
    setSubIndex(index)
    const sc = category?.subcategories?.[index]
    const comp = sc ? companyById.get(sc.companyId) : undefined
    if (comp?.id === 'oliver' && !sc?.productIds) {
      setOliverGroup('instrumentacao')
      setOliverSubgroup('valvulas-esfera')
    } else {
      setOliverGroup(null)
      setOliverSubgroup(null)
    }
  }

  const pickOliverGroup = (groupId: string) => {
    setOliverGroup(groupId)
    const first = oliverData?.groups.find((g) => g.id === groupId)?.subgroups[0]
    setOliverSubgroup(first?.id ?? null)
  }

  let products: Product[] = []
  if (sub && company) {
    if (sub.productIds) {
      products = (company.products ?? []).filter((p) => sub.productIds!.includes(p.id))
    } else if (isOliverFlow && oliverData) {
      const group = oliverData.groups.find((g) => g.id === oliverGroup)
      if (group) {
        if (oliverSubgroup) {
          const sg = group.subgroups.find((s) => s.id === oliverSubgroup)
          if (sg) products = (company.products ?? []).filter((p) => sg.productIds.includes(p.id))
        } else {
          const ids = group.subgroups.flatMap((s) => s.productIds)
          products = (company.products ?? []).filter((p) => ids.includes(p.id))
        }
      }
    } else {
      products = (company.products ?? []).filter((p) => productInCategory(p, company, categoryId!))
    }
  }

  const contentKey = `${categoryId ?? 'none'}-${subIndex ?? 'none'}-${oliverGroup ?? 'none'}-${oliverSubgroup ?? 'none'}`
  const activeGroup = oliverData?.groups.find((g) => g.id === oliverGroup)

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 max-w-[1800px] mx-auto w-full px-8 pt-6">
        <div className="text-left shrink-0">
          <p className="micro-label mb-1">{t('nav.produtos')}</p>
          <h1 className="text-2xl font-bold">{t('produtos.title')}</h1>
          <p className="text-muted-foreground mt-1 text-base">{t('produtos.subtitle')}</p>
        </div>

        <div className="flex flex-wrap gap-2 flex-1 min-w-[420px]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                cat.id === categoryId
                  ? 'bg-primary text-primary-foreground border-primary glow-red'
                  : 'bg-background text-muted-foreground border-dashed border-brand-gray-4 hover:border-primary/50 hover:text-foreground',
              )}
              onClick={() => pickCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <SectionDivider className="mx-auto mt-2 mb-4" />

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 px-8 pb-6 max-w-[1800px] mx-auto w-full">
        {!category && (
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <p className="text-center text-muted-foreground text-lg animate-page-in motion-reduce:animate-none">
              {t('produtos.selectCategory')}
            </p>
          </div>
        )}

        {category && (
          <>
            <aside className="w-full lg:w-[340px] flex-shrink-0 lg:min-h-0">
              <ScrollArea className="h-full">
                <div
                  key={category.id}
                  className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 lg:pr-2 lg:min-h-full lg:justify-center"
                >
                  <p className="micro-label mb-1 flex-shrink-0">{category.label}</p>
                  {(category.subcategories ?? []).map((sc, i) => {
                    const comp = companyById.get(sc.companyId)
                    if (!comp) return null
                    return (
                      <BrandCard
                        key={`${sc.companyId}-${i}`}
                        logo={sc.logo ?? comp.logo}
                        name={sc.label ?? comp.name}
                        active={subIndex === i}
                        className="flex-shrink-0 w-64 lg:w-auto"
                        delay={i * 30}
                        onClick={() => pickSub(i)}
                      />
                    )
                  })}
                </div>
              </ScrollArea>
            </aside>

            <main className="flex-1 min-w-0 min-h-0">
              <ScrollArea className="h-full">
                <div key={contentKey} className="animate-page-in motion-reduce:animate-none pb-4 pr-2">
                  {!sub && (
                    <div className="min-h-[40vh] flex items-center justify-center">
                      <p className="text-center text-muted-foreground text-lg">{t('produtos.selectBrand')}</p>
                    </div>
                  )}

              {sub && company && isOliverFlow && oliverData && (
                <div className="flex flex-col gap-3 mb-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {oliverData.groups.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        className={cn(
                          'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                          g.id === oliverGroup
                            ? 'bg-primary text-primary-foreground border-primary glow-red'
                            : 'bg-background text-muted-foreground border-dashed border-brand-gray-4 hover:border-primary/50 hover:text-foreground',
                        )}
                        onClick={() => pickOliverGroup(g.id)}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                  {activeGroup && (
                    <div className="flex flex-wrap gap-2">
                      {activeGroup.subgroups.map((sg) => (
                        <button
                          key={sg.id}
                          type="button"
                          className={cn(
                            'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                            sg.id === oliverSubgroup
                              ? 'bg-brand-red/15 text-foreground border-brand-red/70'
                              : 'bg-background text-muted-foreground border-dashed border-brand-gray-4 hover:border-primary/50 hover:text-foreground',
                          )}
                          onClick={() => setOliverSubgroup(sg.id)}
                        >
                          {sg.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {sub && company && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
                  {products.map((product, i) => (
                    <Card
                      key={product.id}
                      className="flex flex-col hud-corners hover:glow-red hover:border-brand-red/60 transition-all animate-page-in motion-reduce:animate-none"
                      style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                    >
                      <div className="relative">
                        <ProductImage src={product.image} alt={product.name} className="rounded-t-lg" />
                        {product.badge && (
                          <span className="absolute top-2 left-2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground glow-red">
                            {product.badge}
                          </span>
                        )}
                        <div className="absolute top-2 right-2" title={company.name}>
                          <BrandLogo
                            src={company.logo}
                            name={company.name}
                            className="w-12 h-12 rounded-full p-1 shadow-md ring-1 ring-brand-gray-4"
                          />
                        </div>
                      </div>
                      <CardContent className="pt-4 flex-1">
                        <CardTitle className="text-base mb-1">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{product.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {sub && company && products.length === 0 && (
                <div className="min-h-[40vh] flex items-center justify-center">
                  <p className="text-center text-muted-foreground text-lg">{t('produtos.empty')}</p>
                </div>
              )}
                </div>
              </ScrollArea>
            </main>
          </>
        )}
      </div>
    </div>
  )
}
