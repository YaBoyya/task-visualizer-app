import ReactApexChart from "react-apexcharts";

const series = [
  {
    name: 'Task0',
    data: [
      {
        x: 'P4',
        y: [15, 25]
      },
      {
        x: 'P4',
        y: [30, 35]
      },
    ]
  },
  {
    name: 'Task1',
    data: [
      {
        x: 'P4',
        y: [35, 40]
      },
      {
        x: 'P3',
        y: [35, 40]
      },
      {
        x: 'P2',
        y: [40, 45]
      },
      {
        x: 'P1',
        y: [40, 45]
      },      {
        x: 'P0',
        y: [40, 45]
      },
    ]
  },
  {
    name: 'Task2',
    data: [
      {
        x: 'P0',
        y: [0, 20]
      },
      {
        x: 'P1',
        y: [0, 20]
      },
      {
        x: 'P2',
        y: [0, 20]
      },
    ]
  },
  {
    name: 'Task3',
    data: [
      {
        x: 'P4',
        y: [0, 15]
      },
      {
        x: 'P3',
        y: [0, 15]
      }
    ]
  },
  {
    name: 'Task4',
    data: [
      {
        x: 'P3',
        y: [15, 30]
      },
    ]
  },
  {
    name: 'Task5',
    data: [
      {
        x: 'P4',
        y: [25, 30]
      },
      {
        x: 'P3',
        y: [30, 35]
      },
    ]
  },
  {
    name: 'Task6',
    data: [
      {
        x: 'P2',
        y: [20, 40]
      },
      {
        x: 'P1',
        y: [20, 40]
      },
      {
        x: 'P0',
        y: [20, 40]
      },
    ]
  },
  {
    name: 'Task7',
    data: [
      {
        x: 'P2',
        y: [45, 50]
      },
      {
        x: 'P1',
        y: [45, 50]
      },
      {
        x: 'P0',
        y: [45, 50]
      },
    ]
  },
  {
    name: 'Task8',
    data: [
      {
        x: 'P3',
        y: [40, 45]
      },
    ]
  },
]

const options = {
  chart: {
    height: 350,
    type: 'rangeBar',
    toolbar: {
      tools: {
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '75%',
      rangeBarGroupRows: true
    }
  },
  colors: [
    "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
    "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
    "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
  ],
  fill: {
    type: 'solid'
  },
  xaxis: {
    type: 'category'
  },
  legend: {
    position: 'right'
  },
}

function TimelineChart() {
  // TODO fix typing error with options
  // TODO update steps
  // const dataParams = [
  //   { type: "string", id: "President" },
  //   { type: "string", id: "dummy bar label" },
  //   { type: "string", role: "tooltip" },
  //   { type: "number", id: "Start" },
  //   { type: "number", id: "End" },
  // ]
  // const [data, setData] = useState<(typeof dataParams | dataRow[])[]>([dataParams]);
  // const [step, setStep] = useState(layeredData.length);

  // useEffect(() => {
  //   let newData: (typeof dataParams  | dataRow[])[] = [dataParams];
  //   for (let i = 0; i < step; i++) {
  //     newData = newData.concat(layeredData[i]);
  //   }
  //   setData(newData);
  // }, [step]);

  // const handleStep = (subtrahend: number) => {
  //   let diff = step + subtrahend;
  //   if (diff <= 1) {
  //     setStep(1);
  //   } else if (diff >= layeredData.length){
  //     setStep(layeredData.length);
  //   } else {
  //     setStep(diff);
  //   }
  // }

  return(
    <>
      {/* <button onClick={() => handleStep(-1)}>prev</button> */}
      {/* <button onClick={() => handleStep(1)}>next</button> */}
      <ReactApexChart options={options} series={series} type="rangeBar" height={350} />  
    </>
  );
}

export default TimelineChart;