import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { saveQuizLead, type QuizLead } from '@/lib/leadStore'
import quizDataPt from '@/data/quiz/pt-BR.json'
import quizDataEn from '@/data/quiz/en.json'
import quizDataEs from '@/data/quiz/es.json'

const quizByLanguage = {
  en: quizDataEn,
  es: quizDataEs,
  'pt-BR': quizDataPt,
}

const AUTO_ADVANCE_SECONDS = 10

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

const inputClass =
  'w-full rounded-md border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-brand-gray-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 motion-reduce:transition-none'

function LeadForm({ onStart }: { onStart: (data: Omit<QuizLead, 'timestamp'>) => void }) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError(t('quiz.nameRequired'))
      return
    }
    const trimmedEmail = email.trim()
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError(t('quiz.emailInvalid'))
      return
    }
    setError(null)
    onStart({ name: trimmedName, phone: phone.trim(), email: trimmedEmail })
  }

  return (
    <div className="h-full flex flex-col">
      <header className="text-center pt-12 pb-6 px-4 flex-shrink-0">
        <p className="micro-label mb-3">{t('nav.quiz')}</p>
        <h1 className="text-2xl font-bold">{t('quiz.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('quiz.leadSubtitle')}</p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
          <Card className="hud-corners hud-corners-visible animate-page-in motion-reduce:animate-none">
            <CardContent className="pt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-name" className="text-sm font-medium text-brand-gray-1">
                  {t('quiz.name')}
                </label>
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('quiz.namePlaceholder')}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lead-phone" className="text-sm font-medium text-brand-gray-1">
                  {t('quiz.phone')}
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('quiz.phonePlaceholder')}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lead-email" className="text-sm font-medium text-brand-gray-1">
                  {t('quiz.email')}
                </label>
                <input
                  id="lead-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('quiz.emailPlaceholder')}
                  className={inputClass}
                />
              </div>

              {error && <p className="text-sm font-medium text-brand-yellow">{error}</p>}

              <Button type="submit" size="lg" className="animate-cta-pulse motion-reduce:animate-none">
                {t('quiz.start')}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}

function QuizResult({
  score,
  total,
  name,
  onRetry,
}: {
  score: number
  total: number
  name: string
  onRetry: () => void
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const displayedScore = useCountUp(score)

  return (
    <div className="h-full flex flex-col items-center justify-center gap-5 px-6 animate-page-in motion-reduce:animate-none">
      <p className="micro-label">{t('nav.quiz')}</p>
      <h2 className="text-3xl font-bold text-center">{t('quiz.title')}</h2>
      <p className="text-2xl font-semibold text-center text-brand-red text-glow">
        {t('quiz.thanks', { name })}
      </p>
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

  const [stage, setStage] = useState<'form' | 'quiz' | 'result'>('form')
  const [lead, setLead] = useState<QuizLead | null>(null)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const quizData = quizByLanguage[i18n.language as keyof typeof quizByLanguage] ?? quizDataPt
  const questions = quizData.questions
  const total = questions.length
  const question = questions[current]

  const handleStart = (data: Omit<QuizLead, 'timestamp'>) => {
    setLead({ ...data, timestamp: new Date().toISOString() })
    setStage('quiz')
    void saveQuizLead({ ...data, timestamp: new Date().toISOString() }).catch(() => {
      // storage failure must never block the quiz
    })
  }

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (index === question.correct) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = useCallback(() => {
    if (current + 1 < total) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setStage('result')
    }
  }, [current, total])

  const [countdown, setCountdown] = useState(AUTO_ADVANCE_SECONDS)

  useEffect(() => {
    if (stage !== 'quiz' || !answered) {
      setCountdown(AUTO_ADVANCE_SECONDS)
      return
    }
    if (countdown <= 0) {
      handleNext()
      return
    }
    const id = window.setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => window.clearTimeout(id)
  }, [stage, answered, countdown, handleNext])

  const reset = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setAnswered(false)
    setStage('quiz')
  }

  if (stage === 'form') {
    return <LeadForm onStart={handleStart} />
  }

  if (stage === 'result') {
    return <QuizResult score={score} total={total} name={lead?.name ?? ''} onRetry={reset} />
  }

  const progress = ((current + (answered ? 1 : 0)) / total) * 100

  return (
    <div className="h-full flex flex-col">
      <header className="text-center pt-5 pb-3 px-4 flex-shrink-0">
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

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="max-w-2xl mx-auto">
          <Card key={current} className="mb-4 hud-corners hud-corners-visible animate-page-in motion-reduce:animate-none">
            <CardContent className="pt-6">
              <p className="text-lg font-medium mb-4">{question.text}</p>
              <div className="flex flex-col gap-2">
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
                        'justify-between h-auto py-2.5 px-4 text-left whitespace-normal gap-2',
                        isCorrect &&
                          'bg-primary hover:bg-primary text-primary-foreground border-primary glow-red animate-pop-in motion-reduce:animate-none',
                        isWrongPick &&
                          'bg-secondary hover:bg-secondary text-secondary-foreground border-secondary animate-shake motion-reduce:animate-none',
                        dimmed && 'opacity-50',
                      )}
                      onClick={() => handleSelect(i)}
                    >
                      <span className="flex items-start gap-2 min-w-0">
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
            <div className="flex items-center justify-center gap-4 animate-page-in motion-reduce:animate-none">
              <div
                role="timer"
                aria-label={t('quiz.autoAdvance', { seconds: countdown })}
                className={cn(
                  'w-12 h-12 shrink-0 rounded-full border border-dashed border-brand-gray-2 flex items-center justify-center font-mono text-lg',
                  countdown <= 3 ? 'text-brand-red' : 'text-brand-gray-1',
                )}
              >
                {countdown}
              </div>
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
