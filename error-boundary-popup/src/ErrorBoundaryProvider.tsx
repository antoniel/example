import React from "react";

interface HOCErrorProps {
  updateParent: () => void;
  ms?: number;
  fallback?: React.ReactElement;
}

const DefaultComponent = () => (
  <div className="ErrorBoundaryCard">Default error component</div>
);

const HOCError: React.FC<HOCErrorProps> = ({
  fallback = <DefaultComponent />,
  updateParent,
  ms = 5000,
}) => {
  React.useEffect(() => {
    setTimeout(() => updateParent(), ms);
  }, [updateParent, ms]);

  return <>{fallback}</>;
};

interface ErrorBoundaryProviderProps {
  fallback?: React.ReactElement;
}
class ErrorBoundaryProvider extends React.Component<ErrorBoundaryProviderProps> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
    this.CustomComponent = this.props.children;
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  CustomComponent: React.ReactNode;
  updateErrorBoundary = () => this.setState({ hasError: false });
  readonly state: { hasError: boolean };

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          {this.props.children}
          <HOCError
            fallback={this.props.fallback}
            updateParent={this.updateErrorBoundary}
          />
        </React.Fragment>
      );
    }

    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default ErrorBoundaryProvider;
