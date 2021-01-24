import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const ChecksMountAndUnmount = ({ children, where = "''" }: any) => {
  React.useEffect(() => {
    console.log("mounted", where);
    return () => console.log("unmounted");
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};
class ErrorBoundaryProvider extends React.Component {
  readonly state: { hasError: boolean };
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI alternativa
      console.log(this.props.children);
      return (
        <ChecksMountAndUnmount where="insede error">
          <h1>Algo deu errado.</h1>
          {this.props.children}
        </ChecksMountAndUnmount>
      );
    }

    return (
      <React.Fragment>
        <ChecksMountAndUnmount where="outside error">
          {this.props.children}
        </ChecksMountAndUnmount>
      </React.Fragment>
    );
  }
}

const Form = () => {
  const [username, setUsername] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  username === "fail" &&
    (() => {
      throw Error("neu");
    })();

  return (
    <div>
      <label htmlFor="username">Username</label>
      <input onChange={handleChange} />
    </div>
  );
};

function App() {
  return (
    <ErrorBoundaryProvider>
      <Form />
    </ErrorBoundaryProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
