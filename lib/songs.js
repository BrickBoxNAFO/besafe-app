/**
 * Song data for Growing Minds courses.
 *
 * Structure:
 *   Key = courseId (e.g. "c26")
 *   Value = object with:
 *     lessons: array of song objects matching lesson index
 *       { title, file, lyrics }
 *     remember: song object for the "Remember This" recap song
 *       { title, file, lyrics }
 *
 * Audio files are served from Cloudflare R2:
 *   https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/{path}
 *
 * Lyrics format:
 *   Use [Verse 1], [Chorus], [Bridge] etc. on their own lines
 *   to create section headings. Regular lines are lyrics.
 *
 * To add a song:
 *   1. Upload the MP3 to R2 under Site Music/[package]/Course X/
 *   2. Set the "file" value to the path after "Site Music/" (e.g. "Growing Minds Early Years/Course 1/lesson-1.mp3")
 *   3. Paste the lyrics into the "lyrics" string
 */

const R2_AUDIO_BASE = 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music'

export function getAudioUrl(filePath) {
  if (!filePath) return null
  if (filePath.startsWith('http')) return filePath
  return R2_AUDIO_BASE + '/' + encodeURIComponent(filePath).replace(/%2F/g, '/')
}

// ============================================================
// EARLY YEARS (ages 4-7) - Course IDs: c26, c27, c28, c29, c30
// ============================================================

