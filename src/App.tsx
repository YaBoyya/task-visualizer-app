import { useEffect, useState } from "react";
import InputTaskCount from "./components/InputTaskCount";
import Matrix from './components/Matrix'
import MC_DZZZ from './MC_DZZZ'
import TimelineChart from "./TimelineChart";
import BackgrounContainer from "./components/BackgroundContainer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MatrixContainer from "./components/MatrixContainer";
import InputChance from "./components/InputChance";
import NOCImage from "./components/NOCImage";
import InputProcessorCount from "./components/InputProcessorCount";
import { defaultSeries } from "./constants";
import { ChartSeriesParams } from "./props";


const taskGraph = [
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12
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
// czas wykonania zadania, liczba żądanych procesorów, najpóźniejszy możliwy termin zakończenia zadania 
// pi, ai, Di
  [30, 3, 195], // 0
  [10, 2, 155], // 1
  [5,  1, 30],   // 2
  [10, 3, 80], // 3
  [15, 1, 105], // 4
  [20, 1, 110], // 5
  [25, 3, 135], // 6
  [25, 1, 25], // 7
  [10, 1, 50], // 8
  [20, 2, 90], // 9
  [20, 3, 40], // 10
  [10, 2, 20], // 11
  [20, 3, 60]  // 12
];
const n = taskGraph.length; // task count
const m = 3; // processor count

function App() {
// TODO ADD handling for max processors, take these use states from Matrix component and put them here
// with images and error if processor count > 5 ot < s3
  const [taskCount, setTaskCount] = useState<number>(n);
  const [isSidebarOpen, setIsSidebarOpen] = useState<Boolean>(true);
  const [chance, setChance] = useState<number>(0.5);
  const [maxProcessors, setMaxProcessors] = useState<number>(5);
  const [chartSeries, setChartSeries] = useState<ChartSeriesParams>(defaultSeries);
  console.log(chartSeries)

  const [graph, setGraph] = useState(
    Array.from(
      {length: taskCount},
      () => Array(taskCount).fill(0)
    )
  );

  const [specification, setSpecification] = useState(
    Array.from(
      {length: taskCount},
      () => Array(3).fill(0)
    )
  );

  const updateMatrixSize = () => {
    const arr = Array.from({length: taskCount}, () => Array(taskCount).fill(0))
    arr.forEach((row, i) => {
      row.forEach((_, j) => {
        if (i in graph && j in graph[i]) {
          arr[i][j] = graph[i][j];
        }
      })
    }) 

    setGraph(arr);
  }

  const updateSpecificatonSize = () => {
    const arr = Array.from({length: taskCount}, () => Array(3).fill(0))
    arr.forEach((row, i) => {
      row.forEach((_, j) => {
        if (i in specification && j in specification[i]) {
          arr[i][j] = specification[i][j];
        }
      })
    }) 

    setSpecification(arr);
  }

  const onSubmitClick = () => {
    // TODO invoke MC_DZZZ algorithm
    setIsSidebarOpen(false);
    setChartSeries(MC_DZZZ(taskGraph, taskSpecification, taskCount, maxProcessors))
  }

  useEffect(() => {
    // Copies old values to new array after changing dimensions
    updateMatrixSize();
    updateSpecificatonSize();
  }, [taskCount])
// TODO make inputs generic and make them better account for invalid values, aybe errors
  return (
    <BackgrounContainer>
      <Navbar>
        <button onClick={() => MC_DZZZ(taskGraph, taskSpecification, n, m)}>
          Hardcoded Algo!
        </button>
      </Navbar>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} onSubmitClick={onSubmitClick}>
        <div className='container'>
          <InputChance
            value={chance}
            setValue={setChance}
          />
          <InputTaskCount
            value={taskCount}
            setValue={setTaskCount} 
          />
          <InputProcessorCount 
            value={maxProcessors}
            setValue={setMaxProcessors}
          />
          <div className="flex w-full h-full place-content-between text-center">
            <div className="flex-grow">
              <MatrixContainer
                label={"Task Graph"}
              >
                <Matrix 
                  matrix={graph}
                  setMatrix={setGraph}
                />
              </MatrixContainer>
            </div>
            <MatrixContainer
              label={"Task Specification"}
            >
              <Matrix
                matrix={specification}
                setMatrix={setSpecification}
              />
            </MatrixContainer>
          </div>
        </div>
      </Sidebar>

      <div className={`z-0 max-w-[75%] h-screen p-2 mx-auto transition-filter ease-in-out ${isSidebarOpen ? "blur-sm pointer-events-none" : ""}`}>
        <TimelineChart chartSeries={chartSeries} />
        {maxProcessors ? <NOCImage num={maxProcessors}/> : null}
      </div>
    </BackgrounContainer>
  )
}

export default App
