import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { documentService } from '../_services';
import { userActions, joblistingActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           
            job: {
                keywords : '',
                years_exp: 0 
            }
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleUpdate = this._handleUpdate.bind(this);
    }
    
    handleChange(event) {
        const { name, value } = event.target;
        const {job} = this.state;
        this.setState({
            job: {
                ...job,
                [name]: value
            }
        });
        
    }
    _handleChange(id,e) {
        e.preventDefault();
        var result = this.props.items.find(obj => {
            return obj.joblisting_id === id
          })
          documentService.getById(this.props.user.user.resume_id).then((data)=>{
            var applicant = {}, cart = [];
            applicant.id = this.props.user.user;
            applicant.cv = data;
            cart.push({applicant: applicant});
            var newcart = JSON.stringify(cart);
            const joblisting = {
                joblisting_id: result.joblisting_id,
                company : result.company,
                years_exp : result.years_exp,
                job_title : result.job_title,
                job_description : result.job_description,
                applicants : {newcart},
                keywords : {}
            }
            this.props.dispatch(joblistingActions.update(joblisting));

        });
      
    }
    _handleUpdate(e) {
        e.preventDefault();
        var result = this.props.items.find(obj => {
            return obj.keywords === this.props.user.user.keywords
          })
        console.log('isolation');
    }
    handleSubmit(event) {
        event.preventDefault();
        const { job } = this.state;
        const { dispatch } = this.props;
        if (job.keywords && job.years_exp) {
            dispatch(joblistingActions.getSearchResult(job))
        }
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(joblistingActions.getAllJobs());
        documentService.getById(this.props.user.user.resume_id).then((data)=>{
            console.log(data);
        });
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users, items } = this.props;
        let $jobPreview = null;
        if(items){
            
            $jobPreview = (<ol>
                {items.map((joblisting, ) =>
                <li key={joblisting.joblisting_id}>
                <label >Company Name: </label>{' '+joblisting.company + ' '}<label><br/><b>| Years_exp: </b></label>{' '+ joblisting.years_exp +'  '}<label><br/><b>| Job Title: </b></label>{' '+ joblisting.job_title+''}<br/><button className="btn btn-link" onClick={(e) => this._handleChange(joblisting.joblisting_id, e)}>Apply</button>
                </li>
                 )}
                </ol>);

        }
        else{

            $jobPreview = (<div className="previewText">No Job listings</div>);

        }
        const {job} = this.state;
        return (
            <div className="col-md-12 ">
                <h1 align = "center">Hi {user.user.employee_name}!</h1>
                <hr/>
                <label htmlFor="job_title">Search by keywords</label>
                <input type="text" className="form-control" name="keywords" placeholder="Search" value={job.keywords} onChange={this.handleChange}/>
                <hr/>
                <label htmlFor="job_title" >Years Experience</label>
                <input type="number" className="form-control" name="years_exp"  value={job.years_exp} onChange={this.handleChange}/>
                <hr/>
                <div className="form-group" align = "center">
                <button className="btn btn-primary" onClick= {this._handleUpdate}>Matches</button>
                <button className="btn btn-success" onClick= {this.handleSubmit}>Search</button>
               
                <button className="btn btn-link">
                    <Link to="/login">Logout</Link>
                </button>
                 </div>
                <h2 align = "center"><b>Available Jobs</b></h2>
                <div className="imgPreview">
                            {$jobPreview}
                        </div>      
               
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    const{items} = state.joblistings;
    
    
    return {
        user,
        users,
        items
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };