import React, { Component } from "react";
import Particles from "react-particles-js";

import "./App.css";
import { Navigation, Logo, Container, SignIn, Register } from "./components";
import particlesOptions from "./utils/particlesLayout";
import appState from "./utils/appState";
import calculateFaceLocation from "./utils/calculateFaceLocation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = appState;
  }

  loadUser = (newUser) => {
    this.setState({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        entries: newUser.entries,
        joined: newUser.joined,
      },
    });
  };

  displayFaceBox = (box) => {
    let temp = this.state.box;
    temp.push(box);
    this.setState({ box: temp });
  };

  onInputChange = (input) => {
    this.setState({ input: input.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://secret-island-60464.herokuapp.com/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
        imageUrl: this.state.input,
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.imageBox.regions[0].region_info.bounding_box) {
            this.setState(
              Object.assign(this.state.user, { entries: data.entries })
            );
            const imageBoxArray = data.imageBox.regions;
            imageBoxArray.map(({ region_info: { bounding_box } }) =>
              this.displayFaceBox(calculateFaceLocation(bounding_box))
            );
          }
        });
      })
      .catch((err) => console.log("Api not working", err));
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route === "signout") this.setState(appState);
    else if (route === "home") this.setState({ isSignIn: true });
  };

  render() {
    const { isSignIn, box, imageUrl, route } = this.state;
    const { onRouteChange, onInputChange, onButtonSubmit } = this;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignIn={isSignIn} newPath={onRouteChange} />
        {route === "home" ? (
          <div>
            <Logo />
            <Container
              userName={this.state.user.name}
              userEntries={this.state.user.entries}
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
              box={box}
              imageUrl={imageUrl}
            />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} newPath={onRouteChange} />
        ) : (
          <Register loadUser={this.loadUser} newPath={onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
