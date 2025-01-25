import React from 'react'
import '../css/RatingsTable.css'

const RatingsTable = ({ game }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Gesamt</th>
            <th>Thema</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lena</td>
            <td>{game.ratings && game.ratings.Lena ? game.ratings.Lena.total : '?'}</td>
            <td>{game.ratings && game.ratings.Lena ? game.ratings.Lena.theme : '?'}</td>
          </tr>
          <tr>
            <td>René</td>
            <td>{game.ratings && game.ratings.Rene ? game.ratings.Rene.total : '?'}</td>
            <td>{game.ratings && game.ratings.Rene ? game.ratings.Rene.theme : '?'}</td>
          </tr>
          <tr>
            <td>Chris</td>
            <td>{game.ratings && game.ratings.Chris ? game.ratings.Chris.total : '?'}</td>
            <td>{game.ratings && game.ratings.Chris ? game.ratings.Chris.theme : '?'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RatingsTable
