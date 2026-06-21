export type Trait =
  | "courage"
  | "loyalty"
  | "strategy"
  | "compassion"
  | "ambition"
  | "freedom";

export type TraitScores = Record<Trait, number>;
export type Gender = "male" | "female";

export type QuizOption = {
  label: string;
  text: string;
  scores: Partial<TraitScores>;
};

export type Question = {
  prompt: string;
  options: QuizOption[];
};

export type Character = {
  id: string;
  name: string;
  gender: Gender;
  anime: string;
  image: string;
  quote: string;
  personality: string;
  traits: TraitScores;
  accent: string;
};

export const emptyScores: TraitScores = {
  courage: 0,
  loyalty: 0,
  strategy: 0,
  compassion: 0,
  ambition: 0,
  freedom: 0,
};

export const questions: Question[] = [
  {
    prompt: "Your squad gets ambushed during a mission. What do you do first?",
    options: [
      { label: "Charge", text: "Jump in first and pull attention away.", scores: { courage: 4, loyalty: 2 } },
      { label: "Read", text: "Study the enemy pattern before moving.", scores: { strategy: 4, courage: 1 } },
      { label: "Protect", text: "Shield the teammate in the most danger.", scores: { compassion: 4, loyalty: 2 } },
      { label: "Breakout", text: "Create a wild escape route nobody expects.", scores: { freedom: 4, strategy: 1 } },
    ],
  },
  {
    prompt: "Pick the training arc that sounds most like you.",
    options: [
      { label: "Relentless", text: "Day after day until your body catches up.", scores: { courage: 2, ambition: 4 } },
      { label: "Precise", text: "Master one move until it is flawless.", scores: { strategy: 3, ambition: 2 } },
      { label: "Team", text: "Grow with rivals, friends, and mentors.", scores: { loyalty: 3, compassion: 3 } },
      { label: "Solo", text: "Disappear, level up, and return transformed.", scores: { ambition: 4, strategy: 2 } },
    ],
  },
  {
    prompt: "What kind of power would you rather have?",
    options: [
      { label: "Limitless", text: "Overwhelming presence and impossible control.", scores: { ambition: 3, strategy: 2 } },
      { label: "Heart", text: "Strength that gets brighter when others need you.", scores: { compassion: 4, courage: 2 } },
      { label: "Instinct", text: "Raw battle sense and fearless momentum.", scores: { courage: 4, freedom: 2 } },
      { label: "Shadow", text: "Quiet dominance from the edge of the field.", scores: { strategy: 4, ambition: 2 } },
    ],
  },
  {
    prompt: "A friend makes a huge mistake. You...",
    options: [
      { label: "Forgive", text: "Help them recover and make it right.", scores: { compassion: 4, loyalty: 2 } },
      { label: "Challenge", text: "Tell them the truth, even if it stings.", scores: { courage: 2, loyalty: 2 } },
      { label: "Plan", text: "Find the cleanest path through the fallout.", scores: { strategy: 4, compassion: 1 } },
      { label: "Move", text: "Refuse to get trapped by the past.", scores: { freedom: 4, ambition: 1 } },
    ],
  },
  {
    prompt: "Your ideal weekend has...",
    options: [
      { label: "Adventure", text: "A spontaneous trip with no map.", scores: { freedom: 4, courage: 1 } },
      { label: "Practice", text: "Training, competition, and a new personal best.", scores: { ambition: 3, courage: 2 } },
      { label: "Calm", text: "Quiet food, warm people, and small memories.", scores: { compassion: 3, loyalty: 2 } },
      { label: "Focus", text: "A clean room, a clear goal, and no distractions.", scores: { strategy: 4, ambition: 1 } },
    ],
  },
  {
    prompt: "What do people underestimate about you?",
    options: [
      { label: "Drive", text: "How far you will go once you decide.", scores: { ambition: 4, courage: 1 } },
      { label: "Kindness", text: "How much your softness can endure.", scores: { compassion: 4, loyalty: 1 } },
      { label: "Control", text: "How much you notice before you speak.", scores: { strategy: 4 } },
      { label: "Spark", text: "How quickly you can change the room.", scores: { freedom: 3, courage: 2 } },
    ],
  },
  {
    prompt: "Choose your anime rival dynamic.",
    options: [
      { label: "Brotherhood", text: "We clash, but I would protect them always.", scores: { loyalty: 4, courage: 1 } },
      { label: "Benchmark", text: "They force me to become excellent.", scores: { ambition: 4, strategy: 1 } },
      { label: "Chaos", text: "They make everything louder and more fun.", scores: { freedom: 4, courage: 1 } },
      { label: "Mirror", text: "They reveal the parts of me I avoid.", scores: { strategy: 2, compassion: 2 } },
    ],
  },
  {
    prompt: "When pressure spikes, your face says...",
    options: [
      { label: "Smile", text: "This is exactly where I come alive.", scores: { courage: 3, freedom: 2 } },
      { label: "Still", text: "No wasted motion. No panic.", scores: { strategy: 4 } },
      { label: "Fire", text: "I refuse to lose here.", scores: { ambition: 4, courage: 1 } },
      { label: "Warmth", text: "Everyone breathe. We can do this.", scores: { compassion: 4, loyalty: 1 } },
    ],
  },
  {
    prompt: "Which phrase feels most like your main character theme?",
    options: [
      { label: "Protect", text: "No one gets left behind.", scores: { loyalty: 4, compassion: 2 } },
      { label: "Surpass", text: "I can become more than this.", scores: { ambition: 4, courage: 1 } },
      { label: "Explore", text: "The world is too big to stand still.", scores: { freedom: 4, courage: 1 } },
      { label: "Understand", text: "Every answer is hiding in the details.", scores: { strategy: 4, compassion: 1 } },
    ],
  },
  {
    prompt: "Your final battle entrance is...",
    options: [
      { label: "Loud", text: "A promise, a grin, and full speed ahead.", scores: { courage: 4, freedom: 2 } },
      { label: "Silent", text: "One step, one stare, fight already decided.", scores: { strategy: 4, ambition: 2 } },
      { label: "Radiant", text: "Hope arrives with you.", scores: { compassion: 3, loyalty: 3 } },
      { label: "Unstoppable", text: "You trained for this exact moment.", scores: { ambition: 4, courage: 2 } },
    ],
  },
];

