import { Routes, Route, useLocation } from 'react-router-dom'
import { useIdleTimer } from '@/hooks/useIdleTimer'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { NavBar } from '@/components/NavBar'
import { PageTransition } from '@/components/PageTransition'
import { BrandBackground } from '@/components/BrandBackground'
import { KioskQrCode } from '@/components/KioskQrCode'
import { OskBridge } from '@/components/OskBridge'
import QuemSomos from '@/pages/QuemSomos'
import Marcas from '@/pages/Marcas'
import Company from '@/pages/Company'
import Catalogo from '@/pages/Catalogo'
import Produtos from '@/pages/Produtos'
import Videos from '@/pages/Videos'
import Contato from '@/pages/Contato'
import Quiz from '@/pages/Quiz'

export default function App() {
  useIdleTimer()
  const location = useLocation()

  return (
    <div className="h-full flex flex-col">
      <BrandBackground />
      <KioskQrCode />
      <OskBridge />
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative">
          <LanguageSwitcher />
          <NavBar />
        </div>
        <div className="flex-1 overflow-hidden">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<QuemSomos />} />
              <Route path="/marcas" element={<Marcas />} />
              <Route path="/marcas/:id" element={<Company />} />
              <Route path="/marcas/:id/catalogo" element={<Catalogo />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </PageTransition>
        </div>
      </div>
    </div>
  )
}
