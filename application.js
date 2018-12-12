const config = require('./config');

class Application {
    constructor() {
        this.awsSdk = null;
        this.iotData = null;
    }

    loadAwsSdk () {
        if (this.awsSdk === null) {
            this.awsSdk = require('aws-sdk');
        }
    }

    loadIotData() {
        if (this.awsSdk === null) {
            this.loadAwsSdk();
            
            try {
                this.iotData = new this.awsSdk.IotData({endpoint: config.IOT_ENPOINT});
            } catch (Error) {
                console.log('error: ', Error);
            }
        }
        return this.iotData;
    }
}
module.exports = Application;