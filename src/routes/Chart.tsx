import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ReactApexCharts from "react-apexcharts";
import {Helmet} from "react-helmet";


interface IData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      <Helmet>
          <title>Chart</title>
      </Helmet>
      {isLoading ? (
        "차트 로딩 중..."
      ) : (
        <ReactApexCharts
          style={{"margin-top": 20}}
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 100,
              width: 500,
              toolbar: {
                show:false,
              }
            },
            stroke: {
              curve:"smooth",
              width:4,
            },
            xaxis:{
              type:"datetime",
              categories:data?.map((price) => price.time_close),
            },
            fill:{
              type:"gradient",
              gradient:{gradientToColors:["skyblue"]},
            },
            colors:["blue"],
          }}
        />
      )}
    </div>
  );
}
export default Chart;
