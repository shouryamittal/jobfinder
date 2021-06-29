function request(url, method, body={}, headers={}) {
    const HEADERS = {
        'Content-Type':'application/json'
    }
    Object.keys(headers).forEach(key => {
        HEADERS[key] = headers[key];
    });
    let requestOpts = {
        method: method,
        headers: HEADERS,
    };
    if(method === 'POST' || method === 'PUT') {
        requestOpts.body = JSON.stringify(body)
    }
    return fetch(url, requestOpts);
}

export default request;