import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Workout from '../components/Workout';

// Styles
import '../styles/home.css';

class Home extends Component {
  render() {
    var {
      props
    } = this;
    if ('workouts' in props) {
      var workouts = props.workouts.map((workout, index) => <Workout workout={workout} key={index}/>)
    }
    var greating;
    var currentTime = new Date().getHours();
    if (5 < currentTime && currentTime < 12) {
      greating = <h1 className="header__heading">Good
        <br/>
        Morning</h1>;
    } else if (12 <= currentTime && currentTime < 18) {
      greating = <h1 className="header__heading">Good
        <br/>
        Afternoon</h1>;
    } else if (18 <= currentTime && currentTime < 22) {
      greating = <h1 className="header__heading">Good
        <br/>
        Evening</h1>;
    } else {
      greating = <h1 className="header__heading">Good
        <br/>
        Night</h1>;
    }

    return (<div>
      <header className="header">
        {greating}
        <p className="header__stats">Finished Workouts:
          <span>153</span>
        </p>
        <div className="header__icon">
          <FontAwesomeIcon icon="stopwatch" size="9x"/>
        </div>
      </header>
      <main className="container">
        <ul>{workouts && workouts}</ul>
      </main>
      <footer>
        <button className="actionButton">
          <FontAwesomeIcon icon="plus" size="sm" fixedWidth={true}/>
        </button>
      </footer>
    </div>);
  }
}

export default Home;
