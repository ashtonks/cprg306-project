import { useState } from "react";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchMovies = async () => {
    if (!query.trim()) return; // Prevent empty queries
    const response = await fetch(
      `/api/searchMovies?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setMovies(data.results || []);
    setSearchPerformed(true);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.searchBar}
        />
        <button onClick={searchMovies} style={styles.searchButton}>
          Search
        </button>
        {searchPerformed ? (
          <p style={{ fontWeight: "bold" }}>Displaying Results for {query}:</p>
        ) : null}
      </div>

      {/* Movie Results */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
          color: "black",
          fontWeight: "bold",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              margin: "10px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{
                borderRadius: "10px",
                marginBottom: "10px",
                width: "100%",
              }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;

const styles = {
  searchBar: {
    marginBottom: "20px",
    borderRadius: "10px",
    color: "white",
    border: "1px solid black",
    backgroundcolor: "white",
    padding: "5px",
    border: "2px solid white",
    backgroundColor: "#27272a",
  },
  searchButton: {
    padding: "5px",
    margin: "10px",
    borderRadius: "10px",
    color: "white",
    border: "2px solid white",
    backgroundcolor: "white",
  },
};
