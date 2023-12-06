// GenreFilter.js
import React from 'react';

function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="genre-filter">
      <label htmlFor="genre">Filter by Genre:</label>
      <select id="genre" value={selectedGenre} onChange={(e) => onGenreChange(Number(e.target.value))}>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
