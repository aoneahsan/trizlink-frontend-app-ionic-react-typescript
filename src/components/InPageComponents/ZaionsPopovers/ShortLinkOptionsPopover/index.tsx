/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useRecoilValue, useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { reportCustomError } from '@/utils/customErrorType';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';
import { type ShortUrlLinkOptionType } from '@/types/AdminPanel/linksType';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
  NewShortLinkFormState,
  NewShortLinkSelectTypeOption
} from '@/ZaionsStore/UserDashboard/ShortLinks/ShortLinkFormState.recoil';
import { ZaionsShortUrlLinkOptionData } from '@/ZaionsStore/UserDashboard/ShortLinks/ShortUrlLinkOption.recoil';
import {
  ZIonCol,
  ZIonGrid,
  ZIonIcon,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import { type FormikSetFieldValueEventVoidType } from '@/types/ZaionsFormik.type';
import { LinkTypeOptionsData } from '@/data/UserDashboard/Links';
import CONSTANTS from '@/utils/constants';

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZShortLinkOptionsPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  type: messengerPlatformsBlockEnum;
  setFieldValue?: FormikSetFieldValueEventVoidType;
}> = ({ dismissZIonPopover, setFieldValue, type }) => {
  const ShortUrlLinkOptionData = useRecoilValue<ShortUrlLinkOptionType[]>(
    ZaionsShortUrlLinkOptionData
  );
  const setNewShortLinkFormState = useSetRecoilState(NewShortLinkFormState);

  const setNewShortLinkTypeOptionDataAtom = useSetRecoilState(
    NewShortLinkSelectTypeOption
  );

  // const { setFieldValue } =
  // useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

  const shortLinkTypeOptionChangeHandler = (
    _type: messengerPlatformsBlockEnum
  ): void => {
    try {
      if (_type === type) {
        return;
      }
      setFieldValue !== undefined && setFieldValue('target', {}, false);

      const selectedTypeOptionData = LinkTypeOptionsData.find(
        el => el.type === _type
      );

      if (selectedTypeOptionData !== undefined) {
        setNewShortLinkTypeOptionDataAtom(oldValues => ({
          ...selectedTypeOptionData
        }));
      }

      setNewShortLinkFormState(oldVal => ({
        ...oldVal,
        type: _type,
        target: {
          url: null,
          accountId: null,
          message: null,
          email: null,
          subject: null,
          phoneNumber: null,
          username: null
        }
      }));
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <ZIonGrid className='ion-padding'>
      <ZIonRow className='w-full'>
        {ShortUrlLinkOptionData.map(el => {
          return (
            <ZIonCol
              size='5'
              key={el.id}>
              <ZIonText
                className='flex gap-3 cursor-pointer ion-align-items-center ion-margin-bottom'
                testingselector={`${CONSTANTS.testingSelectors.shortLink.formPage.ShortUrlOptionFields.typePopover.typeBtn}-${el.type}`}
                onClick={() => {
                  shortLinkTypeOptionChangeHandler(el.type);
                }}>
                <ZIonIcon
                  icon={el.icon.iconName}
                  className='w-6 h-6'
                />
                {el.text}
              </ZIonText>
            </ZIonCol>
          );
        })}
      </ZIonRow>
    </ZIonGrid>
  );
};

export default ZShortLinkOptionsPopover;
