import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Dr. Pal\'s NewME',
  description: 'Privacy Policy for NEWMEFIT LLC — how we collect, use, and protect your personal information.',
  robots: { index: true, follow: true },
}

// ─── Typography helpers ────────────────────────────────────────────────────

function SectionHeading({ n, children }: { n: string | number; children: React.ReactNode }) {
  return (
    <h2
      className="font-[family-name:var(--font-bricolage)]"
      style={{ fontSize: 'clamp(18px,calc(22/1920*100vw),22px)', fontWeight: 700, color: 'var(--color-pine-teal)', marginTop: 'clamp(36px,calc(48/1920*100vw),48px)', marginBottom: 8 }}
    >
      {n}.&nbsp;{children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-[family-name:var(--font-urbanist)]"
      style={{ fontSize: 'clamp(14px,calc(16/1920*100vw),16px)', fontWeight: 700, color: '#1a1a1a', marginTop: 20, marginBottom: 4 }}
    >
      {children}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-[family-name:var(--font-urbanist)]"
      style={{ fontSize: 'clamp(14px,calc(15/1920*100vw),15px)', lineHeight: 1.75, color: '#374151', marginBottom: 12 }}
    >
      {children}
    </p>
  )
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="font-[family-name:var(--font-urbanist)]"
      style={{ fontSize: 'clamp(14px,calc(15/1920*100vw),15px)', lineHeight: 1.75, color: '#374151', marginBottom: 12, paddingLeft: 24, listStyleType: 'disc' }}
    >
      {children}
    </ul>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return <li style={{ marginBottom: 6 }}>{children}</li>
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '8px 0' }} />
}

const annexRows: [string, string, string][] = [
  ['Better Stack / Sentry', 'Endpoint availability, response time, SSL expiry', 'https://betterstack.com/privacy'],
  ['Sentry', 'API errors, unhandled exceptions, release diffs, performance traces', 'https://betterstack.com/privacy'],
  ['Mixpanel', 'User journeys, habit log funnel, day-complete flow, screen transitions', 'https://mixpanel.com/legal/privacy-policy/'],
  ['Microsoft Clarity', 'Coach dashboard heatmaps, session recordings, rage clicks', 'https://www.microsoft.com/en-us/privacy/privacystatement'],
  ['Firebase Remote Config', 'Feature rollouts, A/B tests, post-programme lock gate in testing', 'https://policies.google.com/privacy'],
  ['Firebase Crashlytics', 'Mobile crash rate by OS / device / version, ANR tracking', 'https://policies.google.com/privacy'],
  ['Firebase Cloud Messaging', 'Delivery rates, open rates, iOS + Android unified', 'https://policies.google.com/privacy'],
  ['DigitalOcean: Redis Insight / DO Dashboard', 'Hit rate, eviction, memory, slow queries', 'https://www.digitalocean.com/legal/privacy-policy'],
  ['Firebase Performance Monitoring', 'App startup time, HTTP response times, screen render', 'https://policies.google.com/privacy'],
  ['Zoho Site24x7', 'CPU, memory, disk I/O, DB connections, server load', 'https://www.site24x7.com/privacypolicy.html'],
  ['Snyk + GitHub Security', 'Dependency CVEs, code scanning, secret detection in commits', 'https://snyk.io/policies/privacy/'],
  ['Postman', 'Collection maintenance, mock servers, API tests in CI', 'https://privacy.postman.com/policies/'],
  ['pganalyze or DO Insights', 'Slow queries, index usage, connection pool', 'https://pganalyze.com/privacy'],
  ['Calendly', 'Meet scheduler', 'https://calendly.com/legal/privacy-notice'],
  ['DigitalOcean', 'Cloud Provider', 'https://www.digitalocean.com/legal/privacy-policy'],
  ['AWS', 'Cloud Provider', 'https://aws.amazon.com/privacy/'],
  ['OpenAI', 'Meal Processing and Nutrition Summary in backend', 'https://openai.com/policies/privacy-policy/'],
  ['Gallabox', 'Conversational AI tool', 'https://gallabox.com/privacy-policy'],
  ['Pabbly', 'Automation and workflow integrations', 'https://www.pabbly.com/privacy-policy/'],
  ['Zoho', 'CRM, Checkout, Forms', 'https://www.zoho.com/privacy.html'],
]

