import { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
  color: #fff;
  background-color: #5a67d8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4c51bf;
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 1rem;
`;

const Home: NextPage = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/signup"); 
  };

  return (
    <AppContainer>
      <Title>TransactGlobal</Title>
      <Button onClick={handleButtonClick}>Get Verified by World ID</Button>
      <Text>
        Verify with World ID now and start saving with your "TransactGlobal
        Digital Card".
      </Text>
    </AppContainer>
  );
};

export default Home;





