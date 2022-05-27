import { useState } from "react"

const Card = ({ movie, handleShow }) => {
  const [isShown, setIsShown] = useState(false)

  return (
    <div
      className="card"
      onClick={() => setIsShown(true)}
    >
      {!isShown && (
        <video className="video" controls autoPlay={true} loop>
          <source src={movie.thumbnail} type="video/mp4" />
        </video>
      )}

      {isShown && (
        <>
          <video className="video" onClick={handleShow(movie)} controls autoPlay={true} loop>
            <source src={movie.thumbnail} type="video/mp4" />
          </video>
          <div className="info-box">
            <p>{movie.title}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Card
