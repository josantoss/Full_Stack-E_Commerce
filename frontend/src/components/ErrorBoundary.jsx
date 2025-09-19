import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging
    // eslint-disable-next-line no-console
    console.error('UI Error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">An unexpected error occurred while rendering the page.</p>
            <div className="text-left text-sm bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 overflow-auto max-h-40">
              <pre className="text-red-600 whitespace-pre-wrap">
                {this.state.error?.message || String(this.state.error)}
              </pre>
            </div>
            <button onClick={this.handleReload} className="btn-primary">Reload Page</button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
