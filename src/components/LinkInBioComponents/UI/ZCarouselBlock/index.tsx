/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { Navigation, Pagination, Scrollbar, Grid } from 'swiper/modules';
import { ZIonLabel, ZIonText } from '@/components/ZIonComponents';
import { Swiper, SwiperSlide } from 'swiper/react';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCustomCard from '@/components/CustomComponents/ZCustomCard';
import classNames from 'classnames';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { isZNonEmptyString } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  LinkInBioCardViewEnum,
  type linkInBioBlockCardItemInterface,
  type LinkInBioCardStyleEnum,
  type LinkInBioBlockAnimationEnum
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZMediaEnum } from '@/types/zaionsAppSettings.type';

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
interface ZCarouselBlockInterface {
  data?: linkInBioBlockCardItemInterface[];
  cardStyle?: LinkInBioCardStyleEnum;
  view?: LinkInBioCardViewEnum;
  animationType?: LinkInBioBlockAnimationEnum;
}

/**
 * Functional Component
 * About: This component will handle RSS data, ZCustomCard is a genetic component used in multiple places, this ZLinkInBioRSSBlock is specific for handling RSS data and RSS UI.
 * @type {*}
 * */
const ZCarouselBlock: React.FC<ZCarouselBlockInterface> = ({
  data,
  cardStyle,
  view,
  animationType
}) => {
  return (
    <div
      className={classNames(animationType, {
        'animated ': isZNonEmptyString(animationType)
      })}>
      {data !== undefined && data !== null && data?.length > 0 ? (
        view === LinkInBioCardViewEnum.carousel ? (
          <Swiper
            spaceBetween={10}
            modules={[Navigation, Pagination, Scrollbar, Grid]}
            // slidesPerView={1}
            // onSlideChange={() => {}}
            // onSwiper={(_) => {}}
            className='w-full h-full'>
            {data?.map((element, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className='h-full'>
                  <ZCustomCard
                    mediaType={ZMediaEnum.carousel}
                    title={element.title}
                    description={element.description}
                    image={element.imageUrl}
                    type={cardStyle}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : view === LinkInBioCardViewEnum.list ? (
          <ZIonLabel className=''>
            {data?.map((element, index) => {
              return (
                <div
                  className='mt-3'
                  key={index}>
                  <ZCustomCard
                    mediaType={ZMediaEnum.carousel}
                    title={element.title}
                    description={element.description}
                    image={element.imageUrl}
                    type={cardStyle}
                    key={index}
                  />
                </div>
              );
            })}
          </ZIonLabel>
        ) : (
          <ZIonText>Not a valid view</ZIonText>
        )
      ) : (
        <ZCustomCard mediaType={ZMediaEnum.carousel} />
      )}
      {}

      {/* <ZIonLabel className='flex-col w-full gap-3'>
        {data !== undefined ? (
          data?.map((element, index) => {
            return (
              <ZCustomCard
                mediaType={ZMediaEnum.carousel}
                title={element.title}
                description={element.description}
                image={element.imageUrl}
                type={cardStyle}
                key={index}
              />
            );
          })
        ) : (
          <ZCustomCard mediaType={ZMediaEnum.carousel} />
        )}
      </ZIonLabel> */}
    </div>
  );
};

export default ZCarouselBlock;
