(() => {
  const URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=ff772b8d44548a71ed4b78f83ff4c864";
  const container = document.getElementById("cardsContainer");

  const createCardNode = function (name, posterURL, rating) {
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

    container.appendChild(cardStyleDiv);
  };

  const renderState = function (list) {
    list["results"].forEach(function (card) {
      createCardNode(
        card["original_title"],
        `https://image.tmdb.org/t/p/original/${card.poster_path}`,
        `${card.vote_average}`
      );
    });
  };

  tmdbFetch(URL, renderState);
})();
