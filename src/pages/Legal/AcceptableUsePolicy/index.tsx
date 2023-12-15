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
  ZIonContent
} from '@/components/ZIonComponents';

// Global Imports
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Styles

const ZaionsAcceptableUsePolicy: React.FC = () => {
  return (
    <ZIonPage pageTitle='Acceptable Use Policy Page'>
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
              <ZIonText>
                <h2 className='font-bold'>
                  {PRODUCT_NAME} Acceptable Use Policy
                </h2>
              </ZIonText>
              <ZIonText className='text-lg zaions__color_gray2'>
                Effective Date: April 22, 2022
              </ZIonText>{' '}
              <br />
              <ZIonText className='pt-1 mt-3 zaions__color_gray2'>
                At {PRODUCT_NAME}, our aim is to be a catalyst for connections;
                to empower people, brands, and businesses of all sizes to engage
                their customers anywhere at scale.
              </ZIonText>
              <ZIonText className='mt-3 zaions__color_gray2'>
                {PRODUCT_NAME} is committed to protecting and supporting the
                right to free expression. At the same time, we take the trust
                and safety of our platform and community of users seriously.
                Accordingly, any attempt to use the {PRODUCT_NAME} Services to
                distribute harmful, false or misleading content or otherwise
                manipulate the {PRODUCT_NAME}
                Services (as defined in the {PRODUCT_NAME}{' '}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}>
                  Terms of Service
                </ZIonRouterLink>
                ) for such purposes, is strictly prohibited. If we determine
                that you are using or have used the {PRODUCT_NAME} Services to
                engage in any form of misconduct, including violating this
                Policy, we may restrict your ability to use our platform, remove
                your content or suspend or terminate your account. Misconduct
                may also violate applicable laws and can lead to legal action
                and civil and criminal penalties.
              </ZIonText>
              <ZIonText className='pt-1 mt-3 zaions__color_gray2'>
                By accessing or using the {PRODUCT_NAME} Services, you agree to
                abide by this Acceptable Use Policy as well as the{' '}
                {PRODUCT_NAME}{' '}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsTermsOfService}>
                  Terms of Service
                </ZIonRouterLink>
                , {PRODUCT_NAME}{' '}
                <ZIonRouterLink
                  routerLink={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}>
                  Privacy Policy
                </ZIonRouterLink>{' '}
                and {PRODUCT_NAME}’s{' '}
                <ZIonRouterLink
                  routerLink={CONSTANTS.ExternalURL.GenericExternalURL}>
                  DMCA Copyright Policy
                </ZIonRouterLink>{' '}
                and to (collectively, the “{PRODUCT_NAME} Terms”), as may be
                modified from time to time.
              </ZIonText>{' '}
              <ZIonText className='font-bold'>Eligibility</ZIonText>{' '}
              <ZIonText className='mt-1 zaions__color_gray2'>
                You may only use the {PRODUCT_NAME} Services in compliance with
                the {PRODUCT_NAME}
                Terms. If we suspend or revoke your privileges to use the{' '}
                {PRODUCT_NAME}
                Services, you will not be eligible to access them again until
                further notice from us and any attempt to circumvent such access
                restrictions (e.g. by creating additional accounts or
                identities) are strictly prohibited and will result in the
                permanent disabling of such accounts and flagging them for
                future enforcement purposes.
              </ZIonText>{' '}
              <ZIonText className='font-bold'>
                Never use the {PRODUCT_NAME} Services to distribute abusive,
                dangerous, or illegal content
              </ZIonText>{' '}
              <ZIonText className='zaions__color_gray2'>
                You are prohibited from using the {PRODUCT_NAME} Services to
                distribute or promote the following types of content (including
                but not limited to text, images, video and audio):
              </ZIonText>
              <ul className='zaions_list_default'>
                <li>
                  Content that attacks individuals or groups on the basis of
                  race, gender, ethnicity, national origin, immigration status,
                  religion, sex or gender identity, sexual orientation,
                  disability, or medical condition, as well as any content
                  promoting organizations with such views.
                </li>
                <li>Content that exploits children</li>
                <li>
                  Misinformation, including but not limited to, medical or civic
                  misinformation
                </li>
                <li>
                  Content that threatens, encourages, or promotes violence or
                  graphic imagery
                </li>
                <li>
                  Sexually explicit or intimate content shared without the
                  subject’s consent
                </li>
                <li>
                  Any content that glamorizes or promotes self-harm or endangers
                  your safety or the safety of others
                </li>
                <li>Any content that promotes terrorism</li>
                <li>Any other content that is illegal</li>
              </ul>
              <ZIonText className='text-lg font-bold'>
                Never engage in abusive, dangerous, or illegal behavior
              </ZIonText>{' '}
              <br />
              <ZIonText className='zaions__color_gray2'>
                You are prohibited from using the {PRODUCT_NAME} Services to
                engage in the following types of behavior:
              </ZIonText>
              <ul className='zaions_list_default'>
                <li>
                  Distributing malware, viruses, badware, or other types of
                  disruptive software
                </li>
                <li>
                  Engaging in phishing, spoofing, hacking, or other attempts to
                  fraudulently gain access to someone’s information
                </li>
                <li>Sending bulk commercial emails or SMA (i.e. spam)</li>
                <li>
                  Circumventing {PRODUCT_NAME}’s systems to evade detection of
                  abuse outlined in the {PRODUCT_NAME} Terms Sharing someone’s
                  private information without their consent (i.e. doxxing)
                </li>
                <li>Threatening violence or harm to others</li>
                <li>
                  Bullying, harassing, or coordinated online attacks targeting
                  individuals or groups (i.e. brigading)
                </li>
                <li>
                  Impersonating others or misrepresenting your affiliation with
                  any people, organizations or other entities
                </li>
                <li>
                  Facilitating illegal activity such as the sale of prohibited
                  goods and/or services
                </li>
                <li>
                  Infringing another person or entity’s intellectual property
                </li>
              </ul>
              <ZIonText className='text-lg font-bold'>
                Reporting abuse and violations
              </ZIonText>
              <br />
              <ZIonText className='zaions__color_gray2'>
                We encourage anyone who suspects that someone is manipulating
                the {PRODUCT_NAME} Services or violating our Acceptable Use
                Policy in any way to notify us. We investigate concerns
                thoroughly and take appropriate actions, up to and including
                terminating user accounts.
              </ZIonText>
              <ZIonText className='pt-1 pb-0 mt-3 mb-0 font-bold'>
                If you believe {PRODUCT_NAME} mistakenly flagged your activity
                as misconduct, you can contact us and we will investigate your
                appeal.
              </ZIonText>
              <br /> <br />
              <ZIonText className='text-lg font-bold'>
                Enforcement against non-compliance
              </ZIonText>{' '}
              <br />
              <ZIonText className='zaions__color_gray2'>
                {PRODUCT_NAME} is committed to protecting the user experience
                and in doing so, our actions will reflect the spirit, not merely
                the letter, of this Acceptable Use Policy. {PRODUCT_NAME}{' '}
                reserves the right to suspend or terminate any account or pause
                or remove any content we deem to be negatively affecting the
                user experience or safety of our community, whether or not the
                behavior is explicitly prohibited by this Acceptable Use Policy.
                This Acceptable Use Policy does not comprehensively list every
                type of content that {PRODUCT_NAME} could restrict or block, nor
                every basis on which {PRODUCT_NAME} may restrict or block
                content.
              </ZIonText>
            </ZIonCol>
            <ZIonCol></ZIonCol>
          </ZIonRow>
        </ZIonGrid>
        <InPageFooter />
      </ZIonContent>
    </ZIonPage>
  );
};

export default ZaionsAcceptableUsePolicy;
