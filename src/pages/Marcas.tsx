import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Card, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionDivider } from '@/components/BrandDecor'
import { BrandLogo } from '@/components/BrandLogo'
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
          <p className="micro-label mb-3">{t('nav.marcas')}</p>
          <h1 className="text-2xl font-bold">{t('marcas.title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t('marcas.subtitle')}</p>
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
            {t('marcas.all')}
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto pb-8">
          {filteredCompanies.map((company, i) => (
            <Card
              key={company.id}
              className="cursor-pointer hud-corners hover:glow-red hover:border-brand-red/60 transition-all active:scale-95 p-4 flex flex-col items-center text-center animate-page-in motion-reduce:animate-none"
              style={{ animationDelay: `${i * 30}ms` }}
              onClick={() => navigate(`/marcas/${company.id}`)}
            >
              <BrandLogo
                src={company.logo}
                name={company.name}
                className="w-full h-20 sm:h-24 mb-2"
              />
              <CardTitle className="text-sm sm:text-base line-clamp-2">{company.name}</CardTitle>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
