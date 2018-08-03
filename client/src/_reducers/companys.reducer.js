import { companyConstants } from '../_constants';

export function companys(state = {}, action) {
  switch (action.type) {
    case companyConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case companyConstants.GETALL_SUCCESS:
      return {
        items: action.companies
      };
    case companyConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case companyConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(company =>
          company.id === action.id
            ? { ...company, deleting: true }
            : company
        )
      };
    case companyConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(company => company.id !== action.id)
      };
    case companyConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(company => {
          if (company.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...companyCopy } = company;
            // return copy of user with 'deleteError:[error]' property
            return { ...companyCopy, deleteError: action.error };
          }

          return company;
        })
      };
    default:
      return state
  }
}