import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | Dr. Pal\'s NewME',
  description: 'How NEWMEFIT LLC uses cookies and similar technologies on drpalsnewme.com.',
  robots: { index: true, follow: true },
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-[family-name:var(--font-bricolage)]"
      style={{ fontSize: 'clamp(17px,calc(20/1920*100vw),20px)', fontWeight: 700, color: 'var(--color-pine-teal)', marginTop: 'clamp(32px,calc(44/1920*100vw),44px)', marginBottom: 8 }}
    >
      {children}
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

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff' }}>

        {/* Hero */}
        <section style={{ background: 'var(--color-pine-teal)', paddingTop: 'clamp(80px,calc(120/1920*100vw),120px)', paddingBottom: 'clamp(48px,calc(72/1920*100vw),72px)', paddingLeft: 'clamp(20px,calc(80/1920*100vw),80px)', paddingRight: 'clamp(20px,calc(80/1920*100vw),80px)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>
              Legal
            </p>
            <h1 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(28px,calc(48/1920*100vw),48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              Cookie Policy
            </h1>
            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(14px,calc(16/1920*100vw),16px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Last updated: May 2026
            </p>
          </div>
        </section>

        {/* Body */}
        <section style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(40px,calc(72/1920*100vw),72px) clamp(20px,calc(40/1920*100vw),40px) clamp(60px,calc(100/1920*100vw),100px)' }}>

          <P>
            NEWMEFIT LLC (&ldquo;NewME&rdquo;) values user privacy and is committed to being transparent about the technologies they use. This Cookie Policy (&ldquo;Policy&rdquo;) explains how cookies and similar technologies are employed on the NewME website to recognize visitors and analyze interactions with content and advertisements. It is essential that users read this policy carefully before using NewME&apos;s website or services. For a complete understanding of how NewME collects, uses, and protects user data, users should review NewME&apos;s{' '}
            <a href="/privacy-policy" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </P>
          <P>
            By continuing to browse or use NewME&apos;s website, services, and programs, a user consents to NewME&apos;s use of cookies and similar technologies in accordance with this Policy.
          </P>

          <SectionHeading>What are cookies?</SectionHeading>
          <P>
            Cookies are small text files stored on a user&apos;s computer, smartphone, tablet, or other device when they access websites through a browser. They serve to enhance website functionality and user experience. NewME classifies cookies as follows:
          </P>
          <Ul>
            <Li><strong>Essential Cookies:</strong> Required for website functionality.</Li>
            <Li><strong>Performance Cookies:</strong> Used for analytics and improving usability.</Li>
            <Li><strong>Marketing Cookies:</strong> Used for targeted advertising.</Li>
          </Ul>
          <P>
            Cookies are widely used to make websites function efficiently, enhance user experience, and provide website operators with analytical insights. Cookies can either be session-based, lasting only for the duration of a user&apos;s visit, or persistent, remaining on a user&apos;s device for future visits.
          </P>
          <P>
            Cookies may be classified as first-party cookies, which are set directly by the website the user visits, or third-party cookies, which are set by external services, such as those providing analytics, advertising, or content delivery services.
          </P>
          <P>
            In addition to cookies, NewME&apos;s website and emails may include similar technologies such as web beacons or tracking pixels. These small, transparent images are used for gathering statistical data about user interactions and may function alongside cookies. While web beacons are not stored on a user&apos;s device in the same way, they are often used to complement cookie functionality.
          </P>

          <SectionHeading>Why are cookies used?</SectionHeading>
          <P>
            The use of cookies and similar technologies on NewME&apos;s website serves several purposes, including ensuring basic functionality and enhancing overall user experience. Cookies are critical for maintaining the security of a website by helping to identify and mitigate potential threats. They allow NewME to understand user preferences and behaviours, enabling the customisation of content, products, and services to meet expectations.
          </P>
          <P>
            Cookies support NewME&apos;s marketing efforts by serving relevant advertisements and monitoring their effectiveness. Furthermore, they assist NewME in conducting analytics to improve the performance and usability of their website(s).
          </P>
          <P>
            On occasion, NewME may use cookies for re-marketing purposes, displaying targeted advertisements to users who have shown interest in NewME&apos;s products or services on other platforms. These activities are carried out in compliance with applicable data protection laws.
          </P>

          <SectionHeading>Types of cookies</SectionHeading>
          <P>
            NewME uses cookies and similar tracking technologies to track the activity on its Website and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyse user engagement on the Website.
          </P>

          <SubHeading>Cookies or Browser Cookies</SubHeading>
          <P>
            A cookie is a small file placed on a user&apos;s device. A user can instruct their browser to refuse all cookies or to indicate when a cookie is being sent. However, if a user does not accept cookies, they may not be able to use some parts of the website fully. Unless a user adjusts their browser setting to refuse cookies, NewME&apos;s website may use cookies.
          </P>

          <SubHeading>Flash Cookies</SubHeading>
          <P>
            Certain features of NewME&apos;s website may use local stored objects (or Flash Cookies) to collect and store information about user preferences or user activity on NewME&apos;s website. Flash Cookies are not managed by the same browser settings as those used for Browser Cookies. For more information on how a user can delete Flash Cookies, they may read resources available on Adobe Flash&apos;s website.
          </P>

          <SubHeading>Web Beacons</SubHeading>
          <P>
            Certain sections of NewME&apos;s website and emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit NewME, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
          </P>

          <SubHeading>Persistent and Session Cookies</SubHeading>
          <P>
            Cookies can be &ldquo;Persistent&rdquo; or &ldquo;Session&rdquo; cookies. Persistent Cookies remain on a user&apos;s personal computer or mobile device when they go offline. Session Cookies are deleted as soon as the user closes the web browser. NewME uses both Session and Persistent Cookies for the purposes set out below:
          </P>
          <Ul>
            <Li>
              <strong>Necessary / Essential Cookies:</strong> These are Session Cookies administered by NewME. These Cookies are essential to provide a user with services available through the Website and to enable a user to use some of its features. They help authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that a user asks for cannot be provided. NewME only uses these Cookies to provide a user with these services.
            </Li>
            <Li>
              <strong>Cookies Policy / Notice Acceptance Cookies:</strong> These are Persistent Cookies administered by NewME. These Cookies identify whether or not users have accepted the use of cookies on the Website.
            </Li>
            <Li>
              <strong>Functionality Cookies:</strong> These are Persistent Cookies administered by NewME to allow NewME to remember choices a user makes when they use NewME&apos;s Website, such as remembering their login details. The purpose of these Cookies is to provide a user with a more personal experience and to avoid a user having to re-enter their preferences every time they use NewME&apos;s Website.
            </Li>
          </Ul>

          <SectionHeading>Third-party cookies and technologies</SectionHeading>
          <P>
            NewME&apos;s website also incorporates cookies provided by third-party companies to enhance functionality and provide additional services. These third-party cookies may include, but are not limited to, analytics and marketing tools. The data drawn from such tools helps refine NewME&apos;s website(s) and services for a better user experience. These cookies collect personal data only when voluntarily provided by users, such as through form submissions, and they do not store Personally Identifiable Information (PII).
          </P>
          <P>
            Users are encouraged to review the privacy policies of third-party services to understand how they collect and use data. This information can be found in{' '}
            <a href="/privacy-policy#annex-i" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>Annex I of the Privacy Policy</a>.
            {' '}While NewME takes all reasonable steps to ensure that third-party cookies align with established data protection standards, NewME has no direct control over the information collected by them.
          </P>

          <SectionHeading>Managing cookie preferences</SectionHeading>
          <P>
            A user can manage their cookie preferences through the &lsquo;Cookie Preferences&rsquo; option on the NewME website. Additionally, most browsers provide tools to block or delete cookies. Please note that blocking cookies may affect website functionality.
          </P>
          <P>
            A user has the right to manage their cookie preferences, including refusing certain types of cookies, by accessing the &ldquo;Cookie Preferences&rdquo; tab available on NewME&apos;s website. A user may also withdraw any previously granted consent for cookies at any time. A user can delete cookies from their device by adjusting their browser settings. Most browsers provide options to block or delete cookies, though doing so may impact the ability to access certain features or functionalities of our website(s).
          </P>
          <P>
            It is important to note that unless a user&apos;s preferences are explicitly updated to prevent cookie storage, additional cookies may continue to be stored on their device.
          </P>

          <SectionHeading>User rights and consent</SectionHeading>
          <P>
            By using NewME&apos;s website and services, a user acknowledges and consents to the use of cookies and similar technologies as described in this Policy. Users retain the right to withdraw their consent at any time, subject to applicable laws and regulations.
          </P>

          <SectionHeading>Contact information</SectionHeading>
          <P>
            Should a user have any questions, concerns, or requests related to this Cookie Policy or the use of cookies on NewME&apos;s website, they can contact NewME at{' '}
            <a href="mailto:info@drpalsnewme.com" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>
              info@drpalsnewme.com
            </a>.
          </P>

        </section>
      </main>
      <Footer />
    </>
  )
}
