import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import storeConfig from './store/storeConfig';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';
import { firebase } from './firebase/firebase';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = storeConfig();

const state = store.getState();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.querySelector(".app"));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.querySelector(".app"));

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        console.log('Logged in');
        store.dispatch(login(user.uid));
        renderApp();
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }

    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
        console.log('Logged Out');
    }
});