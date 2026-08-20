import { useState } from 'react'
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

export default function Quiz() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

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

  if (finished) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-8 px-6">
        <h2 className="text-3xl font-bold text-center">{t('quiz.title')}</h2>
        <p className="text-xl text-center">
          {t('quiz.result', { score, total })}
        </p>
        <p className="text-2xl font-semibold text-center">
          {score === total ? t('quiz.prize') : t('quiz.noPrize')}
        </p>
        <div className="flex gap-4">
          <Button size="lg" variant="outline" onClick={() => navigate('/marcas')}>
            {t('quiz.home')}
          </Button>
          <Button
            size="lg"
            onClick={() => {
              setCurrent(0)
              setScore(0)
              setSelected(null)
              setAnswered(false)
              setFinished(false)
            }}
          >
            {t('quiz.retry')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <header className="text-center pt-12 pb-6 px-4 flex-shrink-0">
        <h1 className="text-2xl font-bold">{t('quiz.title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('quiz.question', { current: current + 1, total })}
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
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
                        isCorrect && 'bg-emerald-600 hover:bg-emerald-600 text-white border-emerald-600',
                        isWrongPick && 'bg-red-500 hover:bg-red-500 text-white border-red-500',
                        dimmed && 'opacity-50',
                      )}
                      onClick={() => handleSelect(i)}
                    >
                      <span className="flex items-start gap-3 min-w-0">
                        <span className="font-mono shrink-0">{String.fromCharCode(65 + i)}.</span>
                        <span>{option}</span>
                      </span>
                      {answered && (isCorrect || isWrongPick) && (
                        <span
                          className={cn(
                            'shrink-0 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                            isCorrect ? 'bg-white/20' : 'bg-black/10',
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
            <div className="flex justify-center">
              <Button size="lg" onClick={handleNext}>
                {current + 1 < total ? t('quiz.next') : t('quiz.finish')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
