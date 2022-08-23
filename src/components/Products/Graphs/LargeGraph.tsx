import {
  Chart as ChartJS,
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

interface Props {
  timeseries: Object;
}

const LargeGraph: React.FC<Props> = ({ timeseries }) => {
  ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  // const labels = Object.keys(timeseries);
  // console.log("Labels: ", labels);

  const priceData = Object.values(timeseries);
  // console.log("Price Data: ", priceData);

  // Sorting without mutating
  const sortedPriceData = [...priceData].sort((a, b) => a.priceDate - b.priceDate);
  // console.log("Sorted Price Data: ", sortedPriceData);

  const options = {
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
        // Weird typescript linting error
        // min: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) as unknown as string,
        ticks: {
          minRotation: 45,
          maxRotation: 45,
        },
        type: "time" as const,
        time: {
          unit: "day" as const,
          displayFormats: {
            millisecond: "DD.MM",
            day: "DD.MM",
          },
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Price",
        data: sortedPriceData,
        parsing: {
          yAxisKey: "productPrice",
        },
        borderColor: "rgb(235, 109, 94)",
      },
      {
        label: "RRP",
        data: sortedPriceData,
        parsing: {
          yAxisKey: "retailPrice",
        },
        borderColor: "rgb(150, 129, 200)",
      },
      {
        label: "Offer",
        data: sortedPriceData,
        parsing: {
          yAxisKey: "slashedPrice",
        },
        borderColor: "rgb(108, 140, 253)",
      },
      {
        label: "Used",
        data: sortedPriceData,
        parsing: {
          yAxisKey: "usedPrice",
        },
        borderColor: "rgb(50,205,50)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LargeGraph;
