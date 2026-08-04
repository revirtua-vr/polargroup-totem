import { Routes, Route } from 'react-router-dom'
import { useIdleTimer } from '@/hooks/useIdleTimer'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import Home from '@/pages/Home'
import Company from '@/pages/Company'
import Quiz from '@/pages/Quiz'

export default function App() {
  useIdleTimer()

  return (
    <div className="relative h-full">
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/:id" element={<Company />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  )
}
