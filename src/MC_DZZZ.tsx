import { taskExamples } from "./examples";
import { ChartDataProps, ChartResponseProps, ChartSeriesParams, EdgeProps, TaskProps } from "./props";

function solveEdges(taskGraph: number[][]) {
  // returns list of edges based on task graph
  let edges: EdgeProps[] = []; 

  taskGraph.forEach((row, start) => {
    row.forEach((el, end) => {
      if (el == 1) {
        let edge: EdgeProps = {
          'start': start,
          'end': end
        } 
        edges = [...edges, edge];
      }
    })
  })
  return edges
}

function getSecuredRandomFloat() {
  // getRandomValues generates cryptographically safe random value;
  const randUint32 = crypto.getRandomValues(new Uint32Array(1))[0];
  const maxUint32 = Math.pow(2, 32) - 1;

  return randUint32 / maxUint32;
}

function randRange(min: number, max: number) {
  // returns cryptographically random value in range
  return Math.floor(getSecuredRandomFloat()*(max-min) + min)
}

function getParents(taskIndex: number, edges: EdgeProps[]) {
  return edges.filter(item => item.end === taskIndex).map(item => item.start)
}

function solveTaskPriority(taskIndex: number, maxVerticesToTask: number[], taskSpecification: number[][], edges: EdgeProps[], taskPriority: number[], isAdditionalTask: boolean = false) {
  const basePriority = isAdditionalTask ? taskSpecification[taskIndex][0] * 3 : taskSpecification[taskIndex][0] * taskSpecification[taskIndex][1];
  
  if (maxVerticesToTask[taskIndex] === 0) {
    // Independent task on top of the tree
    return basePriority;
  }
  // filters edges that have end on taskIndex and retruns their start value giving parents array
  const parents = getParents(taskIndex, edges);

  // solves for maxProcessorCount accross all parents
  const maxProcParent = parents.reduce((parentMax, x) => taskSpecification[x][1] > taskSpecification[parentMax][1] ? x : parentMax, parents[0]);
  //  get all parents with max value
  const allMaxProcParents = parents.filter((parent) => taskSpecification[parent][1] === taskSpecification[maxProcParent][1]);
  
  // if there aren't any other parent alike returns otherwise checks for maxVertValue
  if (allMaxProcParents.length === 1) {
    return taskPriority[maxProcParent] + basePriority;
  }

  // solves for maxVertParent accross all parents
  const maxVertParent = allMaxProcParents.reduce((parentMax, x) => maxVerticesToTask[x] > maxVerticesToTask[parentMax] ? x : parentMax, allMaxProcParents[0]);
  // finds all parents with maxVert value
  const allMaxVertParents = allMaxProcParents.filter((parent) => maxVerticesToTask[parent] === maxVerticesToTask[maxVertParent]);
  
  // if there aren't any other parent alike returns otherwise checks for lowest index
  if (allMaxVertParents.length === 1) {
    return taskPriority[maxVertParent] + basePriority;
  }

  // finally takes parent with lowest index
  return taskPriority[Math.min(...allMaxVertParents)] + basePriority;
}

function solveCriticalTaskTimes(taskIndex: number, criticalTaskTimes: number[], taskSpecification: number[][], edges: EdgeProps[]) {
  // return taskSpecification[taskIndex][2] - taskSpecification[taskIndex][0]; 
  // first task value
  // TODO look at this
  const baseCriticalTime = taskSpecification[taskIndex][0]; 
  const parents = getParents(taskIndex, edges)
  
  // jeżeli nie ma rodziców to zwróć czas wykonania zadania
  if (!parents.length) {
    return baseCriticalTime;
  }

  const parentsCriticalTimes = parents.map(i => criticalTaskTimes[i])
  return baseCriticalTime + Math.max(...parentsCriticalTimes);

  // check all possible vertices for starting node  
  // taskGraph[startTask].forEach((el, next) => {
  //   if (el === 1) {
  //     // if child exists adds its sum of current node and the child criticalTaskTime to the list
  //     vals = [...vals, criticalTaskTime + solveCriticalTaskTimes(next, taskGraph, taskSpecification)];
  //   }
  // });
  // // returns max from all the values and initial criticalTaskTime
  // return Math.max(...vals, criticalTaskTime);
}

