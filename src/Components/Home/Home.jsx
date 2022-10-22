import React, { useState } from "react";
import "./Home.scss";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "55446905b4b9eaffb5b176ca422609fa";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const now_playing = "now_playing";
const top_rated = "top_rated";
const popular = "popular";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [{}] }) => (
  <div className="row">
    <h2>{title}</h2>

    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=4`);
      setUpcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${now_playing}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${top_rated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };

    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchTopRated();
    fetchPopular();
    getAllGenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: topRatedMovies[0]
            ? `url(${`${imgUrl}/${topRatedMovies[18].poster_path}`})`
            : "rgb(255,255,255)",
        }}
      >
        {topRatedMovies[0] && <h1>{topRatedMovies[18].original_title}</h1>}
        {topRatedMovies[0] && <p>{topRatedMovies[18].overview}</p>}
       
        <div className="buttons">
          <button><BiPlay /> Play</button>
          <button>My List <AiOutlinePlus /></button>
        </div>

      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Now Playing Movies"} arr={nowPlayingMovies} />
      <Row title={"Top-Rated Movies"} arr={topRatedMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
