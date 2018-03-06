import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// let data = document.getElementById('data');

// function readTextFile(file){
//   let rawFile = new XMLHttpRequest();
//   rawFile.open("GET", file, false);
//   rawFile.onreadystatechange = function () {
//   	let text = rawFile.responseText;
//   	data.innerText = text;
//   }
//   rawFile.send(null);
// }

let person ={ 
};
let personArray=[];

function loadFile(e) {
	let file = e.target.files[0];
	if (!file) {
		return;
	}
	let reader = new FileReader();
	reader.onload = function(e){
		let contents = e.target.result;
		displayContents(contents);
	};
	reader.readAsText(file);
}

function displayContents(contents){
	let element = document.getElementById('file-content');
	//let allLines = contents.split(/\r\n|n/);
	let lines = contents.split('\n');
	let firstLine = lines[0].split(',');
	let firstName = firstLine[0];
	let lastName = firstLine[1];
	let age = firstLine[2];
	let state = firstLine[3];
	let people =[];

	for (let personIndex = 1; personIndex < lines.length-1; personIndex++){
		let line = lines[personIndex];
		personArray = line.split(',');
		person[firstName] = personArray[0];
		people.push(person);
	}
	// lines.forEach (function(line){
	// 	person = line.split(',');
	// 	people.push(person);
	// });
	

	//let firstName = entries
	element.innerHTML = people[0][firstName];
}


ReactDOM.render(<App />, document.getElementById('root'));
document.getElementById('file-input').addEventListener('change', loadFile, false);
registerServiceWorker();

