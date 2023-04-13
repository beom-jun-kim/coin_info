import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexCharts from "apexcharts";

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
      {isLoading ? (
        "차트 로딩 중..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "hello",
              data: [1, 2, 3, 4, 5],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 100,
              width: 500,
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
