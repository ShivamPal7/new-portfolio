import BlurFade from "@/components/magicui/blur-fade";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for 10xApps explaining how we collect, use, store, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | 10xApps",
    description:
      "Privacy Policy for 10xApps explaining how we collect, use, store, and protect your personal information.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | 10xApps",
    description:
      "Privacy Policy for 10xApps explaining how we collect, use, store, and protect your personal information.",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function PrivacyPolicyPage() {
  return (
    <section id="privacy">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-3">
          <h1 className="title font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
            Privacy Policy
          </h1>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <p>
              <strong className="font-semibold text-foreground">
                Effective Date:
              </strong>{" "}
              November 8, 2026
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Last Updated:
              </strong>{" "}
              November 8, 2026
            </p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="my-6 flex w-full items-center">
          <div
            className="flex-1 h-px bg-border"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          />
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>10xApps</strong> (&ldquo;we,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
          </p>
          <p>
            At 10xApps, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, store, and protect information when you visit our
            website, use our applications, or interact with our products and
            services.
          </p>
          <p>
            By accessing our website or using our applications and services, you
            agree to the practices described in this Privacy Policy.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following categories of information:</p>

          <h3>Personal Information</h3>
          <ul>
            <li>Name and email address.</li>
            <li>Contact information.</li>
            <li>Account registration details.</li>
            <li>
              Information submitted through contact forms or support requests.
            </li>
          </ul>

          <h3>Technical Information</h3>
          <ul>
            <li>IP address.</li>
            <li>Device type and operating system.</li>
            <li>Browser type and version.</li>
            <li>Application usage data.</li>
            <li>Diagnostic information and crash reports.</li>
            <li>Cookies and similar tracking technologies.</li>
          </ul>

          <h3>Usage Information</h3>
          <p>
            We may collect information about how you interact with our website,
            applications, and services, including features accessed,
            interactions, and general usage patterns.
          </p>
          <p>
            The information collected depends on the particular product or
            service you use.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide, operate, and maintain our products and services.</li>
            <li>Create and manage user accounts.</li>
            <li>Improve application functionality and user experience.</li>
            <li>Respond to inquiries and customer support requests.</li>
            <li>Communicate important service updates.</li>
            <li>Monitor performance and prevent fraudulent activity.</li>
            <li>Identify and fix technical issues.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>

          <h2>4. Sharing of Information</h2>
          <p>We do not sell your personal information.</p>
          <p>
            We may share information with trusted third-party service providers
            when necessary to operate our services, including:
          </p>
          <ul>
            <li>
              <strong>Cloud hosting providers:</strong> To store and process
              application data.
            </li>
            <li>
              <strong>Analytics providers:</strong> To understand product usage
              and improve performance.
            </li>
            <li>
              <strong>Authentication providers:</strong> To securely manage user
              accounts.
            </li>
            <li>
              <strong>Payment processors:</strong> To process payments and
              subscriptions.
            </li>
            <li>
              <strong>Communication providers:</strong> To deliver emails,
              notifications, and support.
            </li>
          </ul>
          <p>
            These providers may process information on our behalf and are
            expected to protect it in accordance with applicable agreements and
            laws.
          </p>
          <p>
            We may also disclose information when required by law, to protect
            our legal rights, or to address security and fraud concerns.
          </p>

          <h2>5. Cookies and Tracking Technologies</h2>
          <p>
            Our website may use cookies and similar technologies to:
          </p>
          <ul>
            <li>Improve website functionality.</li>
            <li>Remember user preferences.</li>
            <li>Understand website traffic and usage.</li>
            <li>Analyze performance.</li>
          </ul>
          <p>
            You can manage or disable cookies through your browser settings.
            However, certain website features may not function properly if
            cookies are disabled.
          </p>

          <h2>6. Data Storage and Security</h2>
          <p>
            We take reasonable technical and organizational measures to protect
            your personal information against unauthorized access, alteration,
            disclosure, loss, or destruction.
          </p>
          <p>
            These measures may include access controls, secure communication
            protocols, encryption where appropriate, and trusted infrastructure
            providers.
          </p>
          <p>
            However, no method of electronic transmission or storage is
            completely secure. Therefore, we cannot guarantee absolute security.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain personal information only for as long as reasonably
            necessary to:
          </p>
          <ul>
            <li>Provide our services.</li>
            <li>Maintain user accounts.</li>
            <li>Fulfill legitimate business purposes.</li>
            <li>Resolve disputes.</li>
            <li>Comply with legal and regulatory requirements.</li>
          </ul>
          <p>
            When information is no longer required, we take reasonable steps to
            delete or anonymize it.
          </p>

          <h2>8. Third-Party Services and Links</h2>
          <p>
            Our website and applications may contain links to third-party
            websites, integrations, or services.
          </p>
          <p>
            10xApps does not control the privacy practices of these third
            parties. We encourage users to review their respective privacy
            policies before sharing personal information with them.
          </p>

          <h2>9. Your Privacy Rights</h2>
          <p>
            Depending on your location and applicable laws, you may have the
            right to:
          </p>
          <ul>
            <li>Request access to your personal information.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your personal information.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Request information about how your data is processed.</li>
            <li>
              Raise concerns or complaints regarding the handling of your
              personal information.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us using the details provided
            below.
          </p>
          <p>
            We will review and respond to requests in accordance with applicable
            laws.
          </p>

          <h2>10. Children&apos;s Privacy</h2>
          <p>
            Our services are not knowingly designed to collect personal
            information from children in violation of applicable laws.
          </p>
          <p>
            If you believe that a child has provided personal information to us
            without the required consent, please contact us. We will take
            appropriate steps to investigate and address the situation.
          </p>

          <h2>11. International Data Transfers</h2>
          <p>
            Depending on the services and infrastructure providers we use, your
            information may be processed or stored in countries other than your
            country of residence.
          </p>
          <p>
            Where applicable, we take reasonable steps to ensure that such
            transfers comply with relevant data protection laws.
          </p>

          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our services, business practices, or legal requirements.
          </p>
          <p>
            Any updates will be published on this page with a revised
            &ldquo;Last Updated&rdquo; date.
          </p>
          <p>We encourage you to review this page periodically.</p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy
            Policy or the handling of your personal information, please contact
            us:
          </p>
          <p>
            <strong>Company:</strong> 10xApps
            <br />
            <strong>Email:</strong>{" "}
            <a href="mailto:10xapps.team@gmail.com">
              <strong>10xapps.team@gmail.com</strong>
            </a>
          </p>
          <p>
            We will make reasonable efforts to address your concerns as soon as
            possible.
          </p>

          <div className="my-10 flex w-full items-center not-prose">
            <div
              className="flex-1 h-px bg-border"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              }}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 10xApps. All rights reserved.
          </p>
        </article>
      </BlurFade>
    </section>
  );
}
