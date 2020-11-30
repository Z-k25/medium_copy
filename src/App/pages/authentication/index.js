import React, { useState, useEffect, useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Link, Redirect } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/currentUser'
import BackendErrorMessages from '../../pages/authentication/components/backendErrorMessages'

const Authentication = ({ location: { pathname } }) => {
    const isLogin = pathname === '/login'
    const apiUrl = isLogin ? '/users/login' : '/users'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl)
    const [, setToken] = useLocalStorage('token')
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext)

    const linkDescription = isLogin ? 'Need an account?' : 'Already have an account?'
    const formDescription = isLogin ? 'Login' : 'Register'
    const buttonDescription = isLogin ? 'Sign in' : 'Sign up'
    const userData = isLogin ? { email, password } : { username, email, password }

    const handleSubmit = event => {
        event.preventDefault()
        doFetch({
            method: 'post',
            data: {
                user: userData
            }
        })
    }

    useEffect(() => {
        if (response) {
            setToken(response.user.token)
            setCurrentUserState(state => ({
                ...state,
                isLogedOn: true,
                isLoading: false,
                currentUser: response.user
            }))
        }
    }, [response, setToken])

    if (currentUserState.isLogedOn) {
        return <Redirect to="/" />
    }
    return (
        <div className="auth-page">
            <div className="container-page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{formDescription}</h1>
                        <p className="text-xs-center">
                            <Link to={isLogin ? '/register' : '/login'}>{linkDescription}</Link>
                        </p>
                        <form onSubmit={handleSubmit} >
                            {error && <BackendErrorMessages backendErrors={error.errors} />}
                            {!isLogin &&
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            type="username"
                                            className="form-control form-control-lg"
                                            placeholder="username"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)} />
                                    </fieldset>
                                </fieldset>}
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                </fieldset>
                            </fieldset>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                </fieldset>
                            </fieldset>
                            <button
                                className="btn btn-lg btn-primary pull-xs-right"
                                type="submit"
                                disabled={isLoading} >
                                {buttonDescription}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication