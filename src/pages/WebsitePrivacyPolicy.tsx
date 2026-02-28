import { Link } from "react-router-dom";
import StarBackground from "@/components/website/StarBackground";
import HorizonCurve from "@/components/website/HorizonCurve";
import orahLogo from "@/assets/orah-logo.png";

const WebsitePrivacyPolicy = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <StarBackground />
      <HorizonCurve />

      <Link to="/website" className="absolute top-6 left-6 z-20 flex items-center gap-3 animate-fade-up hover:opacity-80 transition-opacity">
        <img src={orahLogo} alt="ORAH" className="w-10 h-10 md:w-12 md:h-12" />
        <span className="text-foreground font-bold text-lg md:text-xl tracking-wide">ORAH</span>
      </Link>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-8 animate-fade-up">
          ORAH Privacy Policy
        </h1>

        <p className="text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <strong>Last Updated:</strong> December 2025
        </p>

        <hr className="border-border/30 mb-8" />

        <section className="space-y-8 text-foreground/90 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              ORAH ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website (getorah.com) or use our services.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              By using our website or services, you agree to the terms of this Privacy Policy.
            </p>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">Information You Provide</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and business name when you fill out forms or book a consultation.</li>
              <li><strong>Business Information:</strong> Details about your business that you share during consultations or through our services.</li>
              <li><strong>Communication Records:</strong> Messages and correspondence you send to us.</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-3">Information Collected Automatically</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Usage Data:</strong> Pages visited, time spent on site, clicks, and navigation patterns.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device type, and IP address.</li>
              <li><strong>Cookies:</strong> Small data files stored on your device to improve your experience.</li>
            </ul>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide and improve our services</li>
              <li>Respond to your enquiries and schedule consultations</li>
              <li>Send relevant updates about our services (with your consent)</li>
              <li>Analyse website performance and user behaviour</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We do <strong>not</strong> sell your personal information to third parties.
            </p>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">We may use trusted third-party services to operate our business:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Calendly:</strong> For scheduling consultations</li>
              <li><strong>Google Analytics:</strong> For website analytics</li>
              <li><strong>Payment Processors:</strong> For processing transactions (if applicable)</li>
              <li><strong>Email Marketing Platforms:</strong> For sending communications (with your consent)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              These providers have their own privacy policies governing the use of your information.
            </p>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Cookies</h2>
            <p className="text-muted-foreground mb-4">Our website uses cookies to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Remember your preferences</li>
              <li>Understand how you use our site</li>
              <li>Improve your browsing experience</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You can disable cookies in your browser settings, though some features may not function properly.
            </p>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement reasonable security measures to protect your personal information from unauthorised access, alteration, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise any of these rights, contact us at the details below.
            </p>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.
            </p>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
            </p>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </div>

          <hr className="border-border/30" />

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="text-muted-foreground">
              <p><strong>ORAH</strong></p>
              <p>Email: growth@getorah.co.za</p>
              <p>Website: getorah.co.za</p>
            </div>
          </div>

          <hr className="border-border/30" />

          <p className="text-muted-foreground/70 italic text-sm">
            This policy is governed by the laws of the Republic of South Africa, including the Protection of Personal Information Act (POPIA).
          </p>
        </section>
      </div>
    </main>
  );
};

export default WebsitePrivacyPolicy;
