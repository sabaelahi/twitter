import React  , {Suspense}from 'react';
import ReacDOM from 'react-dom';
import App from './components/App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';

ReacDOM.render(
            <Suspense fallback={<div></div>}>
            <App/>
            </Suspense>,
        document.getElementById('root'));
serviceWorker.register();
