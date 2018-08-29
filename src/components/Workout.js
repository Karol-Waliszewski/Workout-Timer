import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Workout extends Component {
  render() {

    let {workout} = this.props;

    let totalTime = 0;
    for (let exercise of workout.exercises) {
      totalTime += exercise.time;
    }

    return (
      <li className="workout">
        <div className="workout__more">
          <button>edit</button>
          <button>delete</button>
        </div>
        <div>
          <h2 className="workout__title">{workout.name}</h2>
          <div className="workout__time">
            <FontAwesomeIcon icon={["far", "clock"]} fixedWidth={true}/>
            <span>{parseInt(totalTime / 60)}:{(totalTime % 60 < 10) ? "0" + totalTime % 60 : totalTime % 60}</span>
          </div>
        </div>
        <Link to={"timer/"+workout.id} className="workout__button">
          <FontAwesomeIcon icon="play" size="sm"/>
        </Link>
      </li>);
  }
}

export default Workout;
