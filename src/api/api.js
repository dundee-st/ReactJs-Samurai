import Axios from "axios";
import { follow } from "../redux/users-reducer";

const instance = Axios.create(          //создаём шаблон аксиоса, что бы не повторять код.
    {
        withCredentials: true,      //параметр говорит что мы зарегистрированный пользователь а не анонимный
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',   //базовый URL, автоматически приклеивается к строке
        headers: {
            'API-KEY': 'cdb1b45e-d0ad-45c3-9f3d-70b21a8f94df'
        }
    }
);

export const usersAPI = {
    getUsers(currentPage, pageSise) {
        return instance.get(`users?page=${currentPage}&count=${pageSise}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(userId) {
        console.warn('Please use new profileAPI object');
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, { status: status });
    },
    savePhoto(photoFile) {
        let formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    giveMe() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout(email, password, rememberMe = false) {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}