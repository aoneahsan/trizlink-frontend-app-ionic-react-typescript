// Core Import
import React from 'react';

// Packages Imports

// Custom Imports

// style
// Global Constants

// type CustomToggleProps = {
//   children?: React.ReactNode;
//   onClick: (event: React.MouseEvent<HTMLIonTextElement, MouseEvent>) => void;
// };

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
// const CustomToggle = React.forwardRef(
//   (
//     { children, onClick }: CustomToggleProps,
//     ref: React.Ref<HTMLIonTextElement>
//   ) => (
//     <ZIonText
//       ref={ref}
//       onClick={onClick}>
//       {children}
//     </ZIonText>
//   )
// );

// type CustomMenuProps = {
//   children?: React.ReactNode;
//   style?: React.CSSProperties;
//   className?: string;
//   labeledBy?: string;
// };

// const CustomMenu = React.forwardRef(
//   (props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {
//     return (
//       <div
//         ref={ref}
//         style={props.style}
//         className={props.className}
//         aria-labelledby={props.labeledBy}>
//         <ZIonList className='list-unstyled'>
//           {React.Children.toArray(props.children).filter(
//             (
//               child:
//                 | { props: { children: string } }
//                 | string
//                 | number
//                 | ReactElement<unknown, string | JSXElementConstructor<unknown>>
//                 | ReactFragment
//                 | ReactPortal
//             ) => (child as { props: { children: string } }).props?.children
//           )}
//         </ZIonList>
//       </div>
//     );
//   }
// );

const ZaionsDropDown: React.FC<{
  title: string;
  className: string;
  items: Array<{
    id: string;
    link: string;
    title: string;
    text?: string;
    icon?: string;
    width?: string;
  }>;
}> = props => {
  return (
    <></>
    // <Dropdown
    // className={`${classes.w-max} ${
    // isXlScale ? 'pe-1' : ''
    // } mb-3`}
    // >
    // <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
    // <ZIonText className={`${classValues}`}>{props.title}</ZIonText>
    // </Dropdown.Toggle>

    // <Dropdown.Menu
    // as={CustomMenu}
    // className={`${classes.zaions__dropdown_menu}  px-3 pt-2`}
    // >
    // {props.items.map((el) => {
    // return (
    // <ZIonRouterLink
    // routerLink={el.link}
    // key={el.id}
    // className={classes.zaions__dropdown_routeLink}
    // >
    // <Dropdown.Item
    // eventKey='1'
    // className={`${classes.zaions__dropdown_item} flex py-2 `}
    // >
    // <div className='pt-2 me-2 pe-1'>
    // <ZIonIcon
    // icon={el.icon}
    // className={`text-[25px] ${classes.zaions__dropdown_icon} ${classes.zaions__color_777}`}
    // />
    // </div>
    // <div className=''>
    // <ZIonText
    // className={`font-bold  ${classes.zaions__dropdown_title}`}
    // >
    // {el.title}
    // </ZIonText>
    // <br />
    // <ZIonText className={`${classes.zaions__color_777}`}>
    // {el.text}
    // </ZIonText>
    // </div>
    // </Dropdown.Item>
    // </ZIonRouterLink>
    // );
    // })}
    // </Dropdown.Menu>
    // </Dropdown>
  );
};

export default ZaionsDropDown;
