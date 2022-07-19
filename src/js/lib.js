//import { renderMarkup } from './renderMarkup';//createListMarkup getMovieDetails,
import { list } from './refs';
import { renderMarkup , createListMarkup} from './renderMarkup';
import { loadLs } from './storage';
import { getTrending, getSearchMovieId } from './api';

//import { filterWatched, filterQueue } from './storage';

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');
if(btnWatched ){
console.log('btnWatched', btnWatched);
console.log('btnQueue', btnQueue);}
// 

if (btnWatched!==null) {
	btnWatched.addEventListener("click", filterWatched);
	btnQueue.addEventListener("click", filterQueue);
}

function filterWatched() {
	const WatchedList = loadLs('Watched');
	console.log('WatchedList',WatchedList);

	if (!WatchedList || !WatchedList.length) {
		return console.log('ваш список Watched пуст!');
	}
	getTrending(1).then((r) => {
		console.log('ваш список Watched', r);
	renderMarkup(r)});//.console.log('btnQueue', btnQueue);
	
};

function filterQueue(){
	const QueueList = loadLs('Queue');
	console.log('QueueArList', QueueList);
	if (!QueueList || !QueueList.length ) {
		return console.log('ваш список Queue пуст!');
	}
	getSearchMovieId(1).then((q) => {
		console.log('ваш список Queue', q);
	renderMarkup(q)});
};

// function filterLiberty(val){
// 	const list = loadLs(val);
// 	console.log('WatchedArr', list);

// 	if (!list.length) {
// 		return console.log('ваш список пуст!');
// 	}
// 	 list.map(() => {
// 		getSearchMovieId();
// 		//getMovieDetails();
// 		//createListMarkup(data);
// 	 })
// 	renderMarkup(data);

// };



// export const getTrending = async (page = 1) => {
//   const { data } = await axios.get(
//     `/trending/movie/week?api_key=${KEY}&page=${page}`
//   );
//   return data;
// };
// function funAddLib(val) {
// 	const array = loadLs(val);
// 	console.log('array', array);
// 	const id = Number(selectedMovie.getAttribute('key'));
// 	console.log('id', id);
// 	const index = array.indexOf(id);
// 	console.log('index',index);
// 	if (index<0) {
// 		WatchedArr.push(id);
// 	} else {
// 		WatchedArr.splice(id, 1);
// 		console.log('array', array);
// 	}
// 	saveLs(val, array);
// 	console.log('loadLs', loadLs(val));
// }
// function createId(event) {
// 	const selectedMovie = event.target.closest('li');
//   console.log('selectedMovie', selectedMovie);
// 	if (selectedMovie) {
// 		//Получение данных о фильме в модалку
// 		modId = Number(selectedMovie.getAttribute('key'));
// 	}
	
// }

// export {
// 	//funAddLib,
// 	//getSearchMovieId,
// 	//filterLiberty,
// 	//filterWatched,
// 	funAddWatched,
// 	funAddQueue,
// 	saveLs,
// 	loadLs,
// 	removeLs,
// };
// btnWatched.addEventListener("click", filterWatched);
// btnQueue.addEventListener("click", filterQueue);//("click",funAddWatched );//
// btnAddWatched.addEventListener("click",funAddWatched );
// btnAddQueue.addEventListener("click", funAddQueue);
// list.addEventListener('click', createId);
//console.log('btnAddWatched', btnAddWatched);
// console.log('btnAddQueue', btnAddQueue);