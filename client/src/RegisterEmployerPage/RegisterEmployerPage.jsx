import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { companyActions } from '../_actions';

class RegisterEmployerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: {
                employer_user_id : '',
                password: '',
                employer_name: '',
                employer_address: '',
                company_categories: 'test',
                logo: {}
                
            },
            submitted: false,
            file:null,
            imagePreviewUrl: ''
           
            
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { company } = this.state;
        this.setState({
            company: {
                ...company,
                [name]: value
            }
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { company, imagePreviewUrl} = this.state;
        const { dispatch } = this.props;
        if (company.employer_user_id && company.password && company.employer_name) {
            const _company = {
                employer_user_id : company.employer_user_id,
                password: company.password,
                employer_name: company.employer_name,
                employer_address: company.employer_address,
                company_categories: 'test',
                logo: {imagePreviewUrl}

            }
            console.log(_company);
            dispatch(companyActions.register(_company));
        }
    }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

    render() {
        const { registering  } = this.props;
        const { company, submitted } = this.state;
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
         } else {
            $imagePreview = (<div className="previewText"></div>);
                }
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1 align="center">Company SignUp</h1>
                <hr/>
                <label htmlFor="logo">Company Logo</label>
                    <div className="previewComponent">
                    <input className="btn btn-primary" type="file" onChange={(e)=>this._handleImageChange(e)} />
                        <div className="imgPreview">
                            {$imagePreview}
                        </div>
                    </div> 
                    <hr/>                          
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !company.employer_user_id ? ' has-error' : '')} >
                    <label htmlFor="employer_user_id">Company Email</label>
                        <input type="text" className="form-control" name="employer_user_id" value={company.employer_user_id} onChange={this.handleChange} placeholder="email@example.com"/>
                        {submitted && !company.employer_user_id &&
                            <div className="help-block">Company Email Address is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !company.employer_address ? ' has-error' : '')}>
                    <label htmlFor="employer_address">Company Address</label>
                    <textarea rows="10" cols="30" className="form-control"  name="employer_address" onChange={this.handleChange} ></textarea>
                    </div>
                    <div className={'form-group' + (submitted && !company.employer_name ? ' has-error' : '')}>
                    <label htmlFor="employer_name">Company Name</label>
                        <input type="text" className="form-control" name="employer_name" value={company.employer_name} onChange={this.handleChange} placeholder="Name"/>
                        {submitted && !company.employer_name &&
                            <div className="help-block">Company Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !company.password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={company.password} onChange={this.handleChange} placeholder="password"/>
                        {submitted && !company.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    
                   
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/loginEmployer" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registrationEmployer;
    return {
        registering
    };
}

const connectedRegisterEmployerPage = connect(mapStateToProps)(RegisterEmployerPage);
export { connectedRegisterEmployerPage as RegisterEmployerPage };