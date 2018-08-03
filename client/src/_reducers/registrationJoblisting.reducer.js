import { joblistingConstants } from '../_constants';

export function registrationJoblisting(state = {}, action) {
  switch (action.type) {
    case joblistingConstants.REGISTER_REQUEST:
      return { registering: true };
    case joblistingConstants.REGISTER_SUCCESS:
      return {};
    case joblistingConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}