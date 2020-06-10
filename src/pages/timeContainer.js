import React from "react";

import "./style/time.css";
import Timer from "../components/Timer";
import Modal from "../components/Modal";

class TimeContainer extends React.Component {
  state = {
    modalIsOpen: false,
    temp: {},
    buttonStart: "enable",
    FULL_DASH_ARRAY: 283,
    TIME_LIMIT: 0,
    timePassed: 0,
    timeLeft: 0,
    timerInterval: null,
    validateChange: null,
    remainingPathColor: null,
    WARNING_THRESHOLD: 0,
    ALERT_THRESHOLD: 0,
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
  //función que valdia si el tiempo del temporizador es 0 despliega un modal
  validateCero = () => {
    if (this.state.timeLeft !== 0) {
      clearInterval(this.state.validateChange);
      this.startTimer();
    } else {
      this.setState({ modalIsOpen: true, timeLeft: this.props.type.time });
    }
  };
  //metodo para iniciar el conteo
  startTimer = () => {
    this.setState({
      buttonStart: "enable",
      TIME_LIMIT: this.props.type.time,
      timeLeft: this.props.type.time,
      WARNING_THRESHOLD: this.props.type.warning,
      ALERT_THRESHOLD: this.props.type.alert,
      timePassed: 0,
    });

    this.setState({
      timerInterval: setInterval(() => {
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
      }, 1000),
    });
  };
  //metodo para reiniciar y detener el conteo
  StopInterval = () => {
    this.validateChangeOption();
    clearInterval(this.state.timerInterval);
    clearInterval(this.state.validateChange);
    this.setState({
      TIME_LIMIT: this.props.type.time,
      timeLeft: this.props.type.time,
      WARNING_THRESHOLD: this.props.type.warning,
      ALERT_THRESHOLD: this.props.type.alert,
      timePassed: 0,
    });
    this.restartPathColor();
  };
  //elimina el interbalo para ahorrar memoria
  onTimesUp() {
    clearInterval(this.state.timerInterval);
  }
  //se inicia en el momento en el que el componente se ve en pantalla e inicializa los colores.
  componentDidMount() {
    this.setState({ remainingPathColor: this.state.COLOR_CODES.info.color });
    this.validateChangeOption();
  }
  //se crea un intervalo para reiniciar el temporizador
  validateChangeOption = () => {
    this.setState({
      validateChange: setInterval(() => {
        this.setState({
          TIME_LIMIT: this.props.type.time,
          timeLeft: this.props.type.time,
          WARNING_THRESHOLD: this.props.type.warning,
          ALERT_THRESHOLD: this.props.type.alert,
          timePassed: 0,
        });
      }),
    });
  };
  //se establece el formato del contador que se muestra en la mitad del medio
  formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };
  //calcula la fracción del tiempo
  calculateTimeFraction() {
    const rawTimeFraction = this.state.timeLeft / this.state.TIME_LIMIT;
    return (
      rawTimeFraction - (1 / this.state.TIME_LIMIT) * (1 - rawTimeFraction)
    );
  }
  //metodo basado en los principios de la circunferencia para modificar el color del circulo
  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.state.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
  //valida los tiempos para cambiar el color a la circunferencia
  setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = this.state.COLOR_CODES;

    if (this.state.timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (this.state.timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }
  //al oprimir el boton stop este metodo es llamda y se reinician los colores de la circunferencia
  restartPathColor = () => {
    const { alert, warning, info } = this.state.COLOR_CODES;
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(alert.color || warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(info.color);
  };

  handleClose = (e) => {
    this.setState({ modalIsOpen: false });
  };

  handleOpen = (e) => {
    this.setState({ modalIsOpen: true });
  };

  render() {
    return (
      <div>
        <Timer
          name={this.props.type.name}
          remainingPathColor={this.state.remainingPathColor}
          formatTimeLeft={this.formatTimeLeft(this.state.timeLeft)}
          onStart={this.validateCero}
          onStop={this.StopInterval}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
        >
          Por favor seleccione un temporizador
        </Modal>
      </div>
    );
  }
}
export default TimeContainer;
