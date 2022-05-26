import { useEffect, useState } from 'react'
import Card from './Card'
import { Box, Typography } from '@mui/material';

const Section = ({ genre }) => {
  const [movies, setMovies] = useState(null)
  const [pageState, setPageState] = useState(null)

  const fetchData = async () => {
    const response = await fetch('/.netlify/functions/getMovies', {
      method: 'POST',
      body: JSON.stringify({ genre: genre, pageState: pageState }),
    })
    const responseBody = await response.json()
    setMovies(responseBody.data.movies_by_genre.values)
    setPageState(responseBody.data.movies_by_genre.pageState)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ justifyContent: 'center', display: 'grid' }}>
      <Box sx={{ textAlign: 'center', display: 'flex' }}>
        <Typography variant='h4'>{genre}</Typography>
      </Box>
      <Box sx={{ justifyContent: 'center', display: 'flex', marginLeft: '10%' }}>
        {movies && (
          <div className='movie-section'>
            {movies.map((movie, index) => (
              <Card key={index} movie={movie} />
            ))}
            <div
              className='more-button'
              onClick={() => {
                setPageState(pageState)
                fetchData()
              }}
            >
              <i className='fas fa-angle-right'></i>
            </div>
          </div>
        )}
      </Box>

    </Box>
  )
}

export default Section
