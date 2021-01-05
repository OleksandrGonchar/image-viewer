import axios from 'axios';
import { Constant } from '../../common/utils';

export function setAuthToken(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function removeAuthToken() {
    delete axios.defaults.headers.common['Authorization'];
}

export const AuthService = {
    loginIfNeaded: async () => {
        if (!axios.defaults.headers.common['Authorization']) {
            await AuthService.login();
        }
    },
    login: async () => {
        removeAuthToken();
        // ToDo: replace string usage with urls 
        const { data } = await axios.post(`${Constant.URL || process.env.PUBLIC_URL}/auth`, { apiKey: '23567b218376f79d9415' });
        setAuthToken(data.token);
    } 
}
