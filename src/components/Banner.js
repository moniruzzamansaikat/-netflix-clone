import React, { useEffect, useState } from 'react'
import axios from '../axios'
import requests from '../request'

const base_url = 'https://image.tmdb.org/t/p/original'

export default function Banner() {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    axios.get(requests.fetchNetflixOriginals).then((response) => {
      const movies = response.data.results
      setMovie(movies[Math.floor(Math.random() * movies.length)])
    })
  }, [])

  console.log(movie)

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${base_url}${movie && movie.backdrop_path})`,
      }}
    >
      <div className="overlay"></div>
      <div className="content">
        <h1 className="banner__title">{movie && movie.name}</h1>
        <p className="banner__desc">{movie && movie.overview}</p>
        <div className="banner__buttons">
          <button>Play</button>
          <button>My List</button>
        </div>
      </div>
    </header>
  )
}
