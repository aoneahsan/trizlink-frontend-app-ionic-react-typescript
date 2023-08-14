// Core Imports
import React from 'react';

// Packages Imports

// Custom Imports
import ZIonPage from '@/components/ZIonPage';
import ZaionsTopMenu from '@/navigation/TopMenu';
import InPageFooter from '@/components/InPageFooter';
import {
	ZIonCol,
	ZIonText,
	ZIonRouterLink,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonTitle,
	ZIonList,
	ZIonItem,
} from '@/components/ZIonComponents';

// Global Imports
import { ZaionsBusinessDetails } from '@/utils/constants';

// Styles

const ZaionsPrivacyPolicy: React.FC = () => {
	return (
		<ZIonPage pageTitle='Privary Policy Page'>
			{/* Content */}
			<ZIonContent>
				<ZaionsTopMenu />
				<ZIonGrid className='my-5'>
					<ZIonRow className='ion-justify-content-center'>
						<ZIonCol
							sizeXl='7.5'
							sizeLg='9.5'
							sizeMd='11'
							sizeSm='12'
							sizeXs='12'
						>
							<ZIonTitle className='ion-no-padding mb-2'>
								<h1>Privacy Policy</h1>
							</ZIonTitle>
							<ZIonText>Last updated: March 03, 2023</ZIonText>
							<ZIonText>
								This Privacy Policy describes Our policies and procedures on the
								collection, use and disclosure of Your information when You use
								the Service and tells You about Your privacy rights and how the
								law protects You.
							</ZIonText>
							<ZIonText>
								We use Your Personal data to provide and improve the Service. By
								using the Service, You agree to the collection and use of
								information in accordance with this Privacy Policy.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3'>
								<h4 className='ion-no-margin'>
									Interpretation and Definitions
								</h4>
							</ZIonTitle>
							<ZIonTitle className='ion-no-padding mb-2 font-bold'>
								Interpretation
							</ZIonTitle>
							<ZIonText>
								The words of which the initial letter is capitalized have
								meanings defined under the following conditions. The following
								definitions shall have the same meaning regardless of whether
								they appear in singular or in plural.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3 font-bold'>
								Definitions
							</ZIonTitle>
							<ZIonText>For the purposes of this Privacy Policy:</ZIonText>
							<ZIonList lines='none'>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Account</ZIonText> means a
										unique account created for You to access our Service or
										parts of our Service.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Affiliate</ZIonText> means
										an entity that controls, is controlled by or is under common
										control with a party, where &quot;control&quot; means
										ownership of 50% or more of the shares, equity interest or
										other securities entitled to vote for election of directors
										or other managing authority.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Application</ZIonText>{' '}
										refers to ZLink, the software program provided by the
										Company.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Company</ZIonText> (referred
										to as either &quot;the Company&quot;, &quot;We&quot;,
										&quot;Us&quot; or &quot;Our&quot; in this Agreement) refers
										to Zaions, {ZaionsBusinessDetails.WebsiteUrl}/address.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Country</ZIonText> refers
										to: Pakistan
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Device</ZIonText> means any
										device that can access the Service such as a computer, a
										cellphone or a digital tablet.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Personal Data</ZIonText> is
										any information that relates to an identified or
										identifiable individual.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Service</ZIonText> refers to
										the Application.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Service Provider</ZIonText>{' '}
										means any natural or legal person who processes the data on
										behalf of the Company. It refers to third-party companies or
										individuals employed by the Company to facilitate the
										Service, to provide the Service on behalf of the Company, to
										perform services related to the Service or to assist the
										Company in analyzing how the Service is used.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>Usage Data</ZIonText> refers
										to data collected automatically, either generated by the use
										of the Service or from the Service infrastructure itself
										(for example, the duration of a page visit).
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>You</ZIonText> means the
										individual accessing or using the Service, or the company,
										or other legal entity on behalf of which such individual is
										accessing or using the Service, as applicable.
									</ZIonText>
								</ZIonItem>
							</ZIonList>
							<ZIonTitle className='ion-no-padding mb-2 mt-3'>
								<h4 className='ion-no-margin'>
									Collecting and Using Your Personal Data
								</h4>
							</ZIonTitle>
							<ZIonTitle className='ion-no-padding font-bold mb-2'>
								Types of Data Collected
							</ZIonTitle>
							<ZIonTitle className='ion-no-padding font-bold mb-2'>
								Personal Data
							</ZIonTitle>
							<ZIonText>
								While using Our Service, We may ask You to provide Us with
								certain personally identifiable information that can be used to
								contact or identify You. Personally identifiable information may
								include, but is not limited to:
							</ZIonText>
							<ZIonList lines='none'>
								<ZIonItem>
									<ZIonText>Email address</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>First name and last name</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>Phone number</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										Address, State, Province, ZIP/Postal code, City
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>Usage Data</ZIonText>
								</ZIonItem>
							</ZIonList>
							<ZIonTitle className='ion-no-padding font-bold mb-2'>
								Usage Data
							</ZIonTitle>
							<ZIonText>
								Usage Data is collected automatically when using the Service.
							</ZIonText>
							<ZIonText>
								Usage Data may include information such as Your Device’s
								Internet Protocol address (e.g. IP address), browser type,
								browser version, the pages of our Service that You visit, the
								time and date of Your visit, the time spent on those pages,
								unique device identifiers and other diagnostic data.
							</ZIonText>
							<ZIonText>
								When You access the Service by or through a mobile device, We
								may collect certain information automatically, including, but
								not limited to, the type of mobile device You use, Your mobile
								device unique ID, the IP address of Your mobile device, Your
								mobile operating system, the type of mobile Internet browser You
								use, unique device identifiers and other diagnostic data.
							</ZIonText>
							<ZIonText>
								We may also collect information that Your browser sends whenever
								You visit our Service or when You access the Service by or
								through a mobile device.
							</ZIonText>
							<ZIonTitle className='ion-no-padding font-bold mb-2 mt-3'>
								Information Collected while Using the Application
							</ZIonTitle>
							<ZIonText>
								While using Our Application, in order to provide features of Our
								Application, We may collect, with Your prior permission:
							</ZIonText>
							<ZIonList lines='none'>
								<ZIonItem>Information regarding your location</ZIonItem>
							</ZIonList>
							<ZIonText>
								We use this information to provide features of Our Service, to
								improve and customize Our Service. The information may be
								uploaded to the Company’s servers and/or a Service Provider’s
								server or it may be simply stored on Your device.
							</ZIonText>
							<ZIonText>
								You can enable or disable access to this information at any
								time, through Your Device settings.
							</ZIonText>
							<ZIonTitle className='ion-no-padding font-bold mb-2 mt-3'>
								Use of Your Personal Data
							</ZIonTitle>
							<ZIonText>
								The Company may use Personal Data for the following purposes:
							</ZIonText>
							<ZIonList lines='none'>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>
											To provide and maintain our Service
										</ZIonText>
										, including to monitor the usage of our Service.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>
											To manage Your Account:
										</ZIonText>{' '}
										to manage Your registration as a user of the Service. The
										Personal Data You provide can give You access to different
										functionalities of the Service that are available to You as
										a registered user.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>
											For the performance of a contract:
										</ZIonText>{' '}
										the development, compliance and undertaking of the purchase
										contract for the products, items or services You have
										purchased or of any other contract with Us through the
										Service.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>To contact You:</ZIonText>{' '}
										To contact You by email, telephone calls, SMS, or other
										equivalent forms of electronic communication, such as a
										mobile application’s push notifications regarding updates or
										informative communications related to the functionalities,
										products or contracted services, including the security
										updates, when necessary or reasonable for their
										implementation.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>To provide You</ZIonText>{' '}
										with news, special offers and general information about
										other goods, services and events which we offer that are
										similar to those that you have already purchased or enquired
										about unless You have opted not to receive such information.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>
											To manage Your requests:
										</ZIonText>{' '}
										To attend and manage Your requests to Us.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>
											For business transfers:
										</ZIonText>{' '}
										We may use Your information to evaluate or conduct a merger,
										divestiture, restructuring, reorganization, dissolution, or
										other sale or transfer of some or all of Our assets, whether
										as a going concern or as part of bankruptcy, liquidation, or
										similar proceeding, in which Personal Data held by Us about
										our Service users is among the assets transferred.
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										<ZIonText className='font-bold'>
											For other purposes
										</ZIonText>
										: We may use Your information for other purposes, such as
										data analysis, identifying usage trends, determining the
										effectiveness of our promotional campaigns and to evaluate
										and improve our Service, products, services, marketing and
										your experience.
									</ZIonText>
								</ZIonItem>
							</ZIonList>
							<ZIonText>
								We may share Your personal information in the following
								situations:
							</ZIonText>
							<ZIonList lines='none'>
								<ZIonItem>
									<ZIonText className='font-bold'>
										With Service Providers:
									</ZIonText>{' '}
									We may share Your personal information with Service Providers
									to monitor and analyze the use of our Service, to contact You.
								</ZIonItem>
								<ZIonItem>
									<ZIonText className='font-bold'>
										For business transfers:
									</ZIonText>{' '}
									We may share or transfer Your personal information in
									connection with, or during negotiations of, any merger, sale
									of Company assets, financing, or acquisition of all or a
									portion of Our business to another company.
								</ZIonItem>
								<ZIonItem>
									<ZIonText className='font-bold'>With Affiliates:</ZIonText> We
									may share Your information with Our affiliates, in which case
									we will require those affiliates to honor this Privacy Policy.
									Affiliates include Our parent company and any other
									subsidiaries, joint venture partners or other companies that
									We control or that are under common control with Us.
								</ZIonItem>
								<ZIonItem>
									<ZIonText className='font-bold'>
										With business partners:
									</ZIonText>{' '}
									We may share Your information with Our business partners to
									offer You certain products, services or promotions.
								</ZIonItem>
								<ZIonItem>
									<ZIonText className='font-bold'>With other users:</ZIonText>{' '}
									when You share personal information or otherwise interact in
									the public areas with other users, such information may be
									viewed by all users and may be publicly distributed outside.
								</ZIonItem>
								<ZIonItem>
									<ZIonText className='font-bold'>With Your consent</ZIonText>:
									We may disclose Your personal information for any other
									purpose with Your consent.
								</ZIonItem>
							</ZIonList>
							<ZIonTitle className='ion-no-padding mb-2 mt-3'>
								Retention of Your Personal Data
							</ZIonTitle>
							<ZIonText>
								The Company will retain Your Personal Data only for as long as
								is necessary for the purposes set out in this Privacy Policy. We
								will retain and use Your Personal Data to the extent necessary
								to comply with our legal obligations (for example, if we are
								required to retain your data to comply with applicable laws),
								resolve disputes, and enforce our legal agreements and policies.
							</ZIonText>
							<ZIonText>
								The Company will also retain Usage Data for internal analysis
								purposes. Usage Data is generally retained for a shorter period
								of time, except when this data is used to strengthen the
								security or to improve the functionality of Our Service, or We
								are legally obligated to retain this data for longer time
								periods.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3'>
								Transfer of Your Personal Data
							</ZIonTitle>
							<ZIonText>
								Your information, including Personal Data, is processed at the
								Company’s operating offices and in any other places where the
								parties involved in the processing are located. It means that
								this information may be transferred to — and maintained on —
								computers located outside of Your state, province, country or
								other governmental jurisdiction where the data protection laws
								may differ than those from Your jurisdiction.
							</ZIonText>
							<ZIonText>
								Your consent to this Privacy Policy followed by Your submission
								of such information represents Your agreement to that transfer.
							</ZIonText>
							<ZIonText>
								The Company will take all steps reasonably necessary to ensure
								that Your data is treated securely and in accordance with this
								Privacy Policy and no transfer of Your Personal Data will take
								place to an organization or a country unless there are adequate
								controls in place including the security of Your data and other
								personal information.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3'>
								Delete Your Personal Data
							</ZIonTitle>
							<ZIonText>
								You have the right to delete or request that We assist in
								deleting the Personal Data that We have collected about You.
							</ZIonText>
							<ZIonText>
								Our Service may give You the ability to delete certain
								information about You from within the Service.
							</ZIonText>
							<ZIonText>
								You may update, amend, or delete Your information at any time by
								signing in to Your Account, if you have one, and visiting the
								account settings section that allows you to manage Your personal
								information. You may also contact Us to request access to,
								correct, or delete any personal information that You have
								provided to Us.
							</ZIonText>
							<ZIonText>
								Please note, however, that We may need to retain certain
								information when we have a legal obligation or lawful basis to
								do so.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3'>
								Disclosure of Your Personal Data
							</ZIonTitle>
							<ZIonTitle className='ion-no-padding mb-2 mt-3'>
								<h5 className='ion-no-margin font-bold'>
									Business Transactions
								</h5>
							</ZIonTitle>
							<ZIonText>
								If the Company is involved in a merger, acquisition or asset
								sale, Your Personal Data may be transferred. We will provide
								notice before Your Personal Data is transferred and becomes
								subject to a different Privacy Policy.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3'>
								<h5 className='ion-no-margin font-bold'>Law enforcement</h5>
							</ZIonTitle>
							<ZIonText>
								Under certain circumstances, the Company may be required to
								disclose Your Personal Data if required to do so by law or in
								response to valid requests by public authorities (e.g. a court
								or a government agency).
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3'>
								<h5 className='ion-no-margin font-bold'>
									Other legal requirements
								</h5>
							</ZIonTitle>
							<ZIonText>
								The Company may disclose Your Personal Data in the good faith
								belief that such action is necessary to:
							</ZIonText>
							<ZIonList lines='none'>
								<ZIonItem>Comply with a legal obligation</ZIonItem>
								<ZIonItem>
									Protect and defend the rights or property of the Company
								</ZIonItem>
								<ZIonItem>
									Prevent or investigate possible wrongdoing in connection with
									the Service
								</ZIonItem>
								<ZIonItem>
									Protect the personal safety of Users of the Service or the
									public
								</ZIonItem>
								<ZIonItem>Protect against legal liability</ZIonItem>
							</ZIonList>
							<ZIonTitle className='ion-no-padding mb-2 mt-3 font-bold'>
								Security of Your Personal Data
							</ZIonTitle>
							<ZIonText>
								The security of Your Personal Data is important to Us, but
								remember that no method of transmission over the Internet, or
								method of electronic storage is 100% secure. While We strive to
								use commercially acceptable means to protect Your Personal Data,
								We cannot guarantee its absolute security.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3 font-bold'>
								Children’s Privacy
							</ZIonTitle>
							<ZIonText>
								Our Service does not address anyone under the age of 13. We do
								not knowingly collect personally identifiable information from
								anyone under the age of 13. If You are a parent or guardian and
								You are aware that Your child has provided Us with Personal
								Data, please contact Us. If We become aware that We have
								collected Personal Data from anyone under the age of 13 without
								verification of parental consent, We take steps to remove that
								information from Our servers.
							</ZIonText>
							<ZIonText>
								If We need to rely on consent as a legal basis for processing
								Your information and Your country requires consent from a
								parent, We may require Your parent’s consent before We collect
								and use that information.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3 font-bold'>
								Links to Other Websites
							</ZIonTitle>
							<ZIonText>
								Our Service may contain links to other websites that are not
								operated by Us. If You click on a third party link, You will be
								directed to that third party’s site. We strongly advise You to
								review the Privacy Policy of every site You visit.
							</ZIonText>
							<ZIonText>
								We have no control over and assume no responsibility for the
								content, privacy policies or practices of any third party sites
								or services.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3 font-bold'>
								Changes to this Privacy Policy
							</ZIonTitle>
							<ZIonText>
								We may update Our Privacy Policy from time to time. We will
								notify You of any changes by posting the new Privacy Policy on
								this page.
							</ZIonText>
							<ZIonText>
								We will let You know via email and/or a prominent notice on Our
								Service, prior to the change becoming effective and update the
								&quot;Last updated&quot; date at the top of this Privacy Policy.
							</ZIonText>
							<ZIonText>
								You are advised to review this Privacy Policy periodically for
								any changes. Changes to this Privacy Policy are effective when
								they are posted on this page.
							</ZIonText>
							<ZIonTitle className='ion-no-padding mb-2 mt-3 font-bold'>
								Contact Us
							</ZIonTitle>
							<ZIonText>
								If you have any questions about this Privacy Policy, You can
								contact us:
							</ZIonText>
							<ZIonList lines='none'>
								<ZIonItem>
									<ZIonText>By email: info@zaions.com</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>
										By visiting this page on our website:{' '}
										<ZIonRouterLink
											routerLink={`${ZaionsBusinessDetails.WebsiteUrl}/contact`}
											rel='external nofollow noopener'
											target='_blank'
										>
											{ZaionsBusinessDetails.WebsiteUrl}/contact
										</ZIonRouterLink>
									</ZIonText>
								</ZIonItem>
								<ZIonItem>
									<ZIonText>By phone number: +923046619706</ZIonText>
								</ZIonItem>
							</ZIonList>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
				<InPageFooter />
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZaionsPrivacyPolicy;
