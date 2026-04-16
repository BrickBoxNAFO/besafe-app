export const metadata = {
  title: 'Affiliate Terms & Conditions — HomeSafeEducation',
  description:
    'The terms you agree to when joining the HomeSafeEducation affiliate program: how you earn, how we pay, and the rules that keep the program fair.'
}

export default function AffiliateTermsPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-navy mb-2">Affiliate Terms &amp; Conditions</h1>
      <p className="text-navy/40 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

      <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6 mb-10">
        <p className="font-semibold text-navy mb-1">The short version</p>
        <p className="text-navy/70 text-sm leading-relaxed">
          You earn a flat 20% commission on every qualifying sale you refer. We
          track purchases through your unique referral link for 30 days. Sales
          clear the refund window after 7 days, get approved after 14, and are
          paid out between the 1st and 3rd of each month with a $25 minimum
          payout. Refunded sales are clawed back automatically and shown in
          your dashboard.
        </p>
      </div>

      <div className="prose text-navy/70 leading-relaxed space-y-10">

        {/* ======================= THE GOOD PART ======================= */}

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">1. What you earn</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>
              <strong>20% commission on every qualifying sale.</strong> Flat rate, no tiers, no moving targets.
            </li>
            <li>
              <strong>Paid in your chosen currency.</strong> We support USD, GBP, and EUR. You pick your payout currency when you sign up and can change it from your affiliate dashboard.
            </li>
            <li>
              <strong>Anyone, anywhere in the world counts.</strong> If the customer is willing to buy, and your link sent them, you get paid.
            </li>
            <li>
              <strong>Commission is calculated on the sale amount</strong> actually paid by the customer, after any coupon or discount is applied and before tax.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">2. How attribution works</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>
              <strong>30-day attribution cookie.</strong> When someone clicks your link, we drop a cookie that lasts 30 days. If they purchase any time in that window, the sale is yours.
            </li>
            <li>
              <strong>Last-click wins.</strong> If a customer clicks another affiliate&apos;s link after yours, the most recent click within the 30-day window gets credit. This is an industry-standard rule and it applies to everyone.
            </li>
            <li>
              <strong>Cross-device limitations.</strong> Attribution relies on browser cookies. If a customer clears cookies, switches browsers or devices, or buys from incognito mode, we may not be able to attribute the sale. That is a limitation of the technology, not a judgment call.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">3. When you get paid</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>
              <strong>Day 0.</strong> A customer clicks your link and purchases. The sale appears in your dashboard as <em>Pending</em>.
            </li>
            <li>
              <strong>Day 7.</strong> The customer&apos;s refund window closes. If no refund has been requested, the sale is safe.
            </li>
            <li>
              <strong>Day 14.</strong> The sale is automatically approved and flips to <em>Payable</em>.
            </li>
            <li>
              <strong>1st of the next month.</strong> All your approved, unpaid sales are rolled into a single payout batch.
            </li>
            <li>
              <strong>1st to 3rd of the month.</strong> Payouts are reviewed and sent via Stripe to the email or Stripe Connect account on your profile.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">4. Minimum payout</h2>
          <p className="text-sm">
            There is a $25 minimum payout threshold (or currency equivalent). If your approved balance is below the threshold at the start of the month, it rolls over to the following month and keeps rolling until it clears the threshold. Your balance never expires.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">5. Transparency guarantees</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>
              <strong>Every click is visible.</strong> Your dashboard shows clicks, conversions, pending commissions, approved commissions, and paid commissions in real time.
            </li>
            <li>
              <strong>Refunds are never hidden.</strong> If one of your conversions is refunded or charged back, the sale is marked <em>Refunded</em> in your dashboard with the timestamp, so you always know why your balance changed.
            </li>
            <li>
              <strong>No silent terminations.</strong> If we ever suspend your account, you will see the reason in your dashboard.
            </li>
          </ul>
        </div>

        {/* ======================= THE RULES ======================= */}

        <div className="pt-4 border-t border-navy/10">
          <p className="text-xs uppercase tracking-wide text-navy/50 font-semibold">Rules and protections</p>
          <p className="text-sm text-navy/60 mt-2">
            The clauses below exist so the program stays fair for honest affiliates. They are not a trap, but we do enforce them.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">6. Eligibility</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>You must be 18 or older. Stripe requires this for any account that receives funds.</li>
            <li>You must maintain a valid payout method (email address we can pay, or an active Stripe Connect account).</li>
            <li>You must comply with the laws of your country, including any requirement to disclose affiliate relationships to your audience.</li>
            <li>You are responsible for any income tax owed on commissions you earn.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">7. How you may promote</h2>
          <p className="text-sm">
            Share your referral link anywhere you would happily recommend a product: websites, blogs, newsletters, YouTube, Reddit, Instagram, TikTok, Facebook, WhatsApp, direct messages, and so on. The following are not allowed:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>
              <strong>Self-referral.</strong> You may not buy through your own link, or use it to get a personal discount, even via a family member or second account.
            </li>
            <li>
              <strong>Paid search on our brand.</strong> You may not bid on &quot;HomeSafeEducation&quot; or close variants in Google Ads, Bing, or similar platforms.
            </li>
            <li>
              <strong>Misrepresentation.</strong> Do not claim to be us, imply official endorsement beyond the affiliate relationship, or imply affiliation with schools, governments, or safeguarding bodies.
            </li>
            <li>
              <strong>Spam.</strong> No unsolicited bulk email, forum spam, or posting in channels where affiliate links are prohibited.
            </li>
            <li>
              <strong>Cookie stuffing, iframes, pop-unders, or forced clicks.</strong> Any technical trick that drops a cookie without genuine user intent.
            </li>
            <li>
              <strong>Harmful or illegal content.</strong> No content that targets minors inappropriately, infringes copyright, or violates applicable law.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">8. Fraud, clawbacks, and refunds</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>
              <strong>Refunds are automatically clawed back.</strong> If a customer you referred is refunded, the associated commission is reversed and removed from your next payout. If the refund arrives after payout, the amount is deducted from future commissions.
            </li>
            <li>
              <strong>Chargebacks and disputes.</strong> Stripe chargebacks are treated the same as refunds. Commissions on disputed sales are held pending resolution.
            </li>
            <li>
              <strong>Fraud detection.</strong> We monitor for duplicate clicks, bot traffic, self-referral, VPN and datacenter traffic, and other patterns common in affiliate fraud. Flags do not automatically block sales; they are reviewed.
            </li>
            <li>
              <strong>Consequences of fraud.</strong> If we confirm fraud, we may reverse affected commissions, suspend the account immediately, and withhold any unpaid balance associated with fraudulent activity. Confirmed fraud may be reported to Stripe and, where appropriate, to law enforcement.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">9. Suspension and termination</h2>
          <p className="text-sm">
            HomeSafeEducation may suspend or terminate an affiliate account at its sole discretion, with or without notice, if we reasonably believe the affiliate has violated these terms, engaged in fraudulent or deceptive practices, damaged our reputation, or otherwise acted in a way that harms the program or its customers.
          </p>
          <p className="text-sm mt-2">
            On termination:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>Approved commissions not linked to suspected fraud will be paid out in the next scheduled payout cycle.</li>
            <li>Pending commissions may be held while we complete a review.</li>
            <li>Commissions linked to confirmed fraud will be forfeited.</li>
          </ul>
          <p className="text-sm mt-2">
            You may terminate your participation at any time by emailing <a href="mailto:Support@HomeSafeEducation.com" className="text-teal underline">Support@HomeSafeEducation.com</a>. Any approved balance above the minimum threshold will be paid out in the next cycle.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">10. Payments and currency</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>Payouts are processed via Stripe. You are subject to Stripe&apos;s own terms as the payment processor.</li>
            <li>Currency conversion, where applicable, is performed at market rates at the time of payout. Stripe or your bank may charge a processing fee.</li>
            <li>If a payout fails due to incorrect account information on your profile, we will attempt to contact you. Funds will remain in your account balance until payout details are corrected.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">11. Tax and compliance</h2>
          <p className="text-sm">
            You are an independent contractor. You are not our employee, agent, partner, or joint venturer. You are solely responsible for declaring and paying any income tax, VAT, or other levies owed in your jurisdiction on commissions you earn. Where required by law, we may request tax forms or identification information before processing payouts.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">12. Intellectual property</h2>
          <p className="text-sm">
            You may use the HomeSafeEducation name, logo, and approved marketing assets solely to promote the product and earn commissions. You may not modify our logo, imply that we endorse other products or services, register domains containing our name, or use our trademarks in any way likely to confuse customers. All rights not expressly granted are reserved.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">13. Changes to the program</h2>
          <p className="text-sm">
            We may update these terms, commission rates, attribution windows, payout schedules, or minimum payout thresholds from time to time. Material changes will be announced to active affiliates by email and posted on this page with an updated &quot;last updated&quot; date. Continuing to use your affiliate link after the changes are posted means you accept the updated terms.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">14. Disclaimers and limitation of liability</h2>
          <p className="text-sm">
            The affiliate program is provided &quot;as is.&quot; We make no guarantee that you will earn any particular amount, or any amount at all. To the fullest extent permitted by law, HomeSafeEducation is not liable for any indirect, incidental, or consequential damages arising out of your participation in the affiliate program. Our total aggregate liability under these terms is limited to the total commissions paid to you in the twelve months preceding the claim.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">15. Governing law</h2>
          <p className="text-sm">
            These terms are governed by the laws of England and Wales. Disputes will be resolved in the courts of England and Wales, without prejudice to any mandatory consumer protection laws that apply in your country of residence.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-xl mb-3">16. Contact</h2>
          <p className="text-sm">
            Questions about the program, a suspended account, or a specific commission?
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Email: <a href="mailto:Support@HomeSafeEducation.com" className="text-teal underline">Support@HomeSafeEducation.com</a></li>
            <li>Subject line: &quot;Affiliate - [your question]&quot;</li>
          </ul>
        </div>

      </div>

      <div className="mt-12 text-sm">
        <a href="/affiliates" className="text-teal underline">Back to the affiliate program overview</a>
      </div>
    </div>
  )
}
