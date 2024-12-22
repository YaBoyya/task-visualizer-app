import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import { TimelineChartProps } from "./props";


const options: ApexOptions = {
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
    "#1a2b3c", "#e3f4a5", "#ff5733", "#2ecc71", "#3498db",
    "#9b59b6", "#34495e", "#16a085", "#f39c12", "#e74c3c",
    "#7f8c8d", "#d35400", "#27ae60", "#2980b9", "#8e44ad",
    "#2c3e50", "#f1c40f", "#c0392b", "#bdc3c7", "#1abc9c",
    "#ecf0f1", "#95a5a6", "#223344", "#556677", "#8899aa"
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

function TimelineChart({onClick, chartSeries}: TimelineChartProps) {
  const [step, setStep] = useState<number>(chartSeries.length - 1)

  const handleStepChange = (it: number) => setStep(prev => {
    let newStep = prev + it;
    const maxSteps = chartSeries.length - 1;

    if (newStep < 0) newStep = 0;
    else if (newStep > maxSteps) newStep = maxSteps;
    return newStep;
  });

  useEffect(() => {
    setStep(chartSeries.length - 1);
  }, [chartSeries]);
  
  return(
    <>
      <div className="flex place-content-between">
        <Button onClick={() => handleStepChange(-1)}>
          <div className="inline-flex align-middle">
            <svg viewBox="0 0 1024 1024" height="24" width="16" fill="#DDD" className="rotate-90">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path>
            </svg>
            <span>
              Previous
            </span>
          </div>
        </Button>
        <Button onClick={() => onClick()}>
          Regenerate
        </Button>
        <Button onClick={() => handleStepChange(1)}>
          <div className="inline-flex align-middle">
            <span>
              Next
            </span>
            <svg viewBox="0 0 1024 1024" height="24" width="16" fill="#DDD" className="-rotate-90">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path>
            </svg>
          </div>
        </Button>          
      </div>
      <ReactApexChart options={options} series={chartSeries[step]} type="rangeBar" height={350} />  
    </>
  );
}

export default TimelineChart;