import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "./api";

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
const CoinList = styled.ul`
  padding: 10px;
`;
const Coin = styled.li`
  padding: 10px;
  border: 1px solid;
  margin-bottom: 5px;
  transition: 0.5s;
  &:hover {
    background: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.textColor};
  }
`;

const CoinLogo = styled.img`
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {

  const {isLoading , data} = useQuery<ICoin[]>("allCoins", fetchCoins);
   
  return (
    <Container>
      <Header>
        <Title>COINS</Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Link to={`/${coin.id}`} state={coin.name}>
              <Coin key={coin.id}>
                <CoinLogo
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} →
              </Coin>
            </Link>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
