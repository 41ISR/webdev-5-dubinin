import { useState } from "react";
import "./SearchPage.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { searchMovies } from "../../services/movieService";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!searchTerm.trim()) {
            setError("Пожалуйста, введите название фильма");
            return;
        }

        setLoading(true);
        setError(null);
        setSearched(true);

        try {
            const data = await searchMovies(searchTerm);
            setMovies(data.Search || []);
        } catch (err) {
            setError(err.message || "Произошла ошибка при поиске");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-page">
            <h1>Поиск фильмов</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Введите название фильма..."
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Найти
                </button>
            </form>

            {loading && <LoadingSpinner />}
            
            {error && <ErrorMessage message={error} />}
            
            {!loading && searched && movies.length === 0 && !error && (
                <p className="no-results">Ничего не найдено. Попробуйте другой запрос.</p>
            )}
            
            {movies.length > 0 && (
                <div className="movie-feed">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage