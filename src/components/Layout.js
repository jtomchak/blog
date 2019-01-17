import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import './style.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Jesse Tomchak" />
    <Navbar />
    <div>{children}</div>
  </div>
)

export default TemplateWrapper
