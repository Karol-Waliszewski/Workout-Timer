import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Draggable} from 'react-beautiful-dnd';

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
  //
  // changeTime() {
  //   this.props.updateTime(this.props.index, Number(this.state.minutes) * 60 + Number(this.state.seconds));
  // }

  updateMinutes(ev) {
    var val = ev.target.value;
    this.setState({minutes: val});
    this.props.updateTime(this.props.index, Number(val) * 60 + Number(this.state.seconds));
  }

  updateSeconds(ev) {
    var val = ev.target.value;
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
          <div>
            <input type="text" className="exercise__name" value={props.name} onChange={this.changeName.bind(this)}/>
            <FontAwesomeIcon icon={["far", "clock"]} fixedWidth={true}/>
            <input type="number" min="0" className="exercise__time" value={state.minutes} onChange={this.updateMinutes}/>
            :
            <input type="number" min="0" max="59" className="exercise__time" value={state.seconds} onChange={this.updateSeconds}/>
          </div>
          <button className="exercise__button" onClick={() => props.copyExercise(props.index)}>
            <FontAwesomeIcon icon="copy" fixedWidth={true}/>
          </button>
          <button className="exercise__button" onClick={() => props.deleteExercise(props.index)}>
            <FontAwesomeIcon icon="trash-alt" fixedWidth={true}/>
          </button>
        </li>)
      }
    </Draggable>);
  }
}

export default Exercise;
