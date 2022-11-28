import React from 'react';
function App () {
    // fetching the GET route from the Express server which matches the GET route from server.js
  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  const componentDidMount = () => {
    callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  return (
    <div className = "App">
      <h2> Hello World </h2>
    </div>
  )
}

export default App;