import React from 'react'
import { Link } from 'react-router-dom'

const Feed = ({ articles }) => {
    if (articles.length === 0) {
        return <div className="article-preview">No articles are here... yet.</div>
    }
    return (
        <div>
            {articles.map((article, index) => (
                <div className="article-preview" key={index}>
                    <div className="article-meta">
                        <Link to={`/profile/${article.author.username}`}>
                            <img src={article.author.image} alt="" />
                        </Link>
                        <div className="info">
                            <Link to={`/profile/${article.author.username}`} className="author" >
                                {article.author.username}
                            </Link>
                            <span className="date">{article.createdAt}</span>
                        </div>
                    </div>
                    <Link to={`/articles/${articles.slug}`} className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Reed more ...</span>
                        <ul className="tag-list">
                            {article.tagList.map(tag => (
                                <li key={tag} className="tag-default tag-pill tag-outline">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Feed