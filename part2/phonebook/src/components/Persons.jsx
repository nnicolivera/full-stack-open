const Delete = ({ id, handleDelete }) => (
    <button onClick={() => handleDelete(id)}>delete</button>
);

const Person = ({ filteredPersons, handleDelete }) => (
    <>
        {filteredPersons.map(person => (
            <p key={person.id}>{person.name} {person.number} |
                <Delete
                    id={person.id}
                    handleDelete={handleDelete}
                />|
            </p>
        ))}
    </>
);

const Persons = ({ filteredPersons, handleDelete }) => (
    <>
        <Person filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </>
);

export default Persons;