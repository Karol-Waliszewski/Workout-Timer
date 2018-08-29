import React, {Component} from 'react';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'

// Pages
import Home from './pages/Home';
import Timer from './pages/Timer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      workouts: [
        {id:1,
          name: 'SUPER FRONT',
          exercises: [{name:'front',time:3},{name:'rest',time:2},{name:'rest',time:3},{name:'froncik',time:4}]
        }, {
          id:2,
          name: "MEGA PLANCHE",
          exercises: [{name:'front',time:123},{name:'front',time:32}]
        }
      ]
    }
  }

  getWorkout(id){
    for(let workout of this.state.workouts){
      if(workout.id == id){
        return workout
      }
    }
  }

  render() {
  var {state} = this;

    return (<Router>
      <Switch>
        <Route path="/" exact={true} render={()=><Home workouts={state.workouts}/>} />
        <Route path="/timer/:index" render={(props)=><Timer {...props} getWorkout={this.getWorkout.bind(this)}/>} />
      </Switch>
    </Router>);
  }
}

export default App;
