import axios from "axios";

import MonitorSegment from "./MonitorSegment.jsx";

class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      status: {
        air_humidity: 0,
        air_temperature: 0,
        soil_raw_data: 0,
        soil_status: "?"
      },
      config: {
        air_humidity: {
          optimal: {
            min: 40,
            max: 60
          }
        },
        air_temperature: {
          optimal: {
            min: 20,
            max: 30
          }
        },
        soil_raw_data: {
          optimal: {
            min: 100,
            max: 100
          }
        }
      }
    };
  }
  componentWillMount() {
    this.fetchMonitor();
  }
  fetchMonitor() {
    axios.get(`${CONFIG.API_HOST}/status`).then(res => {
      this.setState({
        status: res.data,
        loading: false
      });
    });
  }
  handleReloadClick(e) {
    e.preventDefault();
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
      this.fetchMonitor();
    } else {
    }
  }
  render() {
    return (
      <div className="monitor card">
        <header className="card-header">
          <p className="card-header-title">Monitor</p>
          <a
            href="#"
            className="card-header-icon"
            aria-label="more options"
            onClick={this.handleReloadClick.bind(this)}
          >
            <span className="icon">
              <i
                className={
                  "fas fa-sync-alt " + (this.state.loading ? "fa-spin" : "")
                }
                aria-hidden="true"
              />
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="columns monitor-list">
              <div className="column">
                <MonitorSegment
                  label="Air Temperature"
                  val={this.state.status.air_temperature}
                  config={this.state.config.air_temperature}
                  unit="°C"
                  loading={this.state.loading}
                />
              </div>
              <div className="column">
                <MonitorSegment
                  label="Air Humidity"
                  val={this.state.status.air_humidity}
                  config={this.state.config.air_humidity}
                  unit="%"
                  loading={this.state.loading}
                />
              </div>
              <div className="column">
                <MonitorSegment
                  label="Soil Status"
                  val={this.state.status.soil_raw_data * 100}
                  config={this.state.config.soil_raw_data}
                  unit=""
                  loading={this.state.loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Monitor;
