import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeSeriesScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";

interface Props {
  timeseries: Object;
}

const SmallGraph: React.FC<Props> = ({ timeseries }) => {
  ChartJS.register(TimeSeriesScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const labels = Object.keys(timeseries);

  const priceData = Object.values(timeseries);

  const options = {
    response: true,
    parsing: {
      xAxisKey: "priceDate",
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          // TODO: Try to format it
          unit: "day" as const,
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Price",
        data: priceData,
        parsing: {
          yAxisKey: "productPrice",
        },
      },
      {
        label: "RRP",
        data: priceData,
        parsing: {
          yAxisKey: "retailPrice",
        },
      },
      {
        label: "Offer",
        data: priceData,
        parsing: {
          yAxisKey: "slashedPrice",
        },
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default SmallGraph;
