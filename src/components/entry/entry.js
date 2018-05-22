import React from 'react'

export default ({id, score, rank}) => {
  let url = 'https://graph.facebook.com/' + id + '/picture'
  return (
    <div>
      {rank} <img src={url} alt=''/> {score}
    </div>
  )
}

