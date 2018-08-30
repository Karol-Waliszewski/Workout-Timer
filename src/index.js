// React
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router-dom';
import App from './App';

// PWA
import registerServiceWorker from './registerServiceWorker';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStopwatch,faTrashAlt,faEdit,faCopy,faPlay,faStop,faPause,faPlus,faArrowLeft,faBars } from '@fortawesome/free-solid-svg-icons';
import { faEdit as fasEdit,faSave,faClock } from '@fortawesome/free-regular-svg-icons';

library.add(faStopwatch,faTrashAlt,faEdit,faCopy,faPlay,faPlus,faStop,faPause,fasEdit,faSave,faClock,faArrowLeft,faBars);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
