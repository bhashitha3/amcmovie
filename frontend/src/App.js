// import React, { useState, useEffect } from 'react';
// import Header from './components/header';
// import axios from 'axios';
// import './App.css';

// const genres = [
//   { id: 0, name: 'All Genres' },
//   { id: 28, name: 'Action' },
//   { id: 12, name: 'Adventure' },
//   { id: 16, name: 'Animation' },
// ];

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState(0); 
//   const [selectedTab, setSelectedTab] = useState('nowPlaying'); 

//   const handleGenreChange = (genreId) => {
//     setSelectedGenre(genreId);
//   };

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//   };

//   const handleLogoClick = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5005/movies`);
//       setMovies(response.data);
//     } catch (error) {
//       console.error(`Error fetching movies:`, error);
//     }
//   };

//   useEffect(() => {
//     handleLogoClick();
//   }, []);

//   const currentYear = new Date().getFullYear();
  
//   const nowPlayingMovies = movies.filter(movie => movie.year === 2023);
//   const upcomingMovies = movies.filter(movie => movie.year === 2024);

//   const filteredMovies = selectedGenre === 0
//     ? nowPlayingMovies
//     : nowPlayingMovies.filter(movie => movie.genre === genres.find(g => g.id === selectedGenre).name);

//   const upcomingFilteredMovies = selectedGenre === 0
//     ? upcomingMovies
//     : upcomingMovies.filter(movie => movie.genre === genres.find(g => g.id === selectedGenre).name);

//   const displayedMovies = selectedTab === 'nowPlaying' ? filteredMovies : upcomingFilteredMovies;

//   return (
//     <div className="app">
//        <Header/>
//       <header className="header">
       
//         <div className="logoplace" onClick={handleLogoClick}>
//           Movies at AMC
//         </div>
//         <div className="genre-filter">
//           <label htmlFor="genre">Filter by Genre:</label>
//           <select id="genre" onChange={(e) => handleGenreChange(Number(e.target.value))}>
//             {genres.map(genre => (
//               <option key={genre.id} value={genre.id}>{genre.name}</option>
//             ))}
//           </select>
//         </div>
//         <div className="tabs">
//           <button
//             className={selectedTab === 'nowPlaying' ? 'active-tab' : ''}
//             onClick={() => handleTabChange('nowPlaying')}
//           >
//             Now Playing
//           </button>
//           <button
//             className={selectedTab === 'upcoming' ? 'active-tab' : ''}
//             onClick={() => handleTabChange('upcoming')}
//           >
//             Upcoming
//           </button>
//         </div>
//       </header>
//       <main className="main-content">
//         <div className="movie-list">
//           {displayedMovies.map((movie) => (
//             <div key={movie._id} className="movie-item">
//               <img src={movie.imageUrl} alt={movie.title} style={{ width: '200px', height: '200px' }} />
//               <h3 className='movie-name'>{movie.title}</h3>
//               <p>Genre: {movie.genre}</p>
//               <p>Year: {movie.year}</p>
//               <button onClick={() => alert(`Get Tickets for ${movie.title}`)}>
//                 Get Tickets
//               </button>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;




// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import GenreFilter from './components/Genrefilter';
import Tabs from './components/Tabs';
import MovieItem from './components/movieitem';
import axios from 'axios';
import './App.css';

const genres = [
  { id: 0, name: 'All Genres' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
];

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedTab, setSelectedTab] = useState('nowPlaying');

  const handleLogoClick = async () => {
    try {
      const response = await axios.get(`https://zfvjan4g8c.execute-api.us-east-1.amazonaws.com/live/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error(`Error fetching movies:`, error);
    }
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    handleLogoClick();
  }, []);

  const currentYear = new Date().getFullYear();

  const nowPlayingMovies = movies.filter(movie => movie.year === 2023);
  const upcomingMovies = movies.filter(movie => movie.year === 2024);

  const filteredMovies = selectedGenre === 0
    ? nowPlayingMovies
    : nowPlayingMovies.filter(movie => movie.genre === genres.find(g => g.id === selectedGenre).name);

  const upcomingFilteredMovies = selectedGenre === 0
    ? upcomingMovies
    : upcomingMovies.filter(movie => movie.genre === genres.find(g => g.id === selectedGenre).name);

  const displayedMovies = selectedTab === 'nowPlaying' ? filteredMovies : upcomingFilteredMovies;

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <GenreFilter genres={genres} selectedGenre={selectedGenre} onGenreChange={handleGenreChange} />
        <Tabs selectedTab={selectedTab} onTabChange={handleTabChange} />
        <div className="movie-list">
          {displayedMovies.map((movie) => (
            <MovieItem key={movie._id} movie={movie} onGetTicketsClick={(title) => alert(`Get Tickets for ${title}`)} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
