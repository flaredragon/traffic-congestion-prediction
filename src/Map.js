/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  Polyline,Marker,TrafficLayer,InfoWindow
} from "react-google-maps";
import * as Papa from 'papaparse';
import { deflateSync } from "zlib";

  
class Map extends Component {
  state = {
    lineCoordinates: null,
    lineCoordinates2: null,
    lineCoordinates3: null,
    a:[],
    b:[],
    c:[],
    dates:[],
    index :-1,
    sC:'blue',
    sC2:'blue',
    sC3:'blue',
    nR:0,
    nR2:0,
    nR3:0,
    tweets:[],
    showInfoWindow: false
  };
  
  handleMouseOver = e => {
    this.setState({
        showInfoWindow: true
    });
};
handleMouseExit = e => {
    this.setState({
        showInfoWindow: false
    });
};
  
  componentDidMount() {
    fetch("http://localhost:3002/lol", {
      mode: 'cors',
    }).then((res)=>{
      return res.json()
    }).then((res)=>{
      this.setState({tweets:res.data});
    });
    
    const directionsService = new google.maps.DirectionsService();
    const directionsService2 = new google.maps.DirectionsService();
    const directionsService3 = new google.maps.DirectionsService();
    
    const origin = { lat: 28.750616, lng: 77.116578 };
    const destination = { lat: 30.727546, lng: 76.844814 };
    const origin2 = { lat: 30.727546, lng: 76.844814 };
    const destination2 = { lat: 30.752827, lng: 76.806375 };
    const origin3 = { lat: 30.752827, lng: 76.806375 };
    const destination3 = { lat: 28.750616, lng: 77.116578 };
    
    Papa.parse("dataset.csv", {
      download: true,
      complete: this.updateData,
    });
    Papa.parse("Dataset_TCF.csv", {
      download: true,
      complete: this.updateTCFData,
    });

    

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives:true
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result.routes);
          const overViewCoords = result.routes;   
          this.setState({   
            lineCoordinates: overViewCoords,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
    directionsService2.route(
      {
        origin: origin2,
        destination: destination2,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives:true
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const overViewCoords = result.routes;   
          this.setState({   
            lineCoordinates2: overViewCoords,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
    directionsService3.route(
      {
        origin: origin3,
        destination: destination3,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives:true
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const overViewCoords = result.routes;   
          this.setState({   
            lineCoordinates3: overViewCoords,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  updateData = (result) => {
    const data = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    var a=[],b=[],c=[],dates=[];
    var mini = Infinity;
    var i = -1;
    data.forEach((x,j)=>{
      var t = new Date(x[0]);
      if(Math.abs(t-Date.now())<mini){
        mini = Math.abs(t-Date.now());
        i = j;
      }
    });
    this.setState({index:i});
    data.forEach((x,j)=>{
      if(j!=0){
      dates.push(x[0]);
      a.push(x[1]);
      b.push(x[2]);
      c.push(x[3]);
      }
    });
    this.setState({a,b,c,dates});
  }

  updateTCFData = (result) => {
    const data = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    var d=[],e=[],f=[];
    data.forEach((x,j)=>{
      if(j!=0){
      d.push(x[4]);
      e.push(x[5]);
      f.push(x[6]);
      }
    });
    this.setState({d,e,f});
  }


  forward = () =>{
    var index = this.state.index;
    var a = this.state.a;
    var b = this.state.b;
    var c = this.state.c;
    var d = this.state.d;
    var e = this.state.e;
    var f = this.state.f;
    if(parseFloat(a[index+1])<15347.921667999999)
      this.setState({sC:'green'});
    else if(parseFloat(a[index+1])>=15347.921667999999&&parseFloat(a[index+1])<15812.43572736)
      this.setState({sC:'yellow'});
    else 
    this.setState({sC:'red'});
    
    if(parseFloat(b[index+1])<986.8435)
      this.setState({sC2:'green'});
    else if(parseFloat(b[index+1])>=986.8435&&parseFloat(b[index+1])<1083.1565)
      this.setState({sC2:'yellow'});
    else 
    this.setState({sC2:'red'});

    if(parseFloat(c[index+1])<15579.240338000001)
      this.setState({sC3:'green'});
    else if(parseFloat(c[index+1])>=15579.240338000001&&parseFloat(c[index+1])<16198.596098999999)
      this.setState({sC3:'yellow'});
    else 
    this.setState({sC3:'red'});

    if(parseFloat(d[index+1])>0.7){
      this.setState({nR:1});
    }
    else {
      this.setState({nR:0});
    }

    if(parseFloat(e[index+1])>0.7){
      this.setState({nR2:1});
    }
    else {
      this.setState({nR2:0});
    }


    if(parseFloat(f[index+1])>0.7){
      this.setState({nR3:1});
    }
    else {
      this.setState({nR3:0});
    }
    
  console.log(d[index-1],e[index-1],f[index-1]);
    this.setState({index:index+1});

  }

  backward = () => {
    var index = this.state.index;
    var a = this.state.a;
    var b = this.state.b;
    var c = this.state.c;
    var d = this.state.d;
    var e = this.state.e;
    var f = this.state.f;
    if(parseFloat(a[index-1])<15347.921667999999)
      this.setState({sC:'green'});
    else if(parseFloat(a[index-1])>=15347.921667999999&&parseFloat(a[index+1])<15812.43572736)
      this.setState({sC:'yellow'});
    else 
    this.setState({sC:'red'});
    
    if(parseFloat(b[index-1])<986.8435)
    this.setState({sC2:'green'});
  else if(parseFloat(b[index-1])>=986.8435&&parseFloat(b[index-1])<1083.1565)
    this.setState({sC2:'yellow'});
  else 
  this.setState({sC2:'red'});
  
  if(parseFloat(c[index-1])<15579.240338000001)
    this.setState({sC3:'green'});
  else if(parseFloat(c[index-1])>=15579.240338000001&&parseFloat(c[index-1])<16198.596098999999)
    this.setState({sC3:'yellow'});
  else 
  this.setState({sC3:'red'});
  
  if(parseFloat(d[index-1])>0.7){
    this.setState({nR:1});
  }
  else {
    this.setState({nR:0});
  }

  if(parseFloat(e[index-1])>0.7){
    this.setState({nR2:1});
  }
  else {
    this.setState({nR2:0});
  }


  if(parseFloat(f[index-1])>0.7){
    this.setState({nR3:1});
  }
  else {
    this.setState({nR3:0});
  }
  console.log(d[index-1],e[index-1],f[index-1]);
    this.setState({index:index-1});
  }

  render() {
    var tweetMarkers = this.state.tweets.map((tweet,i)=>{
      var x = tweet.location[0];
      var t = x.indexOf(",");
      var f = tweet.location[0].length -1;
      console.log(tweet.location[0].slice(1,t),tweet.location[0].slice(t+2,f));
      return (
      <Marker
      name={tweet.name}
      position={{ lat:parseFloat(tweet.location[0].slice(t+2,f)) , lng:parseFloat(tweet.location[0].slice(1,t))  }}
      key={i+4}
      icon='traffic.png'
    >{(
      <InfoWindow>
          <h4>{tweet.name}</h4>
      </InfoWindow>
  )}</Marker>);
    });

    if(this.state.lineCoordinates) {
    
    var newq =  <Polyline
      path={this.state.lineCoordinates[this.state.nR].overview_path}
      geodesic={false}
      options={{
          strokeColor: this.state.sC,
          strokeOpacity: 1,
          strokeWeight: 7,
      }}
  />;

  }
  else {
    var newq = null;
  }

  if(this.state.lineCoordinates2) {
    
    var newq2 =  <Polyline
      path={this.state.lineCoordinates2[this.state.nR2].overview_path}
      geodesic={false}
      options={{
          strokeColor: this.state.sC2,
          strokeOpacity: 1,
          strokeWeight: 7,
      }}
  />;

  }
  else {
    var newq2 = null;
  }

  if(this.state.lineCoordinates3) {
    
    var newq3 =  <Polyline
      path={this.state.lineCoordinates3[this.state.nR3].overview_path}
      geodesic={false}
      options={{
          strokeColor: this.state.sC3,
          strokeOpacity: 1,
          strokeWeight: 7,
      }}
  />;

  }
  else {
    var newq3 = null;
  }

    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 30.7112003, lng: 76.8098778 }}
        defaultZoom={13}
      >
      <Marker
      name={'Current location'}
      position={{ lat: 28.750616, lng: 77.116578 }}
      key={1}
    />
    
    <div className="hoollala">{tweetMarkers}
    </div>
    
    <Marker
      name={'Current location'}
      position={{ lat: 30.727546, lng: 76.844814 }}
      key={3}
      
    />
    <Marker
      position={{ lat: 30.752827, lng: 76.806375 }}
      key={2}
      
    />
    
    {newq}
    {newq2}
    {newq3}
      </GoogleMap>
    ));

    return (
      <div>
        <div style={{float:"right"}}>
        <p style={{padding:'20px'}}><b>Prediction Time - </b> {this.state.dates[this.state.index]}</p>
        <p style={{padding:'20px'}}><b>Duration from DTU to Infosys - </b> {Math.round(this.state.a[this.state.index]/60)} minutes</p>
        <p style={{padding:'20px'}}><b>Duration from Infosys to Rock Garden - </b> {Math.round(this.state.b[this.state.index]/60)} minutes</p>
        <p style={{padding:'20px'}}><b>Duration from Rock Garden to DTU - </b> {Math.round(this.state.c[this.state.index]/60)} minutes</p>
        </div>
        <GoogleMapExample
          containerElement={<div style={{ height: `800px`, width: "1500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <div style={{width:"1500px",textAlign:"center",padding:"30px"}}>
            <button style={{display:"inline-block"}} onClick={this.backward}>Backward</button>
            <button style={{display:"inline-block"}} onClick={this.forward}>Forward</button>
        </div>
      </div>
    );
  }
}

export default Map;
