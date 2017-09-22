import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Followers from './GithubUsers.js';
import Graph from './GraphComponent.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  following: '',
                  topText:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value, following: '', topText:''});
  }

  handleSubmit(event) {
    fetch('/getUsers/'+this.state.value)
      .then(res => res.json())
      .then(users => {
         if(users === {}){

           alert('Couldn\'t find the name ' + this.state.value);
           this.setState({following: ''});
         }
         let follow= users.map((user, index) => {
           return {
            id: `user_${index+1}`,
            login: user.login,
            avatar: user.avatar_url,
            url: user.html_url
           }
         });
        this.setState({following: follow});
      });
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <div className="App-header center">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Github stalking</h2>
        </div>
        <div className="Main">
          <div>
            <label>{this.state.topText!== '' && 'Stalk history: '}{this.state.topText} </label>
            <form onSubmit={this.handleSubmit} id="form1">
              <label>
                Username:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                
                <button type="submit" form="form1" value="Submit"  ref={input => this.buttonElement = input} > Stalk! </button>
              </label>
            </form>
          </div>
          <Followers users = {this.state.following} addUser={(user)=>
              {
                if(this.state.topText === ''){
                  this.setState({value: user, following: '', topText: this.state.value},()=> {this.buttonElement.click()});
                  
                } else{
                  this.setState({value: user, following: '', topText: this.state.topText+"->"+this.state.value},()=> {this.buttonElement.click()});
                }
              }
            } />
        </div>
        <div> 
            <Graph/>
        </div>
      </div>
    );
  }
}

export default App;
