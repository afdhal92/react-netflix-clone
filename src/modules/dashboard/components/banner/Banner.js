import React, { useState, useEffect } from 'react';
import _axios from '_axios';
import _requests from '_requests';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await _axios.get(_requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]
            );
            return request;
        }

        fetchData();
    }, [])

    function truncate(str, num) {
        return str?.length > num ? str.substr(0, num - 1) + "..." : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
            }}
        >
            <div className="banner__contents">
                {/* title */}
                <h1 className="banner__title"> {movie?.title || movie?.name || movie?.original_name} </h1>
                {/* 2 buttons */}
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                {/* description */}
                <h1 className="banner__description">
                    { truncate( movie?.overview, 150) }
                </h1>
            </div>
            <div className="banner__fadeBottom"></div>
        </header>
    )
}

export default Banner
