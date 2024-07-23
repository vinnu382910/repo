// Write your code here
import './index.css'

const LanguagesFilterItem = props => {
  const {itemDetails, onChangeLanguage, statusLanguage} = props
  const {id, language} = itemDetails
  const onClickLanguage = () => {
    onChangeLanguage(id)
  }

  return (
    <li>
      <button
        type="button"
        className={id === statusLanguage ? 'addColor list-btn' : 'list-btn'}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguagesFilterItem
