import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SectionDivider } from '@/components/BrandDecor'
import { MapPin, Building2, Globe, Phone, Mail, MessageCircle, Users } from 'lucide-react'

function InfoChip({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Card className="hud-corners hud-corners-visible">
      <CardContent className="pt-5 flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-full bg-primary/10 ring-1 ring-primary/40 flex items-center justify-center">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-base font-bold mb-1.5">{title}</p>
          <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{children}</div>
        </div>
      </CardContent>
    </Card>
  )
}

const representatives = [
  {
    region: 'repsSp',
    body: 'Soul Consultoria de Negócios\nMarcio Santos | José Eduardo Obelar\nCel: +55 (11) 98145-5471 | +55 (11) 98145-4306\nE-mail: soul@soulconsultoria.com.br | soul_vendas@soulconsultoria.com.br',
  },
  {
    region: 'repsRs',
    body: 'Mix Energia\nClairton Gadonski\nTel: +55 (51) 3572-0272\nCel: +55 (51) 99392-8509 | +55 (51) 99697-2859\nE-mail: mixenergia@mixenergia.com.br | clairton@mixenergia.com.br',
  },
  {
    region: 'repsMg',
    body: 'Íon Representações Comerciais\nIrineu de Oliveira Neto\nCel: +55 (31) 99414-1450\nE-mail: irineuneto@ionrepresentacoes.com.br',
  },
  {
    region: 'repsBaSe',
    body: 'Intermatech Controle e Automação – Mario Cesar\nCel: +55 (71) 98282-3333 | +55 (71) 98231-8254\nE-mail: mario.cesar@intermatech.com.br | vendas@intermatech.com.br',
  },
]

export default function Contato() {
  const { t } = useTranslation()

  return (
    <ScrollArea className="h-full">
      <div className="min-h-full flex flex-col justify-center px-6 py-8">
        <div className="text-center mb-8">
          <p className="micro-label mb-3">{t('nav.contato')}</p>
          <img src="images/logo-polar-branco.png" alt="Polar Group" className="h-16 mx-auto" />
          <p className="text-muted-foreground mt-2 text-xl">{t('contato.subtitle')}</p>
          <SectionDivider className="mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto w-full items-center">
          <div className="lg:col-span-2 flex justify-center">
            <div className="hud-corners hud-corners-visible rounded-lg overflow-hidden">
              <img
                src="images/contato/loja.jpg"
                alt={t('contato.photoAlt')}
                className="w-auto max-h-[62vh] object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoChip icon={<MapPin className="w-6 h-6 text-brand-red" />} title={t('contato.matrizTitle')}>
              {t('contato.matrizAddress')}
            </InfoChip>

            <InfoChip icon={<Building2 className="w-6 h-6 text-brand-red" />} title={t('contato.cariacicaTitle')}>
              {t('contato.cariacicaAddress')}
            </InfoChip>

            <InfoChip icon={<Building2 className="w-6 h-6 text-brand-red" />} title={t('contato.votorantimTitle')}>
              {t('contato.votorantimAddress')}
            </InfoChip>

            <InfoChip icon={<Globe className="w-6 h-6 text-brand-red" />} title={t('contato.ukTitle')}>
              {t('contato.ukAddress')}
            </InfoChip>

            <InfoChip icon={<Phone className="w-6 h-6 text-brand-red" />} title={t('contato.phoneTitle')}>
              {t('contato.phone')}
            </InfoChip>

            <InfoChip icon={<Mail className="w-6 h-6 text-brand-red" />} title={t('contato.emailTitle')}>
              {t('contato.email')}
            </InfoChip>

            <InfoChip icon={<MessageCircle className="w-6 h-6 text-brand-red" />} title={t('contato.webTitle')}>
              {t('contato.web')}
            </InfoChip>
          </div>
        </div>

        <div className="mt-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-center gap-4 mb-6">
            <SectionDivider className="w-24" />
            <p className="micro-label whitespace-nowrap">{t('contato.repsTitle')}</p>
            <SectionDivider className="w-24" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {representatives.map((rep) => (
              <InfoChip key={rep.region} icon={<Users className="w-6 h-6 text-brand-red" />} title={t(`contato.${rep.region}`)}>
                {rep.body}
              </InfoChip>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
