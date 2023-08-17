// Core Imports
import { PRODUCT_NAME } from '@/utils/constants';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import React from 'react';

// Packages Imports
import AceEditor from 'react-ace';

// Custom Imports

// Styles

// Component Type
type ZEditorType = {
	className?: string;
	name?: string;
	width?: string;
	height?: string;
	placeholder?: string;
	fontSize?: string | number;
	value?: string;
	style?: {
		[key: string]: unknown;
	};
	onChange?: (value: string, event?: unknown) => void;

	testingSelector?: string;
	testingListSelector?: string;
};

const ZEditor: React.FC<ZEditorType> = (props) => {
	const _testingListSelector = props.testingListSelector
		? {
				...zCreateElementTestingSelector({
					_value: props.testingListSelector || PRODUCT_NAME,
					_key: zCreateElementTestingSelectorKeyEnum.listSelector,
				}),
		  }
		: {};

	const _testingSelector = props.testingSelector
		? {
				...zCreateElementTestingSelector({
					_value: props.testingSelector || PRODUCT_NAME,
				}),
		  }
		: {};

	return (
		<AceEditor {...props} {..._testingSelector} {..._testingListSelector} />
	);
};

export default ZEditor;
