import { parse } from "query-string"

export const range = (start, end) => {
    return [...Array(end).keys()].map(el => el + start)
}

export const paginator = (url) => {
    console.log(url)
    const parsedUrl = parse(url)
    const currentPage = parsedUrl ? parsedUrl.page : 1
    const offset = (currentPage - 1) * 10

    return [currentPage, offset]
}
 
export const limit = 10