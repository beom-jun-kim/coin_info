import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.bgColor};
  font-weight:600;
  font-size: 2rem;
`;

const Container = styled.div`
  max-width:1000px;
  margin: 0 auto;
`;
const Header = styled.header`
  display:flex;
  justify-content: center;
  align-items:center;
  margin-bottom:20px;
  background:${props => props.theme.textColor};
  height: 100px;
`;
const CoinList = styled.ul`
  padding:10px;
`;
const Coin = styled.li`
  padding:10px;
  border:1px solid;
  margin-bottom:5px;
  transition:.5s;
  &:hover {
    background:${(props) => props.theme.textColor};
    color:${(props) => props.theme.bgColor};
    border:1px solid ${(props) => props.theme.textColor};
  }
`;

const coins = [
  {
    id: 1,
    name: "coin1",
    symbol:"coin1",
    rank:1,
    is_new:false,
    is_active:false,
    type:"token",
  },
  {
    id: 2,
    name: "coin2",
    symbol:"coin2",
    rank:2,
    is_new:false,
    is_active:false,
    type:"token",
  },
  {
    id: 3,
    name: "coin3",
    symbol:"coin3",
    rank:3,
    is_new:false,
    is_active:false,
    type:"token",
  },
];

function Coins() {
  return (
    <Container>
      <Header>
        <Title>COINS</Title>
      </Header>
      <CoinList>
        {coins.map((coin) => (
          <Link to={`/${coin.id}`}>
            <Coin key={coin.id}>{coin.name} → </Coin>
          </Link>
        ))}
      </CoinList>
    </Container>
  );
}

export default Coins;
