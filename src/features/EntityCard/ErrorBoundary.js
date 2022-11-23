import React, { Component } from 'react';
import { Box } from '@mui/material';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

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
          <h5>Error ocurred on {this.props.entityId}</h5>
        </Box>
      );
    }
    return this.props.children;
  }
}
