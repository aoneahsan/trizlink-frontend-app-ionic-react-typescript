/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { type SyntheticEvent, useMemo } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  convertToRaw
} from 'draft-js';
import classNames from 'classnames';
import { informationCircleOutline } from 'ionicons/icons';
// import draftToHtml from 'draftjs-to-html';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import { ZIonButton, ZIonIcon, ZIonTitle } from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import draftToHtml from 'draftjs-to-html';

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

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZTextEditorInterface {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  testingselector?: string;
  testinglistselector?: string;
  onBlur?: (e: SyntheticEvent) => void;
  onChange?: (editorState: string) => void;
  initialValue?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
  { label: 'Stripe', style: 'STRIKETHROUGH' }
];

// const BLOCK_TYPES = [
//   { label: 'H1', style: 'header-one' },
//   { label: 'H2', style: 'header-two' },
//   { label: 'H3', style: 'header-three' },
//   { label: 'H4', style: 'header-four' },
//   { label: 'H5', style: 'header-five' },
//   { label: 'H6', style: 'header-six' },
//   { label: 'Blockquote', style: 'blockquote' },
//   { label: 'UL', style: 'unordered-list-item' },
//   { label: 'OL', style: 'ordered-list-item' },
//   { label: 'Code Block', style: 'code-block' }
// ];

const ZRichTextEditor: React.FC<ZTextEditorInterface> = ({
  className,
  onBlur,
  onChange,
  placeholder,
  testinglistselector,
  testingselector,
  initialValue
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValueText = useMemo(() => initialValue, []);
  const _testinglistselector =
    testinglistselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: testinglistselector,
            _key: zCreateElementTestingSelectorKeyEnum.listSelector
          })
        }
      : {};
  const _testingSelector =
    testingselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: testingselector
          })
        }
      : {};
  const [editorState, setEditorState] = React.useState<EditorState>(() =>
    EditorState.createWithContent(
      ContentState.createFromText(initialValueText ?? '')
    )
  );

  const onChangeHandler = (newState: EditorState): void => {
    setEditorState(newState);
  };

  return (
    <div
      className={classNames(className, {
        'w-full min-h-[10rem] max-h-max border rounded-lg overflow-hidden': true
      })}
      {..._testingSelector}
      {..._testinglistselector}>
      <div className='flex w-full py-2 border-b ion-padding-horizontal ion-align-items-center ion-justify-content-between'>
        <ZIonTitle className='ion-no-padding'>Rich text editor</ZIonTitle>

        <div
          className='flex first-letter:ion-align-items-center'
          id='zc-rich-text-editor-id'>
          <ZIonIcon
            icon={informationCircleOutline}
            className='w-6 h-6 cursor-pointer'
            color='primary'
          />
        </div>

        <ZRTooltip anchorSelect='#zc-rich-text-editor-id'>
          <div className=''>
            <p>some text here...</p>
          </div>
        </ZRTooltip>
      </div>
      {/* <div className='flex w-full gap-1 py-2 border-b ion-padding-horizontal ion-align-items-center'>
        {BLOCK_TYPES?.map((el, index) => {
          return (
            <ZIonButton
              key={index}
              className='ion-no-margin'
              size='small'
              onClick={() => {
                onChangeHandler(
                  RichUtils.toggleBlockType(editorState, el?.style)
                );
              }}>
              {el?.label}
            </ZIonButton>
          );
        })}
      </div> */}

      <div className='flex w-full gap-1 py-2 border-b ion-padding-horizontal ion-align-items-center'>
        {INLINE_STYLES?.map((el, index) => {
          return (
            <ZIonButton
              key={index}
              className='ion-no-margin'
              size='small'
              onClick={() => {
                onChangeHandler(
                  RichUtils.toggleInlineStyle(editorState, el?.style)
                );
              }}>
              {el?.label}
            </ZIonButton>
          );
        })}
      </div>

      <div className='ion-padding'>
        <Editor
          editorState={editorState}
          // onBlur={onBlur} // ahsan commented this and added the below logic
          onBlur={_ => {
            const rawContentState = convertToRaw(
              editorState.getCurrentContent()
            );

            if (onChange !== undefined && onChange !== null) {
              onChange(draftToHtml(rawContentState));
            }
          }}
          placeholder={placeholder}
          // ahsan commented this as
          // onChange={(editorState: EditorState) => {
          //   setEditorState(() => editorState);

          // const rawContentState = convertToRaw(
          //   editorState.getCurrentContent()
          // );
          // void setFieldValue(
          //   'text',
          //   draftToHtml(rawContentState),
          //   false
          // );

          //   if (onChange !== undefined && onChange !== null) {
          //     onChange(editorState);
          //   }
          // }}
          onChange={_editorState => {
            // setting this here as i will need this in onBlur event
            setEditorState(() => _editorState);
            // ahsan did this, as i do not want to run this logic each time user enters a character instead only when user goes to an other field and this one get's onBlur event
            // const rawContentState = convertToRaw(
            //   editorState.getCurrentContent()
            // );
            // void setFieldValue(
            //   'text',
            //   draftToHtml(rawContentState),
            //   false
            // );
          }}
          handleKeyCommand={(command, editorState) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState !== null) {
              onChangeHandler(newState);
              return 'handled';
            }

            return 'not-handled';
          }}
        />
      </div>
    </div>
  );
};

export default ZRichTextEditor;
