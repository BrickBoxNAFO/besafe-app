/**
 * Blog post data for HomeSafeEducation
 * Each post: { slug, title, metaDescription, category, readTime, date, content (HTML string) }
 */

const posts = [
  {
    slug: 'why-safety-education-matters',
    title: 'Why Safety Education Matters at Every Age',
    metaDescription: 'Learn why practical safety education is essential for every member of your family, from young children to older adults.',
    category: 'Safety',
    readTime: 5,
    date: '15 April 2026',
    content: `
      <h2>Safety Is a Life Skill</h2>
      <p>We teach our children to read, to count, and to tie their shoelaces. But how often do we sit down and teach them the skills they need to stay safe in the real world? Safety education is not about scaring people. It is about empowering them with knowledge and confidence.</p>

      <h2>Every Age Group Faces Different Risks</h2>
      <p>A four-year-old learning about stranger danger faces a completely different set of challenges to a sixteen-year-old navigating social media, or a sixty-five-year-old learning to spot online scams. That is why HomeSafeEducation offers seven distinct packages, each tailored to a specific stage of life.</p>

      <h3>Children (Ages 4-11)</h3>
      <p>Young children need age-appropriate lessons about personal boundaries, road safety, and what to do in an emergency. Our Growing Minds package covers these topics in a way that is engaging and easy to understand.</p>

      <h3>Teenagers (Ages 12-18)</h3>
      <p>Teenagers face risks online and offline. From cyberbullying to peer pressure, from knife crime awareness to understanding consent, our Street Smart and Nest Breaking packages give young people the knowledge they need to make safe choices.</p>

      <h3>Adults and Older Adults</h3>
      <p>Adults are not immune to risk. Whether it is travel safety, home security, or protecting yourself from fraud, our Roaming Free and Aging Wisdom packages provide practical, evidence-based guidance.</p>

      <h2>Knowledge Creates Confidence</h2>
      <p>When people know what to look for and how to respond, they feel more confident in their daily lives. That confidence ripples outward, creating safer families and safer communities.</p>

      <p>Explore our <a href="/packages" class="text-[#0EA5A0] font-semibold hover:underline">full range of packages</a> to find the right course for you or someone you love.</p>
    `,
  },
  {
    slug: 'teaching-children-online-safety',
    title: 'Teaching Children Online Safety: A Parent\'s Guide',
    metaDescription: 'Practical tips for parents on how to teach children about staying safe online, from screen time to social media.',
    category: 'Online Safety',
    readTime: 6,
    date: '14 April 2026',
    content: `
      <h2>The Digital World Is Here to Stay</h2>
      <p>Children today are growing up with technology as a natural part of their lives. Rather than trying to shield them from the internet entirely, the most effective approach is to equip them with the knowledge and skills to use it safely.</p>

      <h2>Start the Conversation Early</h2>
      <p>Even young children can understand simple concepts like not sharing personal information online. As they grow older, the conversations can become more detailed, covering topics like privacy settings, recognising scams, and understanding that not everyone online is who they say they are.</p>

      <h2>Set Clear Boundaries</h2>
      <p>Boundaries are not about control. They are about creating a safe space for children to explore and learn. This might include agreed screen time limits, keeping devices in shared spaces, and regular check-ins about what they are doing online.</p>

      <h2>Lead by Example</h2>
      <p>Children learn from what they see. If you practice good digital habits yourself, such as not sharing too much personal information, being kind online, and taking breaks from screens, your children are more likely to do the same.</p>

      <h2>Know the Warning Signs</h2>
      <p>Changes in behaviour, reluctance to talk about online activity, or suddenly being secretive about devices can all be signs that something is wrong. Keep communication open and let your child know they can come to you without judgement.</p>

      <p>Our <a href="/packages" class="text-[#0EA5A0] font-semibold hover:underline">Growing Minds</a> and <a href="/packages" class="text-[#0EA5A0] font-semibold hover:underline">Street Smart</a> packages include comprehensive lessons on online safety tailored to different age groups.</p>
    `,
  },
  {
    slug: 'spotting-scams-older-adults',
    title: 'How to Spot Scams: A Guide for Older Adults',
    metaDescription: 'Practical advice for older adults on recognising and avoiding common scams, from phone fraud to phishing emails.',
    category: 'Fraud Prevention',
    readTime: 5,
    date: '13 April 2026',
    content: `
      <h2>Scams Are Getting Smarter</h2>
      <p>Fraudsters are becoming increasingly sophisticated in their methods. From convincing phone calls claiming to be from your bank, to emails that look identical to official communications, anyone can be caught off guard. Knowing what to look for is your best defence.</p>

      <h2>Common Types of Scams</h2>
      <p>Phone scams, phishing emails, doorstep fraud, romance scams, and investment fraud are among the most common types targeting older adults. Each uses different tactics, but they all share one thing in common: they rely on creating urgency or trust to get you to act before you think.</p>

      <h2>The Golden Rules</h2>
      <p>Never give personal or financial information to someone who contacts you unexpectedly. If in doubt, hang up and call the organisation directly using a number you trust. Take your time. Legitimate organisations will never pressure you to make an immediate decision.</p>

      <h2>Talk About It</h2>
      <p>There is no shame in being targeted by a scam. Talking about your experiences helps others stay alert and can prevent someone else from falling victim. If you think you have been scammed, contact your bank immediately and report it to Action Fraud.</p>

      <p>Our <a href="/packages" class="text-[#0EA5A0] font-semibold hover:underline">Aging Wisdom</a> package includes detailed lessons on fraud prevention, digital safety, and protecting your independence.</p>
    `,
  },
]

export function getAllPosts() {
  return posts.map(({ slug, title, category, readTime, date, metaDescription }) => ({
    slug,
    title,
    category,
    readTime,
    date,
    metaDescription,
  }))
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null
}
