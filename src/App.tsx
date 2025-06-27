import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import QuizPage from './pages/QuizPage'
import EducatorDashboard from './pages/EducatorDashboard'
import DiagnosticTest from './pages/DiagnosticTest'
import ClassroomIntegration from './pages/ClassroomIntegration'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz/:subject?" element={<QuizPage />} />
          <Route path="/educator" element={<EducatorDashboard />} />
          <Route path="/diagnostic" element={<DiagnosticTest />} />
          <Route path="/classroom" element={<ClassroomIntegration />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  )
}

export default App