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
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonBadge,
  ZIonRouterLink
} from '@/components/ZIonComponents';

// Global Imports
import { PRODUCT_NAME, ZaionsBusinessDetails } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles

const ZaionsTermsOfService: React.FC = () => {
  return (
    <ZIonPage pageTitle='Term Of Service'>
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
              sizeXs='12'>
              <ZIonBadge
                className='block px-2 py-1 mb-3 text-3xl font-normal rounded-sm zaions__primary_set ion-text-center ion-no-padding ion-no-margin'
                color='primary'>
                <ZIonText color='primary'>
                  {PRODUCT_NAME} Terms of Service
                </ZIonText>
              </ZIonBadge>

              <div className='mt-4'>
                <ZIonBadge
                  className='inline-block px-2 text-2xl font-normal border-b-2 zaions__warning_set ion-no-padding z_border_color_light'
                  color='warning'>
                  <ZIonText color='dark'>Welcome to {PRODUCT_NAME}!</ZIonText>
                </ZIonBadge>
              </div>
              <ZIonText className='block mb-2 text-base'>
                These terms and conditions outline the rules and regulations for
                the use of {PRODUCT_NAME}’s Website, located at{' '}
                {ZaionsBusinessDetails.WebsiteUrl}.
              </ZIonText>

              <ZIonText className='block mb-2 text-base'>
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use {PRODUCT_NAME} if you do not
                agree to take all of the terms and conditions stated on this
                page.
              </ZIonText>

              <ZIonText className='block mb-2 text-base'>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                “Client”, “You” and “Your” refers to you, the person log on this
                website and compliant to the Company’s terms and conditions.
                “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our
                Company. “Party”, “Parties”, or “Us”, refers to both the Client
                and ourselves. All terms refer to the offer, acceptance and
                consideration of payment necessary to undertake the process of
                our assistance to the Client in the most appropriate manner for
                the express purpose of meeting the Client’s needs in respect of
                provision of the Company’s stated services, in accordance with
                and subject to, prevailing law of Netherlands. Any use of the
                above terminology or other words in the singular, plural,
                capitalization and/or he/she or they, are taken as
                interchangeable and therefore as referring to same.
              </ZIonText>

              <div className='mt-4'>
                <ZIonBadge
                  className='inline-block px-2 text-2xl font-normal border-b-2 zaions__warning_set ion-no-padding z_border_color_light'
                  color='warning'>
                  <ZIonText color='dark'>
                    Interpretation and Definitions
                  </ZIonText>
                </ZIonBadge>
              </div>

              <ZIonText className='block mb-2 text-base'>
                We employ the use of cookies. By accessing {PRODUCT_NAME}, you
                agreed to use cookies in agreement with the {PRODUCT_NAME}’s
                Privacy Policy.
              </ZIonText>

              <ZIonText className='block mb-2 text-base'>
                Most interactive websites use cookies to let us retrieve the
                user’s details for each visit. Cookies are used by our website
                to enable the functionality of certain areas to make it easier
                for people visiting our website. Some of our
                affiliate/advertising partners may also use cookies.
              </ZIonText>

              <div className='mt-4'>
                <ZIonBadge
                  className='inline-block px-2 text-2xl font-normal border-b-2 zaions__warning_set ion-no-padding z_border_color_light'
                  color='warning'>
                  <ZIonText color='dark'>License</ZIonText>
                </ZIonBadge>
              </div>

              <ZIonText className='block mb-2 text-base'>
                Unless otherwise stated, {PRODUCT_NAME} and/or its licensors own
                the intellectual property rights for all material on{' '}
                {PRODUCT_NAME}. All intellectual property rights are reserved.
                You may access this from {PRODUCT_NAME} for your own personal
                use subjected to restrictions set in these terms and conditions.
              </ZIonText>

              <div className='mt-3'>
                <div>
                  <ZIonBadge
                    className='px-2 text-lg font-normal w-max min-w-max zaions__tertiary_set py- me-1 ion-no-padding ion-no-margin h-max'
                    color='tertiary'>
                    <ZIonText color='tertiary'>You must not:</ZIonText>
                  </ZIonBadge>
                </div>

                <div className='ms-2'>
                  <ZIonText className='block mt-1'>
                    Republish material from {PRODUCT_NAME}
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    Sell, rent or sub-license material from {PRODUCT_NAME}
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    Reproduce, duplicate or copy material from {PRODUCT_NAME}
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    Redistribute content from {PRODUCT_NAME}
                  </ZIonText>
                </div>

                <ZIonText className='block mt-2'>
                  Parts of this website offer an opportunity for users to post
                  and exchange opinions and information in certain areas of the
                  website. {PRODUCT_NAME} does not filter, edit, publish or
                  review Comments prior to their presence on the website.
                  Comments do not reflect the views and opinions of{' '}
                  {PRODUCT_NAME},its agents and/or affiliates. Comments reflect
                  the views and opinions of the person who post their views and
                  opinions. To the extent permitted by applicable laws,{' '}
                  {PRODUCT_NAME} shall not be liable for the Comments or for any
                  liability, damages or expenses caused and/or suffered as a
                  result of any use of and/or posting of and/or appearance of
                  the Comments on this website.
                </ZIonText>

                <ZIonText className='block mt-2'>
                  {PRODUCT_NAME} reserves the right to monitor all Comments and
                  to remove any Comments which can be considered inappropriate,
                  offensive or causes breach of these Terms and Conditions.
                </ZIonText>

                <div className='mt-2'>
                  <ZIonBadge
                    className='px-2 text-lg font-normal w-max min-w-max zaions__tertiary_set py- me-1 ion-no-padding ion-no-margin h-max'
                    color='tertiary'>
                    <ZIonText color='tertiary'>
                      You warrant and represent that:
                    </ZIonText>
                  </ZIonBadge>
                </div>
                <div className='ms-2'>
                  <ZIonText className='block mt-1'>
                    You are entitled to post the Comments on our website and
                    have all necessary licenses and consents to do so;
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    The Comments do not invade any intellectual property right,
                    including without limitation copyright, patent or trademark
                    of any third party;
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    The Comments do not contain any defamatory, libelous,
                    offensive, indecent or otherwise unlawful material which is
                    an invasion of privacy
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    The Comments will not be used to solicit or promote business
                    or custom or present commercial activities or unlawful
                    activity.
                  </ZIonText>
                </div>

                <ZIonText className='block mt-4'>
                  You hereby grant {PRODUCT_NAME} a non-exclusive license to
                  use, reproduce, edit and authorize others to use, reproduce
                  and edit any of your Comments in any and all forms, formats or
                  media.
                </ZIonText>

                <div className='mt-3'>
                  <ZIonBadge
                    className='px-2 text-lg font-normal w-max min-w-max zaions__tertiary_set py- me-1 ion-no-padding ion-no-margin h-max'
                    color='tertiary'>
                    <ZIonText color='tertiary'>
                      Hyperlinking to our Content
                    </ZIonText>
                  </ZIonBadge>
                </div>

                <ZIonText className='block mt-2'>
                  The following organizations may link to our Website without
                  prior written approval:
                </ZIonText>

                <div className='mt-3 ms-2'>
                  <ZIonText className='block mt-2'>
                    Government agencies;
                  </ZIonText>
                  <ZIonText className='block mt-2'>Search engines;</ZIonText>
                  <ZIonText className='block mt-2'>
                    News organizations;
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    Online directory distributors may link to our Website in the
                    same manner as they hyperlink to the Websites of other
                    listed businesses; and
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    System wide Accredited Businesses except soliciting
                    non-profit organizations, charity shopping malls, and
                    charity fundraising groups which may not hyperlink to our
                    Web site.
                  </ZIonText>
                </div>

                <ZIonText className='block mt-3'>
                  These organizations may link to our home page, to publications
                  or to other Website information so long as the link: (a) is
                  not in any way deceptive; (b) does not falsely imply
                  sponsorship, endorsement or approval of the linking party and
                  its products and/or services; and (c) fits within the context
                  of the linking party’s site.
                </ZIonText>

                <ZIonText className='block mt-3'>
                  We may consider and approve other link requests from the
                  following types of organizations:
                </ZIonText>

                <div className='mt-3 ms-2'>
                  <ZIonText className='block mt-2'>
                    commonly-known consumer and/or business information sources;
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    dot.com community sites;
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    associations or other groups representing charities;
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    online directory distributors;
                  </ZIonText>
                  <ZIonText className='block mt-2'>internet portals;</ZIonText>
                  <ZIonText className='block mt-2'>
                    accounting, law and consulting firms; and
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    educational institutions and trade associations.
                  </ZIonText>
                </div>

                <ZIonText className='block mt-3'>
                  We will approve link requests from these organizations if we
                  decide that: (a) the link would not make us look unfavorably
                  to ourselves or to our accredited businesses; (b) the
                  organization does not have any negative records with us; (c)
                  the benefit to us from the visibility of the hyperlink
                  compensates the absence of {PRODUCT_NAME}; and (d) the link is
                  in the context of general resource information.
                </ZIonText>

                <ZIonText className='block mt-3'>
                  These organizations may link to our home page so long as the
                  link: (a) is not in any way deceptive; (b) does not falsely
                  imply sponsorship, endorsement or approval of the linking
                  party and its products or services; and (c) fits within the
                  context of the linking party’s site.
                </ZIonText>

                <ZIonText className='block mt-3'>
                  If you are one of the organizations listed in paragraph 2
                  above and are interested in linking to our website, you must
                  inform us by sending an e-mail to {PRODUCT_NAME}. Please
                  include your name, your organization name, contact information
                  as well as the URL of your site, a list of any URLs from which
                  you intend to link to our Website, and a list of the URLs on
                  our site to which you would like to link. Wait 2-3 weeks for a
                  response.
                </ZIonText>

                <ZIonText className='block mt-3'>
                  Approved organizations may hyperlink to our Website as
                  follows:
                </ZIonText>

                <div className='mt-3 ms-2'>
                  <ZIonText className='block mt-2'>
                    By use of our corporate name; or
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    By use of the uniform resource locator being linked to; or
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    By use of any other description of our Website being linked
                    to that makes sense within the context and format of content
                    on the linking party’s site.
                  </ZIonText>
                </div>

                <ZIonText className='block mt-3'>
                  No use of {PRODUCT_NAME}’s logo or other artwork will be
                  allowed for linking absent a trademark license agreement.
                </ZIonText>

                <div className='mt-3'>
                  <ZIonBadge
                    className='px-2 text-lg font-normal w-max min-w-max zaions__tertiary_set py- me-1 ion-no-padding ion-no-margin h-max'
                    color='tertiary'>
                    <ZIonText color='tertiary'>iFrames</ZIonText>
                  </ZIonBadge>
                </div>

                <ZIonText className='block mt-2'>
                  Without prior approval and written permission, you may not
                  create frames around our Webpages that alter in any way the
                  visual presentation or appearance of our Website.
                </ZIonText>

                <div className='mt-3'>
                  <ZIonBadge
                    className='px-2 text-lg font-normal w-max min-w-max zaions__tertiary_set py- me-1 ion-no-padding ion-no-margin h-max'
                    color='tertiary'>
                    <ZIonText color='tertiary'>Content Liability</ZIonText>
                  </ZIonBadge>
                </div>

                <ZIonText className='block mt-2'>
                  We shall not be hold responsible for any content that appears
                  on your Website. You agree to protect and defend us against
                  all claims that is rising on your Website. No link(s) should
                  appear on any Website that may be interpreted as libelous,
                  obscene or criminal, or which infringes, otherwise violates,
                  or advocates the infringement or other violation of, any third
                  party rights.
                </ZIonText>

                <div className='mt-3'>
                  <ZIonBadge
                    className='px-2 text-lg font-normal w-max min-w-max zaions__tertiary_set py- me-1 ion-no-padding ion-no-margin h-max'
                    color='tertiary'>
                    <ZIonText color='tertiary'>Your Privacy</ZIonText>
                  </ZIonBadge>
                </div>

                <ZIonText className='block mt-2'>
                  Please read
                  <ZIonRouterLink
                    className='ms-1'
                    routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}>
                    Privacy Policy
                  </ZIonRouterLink>
                </ZIonText>

                <div className='mt-3'>
                  <ZIonBadge
                    className='px-2 text-lg font-normal w-max min-w-max zaions__tertiary_set py- me-1 ion-no-padding ion-no-margin h-max'
                    color='tertiary'>
                    <ZIonText color='tertiary'>Reservation of Rights</ZIonText>
                  </ZIonBadge>
                </div>

                <ZIonText className='block mt-2'>
                  We reserve the right to request that you remove all links or
                  any particular link to our Website. You approve to immediately
                  remove all links to our Website upon request. We also reserve
                  the right to amen these terms and conditions and it’s linking
                  policy at any time. By continuously linking to our Website,
                  you agree to be bound to and follow these linking terms and
                  conditions.
                </ZIonText>

                <div className='mt-3'>
                  <ZIonBadge
                    className='px-2 text-lg font-normal w-max min-w-max zaions__tertiary_set py- me-1 ion-no-padding ion-no-margin h-max'
                    color='tertiary'>
                    <ZIonText color='tertiary'>
                      Removal of links from our website
                    </ZIonText>
                  </ZIonBadge>
                </div>

                <ZIonText className='block mt-2'>
                  If you find any link on our Website that is offensive for any
                  reason, you are free to contact and inform us any moment. We
                  will consider requests to remove links but we are not
                  obligated to or so or to respond to you directly.
                </ZIonText>

                <ZIonText className='block mt-2'>
                  We do not ensure that the information on this website is
                  correct, we do not warrant its completeness or accuracy; nor
                  do we promise to ensure that the website remains available or
                  that the material on the website is kept up to date.
                </ZIonText>

                <div className='mt-3'>
                  <ZIonBadge
                    className='px-2 text-lg font-normal w-max min-w-max zaions__tertiary_set py- me-1 ion-no-padding ion-no-margin h-max'
                    color='tertiary'>
                    <ZIonText color='tertiary'>Disclaimer</ZIonText>
                  </ZIonBadge>
                </div>

                <ZIonText className='block mt-2'>
                  To the maximum extent permitted by applicable law, we exclude
                  all representations, warranties and conditions relating to our
                  website and the use of this website. Nothing in this
                  disclaimer will:
                </ZIonText>

                <div className='mt-3 ms-2'>
                  <ZIonText className='block mt-2'>
                    limit or exclude our or your liability for death or personal
                    injury;
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    limit or exclude our or your liability for fraud or
                    fraudulent misrepresentation;
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    limit any of our or your liabilities in any way that is not
                    permitted under applicable law; or
                  </ZIonText>
                  <ZIonText className='block mt-2'>
                    exclude any of our or your liabilities that may not be
                    excluded under applicable law.
                  </ZIonText>
                </div>

                <ZIonText className='block mt-2'>
                  The limitations and prohibitions of liability set in this
                  Section and elsewhere in this disclaimer: (a) are subject to
                  the preceding paragraph; and (b) govern all liabilities
                  arising under the disclaimer, including liabilities arising in
                  contract, in tort and for breach of statutory duty.
                </ZIonText>

                <ZIonText className='block mt-2'>
                  As long as the website and the information and services on the
                  website are provided free of charge, we will not be liable for
                  any loss or damage of any nature.
                </ZIonText>
              </div>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <InPageFooter />
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsTermsOfService;
