import { createServer } from 'miragejs'
import appConfig from 'configs/app.config'

import { signInUserData } from './data/authData'

import { authFakeApi } from './fakeApi'

const { apiPrefix } = appConfig

export default function mockServer({ environment = 'test' }) {
    // Check if the environment is not 'development'
    if (environment !== 'development') {
       
        // Return null or undefined to indicate that Mirage should be disabled
        return null;
    }
   

    // If the environment is 'development', configure Mirage
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
            });
        },
        routes() {
            this.urlPrefix = '';
            this.namespace = '';

            // Enable Mirage routes and passthrough external requests
            this.passthrough((request) => {
                let isExternal = request.url.startsWith('http');
                return isExternal;
            });

            // authFakeApi(this, apiPrefix);
        },
    });
}


