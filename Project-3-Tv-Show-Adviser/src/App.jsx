import { useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css";
import s from "./style.module.css";
import { useEffect } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./Components/TVShowDetail/TVShowDetail";
import { Logo } from "./Components/Logo/Logo";
import logo from "./assets/images/logo.png";
import { TVShowList } from "./Components/TVShowList/TVShowList";
import { SearchBar } from "./Components/SearchBar/SearchBar";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopular() {
    try {
      const popular = await TVShowAPI.fetchPopular();

      if (popular.length > 0) {
        setCurrentTVShow(popular[0]);
      }
    } catch (error) {
      alert("Erreur de communication avec l'API !");
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendationList = await TVShowAPI.fetchRecommendation(tvShowId);

      if (recommendationList.length > 0) {
        setRecommendationList(recommendationList.slice(0, 10));
      }
    } catch (error) {
      alert("Erreur de communication avec l'API !");
    }
  }

  async function fetchSearchByTitle(tvShowName) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);

      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Erreur de communication avec l'API !");
    }
  }

  useEffect(() => {
    fetchPopular();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), fixed url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logo}
              title="Watowatch"
              subtitle="Find a show you may like"
            />
          </div>
          <div className="col-sm-12 col-md-4">
            <SearchBar onSubmit={fetchSearchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {recommendationList && recommendationList.length > 0 && (
          <TVShowList
            onClickItem={setCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
