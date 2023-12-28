import React from 'react';
import Slider from 'react-slick';

const MySlider = ({ currentSlide, slideCount, ...restProps }) => {
  const filteredProps = { ...restProps };
  delete filteredProps.currentSlide;
  delete filteredProps.slideCount;

  return <Slider {...filteredProps} />;
};

export default MySlider;