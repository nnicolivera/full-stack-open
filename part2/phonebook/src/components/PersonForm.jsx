import personService from '../services/persons';

const PersonForm = ({
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    handleNameChange,
    handleNumberChange,
    setNotification
}) => {

    const addName = (e) => {
        e.preventDefault();

        const trimmedName = newName.trim();
        const trimmedNumber = newNumber.trim();

        const personObject = {
            name: trimmedName,
            number: trimmedNumber
        };

        const existName = persons.find(person => person.name.toLowerCase() === trimmedName.toLowerCase());
        const existNumber = persons.find(person => person.number === trimmedNumber);
        const currentPerson = persons.find(person => person.name.toLowerCase() === trimmedName.toLowerCase());

        if (existName && trimmedNumber !== currentPerson.number) {
            window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) &&
                personService
                    .update(currentPerson.id, personObject)
                    .then(returnedPerson => {
                        const notification = {
                            message: `Modified ${currentPerson.name}`,
                            type: 'success'
                        }
                        setNotification(notification);
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000);
                        setPersons(persons.map(person => person.id !== currentPerson.id ? person : returnedPerson));
                        setNewName('');
                        setNewNumber('');
                    })
                    .catch(err => {
                        setNotification({
                            message: `Information of ${personObject.name} has already been removed from server`,
                            type: 'error'
                        });
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000);
                    });
        } else if (existName && existNumber) {
            alert(`${trimmedName} with number ${trimmedNumber} is already added to phonebook`);
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    const notification = {
                        message: `Added ${personObject.name}`,
                        type: 'success'
                    }
                    setNotification(notification);
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000);
                    setPersons(persons.concat(returnedPerson));
                    setNewName('');
                    setNewNumber('');
                });
        };
    };

    return (
        <>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} required />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} required />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
};

export default PersonForm;