import React, { useState } from 'react';
import Spinner from './Spinner';
import Card from './Card';

const Search = () => {
  const [query, setQuery] = useState('');
  const [rating, setRating] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [year,setYear] = useState('');
  const [Language,setLanguage] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };
  
  function HandleYearChange(e){
    setYear(e.target.value);
  }
  function HandleLanguage(e){
    setLanguage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const baseUrl = `https://api.tvmaze.com/search/shows?q=${query}`;
      const res = await fetch(baseUrl);
      const data = await res.json();

      if (data.length === 0) {
        setError('No movies found.');
      } else {
        console.log(data);
        // Filter movies based on the rating input
        const filteredMovies = data.map(d => d.show).filter(movie => {
        const movieRating = movie.rating && movie.rating.average ? movie.rating.average : 0;
         const filter_rating = (movieRating>=parseFloat(rating || 0)) === true ? true:false;
         const filter_year = year?(movie.premiered && movie.premiered.split('-')[0]===year):true
         const filter_lang = Language ? (movie.language && movie.language.toLowerCase() === Language.toLowerCase()) : true; 
       

         return (filter_rating && filter_year && filter_lang)
        });

        if (filteredMovies.length === 0) {
          setMovies([]);
          setError('No movies found with the specified rating.');
        } else {
          setMovies(filteredMovies);
        }
      }
    } catch (e) {
      console.log(e);
      setError('Error fetching movie data.');
    }
      setLoading(false);
    
  };


  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold mb-4 mt-10">Movie Explorer</h1>
    <form onSubmit={handleSubmit} className="w-full max-w-sm mb-4">
      <div className="flex flex-col space-y-4 border-b border-teal-500 py-2">
        <input
          type="text"
          placeholder="Search movies"
          value={query}
          onChange={handleChange}
          className="appearance-none bg-gray-800 border border-white text-gray-200 w-full py-2 px-4 rounded leading-tight focus:outline-none focus:bg-gray-700"
        />
        <input
          type="number"
          placeholder="Minimum Rating"
          value={rating}
          onChange={handleRatingChange}
          className="appearance-none bg-gray-800 border border-white text-gray-200 w-full py-2 px-4 rounded leading-tight focus:outline-none focus:bg-gray-700"
          min="0"
          max="10"
          step="0.1"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={HandleYearChange}
          className="appearance-none bg-gray-800 border border-white text-gray-200 w-full py-2 px-4 rounded leading-tight focus:outline-none focus:bg-gray-700"
        />
        <input
            type="text"
            placeholder="Language"
            value={Language}
            onChange={HandleLanguage}
            className="appearance-none bg-gray-800 border border-white text-gray-200 w-full py-2 px-4 rounded leading-tight focus:outline-none focus:bg-gray-700"
          />
        <button
          type="submit"
          className="flex-shrink-0 bg-red-600 hover:bg-red-800 border border-[rgb(199, 106, 106)] text-sm text-white py-2 px-4 rounded"
        >
          {loading ? <Spinner /> : 'Submit'}
        </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
         <Card movie = {movie}/>
        ))}
      </div>
    </div>
  );
};

export default Search;
