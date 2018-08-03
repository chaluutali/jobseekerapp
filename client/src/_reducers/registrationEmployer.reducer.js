import { companyConstants } from '../_constants';

export function registrationEmployer(state = {}, action) {
  switch (action.type) {
    case companyConstants.REGISTER_REQUEST:
      return { registering: true };
    case companyConstants.REGISTER_SUCCESS:
      return {};
    case companyConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}