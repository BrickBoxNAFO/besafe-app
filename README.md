# HomeSafeEducation — Next.js App

Full-stack safety education platform built with Next.js 14, Supabase, Stripe, and Resend.

---

## Stack

| Service | Purpose |
|---------|---------|
| **Next.js 14** | App framework (App Router) |
| **Supabase** | Database, authentication, session management |
| **Stripe** | Payment processing, webhooks |
| **Resend** | Transactional email |
| **Vercel** | Hosting and deployment |

---

## Setup — Step by Step

### 1. Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL Editor, paste and run the contents of `supabase-schema.sql`
3. Go to **Authentication → Settings**:
   - Enable Email provider
   - Set **Site URL** to your Vercel domain (e.g. `https://homesafeeducation.com`)
   - Add `http://localhost:3000` to Additional Redirect URLs for local dev
4. Copy from **Project Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**keep this secret**)

### 2. Stripe

1. Go to [stripe.com](https://stripe.com) and create/log in to your account
2. Create **6 products** in the Stripe Dashboard (Catalogue → Products):
   - **Growing Minds** — $29.99 one-time
   - **Nest Breaking** — $29.99 one-time
   - **Roaming Free** — $29.99 one-time
   - **Aging Wisdom** — $29.99 one-time
   - **Family Anchor** — $29.99 one-time
   - **Family Safety Bundle** — $99.99 one-time
3. Copy each **Price ID** (starts with `price_...`) into your env vars
4. Go to **Developers → Webhooks → Add endpoint**:
   - URL: `https://yoursite.vercel.app/api/stripe-webhook`
   - Events to listen for: `checkout.session.completed`, `payment_intent.payment_failed`
   - Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`
5. Copy your **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
6. Copy your **Secret key** → `STRIPE_SECRET_KEY`

> **Testing:** Use Stripe's test mode and card number `4242 4242 4242 4242` (any expiry/CVC)

### 3. Resend

1. Go to [resend.com](https://resend.com) and create an account
2. Add and verify your domain (follow their DNS instructions)
3. Create an API key → `RESEND_API_KEY`
4. Set `RESEND_FROM_EMAIL` to your verified sender address (e.g. `hello@homesafeeducation.com`)

### 4. Local Development

```bash
# Clone and install
git clone your-repo
cd besafe-app
npm install

# Copy and fill in environment variables
cp .env.local.example .env.local
# Edit .env.local with your actual keys

# Run locally
npm run dev
# Open http://localhost:3000

# Test Stripe webhooks locally (requires Stripe CLI)
stripe login
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts, then add env vars:
# Vercel Dashboard → Your Project → Settings → Environment Variables
# Add every variable from .env.local.example
```

Or connect via GitHub:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add all environment variables in project settings
4. Deploy

### 6. Post-Deployment Checklist

- [ ] Update Supabase **Site URL** to your live Vercel domain
- [ ] Update Stripe **webhook URL** to your live domain
- [ ] Switch Stripe from **Test mode to Live mode** and update keys
- [ ] Send a test purchase end-to-end
- [ ] Verify confirmation email arrives
- [ ] Test password reset flow
- [ ] Check dashboard shows correct purchases

---

## Environment Variables Reference

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=           # From Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY=      # From Supabase project settings (public)
SUPABASE_SERVICE_ROLE_KEY=          # From Supabase project settings (secret - server only)

# Stripe
STRIPE_SECRET_KEY=                  # sk_live_... (or sk_test_... for testing)
STRIPE_WEBHOOK_SECRET=              # whsec_... from Stripe webhook settings
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # pk_live_... (or pk_test_...)
STRIPE_PRICE_GROWING_MINDS=         # price_... from Stripe product
STRIPE_PRICE_NEST_BREAKING=         # price_...
STRIPE_PRICE_ROAMING_FREE=          # price_...
STRIPE_PRICE_AGING_WISDOM=          # price_...
STRIPE_PRICE_FAMILY_ANCHOR=         # price_...
STRIPE_PRICE_BUNDLE=                # price_...

# Resend
RESEND_API_KEY=                     # re_...
RESEND_FROM_EMAIL=                  # hello@yourdomain.com (must be verified in Resend)

# App
NEXT_PUBLIC_SITE_URL=               # https://homesafeeducation.com (no trailing slash)
```

---

## Project Structure

```
/app
  /page.jsx                         Homepage
  /packages/page.jsx                Packages + buy buttons
  /library/page.jsx                 Course library
  /course/[id]/page.jsx             Course detail + lesson list
  /lesson/[courseId]/[lessonIndex]  Lesson content + quiz
  /dashboard/page.jsx               User dashboard + progress
  /account/page.jsx                 Account settings + purchases
  /login/page.jsx                   Sign in
  /register/page.jsx                Create account
  /reset-password/page.jsx          Password reset
  /about/page.jsx                   About page
  /success/page.jsx                 Post-payment confirmation
  /cancel/page.jsx                  Cancelled payment
  /terms/page.jsx                   Terms & Conditions
  /privacy/page.jsx                 Privacy Policy
  /refunds/page.jsx                 Refund Policy
  /cookies/page.jsx                 Cookie Policy
  /api/create-checkout/route.js     Stripe checkout session API
  /api/stripe-webhook/route.js      Stripe webhook handler
/components
  /Nav.jsx                          Navigation bar
  /Footer.jsx                       Footer
  /PackageCard.jsx                  Package card component
/lib
  /data.js                          All packages, courses, quiz data
  /supabase.js                      Client-side Supabase
  /supabase-server.js               Server-side Supabase + admin client
  /stripe.js                        Stripe client + price IDs
  /resend.js                        Email sending functions
/middleware.js                      Auth session refresh + route protection
/supabase-schema.sql                Run this in Supabase SQL Editor
```

---

## Payment Flow

```
User clicks Buy → POST /api/create-checkout
  → Verifies user is logged in
  → Checks not already purchased
  → Creates Stripe Checkout session
  → Returns session URL

Browser redirects to Stripe hosted checkout
  → User enters card details

Payment succeeds
  → Stripe fires POST to /api/stripe-webhook
  → Webhook verifies Stripe signature
  → Writes purchase(s) to Supabase
  → Sends confirmation email via Resend
  → User redirected to /success

User visits /library
  → Server fetches purchases from Supabase
  → Unlocks courses for owned packages
```

---

## Support

For questions about this codebase, contact: Support@HomeSafeEducation.com
