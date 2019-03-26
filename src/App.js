import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({apiKey: '9712e25e26344f3b8c2548712aacb363'});

const particlesOptions = {

  particles: {
       number:{
        value:50,
        density:{
          enable:true,
          value_area:700
        }
       } 
   }                   
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row *height)
    }
   }
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  onButtonSubmit = () => { 
    this.setState({imageUrl:this.state.input});
     app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input )
     .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
     .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route });
   }
    
    render() {
    return (
      <div className="App">
         <Navigation onRouteChange={this.onRouteChange}/>
         {
          this.state.route === 'signin'
           ? <Signin onRouteChange = {this.onRouteChange} />
           :  <div> 
                  <Logo />
                   <Rank />
                   <Particles className='particles'
                            params={particlesOptions} />
                  <ImageLinkForm 
                      onInputChange={this.onInputChange} 
                      onButtonSubmit={this.onButtonSubmit} />
                  <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
              </div>
           }
        </div>
    );
  }
}

export default App;