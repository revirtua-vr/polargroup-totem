import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { PdfViewer } from '@/components/PdfViewer'
import companiesData from '@/data/companies/pt-BR.json'
import { ArrowLeft } from 'lucide-react'

export default function Catalogo() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const company = companiesData.companies.find((c) => c.id === id)

  if (!company) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-xl text-muted-foreground">Catálogo não encontrado</p>
        <Button onClick={() => navigate('/marcas')}>{t('company.back')}</Button>
      </div>
    )
  }

  const catalog = 'catalog' in company ? company.catalog : undefined

  if (!catalog) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-xl text-muted-foreground">Catálogo não encontrado</p>
        <Button onClick={() => navigate('/marcas')}>{t('company.back')}</Button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center gap-4 px-6 py-3 border-b border-dashed border-brand-gray-4 flex-shrink-0">
        <Button variant="ghost" size="lg" onClick={() => navigate(`/marcas/${company.id}`)}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('company.back')}
        </Button>
        <span aria-hidden className="h-2.5 w-2.5 flex-shrink-0 bg-brand-red" />
        <h1 className="text-xl font-semibold">{catalog.title}</h1>
      </header>

      <PdfViewer file={catalog.file} indexPage={catalog.indexPage} className="min-h-0 flex-1" />
    </div>
  )
}
