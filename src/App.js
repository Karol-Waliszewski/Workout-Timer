import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// Pages
import Home from './pages/Home';
import Timer from './pages/Timer';
import Creator from './pages/Creator';

class App extends Component {
  constructor() {
    super();

    this.state = {
      workouts: [
        {
          id: 1,
          name: 'SUPER FRONT',
          exercises: [
            {
              name: 'front',
              time: 3
            }, {
              name: 'rest',
              time: 2
            }, {
              name: 'rest',
              time: 3
            }, {
              name: 'froncik',
              time: 4
            }, {
              name: 'planche',
              time: 6
            }
          ]
        }, {
          id: 2,
          name: "MEGA PLANCHE",
          exercises: [
            {
              name: 'front',
              time: 123
            }, {
              name: 'front',
              time: 32
            }
          ]
        }
      ]
    };

    this.saveWorkout = this.saveWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
  }

  async componentWillUpdate(props, state) {
    try {
      let db = await indexedDB.open('IntervalTimerKWaliszewski',1);
      let tx = db.transaction('store');
      let store = tx.objectStore('store');
      await store.put(state.workouts, 'workouts');
      console.log('Put done.');
      await tx;
      console.log('COmmited');
    } catch (err) {
      console.error(err.message);
    }
  }

  getWorkout(id) {
    for (let workout of this.state.workouts) {
      if (workout.id == id) {
        return workout;
      }
    }
  }

  saveWorkout(workout) {
    var found = false;
    let workouts = this.state.workouts.map(w => {
      if (w.id == workout.id) {
        found = true;
        return workout;
      } else {
        return w;
      }

    });
    if (!found) {
      workouts.push(workout);
    }
    this.setState({workouts});
  }

  deleteWorkout(id) {
    this.setState({
      workouts: this.state.workouts.filter(workout => workout.id != id)
    });
  }

  render() {
    var {
      state
    } = this;

    return (<Router>
      <Switch>
        <Route path="/" exact={true} render={() =>< Home workouts = {
            state.workouts
          }
          deleteWorkout = {
            this.deleteWorkout
          } />}/>
        <Route path="/timer/:id" render={(props) =>< Timer {
            ...props
          }
          getWorkout = {
            this.getWorkout.bind(this)
          } />}/>
        <Route path="/creator/:id" render={(props) => <Creator {...props} createdWorkouts={state.workouts.length} saveWorkout={this.saveWorkout} getWorkout={this.getWorkout.bind(this)}/>}/>
        <Route path="/creator" render={(props) => <Creator {...props} createdWorkouts={state.workouts.length} saveWorkout={this.saveWorkout}/>}/>
      </Switch>
    </Router>);
  }
}

export default App;
