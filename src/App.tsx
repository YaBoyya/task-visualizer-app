import { useEffect, useState } from "react";
import InputTaskCount from "./components/InputTaskCount";
import Matrix from './components/Matrix'
import MC_DZZZ from './MC_DZZZ'
import TimelineChart from "./TimelineChart";
import BackgrounContainer from "./components/BackgroundContainer";
import Sidebar from "./components/Sidebar";
import MatrixContainer from "./components/MatrixContainer";
import InputChance from "./components/InputChance";
import NOCImage from "./components/NOCImage";
import InputProcessorCount from "./components/InputProcessorCount";
import { defaultSeries } from "./constants";
import { ChartSeriesParams } from "./props";
import SelectExample from "./components/SelectExample";
import { taskExamples } from "./examples";


function App() {
// TODO ADD handling for max processors, take these use states from Matrix component and put them here
// with images and error if processor count > 5 ot < s3
  const [taskCount, setTaskCount] = useState<number>(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState<Boolean>(true);
  const [chance, setChance] = useState<number>(0.9);
  const [maxProcessors, setMaxProcessors] = useState<number>(3);
  const [chartSeries, setChartSeries] = useState<ChartSeriesParams>(defaultSeries);
  const [example, setExample] = useState<string>("");
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
    setChartSeries(MC_DZZZ(graph, specification, taskCount, maxProcessors))
  }

  useEffect(() => {
    if (example) {
      setMaxProcessors(taskExamples[example].processorCount)
      setTaskCount(taskExamples[example].taskCount)
      setGraph(taskExamples[example].taskGraph)
      setSpecification(taskExamples[example].taskSpecification)
    }
  }, [example]);

  useEffect(() => {
    // Copies old values to new array after changing dimensions
    updateMatrixSize();
    updateSpecificatonSize();
  }, [taskCount])
// TODO make inputs generic and make them better account for invalid values, aybe errors
  return (
    <BackgrounContainer>
      {/* <Navbar /> */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} onSubmitClick={onSubmitClick}>
        <div className='container'>
          <SelectExample 
            value={example}
            setValue={setExample}
          />
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
