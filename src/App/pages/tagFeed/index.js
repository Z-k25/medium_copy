import React, { Fragment, useEffect } from 'react'
import ErrorMessage from '../../components/errorMessage'
import Feed from '../../components/feed'
import FeedToggler from '../../components/feedToggler'
import Loading from '../../components/loading'
import Pagination from '../../components/pagination'
import PopularTags from '../../components/popularTags'
import useFetch from '../../hooks/useFetch'
import { limit, paginator } from '../../utils'

const TagFeed = ({ location, match }) => {
  const [currentPage, offset] = paginator(location.search)
  const tagName = match.params.slug
  const apiUrl = `/articles?limit=${limit}&offset=${offset}&tag=${tagName}`
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl)
  const url = match.url

  useEffect(() => {
    doFetch()
  }, [doFetch, tagName, apiUrl])
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles} />
                <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={+currentPage} />
              </Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagFeed
