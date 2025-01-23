import React, { useEffect, useState } from 'react'

const FetchThemes = () => {
  const [themes, setThemes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://retroclub.vercel.app/api/getThemes')
      const data = await response.json()
      setThemes(data)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Themes</h1>
      {themes.length > 0 ? (
        <ul>
          {themes.map((theme, index) => (
            <li key={index}>{theme.name}</li>
          ))}
        </ul>
      ) : (
        <p>No themes found.</p>
      )}
    </div>
  )
}

export default FetchThemes
