//import * as React from 'react';
//import { requestGoogleSignin } from '../asyncHelpers/authService';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// const domainUrl = process.env.REACT_APP_DOMAIN_URL;

export default function useGoogleOAuth (): void {

    const config: gapi.auth2.ClientConfig = {
        client_id: clientId,
        cookie_policy: '',
        scope: '',
        fetch_basic_profile: true,
        ux_mode: 'popup',
        redirect_uri: ''
    }

    const handleAuthChange = (currentUser: gapi.auth2.GoogleUser): void => {
        console.log('run handleAuthChange')
        if (currentUser.isSignedIn()) {
            const profile = currentUser.getBasicProfile();

            console.log('profile id', profile.getId());
            console.log('profile email', profile.getEmail());
        }
    }

    const handleLoad = (): void => {
        console.log('run handleLoad')
        window.gapi.auth2.init(config)
            .then(auth2 => {
                if (auth2.isSignedIn.get()) {
                    const currentUser = auth2.currentUser.get();   
                    const profile = currentUser.getBasicProfile();
                    console.log('profile id', profile.getId());
                    console.log('profile email', profile.getEmail());
                } else {
                    auth2.currentUser.listen(handleAuthChange)
                }
            });
    }

    window.gapi.load('auth2', handleLoad);
}