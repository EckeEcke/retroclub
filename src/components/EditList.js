import { useState } from 'react'
import { useThemeStore } from '../store/store'
import RatingModal from './RatingModal'
import '../css/EditList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

const EditList = () => {
  const games = useThemeStore((state) => state.selectedThemeGames)
  const isLoggedIn = useThemeStore((state) => state.isLoggedIn)
  const name = useThemeStore((state) => state.name)
  const [modalGame, setModalGame] = useState(null)

  const filteredGames = (games) => [...games].filter(game => game.ratings && game.ratings[name])

  const openModal = (game) => {
    setModalGame(game)
  }

  const closeModal = () => {
    setModalGame(null)
  }

  const navigate = useNavigate()

  const navigateBack = () => {
    navigate('/')
  }

  return (
    <div className="edit-table">
      {isLoggedIn && filteredGames(games).length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Game</th>
              <th>Spaß</th>
              <th>Aging</th>
              <th>Grafik</th>
              <th>Trash</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames(games).map((game, index) => (
              <tr key={index + game.id}>
                <td>{game.name}</td>
                <td>{game.ratings[name].gameplay}</td>
                <td>{game.ratings[name].aging}</td>
                <td>{game.ratings[name].graphics}</td>
                <td>{game.ratings[name].trashiness}</td>
                <td>
                    <button class="edit-button" onClick={() => openModal(game)}>
                        <FontAwesomeIcon icon="fa-solid fa-edit" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Noch kein Thema ausgewählt</p>
      )}
      <button class="back-button" onClick={navigateBack}>Zurück</button>
      {modalGame && (
        <RatingModal
            game={modalGame}
            isOpen={!!modalGame}
            onClose={closeModal}
        />
        )}
    </div>
  )
}

export default EditList
