import { Doughnut } from "react-chartjs-2";
import "../styles/DonutChart.css";
import "../styles/Info.css";

const DonutChart = ({ rating }) => {
  let ratingVal = rating["Value"].substring(0, rating["Value"].indexOf("/"));
  if (!ratingVal) {
    ratingVal = rating["Value"].substring(0, rating["Value"].indexOf("%"));
  }
  let maxScore = 100;
  if (rating["Source"] === "Internet Movie Database") {
    maxScore = 10;
  }
  const data = {
    labels: ["Rating", "Rating from max score"],
    datasets: [
      {
        label: "Score",
        backgroundColor: ["#B21F00", "#FFFFFF"],
        hoverBackgroundColor: ["#501800", "#FFFFFF"],
        data: [ratingVal, maxScore - ratingVal],
      },
    ],
    text: ratingVal,
  };
  return (
    <div className="chart-container">
      <label htmlFor="ratingsChart">
        {rating["Source"]} Rating: {ratingVal}
      </label>
      <Doughnut
        id="ratingsChart"
        aria-label="donut chart"
        role="img"
        data={data}
        options={{
          aspectRatio: 1,
          title: {
            display: true,
            text: rating["Source"],
            fontSize: 20,
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default DonutChart;
