import axios from 'axios';

export function requestPasswordReset(email) {
    return axios.post('/api/user/forgot/request', {
        email
    });
}

export function checkPasswordResetToken(token) {
    return axios.post('/api/user/forgot/check', {
        token
    });
}

export function performPasswordReset(token, password) {
    return axios.post('/api/user/forgot/reset', {
        token,
        password
    });
}

export function getSetData() {
    return {
        puzzle_id: 13082,
        version: 1,
        puzzle_data: [
            {
            "color": "red",
            "shape": "diamond",
            "pattern": "solid",
            "number": 1
            },
            {
            "color": "red",
            "shape": "diamond",
            "pattern": "solid",
            "number": 2
            },
            {
            "color": "red",
            "shape": "diamond",
            "pattern": "striped",
            "number": 2
            },
            {
            "color": "red",
            "shape": "diamond",
            "pattern": "empty",
            "number": 1
            },
            {
            "color": "green",
            "shape": "diamond",
            "pattern": "striped",
            "number": 2
            },
            {
            "color": "green",
            "shape": "diamond",
            "pattern": "striped",
            "number": 3
            },
            {
            "color": "green",
            "shape": "diamond",
            "pattern": "empty",
            "number": 3
            },
            {
            "color": "purple",
            "shape": "diamond",
            "pattern": "solid",
            "number": 3
            },
            {
            "color": "purple",
            "shape": "diamond",
            "pattern": "empty",
            "number": 2
            }
        ],
        difficulty: "Easy",
        published: "2015-12-06 18:00:00",
        print_date: "2015-12-07",
        day_of_week: "Monday"
        };
}

export default {
    requestPasswordReset,
    checkPasswordResetToken,
    performPasswordReset,
    getSetData
};
