import {
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import { Timeseries } from "src/lib/types/mongodb";

interface Props {
  timeseries: Timeseries;
}

const GraphFull: React.FC<Props> = ({ timeseries }) => {
  ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const priceData = Object.values(timeseries);

  const sortedPriceData = [...priceData].sort((a, b) => a.priceDate - b.priceDate);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      filler: {
        propagate: true,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(47,97,68, 1)",
        fill: true,
        backgroundColor: "rgba(47,97,68, 0.3)",
      },
      point: {
        radious: 0,
        hitRadius: 0,
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    parsing: {
      xAxisKey: "priceDate",
    },
    scales: {
      x: {
        display: false,
        min: new Date(Date.now() - 7.5 * 24 * 60 * 60 * 1000) as unknown as string,
        ticks: {
          minRotation: 45,
          maxRotation: 45,
        },
        type: "time" as const,
        time: {
          tooltipFormat: "DD MMMM YYYY",
          displayFormats: {
            millisecond: "DD.MM",
            hour: "DD.MM",
            day: "DD.MM",
          },
        },
      },
      y: {
        display: false,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Price",
        data: sortedPriceData,
        parsing: {
          yAxisKey: "priceCurrent",
        },
        borderColor: "rgb(235, 109, 94)",
      },
      {
        label: "RRP",
        data: sortedPriceData,
        parsing: {
          yAxisKey: "priceRetail",
        },
        borderColor: "rgb(150, 129, 200)",
      },
      {
        label: "Offer",
        data: sortedPriceData,
        parsing: {
          yAxisKey: "priceSlashed",
        },
        borderColor: "rgb(108, 140, 253)",
      },
      {
        label: "Used",
        data: sortedPriceData,
        parsing: {
          yAxisKey: "priceUsed",
        },
        borderColor: "rgb(50,205,50)",
      },
    ],
  };

  return <Line width={100} height={40} options={options} data={data} />;
};

export default GraphFull;
