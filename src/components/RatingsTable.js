import React from 'react'
import '../css/RatingsTable.css'

const RatingsTable = ({ game }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Spaß</th>
            <th>Aging</th>
            <th>Grafik</th>
            <th>Trash</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lena</td>
            <td>{game.ratings && game.ratings.Lena ? game.ratings.Lena.gameplay : '?'}</td>
            <td>{game.ratings && game.ratings.Lena ? game.ratings.Lena.aging : '?'}</td>
            <td>{game.ratings && game.ratings.Lena ? game.ratings.Lena.graphics : '?'}</td>
            <td>{game.ratings && game.ratings.Lena ? game.ratings.Lena.trashiness : '?'}</td>
          </tr>
          <tr>
            <td>René</td>
            <td>{game.ratings && game.ratings.Rene ? game.ratings.Rene.total : '?'}</td>
            <td>{game.ratings && game.ratings.Rene ? game.ratings.Rene.theme : '?'}</td>
            <td>{game.ratings && game.ratings.Rene ? game.ratings.Rene.graphics : '?'}</td>
            <td>{game.ratings && game.ratings.Rene ? game.ratings.Rene.trashiness : '?'}</td>
          </tr>
          <tr>
            <td>Chris</td>
            <td>{game.ratings && game.ratings.Chris ? game.ratings.Chris.total : '?'}</td>
            <td>{game.ratings && game.ratings.Chris ? game.ratings.Chris.theme : '?'}</td>
            <td>{game.ratings && game.ratings.Chris ? game.ratings.Chris.graphics : '?'}</td>
            <td>{game.ratings && game.ratings.Chris ? game.ratings.Chris.trashiness : '?'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RatingsTable
