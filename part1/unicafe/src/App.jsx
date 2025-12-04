import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Feedback = ({ text, points }) => {
  return (
    <div>{text} {points}</div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const totalPoints = (good * 1) + (neutral * 0) + (bad * -1)
  const totalFeedbackCount = good + neutral + bad

  return (
    <>
      <h1>statistics</h1>
      {totalFeedbackCount === 0 ? <p>No feedback given.</p> :
        <>
          <Feedback text={"good"} points={good} />
          <Feedback text={"neutral"} points={neutral} />
          <Feedback text={"bad"} points={bad} />
          <Feedback text={"all"} points={totalFeedbackCount} />
          <Feedback text={"average"} points={totalPoints / totalFeedbackCount} />
          <Feedback text={"positive"} points={(good * 100 / (totalFeedbackCount))} />
        </>
      }
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App