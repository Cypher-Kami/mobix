import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorState } from '@/features/products/components/ErrorState'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  private handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <ErrorState
            message="Algo salió mal. Pulsa reintentar para continuar."
            onRetry={this.handleRetry}
          />
        </div>
      )
    }
    return this.props.children
  }
}
