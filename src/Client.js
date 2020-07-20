const key = 'user-token';
const BASE_URL = 'https://picsart-bootcamp-2020-api.herokuapp.com/api/v1';

class Client {
    constructor() {
        this.useLocalStorage = (typeof localStorage !== 'undefined');
        this.useSessionStorage = (typeof sessionStorage !== 'undefined');
        if (this.useLocalStorage || this.useSessionStorage) {

            if (sessionStorage.getItem(key)) {
                this.token = sessionStorage.getItem(key);
            }

            if (localStorage.getItem(key)) {
                this.token = localStorage.getItem(key);
            }

            if (!this.token) {
                this.token = null;
            }

        }

    }

    imGurUpload(file) {

        const formData = new FormData();
        formData.append('image', file);

        return fetch('https://api.imgur.com/3/image', {
            method: "POST",
            headers: {
                Authorization: 'Client-ID 607578b0818c654',
                Accept: 'application/json',
            }
            , body: formData
        }).then(res => res.json()).then(data => data.data.link)

    }

    async postRegister(data, file) {
        data['avatarUrl'] = await this.imGurUpload(file);

        delete data['rePassword'];
        return fetch(`${BASE_URL}/users/register`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
    };

    isLoggedIn() {
        return !!this.token;
    }

    getTopics() {

        return fetch(`${BASE_URL}/topics`, {
            headers: {
                token: this.token
            }
        })

    };

    voteTopic(id, vote) {
        return fetch(`${BASE_URL}/topics/${id}/voting`, {
            headers: {
                token: this.token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(vote)
        })
    }

    addTopic(value) {
        return fetch(`${BASE_URL}/topics`, {
            method: 'POST',
            headers: {
                token: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: value })
        })
    }

    deleteTopic(id) {
        return fetch(`${BASE_URL}/topics/${id}`, {
            method: 'DELETE',
            headers: {
                token: this.token,
                'Content-Type': 'application/json'
            }
        })
    };

    getProjects() {

        return fetch(`${BASE_URL}/projects`, {
            headers: {
                token: this.token
            }
        })

    };

    voteProject(id, vote) {

        return fetch(`${BASE_URL}/projects/${id}/voting`, {
            headers: {
                token: this.token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ type: vote })
        })
    }

    setTokenLocalStorage(token) {
        this.token = token;

        if (this.useLocalStorage) {
            localStorage.setItem(key, this.token);
        }
    }

    setTokenSessionStorage(token) {
        this.token = token;
        if (this.useSessionStorage) {
            sessionStorage.setItem(key, this.token);
        }
    }

    removeToken() {
        this.token = null;

        if (this.useSessionStorage) {
            sessionStorage.removeItem(key);
        }

        if (this.useLocalStorage) {
            localStorage.removeItem(key);
        }
    }

    getCompanies() {
        return fetch(`${BASE_URL}/companies`)
            .then(res => res.json())
    };

    login(data) {
        return fetch(`${BASE_URL}/users/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    getUserData = () => {


        return fetch(`${BASE_URL}/users`, {
            headers: {
                token: this.token
            }
        })

    };

    editUserData = (data) => {
        return fetch(`${BASE_URL}/users/update`, {
            headers: {
                token: this.token,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(data)
        })
    };

    logout = () => {
        return fetch(`${BASE_URL}/users/logout`, {
            headers: {
                token: this.token
            }
        })
    }

}

export const client = new Client();
