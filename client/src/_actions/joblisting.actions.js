import { joblistingConstants } from '../_constants';
import { joblistingService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const joblistingActions = {

    register,
    update,
    getAll,
    getAllJobs,
    getSearchResult,
    getById,
    delete: _delete
};

function register(joblisting) {
    return dispatch => {
        dispatch(request(joblisting));

        joblistingService.register(joblisting)
            .then(
                joblisting => { 
                    dispatch(success());
                    history.push('/company');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    

    function request(joblisting) { return { type: joblistingConstants.REGISTER_REQUEST, joblisting } }
    function success(joblisting) { return { type: joblistingConstants.REGISTER_SUCCESS, joblisting } }
    function failure(error) { return { type: joblistingConstants.REGISTER_FAILURE, error } }
}

function update(joblisting) {
    return dispatch => {
        dispatch(request(joblisting));

        joblistingService.update(joblisting)
            .then(
                joblisting => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    

    function request(joblisting) { return { type: joblistingConstants.REGISTER_REQUEST, joblisting } }
    function success(joblisting) { return { type: joblistingConstants.REGISTER_SUCCESS, joblisting } }
    function failure(error) { return { type: joblistingConstants.REGISTER_FAILURE, error } }
}
function getAll(id) {
    return dispatch => {
        dispatch(request());

        joblistingService.getAll(id)
            .then(
                joblistings => dispatch(success(joblistings)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: joblistingConstants.GETALL_REQUEST } }
    function success(joblistings) { return { type: joblistingConstants.GETALL_SUCCESS, joblistings } }
    function failure(error) { return { type: joblistingConstants.GETALL_FAILURE, error } }
}
function getSearchResult(job) {
    return dispatch => {
        dispatch(request());

        joblistingService.getAllJobs(job)
            .then(
                joblistings => dispatch(success(joblistings)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: joblistingConstants.GETALL_REQUEST } }
    function success(joblistings) { return { type: joblistingConstants.GETALL_SUCCESS, joblistings } }
    function failure(error) { return { type: joblistingConstants.GETALL_FAILURE, error } }
}

function getAllJobs() {
    return dispatch => {
        dispatch(request());

        joblistingService.getAllJobs()
            .then(
                joblistings => dispatch(success(joblistings)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: joblistingConstants.GETALL_REQUEST } }
    function success(joblistings) { return { type: joblistingConstants.GETALL_SUCCESS, joblistings } }
    function failure(error) { return { type: joblistingConstants.GETALL_FAILURE, error } }
}
function getById(id) {
    return dispatch => {
        dispatch(request());

        joblistingService.getById(id)
            .then(
                joblisting => dispatch(success(joblisting)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: joblistingConstants.GETBYID_REQUEST } }
    function success(joblisting) { return { type: joblistingConstants.GETBYID_SUCCESS, joblisting } }
    function failure(error) { return { type: joblistingConstants.GETBYID_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        joblistingService.delete(id)
            .then(
                joblisting => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: joblistingConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: joblistingConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: joblistingConstants.DELETE_FAILURE, id, error } }
}