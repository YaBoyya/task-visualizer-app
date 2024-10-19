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

function solveTaskPriority(pi: number, ai: number) {
  return pi*ai;
}

function solveCriticalTaskTimes(startTask: number, taskGraph: number[][], taskSpecification: number[][]) {
  let criticalTaskTime = taskSpecification[startTask][0];
  let vals: number[] = [];
  taskGraph[startTask].forEach((el, next) => {
    if (el == 1) {
      vals = [...vals, criticalTaskTime + solveCriticalTaskTimes(next, taskGraph, taskSpecification)];
    }
  }) 
  console.log(`Task num: ${startTask}`)
  console.log(Math.max(...vals, criticalTaskTime));
  return Math.max(...vals, criticalTaskTime);
}

function solveMaxVerticesToTask(taskIndex: number, taskGraph: number[][]) {
  return taskGraph.reduce((partialSum, row) => partialSum + row[taskIndex], 0);
}

function MC_DZZZ(
  tasksGraph: number[][],         // G = (T, E), E ⊂ T × T
  taskSpecification: number[][],  // ((pi, ai, Di), Ti ∈ T)
  taskCount: number,              // n
  processorCount: number          // m
) {
  // p: 0, a: 1, D: 2
  const t = 0;

  const edges = solveEdges(tasksGraph);               // E
  const taskPriority = Array(taskCount).fill(0);      // wi
  const criticalTaskTimes= Array(taskCount).fill(0);  // ti
  const maxVerticesToTask = Array(taskCount).fill(0);                 // hi

  for (let i = 0; i < taskCount; i++) {
    taskPriority[i] = solveTaskPriority(taskSpecification[i][0], taskSpecification[i][1]);
    criticalTaskTimes[i] = solveCriticalTaskTimes(i, tasksGraph, taskSpecification);
    maxVerticesToTask[i] = solveMaxVerticesToTask(i, tasksGraph);
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
  const P = structuredClone(taskSpecification);   // T copy
  const q = taskSpecification.map(el => el[0]);   // pi copy
  console.log(`Ilość tasków(n): ${taskCount}`)
  console.log(`Ilość procesów(w): ${processorCount}`)
  console.log(`Macierz specyfikacji zadań((pi, ai, Di), Ti ∈ T): ${JSON.stringify(taskSpecification)}`)
  console.log(`Zbiór krawędzi grafu(E): ${JSON.stringify(edges)}`)
  console.log(`Priorytet zadania(w): ${taskPriority}`)
  console.log(`Czas zadanie krytycznego(ti): ${criticalTaskTimes}`)
  console.log(`Maksymalna liczba krawędzi w G prowadząca do Ti(h): ${maxVerticesToTask}`)
  console.log(`Kopia T - (P): ${P}`)
  console.log(`Kopia pi - (qi): ${q}`)
  // console.log(`Priorytet zadania(w): ${W}`)
  // while(P !== null) {
  //   const av = processorCount;
  //   // Q = {Ti ∈ P : (qj = 0, j ∈ Bi ) ∧ (qi > 0)}; /*zbiór zadań gotowych*/
  //   if (Q === null) {
  //     break;
  //   }
  // }
}

export default MC_DZZZ;