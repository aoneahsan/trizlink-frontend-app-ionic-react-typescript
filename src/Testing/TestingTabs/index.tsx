import ZIonPage from '@/components/ZIonPage';
import { ZIonButton, ZIonContent } from '@/components/ZIonComponents';
import React, { useState } from 'react';

import TestingReactDropzone from '@/Testing/ReactDropZone';

enum TestingTabEnum {
	TestingReactDropzone = 'TestingReactDropzone',
}
const TestingTabs: React.FC = () => {
	const [activePage, setActivePage] = useState(
		TestingTabEnum.TestingReactDropzone
	);

	const getActivePage = () => {
		switch (activePage) {
			case TestingTabEnum.TestingReactDropzone:
				return <TestingReactDropzone />;

			default:
				return <b>Invalid Page Selected, Please try again</b>;
		}
	};

	const setCurrentActivePage = (page: TestingTabEnum) => {
		setActivePage(page);
	};
	return (
		<>
			<ZIonPage pageTitle='Testing Tabs Page'>
				<ZIonContent>
					<p>Current Active Page: {activePage}</p>
					<p>select a new page</p>
					<ZIonButton
						onClick={() =>
							setCurrentActivePage(TestingTabEnum.TestingReactDropzone)
						}
					>
						React DropZone
					</ZIonButton>
					<hr />
					{getActivePage()}
				</ZIonContent>
			</ZIonPage>
		</>
	);
};

export default TestingTabs;
