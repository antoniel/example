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
    <form>
      <label className="block" htmlFor="username">
        Don't type <code>fail</code>
      </label>
      <input onChange={handleChange} />
    </form>
  );
};

const CustomComponent = () => {
  return <div>this is a custom error</div>;
};

function App() {
  return (
    <div className="container">
      <div className="wrapper">
        <ErrorBoundaryProvider fallback={<CustomComponent />}>
          <Form />
        </ErrorBoundaryProvider>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
