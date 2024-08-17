import { useState } from "react";
import './App.css'
import InputTaskCount from "./InputTaskCount";
import TaskGraph from './TaskGraph'
import MC_DZZZ from './MC_DZZZ'


const taskGraph = [
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 0
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], // 1
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], // 2
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // 3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // 4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // 5
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 7
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0], // 8
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 9
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
]

const taskSpecification = [
// pi, ai, Di -> czas wykonania zadania, liczba żądanych procesorów, najpóźniejszy możliwy termin zakończenia zadania
  [30, 3, 90], // 0
  [10, 2, 20], // 1
  [5, 1, 5],   // 2
  [10, 3, 30], // 3
  [15, 1, 15], // 4
  [20, 1, 20], // 5
  [25, 3, 75], // 6
  [25, 1, 25], // 7
  [10, 1, 10], // 8
  [20, 2, 40], // 9
  [20, 3, 40], // 10
  [10, 2, 20], // 11
  [20, 3, 60]  // 12
];
const n = taskGraph.length; // task count
const m = 3; // processor count

function App() {
  const [taskCount, setTaskCount] = useState(2)

  return (
    <>
      <div className='container'>
        <InputTaskCount
          setTaskCount={setTaskCount} 
        />
        Task count: {taskCount}
        <button onClick={() => MC_DZZZ(taskGraph, taskSpecification, n, m)}>
          Click me!
        </button>
        <TaskGraph 
          taskCount={taskCount}
        />
      </div>
    </>
  )
}

export default App
