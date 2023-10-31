/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCustomCard from '@/components/CustomComponents/ZCustomCard';
import { ZMediaEnum } from '@/types/zaionsAppSettings.type';
import { Swiper, SwiperSlide } from 'swiper/react';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type linkInBioBlockCardItemInterface,
  type LinkInBioCardStyleEnum
} from '@/types/AdminPanel/linkInBioType/blockTypes';

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
interface ZLinkInBioRSSBlockInterface {
  data?: linkInBioBlockCardItemInterface[];
  cardStyle?: LinkInBioCardStyleEnum;
}

/**
 * Functional Component
 * About: This component will handle RSS data, ZCustomCard is a genetic component used in multiple places, this ZLinkInBioRSSBlock is specific for handling RSS data and RSS UI.
 * @type {*}
 * */

const ZLinkInBioRSSBlock: React.FC<ZLinkInBioRSSBlockInterface> = ({
  data,
  cardStyle
}) => {
  return (
    <>
      <Swiper
        // spaceBetween={0}
        // slidesPerView={1}
        // onSlideChange={() => {}}
        // onSwiper={(_) => {}}
        style={{ width: '100%' }}>
        {data !== undefined ? (
          data?.map((element, index) => {
            return (
              <SwiperSlide key={index}>
                <ZCustomCard
                  mediaType={ZMediaEnum.image}
                  title={element.title}
                  description={element.description}
                  image={element.imageUrl}
                  type={cardStyle}
                />
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide>
            <ZCustomCard mediaType={ZMediaEnum.image} />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default ZLinkInBioRSSBlock;
