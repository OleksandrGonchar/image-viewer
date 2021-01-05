import axios from 'axios';
import { AuthService } from '../auth';
import { Constant } from '../../common/utils';

const errorCallBack = async (error: any) => {
    if (error.response.status === 401) {
        await AuthService.login();
    }
}

export const Http = {
    get: async (address: string) => {
        await AuthService.loginIfNeaded();
        const responce = await axios.get(`${Constant.URL || process.env.PUBLIC_URL}/${address}`)
            .catch(errorCallBack);
        return responce ? responce.data : null;
    },
    post: async (address: string, data?: any) => {
        await AuthService.loginIfNeaded();
        const responce = await axios.post(`${Constant.URL || process.env.PUBLIC_URL}/${address}`, data)
            .catch(errorCallBack);
        return responce ? responce.data : null;
    }
}
