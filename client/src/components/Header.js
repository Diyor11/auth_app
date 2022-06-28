import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

export default function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className='bg-black fixed w-full top-0 left-0 flex justify-between items-center px-7 h-12'>
        <div className="text-white text-2xl">
            <NavLink to='/'>Home</NavLink>
        </div>
        <ul className='flex item-center gap-x-4'>
            {user ? (
                <li className='text-white border border-white rounded-lg px-5 py-2'>
                    <button className='flex items-center gap-x-2 ' onClick={onLogout}><FaSignOutAlt /> <span>Logout</span></button>
                </li>
            ):(
                <li className='text-white border border-white rounded-lg px-5 py-2'>
                    <NavLink className='flex items-center gap-x-2' to='/login'><FaSignInAlt /> <span>Login</span></NavLink>
                </li>
            )}
        </ul>
    </header>
  )
}
