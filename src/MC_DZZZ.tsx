interface EdgeProps {
  start: number;
  end: number;
}

// inputs: 
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
];
  
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
const m = 5; // processor count

// code:
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

function solveTaskPriority(taskIndex: number, maxVerticesToTask: number[], taskSpecification: number[][], edges: EdgeProps[], taskPriority: number[]) {
  if (maxVerticesToTask[taskIndex] === 0) {
    // Independent task on top of the tree
    return taskSpecification[taskIndex][0] * taskSpecification[taskIndex][1];
  }
  // filters edges that have end on taskIndex and retruns their start value giving parents array
  const parents = getParents(taskIndex, edges);

  // solves for maxProcessorCount accross all parents
  const maxProcParent = parents.reduce((parentMax, x) => taskSpecification[x][1] > taskSpecification[parentMax][1] ? x : parentMax, parents[0]);
  //  get all parents with max value
  const allMaxProcParents = parents.filter((parent) => taskSpecification[parent][1] === taskSpecification[maxProcParent][1]);
  
  // if there aren't any other parent alike returns otherwise checks for maxVertValue
  if (allMaxProcParents.length === 1) {
    return taskPriority[maxProcParent] + taskSpecification[taskIndex][0] * taskSpecification[taskIndex][1];
  }

  // solves for maxVertParent accross all parents
  const maxVertParent = allMaxProcParents.reduce((parentMax, x) => maxVerticesToTask[x] > maxVerticesToTask[parentMax] ? x : parentMax, allMaxProcParents[0]);
  // finds all parents with maxVert value
  const allMaxVertParents = allMaxProcParents.filter((parent) => maxVerticesToTask[parent] === maxVerticesToTask[maxVertParent]);
  
  // if there aren't any other parent alike returns otherwise checks for lowest index
  if (allMaxVertParents.length === 1) {
    return taskPriority[maxVertParent] + taskSpecification[taskIndex][0] * taskSpecification[taskIndex][1];
  }

  // finally takes parent with lowest index
  return taskPriority[Math.min(...allMaxVertParents)] + taskSpecification[taskIndex][0] * taskSpecification[taskIndex][1];
  
  // old
  // const parentMaxProcessorCount = parents.reduce((parentMax, x, i, arr) => taskSpecification[x][1] > taskSpecification[parentMax][1] ? taskSpecification[x][1] : taskSpecification[parentMax][1], 0)
  // x > arr[parentMax] ? arr[i] : parentMax
}

