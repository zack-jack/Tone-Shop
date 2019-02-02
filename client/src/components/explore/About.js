import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const About = () => {
  return (
    <Container fluid className="page-container">
      <Header as="h2">About Us</Header>

      <p>
        Tone Shop is a family owned and operated business created by musicians,
        for musicians. We pride ourselves in providing the best possible online
        shopping experience for our customers with our unbeatable prices, highly
        knowledgeable sales staff, world class customer service, in-depth
        product video demos, fast free shipping, and industry leading return
        policy.
      </p>

      <Header subheader as="h4">
        Satisfaction Guaranteed:
      </Header>
      <p>
        We offer a WORLDWIDE 45-day satisfaction guarantee for all new and demo
        purchases. During the above stated guarantee period you can return your
        order and receive a refund minus shipping. This industry- leading return
        policy is just another reason why Tone Shop is the leader in online
        guitar retailing.
      </p>

      <Header subheader as="h4">
        Same Day Shipping:
      </Header>
      <p>
        All orders ship the same business day if ordered before 3pm eastern. If
        you missed our 3pm cutoff don't worry; your order is guaranteed to ship
        within 24 hours.
      </p>

      <Header subheader as="h4">
        Free 2 Year Warranty:
      </Header>
      <p>
        We want you to feel confident with your new guitar purchase, which is
        why when you purchase a new product from us, you are automatically
        enrolled into our FREE Two Year Warranty.
      </p>

      <Header subheader as="h4">
        60 Day Price Match Guarantee:
      </Header>
      <p>
        No one beats our prices and we will never lose a sale due to price. If
        another authorized dealer has the product you’re looking for listed for
        less we’ll beat that price, no questions asked! After the sale you are
        guaranteed to have the lowest listed price on the internet for 60 days.
        Contact us and you’re sure to save some serious cash!
      </p>
    </Container>
  );
};

export default About;
