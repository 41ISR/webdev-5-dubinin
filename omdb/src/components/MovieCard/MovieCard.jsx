import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = () => {
    const navigate = useNavigate();
    const defaultImage = 'https://via.placeholder.com/300x450?text=No+Image';

    const handleClick = () => {
        navigate(`/movie/${movie.imdbID}`);
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : defaultImage} 
                alt={movie.Title} 
                className="movie-card__image" 
            />
            <div className="movie-card__info">
                <h4 className="movie-card__title">{movie.Title}</h4>
                <div className="movie-card__year">{movie.Year}</div>
            </div>
        </div>
    );
};

export default MovieCard