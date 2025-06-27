import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, XCircle, Brain, ArrowRight, RotateCcw } from 'lucide-react'
import { useQuizStore, Question } from '../store/quizStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const QuizPage = () => {
  const { subject } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { 
    currentQuiz, 
    currentQuestionIndex, 
    userAnswers, 
    startQuiz, 
    answerQuestion, 
    nextQuestion, 
    finishQuiz, 
    resetQuiz,
    setLoading,
    isLoading 
  } = useQuizStore()

  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  // Mock quiz data
  const mockQuestions: Question[] = [
    {
      id: '1',
      question: 'What is the derivative of x²?',
      options: ['2x', 'x²', '2', 'x'],
      correctAnswer: 0,
      explanation: 'The derivative of x² is 2x using the power rule.',
      difficulty: 'medium',
      topic: 'Calculus',
      subject: 'Mathematics'
    },
    {
      id: '2',
      question: 'Which of the following is a prime number?',
      options: ['15', '21', '17', '25'],
      correctAnswer: 2,
      explanation: '17 is a prime number as it is only divisible by 1 and itself.',
      difficulty: 'easy',
      topic: 'Number Theory',
      subject: 'Mathematics'
    },
    {
      id: '3',
      question: 'What is the quadratic formula?',
      options: [
        'x = (-b ± √(b²-4ac)) / 2a',
        'x = (-b ± √(b²+4ac)) / 2a',
        'x = (b ± √(b²-4ac)) / 2a',
        'x = (-b ± √(b²-4ac)) / a'
      ],
      correctAnswer: 0,
      explanation: 'The quadratic formula is x = (-b ± √(b²-4ac)) / 2a',
      difficulty: 'medium',
      topic: 'Algebra',
      subject: 'Mathematics'
    }
  ]

  useEffect(() => {
    if (!quizStarted && !currentQuiz) {
      setLoading(true)
      // Simulate loading quiz questions
      setTimeout(() => {
        startQuiz(mockQuestions)
        setLoading(false)
        setQuizStarted(true)
      }, 1500)
    }
  }, [quizStarted, currentQuiz, startQuiz, setLoading])

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResults) {
      handleFinishQuiz()
    }
  }, [timeLeft, quizStarted, showResults])

  const handleAnswerSelect = (answerIndex: number) => {
    answerQuestion(answerIndex)
  }

  const handleNextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.length - 1) {
      nextQuestion()
    } else {
      handleFinishQuiz()
    }
  }

  const handleFinishQuiz = () => {
    if (!currentQuiz || !user) return

    const score = userAnswers.reduce((acc, answer, index) => {
      return acc + (answer === currentQuiz[index].correctAnswer ? 1 : 0)
    }, 0)

    const result = {
      id: Date.now().toString(),
      userId: user.id,
      subject: subject || 'General',
      score: Math.round((score / currentQuiz.length) * 100),
      totalQuestions: currentQuiz.length,
      timeSpent: 300 - timeLeft,
      completedAt: new Date(),
      questions: currentQuiz,
      userAnswers
    }

    finishQuiz(result)
    setShowResults(true)
    toast.success('Quiz completed!')
  }

  const handleRetakeQuiz = () => {
    resetQuiz()
    setShowResults(false)
    setQuizStarted(false)
    setTimeLeft(300)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600">Generating personalized quiz...</p>
        </div>
      </div>
    )
  }

  if (showResults && currentQuiz) {
    const score = userAnswers.reduce((acc, answer, index) => {
      return acc + (answer === currentQuiz[index].correctAnswer ? 1 : 0)
    }, 0)
    const percentage = Math.round((score / currentQuiz.length) * 100)

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card text-center"
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
              <p className="text-gray-600">Great job on completing the {subject} quiz</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">{percentage}%</div>
                <div className="text-gray-600">Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{score}/{currentQuiz.length}</div>
                <div className="text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{formatTime(300 - timeLeft)}</div>
                <div className="text-gray-600">Time</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetakeQuiz}
                className="btn-secondary flex items-center justify-center"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary flex items-center justify-center"
              >
                Back to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = currentQuiz[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {subject} Quiz
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Question {currentQuestionIndex + 1} of {currentQuiz.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="card mb-8"
        >
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                {currentQuestion.topic}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  userAnswers[currentQuestionIndex] === index
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    userAnswers[currentQuestionIndex] === index
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {userAnswers[currentQuestionIndex] === index && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
          >
            Exit Quiz
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={userAnswers[currentQuestionIndex] === undefined}
            className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex === currentQuiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizPage