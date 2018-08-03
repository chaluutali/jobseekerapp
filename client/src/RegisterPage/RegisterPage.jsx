import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { documentService } from '../_services';
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                user_id : '',
                resume_id : '',
                password : '',
                employee_name : '',
                employee_address : '',
                category : {},
                keywords : {},
                years_exp : 0
                
            },
            submitted: false,
            file:null,
            _resume_id: '',
            
           
        };
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        
    }
    
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user, _resume_id } = this.state;
        const { dispatch } = this.props;
        if (user.user_id  && user.employee_name && user.password  && user.years_exp) {
            const _user = {
                user_id : user.user_id,
                resume_id : _resume_id,
                password : user.password,
                employee_name : user.employee_name,
                employee_address : user.employee_address,
                category : {},
                keywords : {},
                years_exp : user.years_exp

            }
            console.log(_user);
            dispatch(userActions.register(_user));
        }
    }

    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file);
        
      }
      onChange(e) {
        this.setState({file:e.target.files[0]})
      }
      fileUpload(file){
        this.setState({_resume_id: file.name})
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
         
          var urlFile = reader.result;
          const document = {
            documents_id : file.name,
            format_type : file.type,
            file_size : file.size,
            file_name : file.name,
            data_type : file.type,
            document : {urlFile}

          }
        documentService.register(document);
       

        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
         
         
        
      }
    
    render() {
        const { registering  } = this.props;
        const { user, submitted, file } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1 align="center">Job Seeker SignUp</h1>
                <hr/>
                <label htmlFor="file">CV (Word Document)</label>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                            <input className="form-control" onChange={this.onChange} type="file" />
                        </div>
                        <button className="btn btn-primary" type="submit" >Upload CV</button>    
                    </form>
                    <hr/>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.user_id ? ' has-error' : '')}>
                        <label htmlFor="user_id">Email Address</label>
                        <input type="text" className="form-control" name="user_id" value={user.user_id} onChange ={this.handleChange} placeholder="email@example.com"/>
                        {submitted && !user.user_id &&
                            <div className="help-block">Email Address is required</div>
                        }
                    </div>
                   
                    <div className={'form-group' + (submitted && !user.employee_name ? ' has-error' : '')}>
                        <label htmlFor="employee_name">Employee Name</label>
                        <input type="text" className="form-control" name="employee_name" value={user.employee_name} onChange={this.handleChange} placeholder="Name"/>
                        {submitted && !user.employee_name &&
                            <div className="help-block">Employee Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} placeholder="Password"/>
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.employee_address ? ' has-error' : '')}>
                        <label htmlFor="employee_address">Employee Address</label>
                        <textarea rows="10" cols="30" className="form-control"  name="employee_address" value={user.employee_address} onChange={this.handleChange} placeholder="Address"></textarea>
                        {submitted && !user.employee_address &&
                            <div className="help-block">Employee Address is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.years_exp ? ' has-error' : '')}>
                        <label htmlFor="years_exp">Years Experience</label>
                        <input type="number" className="form-control" name="years_exp" value={user.years_exp} onChange={this.handleChange} />
                        {submitted && !user.years_exp &&
                            <div className="help-block">Number of Years Experience is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" >Register</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };