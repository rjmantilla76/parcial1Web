import React, { Component } from 'react';

import "./GithubUsers.css"

export default class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '',
                      following: ''};
    
    }
    render(){
        console.log(this.props.users);
        if(this.props.users === '' || this.props.users.length === 0){
            return (<div className="topText">
                
            </div>);
        }
        return <div className="row">
            {this.props.users.map(user =>
                (<div className ="user" id ={user.id} key={user.id} style={{height: 250, width: '100%'}} className="user col-5 row">
                    <div className="col-4">
                    <img className="profilePic img-fluid" src={user.avatar} alt="Profile pic" />
                    </div>
                   
                    <div className="col-7">
                    <center className="topText">
                        Username: <a target="_blank" href={user.url}> {user.login}</a>
                    </center>
                    
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => {
                            this.props.addUser(user.login)
                        }}>
                        Stalk
                    </button>
                    </div>

                    <div className="col-1">&nbsp;</div>
                </div>)
        ) }</div>;
    }
}