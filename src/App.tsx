import { useEffect, useState } from "react";
import Matrix from './components/Matrix'
import MC_DZZZ from './MC_DZZZ'
import TimelineChart from "./TimelineChart";
import BackgrounContainer from "./components/BackgroundContainer";
import Sidebar from "./components/Sidebar";
import MatrixContainer from "./components/MatrixContainer";
import NOCImage from "./components/NOCImage";
import { defaultSeries } from "./constants";
import { ChartSeriesParams } from "./props";
import SelectExample from "./components/SelectExample";
import { taskExamples } from "./examples";
import NumberInput from "./components/NumberInput";


function App() {
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
    setIsSidebarOpen(false);
    setChartSeries(MC_DZZZ(graph, specification, taskCount, maxProcessors))
  }

  const checkChance = (val: string) => {
    let v = parseFloat(val);
    if (v > 1){
      v = 1;
    } else if (v < 0) {
      v = 0;
    }
    setChance(v);
  }

  const checkNumber = (v: string, bottomLimit: number, upperLimit: number, setValue: React.Dispatch<React.SetStateAction<number>>) => {
    let num = parseInt(v);
    if (isNaN(num) || num < bottomLimit) {
      num = bottomLimit;
    } else if (num > upperLimit) {
      num = upperLimit;
    }
    setValue(num);
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

  return (
    <BackgrounContainer>
      {/* <Navbar /> */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} onSubmitClick={onSubmitClick}>
        <div className='container'>
          <SelectExample 
            value={example}
            setValue={setExample}
          />
          <NumberInput 
            label="Task change chance:"
            value={chance}
            callback={checkChance}
            step={0.01}
          />
          <NumberInput 
            label="Task count:"
            value={taskCount}
            callback={(v: string) => checkNumber(v, 2, 15, setTaskCount)}
          />
          <NumberInput 
            label="Processor count:"
            value={maxProcessors}
            callback={(v: string) => checkNumber(v, 3, 5, setMaxProcessors)}
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
        <TimelineChart onClick={onSubmitClick} chartSeries={chartSeries} />
        {maxProcessors ? <NOCImage num={maxProcessors}/> : null}
      </div>
    </BackgrounContainer>
  )
}

export default App
