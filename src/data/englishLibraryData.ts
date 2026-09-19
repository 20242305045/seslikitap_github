import { LibraryItem } from '../types';

export const EN_LIBRARY_ITEMS: LibraryItem[] = [
  // ================= 1. PHILOSOPHY & THOUGHT (4 Books) =================
  {
    id: 'book-simyaci',
    type: 'audiobook',
    title: 'The Alchemist',
    authorOrHost: 'Paulo Coelho',
    narrator: 'Jeremy Irons',
    category: 'Philosophy & Thought',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-600/40 via-orange-950 to-neutral-950',
    rating: 4.9,
    totalDurationFormatted: '4h 15m',
    totalDurationSeconds: 15300,
    description: 'The mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him through the Egyptian pyramids, teaching him the essential wisdom of listening to our hearts and reading omens.',
    chapters: [
      {
        id: 'ch-s-1',
        number: 1,
        title: 'Chapter 1: The Andalusian Plains & The Dream',
        durationSeconds: 320,
        formattedDuration: '05:20',
        summary: 'Santiago awakens in an abandoned sacristy beneath a sycamore tree and resolves to decipher his recurring dream.',
        script: 'Santiago arrived with his herd at an abandoned church as dusk was falling. The roof had fallen in long ago, and an enormous sycamore had grown on the spot where the sacristy had once stood. When he fell asleep, he dreamed the same dream again: a child took his hands and transported him to the Egyptian pyramids. "If you come here," the child whispered, "you will find a hidden treasure." Santiago sensed this was an undeniable omen of his Personal Legend.'
      },
      {
        id: 'ch-s-2',
        number: 2,
        title: 'Chapter 2: Melchizedek and the Soul of the World',
        durationSeconds: 410,
        formattedDuration: '06:50',
        summary: 'Encounter with the King of Salem in Tarifa square; discovering the stones Urim and Thummim.',
        script: 'The old man drew with a stick in the sand the names of Santiago\'s parents and secrets the boy had never uttered to anyone. "I am the King of Salem," he proclaimed. "At a certain point in our lives, we lose control of what\'s happening to us, and our lives become controlled by fate. That\'s the world\'s greatest lie. When you truly want something, all the universe conspires in helping you to achieve it."'
      },
      {
        id: 'ch-s-3',
        number: 3,
        title: 'Chapter 3: The Sahara Desert & The Alchemist\'s Teaching',
        durationSeconds: 480,
        formattedDuration: '08:00',
        summary: 'Meeting Fatima at the oasis, enduring the sandstorm, and learning to converse with the desert wind.',
        script: 'The desert wind was relentless. The Alchemist sat upright upon his white stallion and looked at the boy: "Wherever your heart is, that is where you will find your treasure. Your heart may tremble with fear. Remind it that the fear of suffering is far worse than the suffering itself. And no heart has ever suffered when it goes in search of its dreams."'
      }
    ]
  },
  {
    id: 'book-kendime-dusunceler',
    type: 'audiobook',
    title: 'Meditations',
    authorOrHost: 'Marcus Aurelius',
    narrator: 'Richard Armitage',
    category: 'Philosophy & Thought',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-700/40 via-yellow-950 to-neutral-950',
    rating: 4.92,
    totalDurationFormatted: '3h 45m',
    totalDurationSeconds: 13500,
    description: 'The intimate, profound wartime private journals of the Roman Emperor Marcus Aurelius. Stoic principles on governing emotions, transforming adversity into character, and building an inner citadel of unshakeable peace.',
    chapters: [
      {
        id: 'ch-kd-1',
        number: 1,
        title: 'Book 1: Preparing the Mind at Dawn',
        durationSeconds: 310,
        formattedDuration: '05:10',
        summary: 'Facing the day knowing you will encounter ungrateful and arrogant people, shielded by Stoic virtue.',
        script: 'When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil. But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own. None of them can hurt me.'
      },
      {
        id: 'ch-kd-2',
        number: 2,
        title: 'Book 2: The Inner Citadel and Control of Perception',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Distinguishing between external events and your judgment of them.',
        script: 'You have power over your mind, not outside events. Realize this, and you will find strength. Discard your misperceptions; stop being jerked like a puppet; limit yourself to the present. The happiness of your life depends upon the quality of your thoughts.'
      }
    ]
  },
  {
    id: 'book-boyle-buyurdu-zerdust',
    type: 'audiobook',
    title: 'Thus Spoke Zarathustra',
    authorOrHost: 'Friedrich Nietzsche',
    narrator: 'Ralph Cosham',
    category: 'Philosophy & Thought',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-orange-800/40 via-red-950 to-neutral-950',
    rating: 4.88,
    totalDurationFormatted: '11h 20m',
    totalDurationSeconds: 40800,
    description: 'A poetic philosophical tour de force. Zarathustra descends from the mountain to teach humanity about the Übermensch, the eternal recurrence of the same, and overcoming complacency to achieve greatness.',
    chapters: [
      {
        id: 'ch-bbz-1',
        number: 1,
        title: 'Prologue: Zarathustra\'s Descent from the Mountain',
        durationSeconds: 350,
        formattedDuration: '05:50',
        summary: 'After ten years in contemplation, Zarathustra greets the rising sun and returns to mankind.',
        script: 'When Zarathustra was thirty years old, he left his home and the lake of his home, and went into the mountains. Here he enjoyed his spirit and his solitude, and for ten years did not weary of it. At last his heart turned, and rising one morning with the dawn, he stepped before the sun and said: "You great star! What would your happiness be had you not those for whom you shine?"'
      }
    ]
  },
  {
    id: 'book-sokratin-savunmasi',
    type: 'audiobook',
    title: 'The Apology of Socrates',
    authorOrHost: 'Plato',
    narrator: 'Charlton Griffin',
    category: 'Philosophy & Thought',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-stone-600/40 via-neutral-950 to-neutral-950',
    rating: 4.85,
    totalDurationFormatted: '1h 50m',
    totalDurationSeconds: 6600,
    description: 'Socrates defends his pursuit of truth, virtue, and philosophical inquiry before the Athenian jury. The immortal defense of an examined life against ignorance and dogma.',
    chapters: [
      {
        id: 'ch-ss-1',
        number: 1,
        title: 'Section 1: The Oracle at Delphi and the Gadfly',
        durationSeconds: 290,
        formattedDuration: '04:50',
        summary: 'Socrates explains why the Oracle proclaimed him the wisest man: he knows that he knows nothing.',
        script: 'Men of Athens, I do not know what impression my accusers have made upon you; but they spoke so persuasively that they almost made me forget who I was. And yet they have hardly spoken a word of truth. For I know that I possess no wisdom, neither great nor small. The unexamined life is not worth living.'
      }
    ]
  },

  // ================= 2. CLASSIC LITERATURE (4 Books) =================
  {
    id: 'book-donusum',
    type: 'audiobook',
    title: 'The Metamorphosis',
    authorOrHost: 'Franz Kafka',
    narrator: 'Benedict Cumberbatch',
    category: 'Classic Literature',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-900/40 via-stone-950 to-neutral-950',
    rating: 4.89,
    totalDurationFormatted: '2h 40m',
    totalDurationSeconds: 9600,
    description: 'One morning, Gregor Samsa wakes from uneasy dreams to find himself transformed into a monstrous insect. Kafka\'s devastating allegory of alienation, familial burden, and existential isolation.',
    chapters: [
      {
        id: 'ch-d-1',
        number: 1,
        title: 'Chapter 1: The Awakening of Gregor Samsa',
        durationSeconds: 310,
        formattedDuration: '05:10',
        summary: 'Gregor wakes up transformed into a verminous bug and tries to comprehend his new reality.',
        script: 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. "What has happened to me?" he thought. It wasn\'t a dream.'
      },
      {
        id: 'ch-d-2',
        number: 2,
        title: 'Chapter 2: Locked Doors and Family Horror',
        durationSeconds: 360,
        formattedDuration: '06:00',
        summary: 'The chief clerk arrives; Gregor attempts to speak but emits only a monstrous squeak.',
        script: 'Locking his door was a precaution he had adopted from traveling. Behind the door he could hear his mother\'s frantic pleading and his father\'s rising fury. When Gregor tried to reply, no human words came forth, but a raspy, animalistic sound.'
      }
    ]
  },
  {
    id: 'book-suc-ve-ceza',
    type: 'audiobook',
    title: 'Crime and Punishment',
    authorOrHost: 'Fyodor Dostoevsky',
    narrator: 'Anthony Heald',
    category: 'Classic Literature',
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-red-900/40 via-stone-950 to-neutral-950',
    rating: 4.96,
    totalDurationFormatted: '18h 30m',
    totalDurationSeconds: 66600,
    description: 'In the sweltering streets of Saint Petersburg, impoverished former student Raskolnikov conceives a theory that extraordinary people stand above the moral law. The psychological drama of guilt, pride, and ultimate spiritual redemption.',
    chapters: [
      {
        id: 'ch-sc-1',
        number: 1,
        title: 'Part 1: The Sweltering Streets of Petersburg',
        durationSeconds: 360,
        formattedDuration: '06:00',
        summary: 'Raskolnikov leaves his closet-sized garret and makes a trial visit to the old pawnbroker.',
        script: 'On an exceptionally hot evening early in July a young man came out of the tiny garret in which he lodged in S. Place and walked slowly toward K. Bridge. He had successfully avoided meeting his landlady on the stairs. A horrifying thought was germinating within his mind: "Can an extraordinary human step over moral boundaries for a higher calling?"'
      }
    ]
  },
  {
    id: 'book-yabanci',
    type: 'audiobook',
    title: 'The Stranger',
    authorOrHost: 'Albert Camus',
    narrator: 'Jonathan Davis',
    category: 'Classic Literature',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-900/40 via-stone-900 to-neutral-950',
    rating: 4.87,
    totalDurationFormatted: '3h 10m',
    totalDurationSeconds: 11400,
    description: 'Under the blinding glare of the Algerian sun, Meursault commits an inexplicable murder on the beach. Camus explores the philosophy of the absurd and the courage of refusing to lie about one\'s genuine feelings.',
    chapters: [
      {
        id: 'ch-yab-1',
        number: 1,
        title: 'Chapter 1: Mother Died Today',
        durationSeconds: 300,
        formattedDuration: '05:00',
        summary: 'The funeral at Marengo and the suffocating heat of the Algerian daylight.',
        script: 'Mother died today. Or maybe yesterday, I don\'t know. I had a telegram from the home: "Mother passed away. Funeral tomorrow. Deep sympathies." That doesn\'t mean anything. Maybe it was yesterday. I caught the two o\'clock bus. It was very hot. I ate at Celeste\'s restaurant, as usual.'
      }
    ]
  },
  {
    id: 'book-1984',
    type: 'audiobook',
    title: '1984',
    authorOrHost: 'George Orwell',
    narrator: 'Simon Prebble',
    category: 'Classic Literature',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-slate-800/40 via-neutral-950 to-neutral-950',
    rating: 4.94,
    totalDurationFormatted: '9h 45m',
    totalDurationSeconds: 35100,
    description: 'Winston Smith struggles against the totalitarian omniscience of Big Brother and the Party in Oceania. A terrifying prophecy of surveillance, doublethink, newspeak, and the fight to preserve individual truth.',
    chapters: [
      {
        id: 'ch-1984-1',
        number: 1,
        title: 'Chapter 1: The Clocks Were Striking Thirteen',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'A cold day in April, under the watchful gaze of the telescreen, Winston begins his forbidden diary.',
        script: 'It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions. The hallway smelt of boiled cabbage and old rag mats. On the wall was a poster: BIG BROTHER IS WATCHING YOU.'
      }
    ]
  },

  // ================= 3. PSYCHOLOGY & SELF IMPROVEMENT (4 Books) =================
  {
    id: 'book-atomik-aliskanliklar',
    type: 'audiobook',
    title: 'Atomic Habits',
    authorOrHost: 'James Clear',
    narrator: 'James Clear',
    category: 'Psychology & Self Improvement',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-cyan-800/40 via-teal-950 to-neutral-950',
    rating: 4.95,
    totalDurationFormatted: '5h 35m',
    totalDurationSeconds: 20100,
    description: 'An easy and proven way to build good habits and break bad ones. The monumental impact of 1% daily compounding improvements and system-based identity design.',
    chapters: [
      {
        id: 'ch-ah-1',
        number: 1,
        title: 'Chapter 1: The Surprising Power of Atomic Habits',
        durationSeconds: 330,
        formattedDuration: '05:30',
        summary: 'How 1% improvement each day produces a 37x compounding effect by year\'s end.',
        script: 'It is so easy to overestimate the importance of one defining moment and underestimate the value of making small improvements on a daily basis. If you can get 1% better each day for one year, you will end up thirty-seven times better by the time you\'re done. You do not rise to the level of your goals; you fall to the level of your systems.'
      },
      {
        id: 'ch-ah-2',
        number: 2,
        title: 'Chapter 2: How Habits Shape Your Identity',
        durationSeconds: 380,
        formattedDuration: '06:20',
        summary: 'Identity-based habits: shifting from outcome goals to voting for the person you wish to become.',
        script: 'The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become. Every action you take is a vote for the type of person you wish to be. True behavior change is identity change.'
      }
    ]
  },
  {
    id: 'book-hizli-ve-yavas-dusunme',
    type: 'audiobook',
    title: 'Thinking, Fast and Slow',
    authorOrHost: 'Daniel Kahneman',
    narrator: 'Patrick Egan',
    category: 'Psychology & Self Improvement',
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-indigo-900/40 via-blue-950 to-neutral-950',
    rating: 4.91,
    totalDurationFormatted: '14h 15m',
    totalDurationSeconds: 51300,
    description: 'Nobel laureate Daniel Kahneman reveals the dual machinery of human cognition: System 1 (fast, intuitive, emotional) and System 2 (slow, deliberative, logical).',
    chapters: [
      {
        id: 'ch-hyd-1',
        number: 1,
        title: 'Chapter 1: Two Systems of Mind',
        durationSeconds: 350,
        formattedDuration: '05:50',
        summary: 'System 1 versus System 2: heuristics, cognitive biases, and optical illusions.',
        script: 'System 1 operates automatically and quickly, with little or no effort and no sense of voluntary control. System 2 allocates attention to effortful mental operations, including complex computations. We tend to identify with System 2, but System 1 is the effortless author of many choices and judgments.'
      }
    ]
  },
  {
    id: 'book-insanin-anlam-arayisi',
    type: 'audiobook',
    title: 'Man\'s Search for Meaning',
    authorOrHost: 'Viktor E. Frankl',
    narrator: 'Simon Vance',
    category: 'Psychology & Self Improvement',
    coverImage: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-zinc-700/40 via-neutral-900 to-neutral-950',
    rating: 4.97,
    totalDurationFormatted: '4h 20m',
    totalDurationSeconds: 15600,
    description: 'Psychiatrist Viktor Frankl\'s account of survival in Auschwitz and Dachau, pioneering Logotherapy: human existence finds strength not in pleasure or power, but in purpose.',
    chapters: [
      {
        id: 'ch-iaa-1',
        number: 1,
        title: 'Part 1: Experiences in a Concentration Camp',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Preserving spiritual freedom in the face of despair. "He who has a why to live can bear almost any how."',
        script: 'Everything can be taken from a man but one thing: the last of the human freedoms—to choose one\'s attitude in any given set of circumstances, to choose one\'s own way. In the final analysis, there is no situation that does not contain the opportunity for meaning.'
      }
    ]
  },
  {
    id: 'book-iyi-hissetmek',
    type: 'audiobook',
    title: 'Feeling Good: The New Mood Therapy',
    authorOrHost: 'David D. Burns',
    narrator: 'George Newbern',
    category: 'Psychology & Self Improvement',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-800/40 via-stone-900 to-neutral-950',
    rating: 4.86,
    totalDurationFormatted: '11h 00m',
    totalDurationSeconds: 39600,
    description: 'Cognitive Behavioral Therapy (CBT) handbook for defeating anxiety, depression, and self-doubt by dismantling cognitive distortions like all-or-nothing thinking.',
    chapters: [
      {
        id: 'ch-ih-1',
        number: 1,
        title: 'Chapter 1: You Feel the Way You Think',
        durationSeconds: 320,
        formattedDuration: '05:20',
        summary: 'Thoughts create feelings: recognizing automatic negative thoughts.',
        script: 'The first principle of cognitive therapy is that all your moods are created by your thoughts or cognitions. When you feel depressed or anxious, it is because you are harboring negative thoughts. Learn to challenge them with objective evidence.'
      }
    ]
  },

  // ================= 4. SCI-FI & FUTURE (4 Books) =================
  {
    id: 'book-dune',
    type: 'audiobook',
    title: 'Dune',
    authorOrHost: 'Frank Herbert',
    narrator: 'Scott Brick & Orlagh Cassidy',
    category: 'Sci-Fi & Future',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-600/40 via-yellow-950 to-neutral-950',
    rating: 4.98,
    totalDurationFormatted: '21h 02m',
    totalDurationSeconds: 75720,
    description: 'The epic saga of Paul Atreides on Arrakis, the harsh desert planet that is the universe\'s sole source of the spice melange. Politics, ecology, religion, and human destiny collide.',
    chapters: [
      {
        id: 'ch-dune-1',
        number: 1,
        title: 'Chapter 1: The Gom Jabbar and the Litany Against Fear',
        durationSeconds: 360,
        formattedDuration: '06:00',
        summary: 'Reverend Mother Gaius Helen Mohiam tests Paul with the box of agony.',
        script: 'The old woman sat in the shadow. "Put your right hand in the box," she commanded. Pain washed up his arm like burning acid. Paul repeated to himself the ancient Bene Gesserit litany: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me."'
      }
    ]
  },
  {
    id: 'book-vakif',
    type: 'audiobook',
    title: 'Foundation',
    authorOrHost: 'Isaac Asimov',
    narrator: 'Scott Brick',
    category: 'Sci-Fi & Future',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-blue-900/40 via-indigo-950 to-neutral-950',
    rating: 4.93,
    totalDurationFormatted: '8h 30m',
    totalDurationSeconds: 30600,
    description: 'Hari Seldon uses the mathematical science of psychohistory to forecast the inevitable fall of the Galactic Empire, establishing the Foundation to shorten thirty thousand years of barbarism to a single millennium.',
    chapters: [
      {
        id: 'ch-vak-1',
        number: 1,
        title: 'Part 1: The Psychohistorians and Trantor',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Gaal Dornick meets Hari Seldon at the metallic heart of the Galactic Empire.',
        script: 'Gaal Dornick stepped out onto the balcony of the Imperial Palace on Trantor. Seldon smiled coldly: "The Empire will die, Dornick. Not today, not tomorrow, but within three centuries. And after it falls, thirty thousand years of chaos will reign. Our mission is to preserve the spark of human knowledge."'
      }
    ]
  },
  {
    id: 'book-cesur-yeni-dunya',
    type: 'audiobook',
    title: 'Brave New World',
    authorOrHost: 'Aldous Huxley',
    narrator: 'Michael York',
    category: 'Sci-Fi & Future',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-purple-900/40 via-slate-950 to-neutral-950',
    rating: 4.9,
    totalDurationFormatted: '8h 00m',
    totalDurationSeconds: 28800,
    description: 'A technologically orchestrated utopia where humans are bred in test tubes, conditioned for social castes, and kept placated with soma. John the Savage dares to question a society devoid of grief, art, and genuine love.',
    chapters: [
      {
        id: 'ch-cyd-1',
        number: 1,
        title: 'Chapter 1: Central London Hatchery and Conditioning',
        durationSeconds: 310,
        formattedDuration: '05:10',
        summary: 'Community, Identity, Stability: the assembly-line manufacture of human beings.',
        script: 'A squat grey building of only thirty-four storeys. Over the main entrance the words: CENTRAL LONDON HATCHERY AND CONDITIONING CENTRE, and, in a shield, the World State\'s motto: COMMUNITY, IDENTITY, STABILITY. Here, embryos were conditioned to love the unavoidable destiny chosen for them.'
      }
    ]
  },
  {
    id: 'book-otostopcunun-galaksi-rehberi',
    type: 'audiobook',
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    authorOrHost: 'Douglas Adams',
    narrator: 'Stephen Fry',
    category: 'Sci-Fi & Future',
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-teal-800/40 via-emerald-950 to-neutral-950',
    rating: 4.88,
    totalDurationFormatted: '5h 50m',
    totalDurationSeconds: 21000,
    description: 'Arthur Dent is rescued from Earth seconds before its demolition for a hyperspace bypass. Armed with a towel and the Guide—with its friendly advice "DON\'T PANIC"—he navigates the absurd universe.',
    chapters: [
      {
        id: 'ch-og-1',
        number: 1,
        title: 'Chapter 1: Yellow Bulldozers and Vogon Fleets',
        durationSeconds: 300,
        formattedDuration: '05:00',
        summary: 'Arthur lies in the mud in front of a bulldozer, unaware the Vogons are about to arrive.',
        script: 'The house stood on a slight rise just on the edge of the village. Arthur Dent lay in the mud in front of a yellow bulldozer that was attempting to demolish his home. Seconds later, Ford Prefect arrived, holding a towel and announcing that the entire planet had only twelve minutes left to live.'
      }
    ]
  },

  // ================= 5. SCIENCE & POPULAR SCIENCE (4 Books) =================
  {
    id: 'book-zamanin-kisa-tarihi',
    type: 'audiobook',
    title: 'A Brief History of Time',
    authorOrHost: 'Stephen Hawking',
    narrator: 'Michael Jackson',
    category: 'Science & Popular Science',
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-violet-900/40 via-neutral-950 to-neutral-950',
    rating: 4.92,
    totalDurationFormatted: '5h 45m',
    totalDurationSeconds: 20700,
    description: 'From the Big Bang to Black Holes, Stephen Hawking guides us through space and time, the nature of gravity, quantum mechanics, and the elusive Theory of Everything.',
    chapters: [
      {
        id: 'ch-zkt-1',
        number: 1,
        title: 'Chapter 1: Our Picture of the Universe',
        durationSeconds: 330,
        formattedDuration: '05:30',
        summary: 'From Aristotle and Ptolemy to Galileo, Newton, and Hubble\'s expanding cosmos.',
        script: 'A well-known scientist once gave a public lecture on astronomy. At the end of the lecture, a little old lady at the back said: "What you have told us is rubbish. The world is really a flat plate supported on the back of a giant tortoise." Hawking asks: How do we know what we know, and where did the universe originate?'
      }
    ]
  },
  {
    id: 'book-kozmos',
    type: 'audiobook',
    title: 'Cosmos',
    authorOrHost: 'Carl Sagan',
    narrator: 'LeVar Burton & Neil deGrasse Tyson',
    category: 'Science & Popular Science',
    coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-600/40 via-purple-950 to-neutral-950',
    rating: 4.99,
    totalDurationFormatted: '14h 30m',
    totalDurationSeconds: 52200,
    description: 'Carl Sagan\'s magnificent journey through 15 billion years of cosmic evolution. "The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself."',
    chapters: [
      {
        id: 'ch-koz-1',
        number: 1,
        title: 'Chapter 1: The Shores of the Cosmic Ocean',
        durationSeconds: 380,
        formattedDuration: '06:20',
        summary: 'Standing on the shore of the vast cosmic ocean, exploring the cosmic calendar.',
        script: 'The Cosmos is all that is or ever was or ever will be. Our feeblest contemplations of the Cosmos stir us—there is a tingling in the spine, a catch in the voice, a faint sensation, as if a distant memory, of falling from a height. We know we are approaching the greatest of mysteries.'
      }
    ]
  },
  {
    id: 'book-gen-bencil-midir',
    type: 'audiobook',
    title: 'The Selfish Gene',
    authorOrHost: 'Richard Dawkins',
    narrator: 'Richard Dawkins & Lalla Ward',
    category: 'Science & Popular Science',
    coverImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-800/40 via-teal-950 to-neutral-950',
    rating: 4.88,
    totalDurationFormatted: '16h 10m',
    totalDurationSeconds: 58200,
    description: 'Dawkins\' gene-centered view of evolution: organisms are survival machines blindly programmed to preserve the selfish molecules known as genes. Coining the revolutionary concept of "memes".',
    chapters: [
      {
        id: 'ch-gb-1',
        number: 1,
        title: 'Chapter 1: Why Are People?',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Intelligent life comes of age when it first deduces the reason for its own existence.',
        script: 'We are survival machines—robot vehicles blindly programmed to preserve the selfish molecules known as genes. This is a truth which still fills me with astonishment. Although it has been known for years, I never seem to get fully used to it.'
      }
    ]
  },
  {
    id: 'book-beyin-senin-hikayen',
    type: 'audiobook',
    title: 'The Brain: The Story of You',
    authorOrHost: 'David Eagleman',
    narrator: 'David Eagleman',
    category: 'Science & Popular Science',
    coverImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-rose-900/40 via-purple-950 to-neutral-950',
    rating: 4.93,
    totalDurationFormatted: '8h 15m',
    totalDurationSeconds: 29700,
    description: 'Neuroscientist David Eagleman unlocks the mystery of who we are: consciousness, sensory perception, decision-making, and how eighty-six billion neurons construct our reality.',
    chapters: [
      {
        id: 'ch-bsh-1',
        number: 1,
        title: 'Chapter 1: Who Am I?',
        durationSeconds: 320,
        formattedDuration: '05:20',
        summary: 'How early childhood brain wiring shapes identity and the electro-chemical dance of reality.',
        script: 'Locked in a dark, silent vault with no direct contact with the outside world, your brain gathers electrical spikes from sensory receptors and synthesizes your vibrant, colorful experience of reality. You are your connectome.'
      }
    ]
  },

  // ================= 6. HISTORY & BIOGRAPHY (4 Books/Podcasts) =================
  {
    id: 'book-sapiens',
    type: 'audiobook',
    title: 'Sapiens: A Brief History of Humankind',
    authorOrHost: 'Yuval Noah Harari',
    narrator: 'Derek Perkins',
    category: 'History & Biography',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-800/40 via-stone-900 to-neutral-950',
    rating: 4.96,
    totalDurationFormatted: '15h 18m',
    totalDurationSeconds: 55080,
    description: 'From an insignificant ape in East Africa to master of planet Earth: how the Cognitive, Agricultural, and Scientific Revolutions shaped human civilization through shared fictions.',
    chapters: [
      {
        id: 'ch-sap-1',
        number: 1,
        title: 'Chapter 1: An Animal of No Significance',
        durationSeconds: 350,
        formattedDuration: '05:50',
        summary: '100,000 years ago, at least six different human species roamed the Earth. Only Sapiens survived.',
        script: 'One hundred thousand years ago, Earth was inhabited by at least six distinct species of humans. The most important thing to know about prehistoric humans is that they were insignificant animals with no more impact on their environment than gorillas, fireflies or jellyfish.'
      }
    ]
  },
  {
    id: 'book-tufek-mikrop-celik',
    type: 'audiobook',
    title: 'Guns, Germs, and Steel',
    authorOrHost: 'Jared Diamond',
    narrator: 'Doug Ordunio',
    category: 'History & Biography',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-stone-700/40 via-amber-950 to-neutral-950',
    rating: 4.89,
    totalDurationFormatted: '16h 40m',
    totalDurationSeconds: 60000,
    description: 'Pulitzer Prize-winning analysis of why Eurasian civilizations conquered others: geographical axes, plant and animal domestication, and environmental determinism rather than biological superiority.',
    chapters: [
      {
        id: 'ch-tmc-1',
        number: 1,
        title: 'Prologue: Yali\'s Question',
        durationSeconds: 330,
        formattedDuration: '05:30',
        summary: '"Why is it that you white people developed so much cargo, but we New Guineans had little cargo of our own?"',
        script: 'In July 1972, while walking along a beach on the tropical island of New Guinea, a charismatic local politician named Yali asked me a simple, startling question: Why did history unfold so differently on different continents?'
      }
    ]
  },
  {
    id: 'book-steve-jobs',
    type: 'audiobook',
    title: 'Steve Jobs',
    authorOrHost: 'Walter Isaacson',
    narrator: 'Dylan Baker',
    category: 'History & Biography',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-zinc-700/40 via-stone-900 to-neutral-950',
    rating: 4.93,
    totalDurationFormatted: '16h 45m',
    totalDurationSeconds: 60300,
    description: 'The exclusive, definitive biography of the creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries.',
    chapters: [
      {
        id: 'ch-sj-1',
        number: 1,
        title: 'Chapter 1: Childhood in Silicon Valley',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Adoptive parents, garage tinkering, and the philosophy of unseen craftsmanship.',
        script: 'Steve Jobs stood at the intersection of humanities and sciences. His father Paul taught him that when building a dresser, the back of the cabinet should be made of the finest wood, even if no one will ever see it. A true craftsman cares about perfection everywhere.'
      }
    ]
  },
  {
    id: 'book-leonardo-da-vinci',
    type: 'audiobook',
    title: 'Leonardo da Vinci: The Biography of a Genius',
    authorOrHost: 'Walter Isaacson',
    narrator: 'Alfred Molina',
    category: 'History & Biography',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-800/40 via-stone-900 to-neutral-950',
    rating: 4.88,
    totalDurationFormatted: '14h 20m',
    totalDurationSeconds: 51600,
    description: 'The master of the Mona Lisa and The Last Supper: anatomical breakthroughs, flying machines, and unquenchable childlike curiosity.',
    chapters: [
      {
        id: 'ch-ldv-1',
        number: 1,
        title: 'Chapter 1: Relentless Curiosity & The Woodpecker\'s Tongue',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'From Florentine workshops to notebook margins, the mind that observed everything.',
        script: 'In the margins of his notebook, Leonardo da Vinci wrote a reminder: "Describe the tongue of the woodpecker." What made Leonardo history\'s greatest polymath was this pure, playful curiosity about everyday mysteries.'
      }
    ]
  },

  // ================= 7. PODCASTS (DIVERSE CATEGORIES) =================
  {
    id: 'podcast-tekno-ai',
    type: 'podcast',
    title: 'The AI Revolution & Singularity',
    authorOrHost: 'Dr. Sarah Lin & Marc Vance',
    category: 'Technology & AI',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-cyan-900/40 via-blue-950 to-neutral-950',
    rating: 4.93,
    totalDurationFormatted: '24 Episodes • 18h',
    totalDurationSeconds: 64800,
    description: 'Artificial General Intelligence (AGI), autonomous agents, neural scaling laws, and the cognitive leap transforming human potential.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Episode 24: Human Cognition at the AGI Threshold',
    chapters: [
      {
        id: 'ch-pod-ai-1',
        number: 24,
        title: 'Episode 24: Human Cognition at the AGI Threshold',
        durationSeconds: 390,
        formattedDuration: '06:30',
        releaseDate: 'Today',
        isNew: true,
        summary: 'Moving from rote automation to intuitive chain-of-thought reasoning.',
        script: 'Welcome to The AI Revolution. Today, multimodal architectures are no longer just predictive models; they are active thinking partners capable of simulating multifaceted scientific queries.'
      }
    ]
  },
  {
    id: 'podcast-zihin-norobilim',
    type: 'podcast',
    title: 'Boundaries of the Mind & Neuroscience',
    authorOrHost: 'Dr. Andrew Huberman & Dr. Kerem',
    category: 'Science & Neuroscience',
    coverImage: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-indigo-950 via-purple-950 to-neutral-950',
    rating: 4.96,
    totalDurationFormatted: '18 Episodes • 14h',
    totalDurationSeconds: 50400,
    description: 'Neuroplasticity, dopamine regulation, deep focus, and circadian mastery for peak human performance.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Episode 18: Digital Distraction & The Focus Revolution',
    chapters: [
      {
        id: 'ch-pod-zn-1',
        number: 18,
        title: 'Episode 18: Digital Distraction & The Focus Revolution',
        durationSeconds: 380,
        formattedDuration: '06:20',
        releaseDate: 'Today',
        isNew: true,
        summary: 'Taming fragmented attention and training deep cortical focus.',
        script: 'Every notification triggers micro-spikes of dopamine that fracture the prefrontal cortex. Unbroken listening and deliberate stillness restore cognitive stamina.'
      }
    ]
  },
  {
    id: 'podcast-tarih-antik',
    type: 'podcast',
    title: 'Lost Civilizations & Ancient Mysteries',
    authorOrHost: 'Prof. Julian Brooks & Maya Thorne',
    category: 'History & Ancient Civilizations',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-900/40 via-yellow-950 to-neutral-950',
    rating: 4.95,
    totalDurationFormatted: '16 Episodes • 15h',
    totalDurationSeconds: 54000,
    description: 'From Göbekli Tepe to the Great Library of Alexandria, probing the monumental archaeological discoveries of antiquity.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Episode 16: Göbekli Tepe: The Dawn of Sacred Megaliths',
    chapters: [
      {
        id: 'ch-pod-ta-1',
        number: 16,
        title: 'Episode 16: Göbekli Tepe: The Dawn of Sacred Megaliths',
        durationSeconds: 395,
        formattedDuration: '06:35',
        releaseDate: 'Yesterday',
        isNew: true,
        summary: 'How 12,000-year-old hunter-gatherers engineered monumental stone observatories before agriculture.',
        script: 'Göbekli Tepe overturned the entire chronology of human civilization. Religion and sacred gatherings catalyzed urbanization, not the other way around.'
      }
    ]
  },
  {
    id: 'podcast-psikoloji-iliskiler',
    type: 'podcast',
    title: 'The Inner Compass: Attachment & Relationships',
    authorOrHost: 'Dr. Clara Hastings & Eric Cole',
    category: 'Psychology & Relationships',
    coverImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-rose-900/40 via-pink-950 to-neutral-950',
    rating: 4.91,
    totalDurationFormatted: '22 Episodes • 16h',
    totalDurationSeconds: 57600,
    description: 'Attachment theory, childhood blueprints, compassionate boundary setting, and cultivating secure romantic bonds.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Episode 22: The Graceful Art of Setting Boundaries',
    chapters: [
      {
        id: 'ch-pod-psi-1',
        number: 22,
        title: 'Episode 22: The Graceful Art of Setting Boundaries',
        durationSeconds: 375,
        formattedDuration: '06:15',
        releaseDate: 'Today',
        isNew: true,
        summary: 'Overcoming fear of abandonment and learning that saying no is an act of deep self-love.',
        script: 'Saying no without guilt is the cornerstone of psychological safety. We explore how early childhood narratives shape your relational blueprint.'
      }
    ]
  },
  {
    id: 'podcast-girisimcilik-finans',
    type: 'podcast',
    title: 'Bootstrapped to Billions: Financial Freedom',
    authorOrHost: 'David Sterling & Elena Ramos',
    category: 'Entrepreneurship & Finance',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-900/40 via-teal-950 to-neutral-950',
    rating: 4.89,
    totalDurationFormatted: '30 Episodes • 25h',
    totalDurationSeconds: 90000,
    description: 'Compound interest, automated wealth engines, bootstrapped digital ventures, and navigating volatile market cycles.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Episode 30: The 4 Laws of Generational Wealth',
    chapters: [
      {
        id: 'ch-pod-fin-1',
        number: 30,
        title: 'Episode 30: The 4 Laws of Generational Wealth',
        durationSeconds: 385,
        formattedDuration: '06:25',
        releaseDate: 'New',
        isNew: true,
        summary: 'Harnessing the leverage of time and productive assets to decouple income from hours.',
        script: 'Financial independence is not about conspicuous consumption; it is the radical sovereignty of owning your calendar completely.'
      }
    ]
  },
  {
    id: 'podcast-suc-kriminal',
    type: 'podcast',
    title: 'Dark Dossiers & Forensic Psychology',
    authorOrHost: 'Detective Mark Sloan & Dr. Evelyn Vance',
    category: 'True Crime & Forensics',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-zinc-900/50 via-neutral-950 to-black',
    rating: 4.97,
    totalDurationFormatted: '20 Episodes • 17h',
    totalDurationSeconds: 61200,
    description: 'Unresolved cold cases, investigative genetic genealogy, criminal profiling, and the forensics that crack historic mysteries.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Episode 20: The Zodiac Cyphers Decoded',
    chapters: [
      {
        id: 'ch-pod-suc-1',
        number: 20,
        title: 'Episode 20: The Zodiac Cyphers Decoded',
        durationSeconds: 410,
        formattedDuration: '06:50',
        releaseDate: 'New',
        isNew: true,
        summary: 'How international cryptographers cracked the 340-character cipher after 51 years.',
        script: 'Forensic psychology reveals the perpetrator\'s obsession with control and notoriety. Every cipher left behind was a behavioral fingerprint.'
      }
    ]
  },
  {
    id: 'podcast-saglik-biyohack',
    type: 'podcast',
    title: 'Biohack & The Longevity Code',
    authorOrHost: 'Dr. Peter Vance & Nutritionist Lila Green',
    category: 'Health & Biohacking',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-teal-900/40 via-emerald-950 to-neutral-950',
    rating: 4.88,
    totalDurationFormatted: '19 Episodes • 14h',
    totalDurationSeconds: 50400,
    description: 'Cellular autophagy, circadian biology, intermittent fasting, cold thermogenesis, and optimizing mitochondrial vitality.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Episode 19: Circadian Alignment & Deep Sleep Architecture',
    chapters: [
      {
        id: 'ch-pod-sag-1',
        number: 19,
        title: 'Episode 19: Circadian Alignment & Deep Sleep Architecture',
        durationSeconds: 380,
        formattedDuration: '06:20',
        releaseDate: 'Today',
        isNew: true,
        summary: 'Morning photon exposure and its profound impact on nightly restorative sleep cycles.',
        script: 'Early morning sunlight hits retinal ganglion cells to set your central circadian clock, enhancing nighttime melatonin synthesis.'
      }
    ]
  },
  {
    id: 'podcast-kultur-sinema',
    type: 'podcast',
    title: 'Behind the Lens: Cinema & Visual Culture',
    authorOrHost: 'Julian Ray & Claire Fontaine',
    category: 'Culture & Cinema',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-red-950/40 via-neutral-900 to-neutral-950',
    rating: 4.87,
    totalDurationFormatted: '25 Episodes • 21h',
    totalDurationSeconds: 75600,
    description: 'Master directors, practical cinematography versus CGI, non-linear screenplay craft, and modern auteur theory.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Episode 25: Christopher Nolan and the Geometry of Time',
    chapters: [
      {
        id: 'ch-pod-ks-1',
        number: 25,
        title: 'Episode 25: Christopher Nolan and the Geometry of Time',
        durationSeconds: 390,
        formattedDuration: '06:30',
        releaseDate: 'Yesterday',
        isNew: true,
        summary: 'From Memento to Interstellar, analyzing the mechanics of temporal manipulation on celluloid.',
        script: 'For Nolan, time is the ultimate cinematic canvas. Inception and Oppenheimer illustrate his mastery of parallel cross-cutting.'
      }
    ]
  },
  {
    id: 'podcast-felsefe-varolus',
    type: 'podcast',
    title: 'Socrates\' Café & The Search for Meaning',
    authorOrHost: 'Prof. Alan Ward & Sophie Bennett',
    category: 'Philosophy & Existentialism',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-800/40 via-orange-950 to-neutral-950',
    rating: 4.94,
    totalDurationFormatted: '21 Episodes • 19h',
    totalDurationSeconds: 68400,
    description: 'Stoic practices for modern resilience, existentialist philosophy from Camus to Sartre, and crafting purpose in an indifferent cosmos.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Episode 21: Stoic Equanimity: The Dichotomy of Control',
    chapters: [
      {
        id: 'ch-pod-fel-1',
        number: 21,
        title: 'Episode 21: Stoic Equanimity: The Dichotomy of Control',
        durationSeconds: 385,
        formattedDuration: '06:25',
        releaseDate: 'Today',
        isNew: true,
        summary: 'Epictetus\' foundational insight for cultivating serene inner citadel amidst outer turbulence.',
        script: 'Epictetus reminds us that peace begins the moment you distinguish between what is in your control and what is not.'
      }
    ]
  }
];
