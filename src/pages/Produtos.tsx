import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
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
          <h1 className="text-2xl font-bold">{t('produtos.title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t('produtos.subtitle')}</p>
        </div>

        {allProducts.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">{t('produtos.empty')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pb-8">
            {allProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <div className="h-40 bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4 flex-1">
                  <CardTitle className="text-base mb-1">{product.name}</CardTitle>
                  <CardDescription className="text-xs mb-2">{product.companyName}</CardDescription>
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
