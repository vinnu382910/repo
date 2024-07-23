// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {avtarUrl, forksCount, name, issuesCount, starsCount} = itemDetails
  return (
    <div className="repo-cont">
      <img src={avtarUrl} className="image" alt={name} />
      <h1 className="main-heading">{name}</h1>
      <div className="stars-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="stars-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="stars-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </div>
  )
}

export default RepositoryItem
