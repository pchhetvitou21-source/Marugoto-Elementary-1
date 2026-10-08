import { KanaCharacter } from '../types/japanese';

export const HIRAGANA_DATA: KanaCharacter[] = [
  // A row
  { char: 'あ', romaji: 'a', type: 'gojuon', row: 'a', column: 'a', strokeCount: 3, audioText: 'あ', mnemonic: 'Looks like an Apple with a stem and swirl.' },
  { char: 'い', romaji: 'i', type: 'gojuon', row: 'a', column: 'i', strokeCount: 2, audioText: 'い', mnemonic: 'Two eels swimming side-by-side.' },
  { char: 'う', romaji: 'u', type: 'gojuon', row: 'a', column: 'u', strokeCount: 2, audioText: 'う', mnemonic: 'Looks like someone being hit in the stomach: "Oof!"' },
  { char: 'え', romaji: 'e', type: 'gojuon', row: 'a', column: 'e', strokeCount: 2, audioText: 'え', mnemonic: 'Looks like an energetic ninja running.' },
  { char: 'お', romaji: 'o', type: 'gojuon', row: 'a', column: 'o', strokeCount: 3, audioText: 'お', mnemonic: 'A golfer swinging a golf ball on a green.' },

  // Ka row
  { char: 'か', romaji: 'ka', type: 'gojuon', row: 'ka', column: 'a', strokeCount: 3, audioText: 'か', mnemonic: 'A kite dancing in the wind.' },
  { char: 'き', romaji: 'ki', type: 'gojuon', row: 'ka', column: 'i', strokeCount: 4, audioText: 'き', mnemonic: 'An antique key.' },
  { char: 'く', romaji: 'ku', type: 'gojuon', row: 'ka', column: 'u', strokeCount: 1, audioText: 'く', mnemonic: 'A cuckoo bird\'s open beak.' },
  { char: 'け', romaji: 'ke', type: 'gojuon', row: 'ka', column: 'e', strokeCount: 3, audioText: 'け', mnemonic: 'A keg of Japanese cider.' },
  { char: 'こ', romaji: 'ko', type: 'gojuon', row: 'ka', column: 'o', strokeCount: 2, audioText: 'こ', mnemonic: 'Two koi fish swimming in parallel.' },

  // Sa row
  { char: 'さ', romaji: 'sa', type: 'gojuon', row: 'sa', column: 'a', strokeCount: 3, audioText: 'さ', mnemonic: 'A hand holding a glass of sake.' },
  { char: 'し', romaji: 'shi', type: 'gojuon', row: 'sa', column: 'i', strokeCount: 1, audioText: 'し', mnemonic: 'A shiny fishing hook in the sea.' },
  { char: 'す', romaji: 'su', type: 'gojuon', row: 'sa', column: 'u', strokeCount: 2, audioText: 'す', mnemonic: 'A spiral sushi roll on a fork.' },
  { char: 'せ', romaji: 'se', type: 'gojuon', row: 'sa', column: 'e', strokeCount: 3, audioText: 'せ', mnemonic: 'A sunset horizon with mountains.' },
  { char: 'そ', romaji: 'so', type: 'gojuon', row: 'sa', column: 'o', strokeCount: 1, audioText: 'そ', mnemonic: 'A zigzag sewing stitch.' },

  // Ta row
  { char: 'た', romaji: 'ta', type: 'gojuon', row: 'ta', column: 'a', strokeCount: 4, audioText: 'た', mnemonic: 'Spells out the letters "ta" in script.' },
  { char: 'ち', romaji: 'chi', type: 'gojuon', row: 'ta', column: 'i', strokeCount: 2, audioText: 'ち', mnemonic: 'A cheerleader waving pom-poms.' },
  { char: 'つ', romaji: 'tsu', type: 'gojuon', row: 'ta', column: 'u', strokeCount: 1, audioText: 'つ', mnemonic: 'A gigantic tidal tsunami wave curling.' },
  { char: 'て', romaji: 'te', type: 'gojuon', row: 'ta', column: 'e', strokeCount: 1, audioText: 'て', mnemonic: 'A dog\'s wagging tail.' },
  { char: 'と', romaji: 'to', type: 'gojuon', row: 'ta', column: 'o', strokeCount: 2, audioText: 'と', mnemonic: 'A tornado touching the earth.' },

  // Na row
  { char: 'な', romaji: 'na', type: 'gojuon', row: 'na', column: 'a', strokeCount: 4, audioText: 'な', mnemonic: 'A nun praying before a cross.' },
  { char: 'に', romaji: 'ni', type: 'gojuon', row: 'na', column: 'i', strokeCount: 3, audioText: 'に', mnemonic: 'A needle threading silk.' },
  { char: 'ぬ', romaji: 'nu', type: 'gojuon', row: 'na', column: 'u', strokeCount: 2, audioText: 'ぬ', mnemonic: 'Chopsticks tangled in ramen noodles.' },
  { char: 'ね', romaji: 'ne', type: 'gojuon', row: 'na', column: 'e', strokeCount: 2, audioText: 'ね', mnemonic: 'A cat with a curled tail (neko).' },
  { char: 'の', romaji: 'no', type: 'gojuon', row: 'na', column: 'o', strokeCount: 1, audioText: 'の', mnemonic: 'A "No entry" circular prohibition sign.' },

  // Ha row
  { char: 'は', romaji: 'ha', type: 'gojuon', row: 'ha', column: 'a', strokeCount: 3, audioText: 'は', mnemonic: 'A person wearing a wide-brim hat.' },
  { char: 'ひ', romaji: 'hi', type: 'gojuon', row: 'ha', column: 'i', strokeCount: 1, audioText: 'ひ', mnemonic: 'He is laughing: "Hee hee!"' },
  { char: 'ふ', romaji: 'fu', type: 'gojuon', row: 'ha', column: 'u', strokeCount: 4, audioText: 'ふ', mnemonic: 'Mount Fuji surrounded by clouds.' },
  { char: 'へ', romaji: 'he', type: 'gojuon', row: 'ha', column: 'e', strokeCount: 1, audioText: 'へ', mnemonic: 'The peak of a steep hill (he).' },
  { char: 'ほ', romaji: 'ho', type: 'gojuon', row: 'ha', column: 'o', strokeCount: 4, audioText: 'ほ', mnemonic: 'A hot horse with a bridle.' },

  // Ma row
  { char: 'ま', romaji: 'ma', type: 'gojuon', row: 'ma', column: 'a', strokeCount: 3, audioText: 'ま', mnemonic: 'An opera singer calling out "Mama!"' },
  { char: 'み', romaji: 'mi', type: 'gojuon', row: 'ma', column: 'i', strokeCount: 2, audioText: 'み', mnemonic: 'Musical note "Mi" (number 21).' },
  { char: 'む', romaji: 'mu', type: 'gojuon', row: 'ma', column: 'u', strokeCount: 3, audioText: 'む', mnemonic: 'A friendly cow mooing: "Mooo!"' },
  { char: 'め', romaji: 'me', type: 'gojuon', row: 'ma', column: 'e', strokeCount: 2, audioText: 'め', mnemonic: 'An almond-shaped eye (me in Japanese).' },
  { char: 'も', romaji: 'mo', type: 'gojuon', row: 'ma', column: 'o', strokeCount: 3, audioText: 'も', mnemonic: 'A hook with two worms to catch more fish.' },

  // Ya row
  { char: 'や', romaji: 'ya', type: 'gojuon', row: 'ya', column: 'a', strokeCount: 3, audioText: 'や', mnemonic: 'A yak with horns looking up.' },
  { char: 'ゆ', romaji: 'yu', type: 'gojuon', row: 'ya', column: 'u', strokeCount: 2, audioText: 'ゆ', mnemonic: 'A unique fish swimming.' },
  { char: 'よ', romaji: 'yo', type: 'gojuon', row: 'ya', column: 'o', strokeCount: 2, audioText: 'よ', mnemonic: 'A child playing with a yo-yo.' },

  // Ra row
  { char: 'ら', romaji: 'ra', type: 'gojuon', row: 'ra', column: 'a', strokeCount: 2, audioText: 'ら', mnemonic: 'A rabbit sitting up.' },
  { char: 'り', romaji: 'ri', type: 'gojuon', row: 'ra', column: 'i', strokeCount: 2, audioText: 'り', mnemonic: 'Two river reeds swaying in water.' },
  { char: 'る', romaji: 'ru', type: 'gojuon', row: 'ra', column: 'u', strokeCount: 1, audioText: 'る', mnemonic: 'A road curving around a loop.' },
  { char: 'れ', romaji: 're', type: 'gojuon', row: 'ra', column: 'e', strokeCount: 2, audioText: 'れ', mnemonic: 'A reindeer leaping forward.' },
  { char: 'ろ', romaji: 'ro', type: 'gojuon', row: 'ra', column: 'o', strokeCount: 1, audioText: 'ろ', mnemonic: 'A round road without the final loop.' },

  // Wa / N row
  { char: 'わ', romaji: 'wa', type: 'gojuon', row: 'wa', column: 'a', strokeCount: 2, audioText: 'わ', mnemonic: 'A swan in the water.' },
  { char: 'を', romaji: 'wo', type: 'gojuon', row: 'wa', column: 'o', strokeCount: 3, audioText: 'を', mnemonic: 'A person cheering "Whoa!" on a cheer team.' },
  { char: 'ん', romaji: 'n', type: 'gojuon', row: 'wa', column: 'n', strokeCount: 1, audioText: 'ん', mnemonic: 'Looks like the cursive English letter "n".' },

  // Dakuten (Voiced)
  { char: 'が', romaji: 'ga', type: 'dakuten', row: 'ga', column: 'a', strokeCount: 5, audioText: 'が' },
  { char: 'ぎ', romaji: 'gi', type: 'dakuten', row: 'ga', column: 'i', strokeCount: 6, audioText: 'ぎ' },
  { char: 'ぐ', romaji: 'gu', type: 'dakuten', row: 'ga', column: 'u', strokeCount: 3, audioText: 'ぐ' },
  { char: 'げ', romaji: 'ge', type: 'dakuten', row: 'ga', column: 'e', strokeCount: 5, audioText: 'げ' },
  { char: 'ご', romaji: 'go', type: 'dakuten', row: 'ga', column: 'o', strokeCount: 4, audioText: 'ご' },

  { char: 'ざ', romaji: 'za', type: 'dakuten', row: 'za', column: 'a', strokeCount: 5, audioText: 'ざ' },
  { char: 'じ', romaji: 'ji', type: 'dakuten', row: 'za', column: 'i', strokeCount: 3, audioText: 'じ' },
  { char: 'ず', romaji: 'zu', type: 'dakuten', row: 'za', column: 'u', strokeCount: 4, audioText: 'ず' },
  { char: 'ぜ', romaji: 'ze', type: 'dakuten', row: 'za', column: 'e', strokeCount: 5, audioText: 'ぜ' },
  { char: 'ぞ', romaji: 'zo', type: 'dakuten', row: 'za', column: 'o', strokeCount: 3, audioText: 'ぞ' },

  { char: 'だ', romaji: 'da', type: 'dakuten', row: 'da', column: 'a', strokeCount: 6, audioText: 'だ' },
  { char: 'ぢ', romaji: 'ji (di)', type: 'dakuten', row: 'da', column: 'i', strokeCount: 4, audioText: 'ぢ' },
  { char: 'づ', romaji: 'zu (du)', type: 'dakuten', row: 'da', column: 'u', strokeCount: 3, audioText: 'づ' },
  { char: 'で', romaji: 'de', type: 'dakuten', row: 'da', column: 'e', strokeCount: 3, audioText: 'で' },
  { char: 'ど', romaji: 'do', type: 'dakuten', row: 'da', column: 'o', strokeCount: 4, audioText: 'ど' },

  { char: 'ば', romaji: 'ba', type: 'dakuten', row: 'ba', column: 'a', strokeCount: 5, audioText: 'ば' },
  { char: 'び', romaji: 'bi', type: 'dakuten', row: 'ba', column: 'i', strokeCount: 3, audioText: 'び' },
  { char: 'ぶ', romaji: 'bu', type: 'dakuten', row: 'ba', column: 'u', strokeCount: 6, audioText: 'ぶ' },
  { char: 'べ', romaji: 'be', type: 'dakuten', row: 'ba', column: 'e', strokeCount: 3, audioText: 'べ' },
  { char: 'ぼ', romaji: 'bo', type: 'dakuten', row: 'ba', column: 'o', strokeCount: 6, audioText: 'ぼ' },

  // Handakuten (Semi-voiced)
  { char: 'ぱ', romaji: 'pa', type: 'handakuten', row: 'pa', column: 'a', strokeCount: 4, audioText: 'ぱ' },
  { char: 'ぴ', romaji: 'pi', type: 'handakuten', row: 'pa', column: 'i', strokeCount: 2, audioText: 'ぴ' },
  { char: 'ぷ', romaji: 'pu', type: 'handakuten', row: 'pa', column: 'u', strokeCount: 5, audioText: 'ぷ' },
  { char: 'ぺ', romaji: 'pe', type: 'handakuten', row: 'pa', column: 'e', strokeCount: 2, audioText: 'ぺ' },
  { char: 'ぽ', romaji: 'po', type: 'handakuten', row: 'pa', column: 'o', strokeCount: 5, audioText: 'ぽ' },

  // Yoon (Digraphs)
  { char: 'きゃ', romaji: 'kya', type: 'yoon', row: 'kya', column: 'a', strokeCount: 7, audioText: 'きゃ' },
  { char: 'きゅ', romaji: 'kyu', type: 'yoon', row: 'kya', column: 'u', strokeCount: 6, audioText: 'きゅ' },
  { char: 'きょ', romaji: 'kyo', type: 'yoon', row: 'kya', column: 'o', strokeCount: 6, audioText: 'きょ' },
  { char: 'しゃ', romaji: 'sha', type: 'yoon', row: 'sha', column: 'a', strokeCount: 4, audioText: 'しゃ' },
  { char: 'しゅ', romaji: 'shu', type: 'yoon', row: 'sha', column: 'u', strokeCount: 3, audioText: 'しゅ' },
  { char: 'しょ', romaji: 'sho', type: 'yoon', row: 'sha', column: 'o', strokeCount: 3, audioText: 'しょ' },
  { char: 'ちゃ', romaji: 'cha', type: 'yoon', row: 'cha', column: 'a', strokeCount: 5, audioText: 'ちゃ' },
  { char: 'ちゅ', romaji: 'chu', type: 'yoon', row: 'cha', column: 'u', strokeCount: 4, audioText: 'ちゅ' },
  { char: 'ちょ', romaji: 'cho', type: 'yoon', row: 'cha', column: 'o', strokeCount: 4, audioText: 'ちょ' },
  { char: 'にゃ', romaji: 'nya', type: 'yoon', row: 'nya', column: 'a', strokeCount: 6, audioText: 'にゃ' },
  { char: 'にゅ', romaji: 'nyu', type: 'yoon', row: 'nya', column: 'u', strokeCount: 5, audioText: 'にゅ' },
  { char: 'にょ', romaji: 'nyo', type: 'yoon', row: 'nya', column: 'o', strokeCount: 5, audioText: 'にょ' },
  { char: 'りゃ', romaji: 'rya', type: 'yoon', row: 'rya', column: 'a', strokeCount: 5, audioText: 'りゃ' },
  { char: 'りゅ', romaji: 'ryu', type: 'yoon', row: 'rya', column: 'u', strokeCount: 4, audioText: 'りゅ' },
  { char: 'りょ', romaji: 'ryo', type: 'yoon', row: 'rya', column: 'o', strokeCount: 4, audioText: 'りょ' },
];

