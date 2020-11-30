import React, { useEffect } from 'react'
import Feed from '../../components/feed'
import useFetch from '../../hooks/useFetch'

const GlobalFeed = () => {
  const apiUrl = "/articles?limit=10&offset=0"
  const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)
  console.log(response)
  useEffect(() => {
    doFetch()
  }, [doFetch])
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
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
            {!isLoading && response && (
              <Feed articles={response.articles} />
            )}
          </div>
          <div className="col-md-3">
            Popular tags
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalFeed
