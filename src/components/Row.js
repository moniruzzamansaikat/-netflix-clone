import React, { useEffect, useState } from 'react'
import axios from './../axios'
import './Row.css'
import DemoImg from '../img/placeholder.jpg'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import { API_KEY } from '../request'

const base_url = 'https://image.tmdb.org/t/p/original'
function movieDetails(mId) {
  const base_mv_url = `https://api.themoviedb.org/3/movie/${mId}?api_key=${API_KEY}`
  return fetch(base_mv_url)
    .then((res) => res.json())
    .then((data) => data.imdb_id)
}

export default function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [movieTitle, setMovieTitle] = useState('')
  const [clicked, setClicked] = useState(false)
  const [trailerId, setTrailerId] = useState('')

  useEffect(() => {
    async function fetMovies() {
      const response = await axios.get(fetchUrl)

      // set movies to state
      setMovies(response.data.results)
      setIsLoading(false)
    }

    fetMovies()
  }, [])

  // react-youtube options
  const opts = {
    height: '390',
    width: '99%',
    playerVars: {
      autoplay: 1,
    },
  }

  // handle click
  const handleClick = (movie) => {
    if (trailerId) {
      setTrailerId('')
    } else {
      movieDetails(movie.id).then((id) => {
        if (id)
          movieTrailer(null, { tmdbId: id }, (error, url) => {
            if (url) {
              const nUrl = new URL(url)
              const sUrl = nUrl.search
              const uId = sUrl.substr(sUrl.indexOf('v=') + 2)
              setTrailerId(uId)
            }
          })
      })
    }
    // console.log(movieDetails(movie.id))
    setClicked(true)
  }

  return (
    <div className="row">
      <div className={clicked ? 'overlayer' : 'overlayer d-none '}></div>

      <h2 className="row__title">{title}</h2>

      {/* loop through images */}
      <div className="posters_row">
        {movies.map((movie) => (
          <div
            onClick={() => handleClick(movie)}
            className={`poster_item ${isLarge && 'larger_movie_poster'}`}
            key={movie.id}
          >
            <img
              key={movie.id}
              src={
                isLoading
                  ? DemoImg
                  : isLarge
                  ? base_url + movie.poster_path
                  : base_url + movie.backdrop_path
              }
              alt={movie.name}
            />
            <small className="movie_title">
              {(movie.original_title && movie.original_title.substr(0, 10)) ||
                (movie.name && movie.name.substr(0, 10))}
            </small>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: '40px',
          width: '80%',
          position: 'fixed',
          top: '50%',
          zIndex: 1000,
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {clicked && (
          <button id="close-btn" onClick={() => setClicked(false)}>
            X
          </button>
        )}
        {clicked && <YouTube videoId={trailerId} opts={opts} />}
      </div>
    </div>
  )
}
