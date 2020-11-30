import { useEffect, useContext } from 'react'
import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'
import { CurrentUserContext } from '../contexts/currentUser'

const CurrentUserChecker = ({ children }) => {
    const [{ response }, doFetch] = useFetch('/user')
    const [token] = useLocalStorage('token')
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext)
    console.log(currentUserState)

    useEffect(() => {
        if (!token) {
            setCurrentUserState(state => ({
                ...state,
                isLogedOn: false
            }))
            return
        }
        doFetch()
        setCurrentUserState(state => ({
            ...state,
            isLoading: true
        }))
    }, [doFetch, setCurrentUserState, token])

    useEffect(() => {
        if (!response) {
            return
        }
        setCurrentUserState(state => ({
            ...state,
            isLoading: false,
            isLogedOn: true,
            currentUser: response.user

        }))
    }, [response, setCurrentUserState])

    return children
}

export default CurrentUserChecker