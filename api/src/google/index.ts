import { OAuth2Client } from 'google-auth-library';

export interface IGoogleService {
    verifyAuthToken: (token: string) => Promise<string | null>
}

export default function googleService (clientId: string): IGoogleService {
    const client = new OAuth2Client(clientId);

    return {
        verifyAuthToken: async (token) => {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: clientId
                });
            
                const payload = ticket.getPayload();
            
                return payload ? payload.sub : null; 
        
            } catch (e) {
                // TODO: error logging
                console.log('Error - verifyGoogleUserToken', e);
        
                return null;
            }
        }
    }
}