import React, { useState } from 'react';

// fetching the GET route from the Express server which matches the GET route from server.js

function App () {
  const [apiResponse, setApiResponse] = useState("");

  React.useEffect(() => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiResponse(res))
  });

  return (
    <div className = "App">
      <h2> {apiResponse} </h2>
    </div>
  )
}

export default App;