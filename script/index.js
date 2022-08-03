const TMDB_API_KEY = "ff772b8d44548a71ed4b78f83ff4c864";
// API URL Ex.
//https://api.themoviedb.org/3/movie/latest?api_key=ff772b8d44548a71ed4b78f83ff4c864
const xhr = new XMLHttpRequest();

fetch = (url, cb) => {
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      cb(data);
    }
  };
  xhr.open("GET", url);
  xhr.send();
};
