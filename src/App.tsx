import { Routes, Route } from 'react-router-dom'
import { useIdleTimer } from '@/hooks/useIdleTimer'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { NavBar } from '@/components/NavBar'
import QuemSomos from '@/pages/QuemSomos'
import Marcas from '@/pages/Marcas'
import Company from '@/pages/Company'
import Produtos from '@/pages/Produtos'
import Videos from '@/pages/Videos'
import Contato from '@/pages/Contato'
import Quiz from '@/pages/Quiz'

export default function App() {
  useIdleTimer()

  return (
    <div className="h-full flex flex-col">
      <div className="relative">
        <LanguageSwitcher />
        <NavBar />
      </div>
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<QuemSomos />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/marcas/:id" element={<Company />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </div>
  )
}
