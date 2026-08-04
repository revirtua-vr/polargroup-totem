import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Card, CardTitle } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'
import companiesData from '@/data/companies/pt-BR.json'

export default function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col">
      <header className="text-center pt-16 pb-6 px-4 flex-shrink-0">
        <h1 className="text-2xl font-bold">{t('home.title')}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{t('home.subtitle')}</p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 max-w-7xl mx-auto">
          {companiesData.companies.map((company) => (
            <Card
              key={company.id}
              className="cursor-pointer hover:shadow-md hover:border-primary/50 transition-all active:scale-95 p-3 flex flex-col items-center text-center"
              onClick={() => navigate(`/company/${company.id}`)}
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
            <CardTitle className="text-xs sm:text-sm line-clamp-2">{t('home.quizButton')}</CardTitle>
          </Card>
        </div>
      </div>
    </div>
  )
}
