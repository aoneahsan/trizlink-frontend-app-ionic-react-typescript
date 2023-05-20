// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZaionsTopMenu from '@/navigation/TopMenu';
import InPageFooter from '@/components/InPageFooter';
import {
	ZIonCol,
	ZIonText,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
} from '@/components/ZIonComponents';

// Global Imports
import { PRODUCT_NAME } from '@/utils/constants';

// Styles

const ZaionsCodeOfConduct: React.FC = () => {
	return (
		<ZaionsIonPage pageTitle='Code Of Conduct Page'>
			{/* Content */}
			<ZIonContent>
				<ZaionsTopMenu />
				<ZIonGrid className='my-5'>
					<ZIonRow>
						<ZIonCol></ZIonCol>
						<ZIonCol
							sizeXl='7.5'
							sizeLg='9.5'
							sizeMd='11'
							sizeSm='12'
							sizeXs='12'
						>
							<ZIonText>
								<h2 className='font-bold'>{PRODUCT_NAME} Code of Conduct</h2>
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg mt-3 font-bold'>Introduction</h4>
							</ZIonText>
							<ZIonText className='mt-3 pt-1 zaions__color_gray2'>
								Corporate integrity, responsible practices, and the safety and
								wellbeing of workers are of paramount importance to{' '}
								{PRODUCT_NAME}. These principles apply to all aspects of{' '}
								{PRODUCT_NAME}’s business.
							</ZIonText>
							<ZIonText className='mt-3 zaions__color_gray2'>
								These principles are reflected in this Code of Conduct (“
								<ZIonText className='font-bold'>Code of Conduct</ZIonText>“),
								which establishes the minimum standards that must be met by{' '}
								{PRODUCT_NAME} when operating its business or providing products
								and services to its clients (“Clients”), including regarding:
							</ZIonText>
							<ul className='zaions_list_default'>
								<li className='zaions__color_gray2'>compliance with laws</li>
								<li className='zaions__color_gray2'>
									{PRODUCT_NAME}’s treatment of workers;
								</li>
								<li className='zaions__color_gray2'>workplace safety;</li>
								<li className='zaions__color_gray2'>
									the impact of {PRODUCT_NAME}’s activities on the environment;
									and
								</li>
								<li className='zaions__color_gray2'>
									{PRODUCT_NAME}’s ethical business practices.
								</li>
							</ul>
							<ZIonText>
								<h4 className='text-lg font-bold'>Applicability</h4>
							</ZIonText>
							<ZIonText className='mt-1 zaions__color_gray2'>
								This Code of Conduct applies to all of {PRODUCT_NAME}’s
								personnel and all of {PRODUCT_NAME}’s offices. {PRODUCT_NAME} is
								responsible for compliance with the standards set out in this
								Code of Conduct (“<b>Standards</b>“) throughout its operations
								and throughout its entire company operations.
							</ZIonText>
							<ZIonText className='zaions__color_gray2 mt-3'>
								Without limiting {PRODUCT_NAME}’s obligations hereunder,{' '}
								{PRODUCT_NAME} shall comply with the Standards in:
							</ZIonText>
							<ul className='zaions_list_default'>
								<li className='zaions__color_gray2'>all of its offices; and</li>
								<li className='zaions__color_gray2'>
									all of its operations, including with respect to operating and
									providing the {PRODUCT_NAME} services, intellectual property,
									labor, health, worker safety, and the environment.
								</li>
							</ul>
							<ZIonText className='zaions__color_gray2 mt-3'>
								{PRODUCT_NAME} seeks to work with suppliers, vendors, agents,
								and subcontractors and their respective Offices (“Partner(s)“)
								who have similar Standards.
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>Compliance with Laws</h4>
							</ZIonText>
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall comply with all applicable national and
								local laws and regulations, including laws and regulations
								relating to all the Standards. Where this Code of Conduct
								requires {PRODUCT_NAME} to meet a higher standard than set out
								by law or regulation, {PRODUCT_NAME} shall meet such higher
								standards.
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>
									Diversity Equity & Inclusion
								</h4>
							</ZIonText>
							<ZIonText className='zaions__color_gray2'>
								As part of {PRODUCT_NAME}’s ongoing commitment to diversity and
								inclusion, {PRODUCT_NAME} strives to recruit, hire, develop,
								retain and promote a diverse group of officers, directors,
								professionals, employees, consultants, and contractors. In
								furtherance of this commitment, {PRODUCT_NAME} strives to
								provide representation, opportunity, and access to historically
								“under-represented groups” (as defined below), within the bounds
								of applicable law.
							</ZIonText>
							<ZIonText className='zaions__color_gray2 mt-3'>
								{PRODUCT_NAME} agrees to utilize all commercially reasonable
								efforts to ensure individuals working or interviewing who have a
								mobility disability or are visually or hearing impaired can
								access the interview location.
							</ZIonText>
							<ZIonText className='zaions__color_gray2 mt-3'>
								{PRODUCT_NAME} acknowledges and understands that applicable
								employment laws prohibit discrimination on the basis of race,
								sex, national origin, disability, age, sexual orientation,
								gender identity, religion, veterans status and other protected
								categories. While it is {PRODUCT_NAME}’s goal to increase
								diversity, and {PRODUCT_NAME} will strive to seek out a broad
								spectrum of applicants for employment to ensure that
								under-represented groups are given a full and fair opportunity
								to be consider for available positions, {PRODUCT_NAME} will make
								employment decisions without regard to any protected
								characteristics, as required by applicable law.
							</ZIonText>
							<ZIonText className='zaions__color_gray2 mt-3'>
								For purposes herein, “under-represented groups” are defined as
								those who identify themselves as (i) female, (ii) people of
								color, (iii) disabled, (iv) Lesbian, Gay, Bisexual, Transgender,
								Queer or otherwise Gender Fluid; (v) veterans; and/or (vi) a
								combination of diverse qualities identified in (i-v).
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>Data Security</h4>
							</ZIonText>
							<ZIonText className='zaions__color_gray2'>
								Privacy and data security are core principles at {PRODUCT_NAME}.
								All internal and external products, services and activities must
								be carried out with applicable privacy and data security
								obligations and industry best practices in mind. Personnel
								should immediately raise to their direct reports any concerns
								about a potential violation of this key principle or a suspected
								security incident.
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>
									Compensation and Benefits
								</h4>
							</ZIonText>
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall compensate all workers with wages,
								including overtime premiums, and benefits that at a minimum meet
								the higher of:
							</ZIonText>
							<ul className='mt-3 zaions_list_default'>
								<li className='zaions__color_gray2'>
									the minimum wage and benefits established by applicable law;
								</li>
								<li className='zaions__color_gray2'>
									collective agreements, if any, and;
								</li>
								<li className='zaions__color_gray2'>
									an amount sufficient to cover basic living requirements.
								</li>
							</ul>
							<ZIonText className='zaions__color_gray2 mt-3'>
								{PRODUCT_NAME}’s obligation to compensate and provide benefits
								applies to all workers at all times, including during periods of
								training, apprenticeship, and probation.
							</ZIonText>{' '}
							<ZIonText
								className='mt-3 pt-1 mb-0 pb-0'
								style={{ fontWeight: '600' }}
							>
								Documentation
							</ZIonText>{' '}
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall:
							</ZIonText>
							<ul className='zaions_list_default mt-3'>
								<li className='zaions__color_gray2'>
									ensure that proof of payment is accurate, is clearly
									calculated, and enables workers to quickly verify the amount
									of payment and method of calculation; and
								</li>
								<li className='zaions__color_gray2'>
									maintain proper documentation of wage payments for their
									internal records.
								</li>
							</ul>
							<ZIonText
								className='mt-3 pt-1 mb-0 pb-0'
								style={{ fontWeight: '600' }}
							>
								Deductions
							</ZIonText>
							<br />
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall not make any deductions from wages, except
								income tax withholding and those that are legally allowed.
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>Work Hours</h4>
							</ZIonText>
							<ZIonText
								className='mt-3 pt-1 mb-0 pb-0'
								style={{ fontWeight: '600' }}
							>
								Regular Work Hours
							</ZIonText>
							<br />
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall not require or allow workers to work more
								than the lesser of:
							</ZIonText>
							<ul className='zaions_list_default mt-3'>
								<li className='zaions__color_gray2'>
									regularly-paid hours per week; or
								</li>
								<li className='zaions__color_gray2'>
									the maximum legally permitted number of regularly paid hours
									worked per week.
								</li>
							</ul>
							<ZIonText
								className='mt-3 pt-1 mb-0 pb-0'
								style={{ fontWeight: '600' }}
							>
								Overtime Work Hours
							</ZIonText>
							<br />
							<ZIonText className='zaions__color_gray2'>
								Additional overtime hours must not exceed the maximum legally
								permitted number of overtime hours worked per week.
							</ZIonText>{' '}
							<ZIonText
								className='mt-3 pt-1 mb-0 pb-0'
								style={{ fontWeight: '600' }}
							>
								Documentation
							</ZIonText>{' '}
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall:
							</ZIonText>
							<ul className='zaions_list_default mt-3'>
								<li className='zaions__color_gray2'>
									use an industry-accepted time-keeping system to track worker
									work hours; and
								</li>
								<li className='zaions__color_gray2'>
									develop work-hour policies to ensure compliance with this Code
									of Conduct and applicable law.
								</li>
							</ul>
							<ZIonText>
								<h4 className='text-lg font-bold'>
									No Discrimination, Abuse, or Harassment
								</h4>
							</ZIonText>
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall not discriminate in hiring, compensation,
								training, advancement or promotion, termination, retirement, or
								any other employment practice based on race, color, national
								origin, gender, gender identity, sexual orientation, military
								status, religion, age, marital or pregnancy status, disability,
								or any other characteristic other than the worker’s ability to
								perform the job.
							</ZIonText>
							<ZIonText className='zaions__color_gray2 mt-3'>
								{PRODUCT_NAME} shall treat workers with respect and dignity.
							</ZIonText>
							<ZIonText className='zaions__color_gray2 mt-3'>
								{PRODUCT_NAME} shall not subject workers to physical, verbal,
								sexual, or psychological abuse or harassment. {PRODUCT_NAME}{' '}
								must not condone or tolerate such behavior by its Partners.
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>Health and Safety</h4>
							</ZIonText>
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall provide a safe, healthy, and sanitary
								working environment. ${PRODUCT_NAME} shall implement procedures
								and safeguards to prevent workplace hazards, and work-related
								accidents and injuries, including procedures and safeguards to
								prevent industry-specific workplace hazards, and work-related
								accidents and injuries, that are not specifically addressed in
								these Standards.
							</ZIonText>
							<ZIonText className='zaions__color_gray2 mt-3'>
								General and industry-specific procedures and safeguards include
								those relating to:
							</ZIonText>
							<ul className='zaions_list_default mt-3'>
								<li className='zaions__color_gray2'>
									health and safety inspections;
								</li>
								<li className='zaions__color_gray2'>equipment maintenance;</li>
								<li className='zaions__color_gray2'>maintenance of offices;</li>
								<li className='zaions__color_gray2'>
									worker training covering the hazards typically encountered in
									their scope of work;
								</li>
								<li className='zaions__color_gray2'>fire prevention; and</li>
								<li className='zaions__color_gray2'>
									documentation and recordkeeping.
								</li>
							</ul>
							<ZIonText
								className='zaions__color_gray2 mt-3 mb-0'
								style={{ fontWeight: '600' }}
							>
								Offices
							</ZIonText>{' '}
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall:
							</ZIonText>
							<ul className='zaions_list_default mt-3'>
								<li className='zaions__color_gray2'>
									ensure that all offices meet all applicable building codes and
									standards;
								</li>
								<li className='zaions__color_gray2'>
									without limiting ${PRODUCT_NAME}’s obligations hereunder,
									ensure that all offices have:
								</li>
								<ul className='zaions_list_default'>
									<li className='zaions__color_gray2'>
										an adequate evacuation plan;
									</li>
									<li className='zaions__color_gray2'>
										adequate, well-lit (including emergency lighting), clearly
										marked, and unobstructed emergency exit routes, including
										exits doors, aisles, and stairwells;
									</li>
									<li className='zaions__color_gray2'>
										a sufficient number of emergency exit doors;
									</li>
									<li className='zaions__color_gray2'>
										adequate ventilation and air circulation;
									</li>
									<li className='zaions__color_gray2'>adequate lighting;</li>
									<li className='zaions__color_gray2'>
										post all notices as required by law; and
									</li>
									<li className='zaions__color_gray2'>
										adequate fire safety, prevention, alarm, and suppression
										systems.
									</li>
								</ul>
							</ul>
							<ZIonText className='zaions__color_gray2 mt-3'>
								If {PRODUCT_NAME} provides dining offices for its workers, it
								shall provide safe, healthy, and sanitary offices (including
								food preparation and storage areas) that comply with all the
								Standards set out in the Health and Safety section of this Code
								of Conduct. Without limiting {PRODUCT_NAME}’s obligations
								hereunder,
								{PRODUCT_NAME} shall obtain and maintain all food preparation
								permits and health certificates required by law.
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>
									Slavery and Human Trafficking
								</h4>
							</ZIonText>
							<ZIonText className='zaions__color_gray2'>
								All labor must be voluntary. {PRODUCT_NAME} shall not support
								slavery or human trafficking in any part of its supply chain.
								Without limiting {PRODUCT_NAME}’s obligations hereunder,{' '}
								{PRODUCT_NAME} shall not support or engage in, or require any:
							</ZIonText>
							<ul className='zaions_list_default mt-3'>
								<li className='zaions__color_gray2'>
									compelled, involuntary, or forced labor;
								</li>
								<li className='zaions__color_gray2'>
									labor to be performed by children;
								</li>
								<li className='zaions__color_gray2'>bonded labor;</li>
								<li className='zaions__color_gray2'>indentured labor; and</li>
								<li className='zaions__color_gray2'>prison labor.</li>
							</ul>
							<ZIonText
								className='zaions__color_gray2 mt-3 mb-0'
								style={{ fontWeight: '600' }}
							>
								Compliance and Documentation
							</ZIonText>{' '}
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall:
							</ZIonText>
							<ul className='zaions_list_default mt-3'>
								<li className='zaions__color_gray2'>
									Implement and maintain a reliable system to verify the
									eligibility of all workers, including:
								</li>
								<ul className='zaions_list_default'>
									<li className='zaions__color_gray2'>age eligibility; and</li>
									<li className='zaions__color_gray2'>
										legal status of foreign workers.
									</li>
								</ul>
								<li className='zaions__color_gray2'>
									Implement and maintain a reliable recordkeeping system
									regarding the eligibility of all workers.
								</li>
							</ul>
							<ZIonText
								className='zaions__color_gray2 mt-3 mb-0'
								style={{ fontWeight: '600' }}
							>
								Freedom of Movement
							</ZIonText>{' '}
							<ZIonText className='zaions__color_gray2'>
								Without limiting {PRODUCT_NAME}’s obligations hereunder,{' '}
								{PRODUCT_NAME} shall ensure that workers have the right to
								freedom of movement without:
							</ZIonText>
							<ul className='zaions_list_default mt-3'>
								<li className='zaions__color_gray2'>delay or hindrance; or</li>
								<li className='zaions__color_gray2'>
									he threat or imposition of any discipline, penalty,
									retaliation, or fine or other monetary obligation.
								</li>
							</ul>
							<ZIonText
								className='zaions__color_gray2 mt-3 mb-0'
								style={{ fontWeight: '600' }}
							>
								Freedom to Terminate Employment
							</ZIonText>{' '}
							<ZIonText className='zaions__color_gray2'>
								Without limiting {PRODUCT_NAME}’s obligations hereunder,{' '}
								{PRODUCT_NAME} shall allow workers to terminate their employment
								or work arrangement, subject to any contractual commitments with
								the company.
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>
									Environmental Protection
								</h4>
							</ZIonText>
							<ZIonText
								className='zaions__color_gray2 mt-3 mb-0'
								style={{ fontWeight: '600' }}
							>
								Operation of {PRODUCT_NAME}’s Offices
							</ZIonText>{' '}
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} shall strive to conduct its business in ways that
								are ecologically friendly.
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>
									Gifts and Entertainment
								</h4>
							</ZIonText>
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} must maintain the highest ethical standards.{' '}
								{PRODUCT_NAME} must not offer cash, favors, gifts, or
								entertainment to {PRODUCT_NAME}’s team members in violation of
								applicable laws. {PRODUCT_NAME} shall also comply with the
								Foreign Corrupt Practices Act (FCPA) and prohibits any form of
								illegal bribery and similar corruption.
							</ZIonText>
							<ZIonText>
								<h4 className='text-lg font-bold mt-4'>
									Report Violations & Contact Information
								</h4>
							</ZIonText>
							<ZIonText className='zaions__color_gray2'>
								{PRODUCT_NAME} personnel may self-report any violations of the
								Code of Conduct. {PRODUCT_NAME} personnel can also submit
								questions and comments regarding the Code of Conduct, to
								Support@{PRODUCT_NAME}.com, Attn: {PRODUCT_NAME} Legal.
							</ZIonText>
							<ZIonText className='zaions__color_gray2 mt-3'>
								{PRODUCT_NAME} shall not retaliate or take disciplinary action
								against any worker who has, in good faith, reported violations
								or questionable behavior, or who has sought advice regarding
								this Code of Conduct.
							</ZIonText>
						</ZIonCol>
						<ZIonCol></ZIonCol>
					</ZIonRow>
				</ZIonGrid>
				<InPageFooter />
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZaionsCodeOfConduct;
