import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/logo.js';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm.js';
import Rank from './components/Rank/rank.js';
import FaceRecognition from './components/FaceRecognition/faceRecognition.js';
import SignIn from './components/SignIn/signIn.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Register from './components/Register/register';

const app = new Clarifai.App({
 apiKey: 'f9fc9ac54eea4e24b07463b58ea7cd42'
});

const particlesOptions =
      {
  "particles": {
    "number": {
      "value": 200,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      }}}};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: {}, 
      route: 'signin',
      isSignIn: false
    }
  }

  calculateFaceLocation = (data) =>{
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
  }

  displayFaceBox = (box) => {
      console.log(box);
      this.setState({box: box});
  }

  onInputChange = (input) => {
      this.setState({input: input.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => 
          this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
      this.setState({route: route});
      if (route === 'signout') this.setState({isSignIn: false});
      else if(route === 'home') this.setState({isSignIn: true});
    }
    
  
  render() {
    const {isSignIn, box,imageUrl,route} = this.state;
    const {onRouteChange, onInputChange, onButtonSubmit} = this;
    return (
      <div className="App">
        <Particles 
          className="particles"
          params={particlesOptions}
        />
        <Navigation 
          isSignIn = {isSignIn}
          onChange = {onRouteChange}
        />
        {route === 'home'
          ? <div>
              <Logo />
              <Rank/>
              <ImageLinkForm 
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}/>
              <FaceRecognition 
                box ={box} 
                imageUrl={imageUrl}
              />
            </div>
          : (
            route === 'signin'
            ? <SignIn onChange = {onRouteChange}/>
            : <Register onChange = {onRouteChange}/>
          )
        } 
      </div>
    );
  }}

export default App;