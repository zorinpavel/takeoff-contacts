const request = require('request');

const getDefaultContacts = (props) => {
    const options = {
        url: 'https://uifaces.co/api?' + (props.limit ? 'limit=' + props.limit : ''),
        headers: {
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'X-API-KEY': process.env.UIFACES_API_KEY
    
        }
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error)
                reject('Unable to connect to UI Faces API ' + error);
            else if (response.statusCode !== 200) {
                reject('Unable to get UI Faces API', body.error);
            } else
                resolve(body);
        });
    });
};

module.exports = getDefaultContacts;
