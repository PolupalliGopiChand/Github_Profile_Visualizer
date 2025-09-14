import React from 'react'
import './index.css'

const HomeLandingPage = ({
  title = 'GitHub Profile Visualizer',
  imageSrc = 'https://res.cloudinary.com/dwirj6lej/image/upload/v1755750038/HomeLandingPageImage_cshpad.png',
  altText = 'GitHub profile visualizer home page',
}) => (
  <div className="github-container">
    <h1 className="heading">{title}</h1>
    <img src={imageSrc} alt={altText} className="homeImage" />
  </div>
)

export default HomeLandingPage
