const Header = ({ name }) => (
    <h1>{name}</h1>
)

const Part = ({ name, exercises }) => (
    <p>{name} {exercises}</p>
)

const Content = ({ parts }) => (
    <>
        {parts.map(part =>
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
    </>
)

const Total = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((accumulator, current) => accumulator + current)

    return (
        <>
            <p><b>total of {total} exercises</b></p>
        </>
    )
}

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course