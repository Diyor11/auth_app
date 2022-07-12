import {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Dashboard() {

    const [data, setData] = useState({})
    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        if (!user) return;

        const getAbout = async() => {
            const api = 'http://localhost:8080/api/v1'
            try {
                const config = {
                    headers: {
                        'Authorization': user.data.token
                    }
                }
    
                let result = await axios.get(api + '/about', config)
                setData(result)
                
            } catch (e) {
                console.log(e)
            }
        }

        getAbout().then()
    }, [user])

  return user ? (
    <div>
        <h2>Hello, {user.data.user.user_name}!</h2>
        <h4>About: {data.message}</h4>
    </div>
  ): (<Navigate to='/login' replace/>)
}
