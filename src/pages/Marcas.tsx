import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Card, CardTitle } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import companiesData from '@/data/companies/pt-BR.json'

export default function Marcas() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{t('marcas.title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t('marcas.subtitle')}</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 max-w-7xl mx-auto pb-8">
          {companiesData.companies.map((company) => (
            <Card
              key={company.id}
              className="cursor-pointer hover:shadow-md hover:border-primary/50 transition-all active:scale-95 p-3 flex flex-col items-center text-center"
              onClick={() => navigate(`/marcas/${company.id}`)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-muted mb-2 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-xs sm:text-sm line-clamp-2">{company.name}</CardTitle>
            </Card>
          ))}

          <Card
            className="cursor-pointer hover:shadow-md hover:border-primary/50 transition-all active:scale-95 p-3 flex flex-col items-center text-center bg-primary/5"
            onClick={() => navigate('/quiz')}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-2 flex items-center justify-center">
              <HelpCircle className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-xs sm:text-sm line-clamp-2">{t('marcas.quizButton')}</CardTitle>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
}
