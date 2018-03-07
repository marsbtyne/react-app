import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


function Person(firstName, lastName, age, state) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.age = age;
	this.state = state;
	this.isOver30 = (age >= 30)
}

// Loads the selected file and displays the contents
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

// Creates maps of people, sorted first by age then by state
function createPeople(contents){
	let statesUnder30 = new Map();
	let statesOver30 = new Map();
	
	let lines = contents.split('\n');

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

function displayPeople(value,key,map) {
	let stateList = document.getElementById('file-content');

	let elem = document.createElement('div');
	elem.innerHTML = "<h2>State: " + key + "</h2>"
	value.forEach(function(person) {
		let personElem = document.createElement('span');
		personElem.innerHTML = "Document: " + person.firstName + " " + person.lastName + ", " + person.state + ", " + person.age + "<br>";
		elem.appendChild(personElem);
	});
	stateList.appendChild(elem);
}

function displayContents(contents){
	let element = document.getElementById('file-content');

	let under30Element = document.createElement('div');
	under30Element.innerHTML = "<h1>People Under 30</h1>";
	let over30Element = document.createElement('div');
	over30Element.innerHTML = "<h1>People Over 30</h1>";
	let under30 = createPeople(contents)[0];
	let over30 = createPeople(contents)[1];

	element.appendChild(under30Element);
	under30.forEach(displayPeople);

	element.appendChild(over30Element);
	over30.forEach(displayPeople);
}


ReactDOM.render(<App />, document.getElementById('root'));
document.getElementById('file-input').addEventListener('change', loadFile, false);
registerServiceWorker();

