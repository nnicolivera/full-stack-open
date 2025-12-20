import { useState, useEffect } from 'react';
import personService from './services/persons';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const handleDelete = (id) => {
    window.confirm(`Delete ${persons.find(person => person.id === id)?.name}?`) &&
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id));
        });
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        notification={notification}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </>
  );
};

export default App;