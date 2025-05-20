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

  return (
    <>
      <h1>Cerca film e serie TV</h1>
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
      {tvSerie.map((serie) => (
        <div key={serie.id}>
          <h3>{serie.name}</h3>
          <p>Titolo originale: {serie.original_name}</p>
          <p>Lingua originale:
            <Flag code={getCountryCode(serie.original_language)} />
            {serie.original_language.toUpperCase()}
          </p>
          <p>Voto medio: {serie.vote_average}</p>
        </div>
      ))}
    </>
  )
}

export default App
