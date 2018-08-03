import { companyConstants } from '../_constants';

let company = JSON.parse(localStorage.getItem('company'));
const initialState = company ? { loggedIn: true, company } : {};

export function authenticationEmployer(state = initialState, action) {
  switch (action.type) {
    case companyConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        company: action.company
      };
    case companyConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        company: action.company
      };
    case companyConstants.LOGIN_FAILURE:
      return {};
    case companyConstants.LOGOUT:
      return {};
    default:
      return state
  }
}