import { useEffect, useState } from "react"

export default (key, initialKey = '') => {
    const [value, setValue] = useState(() => localStorage.getItem(key) || initialKey)

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value, key])
    return [value, setValue]
}