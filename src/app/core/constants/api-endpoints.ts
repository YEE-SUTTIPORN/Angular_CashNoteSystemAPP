import { environment } from '../../../environments/environment';

const baseUrl = environment.apiBaseUrl;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${baseUrl}/Auth/login`,
        LOGOUT: `${baseUrl}/Auth/logout`,
        REGISTER: `${baseUrl}/Auth/register`,
        CHECK_AUTH: `${baseUrl}/Auth/checkauth`,
    }

    , USER: {
        USERS: '/users',
    }
}