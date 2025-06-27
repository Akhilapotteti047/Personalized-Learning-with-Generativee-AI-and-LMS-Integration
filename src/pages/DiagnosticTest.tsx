import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Target, CheckCircle, ArrowRight, BookOpen } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

interface DiagnosticQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  subject: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

const DiagnosticTest = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useAuthStore()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [testStarted, setTestStarted] = useState(false)

  const diagnosticQuestions: DiagnosticQuestion[] = [
    {
      id: '1',
      question: 'What is 15 + 27?',
      options: ['42', '41', '43', '40'],
      correctAnswer: 0,
      subject: 'Mathematics',
      difficulty: 'beginner'
    },
    {
      id: '2',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
      subject: 'Geography',
      difficulty: 'beginner'
    },
    {
      id: '3',
      question: 'What is the derivative of x³?',
      options: ['3x²', '3x', 'x²', '3x³'],
      correctAnswer: 0,
      subject: 'Mathematics',
      difficulty: 'intermediate'
    },
    {
      id: '4',
      question: 'Which element has the chemical symbol "O"?',
      options: ['Gold', 'Oxygen', 'Silver', 'Iron'],
      correctAnswer: 1,
      subject: 'Chemistry',
      difficulty: 'beginner'
    },
    {
      id: '5',
      question: 'What is the integral of 2x?',
      options: ['x²', 'x² + C', '2', '2x + C'],
      correctAnswer: 1,
      subject: 'Mathematics',
      difficulty: 'advanced'
    }
  ]

  const handleStartTest = () => {
    setTestStarted(true)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < diagnosticQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleFinishTest()
    }
  }

  const handleFinishTest = () => {
    setIsLoading(true)
    
    // Calculate results
    setTimeout(() => {
      const correctAnswers = answers.reduce((acc, answer, index) => {
        return acc + (answer === diagnosticQuestions[index].correctAnswer ? 1 : 0)
      }, 0)

      const percentage = Math.round((correctAnswers / diagnosticQuestions.length) * 100)
      let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
      
      if (percentage >= 80) level = 'advanced'
      else if (percentage >= 60) level = 'intermediate'

      // Update user profile
      updateUser({
        diagnosticCompleted: true,
        learningLevel: level,
        subjects: ['Mathematics', 'Science', 'English', 'History']
      })

      setIsLoading(false)
      setShowResults(true)
      toast.success('Diagnostic test completed!')
    }, 2000)
  }

  const calculateResults = () => {
    const correctAnswers = answers.reduce((acc, answer, index) => {
      return acc + (answer === diagnosticQuestions[index].correctAnswer ? 1 : 0)
    }, 0)
    const percentage = Math.round((correctAnswers / diagnosticQuestions.length) * 100)
    let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
    
    if (percentage >= 80) level = 'advanced'
    else if (percentage >= 60) level = 'intermediate'

    return { correctAnswers, percentage, level }
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="card">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Diagnostic Assessment
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Let's assess your current knowledge level to create a personalized learning experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">5 Questions</h3>
                <p className="text-sm text-gray-600">Quick assessment</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Adaptive</h3>
                <p className="text-sm text-gray-600">Personalized difficulty</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">AI-Powered</h3>
                <p className="text-sm text-gray-600">Smart recommendations</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <h4 className="font-semibold text-yellow-800 mb-2">What to expect:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Questions across multiple subjects</li>
                <li>• No time limit - take your time</li>
                <li>• Results will personalize your learning path</li>
                <li>• You can retake this test anytime</li>
              </ul>
            </div>

            <button
              onClick={handleStartTest}
              className="btn-primary flex items-center justify-center mx-auto"
            >
              Start Diagnostic Test
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    )
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
          <p className="text-gray-600">Analyzing your responses...</p>
        </div>
      </div>
    )
  }

  if (showResults) {
    const results = calculateResults()
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card text-center"
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Assessment Complete!
              </h1>
              <p className="text-lg text-gray-600">
                Your personalized learning profile has been created
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{results.percentage}%</div>
                <div className="text-gray-600">Overall Score</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {results.correctAnswers}/{diagnosticQuestions.length}
                </div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2 capitalize">
                  {results.level}
                </div>
                <div className="text-gray-600">Learning Level</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Your Personalized Learning Path
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Adaptive Quizzes</h4>
                    <p className="text-sm text-gray-600">Questions tailored to your {results.level} level</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Subject Focus</h4>
                    <p className="text-sm text-gray-600">Emphasis on areas needing improvement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Progress Tracking</h4>
                    <p className="text-sm text-gray-600">Monitor your learning journey</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">AI Recommendations</h4>
                    <p className="text-sm text-gray-600">Smart suggestions for optimal learning</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary flex items-center justify-center mx-auto"
            >
              Continue to Dashboard
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  const currentQuestion = diagnosticQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Diagnostic Assessment</h1>
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {diagnosticQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="card mb-8"
        >
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                {currentQuestion.subject}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentQuestion.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  answers[currentQuestionIndex] === index
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestionIndex] === index
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestionIndex] === index && (
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
        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={answers[currentQuestionIndex] === undefined}
            className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex === diagnosticQuestions.length - 1 ? 'Finish Assessment' : 'Next Question'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DiagnosticTest