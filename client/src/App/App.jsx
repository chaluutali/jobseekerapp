import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, PrivateEmployerRoute } from '../_components';
import { HomePage } from '../HomePage';
import { EditJobPage } from '../EditJobPage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { HomeEmployerPage } from '../HomeEmployerPage';
import { LoginEmployerPage } from '../LoginEmployerPage';
import { RegisterEmployerPage } from '../RegisterEmployerPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/loginEmployer" component={LoginEmployerPage} />
                                <Route path="/registerEmployer" component={RegisterEmployerPage} />
                                <PrivateEmployerRoute exact path="/company" component={HomeEmployerPage} />
                                <PrivateEmployerRoute exact path="/company/job" component={EditJobPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 