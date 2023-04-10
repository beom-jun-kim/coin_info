import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

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

interface RouterState {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const location = useLocation();
  const name = location.state as RouterState;
  const nameStr = JSON.stringify(name).replace(/"/g, '');

  return (
    <Container>
      <Header>
        <Title>{nameStr || "Loading"}</Title>
      </Header>      
    </Container>
  );
}

export default Coin;
