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
	this.isOver30 = (age >= 30)
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
	let statesUnder30 = new Map();
	let statesOver30 = new Map();
	
	let lines = contents.split('\n');
	let firstLine = lines[0].split(',');

	for (let personIndex = 1; personIndex < lines.length-1; personIndex++){
		let line = lines[personIndex];
		let personArray = line.split(',');
		let firstName = personArray[0];
		let lastName =  personArray[1];
		let age =  personArray[2];
		let state = personArray[3];



		let person = new Person(firstName, lastName, age, state);
		
		person.isOver30 ? addPersonToState(person, statesOver30) : 
			addPersonToState(person, statesUnder30)
		}
	return [statesUnder30, statesOver30];
}

function addPersonToState(person, states){
	if (!(states.has(person.state))){
		let p = [person];
		states.set(person.state, p)
	}
	else {
		states.get(person.state).push(person);
		}
	return states;
}


// function sortPeople(people) {
// 	let over30 = people.filter(person => person[age] >= 30);
// 	let under30 = people.filter(person => person[age] < 30);
// }

function displayContents(contents){
	let element = document.getElementById('file-content');
	let under30 = createPeople(contents)[0];

	let statePeople = under30.forEach(function(value, key, map){
		let stateElem = document.createElement(key);
		stateElem.innerHTML = "State: " + key;
		element.appendChild(stateElem);

	});

	//element.innerHTML = states.next().value;

	let over30element = document.getElementById('over-30');

	//let over30 = people.filter(person => person.age >= 30);
	//let under30 = people.filter(person => person.age < 30);

	

	//let i = over30States.entries();
	let elem = document.createElement('div');


	// over30.forEach(function(person){

		
	// 	//states.indexOf(person.state).push(person);
	// 	let elem = document.createElement('div');
	// 	let p = "Document: " + person.firstName + ",";
	// 	//console.log(over30States);
	// 	elem.innerHTML = p;
	// 	element.appendChild(elem);
	// });

	// var states = over30.map
}


ReactDOM.render(<App />, document.getElementById('root'));
document.getElementById('file-input').addEventListener('change', loadFile, false);
registerServiceWorker();