export const characters: Character[] = [
  {
    id: "naruto",
    name: "Naruto",
    gender: "male",
    anime: "Naruto",
    image: "https://cdn.myanimelist.net/images/characters/2/284121.jpg",
    quote: "I never go back on my word.",
    personality: "You are stubborn in the best way: hopeful, loyal, loud-hearted, and built to turn setbacks into fuel.",
    traits: { courage: 9, loyalty: 10, strategy: 4, compassion: 8, ambition: 9, freedom: 7 },
    accent: "#FFB6C1",
  },
  {
    id: "luffy",
    name: "Luffy",
    gender: "male",
    anime: "One Piece",
    image: "https://cdn.myanimelist.net/images/characters/9/310307.jpg",
    quote: "Freedom looks good on you.",
    personality: "You chase joy like treasure and make people brave simply by being impossible to cage.",
    traits: { courage: 10, loyalty: 9, strategy: 3, compassion: 7, ambition: 7, freedom: 10 },
    accent: "#3B82F6",
  },
  {
    id: "levi",
    name: "Levi",
    gender: "male",
    anime: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/characters/12/622510.jpg",
    quote: "Choose, then own the outcome.",
    personality: "Composed, exacting, and quietly protective, you bring order to chaos without needing the spotlight.",
    traits: { courage: 8, loyalty: 8, strategy: 10, compassion: 5, ambition: 6, freedom: 3 },
    accent: "#CBA6F7",
  },
  {
    id: "gojo",
    name: "Gojo",
    gender: "male",
    anime: "Jujutsu Kaisen",
    image: "https://cdn.myanimelist.net/images/characters/15/422168.jpg",
    quote: "Confidence is part of the technique.",
    personality: "You are playful, brilliant, and hard to pin down, with a magnetic streak that makes big things feel possible.",
    traits: { courage: 8, loyalty: 6, strategy: 9, compassion: 6, ambition: 9, freedom: 8 },
    accent: "#3B82F6",
  },
  {
    id: "itachi",
    name: "Itachi",
    gender: "male",
    anime: "Naruto",
    image: "https://cdn.myanimelist.net/images/characters/9/284122.jpg",
    quote: "A calm mind can carry heavy things.",
    personality: "You think several moves ahead and love with rare intensity, even when you keep it private.",
    traits: { courage: 7, loyalty: 10, strategy: 10, compassion: 7, ambition: 5, freedom: 2 },
    accent: "#2E2E2E",
  },
  {
    id: "tanjiro",
    name: "Tanjiro",
    gender: "male",
    anime: "Demon Slayer",
    image: "https://cdn.myanimelist.net/images/characters/6/386735.jpg",
    quote: "Gentleness is also strength.",
    personality: "You carry warmth into hard places and prove that empathy can be sharper than any blade.",
    traits: { courage: 8, loyalty: 9, strategy: 6, compassion: 10, ambition: 7, freedom: 4 },
    accent: "#FFB6C1",
  },
  {
    id: "eren",
    name: "Eren",
    gender: "male",
    anime: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/characters/10/216895.jpg",
    quote: "Forward is the only direction.",
    personality: "Intense and uncompromising, you would rather shake the world than accept a future that feels too small.",
    traits: { courage: 9, loyalty: 6, strategy: 5, compassion: 4, ambition: 10, freedom: 9 },
    accent: "#3B82F6",
  },
  {
    id: "goku",
    name: "Goku",
    gender: "male",
    anime: "Dragon Ball",
    image: "https://cdn.myanimelist.net/images/characters/16/618693.jpg",
    quote: "There is always another level.",
    personality: "You meet every challenge with bright energy, appetite, and the belief that growth should feel alive.",
    traits: { courage: 10, loyalty: 7, strategy: 4, compassion: 6, ambition: 10, freedom: 8 },
    accent: "#FFB6C1",
  },
  {
    id: "zoro",
    name: "Zoro",
    gender: "male",
    anime: "One Piece",
    image: "https://cdn.myanimelist.net/images/characters/3/100534.jpg",
    quote: "Discipline is its own compass.",
    personality: "You are loyal, focused, and quietly ferocious, the person others trust when the path gets steep.",
    traits: { courage: 9, loyalty: 9, strategy: 6, compassion: 4, ambition: 9, freedom: 5 },
    accent: "#CBA6F7",
  },
  {
    id: "hinata-shoyo",
    name: "Hinata Shoyo",
    gender: "male",
    anime: "Haikyuu!!",
    image: "https://cdn.myanimelist.net/images/characters/11/243919.jpg",
    quote: "Small wings can still fly high.",
    personality: "You turn enthusiasm into lift, learning fast and making every team feel more awake.",
    traits: { courage: 8, loyalty: 8, strategy: 5, compassion: 7, ambition: 9, freedom: 7 },
    accent: "#FFB6C1",
  },
  {
    id: "frieren",
    name: "Frieren",
    gender: "female",
    anime: "Frieren: Beyond Journey's End",
    image: "https://cdn.myanimelist.net/images/characters/7/525105.jpg",
    quote: "Time makes the small things shine.",
    personality: "Observant and quietly tender, you move at your own pace and notice meaning others hurry past.",
    traits: { courage: 5, loyalty: 7, strategy: 10, compassion: 8, ambition: 4, freedom: 6 },
    accent: "#CBA6F7",
  },
  {
    id: "sung-jin-woo",
    name: "Sung Jin-Woo",
    gender: "male",
    anime: "Solo Leveling",
    image: "https://cdn.myanimelist.net/images/characters/2/540692.jpg",
    quote: "The climb changed you.",
    personality: "You are adaptive, self-possessed, and relentless, with a quiet power that grows under pressure.",
    traits: { courage: 8, loyalty: 6, strategy: 8, compassion: 5, ambition: 10, freedom: 6 },
    accent: "#3B82F6",
  },
];

