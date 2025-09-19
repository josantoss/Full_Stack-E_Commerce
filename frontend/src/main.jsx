import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { ComparisonProvider } from './context/ComparisonContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { UserPreferencesProvider } from './context/UserPreferencesContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import SoundEffects from './components/SoundEffects.jsx'
import MicroInteractions from './components/MicroInteractions.jsx'
import AmbientAudio from './components/AmbientAudio.jsx'
import analytics from './utils/analytics.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ComparisonProvider>
                  <UserPreferencesProvider>
                    <ToastProvider>
                      <SoundEffects />
                      <MicroInteractions />
                      <AmbientAudio />
                      <App />
                    </ToastProvider>
                  </UserPreferencesProvider>
                </ComparisonProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)
