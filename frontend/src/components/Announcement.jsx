import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: darkgreen;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 600;
`;

const Announcement = () => {
  return (
    <Container>
      <a
        href="https://github.com/cesarcarrascom/ecommerce-shop"
        rel="noopener noreferrer"
        className="link"
      >
        GITHUB REPOSITORY LINK
      </a>
    </Container>
  );
};

export default Announcement;
