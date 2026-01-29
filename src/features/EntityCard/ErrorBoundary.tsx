import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  entityId: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    console.error(
      `ErrorBoundary caught an error for ${this.props.entityId}:`,
      _error,
      _errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-destructive text-destructive-foreground rounded-lg h-32 w-full max-w-64 flex flex-col p-3 shadow-md border border-destructive/50">
          <h5 className="text-sm font-bold">
            Error occurred on {this.props.entityId}
          </h5>
        </div>
      );
    }
    return this.props.children;
  }
}
