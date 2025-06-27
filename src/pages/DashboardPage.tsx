import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { BookOpen, Target, TrendingUp, Clock, Award, Brain } from 'lucide-react'

const DashboardPage = () => {
  const { user } = useAuthStore()

  const recentQuizzes = [
    { id: '1', subject: 'Mathematics', score: 85, date: '2025-01-15', questions: 10 },
    { id: '2', subject: 'Science', score: 92, date: '2025-01-14', questions: 15 },
    { id: '3', subject: 'English', score: 78, date: '2025-01-13', questions: 12 }
  ]

  const subjects = [
    { name: 'Mathematics', progress: 75, nextTopic: 'Calculus Basics' },
    { name: 'Science', progress: 88, nextTopic: 'Quantum Physics' },
    { name: 'English', progress: 65, nextTopic: 'Essay Writing' },
    { name: 'History', progress: 45, nextTopic: 'World War II' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Continue your personalized learning journey
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Quizzes Taken</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Improvement</p>
                  <p className="text-2xl font-bold text-gray-900">+12%</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Study Time</p>
                  <p className="text-2xl font-bold text-gray-900">2.5h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Subject Progress */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Subject Progress</h2>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{subject.name}</span>
                      <span className="text-sm text-gray-600">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">Next: {subject.nextTopic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quizzes */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Quizzes</h2>
              <div className="space-y-4">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Brain className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{quiz.subject}</p>
                        <p className="text-sm text-gray-600">{quiz.questions} questions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-gray-900">{quiz.score}%</span>
                      </div>
                      <p className="text-sm text-gray-600">{quiz.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Take a Quiz</h3>
                <p className="text-gray-600">Start a new personalized quiz</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Diagnostic Test</h3>
                <p className="text-gray-600">Assess your current level</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">View Analytics</h3>
                <p className="text-gray-600">Track your progress</p>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage