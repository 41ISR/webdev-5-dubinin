import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../services/movieService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovieDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                setError(err.message || 'Не удалось загрузить информацию о фильме');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadMovieDetails();
        }
    }, [id]);

    const goBack = () => navigate(-1);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!movie) return null;

    const defaultImage = 'https://via.placeholder.com/300x450?text=No+Image';

    return (
        <div className="movie-details">
            <button onClick={goBack} className="back-button">
                ← Назад
            </button>
            
            <div className="movie-details__content">
                <div className="movie-details__poster">
                    <img 
                        src={movie.Poster !== 'N/A' ? movie.Poster : defaultImage} 
                        alt={movie.Title} 
                    />
                </div>
                
                <div className="movie-details__info">
                    <h1>{movie.Title} ({movie.Year})</h1>
                    
                    <div className="movie-details__rating">
                        <span className="rating-label">⭐ IMDB:</span>
                        <span className="rating-value">{movie.imdbRating}/10</span>
                    </div>
                    
                    <div className="movie-details__meta">
                        <p><strong>Жанр:</strong> {movie.Genre}</p>
                        <p><strong>Режиссер:</strong> {movie.Director}</p>
                        <p><strong>Актеры:</strong> {movie.Actors}</p>
                        <p><strong>Страна:</strong> {movie.Country}</p>
                        <p><strong>Язык:</strong> {movie.Language}</p>
                        <p><strong>Продолжительность:</strong> {movie.Runtime}</p>
                        <p><strong>Дата выхода:</strong> {movie.Released}</p>
                    </div>
                    
                    <div className="movie-details__plot">
                        <h3>Описание</h3>
                        <p>{movie.Plot}</p>
                    </div>
                    
                    {movie.Awards && movie.Awards !== 'N/A' && (
                        <div className="movie-details__awards">
                            <strong>🏆 Награды:</strong> {movie.Awards}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;