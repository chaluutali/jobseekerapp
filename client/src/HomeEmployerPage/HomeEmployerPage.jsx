import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { joblistingActions } from '../_actions';

class HomeEmployerPage extends React.Component {
    
    
    constructor(props) {
        super(props);

        this.state = {
           
            joblisting: {
                company : this.props.company.employer_user_id,
                years_exp :0,
                job_title : '',
                job_description : '',
                applicants : {},
                keywords : {}
                
            },
            submitted: false
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleUpdate = this._handleUpdate.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(joblistingActions.getAll(this.props.company.employer_user_id));
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { joblisting } = this.state;
        this.setState({
            joblisting: {
                ...joblisting,
                [name]: value
            }
        });
        
    }
    _handleChange(id,e) {
        e.preventDefault();
        var result = this.props.items.find(obj => {
            return obj.joblisting_id === id
          })
        this.setState({
            joblisting: result
        });  
    }
    _handleUpdate(e) {
        e.preventDefault();
        console.log('isolation');
    }
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { joblisting } = this.state;
        const { dispatch } = this.props;
        if (joblisting.job_title && joblisting.years_exp) {
            dispatch(joblistingActions.register(joblisting))
        }
    }
   

    render() {
        const { registering, items} = this.props;
        const { submitted, joblisting} = this.state;
        let $jobPreview = null;
        if (items) {
            $jobPreview = (<div className="previewText">
            <ol>
            {items.map((joblisting, ) =>
                <li key={joblisting.joblisting_id}>
                   <button className="btn btn-link" key={joblisting.joblisting_id} onClick={(e) => this._handleChange(joblisting.joblisting_id, e)}>Edit</button><label><b>Job Title : </b></label>{' '+ joblisting.job_title + ' '}<button className="btn btn-link"><Link to="/company/job" className="btn btn-link" >View</Link></button> <label><b>Applicants: </b></label>{' '+ joblisting.years_exp}
    
                </li>
            )}
        </ol></div>);
         } else {
            $jobPreview = (<div className="previewText">No Job listings</div>);
                }
        
        return (
            <div className="col-md-6 col-md-offset-3">
            <h1 align="center">Job Listing</h1>
               <h2 align="center">{joblisting.company}</h2>
               <hr/>
               <form name="form" onSubmit={this.handleSubmit}>
            <div className={'form-group' + (submitted && !joblisting.job_title ? ' has-error' : '')} >
            <label htmlFor="job_title">Job Title</label>
                <input type="text" className="form-control" name="job_title" value={joblisting.job_title} onChange={this.handleChange} placeholder="Title"/>
                {submitted && !joblisting.job_title &&
                    <div className="help-block">Job Title is required</div>
                }
            </div>
            <div className={'form-group' + (submitted && !joblisting.job_description ? ' has-error' : '')}>
            <label htmlFor="job_description">Job Description</label>
            <textarea rows="10" cols="30" className="form-control"  name="job_description" value={joblisting.job_description} onChange={this.handleChange} placeholder="Description" ></textarea>
                {submitted && !joblisting.job_description &&
                    <div className="help-block">Job Description is required</div>
                }
            </div>
            <div className={'form-group' + (submitted && !joblisting.years_exp ? ' has-error' : '')}>
            <label htmlFor="years_exp">Years Experience</label>
                <input type="number" className="form-control" name="years_exp" value={joblisting.years_exp} onChange={this.handleChange} placeholder="Years Experience"/>
                {submitted && !joblisting.years_exp &&
                    <div className="help-block">Years of Experience is required</div>
                }
            </div>
           
            <div className="form-group" align = "center">
                <button className="btn btn-primary" onClick={this._handleUpdate}>Update</button>
                <button className="btn btn-success">Add Job</button>
                {registering && 
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                <button className="btn btn-link">
                    <Link to="/loginEmployer">Logout</Link>
                </button>
            </div>
        </form>
                        
                <hr/>
                 <h2 align="center"> Current Listings </h2>
                 <hr/>
                 <div className="imgPreview">
                            {$jobPreview}
                        </div>      
                
                 
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { registering} = state.registrationJoblisting;
    const{items} = state.joblistings;
    const{joblisting} = state.joblisting;
    const{company} =state.authenticationEmployer.company;
   
  
    
    return {
        registering,
        items,
        joblisting,
        company
    
    };
}


const connectedHomeEmployerPage = connect(mapStateToProps)(HomeEmployerPage);
export { connectedHomeEmployerPage as HomeEmployerPage };