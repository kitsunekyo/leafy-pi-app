import Dashboard from './../Dashboard/Dashboard.jsx';
import Navbar from './../Navbar/Navbar.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <div className="site-content">
          <div className="container">
            <Dashboard />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
