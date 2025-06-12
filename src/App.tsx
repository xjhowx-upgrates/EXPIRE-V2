import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { TimeProvider } from './contexts/TimeContext'
import Navbar from './components/navigation/Navbar'
import Footer from './components/navigation/Footer'
import Home from './pages/Home'
import Games from './pages/Games'
import GameDetail from './pages/GameDetail'
import GamePlay from './pages/GamePlay'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Achievements from './pages/Achievements'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TimeProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/game/:gameId" element={<GameDetail />} />
                <Route path="/play/:gameId" element={<GamePlay />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TimeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App