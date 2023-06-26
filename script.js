const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form');
const searchInput = document.getElementById('search');
const main = document.getElementById('main');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = searchInput.value;
  getUser(username);
});

function getUser(username) {
  axios.get(`${APIURL}${username}`)
    .then(response => {
      const user = response.data;
      displayUser(user);
    })
    .catch(error => {
      console.error(error);
      displayError('User profile not found');
    });
};

function displayUser(user) {
    main.innerHTML = `
      <div class="user-card">
        <img src="${user.avatar_url}" alt="User Avatar">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
          <li>Seguidores: ${user.followers}</li>
          <li>Siguiendo: ${user.following}</li>
          <li>Repositorios públicos: ${user.public_repos}</li>
        </ul>
        <a href="${user.html_url}" target="_blank">Ver perfil</a>
      </div>
    `;
};  

function displayError(message) {
  main.innerHTML = `<p class="error">${message}</p>`;
}
