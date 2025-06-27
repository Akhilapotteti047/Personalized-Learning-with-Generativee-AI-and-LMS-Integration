import { create } from 'zustand'

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subject: string
}

export interface QuizResult {
  id: string
  userId: string
  subject: string
  score: number
  totalQuestions: number
  timeSpent: number
  completedAt: Date
  questions: Question[]
  userAnswers: number[]
}

interface QuizState {
  currentQuiz: Question[] | null
  currentQuestionIndex: number
  userAnswers: number[]
  quizResults: QuizResult[]
  isLoading: boolean
  startQuiz: (questions: Question[]) => void
  answerQuestion: (answerIndex: number) => void
  nextQuestion: () => void
  finishQuiz: (result: QuizResult) => void
  resetQuiz: () => void
  setLoading: (loading: boolean) => void
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuiz: null,
  currentQuestionIndex: 0,
  userAnswers: [],
  quizResults: [],
  isLoading: false,
  
  startQuiz: (questions) => set({
    currentQuiz: questions,
    currentQuestionIndex: 0,
    userAnswers: [],
  }),
  
  answerQuestion: (answerIndex) => {
    const { userAnswers, currentQuestionIndex } = get()
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    set({ userAnswers: newAnswers })
  },
  
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1
  })),
  
  finishQuiz: (result) => set((state) => ({
    quizResults: [...state.quizResults, result],
    currentQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: [],
  })),
  
  resetQuiz: () => set({
    currentQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: [],
  }),
  
  setLoading: (loading) => set({ isLoading: loading }),
}))