import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title,description,keywords}) => {
  return (
      <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}
Meta.defaultProps = {
    title: 'Welcome To Cell Zone',
    description: 'Sample website created by Adarsh',
    keywords: 'MERN stack',
  }

export default Meta