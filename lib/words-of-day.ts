export interface ThaiWord {
  thai: string;
  romanization: string;
  meaning: string;
  funFact: string;
  emoji: string;
}

/*
 * CONTENT RULE — words-of-day.ts
 * This list appears on the Parents' Tips blog page and in the kids app.
 * Every word must be:
 *   ✅ Safe for children aged 4-10
 *   ✅ Funny or surprising — but from the word's literal meaning, NOT adult concepts
 *   ❌ No words related to alcohol, dating, romance, violence, politics
 *   ❌ No slang that parents would find uncomfortable explaining to a 6-year-old
 * If in doubt, remove the word.
 */

export const WORDS_OF_DAY: ThaiWord[] = [
  { thai: 'ผีเสื้อ',    romanization: 'phǐi sûea',    meaning: 'Butterfly',           funFact: 'Literally: "ghost shirt" 👻',                    emoji: '🦋' },
  { thai: 'หนังสือ',    romanization: 'nǎng-sǔu',     meaning: 'Book',                funFact: 'Literally: "skin-communicate" 🤔',               emoji: '📚' },
  { thai: 'น้ำตาล',    romanization: 'náam dtaan',    meaning: 'Sugar',               funFact: 'Literally: "water sugar" 💧',                    emoji: '🍬' },
  { thai: 'มือถือ',     romanization: 'muu thǔu',     meaning: 'Mobile phone',        funFact: 'Literally: "holding hand" 🤝',                   emoji: '📱' },
  { thai: 'รถไฟ',      romanization: 'rót fai',      meaning: 'Train',               funFact: 'Literally: "fire vehicle" 🔥',                   emoji: '🚂' },
  { thai: 'ไฟฉาย',     romanization: 'fai chǎai',    meaning: 'Flashlight',          funFact: 'Literally: "pointing fire" 🕯️',                  emoji: '🔦' },
  { thai: 'หัวใจ',     romanization: 'hǔa jai',      meaning: 'Heart',               funFact: 'Literally: "head heart" 🤯',                     emoji: '❤️' },
  { thai: 'หน้าตาย',   romanization: 'nâa dtaai',    meaning: 'Poker face',          funFact: 'Literally: "dead face" 💀',                      emoji: '😐' },
  { thai: 'ปวดตับ',    romanization: 'bpùat dtàp',   meaning: 'Secondhand embarrassment', funFact: '"Liver ache" — liver = emotions in Thai!',  emoji: '😬' },
  { thai: 'ฟิน',       romanization: 'fin',           meaning: 'Feeling blissful',    funFact: 'Borrowed from English "find" and totally reinvented 😍', emoji: '🥰' },
  { thai: 'ไม่เป็นไร', romanization: 'mâi bpen rai', meaning: 'Never mind!',         funFact: 'Most used phrase in Thailand 🙏',                emoji: '🤷' },
  { thai: 'แอ๊บแบ๊ว',  romanization: 'ɛ́ɛb bɛ́ɛo',   meaning: 'Fake cute / pretending', funFact: 'Acting innocent when you\'re totally not 🙄', emoji: '😇' },
  { thai: 'คิดถึง',    romanization: 'khít thǔng',   meaning: 'To miss someone',     funFact: '"Think until reach" — how poetic 💭',            emoji: '🌙' },
  { thai: 'ตาแมว',     romanization: 'dtaa mæw',     meaning: 'Road reflector',      funFact: 'Literally: "cat eye" 🐱',                        emoji: '🚦' },
  { thai: 'น้ำใจ',     romanization: 'náam jai',     meaning: 'Kindness',            funFact: 'Literally: "water of the heart" 💙',             emoji: '💙' },
  { thai: 'สบายดี',    romanization: 'sà-baai dii',  meaning: 'I\'m fine / comfortable', funFact: 'Sà-baai alone = totally relaxed ☁️',        emoji: '😊' },
  { thai: 'ขี้เกียจ',  romanization: 'khîi gìat',    meaning: 'Lazy',                funFact: 'Literally: "poop-lazy" — very expressive 😴',   emoji: '😴' },
  { thai: 'หมาหัวแก้ว', romanization: 'mǎa hǔa gâew', meaning: 'Gullible person',   funFact: 'Literally: "crystal-headed dog" — oops! 🐕',    emoji: '🐕' },
  { thai: 'น้ำลาย',    romanization: 'náam laai',    meaning: 'Saliva',              funFact: 'Literally: "flowing water" — kids find this hilarious 💦', emoji: '💦' },
  { thai: 'กบในกะลา',  romanization: 'gop nai gà-laa', meaning: 'Narrow-minded',    funFact: '"Frog under a coconut shell" — can\'t see the world! 🐸', emoji: '🐸' },
];

export function getWordOfDay(): ThaiWord {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return WORDS_OF_DAY[dayOfYear % WORDS_OF_DAY.length];
}
