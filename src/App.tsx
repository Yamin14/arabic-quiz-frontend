import { BrowserRouter } from 'react-router'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import Dashboard from './components/dashboard/Dashboard'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { NotFound } from './components/layout/NotFound'
import Quiz from './components/quiz/Quiz'
import Result from './components/quiz/Result'
import Users from './components/user/Users'
import Profile from './components/user/Profile'
import EditProfile from './components/user/EditProfile'
import ViewQuestions from './components/questions/ViewQuestions'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import GuestRoute from './components/auth/GuestRoute'
import { UsersProvider } from './context/UsersContext'
import AdminRoute from './components/auth/AdminRoute'
import { QuizProvider } from './context/QuizContext'
import EditQuestion from './components/questions/EditQuestion'
import AddQuestion from './components/questions/AddQuestion'
import AdminPage from './components/admin/AdminPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UsersProvider>
            <QuizProvider>
              <Routes>
                <Route element={<Layout />}>
                  {/* Protected Routes */}
                  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/profile/edit/:id" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                  <Route path="/quiz/:category" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
                  <Route path="/quiz/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />

                  {/* Guest Routes */}
                  <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                  <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
                  <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
                  <Route path="/admin/questions" element={<AdminRoute><ViewQuestions /></AdminRoute>} />
                  <Route path="/admin/questions/edit/:id" element={<AdminRoute><EditQuestion /></AdminRoute>} />
                  <Route path="/admin/questions/add" element={<AdminRoute><AddQuestion /></AdminRoute>} />

                  {/* Not found */}
                  <Route path='*' element={<NotFound />} />
                </Route>
              </Routes>
            </QuizProvider>
          </UsersProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
