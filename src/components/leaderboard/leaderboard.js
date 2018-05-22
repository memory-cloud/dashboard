import React from 'react'
import Entry from '../entry'

export default ({leaderboard}) => {
  let rank = 1
  return (
    <div>
        {leaderboard ? leaderboard.map((entry) => <Entry id={entry.id} score={entry.score} key={entry.id} rank={rank++}/>): 'Loading'}
    </div>
  )
}
