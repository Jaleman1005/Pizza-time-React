import React from "react";

function Timer(props) {
  return (
    <div className="container">
      <h1>{props.name}</h1>
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
              className={`base-timer__path-remaining ${props.remainingPathColor}`}
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
          {props.formatTimeLeft}
        </span>
      </div>
      <div className="row">
        <div className="col-9">
          <button
            name="start"
            id="start"
            className="btn btn-primary"
            type="button"
            onClick={props.onStart}
          >
            Start
          </button>
        </div>
        <div className="col-3">
          <button
            name="Stop"
            id="Stop"
            className="btn btn-danger"
            type="button"
            onClick={props.onStop}
          >
            stop
          </button>
        </div>
      </div>
    </div>
  );
}
export default Timer;
