import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';

// Components
import Workout from '../components/Workout';

// Styles
import '../styles/home.css';
import '../styles/modal.css';

Modal.setAppElement('#root');

class Home extends Component {

  constructor() {
    super();
    this.state = {
      editMode: false,
      isModalOpen: false,
      finishedWorkouts: 0
    };

    this.modalOpenedBy = null;

    this.toggleEdit = this.toggleEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  toggleEdit() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  confirmDelete() {
    this.closeModal();
    this.props.deleteWorkout(this.modalOpenedBy);
    this.modalOpenedBy = null;
  }

  render() {
    var {
      props,
      state
    } = this;
    if ('workouts' in props) {
      var workouts = props.workouts.map((workout, index) => <Workout workout={workout} key={workout.id} active={this.state.editMode} delete={() => {
          this.openModal();
          this.modalOpenedBy = workout.id;
        }}/>)
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

    return (<div className="home">
      <header className="header">
        {greating}
        <p className="header__stats">Finished Workouts: {state.finishedWorkouts}</p>
        <div className="header__icon">
          <FontAwesomeIcon icon="stopwatch" size="9x"/>
        </div>
      </header>
      <main className="home__container">
        <ul>{workouts && workouts}</ul>
      </main>
      <footer className="actionButtons">
        <button onClick={this.toggleEdit} className="actionButtons__button">
          <FontAwesomeIcon icon="bars" size="xs" fixedWidth={true}/>
        </button>
        <Link to="/creator" className="actionButtons__button">
          <FontAwesomeIcon icon="plus" size="xs" fixedWidth={true}/>
        </Link>
      </footer>
      <Modal className="modal--home" isOpen={state.isModalOpen} closeTimeoutMS={300}>
        <h2 className="modal__heading">Do you want to delete this workout?</h2>
        <footer className="modal__footer">
          <button onClick={this.confirmDelete} className="modal__button--accept">Yes</button>
          <button onClick={this.closeModal} className="modal__button--decline">No</button>
        </footer>
      </Modal>
    </div>);
  }
}

export default Home;
