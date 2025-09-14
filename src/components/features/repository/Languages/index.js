import './index.css'

const Languages = ({languageDetails}) => {
  const {name} = languageDetails

  return (
    <div className="language-item">
      <span className="language-name">{name}</span>
    </div>
  )
}

export default Languages
