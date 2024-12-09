import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import { ChartSeriesParams } from "./props";


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

function TimelineChart({chartSeries}: {chartSeries: ChartSeriesParams;}) {
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
        <Button onClick={() => handleStepChange(-1)}>{"<- prev step"}</Button>
        <Button onClick={() => handleStepChange(1)}>{"next step ->"}</Button>          
      </div>
      <ReactApexChart options={options} series={chartSeries[step]} type="rangeBar" height={350} />  
    </>
  );
}

export default TimelineChart;