export const KATAKANA_DATA: KanaCharacter[] = [
  // A row
  { char: 'ア', romaji: 'a', type: 'gojuon', row: 'a', column: 'a', strokeCount: 2, audioText: 'ア', mnemonic: 'An axe chipping wood.' },
  { char: 'イ', romaji: 'i', type: 'gojuon', row: 'a', column: 'i', strokeCount: 2, audioText: 'イ', mnemonic: 'An easel holding art.' },
  { char: 'ウ', romaji: 'u', type: 'gojuon', row: 'a', column: 'u', strokeCount: 3, audioText: 'ウ', mnemonic: 'An umbrella handle.' },
  { char: 'エ', romaji: 'e', type: 'gojuon', row: 'a', column: 'e', strokeCount: 3, audioText: 'エ', mnemonic: 'An elevator I-beam support girder.' },
  { char: 'オ', romaji: 'o', type: 'gojuon', row: 'a', column: 'o', strokeCount: 3, audioText: 'オ', mnemonic: 'An Olympic skater performing a spin.' },

  // Ka row
  { char: 'カ', romaji: 'ka', type: 'gojuon', row: 'ka', column: 'a', strokeCount: 2, audioText: 'カ', mnemonic: 'Sharp version of hiragana か.' },
  { char: 'キ', romaji: 'ki', type: 'gojuon', row: 'ka', column: 'i', strokeCount: 3, audioText: 'キ', mnemonic: 'A key with sharp teeth.' },
  { char: 'ク', romaji: 'ku', type: 'gojuon', row: 'ka', column: 'u', strokeCount: 2, audioText: 'ク', mnemonic: 'A cook\'s knife or slice.' },
  { char: 'ケ', romaji: 'ke', type: 'gojuon', row: 'ka', column: 'e', strokeCount: 3, audioText: 'ケ', mnemonic: 'A sharp corner of a kettle.' },
  { char: 'コ', romaji: 'ko', type: 'gojuon', row: 'ka', column: 'o', strokeCount: 2, audioText: 'コ', mnemonic: 'A cardboard box corner.' },

  // Sa row
  { char: 'サ', romaji: 'sa', type: 'gojuon', row: 'sa', column: 'a', strokeCount: 3, audioText: 'サ', mnemonic: 'Three pieces of salad greens.' },
  { char: 'シ', romaji: 'shi', type: 'gojuon', row: 'sa', column: 'i', strokeCount: 3, audioText: 'シ', mnemonic: 'Ship waves splashing upward.' },
  { char: 'ス', romaji: 'su', type: 'gojuon', row: 'sa', column: 'u', strokeCount: 2, audioText: 'ス', mnemonic: 'A skier flying down the slope.' },
  { char: 'セ', romaji: 'se', type: 'gojuon', row: 'sa', column: 'e', strokeCount: 2, audioText: 'セ', mnemonic: 'A seven-like segment.' },
  { char: 'ソ', romaji: 'so', type: 'gojuon', row: 'sa', column: 'o', strokeCount: 2, audioText: 'ソ', mnemonic: 'A sewing needle plunging downward.' },

  // Ta row
  { char: 'タ', romaji: 'ta', type: 'gojuon', row: 'ta', column: 'a', strokeCount: 3, audioText: 'タ', mnemonic: 'Looks like a tidy kite.' },
  { char: 'チ', romaji: 'chi', type: 'gojuon', row: 'ta', column: 'i', strokeCount: 3, audioText: 'チ', mnemonic: 'A cheering girl with arms raised.' },
  { char: 'ツ', romaji: 'tsu', type: 'gojuon', row: 'ta', column: 'u', strokeCount: 3, audioText: 'ツ', mnemonic: 'Two needle drops raining downward.' },
  { char: 'テ', romaji: 'te', type: 'gojuon', row: 'ta', column: 'e', strokeCount: 3, audioText: 'テ', mnemonic: 'A TV antenna tower.' },
  { char: 'ト', romaji: 'to', type: 'gojuon', row: 'ta', column: 'o', strokeCount: 2, audioText: 'ト', mnemonic: 'A straight totem pole.' },

  // Na row
  { char: 'ナ', romaji: 'na', type: 'gojuon', row: 'na', column: 'a', strokeCount: 2, audioText: 'ナ', mnemonic: 'A carpenter\'s nail.' },
  { char: 'ニ', romaji: 'ni', type: 'gojuon', row: 'na', column: 'i', strokeCount: 2, audioText: 'ニ', mnemonic: 'Two horizontal lines (the number two).' },
  { char: 'ヌ', romaji: 'nu', type: 'gojuon', row: 'na', column: 'u', strokeCount: 2, audioText: 'ヌ', mnemonic: 'Chopsticks grabbing noodles.' },
  { char: 'ネ', romaji: 'ne', type: 'gojuon', row: 'na', column: 'e', strokeCount: 4, audioText: 'ネ', mnemonic: 'A necktie hanging straight.' },
  { char: 'ノ', romaji: 'no', type: 'gojuon', row: 'na', column: 'o', strokeCount: 1, audioText: 'ノ', mnemonic: 'A clean nose profile stroke.' },

  // Ha row
  { char: 'ハ', romaji: 'ha', type: 'gojuon', row: 'ha', column: 'a', strokeCount: 2, audioText: 'ハ', mnemonic: 'The sides of a Japanese pagoda roof.' },
  { char: 'ヒ', romaji: 'hi', type: 'gojuon', row: 'ha', column: 'i', strokeCount: 2, audioText: 'ヒ', mnemonic: 'A heel of a boot.' },
  { char: 'フ', romaji: 'fu', type: 'gojuon', row: 'ha', column: 'u', strokeCount: 1, audioText: 'フ', mnemonic: 'A sharp hook for fishing.' },
  { char: 'ヘ', romaji: 'he', type: 'gojuon', row: 'ha', column: 'e', strokeCount: 1, audioText: 'ヘ', mnemonic: 'Identical mountain peak to hiragana.' },
  { char: 'ホ', romaji: 'ho', type: 'gojuon', row: 'ha', column: 'o', strokeCount: 4, audioText: 'ホ', mnemonic: 'A holy cross with light rays.' },

  // Ma row
  { char: 'マ', romaji: 'ma', type: 'gojuon', row: 'ma', column: 'a', strokeCount: 2, audioText: 'マ', mnemonic: 'A sharp martini glass angle.' },
  { char: 'ミ', romaji: 'mi', type: 'gojuon', row: 'ma', column: 'i', strokeCount: 3, audioText: 'ミ', mnemonic: 'Three missiles soaring.' },
  { char: 'ム', romaji: 'mu', type: 'gojuon', row: 'ma', column: 'u', strokeCount: 2, audioText: 'ム', mnemonic: 'A moose face profile.' },
  { char: 'メ', romaji: 'me', type: 'gojuon', row: 'ma', column: 'e', strokeCount: 2, audioText: 'メ', mnemonic: 'An X marking medicine.' },
  { char: 'モ', romaji: 'mo', type: 'gojuon', row: 'ma', column: 'o', strokeCount: 3, audioText: 'モ', mnemonic: 'Geometric version of hiragana も.' },

  // Ya row
  { char: 'ヤ', romaji: 'ya', type: 'gojuon', row: 'ya', column: 'a', strokeCount: 2, audioText: 'ヤ', mnemonic: 'A yacht bow.' },
  { char: 'ユ', romaji: 'yu', type: 'gojuon', row: 'ya', column: 'u', strokeCount: 2, audioText: 'ユ', mnemonic: 'Looks like number 1 inverted.' },
  { char: 'ヨ', romaji: 'yo', type: 'gojuon', row: 'ya', column: 'o', strokeCount: 3, audioText: 'ヨ', mnemonic: 'An open yoga mat container.' },

  // Ra row
  { char: 'ラ', romaji: 'ra', type: 'gojuon', row: 'ra', column: 'a', strokeCount: 2, audioText: 'ラ', mnemonic: 'A lantern top.' },
  { char: 'リ', romaji: 'ri', type: 'gojuon', row: 'ra', column: 'i', strokeCount: 2, audioText: 'リ', mnemonic: 'Two straight ribbons.' },
  { char: 'ル', romaji: 'ru', type: 'gojuon', row: 'ra', column: 'u', strokeCount: 2, audioText: 'ル', mnemonic: 'Two tree roots.' },
  { char: 'レ', romaji: 're', type: 'gojuon', row: 'ra', column: 'e', strokeCount: 1, audioText: 'レ', mnemonic: 'A red checkmark.' },
  { char: 'ロ', romaji: 'ro', type: 'gojuon', row: 'ra', column: 'o', strokeCount: 3, audioText: 'ロ', mnemonic: 'A square robot mouth.' },

  // Wa / N row
  { char: 'ワ', romaji: 'wa', type: 'gojuon', row: 'wa', column: 'a', strokeCount: 2, audioText: 'ワ', mnemonic: 'A wine glass silhouette.' },
  { char: 'ヲ', romaji: 'wo', type: 'gojuon', row: 'wa', column: 'o', strokeCount: 3, audioText: 'ヲ', mnemonic: 'A warrior sword stance.' },
  { char: 'ン', romaji: 'n', type: 'gojuon', row: 'wa', column: 'n', strokeCount: 2, audioText: 'ン', mnemonic: 'Upward swooping needle.' },

  // Dakuten
  { char: 'ガ', romaji: 'ga', type: 'dakuten', row: 'ga', column: 'a', strokeCount: 4, audioText: 'ガ' },
  { char: 'ギ', romaji: 'gi', type: 'dakuten', row: 'ga', column: 'i', strokeCount: 5, audioText: 'ギ' },
  { char: 'グ', romaji: 'gu', type: 'dakuten', row: 'ga', column: 'u', strokeCount: 4, audioText: 'グ' },
  { char: 'ゲ', romaji: 'ge', type: 'dakuten', row: 'ga', column: 'e', strokeCount: 5, audioText: 'ゲ' },
  { char: 'ゴ', romaji: 'go', type: 'dakuten', row: 'ga', column: 'o', strokeCount: 4, audioText: 'ゴ' },

  { char: 'ザ', romaji: 'za', type: 'dakuten', row: 'za', column: 'a', strokeCount: 5, audioText: 'ザ' },
  { char: 'ジ', romaji: 'ji', type: 'dakuten', row: 'za', column: 'i', strokeCount: 5, audioText: 'ジ' },
  { char: 'ズ', romaji: 'zu', type: 'dakuten', row: 'za', column: 'u', strokeCount: 4, audioText: 'ズ' },
  { char: 'ゼ', romaji: 'ze', type: 'dakuten', row: 'za', column: 'e', strokeCount: 4, audioText: 'ゼ' },
  { char: 'ゾ', romaji: 'zo', type: 'dakuten', row: 'za', column: 'o', strokeCount: 4, audioText: 'ゾ' },

  { char: 'ダ', romaji: 'da', type: 'dakuten', row: 'da', column: 'a', strokeCount: 5, audioText: 'ダ' },
  { char: 'デ', romaji: 'de', type: 'dakuten', row: 'da', column: 'e', strokeCount: 5, audioText: 'デ' },
  { char: 'ド', romaji: 'do', type: 'dakuten', row: 'da', column: 'o', strokeCount: 4, audioText: 'ド' },

  { char: 'バ', romaji: 'ba', type: 'dakuten', row: 'ba', column: 'a', strokeCount: 4, audioText: 'バ' },
  { char: 'ビ', romaji: 'bi', type: 'dakuten', row: 'ba', column: 'i', strokeCount: 4, audioText: 'ビ' },
  { char: 'ブ', romaji: 'bu', type: 'dakuten', row: 'ba', column: 'u', strokeCount: 3, audioText: 'ブ' },
  { char: 'ベ', romaji: 'be', type: 'dakuten', row: 'ba', column: 'e', strokeCount: 3, audioText: 'ベ' },
  { char: 'ボ', romaji: 'bo', type: 'dakuten', row: 'ba', column: 'o', strokeCount: 6, audioText: 'ボ' },

  { char: 'パ', romaji: 'pa', type: 'handakuten', row: 'pa', column: 'a', strokeCount: 3, audioText: 'パ' },
  { char: 'ピ', romaji: 'pi', type: 'handakuten', row: 'pa', column: 'i', strokeCount: 3, audioText: 'ピ' },
  { char: 'プ', romaji: 'pu', type: 'handakuten', row: 'pa', column: 'u', strokeCount: 2, audioText: 'プ' },
  { char: 'ペ', romaji: 'pe', type: 'handakuten', row: 'pa', column: 'e', strokeCount: 2, audioText: 'ペ' },
  { char: 'ポ', romaji: 'po', type: 'handakuten', row: 'pa', column: 'o', strokeCount: 5, audioText: 'ポ' },
];
