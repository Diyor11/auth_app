import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useFetch(url, config) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        const getData = async() => {
            try {
                const res = await axios.get(url, config)
                setData(res.data)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        getData()
    })

    return {loading, error, data}
}