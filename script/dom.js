(() => {
  const URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=ff772b8d44548a71ed4b78f83ff4c864";
  const ANIME_URL =
    "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0";

  let dataMovie = [];
  let dataAnime = [];

  const container = document.getElementById("cardsContainer");
  const animeContainer = document.getElementById("animeCardsContainer");
  const searchContainer = document.getElementById("searchDiv");
  const btnSearch = document.getElementById("searchButton");
  const searchQuery = document.getElementById("inner_search_v4");
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];

  btnSearch.addEventListener("click", search);
  function search() {
    value = searchQuery.value;
    let result = dataAnime.filter((element) => {
      return element.title.includes(value);
    });
    console.log(result);
    modal.style.display = "block";
    renderSearchBox(result);
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const createCardNode = function (name, posterURL, rating, isAnimeAPI) {
    const cardStyleDiv = document.createElement("div");
    cardStyleDiv.classList.add("card_style");
    const imgCardDiv = document.createElement("div");
    imgCardDiv.classList.add("img", "nopad");
    const poster = document.createElement("img");
    poster.classList.add("poster");
    poster.src = posterURL;
    poster.alt = "Poster";
    const title = document.createElement("h4");
    title.textContent = name;
    const rate = document.createElement("p");
    rate.textContent = rating;

    imgCardDiv.appendChild(poster);
    imgCardDiv.appendChild(title);
    imgCardDiv.appendChild(rate);

    cardStyleDiv.appendChild(imgCardDiv);

    isAnimeAPI
      ? animeContainer.appendChild(cardStyleDiv)
      : container.appendChild(cardStyleDiv);

    return cardStyleDiv;
  };

  function mappingData(list, isAnimeAPI) {
    isAnimeAPI
      ? list.map((element) => {
          dataAnime.push({
            title: element.attributes.canonicalTitle,
            poster: element.attributes.posterImage.tiny,
            ratings: element.attributes.averageRating,
            isAnimeAPI,
          });
        })
      : list.map((element) => {
          dataMovie.push({
            title: element["original_title"],
            poster: `https://image.tmdb.org/t/p/original/${element.poster_path}`,
            ratings: `${element.vote_average}`,
            isAnimeAPI,
          });
        });
  }

  const renderState = function (list) {
    mappingData(list["results"], false);
    dataMovie.forEach(function (card) {
      createCardNode(card.title, card.poster, card.ratings, false);
    });
  };

  const anmieRenderState = function (list) {
    mappingData(list.data, true);
    dataAnime.forEach(function (card) {
      createCardNode(card.title, card.poster, card.ratings, true);
    });
  };

  const renderSearchBox = function (list) {
    list.forEach(function (card) {
      let a = createCardNode(card.title, card.poster, card.ratings, false);
      searchContainer.appendChild(a);
    });
  };
  setTimeout(() => {
    fetch(URL, renderState);
  }, 700);
  setTimeout(() => {
    fetch(ANIME_URL, anmieRenderState);
  }, 0);
})();
