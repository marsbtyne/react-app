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
		
		// Separates people into 2 lists based on age
		person.isOver30 ? addPersonToState(person, statesOver30) : 
			addPersonToState(person, statesUnder30)
		}
	return [statesUnder30, statesOver30];
}

// Updates the population of the given state with the new person
function addPersonToState(person, states){
	// If the state is not already in the map, add it and map it to the person
	if (!(states.has(person.state))){
		let p = [person];
		states.set(person.state, p)
	}
	// if the state is in the map, add the person to the population list
	else {
		states.get(person.state).push(person);
		}
	return states;
}

// Takes in the map of state populations for people under 30 and adds population to the page
function appendPeopleUnder30(value,key,map) {
	let under30Element = document.getElementById('under-30');
	under30Element.appendChild(appendPeopleHelper(value, key));
}

// Takes in the map of state populations for people over 30 and adds population to the page
function appendPeopleOver30(value, key, map) {
	let over30Element = document.getElementById('over-30');
	over30Element.appendChild(appendPeopleHelper(value, key));
}

// Helper function that iterates through the current state and adds each person
function appendPeopleHelper(value, key){
  let elem = document.createElement('div');
	elem.innerHTML = "<h3>State: " + key + "</h3>"
	value.forEach(function(person) {
		let personElem = document.createElement('span');
		personElem.innerHTML = "Document: " + person.firstName + " " + person.lastName + ", " + person.state + ", " + person.age + "<br>";
		elem.appendChild(personElem);
	});
  return elem;
}

// Divides people into 2 lists and uses those to iterate through and display on page
function displayContents(contents){
	let under30 = createPeople(contents)[0];
	let over30 = createPeople(contents)[1];

	under30.forEach(appendPeopleUnder30);
	over30.forEach(appendPeopleOver30);
}


ReactDOM.render(<App />, document.getElementById('root'));
document.getElementById('file-input').addEventListener('change', loadFile, false);
registerServiceWorker();

