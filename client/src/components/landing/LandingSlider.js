import React from 'react';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import { Header, Button } from 'semantic-ui-react';

const LandingSlider = props => {
  const slides = [
    {
      img: '/images/landing/Landing-Slide-Players.jpg',
      heading: 'Just announced at NAMM',
      subheading: 'New Fender American Performer Line',
      buttonText: 'Shop Fender',
      id: '5c1183dfa0d7bd0c34682239'
    },
    {
      img: '/images/landing/Landing-Slide-Silver-Sky.jpg',
      heading: 'John Mayer - Silver Sky',
      subheading: 'Brand new colors for 2019',
      buttonText: 'Shop PRS',
      id: '5c118b207d5e6e40e4986986'
    },
    {
      img: '/images/landing/Landing-Slide-Black-Falcon.jpg',
      heading: 'Modern appointments. Classic Vibe.',
      subheading: 'Gretsch G6136T Players Edition Black Falcon',
      buttonText: 'Shop Gretsch',
      id: '5c11898a7d5e6e40e4986985'
    }
  ];

  // React Slick Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5500
  };

  const handleButtonClick = e => {
    props.history.push(`/browse/brand/${e.target.getAttribute('id')}`);
  };

  const renderSlider = slides => {
    return slides.map((slide, i) => {
      return (
        <div key={i} className="slider">
          <div
            className="slider__image"
            style={{ background: `url('${slide.img}')` }}
          />

          {i === 1 ? (
            <div className={`slider__actions slider__actions--${i + 1}`}>
              <Header inverted as="h2">
                {slide.heading}
              </Header>
              <Header inverted as="h3">
                {slide.subheading}
              </Header>
              <Button color="red" id={slide.id} onClick={handleButtonClick}>
                {slide.buttonText}
              </Button>
            </div>
          ) : (
            <div className={`slider__actions slider__actions--${i + 1}`}>
              <Header as="h2">{slide.heading}</Header>
              <Header as="h3">{slide.subheading}</Header>
              <Button color="red" id={slide.id} onClick={handleButtonClick}>
                {slide.buttonText}
              </Button>
            </div>
          )}
        </div>
      );
    });
  };

  return <Slider {...settings}>{renderSlider(slides)}</Slider>;
};

export default withRouter(LandingSlider);
