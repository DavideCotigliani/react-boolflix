import { useState } from "react"
import axios from "axios"
import Flag from "react-world-flags";

function App() {
  // quello che l'utente digita
  const [userDigit, setUserDigit] = useState("")
  // elenco dei film dell'api
  const [films, setFilms] = useState([]);
  // elenco serie tv
  const [tvSerie, setTvSerie] = useState([]);

  const languageToCountry = {
    en: "US",
    it: "IT",
    fr: "FR",
    de: "DE",
    es: "ES",
    ja: "JP",
    ko: "KR",
    zh: "CN",
    ru: "RU",
    hi: "IN",
    pt: "BR",
    th: "TH"
  };

  const getCountryCode = (langCode) => {
    return languageToCountry[langCode] || null;
  };

  // mentre scrive l'utente, aggiorna la query
  const handleUserChange = (e) => {
    setUserDigit(e.target.value)
  }

  // chiamata AJAX all'endpoint
  const handleEndpoint = (e) => {
    e.preventDefault();
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a47554352f14abca2464ead192f2a073&query=${userDigit}`).then((resp) => {
      setFilms(resp.data.results);
    });
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=a47554352f14abca2464ead192f2a073&query=${userDigit}`).then((resp) => {
      setTvSerie(resp.data.results)
    })
  };
  // rating delle stelle
  const starsVote = (vote) => {
    const votePerStars = Math.ceil(vote / 2);
    let maxStars = 5;
    const stars = [];

    for (let i = 0; i < votePerStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    for (let i = 0; i < maxStars - votePerStars; i++) {
      stars.push(<i className="fa-regular fa-star"></i>)
    }
    return stars
  }

  return (
    <>
      <header>
        <div className="container">
          <h1>Netflix</h1>
          <ul>
            <li><h4>Home</h4></li>
            <li><h4>Serie TV</h4></li>
            <li><h4>Film</h4></li>
            <li><h4>Originali</h4></li>
            <li><h4>Aggiunti di recente</h4></li>
            <li><h4>La mia lista</h4></li>
          </ul>
          <form onSubmit={handleEndpoint}>
            <input type="text" name="title" placeholder="Cerca film o serie tv" value={userDigit} onChange={handleUserChange} />
            <button type="submit">Cerca</button>
          </form>
        </div>
      </header>
      <div className="container2">
        {films.map((film) => (
          <div key={film.id} className="card">
            <div className="card-img">
              <img src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} alt="Poster" />
            </div>
            <div className="overlay">
              <h3 className="card-title">{film.title}</h3>
              <p className="card-text">Titolo originale: {film.original_title}</p>
              <div className="card-language">
                <p>Lingua originale:
                  <Flag className="bandiere" code={getCountryCode(film.original_language)} />
                  {film.original_language.toUpperCase()}</p>
              </div>
              <div className="card-vote">
                <p>Voto medio: {Math.ceil(film.vote_average / 2)}</p> {starsVote(film.vote_average)}
              </div>
            </div>
          </div>
        ))}
        {tvSerie.map((serie) => (
          <div key={serie.id} className="card">
            <div className="card-img px-3">
              <img src={`https://image.tmdb.org/t/p/w342${serie.poster_path}`} alt="Poster" />
            </div>
            <div className="overlay">
              <h3 className="card-title">{serie.name}</h3>
              <p className="card-text">Titolo originale: {serie.original_name}</p>
              <div className="card-language">
                <p>Lingua originale:
                  <Flag className="bandiere" code={getCountryCode(serie.original_language)} />
                  {serie.original_language.toUpperCase()}
                </p>
              </div>
              <div className="card-vote">
                <p>Voto medio: {Math.ceil(serie.vote_average / 2)}</p> {starsVote(serie.vote_average)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
