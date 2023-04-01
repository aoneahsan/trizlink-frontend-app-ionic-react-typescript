/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { ReactNode } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Swiper, SwiperSlide } from 'swiper/react';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import 'swiper/css';

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
  style?: { [key: string]: unknown };
}

interface ZSwiperSlideInterface {
  onSlideChange?: (swiper: unknown) => void;
  onSwiper?: (swiper: unknown) => void;
  slidesPerView?: number;
  spaceBetween?: number;
  children?: ReactNode;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

export const ZSwiper: React.FC<ZSwiperInterface> = ({
  onSlideChange,
  onSwiper,
  slidesPerView = 1,
  spaceBetween = 0,
  children,
  style,
}) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
      style={{ width: '100%', ...style }}
    >
      {children}
    </Swiper>
  );
};

export const ZSwiperSlide: React.FC<ZSwiperSlideInterface> = ({ children }) => {
  return <SwiperSlide>{children}</SwiperSlide>;
};