function solveCriticalTaskTimes(startTask: number, taskGraph: number[][], taskSpecification: number[][]) {
  // first task value
  let criticalTaskTime = taskSpecification[startTask][0];
  let vals: number[] = [];
  // check all possible vertices for starting node  
  taskGraph[startTask].forEach((el, next) => {
    if (el === 1) {
      // if child exists adds its sum of current node and the child criticalTaskTime to the list
      vals = [...vals, criticalTaskTime + solveCriticalTaskTimes(next, taskGraph, taskSpecification)];
    }
  });
  // returns max from all the values and initial criticalTaskTime
  return Math.max(...vals, criticalTaskTime);
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

function findTaskIndex(taskArr: number[][], task: number[]) { 
  // TODO needs testing, should work, but most likely won't
  console.log(taskArr.forEach((item) => item.every((el: number, i: number) => el === task[i]) ? item : 0));
  return 0;
}

function addTaskToChart(
  chartResponse: any,
  processorsUsed: number,
  availableProcessors: number,
  processorCount: number,
  taskIndex: number,
  timestamp: number) {

  const isProcessorInstanceInData = (data, i) => {
    if (!data.length) return false;

    return data.some((el) => {
      if(el.x === `P${i}`) return true;
      return false;
    });
  }

  return chartResponse.map((el, chartTaskIndex) => {
    if(chartTaskIndex !== taskIndex) return el;
    
    let newData = el.data;
    for (let i = processorCount - (availableProcessors + processorsUsed); i < processorCount - availableProcessors; i++) {
      if(!isProcessorInstanceInData(newData, i)) {
        newData = [...newData, {
          x: `P${i}`,
          y: [timestamp, timestamp+1]
        }];
        el.data = newData;
        continue;
      }

      for(let dataIndex = 0; dataIndex < el.data.length; dataIndex++) {
        if (newData[dataIndex].x !== `P${i}`) continue;
        if (chartTaskIndex === 7 && i === 2) {
          // TODO fix this edge case
          console.log(newData[dataIndex].y[1] === timestamp)
          console.log(newData[dataIndex])
        }
        // jeżeli nie doszło do przerwania to popraw końcowy czas
        if (newData[dataIndex].y[1] === timestamp) newData[dataIndex].y[1] = timestamp+1; 
        // w przeciwnym wypadku dodaj instancje
        else newData = [...newData, {
          x: `P${i}`,
          y: [timestamp, timestamp+1]
        }]
      }
    }

    el.data = newData;
    return el;
  });
}

function MC_DZZZ(
  tasksGraph: number[][],         // G = (T, E), E ⊂ T × T
  taskSpecification: number[][],  // ((p_i, a_i, D_i), Ti ∈ T);
  taskCount: number,              // n
  processorCount: number          // m
) {
  const chartResponse = Object.keys(taskSpecification).map((el) => ({
    name: `Task${el}`,
    data: []
  }))

  // p: 0, a: 1, D: 2
  let t = 0;

  const edges = solveEdges(tasksGraph);               // E
  const taskPriority = Array(taskCount).fill(0);      // w_i
  const criticalTaskTimes = Array(taskCount).fill(0); // t_i
  const maxVerticesToTask = Array(taskCount).fill(0); // h_i

  for (let i = 0; i < taskCount; i++) {
    criticalTaskTimes[i] = solveCriticalTaskTimes(i, tasksGraph, taskSpecification);
    maxVerticesToTask[i] = solveMaxVerticesToTask(i, edges, maxVerticesToTask);
    taskPriority[i] = solveTaskPriority(i, maxVerticesToTask, taskSpecification, edges, taskPriority);
  }

  console.log(`Priorytet zadania przed korektą dla zadań zależnych(w): ${taskPriority}`)

  if (edges !== null) {
    for (let i = 0; i < taskCount; i++) {
      taskPriority[i] = taskPriority[i] + criticalTaskTimes[i];
    }
  }

  for (let i = 0; i < taskCount; i++){
    if (criticalTaskTimes[i] > taskSpecification[i][2]) {
      // TODO customize the event
      throw Error(`Uszeregowanie nie istnieje.${i}, ${criticalTaskTimes[i]}, ${taskSpecification[i][2]}`);
    }
  }
  const availableTasks = maxVerticesToTask.map((el, index) => el === 0 ? index : -1).filter((el) => el !== -1); // B

  let tasksCopy = Object.keys(taskSpecification).map(el => parseInt(el));   // T copy (P)
  const taskTimeLength = taskSpecification.map(el => el[0]);   // pi copy (qi)

  console.log(`Ilość zadań(n): ${taskCount}`)
  console.log(`Ilość procesów(w): ${processorCount}`)
  console.log(`Macierz specyfikacji zadań((pi, ai, Di), Ti ∈ T): ${JSON.stringify(taskSpecification)}`)
  console.log(`Zbiór krawędzi grafu(E): ${JSON.stringify(edges)}`)
  console.log(`Priorytet zadania po korekcie dla zadań zależnych(w): ${taskPriority}`)
  console.log(`Czas zadanie krytycznego(ti): ${criticalTaskTimes}`)
  console.log(`Maksymalna liczba krawędzi w G prowadząca do Ti(h): ${maxVerticesToTask}`)
  console.log(`Dostępne zadania(B): ${availableTasks}`)
  console.log(`Kopia T - (P): ${tasksCopy}`)
  console.log(`Kopia pi - (qi): ${taskTimeLength}`)

  while(tasksCopy.length > 0) {
    let av: number = processorCount;
    // Q = {Ti ∈ P : (qj = 0, j ∈ Bi ) ∧ (qi > 0)}; /*zbiór zadań gotowych*/
    let Q: number[] = [];
    tasksCopy.forEach((task, i) => {
      const newB = getParents(task, edges);
      // console.log(t, i, task, Q, newB, newB.every((el) => taskTimeLength[el] === 0), taskTimeLength[task] > 0, taskTimeLength)
      if (newB.every((el) => taskTimeLength[el] === 0) && taskTimeLength[task] > 0) {
        Q = [...Q, task];
      }
    });
    // console.log(Q)
    let x: number = 1;
    do{
      if (Q === null) {
        break;
      }
      const M = Math.max(...Q.map((taskIndex) => taskPriority[taskIndex])); // Max task priority in Q
      const W = Q.filter(taskIndex => taskPriority[taskIndex] === M);  // Tasks with M priority
  
      const A = Math.max(...W.map((taskIndex) => taskSpecification[taskIndex][1])); // Max processors in W
      const F = W.filter(taskIndex => taskSpecification[taskIndex][1] === A);  // Tasks with A processors
  
      const C = Math.max(...F.map((taskIndex) => maxVerticesToTask[taskIndex])); // Max vertices to task in F
      const J = F.filter(taskIndex => maxVerticesToTask[taskIndex] === C);  // Task with F vertices to them
  
      const chosenTaskNumber = J[randRange(0, J.length)]
      const chosenTask = taskSpecification[chosenTaskNumber];
      x = 1;
      // console.log(taskTimeLength, chosenTaskNumber, chosenTask, Q)
      // console.log(chosenTaskNumber, Q, A, av)
      if (A <= av) {
        // console.log("in", Q)
        // usereguj Ti da jednej jednostki czasowej [t, t+1] ?
        av -= chosenTask[1];
        taskTimeLength[chosenTaskNumber] -= x;
        Q = Q.filter(el => el !== chosenTaskNumber)
        addTaskToChart(chartResponse, chosenTask[1], av, processorCount, chosenTaskNumber, t)
        // if (chosenTask[1] === 2 && getSecuredRandomFloat() > 0.9) {
        //   // dodaj do zbioru T dodatkowe zadanie (T ′j gdzie aj = 3)
        // }
      } else {
        Q = Q.filter(el => el !== chosenTaskNumber)
      }
    } while(av > 0 && Q.length > 0)

    t += x;
    console.log(t, taskTimeLength);
    // console.log(taskTimeLength)
    // console.log(t)
    // if(q[chosenTask] ==)
    // console.log(taskTimeLength)
    taskTimeLength.forEach((timeVal, index) => {
      if(timeVal == 0) {
        // console.log(tasksCopy, timeVal, index);
        tasksCopy = tasksCopy.filter(task => task !== index)
        // tasksCopy = tasksCopy.filter((task) => i !== task)
      }
    })
  }
  console.log(JSON.stringify(chartResponse))
}

MC_DZZZ(taskGraph, taskSpecification, n, m);

export default MC_DZZZ;