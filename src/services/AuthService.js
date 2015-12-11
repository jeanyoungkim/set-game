import axios from 'axios';

export default {
    login: (username, password) => {
        return axios
                .post('/auth', {
                    username,
                    password
                });
    }
};
