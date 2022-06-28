import {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Dashboard() {

    const [data, setData] = useState({})
    const {user} = useSelector(state => state.auth)

    const getAbout = async() => {
        const api = 'http://localhost:8080'
        try {
            const config = {
                headers: {
                    'Authorization': user.data.token
                }
            }

            let result = await axios.get(api + '/api/about', config)
            setData(result.data)
            
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if(!user) return null
        getAbout().then()
        return () => {
            console.log('this will be logged on unmount')
        }
    }, [])

  return user ? (
    <div>
        <h2>Hello, {user.data.user.user_name}!</h2>
        <h4>About: {data.message}</h4>
    </div>
  ): (<Navigate to='/login' replace/>)
}
