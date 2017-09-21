import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import Followers from './GithubUsers.js';
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
         if(users == {}){

           alert('Couldn\'t find the name ' + this.state.value);
           this.setState({following: ''});
         }
         let follow= users.data.map((user, index) => {
           return {
            id: `user_${index+1}`,
            login: user.login,
            avatar: user.avatar_url,
            url: user.html_url
           }
         });
         console.log("ers "+follow[0].login );
        this.setState({following: follow});
      });
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Github stalking</h2>
          </div>
        <div className="Main">
          <div>
            <label>{this.state.topText} </label>
            <form onSubmit={this.handleSubmit}>
              <label>
                Username:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </form>
          </div>
          <Followers users = {this.state.following} addUser={(user)=>
              {
                if(this.state.topText === ''){
                  this.setState({value: user, following: '', topText: this.state.value});
                } else{
                  this.setState({value: user, following: '', topText: this.state.topText+"->"+this.state.value});
                }
              }
            } />
        </div>
      </div>
    );
  }
}

export default App;
