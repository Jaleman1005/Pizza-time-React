import React from "react";
import "./style/time.css";

class Time extends React.Component {
  state = {
    temp: {},
    FULL_DASH_ARRAY: 283,
    TIME_LIMIT: this.props.type.time,
    timePassed: 0,
    timeLeft: this.props.type.time,
    timerInterval: null,
    remainingPathColor: null,
    WARNING_THRESHOLD: this.props.type.warning,
    ALERT_THRESHOLD: this.props.type.alert,
    COLOR_CODES: {
      info: {
        color: "green",
      },
      warning: {
        color: "orange",
        threshold: 10,
      },
      alert: {
        color: "red",
        threshold: 5,
      },
    },
  };

  startTimer() {
    const timerIntervalTemp = setInterval(() => {
      if (this.state.temp !== this.props.type.name) {
        this.setState({ temp: this.props.type.name});
        this.update();
        console.log(this.state.timeLeft);
      }
      this.setState({ timePassed: this.state.timePassed + 1 });
      this.setState({
        timeLeft: this.state.TIME_LIMIT - this.state.timePassed,
      });

      document.getElementById(
        "base-timer-label"
      ).innerHTML = this.formatTimeLeft(this.state.timeLeft);
      this.setCircleDasharray();
      this.setRemainingPathColor(this.state.timeLeft);

      if (this.state.timeLeft === 0) {
        this.onTimesUp();
      }
    }, 1000);
    this.setState({ timerInterval: timerIntervalTemp });
  }

  update() {
    this.setState({
      TIME_LIMIT: this.props.type.time,
      timeLeft: this.props.type.time,
      WARNING_THRESHOLD: this.props.type.warning,
      ALERT_THRESHOLD: this.props.type.alert,
    });
    clearInterval(this.state.timerInterval);
    this.startTimer();
  }

  onTimesUp() {
    clearInterval(this.state.timerInterval);
  }

  componentDidMount() {
    this.setState({ remainingPathColor: this.state.COLOR_CODES.info.color });
    this.startTimer();
  }

  formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  calculateTimeFraction() {
    const rawTimeFraction = this.state.timeLeft / this.state.TIME_LIMIT;
    return (
      rawTimeFraction - (1 / this.state.TIME_LIMIT) * (1 - rawTimeFraction)
    );
  }

  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.state.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = this.state.COLOR_CODES;

    if (this.state.timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);

      // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
    } else if (this.state.timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }

  render() {

    return (
      <div className="container">
        <h1>{this.props.type.name}</h1>
        <div className="base-timer">
          <svg
            className="base-timer__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="base-timer__circle">
              <circle
                className="base-timer__path-elapsed"
                cx="50"
                cy="50"
                r="45"
              />
              <path
                id="base-timer-path-remaining"
                stroke-dasharray="283"
                className={`base-timer__path-remaining ${this.state.remainingPathColor}`}
                d="
              M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
              ></path>
            </g>
          </svg>
          <span id="base-timer-label" className="base-timer__label">
            {this.formatTimeLeft(this.state.timeLeft)}
          </span>
        </div>
        <input name="start" id="start" class="btn btn-primary" type="button" value="Start" onClick={this.startTimer}/>
      </div>
    );
  }
}
export default Time;
