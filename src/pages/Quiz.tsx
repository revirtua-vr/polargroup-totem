import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import quizDataPt from '@/data/quiz/pt-BR.json'
import quizDataEn from '@/data/quiz/en.json'
import quizDataEs from '@/data/quiz/es.json'

const quizByLanguage = {
  en: quizDataEn,
  es: quizDataEs,
  'pt-BR': quizDataPt,
}

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

function QuizResult({ score, total, onRetry }: { score: number; total: number; onRetry: () => void }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const displayedScore = useCountUp(score)

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-6 animate-page-in motion-reduce:animate-none">
      <p className="micro-label">{t('nav.quiz')}</p>
      <h2 className="text-3xl font-bold text-center">{t('quiz.title')}</h2>
      <p className="text-xl text-center">{t('quiz.result', { score: displayedScore, total })}</p>
      <p className="text-2xl font-semibold text-center text-brand-red text-glow">
        {score === total ? t('quiz.prize') : t('quiz.noPrize')}
      </p>
      <div className="flex gap-4">
        <Button size="lg" variant="outline" onClick={() => navigate('/marcas')}>
          {t('quiz.home')}
        </Button>
        <Button size="lg" className="animate-cta-pulse motion-reduce:animate-none" onClick={onRetry}>
          {t('quiz.retry')}
        </Button>
      </div>
    </div>
  )
}

export default function Quiz() {
  const { t, i18n } = useTranslation()

  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)

  const quizData = quizByLanguage[i18n.language as keyof typeof quizByLanguage] ?? quizDataPt
  const questions = quizData.questions
  const total = questions.length
  const question = questions[current]

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (index === question.correct) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setFinished(true)
    }
  }

  const reset = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setAnswered(false)
    setFinished(false)
  }

  if (finished) {
    return <QuizResult score={score} total={total} onRetry={reset} />
  }

  const progress = ((current + (answered ? 1 : 0)) / total) * 100

  return (
    <div className="h-full flex flex-col">
      <header className="text-center pt-12 pb-6 px-4 flex-shrink-0">
        <p className="micro-label mb-3">{t('nav.quiz')}</p>
        <h1 className="text-2xl font-bold">{t('quiz.title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('quiz.question', { current: current + 1, total })}
        </p>
        <div className="h-2 w-full max-w-md mx-auto mt-4 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary glow-red transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <Card key={current} className="mb-6 hud-corners hud-corners-visible animate-page-in motion-reduce:animate-none">
            <CardContent className="pt-6">
              <p className="text-lg font-medium mb-6">{question.text}</p>
              <div className="flex flex-col gap-3">
                {question.options.map((option, i) => {
                  const isCorrect = answered && i === question.correct
                  const isWrongPick = answered && i === selected && i !== question.correct
                  const isRightPick = answered && i === selected && i === question.correct
                  const dimmed = answered && !isCorrect && !isWrongPick
                  return (
                    <Button
                      key={i}
                      size="lg"
                      variant="outline"
                      className={cn(
                        'justify-between h-auto py-4 px-4 text-left whitespace-normal gap-3',
                        isCorrect &&
                          'bg-primary hover:bg-primary text-primary-foreground border-primary glow-red animate-pop-in motion-reduce:animate-none',
                        isWrongPick &&
                          'bg-secondary hover:bg-secondary text-secondary-foreground border-secondary animate-shake motion-reduce:animate-none',
                        dimmed && 'opacity-50',
                      )}
                      onClick={() => handleSelect(i)}
                    >
                      <span className="flex items-start gap-3 min-w-0">
                        <span className="font-mono shrink-0 text-brand-red">{String.fromCharCode(65 + i)}.</span>
                        <span>{option}</span>
                      </span>
                      {answered && (isCorrect || isWrongPick) && (
                        <span
                          className={cn(
                            'shrink-0 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                            isCorrect ? 'bg-white/20' : 'bg-white/10',
                          )}
                        >
                          {isCorrect && <Check className="w-4 h-4" />}
                          {isWrongPick && <X className="w-4 h-4" />}
                          {isCorrect ? t('quiz.correct') : t('quiz.wrong')}
                          {isRightPick && ` · ${t('quiz.yourAnswer')}`}
                        </span>
                      )}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {answered && (
            <div className="flex justify-center animate-page-in motion-reduce:animate-none">
              <Button size="lg" className="animate-cta-pulse motion-reduce:animate-none" onClick={handleNext}>
                {current + 1 < total ? t('quiz.next') : t('quiz.finish')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
