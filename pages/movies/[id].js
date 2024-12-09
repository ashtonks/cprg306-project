import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Extract movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState(null); // State to store cast information

  useEffect(() => {
    document.body.style.backgroundColor = "#1c1917"; // Set the background color explicitly
    return () => {
      document.body.style.backgroundColor = ""; // Clean up when the component is unmounted
    };
  }, []);

  useEffect(() => {
    if (!id) return; // Avoid fetching before `id` is available

    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch cast details
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const castData = await castResponse.json();
        setCast(castData.cast); // Update cast state

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  // Check if movie.release_date and movie.vote_average are available
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster+Available"; // Placeholder image URL
  const releaseDate = movie.release_date || "Release date not available";
  const rating =
    movie.vote_average !== undefined
      ? `${movie.vote_average}/10`
      : "Rating not available";
  const runtime = movie.runtime || "Runtime not available";

  // Format cast into a string (just the first 5 cast members)
  const castList = cast
    ? cast
        .slice(0, 5)
        .map((actor) => actor.name)
        .join(", ")
    : "Cast not available";

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>{movie.title}</h1>
        <img src={posterUrl} alt={movie.title} style={styles.poster} />
        <p style={styles.overview}>{movie.overview}</p>
        <div style={styles.details}>
          <p>
            <strong>Release Date:</strong> {releaseDate}
          </p>
          <p>
            <strong>Rating:</strong> {rating}
          </p>
          <p>
            <strong>Run Time:</strong> {runtime} minutes
          </p>
          <p>
            <strong>Cast:</strong> {castList}
          </p>
        </div>
        <button
          onClick={() => router.push("/")} // Navigate back to the home page
          style={styles.button}
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Full height of the viewport
    width: "100%", // Full width of the page
    margin: 0, // Eliminate any margin
    padding: 0, // Eliminate any padding
    backgroundColor: "#1c1917", // Let the global background apply
    boxSizing: "border-box", // Consistent layout
    borderRadius: "20px",
  },
  content: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "15px",
    color: "white",
  },
  poster: {
    borderRadius: "10px",
    maxWidth: "100%",
    height: "auto",
    marginTop: "20px",
    marginBottom: "20px",
  },
  overview: {
    fontSize: "1rem",
    color: "white",
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  details: {
    fontSize: "1.1rem",
    color: "white",
    marginTop: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#ea580c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.6)",
  },
};

export default MovieDetails;
