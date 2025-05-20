import { useState } from "react"
import axios from "axios"
import Flag from "react-world-flags";

function App() {
  // quello che l'utente digita
  const [userDigit, setUserDigit] = useState("")
  // elenco dei film dell'api
  const [films, setFilms] = useState([]);

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
    })
  };


  return (
    <>
      <h1>Cerca film</h1>
      <form onSubmit={handleEndpoint}>
        <input type="text" name="title" placeholder="Cerca film" value={userDigit} onChange={handleUserChange} />
        <button type="submit">Cerca</button>
      </form>
      {films.map((film) => (
        <div key={film.id}>
          <h3>{film.title}</h3>
          <p>Titolo originale: {film.original_title}</p>
          <p>Lingua originale:
            <Flag code={getCountryCode(film.original_language)} />
            {film.original_language.toUpperCase()}</p>
          <p>Voto medio: {film.vote_average}</p>
        </div>
      ))}
    </>
  )
}

export default App
