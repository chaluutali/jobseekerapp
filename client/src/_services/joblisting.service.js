import { authHeader } from '../_helpers';

export const joblistingService = {
   
    register,
    update,
    getAll,
    getAllJobs,
    getSearchResult,
    getById,
    update,
    delete: _delete
};

function getAll(id) {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:3000/joblisting/company/'+ id, requestOptions).then(handleResponse);
}
function getAllJobs() {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:3000/joblisting', requestOptions).then(handleResponse);
}

function getSearchResult(job) {
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(job)
    };

    return fetch('http://localhost:3000/joblisting/search', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:3000/joblisting/'+ id, requestOptions).then(handleResponse);
}

function register(joblisting) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(joblisting)
    };

    return fetch('http://localhost:3000/joblisting', requestOptions).then(handleResponse);
}

function update(joblisting) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(joblisting)
    };

    return fetch('http://localhost:3000/joblisting/'+ joblisting.joblisting_id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('http://localhost:3000/joblisting/'+ id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}