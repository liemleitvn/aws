const config = require('./config');

class IotData {

    constructor(application) {
        this.app = application;
    }

    publishSuccessIotMessage(payload, cb_function) {
        let message = Object.assign(payload, {invalid: true});
        let topic = config.IOT_TOPIC;

        console.log('Publishing message: ', message);
        this.publish(message, topic).then(
            (result) => {
                console.log('Published message result: ', result);
                cb_function(null, result);
            }, () => {
                let error = new Error("Publish message fail", 505);
                cb_function(error);
            }
        );
    }

    publishFailIotMessage(payload, error, cb_function) {
        let message = Object.assign(payload,{invalid: false});
        let topic = config.IOT_TOPIC;
        console.log('Publishing message: ', message);
        this.publish(message,topic).then(
            (result) => {
                console.log('Published message result: ', result);
                cb_function(error);
            }, (err) => {
                cb_function(err);
            }
        );
    };

    publish(payload, topic) {
        return new Promise((resolve, reject) => {
            this.app.loadIotData().publish({
                topic: topic,
                payload: JSON.stringify(payload),
                qos: 0
            }, (err, data) => {
                if (err) {
                    console.log('Has error', err);
                    reject(err);
                    return;
                }
                console.log(data);
                resolve(data);
            });
        });
    }
}

module.exports = IotData;