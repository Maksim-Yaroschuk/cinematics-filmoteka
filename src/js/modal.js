import { list, lib, modalBackdrop, btnOnModalTeam, movieModal} from './refs';
import { modalMoviemarkup, modalTeamLayout } from './modalMovieMarkup';
import { addListLibrary, funAddQueue } from './storage';
 
import { libMarkup } from './lib';



import team from './team-info';
import { trailerBtnListener } from './trailer';


if (list) {
  list.addEventListener('click', createModal);
}
if (lib) {
  lib.addEventListener('click', createModal);
}
btnOnModalTeam.addEventListener('click', onModalTeam);

function createModal(event) {
  const selectedMovie = event.target.closest('li');
  //Проверка "если нажали на 'li' то открываем модалку и считываем 'key'"
  if (selectedMovie) {
    //Получение данных о фильме в модалку
    const selectedMovieId = Number(selectedMovie.getAttribute('key'));
    const moviesData = JSON.parse(localStorage.getItem('moviesData'));
    const movieData = moviesData.find(movie => movie.id === selectedMovieId);
    renderModalContent(movieData);
    openModal();


    // записываем айди в модалку
    modalBackdrop.firstElementChild.dataset.id = movieData.id;
    // подключаем кнопки
    onBntAddLibray();

    // onBntAddLibray(selectedMovieId);
    trailerBtnListener(selectedMovieId)
  }
}

// Кнопки
function onBntAddLibray() {
  // ссылки на элемент кнопки
  const btnAddWatched = document.querySelector('.modal__add-watched');
  const btnAddQueue = document.querySelector('.modal__add-queue');
  const idMovie = Number(modalBackdrop.firstElementChild.dataset.id);
  const dataWebLocation = document.querySelector('body').getAttribute('data-weblocation');

  if (dataWebLocation === 'library') {
    setBtnLibrayLocalData(btnAddWatched, btnAddQueue);
  }
  // фц проверяют есть ли в локале фильмы и ставять соответсвенный класс
  if (localStorage.getItem('Watched') !== null) {
    setStileBntWatched(idMovie, btnAddWatched);
  }

  if (localStorage.getItem('Queue') !== null) {
    setStileBntQueue(idMovie, btnAddQueue);
  }

  // слушатели на клик
  btnAddWatched.addEventListener('click', e => {
    // добавить в локал или убрать с локала

    addListLibrary(idMovie, 'Watched');
    updataLibery(e, btnAddWatched, 'Watched');

    // еще раз проверить наличие в локал и изменить кнопку
    setStileBntWatched(idMovie, btnAddWatched);
  });

  btnAddQueue.addEventListener('click', e => {
    // добавить в локал или убрать с локала
    addListLibrary(idMovie, 'Queue');
    updataLibery(e, btnAddQueue, 'Queue');
    // еще раз проверить наличие в локал и изменить кнопку
    setStileBntQueue(idMovie, btnAddQueue);
  });
}

function setStileBntWatched(selectedMovieId, btnAddWatched) {
  if (localStorage.getItem('Watched') === null) {
    return;
  } else {
    const watched = localStorage.getItem('Watched').includes(selectedMovieId);
    btnAddWatched.dataset.watched = watched;

    if (watched) {
      btnAddWatched.textContent = 'remove from watched';
    } else {
      btnAddWatched.textContent = 'add to watched';
    }
  }
}

function setStileBntQueue(selectedMovieId, btnAddQueue) {
  if (localStorage.getItem('Queue') === null) {
    return;
  } else {
    const queue = localStorage.getItem('Queue').includes(selectedMovieId);
    btnAddQueue.dataset.queue = queue;
    if (queue) {
      btnAddQueue.textContent = 'remove from queue';
    } else {
      btnAddQueue.textContent = 'add to queue';
    }
  }
}

function updataLibery(e, btn, list) {
  const dataWebLocation = e.target
    .closest('body')
    .getAttribute('data-weblocation');

  if (dataWebLocation === 'library') {
    lib.innerHTML = '';
    libMarkup(list);
    const dataBtn = btn.dataset.liery;
    if (dataBtn === 'true') {
      btn.setAttribute('disabled', true);
    } else {
      return
    }
  }
  return;
}

function setBtnLibrayLocalData(btnAddWatched, btnAddQueue) {
  const btnLibWatch = document.querySelector('.btn--watched');

  if (btnLibWatch.classList.contains('btn-orange')) {
    btnAddWatched.dataset.liery = true;
    btnAddQueue.dataset.liery = false;
  } else {
    btnAddWatched.dataset.liery = false;
    btnAddQueue.dataset.liery = true;
  }
} 

function openModal() {
  modalBackdrop.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
	document.body.classList.add('modal-open')

  setCloseOptionModal();
}

function setCloseOptionModal() {
  modalBackdrop.addEventListener('click', offModalForClickBeackdrop);
  document.addEventListener('keydown', offModalForEscape);
  document
    .querySelector('.modal__btn-closs')
    .addEventListener('click', offModal);
}

function renderModalContent(movieData) {
  modalBackdrop.firstElementChild.innerHTML = modalMoviemarkup(movieData);
}

function offModalForEscape(e) {
  if (e.key === 'Escape') {
    offModal();
  }
}

function offModalForClickBeackdrop(e) {
  if (e.target === modalBackdrop) {
    offModal();
  }
}

function offModal() {
	modalBackdrop.firstElementChild.classList.remove('team-modal')
	modalBackdrop.firstElementChild.classList.add('modal')
  modalBackdrop.classList.remove('modal-open');
  document.body.style.overflow = 'overlay';
	document.body.classList.remove('modal-open')
  document.removeEventListener('keydown', offModalForEscape);
  modalBackdrop.removeEventListener('keydown', offModalForClickBeackdrop);
  modalBackdrop.firstElementChild.dataset.id = '';

  movieModal.innerHTML = ''
  
}

// модалка команды

const modalCloseBtn = `
<button class="modal__btn-closs btn__closs-modal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        class="bi bi-x-lg"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        />
      </svg>
    </button>
`;

const modalTeamList = document.createElement('ul');

function onModalTeam(e) {
  e.preventDefault();

  renderTeamModal();
  openModal();
	modalBackdrop.firstElementChild.classList.add('team-modal')
	modalBackdrop.firstElementChild.classList.remove('modal')
}

function renderTeamModal() {
	modalBackdrop.firstElementChild.innerHTML=''
	modalTeamList.innerHTML=''
	modalBackdrop.firstElementChild.insertAdjacentElement('beforeend', modalTeamList)
	modalBackdrop.firstElementChild.insertAdjacentHTML('beforeend', modalCloseBtn)
	modalTeamList.classList.add('team-modal__list')
	team.map((member) => {
		const markup = `<li class="team-modal__item">
		<img src="${member.img}" class="team-modal__pic">
		<p class="team-modal__name">${member.name}</p>
		<div>
		<a href="${member.git}" class="team-modal__link">
		<img src="/images/git.png" class="team-modal__icon">
		</a>
		</div>
		</li>`
		modalTeamList.insertAdjacentHTML('beforeend', markup)
	})
}
