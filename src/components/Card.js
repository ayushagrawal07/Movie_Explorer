import React from 'react'

const Card = ({movie}) => {
  return (
    <div key={movie.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={movie.image ? movie.image.original : 'https://www.shutterstock.com/shutterstock/photos/745639717/display_1500/stock-vector-no-image-available-vector-hand-drawn-illustration-with-camera-icon-on-white-background-745639717.jpg'} alt={movie.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{movie.name}</div>
              <p className="text-gray-1000 text-base">{movie.summary ? movie.summary.replace(/<\/?[^>]+(>|$)/g, "") : 'No synopsis available.'}</p>
              <p className="text-gray-1000 text-base"><b>Rating:</b> {movie.rating.average ? movie.rating.average : 'N/A'}</p>
              <p className="text-gray-1000 text-base"><b>Genre:</b> {movie.genres && movie.genres.length > 0 ? movie.genres.join(', ') : 'N/A'}</p>
     
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{movie.premiered ? movie.premiered.split('-')[0] : 'Unknown Year'}</span>
            </div>
    </div>
  )
}

export default Card