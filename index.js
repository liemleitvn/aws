const Application = require('./application');
const IotData = require('./iot_message');
const Users = require('./users');

exports.handler = (event, context, callback) => {
    if (!event.queryStringParameters || !event.queryStringParameters.id) {
        const response = {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "message": "Missing ID request " }),
        };
        callback(null, response);
        return;
    }

    let id = parseInt(event.queryStringParameters.id);

    Users.map((user)=> {
        if(user.id === id) {
            const response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            };
            let app = new Application();
            let iot = new IotData(app);
            iot.publishSuccessIotMessage(user, callback);
            iot.subcribeSuccessIotMessage();
            
            callback(null, response);
        }
    });

    const response = {
        statusCode: 400,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "message": "Id is not found" }),
    };
    callback(null, response);
    context.done();
};
