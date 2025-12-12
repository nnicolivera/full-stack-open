const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNameChange, handleNumberChange }) => {

    const addName = (e) => {
        e.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
            id: String(persons.length + 1),
        };

        const existName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        const existNumber = persons.find(person => person.number === newNumber);

        if (existName || existNumber) {
            alert(`${newName}: ${newNumber} is already added to phonebook`);
        } else {
            setPersons(persons.concat(personObject));
            setNewName('');
            setNewNumber('');
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