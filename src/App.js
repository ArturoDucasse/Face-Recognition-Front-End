import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/logo.js';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm.js';
import Rank from './components/Rank/rank.js';
import FaceRecognition from './components/FaceRecognition/faceRecognition.js';
import SignIn from './components/SignIn/signIn.js';
import Particles from 'react-particles-js';
import Register from './components/Register/register';
import particlesOptions from './components/particlesLayout'
import appState from './components/appState';

class App extends Component {
  constructor(props){
    super(props);
    this.state = appState
  }

  loadUser = (newUser) => {
      this.setState({user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          entries: newUser.entries,
          joined: newUser.joined
        }})
  }


  calculateFaceLocation = (data) =>{
      const clarifaiFace = data;
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
      this.setState({box: box});
  }

  onInputChange = (input) => {
      this.setState({input: input.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://secret-island-60464.herokuapp.com/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          id: this.state.user.id,
          imageUrl: this.state.input
      })})
      .then(response =>{
        response.json().then(data =>{
            if(data.imageBox){
              this.setState(Object.assign(this.state.user, {entries: data.entries}))
              this.displayFaceBox(this.calculateFaceLocation(data.imageBox))
            }
        })})
      .catch(err => console.log("Api not working",err));
  }

    onRouteChange = (route) => {
      this.setState({route: route});
      if (route === 'signout') this.setState(appState);
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
          newPath = {onRouteChange}
        />
        {route === 'home'
          ? <div>
              <Logo />
              <Rank 
                userName = {this.state.user.name} 
                userEntries = {this.state.user.entries}
              />
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
            ? <SignIn loadUser={this.loadUser} newPath = {onRouteChange}/>
            : <Register loadUser={this.loadUser} newPath = {onRouteChange}/>
          )
        } 
      </div>
    );
  }}

export default App;