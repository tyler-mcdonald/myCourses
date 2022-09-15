import React, { useEffect } from "react";
// import { Helmet } from "react-helmet";
import Head from "./Components/Head";
import Header from "./Components/Header";

function App() {
  // Test db access from client
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <Head />
      {/* <body> */}
      <div id="root">
        <Header />
      </div>
      {/* </body> */}
    </>
  );
}

export default App;