export function addScores(total: TraitScores, addition: Partial<TraitScores>) {
  return (Object.keys(total) as Trait[]).reduce<TraitScores>(
    (next, trait) => ({
      ...next,
      [trait]: total[trait] + (addition[trait] ?? 0),
    }),
    { ...emptyScores },
  );
}

export function getCharacterMatch(scores: TraitScores, gender: Gender) {
  const traits = Object.keys(scores) as Trait[];
  const highestTraitScore = Math.max(...traits.map((trait) => scores[trait]), 1);
  const profile = traits.reduce<TraitScores>(
    (next, trait) => ({
      ...next,
      [trait]: Math.round((scores[trait] / highestTraitScore) * 10),
    }),
    { ...emptyScores },
  );
  const profileMagnitude = Math.sqrt(
    traits.reduce((sum, trait) => sum + Math.pow(profile[trait], 2), 0),
  );
  const maxPossibleDistance = Math.sqrt(traits.length * 10 * 10);
  const dominantTraits = [...traits]
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 2);

  function tinyTieBreaker(characterId: string) {
    const signature = traits.map((trait) => `${trait}:${scores[trait]}`).join("|");
    const hash = `${signature}:${characterId}`.split("").reduce((sum, char) => {
      return (sum * 31 + char.charCodeAt(0)) % 997;
    }, 7);
    return hash / 99700;
  }

  const eligibleCharacters = characters.filter((character) => character.gender === gender);

  const ranked = eligibleCharacters
    .map((character) => {
      const distance = traits.reduce((sum, trait) => {
        return sum + Math.pow(profile[trait] - character.traits[trait], 2);
      }, 0);
      const characterMagnitude = Math.sqrt(
        traits.reduce((sum, trait) => sum + Math.pow(character.traits[trait], 2), 0),
      );
      const cosineSimilarity =
        traits.reduce((sum, trait) => sum + profile[trait] * character.traits[trait], 0) /
        Math.max(1, profileMagnitude * characterMagnitude);
      const distanceSimilarity = 1 - Math.sqrt(distance) / maxPossibleDistance;
      const dominantAlignment =
        dominantTraits.reduce((sum, trait) => sum + character.traits[trait], 0) /
        (dominantTraits.length * 10);
      const similarity =
        cosineSimilarity * 0.58 +
        distanceSimilarity * 0.34 +
        dominantAlignment * 0.08 +
        tinyTieBreaker(character.id);

      return {
        character,
        percentage: Math.min(99, Math.max(72, Math.round(72 + similarity * 27))),
        similarity,
      };
    })
    .sort((a, b) => b.similarity - a.similarity);

  return ranked[0];
}
