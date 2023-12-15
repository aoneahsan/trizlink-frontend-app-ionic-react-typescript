// /**
//  * Core Imports go down
//  * ? Like Import of React is a Core Import
//  * */

// /**
//  * Packages Imports go down
//  * ? Like import of ionic components is a packages import
//  * */
// import { informationCircleOutline } from 'ionicons/icons';
// import classNames from 'classnames';
// import ReactQuill from 'react-quill';
// import { Editor, EditorState, RichUtils } from 'draft-js';

// /**
//  * Custom Imports go down
//  * ? Like import of custom components is a custom import
//  * */
// import { ZIonIcon, ZIonTitle } from '@/components/ZIonComponents';
// import ZRTooltip from '../ZRTooltip';

// /**
//  * Global Constants Imports go down
//  * ? Like import of Constant is a global constants import
//  * */
// import { zCreateElementTestingSelector } from '@/utils/helpers';
// import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// /**
//  * Type Imports go down
//  * ? Like import of type or type of some recoil state or any external type import is a Type import
//  * */
// import { type Sources, type DeltaStatic } from 'quill/index';

// /**
//  * Recoil State Imports go down
//  * ? Import of recoil states is a Recoil State import
//  * */

// /**
//  * Style files Imports go down
//  * ? Import of style sheet is a style import
//  * */
// import 'react-quill/dist/quill.snow.css';

// /**
//  * Images Imports go down
//  * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
//  * */

// /**
//  * Component props type go down
//  * ? Like if you have a type for props it should be please Down
//  * */
// interface ZTextEditorInterface {
//   value?: ReactQuill.Value;
//   defaultValue?: ReactQuill.Value;
//   bounds?: string | HTMLElement;
//   className?: string;
//   children?: React.ReactElement<
//     unknown,
//     string | React.JSXElementConstructor<unknown>
//   >;
//   formats?: string[];
//   style?: React.CSSProperties;
//   id?: string;
//   placeholder?: string;
//   testingselector?: string;
//   testinglistselector?: string;
//   onChange?: (
//     value: string,
//     delta: DeltaStatic,
//     source: Sources,
//     editor: ReactQuill.UnprivilegedEditor
//   ) => void;
//   onBlur?: (
//     previousSelection: ReactQuill.Range,
//     source: Sources,
//     editor: ReactQuill.UnprivilegedEditor
//   ) => void;
//   onChangeSelection?: (
//     selection: ReactQuill.Range,
//     source: Sources,
//     editor: ReactQuill.UnprivilegedEditor
//   ) => void;
// }

// interface ZTextEditor2Interface {
//   className?: string;
//   style?: React.CSSProperties;
// }

// /**
//  * Functional Component
//  * About: (Info of component here...)
//  * @type {*}
//  * */

// const ZTextEditor: React.FC<ZTextEditorInterface> = props => {
//   const _testinglistselector =
//     props.testinglistselector !== undefined
//       ? {
//           ...zCreateElementTestingSelector({
//             _value: props.testinglistselector,
//             _key: zCreateElementTestingSelectorKeyEnum.listSelector
//           })
//         }
//       : {};

//   const _testingSelector =
//     props.testingselector !== undefined
//       ? {
//           ...zCreateElementTestingSelector({
//             _value: props.testingselector
//           })
//         }
//       : {};

//   return (
//     <ReactQuill
//       theme='snow'
//       {...props}
//       {..._testingSelector}
//       {..._testinglistselector}
//     />
//   );
// };

// // const INLINE_STYLES = [
// //   { label: 'Bold', style: 'BOLD' },
// //   { label: 'Italic', style: 'ITALIC' },
// //   { label: 'Underline', style: 'UNDERLINE' },
// //   { label: 'Monospace', style: 'CODE' },
// //   { label: 'Stripe', style: 'STRIKETHROUGH' }
// // ];

// export const ZTextEditor2: React.FC<ZTextEditor2Interface> = ({
//   className
// }) => {
//   const [editorState, setEditorState] = React.useState<EditorState>(() =>
//     EditorState.createEmpty()
//   );

//   const onChangeHandler = (newState: EditorState): void => {
//     setEditorState(newState);
//   };

//   return (
//     <>
//       <div
//         className={classNames(className, {
//           'w-full min-h-[10rem] max-h-max border rounded-lg overflow-hidden':
//             true
//         })}>
//         <div className='flex w-full py-2 border-b ion-padding-horizontal ion-align-items-center ion-justify-content-between'>
//           <ZIonTitle className='ion-no-padding'>Rich text editor</ZIonTitle>

//           <div
//             className='flex first-letter:ion-align-items-center'
//             id='zc-rich-text-editor-id'>
//             <ZIonIcon
//               icon={informationCircleOutline}
//               className='w-6 h-6 cursor-pointer'
//               color='primary'
//             />
//           </div>

//           <ZRTooltip anchorSelect='#zc-rich-text-editor-id'>
//             <div className=''>
//               <p>some text here...</p>
//             </div>
//           </ZRTooltip>
//         </div>
//         <div className='flex w-full gap-1 py-2 border-b ion-padding-horizontal ion-align-items-center'>
//           {/* {INLINE_STYLES?.map((el, index) => {
//             return (
//               <ZIonButton
//                 key={index}
//                 className='ion-no-margin'
//                 size='small'
//                 onClick={() => {
//                   onChangeHandler(
//                     RichUtils.toggleInlineStyle(editorState, el.style)
//                   );
//                 }}>
//                 {el.label}
//               </ZIonButton>
//             );
//           })} */}
//         </div>