// ─── Page ─────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff' }}>

        {/* ── Hero ── */}
        <section style={{ background: 'var(--color-pine-teal)', paddingTop: 'clamp(80px,calc(120/1920*100vw),120px)', paddingBottom: 'clamp(48px,calc(72/1920*100vw),72px)', paddingLeft: 'clamp(20px,calc(80/1920*100vw),80px)', paddingRight: 'clamp(20px,calc(80/1920*100vw),80px)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>
              Legal
            </p>
            <h1 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(28px,calc(48/1920*100vw),48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              Privacy Policy
            </h1>
            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(14px,calc(16/1920*100vw),16px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Last updated: May 2026
            </p>
          </div>
        </section>

        {/* ── Body ── */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px,calc(72/1920*100vw),72px) clamp(20px,calc(40/1920*100vw),40px) clamp(60px,calc(100/1920*100vw),100px)' }}>

          <SectionHeading n={1}>Introduction</SectionHeading>
          <P>
            This Privacy Policy describes how NEWMEFIT LLC (&ldquo;NewME,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects and uses Personal Information about you through the use of our Website, mobile application (&ldquo;App&rdquo;), and through email, text, and other electronic communications between you and NewME. NewME respects your privacy, and we are committed to protecting it through our compliance with this policy.
          </P>
          <P>
            This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit NewME&apos;s website and other platforms where this Policy is posted (collectively &ldquo;Website&rdquo;) and the App and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </P>
          <P>This policy applies to information we collect:</P>
          <Ul>
            <Li>on our Website and App;</Li>
            <Li>via emails, text message, phone conversations, audio and video interactions and other electronic messages between you and our Website and App;</Li>
            <Li>when you interact with our advertising and applications on third party websites and services, if those applications or advertising include links to this policy.</Li>
          </Ul>
          <P>
            It does not apply to information collected by any third party, including through any application or content (including advertising) that may link to or be accessible from or on the Website or App.
          </P>
          <P>
            Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, you should not use our Website and App. By accessing or using our Website and/or App, you are deemed to have read and understood this Privacy Policy.
          </P>
          <P>
            This Privacy Policy may change from time to time and updated versions of the policy will be uploaded on this website and App, and communicated to you via email. Your continued use of our Website or App after we make changes is deemed to be an acknowledgment that you have reviewed those changes, so please check this Privacy Policy periodically for updates.
          </P>

          <SectionHeading n={2}>Children Under the Age of 18</SectionHeading>
          <P>
            Our Website and App are not intended for children under the age of 18 without parental consent. If you are under the age of eighteen (18) and wish to create an account with NewME, your parent or legal guardian must create the account, submit your Personal Information, and agree to this privacy policy on your behalf.
          </P>
          <P>
            If you are under the age of 13, you may only use our services and access our Website and App with the supervision and consent of your parents or legal guardians. If we learn that we have collected Personal Information from someone under the age of 13 that was not provided with the supervision and consent of the minor&apos;s parents or legal guardian, we will promptly delete that information. If you believe we have impermissibly collected Personal Information from someone under the age of 13, please contact us using the information below.
          </P>

          <SectionHeading n={3}>Information We Collect About You and How We Collect It</SectionHeading>
          <P>
            We collect different types of information about you, including information that may directly identify you, information that is about you but individually does not personally identify you, and information that we combine with our other users. This includes information that we collect directly from you or through automated collection technologies.
          </P>

          <SubHeading>Information we collect generally</SubHeading>
          <P>
            We collect several types of information from and about users of our Website and App (collectively, &ldquo;Personal Information&rdquo; or &ldquo;Personal Data,&rdquo; as defined under applicable state law), specifically information:
          </P>
          <Ul>
            <Li>by which you may be personally identified, such as name, address, e-mail address, home, work, and mobile telephone numbers, date of birth, credit or debit card number (for payment purposes only), audio (including recordings and transcripts), images and videos of you, gender, Social Security Number, your medical history, health insurance subscriber information, and health information;</Li>
            <Li>about your Internet connection, the equipment you use to access our Website or use our App and usage details, such as traffic data, logs, referring/exit pages, date and time of your visit to our Website or use of our App, error information, click stream data, and other communication data and the resources that you access and use on the Website or through our App.</Li>
          </Ul>
          <P>We collect this information:</P>
          <Ul>
            <Li>directly from you when you provide it to us;</Li>
            <Li>automatically as you navigate through the Website or use our App. Information collected automatically may include usage details, IP addresses, and information collected through cookies and other tracking technologies; and</Li>
            <Li>from third parties, for example, our business partners.</Li>
          </Ul>

          <SubHeading>Information you provide to us</SubHeading>
          <P>The information we collect on or through our Website or through our App is:</P>
          <Ul>
            <Li>information that you provide by filling in forms on our Website or the App;</Li>
            <Li>videos, images and recordings when interacting with a Provider on our Website or the App. This includes information provided at the time of registering to use our Website or App as well as information provided when using our Provider consultation services, purchasing products, or requesting further services;</Li>
            <Li>records and copies of your correspondence (including email addresses), if you contact us; and</Li>
            <Li>details of transactions you carry out through our Website or through the App and of the fulfilment of your orders.</Li>
          </Ul>
          <P>
            You also may provide information to be published or displayed on public areas of the Website or App or transmitted to other users of the Website or App or third parties (collectively, &ldquo;User Contributions&rdquo;). Your User Contributions are posted on and transmitted to others at your own risk.
          </P>
          <P>
            Video and audio from your sessions may be recorded for purposes which may include quality auditing, improvement of health status, customer and client experience, customer and client engagement and/or behaviour modification, peer review, payment, efficiency, cost effectiveness and/or other purposes relating to operations and provision of services. Behavioural health visits are not recorded. By using the services available through our Website and App you specifically consent to the recording of the visit.
          </P>

          <SubHeading>Information We Collect Through Automatic Data Collection Technologies</SubHeading>
          <P>
            As you navigate through and interact with our Website and App, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns, specifically:
          </P>
          <Ul>
            <Li>details of your access to and use of the App and Website, including traffic data, location data, logs, and other communication data and the resources that the end user accesses and uses on or through the App and Website;</Li>
            <Li>information about your mobile device and internet connection, including the device&apos;s unique device identifier, IP address, operating system, browser type, mobile network information, and the device&apos;s telephone number;</Li>
            <Li>information stored on your mobile device, including in other applications. This may include photographs, audio and video clips, personal contacts, and health information. This data will be used only to provide and improve our services, and will not be used or shared with third parties for marketing purposes; or</Li>
            <Li>real-time information about the location of your device.</Li>
          </Ul>
          <P>
            The technologies we use for this automatic data collection may include cookies, Flash cookies, and web beacons. Please see our{' '}
            <a href="/cookie-policy" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>Cookie Policy</a> for further detail.
          </P>

          <SectionHeading n={4}>How We Use Your Information</SectionHeading>
          <P>We use information that we collect about you or that you provide to us, including any Personal Information:</P>
          <Ul>
            <Li>to provide and improve our Website, App, programs, and services. For example, we may convert our recordings to text and perform machine learning or similar activities using artificial intelligence programs or similar models on data we receive;</Li>
            <Li>to provide you with information, products, or services that you request from us or that may be of interest to you;</Li>
            <Li>for purposes of service provision, quality, improvement of health status, customer and client experience, customer and client engagement and/or behaviour modification, peer review, payment, efficiency, cost effectiveness and/or other purposes relating to operations and provision of services;</Li>
            <Li>to process, fulfil, support, and administer transactions and orders for products and services ordered by you;</Li>
            <Li>to provide you with notices about your NewME account;</Li>
            <Li>to contact you in response to a request;</Li>
            <Li>to administer surveys;</Li>
            <Li>to fulfil any other purpose for which you provide it;</Li>
            <Li>to carry out our obligations and enforce our rights arising from any contracts entered into between you and us or between us and health plans or other benefit programs, including for billing and collection;</Li>
            <Li>to notify you about changes to our Website, our App, or any products or services we offer or provide through them; and</Li>
            <Li>for any other purpose with your consent.</Li>
          </Ul>
          <P>
            We may also use your information to contact you about programs and services that may be of interest to you, including through newsletters. If you wish to opt-out of receiving such communications, you may do so at any time by clicking unsubscribe at the bottom of these communications.
          </P>

          <SubHeading>Health Information</SubHeading>
          <P>
            Some information NewME collects constitutes protected health information (&ldquo;PHI&rdquo;) under the US Health Insurance Portability and Accountability Act (&ldquo;HIPAA&rdquo;). NewME may enter into agreements with Business Associates as defined under HIPAA (such as, but not limited to external consultants) to provide services and shall use and disclose PHI only in accordance with the HIPAA standards and the Business Associate Agreements entered into with such Business Associates.
          </P>

          <SubHeading>De-Identified Information</SubHeading>
          <P>
            We may de-identify your Personal Information so that it no longer reasonably identifies you. In this case, we may use this de-identified data without restriction and for any purpose, including to improve our Website, App, and products and services.
          </P>

          <SectionHeading n={5}>Disclosure of Your Information</SectionHeading>
          <P>We may disclose your Personal Information to a few third parties, including:</P>
          <Ul>
            <Li>our affiliates and third-party service providers that we use to support our business;</Li>
            <Li>to a company we merge, acquire, or that buys us, or in the event of change in structure of our company of any form;</Li>
            <Li>to comply with our legal obligations;</Li>
            <Li>to enforce our rights; and</Li>
            <Li>with your consent.</Li>
          </Ul>
          <P>We do not share or otherwise disclose your Personal Information for purposes other than those outlined in this Privacy Policy. We may disclose Personal Information that we collect or you provide as described in this privacy policy:</P>
          <Ul>
            <Li>to affiliates, contractors, service providers, and other third parties we use to support our business. The services provided by these organizations include providing IT and infrastructure support services, ordering, marketing and advertising, and payment processing services;</Li>
            <Li>to a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets;</Li>
            <Li>to fulfil the purpose for which you provide it. For example, we may disclose your Personal Information to a Provider;</Li>
            <Li>for any other purpose disclosed by us when you provide the information; and</Li>
            <Li>with your consent.</Li>
          </Ul>
          <P>
            A full list of third party services that we engage with is provided in <a href="#annex-i" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>Annex I</a> to this Privacy Policy. This list will be updated from time to time to reflect the most recent service providers.
          </P>
          <P>We may also disclose your Personal Information:</P>
          <Ul>
            <Li>to comply with any court order, law, or legal process, including to respond to any government or regulatory request;</Li>
            <Li>to enforce or apply our Terms and Conditions and other agreements, including for billing and collection purposes; and</Li>
            <Li>if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of NewME, our customers, or others.</Li>
          </Ul>

          <SectionHeading n={6}>Choices About How We Use and Disclose Your Information</SectionHeading>
          <P>We offer you choices on how you can opt out of our use of tracking technology, disclosure of your Personal Information for our advertising to you, and other targeted advertising. We have created mechanisms to provide you with control over your Personal Information:</P>
          <Ul>
            <Li><strong>Tracking Technologies and Advertising.</strong> You can set your browser or operating system to refuse all or some cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, please note that some parts of our Website or App may then be inaccessible or not function properly.</Li>
            <Li><strong>Promotional Offers from NewME.</strong> If you do not wish to have your email address used by NewME to promote our own programs and services, you can opt-out at any time by clicking the unsubscribe link at the bottom of any promotional emails or other marketing communications you receive from us.</Li>
            <Li><strong>Location Information.</strong> You can choose whether or not to allow the App to collect and use real-time information about your device&apos;s location through the device&apos;s privacy settings. If you block the use of location information, some parts of the App may then be inaccessible or not function properly.</Li>
            <Li><strong>Targeted Advertising.</strong> To learn more about interest-based advertisements and your opt-out rights and options, visit the Digital Advertising Alliance (<a href="https://youradchoices.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>youradchoices.com</a>) and the Network Advertising Initiative (NAI) websites (<a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>aboutads.info</a> and <a href="https://www.networkadvertising.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>networkadvertising.org</a>).</Li>
          </Ul>

          <SectionHeading n={7}>Your Rights</SectionHeading>
          <P>
            You may review and change your Personal Information by logging into the App or Website and visiting your Account Details page. You may notify us through the Contact Information provided below of any changes or errors in any Personal Information we have about you to ensure that it is complete, accurate, and as current as possible or to delete your account. We cannot delete your Personal Information except by also deleting your account with us.
          </P>
          <P>
            With respect to any PHI in our possession, you have certain rights under HIPAA. California and Colorado residents have additional rights with respect to accessing and correcting Personal Information, as described below.
          </P>

          <SectionHeading n={8}>Data Security</SectionHeading>
          <P>
            Information transmitted over the Internet is not completely secure, but we do our best to protect your Personal Information. We have implemented measures designed to secure your Personal Information from accidental loss and from unauthorized access, use, alteration, and disclosure. We use application timeouts and encryption technology for information sent and received by us.
          </P>
          <P>
            The safety and security of your information also depends on you. Where you have chosen a password for the use of our Website or App, you are responsible for keeping this password confidential. We ask you not to share your password with anyone. Unfortunately, the transmission of information via the Internet is not completely secure. Although we work diligently to try and protect your Personal Information, we cannot guarantee the security of your Personal Information transmitted to our Website or on or through our App. Any transmission of Personal Information is at your own risk.
          </P>

          <SectionHeading n={9}>Privacy Rights and Information for Residents of Certain States</SectionHeading>
          <P>
            The states described below provide their residents with certain additional privacy rights. The information and rights described below supplement the other information contained in our Privacy Policy and apply solely to visitors, users, and others who reside in those states. Please note that these laws expressly exclude information regulated as PHI, as described above.
          </P>

          <SubHeading>Categories of Personal Information NewME Collects</SubHeading>
          <P>
            As described in more detail in other areas of our Privacy Policy, we collect and/or disclose Personal Information or Personal Data about you when you visit or use our Website or App, including information that you provide to us and information that we automatically collect from you or your computer or device as you use our Website or App.
          </P>

          <SubHeading>Use of Personal Information or Data</SubHeading>
          <P>
            We may use Personal Information or Data we collect for the purposes described elsewhere in this Privacy Policy. Please refer to Section 4 (&ldquo;How We Use Your Information&rdquo;) for details about our practices regarding the use of Personal Information.
          </P>

          <SubHeading>Sharing and Disclosing Personal Information and Data</SubHeading>
          <P>
            NewME may disclose your Personal Information or Personal Data to various service providers for one or more business purposes as described above. When we disclose Personal Information or Personal Data to a service provider for a business purpose, we enter a contract that describes the purpose and requires the recipient to both keep that Personal Information or Personal Data confidential and not use it for any purpose except performing the contract.
          </P>
          <P>
            Additionally, the California Consumer Privacy Act (CCPA) defines a &ldquo;sale&rdquo; as disclosing or making available to a third-party Personal Information in exchange for monetary or other valuable consideration, and &ldquo;sharing&rdquo; broadly includes disclosing Personal Information or making it available to a third party for purposes of cross-context behavioural advertising. While we do not disclose Personal Information to third parties in exchange for monetary compensation, we may &ldquo;share&rdquo; or &ldquo;sell&rdquo; (as defined by the CCPA) identifiers and internet and electronic network activity information to third parties to improve and evaluate our advertising campaigns and better reach customers and prospective customers with more relevant ads and content. We do not have actual knowledge that we sell or share any Personal Information about individuals who are under sixteen (16) years old.
          </P>

          <SectionHeading n={10}>California Privacy Rights</SectionHeading>
          <P>To the extent you are a California resident, you may have the following rights regarding your Personal Information:</P>
          <Ul>
            <Li><strong>Right to Access:</strong> With respect to the Personal Information we have collected about you in the prior 12 months, you have the right to request (up to twice per year and subject to certain exemptions): (i) categories of Personal Information we have collected; (ii) the sources from which we have collected it; (iii) our business or commercial purposes for collecting, selling, or disclosing it; (iv) the categories of third parties to whom we have disclosed it; and (v) a copy of the specific pieces of your Personal Information we have collected.</Li>
            <Li><strong>Right to Correct:</strong> You have the right to request that we correct inaccuracies in your Personal Information.</Li>
            <Li><strong>Right to Delete:</strong> Subject to certain conditions and exceptions, you may have the right to request deletion of Personal Information that we have collected about you.</Li>
            <Li><strong>Right to Opt-Out of Sale or Sharing:</strong> You may have the right to opt-out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of your Personal Information. To opt out, please click on the &ldquo;Do Not Sell or Share My Personal Information&rdquo; link on the bottom of the website homepage.</Li>
            <Li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of the rights described in this section.</Li>
            <Li><strong>Authorized Agent:</strong> You may designate someone as an authorized agent to submit requests and act on your behalf. To do so, you must provide us with written permission to allow the authorized agent to act on your behalf.</Li>
          </Ul>
          <P>
            To make a request for the rights described above, please contact us via the contact details in Section 13. You must provide us with the following information: (1) first and last name; (2) email address; (3) physical address; and (4) date of birth. We will take steps to verify your request by matching the information provided by you with the information we have in our records.
          </P>

          <SectionHeading n={11}>Rights for Residents of Colorado, Connecticut, Delaware, and Other States</SectionHeading>
          <P>
            The following rights are available under the Colorado Privacy Act, Connecticut Data Protection Act, Delaware Personal Data Privacy Act, Iowa Consumer Data Protection Act, Maryland Online Data Privacy Act, Minnesota Consumer Data Privacy Act, Montana Consumer Data Privacy Act, Nebraska Data Privacy Act, New Hampshire Data Privacy Act, New Jersey Data Protection Act, Oregon Consumer Privacy Act, Texas Data Privacy and Security Act, Tennessee Information Privacy Act, the Utah Consumer Privacy Act, and the Virginia Consumer Data Protection Act:
          </P>
          <Ul>
            <Li><strong>Right to Access:</strong> You have the right to confirm if we are processing your Personal Information or Personal Data and to access such information.</Li>
            <Li><strong>Right to Correction:</strong> You have the right to correct inaccuracies in your Personal Information or Personal Data.</Li>
            <Li><strong>Right to Deletion:</strong> You have the right to delete the Personal Information or Personal Data provided to us by you.</Li>
            <Li><strong>Right to Data Portability:</strong> You have the right to obtain a copy of the Personal Information or Personal Data that you previously provided to us in a portable and, to the extent technically feasible, readily usable format.</Li>
            <Li><strong>Right to Opt-Out of Targeted Advertising:</strong> To opt out of targeted marketing, please click on the link titled &ldquo;Cookie Preferences&rdquo; on the bottom of the website homepage.</Li>
            <Li><strong>Right to Appeal:</strong> If we decline to take action regarding your request, you have the right to appeal. We will notify you providing our reasons and instructions for how you can appeal the decision.</Li>
          </Ul>
          <P>
            To make a request for the rights described above, please contact us via the contact details in Section 13. You must provide us with the following information: (1) first and last name; (2) email address; (3) physical address; and (4) date of birth.
          </P>

          <SectionHeading n={12}>Changes to Our Privacy Policy</SectionHeading>
          <P>
            We will post any changes to our Privacy Policy on our Website. If we make material changes to our Privacy Policy, we may notify you of such changes through your contact information and invite you to review (and accept, if necessary) the changes. The date this Privacy Policy was last revised is identified at the top of the page.
          </P>
          <P>
            You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically accessing the App or visiting our Website and reviewing this Privacy Policy to check for any changes.
          </P>

          <SectionHeading n={13}>Contact Information</SectionHeading>
          <P>
            If you have any questions, concerns, complaints or suggestions regarding our Privacy Policy or otherwise need to contact us, you may contact us through the &ldquo;Contact Us&rdquo; page on our Website or in the App, or by writing to us at:
          </P>
          <p
            className="font-[family-name:var(--font-urbanist)]"
            style={{ fontSize: 'clamp(14px,calc(15/1920*100vw),15px)', lineHeight: 1.75, color: '#374151', marginBottom: 12, paddingLeft: 20, borderLeft: '3px solid var(--color-pine-teal)' }}
          >
            NEWMEFIT LLC<br />
            <a href="mailto:info@drpalsnewme.com" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>info@drpalsnewme.com</a>
          </p>

          {/* ── Annex I ── */}
          <Divider />
          <div id="annex-i" style={{ marginTop: 48 }}>
            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-pine-teal)', marginBottom: 8 }}>
              Annex I
            </p>
            <h2 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(18px,calc(22/1920*100vw),22px)', fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
              Third-Party Service Providers
            </h2>
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 'clamp(13px,calc(14/1920*100vw),14px)', lineHeight: 1.75, color: '#6b7280', marginBottom: 20 }}
            >
              The current list of service providers NewME works with, engages, and partners with to deliver its services to its users is as follows. This list will be updated from time to time.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table
                className="font-[family-name:var(--font-urbanist)]"
                style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'clamp(12px,calc(13/1920*100vw),13px)' }}
              >
                <thead>
                  <tr style={{ background: 'var(--color-pine-teal)' }}>
                    {['Platform', 'Purpose of Use', 'Privacy Policy'].map(h => (
                      <th key={h} style={{ color: '#fff', fontWeight: 600, padding: '10px 14px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {annexRows.map(([platform, purpose, url], i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f9fafb' : '#fff', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '10px 14px', color: '#374151', verticalAlign: 'top', fontWeight: 600, whiteSpace: 'nowrap' }}>{platform}</td>
                      <td style={{ padding: '10px 14px', color: '#374151', verticalAlign: 'top' }}>{purpose}</td>
                      <td style={{ padding: '10px 14px', verticalAlign: 'top' }}>
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline', wordBreak: 'break-all' }}>
                          {url.replace('https://', '').replace(/\/$/, '')}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </>
  )
}
