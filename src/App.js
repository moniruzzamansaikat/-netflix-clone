import React, { useState } from 'react'

import './App.css'
import requests from './request'
import Row from './components/Row'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './components/Footer'

function App() {
  const [isDark, setIsDark] = useState(true)
  const handleDark = (darkness) => setIsDark(darkness)

  return (
    <div
      className="App"
      style={
        isDark
          ? {
              backgroundColor: '#1e1616',
              color: '#fff',
            }
          : null
      }
    >
      <Navbar makeDark={handleDark} />
      <Banner />

      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarge
      />
      <Row title="Trending" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Actions Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

      {/* footer */}
      <Footer />
    </div>
  )
}

export default App
