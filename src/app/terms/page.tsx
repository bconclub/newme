import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Dr. Pal\'s NewME',
  description: 'Terms and Conditions governing participation in NewME\'s programs and services provided by NEWME.FIT LLC.',
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

function P({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      className="font-[family-name:var(--font-urbanist)]"
      style={{ fontSize: 'clamp(14px,calc(15/1920*100vw),15px)', lineHeight: 1.75, color: '#374151', marginBottom: 12, ...style }}
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

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-[family-name:var(--font-urbanist)]"
      style={{ fontSize: 'clamp(13px,calc(14/1920*100vw),14px)', lineHeight: 1.7, color: '#6b7280', fontStyle: 'italic', marginBottom: 12 }}
    >
      {children}
    </p>
  )
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '8px 0' }} />
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#fff' }}>

        {/* ── Hero ── */}
        <section style={{ background: 'var(--color-pine-teal)', paddingTop: 'clamp(80px,calc(120/1920*100vw),120px)', paddingBottom: 'clamp(48px,calc(72/1920*100vw),72px)', paddingLeft: 'clamp(20px,calc(80/1920*100vw),80px)', paddingRight: 'clamp(20px,calc(80/1920*100vw),80px)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>
              Legal
            </p>
            <h1 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(28px,calc(48/1920*100vw),48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              Terms and Conditions
            </h1>
            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(14px,calc(16/1920*100vw),16px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              These Terms govern your participation in NewME&apos;s Programs and Services provided by NEWME.FIT LLC. Please read them carefully before proceeding.
            </p>
          </div>
        </section>

        {/* ── Body ── */}
        <section style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(40px,calc(72/1920*100vw),72px) clamp(20px,calc(40/1920*100vw),40px) clamp(60px,calc(100/1920*100vw),100px)' }}>

          <SectionHeading n={1}>Acceptance of Terms and Conditions</SectionHeading>
          <P>
            By participating in NewME&apos;s Program and/or Service offerings, a user agrees to comply with the following Terms and Conditions (hereinafter referred to as &ldquo;Terms&rdquo;). These Terms govern a user&apos;s participation and Services provided by the Company NEWME.FIT LLC (hereinafter referred to as &ldquo;NewME&rdquo;). Users acknowledge and agree that they are medically fit to undertake the Programs and Services offered by NewME at their sole risk and responsibility.
          </P>

          <SectionHeading n={2}>Description of Services</SectionHeading>
          <P>
            At NewME, we offer a range of programs designed to help users build healthy habits and sustainable lifestyle changes, and to empower users with tools, strategies and guidance to improve overall wellness. We adopt a practical, holistic, and evidence-based approach to design lifestyle changes to manage metabolic disorders and to address certain health goals.
          </P>
          <P>
            Each Program and Service offering is tailored to suit a user&apos;s unique goals and focuses on areas such as nutrition, fitness, stress management and habit formation to help users achieve sustainable lifestyle changes. Each Program and Service combines personalized coaching, and group sessions, and helps set achievable goals that are tailored to individual goals. Programs may be fully customized to align with a user&apos;s schedule.
          </P>
          <P>
            NewME&apos;s dedicated team of virtual health coaches may serve as health educators, partners, and self-care advocates for users. They help empower users through education, support, and actionable guidance, helping them navigate their health journey and achieve measurable results.
          </P>
          <P>NewME offers specialized programs, including but not limited to:</P>
          <Ul>
            <Li>Reset</Li>
            <Li>Rebuild</Li>
            <Li>Sustain</Li>
            <Li>GI &ndash; Core</Li>
            <Li>GI &ndash; Advanced</Li>
            <Li>NewME 360</Li>
            <Li>NewME Movement</Li>
          </Ul>
          <P>
            The services and programs are provided via NewME&apos;s Website (&ldquo;Website&rdquo;) and Mobile Application (&ldquo;App&rdquo;), as well as through other modes of communication such as email, video conferencing, chat interface, and other platforms.
          </P>

          <SectionHeading n={3}>Definitions</SectionHeading>
          <P>For the purposes of these Terms:</P>
          <Ul>
            <Li><strong>&ldquo;Community Guidelines&rdquo;</strong> refers to the set of rules, principles and standards established by NewME to ensure a safe, respectful, and inclusive environment for all users using the Services or participating in the Program. The detailed Community Guidelines are outlined in Annexure B.</Li>
            <Li><strong>&ldquo;Content&rdquo;</strong> refers to any information, data, or creative material, including but not limited to video, audio, photograph, images, animations, text, ideas, communications, messages, comments, software scripts, workouts and workout data, meal plans, fitness and training plans, nutrition information, copyrights, trademarks, patents, branding, logo and other intellectual property, applications and other assets, all of which may be provided, generated or made accessible through NewME&apos;s Programs or Services.</Li>
            <Li><strong>&ldquo;NewME Content&rdquo;</strong> means all content that is not User-Generated Content, including but not limited to materials and resources developed and curated by NewME for the Program.</Li>
            <Li><strong>&ldquo;User-Generated Content&rdquo;</strong> means any content generated by users as Service users or Program participants, that is submitted, shared or otherwise provided through the use of any of NewME&apos;s services or participation in any of NewME&apos;s Programs.</Li>
            <Li><strong>&ldquo;User&rdquo;</strong> refers to any individual who registers for, or accesses, or utilizes the services provided by NewME and/or enrolls in any of the Program(s) or Service(s) offered by NewME. By engaging as a user, a user agrees to abide by NewME&apos;s Terms, Community Guidelines, and any additional policies associated with the Services and Program(s).</Li>
            <Li><strong>&ldquo;Program&rdquo;</strong> refers to the specific wellness plan selected by the user from NewME&apos;s portfolio of offerings. Each Program is a structured, goal-oriented plan designed to address specific user&apos;s goals or objectives. Program(s) may include services like virtual coaching, progress tracking, and personalized plans. Programs may be updated and modified by NewME to improve user outcomes and/or for operational purposes. Programs provided by NewME are intended as lifestyle management plans and are <strong>NOT</strong> substitutes for medical treatment or professional healthcare services. NewME does <strong>NOT</strong> diagnose, treat, or cure any medical condition. Users must consult their physician / healthcare provider before starting, during, and after any Program.</Li>
            <Li><strong>&ldquo;Services&rdquo;</strong> refers to the collective offerings provided by NewME, including but not limited to personalized coaching, education, tailored program design, virtual support, and any additional guidance or resources offered as part of any of NewME&apos;s Programs and Services. Services may be updated and modified by NewME to improve user outcomes and/or for operational purposes. Services provided by NewME are intended as lifestyle management plans and are <strong>NOT</strong> substitutes for medical treatment or professional healthcare services. NewME does <strong>NOT</strong> diagnose, treat, or cure any medical condition. Users must consult their physician / healthcare provider before starting, during, and after any Service.</Li>
          </Ul>

          <SectionHeading n={4}>Nature of NewME&apos;s Offerings</SectionHeading>

          <SubHeading>Acknowledgement of Scope</SubHeading>
          <P>The user acknowledges that NewME provides its services through its team of professionals and experts. The services made available through the Platform are provided solely by professionals and experts who are employed by, affiliated with, or contracted by NewME. All advice, recommendations, suggestions, programs, and plans delivered through NewME are based exclusively on the information supplied by the client.</P>

          <SubHeading>Neither Medical Advice Nor a Substitute for Medical Advice</SubHeading>
          <P>The services are limited in scope and are neither intended as medical advice, nor to replace, supplement comprehensively, or serve as a substitute for the client&apos;s relationship with their primary care physician or other treating healthcare providers. NewME does not guarantee that consultations are appropriate for every condition or circumstance. Certain conditions may require in-person evaluation, diagnostic testing, laboratory services, imaging, physical examination, or emergency intervention that cannot be provided through NewME.</P>
          <P>By using NewME&apos;s Website and App, the client acknowledges and agrees that: (a) the service provided is not medical in nature and (b) the accuracy and completeness of all advice provided depends on the accuracy and completeness of the information provided by the client.</P>

          <SubHeading>Not an Emergency Service</SubHeading>
          <P>Clients are solely responsible for seeking emergency medical assistance or in-person care when appropriate, including by calling 911 or visiting the nearest emergency department in the event of a medical emergency. Nothing contained on NewME&apos;s Website and App, including communications with NewME, shall be construed as creating a guarantee, warranty, or assurance regarding any specific medical outcome. To the fullest extent permitted by applicable law, NewME disclaims all warranties, express or implied, regarding the telemedicine services, including any implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</P>

          <SubHeading>HIPAA Compliance</SubHeading>
          <P>NewME maintains administrative, physical, and technical safeguards designed to protect protected health information (&ldquo;PHI&rdquo;) in accordance with applicable provisions of the Health Insurance Portability and Accountability Act of 1996 (&ldquo;HIPAA&rdquo;) and related regulations. However, the client acknowledges that no electronic transmission or storage system can be guaranteed to be completely secure, and NewME disclaims liability for unauthorized access or disclosure except as required by applicable law.</P>

          <SubHeading>Not a Substitute for the User&apos;s Healthcare Provider</SubHeading>
          <P>The user expressly acknowledges and agrees that NewME is not a substitute for their professional healthcare provider or physician. Before participating in any Program, Service, activity, exercise, diet, or use of any product, program, workout, exercise or treatments discussed in the Program or Service, the user must consult with a licensed physician. NewME provides fitness and wellness programs and does <strong>NOT</strong> offer medical diagnoses, treatment, or cure for any medical condition. Any and all medical concerns or conditions must be addressed by the user with a physician or licensed healthcare professional. The advisory, information, personalised plans, Program and Service offerings are NOT a substitute for emergency or ongoing medical care. If you are experiencing a medical emergency, please contact your physician or healthcare provider or local emergency services at the earliest.</P>

          <SubHeading>User Responsibility</SubHeading>
          <P>The user acknowledges and agrees that any reliance on the advice, opinions, ideas and suggestions of any person associated with NewME is at their sole discretion and risk. Users are responsible to consult with and follow up with their physicians or other qualified healthcare providers or medical professionals regarding any health issues, concerns, or medical conditions that arise before, during or after participation in the Program.</P>

          <SubHeading>Service Limitation</SubHeading>
          <P>The user acknowledges and agrees that Programs and Services offered by NewME are strictly limited to lifestyle management and related guidance. NewME and its parties are under no obligation to diagnose, treat, or counsel users regarding any medical or health conditions discovered, evaluated, or discussed during the Program. The user acknowledges and agrees that the services provided by NewME and/or its agents, including but not limited to healthcare professionals, dieticians, fitness coaches, and other professionals, under the Program or Service are not a substitute for the advice from their primary healthcare provider.</P>
          <P><strong>No warranty for the lifestyle management services:</strong> The user agrees that NewME and its agents do not warrant the accuracy, completeness, or adequacy of the lifestyle management services for any medical or treatment-related purposes. By agreeing to these Terms and Conditions, you indicate your awareness of this clause and its application.</P>

          <SectionHeading n={5}>User Obligations</SectionHeading>

          <SubHeading>Active Participation</SubHeading>
          <P>The user agrees to actively engage with the Program or Service offered by NewME, which includes but is not limited to responding to communications, attending scheduled sessions, and completing assigned activities. The user acknowledges that the information they provide is vital for their progress tracking under the Program and agree to the usage of such information by NewME.</P>

          <SubHeading>Accurate Reporting</SubHeading>
          <P>The User will provide accurate and timely updates on their lifestyle metrics, including but not limited to, water intake, calorie consumption, sleep patterns, and exercise routines. The user understands that inaccurate reporting may affect the user&apos;s end results.</P>

          <SubHeading>Disclosure of Health Information</SubHeading>
          <Ul>
            <Li>The user must disclose any pre-existing medical conditions, medications, or other relevant health factors during onboarding. Failure to disclose any relevant health information may result in adverse outcomes, for which NewME holds no liability.</Li>
            <Li>The user is required to disclose their complete medical history to NewME at the time of induction. Where required, NewME may need a user to obtain a certificate from a physician or doctor that they are in proper physical condition to undertake the Program offered at NewME.</Li>
            <Li>The user acknowledges and agrees to disclose to NewME at the earliest if they are pregnant or are planning pregnancy or are a lactating mother.</Li>
            <Li>NewME shall in no way be responsible for the user and their health and safety if the user fails to disclose their medical conditions to us.</Li>
          </Ul>

          <SubHeading>Third-Party Applications</SubHeading>
          <P>The user may be required to use third-party apps to monitor and track progress in the Program. The user agrees to comply with the terms and conditions applicable to such third-party applications.</P>

          <SectionHeading n={6}>Privacy and Confidentiality</SectionHeading>

          <SubHeading>Data Usage</SubHeading>
          <P>Any personal and health information a user provides will be used solely for Program / Service / Research purposes and kept confidential in accordance with NewME&apos;s <a href="/privacy-policy" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>Privacy Policy</a>.</P>

          <SubHeading>Group Communication Limits</SubHeading>
          <P>Features of the Programs and Services include but are not limited to group video call discussions, online training sessions, interactive forums, and discussion groups (&ldquo;Interactive Areas&rdquo;), where users may interact with others, including but not limited to other users, trainers and health professionals. While NewME strives to maintain confidentiality, NewME cannot guarantee it in Interactive Areas. Users are advised and encouraged to avoid disclosing personal information or sensitive health information in Interactive Areas. Any such information voluntarily disclosed by the user in the Interactive Areas shall be the user&apos;s sole responsibility. NewME shall not be held liable for any consequences arising from such disclosures.</P>

          <SubHeading>Data Security Measures</SubHeading>
          <P>NewME employs industry-standard measures to protect user data and prevent any unauthorized access, sharing or misuse of data.</P>

          <SectionHeading n={7}>Payments and Fees</SectionHeading>
          <Ul>
            <Li>The fees for participation in the Programs and Services shall be determined based on the specific Program selected by the user.</Li>
            <Li>Unless otherwise agreed, all invoices for fees are due and payable in full upon receipt. NewME may suspend or terminate the access to Program or Services if the user fails to make timely payments.</Li>
            <Li>NewME reserves the right to revise or adjust the fees associated with the Program. In the event of any change in fees, NewME will provide reasonable prior notice to the user.</Li>
            <Li>NewME may utilize third-party payment processors to facilitate transactions, and the user agrees to comply with the terms and conditions applicable to the payment process.</Li>
          </Ul>

          <SectionHeading n={8}>Refunds, Non-transferability of Participation, Program Termination</SectionHeading>

          <SubHeading>Refund Policy (NewME Programs)</SubHeading>
          <P>NewME offers a 100% refund if requested within 7 days from the program start date. From the 8th day onwards, refunds will be processed based on monthly blocks:</P>
          <Ul>
            <Li>Day 8 to 30 &rarr; 1 month considered</Li>
            <Li>Day 31 to 60 &rarr; 2 months considered</Li>
            <Li>Day 61 to 90 &rarr; 3 months considered</Li>
            <Li>Subsequent blocks will be processed in and based on 30-day blocks</Li>
          </Ul>
          <P>Once a new month begins, that month&apos;s fee becomes non-refundable, regardless of how many days have been completed. Refunds (minus any applicable bank or transaction charges) will be processed within 7 working days after the request is approved. All enrolments are subject to a 30-day activation window from the date of purchase. In the event the user does not initiate the program within this period, the enrolment shall stand forfeited and no refund, extension, or transfer shall be permitted. To request a refund, write to NewME at{' '}<a href="mailto:support@drpalsnewme.com" style={{ color: 'var(--color-pine-teal)', textDecoration: 'underline' }}>support@drpalsnewme.com</a>.</P>

          <SubHeading>Non-transferability of Participation</SubHeading>
          <P>Participation and enrolment in NewME&apos;s Programs and Services are non-transferable. Regardless of the reason and circumstances, when a user enrols in a Program or Service, such a Program or Service cannot be continued by another individual if the user wishes to terminate or opt out of the Program.</P>

          <SubHeading>Termination by User</SubHeading>
          <Ul>
            <Li>If a user wishes to terminate their participation in the Program, they must provide at least seven (7) days&apos; notice to NewME.</Li>
            <Li>Non-response by a user for seven (7) consecutive days will be considered withdrawal from the Program or Service by the user. In the event of non-response, no refund shall be provided to the user by NewME.</Li>
          </Ul>

          <SubHeading>Termination by NewME</SubHeading>
          <Ul>
            <Li>NewME reserves the right to terminate a user&apos;s participation in the Program or Service if NewME is unable to provide the Program or Services for reasons beyond NewME&apos;s control. In such cases, NewME shall give users at least seven (7) days&apos; notice of termination and provide pro rata refund for the services that have not been provided.</Li>
            <Li>NewME reserves the right to terminate a user&apos;s participation in the Program or Service without notice for the breach of these terms and conditions or the spirit thereof. In the cases of such a breach and consequent termination, no refund shall be provided to the user.</Li>
            <Li>NewME reserves the right to terminate or suspend a user&apos;s participation in the Program or Service at any time under the following circumstances: if, at NewME&apos;s sole discretion, a user is found to have violated the Community Guidelines; if a user&apos;s actions or participation has been determined to pose a risk or potential legal liability to NewME, the public, any third party, or other users in the Program; or in response to any legal notice.</Li>
          </Ul>
          <Note>Please note that applicable platform processing fees may be deducted in the event of a refund.</Note>

          <SectionHeading n={9}>Limitation of Liability</SectionHeading>
          <P>To the maximum extent permitted by applicable law, NewME, its affiliates, subsidiaries, partners, or third-party service providers shall not be liable to a user or any third party for any indirect, incidental, special, exemplary, punitive, or consequential damages, including but not limited to loss of profits, revenue, data, goodwill, or other intangible losses, even if advised of the possibility of such damages. To the maximum extent permitted by applicable law, NewME&apos;s total direct liability for any claims under these Terms, including for any implied warranties, shall not exceed the total fees paid by the user for the applicable Program or Services in the preceding three (3) months.</P>

          <SectionHeading n={10}>Indemnification</SectionHeading>
          <P>The user agrees to indemnify, defend, and hold harmless NewME, its affiliates, partners, and service providers from any losses, expenses, damages, liabilities, and costs (including legal fees) arising from:</P>
          <Ul>
            <Li>Any false, incorrect, or incomplete information provided by the user, including declarations or disclosures;</Li>
            <Li>Any injury, illness, or adverse health effects that the user may incur endure or suffer, during the course(s) of the Program or while availing the Service, or as a result thereof;</Li>
            <Li>Any injury, illness, or harm that the user may cause to any other user or observer of the Program or any third party;</Li>
            <Li>Any actions taken by NewME in response to any injury, illness or incident involving the user.</Li>
          </Ul>

          <SubHeading>Assumption of Risk and Release of Liability</SubHeading>
          <P>By participating in the Program or Service, a user acknowledges and agrees that they have fully read and understood all the associated risks and accept the associated risks. Users voluntarily waive any claims against NewME for any injury, illness, or adverse outcome resulting from their participation. The user agrees and acknowledges that this indemnification extends to any liability for injury or death of any person and/or damage to property caused by their negligent or intentional acts or omissions.</P>

          <SubHeading>Waiver of Claims</SubHeading>
          <P>The user confirms that they consciously waive claims against NewME, and that they are being made fully aware of all risks.</P>

          <SectionHeading n={11}>No Warranties</SectionHeading>
          <P>Unless prohibited by applicable law, NewME expressly disclaims all warranties, representations, and guarantees of any kind, whether oral or written, express, implied, statutory, or otherwise, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. All Services and Content are provided on an &ldquo;as is&rdquo; basis and &ldquo;as available&rdquo; basis, with all faults.</P>
          <P>Without limiting the foregoing, and to the maximum extent permitted by applicable law, NewME makes no warranties or representations regarding the quality, accuracy, timeliness, truthfulness, completeness, availability, or reliability of any Services or any Content; and the Services and/or the Program meeting the user&apos;s specific needs or producing specific results. Any advice or information, whether oral or written, provided by NewME or its agents does not and will not create any warranty not expressly stated in these Terms.</P>
          <P>Additionally, NewME makes no warranties or representations regarding any user-generated or third-party content accessed through the Services or participation in the Program. Content shared by users or third parties, as such content is solely the responsibility of the respective users or third parties providing it.</P>

          <SubHeading>Assumption of Risk</SubHeading>
          <P>By using the Services or participating in the Program, the user acknowledges and accepts that their use of the Services and participation in the Program is at their sole risk.</P>

          <SectionHeading n={12}>Consistency and Outcomes</SectionHeading>
          <P>The success/outcome of the Program or Service depends on the user&apos;s commitment to following the guidance/advice provided. Failure to adhere to instructions or attend scheduled sessions may result in less effective outcomes. NewME or its agents will not be held responsible for unsatisfactory results if the Program guidelines are not followed.</P>

          <SubHeading>No guaranteed outcomes</SubHeading>
          <P>Neither NewME nor its agents guarantee specific results from participation in the Programs or Services. The user acknowledges that refunds or compensation will not be provided for any reason, including dissatisfaction.</P>

          <SectionHeading n={13}>Intellectual Property Rights</SectionHeading>
          <P>All NewME Content and all copyright, trademarks, design rights, patents and other intellectual property rights in the Program and Services belong to NewME and/or its partners or applicable third parties. NewME holds ownership of the marks used on our Website and App and these marks are protected by both US and international trademark laws. All trademarks displayed on NewME&apos;s Website and App and in downloaded materials, whether or not accompanied by the trademark symbol(s), remain the property of NewME. Users are permitted to use NewME&apos;s trademarks for non-commercial, non-infringing purposes, such as when referring to NewME in conversations, but users must not use them in a way that could mislead others regarding ownership or cause harm to NewME or the trademark owner.</P>
          <P>Subject to the user&apos;s compliance of these Terms, NewME grants the user a limited, revocable, non-transferable, and non-exclusive right and license to access and use the NewME Content for their own personal, non-commercial purposes. Unless expressly provided herein, a user is strictly prohibited from using the NewME Content for commercial, business, or resale purposes.</P>
          <P>By participating in the Program, the user consents to the use of their Participant-generated Content, including but not limited to photographs, videos, audio recordings, written content, testimonials, and reviews for promotional and marketing purposes, without any entitlement to compensation.</P>
          <P>After the completion of the Program or termination by Participant or NewME, NewME may retain the Participant-generated Content and continue to use, store, display, reproduce, share, modify, create derivative works, perform, and distribute the user&apos;s Participant-generated Content that otherwise has been shared and/or stored through the participation in the Program or the use of Services. However, if the user wishes to have any of their User-generated Content removed from NewME&apos;s records, promotional materials, or platforms, the user may submit a written request to NewME. NewME will review such requests and, at its sole discretion, determine whether removal is feasible, subject to operational, contractual and legal considerations.</P>

          <SectionHeading n={14}>Governing Law and Dispute Resolution</SectionHeading>
          <P>These Terms shall be governed by, and construed in accordance with, the laws of the State of Nevada, without regard to its conflicts of law principles.</P>
          <P>The user and NewME agree to resolve any disputes that may emerge from their engagement in good faith. If the dispute cannot be resolved within thirty (30) days, both the Parties agree to submit to resolve the dispute through mediation. Each party shall bear its own costs and expenses associated with the mediation process.</P>
          <P>If the dispute is not resolved through mediation, all and any disputes, legal action or proceeding arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Nevada.</P>
          <P>The user and NewME agree that, if for any reason, a dispute proceeds in court rather than mediation: the user and NewME waive any right to a jury trial; the dispute will proceed solely on an individual, non-class, non-representative basis; and neither the user nor NewME may be a class representative or class member or participate in any class proceeding.</P>
          <P>Notwithstanding the contrary, these Terms shall not preclude the user or NewME from applying to the appropriate court of competent jurisdiction and seeking temporary restraining orders, preliminary injunctions or other interim relief in court, or filing claims in any state or federal court for disputes related to the violation or potential violation of NewME&apos;s intellectual property rights.</P>

          <SectionHeading n={15}>International Use and Compliance</SectionHeading>
          <P>If the user is not a resident of the United States and are accessing NewME&apos;s Services or Programs from outside the United States, they acknowledge and agree to the transfer, storage, and processing of certain information outside their location to NewME. Furthermore, the user agrees to comply with all applicable laws in their jurisdiction.</P>
          <P>As NewME&apos;s primary operations are based in the United States, the user consents to the transfer, storage, and processing of their information, including but not limited to Participant-Generated Content and any personal data, to and within the United States and/or other countries where NewME or its service providers operate.</P>

          <SectionHeading n={16}>Survival of Terms upon Termination</SectionHeading>
          <P>The user and NewME agree that the provisions of the terms that are intended to survive termination in order to fulfill their intent and purpose will remain in full force and effect. These terms shall include but are not limited to:</P>
          <Ul>
            <Li>Ownership of Content</Li>
            <Li>Nature of NewME&apos;s Offerings</Li>
            <Li>No Warranties</Li>
            <Li>Limitation of Liability</Li>
            <Li>Indemnification</Li>
            <Li>Governing Law and Dispute Resolution</Li>
            <Li>Survival</Li>
          </Ul>

          <SectionHeading n={17}>Electronic Communication and Consent</SectionHeading>
          <Ul>
            <Li>By enrolling in the Program, the user consents to receiving electronic communications, including email, WhatsApp messages, and other digital notifications, from NewME.</Li>
            <Li>The user&apos;s availing of Services or participation in NewME&apos;s Programs signifies acceptance of these Terms and forms a legally binding agreement between the user and NewME.</Li>
            <Li>The user agrees that all agreements, notices, disclosures and other communications that are provided to the user electronically satisfy any legal requirement that such communications be in writing.</Li>
          </Ul>

          <SectionHeading n={18}>Miscellaneous</SectionHeading>

          <SubHeading>Amendment</SubHeading>
          <P>NewME reserves the right to modify these terms and conditions from time to time. All modifications and changes to the terms and conditions shall be communicated to the Participant through NewME&apos;s official Website and App. If there are any material modifications to the terms and conditions, the advance notice of the same shall be provided through our Website and App, and via email, where feasible. Unless otherwise required by law, modifications will not be applied retrospectively.</P>

          <SubHeading>Non-transferability of Rights</SubHeading>
          <P>The rights and obligations conferred under these terms and conditions are personal to the Participant and are non-transferable. Any attempt to assign or transfer rights under these Terms to a third party shall be invalid without the prior written consent of the Company.</P>

          <SubHeading>Notice</SubHeading>
          <Ul>
            <Li>NewME&apos;s communication with the user via email, mail, or notices displayed through the services constitutes acceptable notice under these Terms. The user is responsible to ensure that their contact information is up to date.</Li>
            <Li>NewME shall not be held responsible for any failure on the user&apos;s part to receive notice, including instances where emails are filtered by the email security system or where the user has not updated their contact information.</Li>
            <Li>All the notices sent via email or mail shall be deemed received after forty-eight (48) hours after being sent.</Li>
          </Ul>

          <P style={{ marginTop: 24, fontStyle: 'italic' }}>By participating in the Program, users acknowledge that they have read, understood, and agreed to these Terms and Conditions. If a user has any questions, they may contact NewME before proceeding further.</P>

          {/* ── Annexure B ── */}
          <Divider />
          <div style={{ marginTop: 48 }}>
            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-pine-teal)', marginBottom: 8 }}>
              Annexure B
            </p>
            <h2 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(18px,calc(22/1920*100vw),22px)', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
              Community Guidelines
            </h2>
            <P>Some features of the Program include but are not limited to group video call discussions, online training sessions, interactive forums and discussion groups, where you may interact with others, including but not limited to participants, trainers and health professionals. You are solely responsible for the use of the above-mentioned interactive areas. You should never post any Personal Data in the above-mentioned interactive areas. We assume no responsibility or liability for any loss or damage resulting from interactions with other participants in the Program, individuals who you meet while participating in our Program or individuals who may find you because of your participation in the interactive forums. NewME shall have no responsibility and liability arising out of or in connection with any dispute between the Participants.</P>
            <P>We, at NewME, strive to create a safe, supportive and inclusive environment for all. By engaging in our Program, you agree to follow the Community Guidelines mentioned herein. Violation may result in suspension or termination of access to our Program.</P>

            <SubHeading>Respect and Inclusivity</SubHeading>
            <Ul>
              <Li>Always treat fellow participants, moderators, speakers and trainers with courtesy and respect.</Li>
              <Li>Do not post or share any content that is harassing, abusive, threatening, or embarrassing to others.</Li>
              <Li>Do not make any derogatory comments about sex, gender, age, weight, body type, disability, ethnicity, religion, or sexual orientation. We highly condemn any stereotypes and endorsements of violence are strictly prohibited.</Li>
            </Ul>

            <SubHeading>Appropriate Content</SubHeading>
            <Ul>
              <Li>Do not share any kind of defamatory, obscene, pornographic, offensive, or hateful material.</Li>
              <Li>Kindly ensure that your contributions to discussions are constructive and relevant.</Li>
              <Li>Disagreeing in community discussions is acceptable. However, you must do so respectfully without mocking or insulting others.</Li>
            </Ul>

            <SubHeading>Safety and Well-being</SubHeading>
            <Ul>
              <Li>Do not endorse or share unsafe practices such as extreme dieting or unapproved weight loss methods.</Li>
              <Li>Do not share content that promotes harmful behaviours such as self-starvation or purging.</Li>
              <Li>Always protect the safety of minors and other participants.</Li>
            </Ul>

            <SubHeading>Privacy and Confidentiality</SubHeading>
            <Ul>
              <Li>Do not share personal or private information of yourself or others, including addresses, phone numbers, or sensitive data, including health information.</Li>
              <Li>Do not post private communications including but not limited to emails and text messages without explicit consent of the relevant person(s).</Li>
            </Ul>

            <SubHeading>Intellectual Property and Legal Use</SubHeading>
            <Ul>
              <Li>You must share only the content you own or have the legal right to use.</Li>
              <Li>Do not post or distribute materials that infringe on intellectual property rights.</Li>
              <Li>Do not share content that breaches any legal duty or contractual obligation.</Li>
            </Ul>

            <SubHeading>Identity and Misinformation</SubHeading>
            <Ul>
              <Li>Do not impersonate others or misrepresent your identity.</Li>
              <Li>Do not post deceptive content, fraudulent links, or misinformation.</Li>
            </Ul>

            <SubHeading>No Disruptive Behaviours</SubHeading>
            <Ul>
              <Li>Do not spam, flood forums or post unsolicited advertisements.</Li>
            </Ul>

            <SubHeading>General Conduct</SubHeading>
            <Ul>
              <Li>You must participate in discussions in good faith and we urge you to stay on topic.</Li>
              <Li>Do not involve in trolling or flame-baiting or provoking others.</Li>
              <Li>Ensure that your actions contribute positively to the community.</Li>
            </Ul>

            <P>If we, in our sole discretion, determine that you are violating the above-mentioned Community Guidelines, NewME reserves the right to remove content that violates these guidelines, suspend or terminate access for users who breach the rules, and report serious violations to appropriate law enforcement, if necessary.</P>
            <P>By participating in NewME Program, you agree to uphold these Community Guidelines and contribute to a positive and supportive environment for everyone. Thank you for being a valued member of the Community.</P>
            <P>While we strive to monitor violations of these Community Guidelines, we cannot guarantee that all Participants will comply with such Guidelines at all times. NewME shall not be held responsible or liable for any injury, harm, or inconvenience caused by objectionable Participant-Generated Content or another participant&apos;s failure to comply with the Community Guidelines or these terms. If you believe or suspect that any other participant is violating the Community Guidelines, kindly report it to our support team at NewME.</P>
          </div>

        </section>
      </main>
      <Footer />
    </>
  )
}
