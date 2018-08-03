import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { authenticationEmployer } from './authenticationEmployer.reducer';

import { registration } from './registration.reducer';
import { registrationEmployer } from './registrationEmployer.reducer';
import { registrationJoblisting } from './registrationJoblisting.reducer';
import { users } from './users.reducer';
import { companys } from './companys.reducer';
import {joblistings} from './joblistings.reducer';
import {joblisting} from './joblisting.reducer';

import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  authenticationEmployer,
  registration,
  registrationEmployer,
  registrationJoblisting,
  users,
  companys,
  joblistings,
  joblisting,
 
  alert
});

export default rootReducer;