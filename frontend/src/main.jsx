import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { ComparisonProvider } from './context/ComparisonContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ComparisonProvider>
                <App />
              </ComparisonProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)
