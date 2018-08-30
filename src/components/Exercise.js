import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Draggable} from 'react-beautiful-dnd';

class Exercise extends Component {

  changeName(ev) {
    this.props.updateName(this.props.index, ev.target.value);
  }

  changeTime(ev) {
    this.props.updateTime(this.props.index, ev.target.value);
  }

  render() {
    var {
      props
    } = this;
    return (<Draggable draggableId={props.index} index={props.index}>
      {
        provided => (<li className="exercise" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <p className="exercise__index">{props.index + 1}</p>
          <div>
            <input type="text" className="exercise__name" value={props.name} onChange={this.changeName.bind(this)}/>
            <input type="number" className="exercise__time" defaultValue="30" onChange={this.changeTime.bind(this)}/>
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
