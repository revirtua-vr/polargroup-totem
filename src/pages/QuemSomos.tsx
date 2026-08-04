import { useTranslation } from 'react-i18next'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function QuemSomos() {
  const { t } = useTranslation()

  return (
    <ScrollArea className="h-full">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">{t('quemSomos.title')}</h1>
        <p className="text-xl text-muted-foreground mb-8">{t('quemSomos.subtitle')}</p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            O Grupo Polar é um dos maiores conglomerados empresariais do Brasil, com atuação em
            mais de 18 setores estratégicos da economia. Fundado há mais de 30 anos, o grupo se
            destaca pela inovação, sustentabilidade e compromisso com o desenvolvimento do país.
          </p>
          <p>
            Com mais de 50 mil colaboradores, nossas empresas estão presentes em todo o território
            nacional e em diversos países da América Latina, Europa e Ásia. Atuamos em setores que
            vão desde engenharia e construção até tecnologia, saúde e educação.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Missão</h2>
          <p>
            Desenvolver soluções inovadoras e sustentáveis que gerem valor para a sociedade,
            conectando pessoas, empresas e comunidades através de produtos e serviços de excelência.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Visão</h2>
          <p>
            Ser referência global em inovação e sustentabilidade empresarial, reconhecida pela
            qualidade, ética e impacto positivo nas comunidades onde atuamos.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Valores</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Excelência em tudo que fazemos</li>
            <li>Inovação como motor de crescimento</li>
            <li>Sustentabilidade em cada decisão</li>
            <li>Ética e transparência nas relações</li>
            <li>Valorização e respeito às pessoas</li>
            <li>Compromisso com resultados</li>
          </ul>
        </div>
      </div>
    </ScrollArea>
  )
}
