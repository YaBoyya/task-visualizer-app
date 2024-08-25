import { Chart } from 'react-google-charts'

export const data = [
  [
    { type: "string", id: "President" },
    { type: "string", id: "dummy bar label" },
    { type: "string", role: "tooltip" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  ["P4", "T3", "Task3", 0, 15],
  ["P3", "T3", "Task3", 0, 15],
  ["P2", "T2", "Task2", 0, 15],
  ["P1", "T2", "Task2", 0, 15],
  ["P0", "T2", "Task2", 0, 15],

  ["P4", "T0", "Task0", 15, 20],
  ["P3", "T4", "Task4", 15, 20],
  ["P2", "T2", "Task2", 15, 20],
  ["P1", "T2", "Task2", 15, 20],
  ["P0", "T2", "Task2", 15, 20],

  ["P4", "T0", "Task0", 20, 25],
  ["P3", "T4", "Task4", 20, 25],
  ["P2", "T6", "Task6", 20, 25],
  ["P1", "T6", "Task6", 20, 25],
  ["P0", "T6", "Task6", 20, 25],

  ["P4", "T5", "Task5", 25, 30],
  ["P3", "T4", "Task4", 25, 30],
  ["P2", "T6", "Task6", 25, 30],
  ["P1", "T6", "Task6", 25, 30],
  ["P0", "T6", "Task6", 25, 30],

  ["P4", "T8", "Task8", 30, 35],
  ["P3", "T5", "Task5", 30, 35],
  ["P2", "T6", "Task6", 30, 35],
  ["P1", "T6", "Task6", 30, 35],
  ["P0", "T6", "Task6", 30, 35],

  ["P4", "T1", "Task1", 35, 40],
  ["P3", "T1", "Task1", 35, 40],
  ["P2", "T6", "Task6", 35, 40],
  ["P1", "T6", "Task6", 35, 40],
  ["P0", "T6", "Task6", 35, 40],

  ["P3", "T8", "Task8", 40, 45],
  ["P2", "T1", "Task1", 40, 45],
  ["P1", "T1", "Task1", 40, 45],
  ["P0", "T1", "Task1", 40, 45],

  ["P2", "T7", "Task7", 45, 50],
  ["P1", "T7", "Task7", 45, 50],
  ["P0", "T7", "Task7", 45, 50],
];

export const options = {
  allowHtml: true,
  height: 400
};

function TimelineChart() {
  return(
    <Chart
      chartType='Timeline'
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}

export default TimelineChart;