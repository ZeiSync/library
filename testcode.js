// var arr = [
// 	{name: 'lifehack', class: 0},
// 	{name: 'learn', class: 1}
// ]

// var books = [
// 	{name: 'lifehack1' , id: 0, class: 0},
// 	{name: 'lifehack2' , id: 1, class: 0},
// 	{name: 'lifehack3' , id: 2, class: 0},
// 	{name: 'learn1' , id: 3, class: 1},
// 	{name: 'learn2' , id: 4, class: 1},
// 	{name: 'learn3' , id: 5, class: 1}
// ]


// function getBook(categoryName) {
// 	var cagtegory = arr.find(function(item){
// 		return item.name === categoryName;
// 	});
	
// 	var showBook = books.filter(function(items){
// 		return items.class === cagtegory.class;
// 	});
// 	return showBook;
// }

// var test = getBook('learn');
// console.log(test);

const id = require('./id.json');
const fs = require('fs');

var ID = id[0].ID;
console.log(ID);

function countID(arr) {
	var nid = arr[0].ID;
	nid++;
	var newID = arr.map(function(item){
		return {ID : nid};
	});
	console.log(newID);
	var save = JSON.stringify(newID);
	var writefile = fs.writeFileSync('./id.json', save, {endcoding: 'utf8'});
	return newID;
}

countID(id);