// I wanted to do something with d3 but failed to integrate it with react :'c
import React, { Component } from 'react';

class Graph extends Component {
   constructor(props){
      super(props);
      this.state = {data : [], cant: 0, fullString: ''};
      this.fetchData = this.fetchData.bind(this);
   }
  
   fetchData(){
        fetch('/anonymous-graph').then(res => res.json())
        .then(resp => {
            let follow= resp.data.map((user, index) => {
                return {
                id: user.user,
                targets: user.follows
                }
            });
            let fullString = "";
            for (let i=0; i<follow.length; i++){
                let current = follow[i];
                fullString += current.id+ ":";
                for(let j=0; j<current.targets.length;j++){
                    if(j!=0) fullString+=",";
                    fullString+=current.targets[j];
                }
                if(i<follow.length-1) fullString+="\n";
            }
            console.log(fullString)
            this.setState({data: follow, cant: resp.numNodes, fullString: fullString});
        });
   }
     componentDidMount() {
      this.fetchData();
    }

    render() {
        return (
            <div>
                <h3>Current Anonymized Graph Info: <button className = "btn-primary" onClick= {this.fetchData()}>Refresh!</button> </h3>
                
                <textarea value={this.state.fullString} rows= {this.state.data.length} cols ="100">
                </textarea>
            </div>
        );
    }
}
export default Graph;