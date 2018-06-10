import React, { Component } from "react";

class MonitorSegment extends Component {
  constructor(props) {
    super(props);
  }
  getColor(val) {
    if (val >= this.props.config.optimal.min && val <= this.props.config.optimal.max) {
      // perfect
      return 'green';
    }
    else if (val < this.props.config.optimal.min) {
      // too low
      return 'blue';
    }
    else if (val > this.props.config.optimal.max) {
      // too high
      return 'orange';
    }
  }
  render() {
    return (
      <div className="monitor-segment">
        <svg
          viewBox="0 0 36 36"
          className={
            "circular-chart " +
            this.getColor(this.props.val)
          }
        >
          <path
            className="monitor-segment__circle-bg"
            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={
              "monitor-segment__circle-fill " +
              (!this.props.loading ? "animate" : "")
            }
            strokeDasharray={this.props.val + ', 100'}
            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="monitor-segment__value">
            {this.props.val + this.props.unit}
          </text>
        </svg>
        <div className="monitor-segment__label">{ this.props.label }</div>
      </div>
    );
  }
}

export default MonitorSegment;
