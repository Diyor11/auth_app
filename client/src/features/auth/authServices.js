import axios from 'axios'

const api = 'http://localhost:8080/api/v1/users'

const login = async(userData) => {
    const res = await axios.post(api + '/login', userData)

    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    login,
    logout
}

export default authService