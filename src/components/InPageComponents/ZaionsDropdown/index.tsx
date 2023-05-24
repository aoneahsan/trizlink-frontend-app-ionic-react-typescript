// Core Import
import React, {
	JSXElementConstructor,
	ReactElement,
	ReactFragment,
	ReactPortal,
} from 'react';

// Packages Imports
import {} from '@ionic/react';
import { useMediaQuery } from 'react-responsive';

// Custom Imports
import { ZIonText, ZIonIcon, ZIonList } from '@/components/ZIonComponents';

// style
// Global Constants
import { BRACKPOINT_XL } from '@/utils/constants';

type CustomToggleProps = {
	children?: React.ReactNode;
	onClick: (event: React.MouseEvent<HTMLIonTextElement, MouseEvent>) => void;
};

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(
	(
		{ children, onClick }: CustomToggleProps,
		ref: React.Ref<HTMLIonTextElement>
	) => (
		<ZIonText ref={ref} onClick={onClick}>
			{children}
		</ZIonText>
	)
);

type CustomMenuProps = {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
	labeledBy?: string;
};

const CustomMenu = React.forwardRef(
	(props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {
		return (
			<div
				ref={ref}
				style={props.style}
				className={props.className}
				aria-labelledby={props.labeledBy}
			>
				<ZIonList className='list-unstyled'>
					{React.Children.toArray(props.children).filter(
						(
							child:
								| { props: { children: string } }
								| string
								| number
								| ReactElement<unknown, string | JSXElementConstructor<unknown>>
								| ReactFragment
								| ReactPortal
						) => (child as { props: { children: string } }).props?.children
					)}
				</ZIonList>
			</div>
		);
	}
);

const ZaionsDropDown = (props: {
	title: string;
	className: string;
	items: {
		id: string;
		link: string;
		title: string;
		text?: string;
		icon?: string;
		width?: string;
	}[];
}) => {
	const classValues = `${props.className}`;
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});
	return (
		<></>
		// <Dropdown
		// 	className={`${classes.zaions__max_content} ${
		// 		isXlScale ? 'pe-1' : ''
		// 	} mb-3`}
		// >
		// 	<Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
		// 		<ZIonText className={`${classValues}`}>{props.title}</ZIonText>
		// 	</Dropdown.Toggle>

		// 	<Dropdown.Menu
		// 		as={CustomMenu}
		// 		className={`${classes.zaions__dropdown_menu}  px-3 pt-2`}
		// 	>
		// 		{props.items.map((el) => {
		// 			return (
		// 				<ZIonRouterLink
		// 					routerLink={el.link}
		// 					key={el.id}
		// 					className={classes.zaions__dropdown_routeLink}
		// 				>
		// 					<Dropdown.Item
		// 						eventKey='1'
		// 						className={`${classes.zaions__dropdown_item} flex py-2 `}
		// 						// style={{ width: `${el.width}` }}
		// 					>
		// 						<div className='me-2 pe-1 pt-2'>
		// 							<ZIonIcon
		// 								icon={el.icon}
		// 								className={`zaions__fs_25 ${classes.zaions__dropdown_icon} ${classes.zaions__color_777}`}
		// 							/>
		// 						</div>
		// 						<div className=''>
		// 							<ZIonText
		// 								className={`font-bold  ${classes.zaions__dropdown_title}`}
		// 							>
		// 								{el.title}
		// 							</ZIonText>
		// 							<br />
		// 							<ZIonText className={`${classes.zaions__color_777}`}>
		// 								{el.text}
		// 							</ZIonText>
		// 						</div>
		// 					</Dropdown.Item>
		// 				</ZIonRouterLink>
		// 			);
		// 		})}
		// 	</Dropdown.Menu>
		// </Dropdown>
	);
};

export default ZaionsDropDown;
