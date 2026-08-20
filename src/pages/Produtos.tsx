import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionDivider } from '@/components/BrandDecor'
import companiesData from '@/data/companies/pt-BR.json'

export default function Produtos() {
  const { t } = useTranslation()

  const allProducts = companiesData.companies.flatMap((company) =>
    (company.products ?? []).map((product) => ({
      ...product,
      companyName: company.name,
      companyId: company.id,
    })),
  )

  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <p className="micro-label mb-3">{t('nav.produtos')}</p>
          <h1 className="text-2xl font-bold">{t('produtos.title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t('produtos.subtitle')}</p>
          <SectionDivider className="mx-auto mt-5" />
        </div>

        {allProducts.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">{t('produtos.empty')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pb-8">
            {allProducts.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col hud-corners hover:glow-red hover:border-brand-red/60 transition-all"
              >
                <div className="h-40 bg-white/95 rounded-t-lg overflow-hidden border-b border-brand-gray-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
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
