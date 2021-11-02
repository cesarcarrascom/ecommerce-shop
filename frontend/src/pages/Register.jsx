import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1621210076591-579f1963a594?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({ width: "75%" })};
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const SubmitButton = styled.button`
  width: 40%;
  margin: 5px 0px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const LoginText = styled.span`
  text-decoration: none;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE ACCOUNT</Title>
        <Form>
          <Input placeholder="Name..." />
          <Input placeholder="Last Name..." />
          <Input placeholder="Username..." />
          <Input placeholder="Email..." />
          <Input placeholder="Password..." />
          <Input placeholder="Confirm Password..." />

          <SubmitButton>REGISTER</SubmitButton>
        </Form>
        <Link className="link" to="/shop/login">
          <LoginText>Already registered? Log in...</LoginText>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
