import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8080',
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const login = async (loginData) => {
    return await api.post('/auth/login', loginData);
}
export const signup = async (userData) => {
    return await api.post('/auth/signup', userData);
}
export const logout = async () => {
    return await api.post('/auth/logout');
}
// pianos
    export const fetchPianos = async () => {
        return await api.get('/pianos');
    }
    export const fetchPianoById = async (id) => {
        return await api.get(`/pianos/id/${id}`);
    }
    export const createPiano = async (pianoData) => {
        return await api.post('/pianos', pianoData);
    }
    export const updatePiano = async (id, pianoData) => {
        return await api.put(`/pianos/id/${id}`, pianoData);
    }
    export const deletePiano = async (id) => {
        return await api.delete(`/pianos/id/${id}`);
    }
// users
    export const fetchUsers = async () => {
        return await api.get('/users');
    }
    export const fetchUserById = async (id) => {
        return await api.get(`/users/id/${id}`);
    }
    export const deleteUser = async (id) => {
        return await api.delete(`/users/id/${id}`);
    }
//purchases
    export const fetchUserPurchases = async (userId) => {
        return await api.get(`/purchases/user/${userId}`);
    }
    export const fetchPurchaseById = async (id) => {
        return await api.get(`/purchases/id/${id}`);
    }
    export const createPurchase = async (purchaseData) => {
        return await api.post('/purchases', purchaseData);
    }