import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionDivider } from '@/components/BrandDecor'
import { ProductImage } from '@/components/ProductImage'
import companiesData from '@/data/companies/pt-BR.json'

export default function Produtos() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = companiesData.categories ?? []
  const allProducts = companiesData.companies.flatMap((company) =>
    (company.products ?? []).map((product) => ({
      ...product,
      companyName: company.name,
      companyId: company.id,
      companyCategories: company.categories ?? [],
    })),
  )

  const filteredProducts =
    selectedCategory === 'all'
      ? allProducts
      : allProducts.filter((product) => product.companyCategories.includes(selectedCategory))

  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <p className="micro-label mb-3">{t('nav.produtos')}</p>
          <h1 className="text-2xl font-bold">{t('produtos.title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t('produtos.subtitle')}</p>
          <SectionDivider className="mx-auto mt-5" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-5xl mx-auto">
          <button
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground border-primary glow-red'
                : 'bg-background text-muted-foreground border-dashed border-brand-gray-4 hover:border-primary/50 hover:text-foreground'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            {t('produtos.all')}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary glow-red'
                  : 'bg-background text-muted-foreground border-dashed border-brand-gray-4 hover:border-primary/50 hover:text-foreground'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">{t('produtos.empty')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pb-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col hud-corners hover:glow-red hover:border-brand-red/60 transition-all"
              >
                <ProductImage src={product.image} alt={product.name} className="rounded-t-lg" />
                <CardContent className="pt-4 flex-1">
                  <CardTitle className="text-base mb-1">{product.name}</CardTitle>
                  <CardDescription className="text-xs mb-2 text-brand-red">{product.companyName}</CardDescription>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
