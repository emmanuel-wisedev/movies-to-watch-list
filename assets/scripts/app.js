const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
// const backdrop = document.body.firstElementChild;
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
// const userInputs = addMovieModal.getElementsByTagName('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];



// Toggle Backdrop
const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

// Update UI
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

// Close Delete Movie Modal
const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};


// Delete Movie
const deleteMovieHandler = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  saveMoviesToLocalStorage();
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
  closeMovieDeletionModal();
  updateUI();
};

// kick off the delete movie process
const startDeleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();

  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId)); // will not work :(
    
  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);

  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

const loadMoviesFromLocalStorage = () => {
  const storedMovies = JSON.parse(localStorage.getItem('movies'));
  if (storedMovies) {
    for (const movie of storedMovies) {
      movies.push(movie);
      renderNewMovieElement(movie.id, movie.title, movie.image, movie.rating);
    }
    updateUI();
  }
}

loadMoviesFromLocalStorage();

// Show and Hide Movie Modal

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  // function() {}
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
};

const saveMoviesToLocalStorage = () => {
  localStorage.setItem('movies', JSON.stringify(movies));
}

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    Number(ratingValue) < 1 ||
    Number(ratingValue) > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  saveMoviesToLocalStorage();
  //console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);


// DARK MODE JS

const darkModeBtn = document.querySelector('span');
const darkHeader = document.querySelector('header');
const darkBody = document.querySelector('body');
const cautionModal = document.querySelector('.caution-card');
const darkInputBox1 = document.querySelector('.input-field1');
const darkInputBox2 = document.querySelector('.input-field2');
const darkInputBox3 = document.querySelector('.input-field3');
// const spanIcon = document.querySelector('.material-symbols-outlined');


const webDarkMode = () => {
  if (!darkHeader.classList.contains('dark-mode') && 
  !darkBody.classList.contains('dark-mode') && 
  !entryTextSection.classList.contains('dark-mode') && 
  !addMovieModal.classList.contains('dark-mode') && 
  !cautionModal.classList.contains('dark-mode')) {
    darkHeader.classList.add('dark-mode');
    darkBody.classList.add('dark-mode');
    entryTextSection.classList.add('dark-mode');
    addMovieModal.classList.add('dark-mode');
    cautionModal.classList.add('dark-mode');
  } else {
    darkHeader.classList.remove('dark-mode');
    darkBody.classList.remove('dark-mode');
    entryTextSection.classList.remove('dark-mode');
    addMovieModal.classList.remove('dark-mode');
    cautionModal.classList.remove('dark-mode');
  }

  if (!darkInputBox1.classList.contains('input-field-background') && 
  !darkInputBox2.classList.contains('input-field-background') && 
  !darkInputBox3.classList.contains('input-field-background')) {
    darkInputBox1.classList.add('input-field-background');
    darkInputBox2.classList.add('input-field-background');
    darkInputBox3.classList.add('input-field-background');
  } else {
    darkInputBox1.classList.remove('input-field-background');
    darkInputBox2.classList.remove('input-field-background');
    darkInputBox3.classList.remove('input-field-background');
  }

  if (!darkModeBtn.classList.contains('span-icon')) {
    darkModeBtn.classList.add('span-icon');
  } else {
    darkModeBtn.classList.remove('span-icon');
  }
}

darkModeBtn.addEventListener('click', webDarkMode)

