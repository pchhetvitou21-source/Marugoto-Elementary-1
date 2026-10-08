export interface DialogueLine {
  speaker?: string;
  japanese: string;
  romaji: string;
  english: string;
  boxedWords?: string[]; // The words that were boxed in the textbook review sheet
}

export interface CanDoItem {
  canDoNumber: number;
  goal: string;
  lines: DialogueLine[];
}

export interface FillBlankQuestion {
  id: string;
  prompt: string; // The sentence with blank like "わたしは [____] です。[____] に すんで(い)ます。"
  romaji: string;
  english: string;
  options: string[]; // Choices in the word box
  correctAnswers: string[]; // In order
  explanation: string;
}

export interface ReorderQuestion {
  id: string;
  english: string;
  romaji: string;
  chunks: string[]; // Scrambled pieces
  correctOrder: string[]; // Correct array of chunks
  fullJapanese: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  romaji: string;
  english: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonData {
  lessonNumber: number;
  topicNumber: number;
  topicTitle: string;
  title: string;
  romajiTitle: string;
  englishTitle: string;
  canDos: CanDoItem[];
  fillBlankQuestions: FillBlankQuestion[];
  reorderQuestions: ReorderQuestion[];
  quizQuestions: MultipleChoiceQuestion[];
}

export const MARUGOTO_LESSONS: LessonData[] = [
  // =================== TOPIC 1 ===================
  {
    lessonNumber: 1,
    topicNumber: 1,
    topicTitle: 'トピック1 わたしと かぞく (Myself and My Family)',
    title: 'だい1か 東京に すんでいます',
    romajiTitle: 'Dai 1-ka: Toukyou ni sunde imasu',
    englishTitle: 'Lesson 1: I Live in Tokyo',
    canDos: [
      {
        canDoNumber: 1,
        goal: 'かぞくや じぶんが どこに すんでいるか、なにを しているか かんたんに 話します (Briefly state where you and your family live, and what you do)',
        lines: [
          {
            japanese: 'わたしは [すずき まり] です。[東京] に すんで(い)ます。',
            romaji: 'Watashi wa Suzuki Mari desu. Toukyou ni sunde imasu.',
            english: 'I am Mari Suzuki. I live in Tokyo.',
            boxedWords: ['すずき まり', '東京'],
          },
          {
            japanese: 'わたしの かぞくは [3にん] です。[おっと と むすめ] です。',
            romaji: 'Watashi no kazoku wa san-nin desu. Otto to musume desu.',
            english: 'My family has 3 people. My husband and daughter.',
            boxedWords: ['3にん', 'おっと と むすめ'],
          },
          {
            japanese: 'わたしは [ホテル] で はたらいて(い)ます。',
            romaji: 'Watashi wa hoteru de hataraite imasu.',
            english: 'I work at a hotel.',
            boxedWords: ['ホテル'],
          },
        ],
      },
      {
        canDoNumber: 2,
        goal: 'かぞくや ともだちと なにごで 話すか 言います (Tell what language you speak with family and friends)',
        lines: [
          {
            japanese: '[すずき まり] です。[日本人] です。わたしは [日本語 と かんこくごと えいご] が できます。',
            romaji: 'Suzuki Mari desu. Nihonjin desu. Watashi wa nihongo to kankokugo to eigo ga dekimasu.',
            english: 'I am Mari Suzuki. I am Japanese. I can speak Japanese, Korean, and English.',
            boxedWords: ['すずき まり', '日本人', '日本語 と かんこくごと えいご'],
          },
          {
            japanese: '[おっと は かんこくじんです。かんこくごと えいごが できます。日本語も すこし できます。]',
            romaji: 'Otto wa kankokujin desu. Kankokugo to eigo ga dekimasu. Nihongo mo sukoshi dekimasu.',
            english: 'My husband is Korean. He speaks Korean and English. He can also speak a little Japanese.',
            boxedWords: ['おっと は かんこくじんです。かんこくごと えいごが できます。日本語も すこし できます。'],
          },
          {
            japanese: 'わたしたちは [日本語 と かんこくご] で 話します。',
            romaji: 'Watashitachi wa nihongo to kankokugo de hanashimasu.',
            english: 'We speak in Japanese and Korean.',
            boxedWords: ['日本語 と かんこくご'],
          },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l1-fb-1',
        prompt: 'わたしは [____] に すんでいます。',
        romaji: 'Watashi wa [____] ni sunde imasu.',
        english: 'I live in Tokyo.',
        options: ['東京', 'ホテル', '日本人', '3にん'],
        correctAnswers: ['東京'],
        explanation: 'The place where you live takes particle に (東京に すんでいます).',
      },
      {
        id: 'l1-fb-2',
        prompt: 'わたしは ホテル [____] はたらいています。',
        romaji: 'Watashi wa hoteru [____] hataraite imasu.',
        english: 'I work at a hotel.',
        options: ['で', 'に', 'と', 'を'],
        correctAnswers: ['で'],
        explanation: 'Action location takes particle で (ホテルではたらいています).',
      },
      {
        id: 'l1-fb-3',
        prompt: 'わたしたちは 日本語と かんこくご [____] 話します。',
        romaji: 'Watashitachi wa nihongo to kankokugo [____] hanashimasu.',
        english: 'We speak in Japanese and Korean.',
        options: ['で', 'に', 'が', 'は'],
        correctAnswers: ['で'],
        explanation: 'Language used as a means of communication takes particle で.',
      },
    ],
    reorderQuestions: [
      {
        id: 'l1-ro-1',
        english: 'I live in Tokyo.',
        romaji: 'Watashi wa Toukyou ni sunde imasu.',
        chunks: ['わたしは', '東京に', 'すんで', 'います。'],
        correctOrder: ['わたしは', '東京に', 'すんで', 'います。'],
        fullJapanese: 'わたしは 東京に すんでいます。',
      },
      {
        id: 'l1-ro-2',
        english: 'I can speak Japanese and English.',
        romaji: 'Nihongo to eigo ga dekimasu.',
        chunks: ['日本語と', 'えいごが', 'できます。'],
        correctOrder: ['日本語と', 'えいごが', 'できます。'],
        fullJapanese: '日本語と えいごが できます。',
      },
    ],
    quizQuestions: [
      {
        id: 'l1-qz-1',
        question: '「かぞくは なん人ですか」に こたえる とき、どれが 正しいですか。',
        romaji: '"Kazoku wa nannin desu ka" ni kotaeru toki, dore ga tadashii desu ka?',
        english: 'When answering "How many people are in your family?", which is correct?',
        options: ['3にんです。おっとと むすめです。', '東京に すんでいます。', 'ホテルで はたらいています。', '日本語で 話します。'],
        correctIndex: 0,
        explanation: 'Page 151: "わたしの かぞくは 3にんです。おっと と むすめ です。"',
      },
    ],
  },

  {
    lessonNumber: 2,
    topicNumber: 1,
    topicTitle: 'トピック1 わたしと かぞく (Myself and My Family)',
    title: 'だい2か しゅみは クラシックを 聞くことです',
    romajiTitle: 'Dai 2-ka: Shumi wa kurashikku o kiku koto desu',
    englishTitle: 'Lesson 2: My Hobby is Listening to Classical Music',
    canDos: [
      {
        canDoNumber: 3,
        goal: 'しゅみについて 話します (Talk about your hobbies)',
        lines: [
          {
            speaker: 'A',
            japanese: 'しゅみは なんですか。',
            romaji: 'Shumi wa nan desu ka.',
            english: 'What is your hobby?',
          },
          {
            speaker: 'B',
            japanese: '[クラシックを 聞くこと] です。',
            romaji: 'Kurashikku o kiku koto desu.',
            english: 'It is listening to classical music.',
            boxedWords: ['クラシックを 聞くこと'],
          },
          {
            speaker: 'A',
            japanese: 'そうですか。',
            romaji: 'Sou desu ka.',
            english: 'Is that so?',
          },
          {
            speaker: 'B',
            japanese: 'とくに、[バッハ] が すきです。',
            romaji: 'Tokuni, Bahha ga suki desu.',
            english: 'In particular, I like Bach.',
            boxedWords: ['バッハ'],
          },
          {
            speaker: 'A',
            japanese: 'ひまな とき、なにを しますか。',
            romaji: 'Hima na toki, nani o shimasu ka.',
            english: 'What do you do in your free time?',
          },
          {
            speaker: 'B',
            japanese: '[クラシックを 聞きます]。',
            romaji: 'Kurashikku o kikimasu.',
            english: 'I listen to classical music.',
            boxedWords: ['クラシックを 聞きます'],
          },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l2-fb-1',
        prompt: 'しゅみは クラシックを [____] です。',
        romaji: 'Shumi wa kurashikku o [____] desu.',
        english: 'My hobby is listening to classical music.',
        options: ['聞くこと', '聞きます', '聞いて', '聞いた'],
        correctAnswers: ['聞くこと'],
        explanation: 'To express a hobby as an action, use Verb Dictionary form + こと (〜することです).',
      },
      {
        id: 'l2-fb-2',
        prompt: 'とくに、バッハ [____] すきです。',
        romaji: 'Tokuni, Bahha [____] suki desu.',
        english: 'In particular, I like Bach.',
        options: ['が', 'を', 'に', 'で'],
        correctAnswers: ['が'],
        explanation: 'Liking takes the particle が (〜が すきです).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l2-ro-1',
        english: 'My hobby is listening to classical music.',
        romaji: 'Shumi wa kurashikku o kiku koto desu.',
        chunks: ['しゅみは', 'クラシックを', '聞くこと', 'です。'],
        correctOrder: ['しゅみは', 'クラシックを', '聞くこと', 'です。'],
        fullJapanese: 'しゅみは クラシックを 聞くことです。',
      },
      {
        id: 'l2-ro-2',
        english: 'In particular, I like Bach.',
        romaji: 'Tokuni, Bahha ga suki desu.',
        chunks: ['とくに、', 'バッハが', 'すきです。'],
        correctOrder: ['とくに、', 'バッハが', 'すきです。'],
        fullJapanese: 'とくに、バッハが すきです。',
      },
    ],
    quizQuestions: [
      {
        id: 'l2-qz-1',
        question: '「ひまな とき、なにを しますか」への へんじとして 正しいものは？',
        romaji: '"Hima na toki, nani o shimasu ka" e no henji toshite tadashii mono wa?',
        english: 'What is the correct response to "What do you do in your free time?"',
        options: ['クラシックを 聞きます。', '3にんです。', '東京に すんでいます。', '日本語が できます。'],
        correctIndex: 0,
        explanation: 'Page 151: "ひまな とき、なにを しますか。― クラシックを 聞きます。"',
      },
    ],
  },

  // =================== TOPIC 2 ===================
  {
    lessonNumber: 3,
    topicNumber: 2,
    topicTitle: 'トピック2 きせつと てんき (Seasons and Weather)',
    title: 'だい3か 日本はいま、はるです',
    romajiTitle: 'Dai 3-ka: Nihon wa ima, haru desu',
    englishTitle: 'Lesson 3: It is Spring in Japan Now',
    canDos: [
      {
        canDoNumber: 6,
        goal: 'きせつの へんかについて かんたんに 話します (Briefly talk about seasonal changes)',
        lines: [
          {
            speaker: 'A',
            japanese: '[日本／東京] はいま、どんな きせつですか。',
            romaji: 'Nihon / Toukyou wa ima, donna kisetsu desu ka.',
            english: 'What kind of season is it in Japan / Tokyo now?',
            boxedWords: ['日本／東京'],
          },
          {
            speaker: 'B',
            japanese: 'いま、[ふゆ] です。[さむいです] よ。',
            romaji: 'Ima, fuyu desu. Samui desu yo.',
            english: 'It is winter now. It is cold!',
            boxedWords: ['ふゆ', 'さむいです'],
          },
          {
            speaker: 'A',
            japanese: 'そうですか。じゃあ、いつごろ [あたたかく なります] か。',
            romaji: 'Sou desu ka. Jaa, itsugoro atataku narimasu ka.',
            english: 'I see. Well, around when will it become warm?',
            boxedWords: ['あたたかく なります'],
          },
          {
            speaker: 'B',
            japanese: 'そうですね。だいたい [3月ごろ] です。',
            romaji: 'Sou desu ne. Daitai sangatsu-goro desu.',
            english: 'Let me see. Roughly around March.',
            boxedWords: ['3月ごろ'],
          },
        ],
      },
      {
        canDoNumber: 7,
        goal: 'すきな きせつと その りゆうを かんたんに 話します (Tell your favorite season and briefly state the reason)',
        lines: [
          {
            speaker: 'A',
            japanese: 'すきな きせつは いつですか。',
            romaji: 'Suki na kisetsu wa itsu desu ka.',
            english: 'When is your favorite season?',
          },
          {
            speaker: 'B',
            japanese: '[あき] です。／ [あき] が いちばん すきです。',
            romaji: 'Aki desu. / Aki ga ichiban suki desu.',
            english: 'Autumn. / I like autumn the most.',
            boxedWords: ['あき', 'あき'],
          },
          {
            speaker: 'A',
            japanese: 'どうしてですか。',
            romaji: 'Doushite desu ka.',
            english: 'Why?',
          },
          {
            speaker: 'B',
            japanese: '[すずしいのが すきです／食べものが おいしいです] から。',
            romaji: 'Suzushii no ga suki desu / Tabemono ga oishii desu kara.',
            english: 'Because I like it being cool / Because the food is delicious.',
            boxedWords: ['すずしいのが すきです／食べものが おいしいです'],
          },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l3-fb-1',
        prompt: 'じゃあ、いつごろ あたたかく [____] か。',
        romaji: 'Jaa, itsugoro atatakaku [____] ka.',
        english: 'Well, around when will it become warm?',
        options: ['なります', 'します', 'います', '行きます'],
        correctAnswers: ['なります'],
        explanation: 'Change of state for i-adjective: あたたかい -> あたたかく なります (becomes warm).',
      },
      {
        id: 'l3-fb-2',
        prompt: 'どうしてですか。― 食べものが おいしいです [____]。',
        romaji: 'Doushite desu ka. ― Tabemono ga oishii desu [____].',
        english: 'Why? ― Because the food is delicious.',
        options: ['から', 'ので', 'けど', 'よ'],
        correctAnswers: ['から'],
        explanation: 'Page 152: Stating the reason with から (〜から).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l3-ro-1',
        english: 'Roughly around March.',
        romaji: 'Daitai sangatsu-goro desu.',
        chunks: ['だいたい', '3月ごろ', 'です。'],
        correctOrder: ['だいたい', '3月ごろ', 'です。'],
        fullJapanese: 'だいたい 3月ごろ です。',
      },
      {
        id: 'l3-ro-2',
        english: 'I like autumn the most.',
        romaji: 'Aki ga ichiban suki desu.',
        chunks: ['あきが', 'いちばん', 'すきです。'],
        correctOrder: ['あきが', 'いちばん', 'すきです。'],
        fullJapanese: 'あきが いちばん すきです。',
      },
    ],
    quizQuestions: [
      {
        id: 'l3-qz-1',
        question: '「あたたかい」が へんかするとき、「なる」の まえの かたちは？',
        romaji: '"Atatakai" ga henka suru toki, "naru" no mae no katachi wa?',
        english: 'When "atatakai" changes with "naru", what is the form?',
        options: ['あたたかく なります', 'あたたかい なります', 'あたたか なります', 'あたたかくて なります'],
        correctIndex: 0,
        explanation: 'I-adjectives change -い to -く before なる (あたたかく なります).',
      },
    ],
  },

  {
    lessonNumber: 4,
    topicNumber: 2,
    topicTitle: 'トピック2 きせつと てんき (Seasons and Weather)',
    title: 'だい4か いいてんきですね',
    romajiTitle: 'Dai 4-ka: Ii tenki desu ne',
    englishTitle: 'Lesson 4: Nice Weather, Isn’t It?',
    canDos: [
      {
        canDoNumber: 8,
        goal: 'てんきについて 話して あいさつを します (Greet by talking about the weather)',
        lines: [
          { speaker: 'A', japanese: 'いい てんきですね。', romaji: 'Ii tenki desu ne.', english: 'Nice weather, isn\'t it?' },
          { speaker: 'B', japanese: 'そうですね。いい てんきですね。', romaji: 'Sou desu ne. Ii tenki desu ne.', english: 'Indeed. Nice weather.' },
          { speaker: 'A', japanese: 'きのうは よく ふりましたね。', romaji: 'Kinou wa yoku furimashita ne.', english: 'It rained a lot yesterday, didn\'t it?' },
          { speaker: 'B', japanese: 'ええ、すごい あめでしたね。', romaji: 'Ee, sugoi ame deshita ne.', english: 'Yes, it was heavy rain.' },
          { speaker: 'A', japanese: 'さむいですね。', romaji: 'Samui desu ne.', english: 'It is cold, isn\'t it?' },
          { speaker: 'B', japanese: 'ええ、さむいですね。', romaji: 'Ee, samui desu ne.', english: 'Yes, it is cold.' },
          { speaker: 'A', japanese: 'きのうは あつかったですね。', romaji: 'Kinou wa atsukatta desu ne.', english: 'It was hot yesterday, wasn\'t it?' },
          { speaker: 'B', japanese: 'そうですね。あつかったですね。', romaji: 'Sou desu ne. Atsukatta desu ne.', english: 'Indeed. It was hot.' },
        ],
      },
      {
        canDoNumber: 9,
        goal: 'でんわの かいわの はじめに てんきについて 話します (Talk about weather at the beginning of a phone call)',
        lines: [
          { speaker: 'A', japanese: 'もしもし、[ジョイさん] ですか。[たなか] です。', romaji: 'Moshimoshi, Joi-san desu ka. Tanaka desu.', english: 'Hello, is this Joy-san? It is Tanaka.', boxedWords: ['ジョイさん', 'たなか'] },
          { speaker: 'B', japanese: 'ああ、[たなかさん]、おげんきですか。', romaji: 'Aa, Tanaka-san, ogenki desu ka.', english: 'Ah, Tanaka-san, how are you?', boxedWords: ['たなかさん'] },
          { speaker: 'A', japanese: 'はい、げんきです。こっちは [いま、あめが ふってます]。', romaji: 'Hai, genki desu. Kotchi wa ima, ame ga futtemasu.', english: 'Yes, I am fine. Over here, it is currently raining.', boxedWords: ['いま、あめが ふってます'] },
          { speaker: 'B', japanese: '[たいへんです] ね。', romaji: 'Taihen desu ne.', english: 'That must be tough.', boxedWords: ['たいへんです'] },
          { speaker: 'A', japanese: 'そっちは どうですか。', romaji: 'Sotchi wa dou desu ka.', english: 'How is it over there?', boxedWords: [] },
          { speaker: 'B', japanese: 'こっちは [よく はれてます／いい てんきです] よ。', romaji: 'Kotchi wa yoku haretemasu / ii tenki desu yo.', english: 'Over here it is very sunny / nice weather!', boxedWords: ['よく はれてます／いい てんきです'] },
          { speaker: 'A', japanese: 'そうですか。', romaji: 'Sou desu ka.', english: 'I see.', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l4-fb-1',
        prompt: 'きのうは [____] でしたね。',
        romaji: 'Kinou wa [____] deshita ne.',
        english: 'It was heavy rain yesterday, wasn\'t it?',
        options: ['すごい あめ', 'いい てんき', 'ふゆ', 'さむい'],
        correctAnswers: ['すごい あめ'],
        explanation: 'Page 152: "ええ、すごい あめでしたね。"',
      },
      {
        id: 'l4-fb-2',
        prompt: 'こっちは いま、あめが [____]。',
        romaji: 'Kotchi wa ima, ame ga [____].',
        english: 'Over here, it is currently raining.',
        options: ['ふってます', 'ふりました', 'ふります', 'ふらなくて'],
        correctAnswers: ['ふってます'],
        explanation: 'Ongoing rain: ふっています (ふってます).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l4-ro-1',
        english: 'It was hot yesterday, wasn’t it?',
        romaji: 'Kinou wa atsukatta desu ne.',
        chunks: ['きのうは', 'あつかった', 'ですね。'],
        correctOrder: ['きのうは', 'あつかった', 'ですね。'],
        fullJapanese: 'きのうは あつかったですね。',
      },
    ],
    quizQuestions: [
      {
        id: 'l4-qz-1',
        question: 'でんわで「あちらの ようす」を たずねる 言いかたは？',
        romaji: 'Denwa de "achira no yousu" o tazuneru iikata wa?',
        english: 'What is the phrase to ask how things are on the other end over phone?',
        options: ['そっちは どうですか。', 'こっちは どうですか。', 'どこに すんでいますか。', 'しゅみは なんですか。'],
        correctIndex: 0,
        explanation: 'Page 152: "そっちは どうですか。" (How is it over on your side?)',
      },
    ],
  },

  // =================== TOPIC 3 ===================
  {
    lessonNumber: 5,
    topicNumber: 3,
    topicTitle: 'トピック3 わたしの まち (My Town)',
    title: 'だい5か この こうえんは ひろくて、きれいです',
    romajiTitle: 'Dai 5-ka: Kono kouen wa hirokute, kirei desu',
    englishTitle: 'Lesson 5: This Park is Spacious and Clean',
    canDos: [
      {
        canDoNumber: 10,
        goal: 'ちずを 見ながら、じぶんの まちの おすすめの ばしょ／ちいきについて ともだちに 言います (Recommend a place/area while looking at a map)',
        lines: [
          { speaker: 'A', japanese: 'ここは [JFタウン] です。', romaji: 'Koko wa JF Taun desu.', english: 'This is JF Town.', boxedWords: ['JFタウン'] },
          { speaker: 'B', japanese: '[JFタウン]？', romaji: 'JF Taun?', english: 'JF Town?', boxedWords: ['JFタウン'] },
          { speaker: 'A', japanese: 'はい。この あたり(に)は [いろいろな みせ] が あります。', romaji: 'Hai. Kono atari (ni) wa iroiro na mise ga arimasu.', english: 'Yes. Around this area, there are various shops.', boxedWords: ['いろいろな みせ'] },
          { speaker: 'B', japanese: 'そうですか。', romaji: 'Sou desu ka.', english: 'I see.', boxedWords: [] },
          { speaker: 'A', japanese: '[にぎやかで、たのしいです] よ。', romaji: 'Nigiyaka de, tanoshii desu yo.', english: 'It is lively and fun!', boxedWords: ['にぎやかで、たのしいです'] },
          { speaker: 'B', japanese: 'いいですね。', romaji: 'Ii desu ne.', english: 'Sounds nice.', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 11,
        goal: 'ちずを 見ながら、ともだちが きょうみを もっている ところが どんな ところか、きを つけることは なにか、言います (Explain a place and things to note)',
        lines: [
          { speaker: 'B', japanese: '[JFタウン] は どの あたりですか。', romaji: 'JF Taun wa dono atari desu ka.', english: 'Around where is JF Town?', boxedWords: ['JFタウン'] },
          { speaker: 'A', japanese: 'この あたりです。[みせや レストランが おおいです]。', romaji: 'Kono atari desu. Mise ya resutoran ga ooi desu.', english: 'Around here. There are many shops and restaurants.', boxedWords: ['みせや レストランが おおいです'] },
          { speaker: 'B', japanese: 'そうですか。', romaji: 'Sou desu ka.', english: 'I see.', boxedWords: [] },
          { speaker: 'A', japanese: '[JFタウンは おしゃれだけど、ちょっと たかいです] よ。', romaji: 'JF Taun wa oshare dakedo, chotto takai desu yo.', english: 'JF Town is stylish, but it is a little expensive!', boxedWords: ['JFタウンは おしゃれだけど、ちょっと たかいです'] },
          { speaker: 'B', japanese: 'わかりました。', romaji: 'Wakarimashita.', english: 'Understood.', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l5-fb-1',
        prompt: 'にぎやか [____]、たのしいですよ。',
        romaji: 'Nigiyaka [____], tanoshii desu yo.',
        english: 'It is lively and fun!',
        options: ['で', 'くて', 'な', 'に'],
        correctAnswers: ['で'],
        explanation: 'Connecting Na-adjectives: にぎやか -> にぎやかで (lively and...).',
      },
      {
        id: 'l5-fb-2',
        prompt: 'JFタウンは おしゃれ [____]、ちょっと たかいですよ。',
        romaji: 'JF Taun wa oshare [____], chotto takai desu yo.',
        english: 'JF Town is stylish, but a bit expensive!',
        options: ['だけど', 'だから', 'なので', 'そして'],
        correctAnswers: ['だけど'],
        explanation: 'Page 153: Contrast using 〜だけど ("stylish, but...").',
      },
    ],
    reorderQuestions: [
      {
        id: 'l5-ro-1',
        english: 'Around here there are various shops.',
        romaji: 'Kono atari wa iroiro na mise ga arimasu.',
        chunks: ['この あたりは', 'いろいろな', 'みせが', 'あります。'],
        correctOrder: ['この あたりは', 'いろいろな', 'みせが', 'あります。'],
        fullJapanese: 'この あたりは いろいろな みせが あります。',
      },
    ],
    quizQuestions: [
      {
        id: 'l5-qz-1',
        question: '「ひろい」と「きれい」を つなげるとき、どう言いますか。',
        romaji: '"Hiroi" to "kirei" o tsunageru toki, dou iimasu ka?',
        english: 'How do you connect "hiroi" (i-adj) and "kirei"?',
        options: ['ひろくて、きれいです', 'ひろいで、きれいです', 'ひろいだけど、きれいです', 'ひろくで、きれいです'],
        correctIndex: 0,
        explanation: 'I-adjectives drop -い and add -くて (ひろくて、きれいです).',
      },
    ],
  },

  {
    lessonNumber: 6,
    topicNumber: 3,
    topicTitle: 'トピック3 わたしの まち (My Town)',
    title: 'だい6か まっすぐ 行って ください',
    romajiTitle: 'Dai 6-ka: Massugu itte kudasai',
    englishTitle: 'Lesson 6: Please Go Straight',
    canDos: [
      {
        canDoNumber: 12,
        goal: 'ちかくの ばしょへの 行きかたを 言います (Give directions to a nearby place)',
        lines: [
          { speaker: 'A', japanese: 'すみません、[はくぶつかん] は どこですか。', romaji: 'Sumimasen, hakubutsukan wa doko desu ka.', english: 'Excuse me, where is the museum?', boxedWords: ['はくぶつかん'] },
          { speaker: 'B', japanese: '[2つめの かど] を [みぎに まがって ください]。', romaji: 'Futatsume no kado o migi ni magatte kudasai.', english: 'Please turn right at the 2nd corner.', boxedWords: ['2つめの かど', 'みぎに まがって ください'] },
          { speaker: 'A', japanese: '[2つめの かど] を [みぎ] ですね。ありがとうございます。', romaji: 'Futatsume no kado o migi desu ne. Arigatou gozaimasu.', english: 'Turn right at the 2nd corner, right? Thank you.', boxedWords: ['2つめの かど', 'みぎ'] },
        ],
      },
      {
        canDoNumber: 13,
        goal: 'あいてが 聞きまちがえた ことを なおします (Correct someone who misheard directions)',
        lines: [
          { speaker: 'A', japanese: 'すみません、[はくぶつかん] は どこですか。', romaji: 'Sumimasen, hakubutsukan wa doko desu ka.', english: 'Excuse me, where is the museum?', boxedWords: ['はくぶつかん'] },
          { speaker: 'B', japanese: '[2つめの かど] を [みぎに まがって ください]。', romaji: 'Futatsume no kado o migi ni magatte kudasai.', english: 'Please turn right at the 2nd corner.', boxedWords: ['2つめの かど', 'みぎに まがって ください'] },
          { speaker: 'A', japanese: '[1つめの かど] を [みぎ] ですね。', romaji: 'Hitotsume no kado o migi desu ne.', english: 'Turn right at the 1st corner, right?', boxedWords: ['1つめの かど', 'みぎ'] },
          { speaker: 'B', japanese: 'いいえ、[1つめ] じゃなくて、[2つめ] ですよ。', romaji: 'Iie, hitotsume janakute, futatsume desu yo.', english: 'No, not the 1st, it is the 2nd!', boxedWords: ['1つめ', '2つめ'] },
          { speaker: 'A', japanese: 'あ、[2つめ] ですね。どうも ありがとうございます。', romaji: 'A, futatsume desu ne. Doumo arigatou gozaimasu.', english: 'Ah, the 2nd. Thank you very much.', boxedWords: ['2つめ'] },
        ],
      },
      {
        canDoNumber: 14,
        goal: 'とおくに 見える たてものの とくちょうを 言います (Describe a building visible in the distance)',
        lines: [
          { speaker: 'A', japanese: 'すみません、[たいしかん] に 行きたいんですが…。', romaji: 'Sumimasen, taishikan ni ikitai n desu ga...', english: 'Excuse me, I want to go to the embassy...', boxedWords: ['たいしかん'] },
          { speaker: 'B', japanese: '[たいしかん]？ あそこに [しろくて 大きい たてもの] が 見えますね。', romaji: 'Taishikan? Asoko ni shirokute ookii tatemono ga miemasu ne.', english: 'The embassy? You can see that white and large building over there, right?', boxedWords: ['たいしかん', 'しろくて 大きい たてもの'] },
          { speaker: 'A', japanese: 'はい。', romaji: 'Hai.', english: 'Yes.', boxedWords: [] },
          { speaker: 'B', japanese: '[たいしかん] は あれです。[まっすぐ 行って、すぐです] よ。', romaji: 'Taishikan wa are desu. Massugu itte, sugu desu yo.', english: 'The embassy is that one. Go straight, and it is right there!', boxedWords: ['たいしかん', 'まっすぐ 行って、すぐです'] },
          { speaker: 'A', japanese: 'どうも ありがとうございます。', romaji: 'Doumo arigatou gozaimasu.', english: 'Thank you very much.', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l6-fb-1',
        prompt: 'いいえ、1つめ [____]、2つめですよ。',
        romaji: 'Iie, hitotsume [____], futatsume desu yo.',
        english: 'No, not the first, it is the second!',
        options: ['じゃなくて', 'だけど', 'だから', 'でした'],
        correctAnswers: ['じゃなくて'],
        explanation: 'Page 153: Correcting misheard info with 〜じゃなくて ("not X, but Y").',
      },
      {
        id: 'l6-fb-2',
        prompt: '2つめの かどを みぎに [____] ください。',
        romaji: 'Futatsume no kado o migi ni [____] kudasai.',
        english: 'Please turn right at the second corner.',
        options: ['まがって', '行って', '見て', '止まって'],
        correctAnswers: ['まがって'],
        explanation: 'Turn: まがります -> まがってください.',
      },
    ],
    reorderQuestions: [
      {
        id: 'l6-ro-1',
        english: 'Please turn right at the 2nd corner.',
        romaji: 'Futatsume no kado o migi ni magatte kudasai.',
        chunks: ['2つめの かどを', 'みぎに', 'まがって', 'ください。'],
        correctOrder: ['2つめの かどを', 'みぎに', 'まがって', 'ください。'],
        fullJapanese: '2つめの かどを みぎに まがって ください。',
      },
    ],
    quizQuestions: [
      {
        id: 'l6-qz-1',
        question: '「まっすぐ 行って、すぐです」の いみは？',
        romaji: '"Massugu itte, sugu desu" no imi wa?',
        english: 'What does "Massugu itte, sugu desu" mean?',
        options: ['Go straight, and it is right there.', 'Turn right at the corner.', 'It is far away.', 'I do not know the way.'],
        correctIndex: 0,
        explanation: 'まっすぐ (straight) + 行って (go) + すぐです (right there).',
      },
    ],
  },

  // =================== TOPIC 4 ===================
  {
    lessonNumber: 7,
    topicNumber: 4,
    topicTitle: 'トピック4 でかける (Going Out)',
    title: 'だい7か 10時でも いいですか',
    romajiTitle: 'Dai 7-ka: Jyuu-ji demo ii desu ka',
    englishTitle: 'Lesson 7: Is 10:00 Okay Too?',
    canDos: [
      {
        canDoNumber: 15,
        goal: 'ともだちと まちあわせの じかんと ばしょについて 話します (Discuss meeting time and place with a friend)',
        lines: [
          { speaker: 'A', japanese: '[日曜日]、まちあわせは どうしますか。', romaji: 'Nichiyoubi, machiawase wa dou shimasu ka.', english: 'On Sunday, what shall we do about meeting up?', boxedWords: ['日曜日'] },
          { speaker: 'B', japanese: 'そうですね。[10時] に、[JFホテルの ロビー] は どうですか。', romaji: 'Sou desu ne. Jyuu-ji ni, JF Hoteru no robii wa dou desu ka.', english: 'Well, how about 10:00 at the JF Hotel lobby?', boxedWords: ['10時', 'JFホテルの ロビー'] },
          { speaker: 'A', japanese: '[10時] に、[JFホテルの ロビー] ですね。わかりました。', romaji: 'Jyuu-ji ni, JF Hoteru no robii desu ne. Wakarimashita.', english: 'At 10:00, at the JF Hotel lobby, right? Understood.', boxedWords: ['10時', 'JFホテルの ロビー'] },
          { speaker: 'B', japanese: 'じゃあ、また [日曜日] に。', romaji: 'Jaa, mata nichiyoubi ni.', english: 'See you again on Sunday.', boxedWords: ['日曜日'] },
          { speaker: 'A', japanese: 'あのう、[10時] は ちょっと…。[11時] でも いいですか。', romaji: 'Anou, jyuu-ji wa chotto... Jyuuichi-ji demo ii desu ka.', english: 'Um, 10:00 is a bit... Is 11:00 okay too?', boxedWords: ['10時', '11時'] },
          { speaker: 'B', japanese: 'ええ、いいですよ。じゃあ、[11時] に、[JFホテル] で。', romaji: 'Ee, ii desu yo. Jaa, jyuuichi-ji ni, JF Hoteru de.', english: 'Yes, that’s fine. Well then, at 11:00 at the JF Hotel.', boxedWords: ['11時', 'JFホテル'] },
        ],
      },
      {
        canDoNumber: 17,
        goal: 'おくれた りゆうを 言って あやまります (Apologize and give a reason for being late)',
        lines: [
          { speaker: 'A', japanese: 'おそく なって、すみません。ちょっと [みちに まよって…]。', romaji: 'Osoku natte, sumimasen. Chotto michi ni mayotte...', english: 'I am sorry for being late. I got a bit lost...', boxedWords: ['みちに まよって…'] },
          { speaker: 'B', japanese: 'だいじょうぶですよ。じゃあ、行きましょう。', romaji: 'Daijoubu desu yo. Jaa, ikimashou.', english: 'It\'s okay! Well, let\'s go.', boxedWords: [] },
          { speaker: 'A', japanese: 'はい。', romaji: 'Hai.', english: 'Yes.', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l7-fb-1',
        prompt: '10時は ちょっと…。11時 [____] いいですか。',
        romaji: 'Jyuu-ji wa chotto... Jyuuichi-ji [____] ii desu ka.',
        english: '10:00 is a bit... Is 11:00 okay too?',
        options: ['でも', 'のに', 'から', 'まで'],
        correctAnswers: ['でも'],
        explanation: 'Page 154: Proposing alternative with 〜でも いいですか ("is X also okay?").',
      },
      {
        id: 'l7-fb-2',
        prompt: 'おそく なって、すみません。ちょっと みちに [____]。',
        romaji: 'Osoku natte, sumimasen. Chotto michi ni [____].',
        english: 'Sorry for being late. I got lost...',
        options: ['まよって…', '行って…', '来て…', '見て…'],
        correctAnswers: ['まよって…'],
        explanation: 'みちに まよう = to get lost on the way.',
      },
    ],
    reorderQuestions: [
      {
        id: 'l7-ro-1',
        english: 'I’m sorry for being late. I got a little lost.',
        romaji: 'Osoku natte, sumimasen. Chotto michi ni mayotte...',
        chunks: ['おそく なって、', 'すみません。', 'ちょっと', 'みちに まよって…。'],
        correctOrder: ['おそく なって、', 'すみません。', 'ちょっと', 'みちに まよって…。'],
        fullJapanese: 'おそく なって、すみません。ちょっと みちに まよって…。',
      },
    ],
    quizQuestions: [
      {
        id: 'l7-qz-1',
        question: 'ともだちの ていあんに つごうが わるい とき、どう断りますか。',
        romaji: 'Tomodachi no teian ni tsugou ga warui toki, dou kotowarimasu ka?',
        english: 'When a friend\'s suggestion is inconvenient, how do you soften your refusal?',
        options: ['あのう、10時は ちょっと…', 'いいえ、だめです。', '10時ですね。わかりました。', 'だいじょうぶですよ。'],
        correctIndex: 0,
        explanation: 'Use "〜は ちょっと…" to politely express inconvenience.',
      },
    ],
  },

  {
    lessonNumber: 8,
    topicNumber: 4,
    topicTitle: 'トピック4 でかける (Going Out)',
    title: 'だい8か もう やけいを 見に 行きましたか',
    romajiTitle: 'Dai 8-ka: Mou yakei o mi ni ikimashita ka',
    englishTitle: 'Lesson 8: Have You Already Gone to See the Night View?',
    canDos: [
      {
        canDoNumber: 18,
        goal: 'おすすめの ばしょに ともだちを さそいます／さそいに こたえます (Invite a friend to a recommended spot / reply)',
        lines: [
          { speaker: 'A', japanese: 'もう [タワーに 行きました] か。', romaji: 'Mou tawaa ni ikimashita ka.', english: 'Have you already gone to the tower?', boxedWords: ['タワーに 行きました'] },
          { speaker: 'B', japanese: 'いいえ、まだです。', romaji: 'Iie, mada desu.', english: 'No, not yet.', boxedWords: [] },
          { speaker: 'A', japanese: 'じゃあ、[見に 行きませんか]。[よる、やけいが きれいです] よ。', romaji: 'Jaa, mi ni ikimasen ka. Yoru, yakei ga kirei desu yo.', english: 'Well, won\'t you go see it with me? At night, the night view is beautiful!', boxedWords: ['見に 行きませんか', 'よる、やけいが きれいです'] },
          { speaker: 'B', japanese: 'いいですね。[行きましょう]。／ [すみません。タワー は ちょっと…]。', romaji: 'Ii desu ne. Ikimashou. / Sumimasen. Tawaa wa chotto...', english: 'Sounds good. Let\'s go! / Sorry, the tower is a bit...', boxedWords: ['行きましょう', 'すみません。タワー は ちょっと…'] },
        ],
      },
      {
        canDoNumber: 19,
        goal: 'ともだちに よりみちを したいと 言います (Tell a friend you want to make a side stop)',
        lines: [
          { speaker: 'A', japanese: 'あのう、ちょっと [水を 買いたいんですが…]。', romaji: 'Anou, chotto mizu o kaitai n desu ga...', english: 'Um, I want to buy some water...', boxedWords: ['水を 買いたいんですが…'] },
          { speaker: 'B', japanese: 'じゃあ、[しょくじの あとで]、[みせに 行きましょう]。', romaji: 'Jaa, shokuji no ato de, mise ni ikimashou.', english: 'Well then, after the meal, let\'s go to the shop.', boxedWords: ['しょくじの あとで', 'みせに 行きましょう'] },
          { speaker: 'A', japanese: 'すみません。', romaji: 'Sumimasen.', english: 'Thank you / Excuse me.', boxedWords: [] },
          { speaker: 'B', japanese: 'いいえ。', romaji: 'Iie.', english: 'Not at all.', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l8-fb-1',
        prompt: 'じゃあ、やけいを 見に [____] か。',
        romaji: 'Jaa, yakei o mi ni [____] ka.',
        english: 'Well, won’t you go to see the night view?',
        options: ['行きませんか', '行きました', '行きましょう', '行きます'],
        correctAnswers: ['行きませんか'],
        explanation: 'Page 154: Inviting someone with 〜ませんか.',
      },
      {
        id: 'l8-fb-2',
        prompt: 'しょくじの [____]、みせに 行きましょう。',
        romaji: 'Shokuji no [____], mise ni ikimashou.',
        english: 'After the meal, let’s go to the shop.',
        options: ['あとで', 'まえに', 'ときに', 'あいだに'],
        correctAnswers: ['あとで'],
        explanation: 'Noun + の あとで = after Noun.',
      },
    ],
    reorderQuestions: [
      {
        id: 'l8-ro-1',
        english: 'Um, I want to buy some water...',
        romaji: 'Anou, chotto mizu o kaitai n desu ga...',
        chunks: ['あのう、', 'ちょっと', '水を', '買いたいんですが…。'],
        correctOrder: ['あのう、', 'ちょっと', '水を', '買いたいんですが…。'],
        fullJapanese: 'あのう、ちょっと 水を 買いたいんですが…。',
      },
    ],
    quizQuestions: [
      {
        id: 'l8-qz-1',
        question: '「もう タワーに 行きましたか」に まだ行っていない ときの 返事は？',
        romaji: '"Mou tawaa ni ikimashita ka" ni mada itte inai toki no henji wa?',
        english: 'What is the answer when you have not been to the tower yet?',
        options: ['いいえ、まだです。', 'はい、まだです。', 'いいえ、行きました。', 'まだ 行きましょう。'],
        correctIndex: 0,
        explanation: 'Page 154: "いいえ、まだです。" (No, not yet).',
      },
    ],
  },

  // =================== TOPIC 5 ===================
  {
    lessonNumber: 9,
    topicNumber: 5,
    topicTitle: 'トピック5 がいこくごと がいこくぶんか (Foreign Languages and Cultures)',
    title: 'だい9か 日本語は はつおんが かんたんです',
    romajiTitle: 'Dai 9-ka: Nihongo wa hatsuon ga kantan desu',
    englishTitle: 'Lesson 9: Japanese Pronunciation is Easy',
    canDos: [
      {
        canDoNumber: 21,
        goal: 'いままでに べんきょうした がいこくごについて 話します (Talk about foreign languages studied so far)',
        lines: [
          { speaker: 'A', japanese: 'いままでに どんな がいこくごを べんきょうしましたか。', romaji: 'Imamade ni donna gaikokugo o benkyou shimashita ka.', english: 'What foreign languages have you studied so far?' },
          { speaker: 'B', japanese: '[こうこう] の とき、[スペインご] を べんきょうしました。', romaji: 'Koukou no toki, Supeingo o benkyou shimashita.', english: 'When I was in high school, I studied Spanish.', boxedWords: ['こうこう', 'スペインご'] },
          { speaker: 'A', japanese: 'そうですか。[スペインご] は どうですか。', romaji: 'Sou desu ka. Supeingo wa dou desu ka.', english: 'Is that so? How is Spanish?', boxedWords: ['スペインご'] },
          { speaker: 'B', japanese: '[スペインごは ぶんぽうが かんたんです]。／ [スペインごは 読むのが ちょっと むずかしいです]。', romaji: 'Supeingo wa bunpou ga kantan desu. / Supeingo wa yomu no ga chotto muzukashii desu.', english: 'Spanish grammar is easy. / Reading Spanish is a little difficult.', boxedWords: ['スペインごは ぶんぽうが かんたんです', 'スペインごは 読むのが ちょっと むずかしいです'] },
          { speaker: 'A', japanese: 'いまも できますか。', romaji: 'Ima mo dekimasu ka.', english: 'Can you still speak it now?' },
          { speaker: 'B', japanese: '[ええ、すこし できますよ]。／ [いまは、ちょっと…]。', romaji: 'Ee, sukoshi dekimasu yo. / Ima wa, chotto...', english: 'Yes, I can do a little. / Right now, not really...', boxedWords: ['ええ、すこし できますよ', 'いまは、ちょっと…'] },
        ],
      },
      {
        canDoNumber: 23,
        goal: 'がいこくごの べんきょうで こまった とき、だれかに たのみます (Ask for help when having trouble with study)',
        lines: [
          { speaker: 'A', japanese: 'すみません、その [じしょ]、かして くださいませんか。／ [かんじの 読みかた] を おしえて くださいませんか。', romaji: 'Sumimasen, sono jisho, kashite kudasaimasen ka. / Kanji no yomikata o oshiete kudasaimasen ka.', english: 'Excuse me, could you please lend me that dictionary? / Could you please teach me how to read this kanji?', boxedWords: ['じしょ', 'かんじの 読みかた'] },
          { speaker: 'B', japanese: 'いいですよ。／ すみません。いま、ちょっと…。', romaji: 'Ii desu yo. / Sumimasen. Ima, chotto...', english: 'Sure! / Sorry, right now is a bit...', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l9-fb-1',
        prompt: 'スペインごは 読む [____] が ちょっと むずかしいです。',
        romaji: 'Supeingo wa yomu [____] ga chotto muzukashii desu.',
        english: 'Reading Spanish is a little difficult.',
        options: ['の', 'こと', 'もの', 'とき'],
        correctAnswers: ['の'],
        explanation: 'Page 155: Nominalizing with の (読むのが むずかしいです).',
      },
      {
        id: 'l9-fb-2',
        prompt: 'その じしょ、かして [____] か。',
        romaji: 'Sono jisho, kashite [____] ka.',
        english: 'Could you please lend me that dictionary?',
        options: ['くださいません', 'ください', 'あげます', 'もらいます'],
        correctAnswers: ['くださいません'],
        explanation: 'Polite request: 〜てくださいませんか.',
      },
    ],
    reorderQuestions: [
      {
        id: 'l9-ro-1',
        english: 'When I was in high school, I studied Spanish.',
        romaji: 'Koukou no toki, Supeingo o benkyou shimashita.',
        chunks: ['こうこうの とき、', 'スペインごを', 'べんきょうしました。'],
        correctOrder: ['こうこうの とき、', 'スペインごを', 'べんきょうしました。'],
        fullJapanese: 'こうこうの とき、スペインごを べんきょうしました。',
      },
    ],
    quizQuestions: [
      {
        id: 'l9-qz-1',
        question: '「かんじの 読みかたを おしえて くださいませんか」への こころよい 返事は？',
        romaji: '"Kanji no yomikata o oshiete kudasaimasen ka" e no kokoroyoi henji wa?',
        english: 'What is the pleasant affirmative response to being asked to teach kanji reading?',
        options: ['いいですよ。', 'いまは、ちょっと…。', 'いいえ、まだです。', 'わかりません。'],
        correctIndex: 0,
        explanation: 'Page 155: "いいですよ。" (Sure!)',
      },
    ],
  },

  {
    lessonNumber: 10,
    topicNumber: 5,
    topicTitle: 'トピック5 がいこくごと がいこくぶんか (Foreign Languages and Cultures)',
    title: 'だい10か いつか 日本に 行きたいです',
    romajiTitle: 'Dai 10-ka: Itsuka Nihon ni ikitai desu',
    englishTitle: 'Lesson 10: Someday I Want to Go to Japan',
    canDos: [
      {
        canDoNumber: 24,
        goal: 'がいこくの ぶんかと じぶんとの かかわりについて 話します (Talk about your relationship with a foreign culture)',
        lines: [
          { speaker: 'A', japanese: 'どんな くにに きょうみが ありますか。', romaji: 'Donna kuni ni kyoumi ga arimasu ka.', english: 'What kind of countries are you interested in?' },
          { speaker: 'B', japanese: '[日本] です。', romaji: 'Nihon desu.', english: 'Japan.', boxedWords: ['日本'] },
          { speaker: 'B', japanese: 'わたしは [しゅうに 1かい] [日本語を べんきょうして(い)ます]。', romaji: 'Watashi wa shuu ni ikkai nihongo o benkyou shite imasu.', english: 'I study Japanese once a week.', boxedWords: ['しゅうに 1かい', '日本語を べんきょうして(い)ます'] },
          { speaker: 'B', japanese: '[日本人の ともだちと ときどき 日本語で 話します]。', romaji: 'Nihonjin no tomodachi to tokidoki nihongo de hanashimasu.', english: 'I sometimes speak in Japanese with Japanese friends.', boxedWords: ['日本人の ともだちと ときどき 日本語で 話します'] },
          { speaker: 'B', japanese: 'しょうらい [日本に りゅうがくしたいです]。', romaji: 'Shourai Nihon ni ryuugaku shitai desu.', english: 'In the future, I want to study abroad in Japan.', boxedWords: ['日本に りゅうがくしたいです'] },
          { speaker: 'A', japanese: 'そうですか。', romaji: 'Sou desu ka.', english: 'I see.', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 25,
        goal: 'こまっている ひとに たすけを もうしでます／うけます (Offer / accept help when someone is in trouble)',
        lines: [
          { speaker: 'A', japanese: 'どうしたんですか。', romaji: 'Doushita n desu ka.', english: 'What happened? Is something wrong?' },
          { speaker: 'B', japanese: '[えき] に 行きたいんですが…。／ [みち] が よく わかりません。', romaji: 'Eki ni ikitai n desu ga... / Michi ga yoku wakarimasen.', english: 'I want to go to the station... / I don\'t really know the way.', boxedWords: ['えき', 'みち'] },
          { speaker: 'A', japanese: '[いっしょに 行きましょうか]。', romaji: 'Issho ni ikimashou ka.', english: 'Shall we go together?', boxedWords: ['いっしょに 行きましょうか'] },
          { speaker: 'B', japanese: 'すみません。ありがとうございます。', romaji: 'Sumimasen. Arigatou gozaimasu.', english: 'Thank you so much!', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l10-fb-1',
        prompt: 'しょうらい 日本に [____] です。',
        romaji: 'Shourai Nihon ni [____] desu.',
        english: 'In the future, I want to study abroad in Japan.',
        options: ['りゅうがくしたい', 'りゅうがくする', 'りゅうがくした', 'りゅうがくして'],
        correctAnswers: ['りゅうがくしたい'],
        explanation: 'Desire: Verb Stem + たい (りゅうがくしたいです).',
      },
      {
        id: 'l10-fb-2',
        prompt: 'いっしょに 行き [____] か。― すみません。ありがとうございます。',
        romaji: 'Issho ni iki [____] ka. ― Sumimasen. Arigatou gozaimasu.',
        english: 'Shall we go together? ― Thank you.',
        options: ['ましょう', 'ます', 'たい', 'ません'],
        correctAnswers: ['ましょう'],
        explanation: 'Offering help: 〜ましょうか (Shall I/we...?).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l10-ro-1',
        english: 'I study Japanese once a week.',
        romaji: 'Watashi wa shuu ni ikkai nihongo o benkyou shite imasu.',
        chunks: ['わたしは', 'しゅうに 1かい', '日本語を', 'べんきょうしています。'],
        correctOrder: ['わたしは', 'しゅうに 1かい', '日本語を', 'べんきょうしています。'],
        fullJapanese: 'わたしは しゅうに 1かい 日本語を べんきょうしています。',
      },
    ],
    quizQuestions: [
      {
        id: 'l10-qz-1',
        question: 'みちに まよって こまっている ひとへの こえかけは？',
        romaji: 'Michi ni mayotte komatte iru hito e no koekake wa?',
        english: 'What do you say to someone in trouble looking lost?',
        options: ['どうしたんですか。', 'しゅみは なんですか。', 'おめでとうございます。', 'おげんきですか。'],
        correctIndex: 0,
        explanation: 'Page 155: "どうしたんですか。" (What is the matter?)',
      },
    ],
  },

  // =================== TOPIC 6 ===================
  {
    lessonNumber: 11,
    topicNumber: 6,
    topicTitle: 'トピック6 そとで 食べる (Eating Outdoors)',
    title: 'だい11か なにを もっていきますか',
    romajiTitle: 'Dai 11-ka: Nani o motte ikimasu ka',
    englishTitle: 'Lesson 11: What Will You Bring?',
    canDos: [
      {
        canDoNumber: 27,
        goal: 'ピクニックに もっていく ものについて 話します (Talk about items to bring to a picnic)',
        lines: [
          { speaker: 'C', japanese: 'らいしゅうの ピクニック、[食べもの] は どうしますか。', romaji: 'Raishuu no pikunikku, tabemono wa dou shimasu ka.', english: 'For next week’s picnic, what shall we do about food?', boxedWords: ['食べもの'] },
          { speaker: 'A', japanese: 'わたしは [サンドイッチ]、[もっていきます]。', romaji: 'Watashi wa sandoitchi, motte ikimasu.', english: 'I will bring sandwiches.', boxedWords: ['サンドイッチ', 'もっていきます'] },
          { speaker: 'C', japanese: '[Aさん] は [サンドイッチ] ですね。おねがいします。', romaji: 'A-san wa sandoitchi desu ne. Onegaishimasu.', english: 'A-san will bring sandwiches, right? Please do!', boxedWords: ['Aさん', 'サンドイッチ'] },
          { speaker: 'B', japanese: 'じゃあ、わたしは [サラダ]、[もっていきます]。', romaji: 'Jaa, watashi wa sarada, motte ikimasu.', english: 'Well then, I will bring salad.', boxedWords: ['サラダ', 'もっていきます'] },
          { speaker: 'C', japanese: '[Bさん] は [サラダ] ですね。おねがいします。', romaji: 'B-san wa sarada desu ne. Onegaishimasu.', english: 'B-san will bring salad, right? Please do!', boxedWords: ['Bさん', 'サラダ'] },
        ],
      },
      {
        canDoNumber: 29,
        goal: 'ピクニックの 食べものや 飲みものの きぼうを 聞きます／言います (Ask and express wishes for food/drinks)',
        lines: [
          { speaker: 'C', japanese: '[飲みもの] は なにが いいですか。', romaji: 'Nomimono wa nani ga ii desu ka.', english: 'What drink would be good?', boxedWords: ['飲みもの'] },
          { speaker: 'A', japanese: 'わたしは [おちゃ] が いいです。', romaji: 'Watashi wa ocha ga ii desu.', english: 'I would like green tea.', boxedWords: ['おちゃ'] },
          { speaker: 'B', japanese: 'わたしは [なんでも] いいです。', romaji: 'Watashi wa nandemo ii desu.', english: 'Anything is fine with me.', boxedWords: ['なんでも'] },
          { speaker: 'C', japanese: 'じゃあ、[おちゃ] に します(ね)。', romaji: 'Jaa, ocha ni shimasu ne.', english: 'Well then, let\'s make it green tea!', boxedWords: ['おちゃ'] },
          { speaker: 'A, B', japanese: 'はい、おねがいします。', romaji: 'Hai, onegaishimasu.', english: 'Yes, please!', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l11-fb-1',
        prompt: 'わたしは サンドイッチ、[____]。',
        romaji: 'Watashi wa sandoitchi, [____].',
        english: 'I will bring sandwiches.',
        options: ['もっていきます', 'もってきます', '食べます', '作ります'],
        correctAnswers: ['もっていきます'],
        explanation: 'Page 155: もっていきます (to take/bring along).',
      },
      {
        id: 'l11-fb-2',
        prompt: 'じゃあ、おちゃ [____] しますね。',
        romaji: 'Jaa, ocha [____] shimasu ne.',
        english: 'Well, let\'s decide on green tea then.',
        options: ['に', 'を', 'で', 'が'],
        correctAnswers: ['に'],
        explanation: 'Deciding on an option: Noun + に します.',
      },
    ],
    reorderQuestions: [
      {
        id: 'l11-ro-1',
        english: 'What drink would be good?',
        romaji: 'Nomimono wa nani ga ii desu ka.',
        chunks: ['飲みものは', 'なにが', 'いいですか。'],
        correctOrder: ['飲みものは', 'なにが', 'いいですか。'],
        fullJapanese: '飲みものは なにが いいですか。',
      },
    ],
    quizQuestions: [
      {
        id: 'l11-qz-1',
        question: '「飲みものは なにが いいですか」で なんでもよい ときの 返事は？',
        romaji: '"Nomimono wa nani ga ii desu ka" de nandemo yoi toki no henji wa?',
        english: 'When any drink is fine, what do you say?',
        options: ['わたしは なんでも いいです。', 'おちゃに します。', 'サンドイッチを もっていきます。', 'いいえ、けっこうです。'],
        correctIndex: 0,
        explanation: 'Page 156: "わたしは なんでも いいです。" (Anything is fine with me).',
      },
    ],
  },

  {
    lessonNumber: 12,
    topicNumber: 6,
    topicTitle: 'トピック6 そとで 食べる (Eating Outdoors)',
    title: 'だい12か おいしそうですね',
    romajiTitle: 'Dai 12-ka: Oishisou desu ne',
    englishTitle: 'Lesson 12: It Looks Delicious!',
    canDos: [
      {
        canDoNumber: 30,
        goal: 'よく しらない 食べものについて 話します (Talk about unfamiliar food)',
        lines: [
          { speaker: 'A', japanese: 'それ、なんですか。[おいしそうです] ね。', romaji: 'Sore, nan desu ka. Oishisou desu ne.', english: 'What is that? It looks delicious!', boxedWords: ['おいしそうです'] },
          { speaker: 'B', japanese: '[日本のおすし] です。', romaji: 'Nihon no osushi desu.', english: 'It is Japanese sushi.', boxedWords: ['日本のおすし'] },
          { speaker: 'A', japanese: '[おすし] ですか。／ [かんこくの キンパ] と にてます。', romaji: 'Osushi desu ka. / Kankoku no kinpa to nitemasu.', english: 'Sushi? / It looks similar to Korean gimbap.', boxedWords: ['おすし', 'かんこくの キンパ'] },
          { speaker: 'B', japanese: 'どうぞ、食べてみて ください。／ あじは ちょっと ちがいますよ。／ あじも にてますよ。', romaji: 'Douzo, tabetemite kudasai. / Aji wa chotto chigaimasu yo. / Aji mo nitemasu yo.', english: 'Please try eating some. / The taste is a bit different. / The taste is similar too.', boxedWords: [] },
          { speaker: 'A', japanese: 'じゃあ、1つ いただきます。', romaji: 'Jaa, hitotsu itadakimasu.', english: 'Well then, I will have one.', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 31,
        goal: 'あじについて かんたんに コメントします (Briefly comment on taste)',
        lines: [
          { speaker: 'A', japanese: '[やぎさん]、よかったら [サラダ]、どうぞ。', romaji: 'Yagi-san, yokattara sarada, douzo.', english: 'Yagi-san, if you like, please have some salad.', boxedWords: ['やぎさん', 'サラダ'] },
          { speaker: 'B', japanese: 'はい、いただきます。この [サラダ]、[ちょっと からくて、おいしいです] ね。', romaji: 'Hai, itadakimasu. Kono sarada, chotto karakute, oishii desu ne.', english: 'Thank you, I will have some. This salad is a bit spicy and delicious!', boxedWords: ['サラダ', 'ちょっと からくて、おいしいです'] },
          { speaker: 'A', japanese: 'そうですか。もう すこし どうですか。', romaji: 'Sou desu ka. Mou sukoshi dou desu ka.', english: 'Is that so? How about a little more?', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 32,
        goal: 'ともだちに 食べものを すすめます／こたえます (Offer food to a friend / respond)',
        lines: [
          { speaker: 'A', japanese: 'もう すこし どうですか。', romaji: 'Mou sukoshi dou desu ka.', english: 'How about a little more?' },
          { speaker: 'B', japanese: 'ありがとうございます。でも、もう おなかが いっぱいです。／ もう けっこうです。', romaji: 'Arigatou gozaimasu. Demo, mou onaka ga ippai desu. / Mou kekkou desu.', english: 'Thank you. But I am already full. / I am fine, thank you.' },
          { speaker: 'B (alt)', japanese: 'じゃあ、もう すこし いただきます。', romaji: 'Jaa, mou sukoshi itadakimasu.', english: 'Well then, I will have a little more.' },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l12-fb-1',
        prompt: 'どうぞ、食べて [____] ください。',
        romaji: 'Douzo, tabete [____] kudasai.',
        english: 'Please try eating some.',
        options: ['みて', 'いって', 'きて', 'しまって'],
        correctAnswers: ['みて'],
        explanation: 'Try doing: Verb Te-form + みてください (食べてみて ください).',
      },
      {
        id: 'l12-fb-2',
        prompt: 'ありがとうございます。でも、もう [____] が いっぱいです。',
        romaji: 'Arigatou gozaimasu. Demo, mou [____] ga ippai desu.',
        english: 'Thank you. But I am already full.',
        options: ['おなか', 'あたま', 'きもち', 'て'],
        correctAnswers: ['おなか'],
        explanation: 'おなかが いっぱい = stomach is full.',
      },
    ],
    reorderQuestions: [
      {
        id: 'l12-ro-1',
        english: 'This salad is a bit spicy and delicious, isn’t it?',
        romaji: 'Kono sarada, chotto karakute, oishii desu ne.',
        chunks: ['この サラダ、', 'ちょっと', 'からくて、', 'おいしいですね。'],
        correctOrder: ['この サラダ、', 'ちょっと', 'からくて、', 'おいしいですね。'],
        fullJapanese: 'この サラダ、ちょっと からくて、おいしいですね。',
      },
    ],
    quizQuestions: [
      {
        id: 'l12-qz-1',
        question: '食べものを すすめられて、おなかが いっぱいで 断るときの 丁寧な 言いかたは？',
        romaji: 'Tabemono o susumerarete, onaka ga ippai de kotowaru toki no teinei na iikata wa?',
        english: 'How do you politely decline more food because you are full?',
        options: ['ありがとうございます。でも、もう おなかが いっぱいです。', '食べたくないです。', 'からいから いやです。', 'まずいです。'],
        correctIndex: 0,
        explanation: 'Page 156: "ありがとうございます。でも、もう おなかが いっぱいです。"',
      },
    ],
  },

  // =================== TOPIC 7 ===================
  {
    lessonNumber: 13,
    topicNumber: 7,
    topicTitle: 'トピック7 しゅっちょう (Business Trip)',
    title: 'だい13か たなかさんに 会ったことが あります',
    romajiTitle: 'Dai 13-ka: Tanaka-san ni atta koto ga arimasu',
    englishTitle: 'Lesson 13: I Have Met Tanaka-san Before',
    canDos: [
      {
        canDoNumber: 33,
        goal: 'でむかえの ために、しゅっちょうで 来る ひとや 来る 日について 話します (Talk about visitor arrival date and pickup)',
        lines: [
          { speaker: 'A', japanese: '[タイラーさん]、[たなかさん(を)]、しってますか。', romaji: 'Tairaa-san, Tanaka-san (o), shittemasu ka.', english: 'Tyler-san, do you know Tanaka-san?', boxedWords: ['タイラーさん', 'たなかさん(を)'] },
          { speaker: 'B', japanese: 'はい、しってます。／ はい。会ったこと、あります。／ いいえ。会ったこと、ありません。', romaji: 'Hai, shittemasu. / Hai. Atta koto, arimasu. / Iie. Atta koto, arimasen.', english: 'Yes, I know him. / Yes, I have met him. / No, I haven\'t met him.', boxedWords: [] },
          { speaker: 'A', japanese: '[たなかさん] が [12日] に 来ます。[くうこうに むかえに 行って ください]。', romaji: 'Tanaka-san ga jyuuni-nichi ni kimasu. Kuukou ni mukae ni itte kudasai.', english: 'Tanaka-san will arrive on the 12th. Please go to the airport to meet him.', boxedWords: ['たなかさん', '12日', 'くうこうに むかえに 行って ください'] },
          { speaker: 'B', japanese: 'はい、わかりました。[12日] ですね。', romaji: 'Hai, wakarimashita. Jyuuni-nichi desu ne.', english: 'Yes, understood. On the 12th, right?', boxedWords: ['12日'] },
        ],
      },
      {
        canDoNumber: 34,
        goal: 'でむかえの あいさつを します (Greet someone upon meeting them at the airport)',
        lines: [
          { speaker: 'A', japanese: 'ようこそ、[たなかさん]。おつかれさまでした。', romaji: 'Youkoso, Tanaka-san. Otsukaresama deshita.', english: 'Welcome, Tanaka-san. Thank you for your journey / Well done.', boxedWords: ['たなかさん'] },
          { speaker: 'B', japanese: 'おまたせしました。でむかえ、ありがとうございます。', romaji: 'Omatase shimashita. Demukae, arigatou gozaimasu.', english: 'Sorry to have kept you waiting. Thank you for picking me up.', boxedWords: [] },
          { speaker: 'A', japanese: 'フライトは いかがでしたか。／ フライトは どうでしたか。', romaji: 'Furaito wa ikaga deshita ka. / Furaito wa dou deshita ka.', english: 'How was the flight?', boxedWords: [] },
          { speaker: 'B', japanese: 'かいてきでしたよ。／ まあまあでした。', romaji: 'Kaiteki deshita yo. / Maamaa deshita.', english: 'It was comfortable! / It was so-so.', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 35,
        goal: 'ホテルの へやを チェックして、だいじょうぶか 言います (Check hotel room amenities)',
        lines: [
          { speaker: 'A', japanese: 'ちょっと [でんき]、チェックします。', romaji: 'Chotto denki, chekku shimasu.', english: 'I\'ll check the lights for a moment.', boxedWords: ['でんき'] },
          { speaker: 'B', japanese: 'あ、すみません。', romaji: 'A, sumimasen.', english: 'Ah, thank you.', boxedWords: [] },
          { speaker: 'A', japanese: '[でんき] は だいじょうぶです。', romaji: 'Denki wa daijoubu desu.', english: 'The lights are working fine.', boxedWords: ['でんき'] },
          { speaker: 'B', japanese: 'そうですか。どうも ありがとう。', romaji: 'Sou desu ka. Doumo arigatou.', english: 'I see. Thank you very much.', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l13-fb-1',
        prompt: 'はい。会ったこと、[____]。',
        romaji: 'Hai. Atta koto, [____].',
        english: 'Yes, I have met him before.',
        options: ['あります', 'います', 'します', 'ありません'],
        correctAnswers: ['あります'],
        explanation: 'Experience: Verb Ta-form + ことが あります (会ったことが あります).',
      },
      {
        id: 'l13-fb-2',
        prompt: 'くうこうに むかえに [____] ください。',
        romaji: 'Kuukou ni mukae ni [____] kudasai.',
        english: 'Please go to the airport to meet him.',
        options: ['行って', '来て', '見て', 'いて'],
        correctAnswers: ['行って'],
        explanation: 'Purpose of movement: むかえに 行ってください (go in order to meet).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l13-ro-1',
        english: 'Sorry to keep you waiting. Thank you for picking me up.',
        romaji: 'Omatase shimashita. Demukae, arigatou gozaimasu.',
        chunks: ['おまたせしました。', 'でむかえ、', 'ありがとう', 'ございます。'],
        correctOrder: ['おまたせしました。', 'でむかえ、', 'ありがとう', 'ございます。'],
        fullJapanese: 'おまたせしました。でむかえ、ありがとうございます。',
      },
    ],
    quizQuestions: [
      {
        id: 'l13-qz-1',
        question: 'くうこうで むかえた 相手への あいさつは？',
        romaji: 'Kuukou de mukaeta aite e no aisatsu wa?',
        english: 'What is the greeting when picking someone up at the airport?',
        options: ['ようこそ。おつかれさまでした。', 'さようなら。', 'おめでとうございます。', 'いただきます。'],
        correctIndex: 0,
        explanation: 'Page 157: "ようこそ、たなかさん。おつかれさまでした。"',
      },
    ],
  },

  {
    lessonNumber: 14,
    topicNumber: 7,
    topicTitle: 'トピック7 しゅっちょう (Business Trip)',
    title: 'だい14か これ、つかっても いいですか',
    romajiTitle: 'Dai 14-ka: Kore, tsukatte mo ii desu ka',
    englishTitle: 'Lesson 14: May I Use This?',
    canDos: [
      {
        canDoNumber: 37,
        goal: 'かいしゃの スタッフを しょうかいします (Introduce company staff)',
        lines: [
          { speaker: 'A', japanese: 'こちらは [ひしょの キャシーさん] です。', romaji: 'Kochira wa hisho no Kyashii-san desu.', english: 'This is Cathy-san, our secretary.', boxedWords: ['ひしょの キャシーさん'] },
          { speaker: 'B', japanese: '[たなか] です。どうぞ よろしく。', romaji: 'Tanaka desu. Douzo yoroshiku.', english: 'I am Tanaka. Pleased to meet you.', boxedWords: ['たなか'] },
          { speaker: 'C', japanese: 'こちらこそ、どうぞ よろしく。', romaji: 'Kochirakoso, douzo yoroshiku.', english: 'Pleased to meet you too.', boxedWords: [] },
          { speaker: 'A', japanese: '[キャシーさん] は 日本語、[ぺらぺらです]。／ [すこし できます]。', romaji: 'Kyashii-san wa nihongo, perapera desu. / Sukoshi dekimasu.', english: 'Cathy-san is fluent in Japanese. / She can speak a little.', boxedWords: ['キャシーさん', 'ぺらぺらです', 'すこし できます'] },
          { speaker: 'B', japanese: 'そうですか。', romaji: 'Sou desu ka.', english: 'I see.', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 38,
        goal: 'オフィスの ものを つかっても いいか 聞きます (Ask permission to use office equipment)',
        lines: [
          { speaker: 'A', japanese: 'すみません、[コンピューター]、[かりても] いいですか。', romaji: 'Sumimasen, konpyuutaa, karite mo ii desu ka.', english: 'Excuse me, may I borrow a computer?', boxedWords: ['コンピューター', 'かりても'] },
          { speaker: 'B', japanese: 'はい、どうぞ。／ すみません。いま、こわれてます。／ いま、つかってます。', romaji: 'Hai, douzo. / Sumimasen. Ima, kowaretemasu. / Ima, tsukattemasu.', english: 'Yes, please go ahead. / Sorry, it is broken now. / I am using it now.', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 39,
        goal: 'みおくりの あいさつを します (Say goodbye/farewell upon send-off)',
        lines: [
          { speaker: 'A', japanese: '[タイラーさん]、みおくり、ありがとうございました。おせわに なりました。', romaji: 'Tairaa-san, miokuri, arigatou gozaimashita. Osewa ni narimashita.', english: 'Tyler-san, thank you for seeing me off. Thank you for taking good care of me.', boxedWords: ['タイラーさん'] },
          { speaker: 'B', japanese: 'いいえ。[ほんしゃの みなさん] に よろしく おつたえください。', romaji: 'Iie. Honsha no minasan ni yoroshiku otsutaekudasai.', english: 'Not at all. Please give my best regards to everyone at headquarters.', boxedWords: ['ほんしゃの みなさん'] },
          { speaker: 'A', japanese: 'わかりました。それじゃあ、また。', romaji: 'Wakarimashita. Sorejaa, mata.', english: 'Understood. Well then, see you again.', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l14-fb-1',
        prompt: 'すみません、コンピューター、かり [____] いいですか。',
        romaji: 'Sumimasen, konpyuutaa, kari [____] ii desu ka.',
        english: 'Excuse me, may I borrow the computer?',
        options: ['ても', 'ないで', 'たら', 'れば'],
        correctAnswers: ['ても'],
        explanation: 'Asking permission: Verb Te-form + もいいですか (かりても いいですか).',
      },
      {
        id: 'l14-fb-2',
        prompt: 'ほんしゃの みなさんに よろしく [____] ください。',
        romaji: 'Honsha no minasan ni yoroshiku [____] kudasai.',
        english: 'Please give my best regards to everyone at headquarters.',
        options: ['おつたえ', '言って', '話して', '聞いて'],
        correctAnswers: ['おつたえ'],
        explanation: 'Page 158: おつたえください (Please convey my regards).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l14-ro-1',
        english: 'Please give my regards to everyone at headquarters.',
        romaji: 'Honsha no minasan ni yoroshiku otsutaekudasai.',
        chunks: ['ほんしゃの', 'みなさんに', 'よろしく', 'おつたえください。'],
        correctOrder: ['ほんしゃの', 'みなさんに', 'よろしく', 'おつたえください。'],
        fullJapanese: 'ほんしゃの みなさんに よろしく おつたえください。',
      },
    ],
    quizQuestions: [
      {
        id: 'l14-qz-1',
        question: 'かりたい ものが こわれている ときの 断りかたは？',
        romaji: 'Karitai mono ga kowarete iru toki no kotowarikata wa?',
        english: 'How do you decline when the requested item is broken?',
        options: ['すみません。いま、こわれてます。', 'はい、どうぞ。', 'おせわに なりました。', 'こちらこそ、どうぞ。'],
        correctIndex: 0,
        explanation: 'Page 157: "すみません。いま、こわれてます。"',
      },
    ],
  },

  // =================== TOPIC 8 ===================
  {
    lessonNumber: 15,
    topicNumber: 8,
    topicTitle: 'トピック8 けんこう (Health)',
    title: 'だい15か たいそうすると いいですよ',
    romajiTitle: 'Dai 15-ka: Taisou suru to ii desu yo',
    englishTitle: 'Lesson 15: Doing Calisthenics is Good for You',
    canDos: [
      {
        canDoNumber: 41,
        goal: 'ともだちに からだの ぐあいを 聞きます／こたえます (Ask a friend about physical condition / answer)',
        lines: [
          { speaker: 'A', japanese: 'どうしたんですか。', romaji: 'Doushita n desu ka.', english: 'What is the matter?' },
          { speaker: 'B', japanese: 'ちょっと [くび] が いたいんです。', romaji: 'Chotto kubi ga itai n desu.', english: 'My neck hurts a bit.', boxedWords: ['くび'] },
          { speaker: 'A', japanese: 'だいじょうぶですか。', romaji: 'Daijoubu desu ka.', english: 'Are you alright?' },
        ],
      },
      {
        canDoNumber: 42,
        goal: 'かんたんな たいそうの しかたを 聞きます／言います (Ask / describe simple exercises)',
        lines: [
          { speaker: 'A', japanese: '[かた] の たいそうです。こうやって [ゆっくり かたを まわして ください]。', romaji: 'Kata no taisou desu. Kou yatte yukkuri kata o mawashite kudasai.', english: 'It\'s a shoulder exercise. Do it like this: please roll your shoulders slowly.', boxedWords: ['かた', 'ゆっくり かたを まわして ください'] },
          { speaker: 'B', japanese: '[かたを ゆっくり まわします]。', romaji: 'Kata o yukkuri mawashimasu.', english: 'I roll my shoulders slowly.', boxedWords: ['かたを ゆっくり まわします'] },
          { speaker: 'A', japanese: 'どうですか。', romaji: 'Dou desu ka.', english: 'How does it feel?' },
          { speaker: 'B', japanese: 'きもちが いいです。', romaji: 'Kimochi ga ii desu.', english: 'It feels good.', boxedWords: [] },
          { speaker: 'A', japanese: 'あまり むりを しないで くださいね。', romaji: 'Amari muri o shinaide kudasai ne.', english: 'Please don\'t push yourself too hard.', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 43,
        goal: 'からだに いいことを すすめます (Recommend something beneficial for health)',
        lines: [
          { speaker: 'A', japanese: 'どうしたんですか。', romaji: 'Doushita n desu ka.', english: 'What is wrong?' },
          { speaker: 'B', japanese: 'ちょっと [おなかが いたいんです]。', romaji: 'Chotto onaka ga itai n desu.', english: 'My stomach hurts a bit.', boxedWords: ['おなかが いたいんです'] },
          { speaker: 'A', japanese: 'だいじょうぶですか。[ねる まえに、この くすりを 飲むと いいです] よ。', romaji: 'Daijoubu desu ka. Neru mae ni, kono kusuri o nomu to ii desu yo.', english: 'Are you alright? It is good to take this medicine before going to sleep.', boxedWords: ['ねる まえに、この くすりを 飲むと いいです'] },
          { speaker: 'B', japanese: 'ありがとうございます。', romaji: 'Arigatou gozaimasu.', english: 'Thank you.', boxedWords: [] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l15-fb-1',
        prompt: 'ねる まえに、この くすりを 飲む [____] いいですよ。',
        romaji: 'Neru mae ni, kono kusuri o nomu [____] ii desu yo.',
        english: 'It is good if you drink this medicine before sleeping.',
        options: ['と', 'たら', 'なら', 'から'],
        correctAnswers: ['と'],
        explanation: 'Page 158: Advice condition with Verb Dictionary form + といいですよ (飲むと いいですよ).',
      },
      {
        id: 'l15-fb-2',
        prompt: 'あまり むりを [____] くださいね。',
        romaji: 'Amari muri o [____] kudasai ne.',
        english: 'Please do not push yourself too hard.',
        options: ['しないで', 'して', 'しなくて', 'した'],
        correctAnswers: ['しないで'],
        explanation: 'Negative request: Verb Nai-form + でください (しないで ください).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l15-ro-1',
        english: 'Please slowly rotate your shoulders like this.',
        romaji: 'Kou yatte yukkuri kata o mawashite kudasai.',
        chunks: ['こうやって', 'ゆっくり', 'かたを', 'まわして ください。'],
        correctOrder: ['こうやって', 'ゆっくり', 'かたを', 'まわして ください。'],
        fullJapanese: 'こうやって ゆっくり かたを まわして ください。',
      },
    ],
    quizQuestions: [
      {
        id: 'l15-qz-1',
        question: 'いたがっている 人に「がんばりすぎないで」と 声をかける 言いかたは？',
        romaji: 'Itagatte iru hito ni "ganbarisuginaide" to koe o kakeru iikata wa?',
        english: 'How do you tell someone in pain not to overdo it?',
        options: ['あまり むりを しないで くださいね。', 'もっと たいそうを してください。', 'はしったり およいだり してください。', 'どうしたんですか。'],
        correctIndex: 0,
        explanation: 'Page 158: "あまり むりを しないで くださいね。"',
      },
    ],
  },

  {
    lessonNumber: 16,
    topicNumber: 8,
    topicTitle: 'トピック8 けんこう (Health)',
    title: 'だい16か はしったり、およいだり しています',
    romajiTitle: 'Dai 16-ka: Hashittari, oyoidari shite imasu',
    englishTitle: 'Lesson 16: I Do Things Like Running and Swimming',
    canDos: [
      {
        canDoNumber: 44,
        goal: 'けんこうの ために している ことを かんたんに 話します (Briefly talk about what you do for your health)',
        lines: [
          { speaker: 'A', japanese: 'けんこうの ために なにか してますか。', romaji: 'Kenkou no tame ni nanika shitemasu ka.', english: 'Do you do anything for your health?' },
          { speaker: 'B', japanese: 'はい、[ヨガ] を してます。／ はい、[ヨガを したり、トレーニングを したり] してます。', romaji: 'Hai, yoga o shitemasu. / Hai, yoga o shitari, toreeningu o shitari shitemasu.', english: 'Yes, I do yoga. / Yes, I do things like yoga and fitness training.', boxedWords: ['ヨガ', 'ヨガを したり、トレーニングを したり'] },
          { speaker: 'A', japanese: 'そうですか。どのぐらい してますか。', romaji: 'Sou desu ka. Donogurai shitemasu ka.', english: 'Is that so? How often do you do it?' },
          { speaker: 'B', japanese: '[まいにち] です。／ [トレーニング] は [しゅうに 2かい] です。', romaji: 'Mainichi desu. / Toreeningu wa shuu ni nikai desu.', english: 'Every day. / Workout training is twice a week.', boxedWords: ['まいにち', 'トレーニング', 'しゅうに 2かい'] },
          { speaker: 'A', japanese: 'そうですか。', romaji: 'Sou desu ka.', english: 'I see.', boxedWords: [] },
          { speaker: 'B (alt)', japanese: 'いいえ、なにも してません。', romaji: 'Iie, nanimo shitemasen.', english: 'No, I don’t do anything.', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 46,
        goal: 'アンケートの けっかを かんたんな ことばで はっぴょうします (Present survey results in simple words)',
        lines: [
          { japanese: '[Aグループ] の こたえを 言います。', romaji: 'Ee-guruupu no kotae o iimasu.', english: 'I will state Group A’s answers.', boxedWords: ['Aグループ'] },
          { japanese: '[スポーツを よく する] ひとは [3にん] です。', romaji: 'Supootsu o yoku suru hito wa san-nin desu.', english: 'People who often do sports are 3 people.', boxedWords: ['スポーツを よく する', '3にん'] },
          { japanese: '[ときどき する] ひとは [7にん] です。', romaji: 'Tokidoki suru hito wa nana-nin desu.', english: 'People who sometimes do sports are 7 people.', boxedWords: ['ときどき する', '7にん'] },
          { japanese: '[しない] ひとは [5にん] です。', romaji: 'Shinai hito wa go-nin desu.', english: 'People who do not do sports are 5 people.', boxedWords: ['しない', '5にん'] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l16-fb-1',
        prompt: 'ヨガを [____]、トレーニングを したり してます。',
        romaji: 'Yoga o [____], toreeningu o shitari shitemasu.',
        english: 'I do things like yoga and workout training.',
        options: ['したり', 'して', 'する', 'した'],
        correctAnswers: ['したり'],
        explanation: 'Listing actions: 〜たり、〜たり します (ヨガを したり、トレーニングを したり).',
      },
      {
        id: 'l16-fb-2',
        prompt: 'スポーツを ときどき する ひとは [____] です。',
        romaji: 'Supootsu o tokidoki suru hito wa [____] desu.',
        english: 'People who sometimes do sports are 7 people.',
        options: ['7にん', '7本', '7まい', '7つ'],
        correctAnswers: ['7にん'],
        explanation: 'Counting people takes にん (7にん).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l16-ro-1',
        english: 'Do you do anything for your health?',
        romaji: 'Kenkou no tame ni nanika shitemasu ka.',
        chunks: ['けんこうの', 'ために', 'なにか', 'してますか。'],
        correctOrder: ['けんこうの', 'ために', 'なにか', 'してますか。'],
        fullJapanese: 'けんこうの ために なにか してますか。',
      },
    ],
    quizQuestions: [
      {
        id: 'l16-qz-1',
        question: '「どのぐらい してますか」への 頻度（ひんど）のこたえは？',
        romaji: '"Donogurai shitemasu ka" e no hindo no kotae wa?',
        english: 'What is a frequency response to "How often do you do it?"',
        options: ['しゅうに 2かい です。', 'ヨガを してます。', '3にんです。', 'いいえ、してません。'],
        correctIndex: 0,
        explanation: 'Page 158: "トレーニングは しゅうに 2かい です。"',
      },
    ],
  },

  // =================== TOPIC 9 ===================
  {
    lessonNumber: 17,
    topicNumber: 9,
    topicTitle: 'トピック9 おいわい (Celebrations)',
    title: 'だい17か たんじょうびに もらったんです',
    romajiTitle: 'Dai 17-ka: Tanjoubi ni moratta n desu',
    englishTitle: 'Lesson 17: I Received It for My Birthday',
    canDos: [
      {
        canDoNumber: 47,
        goal: 'ともだちの もちものを ほめます (Compliment a friend’s possession)',
        lines: [
          { speaker: 'A', japanese: 'その [ネックレス]、[すてきです] ね。', romaji: 'Sono nekkuresu, suteki desu ne.', english: 'That necklace is wonderful, isn\'t it!', boxedWords: ['ネックレス', 'すてきです'] },
          { speaker: 'B', japanese: 'これ、[たんじょうびに] [かれに もらったんです]。', romaji: 'Kore, tanjoubi ni kare ni moratta n desu.', english: 'This, I received it from my boyfriend for my birthday.', boxedWords: ['たんじょうびに', 'かれに もらったんです'] },
          { speaker: 'A', japanese: 'そうですか。[いいです] ね。', romaji: 'Sou desu ka. Ii desu ne.', english: 'Is that so? That’s so nice.', boxedWords: ['いいです'] },
          { speaker: 'B', japanese: 'ありがとうございます。', romaji: 'Arigatou gozaimasu.', english: 'Thank you.', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 49,
        goal: 'じぶんの くにの プレゼントの しゅうかんについて 話します (Talk about gift-giving customs in your country)',
        lines: [
          { speaker: 'A', japanese: '[よしださん] は／ [日本] では、[けっこん] の おいわいに どんな ものを あげますか。', romaji: 'Yoshida-san wa / Nihon dewa, kekkon no oiwai ni donna mono o agemasu ka.', english: 'Yoshida-san / In Japan, what kind of things do you give for wedding celebrations?', boxedWords: ['よしださん', '日本', 'けっこん'] },
          { speaker: 'B', japanese: '[え] とか [とけい] を あげます。／ [へやに かざる もの] が おおいです。たとえば、[え] とか [とけい] です。', romaji: 'E toka tokei o agemasu. / Heya ni kazaru mono ga ooi desu. Tatoeba, e toka tokei desu.', english: 'We give things like paintings or clocks. / Things to decorate rooms are common. For example, paintings or clocks.', boxedWords: ['え', 'とけい', 'へやに かざる もの', 'え', 'とけい'] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l17-fb-1',
        prompt: 'これ、たんじょうびに かれに [____]。',
        romaji: 'Kore, tanjoubi ni kare ni [____].',
        english: 'This, I received it from my boyfriend for my birthday.',
        options: ['もらったんです', 'あげたんです', 'くれたんです', '買ったんです'],
        correctAnswers: ['もらったんです'],
        explanation: 'Page 159: Receiving from someone: [person] に もらったんです.',
      },
      {
        id: 'l17-fb-2',
        prompt: 'けっこんの おいわいに え [____] とけいを あげます。',
        romaji: 'Kekkon no oiwai ni e [____] tokei o agemasu.',
        english: 'We give things like paintings or clocks for wedding celebration.',
        options: ['とか', 'から', 'ので', 'けど'],
        correctAnswers: ['とか'],
        explanation: 'Listing non-exhaustive examples: A とか B (paintings and clocks etc.).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l17-ro-1',
        english: 'That necklace is wonderful, isn’t it!',
        romaji: 'Sono nekkuresu, suteki desu ne.',
        chunks: ['その', 'ネックレス、', 'すてき', 'ですね。'],
        correctOrder: ['その', 'ネックレス、', 'すてき', 'ですね。'],
        fullJapanese: 'その ネックレス、すてき ですね。',
      },
    ],
    quizQuestions: [
      {
        id: 'l17-qz-1',
        question: '「その ネックレス、すてきですね」と ほめられたときの こたえは？',
        romaji: '"Sono nekkuresu, suteki desu ne" to homerareta toki no kotae wa?',
        english: 'How do you explain origin when someone compliments your necklace?',
        options: ['たんじょうびに かれに もらったんです。', 'え とか とけいを あげます。', 'しゅうに 1かい べんきょうします。', 'パーティーが いいと おもいます。'],
        correctIndex: 0,
        explanation: 'Page 159: "これ、たんじょうびに かれに もらったんです。"',
      },
    ],
  },

  {
    lessonNumber: 18,
    topicNumber: 9,
    topicTitle: 'トピック9 おいわい (Celebrations)',
    title: 'だい18か パーティーが いいと おもいます',
    romajiTitle: 'Dai 18-ka: Paatii ga ii to omoimasu',
    englishTitle: 'Lesson 18: I Think a Party Would Be Good',
    canDos: [
      {
        canDoNumber: 50,
        goal: 'ともだちの おいわいを なんに するか 話します (Discuss what to do for a friend’s celebration)',
        lines: [
          { speaker: 'A', japanese: '[あべさんの けっこん] の おいわい、どうしますか。', romaji: 'Abe-san no kekkon no oiwai, dou shimasu ka.', english: 'For Abe-san’s wedding celebration, what shall we do?', boxedWords: ['あべさんの けっこん'] },
          { speaker: 'B', japanese: '[パーティー] が いいと おもいます。', romaji: 'Paatii ga ii to omoimasu.', english: 'I think a party would be good.', boxedWords: ['パーティー'] },
          { speaker: 'A', japanese: '[パーティー] ですか。', romaji: 'Paatii desu ka.', english: 'A party?', boxedWords: ['パーティー'] },
          { speaker: 'B', japanese: 'ええ、[あべさん、みんなと 話したい] と 言ってました。', romaji: 'Ee, Abe-san, minna to hanashitai to ittemashita.', english: 'Yes, Abe-san said she wants to talk with everyone.', boxedWords: ['あべさん、みんなと 話したい'] },
          { speaker: 'A', japanese: 'いいですね。', romaji: 'Ii desu ne.', english: 'Sounds great!', boxedWords: [] },
        ],
      },
      {
        canDoNumber: 53,
        goal: 'プレゼントを もらって おれいを 言います (Express thanks upon receiving a present)',
        lines: [
          { speaker: 'A', japanese: 'これ、おいわいの プレゼントです。[シンさんと わたし] からです。どうぞ。', romaji: 'Kore, oiwai no purezento desu. Shin-san to watashi kara desu. Douzo.', english: 'This is a celebration present. It is from Shin-san and me. Here you are.', boxedWords: ['シンさんと わたし'] },
          { speaker: 'B', japanese: 'どうも ありがとうございます。あけても いいですか。', romaji: 'Doumo arigatou gozaimasu. Akete mo ii desu ka.', english: 'Thank you very much. May I open it?', boxedWords: [] },
          { speaker: 'A', japanese: 'はい、どうぞ。', romaji: 'Hai, douzo.', english: 'Yes, please do.', boxedWords: [] },
          { speaker: 'B', japanese: '[すてきな コーヒーカップ] ですね。ありがとうございます。', romaji: 'Suteki na koohii kappu desu ne. Arigatou gozaimasu.', english: 'What a wonderful coffee cup! Thank you so much.', boxedWords: ['すてきな コーヒーカップ'] },
        ],
      },
    ],
    fillBlankQuestions: [
      {
        id: 'l18-fb-1',
        prompt: 'パーティーが いい [____] おもいます。',
        romaji: 'Paatii ga ii [____] omoimasu.',
        english: 'I think a party would be good.',
        options: ['と', 'に', 'を', 'が'],
        correctAnswers: ['と'],
        explanation: 'Expressing opinion: Plain Form + と おもいます (いいと おもいます).',
      },
      {
        id: 'l18-fb-2',
        prompt: 'あべさん、みんなと 話したい [____] 言ってました。',
        romaji: 'Abe-san, minna to hanashitai [____] ittemashita.',
        english: 'Abe-san said that she wants to talk with everyone.',
        options: ['と', 'に', 'で', 'から'],
        correctAnswers: ['と'],
        explanation: 'Quoting speech: 〜と 言ってました (said that...).',
      },
    ],
    reorderQuestions: [
      {
        id: 'l18-ro-1',
        english: 'Thank you very much. May I open it?',
        romaji: 'Doumo arigatou gozaimasu. Akete mo ii desu ka.',
        chunks: ['どうも', 'ありがとう', 'ございます。', 'あけても', 'いいですか。'],
        correctOrder: ['どうも', 'ありがとう', 'ございます。', 'あけても', 'いいですか。'],
        fullJapanese: 'どうも ありがとうございます。あけても いいですか。',
      },
    ],
    quizQuestions: [
      {
        id: 'l18-qz-1',
        question: 'プレゼントを もらった あと、あけてよいか たずねる 言いかたは？',
        romaji: 'Purezento o moratta ato, akete yoi ka tazuneru iikata wa?',
        english: 'After receiving a gift, how do you ask if you may open it?',
        options: ['あけても いいですか。', 'あけて ください。', 'あけましょうか。', 'あけましたか。'],
        correctIndex: 0,
        explanation: 'Page 159: "あけても いいですか。" (May I open it?)',
      },
    ],
  },
];
