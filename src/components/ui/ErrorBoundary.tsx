import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback: ReactNode;
  onError?: () => void;
};

type State = { failed: boolean };

/**
 * Keeps a failed lazy import (WebGL chunk blocked, stale hash after a deploy,
 * flaky network) from unmounting the whole page: the section swaps to its
 * static fallback instead.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[stellane] deferred scene failed, using fallback', error, info.componentStack);
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
