import axios from "axios";
import React from "react";

export default class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "",
      destination: "",
      date: "",
      result: ""
    }
    this.sourceChange = this.sourceChange.bind(this);
    this.destinationChange = this.destinationChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.findRate = this.findRate.bind(this);
    this.petitionAPI = this.petitionAPI.bind(this);
  }
  
  sourceChange(event) {
    let text = event.target.value;
    text = text.toUpperCase();    
    let correctText = "";
    let hayNumeros = false;
    for (let i = 0; i < text.length; i++) {
        let assciCode = text.charAt(i).charCodeAt();
        if(assciCode>=48 && assciCode<=57) {
          hayNumeros = true;
        }
    }
    if(!hayNumeros) {
      if(text.length <=3) {
        for (let i = 0; i < text.length; i++) {
        let assciCode = text.charAt(i).charCodeAt();
        if(assciCode>=65 && assciCode<=90) {
          correctText += text.charAt(i);
        }
      }
      this.setState({source: correctText}); 
    } else {
      for (let i = 0; i < 3; i++) {
        correctText += text.charAt(i);
      }
      this.setState({source: correctText});
    }
    }    
  }
  
  destinationChange(event) {     
    let text = event.target.value;
    text = text.toUpperCase();
    let correctText = "";
    let hayNumeros = false;
    for (let i = 0; i < text.length; i++) {
        let assciCode = text.charAt(i).charCodeAt();
        if(assciCode>=48 && assciCode<=57) {
          hayNumeros = true;
        }
    }
    if(!hayNumeros) {
      if(text.length <=3) {
        for (let i = 0; i < text.length; i++) {
        let assciCode = text.charAt(i).charCodeAt();
        if(assciCode>=65 && assciCode<=90) {
          correctText += text.charAt(i);
        }
      }
      this.setState({destination: correctText}); 
    } else {
      for (let i = 0; i < 3; i++) {
        correctText += text.charAt(i);
      }
      this.setState({destination: correctText});
    }
    }    
  }
  
  dateChange(event) {
    let text = event.target.value;
    let correctDate = "";
    let hayCaracter = false;
    for (let i = 0; i < text.length; i++) {
        let assciCode = text.charAt(i).charCodeAt();
        if(assciCode>=33 && assciCode<=41) {
          hayCaracter = true;
        }
    }
    if(!hayCaracter) {
      if(text.length <=10) {
        for (let i = 0; i < text.length; i++) {
        let assciCode = text.charAt(i).charCodeAt();
        if(assciCode==45 || assciCode>=48 && assciCode<=57) {
          correctDate += text.charAt(i);
        }
      }
      this.setState({date: correctDate});
    } else {
      for (let i = 0; i < 10; i++) {
        correctDate += text.charAt(i);
      }
      this.setState({date: correctDate});
    }
    }    
  }
  
  resetFields() {
    this.setState({
      source: "",
      destination: "",
      date: "",
    });
  }
  
  findRate() {
    if(this.state.source.length==3 && this.state.destination.length==3 && this.state.date.length==10){
      this.petitionAPI();
    } else {
      this.setState({
        result: "Please complete each field"
      });
    }
  }
  
  async petitionAPI() {
    const baseQuery = "https://api.exchangeratesapi.io/";
    const date = this.state.date;
    const base = this.state.source;
    const destination = this.state.destination;
    const completeQuery = baseQuery+date+"?base="+base;
    const peticion = await axios.get(completeQuery)
    .then(response =>{      
      this.setState({
        result: response.data.rates[destination]
      })
    })
      .catch(error => {
        this.setState({
          result: error.response.data.error
        })
    })
   }
  
  render() {
    return (
      <div>
        Currency Source: <input className="currency-source" value={this.state.source} onChange={this.sourceChange} placeholder="USD"/>
        <br></br>
        Currency destination: <input className="currency-destination" value={this.state.destination} onChange={this.destinationChange} placeholder="COP"/>
        <br></br>
        Currency date: <input className="currency-date" value={this.state.date} onChange={this.dateChange} placeholder="2020-10-31"/>
        <br></br>
        <button className="find-rate" onClick={this.findRate}> Find Rate </button>
        <br></br>
        <button className="reset-fields" onClick={this.resetFields}> Reset fields </button>
        <br></br>
        <div className="conversion-result" >{this.state.result}</div>
      </div>
    );
  }
}