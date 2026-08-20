import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Card, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import companiesData from '@/data/companies/pt-BR.json'

export default function Marcas() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = companiesData.categories ?? []
  const filteredCompanies = companiesData.companies.filter(
    (company) => selectedCategory === 'all' || company.categories.includes(selectedCategory)
  )

  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{t('marcas.title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t('marcas.subtitle')}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-5xl mx-auto">
          <button
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            {t('marcas.all')}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 max-w-7xl mx-auto pb-8">
          {filteredCompanies.map((company, i) => (
            <Card
              key={company.id}
              className="cursor-pointer hover:shadow-md hover:border-primary/50 transition-all active:scale-95 p-3 flex flex-col items-center text-center animate-page-in motion-reduce:animate-none"
              style={{ animationDelay: `${i * 30}ms` }}
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
        </div>
      </div>
    </ScrollArea>
  )
}
