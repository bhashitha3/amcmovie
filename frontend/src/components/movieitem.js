// MovieItem.js
import React from 'react';

function MovieItem({ movie, onGetTicketsClick }) {
  return (
    <div key={movie._id} className="movie-item">
      <img src={movie.imageUrl} alt={movie.title} style={{ width: '200px', height: '200px' }} />
      <h3 className='movie-name'>{movie.title}</h3>
      <p>Genre: {movie.genre}</p>
      <p>Year: {movie.year}</p>
      <button onClick={() => onGetTicketsClick(movie.title)}>
        Get Tickets
      </button>
    </div>
  );
}

export default MovieItem;
