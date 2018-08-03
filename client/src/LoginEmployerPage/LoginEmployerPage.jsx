import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { companyActions } from '../_actions';


class LoginEmployerPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(companyActions.logout());

        this.state = {
            employer_user_id: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { employer_user_id, password } = this.state;
        const { dispatch } = this.props;
        if (employer_user_id && password) {
            dispatch(companyActions.login(employer_user_id, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { employer_user_id, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1 align="center">Login</h1>
                <h1 align="center"><i className="fas fa-user-slash fa-2x"></i></h1>
                <h2 align = "center">Company</h2>
                <hr/>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !employer_user_id ? ' has-error' : '')}>
                    <label htmlFor="employer_user_id">Email Address</label>
                        <input type="text" className="form-control" name="employer_user_id" value={employer_user_id} onChange={this.handleChange} placeholder="email@example.com" />
                        {submitted && !employer_user_id &&
                            <div className="help-block">Email address is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group" >
                        <button className="btn btn-success">Login</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/registerEmployer" className="btn btn-primary" >Register</Link>
                        
                        <Link to="/login" className="btn btn-link">Jobseeker SignUp / SignIn</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authenticationEmployer;
    return {
        loggingIn
    };
}

const connectedLoginEmployerPage = connect(mapStateToProps)(LoginEmployerPage);
export { connectedLoginEmployerPage as LoginEmployerPage }; 