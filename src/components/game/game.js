import React from 'react'
import { Link } from 'react-router-dom'

export default ({appid}) => {
  return (
    <div>
        <Link to={'game/' + appid}>{appid}</Link>
    </div>
  )
}
