import axios from 'axios'

const api = 'https://localhost:8080/auth'

const login = async(userData) => {
    const res = await axios.post(api + '/login', userData).catch(e => console.log(e))

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