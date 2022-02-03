import './App.css';
import React, { Component } from "react";
import bg from './bg.jpg';
import dclear from './dclear.jpg';
import nclear from './nclear.jpg';
import dcloud from './dcloud.jpg';
import ddrizzle from './ddrizzle.jpg';
import ndrizzle from './ndrizzle.jpg';
import drainy from './drainy.jpg';
import nrainy from './nrainy.jpg';
import dsmoke from './dsmoke.jpg';
import nsnow from './nsnow.jpg';
import dsnow from './dsnow.jpg';
import dthunder from './dthunder.jpg';
import nthunder from './nthunder.jpg';
import clear1 from './clear1.jpg';
import cloud1 from './cloud1.jpg';
import drizzle from './drizzle.jpg';
import smoke1 from './smoke1.jpg';
import snow1 from './snow1.jpg';
import storm1 from './storm1.jpg';
import rainy1 from './rainy1.jpg';
import logi from './logi.jpg';
//my apikey: 4f5552e52ad166b5e46c7f6c48849e2b
// import React, { useState } from 'react';
//300<thunderstorm
//400<drizzle
//600<rain
//700<snow
//800<mist/fog
//800=clear
//900<cloudy

class App extends Component {

  constructor() {
    super()
    this.state = {
      lat: null,
      lng: null,
      load: null,
      location: null,
      temperature: null,
      weather: null,
      day: null,
      id: null,
      img: bg,
      logo:logi
    }
    // this.getLocation=this.getLocation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.chooseBG = this.chooseBG.bind(this)
  }

  chooseBG() {
    if (this.state.id === null) { this.setState({ img: bg }) }
    else if (this.state.id < 300) {
      this.setState({logo: storm1})
      if (this.state.day === 'd') { this.setState({ img: dthunder }) }
      else { this.setState({ img: nthunder }) }
    }
    else if (this.state.id < 400) {
      this.setState({logo: drizzle})
      if (this.state.day === 'd') { this.setState({ img: ddrizzle }) }
      else { this.setState({ img: ndrizzle }) }
    }
    else if (this.state.id < 600) {
      this.setState({logo: rainy1})
      if (this.state.day === 'd') { this.setState({ img: drainy }) }
      else { this.setState({ img: nrainy }) }
    }
    else if (this.state.id < 700) {
      this.setState({logo: snow1})
      if (this.state.day === 'd') { this.setState({ img: dsnow }) }
      else { this.setState({ img: nsnow }) }
    }
    else if (this.state.id < 800) {
      this.setState({logo: smoke1})
      if (this.state.day === 'd') { this.setState({ img: dsmoke }) }
      else { this.setState({ img: dsmoke }) }
    }
    else if (this.state.id === 800) {
      this.setState({logo: clear1})
      if (this.state.day === 'd') { this.setState({ img: dclear }) }
      else { this.setState({ img: nclear }) }
    }
    else if (this.state.id < 900) {
      this.setState({logo: cloud1})
      if (this.state.day === 'd') { this.setState({ img: dcloud }) }
      else { this.setState({ img: dcloud }) }
    }
    console.log(this.state.img)
  }


  componentDidMount() {
    if (!navigator.geolocation) {
      this.setState({ load: 'Geolocation is not supported by your browser' });
    }
    else {

      //lets find the current location
      this.setState({ load: 'Loading....' });
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          load: null,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

      }, () => {
        this.setState({ load: 'Unable to get your location' });
      });

      setTimeout(() => {
        //lets find the weather
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lng + "&appid=4f5552e52ad166b5e46c7f6c48849e2b")
          .then(response => response.json())
          .then(data =>
            this.setState({
              temperature: (data['main']['temp']-273.15).toFixed(2),
              location: data['name'],
              weather: data['weather'][0]['main'],
              id: data['weather'][0]['id'],
              day: data['weather'][0]['icon'].charAt(data['weather'][0]['icon'].length - 1)
            })
          )
          setTimeout(()=>{this.chooseBG()},1000)
      }, 2000);
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state.weather)
    // console.log(this.state.location)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + this.state.location + "&appid=4f5552e52ad166b5e46c7f6c48849e2b")
      .then(response => response.json())
      .then(data =>
        this.setState({
          temperature: (data['main']['temp']-273.15).toFixed(2),
          location: data['name'],
          weather: data['weather'][0]['main'],
          id: data['weather'][0]['id'],
          day: data['weather'][0]['icon'].charAt(data['weather'][0]['icon'].length - 1)
        })
      )
      setTimeout(()=>{this.chooseBG()},1000)
  }


  render() {
    //document.body.style.backgroundImage= "url('https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80')";
    document.body.style.backgroundImage= 'url('+this.state.img+')';
    return (
      <div>
        <div className='App'>
          <div>
            <h1>Clima Weather App</h1>
            <form onSubmit={this.handleSubmit}>
              <label>Type any other city: </label>
              <input
                type="text"
                value={this.state.location}
                name="location"
                placeholder="Location"
                onChange={this.handleChange}
              />
              <button>Search</button>
            </form>
            <p>{this.state.load}</p>
            <p>Location:<b> {this.state.location}</b></p>
            <p>Temperature: <b>{this.state.temperature} {this.state.temperature?'degrees Celsius':''} </b></p>
            <p>Weather: <b>{this.state.weather}</b></p>
          </div>
          <img src={this.state.logo} alt='Logo Image' />
        </div>
      </div>
    );
  }
}


export default App;