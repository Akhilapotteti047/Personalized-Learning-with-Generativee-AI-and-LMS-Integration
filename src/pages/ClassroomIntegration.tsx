import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Calendar, Settings, ExternalLink, CheckCircle, AlertCircle, FolderSync as Sync, Plus, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

const ClassroomIntegration = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  // Mock Google Classroom data
  const mockCourses = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      section: 'Period 1',
      teacher: 'Ms. Johnson',
      students: 28,
      lastSync: '2025-01-15T10:30:00Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'Physics 101',
      section: 'Period 3',
      teacher: 'Dr. Smith',
      students: 24,
      lastSync: '2025-01-15T09:15:00Z',
      status: 'active'
    },
    {
      id: '3',
      name: 'English Literature',
      section: 'Period 5',
      teacher: 'Mr. Davis',
      students: 32,
      lastSync: '2025-01-14T14:20:00Z',
      status: 'inactive'
    }
  ]

  const mockAssignments = [
    {
      id: '1',
      title: 'Calculus Quiz - Derivatives',
      course: 'Advanced Mathematics',
      dueDate: '2025-01-20',
      submissions: 15,
      totalStudents: 28,
      avgScore: 85
    },
    {
      id: '2',
      title: 'Newton\'s Laws Assessment',
      course: 'Physics 101',
      dueDate: '2025-01-18',
      submissions: 22,
      totalStudents: 24,
      avgScore: 78
    }
  ]

  const handleConnectClassroom = async () => {
    setIsLoading(true)
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
      toast.success('Successfully connected to Google Classroom!')
    }, 2000)
  }

  const handleSyncCourse = (courseId: string) => {
    toast.success('Course synced successfully!')
  }

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Google Classroom Integration
              </h1>
              <p className="text-lg text-gray-600">
                Connect your Google Classroom to sync courses and generate personalized quizzes
              </p>
            </div>

            <div className="card text-center max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Connect to Google Classroom
                </h2>
                <p className="text-gray-600 mb-8">
                  Authorize EduTutor AI to access your Google Classroom data to create 
                  personalized learning experiences based on your course content.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Sync Students</h3>
                  <p className="text-sm text-gray-600">Import class rosters automatically</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Course Content</h3>
                  <p className="text-sm text-gray-600">Generate quizzes from assignments</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Auto-Sync</h3>
                  <p className="text-sm text-gray-600">Keep data updated in real-time</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-left">
                    <h4 className="font-semibold text-yellow-800 mb-1">Privacy & Security</h4>
                    <p className="text-sm text-yellow-700">
                      We only access course information and student rosters. We never access 
                      personal student data or modify your Google Classroom content.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleConnectClassroom}
                disabled={isLoading}
                className="btn-primary flex items-center justify-center mx-auto"
              >
                {isLoading ? (
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Connect Google Classroom
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Google Classroom</h1>
              <p className="text-gray-600 mt-2">Manage your connected courses and assignments</p>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Connected</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">84</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Quizzes</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Sync className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Last Sync</p>
                  <p className="text-2xl font-bold text-gray-900">2h ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Courses */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Connected Courses</h2>
                <button className="btn-secondary flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </button>
              </div>
              
              <div className="space-y-4">
                {mockCourses.map((course) => (
                  <div key={course.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.section} • {course.teacher}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>{course.students} students</span>
                      <span>Last sync: {formatDate(course.lastSync)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSyncCourse(course.id)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Sync className="h-4 w-4 mr-1" />
                        Sync Now
                      </button>
                      <button className="flex items-center text-sm text-gray-600 hover:text-gray-700">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Assignments */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Quiz Assignments</h2>
              
              <div className="space-y-4">
                {mockAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.course}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        Due: {formatDate(assignment.dueDate)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Submissions</span>
                        <div className="font-semibold text-gray-900">
                          {assignment.submissions}/{assignment.totalStudents}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Score</span>
                        <div className="font-semibold text-gray-900">{assignment.avgScore}%</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Completion</span>
                        <div className="font-semibold text-gray-900">
                          {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ClassroomIntegration