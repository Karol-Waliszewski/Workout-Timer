import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Draggable} from 'react-beautiful-dnd';

import '../styles/exercise.css';

class Exercise extends Component {

  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 30
    };

    this.updateMinutes = this.updateMinutes.bind(this);
    this.updateSeconds = this.updateSeconds.bind(this);
  }

  componentDidMount() {
    this.setState({
      minutes: parseInt(this.props.time / 60),
      seconds: this.props.time % 60
    })
  }

  changeName(ev) {
    this.props.updateName(this.props.index, ev.target.value);
  }

  updateMinutes(ev) {
    var val = ev.target.value;
    val = val.slice(0, 2);
    this.setState({minutes: val});
    this.props.updateTime(this.props.index, Number(val) * 60 + Number(this.state.seconds));
  }

  updateSeconds(ev) {
    var val = ev.target.value;
    val = val.slice(0, 2);
    this.setState({seconds: val});
    this.props.updateTime(this.props.index, Number(this.state.minutes) * 60 + Number(val));
  }

  render() {
    var {
      props,
      state
    } = this;

    return (<Draggable draggableId={props.index} index={props.index}>
      {
        provided => (<li className="exercise" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <p className="exercise__index">{props.index + 1}</p>
          <div className="exercise__content">
            <div>
              <input type="text" className="exercise__name" value={props.name} onChange={this.changeName.bind(this)}/>
              <div className="exercise__timer">
                <FontAwesomeIcon icon={["far", "clock"]} fixedWidth={true}/>
                <input type="number" min="0" className="exercise__time--left" value={state.minutes} onChange={this.updateMinutes}/>
                <span className="exercise__divide">:</span>
                <input type="number" min="0" max="59" className="exercise__time--right" value={state.seconds} onChange={this.updateSeconds}/>
              </div>
            </div>
            <div className="exercise__buttons">
              <svg width="0" height="0">
                <radialGradient id="rg" r="150%" cx="30%" cy="107%">
                  <stop stop-color="#56A5E1" offset="0"/>
                  <stop stop-color="#1FD989" offset="0.9"/>
                </radialGradient>
              </svg>
              <button className="exercise__button" onClick={() => props.copyExercise(props.index)}>
                <FontAwesomeIcon icon="copy" fixedWidth={true}/>
              </button>
              <button className="exercise__button" onClick={() => props.deleteExercise(props.index)}>
                <FontAwesomeIcon icon="trash-alt" fixedWidth={true}/>
              </button>
            </div>
          </div>
        </li>)
      }
    </Draggable>);
  }
}

export default Exercise;
