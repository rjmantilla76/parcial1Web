import React, { Component } from 'react';
import {Nav, NavItem, Navbar} from 'react-bootstrap';

export default class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '',
                      following: ''};
    
    }
    render(){
        console.log(this.props.users);
        if(this.props.users === ''){
            return <div></div>;
        }
        return<div>{this.props.users.map(user => {
            console.log(user);
            return 
        (<div id ={user.id} key={user.id} style={{height: 250, width: '100%'}} className="user col-5 row">
            <div className="col-4">
            <img className="profilePic img-fluid" src={user.avatar} alt="Profile pic" />
            </div>
            
            <div className="col-7">
            <center className="topText">
                <a target="_blank" href={user.url}> {user.login}</a>
            </center>
            
            <button type="button" className="btn btn-primary btn-lg" onClick={() => {
                    this.props.addUser(user.id)
                }}>
                Stalk
            </button>
            </div>

            <div className="col-1">&nbsp;</div>
        </div>);}
        ) }</div>;
    }
}