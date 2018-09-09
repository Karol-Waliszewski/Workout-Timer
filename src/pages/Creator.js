import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Modal from "react-modal";

import Exercise from "../components/Exercise";

// Styles
import "../styles/creator.css";

var createHash = require("hash-generator");

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Creator extends Component {
  constructor() {
    super();
    this.state = {
      id: createHash(10),
      name: "Workout's title",
      exercises: [],
      isModalOpen: false
    };

    this.updateTime = this.updateTime.bind(this);
    this.updateName = this.updateName.bind(this);
    this.copyExercise = this.copyExercise.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);

    this.onDragEnd = this.onDragEnd.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.saveWorkout = this.saveWorkout.bind(this);
  }

  componentDidMount() {
    let { props } = this;
    if ("match" in props) {
      if("id" in props.match.params){
        let { id, name, exercises } = props.getWorkout(props.match.params.id);
        this.setState({ id, name, exercises });
      }
    }
  }

  saveWorkout(e) {
    let { id, exercises, name } = this.state;
    if (exercises.length == 0) {
      this.openModal();
      e.preventDefault();
      return;
    }
    let workout = {
      id,
      exercises,
      name
    };
    this.props.saveWorkout(workout);
  }

  updateName(index, name) {
    let { exercises } = this.state;
    exercises[index].name = name;
    this.setState({ exercises });
  }

  updateTime(index, time) {
    let { exercises } = this.state;
    exercises[index].time = time;
    this.setState({ exercises });
  }

  copyExercise(index) {
    let { exercises } = this.state;
    exercises.push(Object.assign({}, exercises[index]));
    this.setState({ exercises });
  }

  deleteExercise(index) {
    let { exercises } = this.state;
    exercises.splice(index, 1);
    this.setState({ exercises });
  }

  addExercise() {
    let { exercises } = this.state;
    exercises.push({ name: "Exercise's name", time: 30 });
    this.setState({ exercises });
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const exercises = reorder(
      this.state.exercises,
      result.source.index,
      result.destination.index
    );
    this.setState({ exercises });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    var { state, props } = this;

    var exercises = state.exercises.map((exercise, index) => (
      <Exercise
        key={index}
        index={index}
        {...exercise}
        updateName={this.updateName}
        updateTime={this.updateTime}
        copyExercise={this.copyExercise}
        deleteExercise={this.deleteExercise}
      />
    ));

    return (
      <div className="creator">
        <header className="header">
          <h1 className="header__textarea">
            <textarea
              value={state.name}
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
            />
          </h1>
          <p className="header__stats">
            Created Workouts: {props.createdWorkouts}
          </p>
          <div className="header__icon">
            <FontAwesomeIcon icon={["far", "edit"]} size="9x" />
          </div>
        </header>
        <main className="creator__container">
          <div className="creator__workout">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="exercises">
                {provided => (
                  <ol ref={provided.innerRef} {...provided.droppableProps}>
                    {exercises}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>
            </DragDropContext>
            <div className="workout__add">
              <p>Add Exercise</p>
              <button
                className="workout__button"
                onClick={this.addExercise.bind(this)}
              >
                <FontAwesomeIcon icon="plus" size="xs" fixedWidth={true} />
              </button>
            </div>
          </div>
        </main>
        <footer className="actionButtons">
          <Link to="/" className="actionButtons__button">
            <FontAwesomeIcon icon={"times"} size="xs" fixedWidth={true} />
          </Link>
          <Link
            to="/"
            className="actionButtons__button"
            onClick={this.saveWorkout}
          >
            <FontAwesomeIcon
              icon={["far", "save"]}
              size="xs"
              fixedWidth={true}
            />
          </Link>
        </footer>
        <Modal
          className="modal--creator"
          isOpen={state.isModalOpen}
          closeTimeoutMS={300}
        >
          <h2 className="modal__heading">
            You have to create at least one exercise.
          </h2>
          <button onClick={this.closeModal} className="modal__button--creator">
            I understand
          </button>
        </Modal>
      </div>
    );
  }
}

export default Creator;
