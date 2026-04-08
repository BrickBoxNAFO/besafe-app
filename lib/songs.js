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
 * Audio files are served from Supabase Storage:
 *   https://iixjfonhzcipinnznsot.supabase.co/storage/v1/object/public/Audio/{path}
 *
 * Lyrics format:
 *   Use [Verse 1], [Chorus], [Bridge] etc. on their own lines
 *   to create section headings. Regular lines are lyrics.
 *
 * To add a song:
 *   1. Upload the MP3 to Supabase Storage under Audio/Course X/
 *   2. Set the "file" value to the path after "Audio/" (e.g. "Course 1/lesson-1.mp3")
 *   3. Paste the lyrics into the "lyrics" string
 */

const SUPABASE_AUDIO_BASE = 'https://iixjfonhzcipinnznsot.supabase.co/storage/v1/object/public/Audio'

export function getAudioUrl(filePath) {
  if (!filePath) return null
  if (filePath.startsWith('http')) return filePath
  return SUPABASE_AUDIO_BASE + '/' + encodeURIComponent(filePath).replace(/%2F/g, '/')
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
        file: 'Course 1/Lesson 1_ Crossing Roads Safely (2).mp3',
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
        file: 'Course 1/Lesson 2_ Playing Outdoors Safely.mp3',
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
        file: 'Course 1/Lesson 3_ Water Safety.mp3',
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
        file: 'Course 1/Lesson 4_ Animal Safety.mp3',
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
        file: 'Course 1/Lesson 5_ Keeping Safe When Getting Help.mp3',
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
      file: 'Course 1/Remember This Course 1.mp3',
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
        file: 'Course 2/Lesson 1_ What is Bullying_.mp3',
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
        file: 'Course 2/Lesson 2_ Different Kinds of Bullying.mp3',
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
        file: 'Course 2/Lesson 3_ What to Do if Someone is Being Mean to You and Telling a Grown-up.mp3',
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
        file: 'Course 2/Lesson 4_ Being a Good Friend and Helping Others.mp3',
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
        file: 'Course 2/Lesson 5_ Thinking About How Others Feel.mp3',
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
      file: 'Course 2/Remember This Course 2.mp3',
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
        file: 'Course 3/Lesson 1_ What is the Internet_.mp3',
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
        file: 'Course 3/Lesson 2_ Keeping Your Name and Details Private.mp3',
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
        file: 'Course 3/Lesson 3_ What to Do if Something Scary Happens Online and Talking to Your Grown-up.mp3',
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
        file: 'Course 3/Lesson 4_ Being Kind Online.mp3',
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
      file: 'Course 3/Remember This Course 3.mp3',
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
        file: 'Course 4/Lesson 1_ What is a Stranger_.mp3',
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
        file: 'Course 4/Lesson 2_ Who are Your Safe Grown-ups_.mp3',
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
        file: 'Course 4/Lesson 3_ Never Go Anywhere Without Asking.mp3',
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
        file: 'Course 4/Lesson 4_ What to Do if You Feel Lost.mp3',
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
        file: 'Course 4/Lesson 5_ Secrets vs Surprises.mp3',
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
        file: 'Course 4/Lesson 6_ What to Do if You Feel Scared.mp3',
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
        file: 'Course 4/Lesson 7_ What to Do if Someone Tries to Grab You.mp3',
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
      file: 'Course 4/Remember This Course 4.mp3',
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
        file: 'Course 5/Lesson 1_ Your Body Belongs to You.mp3',
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
        file: 'Course 5/Lesson 2_ Private Parts are Private.mp3',
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
        file: 'Course 5/Lesson 3_ Safe Touch vs Unsafe Touch.mp3',
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
        file: 'Course 5/Lesson 4_ It is Always Okay to Say No.mp3',
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
        file: 'Course 5/Lesson 5_ Telling a Safe Grown-up if Something Happens.mp3',
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
        file: 'Course 5/Lesson 6_ What Happens After You Tell Someone.mp3',
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
      file: 'Course 5/Remember This Course 5.mp3',
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
      { title: 'Crossing Roads Safely and Being Seen by Drivers', file: 'Junior Songs and Lyrics/Course 1/Lesson 1_ Crossing Roads Safely and Being Seen by Drivers.mp3', lyrics: 'Yeah, the street’s alive, engines rolling by,\nPeople moving fast, no time to wonder why.\nBut you don’t rush in, no, you take control,\nEvery step you take, yeah you stay in the know.\n\nFind the lights, find the signs,\nThat’s the place you cross the line.\n\nStop, look both ways before you go,\nLeft, right, left—now you know.\nKeep your head up, take it slow,\nStay aware everywhere you go.\nNo guessing games, don’t take that chance,\nSafe steps first—that’s how you advance.\n\nDon’t cut between cars where you can’t be seen,\nStep into the open, keep your path clean.\nWalk straight across, don’t run the race,\nEyes and ears on, steady pace.\n\nIf you see them, they see you,\nThat’s the rule you gotta use.\n\nStop, look both ways before you go,\nLeft, right, left—now you know.\nKeep your head up, take it slow,\nStay aware everywhere you go.\nNo guessing games, don’t take that chance,\nSafe steps first—that’s how you advance.\n\nNo headphones blasting in your ears,\nNo phone to block what you should hear.\nIf it’s dark or rain comes down,\nMake sure you stand out in the crowd.\n\nStop, look both ways—take the lead,\nSmart moves are the ones you need.\nStay sharp, don’t drift away,\nThat’s how you win every day.\nYeah, you’ve got it, now you know—\nSafe and ready when you go. \n' },
      { title: 'Cycling Safely', file: 'Junior Songs and Lyrics/Course 1/Lesson 2_ Cycling Safely.mp3', lyrics: 'Yeah, we ride out, feel the wind, let it go,\nTwo wheels rolling, yeah we’re running the road.\nIt’s fun, it’s fast, yeah we’re feeling that flow,\nBut stay sharp—gotta stay in control.\nCheck your ride before you roll,\nMake sure everything’s good to go.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nTyres pumped up, yeah they ready to go,\nBrakes check out so you’re stopping for sure.\nChain runs smooth, no skipping the beat,\nIf something feels off, get it fixed before the street.\n\nAsk for help, don’t guess, don’t play,\nKeep your bike safe every day.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nSame direction as the cars on the street,\nBike lane cruising, yeah you keep it clean.\nWatch the edges, potholes in the way,\nSlow it down at turns, don’t drift away.\n\nAt the lights, take your time,\nMake sure they see you before you ride.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nHands out clear when you’re making that turn,\nEye contact—let the drivers learn.\nBright clothes on, yeah you stand out right,\nFront and back lights shining in the night.\n\nNo headphones blocking what you need to hear,\nStay aware, keep your pathway clear.\nIf you’re unsure, don’t risk the flow,\nHop off, walk it, take it slow.\n\nRide smart, ride strong, yeah you know the way,\nSafe choices every single day.\nStay seen, stay sharp, keep control in sight,\nThat’s how you win every single ride.\n' },
      { title: 'Water Safety', file: 'Junior Songs and Lyrics/Course 1/Lesson 3_ Water Safety (1).mp3', lyrics: 'Yeah, we ride out, feel the wind, let it go,\nTwo wheels rolling, yeah we’re running the road.\nIt’s fun, it’s fast, yeah we’re feeling that flow,\nBut stay sharp—gotta stay in control.\n\nCheck your ride before you roll,\nMake sure everything’s good to go.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\nTyres pumped up, yeah they ready to go,\nBrakes check out so you’re stopping for sure.\nChain runs smooth, no skipping the beat,\nIf something feels off, get it fixed before the street.\n\nAsk for help, don’t guess, don’t play,\nKeep your bike safe every day.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nSame direction as the cars on the street,\nBike lane cruising, yeah you keep it clean.\nWatch the edges, potholes in the way,\nSlow it down at turns, don’t drift away.\nAt the lights, take your time,\nMake sure they see you before you ride.\n\nRide smart, ride strong, keep it moving along,\nHelmet on your head, yeah you got it locked on.\nLights on bright so they see you at night,\nStay safe, stay seen every time that you ride.\nRide smart, don’t rush, keep your focus tight,\nThat’s how you stay winning every ride.\n\nHands out clear when you’re making that turn,\nEye contact—let the drivers learn.\nBright clothes on, yeah you stand out right,\nFront and back lights shining in the night.\n\nNo headphones blocking what you need to hear,\nStay aware, keep your pathway clear.\nIf you’re unsure, don’t risk the flow,\nHop off, walk it, take it slow.\n\nRide smart, ride strong, yeah you know the way,\nSafe choices every single day.\nStay seen, stay sharp, keep control in sight,\nThat’s how you win every single ride.\n' },
      { title: 'Playing Outdoors Safely and Knowing Your Boundaries', file: 'Junior Songs and Lyrics/Course 1/Lesson 4_ Playing Outdoors Safely and Knowing Your Boundaries.mp3', lyrics: 'Yeah, you’re stepping out, doing more on your own,\nWalking to school or a place you’ve known.\nFeels good, yeah, freedom’s real,\nBut smart choices matter with the way you feel.\n\nTalk it through, know the plan,\nWhere you go and where you can.\n\nKnow the way, know your space,\nWhere you’re going, set your pace.\nCheck the time, be back when told,\nSmart moves now, that’s how you grow.\nStay aware, think it through,\nMake safe choices—that’s on you.\n\nTell someone where you’re gonna be,\nHeading out with your crew or just you and me.\nPlans might change, that’s okay,\nFind a way to update, don’t drift away.\n\nStick with friends when you can,\nLook around, always have a plan.\n\nIf it feels off, don’t ignore,\nTrust your gut and head for more—\n\nKnow the way, know your space,\nWhere you’re going, set your pace.\nCheck the time, be back when told,\nSmart moves now, that’s how you grow.\nStay aware, think it through,\nMake safe choices—that’s on you.\n\nBusy roads and tracks—stay clear,\nBuilding sites? Don’t go near.\nBroken places, not your scene,\nYou don’t have to follow where it’s unsafe to be.\n\nMake your choice, stand your ground,\nSafe is strong—that’s how you’re found.\n\nIf you’re lost, don’t panic, stay cool,\nHead somewhere safe like a shop or school.\nFind an adult, tell them straight,\nThey’ll help you out, don’t hesitate.\n\nYou’ve got this, just take it slow,\nThink it through and you’ll know.\n\nKnow the way, stay in control,\nEvery step, every goal.\nStay smart, don’t rush through,\nThe safest path is up to you.\nYeah, you’re growing, this is true—\nNow the smart moves come from you.\n\n' },
      { title: 'Animal Safety and Outdoor Emergencies', file: 'Junior Songs and Lyrics/Course 1/Lesson 5_ Animal Safety and Outdoor Emergencies.mp3', lyrics: 'Yeah, you’re stepping out, doing more on your own,\nWalking to school or a place you’ve known.\nFeels good, yeah, freedom’s real,\nBut smart choices matter with the way you feel.\n\nTalk it through, know the plan,\nWhere you go and where you can.\n\nKnow the way, know your space,\nWhere you’re going, set your pace.\nCheck the time, be back when told,\nSmart moves now, that’s how you grow.\nStay aware, think it through,\nMake safe choices—that’s on you.\n\nTell someone where you’re gonna be,\nHeading out with your crew or just you and me.\nPlans might change, that’s okay,\nFind a way to update, don’t drift away.\n\nStick with friends when you can,\nLook around, always have a plan.\n\nIf it feels off, don’t ignore,\nTrust your gut and head for more—\n\nKnow the way, know your space,\nWhere you’re going, set your pace.\nCheck the time, be back when told,\nSmart moves now, that’s how you grow.\nStay aware, think it through,\nMake safe choices—that’s on you.\n\nBusy roads and tracks—stay clear,\nBuilding sites? Don’t go near.\nBroken places, not your scene,\nYou don’t have to follow where it’s unsafe to be.\n\nMake your choice, stand your ground,\nSafe is strong—that’s how you’re found.\n\nIf you’re lost, don’t panic, stay cool,\nHead somewhere safe like a shop or school.\nFind an adult, tell them straight,\nThey’ll help you out, don’t hesitate.\n\nYou’ve got this, just take it slow,\nThink it through and you’ll know.\nKnow the way, stay in control,\nEvery step, every goal.\nStay smart, don’t rush through,\nThe safest path is up to you.\nYeah, you’re growing, this is true—\nNow the smart moves come from you.\n' }
    ],
    remember: { title: 'Remember This Course 1', file: 'Junior Songs and Lyrics/Course 1/Remember This Course 1 (1).mp3', lyrics: 'Step outside, yeah you’re on your way,\nGot more freedom every day.\nBut before you move, take a second to think,\nOne smart choice can change everything.\n\nSlow it down, check the scene,\nKnow exactly what it means.\nPlay it smart, every move you make,\nLook both ways, don’t rush, don’t break.\nStop and think before you go,\nThat’s the way to stay in control.\nStay sharp, wherever you are,\nSafe decisions take you far.\n\nCross the road where it’s made for you,\nSigns and lights show what to do.\nLeft then right, then left again,\nStay aware till you reach the end.\n\nDon’t guess, don’t take that chance,\nSafety’s always in your hands.\n\nPlay it smart, every move you make,\nLook both ways, don’t rush, don’t break.\nStop and think before you go,\nThat’s the way to stay in control.\nStay sharp, wherever you are,\nSafe decisions take you far.\n\nWater’s fun but don’t go alone,\nStick to places that are known.\nPools or beaches where guards can see,\nThat’s the place you’re meant to be.\n\nRivers? No, not without help,\nThat’s a risk you shouldn’t test.\n\nKnow your limits, know your zone,\nTell someone before you go.\nIf it feels wrong, trust that sign,\nGet to safety every time.\n\nStay away from danger zones,\nTracks and sites aren’t places to roam.\nAnimals you don’t know? Keep away,\nAnd know how to call for help if you need it one day.\n\nPlay it smart, stay in control,\nEvery choice is your goal.\nThink ahead, don’t drift apart,\nSafety first—that’s being smart.\nYeah, you know it from the start—\nEvery day, just play it smart.\n' }
  },
  'c2': {
    lessons: [
      { title: 'What is Bullying Really?', file: 'Junior Songs and Lyrics/Course 2/Lesson 1_ What is Bullying Really_.mp3', lyrics: 'Some words cut deep, some actions sting,\nIt’s not okay, it’s a harmful thing.\nHitting, pushing, taking your stuff,\nOr teasing too much—that’s more than enough.\n\nIt’s repeated, deliberate, and unfair,\nPower imbalance—you gotta be aware.\n\nStand strong, you don’t have to fight alone,\nReach out, speak up, let your voice be known.\nBullying’s not your fault, you’re not to blame,\nKeep your head up, shine through the shame.\nStand strong, keep moving, don’t back down,\nYour courage matters, wear it like a crown.\n\nVerbal attacks, name-calling, cruel jokes,\nRumours online, spreading nasty notes.\nLeaving someone out, turning friends away,\nCyber messages that ruin someone’s day.\n\nIt’s not a one-time thing, it’s not just play,\nIt’s repeated harm that takes its toll each day.\n\nStand strong, you don’t have to fight alone,\nReach out, speak up, let your voice be known.\nBullying’s not your fault, you’re not to blame,\nKeep your head up, shine through the shame.\nStand strong, keep moving, don’t back down,\nYour courage matters, wear it like a crown.\n\nAnyone can be a target, anyone can face pain,\nIt’s not weakness, it’s not your shame.\nIf it happens to you, find someone you trust,\nA teacher, a friend, someone who must—\n\nHelp you see that you’re not alone,\nThat your value is yours, and yours alone.\nStand strong, you don’t have to fight alone,\nReach out, speak up, let your voice be known.\nBullying’s not your fault, you’re not to blame,\nKeep your head up, shine through the shame.\nStand strong, keep moving, don’t back down,\nYour courage matters, wear it like a crown.\n' },
      { title: 'What to Do if You\'re Being Bullied', file: 'Junior Songs and Lyrics/Course 2/Lesson 2_ What to Do if You\'re Being Bullied and Telling Someone You Trust.mp3', lyrics: 'If someone’s picking on you, it’s not your fault,\nThey chose their target, that’s the default.\nNothing you did makes it okay,\nYou’ve got the right to stand your way.\nIf it feels safe, speak your truth,\nFirm and clear, no need for proof.\n\nSay “Stop!” and walk away,\nTell someone who can help today.\nWrite it down, keep track of the time,\nYour voice matters—it’s not a crime.\nYou’re not alone, reach out and see,\nThere’s support waiting for you and me.\n\nParents, teachers, counselors too,\nTell them exactly what’s going through.\nWho, what, when, and how it feels,\nSomeone who cares will help you heal.\n\nIf the first one doesn’t listen right,\nKeep asking, don’t give up the fight.\n\nWrite it down, keep your proof near,\nPersistence shows that you’re clear.\n\nSay “Stop!” and walk away,\nTell someone who can help today.\nWrite it down, keep track of the time,\nYour voice matters—it’s not a crime.\nYou’re not alone, reach out and see,\nThere’s support waiting for you and me.\n\nScreenshots saved, block and don’t reply,\nShow a parent, don’t let it slide.\nReport online, take the step,\nProtect yourself, don’t regret.\n\nTalking helps—friends, family, counselor too,\nIt’s strength to seek support, it’s true.\nSay “Stop!” and walk away,\nTell someone who can help today.\nWrite it down, keep track of the time,\nYour voice matters—it’s not a crime.\nYou’re not alone, reach out and see,\nThere’s support waiting for you and me.\n' },
      { title: 'Being an Upstander and Your Own Behaviour', file: 'Junior Songs and Lyrics/Course 2/Lesson 3_ Being an Upstander and Your Own Behaviour.mp3', lyrics: 'See it happen, don’t just stare,\nA little courage shows you care.\nStep in safely, say it loud,\n“You can’t treat them like that now.”\n\nOne voice can shift the scene,\nOne friend’s support can change everything.\n\nStand up, speak out, don’t stay quiet,\nShow the world you won’t let it slide.\nBe the change, take a side,\nHelp someone feel safe inside.\nOnline, offline, it’s the same,\nUse your words, don’t play their game.\n\nIf your friends are joining in,\nSay, “Not today, I won’t give in.”\nInvite the person, pull them near,\nOne friend’s support can calm their fear.\n\nReport it when you need to,\nTell an adult—it’s the smart thing to do.\n\nYour actions matter more than you know,\nA single stand can help them grow.\n\nStand up, speak out, don’t stay quiet,\nShow the world you won’t let it slide.\nBe the change, take a side,\nHelp someone feel safe inside.\nOnline, offline, it’s the same,\nUse your words, don’t play their game.\n\nIf you’ve hurt someone, own it, apologize,\nChange your ways, show you’re wise.\nReal friends don’t pressure you to be cruel,\nRespect is stronger than following the rules.\n\nStand up, speak out, take a stand,\nShow the world you’ve got a plan.\nBe the change, take a side,\nHelp someone feel safe inside.\nOnline, offline, it’s the same,\nUse your words, don’t play their game. \n' }
    ],
    remember: { title: 'Remember This Course 2', file: 'Junior Songs and Lyrics/Course 2/Remember this course 2 (1).mp3', lyrics: 'Bullying isn’t just a fight,\nIt’s repeated, meant to hurt, not right.\nPower’s unfair, the target’s stressed,\nOne-time arguments don’t count—rest.\n\nDon’t face it alone, don’t stay quiet,\nTell a trusted adult, take that pilot.\n\nYour words matter, every day,\nOffline, online, in what you say.\nSpeak up, support, take a stand,\nBe the change with your own hands.\nIf you’ve hurt someone, make it right,\nApologize, learn, and shine your light.\n\nSee it happen? Don’t just stare,\nSay something brave, show that you care.\nInvite a friend, pull them near,\nOne act of kindness can calm their fear.\n\nStand up safely, help them through,\nYour actions matter, they see you too.\n\nYour words matter, every day,\nOffline, online, in what you say.\nSpeak up, support, take a stand,\nBe the change with your own hands.\nIf you’ve hurt someone, make it right,\nApologize, learn, and shine your light.\n\nThink before you post or share,\nWould you say it face-to-face, be fair?\nNo rumours, no photos without consent,\nKindness online shows intent.\n\nYour words matter, every day,\nOffline, online, in what you say.\nSpeak up, support, take a stand,\nBe the change with your own hands.\nIf you’ve hurt someone, make it right,\nApologize, learn, and shine your light. 🎶\n' }
  },
  'c3': {
    lessons: [
      { title: 'What is the Internet and How Does it Work?', file: 'Junior Songs and Lyrics/Course 3/Lesson 1_ What is the Internet and How Does it Work_.mp3', lyrics: 'The internet connects the world tonight,\nMessages, videos, games in sight.\nBut every click, every word you share,\nMight travel places you’re unaware.\n\nInformation moves through servers far,\nOnce it’s online, it leaves a scar.\n\nThink before you click, think before you post,\nTreat the web like a place with strangers most.\nDon’t share what you wouldn’t say out loud,\nKeep your info safe, stand strong and proud.\nThink before you click, don’t fall for tricks,\nNot everyone online has good intentions to mix.\n\nWebsites, apps, games that you play,\nSome are free, but they track your way.\nAdvertisers see, they sell what they find,\nProtect your data, keep control in mind.\n\nPeople online—some are real, some fake,\nDon’t trust them all for your own sake.\n\nThink before you click, think before you post,\nTreat the web like a place with strangers most.\nDon’t share what you wouldn’t say out loud,\nKeep your info safe, stand strong and proud.\nThink before you click, don’t fall for tricks,\nNot everyone online has good intentions to mix.\n\nPhotos, videos, once they’re there,\nThey’re permanent, so handle with care.\nDon’t send what you wouldn’t want to show,\nOnce it’s online, it can always go.\n\nKeep your private info off the street,\nBe aware of every digital beat.\nThink before you click, think before you post,\nTreat the web like a place with strangers most.\nDon’t share what you wouldn’t say out loud,\nKeep your info safe, stand strong and proud.\nThink before you click, don’t fall for tricks,\nNot everyone online has good intentions to mix.\n' },
      { title: 'Personal Information - What to Keep Private and Why', file: 'Junior Songs and Lyrics/Course 3/Lesson 2_ Personal Information - What to Keep Private and Why.mp3', lyrics: 'Your info’s private, don’t give it out,\nNames, birthdays, school—no doubt.\nAddress, phone, email, passwords too,\nPhotos and videos—think before you do.\n\nStrangers online can pretend to be you,\nUse your details to cause trouble too.\n\nKeep it safe, don’t share what’s yours,\nProtect yourself, lock all the doors.\nPrivate info’s valuable, don’t let it leak,\nThink before you post, be strong, not weak.\nKeep it safe, keep it smart,\nYour personal info’s a work of art.\n\nHobbies, games, your favorite books,\nHoliday trips, just general looks.\nTalk about football, music, or art,\nBut don’t give details that reveal your heart.\n\nStrangers online might seem okay,\nBut safety first, that’s the way.\n\nKeep it safe, don’t share what’s yours,\nProtect yourself, lock all the doors.\nPrivate info’s valuable, don’t let it leak,\nThink before you post, be strong, not weak.\nKeep it safe, keep it smart,\nYour personal info’s a work of art.\n\nMake your accounts private, only friends you know,\nCheck your settings so your info doesn’t show.\nDon’t accept requests from people unknown,\nStrange messages? Tell an adult you trust at home.\n\nOnce it’s online, it can stay forever,\nThink twice, stay safe, now and forever.\n\nKeep it safe, don’t share what’s yours,\nProtect yourself, lock all the doors.\nPrivate info’s valuable, don’t let it leak,\nThink before you post, be strong, not weak.\nKeep it safe, keep it smart,\nYour personal info’s a work of art.\n' },
      { title: 'Safe vs Unsafe Online Behaviour', file: 'Junior Songs and Lyrics/Course 3/Lesson 3_ Safe vs Unsafe Online Behaviour - Strangers, Links, and Risks.mp3', lyrics: 'Online, you never really know,\nSomeone could be older, moving slow.\nThey might seem your age, but that’s a trick,\nStay cautious, don’t get picked.\n\nIf it feels off, trust your gut,\nTell an adult—don’t stay shut.\n\nStay alert online, keep your guard,\nDon’t click the links that look too hard.\nPasswords strong, keep them tight,\nOnly download from the trusted site.\nStay alert, don’t fall for schemes,\nNot everything online is what it seems.\n\nSome people build trust, try to seem nice,\nGrooming’s real, don’t pay the price.\nAsking for photos, keeping secrets too,\nIf it happens, tell someone you trust, true.\n\nIf a message makes you scared,\nStep back, get help—you’re prepared.\n\nStay alert online, keep your guard,\nDon’t click the links that look too hard.\nPasswords strong, keep them tight,\nOnly download from the trusted site.\nStay alert, don’t fall for schemes,\nNot everything online is what it seems.\n\nUpdate apps, update your phone,\nSecurity fixes keep you in the zone.\nWatch what apps and websites see,\nAssume online isn’t totally private, be free.\n\nChange passwords if you think they’re known,\nKeep your info safe, protect your zone.\n\nStay alert online, keep your guard,\nDon’t click the links that look too hard.\nPasswords strong, keep them tight,\nOnly download from the trusted site.\nStay alert, don’t fall for schemes,\nNot everything online is what it seems.\n' },
      { title: 'When Something Online Upsets or Scares You', file: 'Junior Songs and Lyrics/Course 3/Lesson 4_ When Something Online Upsets or Scares You.mp3', lyrics: '(Verse 1)\nIf something online makes you scared or upset,\nTrust your feelings—don’t ignore it yet.\nIt’s not your fault, it’s okay to feel,\nYou’ve got the right to take the wheel.\n\n(Pre-Chorus)\nStop scrolling, close the page,\nDon’t share it, don’t engage.\n\n(Chorus)\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n\n(Verse 2 – Upsetting Content & Threats)\nViolence, bullying, or things that scare,\nMessages that try to trap you there.\nStop, block, take screenshots too,\nTell an adult, they’ll guide you through.\n\nBlackmail threats? Don’t give in,\nThey’re the wrong one, you don’t have to spin.\nDon’t delete—save the proof,\nYour voice is strong, your power’s truth.\n\n(Pre-Chorus)\nAdults can help you make it stop,\nYou’re not alone, you’ve got the top.\n\n(Chorus)\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n\n(Bridge – Reporting & Safety)\nUse the report button, don’t hesitate,\nProtect yourself, don’t leave it to fate.\nAdults deal with this every day,\nThey’ll help you safely find your way.\n\nRemember, it’s never your fault,\nThey’re the one who broke the law.\nTake screenshots, block, and show,\nPower’s back in your control.\n\n(Final Chorus)\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n' },
      { title: 'Being Kind Online', file: 'Junior Songs and Lyrics/Course 3/Lesson 5_ Being Kind Online - Your Words Have Real Impact.mp3', lyrics: 'If something online makes you scared or upset,\nTrust your feelings—don’t ignore it yet.\nIt’s not your fault, it’s okay to feel,\nYou’ve got the right to take the wheel.\n\nStop scrolling, close the page,\nDon’t share it, don’t engage.\n\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n\nViolence, bullying, or things that scare,\nMessages that try to trap you there.\nStop, block, take screenshots too,\nTell an adult, they’ll guide you through.\n\nBlackmail threats? Don’t give in,\nThey’re the wrong one, you don’t have to spin.\nDon’t delete—save the proof,\nYour voice is strong, your power’s truth.\n\nAdults can help you make it stop,\nYou’re not alone, you’ve got the top.\n\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n\nUse the report button, don’t hesitate,\nProtect yourself, don’t leave it to fate.\nAdults deal with this every day,\nThey’ll help you safely find your way.\n\nRemember, it’s never your fault,\nThey’re the one who broke the law.\nTake screenshots, block, and show,\nPower’s back in your control.\n\nTrust your feelings, speak out loud,\nTell a grown-up, don’t be proud\nOf hiding what’s wrong or staying quiet,\nThey’ll help you, you don’t need to fight it.\nBlock, save, report—it’s your right,\nYou’re not to blame, stand up and shine bright.\n' }
    ],
    remember: { title: 'Remember This Course 3', file: 'Junior Songs and Lyrics/Course 3/Remember This Course 3 (1).mp3', lyrics: 'The internet connects the world tonight,\nStrangers everywhere, not always right.\nTreat it like a street you walk outside,\nKeep your info safe, don’t let it slide.\n\nName, location, school, and phone,\nPasswords, birthday—keep them your own.\n\nThink before you share, think before you click,\nKeep yourself safe, don’t fall for tricks.\nBe kind online, your words have weight,\nDon’t bully, mock, or make someone hate.\nThink before you share, keep your info tight,\nStay smart, stay safe, do what’s right.\n\nDon’t meet someone you’ve only seen online,\nOnly go with parents, they’ll keep you fine.\nSuspicious links and downloads, don’t press,\nProtect your device, avoid the stress.\n\nBe cautious, think twice, stay aware,\nYour safety matters everywhere.\n\nThink before you share, think before you click,\nKeep yourself safe, don’t fall for tricks.\nBe kind online, your words have weight,\nDon’t bully, mock, or make someone hate.\nThink before you share, keep your info tight,\nStay smart, stay safe, do what’s right.\n\nCompliment, defend, and leave a light,\nOne kind comment can make it right.\nRespect each person, don’t spread what’s wrong,\nOnline or offline, we all belong.\n\nThink before you share, think before you click,\nKeep yourself safe, don’t fall for tricks.\nBe kind online, your words have weight,\nDon’t bully, mock, or make someone hate.\nThink before you share, keep your info tight,\nStay smart, stay safe, do what’s right.\n' }
  },
  'c4': {
    lessons: [
      { title: 'What is a Stranger Really?', file: 'Junior Songs and Lyrics/Course 4/Lesson 1_ What is a Stranger Really_.mp3', lyrics: 'Strangers walk around every day,\nMost are kind, just on their way.\nTeachers, shopkeepers, nurses too,\nUsually safe, just like you.\n\nBut some people hide the wrong inside,\nYou can’t tell at first glance, no matter the guide.\n\nUse your stranger sense, trust what you feel,\nStep back, stay safe, your instincts are real.\nNever get in a car, never give your info,\nGo somewhere safe, don’t let them trick you so.\nYour safety matters more than being polite,\nMove away, find a grown-up, do what’s right.\n\nIf you’re lost or scared, who can you see?\nLibrarians, guards, teachers—you can trust these.\nPolice officers, shop workers, someone around,\nAsk for help, safety can be found.\n\nAlways stay wary, listen inside,\nIf it feels wrong, don’t let them guide.\n\nUse your stranger sense, trust what you feel,\nStep back, stay safe, your instincts are real.\nNever get in a car, never give your info,\nGo somewhere safe, don’t let them trick you so.\nYour safety matters more than being polite,\nMove away, find a grown-up, do what’s right.\n\nDon’t go somewhere private, don’t hand out your name,\nDon’t let strangers inside or play their game.\nSay “No” if you need to, it’s okay to be bold,\nProtect yourself first—that’s the rule to hold.\n\nUse your stranger sense, trust what you feel,\nStep back, stay safe, your instincts are real.\nNever get in a car, never give your info,\nGo somewhere safe, don’t let them trick you so.\nYour safety matters more than being polite,\nMove away, find a grown-up, do what’s right.\n' },
      { title: 'What Makes an Adult Safe?', file: 'Junior Songs and Lyrics/Course 4/Lesson 2_ What Makes an Adult Safe_ .mp3', lyrics: 'Everyone needs someone who’ll hear,\nA grown-up who listens, someone sincere.\nBelieves you, cares, and takes you serious,\nExplains things clearly, keeps boundaries curious.\n\nDoesn’t make you do things that feel wrong,\nAlways there, steady and strong.\n\nTrusted voices, people who care,\nParents, teachers, anyone there.\nSomeone to tell when something’s not right,\nThey’ll help you, guide you, shine the light.\nTrusted voices, you’re not alone,\nSay what happened, make it known.\n\nThink of three to five, write them down,\nPeople you trust, people around.\nSee them often, feel safe to share,\nThey’ll listen, support, and always care.\n\nPick a calm moment, tell them the truth,\nWho, what, when, where—they’ll help you move.\n\nTrusted voices, people who care,\nParents, teachers, anyone there.\nSomeone to tell when something’s not right,\nThey’ll help you, guide you, shine the light.\nTrusted voices, you’re not alone,\nSay what happened, make it known.\n\nIt’s okay to cry, it’s okay to be scared,\nA trusted adult will always be prepared.\nDon’t wait too long, don’t hide away,\nThey’ll help you through, each step, each day.\n\nTrusted voices, people who care,\nParents, teachers, anyone there.\nSomeone to tell when something’s not right,\nThey’ll help you, guide you, shine the light.\nTrusted voices, you’re not alone,\nSay what happened, make it known.\n' },
      { title: 'The Never Go Anywhere Rule', file: 'Junior Songs and Lyrics/Course 4/Lesson 3_ The _Never Go Anywhere_ .mp3', lyrics: 'Most strangers are harmless, but you can’t be sure,\nNever get in a car, never give info to be sure.\nIf someone makes you uncomfortable or feels wrong,\nStep back, move away, your instincts are strong.\n\nTrusted adults listen, believe, and care,\nThree to five people you know are always there.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\nIf someone says, “Your parent sent me,”\nCheck first—don’t go blindly.\nSurprises are okay, happy and sweet,\nSecrets from adults? Don’t accept deceit.\n\nIf someone touches you in a way that feels wrong,\nTell a trusted adult—it makes you strong.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\nDon’t wait, don’t hide, don’t keep it inside,\nThe trusted adults on your list will guide.\nYou’re brave, you’re strong, you know what’s right,\nSpeak up, take action, shine your light.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\n' }
    ],
    remember: { title: 'Remember This Course 4', file: 'Junior Songs and Lyrics/Course 4/Remember This Course 4 (1).mp3', lyrics: 'Most people you pass are just living their lives,\nBut you can’t tell who’s safe just by their eyes.\nSo I keep my distance, I play it smart,\nI don’t give my name, I don’t share that part.\n\nNo getting in cars, no “come with me,”\nNo walking off where I can’t be seen.\nIf something feels off, I trust that sign,\nStep away quick, I draw the line.\n\nI don’t ignore it, I don’t pretend,\nI move away and tell someone I trust in the end.\n\nCheck first, don’t just go,\nIf they say your parents sent them—no.\nIf you didn’t hear it straight from home,\nThat’s your answer—don’t go alone.\nSpeak up, you won’t get in trouble,\nYour safety matters more than subtle.\n\nGot a few people I know I can call,\nThey listen, believe me, they’ve got it all.\nThree, four, maybe five I trust,\nIf something goes wrong, I tell them, I must.\n\nI don’t keep it in, I don’t wait it out,\nIf it feels serious, I speak it out loud.\n\nEven if it’s hard, even if I’m unsure,\nTelling someone makes it more secure.\n\nCheck first, don’t just go,\nIf they say your parents sent them—no.\nIf you didn’t hear it straight from home,\nThat’s your answer—don’t go alone.\nSpeak up, you won’t get in trouble,\nYour safety matters more than subtle.\n\nSurprises are fun, yeah they come with a smile,\nBut secrets from adults? That’s not their style.\nIf they say “don’t tell,” that’s a warning sign,\nSafe adults don’t cross that line.\n\nIf plans were real, you would already know,\nSo go back to someone safe—don’t go.\n\nCheck first, don’t just go,\nIf it’s not confirmed, then it’s a no.\nTrust your gut, don’t override,\nGet to a safe place, stay inside.\nSpeak up strong, don’t keep it small,\nThere’s always someone you can call.\n' }
  },
  'c5': {
    lessons: [
      { title: 'Your Body Belongs to You', file: 'Junior Songs and Lyrics/Course 5/Lesson 1_ Your Body Belongs to You (1).mp3', lyrics: 'Most strangers are harmless, but you can’t be sure,\nNever get in a car, never give info to be sure.\nIf someone makes you uncomfortable or feels wrong,\nStep back, move away, your instincts are strong.\n\nTrusted adults listen, believe, and care,\nThree to five people you know are always there.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\nIf someone says, “Your parent sent me,”\nCheck first—don’t go blindly.\nSurprises are okay, happy and sweet,\nSecrets from adults? Don’t accept deceit.\n\nIf someone touches you in a way that feels wrong,\nTell a trusted adult—it makes you strong.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n\nDon’t wait, don’t hide, don’t keep it inside,\nThe trusted adults on your list will guide.\nYou’re brave, you’re strong, you know what’s right,\nSpeak up, take action, shine your light.\n\nTrust your instincts, speak up loud,\nTell a grown-up, stand up proud.\nNever go alone unless your parents say it’s fine,\nSecrets from adults? That’s a red line.\nYour safety matters, you’re never in trouble,\nSpeak out, stand tall, stay out of the bubble.\n' },
      { title: 'Private Parts and Safe vs Unsafe Touch', file: 'Junior Songs and Lyrics/Course 5/Lesson 2_ Private Parts and Safe vs Unsafe Touch.mp3', lyrics: 'The parts of me that no one sees,\nAre mine alone, they belong to me.\nCovered up, that’s how it stays,\nNot for others, not for display.\n\nI know what’s right, I know the line,\nIf something feels off, I trust the sign.\n\nPrivate means mine, no one decides,\nI choose my space, I set the lines.\nIf it’s not for health or care,\nIt’s not okay, it’s not fair.\nPrivate means mine, I speak it clear,\nIf something’s wrong, I tell, I don’t disappear.\n\nSometimes care means help or checks,\nParents or doctors with respect.\nThey explain, they don’t hide,\nSomeone I trust is there beside.\n\nBut if someone crosses that line for real,\nOr asks for things that don’t feel right or real,\nThat’s not care, that’s not okay,\nI don’t stay quiet, I don’t delay.\n\nDoesn’t matter who they are,\nIf it feels wrong, it’s gone too far.\n\nPrivate means mine, no one decides,\nI choose my space, I set the lines.\nIf it’s not for health or care,\nIt’s not okay, it’s not fair.\nPrivate means mine, I speak it clear,\nIf something’s wrong, I tell, I don’t disappear.\n\nIt’s not just touch, it can be words,\nImages, questions that feel absurd.\nIf they ask for pictures or make it strange,\nThat’s not normal—that’s not a game.\n\nEven if I feel afraid,\nEven if threats are being made,\nI tell someone, I won’t hold it in,\nBecause I know I didn’t do anything.\n\nPrivate means mine, I stand my ground,\nMy voice is strong, I won’t back down.\nIt’s not my fault, I did no wrong,\nI speak it out, I stay strong.\nPrivate means mine, I make it known,\nI’m not alone—I’m never alone.\n' },
      { title: 'Your Right to Say No', file: 'Junior Songs and Lyrics/Course 5/Lesson 3_ Your Right to Say No - Even to Adults.mp3', lyrics: 'I’ve got a voice and I’m gonna use it,\nIf something feels wrong, I won’t just lose it.\nEven with people I know real well,\nI trust myself more than what they tell.\n\nI don’t owe yes just to be polite,\nI choose what’s wrong and what feels right.\n\nThey might not like it, that’s okay,\nI don’t have to give my say away.\n\nNo means no, I said what I said,\nI don’t need pressure inside my head.\nI stand my ground, I draw the line,\nMy choice, my space, my time.\nNo means no, don’t push me through,\nRespect my words like I respect you.\n\nI can say it calm, I can say it strong,\n“I don’t want to” is enough on its own.\nMaybe I wave, maybe I walk away,\nMaybe “I’ll ask at home” is what I say.\n\nI don’t need reasons to make it right,\nMy answer’s enough, I don’t need to fight.\n\nIf they keep pushing, cross that line,\nThat’s when I know it’s not alright.\n\nNo means no, I said what I said,\nI don’t need pressure inside my head.\nI stand my ground, I draw the line,\nMy choice, my space, my time.\nNo means no, don’t push me through,\nRespect my words like I respect you.\n\nIf they get angry, try to control,\nMake me feel bad or take a toll,\nThat’s not okay, I won’t ignore,\nI tell someone I trust for sure.\n\nI can repeat it, clear and slow,\n“I said no, I still mean no.”\n\nI’m not rude for protecting me,\nI’m just choosing my own safety.\n\nNo means no, it stays the same,\nNot a question, not a game.\nI stand strong, I won’t fold,\nMy voice matters, brave and bold.\nNo means no, and that’s enough,\nI choose me when things get tough.\n' },
      { title: 'Telling a Trusted Adult', file: 'Junior Songs and Lyrics/Course 5/Lesson 4_ Telling a Trusted Adult.mp3', lyrics: '(Verse 1)\nIf something happened and it don’t feel right,\nYou don’t have to carry that inside.\nEven if it’s old, even if it’s new,\nYou can still speak up, someone will hear you.\n\n(Pre-Chorus)\nYou don’t need perfect words to say,\nJust start somehow, don’t turn away.\n\n(Chorus)\nTell someone, don’t hold it in,\nThat’s where healing can begin.\nYou’re not alone, you don’t have to hide,\nThere’s someone safe right by your side.\nTell someone, let it be known,\nYou deserve to feel safe, to feel at home.\n\n(Verse 2 – Why It Matters)\nTelling brings help, it makes things change,\nStops the hurt, breaks the chain.\nIt’s not just you, it can protect,\nOthers too from the same effect.\n\n(Pre-Chorus)\nSay what you can, that’s enough,\nYou don’t need to get it perfect to be strong.\n\n(Chorus)\nTell someone, don’t hold it in,\nThat’s where healing can begin.\nYou’re not alone, you don’t have to hide,\nThere’s someone safe right by your side.\nTell someone, let it be known,\nYou deserve to feel safe, to feel at home.\n\n(Bridge – Reassurance & Rights)\nYour body’s yours, you choose what’s right,\nYou can say no, you don’t have to fight.\nPrivate means yours, no one decides,\nAnd none of this is your fault inside.\n\nIf they don’t listen the first time through,\nTell someone else—keep going, you.\n\n(Break / Soft Section)\nIt’s okay to cry, it’s okay to shake,\nYou’re still strong with every step you take.\n\n(Final Chorus)\nTell someone, don’t stay quiet,\nYour voice matters—don’t deny it.\nYou’re not to blame, you did no wrong,\nYou’re still brave, you’re still strong.\nTell someone, let it be known,\nYou are never, ever alone.\n' }
    ],
    remember: { title: 'Remember This Course 5', file: 'Junior Songs and Lyrics/Course 5/Remember This Course 5.mp3', lyrics: 'If something happened and it don’t feel right,\nYou don’t have to carry that inside.\nEven if it’s old, even if it’s new,\nYou can still speak up, someone will hear you.\n\nYou don’t need perfect words to say,\nJust start somehow, don’t turn away.\n\nTell someone, don’t hold it in,\nThat’s where healing can begin.\nYou’re not alone, you don’t have to hide,\nThere’s someone safe right by your side.\nTell someone, let it be known,\nYou deserve to feel safe, to feel at home.\n\nTelling brings help, it makes things change,\nStops the hurt, breaks the chain.\nIt’s not just you, it can protect,\nOthers too from the same effect.\n\nSay what you can, that’s enough,\nYou don’t need to get it perfect to be strong.\n\nTell someone, don’t hold it in,\nThat’s where healing can begin.\nYou’re not alone, you don’t have to hide,\nThere’s someone safe right by your side.\nTell someone, let it be known,\nYou deserve to feel safe, to feel at home.\n\nYour body’s yours, you choose what’s right,\nYou can say no, you don’t have to fight.\nPrivate means yours, no one decides,\nAnd none of this is your fault inside.\n\nIf they don’t listen the first time through,\nTell someone else—keep going, you.\n\nIt’s okay to cry, it’s okay to shake,\nYou’re still strong with every step you take.\nTell someone, don’t stay quiet,\nYour voice matters—don’t deny it.\nYou’re not to blame, you did no wrong,\nYou’re still brave, you’re still strong.\nTell someone, let it be known,\nYou are never, ever alone.\n' }
  },
  // ─── Junior: Emotional Wellbeing and Mental Health (c36) ───
  'c36': {
    lessons: [
      // Lesson 0: Understanding Your Feelings
      {
        title: 'Understanding Your Feelings',
        file: 'Junior Songs and Lyrics/Course 6/Understanding Your Feelings.mp3',
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
        file: 'Junior Songs and Lyrics/Course 6/Dealing with Stress and Worry.mp3',
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
        file: 'Junior Songs and Lyrics/Course 6/Helping Friends Who Are Struggling.mp3',
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
        file: 'Junior Songs and Lyrics/Course 6/When to Ask for Help and Who to Talk To.mp3',
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
      file: 'Junior Songs and Lyrics/Course 6/Remember This Course 6 (1).mp3',
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
        file: 'Junior Songs and Lyrics/Course 7/How Fires Start and How to Prevent Them.mp3',
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
        file: 'Junior Songs and Lyrics/Course 7/Escape Plans and Getting Out Safely.mp3',
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
        file: 'Junior Songs and Lyrics/Course 7/Burns, Clothes on Fire, and First Response.mp3',
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
        file: 'Junior Songs and Lyrics/Course 7/Home Hazards and Keeping Your Family Safe.mp3',
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
      file: 'Junior Songs and Lyrics/Course 7/Remember this Course 7.mp3',
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
        file: 'Course 6/What is a Fire and What Does a Smoke Alarm Do_.mp3',
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
        file: 'Course 6/Getting Out of Your Home Safely.mp3',
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
        file: 'Course 6/What to Do if Your Clothes Catch Fire.mp3',
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
        file: 'Course 6/Staying Safe at Home.mp3',
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
      file: 'Course 6/Remember This Course 6.mp3',
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
};


export default SONGS
