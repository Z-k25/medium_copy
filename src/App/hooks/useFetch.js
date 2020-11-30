import { useState, useEffect, useCallback } from "react"
import useLocalStorage from '../hooks/useLocalStorage'
import Axios from 'axios'

const useFetch = (url) => {
    const baseUrl = 'https://conduit.productionready.io/api'
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const [token] = useLocalStorage('token')

    const doFetch = useCallback((options) => {
        const requestedOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Token ${token}` : ''
                }
            }
        }
        setOptions(requestedOptions)
        setIsLoading(true)
    }, [token])

    useEffect(() => {
        if (isLoading) {
            Axios(baseUrl + url, options)
                .then(({ data }) => {
                    setResponse(data)
                    setIsLoading(false)
                })
                .catch(({ response }) => {
                    setError(response.data)
                    setIsLoading(false)
                })
        }
    }, [isLoading, options, url])

    return [{ isLoading, response, error }, doFetch]
}

export default useFetch