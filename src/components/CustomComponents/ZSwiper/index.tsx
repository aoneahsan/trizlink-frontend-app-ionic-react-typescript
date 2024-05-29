/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { type ReactNode } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { register } from 'swiper/element/bundle';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import 'swiper/css';
// import function to register Swiper custom elements
// register Swiper custom elements
register();

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZSwiperInterface {
  onSlideChange?: (swiper: unknown) => void;
  onSwiper?: (swiper: unknown) => void;
  slidesPerView?: number;
  spaceBetween?: number;
  children?: ReactNode;
  style?: Record<string, unknown>;
  className?: string;
}

interface ZSwiperSlideInterface {
  onSlideChange?: (swiper: unknown) => void;
  onSwiper?: (swiper: unknown) => void;
  slidesPerView?: number;
  spaceBetween?: number;
  children?: ReactNode;
  className?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

export const ZSwiperContainer: React.FC<ZSwiperInterface> = ({
  onSlideChange,
  onSwiper,
  slidesPerView = 3,
  spaceBetween = 0,
  children,
  style,
  className
}) => {
  return (
    <swiper-container
      slides-per-view={slidesPerView}
      space-between={spaceBetween}
      mousewheel-force-to-axis='true'
      style={style}
      onSwiper={onSwiper}
      onSlideChange={onSlideChange}>
      {children}
    </swiper-container>
  );
};

export const ZSwiperSlide: React.FC<ZSwiperSlideInterface> = ({
  children,
  className
}) => {
  // #region comp constants
  const _style = { width: 'min-content !important' };
  // #endregion
  return (
    <swiper-slide
      className={className}
      style={_style}>
      {children}
    </swiper-slide>
  );
};