const SONGS = {

  // ─── Early Years: Road and Outdoor Safety (c26) ───
  'c26': {
    lessons: [
      // Lesson 0: Crossing Roads Safely
      {
        title: 'Crossing Roads Safely',
        file: 'Growing Minds Early Years/Course 1/Lesson 1_ Crossing Roads Safely.mp3',
        lyrics: `Cars and buses zoom so fast,
So take good care when roads you pass.
Hold a hand, don't go alone,
Till you're safely at your home.

Stop and look and listen well,
Before you cross—here's how to tell:
Look to the left, look to the right,
Make sure the road is clear and bright.

Walk, don't run, across the street,
Keep your eyes up, watch your feet.
Use a crossing when you can,
Zebra, pelican—that's the plan.

If there's a lollipop person there,
They'll help you cross with love and care.
Wait for them to say it's right,
Then walk across—hold on tight.

When it's dark or rainy too,
Wear bright clothes so cars see you.
Reflectors, lights, and colours bright,
Will help you stand out in the night.

So remember, every day,
Look and listen on your way.
Roads are busy, but you'll be fine,
If you follow every sign.`
      },
      // Lesson 1: Playing Outdoors Safely
      {
        title: 'Playing Outdoors Safely',
        file: 'Growing Minds Early Years/Course 1/Lesson 2_ Playing Outdoors Safely.mp3',
        lyrics: `Playing outside is lots of fun,
In the fresh air and the sun!
Tell your grown-up where you'll be,
So they know and you stay free.

Stay where they can see your face,
Don't wander off to a different place.
If you're in a park or garden wide,
Keep your grown-up close by your side.

Check for dangers before you play,
Broken glass? Stay away!
Puddles deep or ground that's rough,
Be careful—that's enough.

Climbing high is so much fun,
But be careful, little one.
Hold on tight and take your time,
Only climb what's safe to climb.

If you fall and scrape your knee,
Tell a grown-up—one, two, three.
They'll help you up and make it right,
With a plaster and a cuddle tight.

So play and laugh and jump and run,
Being safe is part of the fun!
Tell a grown-up, check the ground,
The best adventures are safe and sound.`
      },
      // Lesson 2: Water Safety
      {
        title: 'Water Safety',
        file: 'Growing Minds Early Years/Course 1/Lesson 3_ Water Safety.mp3',
        lyrics: `Water is fun for splashing play,
But stay safe every day.
Never go near water alone,
Stay with a grown-up you have known.

Puddles, ponds, and rivers wide,
Can be dangerous—step aside.
Even if it looks quite small,
Water can be deep for all.

At the beach or swimming pool,
Follow every safety rule.
Stay in the shallow end with care,
Make sure a lifeguard's always there.

If you see someone in need,
Don't jump in—call help with speed.
Throw a rope or something near,
Shout for help so all can hear.

Wear your armbands, wear your vest,
Floaties help you do your best.
But they're not magic—don't forget,
A grown-up's eyes should watch you yet.

So splash and play and have your fun,
But water safety's number one!
With a grown-up by your side,
You'll enjoy the splashing tide.`
      },
      // Lesson 3: Animal Safety
      {
        title: 'Animal Safety',
        file: 'Growing Minds Early Years/Course 1/Lesson 4_ Animal Safety.mp3',
        lyrics: `Animals can be soft and sweet,
But some may bite, so be discreet.
Never touch one you don't know,
Ask the owner before you go.

Dogs and cats and birds and more,
Each one has its own set of law.
Some are friendly, some are shy,
Some might snap if you come by.

Always ask before you pet,
"Is it friendly?" Don't forget!
Let the animal sniff your hand,
Slowly, gently—that's the plan.

Don't pull tails or ears or fur,
Be kind and gentle, don't cause a stir.
If an animal growls or hisses loud,
Step away—don't be too proud.

If you find one lost or stray,
Tell a grown-up right away.
Don't pick it up or take it home,
Let the grown-ups help it roam.

So love the animals, big and small,
But be safe and careful with them all.
Ask, be gentle, step away,
And you'll have a happy day.`
      },
      // Lesson 4: Keeping Safe When Getting Help
      {
        title: 'Keeping Safe When Getting Help',
        file: 'Growing Minds Early Years/Course 1/Lesson 5_ Keeping Safe When Getting Help.mp3',
        lyrics: `If you get hurt or feel afraid,
Take a breath, don't be dismayed.
Look around for someone near,
A safe grown-up who'll calm your fear.

If you're lost or feeling blue,
Here is what you need to do:
Find a shop or helper near,
Someone in a uniform here.

Tell them your name, loud and clear,
Say, "I'm lost—can you help me here?"
They will help you find your way,
Back to safety, hip hooray!

If there's danger, fire, or pain,
Know the number—say it plain:
Nine-nine-nine will get you through,
To the helpers who'll come for you.

Tell them what and tell them where,
Stay calm and show that you care.
Firefighters, police, and more,
Are the helpers you're looking for.

So if you're hurt or lost or scared,
Know that help is always there.
Ask a grown-up, make the call,
Helpers are there for one and all.`
      },
    ],
    remember: {
      title: 'Remember This',
      file: 'Growing Minds Early Years/Course 1/Remember This Course 1.mp3',
      lyrics: `Remember this, both day and night,
To stay safe and do what's right!

Stop and look before you cross,
Without a grown-up? That's a loss!
Hold their hand and check the way,
Look and listen every day.

Play outside but tell someone,
Where you're going to have your fun.
Stay where they can see your face,
Don't wander off to a different place.

Water's fun but it can be deep,
With a grown-up, safety you'll keep.
Never swim or splash alone,
Stay safe until you're fully grown.

Animals can be cute, it's true,
But always ask before you do.
Be gentle, kind, and step away,
If they growl or hiss—okay?

If you're lost or scared or fall,
Find a helper, make the call.
Nine-nine-nine will see you through,
Helpers will come to rescue you.

Stay safe, be smart, and have some fun,
Remember this—you're number one!`
    },
  },

  // ─── Early Years: Anti-Bullying and Kindness (c27) ───
  'c27': {
    lessons: [
      // Lesson 0: What is Bullying?
      {
        title: 'What is Bullying?',
        file: 'Growing Minds Early Years/Course 2/Lesson 1_ What is Bullying_.mp3',
        lyrics: `Bullying is when someone is mean,
Pushing, name-calling, or not seen.
It happens more than just one day,
And it never, ever is okay.

It's not a joke, it's not a game,
It's doing something that causes pain.
On purpose, over and over too,
It's something bullies choose to do.

It makes you feel sad, scared, or small,
Like you don't matter much at all.
But that's not true—you're strong and bright,
And bullying is never right.

If someone hurts you, makes you cry,
Or says mean things as they walk by,
That's bullying—and here's the key:
Tell a grown-up, one, two, three.

You don't have to face it on your own,
You're never, ever all alone.
Teachers, parents, people who care,
Will help you out—they'll always be there.

So if you see it, hear it too,
Stand up tall for me and you.
Bullying is wrong, that's plain to see,
Let's all be kind—just you and me.`
      },
      // Lesson 1: Different Kinds of Bullying
      {
        title: 'Different Kinds of Bullying',
        file: 'Growing Minds Early Years/Course 2/Lesson 2_ Different Kinds of Bullying.mp3',
        lyrics: `Bullying isn't kind, it isn't right,
It can be pushing, or starting a fight.
Kicking or shoving or pulling your hair,
Hurting your body just isn't fair.

Some bullying uses words that sting,
Name-calling, teasing, or whispering.
Saying mean things that make you feel small,
That's bullying too—and it's not cool at all.

There's another kind that's hard to see,
Leaving someone out, saying "You can't play with me."
Ignoring or hiding or walking away,
Making someone feel sad every day.

Sometimes it happens on screens and phones,
With nasty messages or hurtful tones.
Online or offline, big or small,
Bullying is bullying—every single call.

But here's the thing—you're not to blame,
No matter the kind, it's all the same.
Tell someone you trust, let your voice be heard,
Every feeling matters—every single word.

Together we're stronger, together we'll say:
Bullying is wrong—let's stop it today!`
      },
      // Lesson 2: What to Do if Someone is Being Mean
      {
        title: 'What to Do if Someone is Being Mean',
        file: 'Growing Minds Early Years/Course 2/Lesson 3_ What to Do if Someone is Being Mean to You and Telling a Grown-up.mp3',
        lyrics: `If someone's mean and treats you bad,
And makes your heart feel hurt or sad,
Take a breath and walk away,
Don't let their words ruin your day.

Tell a grown-up how you feel,
Your worries and your pain are real.
A teacher, parent, someone near,
Will listen close and calm your fear.

You might feel scared to speak your mind,
But telling isn't being unkind.
It's standing up for what is right,
It's being brave and shining bright.

Use your words to say what's wrong,
"They pushed me" or "they said something strong."
Your grown-up needs to know the truth,
So they can help protect your youth.

If it happens once, it might stop there,
But if it carries on—tell, and share.
Again, again, don't hold it in,
Until the meanness starts to thin.

You are important, don't forget,
You deserve the very best you'll get.
So tell a grown-up, loud and clear,
They'll help you through—they're always near.`
      },
      // Lesson 3: Being a Good Friend
      {
        title: 'Being a Good Friend',
        file: 'Growing Minds Early Years/Course 2/Lesson 4_ Being a Good Friend and Helping Others.mp3',
        lyrics: `A good friend is gentle and kind,
They help and share, they're warm in mind.
They listen well when you are sad,
And try to help when things are bad.

If someone's alone at break or play,
Go up and ask, "Can I join today?"
A smile, a wave, a kind hello,
Can make a lonely heart just glow.

If you see someone being mean,
Don't stand and watch—step in between.
Say, "That's not kind, please stop right now,"
And show them how to take a bow.

You can be a hero, big or small,
By being kind and caring for all.
Hold a hand, dry a tear,
Whisper softly, "I am here."

Don't join in if others tease,
Stand up strong and say, "No, please."
Being brave means being fair,
Showing others that you care.

So be the friend you'd like to find,
Gentle, caring, warm, and kind.
Together, hand in hand we'll be,
The best of friends—just you and me.`
      },
      // Lesson 4: Thinking About How Others Feel
      {
        title: 'Thinking About How Others Feel',
        file: 'Growing Minds Early Years/Course 2/Lesson 5_ Thinking About How Others Feel.mp3',
        lyrics: `Sometimes we hurt without a clue,
Not meaning harm in what we do.
But words and actions, big or small,
Can make another person fall.

Before you speak, just stop and think,
"Would these words make someone's heart sink?"
If the answer's "yes," then wait—
Choose kind words—it's not too late.

If someone's quiet, looking down,
With a wobbly lip or a little frown,
Ask them gently, "Are you okay?"
Your kindness brightens up their day.

Try to feel what others do,
Imagine if it happened to you.
Would you feel happy, sad, or mad?
Would it make your little heart glad?

Everyone is different, that's what's great,
Different colours, sizes, shapes.
But inside we all feel the same,
Happy, sad, shy, or brave in name.

So think of others, day by day,
Choose your words in a gentle way.
A little kindness goes so far,
You're a bright and caring star.`
      },
    ],
    remember: {
      title: 'Remember This',
      file: 'Growing Minds Early Years/Course 2/Remember This Course 2.mp3',
      lyrics: `Bullying happens day by day,
On purpose—and it's not okay.
Pushing, teasing, leaving out,
Or saying mean things with a shout.

If someone is mean, walk away,
Tell a grown-up right away.
They will listen, help you through,
And make sure it doesn't happen to you.

Be a good friend, kind and true,
Help someone when they feel blue.
If you see it, speak up strong,
Say, "That's not right, that's wrong!"

Think of others, how they feel,
Kind words help our hearts to heal.
Before you speak, stop and say,
"Would I like this said my way?"

Together, we can make things right,
Be brave, be kind, and shine so bright.`
    },
  },

  // ─── Early Years: Online Safety (c28) ───
  'c28': {
    lessons: [
      // Lesson 0: What is the Internet?
      {
        title: 'What is the Internet?',
        file: 'Growing Minds Early Years/Course 3/Lesson 1_ What is the Internet_.mp3',
        lyrics: `The internet lives on screens so bright,
On phones and tablets, day and night.
A giant library full of fun,
With games and stories for everyone.

You can watch and read and play,
See new things every day.
Lots of people are there too—
You can't see them, but it's true.

The internet is great, hooray!
But not all things are okay.
Some words or pictures aren't for you,
And some are mean or hurtful too.

So use it with a grown-up near,
Someone you trust who's always here.
They'll help you choose what's safe and right,
And keep your online world bright.`
      },
      // Lesson 1: Keeping Your Name and Details Private
      {
        title: 'Keeping Your Name and Details Private',
        file: 'Growing Minds Early Years/Course 3/Lesson 2_ Keeping Your Name and Details Private.mp3',
        lyrics: `Your name and details are just for you,
Keep them safe in all you do.
Don't share your school or where you stay,
Or phone numbers in any way.

People online may say, "I'm your friend,"
But you don't know them in the end.
Sometimes people aren't what they seem,
Not everything is as it may dream.

If something's there to click or save,
Ask a grown-up—be smart and brave.
A download means you take and keep,
So check with them before you leap.

If someone asks for things like these,
Tell a grown-up right away, please.
They might be tricking—don't reply,
Stay safe, be smart, and always try.`
      },
      // Lesson 2: What to Do if Something Scary Happens Online
      {
        title: 'What to Do if Something Scary Happens Online',
        file: 'Growing Minds Early Years/Course 3/Lesson 3_ What to Do if Something Scary Happens Online and Talking to Your Grown-up.mp3',
        lyrics: `If something online makes you scared,
Or leaves you feeling unprepared,
Close it quick, turn off the screen,
Step away from what you've seen.

Tell a grown-up right away,
Don't keep secrets—don't delay.
They will help and keep you safe,
They won't be angry, they'll show you grace.

Talk about the things you see,
Games you play and what might be.
Videos watched or things unclear,
They can help things feel less fear.

Ask your questions, big or small,
Grown-ups are there to help with all.
They guide, protect, and help you through,
Always there to care for you.`
      },
      // Lesson 3: Being Kind Online
      {
        title: 'Being Kind Online',
        file: 'Growing Minds Early Years/Course 3/Lesson 4_ Being Kind Online.mp3',
        lyrics: `When you're online, be kind and bright,
Use gentle words, be polite.
Don't write things that hurt or sting,
Kindness is a better thing.

If you wouldn't say it face to face,
Don't type it out in any place.
No mean names, no making fun,
Kind words make it better for everyone.

Keep your pictures safe and sound,
Don't share them or pass them around.
Keep your camera safely off,
Unless a grown-up says it's not.

If you see mean words appear,
Don't join in—be kind and clear.
Tell a grown-up what you've seen,
Help keep online spaces clean.

Kindness helps the whole world shine,
Even when you're online.`
      },
    ],
    remember: {
      title: 'Remember This',
      file: 'Growing Minds Early Years/Course 3/Remember This Course 3.mp3',
      lyrics: `The internet is fun and bright,
But use it with a grown-up right.
Someone you trust to guide the way,
And help you safe each day.

Keep your details safe and sound,
Don't share them with people around.
Your name, your school, where you stay,
Your password too—keep all away.

If something scares or feels not right,
Close it down, don't stay in sight.
Tell a grown-up right away,
They will help you every day.

Use kind words in all you say,
Don't be mean in any way.
Don't share pictures, keep them tight,
Turn your camera off from sight.

With care and kindness, you will see,
The internet's a happy place to be.`
    },
  },

  // ─── Early Years: Stranger Danger (c29) ───
  'c29': {
    lessons: [
      // Lesson 0: What is a Stranger?
      {
        title: 'What is a Stranger?',
        file: 'Growing Minds Early Years/Course 4/Lesson 1_ What is a Stranger_.mp3',
        lyrics: `A stranger is someone you do not know,
Most are nice, but some are not so.
You can't tell by looking, no matter the smile,
A friendly face might hide something bad for a while.

Never go with a stranger, no, no, no!
Never take gifts or sweets that they show.
If they ask you questions or call out your name,
Just walk away quickly – don't play their game.

If a stranger says "Come with me, let's go!"
You look them straight in the eye and say "NO!"
Run to your mummy, your daddy, or a friend,
Tell a grown-up you trust right till the end.

Stay safe, little one, listen and learn,
Stranger danger rules help your light brightly burn!`
      },
      // Lesson 1: Who are Your Safe Grown-ups?
      {
        title: 'Who are Your Safe Grown-ups?',
        file: 'Growing Minds Early Years/Course 4/Lesson 2_ Who are Your Safe Grown-ups_.mp3',
        lyrics: `A stranger is someone you do not know,
Most are nice, but some are not so.
You can't tell by looking, no matter the smile,
A friendly face might hide something bad for a while.

Never go with a stranger, no, no, no!
Never take gifts or sweets that they show.
If they ask you questions or call out your name,
Just walk away quickly – don't play their game.

If a stranger says "Come with me, let's go!"
You look them straight in the eye and say "NO!"
Run to your mummy, your daddy, or a friend,
Tell a grown-up you trust right till the end.

Stay safe, little one, listen and learn,
Stranger danger rules help your light brightly burn!`
      },
      // Lesson 2: Never Go Anywhere Without Asking
      {
        title: 'Never Go Anywhere Without Asking',
        file: 'Growing Minds Early Years/Course 4/Lesson 3_ Never Go Anywhere Without Asking.mp3',
        lyrics: `Here's a rule to keep in mind,
Stay safe and strong, be smart and kind:
Never go off anywhere,
Without a grown-up's "yes" and care.

If a friend says, "Come and play!"
Ask your grown-up first, okay?
If a stranger asks you near,
Say, "I'll check at home, my dear."

If they say your parents sent me here!
Don't believe it—wait and hear.
They would tell you, that is true,
Before sending someone for you.

If they whisper, "It's secret—shh!"
Turn away and don't you rush.
Sweets or toys they try to show?
Say "No, thank you!"—off you go.

Always check before you roam,
Safe grown-ups are at home.`
      },
      // Lesson 3: What to Do if You Feel Lost
      {
        title: 'What to Do if You Feel Lost',
        file: 'Growing Minds Early Years/Course 4/Lesson 4_ What to Do if You Feel Lost.mp3',
        lyrics: `If you feel lost, stay calm and slow,
Don't run around or quickly go.
Stand right still where you are found,
Don't wander off or roam around.

Look for someone safe nearby,
A helper kind who'll hear your cry.
A shop worker or police you see,
Say, "I'm lost—please help me!"

Tell your parent's name out loud,
Your phone number, clear and proud.
Stay right there, don't go away,
Unless your parents leads the way.

Your grown-up's coming—this is true,
So wait right there, they'll come for you.`
      },
      // Lesson 4: Secrets vs Surprises
      {
        title: 'Secrets vs Surprises',
        file: 'Growing Minds Early Years/Course 4/Lesson 5_ Secrets vs Surprises.mp3',
        lyrics: `A surprise is happy, full of cheer,
Like birthday fun that's drawing near.
"Don't tell yet!" your grown-ups say,
It's a joyful secret for a birthday day.

A secret's different—stop and think,
It might make your tummy shrink.
If it makes you worried, sad, or tight,
That kind of secret isn't right.

If someone says, "Don't tell at home,"
That's not okay—don't keep it alone.
Tell your parents, tell them soon,
Morning, night, or afternoon.

Good surprises make you smile wide,
Bad secrets make you want to hide.
If it feels wrong deep inside,
Trust that feeling—let it guide.

Tell a grown-up you trust and know,
You never have to keep secrets so.`
      },
      // Lesson 5: What to Do if You Feel Scared
      {
        title: 'What to Do if You Feel Scared',
        file: 'Growing Minds Early Years/Course 4/Lesson 6_ What to Do if You Feel Scared.mp3',
        lyrics: `If someone makes you scared or small,
Stand up strong and loud and tall:
Say, "No! Go away!" clear and bright,
Use your voice with all your might.

If they don't listen, run—don't stay,
Find a safe place right away.
A shop, a school, where helpers are,
Safe grown-ups won't be far.

If you can't run, step back instead,
Move away, just like you said.
Tell a grown-up what went on,
Every word from start to done.

Don't be scared to tell what's true,
You've done nothing wrong—be you.
If it feels wrong deep inside,
Trust that feeling as your guide.

Say "No!" and go, be brave and strong,
You know what's right, you know what's wrong.`
      },
      // Lesson 6: What to Do if Someone Tries to Grab You
      {
        title: 'What to Do if Someone Tries to Grab You',
        file: 'Growing Minds Early Years/Course 4/Lesson 7_ What to Do if Someone Tries to Grab You.mp3',
        lyrics: `If someone tries to grab you tight,
Make BIG noise with all your might!
Scream and shout so all can hear,
"Help me! This is not my dear!"

Kick and wriggle, twist and fight,
Pull away with all your might.
Drop down low onto the ground,
Hard to lift when you're not found.

Hold on tight to things nearby,
A bench, a rail—give it a try.
Cling on strong and don't let go,
Make it hard to move you so.

Scratch or bite if you must do,
To stay safe and protect you.
Keep on shouting, loud and clear,
Help will come when people hear.

When you're safe, go tell it all,
To a grown-up—big or small.`
      },
    ],
    remember: {
      title: 'Remember This',
      file: 'Growing Minds Early Years/Course 4/Remember This Course 4.mp3',
      lyrics: `A stranger is someone you don't know,
Never go with them—just say "No!"
Know safe grown-ups, who they are,
Ask them first before you go far.

If you're lost and need some help,
Ask for help—don't do it yourself.
A shop or police will help you see,
Say, "I'm lost—please help me!"

Surprises are happy, full of cheer,
But bad secrets bring worry and fear.
If you feel scared, be strong and loud,
Say "No!" so everyone around is proud.

Run away and tell what's true,
Safe grown-ups will help you.
If someone grabs—don't stay still,
Kick and wriggle with all your will.

Drop down low, hold on tight,
Shout for help with all your might!`
    },
  },

  // ─── Early Years: Body Safety and Consent (c30) ───
  'c30': {
    lessons: [
      // Lesson 0: Your Body Belongs to You
      {
        title: 'Your Body Belongs to You',
        file: 'Growing Minds Early Years/Course 5/Lesson 1_ Your Body Belongs to You.mp3',
        lyrics: `Your body is yours, as bright as can be,
A wonderful, special, magical "me."
From head to your toes, it's all your own,
A beautiful place where you have grown.

You get to choose what's okay for you,
That's something important, strong, and true.
If someone touches and it feels wrong,
Say, "Do not touch me!" loud and strong.

Then tell someone safe, someone you trust,
Because speaking up is something you must.
Your feelings matter—they help you see,
What's right for your body and what should be.

If something feels yucky, don't ignore—
Your heart knows the truth deep at its core.
The grown-ups who love you will always care,
They'll listen and help and always be fair.

They'll honor your "no" and hear what you say,
And help keep your body safe every day.
Your body is yours, so proud so lets be,
A wonderful, special, magical "me."`
      },
      // Lesson 1: Private Parts are Private
      {
        title: 'Private Parts are Private',
        file: 'Growing Minds Early Years/Course 5/Lesson 2_ Private Parts are Private.mp3',
        lyrics: `Your private parts are special to you,
The ones covered up by your swimsuit too.
They're kept just for you, tucked safe and tight,
Private and cared for, day and night.

No one should ask to see or to touch,
Unless there's a reason that matters much.
And even then, it should be clear,
With a trusted grown-up always near.

A doctor might check to keep you well,
They'll say what they're doing and always tell.
With someone you trust right by your side,
There's nothing to worry or to hide.

Your body's nothing to feel ashamed,
Every part is perfectly named.
But some parts are private, that's just the way,
We keep them safe every day.

If someone touches and it feels wrong,
Tell a safe grown-up right away, be strong.
It's not your fault—remember this part,
You won't be in trouble, not even a start.

So speak up quickly, don't delay,
Tell your parents what happened that day.
Your voice matters, loud and true,
And there are people who care for you.`
      },
      // Lesson 2: Safe Touch vs Unsafe Touch
      {
        title: 'Safe Touch vs Unsafe Touch',
        file: 'Growing Minds Early Years/Course 5/Lesson 3_ Safe Touch vs Unsafe Touch.mp3',
        lyrics: `A safe touch is gentle, kind, and sweet,
Like hugs from loved ones that feel like a treat.
Holding hands as you walk along,
Safe touches make you feel happy and strong.

An unsafe touch feels scary or wrong,
It might hurt your body or last too long.
Like hitting or kicking, or something not right,
That gives you a worried or yucky fright.

Your tummy can help you know what to do,
It sends little signals to guide you through.
If it feels tight or twisty inside,
That touch isn't safe—don't try to hide.

You can say "no," both loud and clear,
Even to people you love so dear.
Safe grown-ups will listen and understand,
They'll stop right away when you raise your hand.

If someone touches in an unsafe way,
Move far from them—don't ever stay.
Tell a safe grown-up, strong and true,
They're there to help and protect you.

Your body is yours, as you can see,
You choose what's okay—you're in charge of me.`
      },
      // Lesson 3: It is Always Okay to Say No
      {
        title: 'It is Always Okay to Say No',
        file: 'Growing Minds Early Years/Course 5/Lesson 4_ It is Always Okay to Say No.mp3',
        lyrics: `You have the right to say "no,"
If something feels wrong, let your feelings show.
To friends or family, big or small,
Your voice is important—use it for all.

If someone asks you to do something you don't,
You can say "no thanks, I won't, I won't."
Saying "no" is brave and strong,
It helps you know what's right or wrong.

It's not rude to say "no" out loud,
You can say it clear, you can say it proud.
Kind grown-ups will listen to what you say,
And respect your "no" right away.

If someone gets angry when you refuse,
That's not okay—they should not choose.
Tell a safe grown-up what you've seen,
And share how that moment made you feel inside, unseen.

You might worry they'll feel upset,
But your feelings matter—don't forget.
Your body and heart come first, it's true,
The most important person is you.

Practice your "no" so it's ready to go,
Say it strong, steady, and let it show.
Your voice can help keep you safe each day,
A powerful word in a simple way.`
      },
      // Lesson 4: Telling a Safe Grown-up if Something Happens
      {
        title: 'Telling a Safe Grown-up if Something Happens',
        file: 'Growing Minds Early Years/Course 5/Lesson 5_ Telling a Safe Grown-up if Something Happens.mp3',
        lyrics: `If a touch feels wrong or makes you scared,
Tell a safe grown-up who truly cares.
This is important—don't keep it inside,
Let your voice be strong, don't hide.

You might feel worried, or think, "What if?"
But you won't be in trouble—not even a bit.
It's not your fault, you've done no wrong,
You are still good, you still belong.

Tell someone you trust what happened that day,
Who it was and where, in your own way.
Share how it felt, what made you blue,
Say just as much as you want to.

You don't need every detail to say,
Just tell what you can—that's okay.
They'll listen closely, they'll understand,
And help you feel safe, just as planned.

They might ask questions to learn a bit more,
Not because they doubt you—not at all, for sure.
They want to help and keep you safe,
With kindness, care, and a gentle space.

A safe grown-up will be there for you,
To help and protect in all that they do.
It takes great courage to speak and share,
And brave little hearts show strength and care.`
      },
      // Lesson 5: What Happens After You Tell Someone
      {
        title: 'What Happens After You Tell Someone',
        file: 'Growing Minds Early Years/Course 5/Lesson 6_ What Happens After You Tell Someone.mp3',
        lyrics: `When you tell a grown-up safe and kind,
They'll listen to you and hear your mind.
They'll believe your words, they'll understand,
And gently hold your helping hand.

They'll tell you, "You're brave for telling me,"
"And you are safe, as safe can be."
With caring words and voices calm,
They'll help your heart feel full of calm.

They might tell someone else who can help too,
Like a teacher or doctor who looks after you.
Or someone whose job is to keep people safe,
All working together, a caring place.

This isn't to worry or make you afraid,
It's to keep you safe and bring help your way.
Kind grown-ups team up, strong and true,
To make sure bad things don't happen to you.

They'll help make sure it won't happen again,
With care and support, again and again.
You're safe, you're heard, you did what's right,
A brave little star shining so bright.`
      },
    ],
    remember: {
      title: 'Remember This',
      file: 'Growing Minds Early Years/Course 5/Remember This Course 5.mp3',
      lyrics: `Your body is yours, it belongs to you,
No one can touch it okay its true.
Your private parts are hidden away,
Just for you, every day.

Only those you trust and feel okay,
Should ever help in a caring way.
Safe touch feels nice, like hugs that you know,
Unsafe feels scary—your feelings will show.

You can say "no" to anyone near,
Even grown-ups you know and hold dear.
If something unsafe should happen one day,
It's not your fault in any way.

Tell a safe grown-up, don't wait or hide,
Let them be right there by your side.
They'll listen, believe you, and help you through,
Keep you safe in all that they do.`
    },
  },

  // ─── Junior: Road and Outdoor Safety (c1) ───
  'c1': {
    lessons: [
      { title: 'Crossing Roads Safely and Being Seen by Drivers', file: 'Growing Minds Junior/Course 1/Lesson 1_ Crossing Roads Safely and Being Seen by Drivers.mp3', lyrics: 'Yeah, the street’s alive, engines rolling by,\nPeople moving fast, no time to wonder why.\nBut you don’t rush in, no, you take control,\nEvery step you take, yeah you stay in the know.\n\nFind the lights, find the signs,\nThat’s the place you cross the line.\n\nStop, look both ways before you go,\nLeft, right, left—now you know.\nKeep your head up, take it slow,\nStay aware everywhere you go.\nNo guessing games, don’t take that chance,\nSafe steps first—that’s how you advance.\n\nDon’t cut between cars where you can’t be seen,\nStep into the open, keep your path clean.\nWalk straight across, don’t run the race,\nEyes and ears on, steady pace.\n\nIf you see them, they see you,\nThat’s the rule you gotta use.\n\nStop, look both ways before you go,\nLeft, right, left—now you know.\nKeep your head up, take it slow,\nStay aware everywhere you go.\nNo guessing games, don’t take that chance,\nSafe steps first—that’s how you advance.\n\nNo headphones blasting in your ears,\nNo phone to block what you should hear.\nIf it’s dark or rain comes down,\nMake sure you stand out in the crowd.\n\nStop, look both ways—take the lead,\nSmart moves are the ones you need.\nStay sharp, don’t drift away,\nThat’s how you win every day.\nYeah, you’ve got it, now you know—\nSafe and ready when you go. \n' },
      { title: 'Cycling Safely', file: 'Growing Minds Junior/Course 1/Lesson 2_ Cycling Safely.mp3', lyrics: 'Yeah, we ride out, feel the wind, let it go,\nTwo wheels rolling, yeah we’re running the road.\nIt’s fun, it’s fast, yeah we’re feeling that flow,\nBut stay sharp—gotta stay in control.\nCheck your ride before you roll,\nMake sure everything’s good to go.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nTyres pumped up, yeah they ready to go,\nBrakes check out so you’re stopping for sure.\nChain runs smooth, no skipping the beat,\nIf something feels off, get it fixed before the street.\n\nAsk for help, don’t guess, don’t play,\nKeep your bike safe every day.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nSame direction as the cars on the street,\nBike lane cruising, yeah you keep it clean.\nWatch the edges, potholes in the way,\nSlow it down at turns, don’t drift away.\n\nAt the lights, take your time,\nMake sure they see you before you ride.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nHands out clear when you’re making that turn,\nEye contact—let the drivers learn.\nBright clothes on, yeah you stand out right,\nFront and back lights shining in the night.\n\nNo headphones blocking what you need to hear,\nStay aware, keep your pathway clear.\nIf you’re unsure, don’t risk the flow,\nHop off, walk it, take it slow.\n\nRide smart, ride strong, yeah you know the way,\nSafe choices every single day.\nStay seen, stay sharp, keep control in sight,\nThat’s how you win every single ride.\n' },
      { title: 'Water Safety', file: 'Growing Minds Junior/Course 1/Lesson 3_ Water Safety.mp3', lyrics: 'Yeah, we ride out, feel the wind, let it go,\nTwo wheels rolling, yeah we’re running the road.\nIt’s fun, it’s fast, yeah we’re feeling that flow,\nBut stay sharp—gotta stay in control.\n\nCheck your ride before you roll,\nMake sure everything’s good to go.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\nTyres pumped up, yeah they ready to go,\nBrakes check out so you’re stopping for sure.\nChain runs smooth, no skipping the beat,\nIf something feels off, get it fixed before the street.\n\nAsk for help, don’t guess, don’t play,\nKeep your bike safe every day.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nSame direction as the cars on the street,\nBike lane cruising, yeah you keep it clean.\nWatch the edges, potholes in the way,\nSlow it down at turns, don’t drift away.\nAt the lights, take your time,\nMake sure they see you before you ride.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nHands out clear when you’re making that turn,\nEye contact—let the drivers learn.\nBright clothes on, yeah you stand out right,\nFront and back lights shining in the night.\n\nNo headphones blocking what you need to hear,\nStay aware, keep your pathway clear.\nIf you’re unsure, don’t risk the flow,\nHop off, walk it, take it slow.\n\nRide smart, ride strong, yeah you know the way,\nSafe choices every single day.\nStay seen, stay sharp, keep control in sight,\nThat’s how you win every single ride.\n' },
      { title: 'Playing Outdoors Safely and Knowing Your Boundaries', file: 'Growing Minds Junior/Course 1/Lesson 4_ Playing Outdoors Safely and Knowing Your Boundaries.mp3', lyrics: 'Yeah, you’re stepping out, doing more on your own,\nWalking to school or a place you’ve known.\nFeels good, yeah, freedom’s real,\nBut smart choices matter with the way you feel.\n\nTalk it through, know the plan,\nWhere you go and where you can.\n\nKnow the way, know your space,\nWhere you’re going, set your pace.\nCheck the time, be back when told,\nSmart moves now, that’s how you grow.\nStay aware, think it through,\nMake safe choices—that’s on you.\n\nTell someone where you’re gonna be,\nHeading out with your crew or just you and me.\nPlans might change, that’s okay,\nFind a way to update, don’t drift away.\n\nStick with friends when you can,\nLook around, always have a plan.\n\nIf it feels off, don’t ignore,\nTrust your gut and head for more—\n\nKnow the way, know your space,\nWhere you’re going, set your pace.\nCheck the time, be back when told,\nSmart moves now, that’s how you grow.\nStay aware, think it through,\nMake safe choices—that’s on you.\n\nBusy roads and tracks—stay clear,\nBuilding sites? Don’t go near.\nBroken places, not your scene,\nYou don’t have to follow where it’s unsafe to be.\n\nMake your choice, stand your ground,\nSafe is strong—that’s how you’re found.\n\nIf you’re lost, don’t panic, stay cool,\nHead somewhere safe like a shop or school.\nFind an adult, tell them straight,\nThey’ll help you out, don’t hesitate.\n\nYou’ve got this, just take it slow,\nThink it through and you’ll know.\n\nKnow the way, stay in control,\nEvery step, every goal.\nStay smart, don’t rush through,\nThe safest path is up to you.\nYeah, you’re growing, this is true—\nNow the smart moves come from you.\n\n' },
      { title: 'Animal Safety and Outdoor Emergencies', file: 'Growing Minds Junior/Course 1/Lesson 5_ Animal Safety and Outdoor Emergencies.mp3', lyrics: 'Yeah, you’re stepping out, doing more on your own,\nWalking to school or a place you’ve known.\nFeels good, yeah, freedom’s real,\nBut smart choices matter with the way you feel.\n\nTalk it through, know the plan,\nWhere you go and where you can.\n\nKnow the way, know your space,\nWhere you’re going, set your pace.\nCheck the time, be back when told,\nSmart moves now, that’s how you grow.\nStay aware, think it through,\nMake safe choices—that’s on you.\n\nTell someone where you’re gonna be,\nHeading out with your crew or just you and me.\nPlans might change, that’s okay,\nFind a way to update, don’t drift away.\n\nStick with friends when you can,\nLook around, always have a plan.\n\nIf it feels off, don’t ignore,\nTrust your gut and head for more—\n\nKnow the way, know your space,\nWhere you’re going, set your pace.\nCheck the time, be back when told,\nSmart moves now, that’s how you grow.\nStay aware, think it through,\nMake safe choices—that’s on you.\n\nBusy roads and tracks—stay clear,\nBuilding sites? Don’t go near.\nBroken places, not your scene,\nYou don’t have to follow where it’s unsafe to be.\n\nMake your choice, stand your ground,\nSafe is strong—that’s how you’re found.\n\nIf you’re lost, don’t panic, stay cool,\nHead somewhere safe like a shop or school.\nFind an adult, tell them straight,\nThey’ll help you out, don’t hesitate.\n\nYou’ve got this, just take it slow,\nThink it through and you’ll know.\nKnow the way, stay in control,\nEvery step, every goal.\nStay smart, don’t rush through,\nThe safest path is up to you.\nYeah, you’re growing, this is true—\nNow the smart moves come from you.\n' }
    ],
    remember: { title: 'Remember This Course 1', file: 'Growing Minds Junior/Course 1/Remember This Course 1.mp3', lyrics: 'Step outside, yeah you’re on your way,\nGot more freedom every day.\nBut before you move, take a second to think,\nOne smart choice can change everything.\n\nSlow it down, check the scene,\nKnow exactly what it means.\nPlay it smart, every move you make,\nLook both ways, don’t rush, don’t break.\nStop and think before you go,\nThat’s the way to stay in control.\nStay sharp, wherever you are,\nSafe decisions take you far.\n\nCross the road where it’s made for you,\nSigns and lights show what to do.\nLeft then right, then left again,\nStay aware till you reach the end.\n\nDon’t guess, don’t take that chance,\nSafety’s always in your hands.\n\nPlay it smart, every move you make,\nLook both ways, don’t rush, don’t break.\nStop and think before you go,\nThat’s the way to stay in control.\nStay sharp, wherever you are,\nSafe decisions take you far.\n\nWater’s fun but don’t go alone,\nStick to places that are known.\nPools or beaches where guards can see,\nThat’s the place you’re meant to be.\n\nRivers? No, not without help,\nThat’s a risk you shouldn’t test.\n\nKnow your limits, know your zone,\nTell someone before you go.\nIf it feels wrong, trust that sign,\nGet to safety every time.\n\nStay away from danger zones,\nTracks and sites aren’t places to roam.\nAnimals you don’t know? Keep away,\nAnd know how to call for help if you need it one day.\n\nPlay it smart, stay in control,\nEvery choice is your goal.\nThink ahead, don’t drift apart,\nSafety first—that’s being smart.\nYeah, you know it from the start—\nEvery day, just play it smart.\n' }
  },
  'c2': {
    lessons: [
      { title: 'What is Bullying Really?', file: 'Growing Minds Junior/Course 2/Lesson 1_ What is Bullying Really_.mp3', lyrics: 'Some words cut deep, some actions sting,\nIt’s not okay, it’s a harmful thing.\nHitting, pushing, taking your stuff,\nOr teasing too much—that’s more than enough.\n\nIt’s repeated, deliberate, and unfair,\nPower imbalance—you gotta be aware.\n\nStand strong, you don’t have to fight alone,\nReach out, speak up, let your voice be known.\nBullying’s not your fault, you’re not to blame,\nKeep your head up, shine through the shame.\nStand strong, keep moving, don’t back down,\nYour courage matters, wear it like a crown.\n\nVerbal attacks, name-calling, cruel jokes,\nRumours online, spreading nasty notes.\nLeaving someone out, turning friends away,\nCyber messages that ruin someone’s day.\n\nIt’s not a one-time thing, it’s not just play,\nIt’s repeated harm that takes its toll each day.\n\nStand strong, you don’t have to fight alone,\nReach out, speak up, let your voice be known.\nBullying’s not your fault, you’re not to blame,\nKeep your head up, shine through the shame.\nStand strong, keep moving, don’t back down,\nYour courage matters, wear it like a crown.\n\nAnyone can be a target, anyone can face pain,\nIt’s not weakness, it’s not your shame.\nIf it happens to you, find someone you trust,\nA teacher, a friend, someone who must—\n\nHelp you see that you’re not alone,\nThat your value is yours, and yours alone.\nStand strong, you don’t have to fight alone,\nReach out, speak up, let your voice be known.\nBullying’s not your fault, you’re not to blame,\nKeep your head up, shine through the shame.\nStand strong, keep moving, don’t back down,\nYour courage matters, wear it like a crown.\n' },
      { title: 'What to Do if You\'re Being Bullied', file: 'Growing Minds Junior/Course 2/Lesson 2_ What to Do if You\'re Being Bullied and Telling Someone You Trust.mp3', lyrics: 'If someone’s picking on you, it’s not your fault,\nThey chose their target, that’s the default.\nNothing you did makes it okay,\nYou’ve got the right to stand your way.\nIf it feels safe, speak your truth,\nFirm and clear, no need for proof.\n\nSay “Stop!” and walk away,\nTell someone who can help today.\nWrite it down, keep track of the time,\nYour voice matters—it’s not a crime.\nYou’re not alone, reach out and see,\nThere’s support waiting for you and me.\n\nParents, teachers, counselors too,\nTell them exactly what’s going through.\nWho, what, when, and how it feels,\nSomeone who cares will help you heal.\n\nIf the first one doesn’t listen right,\nKeep asking, don’t give up the fight.\n\nWrite it down, keep your proof near,\nPersistence shows that you’re clear.\n\nSay “Stop!” and walk away,\nTell someone who can help today.\nWrite it down, keep track of the time,\nYour voice matters—it’s not a crime.\nYou’re not alone, reach out and see,\nThere’s support waiting for you and me.\n\nScreenshots saved, block and don’t reply,\nShow a parent, don’t let it slide.\nReport online, take the step,\nProtect yourself, don’t regret.\n\nTalking helps—friends, family, counselor too,\nIt’s strength to seek support, it’s true.\nSay “Stop!” and walk away,\nTell someone who can help today.\nWrite it down, keep track of the time,\nYour voice matters—it’s not a crime.\nYou’re not alone, reach out and see,\nThere’s support waiting for you and me.\n' },
      { title: 'Being an Upstander and Your Own Behaviour', file: 'Growing Minds Junior/Course 2/Lesson 3_ Being an Upstander and Your Own Behaviour.mp3', lyrics: 'See it happen, don’t just stare,\nA little courage shows you care.\nStep in safely, say it loud,\n“You can’t treat them like that now.”\n\nOne voice can shift the scene,\nOne friend’s support can change everything.\n\nStand up, speak out, don’t stay quiet,\nShow the world you won’t let it slide.\nBe the change, take a side,\nHelp someone feel safe inside.\nOnline, offline, it’s the same,\nUse your words, don’t play their game.\n\nIf your friends are joining in,\nSay, “Not today, I won’t give in.”\nInvite the person, pull them near,\nOne friend’s support can calm their fear.\n\nReport it when you need to,\nTell an adult—it’s the smart thing to do.\n\nYour actions matter more than you know,\nA single stand can help them grow.\n\nStand up, speak out, don’t stay quiet,\nShow the world you won’t let it slide.\nBe the change, take a side,\nHelp someone feel safe inside.\nOnline, offline, it’s the same,\nUse your words, don’t play their game.\n\nIf you’ve hurt someone, own it, apologize,\nChange your ways, show you’re wise.\nReal friends don’t pressure you to be cruel,\nRespect is stronger than following the rules.\n\nStand up, speak out, take a stand,\nShow the world you’ve got a plan.\nBe the change, take a side,\nHelp someone feel safe inside.\nOnline, offline, it’s the same,\nUse your words, don’t play their game. \n' }
    ],
    remember: { title: 'Remember This Course 2', file: 'Growing Minds Junior/Course 2/Remember this course 2.mp3', lyrics: 'Bullying isn’t just a fight,\nIt’s repeated, meant to hurt, not right.\nPower’s unfair, the target’s stressed,\nOne-time arguments don’t count—rest.\n\nDon’t face it alone, don’t stay quiet,\nTell a trusted adult, take that pilot.\n\nYour words matter, every day,\nOffline, online, in what you say.\nSpeak up, support, take a stand,\nBe the change with your own hands.\nIf you’ve hurt someone, make it right,\nApologize, learn, and shine your light.\n\nSee it happen? Don’t just stare,\nSay something brave, show that you care.\nInvite a friend, pull them near,\nOne act of kindness can calm their fear.\n\nStand up safely, help them through,\nYour actions matter, they see you too.\n\nYour words matter, every day,\nOffline, online, in what you say.\nSpeak up, support, take a stand,\nBe the change with your own hands.\nIf you’ve hurt someone, make it right,\nApologize, learn, and shine your light.\n\nThink before you post or share,\nWould you say it face-to-face, be fair?\nNo rumours, no photos without consent,\nKindness online shows intent.\n\nYour words matter, every day,\nOffline, online, in what you say.\nSpeak up, support, take a stand,\nBe the change with your own hands.\nIf you’ve hurt someone, make it right,\nApologize, learn, and shine your light. 🎶\n' }
  },
  'c3': {
    lessons: [
      { title: 'What is the Internet and How Does it Work?', file: 'Growing Minds Junior/Course 3/Lesson 1_ What is the Internet and How Does it Work_.mp3', lyrics: 'The internet connects the world tonight,\nMessages, videos, games in sight.\nBut every click, every word you share,\nMight travel places you’re unaware.\n\nInformation moves through servers far,\nOnce it’s online, it leaves a scar.\n\nThink before you click, think before you post,\nTreat the web like a place with strangers most.\nDon’t share what you wouldn’t say out loud,\nKeep your info safe, stand strong and proud.\nThink before you click, don’t fall for tricks,\nNot everyone online has good intentions to mix.\n\nWebsites, apps, games that you play,\nSome are free, but they track your way.\nAdvertisers see, they sell what they find,\nProtect your data, keep control in mind.\n\nPeople online—some are real, some fake,\nDon’t trust them all for your own sake.\n\nThink before you click, think before you post,\nTreat the web like a place with strangers most.\nDon’t share what you wouldn’t say out loud,\nKeep your info safe, stand strong and proud.\nThink before you click, don’t fall for tricks,\nNot everyone online has good intentions to mix.\n\nPhotos, videos, once they’re there,\nThey’re permanent, so handle with care.\nDon’t send what you wouldn’t want to show,\nOnce it’s online, it can always go.\n\nKeep your private info off the street,\nBe aware of every digital beat.\nThink before you click, think before you post,\nTreat the web like a place with strangers most.\nDon’t share what you wouldn’t say out loud,\nKeep your info safe, stand strong and proud.\nThink before you click, don’t fall for tricks,\nNot everyone online has good intentions to mix.\n' },
      { title: 'Personal Information - What to Keep Private and Why', file: 'Growing Minds Junior/Course 3/Lesson 2_ Personal Information - What to Keep Private and Why.mp3', lyrics: 'Your info’s private, don’t give it out,\nNames, birthdays, school—no doubt.\nAddress, phone, email, passwords too,\nPhotos and videos—think before you do.\n\nStrangers online can pretend to be you,\nUse your details to cause trouble too.\n\nKeep it safe, don’t share what’s yours,\nProtect yourself, lock all the doors.\nPrivate info’s valuable, don’t let it leak,\nThink before you post, be strong, not weak.\nKeep it safe, keep it smart,\nYour personal info’s a work of art.\n\nHobbies, games, your favorite books,\nHoliday trips, just general looks.\nTalk about football, music, or art,\nBut don’t give details that reveal your heart.\n\nStrangers online might seem okay,\nBut safety first, that’s the way.\n\nKeep it safe, don’t share what’s yours,\nProtect yourself, lock all the doors.\nPrivate info’s valuable, don’t let it leak,\nThink before you post, be strong, not weak.\nKeep it safe, keep it smart,\nYour personal info’s a work of art.\n\nMake your accounts private, only friends you know,\nCheck your settings so your info doesn’t show.\nDon’t accept requests from people unknown,\nStrange messages? Tell an adult you trust at home.\n\nOnce it’s online, it can stay forever,\nThink twice, stay safe, now and forever.\n\nKeep it safe, don’t share what’s yours,\nProtect yourself, lock all the doors.\nPrivate info’s valuable, don’t let it leak,\nThink before you post, be strong, not weak.\nKeep it safe, keep it smart,\nYour personal info’s a work of art.\n' },
      { title: 'Safe vs Unsafe Online Behaviour', file: 'Growing Minds Junior/Course 3/Lesson 3_ Safe vs Unsafe Online Behaviour - Strangers, Links, and Risks.mp3', lyrics: 'Online, you never really know,\nSomeone could be older, moving slow.\nThey might seem your age, but that’s a trick,\nStay cautious, don’t get picked.\n\nIf it feels off, trust your gut,\nTell an adult—don’t stay shut.\n\nStay alert online, keep your guard,\nDon’t click the links that look too hard.\nPasswords strong, keep them tight,\nOnly download from the trusted site.\nStay alert, don’t fall for schemes,\nNot everything online is what it seems.\n\nSome people build trust, try to seem nice,\nGrooming’s real, don’t pay the price.\nAsking for photos, keeping secrets too,\nIf it happens, tell someone you trust, true.\n\nIf a message makes you scared,\nStep back, get help—you’re prepared.\n\nStay alert online, keep your guard,\nDon’t click the links that look too hard.\nPasswords strong, keep them tight,\nOnly download from the trusted site.\nStay alert, don’t fall for schemes,\nNot everything online is what it seems.\n\nUpdate apps, update your phone,\nSecurity fixes keep you in the zone.\nWatch what apps and websites see,\nAssume online isn’t totally private, be free.\n\nChange passwords if you think they’re known,\nKeep your info safe, protect your zone.\n\nStay alert online, keep your guard,\nDon’t click the links that look too hard.\nPasswords strong, keep them tight,\nOnly download from the trusted site.\nStay alert, don’t fall for schemes,\nNot everything online is what it seems.\n' },
      { title: 'When Something Online Upsets or Scares You', file: 'Growing Minds Junior/Course 3/Lesson 4_ When Something Online Upsets or Scares You.mp3', lyrics: '(Verse 1)\nIf something online makes you scared or upset,\nTrust your feelings—don’t ignore it yet.\nIt’s not your fault, it’s okay to feel,\nYou’ve got the right to take the wheel.\n\n(Pre-Chorus)\nStop scrolling, close the page,\nDon’t share it, don’t engage.\n\n(Chorus)\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n\n(Verse 2 – Upsetting Content & Threats)\nViolence, bullying, or things that scare,\nMessages that try to trap you there.\nStop, block, take screenshots too,\nTell an adult, they’ll guide you through.\n\nBlackmail threats? Don’t give in,\nThey’re the wrong one, you don’t have to spin.\nDon’t delete—save the proof,\nYour voice is strong, your power’s truth.\n\n(Pre-Chorus)\nAdults can help you make it stop,\nYou’re not alone, you’ve got the top.\n\n(Chorus)\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n\n(Bridge – Reporting & Safety)\nUse the report button, don’t hesitate,\nProtect yourself, don’t leave it to fate.\nAdults deal with this every day,\nThey’ll help you safely find your way.\n\nRemember, it’s never your fault,\nThey’re the one who broke the law.\nTake screenshots, block, and show,\nPower’s back in your control.\n\n(Final Chorus)\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n' },
      { title: 'Being Kind Online', file: 'Growing Minds Junior/Course 3/Lesson 5_ Being Kind Online - Your Words Have Real Impact.mp3', lyrics: 'If something online makes you scared or upset,\nTrust your feelings—don’t ignore it yet.\nIt’s not your fault, it’s okay to feel,\nYou’ve got the right to take the wheel.\n\nStop scrolling, close the page,\nDon’t share it, don’t engage.\n\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n\nViolence, bullying, or things that scare,\nMessages that try to trap you there.\nStop, block, take screenshots too,\nTell an adult, they’ll guide you through.\n\nBlackmail threats? Don’t give in,\nThey’re the wrong one, you don’t have to spin.\nDon’t delete—save the proof,\nYour voice is strong, your power’s truth.\n\nAdults can help you make it stop,\nYou’re not alone, you’ve got the top.\n\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n\nUse the report button, don’t hesitate,\nProtect yourself, don’t leave it to fate.\nAdults deal with this every day,\nThey’ll help you safely find your way.\n\nRemember, it’s never your fault,\nThey’re the one who broke the law.\nTake screenshots, block, and show,\nPower’s back in your control.\n\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n' }
    ],
    remember: { title: 'Remember This Course 3', file: 'Growing Minds Junior/Course 3/Remember This Course 3.mp3', lyrics: 'The internet connects the world tonight,\nStrangers everywhere, not always right.\nTreat it like a street you walk outside,\nKeep your info safe, don’t let it slide.\n\nName, location, school, and phone,\nPasswords, birthday—keep them your own.\n\nThink before you share, think before you click,\nKeep yourself safe, don’t fall for tricks.\nBe kind online, your words have weight,\nDon’t bully, mock, or make someone hate.\nThink before you share, keep your info tight,\nStay smart, stay safe, do what’s right.\n\nDon’t meet someone you’ve only seen online,\nOnly go with parents, they’ll keep you fine.\nSuspicious links and downloads, don’t press,\nProtect your device, avoid the stress.\n\nBe cautious, think twice, stay aware,\nYour safety matters everywhere.\n\nThink before you share, think before you click,\nKeep yourself safe, don’t fall for tricks.\nBe kind online, your words have weight,\nDon’t bully, mock, or make someone hate.\nThink before you share, keep your info tight,\nStay smart, stay safe, do what’s right.\n\nCompliment, defend, and leave a light,\nOne kind comment can make it right.\nRespect each person, don’t spread what’s wrong,\nOnline or offline, we all belong.\n\nThink before you share, think before you click,\nKeep yourself safe, don’t fall for tricks.\nBe kind online, your words have weight,\nDon’t bully, mock, or make someone hate.\nThink before you share, keep your info tight,\nStay smart, stay safe, do what’s right.\n' }
  },
  'c4': {
    lessons: [
      { title: 'What is a Stranger Really?', file: 'Growing Minds Junior/Course 4/Lesson 1_ What is a Stranger Really_.mp3', lyrics: 'Strangers walk around every day,\nMost are kind, just on their way.\nTeachers, shopkeepers, nurses too,\nUsually safe, just like you.\n\nBut some people hide the wrong inside,\nYou can’t tell at first glance, no matter the guide.\n\nUse your stranger sense, trust what you feel,\nStep back, stay safe, your instincts are real.\nNever get in a car, never give your info,\nGo somewhere safe, don’t let them trick you so.\nYour safety matters more than being polite,\nMove away, find a grown-up, do what’s right.\n\nIf you’re lost or scared, who can you see?\nLibrarians, guards, teachers—you can trust these.\nPolice officers, shop workers, someone around,\nAsk for help, safety can be found.\n\nAlways stay wary, listen inside,\nIf it feels wrong, don’t let them guide.\n\nUse your stranger sense, trust what you feel,\nStep back, stay safe, your instincts are real.\nNever get in a car, never give your info,\nGo somewhere safe, don’t let them trick you so.\nYour safety matters more than being polite,\nMove away, find a grown-up, do what’s right.\n\nDon’t go somewhere private, don’t hand out your name,\nDon’t let strangers inside or play their game.\nSay “No” if you need to, it’s okay to be bold,\nProtect yourself first—that’s the rule to hold.\n\nUse your stranger sense, trust what you feel,\nStep back, stay safe, your instincts are real.\nNever get in a car, never give your info,\nGo somewhere safe, don’t let them trick you so.\nYour safety matters more than being polite,\nMove away, find a grown-up, do what’s right.\n' },
      { title: 'What Makes an Adult Safe?', file: 'Growing Minds Junior/Course 4/Lesson 2_ What Makes an Adult Safe_ .mp3', lyrics: 'Everyone needs someone who’ll hear,\nA grown-up who listens, someone sincere.\nBelieves you, cares, and takes you serious,\nExplains things clearly, keeps boundaries curious.\n\nDoesn’t make you do things that feel wrong,\nAlways there, steady and strong.\n\nTrusted voices, people who care,\nParents, teachers, anyone there.\nSomeone to tell when something’s not right,\nThey’ll help you, guide you, shine the light.\nTrusted voices, you’re not alone,\nSay what happened, make it known.\n\nThink of three to five, write them down,\nPeople you trust, people around.\nSee them often, feel safe to share,\nThey’ll listen, support, and always care.\n\nPick a calm moment, tell them the truth,\nWho, what, when, where—they’ll help you move.\n\nTrusted voices, people who care,\nParents, teachers, anyone there.\nSomeone to tell when something’s not right,\nThey’ll help you, guide you, shine the light.\nTrusted voices, you’re not alone,\nSay what happened, make it known.\n\nIt’s okay to cry, it’s okay to be scared,\nA trusted adult will always be prepared.\nDon’t wait too long, don’t hide away,\nThey’ll help you through, each step, each day.\n\nTrusted voices, people who care,\nParents, teachers, anyone there.\nSomeone to tell when something’s not right,\nThey’ll help you, guide you, shine the light.\nTrusted voices, you’re not alone,\nSay what happened, make it known.\n' },
      { title: 'The Never Go Anywhere Rule', file: 'Growing Minds Junior/Course 4/Lesson 3_ The _Never Go Anywhere_ .mp3', lyrics: 'Most strangers are harmless, but you can’t be sure,\nNever get in a car, never give info to be sure.\nIf someone makes you uncomfortable or feels wrong,\nStep back, move away, your instincts are strong.\n\nTrusted adults listen, believe, and care,\nThree to five people you know are always there.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\nIf someone says, “Your parent sent me,”\nCheck first—don’t go blindly.\nSurprises are okay, happy and sweet,\nSecrets from adults? Don’t accept deceit.\n\nIf someone touches you in a way that feels wrong,\nTell a trusted adult—it makes you strong.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\nDon’t wait, don’t hide, don’t keep it inside,\nThe trusted adults on your list will guide.\nYou’re brave, you’re strong, you know what’s right,\nSpeak up, take action, shine your light.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\n' }
    ],
    remember: { title: 'Remember This Course 4', file: 'Growing Minds Junior/Course 4/Remember This Course 4.mp3', lyrics: 'Most people you pass are just living their lives,\nBut you can’t tell who’s safe just by their eyes.\nSo I keep my distance, I play it smart,\nI don’t give my name, I don’t share that part.\n\nNo getting in cars, no “come with me,”\nNo walking off where I can’t be seen.\nIf something feels off, I trust that sign,\nStep away quick, I draw the line.\n\nI don’t ignore it, I don’t pretend,\nI move away and tell someone I trust in the end.\n\nCheck first, don’t just go,\nIf they say your parents sent them—no.\nIf you didn’t hear it straight from home,\nThat’s your answer—don’t go alone.\nSpeak up, you won’t get in trouble,\nYour safety matters more than subtle.\n\nGot a few people I know I can call,\nThey listen, believe me, they’ve got it all.\nThree, four, maybe five I trust,\nIf something goes wrong, I tell them, I must.\n\nI don’t keep it in, I don’t wait it out,\nIf it feels serious, I speak it out loud.\n\nEven if it’s hard, even if I’m unsure,\nTelling someone makes it more secure.\n\nCheck first, don’t just go,\nIf they say your parents sent them—no.\nIf you didn’t hear it straight from home,\nThat’s your answer—don’t go alone.\nSpeak up, you won’t get in trouble,\nYour safety matters more than subtle.\n\nSurprises are fun, yeah they come with a smile,\nBut secrets from adults? That’s not their style.\nIf they say “don’t tell,” that’s a warning sign,\nSafe adults don’t cross that line.\n\nIf plans were real, you would already know,\nSo go back to someone safe—don’t go.\n\nCheck first, don’t just go,\nIf it’s not confirmed, then it’s a no.\nTrust your gut, don’t override,\nGet to a safe place, stay inside.\nSpeak up strong, don’t keep it small,\nThere’s always someone you can call.\n' }
  },
  'c5': {
    lessons: [
      { title: 'Your Body Belongs to You', file: 'Growing Minds Junior/Course 5/Lesson 1_ Your Body Belongs to You.mp3', lyrics: 'Most strangers are harmless, but you can’t be sure,\nNever get in a car, never give info to be sure.\nIf someone makes you uncomfortable or feels wrong,\nStep back, move away, your instincts are strong.\n\nTrusted adults listen, believe, and care,\nThree to five people you know are always there.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\nIf someone says, “Your parent sent me,”\nCheck first—don’t go blindly.\nSurprises are okay, happy and sweet,\nSecrets from adults? Don’t accept deceit.\n\nIf someone touches you in a way that feels wrong,\nTell a trusted adult—it makes you strong.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\nDon’t wait, don’t hide, don’t keep it inside,\nThe trusted adults on your list will guide.\nYou’re brave, you’re strong, you know what’s right,\nSpeak up, take action, shine your light.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n' },
      { title: 'Private Parts and Safe vs Unsafe Touch', file: 'Growing Minds Junior/Course 5/Lesson 2_ Private Parts and Safe vs Unsafe Touch.mp3', lyrics: 'The parts of me that no one sees,\nAre mine alone, they belong to me.\nCovered up, that’s how it stays,\nNot for others, not for display.\n\nI know what’s right, I know the line,\nIf something feels off, I trust the sign.\n\nPrivate means mine, no one decides,\nI choose my space, I set the lines.\nIf it’s not for health or care,\nIt’s not okay, it’s not fair.\nPrivate means mine, I speak it clear,\nIf something’s wrong, I tell, I don’t disappear.\n\nSometimes care means help or checks,\nParents or doctors with respect.\nThey explain, they don’t hide,\nSomeone I trust is there beside.\n\nBut if someone crosses that line for real,\nOr asks for things that don’t feel right or real,\nThat’s not care, that’s not okay,\nI don’t stay quiet, I don’t delay.\n\nDoesn’t matter who they are,\nIf it feels wrong, it’s gone too far.\n\nPrivate means mine, no one decides,\nI choose my space, I set the lines.\nIf it’s not for health or care,\nIt’s not okay, it’s not fair.\nPrivate means mine, I speak it clear,\nIf something’s wrong, I tell, I don’t disappear.\n\nIt’s not just touch, it can be words,\nImages, questions that feel absurd.\nIf they ask for pictures or make it strange,\nThat’s not normal—that’s not a game.\n\nEven if I feel afraid,\nEven if threats are being made,\nI tell someone, I won’t hold it in,\nBecause I know I didn’t do anything.\n\nPrivate means mine, I stand my ground,\nMy voice is strong, I won’t back down.\nIt’s not my fault, I did no wrong,\nI speak it out, I stay strong.\nPrivate means mine, I make it known,\nI’m not alone—I’m never alone.\n' },
      { title: 'Your Right to Say No', file: 'Growing Minds Junior/Course 5/Lesson 3_ Your Right to Say No - Even to Adults.mp3', lyrics: 'I’ve got a voice and I’m gonna use it,\nIf something feels wrong, I won’t just lose it.\nEven with people I know real well,\nI trust myself more than what they tell.\n\nI don’t owe yes just to be polite,\nI choose what’s wrong and what feels right.\n\nThey might not like it, that’s okay,\nI don’t have to give my say away.\n\nNo means no, I said what I said,\nI don’t need pressure inside my head.\nI stand my ground, I draw the line,\nMy choice, my space, my time.\nNo means no, don’t push me through,\nRespect my words like I respect you.\n\nI can say it calm, I can say it strong,\n“I don’t want to” is enough on its own.\nMaybe I wave, maybe I walk away,\nMaybe “I’ll ask at home” is what I say.\n\nI don’t need reasons to make it right,\nMy answer’s enough, I don’t need to fight.\n\nIf they keep pushing, cross that line,\nThat’s when I know it’s not alright.\n\nNo means no, I said what I said,\nI don’t need pressure inside my head.\nI stand my ground, I draw the line,\nMy choice, my space, my time.\nNo means no, don’t push me through,\nRespect my words like I respect you.\n\nIf they get angry, try to control,\nMake me feel bad or take a toll,\nThat’s not okay, I won’t ignore,\nI tell someone I trust for sure.\n\nI can repeat it, clear and slow,\n“I said no, I still mean no.”\n\nI’m not rude for protecting me,\nI’m just choosing my own safety.\n\nNo means no, it stays the same,\nNot a question, not a game.\nI stand strong, I won’t fold,\nMy voice matters, brave and bold.\nNo means no, and that’s enough,\nI choose me when things get tough.\n' },
      { title: 'Telling a Trusted Adult', file: 'Growing Minds Junior/Course 5/Lesson 4_ Telling a Trusted Adult.mp3', lyrics: '(Verse 1)\nIf something happened and it don’t feel right,\nYou don’t have to carry that inside.\nEven if it’s old, even if it’s new,\nYou can still speak up, someone will hear you.\n\n(Pre-Chorus)\nYou don’t need perfect words to say,\nJust start somehow, don’t turn away.\n\n(Chorus)\nTell someone, don’t hold it in,\nThat’s where healing can begin.\nYou’re not alone, you don’t have to hide,\nThere’s someone safe right by your side.\nTell someone, let it be known,\nYou deserve to feel safe, to feel at home.\n\n(Verse 2 – Why It Matters)\nTelling brings help, it makes things change,\nStops the hurt, breaks the chain.\nIt’s not just you, it can protect,\nOthers too from the same effect.\n\n(Pre-Chorus)\nSay what you can, that’s enough,\nYou don’t need to get it perfect to be strong.\n\n(Chorus)\nTell someone, don’t hold it in,\nThat’s where healing can begin.\nYou’re not alone, you don’t have to hide,\nThere’s someone safe right by your side.\nTell someone, let it be known,\nYou deserve to feel safe, to feel at home.\n\n(Bridge – Reassurance & Rights)\nYour body’s yours, you choose what’s right,\nYou can say no, you don’t have to fight.\nPrivate means yours, no one decides,\nAnd none of this is your fault inside.\n\nIf they don’t listen the first time through,\nTell someone else—keep going, you.\n\n(Break / Soft Section)\nIt’s okay to cry, it’s okay to shake,\nYou’re still strong with every step you take.\n\n(Final Chorus)\nTell someone, don’t stay quiet,\nYour voice matters—don’t deny it.\nYou’re not to blame, you did no wrong,\nYou’re still brave, you’re still strong.\nTell someone, let it be known,\nYou are never, ever alone.\n' }
    ],
    remember: { title: 'Remember This Course 5', file: 'Growing Minds Junior/Course 5/Remember This Course 5.mp3', lyrics: 'If something happened and it don’t feel right,\nYou don’t have to carry that inside.\nEven if it’s old, even if it’s new,\nYou can still speak up, someone will hear you.\n\nYou don’t need perfect words to say,\nJust start somehow, don’t turn away.\n\nTell someone, don’t hold it in,\nThat’s where healing can begin.\nYou’re not alone, you don’t have to hide,\nThere’s someone safe right by your side.\nTell someone, let it be known,\nYou deserve to feel safe, to feel at home.\n\nTelling brings help, it makes things change,\nStops the hurt, breaks the chain.\nIt’s not just you, it can protect,\nOthers too from the same effect.\n\nSay what you can, that’s enough,\nYou don’t need to get it perfect to be strong.\n\nTell someone, don’t hold it in,\nThat’s where healing can begin.\nYou’re not alone, you don’t have to hide,\nThere’s someone safe right by your side.\nTell someone, let it be known,\nYou deserve to feel safe, to feel at home.\n\nYour body’s yours, you choose what’s right,\nYou can say no, you don’t have to fight.\nPrivate means yours, no one decides,\nAnd none of this is your fault inside.\n\nIf they don’t listen the first time through,\nTell someone else—keep going, you.\n\nIt’s okay to cry, it’s okay to shake,\nYou’re still strong with every step you take.\nTell someone, don’t stay quiet,\nYour voice matters—don’t deny it.\nYou’re not to blame, you did no wrong,\nYou’re still brave, you’re still strong.\nTell someone, let it be known,\nYou are never, ever alone.\n' }
  },
  // ─── Junior: Emotional Wellbeing and Mental Health (c36) ───
  'c36': {
    lessons: [
      // Lesson 0: Understanding Your Feelings
      {
        title: 'Understanding Your Feelings',
        file: 'Growing Minds Junior/Course 6/Understanding Your Feelings.mp3',
        lyrics: `Happiness and sadness, anger, fear,
Excitement, worry, they all live here.
Every feeling that you've known,
Is a normal part of being grown.

Feelings come and feelings go,
Like the weather, like the snow.
What you're feeling right this way,
Is not forever, not here to stay.

Sometimes two things come at once,
Happy, nervous, all at once.
Angry, sad, it's all okay,
Feelings work that way some days.

Your body knows before your head,
Tight inside or feeling red.
Heavy chest or clenching fist,
These are signals, don't be missed.

Talk about the way you feel,
Say the words and make it real.
I feel sad, I feel afraid,
Talking means you've got it made.

Every feeling has a place,
Written right across your face.
All of them are part of you,
And every single one is true.`
      },
      // Lesson 1: Dealing with Stress and Worry
      {
        title: 'Dealing with Stress and Worry',
        file: 'Growing Minds Junior/Course 6/Dealing with Stress and Worry.mp3',
        lyrics: `Everybody gets that feeling,
Worry spinning, head is reeling.
Tests and homework, friends who fight,
Changes that don't feel quite right.

Heart beats fast and breathing's quick,
Stomach tight and feeling sick.
That's your body saying hey,
Something's hard for you today.

Talk to someone, say it loud,
Worries shrink when shared out.
Breathe in slowly, four by four,
Hold it, let it, breathe some more.

Move your body, kick a ball,
Take a walk around the hall.
Take a break and come back strong,
Write it down, it won't take long.

It's okay to not be fine,
You don't have to hide behind a line.
The bravest thing that you can do,
Is tell someone what's bothering you.`
      },
      // Lesson 2: Helping Friends Who Are Struggling
      {
        title: 'Helping Friends Who Are Struggling',
        file: 'Growing Minds Junior/Course 6/Helping Friends Who Are Struggling.mp3',
        lyrics: `If your friend's been acting strange,
Quiet, angry, out of range,
Don't just look the other way,
You could make a difference today.

Ask them hey, are you okay,
Something small can light the way.
Listen close, you don't need words,
Sometimes being there is heard.

Keep inviting, don't give up,
Even when they shut the door shut.
Showing up says I still care,
When you're ready, I'll be there.

But if they say they're being hurt,
Or hurting themselves beneath their shirt,
That's too big to hold alone,
Tell a grown-up, pick up the phone.

It's not snitching, it's not mean,
It's the bravest thing you've seen.
Getting help for someone's pain,
Is how you love them through the rain.`
      },
      // Lesson 3: When to Ask for Help and Who to Talk To
      {
        title: 'When to Ask for Help and Who to Talk To',
        file: 'Growing Minds Junior/Course 6/When to Ask for Help and Who to Talk To.mp3',
        lyrics: `Asking for help's not giving in,
It's where the brave stuff all begins.
Doctors, teachers, parents too,
They all ask for help, and so can you.

If you're sad and it won't lift,
If sleep is hard and your mood has shifted,
If the things you loved don't shine,
That's a sign, and that's just fine.

Start with mum or dad or carer,
Teacher, auntie, someone fairer.
Say I need to talk to you,
I've been feeling sad and blue.

You don't need the perfect words,
You just need to say what hurts.
If the first one doesn't hear,
Tell another, loud and clear.

Keep on telling, don't you stop,
You deserve to reach the top.
Asking's brave, asking's strong,
You've been right here all along.`
      },
    ],
    remember: {
      title: 'Remember This',
      file: 'Growing Minds Junior/Course 6/Remember This Course 6.mp3',
      lyrics: `All feelings are normal, they come and they go,
Your body gives signals to let you know.
Sadness lifts, anger fades,
Worry eases, fear won't stay.

Stress and worry are part of life,
But when they take over, reach for the light.
Talk to someone, move your body,
Breathe in slowly, take a break, everybody.

Notice when your friends are down,
Ask and listen, keep them around.
But if they say they're being hurt,
Tell a trusted adult, put safety first.

Asking for help is brave and strong,
Talk to your parent, you can't go wrong.
Teacher, carer, someone you trust,
If the first one won't help, keep going, you must.

Every feeling has a place,
You deserve support and space.
When things feel too much to bear,
Speak up loud, someone will care.`
    }
  },

  // ─── Junior: Fire Safety and Home Emergencies (c39) ───
  'c39': {
    lessons: [
      // Lesson 0: How Fires Start and How to Prevent Them
      {
        title: 'How Fires Start and How to Prevent Them',
        file: 'Growing Minds Junior/Course 7/How Fires Start and How to Prevent Them.mp3',
        lyrics: `Heat and fuel and oxygen,
Three things working, fire's begun.
Take one out, the fire dies,
That's the triangle, now you're wise.

Cooking left without a care,
Candles burning, no one there.
Cables frayed and sockets stacked,
That's how fires find their track.

Oil is smoking in the pan,
Turn it off, that's the plan.
Never throw in water though,
That will make the fire grow.

Charging phones beneath your sheets,
Traps the heat where danger meets.
Keep it clear and keep it cool,
That's the fire prevention rule.

Smoke alarms on every floor,
Test them and they'll watch your door.
Batteries low, that little beep,
Change them out to keep your sleep.`
      },
      // Lesson 1: Escape Plans and Getting Out Safely
      {
        title: 'Escape Plans and Getting Out Safely',
        file: 'Growing Minds Junior/Course 7/Escape Plans and Getting Out Safely.mp3',
        lyrics: `Get out, stay out, call for aid,
That's the plan that must be made.
Don't fight the fire, don't collect your stuff,
Getting out is more than enough.

Two ways out of every room,
Meeting point beneath the moon.
Make the plan before the day,
So everyone knows the way.

Smoke alarm goes off at night,
Roll from bed and hold on tight.
Stay down low beneath the smoke,
Touch the door before it's spoke.

Hot means stop and stay right here,
Cool means go, the path is clear.
Stairs not lifts, keep moving down,
Out the house and safe and sound.

Once you're out, you don't go back,
Not for phones or not for that.
Firefighters have the gear,
You stay safe, you stay right here.`
      },
      // Lesson 2: Burns, Clothes on Fire, and First Response
      {
        title: 'Burns, Clothes on Fire, and First Response',
        file: 'Growing Minds Junior/Course 7/Burns, Clothes on Fire, and First Response.mp3',
        lyrics: `If your clothes are catching flame,
Stop, Drop, Roll is still the game.
Stop don't run, the wind's no friend,
Drop and roll to make it end.

Cover up your face real tight,
Roll until you've won the fight.
Blanket, coat can help out too,
Smother flames, that's what they do.

Touched something hot, it starts to sting,
Cool the burn, the water bring.
Twenty minutes, let it flow,
Not ice, not butter, that's a no.

Cling film loose to keep it clean,
Don't pop blisters, don't be mean.
Bigger than your palm or on your face,
Get to hospital, that's the place.

Twenty minutes, cool and slow,
That's the thing you need to know.
Running water, nothing more,
That's what first response is for.`
      },
      // Lesson 3: Home Hazards and Keeping Your Family Safe
      {
        title: 'Home Hazards and Keeping Your Family Safe',
        file: 'Growing Minds Junior/Course 7/Home Hazards and Keeping Your Family Safe.mp3',
        lyrics: `Home is where we feel the best,
But there's hazards, time to test.
Electricity and water, don't combine,
Keep those plugs away from bathtime.

Rotten eggs is what you'll smell,
If the gas is not so well.
No switches, no flames, no phone inside,
Get outside, open it wide.

Carbon monoxide has no face,
Can't see it, smell it, taste or trace.
Alarms detect what you cannot,
Headaches, dizzy, feeling hot.

Medicine and cleaning spray,
Keep from little ones away.
Spills on floors get cleaned up quick,
Stairs stay clear so no one's tripped.

Fuse box, gas valve, water main,
Ask your family to explain.
Knowing where they are today,
Keeps you safe in every way.`
      },
    ],
    remember: {
      title: 'Remember This',
      file: 'Growing Minds Junior/Course 7/Remember this Course 7.mp3',
      lyrics: `Fire needs heat, fuel, and oxygen,
Most house fires can be prevented.
Never throw water on a grease fire,
Smoke alarms save lives, keep them wired.

Every family needs a plan,
Meeting point, escape, you can.
If there's a fire, get out, stay out,
Call for help, that's what it's about.

Never go back inside that door,
Not for phones or pets or more.
Firefighters have the gear,
You stay safe, you stay right here.

If your clothes catch fire one day,
Stop, Drop, Roll is what you say.
Cool a burn for twenty minutes,
Running water, nothing in it.

Electricity and water don't mix,
Gas smells like eggs, get out quick.
Carbon monoxide has no face,
Alarms are the only way to trace.

Fuse box, gas valve, water main,
Know where they are, know their name.
Being aware keeps you prepared,
Safety starts with being scared to be unaware.`
    }
  },

  // ─── Early Years: Fire Safety and Home Emergencies (c35) ───
  'c35': {
    lessons: [
      // Lesson 0: What is a Fire and What Does a Smoke Alarm Do?
      {
        title: 'What is a Fire and What Does a Smoke Alarm Do?',
        file: 'Growing Minds Early Years/Course 6/What is a Fire and What Does a Smoke Alarm Do_.mp3',
        lyrics: `Fire is hot and fire is fast,
If you see it, run right past.
Matches, lighters, candles too,
Those are not for me or you.

If you find one on the floor,
Do not touch it, that's the law.
Tell your grown-up right away,
They will keep you safe today.

On your ceiling, round and small,
There's a helper on the wall.
When there's smoke it beeps out loud,
Beep beep beep, it shouts so proud.

That loud beep means out the door,
Do not wait a second more.
Ask your grown-up, let them show,
What it sounds like, so you know.

When you hear that beeping sound,
Leave the house and safe be found.
Fire is hot and fire is fast,
Get outside and hold on fast.`
      },
      // Lesson 1: Getting Out of Your Home Safely
      {
        title: 'Getting Out of Your Home Safely',
        file: 'Growing Minds Early Years/Course 6/Getting Out of Your Home Safely.mp3',
        lyrics: `If you hear the beep beep beep,
Or you see the smoke that creeps,
Leave your toys and leave your shoes,
There is no time left to choose.

Get down low, get on the ground,
Crawl along without a sound.
Smoke goes up and clean air stays,
Down below where safe air plays.

Touch the door before you go,
Use your hand so you will know.
If it's hot then stay right there,
Shout for help, someone will care.

If it's cool then out you go,
To your meeting point below.
That's the place outside your door,
Where your family waits for sure.

Get out fast and stay outside,
Do not go back in and hide.
Meeting point is where you'll be,
Safe and sound for all to see.`
      },
      // Lesson 2: What to Do if Your Clothes Catch Fire
      {
        title: 'What to Do if Your Clothes Catch Fire',
        file: 'Growing Minds Early Years/Course 6/What to Do if Your Clothes Catch Fire.mp3',
        lyrics: `If your clothes are catching light,
Three big words will make it right.
Stop, Drop, and Roll today,
Learn them now and you'll be okay.

Stop right there, don't you run,
Running makes the fire burn.
Wind will feed those nasty flames,
Standing still is how you're safe.

Drop down to the ground real quick,
Cover up your face like this.
Hands across to keep it clear,
You are brave, you have no fear.

Roll and roll and roll around,
Back and forth along the ground.
Rolling puts the fire out,
That is what it's all about.

Stop, Drop, and Roll, let's say it loud,
Stop, Drop, and Roll, we're safe and proud.
Stop, Drop, and Roll, remember me,
Three little words to keep you free.`
      },
      // Lesson 3: Staying Safe at Home
      {
        title: 'Staying Safe at Home',
        file: 'Growing Minds Early Years/Course 6/Staying Safe at Home.mp3',
        lyrics: `My home is safe, my home is warm,
But there are things to watch out for.
The oven's hot, the hob is too,
Even when it looks like it's through.

Plug sockets are not for play,
Never stick things in, okay?
Electricity is hiding there,
Only grown-ups, take great care.

Medicine is not a sweet,
Even though it looks a treat.
Bottles underneath the sink,
Are not for you to ever drink.

If you spill then tell someone,
Slippy floors are not much fun.
If something's wrong and you need aid,
Tell your grown-up, don't be afraid.

Hot things, plug sockets, bottles, pills,
Only grown-ups handle these.
You stay safe, you stay so smart,
Knowing this right from the start.`
      },
    ],
    remember: {
      title: 'Remember This',
      file: 'Growing Minds Early Years/Course 6/Remember This Course 6.mp3',
      lyrics: `Hot things are not for you and me,
The oven, hob, and the plug, you see.
Medicine and bottles under the sink,
They're not for eating, they're not for drink.
Only grown-ups touch those things,
Let's learn the rules that safety brings.

Fire is dangerous, fire is mean,
The hottest thing you've ever seen.
Matches, lighters, candles too,
They are not for me or you.
Leave them be and walk away,
Tell a grown-up straight away.

Beep beep beep, what's that sound,
The smoke alarm is going round.
It's telling you to leave right now,
Out the door, we'll show you how.
When you hear it, do not stay,
Get outside without delay.

If there's smoke then get down low,
Crawl along the floor and go.
Touch the door before you do,
If it's hot, it's not safe through.
Find another way to be,
Or shout for help so they can see.

Meeting point is where you go,
Outside the house where grown-ups know.
Do not go back in for toys,
Not for teddies, not for noise.
Stay outside and wait right there,
Firefighters are on their way, they care.

If your clothes catch fire one day,
Stop, Drop, Roll is what you say.
Do not run, the wind is bad,
Drop and roll on the ground you have.
Stop, Drop, Roll will save the day,
Remember those three words, okay.

Hot things, plugs, and bottles too,
Medicine is not for you.
Matches, lighters, leave alone,
Smoke alarm means leave your home.
Get down low and crawl outside,
Stop, Drop, Roll if fire's inside.
These are things that keep you safe,
Grown-ups' things stay in their place.`
    }
  },

  // ─── Street Smart: Personal Safety & Awareness (c31) ───
  'c31': {
    lessons: [
      { title: 'Boundaries and Instinct', file: 'Street Smart/Course 1/Neon No-Signs.mp3', lyrics: `You step too close, I take a step back,
Don't need a reason, don't need to react.
You ask too much, yeah, cross that line,
That's my space—you don't get inside.
You keep pushing like I might fold,
Like "no" needs proof, like I owe you more—
But I don't.
I feel it in my chest, something's not right,
Don't need a warning sign in neon lights.
If it feels wrong, I'm trusting that—
No second guessing, I won't go back.
No is a full sentence, I don't explain,
Don't need your pressure, don't play that game.
I draw the line, I don't pretend,
You cross it once—I'm gone again.
I don't owe you comfort, don't owe you time,
Respect my space or step outside.
Say no, mean it—every time,
That's my power, that's my line.
You keep talking like I'll give in,
Like silence means you get to win.
But I see clear what that is now—
Red flag waving, loud and proud.
I don't stay quiet to keep it smooth,
I don't stay small just to comfort you.
If you don't listen, I'm walking out—
That's what respect is about.
That voice in my head says "leave right now,"
I trust it more than I trust your doubt.
Don't need to justify, don't need a why,
Safety first—I'm choosing mine.
No is a full sentence, I don't explain,
Don't need your pressure, don't play that game.
I draw the line, I don't pretend,
You cross it once—I'm gone again.
I don't owe you comfort, don't owe you time,
Respect my space or step outside.
Say no, mean it—every time,
That's my power, that's my line.
Exit's there—I've seen it before,
Phone charged, keys in my pocket, I'm out the door.
Someone knows where I'm meant to be,
That's not fear—that's strategy.
I don't wait till it all goes wrong,
I move fast, I move on.
No is a full sentence, hear it clear,
I won't shrink just to keep you near.
I know my limits, I know my worth,
I won't trade that for anything on earth.
Trust my gut, I read the signs,
Draw my boundaries, hold my line.
Say no, mean it—every time,
That's my power, that's my life.` },
      { title: 'If Someone Is Following You', file: 'Street Smart/Course 1/If Someone Is Following You.mp3', lyrics: `Same footsteps, same pace behind,
Turn once, twice—it's still the same line.
Car slows down when I speed up,
Something's off, yeah, that's enough.
I don't wait for proof to show,
I don't need to "maybe" know—
I trust that feeling when it hits,
That quiet voice that never quits.
Heartbeat steady, think it through,
I know exactly what to do.
Not going home, not leading there,
I change my path—I'm getting clear.
Don't look back, just move ahead,
To the lights, where people are instead.
Shops, streets, anywhere I'm seen,
Safe is smart, not overthinking.
Say it out loud, make it known,
"I think we're followed—let's not go home."
Stay in the crowd, stay in the light,
I'm in control, I'll be alright.
Turn a corner, switch the route,
In and out—keep moving through.
I don't stop, I don't engage,
No eye contact, don't escalate.
Phone in hand, I make the call,
"Hey, I think I'm followed—just stay on."
Send the place, keep someone near,
I'm not alone, I've got them here.
Don't look back, just move ahead,
To the lights, where people are instead.
Shops, streets, anywhere I'm seen,
Safe is smart, not overthinking.
Say it out loud, make it known,
"I think we're followed—let's not go home."
Stay in the crowd, stay in the light,
I'm in control, I'll be alright.
Doorstep, knock—don't hesitate,
Wave a car down, don't wait.
Most will help when they see the signs,
You don't have to face this alone tonight.
No questions asked, just get to safe,
Distance first—create that space.
Don't look back, I trust my mind,
Instinct's there to keep me right.
I don't freeze, I don't pretend,
I move fast till it all ends.
Get to safety, then I say,
What happened, even if I'm unsure that day.
Strong means acting, not staying still—
I trust myself—and I always will.` },
      { title: 'De-escalation and Staying Safe in Public', file: 'Street Smart/Course 1/De-escalation and Staying Safe in Public.mp3', lyrics: `Voices rising, tension tight,
Feels like it could turn to a fight.
They want a reaction, something loud,
Tryna pull a scene, draw a crowd.
But I'm not here to prove I'm right,
Not every moment needs a fight.
I read the room, I know the tone,
And I decide what I condone.
Keep it steady, keep it low,
Short replies and then I go.
Hands where they can always see,
No sudden moves, just let me leave.
I don't match your energy,
I don't play that game.
I can walk away in peace,
I don't need the name.
Calm voice, clear mind,
Step back, take time—
Real strength isn't standing still,
It's knowing when to walk the line.
Words get thrown, I let them pass,
Silence cuts it down real fast.
I don't owe you anything,
Not my time, not my reaction.
If it shifts, I read the sign,
Step back slow, I draw the line.
"Yeah, okay—I'm gonna go,"
Move away, stay in control.
I don't match your energy,
I don't play that game.
I can walk away in peace,
I don't need the name.
Calm voice, clear mind,
Step back, take time—
Real strength isn't standing still,
It's knowing when to walk the line.
Step back—move out—don't engage!
Stay calm—stay sharp—leave the space!
Step back—move out—don't react!
Get safe—that's strength—that's a fact!
Walk away! Walk away!
Live to see another day!
Walk away! Walk away!
Safety first—that's the way!
Not every moment's worth the risk,
Not every line needs to be fixed.
If it feels wrong, I trust that call,
My safety matters most of all.
Crowds and lights, I move toward,
Not empty streets I can't ignore.
I don't match your energy,
I rise above the noise.
I don't need to win this now,
I choose the smarter choice.
Calm voice, clear mind,
I protect what's mine—
Real strength isn't standing still,
It's walking away on time.` },
      { title: 'Staying Safe at Night and in Unfamiliar Places', file: 'Street Smart/Course 1/Staying Safe at Night and in Unfamiliar Places.mp3', lyrics: `Dark streets, lights are low, gotta see it all,
Shortcut looks fast, but I won't fall.
Stick to main roads, lit up and alive,
Passing cars, open shops—keep the vibe.
Phone in hand, one ear free,
Listen close, stay alert, that's the key.
Headphones out, eyes up, know who's near,
Situational awareness—my weapon here.
New place, new route, gotta know the map,
Know the exits, the shops, where help is at.
Share my location, don't wander blind,
Own my moves, own my time.
Level up at night, I see it all,
Stay aware, stand tall.
Trust my gut, don't let it slide,
I pick the path where I survive.
Well-lit streets, eyes open wide,
I don't hide, I decide.
Safety first, every step I take,
Level up at night—I own the stakes.
Friends split up, got my plan in hand,
Charged phone, cash, rides I understand.
Even if it wakes them up, that's fine,
Better safe than sorry, every single time.
New place feels strange, my chest beats fast,
Nervous or unsafe? My gut knows first.
If it feels wrong, I step, I go,
Move toward people, lights, the flow.
Route I choose, exits I see,
Every step, I move strategically.
No guessing, no hoping, just playing it smart,
I hold the map, I hold the chart.
Level up at night, I see it all,
Stay aware, stand tall.
Trust my gut, don't let it slide,
I pick the path where I survive.
Well-lit streets, eyes open wide,
I don't hide, I decide.
Safety first, every step I take,
Level up at night—I own the stakes.
Eyes up—stay sharp—don't fall!
Move smart—take charge—own it all!
Check exits—keep calm—don't run blind!
Trust your gut—it's on your side!
Level up at night, I see it all,
Stay aware, stand tall.
Trust my gut, don't let it slide,
I pick the path where I survive.
Well-lit streets, eyes open wide,
I don't hide, I decide.
Safety first, every step I take,
Level up at night—I own the stakes.` },
    ],
    remember: { title: 'Remember This Course 1', file: 'Street Smart/Course 1/Remember this course 1.mp3', lyrics: `Boundaries mine, I draw the line,
"No" is a sentence, that's just fine.
Trust my instincts, feel it in my chest,
Something's off? I move, I don't guess.
Plan my routes, know where to go,
Awareness high, let the instincts flow.
Public spaces, lit streets, eyes wide,
I don't just walk—I own the stride.
Skills not fear, that's the way,
Eyes open, I know the play.
If someone's off, I step aside,
I trust my gut—it's my guide.
Boundaries strong, I hold my line,
"No" is enough, it's by design.
Plan my route, share my location,
Backup ready, full dedication.
Trust my gut, I see the signs,
I move smart, I define the lines.
Public space, safety in sight,
Boundaries and backup—I own the night.
If it feels off, I don't pretend,
I leave the space, I don't defend.
Not paranoia—just awareness on deck,
I plan, I move, I'm ready to check.
Night or unfamiliar, I've got a map,
Phone charged, backup, that's a wrap.
Never rely on someone else to see,
I hold my plan, I stay free.
Skills not fear, that's the way,
Eyes open, I know the play.
If someone's off, I step aside,
I trust my gut—it's my guide.
Boundaries strong, I hold my line,
"No" is enough, it's by design.
Plan my route, share my location,
Backup ready, full dedication.
Trust my gut, I see the signs,
I move smart, I define the lines.
Public space, safety in sight,
Boundaries and backup—I own the night.
"No means no!"—hold the line!
"Step aside!"—stay alive!
"Plan your route!"—know the way!
"Backup ready!"—trust your sway!
Boundaries strong, I hold my line,
"No" is enough, it's by design.
Plan my route, share my location,
Backup ready, full dedication.
Trust my gut, I see the signs,
I move smart, I define the lines.
Public space, safety in sight,
Boundaries and backup—I own the night.` }
  },

  // ─── Street Smart: Online Safety and Social Media (c32) ───
  'c32': {
    lessons: [
      { title: 'Your Digital Footprint and Privacy', file: 'Street Smart/Course 2/Your Digital Footprint and Privacy.mp3', lyrics: `Every post, every photo, every like you send,
Leaves a mark that doesn't break, doesn't bend.
Screenshots, archives, everything can stay,
Once it's online, it doesn't fade away.
People watching—friends, strangers, schools,
Universities, jobs, they all use the rules.
Private posts can slip, context disappears,
Think twice, scroll slow, don't feed your fears.
Name and address—don't put it online,
Phone, school, routines—keep them in line.
Location, time, what you share each day,
Pieces together, it can show your way.
Think before you post, guard your space,
Digital footprint leaves a trace.
Every photo, every word, every move,
Protect yourself—the power's in what you choose.
Private accounts, restricted views,
Turn off tags, control the cues.
Every post can follow you,
Think before you post—it's true.
Layered info, one piece might be small,
Combine them together, it can reveal it all.
Profiles, routines, your check-ins, your posts,
It's like a map—don't become a ghost.
Passwords, birthdates, emails too,
Protect your identity, don't let them through.
Location off, privacy tight,
Think before you post—do it right.
Full name and school—don't mix the two,
Daily posts, check-ins—what they can do.
Messages restricted, profiles on lock,
Every click counts, every share, every block.
Think before you post, guard your space,
Digital footprint leaves a trace.
Every photo, every word, every move,
Protect yourself—the power's in what you choose.
Private accounts, restricted views,
Turn off tags, control the cues.
Every post can follow you,
Think before you post—it's true.
Think… before… you post…
Protect… your space…
Don't… give… them maps…
Control… your trace…
Think before you post, guard your space,
Digital footprint leaves a trace.
Every photo, every word, every move,
Protect yourself—the power's in what you choose.
Private accounts, restricted views,
Turn off tags, control the cues.
Every post can follow you,
Think before you post—it's true.` },
      { title: 'Online Grooming, Manipulation and Harassment', file: 'Street Smart/Course 2/Online Grooming, Manipulation and Harassment.mp3', lyrics: `Hey, don't click it, don't share it
If it feels wrong, just beware it
Your gut knows, yeah, it's right
Trust yourself, keep your light
Someone online, says they "get you"
Likes the things you like, says "you're cool too"
Starts with a text, then a little more
Wants your secrets, that's a warning, for sure
They might be a stranger, could be someone you know
Slowly pushin' boundaries, moving kinda low
Asking for pics, asking for alone time
Making you feel special, but it's crossing the line
Stop, pause, screenshot it all
Block the account if you feel small
Tell someone you trust, don't hide
Your safety's your power, it's on your side
Hey, don't click it, don't share it
If it feels wrong, just beware it
Your gut knows, yeah, it's right
Trust yourself, keep your light
Harassment online, it's repeated, it's mean
Insults, threats, posts that are obscene
Not your fault, don't take the blame
You hold the power in this game
Document it, save it, report it fast
Block the account, don't let it last
Tell a trusted adult, don't fight alone
Your safety matters, yeah, it's your zone
Your online rep, it's your choice
Post with care, and own your voice
Future friends, teachers, they'll see
Make it good, make it free
Hey, don't click it, don't share it
If it feels wrong, just beware it
Your gut knows, yeah, it's right
Trust yourself, keep your light
Your power's inside, don't let it slide
Trust your instincts, you're the guide
Online, offline, you control
Your safety's yours, that's the goal` },
      { title: 'Image Sharing, Pressure and the Law', file: 'Street Smart/Course 2/Image Sharing, Pressure and the Law.mp3', lyrics: `[Intro / Hook]
Don't send it, don't share it
If it's private, beware it
Once it's out, it's not your call
Respect yourself, that's the wall
[Verse 1]
Even if they ask, even if they plead
Even if they're your age, it's still a bad deed
The law's serious, it's not a game
One photo shared could ruin your name
Private pics? They don't stay private
Screenshots, leaks, blackmail, they riot
Friendships fade, trust can break
Once it's gone, you can't take it back
[Pre-Chorus]
No one who respects you will push you to this
If someone pressures, that's a red flag you can't miss
Your "no" is power, it's your shield
Stand strong, don't let them steal
[Hook / Chorus]
Don't send it, don't share it
If it's private, beware it
Once it's out, it's not your call
Respect yourself, that's the wall
[Verse 2]
Manipulators will lie and pretend
Say they care, act like a friend
Make you feel guilty, make you doubt
It's not love, it's a trap, check it out
If you've already sent, don't despair
Stop now, get help, there are people who care
Report it, tell an adult, stay safe online
You're not in trouble, it's not a crime
[Bridge]
Your respect, your choice, your control
Don't let anyone play that role
Keep your images, your body, your space
You're the boss, you set the pace
[Hook / Chorus]
Don't send it, don't share it
If it's private, beware it
Once it's out, it's not your call
Respect yourself, that's the wall
[Outro]
Say no, stand tall, keep your line
Your safety, your rules, your sign
Trust yourself, you know what's right
Keep it safe, day and night` },
      { title: 'Scams, Catfishing and Fake Profiles', file: 'Street Smart/Course 2/Scams, Catfishing and Fake Profiles.mp3', lyrics: `Not everyone online is who they say
Fake pics, fake stories, fake games they play
Pause, think, check the vibe
Trust your gut, don't take the dive
Catfishers hide behind a screen
Photos stolen, lives unseen
Say they care, say they're real
But their goal is to make you feel
They dodge the video, their stories don't fit
Vague details, excuses that don't quit
Ask for money, ask for more
Watch your back, don't ignore
Reverse search, check the face
Too perfect? Something's off in place
Feel it in your gut? You're right
No one online deserves your trust overnight
Not everyone online is who they say
Fake pics, fake stories, fake games they play
Pause, think, check the vibe
Trust your gut, don't take the dive
Scams come fast, "Act now, limited time!"
"Win a prize!" "Do this task, it's fine!"
Phishing links, fake logins, shady deals
Don't click, don't send, protect what's real
Anything too good to be true, it's a lie
Stop, breathe, don't comply
Tell a trusted adult, report it fast
You're smarter than they think, you'll last
Pause before you click, think before you share
Your safety online is handled with care
Scammers are clever, but you're wise too
Don't let anyone trick you
Not everyone online is who they say
Fake pics, fake stories, fake games they play
Pause, think, check the vibe
Trust your gut, don't take the dive
Check the links, protect your space
Your safety online, you own that place
Trust yourself, be alert, stay strong
You know what's right, you can't go wrong` },
    ],
    remember: { title: 'Remember This Course 2', file: 'Street Smart/Course 2/Remember This Course 2.mp3', lyrics: `Your footprint online stays forever
Think before you post, keep it clever
Screenshots, shares, nothing disappears
Your safety online is worth your years
Location, routine, personal stuff
Privacy settings help, but they're not enough
Anything can be screenshotted, shared, or leaked
Keep control of what you post, don't be tricked
Groomers online use distance and lies
Ask personal questions, tell fake ties
Secrets, pics, isolation from friends
Stay alert, trust instincts, that's how it ends
Grooming happens in person too
Know the signs, know what to do
Harassment online? Document, block, report
Tell a trusted adult, you're in support
Think before you post, think before you share
Your digital life needs your care
Trust your gut, stay aware
Safety online is everywhere
Not everyone online is who they claim
Catfish, scams, urgency games
Fake profiles, shady deals, phishing too
Pause, check, don't fall for the crew
If it feels wrong, it probably is
Your instincts are sharp, your mind is bliss
You control what you share, what you trust
Respect yourself, protect your stuff
Screenshots, passwords, block and report
Safety online is your own fort
Friends, family, adults you trust
Use their help, it's a must
Think before you post, think before you share
Your digital life needs your care
Trust your gut, stay aware
Safety online is everywhere
Digital footprint, yeah, it's real
Your posts, your pics, everything you feel
Stay smart, stay safe, keep your light
Trust yourself, and do what's right` }
  },

  // ─── Street Smart: Healthy Relationships and Boundaries (c33) ───
  'c33': {
    lessons: [
      { title: 'Healthy vs Unhealthy Relationships', file: 'Street Smart/Course 3/Healthy vs Unhealthy Relationships.mp3', lyrics: `Yeah, yeah, yeah
Feel it, feel it, feel it now
Respect, trust, boundaries, honesty
Let's go!
Your power, your rules, don't lose yourself
Say no, stand tall, protect your wealth
Friends or love, it's respect that counts
Boundaries strong, yeah, that's what's loud
Healthy friendships, that's the vibe
Fun, support, you thrive, you survive
Share your thoughts, don't hide who you are
Disagree, be free, shine like a star
No guilt trips, no secrets you must keep
Friends who respect you let your soul leap
Adventure, comfort, understanding too
That's the friendship code, always true
Controlling starts small, builds up slow
Dictates, isolates, watch it grow
Jealousy, checking, telling you what to wear
That's not love, that's a trap, beware
Your power, your rules, don't lose yourself
Say no, stand tall, protect your wealth
Friends or love, it's respect that counts
Boundaries strong, yeah, that's what's loud
Romantic love? Same foundation applies
Respect, honesty, boundaries, trust, wise
You're still yourself, your friends, your vibe
They want your happiness, not to control your life
Grooming happens online and in-person too
Coaches, leaders, older peers, they can pursue
Special attention, gifts, secrets you must keep
Red flags show up, listen to your heartbeat
If it feels wrong, it probably is
Tell a trusted adult, don't miss
You're not betraying, you're staying strong
Your power, your rules, all night long
Your power, your rules, don't lose yourself
Say no, stand tall, protect your wealth
Friends or love, it's respect that counts
Boundaries strong, yeah, that's what's loud
Respect, trust, boundaries, honesty
Your power, your rules, keep your energy
Stand tall, stay true, own your space
Dance through life at your own pace` },
      { title: 'Consent and Boundaries', file: 'Street Smart/Course 3/Consent and Boundaries.mp3', lyrics: `Listen up—
This is simple
No guesswork, no maybes
Clear means clear
Say it clear (CLEAR!)
Yes means yes (YES!)
No means no (NO!)
Nothing less
Say it once, don't push again
Respect the line, respect your friend
Consent is a yes, not silence, not maybe
Not "I guess," not "okay… maybe later"
You ask, they answer, simple and true
If it's not a yes, it's a no—follow through
No pressure, no guilt, no wearing them down
That's not respect, don't play that sound
They can change their mind, anytime they choose
Real respect means you don't confuse
No push, no chase, no second try
If it's not clear, let it pass by
Confidence is knowing when to stop
Respect right there—that's the top
Say it clear (CLEAR!)
Yes means yes (YES!)
No means no (NO!)
Nothing less
Say it once, don't push again
Respect the line, respect your friend
It's not just love, it's everyday stuff
Hugs, your phone, that's personal enough
Sharing secrets, posting online
Ask first—that's the line
Boundaries up, yeah, this is mine
My space, my time, my life, my line
"I'm not okay with that"—that's strong
No explanation needed, nothing wrong
If they cross it—step back, reset
Say it again, don't forget
Still pushin'? Then you walk away
Self-respect wins every day
You don't owe anyone comfort
At the cost of your own
Read that again
Say it clear (CLEAR!)
Yes means yes (YES!)
No means no (NO!)
Nothing less
Your voice, your rules, your space, your say
Real ones respect it anyway
Boundaries strong, stand your ground
The right people won't tear it down
Say it clear, hold it tight
That's your power, that's your right` },
      { title: 'When and How to Get Help', file: 'Street Smart/Course 3/When and How to Get Help.mp3', lyrics: `If something feels off…
You don't have to figure it out alone
If you feel controlled, like you can't be free
If you're scared of someone, or scared to speak
If they put you down, again and again
That's not okay, that's not a friend
If you're confused, don't know what's right
If something feels wrong deep inside
You don't need proof, you don't need a sign
That feeling in your chest—it's trying to guide
You don't have to carry this on your own
There are people who will help you hold
Speak up, you're not alone
There's a way out, there's a way home
Right now, your safety's first
You matter more than all the hurt
Speak up, let someone know
You don't have to face this solo
Your voice is strong, let it be heard
You deserve better, you deserve the world
Getting help doesn't mean it ends
It means support, new ways to mend
A teacher, parent, someone you trust
Let them clearly—this is a must
And if you're in danger right now, don't wait
Call for help, don't hesitate
Your safety matters more than fear
There are people who will be there
If someone hurts you, it's not your fault
Not your actions, not your thought
No excuse, no reason why
You deserve safety—don't question why
Say it out loud, let it begin
This is where you take it back again
Speak up, you're not alone
There's a way out, there's a way home
Right now, your safety's first
You matter more than all the hurt
Speak up, let someone know
You don't have to face this solo
Your voice is strong, let it be heard
You deserve better, you deserve the world
You're not alone…
You never were` },
      { title: 'Toxic Friendships and Social Dynamics', file: 'Street Smart/Course 3/Toxic Friendships and Social Dynamics.mp3', lyrics: `Yeah…
This one's for the ones who stayed too long
You say it's a joke, but it cuts too deep
Laugh in my face, then talk in your sleep
Only hit me up when you need something
But when I need you—you don't bring nothing
Make it a game, everything I do
Turn it a race, always you vs. me and you
Say you're my friend, but I feel alone
Why do I feel worse when I get home?
Yeah, you got your good side, I won't lie
That's what kept me here this whole time
But one good day don't cancel the rest
If I feel drained, then it's not the best
If you break me down, you're not my friend
If I feel small, this is where it ends
I gave you chances, again, again
But I won't lose myself just to pretend
Not my friend, not my vibe
I choose peace this time
No more shrinking just to fit
I'm done with it
Group chat silence when I walk in
One voice deciding who's "in"
Laugh when I'm out, switch when I'm near
That's not real, that's just fear
Jealous when I shine, cold when I grow
Make it about you, steal my glow
Say I changed like it's a crime
No—I just stopped losing mine
Maybe we worked when we were younger
Now it just feels like I'm under
Pressure to stay, pressure to bend
But I don't owe forever to a friend
I can walk away, I'll be okay
Doesn't have to be a fight today
Less time, less calls, let it fade
Or say it straight—I'm not gonna stay
If you break me down, you're not my friend
If I feel small, this is where it ends
I gave you chances, again, again
But I won't lose myself just to pretend
Not my friend, not my vibe
I choose peace this time
No more shrinking just to fit
I'm done with it
I deserve real, I deserve safe
Not just someone I have to chase
Let it go, let it end
That's how I find my real friends` },
    ],
    remember: { title: 'Remember This Course 3', file: 'Street Smart/Course 3/Remember This Course 3.mp3', lyrics: `Yeah—
This is everything you need to know
Right here
Respect, trust, that's the base
If it's not there, walk away
Know your worth, don't ignore
You deserve so much more
Healthy love don't control your life
No blame games, no constant fights
No checking phones, no "where you been?"
That's not love—that's control within
Even if the good feels real sometimes
Bad still counts—don't blur the lines
If you feel small, if you feel stuck
That's your sign—it's not enough
You don't need to prove your place
Real ones don't make you chase
Respect, trust, that's the base
If it's not there, walk away
Know your worth, don't ignore
You deserve so much more
Grooming's not just online, it's real
In real life too—watch how they feel
Special attention, secrets to keep
Pushing your boundaries step by step, deep
If they isolate, if they make you hide
If something feels off deep inside
Nice at first—that's how it starts
Trust your gut, protect your heart
Clear yes, clear no
If it's unsure—let it go
Change your mind? That's your right
Respect that line every time
Boundaries up—say what you need
No long speech, no need to plead
"I'm not okay with that"—enough
The right people won't make it tough
If they cross it, step away
Protect your peace, don't stay
Toxic friends can smile and stay
But leave you drained at the end of the day
If you feel anxious, small, or low
It's okay to let them go
Respect, trust, that's the base
If it's not there, walk away
Know your worth, don't ignore
You deserve so much more
Valued, seen, safe, and free
That's what real love's meant to be
Not tolerated—valued
Not controlled—respected
Not confused—clear
That's your standard` }
  },

  // ─── Street Smart: Peer Pressure and Substance Awareness (c34) ───
  'c34': {
    lessons: [
      { title: 'Peer Pressure and Saying No', file: 'Street Smart/Course 4/Peer Pressure and Saying No.mp3', lyrics: `Yeah…
Everyone's doing it…
You're supposed to…
But…
"Come on, it's fine, everyone's in"
But I don't feel that, I don't give in
They push, they tease, they laugh, they stare
But I got my own way, I don't care
Whispers in the hall, "Why not join?"
But I'm not scared, I don't need to point
The choice is mine, the line is clear
I won't bend just to belong here
Would I do it if no one knew?
Would I be okay with the worst that comes through?
If the answer's no, then I'm staying true
Simple as that, I know what to do
No thanks, I do me
I stay true, can't make me
No thanks, I do me
Real friends respect what I need
"Just try it, it's not a big deal"
But my comfort matters, and I can feel
I can say no, redirect, walk away
Keep my peace, live my day
Suggest something else, flip the vibe
"Let's go hang, grab a snack, or jive"
If they won't stop, I leave the scene
No drama, no shame, I stay clean
Would I do it if no one knew?
Would I be okay with the worst that comes through?
If the answer's no, then I'm staying true
Simple as that, I know what to do
No thanks, I do me
I stay true, can't make me
No thanks, I do me
Real friends respect what I need
You might lose some, that's okay
People who only want you their way
A true friend doesn't push or bend
They like you for you, start to end
No thanks, I do me
I stay true, can't make me
No thanks, I do me
Real friends respect what I need
No thanks, I do me
I stay true, can't make me
No thanks, I do me
I'm enough, that's my creed` },
      { title: 'Substances: What You Need to Know', file: 'Street Smart/Course 4/Substances_ What You Need to Know.mp3', lyrics: `Yeah…
You might not have tried any of this yet…
And that's okay
A drink can change the way you think
Slow your reactions, make choices shrink
Memory's hazy, focus drifts
Too much too fast can bring real risk
If someone's unwell, don't hesitate
Call for help, you won't be in trouble — it's not too late
Hospitals don't judge, they save
Helping someone? That's brave
Would you do it if no one was around?
Would you be okay with how it goes down?
If the answer's no, stick to your ground
Your choices, your rules — keep that sound
Think twice, your choice, your life
Think twice, it's yours, decide right
Think twice, your choice, your life
Stay aware, stay smart, stay bright
People try things for lots of reasons
Curiosity, stress, wanting new seasons
Some affect mood, memory, your head
Mixing can be unpredictable — it's not all you read
If a friend is struggling, keep your eyes
Pulling away, hiding use, making lies
Tell someone you trust, get advice
You can help without rolling the dice
One puff of nicotine can stick fast
Social breaks can turn into habits that last
The long-term effects are still unknown
It's easier to not start than quit on your own
If you want to stop, it's possible too
Talk to someone who knows what to do
Support exists, you're not alone
Take control, make it your own
It's okay to say no, it's okay to walk
It's okay to pause, it's okay to talk
Friends who respect you will understand
You don't need pressure to take a stand
Think twice, your choice, your life
Think twice, it's yours, decide right
Think twice, your choice, your life
Stay aware, stay smart, stay bright
Think twice, your choice, your life
Think twice, it's yours, decide right
Think twice, your choice, your life
Your rules, your path, your life` },
      { title: 'Recognising When Someone Needs Help', file: 'Street Smart/Course 4/Recognising When Someone Needs Help.mp3', lyrics: `Yeah…
Sometimes someone you know…
Might be struggling…
And noticing matters
Using more than usual, hiding what they do
Personality changes, interests fade from view
Skipping school, drifting away from friends
Getting anxious when it's time to end
Might only binge sometimes, might use to cope
It doesn't have to be daily to signal hope
They might get defensive, that's okay
Showing you care can help them see the way
I'm here, I notice you
I don't judge, I see the truth
It's not my fault, but I can help
You don't have to face this by yourself
Look out, I see you
Look out, you're not alone
Look out, I see you
Reach out, there's help, there's home
Talk straight, talk kind: "I've noticed your use, and I care
What's going on, what's happening there?"
They might get defensive, it's natural, it's real
You're not responsible, but your support can heal
If you can't help, find someone who can
A parent, teacher, or a school counsellor's plan
This is not betrayal, it's keeping safe
Some problems need adults to navigate
If there's overdose, self-harm, or psychosis in play
Call emergency services without delay
Help is available, for you or a friend
Asking for support is the strongest trend
Look out, I see you
Look out, you're not alone
Look out, I see you
Reach out, there's help, there's home
Look out, I see you
Look out, you're not alone
Look out, I see you
Together, we're safe, we're grown` },
      { title: 'Parties, Events and Staying Safe', file: 'Street Smart/Course 4/Parties, Events and Staying Safe.mp3', lyrics: `Yeah, text says "party," Friday night glow
Fit looking right, got the crew, let's go
Not tryna miss out, not tryna stay home
But I move smart when I'm stepping out the zone
Who's gonna be there? Where's it at?
How we getting back when it's late like that?
Quick check in, yeah I let 'em know
Not control — just in case things go
Left turn, wrong way, plans might bend
That's why I got my own way to the end
Phone on full, little cash on me
Got options, yeah I move low-key
We outside, yeah we living life
But I keep a plan in the back of my mind
Ain't fear, it's just being wise
So the night stays good, no surprise
We can vibe, we can dance all night
Keep it cool, keep it feeling right
But I don't go nowhere blind
Got a way back home every time
If it switch, if it don't feel right
I don't stay just to be polite
I can leave, I'll be just fine
Got a way back home every time
Came with my people, that's day ones
Check in quick like "you good?" — say something
If you ready to dip, I'm not asking why
We roll out together, that's ride or die
Ain't babysitting, that's just real
Looking out is the deal we seal
No one left in the dark alone
If we came together, we going home
Energy shift, yeah I feel that fast
Don't wait 'til it's bad, I'm out, I pass
No pressure gonna lock me in
Real ones don't make you choose like that
We outside, yeah we living life
But I trust that voice deep inside
If it whispers "nah," I'm gone
I don't owe nobody my time
We can vibe, we can dance all night
Keep it cool, keep it feeling right
But I don't go nowhere blind
Got a way back home every time
If it switch, if it don't feel right
I don't stay just to be polite
I can leave, I'll be just fine
Got a way back home every time
If someone fades, don't leave 'em there
Stay close, get help, show you care
Cold skin, can't wake, that's no joke
Call it in — yeah, that's real hope
You won't get blamed for doing right
You might save a life tonight
That's strength, yeah that's respect
That's something you won't regret
Cup in my hand but I watch that pour
If I didn't see it, I don't want more
Set it down? Nah, that's done
New one only, I don't risk one
Heard those stories, yeah it's real
Doesn't matter how tough you feel
Anyone can get caught off guard
So I play it smart, not hard
We can vibe, we can dance all night
Keep it cool, keep it feeling right
Yeah we live but we move with mind
Got a way back home every time
If it switch, if it don't feel right
I don't stay just to be polite
I can leave, I'll be just fine
Got a way back home every time
Yeah, we young but we know what's up
Not scared, just smart when we show up
Good nights don't happen by chance
We make 'em safe — then we dance` },
    ],
    remember: { title: 'Remember This Course 4', file: 'Street Smart/Course 4/Remember This Course 4.mp3', lyrics: `Yeah, it's loud in here, everybody moving fast
Same red cups, same lines they pass
They don't say it straight but I feel that pull
Like "just this once," like "don't be dull"
But I know that voice in the back of my head
Saying "that ain't you," yeah, it's been said
I don't gotta prove I belong in the room
If I lose myself just to follow the mood
They don't gotta push too hard
It's the silence that hits just as sharp
But I don't bend just to blend in
I know where I stand within
No is enough, I don't need to explain
I don't trade me just to fit in your lane
I can walk out, I don't owe you a thing
My voice, my choice, that's everything
No is enough, yeah I said what I said
Clear mind, no regrets in my head
I'm good right here, I don't gotta pretend
If it costs who I am, I don't spend
They laugh it off like it's all just a game
But I've seen nights never end the same
One bad call when your mind's not clear
Can turn one vibe into something you fear
Not every risk gotta be mine to take
I see the line and I don't gotta break
Nicotine hooks, yeah it don't let go
And some things hit deeper than they show
I don't need that just to feel alright
I don't need clouds to enjoy the night
If I say no, that's where it ends
Real ones don't make you pretend
No is enough, I don't need to explain
I don't trade me just to fit in your lane
I can walk out, I don't owe you a thing
My voice, my choice, that's everything
No is enough, yeah I said what I said
Clear mind, no regrets in my head
I'm good right here, I don't gotta pretend
If it costs who I am, I don't spend
Got my way home if I need that space
Got my people, yeah we move one pace
Drink in my hand? I watched it poured
If I didn't — I don't want it, I'm sure
Energy shifts, I don't question twice
I can leave and that's my right
One moment's not worth risking me
I choose my life, I choose to be free
No is enough, hear it clear, no doubt
I don't dim down just to stand in your crowd
I can step back, I can walk away
Still be strong at the end of the day
No is enough, yeah I stand on mine
Every choice, every step is mine
I'd rather leave than lose myself
That's real power, nothing else
Yeah, they might not get it now
But I'm not here to figure them out
I know my line, I hold my ground
And that's what keeps me safe and sound` }
  },

  // ─── Street Smart: Mental Health and Emotional Wellbeing (c37) ───
  'c37': {
    lessons: [
      { title: 'Understanding Mental Health', file: 'Street Smart/Course 5/Understanding Mental Health.mp3', lyrics: `Yeah…
Mind games, not just in your head
We talkin' real, no fluff, facts instead
Heart race, chest tight, can't catch a breath
Stomach flips, sweat drips, feels like threat
Thoughts spin, like they got no brakes
Everything's fine… but your mind says "fakes"
Avoiding class, avoiding the scene
Sleep's out, focus gone, it's routine
Not being dramatic, your body reacts
Brain sees danger… facts on tracks
Notice the signs, don't let 'em slide
Physical or mental, they collide
It's real, it's science, it's what's inside
Awareness is power, don't let it hide
Mind games, watch the signs
Mind games, read the lines
Mind games, it's your brain, your rules
Mind games, don't play the fool
Not just sadness, it lingers, it stays
Weeks turn months in a cloudy haze
Nothing's fun, energy's drained
Even sleep leaves you still chained
Withdrawing from crew, losing the spark
Hopeless thoughts, feelin' dark
It's illness, not weakness, truth to know
Reach out, step up, let the help flow
Talk it out, don't keep it inside
Therapy, lifestyle, you got options to ride
Small steps, big wins, facts over fear
Support is here, you're not solo, clear?
Mind games, watch the signs
Mind games, read the lines
Mind games, it's your brain, your rules
Mind games, don't play the fool
Mind games, notice the signs
Mind games, own your mind` },
      { title: 'Anxiety and Depression', file: 'Street Smart/Course 5/Anxiety and Depression.mp3', lyrics: `Yo, mental health is real, let's break it down
Anxiety, depression, everybody knows the sound
Anxiety's more than jitters before a test
Persistent worry, heart racing in your chest
Mind won't stop, feels like danger's near
Even when everything's fine, the fear is clear
Racing heart, stomach knots, chest tight
Sweating, dizzy, can't sleep at night
It's real, it's physical, not just in your head
Your body's reacting to a threat it misread
When anxiety blocks life, stops school or friends
It's not weakness, it's a signal to make amends
Talk, breathe, move, sleep—find what helps you cope
Therapies, routines, small wins, real hope
Mind Check, Mind Check, feel the flow
Up and down, highs and lows
Check yourself, know what's real
Your mind's a journey, let it heal
Depression's not just sadness, it lingers long
Low mood that stays, feels everything's wrong
Nothing matters, nothing fun, energy drained
Sleep or appetite changes, feelings unexplained
It lies, whispers "Nobody cares, it won't get better"
Those thoughts are symptoms, not your personal letter
You're not broken, you're not weak
Getting help is strong, reaching out is sleek
Talk it out, therapist, friend, or parent
Lifestyle, sleep, movement, self-aware habit
Medication helps some, talking helps more
Step one's always speaking up, open the door
Mind Check, Mind Check, feel the flow
Ups and downs, highs and lows
Check yourself, know what's real
Your mind's a journey, let it heal
Mind Check, Mind Check, take control
Awareness is power, protect your soul` },
      { title: 'Self-Harm, Crisis and Getting Help', file: 'Street Smart/Course 5/Self-Harm, Crisis and Getting Help.mp3', lyrics: `Yeah, look around, signs are everywhere
People hurting, but help is out there
Cuts and marks, pain on display
It's not attention, it's a cry in its way
Doesn't solve the problem, just masks the storm
Each time it happens, it alters the form
Trained people know how to guide
Give support, help process inside
Parents, teachers, school counsellors too
Connecting the dots, that's what they do
Friends might confide, don't freeze or shock
Listen, thank them, then connect the block
Telling an adult isn't betrayal, it's care
Professional help is waiting there
Look around, see the signs
Help is here, open your mind
You're not alone, step outside
Trusted adults will guide the ride
Crisis hits, don't wait or stall
Emergency number, hospital call
Immediate action, life on the line
Support exists, every step is fine
Cycle breaks when help arrives
Health and safety, keeping lives alive
Knowledge is power, that's the play
Understanding brings light to the day
Self-harm is real, but help is realer
Trained support is always near ya
Signs are visible, patterns in plain
Recognise, connect, break the chain
Look around, see the signs
Help is here, open your mind
You're not alone, step outside
Trusted adults will guide the ride
Look around, help is near
Every connection clears the fear` },
      { title: 'Looking After Your Mental Health', file: 'Street Smart/Course 5/Looking After Your Mental Health.mp3', lyrics: `Yeah, this one's about the mind,
Keeping it solid, keeping it strong.
Sleep like a boss, eight hours on the clock
Screens down, brain resets, mood unlock
Ten minutes of movement, your heart gets the drop
Walk, spin, dance, bike — don't let it stop
Friends in the real, not just in the feed
Face-to-face vibes, that's what you need
Scroll too much? Nah, it'll twist the scene
Compare yourself? Stop, control what you glean
Boundaries tight, say no, stay true
Rest is a weapon, it's power for you
Toolkit ready, vibes that lift
Music, spaces, things that shift
Mind glow, feel it grow
Step by step, keep it on show
Mind glow, let it ride
Healthy moves, no need to hide
Sleep, move, connect — that's the formula
Little wins every day, build stamina
Laugh, chill, safe spots, call your people
Good habits stack up, keep the mind lethal
Social feeds curated, don't let them drain
Cut toxic loops, that's how you maintain
Energy saved, stress gets played
Glow on the daily, foundations laid
It ain't weak, it's smart, it's street-level finesse
Knowing your limits, learning your process
Every day's a match, mental health the flex
Win small, win big, keep it complex
Mind glow, feel it grow
Step by step, keep it on show
Mind glow, let it ride
Healthy moves, no need to hide
Mind glow, stay alive
Every habit, mind survives` },
    ],
    remember: { title: 'Remember This Course 5', file: 'Street Smart/Course 5/Remember This Course 5.mp3', lyrics: `Yeah, mental health, it's daily life
Spectrum moves, ups and downs, that's right
Mind moves every single day
Feeling anxious, worried, or gray
Anxiety hits with racing heart and chest
Physical signs show it ain't just stress
Depression's low mood, weeks or months long
Not just sadness, it's a deeper song
Both are common, real, treatable too
Talking, support, helps guide you through
Self-harm signals need professional care
Crisis moments, adults aware
Trusted adults, teachers, or parents near
Immediate help can calm the fear
Mind moves, ups and downs
Sleep, exercise, turn it around
Real connection, limits set
Help is right, don't ever forget
Sleep for the brain, rest to cope
Exercise lifts, builds up hope
Face-to-face time beats endless scroll
Social media breaks can feed the soul
Know your limits, say no when you need
Boundaries protect, that's guaranteed
Getting help is strength, never a shame
Asking is smart, not a blame game
Everyone moves along the spectrum wide
Ups, downs, twists, and tides
Understanding helps you recognise
Support exists, don't compromise
Mind moves, ups and downs
Sleep, exercise, turn it around
Real connection, limits set
Help is right, don't ever forget
Mind moves, spectrum wide
Support is here, step inside` }
  },

  // ─── Street Smart: Weapons Awareness (c38) ───
  'c38': {
    lessons: [
      { title: 'Understanding Weapon Violence', file: 'Street Smart/Course 6/Understanding Weapon Violence.mp3', lyrics: `Yo, I saw a kid, thinks he's tough in the hood
Got a knife in his pocket, thinking he's good
Says "keeps me safe," yeah that's what he swears
But the stats say otherwise, danger's in the air
Another kid flexin' with a piece on his side
Thinks he's protected, but it's a rough ride
One small beef, one wrong glance
Now a minute later, he ain't got a chance
It starts with words, a post, a stare
Then it builds up, it's everywhere
Disrespect, rumors, pressure from the crew
Little things turn big if you don't see it through
They think it's protection, but it's trouble in disguise
Carrying weight, but it don't make them wise
One wrong move, now the story's on the news
Lesson here? Don't follow those cues
They think it's protection, but it's trouble in disguise
Life gets twisted right before your eyes
Conflicts escalate, nobody wins
Better learn the signs before it begins
Caught in the law, don't matter the reason
Weapon in pocket? Now it's case season
Record at 16, doors get closed
Trips, jobs, travel? That's how it goes
It ain't heroic, ain't nothing cool
Being scared don't justify breaking rules
Seeing the signs, knowing how it grows
That's how smart kids keep out of those woes
Start small, one glare, one little fight
Then it builds up, creeps in the night
Social media sparks, pride gets heated
Then suddenly everybody's competed
They think it's protection, but it's trouble in disguise
Carrying weight, but it don't make them wise
One wrong move, now the story's on the news
Lesson here? Don't follow those cues
They think it's protection, but it's trouble in disguise
Life gets twisted right before your eyes
Conflicts escalate, nobody wins
Better learn the signs before it begins
Knife in the pocket, gun on the belt
Minds full of fear, not thinking what they felt
Better laugh at the drama than join the parade
Learn the pattern early, don't get played
They think it's protection, but it's trouble in disguise
Carrying weight, but it don't make them wise
One wrong move, now the story's on the news
Lesson here? Don't follow those cues
They think it's protection, but it's trouble in disguise
Life gets twisted right before your eyes
Spot the signs, stay smart, don't compromise
That's how you win, that's how you rise` },
      { title: 'How People Get Drawn In', file: 'Street Smart/Course 6/How People Get Drawn In.mp3', lyrics: `Nobody wakes up thinking "I'll carry a blade"
It's slow, subtle, the choices get made
Pressure all around, whispers in the hall
"Everyone's got one, you better not fall"
Screens light up, a fight online
Words get shared, now it's crossing the line
Comments and posts, screenshots fly
Suddenly, backing down feels like a lie
It creeps in quiet, but you can see
The patterns repeat, they ain't free
Older hands pull strings, call it respect
But the truth is danger, that's what you get
See the signs, don't get pulled in
You're not too deep, you can begin again
Talk to someone, there's always a way
Keep your heart, keep your life, keep the choice today
See the signs, don't fall for the game
It ain't respect, it ain't fame
You can step out, you can be strong
There's always a path to where you belong
County lines, gangs, organized schemes
Target the lonely, those chasing dreams
They promise family, respect, a place
But it's chains, danger, consequences to face
Exploitation hides behind a friendly hand
Older kids telling you it's part of the plan
But every young face in the story ends up burned
If you see it early, you've already learned
Patterns repeat, they're easy to spot
Pressure and fear, they tie the knot
But reaching out breaks the hold
Your story's yours — you write it bold
See the signs, don't get pulled in
You're not too deep, you can begin again
Talk to someone, there's always a way
Keep your heart, keep your life, keep the choice today
See the signs, don't fall for the game
It ain't respect, it ain't fame
You can step out, you can be strong
There's always a path to where you belong
You don't owe them your fear, your youth
You don't owe them the lies, the truth
A trusted adult, a friend, a guide
Can help you see past the tide
See the signs, don't get pulled in
You're not too deep, you can begin again
Talk to someone, there's always a way
Keep your heart, keep your life, keep the choice today
See the signs, stand tall, take flight
You're stronger than pressure, stronger than fright
Step out, step free, and you'll belong
Your life, your story, you write the song` },
      { title: 'What to Do If You Are Confronted', file: 'Street Smart/Course 6/What to Do If You Are Confronted.mp3', lyrics: `If someone comes at you, knife or gun in hand
Your only goal is to make it to land
Not your bag, not your phone, not your pride
Your life's worth more, gotta step aside
Hand it over, calm, don't make a move
Let them take what they want, don't try to prove
Distance matters, walk steady, walk fast
Find a public place, safety comes first, last
Don't be a hero, don't fight tonight
The goal is clear — survive the fright
Every possession can be replaced
You can't be replaced, that's the truth embraced
Walk away, your life's the prize
Nothing else matters in those eyes
Stay calm, stay smart, don't play the part
Your safety first, listen to your heart
Walk away, keep yourself alive
Avoid the danger, just survive
Call for help, tell someone true
You're stronger when you know what to do
Witness it happen? Don't intervene
Stay safe, call the pros, keep the scene clean
Give the location, details you see
Help comes fast if you act safely
Avoid the streets that feel wrong, take another way
Trust your instincts, don't stay where danger may
Escalation grows if you wait too long
The best confrontation is avoiding the wrong
Don't be a hero, don't fight tonight
The goal is clear — survive the fright
Every possession can be replaced
You can't be replaced, that's the truth embraced
Walk away, your life's the prize
Nothing else matters in those eyes
Stay calm, stay smart, don't play the part
Your safety first, listen to your heart
Walk away, keep yourself alive
Avoid the danger, just survive
Call for help, tell someone true
You're stronger when you know what to do
It's not weakness to step aside
It's strength to live and survive
Every choice you make can save your life
Keep your head, stay safe, avoid the strife
Walk away, your life's the prize
Nothing else matters in those eyes
Stay calm, stay smart, don't play the part
Your safety first, listen to your heart
Walk away, keep yourself alive
Avoid the danger, just survive
Trust yourself, make the right move
Your life's the prize — you've got nothing to prove` },
      { title: 'Choosing a Different Path', file: 'Street Smart/Course 6/Choosing a Different Path.mp3', lyrics: `One choice today can change the rest of your life
One moment, one move, one fight or strife
People in prison didn't plan to stay
A series of steps led them astray
Pressure all around, friends telling you "do it"
Feels unavoidable, like there's no way through it
But courage ain't fighting, courage is walking
Away from danger when the world's talking
They won't visit in the hospital, won't feel your pain
They won't sit in your cell, won't share your chain
You decide your path, your story, your way
Step into light, don't get lost in gray
Your life, your choice, your future's bright
Step away from the darkness into the light
Build it with friends, music, work, and play
Find your purpose, your path, your way
Your life, your choice, your future's bright
Every small step turns wrong to right
Help your friends, reach out, don't fight alone
There's always a way to make it your own
If you got friends getting drawn into the game
Tell them you're worried, don't assign blame
Honest words matter more than a lecture
Sometimes a friend saves you from disaster
Find your rhythm in sports, music, or art
In school, in volunteering, in what you start
It's not just CV points, it's purpose and pride
Weapon violence takes all that away inside
Your past don't define you, your neighborhood don't own
The power is yours, the seeds you've sown
People leave danger every single day
You can be one of them, you can find your way
Your life, your choice, your future's bright
Step away from the darkness into the light
Build it with friends, music, work, and play
Find your purpose, your path, your way
Your life, your choice, your future's bright
Every small step turns wrong to right
Help your friends, reach out, don't fight alone
There's always a way to make it your own
Talk to a trusted adult, you don't have to hide
Parent, teacher, carer — they'll be by your side
You're not too deep, you can leave it behind
New life, new path, new peace you'll find
Your life, your choice, your future's bright
Step away from the darkness into the light
Build it with friends, music, work, and play
Find your purpose, your path, your way
Your life, your choice, your future's bright
Every small step turns wrong to right
Stand tall, walk free, make your story known
Your life, your choice — you're never alone` },
    ],
    remember: { title: 'Remember This Course 6', file: 'Street Smart/Course 6/Remember this Course 6.mp3', lyrics: `Think you're safer with a blade or a gun?
Truth is, it's danger, it's nowhere to run
Criminal charges don't care your intent
One choice today, life's permanent
Peer pressure creeps in, friends say "do it"
Social media sparks, comments blow through it
Older hands pull strings, disguise it as respect
But danger's the cost — the lesson's direct
Trust your instincts, avoid the fight
Nothing's worth risking your life tonight
Courage ain't in the weapon you hold
Courage is walking away, brave and bold
Walk away, live today, choose your way
Keep your life, don't let danger stay
Step out, stand tall, see the light
Your future's waiting — shine so bright
Walk away, live today, choose your way
Nothing you own is worth the price you pay
Be brave, be smart, make the call
You're stronger than pressure, you can have it all
If you're caught up and want to leave it behind
Help exists, reach out — you'll find
Parent, teacher, youth worker, someone you trust
They won't judge, they'll guide you through dust
Avoidance is power, walk the path that's right
Change your route, trust your instincts tonight
The best confrontation's the one that never starts
Protect your life, your heart, your art
Trust your instincts, avoid the fight
Nothing's worth risking your life tonight
Courage ain't in the weapon you hold
Courage is walking away, brave and bold
Walk away, live today, choose your way
Keep your life, don't let danger stay
Step out, stand tall, see the light
Your future's waiting — shine so bright
Walk away, live today, choose your way
Nothing you own is worth the price you pay
Be brave, be smart, make the call
You're stronger than pressure, you can have it all
It takes more courage to walk than to fight
One step away can save your life tonight
You're never too deep, help's on your side
Make your move, take the ride
Walk away, live today, choose your way
Keep your life, don't let danger stay
Step out, stand tall, see the light
Your future's waiting — shine so bright
Walk away, live today, choose your way
Nothing you own is worth the price you pay
Be brave, be smart, make the call
Your life, your choice — you can have it all` }
  },

  // ============================================================
  // AGING WISDOM (ages 60+) - Course IDs: c16, c17, c18, c19, c20
  // ============================================================

  // ─── Aging Wisdom: Recognising and Responding to Scams (c16) ───
  'c16': {
    lessons: [
      // Lesson 0: How Scams Work and What They Look Like
      {
        title: 'How Scams Work and What They Look Like',
        file: 'Aging Wisdom/Course 1/How Scams Work and What They Look Like.mp3',
        lyrics: `You've lived a life of keeping your word,
Doing what's right, being heard.
So when a voice comes calling your name,
It leans on trust to play its game.
They sound so sure, they sound so real,
They know just how to make you feel—
A little fear, a little rush,
And suddenly they start to push.
But every trick they try to spin,
Has the same old shape within…
Take your time, my friend, don't rush, don't bend,
If they're pushing hard, that's where it ends.
Urgency, secrets, asking for more—
That's how the strangers get in your door.
No real help needs you to pretend,
Or hide the truth from kin or friend.
Slow it down, let clear heads win,
Take your time, my friend.
"No one must know," they softly say,
"Act right now, don't delay."
But truth don't hide, and love don't rush,
And honest voices don't need hush.
They might say "bank" or "government line,"
But numbers lie all the time.
A screen can fake what seems official,
But doubt is always beneficial.
And there's one thing you should know by heart,
A rule that never falls apart…
Take your time, my friend, don't rush, don't bend,
If they're pushing hard, that's where it ends.
Urgency, secrets, asking for more—
That's how the strangers get in your door.
No real help needs you to pretend,
Or hide the truth from kin or friend.
Slow it down, let clear heads win,
Take your time, my friend.
No bank will ask for codes you keep,
No honest call will steal your sleep.
Hang it up, then dial it back,
Use the number you know is fact.
Gift cards, wires, crypto pleas—
Those are signs to put at ease.
Real help waits, it understands,
It never forces trembling hands.
Take your time, my friend, stand tall again,
You've got the wisdom deep within.
If something feels wrong, it probably is,
Trust that voice that says "think this through."
Call someone you love, let them in,
There's strength in more than just one grin.
You've come too far to let them win—
Take your time, my friend.
Yeah, take your time… my friend.`
      },
      // Lesson 1: Specific Scam Types and How to Respond
      {
        title: 'Specific Scam Types and How to Respond',
        file: 'Aging Wisdom/Course 1/Specific Scam Types and How to Respond.mp3',
        lyrics: `There's a knock upon your door one day,
A friendly face, some lines to say,
"They found a fault," "It can't wait,"
They lean on worry, twist your fate.
A badge, a smile, a practiced line,
They make it sound like perfect timing,
But you decide who steps inside,
That's your home, your right, your pride.
If they're real, they won't pretend,
They'll understand you checking them…
Don't let them through the door,
Not till you know for sure.
Take your time, make the call,
Check the truth behind it all.
If they rush you, walk away,
Real ones don't behave that way.
Stand your ground like you've before,
Don't let them through the door.
"Cash today for a better deal,
Tomorrow's price won't be as real,"
But honest work don't fade that fast,
And truth don't fear a question asked.
If they sigh when you take your time,
Or dodge your doubts, or change their line,
That's your sign to let it be,
Close the door and keep your key.
A proper name, a proper place,
You can confirm, not just take face…
Don't let them through the door,
Not till you know for sure.
Take your time, make the call,
Check the truth behind it all.
If they rush you, walk away,
Real ones don't behave that way.
Stand your ground like you've before,
Don't let them through the door.
On the screen or on the phone,
Make sure the path is yours alone.
Type it in, don't click that link,
Take a moment, stop and think.
Look for locks and "https,"
Little signs that help you guess,
And if you pay, choose safer ground,
Credit cards can turn things 'round.
If you feel you've been misled,
Don't sit quiet, don't feel dread,
Call your bank without delay,
Every minute counts that day.
Then report what's come to pass,
Help the warning signs amass,
Your one voice can make it known,
So others won't face it alone.
Don't let them through the door,
You've seen these tricks before.
Take your time, don't be swayed,
Trust the wisdom that you've made.
You're not alone, you've got the power,
To stop the game within the hour.
Stand your ground forevermore,
Don't let them through the door.
Yeah… don't let them through…
You know what to do.`
      },
      // Lesson 2: Financial Fraud and Protecting Your Accounts
      {
        title: 'Financial Fraud and Protecting Your Accounts',
        file: 'Aging Wisdom/Course 1/Financial Fraud and Protecting Your Accounts.mp3',
        lyrics: `You worked your whole life, dollar by dime,
Built it up slow, took your time.
Now it's worth a careful eye,
Just a look as the weeks go by.
Not once a month, don't wait that long,
A quiet check keeps things strong.
Little signs can slip right through,
If no one's watching what they do.
A tiny charge you don't recall,
Could be the warning of it all…
Keep an eye on what you've earned,
Every week, let truth be learned.
Small mistakes can speak out loud,
When you're watching, clear and proud.
Set those alerts, let them ring,
Know each move, know everything.
Peace of mind is something earned,
Keep an eye on what you've earned.
A message says, "Your funds are gone,"
"A problem here, you must act on,"
But real words come the slower way,
In letters sent, not calls that sway.
No office calls with threats to pay,
"No time to think, do it today,"
That kind of rush is not their style,
It's just a trick dressed up worthwhile.
If pressure's high and time is tight,
That's your cue to step back right…
Keep an eye on what you've earned,
Every week, let truth be learned.
If they rush, don't take the bait,
Honest things can always wait.
Set those alerts, day or night,
So nothing slips right out of sight.
Peace of mind is something earned,
Keep an eye on what you've earned.
And if they promise "risk-free gain,"
Easy money, zero strain,
That's not how the real world goes,
Every honest investor knows.
"Guaranteed" is not the way,
That's just something scammers say.
If it sounds too good to be,
It's not what it claims to be.
And if one day you're not so sure,
Act on it fast, that's the cure.
Call your bank, don't hesitate,
Time can make a difference great.
Keep an eye on what you've earned,
Let no lesson go unlearned.
You've got wisdom, you've got sight,
You can tell what's wrong from right.
Steady hands and careful view,
That's what sees a lifetime through.
Hold it close and stay concerned,
Keep an eye on what you've earned.
Yeah… keep watch now…
You've earned it all somehow.`
      },
      // Lesson 3: Romance Scams and AI-Powered Fraud
      {
        title: 'Romance Scams and AI-Powered Fraud',
        file: 'Aging Wisdom/Course 1/Romance Scams and AI-Powered Fraud.mp3',
        lyrics: `He says hello so sweet and kind,
A friendly voice, a listening mind,
He's far away but feels so near,
And soon he's saying, "Wish you were here."
A little fast, a little strong,
But oh, it feels so right, not wrong…
Love should never hide away,
Or rush your heart in just a day,
If it's real, it will stay true,
And shine in all you say and do.
He's overseas or out at sea,
Always a reason you can't meet,
"I love you" comes so very fast,
But real love grows, it's made to last.
When stories change or don't align,
That's your cue—just take your time.
Love should never hide away,
Or rush your heart in just a day,
If it's real, it will stay true,
And shine in all you say and do.
Then comes a need, a sudden plea,
"Just send a little help to me,"
Gift cards, wires, or something new,
But darling, that's your warning clue!
And though a face may seem so real,
With moving lips and charm you feel,
A screen can fool both eye and ear,
So trust your heart—and those held dear.
If they say, "Keep this just ours,"
That's not love—it loses its powers,
The ones who care should always know,
True love's a light, not kept down low.
Love should never hide away,
Or ask for secrets day by day,
Meet in person, take it slow,
Let trusted voices help you know.
So keep your heart both warm and wise,
See truth reflected in their eyes,
And if in doubt, just stop and say—
"My love won't ever hide away."`
      }
    ],
    remember: { title: 'Remember This - Online Safety', file: 'EXAMPLE SONGS/Aging Wisdom remember this songs/Remember This Course 1.mp3', lyrics: `Well, he called you “darlin’” on a Tuesday night,

Said your smile was magic, said your heart felt right,

By Wednesday morning he’s in love, oh my!

But he’s “stuck overseas,” and you wonder why…



Oh, he’s got a story, it’s a twisty tale,

Every little promise comes with missing mail…



Hey now, slow down, don’t you send a dime,

Love don’t rush on borrowed time,

If it’s secrets and “don’t tell,” that’s your cue—

A real good heart don’t hide the truth from you!



Now he says his camera’s broken, what a shame,

But his voice sounds sweet when he says your name,

Little does he know you’re wise to the game,

‘Cause love ain’t numbers in a crypto frame!

Gift cards, wire—oh, that’s a red flag tune,

Honey, real love shows up in the afternoon!



Hey now, slow down, don’t you send a dime,

Love don’t rush on borrowed time,

If it’s secrets and “don’t tell,” that’s your cue—

A real good heart don’t hide the truth from you!



Call your sister, call a friend,

Let a second opinion chime in,

No shame, no blame, just walk away—

Your heart’s too good for games they play!



Hey now, stand tall, keep your heart in line,

Love is patient, love is kind,

If they’re asking cash but won’t show their face—

Baby, that ain’t love, that’s a low-down chase!



So keep your swing and keep your style,

Trust your gut, it’s worth your while,

And when real love knocks, you’ll know it’s true—

It won’t ask secrets… it’ll dance with you!` }
  },

  // ─── Aging Wisdom: Safe Digital Life (c17) ───
  'c17': {
    lessons: [
      // Lesson 0: Online Banking and Shopping Safely
      {
        title: 'Online Banking and Shopping Safely',
        file: 'Aging Wisdom/Course 2/Online Banking and Shopping Safely.mp3',
        lyrics: `Oh now… hey hey…
Take a look before you trust… yeah…
Online banking's safe and sound,
If you know your way around.
It's not the bank you've gotta fear,
It's the tricks that bring you near.
A link that says, "Just click it quick,"
That's where they play their little trick.
They copy pages, make 'em right,
But something's always outta sight.
So take a second, don't you rush,
A careful eye is always a plus…
Check before you trust,
Don't be quick, don't be rushed.
Look for that lock, that "https,"
That's how you know it's safe to press.
Type it in, don't follow through,
Let the real site come to you.
Slow it down, you'll see what's just—
Check before you trust.
Emails saying, "Fix it now,"
Try to make you wonder how.
But your bank won't send a link,
That's your moment—stop and think.
If they ask you to "verify,"
That's your cue to pass it by.
Go the way you always knew,
Straight to what belongs to you.
Real things don't need disguise,
Truth don't hide behind surprise…
Check before you trust,
Don't be quick, don't be rushed.
Look for that lock, that "https,"
That's how you know it's safe to press.
Type it in, don't follow through,
Let the real site come to you.
Slow it down, you'll see what's just—
Check before you trust.
Make your password strong and long,
Twelve or more will keep it strong.
Mix it up—letters, signs,
Numbers dancing through the lines.
Don't reuse what you've done before,
That's what opens up the door.
And two-step keeps you tight,
Code on phone to make it right.
Hey! Keep it safe now…
You know how…
When you shop, go where you know,
Names you trust, reviews that show.
Pay with credit, keep that guard,
Watch your statements, stay on guard.
If something shows you didn't do,
Call it in—don't wait, be true.
Every second helps you win,
That's how you stop it settling in.
Check before you trust,
Take your time, you must.
You've got the sense, you've got the way,
To keep those shady tricks at bay.
Stand your ground, be wise, be tough,
You already know enough.
Hold your line, be smart, be just—
Check before you trust.
Yeah… check it now…
Before you trust…`
      },
      // Lesson 1: Using Your Smartphone Safely
      {
        title: 'Using Your Smartphone Safely',
        file: 'Aging Wisdom/Course 2/Using Your Smartphone Safely.mp3',
        lyrics: `Before you use that phone each day,
There's just a careful, simple way.
A lock in place, a code you choose,
A step that's far too good to lose.
Add a name for times of need,
Quiet help at proper speed.
And if it's lost, you'll still have sight,
To guide it home or lock it tight.
These little things, though small they seem,
Protect far more than you might think…
Take a moment first, don't rush ahead,
A little care is best instead.
Set it right, keep it secure,
Simple steps that will endure.
Nothing here is hard or new,
Just quiet things you ought to do.
Peace of mind is always earned,
When you take a moment first.
When choosing apps to place inside,
Let common sense become your guide.
The trusted stores are where to go,
Not every offer you may know.
And if it asks for far too much,
More than it should ever touch,
That's your sign to step away,
And leave it be another day.
If something doesn't quite align,
It's best to pause and take your time…
Take a moment first, don't be led,
By hurried words or fear instead.
Keep control of what you choose,
There is far too much to lose.
Steady thought will see you through,
It's always been the wiser view.
Peace of mind is always earned,
When you take a moment first.
If a message brings alarm,
Speaking of some sudden harm,
"Help me quickly," "Don't delay,"
That is not the proper way.
Call them on the line you know,
Not the one they choose to show.
Truth is never rushed or hidden,
It stands clear when you reply.
And when updates come along,
They correct what may be wrong.
Quiet fixes, out of sight,
Keeping everything just right.
Take a moment first, stand calm and sure,
That's the way to stay secure.
You have wisdom, you have sight,
You can tell the wrong from right.
Nothing here you cannot learn,
Nothing more than care returned.
Peace of mind is always earned,
When you take a moment first.
Just take your time…
You'll be alright.`
      },
      // Lesson 2: Protecting Your Digital Footprint
      {
        title: 'Protecting Your Digital Footprint',
        file: 'Aging Wisdom/Course 2/Protecting Your Digital Footprint.mp3',
        lyrics: `Ah now… here we go…
Just a little thought goes a long way…
Every photo, every line,
Leaves a trace in space and time.
Seems like nothing, light and small,
But it's more than that, it's more than all.
What you post can travel far,
Further than you think you are.
So before you press "send" or "share,"
Take a breath and show some care.
It's easy done, it's only fair,
Just a moment of repair…
Think before you share,
Just a little extra care.
Not everything needs to be shown,
Some things are better kept your own.
Take your time, be aware,
Who can see it, who is there.
Simple steps will get you there—
Think before you share.
No need to list your address line,
Or every detail, every time.
A birthday wish? That's fine to say,
But keep the year well out the way.
And if you're off and travelling free,
Keep it quiet 'til you're back, you see.
No need to say the house is bare,
That's not something you should share.
Little things can say a lot,
More than what you think you've got…
Think before you share,
Keep a little something spare.
Not every detail needs to show,
Not every stranger needs to know.
Take your time, be aware,
That's the safest way to steer.
Simple steps will get you there—
Think before you share.
And if there's children in your life,
Keep their world away from strife.
Where they go and what they do,
Should be kept for trusted few.
Check your settings now and then,
Not just once and leave it then.
Things can change without a sound,
Turning private inside out.
Have a look now…
If something's there you'd rather not,
A photo shared, a detail dropped,
Take it down, don't hesitate,
Better now than leave it late.
Think before you share,
Show a little extra care.
You've got the sense to see it through,
And know what's right for you.
Keep control, be aware,
That's the way to take good care.
Safe and steady, wise and fair—
Think before you share.
Mm… take your time…
Think before you share.`
      },
      // Lesson 3: Driving Safety and Knowing When to Adapt
      {
        title: 'Driving Safety and Knowing When to Adapt',
        file: 'Aging Wisdom/Course 2/Driving Safety and Knowing When to Adapt.mp3',
        lyrics: `Hey now, you've been drivin' for years,
Through laughter, miles, and gears,
You know the road like an old-time song,
Just takes a tweak to roll along!
No need to rush, no need to race,
Just find your groove, enjoy the pace!
Cruisin' smart and easy now,
You still got it—yes, you know how!
Take it light, take it slow,
That's the way the good rides go!
Daytime drivin', clear and bright,
Skip those tricky roads at night,
Check your mirrors, give some space,
Smooth and steady wins the race!
Plan your trip before you go,
Less surprise, more easy flow!
Cruisin' smart and easy now,
You still got it—yes, you know how!
Take it light, take it slow,
That's the way the good rides go!
If it feels a little tough,
That just means you're wise enough,
Shift it down, adjust your style,
You'll be drivin' safe in style!
"Hey, no hurry… we're gettin' there just fine!"
Cruisin' smart and easy now,
Keep that rhythm, take a bow!
Safe and sound, smooth and free,
That's the way it oughta be!
So tap the wheel and hum along,
You're still ridin' strong and long—
Just a new and better way…
To drive another day!`
      }
    ],
    remember: { title: 'Remember This - Exploitation', file: 'EXAMPLE SONGS/Aging Wisdom remember this songs/Remember this Course 2.mp3', lyrics: `Well, Joe loves the highway, Mary loves the wheel,

Both been drivin’ decades, got that seasoned feel,

But lately at night, those headlights glare,

And tight turns got a little more flair…



Ain’t no shame in sayin’, “Hey, things changed a bit,”

Smart folks notice… and they adjust their fit!



Ease it back, keep it smooth, take your time,

Daylight drivin’ feels just fine,

Leave some space, take the scenic view—

That’s a savvy kind of cool, that’s the real you!



Mary skips the freeway when it’s rush hour fast,

Joe maps his route so no surprises sneak past,

They laugh and say, “We’re still in the game,”

Just playin’ it wiser, not chasin’ the same!



If you feel that tension or you’ve had close calls,

That’s your inner wisdom knockin’ on the walls!



Ease it back, keep it smooth, take your time,

Daylight drivin’ feels just fine,

Leave some space, take the scenic view—

That’s a savvy kind of cool, that’s the real you!



Had a little comment? Maybe worth a peek,

A pro can check, give advice you can keep,

No family fuss, just facts that show—

How to keep on rollin’ safe and slow!



Plan ahead, stay ahead, that’s the way,

Keep your freedom every day,

Taxi, rides, or a friend or two—

Independence looks real good on you!



So tip your hat and drive with grace,

Life’s no race, just set your pace,

And when you choose what’s right and true—

The road rolls easy right along with you!` }
  },

  // ─── Aging Wisdom: Home and Daily Safety (c18) ───
  'c18': {
    lessons: [
      // Lesson 0: Home Security
      {
        title: 'Home Security',
        file: 'Aging Wisdom/Course 3/Home Security.mp3',
        lyrics: `Lock it up, make it tight,
Simple habits done right.
Check the windows, front and back,
Keep your safety on track.
Little lights when it gets dark,
Just enough to make a mark.
Nothing big, nothing loud,
Just a home that stands out proud.
It's easy when you see the way,
Small steps every day…
Stay smart, stay safe, that's the rule,
Nothing here is hard or cruel.
Just a little thought ahead,
Keeps you steady, keeps you fed.
No confusion, no delay,
Just the smart and simple way.
Stay smart, stay safe, you'll see—
That's how it's meant to be.
Don't leave keys where they can go,
Places everyone would know.
Trust is good, but keep it right,
Don't make it easy overnight.
Going out? Keep it low,
Don't tell the world where you go.
Let the house look like you're in,
That's where good habits begin.
Nothing fancy, nothing new,
Just the things you ought to do…
Stay smart, stay safe, nice and clear,
Keep it calm and keep it near.
Every step you take with care,
Stops the trouble getting there.
Simple choices every day,
Keep the risk all away.
Stay smart, stay safe, you'll see—
That's how it's meant to be.
If they knock and say "right now,"
You don't have to show them how.
Take your time and shut the door,
Real trades don't push for more.
Get it written, check it twice,
Compare it, make it nice.
Stay smart, stay safe, that's the key,
Nothing complex, just be free.
With a little care and sense,
Everything just makes more sense.
You're in control, you'll be fine,
Take your time, don't cross the line.
Stay smart, stay safe, you'll see—
That's how it's meant to be.
Yeah… nice and simple… stay safe.`
      },
      // Lesson 1: Personal Safety When Out
      {
        title: 'Personal Safety When Out',
        file: 'Aging Wisdom/Course 3/Personal Safety When Out.mp3',
        lyrics: `At the ATM, keep it bright,
Daytime visits, that's just right.
Inside the bank or store you know,
Where people come and people go.
Cover numbers, take your time,
Keep your PIN safe every time.
If someone's near, don't hesitate,
Step away, don't investigate.
Cash in hand, don't stand around,
Move yourself to safer ground…
Stay aware, stay safe, that's the way,
Simple habits every day.
Nothing hard, nothing new,
Just the things you ought to do.
Keep your focus, keep control,
That's the way to reach your goal.
Stay aware, stay safe, you'll see—
That's how it's meant to be.
When you park, choose it well,
Lighted places where you dwell.
Keep your bag close to your side,
Crossbody keeps it safe inside.
Keys in hand before you go,
So you're ready, moving slow.
And if something doesn't feel right,
Walk back in, don't lose sight.
Ask for help, that's what it's for,
Security at every store.
That uneasy feeling's real,
It tells you how to deal…
Stay aware, stay safe, stay wise,
Trust what's in your eyes.
Every step, don't be rushed,
Don't let awareness get crushed.
Simple actions, every day,
Keep the risks all away.
Stay aware, stay safe, you'll see—
That's how it's meant to be.
When you're walking, change your way,
Don't do everything the same each day.
Head up high, phone put away,
Watch what's happening where you stay.
If something feels a little wrong,
Don't ignore it, move along.
Cross the street, go inside,
Stay where other people reside.
At your door, take one more check,
Before you step or turn your neck.
Use the viewer, use the chain,
Make it safe before you gain.
You don't have to open wide,
Speak through doors, stay inside.
Ask for proof before you do,
Real visitors will talk it through.
Stay aware, stay safe each day,
That's the simple, steady way.
You've got sense, you've got care,
You know how to be aware.
Nothing here you cannot do,
It's already inside you.
Stay aware, stay safe, you'll see—
That's how it's meant to be.
Stay aware… stay safe…`
      },
      // Lesson 2: Medication Management and Fall Prevention
      {
        title: 'Medication Management and Fall Prevention',
        file: 'Aging Wisdom/Course 3/Medication Management and Fall Prevention.mp3',
        lyrics: `Line it up, day by day,
Keep confusion out the way.
Morning, night, it's plain to see,
What you've taken, what will be.
In the box, it's neat and clear,
No more guessing, no more fear.
Keep it dry and keep it right,
Out of reach and out of sight.
Simple habits, every day,
Keep the problems far away…
Keep it steady, keep it strong,
That's the way to carry on.
Nothing tricky, nothing new,
Just the things you ought to do.
Stay in charge, you'll be fine,
Step by step and line by line.
Keep it steady, keep it strong—
That's where you belong.
Take a moment, once a year,
Let the pharmacist make it clear.
What works well, what should go,
They can help you fine-tune slow.
Never share what's meant for you,
Different bodies, different view.
What helps one might cause a fall,
So keep it personal, that's all.
When things work together right,
Everything feels balanced, light…
Keep it steady, keep it strong,
That's the way to carry on.
Every check and every change,
Keeps your wellbeing in range.
Stay aware and take your time,
That's how everything aligns.
Keep it steady, keep it strong—
That's where you belong.
Look around your home with care,
What's down there should not be there.
Rugs that slip or cables loose,
That's where trouble gets its use.
Nightlights glowing soft and low,
Show you where you need to go.
Grab the rail, step by step,
Safe and steady with each step.
And good shoes make all the change,
Balance feels more sure and plain…
Check your sight from year to year,
Small changes aren't always clear.
And if you fall, don't rush to rise,
Take it slow, be wise.
If you're hurt, then call for aid,
Let the right help be made.
If you're not, then steady go,
Use the chair or table slow.
Keep it steady, keep it strong,
You've been doing it all along.
Little changes, day by day,
Keep the bigger risks away.
You've got wisdom, you've got skill,
You can stay in charge still.
Keep it steady, keep it strong—
That's where you belong.
Steady now… nice and strong…`
      },
      // Lesson 3: Emergency Preparedness
      {
        title: 'Emergency Preparedness',
        file: 'Aging Wisdom/Course 2/Emergency Preparedness.mp3',
        lyrics: `When the lights go out or the winds blow strong,
You'll be sittin' pretty, hummin' a song,
Got your kit all set, right by the door,
You're ready for whatever's in store!
A little prep goes a long, long way,
Keeps the worries all at bay!
Ready, steady, good to go!
Got what you need, you're in the know!
Rain or shine, hot or cold,
You're all set and in control!
Water, snacks, and meds in line,
Flashlight ready—workin' fine,
Radio hums, you're tuned in right,
Got backup plans for day or night!
Phone might fade, but you'll be okay,
You wrote those numbers down to stay!
Ready, steady, good to go!
Got what you need, you're in the know!
Rain or shine, hot or cold,
You're all set and in control!
If the heat rolls in—sip, sip, sip,
Close those shades and take a dip,
If it's cold, then layer tight,
Warm meals keep you feelin' right!
Power down? No need to fret,
You've got a plan, you're all set yet!
"Now that's what I call bein' prepared!"
Know your exits, one or two,
Tell a neighbor what you'll do,
And if you need a helping hand,
You've got support just as you planned!
Ready, steady, good to go!
Safe and sound, you run the show!
Whatever comes, you'll stand tall—
'Cause you were ready for it all!
So tip your hat and smile wide,
You've got confidence on your side—
A little prep, and there you go…
Ready, steady—good to go!`
      },
      // Lesson 4: Fire Safety and Carbon Monoxide
      {
        title: 'Fire Safety and Carbon Monoxide',
        file: 'Aging Wisdom/Course 2/Fire Safety and Carbon Monoxide.mp3',
        lyrics: `Hey now, let's keep it nice and bright,
A little check can save the night,
Press that button, hear that beep,
That's the sound that guards your sleep!
Change those batteries once a year,
Keep that safety loud and clear!
Safe at home, sweet home tonight,
Keep it steady, keep it right!
Little steps can save the day,
Keep the trouble far away!
Now carbon monoxide's sneaky, it's true,
No smell, no sign to warn you,
So set detectors, don't delay,
They'll keep that danger well at bay!
If it rings—don't hesitate,
Out you go and ventilate!
Safe at home, sweet home tonight,
Keep it steady, keep it right!
Little steps can save the day,
Keep the trouble far away!
Cookin' dinner? Stay right there,
Don't leave flames without a care!
Loose sleeves and towels—keep 'em clear,
Fire don't belong near here!
Pan flares up? Don't you splash!
Cover it quick—that's the dash!
"Cool, calm, and in control!"
Don't overload those plugs and wires,
That's how sparks can start the fires,
Heaters need some space to breathe,
Give 'em room and you'll be pleased!
Got a plan? Now that's the key,
Know your way out—one, two, three!
Safe at home, sweet home tonight,
You're the captain of your light!
With a plan and checks in place,
You'll keep danger in its place!
So swing along and don't forget,
Safety's your best partner yet—
A little care will always roam…
And keep you safe at home!`
      }
    ],
    remember: { title: 'Remember This - Mental Health', file: 'EXAMPLE SONGS/Aging Wisdom remember this songs/Remember this Course 3.mp3', lyrics: `Got a little box on the ceiling, blinkin’ red,

Keeps a watchful eye while you’re snug in bed,

Test it once a month, hear that beep-beep sound,

That’s your home sweet home sayin’, “I’ve got you around!”



New batteries yearly, don’t you delay,

Ten years later, swap it all the way!



Click, check, you’re good to go,

Keep it safe, take it slow,

From the kitchen to the hall—

A little care protects it all!



Now the pan’s on the stove and the kettle’s near,

Don’t walk away, keep your focus clear,

Short sleeves swingin’, timer set just right,

We’re cookin’ up safety every night!



Keep things clear from the flame’s hot glow,

That’s the kind of style the smart folks know!



Click, check, you’re good to go,

Keep it safe, take it slow,

From the kitchen to the hall—

A little care protects it all!



If you’re feelin’ dizzy, head’s in a spin,

Might not be a flu that you’re caught in,

Carbon monoxide’s sneaky that way—

Detector’s the hero savin’ the day!



Don’t crowd your sockets, give ’em some space,

Frayed old wires? Time to replace,

Blanket’s ancient? Let it retire,

We don’t dance with a risky wire!



Step by step, you’re in control,

Safety rhythm, heart and soul,

Two ways out and a torch nearby—

You’re ready for anything, that’s no lie!



Heater off when you leave the room,

Keep it clear of any gloom,

And if you need a helping hand—

Friendly pros will gladly stand!` }
  },

  // ─── Aging Wisdom: Keeping Your Money Safe (c19) ───
  'c19': {
    lessons: [
      // Lesson 0: Monitoring Your Accounts
      {
        title: 'Monitoring Your Accounts',
        file: 'Aging Wisdom/Course 4/Monitoring Your Accounts.Mp3',
        lyrics: `Every Sunday morning with your tea,
Take a little peek, it's easy as can be,
A quick look now can save you quite a lot,
Catch it early, darling, give it your best shot.
Day three is better than day twenty-eight,
A little check now can save you from fate!
Keep an eye on your pennies, dear,
Make it a habit, nothing to fear,
A click, a glance, you're in control,
Peace of mind is worth its gold!
Set a little alert upon your phone,
So you're never left to wonder all alone,
If something strange comes tapping at your door,
You'll know right then—no guessing anymore!
A buzz, a ping, it lets you know,
Something's up—now take it slow.
Keep an eye on your pennies, dear,
Make it a habit, nothing to fear,
A click, a glance, you're in control,
Peace of mind is worth its gold!
If a charge looks funny or a place you've never been,
Don't wait around to see it once again,
Call it in right away, don't delay,
Better safe than sorry any day!
Once a year, just take a little look,
At your credit like a well-loved book,
If there's a name or number you don't know,
That's your cue—it's time to let them go!
Keep an eye on your pennies, dear,
Simple steps will keep things clear,
Stay aware and you'll do just fine,
Your peace of mind will always shine!`
      },
      // Lesson 1: Protecting Retirement Income and Understanding Credit
      {
        title: 'Protecting Retirement Income and Understanding Credit',
        file: 'Aging Wisdom/Course 4/Protecting Retirement Income and Understanding Credit.mp3',
        lyrics: `If they call 'bout your pension plan,
Sayin' "Act right now!"—don't you panic, man,
Real news comes by post, nice and slow,
With a number you already know!
Phone rings fast, but don't you bite,
Hang it up and check it right!
If it sounds too good… it is!
That's the way to handle biz!
Take your time, don't be rushed,
That's how scammers get you hushed!
"Guaranteed returns!" they say with a grin,
But that's not how the game works in,
Real investing's got some sway,
Up and down—that's the way!
Big promises, flashy lines,
That's your cue—read the signs!
If it sounds too good… it is!
That's the golden rule in biz!
Slow and steady, play it smart,
That's the way to guard your heart!
"Fix your credit quick!" they cry,
But that's just another try,
Pay on time and keep things low,
That's the only way it grows!
"No shortcuts, pal—that's the deal!"
Letters come with proper seal,
Take your time to check what's real,
When in doubt, don't reply,
Use your numbers—give 'em a try!
If it sounds too good… it is!
Keep it cool, you got this!
Trust the steps that you know best,
Slow and steady beats the rest!
So tip your hat and keep it wise,
Don't fall for the big surprise—
A careful mind will always win…
Let the good sense swing right in!`
      },
      // Lesson 2: Legal and Financial Advance Planning
      {
        title: 'Legal and Financial Advance Planning',
        file: 'Aging Wisdom/Course 4/Legal and Financial Advance Planning.mp3',
        lyrics: `Now this ain't gloom, no, this ain't fear,
It's takin' charge while the path is clear,
A little plan goes a long, long way,
Keeps your future safe and okay!
Do it now while you're feelin' strong,
That's how you keep things rollin' on!
You're the one in control, my friend!
Call the shots right to the end!
Make it clear, make it known,
This is your life—run your own!
Pick someone you truly trust,
Cool and calm when things get tough,
They'll handle bills, they'll know your way,
Speak for you if you can't one day.
Health or money, choice is yours,
Set it up and lock those doors!
You're the one in control, my friend!
Call the shots right to the end!
Make it clear, make it known,
This is your life—run your own!
Write it down what you would choose,
Win or lose, what to use,
That's your voice, strong and true,
Speak your mind when you can't do!
"Now that's what I call peace of mind!"
Got a will? Then you're ahead,
No loose ends when you're well-read,
Change it when life shifts around,
Keep it clear and safe and sound.
If someone pushes—step away,
Real deals don't rush the play!
You're the one in control, my friend!
Strong and steady till the end!
Plan it right, nice and slow,
That's the smartest way to go!
So swing along with peace of mind,
You've got it set, you've got it signed—
A little plan, and now you know…
You're the one in control!`
      }
    ],
    remember: { title: 'Remember This - Physical Safety', file: 'EXAMPLE SONGS/Aging Wisdom remember this songs/Remember This Course 4.mp3', lyrics: `Well, you’re feelin’ fine, sharp as can be,

That’s the perfect time for a little “plan B,”

Not a gloomy thought, just a savvy move,

Keep your future swingin’ in a steady groove!



When the band’s still playin’ and you call the tune,

That’s when you set things up—don’t wait too soon!



Sign it smooth, set it right, nice and clear,

Put your wishes in writing while you’re here,

When tomorrow comes, you’ll rest easy too—

’Cause the plan’s in place lookin’ out for you!



Got a friend for money, one for care,

Pick folks who’ll follow what you declare,

Not just the closest, but the steadiest hand,

Someone who’ll honor just what you planned!



Health or finances, one or both,

It’s your call, your life, your oath!



Sign it smooth, set it right, nice and clear,

Put your wishes in writing while you’re here,

When tomorrow comes, you’ll rest easy too—

’Cause the plan’s in place lookin’ out for you!



Write it down how you wanna be cared,

That’s your voice when you can’t be heard,

And a will’s for everyone, big or small—

Peace of mind is the prize for all!



Life may change, so review the page,

New chapter turnin’, new wiser age,

Keep it safe with a pro who knows,

That’s how a smooth plan always goes!



Stand your ground, keep control, don’t bend,

If there’s pressure, talk to a pro, my friend,

Your choices matter, they must stay true—

No one else gets to rewrite you!



So tip your hat to the plans you’ve made,

Strong and steady, never swayed,

With a little prep and a point of view—

The future’s hummin’ right along with you!` }
  },

  // ─── Aging Wisdom: Staying Well (c20) ───
  'c20': {
    lessons: [
      // Lesson 0: Travelling Safely
      {
        title: 'Travelling Safely',
        file: 'Aging Wisdom/Course 5/Travelling Safely.mp3',
        lyrics: `Pack your bags and off you go,
Got a whole wide world to know,
But first you tell a friend or two,
Where you're stayin', what you'll do!
A little plan before you roam,
Keeps your heart feel right at home!
Travel smart, travel bright!
Everything is set just right!
Safe and sound, don't delay,
That's the happy travel way!
Tell your bank you're overseas,
Keep your cards flowin' with ease,
Copies made and tucked away,
Insurance there to save the day!
Docs and meds, don't forget,
That's your safety safety net!
Travel smart, travel bright!
Everything is set just right!
Safe and sound, don't delay,
That's the happy travel way!
Check your room when you arrive,
Locks all working? Feel alive!
Keep your passport safe and tight,
In the hotel safe at night.
If they knock and you're unsure,
Call the desk to be secure!
"Always better safe than surprised!"
Medic card and numbers too,
Doctors, allergies—all in view,
Know the hospital nearby,
Just in case you need to try.
When you're ready, then you'll see,
Travel's better worry-free!
Travel smart, travel bright!
Every step is done just right!
You've got plans and peace of mind,
Leave the worry far behind!
So tip your hat and take the flight…
You've done it all just right!`
      },
      // Lesson 1: Recognising Cognitive Decline
      {
        title: 'Recognising Cognitive Decline',
        file: 'Aging Wisdom/Course 5/Recognising Cognitive Decline.mp3',
        lyrics: `Lost your keys? That's alright,
Found 'em back after a little light,
Names and dates slip out the door,
Then they come back once more!
Take your time, don't you fret,
That's not trouble just yet!
That's just life, but let's be wise!
Know the signs and realise,
When to smile and carry on,
And when to check what's goin' on!
But if things start to feel unclear,
Same question asked again, my dear,
Familiar roads feel strange one day,
That's a sign to check the way.
Don't ignore, don't delay,
Just talk it through and find the way!
That's just life, but let's be wise!
Know the signs and realise,
Help is near and help is kind,
Peace of heart and peace of mind!
Could be sleep or vitamin low,
Medication draggin' slow,
Depression, stress, or thyroid too,
Lots of things that doctors can do!
"Most of this is treatable—you're not alone!"
Bring a friend who's seen the change,
They can help to explain,
Sometimes others clearly see,
What we miss naturally.
That's just life, but let's be wise!
Ask for help and recognise,
Early care is the smart way through,
And there's support for you!
So don't you worry, don't you fear…
Just get it checked—and keep things clear!`
      },
      // Lesson 2: Mental Health and Wellbeing in Later Life
      {
        title: 'Mental Health and Wellbeing in Later Life',
        file: 'Aging Wisdom/Course 5/Mental Health and Wellbeing in Later Life.mp3',
        lyrics: `If the blues hang 'round too long,
That's not just life—that's not your song,
Sadness comes, then slips away,
But this one's here from day to day.
Don't you brush it off or hide,
Help is there right by your side!
You're not alone, not at all!
You're allowed to make that call!
There is help, there is light,
Things can feel good again tonight!
Lonely days can weigh you down,
Even in a busy town,
But connection heals the mind,
One small step and you will find…
A friend, a group, a place to go,
More support than you may know!
You're not alone, not at all!
You're allowed to make that call!
Life keeps open every door,
There is still so much in store!
If grief is heavy, let it be,
Talk about the memory,
And if it grows instead of fades,
Speak up early, don't delay.
Purpose lives in brand-new ways,
In learning, giving, active days,
And if someone makes you fear,
That's a voice that should not be near.
No control, no pressure, none,
You deserve to feel like you've won.
Sleep or hearing not quite right?
These are things to treat—not fight!
You're not alone, not at all!
Stand up tall and make that call!
Help is near, steady and true,
There's a brighter path for you!
So swing along and don't forget…
The best days aren't behind you yet`
      },
      // Lesson 3: Nutrition, Hydration, and Temperature Awareness
      {
        title: 'Nutrition, Hydration, and Temperature Awareness',
        file: 'Aging Wisdom/Course 5/Nutrition, Hydration, and Temperature Awareness.mp3',
        lyrics: `Hey now, don't you skip that meal,
That's the fuel that helps you feel,
Strong and steady, day by day,
Keeps the wobble far away!
Little habits, big return,
That's the simple thing to learn!
Eat well, drink well, feel so fine!
Keep that body in its prime!
Little steps, every day,
Keep the tiredness away!
Thirst don't shout like it used to do,
So you've got to push on through,
Sip that water, nice and slow,
Keep it goin', let it flow!
Don't wait for a warning sign,
Just take a sip and you'll be fine!
Eat well, drink well, feel so fine!
Keep that body in its prime!
Little steps, every day,
Keep the tiredness away!
Protein power keeps you strong,
Eggs and fish will help along,
Beans and dairy, good and true,
That's what keeps you movin' through!
If cooking feels a bit too much,
There's easy ways to stay in touch—
Frozen meals or help from friends,
That's how good nutrition bends!
Medicines can change the game,
So check with someone just the same,
Some need food or extra care,
Pharmacists are always there!
And alcohol? Take it slow,
It hits you harder as you grow.
Eat well, drink well, feel so fine!
Stayin' strong all the time!
Simple steps, smart and true,
Take good care of you!
So swing along and don't forget…
The best health habits start just yet`
      }
    ],
    remember: { title: 'Remember This - Healthy Relationships', file: 'EXAMPLE SONGS/Aging Wisdom remember this songs/Remember This Course 5.mp3', lyrics: `Well, you’re feelin’ fine, sharp as can be,

That’s the perfect time for a little “plan B,”

Not a gloomy thought, just a savvy move,

Keep your future swingin’ in a steady groove!



When the band’s still playin’ and you call the tune,

That’s when you set things up—don’t wait too soon!



Sign it smooth, set it right, nice and clear,

Put your wishes in writing while you’re here,

When tomorrow comes, you’ll rest easy too—

’Cause the plan’s in place lookin’ out for you!



Got a friend for money, one for care,

Pick folks who’ll follow what you declare,

Not just the closest, but the steadiest hand,

Someone who’ll honor just what you planned!



Health or finances, one or both,

It’s your call, your life, your oath!



Sign it smooth, set it right, nice and clear,

Put your wishes in writing while you’re here,

When tomorrow comes, you’ll rest easy too—

’Cause the plan’s in place lookin’ out for you!



Write it down how you wanna be cared,

That’s your voice when you can’t be heard,

And a will’s for everyone, big or small—

Peace of mind is the prize for all!



Life may change, so review the page,

New chapter turnin’, new wiser age,

Keep it safe with a pro who knows,

That’s how a smooth plan always goes!



Stand your ground, keep control, don’t bend,

If there’s pressure, talk to a pro, my friend,

Your choices matter, they must stay true—

No one else gets to rewrite you!



So tip your hat to the plans you’ve made,

Strong and steady, never swayed,

With a little prep and a point of view—

The future’s hummin’ right along with you!` }
  },

  // ============================================================
  // NEST BREAKING - Course IDs: c6, c7, c8, c9
  // ============================================================

  // ─── Nest Breaking: Living Independently (c6) ───
  'c6': {
    lessons: [
      {
        title: 'Securing Your Home',
        file: 'EXAMPLE SONGS/Nest breaking/Course 1 Nest Breaking/Securing Your Home.mp3',
        lyrics: `First night in a quiet place,

 Boxes still by the wall,

 Keys in hand, a simple step,

 One change protects it all.

You don’t know the hands before,

 Or where those copies lie,

 But peace begins with closing doors,

 And knowing who walks by.

 It’s not fear that guides your way,

 Just wisdom earned in time,

 A softer lock, a careful eye,

 A life that’s still all mine.



 Keep your circle small and true,

 The ones you trust the most,

 No hidden keys beneath the mat,

 No risks you leave to chance.

Light a home that feels alive,

 Even when you're gone,

 Let the world see someone’s there,

 From dusk until the dawn.

 It’s not fear that guides your way,

 Just wisdom earned in time,

 A safer door, a steady heart,

 A life that’s still all mine.

Home is more than walls and space,

 It’s quiet, calm, and known,

 And every careful choice you make

 Keeps it truly your own.`
      },
      {
        title: 'Fire Safety and Household Emergencies',
        file: 'EXAMPLE SONGS/Nest breaking/Course 1 Nest Breaking/Fire Safety and Household Emergencies.mp3',
        lyrics: `Walk the rooms when daylight fades, Trace the paths you’d take, In the dark your body knows The choices you must make.

A door closed tight can buy you time, Minutes you might need, Small decisions, quiet strength, In moments we can’t see.

Plan it now, so later comes Without the fear or doubt, When seconds count and silence breaks, You’ll already know the route.

 Test the alarm, don’t leave it chance, Listen for its call, A simple sound between the night And losing it all.

Water waits beneath the sink, Power rests nearby, Know the switches, know the flow, Before the pressure’s high.

 Plan it now, so later comes Without the fear or doubt, Prepared hands and steady breath Know exactly how to get out.

It’s not about the worst that comes, But knowing what to do, So when it matters most of all, You carry yourself through.`
      },
      {
        title: 'Financial Safety and Your Support Network',
        file: 'EXAMPLE SONGS/Nest breaking/Course 1 Nest Breaking/Financial Safety and Your Support Network.mp3',
        lyrics: `Some doors look open wide and bright, Too good to turn away, But wisdom whispers quietly, “Slow down—don’t rush today.”

If it asks for more before you see, Or pushes you to choose, It’s not an opportunity— It’s something you could lose.

 Take your time, look twice, stand still, Let the truth come through, What is real will wait for you, What is false will rush you.

No honest voice will ask for keys To the things you hold inside, Your numbers, codes, your private world, Those truths you never hide.

And strength is not in standing lone, But knowing who’s nearby, A name, a call, a helping hand, When questions start to rise.

Take your time, look twice, stand still, You don’t have to do it alone, A life well lived is built on trust, And people you’ve long known.

Independence doesn’t mean You walk this road apart, It means you choose the ones you keep Close to your steady heart.`
      }
    ],
    remember: {
      title: 'Remember This - Living Independently',
      file: 'EXAMPLE SONGS/Nest breaking/Course 1 Nest Breaking/Remember This Course 1 Nest Breaking.mp3',
      lyrics: `Lock the doors, check the light,

 Simple things done right,

 Quiet habits every day

 Keep the worries light.

Test the sound that guards your night,

 Know the switches well,

 Little knowledge in your hands

 Has more power than you can tell.

Remember this, remember well,

 The small things keep you strong,

 A steady life is built from steps

 You’ve practiced all along.



 Not every voice is what it seems,

 Not every offer true,

 Take your time, stand your ground,

 Let good sense guide you.

And keep the ones who know your name,

 Close enough to call,

 Because a life lived independently

 Still leans on love through it all.

Remember this, remember well,

 You’re never on your own,

 The strongest roots are often those

 That quietly have grown.

 In every choice, in every day,

 There’s calm in what you know,

 A life of wisdom, safely lived,

 Is the greatest strength you show.`
    }
  },

  // ─── Nest Breaking: Social Situations (c7) ───
  'c7': {
    lessons: [
      {
        title: 'Planning Nights Out and Drink Safety',
        file: 'EXAMPLE SONGS/Nest breaking/Course 2 Nest Breaking/Planning Nights Out and Drink Safety.mp3',
        lyrics: `Before the night begins to glow,

 Before the laughter flows,

 A little thought, a simple plan,

 Goes further than you know.

 Who you’re with and where you go,

 How you’ll make your way,

 These quiet steps before the night

 Help keep the dark at bay.

 Enjoy the night, but know your ground,

 Keep your circle near,

 The best of times are still the ones

 Where you feel safe and clear.



 A glass left standing all alone

 Is one you leave behind,

 A moment’s cost is nothing next

 To peace within your mind.

 If something feels a little off,

 Don’t question what you feel,

 Your body speaks in subtle ways,

 And what it says is real.

 Enjoy the night, but know your ground,

 Let wisdom lead the way,

 A thoughtful start, a careful step,

 Keeps trouble far away.`
      },
      {
        title: 'Substances Peer Pressure and Saying No',
        file: 'EXAMPLE SONGS/Nest breaking/Course 2 Nest Breaking/Substances Peer Pressure and Saying No.mp3',
        lyrics: `You don’t need a reason why,

 You don’t need a speech,

 “No” is strong enough to stand

 Just out of someone’s reach.

 If they push beyond your line,

 That tells you what you need,

 Respect is shown in listening,

 Not pressure or in need.

 Stand your ground, hold your space,

 Let your voice be clear,

 The ones who matter hear your “no”

 And never bring you fear.

 And if a friend begins to fall,

 Beyond what they can take,

 That’s the moment courage shows,

 The call you have to make.

  Stay beside them, don’t walk off,

 Help is worth the call,

 Because in moments that define,

 A life outweighs it all.

 Stand your ground, hold your space,

 But reach when others fall,

 Strength is not just walking free,

 It’s answering the call.`
      },
      {
        title: 'Consent in Social Settings',
        file: 'EXAMPLE SONGS/Nest breaking/Course 2 Nest Breaking/Consent in Social Settings.mp3',
        lyrics: `A moment shared is not a claim,

 Not something you can keep,

 Each step forward must be met

 With trust that runs as deep.

  Silence isn’t saying yes,

 Nor hesitation clear,

 Respect is found in asking twice,

 In listening to hear.

 Every yes must still be free,

 Every step agreed,

 Respect is more than what you want,

 It’s honoring what they need.

 And if the answer turns to “no,”

 Or fades along the way,

 The strength is in the stopping then,

 Not trying to persuade.

  Love or trust is never built

 On pressure or control,

 It lives within the quiet space

 Where both hearts feel whole.

 Every yes must still be free,

 Every moment true,

 The greatest sign of dignity

 Is what you choose to do.`
      },
      {
        title: 'Getting Home Safely',
        file: 'EXAMPLE SONGS/Nest breaking/Course 2 Nest Breaking/Getting Home Safely.mp3',
        lyrics: `The night winds down, the lights grow dim,

 The laughter fades away,

 And how you leave, and how you go,

 Still matters at the end of day.

  A ride arranged, a path well known,

 A message sent ahead,

 These simple things can turn a night

 From worry into rest.

  Get home safe, take your time,

 Don’t trade care for speed,

 The road is kinder when you walk

 With thought for what you need.

 And if a friend can’t find their way,

 Or stands unsure, alone,

 That’s when your presence matters most,

 Don’t leave them on their own.

  Sit beside them, see them through,

 Until the danger’s gone,

 Because the nights we look back on

 Are the ones we kept each other strong.

 Get home safe, take your time,

 Stay until it’s right,

 The best of us is always shown

 At the end of night.`
      }
    ],
    remember: {
      title: 'Remember This - Social Situations',
      file: 'EXAMPLE SONGS/Nest breaking/Course 2 Nest Breaking/Remember This Course 2.mp3',
      lyrics: `Plan it out before you go,

 Know your way back home,

 Little choices shape the night,

 So you’re not alone.

  Watch your drink, trust your sense,

 If something feels off, step away,

 Those quiet instincts in your chest

 Have learned along the way.

 Remember this, the night is yours,

 But only if you steer,

 With steady hands and open eyes,

 And people you hold dear.

  Say no when you need to say,

 Stand firm in your place,

 And never leave a friend behind

 When trouble shows its face.

 Remember this, the night is yours,

 When wisdom leads the way,

 A life well lived is built on care

 In moments like today.`
    }
  },

  // ─── Nest Breaking: Spatial Awareness (c8) ───
  'c8': {
    lessons: [
      {
        title: 'Reading Your Environment',
        file: 'EXAMPLE SONGS/Nest breaking/Course 3 Nest breaking/Reading Your Environment.mp3',
        lyrics: `Walk in slow, take a look around

Don’t need much, just a mental map now

Doors to the left, light through the back

Couple ways out, keep a note of that



No stress, no overthinking it

Just a habit that you’re building quick

Give it time, it becomes instinct

You don’t even notice when you do it



It’s not fear, it’s just knowing

Little things that keep you going

Quiet moves, no one sees

But you’re always where you need to be



I stay light on my feet, eyes open

Read the room, yeah I’m locked in

If it shifts, I don’t fight it

I just move, real quiet



No panic, no pressure

Just me getting better

I don’t need a reason why

I trust that feeling every time



Late streets, neon flickers on

Some spots busy, some already gone

Shops still open, people passing by

Keep the rhythm, just observe the vibe



Not paranoia, not that kind

Just collecting what’s around in real time

More you see, more you know

More directions you can choose to go



It’s a shift you start to feel

Something subtle, something real

Can’t explain it, that’s alright

You just move and you don’t think twice



I stay light on my feet, eyes open

Read the room, yeah I’m locked in

If it shifts, I don’t fight it

I just move, real quiet



No panic, no pressure

Just me getting better

I don’t need a reason why

I trust that feeling every time



If it changes, I don’t stay

Step outside, I find a way

Call a friend, walk and breathe

Stay around the energy



Don’t explain, don’t overplay

Just move on, you’re okay

It’s already in your mind

You’ve been learning the whole time



I stay light on my feet, eyes open

Read the room, yeah I’m locked in

Every step, I’m deciding

Where I go, perfect timing



No fear in the motion

Just calm in the moment

I don’t need a reason why

I trust that feeling every time`
      },
      {
        title: 'Body Language and Trusting Your Gut',
        file: 'EXAMPLE SONGS/Nest breaking/Course 3 Nest breaking/Body Language and Trusting Your Gut.mp3',
        lyrics: `Walk like you’ve been here before,

 Even if you’re unsure,

 Lift your eyes from the ground below,

 Let your presence feel secure.

 Not about a show of strength,

 Or proving anything at all,

 Just a quiet kind of knowing

 That you’re steady when you walk.

 Keep one ear tuned to the world,

 Let the silence speak its part,

 There’s a rhythm in attention

 That begins inside your heart.

 You don’t need to read the room

 Like a book you understand,

 Just notice when the feeling shifts

 Like sand beneath your hand.

 You’ve lived enough to recognize

 When something isn’t right,

 That voice inside don’t need a name

 To guide you through the night.

 Trust that feeling deep inside,

 It’s wiser than you think,

 It don’t wait for proof or reason,

 Moves faster than a blink.

 You don’t owe a single moment

 To a space that feels untrue,

 Turn around, keep walking forward—

 Let your instincts carry you.

 You don’t owe polite replies

 To someone crossing lines,

 Distance is a full sentence,

 You don’t need to justify.

 Every step you choose to take

 Is yours and yours alone,

 And strength is often quiet

 When it’s fully grown.

 Maybe you’re wrong sometimes—

 That’s just part of being human,

 But it’s better to be moving on

 Than standing still in confusion.

 You can always turn back later,

 Reassess what you feel,

 But in the moment, trust the part

 Of you that knows what’s real.

 Trust that feeling deep inside,

 It’s wiser than you think,

 It don’t wait for proof or reason,

 Moves faster than a blink.



 Walk like you’ve been here before…

 Even when you haven’t yet.`
      },
      {
        title: 'Safe Routes and Exit Strategies',
        file: 'EXAMPLE SONGS/Nest breaking/Course 3 Nest breaking/Safe Routes and Exit Strategies.mp3',
        lyrics: `There’s a road that cuts through quiet streets,

 Gets you there real fast,

 But shadows stretch a little longer

 Where the streetlights don’t last.

 And there’s another way around the bend,

 With people, sound, and light,

 It takes a little longer—

 But it feels a little right.

 Before you step into the night,

 Before you leave the door,

 A moment’s thought can map a path

 You won’t regret before.

 Where’s the turn if plans should change?

 Where’s the place you’d go?

 You don’t need a perfect plan—

 Just somewhere safe you know.

 It’s not about expecting harm,

 Or fearing what might be,

 It’s giving yourself options

 So you always stay free.

 Take the road with light and life,

 Even if it’s long,

 Because the safest path you choose

 Is where you still belong.

 Know your way before you go,

 Keep a second plan in sight,

 Freedom lives in knowing how

 To leave when it’s not right.

  And when you walk into a place,

 Take note without a show,

 Where the doors and exits lead,

 Just quietly know.

 You don’t need to overthink,

 Or carry heavy doubt,

 Just give yourself the simple gift

 Of knowing how to get out.

  You’re always allowed to leave—

 No reason needs to be said,

 No story owed to anyone

 For choosing peace instead.

 The strongest move you’ll ever make

 Is walking when you choose,

 Not waiting for a moment

 Where you feel you have to prove.

  Take the road with light and life,

 Even if it’s long…

 A longer road, a safer night,

 A quiet, steady choice—

 That’s how you carry freedom

 In the sound of your own voice.`
      }
    ],
    remember: {
      title: 'Remember This - Spatial Awareness',
      file: 'EXAMPLE SONGS/Nest breaking/Course 3 Nest breaking/Remember this Course 3.mp3',
      lyrics: `The world will always speak to you

 In ways you can’t explain,

 A shift in tone, a change in air,

 A feeling you can’t name.

 It’s not a call to live in fear,

 Or see danger everywhere,

 It’s simply learning how to notice

 What is already there.

 A doorway here, a crowded street,

 A light that stays on late,

 A simple scan of where you stand

 Can quietly shape your fate.

 The more you see, the more you know,

 The less you need to guess,

 Awareness isn’t heavy—

 It’s a form of lightness.

 You don’t need to analyze

 Every passing face,

 Just let your senses guide you

 Through each and every place.

 Pay attention, trust your sight,

 Let the small things guide you right,

 Awareness isn’t fear at all,

 It’s standing steady, standing tall.

 In every step, in every place,

 There’s quiet strength in knowing space,

 You move with calm, you move with ease,

 Because you see what others miss.

 And if the feeling changes—

 Even slightly, even small,

 That’s your moment to adjust,

 You don’t need to question it at all.

 Pay attention, trust your sight…

 It’s not fear…

 It’s knowing.`
    }
  },

  // ─── Nest Breaking: Digital Identity (c9) ───
  'c9': {
    lessons: [
      {
        title: 'Your Digital Footprint and Privacy',
        file: 'EXAMPLE SONGS/Nest breaking/Course 4 Nest Breaking/Your Digital Footprint and Privacy.mp3',
        lyrics: `Every word you send away

 Finds a place to stay,

 Not just in the moment now

 But in another day.

 A picture shared, a passing thought,

 A moment that feels small,

 Can echo far beyond the time

 You meant it for at all.

 The places that you go each day,

 The rhythm of your life,

 Are pieces of a story

 That don’t need to be advertised.

 Not every eye that finds your page

 Is one you’d choose to know,

 So guard the parts that matter most—

 The ones you don’t outgrow.

 It’s not about hiding who you are,

 Or living closed and tight,

 It’s knowing what belongs to you

 And what stays out of sight.

 Leave behind what you’d be proud

 To see again someday,

 Because the world remembers more

 Than we can take away.

 Hold your story carefully,

 Let wisdom choose what’s shown,

 A life well lived is something

 You don’t owe to be made known.

 Time can change a thousand things,

 But not what’s been displayed,

 So think beyond the moment now

 Before the choice is made. Not everything needs sharing…

 Some things are yours alone.`
      },
      {
        title: 'Online Financial Safety',
        file: 'EXAMPLE SONGS/Nest breaking/Course 4 Nest Breaking/Online Financial Safety.mp3',
        lyrics: `A message comes with urgency,

 A voice that sounds so real,

 It tells you act immediately—

 That pressure is the deal.

 But truth has never rushed you,

 Or pushed you to decide,

 And anything that hurries you

 Has something there to hide.

 No honest hand will ever ask

 For what you keep secure,

 Your numbers, codes, your private keys—

 Those things remain yours.

 And if a call feels just a little

 Off from what you know,

 Hang up, step back, take your time,

 And let your judgment show.



 A moment’s pause is stronger

 Than reacting in the rush,

 Because calm decisions rarely lead

 To something you can’t trust.

 Slow it down, take a breath,

 Let the moment pass,

 What is real will still be there,

 What is false won’t last.

 Check it twice, trust your pace,

 Let caution be your guide,

 Because peace of mind is something

 You can never re-buy.

 The world has changed its ways, it’s true,

 But wisdom still remains,

 Take your time, confirm the truth,

 Don’t be led by pressure’s chains.

 If it rushes you… it’s not for you.`
      },
      {
        title: 'Reporting and Getting Support',
        file: 'EXAMPLE SONGS/Nest breaking/Course 4 Nest Breaking/Reporting and Getting Support.mp3',
        lyrics: `When something weighs upon your mind

 And steals your sense of ease,

 It’s not a burden meant for you

 To carry silently.

 There’s strength in saying something,

 In letting others know,

 Because the darkest situations

 Fade when light is shown.

 Hold onto what has happened,

 Keep the proof before it’s gone,

 Because your voice may be the one

 That helps another on.

 And telling isn’t weakness,

 It’s courage in its form,

 A quiet act of standing up

 When something isn’t right.

 You don’t have to manage

 Every storm that comes your way,

 There are hands that will reach out

 If you choose to say.

 Speak it out, let it be heard,

 You are not alone,

 There is power in your voice

 And strength in what you’ve shown.

 Step by step, you’ll find your ground,

 Even through the strain,

 Because asking for support

 Is how we rise again.

 And someone else may need your voice

 To find their courage too,

 What you choose to say today

 May guide somebody through.

 You don’t have to carry it alone.`
      }
    ],
    remember: {
      title: 'Remember This - Digital Identity',
      file: 'EXAMPLE SONGS/Nest breaking/Course 4 Nest Breaking/Remember This Course 4.mp3',
      lyrics: `Every step you take online

 Leaves something in its place,

 A trail of quiet moments

 That time cannot erase.

 So move with care and clarity

 In everything you do,

 Because the world beyond the screen

 Still connects to you.

 Think before you share your life,

 Protect what can’t be seen,

 The quiet parts, the private things,

 Still matter in between.

 Stay aware, stay in control,

 Let wisdom lead the way,

 Because what you choose to keep

 Still shapes your every day.

 Protect your peace…

 It’s worth more than a post.`
    }
  }
,

  // ============================================================
  // ROAMING FREE - Course IDs: c11, c12, c13, c14, c15
  // ============================================================

  // ─── Roaming Free: Before You Go (c11) ───
  'c11': {
    lessons: [
      {
        title: 'Research, Insurance and Documents',
        file: 'EXAMPLE SONGS/Roaming free/Course 1/Research, Insurance and Documents.mp3',
        lyrics: `Before the road begins to call

And dreams begin to rise,

There’s wisdom found in learning first

What waits beyond your eyes.

The places that you plan to go

Have stories already told,

And knowing them before you leave

Is worth far more than gold.

A paper in your pocket,

A number you can call,

May seem like small protection

But it matters most of all.

Because when plans are tested

And the unexpected shows,

Preparation is the thing

That helps you through those roads.

It’s not about expecting wrong,

It’s knowing you’re prepared,

So every step you choose to take

Is taken with more care.

Know before you go, my friend,

Let wisdom lead the way,

Because the safest journeys still

Are built before the day.

Carry what you might not need

Until you finally do,

And you’ll find peace in knowing

You’ve already thought it through.

A well-prepared journey

Is a calm one.`
      }      ,
      {
        title: 'Managing Money and Valuables',
        file: 'EXAMPLE SONGS/Roaming free/Course 1/Managing Money and Valuables.mp3',
        lyrics: `Take a little, leave the rest,

You don’t need it all,

Because the more you carry with you

Is more that risk can call.

Not every thing of value

Needs to make the trip,

Sometimes peace is found

In what you choose to skip.

Keep it spread in different places,

Not all within one hand,

Because if one part disappears

You still can make a stand.

A wallet’s not a lifeline

If it’s all you’ve got to lose,

A little careful planning

Gives you more than you could choose.

It’s not about suspicion,

It’s just thinking things ahead,

So you’re not left without options

If something goes instead.

Spread it out, take it slow,

Don’t keep all in one place,

Because a little foresight now

Keeps worry out of space.

Travel light in what you hold,

But strong in how you plan,

And you’ll always keep control

No matter where you land.

Less to carry…

More to enjoy.`
      }      ,
      {
        title: 'Packing Smart and Travel Preparation',
        file: 'EXAMPLE SONGS/Roaming free/Course 1/Packing Smart and Travel Preparation.mp3',
        lyrics: `There was a time you packed it all,

Just in case you’d need,

But years have taught what matters most

Is less, not more to carry.

A lighter bag, an easier step,

A clearer state of mind,

You leave behind what weighs you down

And take what serves you best.

Fold the things that truly count,

Leave space for what you’ll find,

Because the road has gifts to give

You never planned in time.

Not every “what if” needs a place

Inside your traveling load,

Some answers only show themselves

Once you’re on the road.

It’s not about forgetting things,

It’s choosing what is true,

That comfort doesn’t come from weight

But from what works for you.

Travel light, move with ease,

Let freedom guide your way,

The less you carry on your back

The more you feel the day.

Take what helps and leave the rest,

You’ve learned what matters most,

And peace is found in knowing

What you chose not to hold.

You’ve lived enough to understand

That “just in case” can grow,

Into a burden you don’t need

On roads you’ve yet to know.

Chorus (Repeat)

Travel light, move with ease…

Less in your hands…

More in your life.`
      }
    ],
    remember: {
      title: 'Remember This Course 1',
      file: 'EXAMPLE SONGS/Roaming free/Course 1/Remember This Course 1.mp3',
      lyrics: `ERR:404`
    }
  },

  // ─── Roaming Free: Avoiding Scams (c12) ───
  'c12': {
    lessons: [
      {
        title: 'Common Travel Scams',
        file: 'EXAMPLE SONGS/Roaming free/Course 2/Common Travel Scams.mp3',
        lyrics: `A friendly voice with easy charm,

A deal too good to miss,

A helping hand you didn’t ask—

It starts a lot like this.

They rush the moment forward

Before you think it through,

Because the space between the steps

Is where you’d see the truth.

A taxi with no meter running,

A guide you never planned,

A story that keeps changing

As it slips right through your hands.

It’s not about distrust of all,

Or shutting every door,

It’s simply knowing when to pause

And question just a little more.

If it feels too quick, too easy,

Or just a little strange,

That’s your moment to step back

Before the terms can change.

Trust, but take a second look,

Don’t let hurry lead,

Because the calm and careful step

Is always what you need.

Let them talk, but keep your ground,

You don’t have to agree,

The strongest place you stand is where

You choose your clarity.

A “no” can close a thousand doors

That shouldn’t open wide,

And peace of mind is worth far more

Than saving time or pride.

Not every shortcut leads you forward.`
      }      ,
      {
        title: 'Urban Safety and Socialising',
        file: 'EXAMPLE SONGS/Roaming free/Course 2/Urban Safety and Socialising.mp3',
        lyrics: `Step into the city lights,

Let the rhythm move your pace,

There’s a balance in the way you walk,

A presence in your space.

You don’t need to rush the night,

Or prove that you belong,

Because confidence is quiet

When it’s steady, calm, and strong.

Keep your focus soft but wide,

Take in what’s around,

Not every detail needs your thought,

Just notice sight and sound.

And when you meet a stranger’s smile,

Be open, but be wise,

There’s a difference you can feel

Between the truth and disguise.

It’s not about suspicion,

It’s awareness in your stride,

A way of moving through the world

With nothing left to hide.

Move with purpose, steady pace,

Let your presence speak,

Because the way you carry yourself

Is stronger than you think.

Head up high, eyes awake,

Let confidence be seen,

And you’ll find the space around you

Stays calmer in between.

You’ve walked through years of living,

You know more than you say,

So trust the way you read a room

Without needing to explain.

You belong wherever you stand.`
      }      ,
      {
        title: 'Accommodation Safety and Transport',
        file: 'EXAMPLE SONGS/Roaming free/Course 2/Accommodation Safety and Transport.mp3',
        lyrics: `A new room, unfamiliar walls,

A place that’s not your own,

But comfort grows in simple checks

That quietly are done.

The lock, the door, the window frame,

The exit down the hall,

It doesn’t take much time at all

To understand it all.

A driver’s name, a license plate,

A moment just to see,

Because the smallest confirmations

Shape your safety quietly.

You don’t need to overthink,

Or question every move,

Just give yourself the clarity

That helps you feel secure.

It’s not about expecting wrong,

It’s building peace of mind,

So every place you rest your head

Feels safe, and feels aligned.

Check the door, know the way,

Take a breath, feel at ease,

Because a moment’s simple care

Brings lasting clarity.

Move with calm, move with trust,

But grounded in what’s true,

The safest place you’ll ever find

Is one prepared by you.

Rest comes easier at night

When small things are in place,

And peace is often built from steps

We almost don’t embrace.

Safe, steady… at rest.`
      }
    ],
    remember: {
      title: 'Remember This Course 2',
      file: 'EXAMPLE SONGS/Roaming free/Course 2/Remember This Course 2.mp3',
      lyrics: `Touchdown, quiet room, city breathing through the glass

Lights low, heartbeat steady, shadows slipping past

Double check the silence, something in the air

Never let your guard down, even when you’re there

No names in the hallway

Keep it on the low

If they knock, don’t answer

You don’t gotta show

Lock it, lock it — feel the rhythm in your chest

Chain on, lights off, never second guess

Move smart, stay close to the energy you trust

Late night, eyes wide, it’s a quiet kind of rush

Train slides, cold steel, faces passing by

Stay where the light is, don’t drift to the side

Hands tight on your story, everything you hold

Crowd noise keeps you covered, never move alone

Check signs, read the moment

Don’t ignore the tone

If it feels off, wait it out

You’re better on your own

Lock it, lock it — feel the rhythm in your chest

Chain on, lights off, never second guess

Move smart, stay close to the energy you trust

Late night, eyes wide, it’s a quiet kind of rush

Check the ride, match the name

Send it out, just in case

No rush, take your time

You control the pace

No need to say it loud

You already know

Move clean through the night

Stay in control`
    }
  },

  // ─── Roaming Free: Health and Emergencies (c13) ───
  'c13': {
    lessons: [
      {
        title: 'Staying Healthy While Travelling',
        file: 'EXAMPLE SONGS/Roaming free/Course 3/Staying Healthy While Travelling.mp3',
        lyrics: `New city, late light, landing half awake

Bathroom sink running, easy mistake

It’s not the big risks that take you out

It’s the small routines you don’t think about

Toothbrush, quick rinse, nothing feels wrong

Same habit you’ve had your whole life long

Different place, different rules apply

That’s where a good trip starts to slide

You don’t see it coming

That’s how it gets in

Drink bottled water, play it straight

Skip the ice if you hesitate

Little decisions stack up fast

Stay sharp now, make it last

Glass on the table, cold and clear

Cubes in the drink but you pause right there

Same source running through it all

Clean on the surface doesn’t mean it’s solved

Street-side fruit cut hours ago

Hands you don’t know, places you don’t go

Find the spots where the locals stay

Fast turnover, safer play

Busy rooms, steady flow

That’s the signal you follow

Drink bottled water, keep it clean

Not everything is what it seems

Small calls matter more than luck

Stay aware, don’t leave it up

Before you go, line it up

Clinic visit, don’t rush luck

Some shots take time to work

Last-minute plans don’t really work

Dawn and dusk, cover skin

Mosquitoes don’t need permission

Repellent on, sleeves pulled down

Simple habits keep you sound

Pack enough for where you’ll be

Not where you started, not what’s easy

What you find might not be there

Or twice the cost, or stripped down bare

Headache hits or something worse

Small kit first before it bursts

Solve it early, keep it light

Don’t let it take the whole trip out

High altitude, thinner air

Hits you slow if you’re not aware

Feels like nothing, then it builds

Push too far, and it gets real

Take it slow, give it time

Step by step, let it climb

If it turns, don’t push through

Going down is what you do

Drink bottled water, think ahead

Don’t ignore what your body said

What’s a detail now can stack

One wrong turn can pull you back

Stay sharp, don’t drift, adapt

That’s how you keep the whole trip intact`
      }      ,
      {
        title: 'Emergency Planning and Communication',
        file: 'EXAMPLE SONGS/Roaming free/Course 3/Emergency Planning and Communication.mp3',
        lyrics: `Before you go, before you move

Set it up, keep it with you

Different place, different rules

Different numbers to get through

Don’t assume it’s what you know

Take a minute, check it through

Write it down, keep it close

Hotel name and number too

If you need it, you won’t think

So prepare before you do

Simple steps, easy to forget

Till you need them

Keep it with you, write it down

All the details, keep them now

In your pocket, in your phone

So you’re never on your own

Keep it with you, just in case

Little things can set the pace

When it matters, you’ll be glad

Everything you already had

In your wallet, small card stays

Name and blood type in one place

Any allergies, what you take

Emergency contact just in case

If you can’t speak for yourself

Someone else will need that view

Clear and simple, easy read

So they know what to do

Keep it with you, write it down

All the details, keep them now

In your pocket, in your phone

So you’re never on your own

(Keep it, keep it)

With you

(Keep it, keep it)

Ready

Insurance number saved and set

Write it somewhere else as well

If it turns, don’t wait too long

They’ll coordinate it all

Hospitals, the next steps

Getting home if needed too

Keep receipts and documents

Everything connects through

If you’re travelling not alone

Make a plan before you go

Where to meet and when to wait

How to find your way back home

Say it once, run it through

So it’s easy if it’s real

Not a question in the moment

Just a plan you already feel

If it goes another way

And you need a different kind of help

If you’re stopped or held somewhere

Reach your embassy right there

They can guide you, translate things

Make it fair, make it clear

Not to fix what’s already done

But to help you through the space

Connect you with the right support

Keep you steady in that place

Keep it with you, write it down

All the details, keep them now

In your pocket, in your phone

So you’re never on your own

Keep it with you, stay aware

Little steps take you there

When it matters, you won’t start

You’ll be ready from the start`
      }      ,
      {
        title: 'Mental Health and Wellbeing While Travelling',
        file: 'EXAMPLE SONGS/Roaming free/Course 3/Mental Health and Wellbeing While Travelling.mp3',
        lyrics: `Yeah… it’s normal

Just breathe through it

New place, new face, new everything

Brain on overload, it’s a heavy thing

Different food, different rules, different sound in the air

Yeah it feels like too much but you’re already there

That’s not weakness, that’s just load

Mind adapting to a different road

Slow it down, don’t rush the pace

You don’t need to win this race

Some days move, some days chill

That’s how you let your system heal

Sleep right, eat right, let it land

Slow travel hits better than you planned

You don’t have to take it all in

Let it settle in your skin

Stay grounded, breathe it in

You don’t have to rush to begin

Take your time, let it show

That’s how you really get to know

Stay grounded, hold your space

You’re allowed to slow the pace

Nothing’s lost if you just feel

What’s already real

Homesick call, late night chat

Phone screen glow, you lean back

It don’t mean you made a mistake

It means you’ve got a life back home that you don’t break

Schedule moments, keep it tight

Same time call, same time light

Something stable in the shift

That’s the mental balance lift

Tired brain, judgment slips

Small decisions turn to risks

Less alert, more likely to fold

When your energy gets low

So rest first, then decide

Don’t let fatigue run your night

Better pause than regret what you did

When your system wasn’t fit

Slow mind, fast world

That’s where things get curled

Stay grounded, breathe it in

You don’t have to rush to begin

Take your time, let it show

That’s how you really get to know

Alcohol blurs the edges fast

What feels fine doesn’t always last

New place, new rules, unknown ground

You lose your buffer when it comes around

Trust that feeling in your chest

If it’s off, it’s telling you best

You don’t need proof, you can just leave

You don’t owe anyone belief

Lonely nights can bend your choice

Just to hear another voice

But quick connections, fast and loud

Ain’t the same as safe and sound

Find the spaces, slow and real

Where time is what helps things heal

If you’re not okay, say something

Don’t sit silent, don’t push through nothing

Help exists in most of the places you go

Embassies, clinics—they’ll help you know

Travel solo, make it planned

Check-in system, understand

One message daily, same routine

So someone knows where you’ve been

Miss that check? They react

Not panic, just a safety track

It’s simple, it’s small, it’s light but true

And it’s one of the best things you can do

Stay grounded, breathe it in

You don’t have to rush to begin

Take your time, let it show

That’s how you really get to know

Stay grounded, hold your space

You’re allowed to slow the pace

Nothing’s lost if you just feel

What’s already real`
      }
    ],
    remember: {
      title: 'Remember This Course 3',
      file: 'EXAMPLE SONGS/Roaming free/Course 3/Remember This Course 3.mp3',
      lyrics: `Mmm… yeah

Just check in with yourself

New place, new air, I feel it hit

Everything moves a little quick

It’s okay if I take my time

I don’t have to prove I’m fine

Culture shock, it comes and goes

Like waves I didn’t fully know

So I slow my body down

Find my rhythm, touch the ground

Rest days matter more than I knew

Not every hour needs something new

Let the silence do its part

Let it settle in my heart

I don’t have to rush through this

I can pause and still exist

Check your understanding, breathe it in

You don’t have to force a win

Take it slow, let it show

That you already know

Check your understanding, stay with you

Do what you need to do

Nothing lost when you decide

To take your time

I call home, hear their voice

Reminds me I still have choice

Missing them don’t make me weak

It just means I’ve got roots beneath

Tired mind, I feel it slip

Every step, every trip

So I rest before I move

Not every moment needs to prove

And if I drink, I stay aware

Different place, different air

I know my limit, I don’t pretend

I listen when my senses bend

If I’m drained, I step away

I don’t need to push today

Check your understanding, breathe it in

You don’t have to force a win

Take it slow, let it show

That you already know

Check your understanding, stay with you

Do what you need to do

Nothing lost when you decide

To take your time

If something shifts and feels off-track

I don’t wait, I step back

No explanation, no debate

My safety doesn’t negotiate

Loneliness can pull me close

To anything that feels like home

But I choose the slower way

Real connection takes more days

And if my mind feels like it’s low

I know where I can go

Help exists, I don’t have to hide

There’s support on every side

I check in with myself

That’s the habit that keeps me well

Check your understanding, breathe it in

You don’t have to force a win

Take it slow, let it show

That you already know

Check your understanding, stay with you

Do what you need to do

Nothing lost when you decide

To take your time`
    }
  },

  // ─── Roaming Free: Digital Security (c14) ───
  'c14': {
    lessons: [
      {
        title: 'Protecting Your Devices',
        file: 'EXAMPLE SONGS/Roaming free/Course 4/Protecting Your Devices.mp3',
        lyrics: `Yeah…

Quiet moves, I keep it tight

Open network, café light

Looks safe but I know it’s not

Signals moving through the air

Anybody watching what I’ve got

I don’t check what matters most

Not unless I lock it right

Little step, takes a minute

But it keeps me out of sight

VPN before I move

Simple thing I always choose

What I send stays mine to keep

Not for strangers passing through

I don’t leave it up to chance

I just take control

Stay in control, keep it close

Every move, every code

Little habits, every day

Keep the risks away

Stay in control, don’t forget

What you don’t see can still get

Everything you let it through

So I move like I do

Different passwords, not the same

No repeats across the names

If one slips, the rest stay safe

That’s the way I play the game

Two-step check on what I use

Extra layer, nothing to lose

Even if they get inside

They still can’t get through

Keep it updated, don’t delay

Fix the cracks before they break

Quiet patches, working small

But they cover everything

Backup done before I go

If I lose it, I still know

Nothing gone I can’t replace

Everything’s in place

Stay in control, keep it close

Every move, every code

Little habits, every day

Keep the risks away

Not everything is what it seems

Even numbers can be taken from me

They can take your number slow

Make it theirs without you knowing

Messages that should be yours

Start going where they’re going

So I lock it with a code

Ask for more than just my name

And I don’t rely on texts

When there’s safer ways to play

If it’s gone…

I don’t wait

Phone missing, I move fast

No second thought, no looking back

Lock it down before they try

Cut the access, close it tight

Everything I keep on there

Messages and what I share

One quick move protects it all

Before anything can fall

Stay in control, keep it close

Every move, every code

Little habits, every day

Keep the risks away

Stay in control, don’t forget

What you don’t see can still get

Everything you let it through

So I move like I do`
      }      ,
      {
        title: 'Personal Safety and Recognising Exploitation',
        file: 'EXAMPLE SONGS/Roaming free/Course 4/Personal Safety and Recognising Exploitation.mp3',
        lyrics: `Yeah…

Just know where you stand

Your space, your call, your right to choose

No one decides what you do

No pressure should move your line

No one gets to cross that line

It’s not loud, it’s in the signs

Small things stacking over time

Push you further than you said

Try to get inside your head

More drinks when you said you’re done

Pull you away from everyone

Turn a “no” into a game

Then act different when you don’t play

If it feels off, it probably is

You don’t need more than that

Know your line, hold it there

You don’t owe them anything, anywhere

Step away, don’t explain

You don’t need a reason to change

Know your line, keep it clear

Real respect doesn’t interfere

If it shifts, if it’s wrong

You can leave and move on

If it happens, hear this straight

It’s not on you, don’t carry weight

Not what you wore, not what you drank

Not one choice you think you made

Get support, don’t stay still

There are people who will help you deal

Report it, get the care

You don’t have to hold it there

Even far from where you’re from

There’s a way to reach someone

Embassy lines, systems in place

You’re not alone in any place

Know your line, hold it there

You don’t owe them anything, anywhere

Step away, don’t explain

You don’t need a reason to change

Not every risk looks like danger

Sometimes it feels like a favor

Big promises, fast connection

Too much trust, no real direction

Job sounds good but nothing’s clear

That’s the moment you stay aware

Moving quick, no time to think

That’s how people pull you in

Ask for papers, pull you away

From everyone you trust day to day

That’s a pattern, not by chance

That’s your signal not to advance

Stay connected… don’t disappear

Check in with the ones back home

Don’t let distance leave you alone

Isolation makes it easy

For the wrong hands to reach you

Know the rules where you arrive

What’s allowed, what crosses lines

Things that pass where you’ve been

Might come down hard somewhere new

Know your line, hold it there

You don’t owe them anything, anywhere

Step away, don’t explain

You don’t need a reason to change

Know your line, stay aware

Move with care when you’re out there

What you know will keep you strong

Keep you steady, keep you on`
      }      ,
      {
        title: 'Social Media and Location Safety',
        file: 'EXAMPLE SONGS/Roaming free/Course 4/Social Media and Location Safety.mp3',
        lyrics: `Yeah…

You don’t have to show it all

I don’t post it when I’m there

That’s a rule, I keep it clear

Moments wait, I share them late

Not in real time, not my place

Pin drop tells ‘em where you stand

More than you might ever plan

Where you are and what you do

That’s information moving through

People watch without a sound

Patterns build from what you found

Better hold it, keep it back

Post it later, change the track

Not everything needs to be seen

While you’re in between

Move quiet, take your time

You don’t need to go live

Let it breathe, let it pass

You can share it after that

Move quiet, keep control

Not everybody needs to know

Where you are, where you stay

Keep a little space

Small details, they add up fast

Hotel signs in the back of shots

Window views, the street below

That’s enough for someone to know

Same café, same routine

Same way home that you’ve been seen

Feels harmless but it’s not

That’s a map of every spot

So I trim what I reveal

Keep it general, keep it sealed

Not about being afraid

Just not giving it away

Move quiet, take your time

You don’t need to go live

Let it breathe, let it pass

You can share it after that

Turn it off before you go

Little tags they let it show

Photos hold more than they seem

Hidden data in between

Location stamped inside the file

Exact place down to the mile

So I switch it off ahead

No auto-tags on what I send

Platforms try to add it in

I don’t let that setting win

Not every room is private

Common spaces, voices low

Still don’t say too much though

Plans, money, where you sleep

That’s the kind of talk I keep

Most are fine, yeah that’s true

But it only takes a few

Different ears, different aim

I don’t play that kind of game

Check my settings, lock it down

Not everything’s for the crowd

Who can see and who can’t

That’s a choice, not left to chance

And I don’t say when I’m gone

Not before I’m moving on

Empty house, open sign

I don’t put that online

Move quiet, take your time

You don’t need to go live

Let it breathe, let it pass

You can share it after that

Move quiet, keep control

Not everybody needs to know

Where you are, where you stay

Keep a little space`
      }
    ],
    remember: {
      title: 'Remember This Course 4',
      file: 'EXAMPLE SONGS/Roaming free/Course 4/Remember This Course 4.mp3',
      lyrics: `Yeah…

Not in real time

I don’t post where I am

Not while I’m still there

That can wait

That always waits

After I leave

Then it goes up

Not before

Not live

After you leave

That’s when you share

Not in the moment

Not from there

After you leave

Keep it delayed

Nothing important

Needs real-time space

No hotel names

No room views

No routines

No usual routes

Same places

Same times

That’s a pattern

I don’t outline

What looks small

Builds a map

I don’t give

That kind of access

After you leave

That’s when you share

Not in the moment

Not from there

Turn it off

Before you post

Location tags

Disabled first

Hidden data

Still can work

Photos carry

More than seen

Exact points

In between

So I check

Before I send

Nothing extra

Slips in

Not every space is private

Shared rooms

Shared air

Conversations

Travel there

Plans and details

Stay with me

Not for anyone

Listening

Most are fine

Some are not

That’s enough

To stay locked

Settings checked

Before I go

Who can see

What I show

Keep it closed

Keep it tight

Not everything

Needs that light

No “away”

No long post

Empty home

I don’t expose

After you leave

That’s when you share

Not in the moment

Not from there

After you leave

Keep it delayed

Quiet decisions

Keep you safe`
    }
  },

  // ─── Roaming Free: High-Risk Situations (c15) ───
  'c15': {
    lessons: [
      {
        title: 'Natural Disasters and Large Crowds',
        file: 'EXAMPLE SONGS/Roaming free/Course 5/Natural Disasters and Large Crowds.mp3',
        lyrics: `(Oh-oh)

Before you go…

(Yeah)

Check the map, understand

What the land might have planned

Storm or fault line below

Better know before you go

Waves can rise, ground can shake

Some things you don’t wanna learn late

If you know, you can move

You’ll know what to do

It takes a minute

That’s all it takes

Small steps now

Big mistakes—avoid

Know before you go

Feel it, take it slow

Look around, take control

Anywhere you go

Know before you go

Now you already know

Stay aware, stay ready

Keep it steady

(Know—know—know)

Before you go

(Know—know—know)

You already know

Check the exits when you arrive

Left and right, front and side

From your room to the door

Know your way out for sure

Takes five minutes, maybe less

Feels like nothing—still the best

If it turns, if it shifts

You don’t guess

You don’t wait

You don’t stall

When it’s time

You just go

Know before you go

Feel it, take it slow

Look around, take control

Anywhere you go

Go—go—go

Don’t wait, just go

Go—go—go

You already know

If they say “leave,” don’t delay

Don’t pack slow, don’t replay

They know more than you can see

Move fast, move free

Orders come for a reason

Timing matters in that season

Don’t second guess the call

Just go, that’s all

In a crowd… stay aware

Feel the shift, feel the change

If it starts to feel strange

Pressure builds, people move

That’s your signal to improve

To the edges, don’t push back

Find your space, find your track

Stay with who you came with

Have a place to meet if you split

Know before you go

Feel it, take it slow

Look around, take control

Anywhere you go

Know before you go

Now you already know

Stay aware, stay ready

Keep it steady

(You already know…)

Before you go`
      }      ,
      {
        title: 'Civil Unrest and Political Instability',
        file: 'EXAMPLE SONGS/Roaming free/Course 5/Civil Unrest and Political Instability.mp3',
        lyrics: `Mm…

Just check before you go

Look it up before you book

Then again before you move

Things can change without a sound

What was fine might not be now

Take a moment, read it through

It’s a simple thing to do

Better knowing where you stand

Before you land

It’s quiet information

But it matters in the end

Stay ahead, take your time

Check the signs before you fly

Nothing heavy, nothing rushed

Just a little more aware

Stay ahead, keep it clear

Know what’s shifting while you’re there

Small decisions, steady pace

Keep you in a better place

If you walk into a crowd

And it feels a little loud

People gathering, voices raised

That’s your cue to step away

Even calm can turn too fast

Situations don’t always last

Better leave before it turns

Than wait and learn

No photos where you shouldn’t be

Keep it simple, let it be

Some things aren’t for you to frame

Don’t involve your name

Stay ahead, take your time

Check the signs before you fly

Nothing heavy, nothing rushed

Just a little more aware

Let them know… where you are

Register before you go

Takes a minute, that’s all

So if something changes fast

They can reach you where you are

They can’t help if they don’t know

That you’re there at all

So you leave a simple trace

Just in case

Be ready… if you need to move

Keep your documents nearby

And enough to get away

If the route you planned is gone

You’ve already thought ahead

Know the border you would take

If you had to change your way

Not in panic, not in haste

Just prepared

Stay ahead, take your time

Check the signs before you fly

Nothing heavy, nothing rushed

Just a little more aware

Stay ahead, keep it clear

Know what’s shifting while you’re there

Small decisions, steady pace

Keep you in a better place`
      }      ,
      {
        title: 'Transport Risks and Border Crossings',
        file: 'EXAMPLE SONGS/Roaming free/Course 5/Transport Risks and Border Crossings.mp3',
        lyrics: `Mm…

Take the safer way

Different roads, different pace

Not the same as what you’re used to

Lines are faint, lights are low

You don’t always know

So you check before you go

Who you ride with matters most

Names you trust, things you’ve seen

Not just what’s convenient

It’s not pressure

You can wait

Take the safer way

Even if it takes more time

Not every ride is worth the risk

You can leave it behind

Take the safer way

Let it pass, let it go

There’s another option coming

You don’t need this one

Night rides, lights down low

People moving, in and out

While you’re tired, things can shift

That’s when things go missing

Keep what matters close to you

Not above or out of view

Bag in hand or on your side

Not somewhere you can’t find

Stops along the way at night

Stay aware, don’t drift too far

Even rest needs some control

When you’re not at home

Take the safer way

Even if it takes more time

Not every ride is worth the risk

You can leave it behind

Let someone know… where you go

Send the route, the time, the place

Simple message, just in case

If you don’t arrive on time

Someone sees the line

It’s not fear, it’s just clear

Small details that keep you here

Quiet habits, easy to do

They look out for you

Stay calm… when it matters

At the border, keep it clean

Documents ready, answers clear

No extra words, no sudden moves

Just let it move

Nothing carried that’s not yours

No exceptions, none at all

What you hold is what you own

That’s the rule

Offers come, easy money

Light bag, someone friendly

That’s the moment you step back

Not a path you take

What you carry, you accept

No explaining after that

So the answer stays the same

Always no

Checkpoints slow the moment down

Keep it calm, don’t show too much

If it feels like you should pay

Stay composed, don’t escalate

If you have to, keep it small

Deal with it, then report it all

Not ideal, but understood

Handle it as you should

If you’re held, don’t react

No sudden moves, just hold it back

Ask to call, keep it brief

Let your embassy speak

First few moments set the tone

So you stay controlled, not thrown

Calm and clear will carry through

Better for you

If you drive, then check it first

Every mark and every scratch

Photos taken, nothing missed

So it’s not on you

Know the rules before you start

What’s allowed and what is not

And for bikes, don’t take the risk

Without the basics

Take the safer way

Even if it takes more time

Not every ride is worth the risk

You can leave it behind

Take the safer way

Trust the feeling, trust the sign

If it doesn’t feel quite right

You don’t have to try

Mm…

Take the safer way`
      }
    ],
    remember: {
      title: 'Remember This Course 5',
      file: 'EXAMPLE SONGS/Roaming free/Course 5/Remember This Course 5.mp3',
      lyrics: `Mm…

Keep it close

Check the name, check the source

Who you ride with matters more

Not just easy, not just fast

Make the right choice first

Known operators, proven lines

Not a guess, not improvised

If it’s unclear, let it pass

You don’t have to ask twice

Keep it close

What matters most

On you, not out of sight

Keep it close

Stay composed

Every move, every time

Overnight, lights go low

People move, you don’t know

What you leave out of reach

Isn’t yours to keep

Bag above or left behind

Out of view, out of mind

So I keep it where I stay

Close, always

Keep it close

What matters most

On you, not out of sight

Let someone know… before you go

Send the route, send the time

Simple line, that’s enough

If I’m late, someone sees

Where to look for me

Not dramatic, just aware

Quiet habit, simple care

Nothing more than what it is

Just practical

Stay calm… keep it clear

At the border, no delay

Have it ready, what they need

Keep it simple, answer straight

Let it move

Nothing carried for someone else

No exceptions, not at all

What’s not mine doesn’t cross

That’s the rule

Stories come, easy pay

Light bag, just today

That’s the moment you decline

Every time

No discussion, no debate

That decision doesn’t change

What you carry stays with you

Only you

If you’re held, stay controlled

No reaction, keep it low

Cooperate, say what’s needed

Nothing more

Ask to call, make it clear

Reach your embassy from there

Let them handle what comes next

That’s the step

Keep it close

What matters most

On you, not out of sight

Keep it close

Stay composed

Trust the call every time

Mm…

Keep it close`
    }
  },

,

  // ============================================================
  // FAMILY ANCHOR - Course IDs: c21, c22, c23, c24, c25
  // ============================================================

  // ─── Family Anchor: Bullying (c21) ───
  'c21': {
    lessons: [
      {
        title: 'Understanding Bullying and Recognising the Signs',
        file: 'EXAMPLE SONGS/Family Anchor/Course 1/Understanding Bullying and Recognising the Signs.mp3',
        lyrics: `Mm…

Sometimes they don’t say it



It’s not just a moment, not just a day

Not something that simply fades away

When it’s repeated, when it’s planned

When one holds more than the other can



It’s not every fall-out, not every fight

But patterns that settle over time

And if it’s there, it won’t resolve

Without someone getting involved



They won’t always tell you

Not in words

So look a little closer

At what’s changed, not what’s said

There’s a story in the silence

In the spaces left instead



Trust the feeling

If something’s not right

You don’t need proof

To take a closer look



They stop wanting places they used to enjoy

Mornings get harder, small aches deploy

Headaches that fade when the weekend comes

But return again when the week has begun



Things go missing, things come back worn

No clear reason, just brushed off, withdrawn

And slowly you notice they pull away

From the friends and the games they used to play



Less connection

More retreat



So look a little closer

At what’s changed, not what’s said

There’s a story in the silence

In the spaces left instead



Trust the feeling

If something’s not right

You don’t need proof

To take a closer look



It doesn’t come all at once

It builds in quiet ways

A shift in who they are

Across a run of days



Focus slips where it held before

Marks fall back, they’re unsure

Something’s there beneath the surface line

Not always easy to define



None of this stands alone

But together it starts to show

Something asking to be seen

Something sitting in between



You’ll feel it… before you hear it



So look a little closer

At what’s changed, not what’s said

There’s a story in the silence

In the spaces left instead



Trust the feeling

You know the signs

When something shifts

It’s worth your time



Mm…

Sometimes they don’t say it

But they show you`
      },
      {
        title: 'Talking to Your Child and Working with Schools',
        file: 'EXAMPLE SONGS/Family Anchor/Course 1/Talking to Your Child and Working with Schools.mp3',
        lyrics: `Mm…

Before anything else



Before the steps, before the plan

Before you take it into hand

There’s something they need first of all

To feel safe enough to talk



Not their fault, not in their hands

You are standing with them now

That foundation has to hold

Before the story’s told



Not in the rush

Not in the heat of it

Find the quiet space

Let it sit



They need to know you’re on their side

No judgement in your eyes

Just patience in the way you stay

Until they find the words to say



They need to know you’re on their side

That they don’t have to hide

That whatever comes to light

You’re on their side



Choose a moment that is still

Not the car, not the school run

Not right after something breaks

When emotions overrun



Somewhere calm, somewhere safe

Where they don’t feel on display

Open gently, let it land

“I'm here when you can talk”



Then you wait without a push

Let the silence do its work

Let them come at their own pace

In their own time, in their own way



No pressure

Just presence

That’s enough



They need to know you’re on their side

No judgement in your eyes

Just patience in the way you stay

Until they find the words to say



They need to know you’re on their side

That they don’t have to hide

That whatever comes to light

You’re on their side



Ask them open, simple ways

“What happened?” let it stay

“How did that make you feel inside?”

No rush to justify



And when they speak, reflect it back

Not solutions straight away

“That sounds really hard for you”

“I’m glad you told me today”



Don’t turn it into fault or blame

Don’t suggest they should have changed

That can wait for another time

This moment is theirs to define



Name it clearly when you do

Take it outside of them too



What they’ve done, it has a name

Bullying is not okay

And you don’t have to face it alone

I’m going to help you now



Then you move into the next

With intention, calm, and care

Not reactive, not unsure

But prepared



Go through school, make it formal

Details clear and written down

What has happened, when, and how

What support is needed now



Safeguarding lead, senior staff

Ask them what they’ve seen so far

What they’ll do, what comes next

How they’ll keep you informed



A record lives in what is sent

Not just spoken in a room

So it holds the weight it needs

To be acted on and moved



A good response takes it in

Doesn’t let it drift again



If it’s brushed aside too light

Don’t accept that as the end

Document, escalate, repeat

Until it’s met properly



Headteacher, governors next

Keep the focus on the child

Because their safety is the line

That cannot be denied



They need to know you’re on their side

No judgement in your eyes

Just patience in the way you stay

Until they find the words to say



They need to know you’re on their side

That they don’t have to hide

That whatever comes to light

You’re on their side



Mm…

On their side`
      },
      {
        title: 'Cyberbullying Recovery and When Your Child Is the One Bullying',
        file: 'EXAMPLE SONGS/Family Anchor/Course 1/Cyberbullying Recovery and When Your Child Is the One Bullying.mp3',
        lyrics: `Mm…

It doesn’t stay at school



It follows home, it doesn’t end

It moves through screens, it can extend

Any hour, any day

No distance keeps it away

Messages that cut and land

Groups that close on command

Names repeated, turned to noise

Or taken from them, voice by voice

It spreads fast, it leaves a trace

It doesn’t fade like a face



And what you don’t always see

Is how deep it can be



So hold them close through what they face

Let them know it’s not their place

Not their fault, not who they are

Just something happening too far

Hold them close, stay with them through

There’s nothing they did to deserve what’s true

It’s what was done, not what they are

You guide them through it, from where you are



First step is simple, but it matters

Save it all before it shatters

Screenshots kept, nothing lost

Before it disappears or’s crossed

Then you block, then you report

Every platform has its port

If it’s threats or something worse

You bring in help, you don’t rehearse

Police or school, you don’t delay

You build the record, you make it stay



Because silence makes it blur

And clarity is what you prefer



So hold them close through what they face

Let them know it’s not their place

Not their fault, not who they are

Just something happening too far

Hold them close, stay with them through

There’s nothing they did to deserve what’s true

It’s what was done, not what they are

You guide them through it, from where you are



No shame in how they feel inside

No need for anything to hide

The weight belongs where it began

Not in the child, but in the hand

And healing rarely moves in line

Some days fall back, some feel fine

But you keep separating

Their worth from what they’re facing



And if it’s heavy on you too

You’re allowed support as well

To stay steady for them

You don’t have to do it all alone



If it was them causing harm

Don’t rush straight to alarm

Start with why, not just the act

Look for what is coming back

What they’ve seen, what they’ve known

What’s been happening at home

Clear expectations, firm but fair

With follow-through and care

And if it stays the same again

You don’t ignore what that then means

You look deeper, not away

To what’s driving how they play



So hold them close through what they face

Let them know it’s not their place

Not their fault, not who they are

Just something happening too far

Hold them close, stay with them through

There’s nothing they did to deserve what’s true

It’s what was done, not what they are

You guide them through it, from where you are



Mm…

It follows home… but so do you`
      }
    ],
    remember: {
      title: 'Remember This - Bullying',
      file: 'EXAMPLE SONGS/Family Anchor/Course 1/Remember This Course 1.mp3',
      lyrics: `Listen…

It’s not always spoken

But it is always shown



Not their fault… not their fault…

You stand with them… you stand with them…

Bullying isn’t one moment in time

It’s repetition, a pattern, a line

Not every clash in a schoolyard day

But harm that keeps coming the same old way



And children don’t always say it out loud

They carry it quietly, lost in a crowd

So watch what changes, not what’s explained

The signs are often not in their name



Look for the change… look for the change…

Not just the words… not just the phrase…



When something feels different, don’t let it pass

That feeling you get is the signal you have



They are not alone! (not alone!)

You are on their side! (on their side!)

It is not their fault! (not their fault!)

You will stand with them through the night!



They are not alone! (not alone!)

You will hear their voice! (hear their voice!)

You don’t need proof to begin

You create the space they can step in



School refusal, headaches, low mood signs

Torn backpack, missing lines

Withdrawal from friends they used to know

These are signals, not a passing show



So you don’t demand, you don’t press hard

You open the door, you lower your guard

“I’ve noticed changes, I’m here when you talk”

Then you wait, let trust unlock



Wait for trust… wait for trust…

Let it come… let it come…



Because silence is not the same as no pain

It just means they’re unsure how to explain



They are not alone! (not alone!)

You are on their side! (on their side!)

It is not their fault! (not their fault!)

You will stand with them through the night!



They are not alone! (not alone!)

You will listen first! (listen first!)

No blame, no rush, no fear

Just safety made clear



Go to the school… with details written down

Not just feelings… facts that are found

Safeguarding lead… formal meeting set

What’s been happening… what’s not solved yet



Write it down… write it down…

Make it clear… make it count…



Cyberbullying leaves a trace in the air

So you capture it before it disappears there

Screenshots first, before it is gone

Then report it where it belongs



And recovery doesn’t move in a line

Some days harder, some days fine

You separate worth from what was done

They are still your child, still your one



Still your child… still your child…

Still enough… still enough…



They are not alone! (not alone!)

You are on their side! (on their side!)

It is not their fault! (not their fault!)

You will stand with them through the night!



They are not alone! (not alone!)

You will act with calm! (act with calm!)

You don’t wait for perfect proof

You build the space they move through



Not their fault…

You stand with them…

Always…`
    }
  },

  // ─── Family Anchor: Grooming (c22) ───
  'c22': {
    lessons: [
      {
        title: 'Understanding Grooming and Warning Signs',
        file: 'EXAMPLE SONGS/Family Anchor/Course 2/Understanding Grooming and Warning Signs.mp3',
        lyrics: `Listen…

This is not a moment…

This is a pattern

[Clap… clap… clap…]

[Backing voices, low chant]

A pattern… a pattern…



Grooming is not an accident in time

It is deliberate, step by step design

Not a lapse, not a break in care

It’s someone building access there

They find the child who feels alone

Where something’s missing, something’s unknown

Then meet the need they think they see

With patience dressed as safety



Step by step… line by line…

Building trust… over time…



Attention first, consistent and kind

The child relaxes, lowers their mind

Then small things shift, just out of place

A boundary blurred, a closeness trace

Nothing loud, nothing wrong on view

Just subtle moves no one knew

And silence grows where questions should be

Because it feels like care, not threat, not need



“THIS IS JUST BETWEEN US”

“THEY WOULDN’T UNDERSTAND”

“DON’T TELL ANYONE”

[pause]



That is the shift… that is the line

Where trust is used to cross the line

See the pattern! (see the pattern!)

Not the moment! (not the moment!)

Step by step they build control

Until it reaches the soul

See the pattern! (see the pattern!)

Not the face you see! (not the face!)

It begins with something kind

And turns unseen over time



It can be coach, or friend of home

Or someone trusted, fully known

Online too, the same approach

The same slow method they employ

One-to-one, away from view

Extra interest just in you

Gifts that feel like nothing wrong

Until the pattern grows too long



One-to-one… out of sight…

Feels like care… feels like light…



Watch the adult who pulls them near

Who finds excuses to appear

Physical touch that lingers more

Private messages behind a door

Or claims they’re “the only one”

Your child can talk to when things come undone

That separation is the sign

Of something crossing a line



See the pattern! (see the pattern!)

Not the moment! (not the moment!)

It is built, not born in a day

It is trained to pull them away

See the pattern! (see the pattern!)

Trust what you see! (trust what you see!)

When something feels even slightly wrong

It belongs in action, not prolonged



Reasonable concern…

Is enough…

To act…



It is not only adults too

Children can do this as well

Peer to peer, the same control

The same harm that stories tell

Older children, younger ones

Same patterns, different form

So do not minimise the truth

Of what is forming in the room



Take it seriously… take it seriously…



See the pattern! (see the pattern!)

Act on concern! (act on concern!)

You do not need certainty

To step in firmly

See the pattern! (see the pattern!)

Do not delay! (do not delay!)

When something feels wrong in your care

You intervene there



Pattern…

Not a moment…

A pattern…`
      },
      {
        title: 'Teaching Body Safety and Online Protection',
        file: 'EXAMPLE SONGS/Family Anchor/Course 2/Teaching Body Safety and Online Protection.mp3',
        lyrics: `Speak it early…

Speak it clearly…



Use the correct words

For every part of the body

Not to shock

Not to overstep

But to make language available

If it is ever needed



Because children need words

That match the world

That professionals will use

If they ever have to speak



Teach that their body belongs to them

That consent is a right, not a suggestion

That no adult should cross that boundary

Without clear, necessary reason

And presence they are aware of



And that refusal is allowed

Even with family

Even with familiarity

Even when it feels uncomfortable to say



Private is not the same as secret

A private matter belongs to them

A secret is when an adult asks them

To hide something from you

That makes them uneasy



And if that ever happens

They must understand this clearly

They will not be in trouble

For telling you



Repeat this often

Not as instruction

But as certainty



If any adult asks you

To keep something about your body

Or about them

Between you only

You tell me immediately



You will never be in trouble

For telling me



Online spaces require the same clarity

No school name

No address

No phone number

No location

No routine



People online may not be who they say they are

Even if they sound young

Even if they seem familiar



If something feels wrong

You do not manage it alone

You stop

You block

You tell a trusted adult



Sextortion is a pattern of manipulation

Not a misunderstanding

It begins with trust

It escalates with pressure



Images are requested

Then used as leverage

Then fear replaces choice



If it happens

Stop communication immediately

Tell a trusted adult

Report to the platform

Report to police



Do not pay

Do not comply



Know who they speak to online

Without turning it into surveillance

Ask about their day

Ask about their world



Make it normal

To talk about what they see

So silence does not become the only option



Speak it early…

Speak it clearly…

So it is already known

Before it is needed…`
      },
      {
        title: 'Responding to Concerns and Supporting After Disclosure',
        file: 'EXAMPLE SONGS/Family Anchor/Course 2/Responding to Concerns and Supporting After Disclosure.mp3',
        lyrics: `Speak it early…

Speak it clearly…



Use the correct words

For every part of the body

Not to shock

Not to overstep

But to make language available

If it is ever needed



Because children need words

That match the world

That professionals will use

If they ever have to speak





Teach that their body belongs to them

That consent is a right, not a suggestion

That no adult should cross that boundary

Without clear, necessary reason

And presence they are aware of



And that refusal is allowed

Even with family

Even with familiarity

Even when it feels uncomfortable to say



Private is not the same as secret

A private matter belongs to them

A secret is when an adult asks them

To hide something from you

That makes them uneasy



And if that ever happens

They must understand this clearly

They will not be in trouble

For telling you





Repeat this often

Not as instruction

But as certainty



If any adult asks you

To keep something about your body

Or about them

Between you only

You tell me immediately



You will never be in trouble

For telling me



Online spaces require the same clarity

No school name

No address

No phone number

No location

No routine



People online may not be who they say they are

Even if they sound young

Even if they seem familiar



If something feels wrong

You do not manage it alone

You stop

You block

You tell a trusted adult





Sextortion is a pattern of manipulation

Not a misunderstanding

It begins with trust

It escalates with pressure



Images are requested

Then used as leverage

Then fear replaces choice



If it happens

Stop communication immediately

Tell a trusted adult

Report to the platform

Report to police



Do not pay

Do not comply



Know who they speak to online

Without turning it into surveillance

Ask about their day

Ask about their world



Make it normal

To talk about what they see

So silence does not become the only option



Speak it early…

Speak it clearly…

So it is already known

Before it is needed…`
      }
    ],
    remember: {
      title: 'Remember This - Grooming',
      file: 'EXAMPLE SONGS/Family Anchor/Course 2/Remember This Course 2.mp3',
      lyrics: `Grooming is not a moment…

It is a process



It is deliberate

Staged over time

Built on trust

And carefully lowered boundaries

Not opportunity

Not chance

Not accident

It begins with attention

That feels consistent

That feels kind

That feels personal



Warning signs appear in patterns

Not single events

One-to-one contact

Away from others

Secret gifts

Private messages

Personal comments

That feel out of place

And a child who begins

To feel anxious

Around a specific person

Without clear explanation



Teach body autonomy early

Teach correct language

So children can describe reality

If they ever need to

Teach privacy of the body

And the difference

Between privacy and secrecy

A secret from an adult

That creates discomfort

Is not a safe secret



Online spaces require the same clarity

Block

And tell a trusted adult

Immediately

Do not manage it alone

Do not wait

Do not test the situation



If grooming is suspected

You do not wait for certainty

You act on reasonable concern

Restrict access

And involve professionals

Immediately

You do not contact the person

You do not investigate alone

You protect first



After disclosure

Listen once

Without repetition

Without pressure

“I believe you”

“This is not your fault”

“I am going to help you”

Then you move it forward

To the correct systems



A child receives a secret gift

From a trusted coach

Who says not to tell parents

Because they would not understand

The child is anxious

But denies wrongdoing



This is a pattern

Not proof

But warning

Secret gifts

Secrecy from parents

Emotional discomfort

You do not wait

You do not confront directly

You restrict contact

And involve safeguarding professionals



Do not escalate privately

Do not give warning

Let trained professionals assess

Your role is protection

Not investigation



You act on patterns

Not certainty

You respond early

Not late

Because early action

Is protection



See the pattern…

Act on the pattern…

Protect early…`
    }
  },

  // ─── Family Anchor: Online Safety for Parents (c23) ───
  'c23': {
    lessons: [
      {
        title: 'Understanding Online Risks',
        file: 'EXAMPLE SONGS/Family Anchor/Course 3/Understanding Online Risks.mp3',
        lyrics: `Grooming is not a moment…

It is a process



It is deliberate

Staged over time

Built on trust

And carefully lowered boundaries

Not opportunity

Not chance

Not accident

It begins with attention

That feels consistent

That feels kind

That feels personal



Warning signs appear in patterns

Not single events

One-to-one contact

Away from others

Secret gifts

Private messages

Personal comments

That feel out of place

And a child who begins

To feel anxious

Around a specific person

Without clear explanation



Teach body autonomy early

Teach correct language

So children can describe reality

If they ever need to

Teach privacy of the body

And the difference

Between privacy and secrecy

A secret from an adult

That creates discomfort

Is not a safe secret



Online spaces require the same clarity

Block

And tell a trusted adult

Immediately

Do not manage it alone

Do not wait

Do not test the situation



If grooming is suspected

You do not wait for certainty

You act on reasonable concern

Restrict access

And involve professionals

Immediately

You do not contact the person

You do not investigate alone

You protect first





After disclosure

Listen once

Without repetition

Without pressure

“I believe you”

“This is not your fault”

“I am going to help you”

Then you move it forward

To the correct systems



A child receives a secret gift

From a trusted coach

Who says not to tell parents

Because they would not understand

The child is anxious

But denies wrongdoing



This is a pattern

Not proof

But warning

Secret gifts

Secrecy from parents

Emotional discomfort

You do not wait

You do not confront directly

You restrict contact

And involve safeguarding professionals



Do not escalate privately

Do not give warning

Let trained professionals assess

Your role is protection

Not investigation



You act on patterns

Not certainty

You respond early

Not late

Because early action

Is protection



See the pattern…

Act on the pattern…

Protect early…`
      },
      {
        title: 'Practical Online Safety at Home',
        file: 'EXAMPLE SONGS/Family Anchor/Course 3/Practical Online Safety at Home.mp3',
        lyrics: `Open conversation is your strongest tool.

Not rules on their own.

Not restriction on its own.

But understanding.



Rules without explanation get worked around.

Or ignored.

Or hidden.



So explain why they exist.

So your child understands the reason behind them.



The aim is not control.

The aim is trust.



A child should feel that if something goes wrong online,

they can come to you

and not be punished for it.



Agree boundaries that fit their age.

Younger children need closer oversight.

Older teenagers need more autonomy

with clear expectations in place.



No devices overnight in bedrooms

is a widely supported boundary for younger children.

And it is worth holding.



Know which platforms they are using.

Know how they work.



Teach privacy settings explicitly.

Do not assume understanding.



Set accounts together.

Check settings together.

Highest privacy where possible.



Some information is never shared online.

Not with strangers.

Not with people they “know” only online.



Their school.

Their location.

Their home address.

Their daily routine.





Online friends are not the same as real friends.

Even after long conversations.

Even after video calls.



If something online causes discomfort,

the response is simple and immediate.



Block.

And tell a trusted adult.



Not wait.

Not manage it alone.

Not see how it develops.



Block.

And tell.



Watch behaviour, not just words.



Changes in device use.

Withdrawal after being online.

Sudden secrecy.

Reluctance to show what they are viewing.

Emotional changes connected to screen time.



These are signals.

Not proof.

But they matter.



Open conversation keeps things visible.

Understanding keeps things safe.

And trust makes disclosure possible

before harm grows further.`
      },
      {
        title: 'Responding When Something Goes Wrong Online',
        file: 'EXAMPLE SONGS/Family Anchor/Course 3/Responding When Something Goes Wrong Online.mp3',
        lyrics: `The first thirty seconds matter.

More than anything that follows.



Your reaction becomes the signal your child reads.

Not just your words.

Your tone.

Your face.

Your control.



Do not react with anger toward your child.

Even if the anger belongs elsewhere.

They will not separate it.



They will only feel the consequence

of having spoken.



And that must not happen.



“I’m so glad you told me.”

“You are not in trouble.”

“We are going to deal with this together.”



Then you move into action.

Calmly.

Methodically.



Screenshot everything before anything is deleted or reported away.

Preserve the record.



Report through the platform systems.

Use their reporting tools.



If there are threats, illegal material, or intimate images,

contact the police.



Image-based abuse is a crime.

Regardless of consent.

Regardless of how it began.

Your child is the victim.



If school connections are involved,

inform the school.



They have safeguarding responsibilities

for online behaviour affecting students.



If grooming is suspected,

do not contact the person yourself.

Do not engage.

Do not warn them.



Contact the police.

Let professionals take control.



Afterwards, watch for changes.



Withdrawal.

Sleep disruption.

Anxiety.

Avoidance of school.

Avoidance of devices entirely.



These are not overreactions.

They are responses.



And they indicate your child

may need further support.



Your first response sets the path.

Not just for the moment.

But for whether your child speaks to you again.`
      }
    ],
    remember: {
      title: 'Remember This - Online Safety for Parents',
      file: 'EXAMPLE SONGS/Family Anchor/Course 3/Remember This Course 3.mp3',
      lyrics: `Online grooming is not random.

It follows a pattern.





It begins with attention.

Then trust.

Then consistency.

Then gradual isolation.



An adult who “understands” your child

in ways you do not

is not reassurance.

It is a warning sign.



Algorithms do not protect children.

They maximise engagement.



One interest

can quickly become a stream

of increasingly harmful content

without intent or awareness.



Open conversation is more effective than strict rules.

Explain the reason behind boundaries.

Make it safe to speak

when something goes wrong.



Teach clearly:

Online friends are not the same as real friends.

Never share school name.

Never share address.

Never share location.

Never share daily routine.



If something goes wrong online,

your first response matters.



Stay calm.

Reassure.

Protect the relationship

so they will tell you again.



Screenshot everything

before reporting or deleting anything.

Preserve evidence first.



Then report to the platform.

Then escalate if necessary.



Scenario:



A fourteen-year-old is receiving messages

from someone claiming to be their age.

They say

“I understand you better than anyone.”

They are asking for photos.

Your child has not replied yet.



Correct action:



Have the child block the account.

Screenshot all messages.

Report to the platform.

Contact police if concern continues.



Do not message the person directly.

This can alert them

and change their behaviour.



This is not about suspicion.

It is about pattern recognition.

Early action prevents escalation.

And calm response keeps communication open.`
    }
  },

  // ─── Family Anchor: Drug Awareness (c24) ───
  'c24': {
    lessons: [
      {
        title: 'Understanding Use and Recognising the Signs',
        file: 'EXAMPLE SONGS/Family Anchor/Course 4/Understanding Use and Recognising the Signs.mp3',
        lyrics: `Young people do not use substances

because they are “bad”

or because they are failing.



They use for reasons that make sense to them at the time.

Curiosity.

Social pressure.

Belonging.

Or to reduce emotional pain.

Understanding motivation

changes how you respond.



Family history matters.

If addiction runs in the family,

risk is higher

and should be acknowledged appropriately.



Mental health is often part of the picture.

Anxiety.

Depression.

Trauma.

In many cases, substance use

is an attempt at coping,

not the core issue itself.



What matters most is pattern, not isolated signs.

One behaviour alone is not enough.

But combinations are meaningful.



Secretiveness around phone use

combined with mood change.

Loss of interest in things previously valued.

Withdrawal from friends or activities.

Changes in sleep.

Either significantly more or less.



Physical indicators may include

smell of alcohol or smoke,

bloodshot or dilated eyes,

changes in weight,

or sudden decline in hygiene.



School attendance may drop.

Grades may fall.

Social groups may change

toward older peers

or unfamiliar routines.

Money may go missing.

Or spending may be unexplained.



None of these alone is a conclusion.

Together, they form a signal

that needs attention.



Not punishment.

Not assumption.

A conversation.



The goal is early understanding.

Before patterns become entrenched.

Before harm becomes harder to see.`
      },
      {
        title: 'Having Honest Conversations and Knowing Specific Substances',
        file: 'EXAMPLE SONGS/Family Anchor/Course 4/Having Honest Conversations and Knowing Specific Substances.mp3',
        lyrics: `The most effective protection

happens before exposure.



Children who are spoken to early

and consistently

are more likely to delay use

and more likely to seek help

when they need it.



These conversations are not one moment.

They are ongoing.



Some substances are for adults.

Some are misused by adults.

Alcohol affects the brain.

It is not safe for children.

Some substances are illegal

because they are dangerous.

And questions are always allowed.

There is no wrong time to ask.



This is the age to explain more.

People use substances for many reasons.

Curiosity.

Social pressure.

Coping.

Belonging.

Addiction is not weakness.

It is loss of control over use

despite harm.



If you are ever in a situation

you need to leave

you can call me.

No questions in that moment.

We talk later.

But you come home safely first.



At this stage, accuracy matters most.

Teenagers test what they are told

against what they see.

If information is exaggerated,

trust is lost.

If information is accurate,

trust increases.



Alcohol impairs judgement and coordination.

It increases risk of accidents

and poisoning at high levels.

Cannabis can affect memory and motivation

and may increase anxiety in some people.

Vaping is highly addictive.

Dependency can develop quickly.

Stimulants such as cocaine and MDMA

carry serious cardiac risk

and addiction potential.

Opioids carry a high risk of overdose.



Nitrous oxide is often underestimated.

Small canisters, balloons, casual use.

But repeated exposure

can cause nerve damage

including spinal injury

and long-term disability.



If you find signs, ask early.

Not with panic.

With clarity.

Because the goal is not control.

It is connection.

And safety through honesty.`
      },
      {
        title: 'Responding to Use and Getting Help',
        file: 'EXAMPLE SONGS/Family Anchor/Course 4/Responding to Use and Getting Help.mp3',
        lyrics: `When you discover your child is using substances

your first response matters more

than anything that follows.



Do not respond in anger.

Not at the moment.

Not while emotions are high.



Take the time you need

to become calm again.



Because that first reaction

sets the tone

for every conversation after.



When you are ready,

approach with curiosity

not accusation.



“I found this. Tell me what’s going on.”



Then listen.

Before you respond.



Ask questions calmly.

What is being used.

How often.

With whom.

Why.



Not to judge.

To understand the pattern.



Because patterns tell you

whether this is experimentation

or something developing further.



And they tell you

what may be driving it.



Be honest about concern

without catastrophising.



“It looks like something difficult is going on.

Substances won’t help with that.

Let’s work out what will.”



Set clear expectations.

And seek support early.



A counsellor with experience

in adolescent substance use

can be helpful even after one incident.



If someone is unconscious,

stay calm.



Put them in the recovery position.

Stay with them.

Do not leave them alone.



Call emergency services immediately.

Know your local emergency number

before you ever need it.



Share what was taken.

Even if it feels uncomfortable.

That information can save their life.



Addiction is not a moral failure.

It is a health condition.



If use is affecting every part of life,

if control is lost,

if secrecy increases,

if tolerance grows,

medical support is needed.



A doctor is the first step.

Not the last.



Recovery is not linear.

Setbacks can happen.

They do not end progress.



The goal is not punishment.

It is safety.

Understanding.

And steady support through change.`
      }
    ],
    remember: {
      title: 'Remember This - Drug Awareness',
      file: 'EXAMPLE SONGS/Family Anchor/Course 4/Remember This Course 4.mp3',
      lyrics: `Young people do not use substances

because they are bad.

They use for reasons.

Understanding those reasons

matters more than punishment.



Family history is a real risk factor.

So are mental health struggles

like anxiety and depression.

These should be acknowledged early

and directly.



What matters most is pattern, not single signs.

Secretiveness.

Mood changes.

Dropping grades.

New older peer groups.

One sign alone is not enough.

Together, they matter.



These conversations should start early

and continue over time.

With teenagers, accuracy is essential.

Scare tactics do not protect them.

They reduce trust.



If you discover use,

do not react in anger.

Take a moment.

Then respond with curiosity.

“I’ve noticed some changes.

And I found this.

Tell me what’s going on.”



Understand before responding.

Because what you learn

tells you what is driving the behaviour.



If someone is unconscious from substances,

the priority is life.

Recovery position.

Emergency services.

Stay with them.

And be honest with responders.

That information matters.



Scenario:

A sixteen-year-old is withdrawn.

Sleeping more than usual.

Stopped playing football.

Spending time with older friends.

Rolling papers are found in their room.



Correct response:

Calm yourself first.

Then speak to them.

“I’ve noticed changes.

And I found this.

Tell me what’s going on.”



Because patterns matter.

And curiosity opens conversation.

Where accusation closes it.`
    }
  },

  // ─── Family Anchor: Mental Health and Eating Disorders (c25) ───
  'c25': {
    lessons: [
      {
        title: 'Understanding Eating Disorders',
        file: 'EXAMPLE SONGS/Family Anchor/Course 5/Understanding Eating Disorders.mp3',
        lyrics: `Eating disorders are not about food.

And they are not about appearance.

They are mental health conditions.

Often rooted in anxiety.

Control.

Trauma.

Or emotional distress finding a form.



They affect all genders.

All ages.

All backgrounds.

Understanding that changes everything.

It removes blame.

And replaces it with clarity.



Anorexia involves restriction.

Often paired with excessive exercise.

Leading to severe weight loss

and serious physical risk.



Bulimia involves cycles.

Binge eating.

Followed by purging.

Through vomiting, laxatives, or over-exercise.

Weight may appear normal.

Which means it is often missed longer.



Binge eating disorder involves

consuming large amounts of food quickly.

With distress and shame

but without purging.



ARFID involves restriction too.

But not based on body image.

Often linked to sensory sensitivity

or food anxiety.

It still affects nutrition and health.



In boys and some non-binary young people,

it may look different.

Muscle building.

Macro tracking.

Body composition fixation.

But the thinking underneath

is the same illness pattern.



Early signs are patterns.

Not single moments.

Rapid weight change.

Food groups removed.

Compulsive exercise.

Constant focus on calories or body.

Eating rituals.

Withdrawal from shared meals.

Bathroom visits after eating.



Physical signs may include

fatigue.

dizziness.

hair loss.

dental damage.

swelling.



Self-harm can also be present.

Or occur independently.

It is not attention-seeking.

It is coping with distress.



If it is discovered,

do not respond with shock or demands.

Stay calm.

Seek medical support.

Involve mental health services.

Because the behaviour is a signal

not the root problem.



Social media can intensify risk.

Algorithms promote certain body ideals.

Diet culture.

Extreme content.

Without judgement.

Without balance.



Talk about what is real.

Talk about what is edited.

Talk about what is filtered.

Because context protects understanding.



Eating disorders are serious.

But they are treatable.

Early recognition

and calm response

make the difference.`
      },
      {
        title: 'Talking to Your Child and Getting Help',
        file: 'EXAMPLE SONGS/Family Anchor/Course 5/Talking to Your Child and Getting Help.mp3',
        lyrics: `Choose a calm moment.

Not during a meal.

Not after a meal.

Not in emotional intensity.



Start with observation.

Not labels.

Not conclusions.



“I’ve noticed you seem anxious around food.

And you’ve been eating less.

I’m worried about you.

Can we talk about what’s going on?”



Then listen.

Fully.

Without interruption.



Expect denial.

It is common.

Many people do not recognise themselves as unwell.

Do not argue.

Do not try to persuade.



What you can say is simple and honest.

“I hear you saying you’re fine.

I’m still concerned.

And I’d like us to see someone.”



Avoid commenting on weight.

Avoid commenting on appearance.

Even positive comments

can be heard as pressure or judgement.

Focus on health.

Focus on wellbeing.

Focus on how they feel.



Your doctor is the first step.

Not the last.

Describe what you have observed.

Eating patterns.

Restriction.

Exercise behaviour.

Anxiety around food.

Physical changes.



Your doctor can assess risk.

Support immediate health needs.

And refer to specialist services.



Expect waiting lists.

So support continues in the meantime.

Keep routines where possible.

Keep family meals without conflict.

Avoid turning food into a battleground.

And seek support for yourself too.



For younger children with anorexia,

family-based treatment is strongly supported.

Ask about it directly.

Name it.

Request it.



The goal is not control.

It is understanding.

And early support

before the pattern deepens.`
      },
      {
        title: 'Supporting Recovery',
        file: 'EXAMPLE SONGS/Family Anchor/Course 5/Supporting Recovery.mp3',
        lyrics: `Recovery from an eating disorder

is not a straight line.

Expecting it to be

turns setbacks into something else.

Into failure.

But it is not failure.

It is part of the process.



At mealtimes,

eat together where possible.

Do not police food.

Do not measure portions.

Do not comment on bodies.

In either direction.



If they eat very little,

acknowledge it calmly.

Without confrontation.

And step back.



Concerns are raised

with the treatment team.

Not in the middle of the meal.

Because the meal

is not the place

for correction.



In conversation,

focus on wellbeing.

Not appearance.

Not intake.

Ask how they are feeling.

Ask how treatment is going.

Do not ask

whether they ate.

Do not ask

whether they purged.

These questions feel like monitoring.

And they damage trust.



Treatment is not optional.

You hold that line.

Calmly.

Firmly.

Consistently.



But there is a difference

between support

and enabling the disorder.



Separate meals every time.

Avoiding all feared foods.

Removing every challenge.

These feel kind in the moment.

But they slow recovery over time.



Mental health conditions overlap.

Anxiety.

Depression.

Withdrawal.

Sleep change.

Loss of interest.

Irritability.

Physical complaints.



If your child seems different

without a clear explanation,

the response is the same.

Observe without judgement.

Ask open questions.

Involve your doctor early.



You do not need a diagnosis

to seek help.

Concern is enough.



And you also need support.

This is exhausting.

It is frightening.

It is isolating.

Find people you can speak to.

A therapist.

A support group.

Someone safe.



Do not process your emotions

through your child.

That is not their role.



Recovery is possible.

Many people recover fully.

It takes time.

Professional support.

And consistent care.



Your calm presence matters.

Your consistency matters.

Your belief in recovery matters.

More than you are likely to realise.`
      }
    ],
    remember: {
      title: 'Remember This - Mental Health and Eating Disorders',
      file: 'EXAMPLE SONGS/Family Anchor/Course 5/Remember This Course 5.mp3',
      lyrics: `Eating disorders are serious mental health conditions.

They are not about appearance or vanity.

They are usually rooted in anxiety, control, or trauma.

And they can affect anyone.



Warning signs are often behavioural first.

Changes in eating patterns.

Cutting out food groups.

Excessive exercise.

Food-related routines or rituals.

Withdrawal from shared meals.

Noticeable weight change.

Fatigue or physical decline.



What matters is what you observe, not how they look.

And conversations should stay away from appearance.

Comments about weight can deepen the anxiety at the centre of the problem.



The first step is medical support.

Your doctor assesses risk and refers to specialist care.

Even if your child denies a problem,

you can still act.

Waiting lists are common,

so support continues in the meantime.



At home, keep meals shared where possible.

Avoid turning eating into conflict.

Do not comment on food or bodies.

If concerns arise, raise them with professionals

rather than during meals.



Recovery is not a straight path.

There will be progress and setbacks.

Both are part of the process.



Your own support matters too.

This can be emotionally heavy and isolating.

You are allowed to seek help for yourself.



Consistent calm matters more than perfection.

Stability supports recovery over time.



Scenario:

A thirteen-year-old is anxious at mealtimes,

has removed most foods from their diet,

and has lost noticeable weight.

They say they are fine

and accuse you of overreacting.



Correct action:

Arrange a doctor’s appointment

and proceed with assessment

even if they deny a problem.



Because early concern is enough.

And professional support does not depend

on agreement at home.`
    }
  }

};


export default SONGS
