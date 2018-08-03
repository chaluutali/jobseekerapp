import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { joblistingActions } from '../_actions';


class EditJobPage extends React.Component {
   
    render() {
      // todo

        return (
            <div className="col-md-6 col-md-offset-3">
                 <h1>Applicants</h1>
                 <Link to="/company">Logout</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const{joblisting} = state.joblisting;
    return {
       joblisting
    };
}

const connectedEditJobPage = connect(mapStateToProps)(EditJobPage);
export { connectedEditJobPage as EditJobPage };