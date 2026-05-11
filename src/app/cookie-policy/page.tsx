import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | Dr. Pal\'s NewME',
  description: 'How drpalsnewme.com uses cookies and similar technologies.',
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

function Table({ rows }: { rows: [string, string, string, string][] }) {
  const headers = ['Cookie', 'Type', 'Purpose', 'Duration']
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table
        className="font-[family-name:var(--font-urbanist)]"
        style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'clamp(13px,calc(14/1920*100vw),14px)' }}
      >
        <thead>
          <tr style={{ background: 'var(--color-pine-teal)' }}>
            {headers.map(h => (
              <th key={h} style={{ color: '#fff', fontWeight: 600, padding: '10px 14px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#f9fafb' : '#fff', borderBottom: '1px solid #e5e7eb' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '10px 14px', color: '#374151', verticalAlign: 'top' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
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

          <SectionHeading>What are cookies?</SectionHeading>
          <P>
            Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to the site owner. We also use similar technologies such as local storage for the same purposes.
          </P>

          <SectionHeading>How we use cookies</SectionHeading>
          <P>
            drpalsnewme.com uses cookies to keep the site functioning correctly, remember your preferences, and understand how visitors use the site so we can improve it. We do not use cookies to serve third-party advertising.
          </P>

          <SectionHeading>Cookies we set</SectionHeading>

          <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, marginTop: 20 }}>Essential</p>
          <Table rows={[
            ['cookie_accepted', 'Functional', 'Records that you have dismissed the cookie notice so it is not shown again.', 'Persistent (localStorage)'],
            ['__session', 'Functional', 'Maintains your session state while navigating the site.', 'Session'],
          ]} />

          <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, marginTop: 24 }}>Analytics (if enabled)</p>
          <Table rows={[
            ['_ga', 'Analytics', 'Google Analytics — distinguishes unique users by assigning a randomly generated number as a client identifier.', '2 years'],
            ['_ga_*', 'Analytics', 'Google Analytics — stores and counts pageviews.', '2 years'],
          ]} />

          <SectionHeading>Third-party cookies</SectionHeading>
          <P>
            Some pages embed content or tools from third-party services (such as Calendly for appointment scheduling). These services may set their own cookies subject to their respective privacy policies. We do not control these cookies.
          </P>

          <SectionHeading>Your choices</SectionHeading>
          <P>
            You can control and delete cookies through your browser settings. Removing or blocking essential cookies may affect the functionality of the site. Most browsers also support private/incognito mode which prevents cookies from being stored after the session ends.
          </P>
          <P>
            To opt out of Google Analytics tracking across all websites, you can install the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>
              Google Analytics Opt-out Browser Add-on
            </a>.
          </P>

          <SectionHeading>Changes to this policy</SectionHeading>
          <P>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated date at the top.
          </P>

          <SectionHeading>Contact</SectionHeading>
          <P>
            If you have questions about our use of cookies, please contact us at{' '}
            <a href="mailto:support@drpalsnewme.com" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>
              support@drpalsnewme.com
            </a>.
          </P>

        </section>
      </main>
      <Footer />
    </>
  )
}
