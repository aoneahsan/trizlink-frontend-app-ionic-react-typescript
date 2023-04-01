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
import { ZIonButton, ZIonCol } from 'components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZIonTargetType } from 'types/zaionsAppSettings.type';
import { LinkInBioBlockAnimationEnum } from 'types/AdminPanel/linkInBioType/blockTypes';
import { LinkInBioThemeFontEnum } from 'types/AdminPanel/linkInBioType';

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
  style?: {
    [key: string]: unknown;
  };
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
  fontFamily,
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
    <ZIonCol style={{ padding: '0.6rem 0' }}>
      {/* <motion.div animate={animationType} variants={variants}> */}
      <ZIonButton
        expand='block'
        className={classNames(className, animationType, fontFamily, {
          'ion-text-capitalize fw-bold zaions__fs_16 my-0 animated mx-auto':
            true,
        })}
        style={{
          ...style,
          height: '3.5rem',

          color: '#fff',
          // '--box-shadow': '0 10px 35px -5px rgb(0 0 0 / 20%)',
          // '--border-radius': '0.8rem',
          // borderRadius: '0.8rem',
          width: '90%',
        }}
        target={target}
        href={url}
        fill={fill}
        // color='light'
      >
        {title}
      </ZIonButton>
      {/* </motion.div> */}
    </ZIonCol>
  );
};

export default ZLinkInBioButtonBlock;