//         <div className='ion-padding'>
//           <Editor
//             editorState={editorState}
//             onChange={setEditorState}
//             handleKeyCommand={(command, editorState) => {
//               const newState = RichUtils.handleKeyCommand(editorState, command);

//               if (newState !== null) {
//                 onChangeHandler(newState);
//                 return 'handled';
//               }

//               return 'not-handled';
//             }}
//           />
//         </div>
//       </div>
//       {editorState.getCurrentContent()}
//     </>
//   );
// };

// // const InlineStyleControls: React.FC<{
// //   editorState: EditorState;
// //   onToggle: (style: string) => void;
// // }> = props => {
// //   // const currentStyle = props.editorState.getCurrentInlineStyle();
// //   const INLINE_STYLES = [
// //     { label: 'Bold', style: 'BOLD' },
// //     { label: 'Italic', style: 'ITALIC' },
// //     { label: 'Underline', style: 'UNDERLINE' },
// //     { label: 'Monospace', style: 'CODE' }
// //   ];
// //   return (
// //     <div className='RichEditor-controls'>
// //       {INLINE_STYLES.map(type => (
// //         // <StyleButton
// //         //   key={type.label}
// //         //   active={currentStyle.has(type.style)}
// //         //   label={type.label}
// //         //   onToggle={props.onToggle}
// //         //   style={type.style}
// //         // />

// //         <ZIonButton
// //           key={type.label}
// //           className='ion-no-margin'
// //           size='small'>
// //           {type.label}
// //         </ZIonButton>
// //       ))}
// //     </div>
// //   );
// // };

// // const BlockStyleControls: React.FC<{
// //   editorState: EditorState;
// //   onToggle: (style: string) => void;
// // }> = props => {
// //   // const { editorState } = props;
// //   // const selection = editorState.getSelection();
// //   // const blockType = editorState
// //   //   .getCurrentContent()
// //   //   .getBlockForKey(selection.getStartKey())
// //   //   .getType();

// //   const BLOCK_TYPES = [
// //     { label: 'H1', style: 'header-one' }
// //     // Add other block types as needed
// //   ];

// //   return (
// //     <div className='RichEditor-controls'>
// //       {BLOCK_TYPES.map(type => (
// //         // <StyleButton
// //         //   key={type.label}
// //         //   active={type.style === blockType}
// //         //   label={type.label}
// //         //   onToggle={props.onToggle}
// //         //   style={type.style}
// //         // />

// //         <ZIonButton
// //           key={type.label}
// //           className='ion-no-margin'
// //           size='small'>
// //           {type.label}
// //         </ZIonButton>
// //       ))}
// //     </div>
// //   );
// // };

// // export const ZRichTextEditor: React.FC<ZTextEditor2Interface> = ({
// //   className
// // }) => {
// //   const [editorState, setEditorState] = useState(() =>
// //     EditorState.createEmpty()
// //   );
// //   const editorRef = useRef<Editor | null>(null);

// //   const focusEditor = (): void => {
// //     editorRef.current?.focus();
// //   };

// //   const onChangeHandler = (newState: EditorState): void => {
// //     setEditorState(newState);
// //   };

// //   const mapKeyToEditorCommand = (e: SyntheticEvent): string | null => {
// //     if ((e as KeyboardEvent)?.keyCode === 9 /* TAB */) {
// //       const newEditorState = RichUtils.onTab(
// //         e as KeyboardEvent,
// //         editorState,
// //         4 /* maxDepth */
// //       );
// //       if (newEditorState !== editorState) {
// //         setEditorState(newEditorState);
// //       }
// //       return null;
// //     }
// //     return getDefaultKeyBinding(e as KeyboardEvent);
// //   };

// //   const toggleBlockType = (blockType: string): void => {
// //     setEditorState(RichUtils.toggleBlockType(editorState, blockType));
// //   };

// //   const toggleInlineStyle = (inlineStyle: string): void => {
// //     setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
// //   };

// //   // const getBlockStyle = (
// //   //   block: Draft.Model.ImmutableData.ContentBlock
// //   // ): string => {
// //   //   switch (block?.getType()) {
// //   //     case 'blockquote':
// //   //       return 'RichEditor-blockquote';
// //   //     default:
// //   //       return '';
// //   //   }
// //   // };

// //   return (
// //     <div className='RichEditor-root'>
// //       <div className='RichEditor-controls'>
// //         <BlockStyleControls
// //           editorState={editorState}
// //           onToggle={toggleBlockType}
// //         />
// //         <InlineStyleControls
// //           editorState={editorState}
// //           onToggle={toggleInlineStyle}
// //         />
// //       </div>

// //       <div
// //         className={className}
// //         onClick={focusEditor}>
// //         <Editor
// //           // blockStyleFn={getBlockStyle}
// //           editorState={editorState}
// //           handleKeyCommand={(command, editorState) => {
// //             const newState = RichUtils.handleKeyCommand(editorState, command);

// //             if (newState !== null) {
// //               onChangeHandler(newState);
// //               return 'handled';
// //             }

// //             return 'not-handled';
// //           }}
// //           keyBindingFn={mapKeyToEditorCommand}
// //           onChange={setEditorState}
// //           placeholder='Tell a story...'
// //           ref={editorRef}
// //           spellCheck={true}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// export default ZTextEditor;
