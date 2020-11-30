import React from 'react'

const BackendErrorMessages = ({backendErrors}) => {
    const errors = Object.keys(backendErrors).map(error => {
        return `${error} ${backendErrors[error]}`
    })
    return (
        <ul className='error-messages'>
            {errors.map(error => {
                return <li key={error}>{error}</li>
            })}
        </ul>
    )
}

export default BackendErrorMessages