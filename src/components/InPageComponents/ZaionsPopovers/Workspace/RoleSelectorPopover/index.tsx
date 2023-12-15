/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';
import {
  ZIonButton,
  ZIonCol,
  ZIonContent,
  ZIonFooter,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { WSRolesNameEnum } from '@/types/AdminPanel/workspace';

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

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceFormRoleSelectorPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  selectedRole: WSRolesNameEnum;
}> = ({ dismissZIonPopover, selectedRole }) => {
  const formikInitialValues = {
    role: selectedRole ?? WSRolesNameEnum.Approver
  };
  return (
    <Formik
      initialValues={formikInitialValues}
      enableReinitialize={true}
      onSubmit={values => {
        dismissZIonPopover(values.role, values.role);
      }}>
      {({ values, initialValues, setFieldValue, submitForm }) => {
        return (
          <>
            <ZIonContent className='h-[17.2rem] ion-no-padding ion-no-margin overflow-hidden'>
              {/* <ZIonGrid className='h-[full] ion-no-padding'> */}
              <ZCustomScrollable
                className='w-full h-full'
                scrollY={true}>
                <ZIonRow>
                  <ZIonCol
                    size='12'
                    className='px-3 mt-3'>
                    <ZIonText className='block mb-2 text-lg font-bold'>
                      Granted permissions
                    </ZIonText>
                    <ZIonRow>
                      {/*  */}
                      <ZIonCol
                        size='6'
                        className='flex gap-1 ion-align-items-center'>
                        <ZIonIcon
                          icon={checkmarkCircleOutline}
                          color='success'
                          className='w-5 h-5'
                        />
                        <ZIonText>Comment on posts</ZIonText>
                      </ZIonCol>

                      {/*  */}
                      <ZIonCol
                        size='6'
                        className='flex gap-1 ion-align-items-center '>
                        <ZIonIcon
                          icon={
                            values.role === WSRolesNameEnum.Contributor ||
                            values.role === WSRolesNameEnum.Administrator ||
                            values.role === WSRolesNameEnum.Writer
                              ? checkmarkCircleOutline
                              : values.role === WSRolesNameEnum.Guest ||
                                values.role === WSRolesNameEnum.Approver
                              ? closeCircleOutline
                              : ''
                          }
                          color={
                            values.role === WSRolesNameEnum.Contributor ||
                            values.role === WSRolesNameEnum.Administrator ||
                            values.role === WSRolesNameEnum.Writer
                              ? 'success'
                              : values.role === WSRolesNameEnum.Guest ||
                                values.role === WSRolesNameEnum.Approver
                              ? 'danger'
                              : undefined
                          }
                          className='w-5 h-5'
                        />
                        <ZIonText>Create & edit posts</ZIonText>
                      </ZIonCol>

                      {/*  */}
                      <ZIonCol
                        size='6'
                        className='flex gap-1 ion-align-items-center'>
                        <ZIonIcon
                          icon={
                            values.role === WSRolesNameEnum.Administrator ||
                            values.role === WSRolesNameEnum.Approver
                              ? checkmarkCircleOutline
                              : values.role === WSRolesNameEnum.Contributor ||
                                values.role === WSRolesNameEnum.Guest ||
                                values.role === WSRolesNameEnum.Writer
                              ? closeCircleOutline
                              : ''
                          }
                          color={
                            values.role === WSRolesNameEnum.Administrator ||
                            values.role === WSRolesNameEnum.Approver
                              ? 'success'
                              : values.role === WSRolesNameEnum.Contributor ||
                                values.role === WSRolesNameEnum.Guest ||
                                values.role === WSRolesNameEnum.Writer
                              ? 'danger'
                              : undefined
                          }
                          className='w-5 h-5'
                        />
                        <ZIonText>Approve & disapprove</ZIonText>
                      </ZIonCol>

                      {/*  */}
                      <ZIonCol
                        size='6'
                        className='flex gap-1 ion-align-items-center'>
                        <ZIonIcon
                          icon={
                            values.role === WSRolesNameEnum.Contributor ||
                            values.role === WSRolesNameEnum.Administrator
                              ? checkmarkCircleOutline
                              : values.role === WSRolesNameEnum.Guest ||
                                values.role === WSRolesNameEnum.Writer ||
                                values.role === WSRolesNameEnum.Approver
                              ? closeCircleOutline
                              : ''
                          }
                          color={
                            values.role === WSRolesNameEnum.Contributor ||
                            values.role === WSRolesNameEnum.Administrator
                              ? 'success'
                              : values.role === WSRolesNameEnum.Guest ||
                                values.role === WSRolesNameEnum.Writer ||
                                values.role === WSRolesNameEnum.Approver
                              ? 'danger'
                              : undefined
                          }
                          className='w-5 h-5'
                        />
                        <ZIonText>Publish & schedule</ZIonText>
                      </ZIonCol>

                      {/*  */}
                      <ZIonCol
                        size='6'
                        className='flex gap-1 ion-align-items-center'>
                        <ZIonIcon
                          icon={
                            values.role === WSRolesNameEnum.Administrator
                              ? checkmarkCircleOutline
                              : values.role === WSRolesNameEnum.Contributor ||
                                values.role === WSRolesNameEnum.Guest ||
                                values.role === WSRolesNameEnum.Writer ||
                                values.role === WSRolesNameEnum.Approver
                              ? closeCircleOutline
                              : ''
                          }
                          color={
                            values.role === WSRolesNameEnum.Administrator
                              ? 'success'
                              : values.role === WSRolesNameEnum.Contributor ||
                                values.role === WSRolesNameEnum.Guest ||
                                values.role === WSRolesNameEnum.Writer ||
                                values.role === WSRolesNameEnum.Approver
                              ? 'danger'
                              : undefined
                          }
                          className='w-5 h-5'
                        />
                        <ZIonText>Manage users & pages</ZIonText>
                      </ZIonCol>
                    </ZIonRow>
                  </ZIonCol>

                  {/*  */}
                  <ZIonCol
                    size='12'
                    className='ion-no-padding'>
                    <ZIonList lines='full'>
                      {/* Contributor */}
                      <ZIonItem
                        className='cursor-pointer ion-activatable'
                        color={
                          values.role === WSRolesNameEnum.Contributor
                            ? 'tertiary'
                            : undefined
                        }
                        onClick={() => {
                          void setFieldValue(
                            'role',
                            WSRolesNameEnum.Contributor,
                            false
                          );
                        }}>
                        <ZIonLabel className='ion-text-wrap'>
                          <ZIonText className='block font-bold'>
                            Contributor
                          </ZIonText>
                          <ZIonText className='block mt-1 text-sm'>
                            Can create & edit posts, comment and publish or
                            schedule
                          </ZIonText>
                        </ZIonLabel>
                      </ZIonItem>

                      {/* Administrator */}
                      <ZIonItem
                        className='cursor-pointer ion-activatable'
                        onClick={() => {
                          void setFieldValue(
                            'role',
                            WSRolesNameEnum.Administrator,
                            false
                          );
                        }}
                        color={
                          values.role === WSRolesNameEnum.Administrator
                            ? 'tertiary'
                            : undefined
                        }>
                        <ZIonLabel className='ion-text-wrap'>
                          <ZIonText className='block font-bold'>
                            Administrator
                          </ZIonText>
                          <ZIonText className='block mt-1 text-sm'>
                            Has all permissions including managing users and
                            adding new pages
                          </ZIonText>
                        </ZIonLabel>
                      </ZIonItem>

                      {/* Writer */}
                      <ZIonItem
                        className='cursor-pointer ion-activatable'
                        onClick={() => {
                          void setFieldValue(
                            'role',
                            WSRolesNameEnum.Writer,
                            false
                          );
                        }}
                        color={
                          values.role === WSRolesNameEnum.Writer
                            ? 'tertiary'
                            : undefined
                        }>
                        <ZIonLabel className='ion-text-wrap'>
                          <ZIonText className='block font-bold'>
                            Writer
                          </ZIonText>
                          <ZIonText className='block mt-1 text-sm'>
                            Can create, edit posts and comment
                          </ZIonText>
                        </ZIonLabel>
                      </ZIonItem>

                      {/* Approver */}
                      <ZIonItem
                        className='cursor-pointer ion-activatable'
                        onClick={() => {
                          void setFieldValue(
                            'role',
                            WSRolesNameEnum.Approver,
                            false
                          );
                        }}
                        color={
                          values.role === WSRolesNameEnum.Approver
                            ? 'tertiary'
                            : undefined
                        }>
                        <ZIonLabel className='ion-text-wrap'>
                          <ZIonText className='block font-bold'>
                            Approver
                          </ZIonText>
                          <ZIonText className='block mt-1 text-sm'>
                            Can approve posts and comment
                          </ZIonText>
                        </ZIonLabel>
                      </ZIonItem>

                      {/* Guest */}
                      <ZIonItem
                        lines='none'
                        className='cursor-pointer ion-activatable'
                        onClick={() => {
                          void setFieldValue(
                            'role',
                            WSRolesNameEnum.Guest,
                            false
                          );
                        }}
                        color={
                          values.role === WSRolesNameEnum.Guest
                            ? 'tertiary'
                            : undefined
                        }>
                        <ZIonLabel className='ion-text-wrap'>
                          <ZIonText className='block font-bold'>Guest</ZIonText>
                          <ZIonText className='block mt-1 text-sm'>
                            Can view posts and comment
                          </ZIonText>
                        </ZIonLabel>
                      </ZIonItem>
                    </ZIonList>
                  </ZIonCol>
                </ZIonRow>
              </ZCustomScrollable>
              {/* </ZIonGrid> */}
            </ZIonContent>
            <ZIonFooter
              collapse='fade'
              className='ion-text-end'>
              <ZIonButton
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={submitForm}
                disabled={values.role === initialValues.role}>
                Save
              </ZIonButton>
              <ZIonButton
                fill='outline'
                onClick={() => {
                  dismissZIonPopover(selectedRole, selectedRole);
                }}>
                Cancel
              </ZIonButton>
            </ZIonFooter>
          </>
        );
      }}
    </Formik>
  );
};

export default ZWorkspaceFormRoleSelectorPopover;
