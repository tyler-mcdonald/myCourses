import "./App.css";

function App() {
  // Test db access from client
  fetch("http://localhost:5000/api/courses")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <div className="App">
      <h1>Welcome!</h1>
    </div>
  );
}

export default App;
