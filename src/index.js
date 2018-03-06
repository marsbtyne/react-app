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
	element.innerHTML = contents;
}


ReactDOM.render(<App />, document.getElementById('root'));
document.getElementById('file-input').addEventListener('change', loadFile, false);
registerServiceWorker();

