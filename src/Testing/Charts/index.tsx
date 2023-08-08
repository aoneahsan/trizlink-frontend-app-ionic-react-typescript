import React from 'react';

import { Bar, Line } from 'react-chartjs-2';

import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonFooter,
	ZIonGrid,
	ZIonHeader,
	ZIonRow,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZChartHOC from '@/components/AdminPanelComponents/ChartHOC';

const ChartsExamples: React.FC = () => {
	const options = {
		indexAxis: 'x' as const,
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom' as const,
			},
			title: {
				display: true,
				text: 'Chart.js Bar Chart',
			},
			interaction: {
				mode: 'index' as const,
				intersect: true,
			},
		},
	};

	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
	];

	const data = {
		labels,
		datasets: [
			{
				// fill: true,
				label: 'Dataset 1',
				data: [1, 2, 3],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				stack: 'Stack 1',
			},
			// {
			// 	label: 'Dataset 2',
			// 	data: [1, 2, 3, 1],
			// 	backgroundColor: 'rgba(53, 162, 235, 0.5)',
			// 	stack: 'Stack 2',
			// },
			// {
			// 	label: 'Dataset 3',
			// 	data: [1, 2, 3],
			// 	backgroundColor: 'rgba(63, 372, 345, 0.5)',
			// 	borderColor: 'rgb(255, 99, 132)',
			// 	stack: 'Stack 3',
			// },
		],
	};

	return (
		<ZaionsIonPage>
			<ZIonHeader>
				<ZIonTitle>Charts</ZIonTitle>
			</ZIonHeader>
			<ZIonContent>
				<ZIonButton>View Chart</ZIonButton>
				<ZIonTitle>
					We will use tanstack react charts to display charts in our app.
				</ZIonTitle>
				<ZIonGrid>
					<ZIonRow>
						<ZChartHOC>
							<ZIonCol>
								<Bar options={options} data={data} />
							</ZIonCol>
						</ZChartHOC>
					</ZIonRow>
				</ZIonGrid>
			</ZIonContent>
			<ZIonFooter>
				<ZIonTitle>Charts Okay :)</ZIonTitle>
			</ZIonFooter>
		</ZaionsIonPage>
	);
};

export default ChartsExamples;
