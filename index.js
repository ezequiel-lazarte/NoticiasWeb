const apiKey = "pWxO6ucDOjbjCj2rJ8KAlCso37JIbZv3";
const section = "science";
const articlesNumber = 10;

const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;

function getArticles() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results) { // comprobar si 'results' no es nulo
        const articles = data.results.slice(0, articlesNumber);
        const container = document.querySelector('#articles-container');
        container.innerHTML = '';

        articles.forEach(article => {
          const articleElement = document.createElement('div');
          articleElement.classList.add('article');

          const imgElement = document.createElement('img');
          imgElement.classList.add('article-img');
          if (article.multimedia && article.multimedia[0]) {
            const imageUrl = article.multimedia[0].url;
            imgElement.setAttribute('src', imageUrl);
          } else {
            imgElement.setAttribute('src', 'https://via.placeholder.com/300x200.png?text=No+Image+Available');
          }
          articleElement.appendChild(imgElement);

          const titleElement = document.createElement('h2');
          titleElement.innerText = article.title;

          const abstractElement = document.createElement('p');
          abstractElement.innerText = article.abstract;

          const urlElement = document.createElement('a');
          urlElement.setAttribute('href', article.url);
          urlElement.setAttribute('target', '_blank');
          urlElement.innerText = 'Read More';

          articleElement.appendChild(titleElement);
          articleElement.appendChild(abstractElement);
          articleElement.appendChild(urlElement);

          container.appendChild(articleElement);
        });
      } else { // manejo de errores si 'results' es nulo
        const container = document.querySelector('#articles-container');
        container.innerHTML = 'Error al cargar noticias. Intente de nuevo más tarde.';
      }
    })
    .catch(error => { // manejo de errores en caso de que la solicitud falle
      console.error(error);
      const container = document.querySelector('#articles-container');
      container.innerHTML = 'Error al cargar noticias. Intente de nuevo más tarde.';
    });
}

getArticles();
