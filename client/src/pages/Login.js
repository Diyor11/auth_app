import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

export default function Login() {

    const [formData, setFormData] = useState({
        user_login: '',
        user_password: ''
    })

    const { user_login, user_password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isError, isSuccess, message, isLoading} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        } 

        if(isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, navigate, dispatch, isError, isSuccess, message])

    const onChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            user_login,
            user_password
        }

        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner />
    }

  return !user ?(
    <>
        <section>
            <h1>
                <FaSignInAlt /> <span>Login</span>
            </h1>
            <p>Please login to your account</p>
        </section>

        <section>
            <form onSubmit={onSubmit}>
                <div>
                    <input 
                        className='border border-black mt-4'
                        type="text" 
                        name='user_login'
                        placeholder='Enter your login'
                        onChange={onChange}
                        value={user_login}
                    />
                </div>
                <div>
                    <input 
                        className='border border-black mt-4'
                        type="password" 
                        name='user_password'
                        value={user_password}
                        placeholder='Enter your password'
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button className='bg-black rounded-md text-white px-5 text-lg mt-3' type='submit' >Login</button>
                </div>
            </form>
        </section>
    </>
  ):null
}
