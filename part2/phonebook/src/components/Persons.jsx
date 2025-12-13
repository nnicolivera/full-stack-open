const Person = ({ filteredPersons }) => (
    <>
        {filteredPersons.map(person => (
            <p key={person.id}>{person.name} {person.number}</p>
        ))}
    </>
);

const Persons = ({ filteredPersons }) => (
    <>
        <Person filteredPersons={filteredPersons} />
    </>
);

export default Persons;