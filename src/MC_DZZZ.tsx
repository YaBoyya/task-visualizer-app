export interface EdgeParams {
  start: number;
  end: number;
}

function solveEdges(taskGraph: number[][]) {
  let edges: EdgeParams[] = []; 

  taskGraph.forEach((row, start) => {
      row.forEach((el, end) => {
      if (el == 1) {
        let edge: EdgeParams = {
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

function solveHi(taskConnections: number[]) {
  // TODO check if it's solved correctly -> edges to or from i 
  // temporary solution, works as long as graph is just 0 and 1
  return taskConnections.reduce((partialSum, a) => partialSum + a, 0);
}

function MC_DZZZ(tasksGraph: number[][], taskSpecification: number[][], n: number, m: number) {
  // p: 0, a: 1, D: 2
  const t = 0;

  const edges = solveEdges(tasksGraph);       // E
  const taskPriority = Array(n).fill(0);      // wi
  const criticalTaskTimes= Array(n).fill(0);  // ti
  const H = Array(n).fill(0);                 // hi

  for (let i = 0; i < n; i++) {
    taskPriority[i] = solveTaskPriority(taskSpecification[i][0], taskSpecification[i][1]);
    criticalTaskTimes[i] = solveCriticalTaskTimes(i, tasksGraph, taskSpecification);
    H[i] = solveHi(tasksGraph[i]);
  }
  
  if (edges !== null) {
    for (let i = 0; i < n; i++) {
      taskPriority[i] = taskPriority[i] + criticalTaskTimes[i];
    }
  }
  for (let i = 0; i < n; i++){
    // TODO find new example that passes
    if (criticalTaskTimes[i] > taskSpecification[i][2]) {
      // TODO customize the event
      throw Error(`Uszeregowanie nie istnieje.${i}, ${criticalTaskTimes[i]}, ${taskSpecification[i][2]}`);
    }
  }
  const P = structuredClone(taskSpecification);    // T copy
  const q = structuredClone(taskSpecification[0]); // pi copy
  console.log(`Ilość tasków(n): ${n}`)
  console.log(`Ilość procesów(w): ${m}`)
  console.log(`Macierz specyfikacji zadań((pi, ai, Di), Ti ∈ T): ${taskSpecification}`)
  console.log(`Zbiór krawędzi grafu(E): ${JSON.stringify(edges)}`)
  console.log(`Priorytet zadania(w): ${taskPriority}`)
  console.log(`Czas zadanie krytycznego(ti): ${criticalTaskTimes}`)
  console.log(`Maksymalna liczba krawędzi w G prowadząca od Ti(h): ${H}`)
  // console.log(`Priorytet zadania(w): ${W}`)
  // while(P !== null) {
  //   const av = m;
  //   // Q = {Ti ∈ P : (qj = 0, j ∈ Bi ) ∧ (qi > 0)}; /*zbiór zadań gotowych*/
  //   if (Q === null) {
  //     // TODO goto end-while, to break czy continue?
  //     break;
  //   }
  // }
}

export default MC_DZZZ;