function solveMaxVerticesToTask(taskIndex: number, edges: EdgeProps[], maxVerticesToTask: number[]) {
  // searches edges for parents od startIndex
  const parents = edges.filter(item => item.end === taskIndex).map(item => item.start);

  if (parents.length === 0) {
    // if no parents return 0 as it's h = 0
    return 0;
  }
  // check all parents for highest h value 
  const maxVertParent = parents.reduce((parentMax, x) => maxVerticesToTask[x] > maxVerticesToTask[parentMax] ? x : parentMax, parents[0]);
  // increments parents h for the current node
  return maxVerticesToTask[maxVertParent] + 1;

  // old and most likely wrong
  // return taskGraph.reduce((partialSum, row) => partialSum + row[taskIndex], 0);
}

function addTaskToChart(
  chartResponse: any,
  availableProcessors: number,
  processorCount: number,
  task: TaskProps,
  timestamp: number): ChartSeriesParams {
  const isProcessorInstanceInData = (data: ChartDataProps[], i: number) => {
    if (!data.length) return false;

    return data.some((el) => {
      if(el.x === `P${i}`) return true;
      return false;
    });
  }
  return chartResponse.map((el: ChartResponseProps) => {
    if (el.name !== task.name) {
      return el;
    }

    let newData = structuredClone(el.data);
    for (let i = processorCount - (availableProcessors + task.a); i < processorCount - availableProcessors; i++) {
      if(!isProcessorInstanceInData(newData, i)) {
        newData = [...newData, {
          x: `P${i}`,
          y: [timestamp, timestamp+1]
        }];
        el.data = newData;
        continue;
      }
      let filteredData = newData.filter(el => el.x === `P${i}`)
      let unfilteredData = newData.filter(el => el.x !== `P${i}`)
      for(let dataIndex = 0; dataIndex < filteredData.length; dataIndex++) {
        if (filteredData[dataIndex].x !== `P${i}`) continue;

        // jeżeli nie doszło do przerwania to popraw końcowy czas
        if (filteredData[dataIndex].y[1] === timestamp) {
          filteredData[dataIndex].y[1] += 1;
          continue;
        }

        // sprawdź czy ostatni przedział jest mniejszy niż timestamp, aby nie powielać tworzenia nowych instancji Pi
        // if(newData[dataIndex].x === 'P9')
        if(filteredData[filteredData.length-1].y[1] < timestamp ){
          filteredData = [...filteredData, {
            x: `P${i}`,
            y: [timestamp, timestamp+1]
          }]
        }
      }
      newData = [...filteredData, ...unfilteredData];
    }

    el.data = newData;
    return el;
  });
}

function create3ProcTask(chosenTask: TaskProps, solveNewTaskPriority: Function) {
  const clone = structuredClone(chosenTask);
  return {
    ...clone,
    name: `Task${clone.baseTask}'`,
    taskPriority: solveNewTaskPriority(clone.baseTask, true),
    additionalTask: true,
    q: clone.p,
    a: 3
  };
}

