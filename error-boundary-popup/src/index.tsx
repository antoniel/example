import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ErrorBoundaryProvider from "./ErrorBoundaryProvider";

const Form = () => {
  const [username, setUsername] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  username === "fail" &&
    (() => {
      throw Error("Generic Error");
    })();

  return (
    <div>
      <label htmlFor="username">Username</label>
      <input onChange={handleChange} />
    </div>
  );
};

const CustomComponent = () => {
  return <div>this is a custom error</div>;
};

function App() {
  return (
    <ErrorBoundaryProvider fallback={<CustomComponent />}>
      <Form key="aqueleForm" />
    </ErrorBoundaryProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
