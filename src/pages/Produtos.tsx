import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionDivider } from '@/components/BrandDecor'
import { ProductImage } from '@/components/ProductImage'
import { BrandLogo } from '@/components/BrandLogo'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Layers } from 'lucide-react'
import companiesData from '@/data/companies/pt-BR.json'

type Category = {
  id: string
  label: string
  subcategories?: Subcategory[]
}

type Subcategory = {
  companyId: string
  label?: string
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

  const resetToCategory = () => {
    setSubIndex(null)
    setOliverGroup(null)
    setOliverSubgroup(null)
  }

  const resetToSubs = () => {
    setOliverGroup(null)
    setOliverSubgroup(null)
  }

  let products: Product[] = []
  let title = category?.label ?? ''
  if (sub && company) {
    if (sub.productIds) {
      products = (company.products ?? []).filter((p) => sub.productIds!.includes(p.id))
    } else if (company.id === 'oliver' && !sub.productIds) {
      if (oliverSubgroup && company.productGroups) {
        const group = company.productGroups.groups.find((g) => g.id === oliverGroup)
        const sg = group?.subgroups.find((s) => s.id === oliverSubgroup)
        if (sg) products = (company.products ?? []).filter((p) => sg.productIds.includes(p.id))
      } else if (oliverGroup) {
        const group = company.productGroups?.groups.find((g) => g.id === oliverGroup)
        if (group) {
          const ids = group.subgroups.flatMap((s) => s.productIds)
          products = (company.products ?? []).filter((p) => ids.includes(p.id))
        }
      }
    } else {
      products = (company.products ?? []).filter((p) => productInCategory(p, company, categoryId!))
    }
    const subLabel = sub.label ?? company.name
    title = oliverSubgroup
      ? `${subLabel} — ${company.productGroups?.groups.find((g) => g.id === oliverGroup)?.label ?? ''} — ${company.productGroups?.groups.find((g) => g.id === oliverGroup)?.subgroups.find((s) => s.id === oliverSubgroup)?.label ?? ''}`
      : oliverGroup
        ? `${subLabel} — ${company.productGroups?.groups.find((g) => g.id === oliverGroup)?.label ?? ''}`
        : subLabel
  }

  const isOliverFlow = Boolean(sub && company?.id === 'oliver' && !sub.productIds)
  const oliverData = isOliverFlow ? company?.productGroups : null

  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-8">
        <div className="text-center mb-6">
          <p className="micro-label mb-3">{t('nav.produtos')}</p>
          <h1 className="text-2xl font-bold">{t('produtos.title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t('produtos.subtitle')}</p>
          <SectionDivider className="mx-auto mt-5" />
        </div>

        {!category && (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-5xl mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors border bg-background text-muted-foreground border-dashed border-brand-gray-4 hover:border-primary/50 hover:text-foreground"
                  onClick={() => setCategoryId(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <p className="text-center text-muted-foreground text-lg">{t('produtos.selectCategory')}</p>
          </>
        )}

        {category && !sub && (
          <>
            <div className="flex items-center justify-between max-w-5xl mx-auto mb-6">
              <Button variant="outline" size="lg" onClick={() => setCategoryId(null)}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('company.back')}
              </Button>
              <p className="text-xl font-semibold">{category.label}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto pb-8">
              {(category.subcategories ?? []).map((sc, i) => {
                const comp = companyById.get(sc.companyId)
                if (!comp) return null
                return (
                  <Card
                    key={`${sc.companyId}-${i}`}
                    className="flex flex-col items-center text-center gap-3 p-5 hud-corners hover:glow-red hover:border-brand-red/60 transition-all cursor-pointer active:scale-[0.99]"
                    onClick={() => setSubIndex(i)}
                  >
                    <BrandLogo src={comp.logo} name={sc.label ?? comp.name} className="w-48 h-20" />
                    <p className="text-lg font-semibold">{sc.label ?? comp.name}</p>
                    {sc.intro && <p className="text-sm text-muted-foreground leading-relaxed">{sc.intro}</p>}
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {category && sub && company && (
          <>
            <div className="flex items-center justify-between max-w-7xl mx-auto mb-6 gap-4">
              <Button variant="outline" size="lg" onClick={resetToCategory}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('company.back')}
              </Button>
              <p className="text-xl font-semibold truncate">{title}</p>
              <div className="w-[140px] flex-shrink-0 hidden sm:block" />
            </div>

            {isOliverFlow && oliverData && !oliverGroup && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
                {oliverData.groups.map((g) => (
                  <Card
                    key={g.id}
                    className="flex items-center justify-center gap-3 p-6 hud-corners hover:glow-red hover:border-brand-red/60 transition-all cursor-pointer active:scale-[0.99]"
                    onClick={() => setOliverGroup(g.id)}
                  >
                    <Layers className="w-8 h-8 text-brand-red" />
                    <p className="text-lg font-semibold">{g.label}</p>
                  </Card>
                ))}
              </div>
            )}

            {isOliverFlow && oliverGroup && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-sm font-medium border border-dashed border-brand-gray-4 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  onClick={resetToSubs}
                >
                  {t('company.back')}
                </button>
                {oliverData?.groups
                  .find((g) => g.id === oliverGroup)
                  ?.subgroups.map((sg) => (
                    <button
                      key={sg.id}
                      type="button"
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                        oliverSubgroup === sg.id
                          ? 'bg-primary text-primary-foreground border-primary glow-red'
                          : 'bg-background text-muted-foreground border-dashed border-brand-gray-4 hover:border-primary/50 hover:text-foreground'
                      }`}
                      onClick={() => setOliverSubgroup(sg.id)}
                    >
                      {sg.label}
                    </button>
                  ))}
              </div>
            )}

            {products.length === 0 && !(isOliverFlow && !oliverGroup) ? (
              <p className="text-center text-muted-foreground text-lg">{t('produtos.empty')}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pb-8">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="flex flex-col hud-corners hover:glow-red hover:border-brand-red/60 transition-all"
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
          </>
        )}
      </div>
    </ScrollArea>
  )
}
