let marginY = 0
let destination = 0
let speed = 15
let scroller = null

const initScroll = (elementId) => {
  destination = document.getElementById(elementId).offsetTop
  scroller = setTimeout(() => {
    initScroll(elementId)
  }, 1)
  marginY += speed
  if (marginY >= destination) {
    clearTimeout(scroller)
  }
  window.scroll(0, (marginY - 35))
}

const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <div className="logo"></div>
        </li>
        <li>
          <a onClick={() => initScroll('Action')} href="#Action"> Action · </a>
          <a onClick={() => initScroll('Anime')} href="#Anime"> Anime · </a>
          <a onClick={() => initScroll('Award-Winning')} href="#Award-Winning"> Award-Winning · </a>
          <a onClick={() => initScroll('Children & Family')} href="#Children & Family"> Children & Family · </a>
          <a onClick={() => initScroll('Comedies')} href="#Comedies"> Comedies · </a>
          <a onClick={() => initScroll('Documentaries')} href="#Documentaries"> Documentaries · </a>
          <a onClick={() => initScroll('Dramas')} href="#Dramas"> Dramas</a>
          <br></br>
          <a onClick={() => initScroll('Fantasy')} href="#Fantasy"> Fantasy · </a>
          <a onClick={() => initScroll('French')} href="#French"> French · </a>
          <a onClick={() => initScroll('Horror')} href="#Horror"> Horror · </a>
          <a onClick={() => initScroll('Independent')} href="#Independent"> Independent · </a>
          <a onClick={() => initScroll('Music & Musicals')} href="#Music & Musicals"> Music & Musicals · </a>
          <a onClick={() => initScroll('Romance')} href="#Romance"> Romance · </a>
          <a onClick={() => initScroll('Sci-Fi')} href="#Sci-Fi"> Sci-Fi · </a>
          <a onClick={() => initScroll('Thriller')} href="#Thriller"> Thriller </a>
        </li>
      </ul>
    </div>
  )
}

export default Nav
