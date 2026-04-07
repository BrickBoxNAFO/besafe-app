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
      { title: '', file: '', lyrics: '' },
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Junior: Anti-Bullying (c2) ───
  'c2': {
    lessons: [
      { title: '', file: '', lyrics: '' },
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Junior: Online Safety (c3) ───
  'c3': {
    lessons: [
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Junior: Stranger Danger (c4) ───
  'c4': {
    lessons: [
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Junior: Body Safety (c5) ───
  'c5': {
    lessons: [
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

}

export default SONGS
