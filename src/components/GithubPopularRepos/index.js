import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguagesFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here//

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repoData: [],
    language: 'ALL',
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getMatchData()
  }

  getMatchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {language} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${language}`
    try {
      const response = await fetch(apiUrl)
      console.log(response)
      if (response.ok === true) {
        const data = await response.json()
        const formatedData = data.popular_repos.map(eachItem => ({
          avtarUrl: eachItem.avatar_url,
          forksCount: eachItem.forks_count,
          id: eachItem.id,
          name: eachItem.name,
          issuesCount: eachItem.issues_count,
          starsCount: eachItem.stars_count,
        }))
        this.setState({
          repoData: formatedData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeLanguage = id => {
    this.setState({language: id}, this.getMatchData)
  }

  renderFiltersList = () => {
    const {language} = this.state
    return (
      <ul className="list-cont">
        {languageFiltersData.map(eachItem => (
          <LanguagesFilterItem
            itemDetails={eachItem}
            key={eachItem.id}
            onChangeLanguage={this.onChangeLanguage}
            statusLanguage={language}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoriesList = () => {
    const {repoData} = this.state
    return (
      <div className="repo-items-cont">
        {repoData.map(eachItem => (
          <RepositoryItem itemDetails={eachItem} key={eachItem.id} />
        ))}
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <div className="main-cont">
        <h1>Popular</h1>
        {this.renderFiltersList()}
        {this.renderContent()}
      </div>
    )
  }
}

export default GithubPopularRepos
