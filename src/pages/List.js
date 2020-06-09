import React from "react";
import Time from "./time";

class List extends React.Component {
  state = {
    pizza: { name: "Pizza", time: 180, warning: 60, alert: 20 },
    galletas: { name: "Galletas", time: 120, warning: 30, alert: 10 },
    pan: { name: "Pan", time: 300, warning: 120, alert: 30 },
    temp: { name: "Name", time: 0, warning: 0, alert: 0},
  };

  handleChange = (e) => {
    this.setState({ temp: e.target.value });
    this.handleSelect(e.target.value);
  };

  handleSelect = (e) => {
      if (e === this.state.pizza.name) {
          this.setState({temp: this.state.pizza});
        } else {
            if (e === this.state.galletas.name) {
                this.setState({temp: this.state.galletas});
            } else {
                if (e === this.state.pan.name) {
                    this.setState({temp: this.state.pan});
             }
         } 
      }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="form-group">
            <label></label>
            <select
              onChange={this.handleChange}
              className="form-control"
              name="select"
              id="select"
            >
              <option value="Name">Seleccione una opción</option>
              <option value="Pizza">Pizza</option>
              <option value="Galletas">Galletas</option>
              <option value="Pan">Pan</option>
            </select>
          </div>
        </div>
        <Time type={this.state.temp} />
      </div>
    );
  }
}
export default List;
