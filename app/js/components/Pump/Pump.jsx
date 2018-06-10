import axios from 'axios';

class Pump extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watering: false,
      progress: 0,
    };
  }
  handleWaterClick(e) {
    e.preventDefault();
    if (!this.state.watering) {
      this.sendWater();
    }
  }
  handleStopClick(e) {
    e.preventDefault();
    this.stopPump();
  }
  sendWater() {
    this.setState({
      watering: true,
    });
    axios.post(`${CONFIG.api.host}/pump/water`).then(res => {
      this.runProgress().then(() => {
        this.setState({
          watering: false,
        });
      });
    });
  }
  runProgress() {
    return new Promise((resolve, reject) => {
      let __progress = this.state.progress;
      const interval = setInterval(() => {
        if (this.state.progress >= 100) {
          clearInterval(interval);
          this.setState({
            progress: 0,
          });
          resolve();
        } else {
          __progress++;
          this.setState({
            progress: __progress,
          });
        }
      }, 50);
    });
  }
  stopPump() {
    axios.post(`${CONFIG.api.host}/pump/off`).then(res => {
      this.setState({
        watering: false,
      });
    });
  }
  render() {
    return (
      <div className="pump card">
        <header className="card-header">
          <p className="card-header-title">Pump</p>
        </header>
        <div className="card-image">
          <figure className="image is-cut">
            <img
              src="https://images.unsplash.com/photo-1446608943998-cbd52b140335?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=abd17fa40a49b2c4c98084fbaf0fa34f&auto=format&fit=crop&w=1267&q=80"
              alt="Placeholder image"
            />
          </figure>
        </div>
        {this.state.watering ? (
          <div className="card-content">
            <div className="content">
              <div>
                <h3>watering is in progress...</h3>
                <progress
                  className="progress is-primary"
                  value={this.state.progress}
                  max="100"
                />
              </div>
            </div>
          </div>
        ) : null}
        <footer className="card-footer">
          <a
            href="#"
            className="card-footer-item"
            onClick={this.handleWaterClick.bind(this)}
          >
            Water
          </a>
          <a
            href="#"
            className="card-footer-item"
            onClick={this.handleStopClick.bind(this)}
          >
            Power Off
          </a>
        </footer>
      </div>
    );
  }
}

export default Pump;
