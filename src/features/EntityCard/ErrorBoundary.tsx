import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box } from '@mui/material';

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
        <Box
          sx={{
            backgroundColor: 'red',
            borderRadius: '10px',
            height: (theme) => theme.spacing(12),
            width: '100%',
            maxWidth: (theme) => theme.spacing(25),
            display: 'flex',
            flexDirection: 'column',
            padding: 1.5,
          }}
        >
          <h5>Error occurred on {this.props.entityId}</h5>
        </Box>
      );
    }
    return this.props.children;
  }
}
