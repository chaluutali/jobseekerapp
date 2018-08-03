import { companyConstants } from '../_constants';
import { companyService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const companyActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(employer_user_id, password) {
    return dispatch => {
        dispatch(request({ employer_user_id }));

        companyService.login(employer_user_id, password)
            .then(
                company => { 
                    dispatch(success(company));
                    history.push('/company');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(company) { return { type: companyConstants.LOGIN_REQUEST, company } }
    function success(company) { return { type: companyConstants.LOGIN_SUCCESS, company } }
    function failure(error) { return { type: companyConstants.LOGIN_FAILURE, error } }
}

function logout() {
    companyService.logout();
    return { type: companyConstants.LOGOUT };
}

function register(company) {
    return dispatch => {
        dispatch(request(company));

        companyService.register(company)
            .then(
                company => { 
                    dispatch(success());
                    history.push('/loginEmployer');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(company) { return { type: companyConstants.REGISTER_REQUEST, company } }
    function success(company) { return { type: companyConstants.REGISTER_SUCCESS, company } }
    function failure(error) { return { type: companyConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        companyService.getAll()
            .then(
                companies => dispatch(success(companies)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: companyConstants.GETALL_REQUEST } }
    function success(companies) { return { type: companyConstants.GETALL_SUCCESS, companies } }
    function failure(error) { return { type: companyConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        companyService.delete(id)
            .then(
                company => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: companyConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: companyConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: companyConstants.DELETE_FAILURE, id, error } }
}