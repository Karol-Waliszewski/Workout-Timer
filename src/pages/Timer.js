import React, { Component } from "react";
import Sound from "react-sound";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoSleep from "nosleep.js";
import Push from "push.js";

import Countdown from "../components/Countdown";
import Icon from "../img/icon.png";
import "../styles/timer.css";

class Timer extends Component {
  constructor() {
    super();
    // state
    this.state = {
      isRunning: false,
      isPlaying: "STOPPED",
      currentIndex: 0
    };

    this.wakeLock = new NoSleep();

    // refs
    this.countDown = React.createRef();

    // binds
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
  }

  start() {
    this.setState({ isRunning: true });
    this.countDown.current.start();
    this.wakeLock.enable();
  }

  pause() {
    this.setState({ isRunning: false });
    this.countDown.current.pause();
    this.wakeLock.disable();
  }

  reset() {
    this.pause();
    this.countDown.current.reset();
  }

  playSound() {
    let durration = 3; // seconds
    this.setState({ isPlaying: "PLAYING" });
    setTimeout(() => {
      this.setState({ isPlaying: "STOPPED" });
    }, durration * 1000);
  }

  onFinish() {
    let { state, props } = this;
    if (
      state.currentIndex ==
      props.getWorkout(props.match.params.id).exercises.length - 1
    ) {
      this.setState({ isRunning: false });
      this.setState({ currentIndex: 0 });
      this.reset();
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
      this.reset();
      this.start();
    }
    this.playSound();
    Push.create(
      "Workout Timer",
      {
          body: `${props.getWorkout(props.match.params.id).exercises[state.currentIndex].name} finished`,
          icon: Icon,
          timeout: 6000,
          vibrate: [100,50,100]
      }
    );
  }

  render() {
    let { state, props } = this;
    let workout = props.getWorkout(props.match.params.id);

    return (
      <div className="wrapper">
        <Sound
          url="https://raw.githubusercontent.com/Karol-Waliszewski/Workout-Timer/master/src/audio/beep.mp3"
          playStatus={state.isPlaying}
        />
        <div className="container">
          <Link to="/" className="backArrow" onClick={this.pause}>
            <FontAwesomeIcon icon="arrow-left" size="lg" />
          </Link>
          <h1 className="heading" id="title">
            {workout.exercises[state.currentIndex].name}
          </h1>
          <Countdown
            ref={this.countDown}
            onFinish={this.onFinish.bind(this)}
            time={workout.exercises[state.currentIndex].time}
          />
          <div className="controls">
            <button className="controls__button" onClick={this.reset}>
              <FontAwesomeIcon icon="stop" fixedWidth={true} size="xs" />
            </button>
            {this.state.isRunning ? (
              <button className="controls__button" onClick={this.pause}>
                <FontAwesomeIcon icon="pause" fixedWidth={true} size="xs" />
              </button>
            ) : (
              <button className="controls__button" onClick={this.start}>
                <FontAwesomeIcon icon="play" fixedWidth={true} size="xs" />
              </button>
            )}
          </div>

          <div className="stats">
            <p className="stats__text">
              Exercise:{" "}
              {
                workout.exercises.filter(
                  (exercise, i) =>
                    exercise.name.toLowerCase() != "rest" &&
                    i <= state.currentIndex
                ).length
              }
              /
              {
                workout.exercises.filter(
                  exercise => exercise.name.toLowerCase() != "rest"
                ).length
              }
            </p>
          </div>
          <div className="next">
            <div>
              <p className="next__text--small">Next</p>
              <p className="next__text">
                {typeof workout.exercises[state.currentIndex + 1] == "undefined"
                  ? "Finish"
                  : workout.exercises[state.currentIndex + 1].name}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
