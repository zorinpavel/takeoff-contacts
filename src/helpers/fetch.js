const
    fetchApi = options => {
        if (options.method === 'GET' && Object.keys(options.params).length !== 0) {
            options.url += '?' +  Object.keys(options.params).map(key => (encodeURIComponent(key) + '=' +
                    encodeURIComponent(options.params ? options.params[key] : '')
            )).join('&');
        }

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (options.authToken)
            headers['Authorization'] = 'Bearer ' + options.authToken;

        return fetch(options.url, {
            headers,
            method: options.method || 'GET',
            body: (options.method === 'GET') ? null : JSON.stringify(options.params),
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                }
            });
    };

export default fetchApi;
