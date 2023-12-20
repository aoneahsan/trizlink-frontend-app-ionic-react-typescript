/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
// import { motion } from 'framer-motion';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonButton, ZIonCol, ZIonText } from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type ZIonTargetType } from '@/types/zaionsAppSettings.type';
import { type LinkInBioBlockAnimationEnum } from '@/types/AdminPanel/linkInBioType/blockTypes';
import { type LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZLinkInBioButtonBlockInterface {
  title?: string;
  style?: Record<string, unknown>;
  url?: string;
  target?: ZIonTargetType;
  animationType?: LinkInBioBlockAnimationEnum;
  className?: string;
  fill?: 'clear' | 'default' | 'outline' | 'solid';
  fontFamily?: LinkInBioThemeFontEnum;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioButtonBlock: React.FC<ZLinkInBioButtonBlockInterface> = ({
  title,
  style,
  url,
  target,
  animationType,
  className,
  fill,
  fontFamily
}) => {
  // const variants = {
  //   bounce: {
  //     animationName: animationType,
  //     animationDuration: '1s',
  //     animationTimingFunction: 'ease-in-out',
  //     animationIterationCount: 'infinite',
  //   },
  // };

  // Recoil state link-in-bio form state (for editing or creating link-in-bio)

  return (
    <ZIonCol className='py-[0.4rem] px-0'>
      {/* <motion.div animate={animationType} variants={variants}> */}
      <ZIonButton
        expand='block'
        className={classNames(className, animationType, fontFamily, {
          'ion-text-capitalize font-bold text-[16px] ion-text-wrap my-0 animated mx-auto  h-[3.5rem]':
            true
        })}
        style={style}
        target={target}
        href={url}
        fill={fill}
        // color='light'
      >
        <ZIonText color='light'>{title}</ZIonText>
      </ZIonButton>
      {/* </motion.div> */}
    </ZIonCol>
  );
};

export default ZLinkInBioButtonBlock;
