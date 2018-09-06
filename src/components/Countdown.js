import React, {Component} from 'react';
import ProgressBar from 'progressbar.js';

class Countdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime: this.props.time || 5,
      time: this.props.time || 5,
      clock: null
    }
    this.ms = 0;

  }

  componentDidMount() {
    this.progressBar = new ProgressBar.Circle(document.getElementById('progress'), {
      strokeWidth: 3,
      color: '#FFFFFF',
      trailColor: '#FFFFFF',
      trailWidth: 1,
      svgStyle: {
        width: "100%",
        display: "block"
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.startTime != nextProps.time) {
      this.setState({
        startTime: nextProps.time || 5,
        time: nextProps.time || 5
      });
    }
  }

  countDown() {
    let {state} = this;
    this.ms++;
    var ms = this.ms;
    if (ms % 250 == 0 && ms != 0) {
      if (state.time > 0) {
        this.setState({
          time: state.time - 1
        });
      }
    }
    if (state.time == 0) {
      this.pause();
      this.props.onFinish();
    }
  }

  start() {
    clearInterval(this.state.clock);
    this.state.clock = setInterval(this.countDown.bind(this), 4);
    this.progressBar.animate(1, {
      duration: 1000 * (this.state.startTime) * (1 - this.progressBar.value())
    })
  }

  pause() {
    clearInterval(this.state.clock);
    this.state.clock = null;
    this.progressBar.stop();
  }

  reset() {
    this.setState({time: this.state.startTime});
    this.ms = 0;
    this.progressBar.set(0);
  }

  render() {
    let {state, props} = this;

    return (<div className="timer" id="progress">
      <p className="timer__time">
        {parseInt(state.time / 60)}:{
          (state.time % 60 < 10)
            ? "0" + state.time % 60
            : state.time % 60
        }
      </p>
    </div>);
  }
}

export default Countdown;
