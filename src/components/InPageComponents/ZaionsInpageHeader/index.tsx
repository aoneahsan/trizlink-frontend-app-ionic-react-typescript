// Core Import
import React from 'react';

// Package Imports
import classNames from 'classnames';

// Custom Imports
import ZaionsHr from '@/components/InPageComponents/Zaions_hr';
import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonImg,
  ZIonGrid,
  ZIonRow,
  ZIonButton
} from '@/components/ZIonComponents';

// Global Constants
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Styles
import classes from './styles.module.css';

const ZaionsInpageHeader: React.FC<{
  lgImg?: string;
  label?: string | JSX.Element[] | JSX.Element;
  title: string | JSX.Element[] | JSX.Element;
  subTitle?: string | JSX.Element[] | JSX.Element;
  primaryBtnText?: string | JSX.Element[] | JSX.Element;
  isPrimaryBtn?: boolean;
  secondaryBtnText?: string | JSX.Element[] | JSX.Element;
  isSecondaryBtn?: boolean;
  extraData?: string | JSX.Element[] | JSX.Element;
  primaryBtnLinkTo?: string;
  seondaryBtnLinkTo?: string;
  className?: string | string[];
  colClassName?: string | string[];
  bottomHr?: boolean;
}> = ({
  lgImg,
  label,
  title,
  subTitle,
  primaryBtnText,
  isPrimaryBtn = true,
  secondaryBtnText,
  isSecondaryBtn,
  extraData,
  primaryBtnLinkTo,
  seondaryBtnLinkTo,
  className,
  colClassName,
  bottomHr = true
}) => {
  // Medias
  const { isLgScale, isMdScale, isXlScale } = useZMediaQueryScale();

  //   JSX Code
  return (
    <>
      <ZIonGrid
        className={`${classNames(classes.zaions__pb, className, {
          'pt-2 pb-5': true
        })}`}>
        <ZIonRow
          className={`${classNames(classes.zaions__pb, {
            'pt-5 mt-5': isXlScale,
            'mt-0': !isXlScale
          })}`}>
          <ZIonCol
            sizeXl='.8'
            sizeLg='1'
            sizeMd='12'>
            {!isLgScale && (
              <ZIonImg
                src={lgImg}
                className={classNames({
                  'mx-auto': true,
                  'w-full': !isMdScale,
                  'w-[70%]': isMdScale
                })}
              />
            )}
          </ZIonCol>
          <ZIonCol
            sizeXl='10'
            sizeLg='10'
            sizeMd='12'
            sizeSm='12'
            sizeXs='12'
            className={`${classNames(colClassName, {
              // 'ms-4': !!colClassName,
              // 'mx-3': true,
            })}`}>
            <ZIonText className='block font-bold ion-no-padding'>
              {label}
            </ZIonText>
            <ZIonText
              className={classNames({
                'zaions__page_title ion-no-padding': true,
                'text-5xl': !isXlScale
              })}>
              {title}
            </ZIonText>
            <ZIonText
              className={classNames({
                'zaions__page_subtitle ion-no-padding mt-1': true,
                'text-xl': isLgScale
              })}>
              {subTitle}
            </ZIonText>
            <div
              className={classNames({
                'ion-text-center mt-4 pt-2 ': true,
                'ion-text-start': !isXlScale,
                'w-max ion-text-center': isXlScale
              })}>
              {isPrimaryBtn ? (
                <ZIonButton
                  className='ion-text-capitalize ion-margin-top'
                  color='primary'
                  fill='solid'
                  size='large'
                  expand={!isLgScale ? 'block' : undefined}
                  routerLink={primaryBtnLinkTo}>
                  {primaryBtnText}
                </ZIonButton>
              ) : null}
              {isSecondaryBtn === true && (
                <ZIonRouterLink routerLink={seondaryBtnLinkTo}>
                  <ZIonText
                    className={classNames({
                      'zaions__getAQuote_btn ion-text-capitalize text-[14px]':
                        true,
                      block: isLgScale
                    })}
                    color='primary'>
                    {secondaryBtnText}
                  </ZIonText>
                </ZIonRouterLink>
              )}
            </div>
            {extraData ?? ''}
          </ZIonCol>
        </ZIonRow>
      </ZIonGrid>
      {bottomHr && (
        <ZIonGrid>
          <ZIonRow>
            <ZIonCol></ZIonCol>
            <ZIonCol
              sizeXl='11.2'
              sizeLg='12'
              sizeMd='12'
              sizeSm='12'
              sizeXs='12'>
              <ZaionsHr></ZaionsHr>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
      )}
    </>
  );
};

export default ZaionsInpageHeader;
