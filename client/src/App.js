import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import { setCurrentUser, logoutUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';
import React, { Component } from 'react';
import setAuthToken from './utils/setAuthToken';

import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';

import store from './store';

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info/exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        // Clear current profile
        store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <div className="container">
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/dashboard"
                                component={Dashboard}
                            />
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