function MC_DZZZ(
  tasksGraph: number[][],         // G = (T, E), E ⊂ T × T
  taskSpecification: number[][],  // ((p_i, a_i, D_i), Ti ∈ T);
  taskCount: number,              // n
  processorCount: number          // m
) {
  let chartResponse = Object.keys(taskSpecification).map((el) => ({
    name: `Task${el}`,
    data: []
  }))
  let chartSteps = [structuredClone(chartResponse)];
  // p: 0, a: 1, D: 2
  let t = 0;
  let tcheck = -1;

  const edges = solveEdges(tasksGraph);               // E
  const taskPriority = Array(taskCount).fill(0);      // w_i
  const criticalTaskTimes = Array(taskCount).fill(0); // t_i
  const maxVerticesToTask = Array(taskCount).fill(0); // h_i

  for (let i = 0; i < taskCount; i++) {
    criticalTaskTimes[i] = solveCriticalTaskTimes(i, criticalTaskTimes, taskSpecification, edges);
    maxVerticesToTask[i] = solveMaxVerticesToTask(i, edges, maxVerticesToTask);
    taskPriority[i] = solveTaskPriority(i, maxVerticesToTask, taskSpecification, edges, taskPriority);
  }

  if (edges !== null) {
    for (let i = 0; i < taskCount; i++) {
      taskPriority[i] = taskPriority[i] + criticalTaskTimes[i];
    }
  }

  for (let i = 0; i < taskCount; i++){
    if (criticalTaskTimes[i] > taskSpecification[i][2]) {
      console.error(`Zadanie ${i}: krytyczny czas zadanie jest większy od jego ograniczenia czasowego(${criticalTaskTimes[i]} > ${taskSpecification[i][2]})`);
      throw Error('Uszeregowanie nie istnieje.');
    }
  }

  let tasksCopy: TaskProps[] = Array.from({length: taskCount}, (_, i) => i).map((el: number, i: number) => ({
    baseTask: el,
    name: `Task${el}`,
    p: taskSpecification[el][0],
    a: taskSpecification[el][1],
    D: taskSpecification[el][2],
    q: taskSpecification[el][0],
    taskPriority: taskPriority[i],
    criticalTaskTimes: criticalTaskTimes[i],
    maxVerticesToTask: maxVerticesToTask[i],
    additionalTask: false
  }));   // T copy (P)

  while(tasksCopy.some(task => task.q > 0)) {
    let av: number = processorCount;

    let Q: TaskProps[] = [];
    tasksCopy.forEach(task => {
      const newB = getParents(task.baseTask, edges).map(i => tasksCopy.filter(task => task.baseTask === i)[0]);

      if (newB.every((task: TaskProps) => task.q === 0) && task.q > 0) {
        Q = [...Q, task];
      }
    });
    let x: number = 1;

    do{
      if (Q === null) {
        break;
      }
      const M = Math.max(...Q.map((task) => task.taskPriority)); // Max task priority in Q
      const W = Q.filter(task => task.taskPriority === M);  // Tasks with M priority
      const A = Math.max(...W.map((task) => task.a)); // Max processors in W
      const F = W.filter(task => task.a === A);  // Tasks with A processors
      const C = Math.max(...F.map((task) => task.maxVerticesToTask)); // Max vertices to task in F
      const J = F.filter(task => task.maxVerticesToTask === C);  // Task with F vertices to them

      const chosenTask = J[0]
      const chosenTaskNumber = chosenTask.baseTask;

      x = 1;

      if (A <= av) {
        av -= chosenTask.a;
        chosenTask.q -= x;
        Q = Q.filter(el => el.baseTask !== chosenTaskNumber)
        addTaskToChart(chartResponse, av, processorCount, chosenTask, t)

        if (chosenTask.a === 2 && !chosenTask.q && getSecuredRandomFloat() > 0.9) {
          const callback = (i: number, isAdditionalTask: boolean) => solveTaskPriority(i, maxVerticesToTask, taskSpecification, edges, taskPriority, isAdditionalTask);
          chartResponse = [...chartResponse, {
            name: `Task${chosenTask.baseTask}'`,
            data: []
          }]
          tasksCopy = [...tasksCopy, create3ProcTask(chosenTask, callback)];
        }
      } else {
        Q = Q.filter(el => el.baseTask !== chosenTaskNumber)
      }
    } while(av > 0 && Q.length > 0)
    if(tcheck !== t) {
      tcheck = t;
    }
    t += x;

    // add step every 5 time intervals
    if(t%5 === 0 || tasksCopy.length === 0) {
      chartSteps = [...chartSteps, structuredClone(chartResponse)];
    }
  }
  return chartSteps;
}

export default MC_DZZZ;

if (import.meta.filename === import.meta.url.substring(7)) {
  const input = taskExamples.example1;
  MC_DZZZ(input['taskGraph'], input['taskSpecification'], input['taskCount'], input['processorCount']);
  console.log(`task count: ${input['taskCount']}`)
  console.log(`1 proc task count: ${input['taskSpecification'].filter(el => el[1] === 1).length}`)
  console.log(`2 proc task count: ${input['taskSpecification'].filter(el => el[1] === 2).length}`)
  console.log(`3 proc task count: ${input['taskSpecification'].filter(el => el[1] === 3).length}`)
}