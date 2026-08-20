import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { RibbonGallery, type GalleryItem } from '@/components/RibbonGallery'
import { SectionDivider } from '@/components/BrandDecor'
import companiesData from '@/data/companies/pt-BR.json'
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react'

export default function Company() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const company = companiesData.companies.find((c) => c.id === id)

  if (!company) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-xl text-muted-foreground">Empresa não encontrada</p>
        <Button onClick={() => navigate('/marcas')}>{t('company.back')}</Button>
      </div>
    )
  }

  const catalog = 'catalog' in company ? company.catalog : undefined
  const site = 'site' in company ? company.site : undefined

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center gap-4 px-6 py-4 border-b border-dashed border-brand-gray-4 flex-shrink-0">
        <Button variant="ghost" size="lg" onClick={() => navigate('/marcas')}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('company.back')}
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white border border-brand-gray-5 flex-shrink-0 p-2">
              <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <SectionDivider className="mt-3" />
            </div>
          </div>

          {company.tagline && (
            <p className="text-lg font-medium text-muted-foreground mb-8 -mt-4">{company.tagline}</p>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            {company.description.split('\n').map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>

          {catalog && (
            <div className="mb-8">
              <Button size="lg" className="animate-cta-pulse motion-reduce:animate-none" onClick={() => navigate(`/marcas/${company.id}/catalogo`)}>
                <BookOpen className="w-5 h-5 mr-2" />
                {t('company.viewCatalog')}
              </Button>
            </div>
          )}

          {site && (
            <div className="mb-8">
              <a href={site} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {t('company.visitSite')}
                </Button>
              </a>
            </div>
          )}

          {company.products && company.products.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 flex items-center gap-3 text-xl font-bold">
                <span aria-hidden className="h-2.5 w-2.5 flex-shrink-0 bg-brand-red" />
                {t('company.products')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {company.products.map((product) => (
                  <Card key={product.id} className="hud-corners hover:glow-red hover:border-brand-red/60 transition-all">
                    <CardContent className="pt-6">
                      <CardTitle className="text-base mb-1">{product.name}</CardTitle>
                      <CardDescription className="text-sm">{product.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {company.gallery && company.gallery.length > 0 && (
            <RibbonGallery items={company.gallery as GalleryItem[]} />
          )}
        </div>
      </div>
    </div>
  )
}
