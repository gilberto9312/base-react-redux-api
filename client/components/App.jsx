import React from 'react';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello World</h1>
      </div>);
  }
}

export default withRouter(App)