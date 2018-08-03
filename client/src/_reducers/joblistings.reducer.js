import { joblistingConstants } from '../_constants';

export function joblistings(state = {}, action) {
  switch (action.type) {
  
    case joblistingConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case joblistingConstants.GETALL_SUCCESS:
      return {
        items: action.joblistings
      };
    case joblistingConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case joblistingConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(joblisting =>
          joblisting.id === action.id
            ? { ...joblisting, deleting: true }
            : joblisting
        )
      };
    case joblistingConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(joblisting => joblisting.id !== action.id)
      };
    case joblistingConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(joblisting => {
          if (joblisting.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...joblistingCopy } = joblisting;
            // return copy of user with 'deleteError:[error]' property
            return { ...joblistingCopy, deleteError: action.error };
          }

          return joblisting;
        })
      };
    default:
      return state
  }
}