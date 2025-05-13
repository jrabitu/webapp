import React from "react";
import ReactDOM from "react-dom";
import Example from "./components/Example";
import States from "./components/States";
import Header from "./components/Header";


//main component
class P4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showExample: true};
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState((prevState) => ({
      showExample: !prevState.showExample,
    }));
  }

  render() {
    return (
      <div>
        <Header />
        <button onClick={this.toggleView}>
          {this.state.showExample ? "switch to states" : "switch to example"}
        </button>
        {this.state.showExample ? <Example /> : <States />}
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <P4 />
  </div>, document.getElementById("reactapp"));
