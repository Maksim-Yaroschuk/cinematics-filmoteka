//import { renderMarkup } from './renderMarkup';//createListMarkup
import { list } from './refs';
import { createListMarkup, getMovieDetails, renderMarkup } from './renderMarkup';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const remove = key => {

try {
    localStorage.removeItem(key);
    
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
}

export default {
	save,
	load,
	remove,
};

//console.log(getSearchMovie);

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');
// const btnAddWatched = document.querySelector('.modal__watched');
// const btnAddQueue = document.querySelector('.modal__queue');
const poster = document.querySelector('.poster-list__item');

// console.log('btnWatched', btnWatched);
// console.log('btnQueue', btnQueue);
// console.log('btnAddWatched', btnAddWatched);
// console.log('btnAddQueue',  btnAddQueue);
console.log('poster', poster);

// btnWatched.addEventListener("click", filterWatched);
// btnQueue.addEventListener("click", filterQueue);
// btnAddWatched.addEventListener("click",funAddWatched );
// btnAddQueue.addEventListener("click", funAddQueue);
// poster.addEventListener("click", funAddQueue);


function funAddLib(val) {
	const array = load(val);
	console.log('array', array);
	const id = Number(selectedMovie.getAttribute('key'));
	console.log('id', id);
	const index = array.indexOf(id);
	console.log('index',index);
	if (index<0) {
		WatchedArr.push(id);
	} else {
		WatchedArr.splice(id, 1);
		console.log('array', array);
	}
	save(val, array);
	console.log('load', load(val));
}

function funAddWatched() {
	const WatchedArr = load(Watched);
	console.log('WatchedArr', WatchedArr);
	const id = Number(selectedMovie.getAttribute('key'));
	console.log('id', id);
	const index = WatchedArr.indexOf(id);
	console.log('index',index);
	if (index<0) {
		WatchedArr.push(id);
	} else {
		WatchedArr.splice(id, 1);
		console.log('WatchedArr', WatchedArr);
	}
	save('Watched', WatchedArr);
	console.log('load(Watched)', load(Watched));
}

function funAddQueue() {
	const QueueArr = load(Queue);
	console.log('WatchedArr', QueueArr);
	const id = Number(selectedMovie.getAttribute('key'));
	console.log('id', id);
	const index = QueueArr.indexOf(id);
	console.log('index',index);
	if (index<0) {
		QueueArr.push(id);
	} else {
		QueueArr.splice(id, 1);
		console.log('WatchedArr', QueueArr);
	}
	save('Watched', QueueArr);
	console.log('load(Watched)', load(Queue));
}


const filterWatched = () => {
	const WatchedList = load(Watched);
	console.log('WatchedArr', WatchedArr);

	if (!WatchedList.length) {
		return console.log('ваш список пуст!');
	}
	 watchedList.map(() => {
		getMovieDetails();
		createListMarkup(data)
	 })
	renderMarkup(data);
};


const filterQueue = () => {
	const WatchedList = load(Queue);
	console.log('QueueArr', QueueList);

	if (!WatchedList.length) {
		return console.log('ваш список пуст!');
	}
	 watchedList.map(() => {
		getMovieDetails();
		createListMarkup(data)
	 })
	renderMarkup(data);
};

const filterLiberty = (val) => {
	const List = load(val);
	console.log('WatchedArr', List);

	if (!List.length) {
		return console.log('ваш список пуст!');
	}
	 watchedList.map(() => {
		getSearchMovieId();
		//getMovieDetails();
		createListMarkup(data);
	 })
	renderMarkup(data);
};

const getSearchMovieId = async (id) => {
  const { data } = await axios.get(
    `/search/movie?api_key=${KEY}&language=en-US&id=${id}`
  );
  return data;
};

