import { useState, useEffect } from 'react'
import Nav from './Nav'

const HeroSection = () => {
  const [movie, setMovie] = useState(null)
  const pageState = null

  const randomGenre = () => {
    const genres = ['Action', 'Anime', 'Award-Winning', 'Children & Family', 'Comedies', 'Documentaries', 'Dramas', 'Fantasy', 'French', 'Horror', 'Independent', 'Music & Musicals', 'Romance', 'Sci-Fi', 'Thriller']
    return genres[Math.floor(Math.random() * genres.length)]
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/.netlify/functions/getMovies', {
        method: 'POST',
        body: JSON.stringify({ genre: randomGenre(), pageState: pageState }),
      })
      const responseBody = await response.json()
      const movies = responseBody.data.movies_by_genre.values
      setMovie(movies[Math.floor(Math.random() * movies.length)])
    }
    fetchData()
  }, [])

  return (
    <>
      {movie && (
        <div className='hero'>
          <video className='hero-video' muted controls autoPlay={true} loop>
            <source src={movie.thumbnail} type='video/mp4' />
          </video>
          <div className='info-section'>
            <Nav />
            <h3 className='hero-blurb'>{movie.synopsis}</h3>
            <div className='button-section'>
              <div className='button play'>
                <span>
                  <i className='fas fa-play'></i>
                </span>
                Play
              </div>
              <div className='button more'>
                <span>
                  <i className='fas fa-info-circle'></i>
                </span>
                More info
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HeroSection
