import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = { 
    persons: [
      { id: '001', name: 'Max', age: 28 }, 
      { id: '002', name: 'Manu', age: 25}, 
      { id: '003', name: 'Mel', age: 20}
    ], 
      showPerson: false
  };

  //allows user to dynamically change the person name (state)
  //with the value that is typed into the input field of that person
  //detects which you typed into by the state id
  //creates a new state array and then replaces current state with new one 
  nameChangedHandler = ( event, id ) => { 
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value; 

    const persons = [...this.state.persons]; 
    persons[personIndex] = person;

    this.setState( {persons: persons})
  };

  //deletes a person component if clicked on the div
  //creates a new 'state' array 
  //makes the changes to the new array
  //replaces the current state array with the new one
  deletePersonHandler = (personIndex) => { 
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  // changes the state showPerson when button is clicked
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons; 
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green', 
      color: 'white',
      font: 'inherit', 
      border: '1px solid blue', 
      padding: '8px', 
      cursor: 'pointer' 
      // ':hover': {
      //   backgroundColor: 'lightgreen',
      //   color: 'black'
      // }
    }; 

    // hides person divs until the state showPersons === true 
    // when button is clicked
    // once it is clicked, then they are dynamically rendered mapping through array
    let persons = null; 
    if (this.state.showPersons === true) { 
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age} 
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      ); 

      style.backgroundColor = 'red';
      // style[':hover'] = { 
      //   backgroundColor: 'salmon', 
      //   color: 'black'
      // }

    };

    // changes the text styling depending on the length 
    //of the persons array/state when you delete one
    const classes = [];
    if (this.state.persons.length <=2) {
      classes.push('red'); //classes = ['red']
    }
    if (this.state.persons.length <=1) { 
      classes.push('bold'); // classes = ['red', 'bold']
    }

    return (
        <div className="App">
          <h1>Hi, I'm a react App </h1>
          <p className={classes.join(' ')}> This is really working! </p>
          <button
            style={style}
            onClick={this.togglePersonHandler}>Toggle Persons</button> 
          {persons}
        </div>
  );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'does this work now'));
  }
}

export default App;