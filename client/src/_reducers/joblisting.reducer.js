import { joblistingConstants } from '../_constants';

const initialState = joblisting ? { joblisting } : {};

export function joblisting(state = initialState, action) {
  switch (action.type) {
    case joblistingConstants.GETBYID_REQUEST:
      return {
        joblisting: action.joblisting
      };
    case joblistingConstants.GETBYID_SUCCESS:
      return {
        joblisting: action.joblisting
      };
    case joblistingConstants.GETBYID_FAILURE:
      return {};
    case joblistingConstants.LOGOUT:
      return {};
    default:
      return state
  }
}