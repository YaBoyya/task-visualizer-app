import { getRandomValues } from "crypto";
import { EdgeProps } from "./props";

function solveEdges(taskGraph: number[][]) {
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
  return Math.floor(getSecuredRandomFloat()*(max-min) + min)
}

function solveTaskPriority(taskIndex: number, maxVerticesToTask: number[], taskSpecification: number[][], edges: EdgeProps[], taskPriority: number[]) {
  if (maxVerticesToTask[taskIndex] === 0) {
    // Independent task on top of the tree
    return taskSpecification[taskIndex][0] * taskSpecification[taskIndex][1];
  }
  const parents = edges.filter(item => item.end === taskIndex).map(item => item.start)

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
  // const parentMaxProcessorCount = parents.reduce((parentMax, x, i, arr) => taskSpecification[x][1] > taskSpecification[parentMax][1] ? taskSpecification[x][1] : taskSpecification[parentMax][1], 0)
  // x > arr[parentMax] ? arr[i] : parentMax
    // console.log(maxParentProcessorCount)
}

function solveCriticalTaskTimes(startTask: number, taskGraph: number[][], taskSpecification: number[][]) {
  let criticalTaskTime = taskSpecification[startTask][0];
  let vals: number[] = [];
  taskGraph[startTask].forEach((el, next) => {
    if (el == 1) {
      vals = [...vals, criticalTaskTime + solveCriticalTaskTimes(next, taskGraph, taskSpecification)];
    }
  }) 
  return Math.max(...vals, criticalTaskTime);
}

function solveMaxVerticesToTask(taskIndex: number, edges: EdgeProps[], maxVerticesToTask: number[]) {
  const parents = edges.filter(item => item.end === taskIndex).map(item => item.start);

  if (parents.length === 0) {
    return 0;
  }

  const maxVertParent = parents.reduce((parentMax, x) => maxVerticesToTask[x] > maxVerticesToTask[parentMax] ? x : parentMax, parents[0]);
  return maxVerticesToTask[maxVertParent] + 1;

  // old and most likely wrong
  // return taskGraph.reduce((partialSum, row) => partialSum + row[taskIndex], 0);
}

function findTaskIndex(taskArr, task) { 
  // TODO needs testing, should work, but most likely won't
  console.log(taskArr.forEach((item) => item.every((el, i) => el[i] === task[i]) ? item : 0));
  return 0;
}

function MC_DZZZ(
  tasksGraph: number[][],         // G = (T, E), E ⊂ T × T
  taskSpecification: number[][],  // ((pi, ai, Di), Ti ∈ T)
  taskCount: number,              // n
  processorCount: number          // m
) {
  // p: 0, a: 1, D: 2
  let t = 0;

  const edges = solveEdges(tasksGraph);               // E
  const taskPriority = Array(taskCount).fill(0);      // wi
  const criticalTaskTimes= Array(taskCount).fill(0);  // ti
  const maxVerticesToTask = Array(taskCount).fill(0); // hi

  for (let i = 0; i < taskCount; i++) {
    criticalTaskTimes[i] = solveCriticalTaskTimes(i, tasksGraph, taskSpecification);
    maxVerticesToTask[i] = solveMaxVerticesToTask(i, edges, maxVerticesToTask);
    taskPriority[i] = solveTaskPriority(i, maxVerticesToTask, taskSpecification, edges, taskPriority);
    console.log(i, taskPriority[i])
  }
  
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
  const availableTasks = maxVerticesToTask.map((el, index) => el === 0 ? index : -1).filter((el) => el !== -1);
  const tasksCopy = structuredClone(taskSpecification);   // T copy (P)
  const taskTimeLength = taskSpecification.map(el => el[0]);   // pi copy (qi)
  console.log(`Ilość tasków(n): ${taskCount}`)
  console.log(`Ilość procesów(w): ${processorCount}`)
  console.log(`Macierz specyfikacji zadań((pi, ai, Di), Ti ∈ T): ${JSON.stringify(taskSpecification)}`)
  console.log(`Zbiór krawędzi grafu(E): ${JSON.stringify(edges)}`)
  console.log(`Priorytet zadania(w): ${taskPriority}`)
  console.log(`Czas zadanie krytycznego(ti): ${criticalTaskTimes}`)
  console.log(`Maksymalna liczba krawędzi w G prowadząca do Ti(h): ${maxVerticesToTask}`)
  console.log(`Dostępne zadania(B): ${availableTasks}`)
  console.log(`Kopia T - (P): ${tasksCopy}`)
  console.log(`Kopia pi - (qi): ${taskTimeLength}`)

  // const Q = tasksCopy.map((el, index) => {
    // })
  //   if (taskTimeLength[index] && )

  for (let i=0; i<tasksCopy.length; i++) {
    if (taskTimeLength[availableTasks[i]] === 0 && taskTimeLength[i] > 0)
      console.log(i) 
    if (availableTasks.some((el, index) => taskTimeLength[el] === 0) && taskTimeLength[i] > 0)
      console.log(`Hello ${i}`)
  }
  // while(P !== null) {
    let av = processorCount;
  //   // Q = {Ti ∈ P : (qj = 0, j ∈ Bi ) ∧ (qi > 0)}; /*zbiór zadań gotowych*/
  //   if (Q === null) {
  //     break;
  //   }
    // const M = Math.max(Q.map((taskIndex) => taskPriority[taskIndex])); // Max task priority in Q
    // const W = Q.filter(taskIndex => taskPriority[taskIndex] === M);  // Tasks with M priority

    // const A = Math.max(W.map((taskIndex) => taskSpecification[taskIndex][1])); // Max processors in W
    // const F = W.filter(taskIndex => taskSpecification[taskIndex][1] === A);  // Tasks with A processors

    // const C = Math.max(F.map((taskIndex) => maxVerticesToTask[taskIndex])); // Max vertices to task in F
    // const J = F.filter(taskIndex => maxVerticesToTask[taskIndex] === C);  // Task with F vertices to them

    // const chosenTask = J[randRange(0, J.length)];
    // let x = 1;

    // if (A < av) {
    //   // usereguj Ti da jednej jednostki czasowej [t, t+1] ?
    //   av -= chosenTask[1];
    //   const chosenTaskIndex = findTaskIndex(tasksCopy, chosenTask);
    //   taskTimeLength[chosenTaskIndex] -= x;
    //   // TODO Q = Q − {Ti };
    //   if (chosenTask[1] === 2) {
    //     // TODO find(xj)
    //     // TODO what is xj?
    //   } 
    //   if (chosenTask[1] === 2 /*&& xj === 1 */) {

    //   }
    // } else {
    //   // TODO Q = Q − {Ti };
    // }
    // // TODO loop? if av > 0 go to step 14; /* gdy sa ̨ jeszcze wolne procesory w chwili t*/
    // // {

    // // } else {
    // //   t += x;
    // // }
    // // TODO if qi = 0 then P = P − Ti ;
    
  // }
}

export default MC_DZZZ;