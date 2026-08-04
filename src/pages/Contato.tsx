import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'

export default function Contato() {
  const { t } = useTranslation()

  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{t('contato.title')}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t('contato.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto pb-8">
          <Card>
            <CardContent className="pt-6 flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <CardTitle className="text-base mb-1">Endereço</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Av. Paulista, 1000 - 20º andar<br />
                  Bela Vista, São Paulo - SP<br />
                  CEP: 01310-100
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-start gap-4">
              <Phone className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <CardTitle className="text-base mb-1">Telefone</CardTitle>
                <p className="text-sm text-muted-foreground">
                  +55 (11) 3000-0000<br />
                  +55 (11) 3000-0001
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <CardTitle className="text-base mb-1">E-mail</CardTitle>
                <p className="text-sm text-muted-foreground">
                  contato@grupolar.com.br<br />
                  imprensa@grupolar.com.br
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-start gap-4">
              <Globe className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <CardTitle className="text-base mb-1">Redes Sociais</CardTitle>
                <p className="text-sm text-muted-foreground">
                  @grupo_polar<br />
                  /grupopolaroficial
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
}
