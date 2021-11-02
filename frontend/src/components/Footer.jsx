import styled from "styled-components";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { HomeOutlined } from "@mui/icons-material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { mobile } from "../responsive";
import { categories } from "../data";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${mobile({ flexDirection: "column" })};
`;

const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })};
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })};
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>WORK IN PROGRESS</Logo>
        <Description>
          I'm building a full stack e-commerce using React, Redux, Nodejs &
          MongoDB. It will feature User authentication, products filtering and
          sorting and Cart checkout using Stripe.
        </Description>
        <SocialContainer>
          <SocialIcon color="171717">
            <a className="link" href="https://github.com/cesarcarrascom">
              <GitHubIcon />
            </a>
          </SocialIcon>
          <SocialIcon color="E4405F">
            <a className="link" href="https://instagram.com/cesarcarrascom">
              <InstagramIcon />
            </a>
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <a className="link" href="https://twitter.com/cesarcarrascom">
              <TwitterIcon />
            </a>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>HOME</ListItem>
          <ListItem>CART</ListItem>
          {categories.map((c) => (
            <ListItem>
              <Link className="link" to={`/shop/products/${c.name}`}>
                {c.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <HomeOutlined style={{ marginRight: "10px" }} /> Santiago, Chile
        </ContactItem>
        <ContactItem>
          <LocalPhoneOutlinedIcon style={{ marginRight: "10px" }} /> + 569 3577
          8400
        </ContactItem>
        <ContactItem>
          <EmailOutlinedIcon style={{ marginRight: "10px" }} />
          cc.cesar94@gmail.com
        </ContactItem>
        <Payment src="https://store-cdn.arduino.cc/uni/wysiwyg/Payment_Options.jpg" />
      </Right>
    </Container>
  );
};

export default Footer;
