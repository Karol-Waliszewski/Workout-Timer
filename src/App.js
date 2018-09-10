import React, { Component } from "react";
import {BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
//import {createBrowserHistory, createHashHistory} from "history";

// Pages
import Home from "./pages/Home";
import Timer from "./pages/Timer";
import Creator from "./pages/Creator";

// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

function createRouter() {
  return window.matchMedia("(display-mode: standalone)").matches ? HashRouter : BrowserRouter;
}

const Router = createRouter();

class App extends Component {
  state = {
    workouts: [],
    finishedWorkouts: 0
  };

  //history = createHistory();

  constructor() {
    super();
    // Open (or create) the database
    var open = indexedDB.open("WorkoutTimerDatabase");

    // Create the schema
    open.onupgradeneeded = function() {
      var db = open.result;
      var store = db.createObjectStore("WorkoutStore", {
        keyPath: "id"
      });
    };

    open.onsuccess = () => {
      // Start a new transaction
      var db = open.result;
      var tx = db.transaction("WorkoutStore", "readwrite");
      var store = tx.objectStore("WorkoutStore");

      // Query the data
      var getAll = store.getAll();

      getAll.onsuccess = () => {
        this.setState({ workouts: getAll.result.reverse() });
      };

      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };
    };

    this.saveWorkout = this.saveWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
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

    // Open the database
    var open = indexedDB.open("WorkoutTimerDatabase");

    open.onsuccess = function() {
      // Start a new transaction
      var db = open.result;
      var tx = db.transaction("WorkoutStore", "readwrite");
      var store = tx.objectStore("WorkoutStore");

      store.put(workout);

      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };
    };

    this.setState({ workouts });
  }

  deleteWorkout(id) {
    this.setState({
      workouts: this.state.workouts.filter(workout => workout.id != id)
    });

    // Open (or create) the database
    var open = indexedDB.open("WorkoutTimerDatabase");

    open.onsuccess = function() {
      // Start a new transaction
      var db = open.result;
      var tx = db.transaction("WorkoutStore", "readwrite");
      var store = tx.objectStore("WorkoutStore");

      store.delete(id);

      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };
    };
  }

  render() {
    var { state } = this;

    return <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={"/"} exact={true} render={() => <Home workouts={state.workouts} deleteWorkout={this.deleteWorkout} />} />
          <Route path={"/timer/:id"} render={props => <Timer {...props} getWorkout={this.getWorkout.bind(this)} />} />
          <Route path={"/creator/:id"} render={props => <Creator {...props} createdWorkouts={state.workouts.length} saveWorkout={this.saveWorkout} getWorkout={this.getWorkout.bind(this)} />} />
          <Route path={"/creator"} render={props => <Creator {...props} createdWorkouts={state.workouts.length} saveWorkout={this.saveWorkout} />} />
        </Switch>
      </Router>;
  }
}

export default App;
