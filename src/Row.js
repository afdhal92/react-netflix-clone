import axios from 'axios';
import React, { useEffect, useState } from "react";
import getAxiosInstance from './axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Row.css'

const base_url = 'https://image.tmdb.org/t/p/original'

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData () {
            const request = await getAxiosInstance.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }

        fetchData();
    }, [fetchUrl]); // if [], run once when the row loads, and don't run again

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        },
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                console.log(url)
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'))
            
            }).catch((error) => console.log(error))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {/* row__poster(s) */}

                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        onClick={() => handleClick(movie)}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name} />
                ))}

            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
