import {
  Routes,
  Route,
  useLocation,
  useParams,
  useMatch,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchCoinPrice } from "./api";
import {Helmet} from "react-helmet";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.bgColor};
  font-weight: 600;
  font-size: 2rem;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background: ${(props) => props.theme.textColor};
  height: 100px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  width: 49.5%;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  a {
    display: block;
    height: 50px;
    line-height: 50px;
  }
`;

interface RouterState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const location = useLocation();
  const name = location.state as RouterState || `${coinId}`.slice(4);
  const nameStr = JSON.stringify(name).replace(/"/g, "");

  // useMatch : url 경로 이름에 대해 경로 패턴을 일치시키고 일치에 대한 정보 반환
  const priceMatch = useMatch("/:coinId/price");
  console.log("priceMatch",priceMatch);
  const chartMatch = useMatch("/:coinId/chart");
  console.log("chartMatch",chartMatch);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: priceLoading, data: priceDate } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId!),

    // 세번째 인자 : 밀리초로 업데이트 가능
    {
      refetchInterval:5000,
    }
  );

  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>{nameStr}</title>
      </Helmet>
      <Header>
        <Title>{nameStr}</Title>
      </Header>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>price:</span>
              <span>{priceDate?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>

          <Description>{infoData?.description}</Description>

          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceDate?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceDate?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={coinId ? <Chart coinId={coinId}/> : null} />
            <Route path="price" element={<Price />} />
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;
