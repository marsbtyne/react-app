/*global document, window, alert, console, require*/
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

function Person(firstName, lastName, age, state) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.age = age;
	this.state = state;
}


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

function createPeople(contents){
	let people =[];
	
	let lines = contents.split('\n');
	let firstLine = lines[0].split(',');
	let person = {
		firstName: '',
		lastName: '',
		age: 0,
		state: ''
	}

	for (let personIndex = 1; personIndex < lines.length-1; personIndex++){
		let line = lines[personIndex];
		let personArray = line.split(',');
		let person = new Person(personArray[0], personArray[1], personArray[2], personArray[3]);
		people.push(person);
	}
	return people;
}

// function sortPeople(people) {
// 	let over30 = people.filter(person => person[age] >= 30);
// 	let under30 = people.filter(person => person[age] < 30);
// }

function displayContents(contents){
	let element = document.getElementById('file-content');
	let people = createPeople(contents);
	//element.innerHTML = people[0].firstName;

	let over30element = document.getElementById('over-30');

	let over30 = people.filter(person => person.age >= 30);
	let under30 = people.filter(person => person.age < 30);

	over30.forEach(function(person){
	let elem = document.createElement('div');
	let p = "Document: " + person.firstName + ",";
	elem.innerHTML = p;
	element.appendChild(elem);
	});
}


ReactDOM.render(<App />, document.getElementById('root'));
document.getElementById('file-input').addEventListener('change', loadFile, false);
registerServiceWorker();

