import { BookLesson, BookChapter } from '../types/coursebook';

export const BOOK_CHAPTERS: BookChapter[] = [
  { topicNumber: 1, title: 'トピック1 私とかぞく', englishTitle: 'Topic 1: Myself and My Family', lessons: [1, 2] },
  { topicNumber: 2, title: 'トピック2 きせつと天気', englishTitle: 'Topic 2: Seasons and Weather', lessons: [3, 4] },
  { topicNumber: 3, title: 'トピック3 私の町', englishTitle: 'Topic 3: My Town', lessons: [5, 6] },
  { topicNumber: 4, title: 'トピック4 出かける', englishTitle: 'Topic 4: Going Out', lessons: [7, 8] },
  { topicNumber: 5, title: 'トピック5 外国語と外国文化', englishTitle: 'Topic 5: Foreign Languages and Cultures', lessons: [9, 10] },
  { topicNumber: 6, title: 'トピック6 そとで食べる', englishTitle: 'Topic 6: Eating Outdoors', lessons: [11, 12] },
  { topicNumber: 7, title: 'トピック7 出張', englishTitle: 'Topic 7: Business Trips', lessons: [13, 14] },
  { topicNumber: 8, title: 'トピック8 けんこう', englishTitle: 'Topic 8: Staying Healthy', lessons: [15, 16] },
  { topicNumber: 9, title: 'トピック9 お祝い', englishTitle: 'Topic 9: Celebrations', lessons: [17, 18] },
];

export const BOOK_LESSONS: BookLesson[] = [
  // ==========================================
  // LESSON 1: 東京にすんでいます
  // ==========================================
  {
    lessonNumber: 1,
    topicNumber: 1,
    topicTitle: 'トピック1 私とかぞく',
    title: 'だい1か 東京に すんでいます',
    romajiTitle: 'Dai 1-ka: Toukyou ni sunde imasu',
    englishTitle: 'Lesson 1: We Live in Tokyo',
    vocabulary: {
      title: 'もじとことば (Words & Family Terms)',
      keyWords: [
        { word: 'ちち / お父さん', kana: 'ちち / おとうさん', romaji: 'chichi / otousan', meaning: 'My father / (Someone\'s) father', category: 'Family' },
        { word: 'はは / お母さん', kana: 'はは / おかあさん', romaji: 'haha / okaasan', meaning: 'My mother / (Someone\'s) mother', category: 'Family' },
        { word: 'あに / お兄さん', kana: 'あに / おにいさん', romaji: 'ani / oniisan', meaning: 'Older brother', category: 'Family' },
        { word: 'あね / お姉さん', kana: 'あね / おねえさん', romaji: 'ane / oneesan', meaning: 'Older sister', category: 'Family' },
        { word: 'おとうと', kana: 'おとうと', romaji: 'otouto', meaning: 'Younger brother', category: 'Family' },
        { word: 'いもうと', kana: 'いもうと', romaji: 'imouto', meaning: 'Younger sister', category: 'Family' },
        { word: 'おっと / ご主人', kana: 'おっと / ごしゅじん', romaji: 'otto / goshujin', meaning: 'Husband', category: 'Family' },
        { word: 'つま / 奥さん', kana: 'つま / おくさん', romaji: 'tsuma / okusan', meaning: 'Wife', category: 'Family' },
        { word: 'むすこ / むすめ', kana: 'むすこ / むすめ', romaji: 'musuko / musume', meaning: 'Son / Daughter', category: 'Family' },
        { word: 'りょうしん', kana: 'りょうしん', romaji: 'ryoushin', meaning: 'Parents', category: 'Family' },
        { word: 'きょうだい', kana: 'きょうだい', romaji: 'kyoudai', meaning: 'Siblings', category: 'Family' },
        { word: 'しんせき', kana: 'しんせき', romaji: 'shinseki', meaning: 'Relatives', category: 'Family' },
        { word: '会社員', kana: 'かいしゃいん', romaji: 'kaishain', meaning: 'Company employee', category: 'Work' },
        { word: '主婦', kana: 'しゅふ', romaji: 'shufu', meaning: 'Housewife / Homemaker', category: 'Work' },
      ],
      exercises: [
        {
          id: 'b-l1-v1',
          instruction: 'ただしい ことばを えらびましょう。(Choose the polite form matching the humble family term)',
          prompt: 'ちち ➔ (　　) おとうさん',
          type: 'choice',
          options: ['おとうさん', 'おかあさん', 'おにいさん', 'おねえさん'],
          correctAnswer: 'おとうさん',
          explanation: 'ちち (my father) corresponds to polite おとうさん.',
        },
        {
          id: 'b-l1-v2',
          instruction: 'ただしい ことばを えらびましょう。(Choose the correct pair)',
          prompt: 'りょうしん ➔ (　　)',
          type: 'choice',
          options: ['ちち と はは', 'あに と あね', 'むすこ と むすめ', 'おじ と おば'],
          correctAnswer: 'ちち と はは',
          explanation: 'りょうしん (parents) means ちち と はは (father and mother).',
        },
        {
          id: 'b-l1-v3',
          instruction: 'ことばを 入れて ください。(Fill in the blank)',
          prompt: 'わたしの かぞくは 3にんです。おっと と (　　) です。',
          type: 'fill',
          options: ['むすめ', 'しんせき', 'りょうしん', 'ともだち'],
          correctAnswer: 'むすめ',
          explanation: 'Textbook page 22 & 23: おっと と むすめ (husband and daughter).',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'V-ています (すんでいます / はたらいています)',
          meaning: 'Present state resulting from past action / Habitual occupation',
          explanation: 'Use すんでいます for where you live (with に) and はたらいています for where you work (with で).',
          examples: [
            { japanese: '私は 東京に すんでいます。', romaji: 'Watashi wa Toukyou ni sunde imasu.', english: 'I live in Tokyo.' },
            { japanese: 'ホテルで はたらいています。', romaji: 'Hoteru de hataraite imasu.', english: 'I work at a hotel.' },
          ],
        },
        {
          pattern: 'N(place) に すむ / N(workplace) で はたらく',
          meaning: 'Particle distinction: に for residence location, で for activity location',
          explanation: 'に marks the point of existence (residence), while で marks the location of active labor.',
          examples: [
            { japanese: '国立に すんでいます。', romaji: 'Kunitachi ni sunde imasu.', english: 'I live in Kunitachi.' },
            { japanese: '電車の 会社で はたらいています。', romaji: 'Densha no kaisha de hataraite imasu.', english: 'I work at a railway company.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l1-g1',
          instruction: 'ただしい ほうを えらびましょう。(Choose the correct verb form)',
          prompt: '東京の 国立に ( a すんでいます　b すみます )。',
          type: 'choice',
          options: ['すんでいます', 'すみます'],
          correctAnswer: 'すんでいます',
          explanation: 'Living in a place is an ongoing state, so use すんでいます.',
        },
        {
          id: 'b-l1-g2',
          instruction: 'ただしい じょし(に・で)を えらびましょう。(Choose particle に or で)',
          prompt: 'おっとは コンピューターの かいしゃ (　　) はたらいています。',
          type: 'choice',
          options: ['で', 'に', 'を', 'と'],
          correctAnswer: 'で',
          explanation: 'Workplace of active employment takes particle で.',
        },
        {
          id: 'b-l1-g3',
          instruction: 'ただしい かたちを えらんで ください。(Select the correct continuous negative form)',
          prompt: '私は しゅふです。しごとは (　　)。',
          type: 'choice',
          options: ['していません', 'します', 'しています', 'しませんでした'],
          correctAnswer: 'していません',
          explanation: 'Habitual negative occupation: しごとは していません (I am not working).',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 004-007: すずき まりさんの かぞく',
      situation: 'Mari Suzuki is talking about where her family and relatives live and work.',
      dialogueScript: [
        { speaker: 'まり', japanese: 'わたしは すずき まりです。とうきょうに すんでいます。', romaji: 'Watashi wa Suzuki Mari desu. Toukyou ni sunde imasu.', english: 'I am Mari Suzuki. I live in Tokyo.' },
        { speaker: 'まり', japanese: 'わたしの かぞくは 3にんです。おっとと むすめと わたしです。', romaji: 'Watashi no kazoku wa san-nin desu. Otto to musume to watashi desu.', english: 'My family has 3 people. My husband, daughter, and myself.' },
        { speaker: 'まり', japanese: 'わたしは ホテルで はたらいています。', romaji: 'Watashi wa hoteru de hataraite imasu.', english: 'I work at a hotel.' },
        { speaker: 'まり', japanese: 'あには ちゅうごくに すんでいます。くるまの かいしゃで はたらいています。', romaji: 'Ani wa Chuugoku ni sunde imasu. Kuruma no kaisha de hataraite imasu.', english: 'My older brother lives in China. He works at an automobile company.' },
        { speaker: 'まり', japanese: 'あねは イタリアに すんでいます。オペラを べんきょうしています。', romaji: 'Ane wa Itaria ni sunde imasu. Opera o benkyou shite imasu.', english: 'My older sister lives in Italy. She is studying opera.' },
      ],
      exercises: [
        {
          id: 'b-l1-l1',
          instruction: 'まりさんの おにいさんは どこに すんでいますか。(Where does Mari\'s brother live?)',
          prompt: 'おにいさんの すんでいる くには？',
          type: 'choice',
          options: ['ちゅうごく (China)', 'イタリア (Italy)', 'ブラジル (Brazil)', 'アメリカ (USA)'],
          correctAnswer: 'ちゅうごく (China)',
          explanation: 'Audio script: "あには ちゅうごくに すんでいます。"',
        },
        {
          id: 'b-l1-l2',
          instruction: 'まりさんの おねえさんは なにを していますか。(What is Mari\'s sister doing?)',
          prompt: 'おねえさんの しごとは？',
          type: 'choice',
          options: ['オペラを べんきょうしています', 'ホテルで はたらいています', 'しゅふです', 'かいしゃいんです'],
          correctAnswer: 'オペラを べんきょうしています',
          explanation: 'Audio script: "あねは イタリアに すんでいます。オペラを べんきょうしています。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: まごからの メール (Email from Grandchild)',
      genre: 'Email / Message',
      passage: [
        { japanese: 'おばあちゃん、りょうです。東京は どうですか。', romaji: 'Obaachan, Ryou desu. Toukyou wa dou desu ka.', english: 'Grandma, it\'s Ryo. How is Tokyo?' },
        { japanese: 'らいしゅう、広島に 来ますね。(^o^)', romaji: 'Raishuu, Hiroshima ni kimasu ne.', english: 'You are coming to Hiroshima next week, right?' },
        { japanese: 'おじいちゃんも いっしょに 来ますか。', romaji: 'Ojiichan mo issho ni kimasu ka.', english: 'Is Grandpa coming together with you too?' },
        { japanese: '私は まいにち 日本語を べんきょうしています。広島で 日本語と えいごで たくさん 話しましょう。', romaji: 'Watashi wa mainichi nihongo o benkyou shite imasu. Hiroshima de nihongo to eigo de takusan hanashimashou.', english: 'I study Japanese every day. Let\'s talk a lot in Japanese and English in Hiroshima.' },
        { japanese: 'おじいちゃんは 日本語を べんきょうしていません。2人で おしえましょう。じゃあね。', romaji: 'Ojiichan wa nihongo o benkyou shite imasen. Futari de oshiemashou. Jaa ne.', english: 'Grandpa is not studying Japanese. Let\'s teach him together! See you.' },
      ],
      exercises: [
        {
          id: 'b-l1-r1',
          instruction: 'ただしいですか、ただしくないですか。(Is it true (○) or false (×)?)',
          prompt: '1. りょうくんは ジョイさんの まごです。',
          type: 'choice',
          options: ['○ (True)', '× (False)'],
          correctAnswer: '○ (True)',
          explanation: 'Ryo-kun addresses Joy as おばあちゃん (Grandma).',
        },
        {
          id: 'b-l1-r2',
          instruction: 'ただしいですか、ただしくないですか。(True or False?)',
          prompt: '2. りょうくんは いま、広島に すんでいます。',
          type: 'choice',
          options: ['○ (True)', '× (False)'],
          correctAnswer: '○ (True)',
          explanation: 'Ryo welcomes grandma to Hiroshima: "らいしゅう、広島に来ますね。"',
        },
        {
          id: 'b-l1-r3',
          instruction: 'ただしいですか、ただしくないですか。(True or False?)',
          prompt: '3. おじいちゃんは 日本語を べんきょうしています。',
          type: 'choice',
          options: ['○ (True)', '× (False)'],
          correctAnswer: '× (False)',
          explanation: 'The email explicitly says: "おじいちゃんは 日本語を べんきょうしていません。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 私の かぞく (My Family and Self-Introduction)',
      promptInstruction: 'モデル文を みて、あなたの かぞくや しごとについて かきましょう。(Write about yourself, your family size, residence, and occupations)',
      scaffoldQuestions: [
        '1. あなたの なまえは 何ですか。どこに すんでいますか。',
        '2. かぞくは 何人ですか。だれと だれですか。',
        '3. かぞくの しごとは 何ですか。どこで はたらいていますか。',
      ],
      modelEssay: {
        japanese: '私は ジョイ・カーターです。東京の 品川に すんでいます。かぞくは 2人です。おっとと 私です。おっとの しごとは コンサルタントです。コンピューターの かいしゃで はたらいています。私は しごとは していません。がっこうで 日本語を べんきょうしています。',
        romaji: 'Watashi wa Joi Kaataa desu. Toukyou no Shinagawa ni sunde imasu. Kazoku wa futari desu. Otto to watashi desu. Otto no shigoto wa konsarutanto desu. Konpyuutaa no kaisha de hataraite imasu. Watashi wa shigoto wa shite imasen. Gakkou de nihongo o benkyou shite imasu.',
        english: 'I am Joy Carter. I live in Shinagawa, Tokyo. My family has 2 people: my husband and me. My husband\'s job is consultant; he works at a computer company. I do not work right now; I am studying Japanese at school.',
      },
      sampleAnswer: 'わたしは [なまえ] です。[ばしょ] に すんでいます。かぞくは [かず] にんです。[かぞく] と わたしです。[おっと/ちち] は [かいしゃ] で はたらいています。',
    },
  },

  // ==========================================
  // LESSON 2: しゅみは クラシックを聞くことです
  // ==========================================
  {
    lessonNumber: 2,
    topicNumber: 1,
    topicTitle: 'トピック1 私とかぞく',
    title: 'だい2か しゅみは クラシックを 聞くことです',
    romajiTitle: 'Dai 2-ka: Shumi wa kurashikku o kiku koto desu',
    englishTitle: 'Lesson 2: My Hobby is Listening to Classical Music',
    vocabulary: {
      title: 'もじとことば (Hobbies & Activities)',
      keyWords: [
        { word: 'しゅみ', kana: 'しゅみ', romaji: 'shumi', meaning: 'Hobby', category: 'Hobbies' },
        { word: 'りょうり', kana: 'りょうり', romaji: 'ryouri', meaning: 'Cooking', category: 'Hobbies' },
        { word: '読書', kana: 'どくしょ', romaji: 'dokusho', meaning: 'Reading books', category: 'Hobbies' },
        { word: '旅行', kana: 'りょこう', romaji: 'ryokou', meaning: 'Traveling', category: 'Hobbies' },
        { word: '写真をとる', kana: 'しゃしんをとる', romaji: 'shashin o toru', meaning: 'Taking photos', category: 'Hobbies' },
        { word: '切手をあつめる', kana: 'きってをあつめる', romaji: 'kitte o atsumeru', meaning: 'Collecting stamps', category: 'Hobbies' },
        { word: '絵をかく', kana: 'えをかく', romaji: 'e o kaku', meaning: 'Painting / drawing pictures', category: 'Hobbies' },
        { word: '将棋', kana: 'しょうぎ', romaji: 'shougi', meaning: 'Japanese chess (shogi)', category: 'Hobbies' },
        { word: '編み物', kana: 'あみもの', romaji: 'amimono', meaning: 'Knitting', category: 'Hobbies' },
      ],
      exercises: [
        {
          id: 'b-l2-v1',
          instruction: 'ただしい 動詞(どうし)を えらびましょう。(Select the right verb for cooking)',
          prompt: 'りょうりを (　　)。',
          type: 'choice',
          options: ['つくります', 'よみます', 'かきます', 'ききます'],
          correctAnswer: 'つくります',
          explanation: 'りょうりを つくります = make food / cook dishes.',
        },
        {
          id: 'b-l2-v2',
          instruction: 'ただしい 動詞を えらびましょう。(Select verb for stamps/coins)',
          prompt: 'きってを (　　)。',
          type: 'choice',
          options: ['あつめます', 'ねます', 'いきます', 'とります'],
          correctAnswer: 'あつめます',
          explanation: 'きってを あつめます = to collect stamps.',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'しゅみは V-ること です',
          meaning: 'Expressing a hobby using a nominalized verb',
          explanation: 'Add こと to dictionary form of verb to make it a noun phrase (きくこと, みること, つくること).',
          examples: [
            { japanese: 'しゅみは クラシックを 聞くことです。', romaji: 'Shumi wa kurashikku o kiku koto desu.', english: 'My hobby is listening to classical music.' },
            { japanese: 'しゅみは えを かくことです。', romaji: 'Shumi wa e o kaku koto desu.', english: 'My hobby is painting pictures.' },
          ],
        },
        {
          pattern: '〜とき (こどもの とき / わかい とき / ひまな とき)',
          meaning: 'When... / At the time of...',
          explanation: 'Noun + のとき, イA + とき, ナA + なとき.',
          examples: [
            { japanese: 'こどもの とき、よく サッカーを しました。', romaji: 'Kodomo no toki, yoku sakkaa o shimashita.', english: 'When I was a child, I often played soccer.' },
            { japanese: 'ひまな とき、なにを しますか。', romaji: 'Hima na toki, nani o shimasu ka.', english: 'What do you do in your free time?' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l2-g1',
          instruction: '正しい ほうを えらびましょう。(Choose the correct nominalized form)',
          prompt: '私の しゅみは おんがくを ( a 聞くことです　b 聞きます )。',
          type: 'choice',
          options: ['聞くことです', '聞きます'],
          correctAnswer: '聞くことです',
          explanation: 'Nominalized verb predicate: 聞くことです.',
        },
        {
          id: 'b-l2-g2',
          instruction: 'ただしい かたちを えらびましょう。(Choose the noun/adjective connection with とき)',
          prompt: 'こども (　　) とき、日本のアニメを 見ました。',
          type: 'choice',
          options: ['の', 'な', 'に', 'で'],
          correctAnswer: 'の',
          explanation: 'Noun + のとき: こどもの とき (when I was a child).',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 013-017: 5人の しゅみ',
      situation: '5 people discuss what their hobbies are and what they did in their youth.',
      dialogueScript: [
        { speaker: 'のだ', japanese: 'しゅみですか。クラシックおんがくを きくことです。とくに バッハが すきです。', romaji: 'Shumi desu ka. Kurashikku ongaku o kiku koto desu. Tokuni Bahha ga suki desu.', english: 'My hobby? Listening to classical music. In particular, I like Bach.' },
        { speaker: 'さとう', japanese: 'わたしの しゅみは がいこくごを べんきょうすることです。えいごと ドイツごを べんきょうしました。', romaji: 'Watashi no shumi wa gaikokugo o benkyou suru koto desu. Eigo to Doitsugo o benkyou shimashita.', english: 'My hobby is studying foreign languages. I studied English and German.' },
        { speaker: 'ヤン', japanese: 'サッカーの しあいを みることです。こどもの とき よく サッカーを しました。', romaji: 'Sakkaa no shiai o miru koto desu. Kodomo no toki yoku sakkaa o shimashita.', english: 'Watching soccer matches. When I was a kid, I often played soccer.' },
      ],
      exercises: [
        {
          id: 'b-l2-l1',
          instruction: 'のださんの しゅみは なんですか。(What is Noda-san\'s hobby?)',
          prompt: 'のださんの しゅみ：',
          type: 'choice',
          options: ['クラシックおんがくを きくこと', 'がいこくごの べんきょう', 'サッカーを みること', 'しゃしんを とること'],
          correctAnswer: 'クラシックおんがくを きくこと',
          explanation: 'Noda-san said: "クラシックおんがくを きくことです。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 私の しゅみ (My Hobby Blog)',
      genre: 'Blog profile',
      passage: [
        { japanese: 'しゅみは えを 見ることです。びじゅつかんに よく 行きます。1人で行きます。とくに、モネが すきです。', romaji: 'Shumi wa e o miru koto desu. Bijutsukan ni yoku ikimasu. Hitori de ikimasu. Tokuni, Mone ga suki desu.', english: 'My hobby is viewing paintings. I often go to art museums by myself. In particular, I love Monet.' },
        { japanese: 'しゅみは りょうりを つくることです。子どもの ときから りょうりが すきです。ぎゅうどんが とくいです。', romaji: 'Shumi wa ryouri o tsukuru koto desu. Kodomo no toki kara ryouri ga suki desu. Gyuudon ga tokui desu.', english: 'My hobby is cooking. Ever since I was a child, I have loved cooking. I am good at beef bowl.' },
      ],
      exercises: [
        {
          id: 'b-l2-r1',
          instruction: '本文に あうものを えらびましょう。(Choose what matches the text)',
          prompt: '1人目の 人は だれの えが すきですか。(Whose paintings does the first person like?)',
          type: 'choice',
          options: ['モネ (Monet)', 'ピカソ (Picasso)', 'バッハ (Bach)', 'ごほ (Van Gogh)'],
          correctAnswer: 'モネ (Monet)',
          explanation: 'Text says: "とくに、モネが すきです。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 私の しゅみ (My Hobbies and Free Time)',
      promptInstruction: 'あなたの しゅみと、ひまな ときにする ことについて かきましょう。(Write about your hobby and what you do when free)',
      scaffoldQuestions: [
        '1. あなたの しゅみは 何ですか。',
        '2. ひまな とき、なにを しますか。',
        '3. とくに 何が すきですか。',
      ],
      modelEssay: {
        japanese: '私の しゅみは りょうりを つくることです。ひまな とき、よく スープや おかしを つくります。とくに カレーが とくいです。',
        romaji: 'Watashi no shumi wa ryouri o tsukuru koto desu. Hima na toki, yoku suupu ya okashi o tsukurimasu. Tokuni karee ga tokui desu.',
        english: 'My hobby is cooking. In my free time, I often make soups and sweets. In particular, I specialize in curry.',
      },
      sampleAnswer: 'わたしの しゅみは [〜すること] です。ひまな とき、よく [〜を します]。とくに [〜] が すきです。',
    },
  },

  // ==========================================
  // LESSON 3: 日本はいま、春です
  // ==========================================
  {
    lessonNumber: 3,
    topicNumber: 2,
    topicTitle: 'トピック2 きせつと天気',
    title: 'だい3か 日本はいま、はるです',
    romajiTitle: 'Dai 3-ka: Nihon wa ima, haru desu',
    englishTitle: 'Lesson 3: It is Spring in Japan Now',
    vocabulary: {
      title: 'もじとことば (Seasons & Nature)',
      keyWords: [
        { word: '春 (はる)', kana: 'はる', romaji: 'haru', meaning: 'Spring', category: 'Seasons' },
        { word: '夏 (なつ)', kana: 'なつ', romaji: 'natsu', meaning: 'Summer', category: 'Seasons' },
        { word: '秋 (あき)', kana: 'あき', romaji: 'aki', meaning: 'Autumn / Fall', category: 'Seasons' },
        { word: '冬 (ふゆ)', kana: 'ふゆ', romaji: 'fuyu', meaning: 'Winter', category: 'Seasons' },
        { word: 'あたたかい', kana: 'あたたかい', romaji: 'atatakai', meaning: 'Warm', category: 'Climate' },
        { word: 'あつい', kana: 'あつい', romaji: 'atsui', meaning: 'Hot', category: 'Climate' },
        { word: 'すずしい', kana: 'すずしい', romaji: 'suzushii', meaning: 'Cool', category: 'Climate' },
        { word: 'さむい', kana: 'さむい', romaji: 'samui', meaning: 'Cold', category: 'Climate' },
        { word: 'さくら', kana: 'さくら', romaji: 'sakura', meaning: 'Cherry blossom', category: 'Nature' },
        { word: 'もみじ', kana: 'もみじ', romaji: 'momiji', meaning: 'Autumn leaves / Red maple', category: 'Nature' },
      ],
      exercises: [
        {
          id: 'b-l3-v1',
          instruction: 'きせつと 気温(きおん)の くみあわせを えらびましょう。(Match season with feeling)',
          prompt: 'あき ➔ (　　)',
          type: 'choice',
          options: ['すずしい', 'とても あつい', 'さむい', 'あたたかい'],
          correctAnswer: 'すずしい',
          explanation: 'Autumn in Japan is known for being pleasantly cool (すずしい).',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'イA-く なります / N・ナA-に なります',
          meaning: 'Becoming / Change of state',
          explanation: 'あたたかい ➔ あたたかく なります; はる ➔ はるに なります.',
          examples: [
            { japanese: '3月ごろ、あたたかく なります。', romaji: 'Sangatsu-goro, atatakaku narimasu.', english: 'Around March, it becomes warm.' },
            { japanese: 'だんだん はるに なります。', romaji: 'Dandan haru ni narimasu.', english: 'Gradually it becomes spring.' },
          ],
        },
        {
          pattern: 'S1 から、S2 / S2。S1 から。',
          meaning: 'Stating reasons: because S1, S2',
          explanation: 'から marks the cause or reason.',
          examples: [
            { japanese: '食べものが おいしいですから、秋が いちばん すきです。', romaji: 'Tabemono ga oishii desu kara, aki ga ichiban suki desu.', english: 'Because the food is delicious, I like autumn the most.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l3-g1',
          instruction: '「なる」の まえの かたちを えらびましょう。(Select form before naru)',
          prompt: 'だんだん ( a あたたかい　b あたたかく ) なります。',
          type: 'choice',
          options: ['あたたかく', 'あたたかい'],
          correctAnswer: 'あたたかく',
          explanation: 'I-adjectives change -い to -く before なります.',
        },
        {
          id: 'b-l3-g2',
          instruction: 'りゆうを 表す ことばを えらびましょう。(Reason particle)',
          prompt: 'すずしいのが すきです (　　)。',
          type: 'choice',
          options: ['から', 'けど', 'ので', 'まで'],
          correctAnswer: 'から',
          explanation: 'Page 38: 〜から (because...).',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 020-023: 日本の きせつ',
      situation: 'People talk about the climate of Japan and when temperatures change.',
      dialogueScript: [
        { speaker: 'A', japanese: '日本は いま、どんな きせつですか。', romaji: 'Nihon wa ima, donna kisetsu desu ka.', english: 'What season is it now in Japan?' },
        { speaker: 'B', japanese: 'いま ふゆです。とうきょうは さむいですよ。みんな コートです。', romaji: 'Ima fuyu desu. Toukyou wa samui desu yo. Minna kooto desu.', english: 'It is winter now. Tokyo is cold! Everyone is wearing coats.' },
        { speaker: 'A', japanese: 'いつごろ あたたかく なりますか。', romaji: 'Itsugoro atatakaku narimasu ka.', english: 'Around when will it become warm?' },
        { speaker: 'B', japanese: 'だいたい 3月ごろです。', romaji: 'Daitai sangatsu-goro desu.', english: 'Roughly around March.' },
      ],
      exercises: [
        {
          id: 'b-l3-l1',
          instruction: 'とうきょうは いつごろ あたたかく なりますか。(When does it get warm?)',
          prompt: 'あたたかく なる つき：',
          type: 'choice',
          options: ['3月ごろ', '5月ごろ', '1月ごろ', '8月ごろ'],
          correctAnswer: '3月ごろ',
          explanation: 'Audio says: "だいたい 3月ごろです。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 今、どんな きせつですか (Email between Akari & Kate)',
      genre: 'Email correspondence',
      passage: [
        { japanese: 'ケイトさん、おげんきですか。あかりです。らいげつ メルボルンに 行きます。メルボルンは 今、どんな きせつですか。どんな ふくが いいですか。', romaji: 'Keito-san, ogenki desu ka. Akari desu. Raigetsu Meruborun ni ikimasu. Meruborun wa ima, donna kisetsu desu ka. Donna fuku ga ii desu ka.', english: 'Kate-san, how are you? It\'s Akari. Next month I am going to Melbourne. What season is it in Melbourne now? What clothes should I bring?' },
        { japanese: 'あかりさん、メール ありがとうございます。メルボルンは 今、夏です！ひるは あついですから Tシャツと ジーンズで だいじょうぶです。でも、夜は さむくなりますから、セーターや ジャケットが いいです。', romaji: 'Akari-san, meeru arigatou gozaimasu. Meruborun wa ima, natsu desu! Hiru wa atsui desu kara T-shatsu to jiinzu de daijoubu desu. Demo, yoru wa samuku narimasu kara, seetaa ya jaketto ga ii desu.', english: 'Akari-san, thank you for your email. It is summer now in Melbourne! Daytime is hot so T-shirt and jeans are fine. But nights become cold, so a sweater or jacket is good.' },
      ],
      exercises: [
        {
          id: 'b-l3-r1',
          instruction: 'メルボルンは 今、どんな きせつですか。(What season in Melbourne?)',
          prompt: 'メルボルンの きせつ：',
          type: 'choice',
          options: ['夏 (Summer)', '冬 (Winter)', '春 (Spring)', '秋 (Autumn)'],
          correctAnswer: '夏 (Summer)',
          explanation: 'Kate replies: "メルボルンは 今、夏です！"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 好きな きせつ (My Favorite Season)',
      promptInstruction: 'あなたの 国の きせつと、あなたが いちばん 好きな きせつを かきましょう。',
      scaffoldQuestions: [
        '1. あなたの 国には どんな きせつが ありますか。',
        '2. 何月ごろ あたたかく／あつく／さむく なりますか。',
        '3. どの きせつが いちばん 好きですか。どうしてですか。',
      ],
      modelEssay: {
        japanese: '日本には きせつが 4つ あります。春、夏、秋、冬です。私は あたたかいのが 好きですから、春が 好きです。春は 3月から 5月ごろです。桜が きれいです。',
        romaji: 'Nihon ni wa kisetsu ga yottsu arimasu. Haru, natsu, aki, fuyu desu. Watashi wa atatakai no ga suki desu kara, haru ga suki desu. Haru wa sangatsu kara gogatsu-goro desu. Sakura ga kirei desu.',
        english: 'In Japan there are 4 seasons: spring, summer, autumn, winter. Because I like warm weather, I like spring. Spring is from March to around May. The cherry blossoms are beautiful.',
      },
      sampleAnswer: '[くに] には きせつが あります。わたしは [きせつ] が いちばん すきです。[りゆう] からです。',
    },
  },

  // ==========================================
  // LESSON 4: いい天気ですね
  // ==========================================
  {
    lessonNumber: 4,
    topicNumber: 2,
    topicTitle: 'トピック2 きせつと天気',
    title: 'だい4か いいてんきですね',
    romajiTitle: 'Dai 4-ka: Ii tenki desu ne',
    englishTitle: 'Lesson 4: Nice Weather, Isn’t It?',
    vocabulary: {
      title: 'もじとことば (Weather & Daily Greetings)',
      keyWords: [
        { word: '晴れ (はれ)', kana: 'はれ', romaji: 'hare', meaning: 'Clear / Sunny', category: 'Weather' },
        { word: '雨 (あめ)', kana: 'あめ', romaji: 'ame', meaning: 'Rain', category: 'Weather' },
        { word: '曇り (くもり)', kana: 'くもり', romaji: 'kumori', meaning: 'Cloudy', category: 'Weather' },
        { word: '雪 (ゆき)', kana: 'ゆき', romaji: 'yuki', meaning: 'Snow', category: 'Weather' },
        { word: '風 (かぜ)', kana: 'かぜ', romaji: 'kaze', meaning: 'Wind', category: 'Weather' },
        { word: '降る (ふります)', kana: 'ふります', romaji: 'furimasu', meaning: 'To fall (rain/snow)', category: 'Verbs' },
        { word: '吹く (ふきます)', kana: 'ふきます', romaji: 'fukimasu', meaning: 'To blow (wind)', category: 'Verbs' },
      ],
      exercises: [
        {
          id: 'b-l4-v1',
          instruction: 'ただしい 動詞を えらびましょう。(Select verb for rain)',
          prompt: 'あめが (　　)。',
          type: 'choice',
          options: ['ふります', 'ふきます', 'はれます', 'やみます'],
          correctAnswer: 'ふります',
          explanation: 'Rain falls: あめが ふります.',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'Past Polite Forms: あめでした / あつかったです / ふりました',
          meaning: 'Polite past tense for Nouns, Adjectives, and Verbs',
          explanation: 'Noun: でした; イA: 〜かったです; Verb: 〜ました.',
          examples: [
            { japanese: 'きのうは すごい あめでしたね。', romaji: 'Kinou wa sugoi ame deshita ne.', english: 'It was heavy rain yesterday, wasn\'t it?' },
            { japanese: 'きのうは あつかったですね。', romaji: 'Kinou wa atsukatta desu ne.', english: 'It was hot yesterday, wasn\'t it?' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l4-g1',
          instruction: 'かこ形(かこけい)を えらびましょう。(Past tense of samui)',
          prompt: 'きのうは ( a さむいです　b さむかったです ) ね。',
          type: 'choice',
          options: ['さむかったです', 'さむいです'],
          correctAnswer: 'さむかったです',
          explanation: 'Past of さむい is さむかったです.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 030-033: てんきの あいさつ',
      situation: 'People greet neighbors and colleagues using weather phrases.',
      dialogueScript: [
        { speaker: 'A', japanese: 'いい てんきですね。', romaji: 'Ii tenki desu ne.', english: 'Nice weather, isn\'t it?' },
        { speaker: 'B', japanese: 'そうですね。きもちが いいですね。', romaji: 'Sou desu ne. Kimochi ga ii desu ne.', english: 'Indeed. Feels great.' },
        { speaker: 'A', japanese: 'きのうは よく ふりましたね。', romaji: 'Kinou wa yoku furimashita ne.', english: 'It rained hard yesterday, didn\'t it?' },
        { speaker: 'B', japanese: 'ええ、すごい あめでしたね。たいへんでしたね。', romaji: 'Ee, sugoi ame deshita ne. Taihen deshita ne.', english: 'Yes, heavy rain. Quite an ordeal.' },
      ],
      exercises: [
        {
          id: 'b-l4-l1',
          instruction: 'きのうの てんきは どうでしたか。(What was yesterday\'s weather?)',
          prompt: 'きのうの てんき：',
          type: 'choice',
          options: ['すごい あめでした', 'はれでした', 'ゆきでした', 'いい てんきでした'],
          correctAnswer: 'すごい あめでした',
          explanation: 'Audio says: "ええ、すごい あめでしたね。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 京都からの てがみ (Postcard from Kyoto)',
      genre: 'Postcard postcard diary',
      passage: [
        { japanese: 'あさ、しんかんせんで 京都に 来ました。雨が ふっていました。でも、あまり さむくなかったです。まちを ゆっくり さんぽしました。', romaji: 'Asa, shinkansen de Kyouto ni kimashita. Ame ga futte imashita. Demo, amari samukunakatta desu. Machi o yukkuri sanpo shimashita.', english: 'In the morning, I arrived in Kyoto by Shinkansen. It was raining. But it wasn\'t very cold. I took a leisurely stroll around town.' },
      ],
      exercises: [
        {
          id: 'b-l4-r1',
          instruction: '京都に ついたとき、てんきは どうでしたか。(Weather on arrival?)',
          prompt: 'ついたときの てんき：',
          type: 'choice',
          options: ['雨が ふっていました', 'はれていました', 'ゆきでした', 'かぜが つよかったです'],
          correctAnswer: '雨が ふっていました',
          explanation: 'Text states: "雨が ふっていました。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: てがみの あいさつ (Weather Greeting Letter)',
      promptInstruction: 'メールや てがみの はじめの てんきの あいさつを かきましょう。',
      scaffoldQuestions: ['1. 今日の あなたの 町の てんきは どうですか。', '2. きのうの てんきは どうでしたか。'],
      modelEssay: {
        japanese: '田中さん、こんにちは。東京は 今日、とても いい天気です。きのうは 雨が よく ふりましたが、今日は よく はれています。そちらは どうですか。',
        romaji: 'Tanaka-san, konnichiwa. Toukyou wa kyou, totemo ii tenki desu. Kinou wa ame ga yoku furimashita ga, kyou wa yoku harete imasu. Sochira wa dou desu ka.',
        english: 'Tanaka-san, hello. In Tokyo, the weather is very nice today. It rained hard yesterday, but today it is clear and sunny. How are things on your side?',
      },
      sampleAnswer: '[なまえ] さん、こんにちは。きょうは [てんき] ですね。きのうは [てんき] でした。そちらは どうですか。',
    },
  },

  // ==========================================
  // LESSON 5: この公園は広くて、きれいです
  // ==========================================
  {
    lessonNumber: 5,
    topicNumber: 3,
    topicTitle: 'トピック3 私の町',
    title: 'だい5か この こうえんは ひろくて、きれいです',
    romajiTitle: 'Dai 5-ka: Kono kouen wa hirokute, kirei desu',
    englishTitle: 'Lesson 5: This Park is Spacious and Clean',
    vocabulary: {
      title: 'もじとことば (Town & Atmosphere)',
      keyWords: [
        { word: '町 (まち)', kana: 'まち', romaji: 'machi', meaning: 'Town / City', category: 'Places' },
        { word: '店 (みせ)', kana: 'みせ', romaji: 'mise', meaning: 'Shop / Store', category: 'Places' },
        { word: '公園 (こうえん)', kana: 'こうえん', romaji: 'kouen', meaning: 'Park', category: 'Places' },
        { word: 'にぎやか', kana: 'にぎやか', romaji: 'nigiyaka', meaning: 'Lively / Bustling', category: 'Adjectives' },
        { word: 'しずか', kana: 'しずか', romaji: 'shizuka', meaning: 'Quiet / Peaceful', category: 'Adjectives' },
        { word: 'べんり', kana: 'べんり', romaji: 'benri', meaning: 'Convenient', category: 'Adjectives' },
        { word: 'おしゃれ', kana: 'おしゃれ', romaji: 'oshare', meaning: 'Stylish / Fashionable', category: 'Adjectives' },
      ],
      exercises: [
        {
          id: 'b-l5-v1',
          instruction: 'はんたいの いみの ことばを えらびましょう。(Choose antonym)',
          prompt: '大きい ↔ (　　)',
          type: 'choice',
          options: ['ちいさい', 'あたらしい', 'ふるい', 'やすい'],
          correctAnswer: 'ちいさい',
          explanation: 'Opposite of おおきい is ちいさい.',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'イA-くて / ナA-で (Connecting Adjectives)',
          meaning: 'Linking two descriptive characteristics',
          explanation: 'ひろい ➔ ひろくて; にぎやか ➔ にぎやかで.',
          examples: [
            { japanese: 'この 公園は ひろくて、きれいです。', romaji: 'Kono kouen wa hirokute, kirei desu.', english: 'This park is spacious and clean.' },
            { japanese: 'この まちは にぎやかで、たのしいです。', romaji: 'Kono machi wa nigiyaka de, tanoshii desu.', english: 'This town is lively and fun.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l5-g1',
          instruction: 'ただしい ほうを えらびましょう。(Connecting form)',
          prompt: 'この まちは ( a にぎやかで　b にぎやまくて )、たのしいです。',
          type: 'choice',
          options: ['にぎやかで', 'にぎやまくて'],
          correctAnswer: 'にぎやかで',
          explanation: 'Na-adjective connects with で: にぎやかで.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 043-046: 吉祥寺の まち',
      situation: 'Guiding friend Wang around Tokyo spots.',
      dialogueScript: [
        { speaker: 'よしだ', japanese: 'ここは 秋葉原です。でんきてんが おおいです。やすくて、べんりですよ。', romaji: 'Koko wa Akihabara desu. Denkiten ga ooi desu. Yasukute, benri desu yo.', english: 'This is Akihabara. There are many electronics shops. It is cheap and convenient.' },
        { speaker: 'ワン', japanese: 'いいですね。', romaji: 'Ii desu ne.', english: 'Sounds great.' },
      ],
      exercises: [
        {
          id: 'b-l5-l1',
          instruction: 'あきはばらは どんな まちですか。(What is Akihabara like?)',
          prompt: 'あきはばらの とくちょう：',
          type: 'choice',
          options: ['やすくて べんり', 'しずかで きれい', 'たかくて おしゃれ', 'ふるい'],
          correctAnswer: 'やすくて べんり',
          explanation: 'Audio says: "やすくて、べんりですよ。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 東京まちあるき ― 吉祥寺',
      genre: 'Town guide',
      passage: [
        { japanese: '吉祥寺は 東京に ある まちです。この あたりは レストランや みせが 多いです。かいものや しょくじに べんりです。とても にぎやかで、たのしいです。', romaji: 'Kichijouji wa Toukyou ni aru machi desu. Kono atari wa resutoran ya mise ga ooi desu. Kaimono ya shokuji ni benri desu. Totemo nigiyaka de, tanoshii desu.', english: 'Kichijoji is a town in Tokyo. Around here there are many restaurants and shops. It is convenient for shopping and dining. It is very lively and fun.' },
      ],
      exercises: [
        {
          id: 'b-l5-r1',
          instruction: 'きちじょうじは 何に べんりですか。(What is Kichijoji convenient for?)',
          prompt: 'きちじょうじの べんりな こと：',
          type: 'choice',
          options: ['かいものや しょくじ', 'すいえい', 'スキー', 'しゅっちょう'],
          correctAnswer: 'かいものや しょくじ',
          explanation: 'Text says: "かいものや しょくじに べんりです。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 私の 町のおすすめ (My Town Recommendation)',
      promptInstruction: 'あなたの まちの おすすめの ばしょを しょうかいしましょう。',
      scaffoldQuestions: ['1. どんな ばしょですか。', '2. なぜ おすすめですか。'],
      modelEssay: {
        japanese: 'ここは 上野の アメ横です。食べものや ふくの みせが たくさん あります。いつも 人が 多いです。にぎやかで、おもしろいです。ぜひ 行って みてください。',
        romaji: 'Koko wa Ueno no Ameyoko desu. Tabemono ya fuku no mise ga takusan arimasu. Itsumo hito ga ooi desu. Nigiyaka de, omoshiroi desu. Zehi itte mite kudasai.',
        english: 'This is Ameyoko in Ueno. There are lots of food and clothing shops. It is always crowded with people. It is bustling and fun. Please definitely visit it!',
      },
      sampleAnswer: 'ここは [まち/ばしょ] です。[みせ/こうえん] が あります。[形容詞で/くて]、おもしろいです。ぜひ 行って みてください。',
    },
  },

  // ==========================================
  // LESSON 6: まっすぐ行ってください
  // ==========================================
  {
    lessonNumber: 6,
    topicNumber: 3,
    topicTitle: 'トピック3 私の町',
    title: 'だい6か まっすぐ 行って ください',
    romajiTitle: 'Dai 6-ka: Massugu itte kudasai',
    englishTitle: 'Lesson 6: Please Go Straight',
    vocabulary: {
      title: 'もじとことば (Directions & Landmarks)',
      keyWords: [
        { word: 'みち / とおり', kana: 'みち / とおり', romaji: 'michi / toori', meaning: 'Road / Street', category: 'Directions' },
        { word: 'しんごう', kana: 'しんごう', romaji: 'shingou', meaning: 'Traffic light', category: 'Directions' },
        { word: 'かど', kana: 'かど', romaji: 'kado', meaning: 'Corner', category: 'Directions' },
        { word: 'こうさてん', kana: 'こうさてん', romaji: 'kousaten', meaning: 'Intersection', category: 'Directions' },
        { word: 'はし', kana: 'はし', romaji: 'hashi', meaning: 'Bridge', category: 'Directions' },
        { word: '右 / 左', kana: 'みぎ / ひだり', romaji: 'migi / hidari', meaning: 'Right / Left', category: 'Directions' },
        { word: 'まっすぐ', kana: 'まっすぐ', romaji: 'massugu', meaning: 'Straight ahead', category: 'Directions' },
      ],
      exercises: [
        {
          id: 'b-l6-v1',
          instruction: 'ただしい ことばを えらびましょう。(Turn at corner)',
          prompt: 'かどを みぎに (　　)。',
          type: 'choice',
          options: ['まがります', 'わたります', 'いきます', 'みます'],
          correctAnswer: 'まがります',
          explanation: 'Turn: かどを みぎに まがります.',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'V-てください (まっすぐ 行ってください / まがってください)',
          meaning: 'Polite instructions / requests',
          explanation: 'Giving clear street directions using verb Te-form.',
          examples: [
            { japanese: '2つめの かどを みぎに まがってください。', romaji: 'Futatsume no kado o migi ni magatte kudasai.', english: 'Please turn right at the 2nd corner.' },
          ],
        },
        {
          pattern: 'N1 じゃなくて、N2 (Correcting misheard info)',
          meaning: 'Not N1, but N2',
          explanation: 'Used to politely correct someone who misheard.',
          examples: [
            { japanese: '1つめ じゃなくて、2つめですよ。', romaji: 'Hitotsume janakute, futatsume desu yo.', english: 'Not the first, but the second!' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l6-g1',
          instruction: 'ただしい ほうを えらびましょう。(Instruction form)',
          prompt: 'この とおりを まっすぐ ( a 行って　b 行く ) ください。',
          type: 'choice',
          options: ['行って', '行く'],
          correctAnswer: '行って',
          explanation: 'Polite request uses Te-form: 行ってください.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 053-056: はくぶつかんへの 行きかた',
      situation: 'Asking directions on the street.',
      dialogueScript: [
        { speaker: 'パウロ', japanese: 'すみません、はくぶつかんは どこですか。', romaji: 'Sumimasen, hakubutsukan wa doko desu ka.', english: 'Excuse me, where is the museum?' },
        { speaker: '町の人', japanese: 'はくぶつかんは ふたつめの かどを みぎに まがってください。', romaji: 'Hakubutsukan wa futatsume no kado o migi ni magatte kudasai.', english: 'For the museum, please turn right at the second corner.' },
        { speaker: 'パウロ', japanese: 'ひとつめの かどを みぎですね。', romaji: 'Hitotsume no kado o migi desu ne.', english: 'Turn right at the first corner, right?' },
        { speaker: '町の人', japanese: 'いいえ、ひとつめ じゃなくて、ふたつめですよ。', romaji: 'Iie, hitotsume janakute, futatsume desu yo.', english: 'No, not the first, it is the second!' },
      ],
      exercises: [
        {
          id: 'b-l6-l1',
          instruction: 'はくぶつかんは どちらに まがりますか。(Which corner?)',
          prompt: 'まがる かど：',
          type: 'choice',
          options: ['2つめの かどを みぎ', '1つめの かどを ひだり', 'まっすぐ 行くだけ', 'はしを わたる'],
          correctAnswer: '2つめの かどを みぎ',
          explanation: 'Audio says: "ふたつめの かどを みぎに まがってください。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 小さくて かわいい 店 (Cute Small Shop)',
      genre: 'Store directions email',
      passage: [
        { japanese: 'あした、町に 行きますか。えきの ちかくに すてきな くつの 店が ありますよ。えきの 北口を でて、まっすぐ 行ってください。こうさてんを わたって、すぐ 右に まがってください。10分ぐらいです。店の なまえは「アネモネ」です。', romaji: 'Ashita, machi ni ikimasu ka. Eki no chikaku ni suteki na kutsu no mise ga arimasu yo. Eki no kitaguchi o dete, massugu itte kudasai. Kousaten o watatte, sugu migi ni magatte kudasai. Juppun gurai desu. Mise no namae wa "Anemone" desu.', english: 'Are you going to town tomorrow? Near the station there is a lovely shoe store. Exit the station North exit and go straight. Cross the intersection and immediately turn right. It takes about 10 minutes. The shop name is "Anemone".' },
      ],
      exercises: [
        {
          id: 'b-l6-r1',
          instruction: '「アネモネ」は 何の 店ですか。(What kind of store is Anemone?)',
          prompt: '店の しゅるい：',
          type: 'choice',
          options: ['くつの 店 (Shoe shop)', 'ほんや (Bookstore)', 'パンや (Bakery)', 'カフェ (Cafe)'],
          correctAnswer: 'くつの 店 (Shoe shop)',
          explanation: 'Text says: "すてきな くつの 店が ありますよ。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 私の 好きな 店への 行きかた (Directions to My Favorite Place)',
      promptInstruction: 'あなたの 好きな みせへの 行きかたを 道あんないの ぶんしょうで かきましょう。',
      scaffoldQuestions: ['1. 駅の どこから 出ますか。', '2. まっすぐ 行きますか、まがりますか。'],
      modelEssay: {
        japanese: '私の 好きな カフェは「サクラ」です。駅の 東口を 出て、まっすぐ 行ってください。1つめの 信号を 左に まがって、すぐです。おいしい コーヒーが あります。',
        romaji: 'Watashi no suki na kafe wa "Sakura" desu. Eki no higashiguchi o dete, massugu itte kudasai. Hitotsume no shingou o hidari ni magatte, sugu desu. Oishii koohii ga arimasu.',
        english: 'My favorite cafe is "Sakura". Leave through the station East exit and go straight. Turn left at the first traffic light, and it is right there. They have delicious coffee.',
      },
      sampleAnswer: 'えきの [ひがしぐち/きたぐち] を でて、まっすぐ 行ってください。[1つめ/2つめ] の しんごうを [みぎ/ひだり] に まがってください。',
    },
  },

  // ==========================================
  // LESSON 7: いま、どこですか
  // ==========================================
  {
    lessonNumber: 7,
    topicNumber: 4,
    topicTitle: 'トピック4 出かける',
    title: 'だい7か いま、どこですか',
    romajiTitle: 'Dai 7-ka: Ima, doko desu ka',
    englishTitle: 'Lesson 7: Where Are You Now?',
    vocabulary: {
      title: 'もじとことば (Meeting Places & Contact)',
      keyWords: [
        { word: 'かいさつぐち', kana: 'かいさつぐち', romaji: 'kaisatsuguchi', meaning: 'Ticket gate', category: 'Places' },
        { word: 'こうばん', kana: 'こうばん', romaji: 'kouban', meaning: 'Police box', category: 'Places' },
        { word: 'みせの まえ', kana: 'みせの まえ', romaji: 'mise no mae', meaning: 'In front of the shop', category: 'Places' },
        { word: 'おくれます', kana: 'おくれます', romaji: 'okuremasu', meaning: 'To be late', category: 'Verbs' },
        { word: 'つきます', kana: 'つきます', romaji: 'tsukimasu', meaning: 'To arrive', category: 'Verbs' },
        { word: 'まちます', kana: 'まちます', romaji: 'machimasu', meaning: 'To wait', category: 'Verbs' },
        { word: 'ちょっと', kana: 'ちょっと', romaji: 'chotto', meaning: 'A little / slightly', category: 'Adverbs' },
        { word: 'すぐ', kana: 'すぐ', romaji: 'sugu', meaning: 'Soon / immediately', category: 'Adverbs' },
      ],
      exercises: [
        {
          id: 'b-l7-v1',
          instruction: 'ただしい ことばを えらびましょう。(Select word for being late)',
          prompt: 'すみません、じかんに (　　)。',
          type: 'choice',
          options: ['おくれます', 'つきます', 'まちます', 'かえります'],
          correctAnswer: 'おくれます',
          explanation: 'おくれます means to be late / run late.',
        },
        {
          id: 'b-l7-v2',
          instruction: 'えきの 場所(ばしょ)を えらびましょう。(Ticket barrier)',
          prompt: 'きっぷを 入れる ところ ➔ (　　)',
          type: 'choice',
          options: ['かいさつぐち', 'こうばん', 'ホーム', 'ばすのりば'],
          correctAnswer: 'かいさつぐち',
          explanation: 'Ticket barrier / gate is かいさつぐち.',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'いま、[場所] に います',
          meaning: 'Stating current location when meeting up',
          explanation: 'Use います for living beings at a meeting location.',
          examples: [
            { japanese: 'いま、かいさつぐちの まえに います。', romaji: 'Ima, kaisatsuguchi no mae ni imasu.', english: 'I am in front of the ticket gate right now.' },
          ],
        },
        {
          pattern: 'V-ています (でんしゃに のっています / むかっています)',
          meaning: 'Current action in progress / on the way',
          explanation: 'Describes what you are doing right this moment.',
          examples: [
            { japanese: 'いま、電車に のっています。', romaji: 'Ima, densha ni notte imasu.', english: 'I am on the train right now.' },
            { japanese: 'そちらに むかっています。', romaji: 'Sochira ni mukatte imasu.', english: 'I am heading over to your location.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l7-g1',
          instruction: 'ただしい 動詞(どうし)を えらびましょう。(Currently on train)',
          prompt: 'いま、でんしゃに ( a のっています　b のりました )。あと5分で つきます。',
          type: 'choice',
          options: ['のっています', 'のりました'],
          correctAnswer: 'のっています',
          explanation: 'Ongoing action uses て-form + います: のっています.',
        },
        {
          id: 'b-l7-g2',
          instruction: 'じょし(助詞)を えらびましょう。(Waiting location)',
          prompt: 'ほんやの まえ (　　) まっています。',
          type: 'choice',
          options: ['で', 'に', 'へ', 'を'],
          correctAnswer: 'で',
          explanation: 'Performing an activity (waiting) at a place uses particle で.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 061-064: まちあわせの でんわ',
      situation: 'Calling on phone to check where the friend is while waiting.',
      dialogueScript: [
        { speaker: 'ケン', japanese: 'もしもし、アンナさん、いま どこですか。', romaji: 'Moshimoshi, Anna-san, ima doko desu ka.', english: 'Hello Anna, where are you now?' },
        { speaker: 'アンナ', japanese: 'もしもし。ごめんなさい、いま えきに 着きました。', romaji: 'Moshimoshi. Gomen nasai, ima eki ni tsukimashita.', english: 'Hello. I\'m so sorry, I just arrived at the station.' },
        { speaker: 'ケン', japanese: 'だいじょうぶですよ。私は 北口の はちこうの 前に います。', romaji: 'Daijoubu desu yo. Watashi wa kitaguchi no hachikou no mae ni imasu.', english: 'No problem! I am in front of the Hachiko statue at the North Exit.' },
        { speaker: 'アンナ', japanese: 'わかりました。すぐ 行きます！', romaji: 'Wakarimashita. Sugu ikimasu!', english: 'Understood. I will be right there!' },
      ],
      exercises: [
        {
          id: 'b-l7-l1',
          instruction: 'ケンさんは どこで まっていますか。(Where is Ken waiting?)',
          prompt: 'ケンさんの いる ばしょ：',
          type: 'choice',
          options: ['北口の はちこうの 前', '南口の かいさつぐち', 'でんしゃの なか', 'カフェの なか'],
          correctAnswer: '北口の はちこうの 前',
          explanation: 'Ken says: "私は 北口の はちこうの 前に います。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: まちあわせの メッセージ (Meetup Text Message)',
      genre: 'Chat / SMS',
      passage: [
        { japanese: 'ケンさん、おはようございます。', romaji: 'Ken-san, ohayou gozaimasu.', english: 'Good morning, Ken.' },
        { japanese: 'きょうの まちあわせですが、10分ほど おくれそうです。電車が とまっていました。', romaji: 'Kyou no machiawase desu ga, juppun hodo okuresou desu. Densha ga tomatte imashita.', english: 'Regarding our meeting today, I might be about 10 minutes late. The train was stopped.' },
        { japanese: 'いま、しんじゅく駅を 出ました。スターバックスの 店内で すわって まっていて ください。', romaji: 'Ima, Shinjuku-eki o demashita. Sutaabakkusu no tennai de suwatte matte ite kudasai.', english: 'I have just left Shinjuku Station now. Please wait seated inside Starbucks.' },
      ],
      exercises: [
        {
          id: 'b-l7-r1',
          instruction: 'メッセージの 内容(ないよう)について ただしいものを えらびましょう。(True statement)',
          prompt: 'アンナさんは どうして おくれますか。',
          type: 'choice',
          options: ['電車が とまっていたから', 'ねぼうしたから', 'みちに まよったから', 'かいものをして いたから'],
          correctAnswer: '電車が とまっていたから',
          explanation: 'Message states: "電車が とまっていました。" (The train was stopped).',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: まちあわせの メッセージ (Sending Meetup Status Message)',
      promptInstruction: '友だちとの まちあわせで、自分の 場所や 時間を つたえる メッセージを かきましょう。',
      scaffoldQuestions: ['1. いま どこに いますか。', '2. なん分ごろ つきますか。'],
      modelEssay: {
        japanese: '田中さん、すみません。いま 新宿駅に 着きました。少し 道に まよって、5分ほど 遅れます。中央改札の前で 待っていて ください。すぐ 行きます。',
        romaji: 'Tanaka-san, sumimasen. Ima Shinjuku-eki ni tsukimashita. Sukoshi michi ni mayotte, gofun hodo okuremasu. Chuuou kaisatsu no mae de matte ite kudasai. Sugu ikimasu.',
        english: 'Tanaka-san, I am sorry. I just arrived at Shinjuku Station. I got slightly lost and will be about 5 minutes late. Please wait in front of the Central Ticket Gate. I will be right there.',
      },
      sampleAnswer: 'すみません。いま [ばしょ] に います。[なんぷん] おくれます。[かいさつ/みせ] の まえで まっていて ください。',
    },
  },

  // ==========================================
  // LESSON 8: いろいろな店がありますね
  // ==========================================
  {
    lessonNumber: 8,
    topicNumber: 4,
    topicTitle: 'トピック4 出かける',
    title: 'だい8か いろいろな店が ありますね',
    romajiTitle: 'Dai 8-ka: Iroirona mise ga arimasu ne',
    englishTitle: 'Lesson 8: There Are Various Shops, Aren\'t There?',
    vocabulary: {
      title: 'もじとことば (Commercial Facilities & Products)',
      keyWords: [
        { word: 'デパート', kana: 'デパート', romaji: 'depaato', meaning: 'Department store', category: 'Shopping' },
        { word: 'コンビニ', kana: 'コンビニ', romaji: 'konbini', meaning: 'Convenience store', category: 'Shopping' },
        { word: 'ドラッグストア', kana: 'ドラッグストア', romaji: 'doraggusutoa', meaning: 'Pharmacy / Drug store', category: 'Shopping' },
        { word: '100円ショップ', kana: 'ひゃくえんショップ', romaji: 'hyakuen shoppu', meaning: '100-yen shop', category: 'Shopping' },
        { word: 'おみやげ', kana: 'おみやげ', romaji: 'omiyage', meaning: 'Souvenir', category: 'Shopping' },
        { word: '便利 (べんり)', kana: 'べんり', romaji: 'benri', meaning: 'Convenient', category: 'Adjectives' },
        { word: 'にぎやか', kana: 'にぎやか', romaji: 'nigiyaka', meaning: 'Lively / Bustling', category: 'Adjectives' },
      ],
      exercises: [
        {
          id: 'b-l8-v1',
          instruction: 'ただしい ことばを えらびましょう。(Cheap and versatile goods store)',
          prompt: '安い ざっかが たくさん ある 店 ➔ (　　)',
          type: 'choice',
          options: ['100円ショップ', 'びょういん', 'こうばん', 'ぎんこう'],
          correctAnswer: '100円ショップ',
          explanation: '100-yen shops sell diverse household goods for 100 yen.',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'N1 や N2 など (Listing nouns non-exhaustively)',
          meaning: 'Things like N1, N2, etc.',
          explanation: 'Unlike と which lists everything, や lists representative examples.',
          examples: [
            { japanese: '本屋や カフェなどが あります。', romaji: 'Hon\'ya ya kafe nado ga arimasu.', english: 'There are bookstores, cafes, and so on.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l8-g1',
          instruction: 'ただしい じょしを えらびましょう。(Incomplete listing)',
          prompt: 'この モールには ふくや ( a や　b と ) レストランなどが あります。',
          type: 'choice',
          options: ['や', 'と'],
          correctAnswer: 'や',
          explanation: 'Used with など for open-ended examples: や.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 071-074: ショッピングモールで',
      situation: 'Friends touring a large commercial center.',
      dialogueScript: [
        { speaker: 'リン', japanese: 'わあ、ひろいですね！どんな 店が ありますか。', romaji: 'Waa, hiroi desu ne! Donna mise ga arimasu ka.', english: 'Wow, it is so spacious! What kinds of shops are here?' },
        { speaker: 'たけし', japanese: '服や くつの 店や、レストランなどが ありますよ。', romaji: 'Fuku ya kutsu no mise ya, resutoran nado ga arimasu yo.', english: 'There are clothes and shoe stores, restaurants, and more.' },
        { speaker: 'リン', japanese: '100円ショップも ありますか。おみやげを 買いたいです。', romaji: 'Hyakuen shoppu mo arimasu ka. Omiyage o kaitai desu.', english: 'Is there a 100-yen shop too? I want to buy souvenirs.' },
        { speaker: 'たけし', japanese: 'ええ、3階に 大きいのが ありますよ。行きましょう。', romaji: 'Ee, sangai ni ookii no ga arimasu yo. Ikimashou.', english: 'Yes, there is a large one on the 3rd floor. Let\'s go!' },
      ],
      exercises: [
        {
          id: 'b-l8-l1',
          instruction: '100円ショップは 何階に ありますか。(Which floor?)',
          prompt: '100円ショップの かい：',
          type: 'choice',
          options: ['3階 (3rd floor)', '1階 (1st floor)', '地下 (Basement)', '屋上 (Rooftop)'],
          correctAnswer: '3階 (3rd floor)',
          explanation: 'Dialogue says: "3階に 大きいのが ありますよ。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 商店街(しょうてんがい)の あんない (Shopping Street Guide)',
      genre: 'Information Guide',
      passage: [
        { japanese: 'さくら通り商店街へ ようこそ！', romaji: 'Sakura-doori shoutengai e youkoso!', english: 'Welcome to Sakura Shopping Arcade!' },
        { japanese: 'ここには やさい屋や 肉屋、古い 和菓子屋など、約50の 店が ならんでいます。', romaji: 'Koko ni wa yasaiya ya nikuya, furui wagashiya nado, yaku gojuu no mise ga narande imasu.', english: 'Here, about 50 shops line up, including greengrocers, butchers, and traditional sweets shops.' },
        { japanese: '夕方は とても にぎやかです。安くて おいしい おそうざいが たくさん あります。', romaji: 'Yuugata wa totemo nigiyaka desu. Yasukute oishii osouzai ga takusan arimasu.', english: 'Evenings are very lively. There are many affordable and delicious prepared dishes.' },
      ],
      exercises: [
        {
          id: 'b-l8-r1',
          instruction: '商店街は いつ にぎやかですか。(When is it lively?)',
          prompt: 'にぎやかな じかんたい：',
          type: 'choice',
          options: ['夕方 (Evening)', '朝早く (Early morning)', '深夜 (Late night)', '昼休み (Lunch time)'],
          correctAnswer: '夕方 (Evening)',
          explanation: 'Guide states: "夕方は とても にぎやかです。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 私の お気に入りの ショッピングエリア (My Favorite Shopping Spot)',
      promptInstruction: 'あなたの よく行く 店や、おすすめの 買い物の 場所を 紹介しましょう。',
      scaffoldQuestions: ['1. どんな 店が ありますか。', '2. なぜ その場所が 好きですか。'],
      modelEssay: {
        japanese: '私の 好きな 場所は 駅前の ショッピングモールです。服の 店や 本屋、カフェなどが 入っています。雨の 日も ぬれなくて とても 便利です。週末は いつも 友だちと 行きます。',
        romaji: 'Watashi no suki na basho wa ekimae no shoppingu mooru desu. Fuku no mise ya hon\'ya, kafe nado ga haitte imasu. Ame no hi mo nurenakute totemo benri desu. Shuumatsu wa itsumo tomodachi to ikimasu.',
        english: 'My favorite spot is the shopping mall in front of the station. It has clothing stores, bookstores, cafes, and more. It is very convenient even on rainy days because you don\'t get wet. I always go there with friends on weekends.',
      },
      sampleAnswer: 'わたしの すきな ばしょは [ばしょ] です。[みせ] や [みせ] などが あります。[べんり/たのしい] です。',
    },
  },

  // ==========================================
  // LESSON 9: 空手はおもしろいですか
  // ==========================================
  {
    lessonNumber: 9,
    topicNumber: 5,
    topicTitle: 'トピック5 外国語と外国文化',
    title: 'だい9か 空手は おもしろいですか',
    romajiTitle: 'Dai 9-ka: Karate wa omoshiroi desu ka',
    englishTitle: 'Lesson 9: Is Karate Interesting?',
    vocabulary: {
      title: 'もじとことば (Traditional Culture & Martial Arts)',
      keyWords: [
        { word: '空手 (からて)', kana: 'からて', romaji: 'karate', meaning: 'Karate', category: 'Martial Arts' },
        { word: '柔道 (じゅうどう)', kana: 'じゅうどう', romaji: 'juudou', meaning: 'Judo', category: 'Martial Arts' },
        { word: '茶道 (さどう)', kana: 'さどう', romaji: 'sadou', meaning: 'Tea ceremony', category: 'Culture' },
        { word: '書道 (しょどう)', kana: 'しょどう', romaji: 'shodou', meaning: 'Calligraphy', category: 'Culture' },
        { word: '着物 (きもの)', kana: 'きもの', romaji: 'kimono', meaning: 'Kimono', category: 'Culture' },
        { word: '難しい (むずかしい)', kana: 'むずかしい', romaji: 'muzukashii', meaning: 'Difficult', category: 'Adjectives' },
        { word: 'おもしろい', kana: 'おもしろい', romaji: 'omoshiroi', meaning: 'Interesting / Fun', category: 'Adjectives' },
      ],
      exercises: [
        {
          id: 'b-l9-v1',
          instruction: '日本文化の なまえを えらびましょう。(Japanese tea ceremony)',
          prompt: 'お茶を たてる 伝統文化 ➔ (　　)',
          type: 'choice',
          options: ['茶道 (さどう)', '書道 (しょどう)', '柔道 (じゅうどう)', '合気道 (あいきどう)'],
          correctAnswer: '茶道 (さどう)',
          explanation: 'Tea ceremony is 茶道 (さどう).',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'イA-い ですが、〜 / イA-くない です (Adjective contrasts)',
          meaning: 'Expressing nuanced impression: "It is A, but..."',
          explanation: 'Use が to connect contrasting thoughts.',
          examples: [
            { japanese: '難しいですが、おもしろいです。', romaji: 'Muzukashii desu ga, omoshiroi desu.', english: 'It is difficult, but it is interesting.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l9-g1',
          instruction: '正しい つなぎ方を えらびましょう。(Contrast connective)',
          prompt: '練習は たいへんです ( a が　b から )、楽しいです。',
          type: 'choice',
          options: ['が', 'から'],
          correctAnswer: 'が',
          explanation: 'Contrast ("Tough, but fun") uses が.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 082-085: 習い事の 体験',
      situation: 'Talking about trying a Japanese culture class for the first time.',
      dialogueScript: [
        { speaker: 'スミス', japanese: 'きのう、書道の 体験教室に 行きました。', romaji: 'Kinou, shodou no taiken kyoushitsu ni ikimashita.', english: 'Yesterday, I went to a calligraphy trial class.' },
        { speaker: 'ゆき', japanese: 'どうでしたか。難しかったですか。', romaji: 'Dou deshita ka. Muzukashikatta desu ka.', english: 'How was it? Was it difficult?' },
        { speaker: 'スミス', japanese: '難しかったですが、とても 心が 落ち着きました。', romaji: 'Muzukashikatta desu ga, totemo kokoro ga ochitsukimashita.', english: 'It was difficult, but I felt very calm and peaceful.' },
      ],
      exercises: [
        {
          id: 'b-l9-l1',
          instruction: 'スミスさんの 感想(かんそう)は？(Smith\'s impression)',
          prompt: '書道教室の 感想：',
          type: 'choice',
          options: ['難しかったが、心が 落ち着いた', 'とても 簡単だった', 'つまらなかった', 'もう 行きたくない'],
          correctAnswer: '難しかったが、心が 落ち着いた',
          explanation: 'Smith said: "難しかったですが、とても 心が 落ち着きました。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 私の 空手教室 (My Karate Class)',
      genre: 'Student Essay',
      passage: [
        { japanese: '私は 毎週土曜日に 空手の 道場に 通っています。', romaji: 'Watashi wa maishuu doyoubi ni karate no doujou ni kayotte imasu.', english: 'I attend a karate dojo every Saturday.' },
        { japanese: '先生は きびしいですが、とても ていねいに 教えてくれます。', romaji: 'Sensei wa kibishii desu ga, totemo teinei ni oshiete kuremasu.', english: 'The teacher is strict, but teaches very attentively.' },
        { japanese: '型を おぼえるのは 大変ですが、体が 強くなります。', romaji: 'Kata o oboeru no wa taihen desu ga, karada ga tsuyoku narimasu.', english: 'Memorizing the forms is tough, but my body is becoming stronger.' },
      ],
      exercises: [
        {
          id: 'b-l9-r1',
          instruction: '先生は どんな人ですか。(What kind of teacher?)',
          prompt: '先生の ようす：',
          type: 'choice',
          options: ['きびしいが、ていねいに 教える', 'おもしろくて、ぜんぜん おこらない', '英語しか 話さない', 'あまり 来ない'],
          correctAnswer: 'きびしいが、ていねいに 教える',
          explanation: 'Text says: "先生は きびしいですが、とても ていねいに 教えてくれます。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: やってみたい 日本文化 (Japanese Cultural Activity I Want to Try)',
      promptInstruction: 'あなたが 体験してみたい 日本の 伝統文化や スポーツについて かきましょう。',
      scaffoldQuestions: ['1. 何を 体験してみたいですか。', '2. なぜ それに 興味が ありますか。'],
      modelEssay: {
        japanese: '私は 着物を 着て、茶道を 体験してみたいです。日本の 伝統的な 部屋で、静かに お茶を 飲むのは すてきだと 思います。少し 難しそうですが、ぜひ 挑戦したいです。',
        romaji: 'Watashi wa kimono o kite, sadou o taiken shite mitai desu. Nihon no dentouteki na heya de, shizuka ni ocha o nomu no wa suteki da to omoimasu. Sukoshi muzukashisou desu ga, zehi chousen shitai desu.',
        english: 'I want to wear a kimono and experience tea ceremony. I think it is lovely to quietly drink tea in a traditional Japanese room. It seems a bit difficult, but I definitely want to try.',
      },
      sampleAnswer: 'わたしは [ぶんか/スポーツ] を してみたいです。[おもしろそう/すてき] だと おもいます。',
    },
  },

  // ==========================================
  // LESSON 10: 日本語で話しましょう
  // ==========================================
  {
    lessonNumber: 10,
    topicNumber: 5,
    topicTitle: 'トピック5 外国語と外国文化',
    title: 'だい10か 日本語で 話しましょう',
    romajiTitle: 'Dai 10-ka: Nihongo de hanashimashou',
    englishTitle: 'Lesson 10: Let\'s Speak in Japanese',
    vocabulary: {
      title: 'もじとことば (Language Learning & Conversation)',
      keyWords: [
        { word: 'ことば', kana: 'ことば', romaji: 'kotoba', meaning: 'Words / Vocabulary', category: 'Language' },
        { word: 'いみ', kana: 'いみ', romaji: 'imi', meaning: 'Meaning', category: 'Language' },
        { word: 'はつおん', kana: 'はつおん', romaji: 'hatsuon', meaning: 'Pronunciation', category: 'Language' },
        { word: '文法 (ぶんぽう)', kana: 'ぶんぽう', romaji: 'bunpou', meaning: 'Grammar', category: 'Language' },
        { word: 'ゆっくり', kana: 'ゆっくり', romaji: 'yukkuri', meaning: 'Slowly', category: 'Adverbs' },
        { word: 'もう一度 (もういちど)', kana: 'もういちど', romaji: 'mou ichido', meaning: 'Once more', category: 'Adverbs' },
      ],
      exercises: [
        {
          id: 'b-l10-v1',
          instruction: 'ただしい 表現を えらびましょう。(Ask to repeat)',
          prompt: '聞き取れなかったとき ➔ (　　) 言ってください。',
          type: 'choice',
          options: ['もう一度', 'はやく', 'きのう', 'ぜんぶ'],
          correctAnswer: 'もう一度',
          explanation: 'もう一度 言ってください = Please say that once more.',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: '〜て ください (ゆっくり 話してください / もう一度 言ってください)',
          meaning: 'Polite requests for communication',
          explanation: 'Used when asking for clarification in conversation.',
          examples: [
            { japanese: 'もう少し ゆっくり 話してください。', romaji: 'Mou sukoshi yukkuri hanashite kudasai.', english: 'Please speak a little more slowly.' },
          ],
        },
        {
          pattern: '〜は [言語] で 何と 言いますか',
          meaning: 'How do you say ~ in [Language]?',
          explanation: 'Asking for vocabulary translation.',
          examples: [
            { japanese: 'これは 日本語で 何と 言いますか。', romaji: 'Kore wa nihongo de nan to iimasu ka.', english: 'What is this called in Japanese?' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l10-g1',
          instruction: 'ただしい かたちを えらびましょう。(Request form)',
          prompt: 'すみません、黒板の 字を ( a 書いて　b 書く ) ください。',
          type: 'choice',
          options: ['書いて', '書く'],
          correctAnswer: '書いて',
          explanation: 'Polite request uses て-form: 書いてください.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 093-096: 日本語の クラスで',
      situation: 'Classroom interaction between teacher and learner.',
      dialogueScript: [
        { speaker: 'マリア', japanese: '先生、「しゅくだい」の 意味を 教えてください。', romaji: 'Sensei, "shukudai" no imi o oshiete kudasai.', english: 'Teacher, please tell me the meaning of "shukudai".' },
        { speaker: '先生', japanese: '「しゅくだい」は 家で やる べんきょうですよ。Homework の ことです。', romaji: '"Shukudai" wa ie de yaru benkyou desu yo. Homework no koto desu.', english: '"Shukudai" is study done at home. It means homework.' },
        { speaker: 'マリア', japanese: 'わかりました！ありがとうございます。', romaji: 'Wakarimashita! Arigatou gozaimasu.', english: 'I understand! Thank you very much.' },
      ],
      exercises: [
        {
          id: 'b-l10-l1',
          instruction: 'マリアさんは 何を たずねましたか。(What did Maria ask?)',
          prompt: '質問した こと：',
          type: 'choice',
          options: ['ことばの 意味', 'テストの 日程', '先生の なまえ', '学校の 場所'],
          correctAnswer: 'ことばの 意味',
          explanation: 'Maria asked: "「しゅくだい」の 意味を 教えてください。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 私の 日本語勉強法 (How I Study Japanese)',
      genre: 'Blog Post',
      passage: [
        { japanese: '私は 毎朝、ポッドキャストを 聞いて 日本語を 勉強しています。', romaji: 'Watashi wa maiasa, poddokyasuto o kiite nihongo o benkyou shite imasu.', english: 'I study Japanese every morning by listening to podcasts.' },
        { japanese: 'あたらしい 単語を ノートに 書いて、声に 出して 読みます。', romaji: 'Atarashii tango o nooto ni kaite, koe ni dashite yomimasu.', english: 'I write new words in my notebook and read them out loud.' },
        { japanese: '日本の ドラマも よく 見ます。生きた 会話が 勉強できて おもしろいです。', romaji: 'Nihon no dorama mo yoku mimasu. Ikita kaiwa ga benkyou dekite omoshiroi desu.', english: 'I also watch Japanese dramas often. It is interesting to study real living conversation.' },
      ],
      exercises: [
        {
          id: 'b-l10-r1',
          instruction: '筆者は 毎朝 何を しますか。(What does the author do every morning?)',
          prompt: '毎朝の 習慣：',
          type: 'choice',
          options: ['ポッドキャストを 聞く', 'ドラマを 1時間 見る', '漢字テストを うける', '友だちと 電話する'],
          correctAnswer: 'ポッドキャストを 聞く',
          explanation: 'Passage: "私は 毎朝、ポッドキャストを 聞いて 日本語を 勉強しています。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 私の 外国語の 勉強 (My Language Study Habits)',
      promptInstruction: 'あなたが どのように 日本語を 勉強しているか、作文を かきましょう。',
      scaffoldQuestions: ['1. 毎日 どのくらい 勉強しますか。', '2. どんな 方法が 一番 役に立ちますか。'],
      modelEssay: {
        japanese: '私は 毎日 30分 日本語を 勉強しています。アプリで 単語を おぼえたり、日本の 音楽を 聞いたり しています。漢字を 書くのは 難しいですが、少しずつ 読めるように なって うれしいです。',
        romaji: 'Watashi wa mainichi sanjuppun nihongo o benkyou shite imasu. Apuri de tango o oboetari, nihon no ongaku o kiitari shite imasu. Kanji o kaku no wa muzukashii desu ga, sukoshizutsu yomeru you ni natte ureshii desu.',
        english: 'I study Japanese for 30 minutes every day. I memorize vocabulary with an app and listen to Japanese music. Writing kanji is difficult, but I am happy that I can read little by little.',
      },
      sampleAnswer: 'わたしは まいにち [じかん] べんきょうしています。[アプリ/ほん] を つかっています。がんばります。',
    },
  },

  // ==========================================
  // LESSON 11: どちらがいいですか
  // ==========================================
  {
    lessonNumber: 11,
    topicNumber: 6,
    topicTitle: 'トピック6 そとで食べる',
    title: 'だい11か どちらが いいですか',
    romajiTitle: 'Dai 11-ka: Dochira ga ii desu ka',
    englishTitle: 'Lesson 11: Which One Is Better?',
    vocabulary: {
      title: 'もじとことば (Dishes & Flavor Comparisons)',
      keyWords: [
        { word: '定食 (ていしょく)', kana: 'ていしょく', romaji: 'teishoku', meaning: 'Set meal', category: 'Food' },
        { word: '丼 (どんぶり)', kana: 'どんぶり', romaji: 'donburi', meaning: 'Rice bowl dish', category: 'Food' },
        { word: '辛い (からい)', kana: 'からい', romaji: 'karai', meaning: 'Spicy', category: 'Taste' },
        { word: '甘い (あまい)', kana: 'あまい', romaji: 'amai', meaning: 'Sweet', category: 'Taste' },
        { word: '量 (りょう)', kana: 'りょう', romaji: 'ryou', meaning: 'Portion / Quantity', category: 'Food' },
        { word: '人気 (にんき)', kana: 'にんき', romaji: 'ninki', meaning: 'Popularity', category: 'General' },
      ],
      exercises: [
        {
          id: 'b-l11-v1',
          instruction: '味のことばを えらびましょう。(Spicy taste)',
          prompt: 'とうがらしが 入っていて、舌が ピリピリする 味 ➔ (　　)',
          type: 'choice',
          options: ['辛い (からい)', '甘い (あまい)', 'にがい', 'すっぱい'],
          correctAnswer: '辛い (からい)',
          explanation: 'Spicy / hot taste is 辛い (からい).',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'A と B と どちらが [形容詞] ですか / A のほうが [形容詞] です',
          meaning: 'Comparing two choices: Which is more ~? A is more ~.',
          explanation: 'Core comparison structure for options.',
          examples: [
            { japanese: 'カレーと ラーメンと どちらが いいですか。', romaji: 'Karee to raamen to dochira ga ii desu ka.', english: 'Between curry and ramen, which one is better?' },
            { japanese: 'ラーメンの ほうが いいです。', romaji: 'Raamen no hou ga ii desu.', english: 'Ramen is better.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l11-g1',
          instruction: 'ただしい ほうを えらびましょう。(Comparison answer pattern)',
          prompt: 'うどん ( a のほうが　b が ) いいです。',
          type: 'choice',
          options: ['のほうが', 'が'],
          correctAnswer: 'のほうが',
          explanation: 'In comparison, [A] のほうが indicates the preferred choice.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 101-104: メニューを 見ながら',
      situation: 'Choosing lunch at a cafeteria.',
      dialogueScript: [
        { speaker: '田中', japanese: '今日の 日替わり定食と カツ丼、どちらが いいですか。', romaji: 'Kyou no higawari teishoku to katsudon, dochira ga ii desu ka.', english: 'Between today\'s daily special set and the pork cutlet bowl, which is better?' },
        { speaker: 'ジョン', japanese: '日替わり定食の ほうが ヘルシーですね。それに します。', romaji: 'Higawari teishoku no hou ga herushii desu ne. Sore ni shimasu.', english: 'The daily special set is healthier. I will go with that.' },
      ],
      exercises: [
        {
          id: 'b-l11-l1',
          instruction: 'ジョンさんは 何を えらびましたか。(What did John pick?)',
          prompt: 'ジョンさんの 注文：',
          type: 'choice',
          options: ['日替わり定食', 'カツ丼', 'うどん', 'サラダだけ'],
          correctAnswer: '日替わり定食',
          explanation: 'John chose: "日替わり定食の ほうが ヘルシーですね。それに します。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: ランチメニューの おすすめ (Lunch Menu Recommendation)',
      genre: 'Menu Description',
      passage: [
        { japanese: '【本日のおすすめランチ】', romaji: '[Honjitsu no osusume ranchi]', english: '[Today\'s Recommended Lunch]' },
        { japanese: 'Aランチ：焼き魚定食（850円）新鮮な 鮭と みそ汁の セットです。', romaji: 'A ranchi: Yakizakana teishoku (happyaku gojuu-en) Shinsen na sake to misoshiru no setto desu.', english: 'Lunch A: Grilled Fish Set (850 yen). Fresh salmon and miso soup set.' },
        { japanese: 'Bランチ：ハンバーグ定食（900円）ボリュームが あって 大人気！', romaji: 'B ranchi: Hanbaagu teishoku (kyuuhyaku-en) Boryuumu ga atte daininki!', english: 'Lunch B: Hamburger Steak Set (900 yen). Substantial portion and very popular!' },
      ],
      exercises: [
        {
          id: 'b-l11-r1',
          instruction: 'ボリュームが あるのは どちらですか。(Which one has bigger volume?)',
          prompt: 'ボリューム満点：',
          type: 'choice',
          options: ['Bランチ（ハンバーグ定食）', 'Aランチ（焼き魚定食）', 'どちらも 同じ', 'わからない'],
          correctAnswer: 'Bランチ（ハンバーグ定食）',
          explanation: 'Menu specifies: "ハンバーグ定食 ボリュームが あって 大人気！"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: おすすめの 料理 (Comparing Two Dishes)',
      promptInstruction: '2つの 好きな 料理を くらべて、どちらが おすすめか かきましょう。',
      scaffoldQuestions: ['1. どんな 2つの 料理ですか。', '2. どちらの ほうが なぜ 好きですか。'],
      modelEssay: {
        japanese: '私は ラーメンと うどんでは、ラーメンの ほうが 好きです。スープの 種類が 多くて、濃厚な 味が 好きだからです。でも、疲れた ときは うどんの ほうが 胃に やさしくて いいです。',
        romaji: 'Watashi wa raamen to udon dewa, raamen no hou ga suki desu. Suupu no shurui ga ookute, noukou na aji ga suki da kara desu. Demo, tsukareta toki wa udon no hou ga i ni yasashikute ii desu.',
        english: 'Between ramen and udon, I prefer ramen. This is because there are many kinds of broth and I like rich flavor. However, when tired, udon is gentler on the stomach.',
      },
      sampleAnswer: '[りょうり1] と [りょうり2] では、[りょうり1] の ほうが すきです。[あじ] だからです。',
    },
  },

  // ==========================================
  // LESSON 12: 注文をお願いします
  // ==========================================
  {
    lessonNumber: 12,
    topicNumber: 6,
    topicTitle: 'トピック6 そとで食べる',
    title: 'だい12か 注文を お願いします',
    romajiTitle: 'Dai 12-ka: Chuumon o onegai shimasu',
    englishTitle: 'Lesson 12: We Would Like to Order, Please',
    vocabulary: {
      title: 'もじとことば (Ordering in Restaurants)',
      keyWords: [
        { word: 'ちゅうもん', kana: 'ちゅうもん', romaji: 'chuumon', meaning: 'Order', category: 'Restaurant' },
        { word: 'おかんじょう / おかいけい', kana: 'おかんじょう / おかいけい', romaji: 'okanjou / okaikei', meaning: 'The bill / check', category: 'Restaurant' },
        { word: 'べつべつ', kana: 'べつべつ', romaji: 'betsubetsu', meaning: 'Separately (split bill)', category: 'Restaurant' },
        { word: 'いっしょ', kana: 'いっしょ', romaji: 'issho', meaning: 'Together (one bill)', category: 'Restaurant' },
        { word: '大盛り (おおもり)', kana: 'おおもり', romaji: 'oomori', meaning: 'Large portion', category: 'Restaurant' },
        { word: '少なめ (すくなめ)', kana: 'すくなめ', romaji: 'sukuname', meaning: 'Smaller portion', category: 'Restaurant' },
      ],
      exercises: [
        {
          id: 'b-l12-v1',
          instruction: 'レストランの 表現を えらびましょう。(Splitting check)',
          prompt: '支払いを それぞれ 別々に したいとき ➔ (　　) で お願いします。',
          type: 'choice',
          options: ['べつべつ', 'いっしょ', 'おおもり', 'ただ'],
          correctAnswer: 'べつべつ',
          explanation: 'Paying separately is べつべつで お願いします.',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: '〜を お願いします / 〜に します',
          meaning: 'Ordering food / deciding on a choice',
          explanation: 'Standard polite way to order items in restaurants.',
          examples: [
            { japanese: 'ホットコーヒーを 1つ お願いします。', romaji: 'Hotto koohii o hitotsu onegai shimasu.', english: 'One hot coffee, please.' },
            { japanese: '私は 天ぷらうどんに します。', romaji: 'Watashi wa tempura udon ni shimasu.', english: 'I will go with tempura udon.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l12-g1',
          instruction: 'ただしい 表現を えらびましょう。(Calling waiter)',
          prompt: 'すみません、ちゅうもん ( a を　b に ) お願いします。',
          type: 'choice',
          options: ['を', 'に'],
          correctAnswer: 'を',
          explanation: 'ちゅうもんを お願いします = We would like to order, please.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 111-114: カフェの レジで',
      situation: 'Ordering coffee and paying at the cash register.',
      dialogueScript: [
        { speaker: '店員', japanese: 'いらっしゃいませ。ご注文は お決まりですか。', romaji: 'Irasshaimase. Gochuumon wa okimari desu ka.', english: 'Welcome! Have you decided on your order?' },
        { speaker: '客', japanese: 'アイスティーの Ｓサイズを ひとつと、チーズケーキを ください。', romaji: 'Aisutii no esu-saizu o hitotsu to, chiizukeeki o kudasai.', english: 'One small iced tea and cheesecake, please.' },
        { speaker: '店員', japanese: '店内でお召し上がりですか。', romaji: 'Tennai de omeshiagari desu ka.', english: 'Will that be for here?' },
        { speaker: '客', japanese: 'はい、ここで 食べます。', romaji: 'Hai, koko de tabemasu.', english: 'Yes, I will eat here.' },
      ],
      exercises: [
        {
          id: 'b-l12-l1',
          instruction: '客は どこで 食べますか。(Eat here or to-go?)',
          prompt: '飲食の 場所：',
          type: 'choice',
          options: ['店内で 食べる (For here)', '持ち帰り (To-go)', 'キャンセルした', '外のベンチ'],
          correctAnswer: '店内で 食べる (For here)',
          explanation: 'Customer said: "はい、ここで 食べます。" (Eat inside).',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: ファミレスの タブレット注文 (Tablet Ordering)',
      genre: 'User Guide',
      passage: [
        { japanese: 'テーブルの タブレット端末で 注文できます。', romaji: 'Teeburu no taburetto tanmatsu de chuumon dekimasu.', english: 'You can order with the tablet terminal on the table.' },
        { japanese: 'お料理の 写真を タッチして、数量を えらんでください。', romaji: 'Oryouri no shashin o tacchi shite, suuryou o erande kudasai.', english: 'Touch the picture of the dish and select the quantity.' },
        { japanese: '最後は「注文を確定する」ボタンを おしてください。', romaji: 'Saigo wa "Chuumon o kakutei suru" botan o oshite kudasai.', english: 'Finally, please press the "Confirm Order" button.' },
      ],
      exercises: [
        {
          id: 'b-l12-r1',
          instruction: '注文の 最後に 何を しますか。(Final step)',
          prompt: '最後の 操作：',
          type: 'choice',
          options: ['「注文を確定する」ボタンを おす', '店員を よぶ', 'お金を 入れる', 'タブレットを けす'],
          correctAnswer: '「注文を確定する」ボタンを おす',
          explanation: 'Text states: "最後は「注文を確定する」ボタンを おしてください。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: レストランでの 注文カンペ (My Restaurant Order Note)',
      promptInstruction: '日本の レストランで スムーズに 注文するための メモを 作成しましょう。',
      scaffoldQuestions: ['1. 食べたい 料理や 飲み物は 何ですか。', '2. 会計は 別々ですか、一緒ですか。'],
      modelEssay: {
        japanese: 'すみません、注文を お願いします。豚骨ラーメンを ひとつと、ギョーザを ひと皿 ください。それから、お冷を もう一杯 いただけますか。お会計は 別々で お願いします。',
        romaji: 'Sumimasen, chuumon o onegai shimasu. Tonkotsu raamen o hitotsu to, gyouza o hitosara kudasai. Sore kara, ohiya o mou ippai itadakemasu ka. Okaikei wa betsubetsu de onegai shimasu.',
        english: 'Excuse me, we would like to order. One tonkotsu ramen and one plate of gyoza, please. Also, could we have another glass of cold water? And please split the bill.',
      },
      sampleAnswer: 'すみません、[りょうり] を [かず] つ ください。おかいけいは [べつべつ/いっしょ] で おねがいします。',
    },
  },

  // ==========================================
  // LESSON 13: 新幹線で行きましょう
  // ==========================================
  {
    lessonNumber: 13,
    topicNumber: 7,
    topicTitle: 'トピック7 出張',
    title: 'だい13か 新幹線で 行きましょう',
    romajiTitle: 'Dai 13-ka: Shinkansen de ikimashou',
    englishTitle: 'Lesson 13: Let\'s Go by Shinkansen',
    vocabulary: {
      title: 'もじとことば (High-Speed Travel & Transportation)',
      keyWords: [
        { word: '新幹線 (しんかんせん)', kana: 'しんかんせん', romaji: 'shinkansen', meaning: 'Bullet train (Shinkansen)', category: 'Transport' },
        { word: '飛行機 (ひこうき)', kana: 'ひこうき', romaji: 'hikouki', meaning: 'Airplane', category: 'Transport' },
        { word: '自由席 (じゆうせき)', kana: 'じゆうせき', romaji: 'jiyuuseki', meaning: 'Non-reserved seat', category: 'Transport' },
        { word: '指定席 (していせき)', kana: 'していせき', romaji: 'shiteiseki', meaning: 'Reserved seat', category: 'Transport' },
        { word: '片道 / 往復', kana: 'かたみち / おうふく', romaji: 'katamichi / oufuku', meaning: 'One-way / Round trip', category: 'Transport' },
        { word: '出発 (しゅっぱつ)', kana: 'しゅっぱつ', romaji: 'shuppatsu', meaning: 'Departure', category: 'Transport' },
      ],
      exercises: [
        {
          id: 'b-l13-v1',
          instruction: '切符の しゅるいを えらびましょう。(Reserved seat)',
          prompt: '座席が 決まっている 切符 ➔ (　　)',
          type: 'choice',
          options: ['指定席 (していせき)', '自由席 (じゆうせき)', '片道', '定期券'],
          correctAnswer: '指定席 (していせき)',
          explanation: 'Reserved seat is 指定席 (していせき).',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: '〜で 行きましょう / 〜ましょうか (Proposals & Suggestions)',
          meaning: 'Let\'s go by ~ / Shall we ~?',
          explanation: 'Making business travel suggestions using 〜ましょう.',
          examples: [
            { japanese: '新幹線で 行きましょう。速いですから。', romaji: 'Shinkansen de ikimashou. Hayai desu kara.', english: 'Let\'s go by Shinkansen, because it is fast.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l13-g1',
          instruction: 'さそう 表現を えらびましょう。(Let\'s go)',
          prompt: '東京駅で ( a 待ちましょう　b 待ってください )。',
          type: 'choice',
          options: ['待ちましょう', '待ってください'],
          correctAnswer: '待ちましょう',
          explanation: 'Let\'s wait together proposal uses 〜ましょう: 待ちましょう.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 121-124: 大阪出張の 打ち合わせ',
      situation: 'Colleagues planning business trip transportation to Osaka.',
      dialogueScript: [
        { speaker: '佐藤', japanese: '来週の 大阪出張、何で 行きましょうか。', romaji: 'Raishuu no Oosaka shutchou, nan de ikimashou ka.', english: 'For next week\'s business trip to Osaka, how shall we go?' },
        { speaker: 'スミス', japanese: '新幹線が 便利ですね。東京駅から 2時間半です。', romaji: 'Shinkansen ga benri desu ne. Toukyou-eki kara nijikanhan desu.', english: 'The bullet train is convenient. It is 2.5 hours from Tokyo Station.' },
        { speaker: '佐藤', japanese: 'じゃあ、のぞみの 指定席を とりましょう。', romaji: 'Jaa, Nozomi no shiteiseki o torimashou.', english: 'Then let\'s reserve seats on the Nozomi!' },
      ],
      exercises: [
        {
          id: 'b-l13-l1',
          instruction: '2人は 何で 大阪に 行きますか。(How will they travel?)',
          prompt: '交通手段：',
          type: 'choice',
          options: ['新幹線 (Shinkansen)', '飛行機 (Airplane)', '夜行バス (Night bus)', '車 (Car)'],
          correctAnswer: '新幹線 (Shinkansen)',
          explanation: 'They agreed on: "新幹線が 便利ですね。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 新幹線の 時刻表 (Bullet Train Timetable Note)',
      genre: 'Schedule',
      passage: [
        { japanese: 'のぞみ 15号：東京発 08:30 ➔ 新大阪着 11:06', romaji: 'Nozomi 15-gou: Toukyou hatsu 08:30 -> Shin-Oosaka chaku 11:06', english: 'Nozomi No. 15: Tokyo dep 08:30 -> Shin-Osaka arr 11:06' },
        { japanese: '社内販売で お弁当や コーヒーを 購入できます。全席禁煙です。', romaji: 'Shanai hanbai de obentou ya koohii o kounyuu dekimasu. Zenseki kin\'en desu.', english: 'Bento box lunches and coffee can be purchased onboard. All seats non-smoking.' },
      ],
      exercises: [
        {
          id: 'b-l13-r1',
          instruction: '新大阪には 何時に 着きますか。(Arrival time)',
          prompt: '新大阪 到着時刻：',
          type: 'choice',
          options: ['11:06', '08:30', '12:00', '10:30'],
          correctAnswer: '11:06',
          explanation: 'Timetable clearly lists: "新大阪着 11:06".',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 出張の スケジュール (Business Trip Itinerary)',
      promptInstruction: '出張の 行き先、交通手段、集合時間を まとめた メモを かきましょう。',
      scaffoldQuestions: ['1. どこへ 何で 行きますか。', '2. 何時に どこで 集合しますか。'],
      modelEssay: {
        japanese: '【京都出張の 予定】8月10日に 新幹線で 京都へ 行きます。東京駅の 銀の鈴広場に 朝8時に 集合しましょう。指定席の チケットは 予約済みです。よろしくお願いします。',
        romaji: '[Kyouto shutchou no yotei] Hachigatsu tooka ni shinkansen de Kyouto e ikimasu. Toukyou-eki no Gin no Suzu hiroba ni asa hachiji ni shuugou shimashou. Shiteiseki no chiketto wa yoyakuzumi desu. Yoroshiku onegai shimasu.',
        english: '[Kyoto Business Trip Plan] We will go to Kyoto by bullet train on August 10th. Let\'s meet at Silver Bell Square in Tokyo Station at 8:00 AM. Reserved seat tickets are already booked.',
      },
      sampleAnswer: '[ひづけ] に [ばしょ] へ [しんかんせん/ひこうき] で いきます。[じかん] に あいましょう。',
    },
  },

  // ==========================================
  // LESSON 14: ホテルを予約しました
  // ==========================================
  {
    lessonNumber: 14,
    topicNumber: 7,
    topicTitle: 'トピック7 出張',
    title: 'だい14か ホテルを 予約しました',
    romajiTitle: 'Dai 14-ka: Hoteru o yoyaku shimashita',
    englishTitle: 'Lesson 14: I Reserved a Hotel',
    vocabulary: {
      title: 'もじとことば (Hotel Accommodation & Amenities)',
      keyWords: [
        { word: 'シングル / ツイン', kana: 'シングル / ツイン', romaji: 'shinguru / tsuin', meaning: 'Single room / Twin room', category: 'Hotel' },
        { word: 'チェックイン / アウト', kana: 'チェックイン / アウト', romaji: 'chekkuin / auto', meaning: 'Check-in / Check-out', category: 'Hotel' },
        { word: '朝食 (ちょうしょく)', kana: 'ちょうしょく', romaji: 'choushoku', meaning: 'Breakfast', category: 'Hotel' },
        { word: '禁煙ルーム (きんえん)', kana: 'きんえんルーム', romaji: 'kin\'en ruumu', meaning: 'Non-smoking room', category: 'Hotel' },
        { word: '大浴場 (だいよくじょう)', kana: 'だいよくじょう', romaji: 'daiyokujou', meaning: 'Public bath', category: 'Hotel' },
        { word: '泊まります (とまります)', kana: 'とまります', romaji: 'tomarimasu', meaning: 'To stay overnight', category: 'Verbs' },
      ],
      exercises: [
        {
          id: 'b-l14-v1',
          instruction: 'ホテルの ことばを えらびましょう。(Overnight stay verb)',
          prompt: 'ホテルに 1泊 (　　)。',
          type: 'choice',
          options: ['泊まります (とまります)', '住みます', '行きます', '買います'],
          correctAnswer: '泊まります (とまります)',
          explanation: 'To stay overnight at a lodging is 泊まります (とまります).',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: '〜が ついていますか / Wi-Fi は ありますか',
          meaning: 'Inquiring about hotel room amenities & breakfast',
          explanation: 'Checking what is included in reservation.',
          examples: [
            { japanese: '朝食は ついていますか。', romaji: 'Choushoku wa tsuite imasu ka.', english: 'Is breakfast included?' },
            { japanese: '部屋で Wi-Fi は 使えますか。', romaji: 'Heya de Wi-Fi wa tsukaemasu ka.', english: 'Can Wi-Fi be used in the room?' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l14-g1',
          instruction: 'ただしい 助詞を えらびましょう。(Inclusion question)',
          prompt: '朝食 ( a は　b を ) ついていますか。',
          type: 'choice',
          options: ['は', 'を'],
          correctAnswer: 'は',
          explanation: 'Topic / inclusion inquiry uses は: 朝食は ついていますか。',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 131-134: ホテルの フロントで',
      situation: 'Checking in at the front desk of a business hotel.',
      dialogueScript: [
        { speaker: 'フロント', japanese: 'いらっしゃいませ。チェックインでございますか。', romaji: 'Irasshaimase. Chekkuin de gozaimasu ka.', english: 'Welcome. Checking in, sir?' },
        { speaker: '客', japanese: 'はい、予約した スミスです。シングルの 禁煙室です。', romaji: 'Hai, yoyaku shita Sumisu desu. Shinguru no kin\'enshitsu desu.', english: 'Yes, I am Smith with a reservation. Single non-smoking room.' },
        { speaker: 'フロント', japanese: 'かしこまりました。朝食は 7時から 2階の レストランで 無料で 召し上がれます。', romaji: 'Kashikomarimashita. Choushoku wa shichiji kara nikai no resutoran de muryou de meshiagaremasu.', english: 'Understood. Breakfast is available for free from 7:00 at the 2nd floor restaurant.' },
      ],
      exercises: [
        {
          id: 'b-l14-l1',
          instruction: '朝食は いくらですか。(Breakfast cost)',
          prompt: '朝食の 料金：',
          type: 'choice',
          options: ['無料 (Free)', '1,000円', '500円', '別料金'],
          correctAnswer: '無料 (Free)',
          explanation: 'Front clerk says: "無料で 召し上がれます。" (Can enjoy for free).',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: ホテル予約の 確認メール (Hotel Confirmation Email)',
      genre: 'Confirmation Email',
      passage: [
        { japanese: '【予約内容】ホテルサンシャイン名古屋', romaji: '[Yoyaku naiyou] Hoteru Sanshain Nagoya', english: '[Booking Details] Hotel Sunshine Nagoya' },
        { japanese: '宿泊日：10月15日（1泊） シングル 禁煙室 1室', romaji: 'Shukuhakubi: Juugatsu juugonichi (ippaku) Shinguru kin\'enshitsu isshitsu', english: 'Date of stay: October 15 (1 night) Single non-smoking room 1 room' },
        { japanese: 'チェックイン：15:00〜 チェックアウト：10:00まで', romaji: 'Chekkuin: 15:00~ Chekkuauto: 10:00 made', english: 'Check-in: 15:00~ Check-out: by 10:00' },
      ],
      exercises: [
        {
          id: 'b-l14-r1',
          instruction: 'チェックアウトは 何時までですか。(Check-out deadline)',
          prompt: 'チェックアウト時刻：',
          type: 'choice',
          options: ['10:00まで', '15:00まで', '12:00まで', '11:00まで'],
          correctAnswer: '10:00まで',
          explanation: 'Email clearly states: "チェックアウト：10:00まで".',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 出張ホテルの 予約リクエスト (Hotel Request Message)',
      promptInstruction: '希望する 部屋の タイプや 朝食の 希望を ホテルに つたえる 文章を かきましょう。',
      scaffoldQuestions: ['1. 何泊 泊まりますか。', '2. どんな 部屋が いいですか。'],
      modelEssay: {
        japanese: '11月20日から 2泊で 予約したいです。禁煙の シングルルームを 希望します。また、仕事で パソコンを 使いますので、高速度 Wi-Fi が 使える 部屋を お願いできますでしょうか。よろしくお願いします。',
        romaji: 'Juuichigatsu hatsuka kara nihaku de yoyaku shitai desu. Kin\'en no shinguru ruumu o kibou shimasu. Mata, shigoto de pasokon o tsukaimasu node, kousokudo Wi-Fi ga tsukaeru heya o onegai dekimasu deshou ka. Yoroshiku onegai shimasu.',
        english: 'I would like to book for 2 nights starting November 20th. I request a non-smoking single room. Also, since I will use a laptop for work, could I please have a room with high-speed Wi-Fi? Thank you.',
      },
      sampleAnswer: '[ひにち] から [なんぱく] で [きんえん/きつえん] の [シングル/ツイン] を おねがいします。',
    },
  },

  // ==========================================
  // LESSON 15: どうしましたか
  // ==========================================
  {
    lessonNumber: 15,
    topicNumber: 8,
    topicTitle: 'トピック8 けんこう',
    title: 'だい15か どうしましたか',
    romajiTitle: 'Dai 15-ka: Dou shimashita ka',
    englishTitle: 'Lesson 15: What Happened? / What\'s the Matter?',
    vocabulary: {
      title: 'もじとことば (Symptoms & Body Parts)',
      keyWords: [
        { word: '頭が 痛い (あたまが いたい)', kana: 'あたまが いたい', romaji: 'atama ga itai', meaning: 'Headache', category: 'Health' },
        { word: 'お腹が 痛い (おなかが いたい)', kana: 'おなかが いたい', romaji: 'onaka ga itai', meaning: 'Stomachache', category: 'Health' },
        { word: '熱が ある (ねつが ある)', kana: 'ねつが ある', romaji: 'netsu ga aru', meaning: 'Have a fever', category: 'Health' },
        { word: '風邪を ひく (かぜを ひく)', kana: 'かぜを ひく', romaji: 'kaze o hiku', meaning: 'Catch a cold', category: 'Health' },
        { word: '咳が 出る (せきが でる)', kana: 'せきが でる', romaji: 'seki ga deru', meaning: 'Cough', category: 'Health' },
        { word: 'だるい', kana: 'だるい', romaji: 'darui', meaning: 'Lethargic / Sluggish / Heavy', category: 'Health' },
      ],
      exercises: [
        {
          id: 'b-l15-v1',
          instruction: 'ただしい しょうじょうを えらびましょう。(Fever symptom)',
          prompt: '体温が 38度 あります ➔ (　　)',
          type: 'choice',
          options: ['熱が あります', 'おなかが 痛いです', '目が かゆいです', '元気です'],
          correctAnswer: '熱が あります',
          explanation: 'Having high body temperature is 熱が あります (have a fever).',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: '[体の部位] が 痛いです / 〜んです (Explaining physical symptoms)',
          meaning: 'My [body part] hurts / Expressing background reason',
          explanation: 'Using が 痛い to indicate aches.',
          examples: [
            { japanese: '昨日から 喉が 痛いんです。', romaji: 'Kinou kara nodo ga itai n desu.', english: 'My throat has been hurting since yesterday.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l15-g1',
          instruction: 'ただしい 助詞を えらびましょう。(Ache marker)',
          prompt: '頭 ( a が　b を ) 痛くて、熱も あります。',
          type: 'choice',
          options: ['が', 'を'],
          correctAnswer: 'が',
          explanation: 'Painful part takes が: 頭が痛い.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 141-144: 職場の 会話 (具合が 悪い同僚)',
      situation: 'A colleague looks unwell at the office.',
      dialogueScript: [
        { speaker: '山田', japanese: 'スミスさん、顔色が 悪いですね。どうしましたか。', romaji: 'Sumisu-san, kaoiro ga warui desu ne. Dou shimashita ka.', english: 'Smith-san, you look pale. What\'s the matter?' },
        { speaker: 'スミス', japanese: 'ちょっと 頭が 痛くて、だるいんです。', romaji: 'Chotto atama ga itakute, darui n desu.', english: 'I have a headache and feel quite sluggish.' },
        { speaker: '山田', japanese: '無理を しないで、早退して 病院に 行ったほうが いいですよ。', romaji: 'Muri o shinaide, soutai shite byouin ni itta hou ga ii desu yo.', english: 'Don\'t push yourself; you should leave early and see a doctor.' },
      ],
      exercises: [
        {
          id: 'b-l15-l1',
          instruction: 'スミスさんは どんな 症状ですか。(Smith\'s symptoms)',
          prompt: 'スミスさんの 症状：',
          type: 'choice',
          options: ['頭が 痛くて、だるい', 'お腹が すいている', '歯が 痛い', '元気いっぱい'],
          correctAnswer: '頭が 痛くて、だるい',
          explanation: 'Smith explained: "ちょっと 頭が 痛くて、だるいんです。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 病院の 問診票 (Clinic Medical Questionnaire)',
      genre: 'Questionnaire Form',
      passage: [
        { japanese: '問診票：どこが 悪いでですか。（□頭 □喉 □お腹 □その他）', romaji: 'Monshinhyou: Doko ga warui desu ka. (Atama / Nodo / Onaka / Sonota)', english: 'Questionnaire: Where feels bad? ([ ] Head [ ] Throat [ ] Stomach [ ] Other)' },
        { japanese: 'いつからですか。（ 3日 前から ） 熱は 測りましたか。（ 37.8 度 ）', romaji: 'Itsu kara desu ka. (Mikka mae kara) Netsu wa hakarimashita ka. (37.8 do)', english: 'Since when? (Since 3 days ago) Did you measure temperature? (37.8°C)' },
      ],
      exercises: [
        {
          id: 'b-l15-r1',
          instruction: '熱は 何度ですか。(Fever temperature)',
          prompt: '測定した 体温：',
          type: 'choice',
          options: ['37.8 度', '36.5 度', '39.0 度', '測っていない'],
          correctAnswer: '37.8 度',
          explanation: 'Questionnaire specifies: 37.8 度.',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 体調不良の 連絡メール (Calling in Sick Email)',
      promptInstruction: '会社や 学校に、体調が 悪くて 休むことを つたえる メールを かきましょう。',
      scaffoldQuestions: ['1. どんな 症状が ありますか。', '2. 今日は どうしますか（病院へ行く/家で休む）。'],
      modelEssay: {
        japanese: '田中部長、おはようございます。今朝から 高い熱が あり、喉も 激しく 痛みます。申し訳ありませんが、本日は 休暇を いただいて 病院へ 行きます。診断結果は また 連絡いたします。',
        romaji: 'Tanaka buchou, ohayou gozaimasu. Kesa kara takai netsu ga ari, nodo mo hageshiku itamimasu. Moushiwake arimasen ga, honjitsu wa kyuuka o itadaite byouin e ikimasu. Shindan kekka wa mata renraku itashimasu.',
        english: 'Manager Tanaka, good morning. I have had a high fever and severe sore throat since this morning. I apologize, but I would like to take the day off today and visit a hospital. I will follow up with the diagnosis results.',
      },
      sampleAnswer: 'おはようございます。[しょうじょう] が ありますので、きょうは [やすみます/びょういんへいきます]。',
    },
  },

  // ==========================================
  // LESSON 16: 薬を飲んでください
  // ==========================================
  {
    lessonNumber: 16,
    topicNumber: 8,
    topicTitle: 'トピック8 けんこう',
    title: 'だい16か 薬を 飲んで ください',
    romajiTitle: 'Dai 16-ka: Kusuri o nonde kudasai',
    englishTitle: 'Lesson 16: Please Take Medicine',
    vocabulary: {
      title: 'もじとことば (Medicine, Recovery & Health Advice)',
      keyWords: [
        { word: '薬 (くすり)', kana: 'くすり', romaji: 'kusuri', meaning: 'Medicine', category: 'Health' },
        { word: '食前 (しょくぜん)', kana: 'しょくぜん', romaji: 'shokuzen', meaning: 'Before meals', category: 'Medicine' },
        { word: '食後 (しょくご)', kana: 'しょくご', romaji: 'shokugo', meaning: 'After meals', category: 'Medicine' },
        { word: '安静 (あんせい)', kana: 'あんせい', romaji: 'ansei', meaning: 'Rest / Bed rest', category: 'Health' },
        { word: 'お大事に (おだいじに)', kana: 'おだいじに', romaji: 'odaiji ni', meaning: 'Take care of yourself (Get well soon)', category: 'Greeting' },
        { word: 'ぬるま湯', kana: 'ぬるまゆ', romaji: 'nurumayu', meaning: 'Lukewarm water', category: 'Health' },
      ],
      exercises: [
        {
          id: 'b-l16-v1',
          instruction: '病気の人への あいさつを えらびましょう。(Get well greeting)',
          prompt: '風邪を ひいた 人に 言う 言葉 ➔ (　　)',
          type: 'choice',
          options: ['お大事に (おだいじに)', 'おめでとう', 'ごちそうさま', 'いってらっしゃい'],
          correctAnswer: 'お大事に (おだいじに)',
          explanation: 'The standard caring wish for sick people is お大事に (odaiji ni).',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: 'V-ないで ください (無理を しないで ください / お風呂に 入らないで ください)',
          meaning: 'Polite prohibition: Please do not ~',
          explanation: 'Medical doctor instructions to avoid certain harmful activities.',
          examples: [
            { japanese: '今日は お風呂に 入らないで ください。', romaji: 'Kyou wa ofuro ni hairanaide kudasai.', english: 'Please do not take a bath today.' },
            { japanese: 'お酒を 飲まないで ください。', romaji: 'Osake o nomanaide kudasai.', english: 'Please do not drink alcohol.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l16-g1',
          instruction: 'ただしい 否定指示の 形を えらびましょう。(Negative request)',
          prompt: '今夜は つめたいものを ( a 飲まないで　b 飲まなくて ) ください。',
          type: 'choice',
          options: ['飲まないで', '飲まなくて'],
          correctAnswer: '飲まないで',
          explanation: 'Negative polite request pattern is 〜ないで ください: 飲まないで ください.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 151-154: 薬局での 服薬指導',
      situation: 'Pharmacist explaining how and when to take prescribed medicine.',
      dialogueScript: [
        { speaker: '薬剤師', japanese: 'この 薬は 1日 3回、食後に 2錠ずつ 飲んで ください。', romaji: 'Kono kusuri wa ichinichi sankai, shokugo ni nijou-zutsu nonde kudasai.', english: 'Please take 2 tablets of this medicine 3 times a day, after meals.' },
        { speaker: '患者', japanese: '眠くなりますか。', romaji: 'Nemuku narimasu ka.', english: 'Will it make me drowsy?' },
        { speaker: '薬剤師', japanese: 'はい、少し 眠くなりますから、車の 運転は しないで くださいね。お大事に。', romaji: 'Hai, sukoshi nemuku narimasu kara, kuruma no unten wa shinaide kudasai ne. Odaiji ni.', english: 'Yes, it makes you slightly drowsy, so please do not drive cars. Take care!' },
      ],
      exercises: [
        {
          id: 'b-l16-l1',
          instruction: '薬を 飲んだあと、してはいけない ことは 何ですか。(Prohibited action)',
          prompt: '禁止事項：',
          type: 'choice',
          options: ['車の 運転 (Driving cars)', 'ご飯を 食べる こと', '水を 飲む こと', '寝る こと'],
          correctAnswer: '車の 運転 (Driving cars)',
          explanation: 'Pharmacist warned: "車の 運転は しないで くださいね。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: お薬の 説明書 (Medicine Instruction Leaflet)',
      genre: 'Medicine Label',
      passage: [
        { japanese: '【用法・用量】成人（15歳以上）：1回1包、1日3回 食後30分以内に 服用してください。', romaji: '[Youhou/Youryou] Seijin (juugosai ijou): Ikkai ippou, ichinichi sankai shokugo sanjuppun inai ni fukuyou shite kudasai.', english: '[Dosage] Adults (15+): 1 packet per dose, 3 times a day within 30 minutes after meals.' },
        { japanese: '服用中は 激しい 運動を さけて、十分な 睡眠を とってください。', romaji: 'Fukuyouchuu wa hageshii undou o sakete, juubun na suimin o totte kudasai.', english: 'Avoid strenuous exercise while taking medication, and get sufficient sleep.' },
      ],
      exercises: [
        {
          id: 'b-l16-r1',
          instruction: '薬は いつ 飲みますか。(When to take medicine)',
          prompt: '服用の タイミング：',
          type: 'choice',
          options: ['食後30分以内', '寝る 直前', '食事の 1時間前', '運動の あと'],
          correctAnswer: '食後30分以内',
          explanation: 'Instruction states: "食後30分以内に 服用してください。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: 病気の 友だちへの お見舞いメッセージ (Get Well Soon Note)',
      promptInstruction: '風邪を ひいて 寝込んでいる 友だちに、励ましと アドバイスの メモを かきましょう。',
      scaffoldQuestions: ['1. 友だちの 体調を 気遣う言葉を 書きましょう。', '2. どんな アドバイスを しますか（無理しないで、温かくして）。'],
      modelEssay: {
        japanese: 'アリさん、風邪の 具合は どうですか。とても 心配です。仕事の ことは 気にしないで、ゆっくり 休んで くださいね。温かい スープを 飲んで、体を 冷やさないように して ください。お大事に！',
        romaji: 'Ari-san, kaze no guai wa dou desu ka. Totemo shinpai desu. Shigoto no koto wa kinishinaide, yukkuri yasunde kudasai ne. Atatakai suupu o nonde, karada o hiyasanai you ni shite kudasai. Odaiji ni!',
        english: 'Ali-san, how is your cold? I am very worried. Please don\'t worry about work and rest well. Drink warm soup and keep warm. Get well soon!',
      },
      sampleAnswer: '[なまえ] さん、むりを しないで ゆっくり やすんで ください。[くすり] を のんで、おだいじに！',
    },
  },

  // ==========================================
  // LESSON 17: おめでとうございます
  // ==========================================
  {
    lessonNumber: 17,
    topicNumber: 9,
    topicTitle: 'トピック9 お祝い',
    title: 'だい17か おめでとうございます',
    romajiTitle: 'Dai 17-ka: Omedetou gozaimasu',
    englishTitle: 'Lesson 17: Congratulations!',
    vocabulary: {
      title: 'もじとことば (Celebrations & Milestones)',
      keyWords: [
        { word: '誕生日 (たんじょうび)', kana: 'たんじょうび', romaji: 'tanjoubi', meaning: 'Birthday', category: 'Celebration' },
        { word: '結婚 (けっこん)', kana: 'けっこん', romaji: 'kekkon', meaning: 'Marriage / Wedding', category: 'Celebration' },
        { word: '卒業 (そつぎょう)', kana: 'そつぎょう', romaji: 'sotsugyou', meaning: 'Graduation', category: 'Celebration' },
        { word: 'パーティー', kana: 'パーティー', romaji: 'paatii', meaning: 'Party', category: 'Celebration' },
        { word: '乾杯 (かんぱい)', kana: 'かんぱい', romaji: 'kanpai', meaning: 'Cheers! / Toast', category: 'Celebration' },
        { word: 'お祝い (おいわい)', kana: 'おいわい', romaji: 'oiwai', meaning: 'Celebration / Congratulatory gift', category: 'Celebration' },
      ],
      exercises: [
        {
          id: 'b-l17-v1',
          instruction: 'お祝いの ことばを えらびましょう。(Drinking toast)',
          prompt: 'グラスを もって 乾杯するときの 掛け声 ➔ (　　)',
          type: 'choice',
          options: ['乾杯 (かんぱい)！', 'いただきます！', 'ごめんなさい！', 'さようなら！'],
          correctAnswer: '乾杯 (かんぱい)！',
          explanation: 'Cheers toast is 乾杯 (かんぱい)！',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: '[お祝い事] おめでとうございます (Congratulations on ~)',
          meaning: 'Formal congratulations for milestones',
          explanation: 'Used for birthdays, weddings, new year, and achievements.',
          examples: [
            { japanese: 'お誕生日 おめでとうございます！', romaji: 'Otanjoubi omedetou gozaimasu!', english: 'Happy Birthday!' },
            { japanese: 'ご結婚 おめでとうございます！', romaji: 'Gokekkon omedetou gozaimasu!', english: 'Congratulations on your marriage!' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l17-g1',
          instruction: 'ただしい 祝辞を えらびましょう。(Graduation wish)',
          prompt: '大学の 卒業式で ➔ ご卒業 ( a おめでとうございます　b ありがとうございます )！',
          type: 'choice',
          options: ['おめでとうございます', 'ありがとうございます'],
          correctAnswer: 'おめでとうございます',
          explanation: 'Congratulating on milestone: ご卒業 おめでとうございます！',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 161-164: 送別会と 昇進祝い',
      situation: 'Party celebrating a colleague\'s promotion.',
      dialogueScript: [
        { speaker: '課長', japanese: 'みなさん、グラスを 持ってください。今日は 鈴木さんの 昇進祝いです。', romaji: 'Minasan, gurasu o motte kudasai. Kyou wa Suzuki-san no shoushin iwai desu.', english: 'Everyone, please raise your glasses. Today is Suzuki-san\'s promotion celebration.' },
        { speaker: '全員', japanese: '鈴木さん、おめでとうございます！かんぱーい！', romaji: 'Suzuki-san, omedetou gozaimasu! Kanpaaai!', english: 'Suzuki-san, congratulations! Cheers!' },
        { speaker: '鈴木', japanese: 'みなさん、本当に ありがとうございます。これからも がんばります！', romaji: 'Minasan, hontou ni arigatou gozaimasu. Kore kara mo gambarimasu!', english: 'Everyone, thank you so much. I will continue doing my best!' },
      ],
      exercises: [
        {
          id: 'b-l17-l1',
          instruction: '今日何の お祝いですか。(What celebration is this?)',
          prompt: 'パーティーの 理由：',
          type: 'choice',
          options: ['鈴木さんの 昇進祝い', '鈴木さんの 結婚式', 'お正月の 宴会', '会社の 創立記念日'],
          correctAnswer: '鈴木さんの 昇進祝い',
          explanation: 'Leader announced: "今日は 鈴木さんの 昇進祝いです。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: 招待状 (Party Invitation Card)',
      genre: 'Invitation Letter',
      passage: [
        { japanese: '【結婚お祝いパーティーの ご案内】', romaji: '[Kekkon oiwai paatii no goannai]', english: '[Wedding Celebration Party Invitation]' },
        { japanese: '日時：11月25日（土）午後6時〜 場所：レストラン・ラ・メール', romaji: 'Nichiji: Juuichigatsu nijuugonichi (do) gogo rokuji~ Basho: Resutoran Ra Meeru', english: 'Date & Time: Saturday, November 25, 6:00 PM~ Location: Restaurant La Mer' },
        { japanese: '会費：5,000円 出欠は 11月10日までに お知らせください。', romaji: 'Kaihi: gosen-en Shukketsu wa juuichigatsu tooka made ni oshirase kudasai.', english: 'Fee: 5,000 yen. Please notify attendance by November 10th.' },
      ],
      exercises: [
        {
          id: 'b-l17-r1',
          instruction: '出欠の 返事は いつまでですか。(RSVP deadline)',
          prompt: '返事の 期限：',
          type: 'choice',
          options: ['11月10日まで', '11月25日まで', '当日でよい', '11月1日'],
          correctAnswer: '11月10日まで',
          explanation: 'Invitation states: "出欠は 11月10日までに お知らせください。"',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: お祝いの メッセージカード (Congratulatory Message Card)',
      promptInstruction: '友だちや 同僚への お祝いの メッセージカードを かきましょう。',
      scaffoldQuestions: ['1. 何の お祝いですか。', '2. どんな お祝いの 言葉や 願いを 伝えますか。'],
      modelEssay: {
        japanese: '田中さん、ご結婚 おめでとうございます！いつも 明るくて 優しい 田中さんの 幸せを 心から 祈っています。お二人で 笑顔あふれる 素敵な 家庭を 築いてください。末永く お幸せに！',
        romaji: 'Tanaka-san, gokekkon omedetou gozaimasu! Itsumo akarukute yasashii Tanaka-san no shiawase o kokoro kara inotte imasu. Ofutari de egao afureru suteki na katei o kizuite kudasai. Suenagaku oshiawase ni!',
        english: 'Tanaka-san, congratulations on your marriage! I pray from the bottom of my heart for the happiness of kind and cheerful Tanaka-san. May the two of you build a wonderful home full of smiles. Wishing you everlasting happiness!',
      },
      sampleAnswer: '[なまえ] さん、[おいわい] おめでとうございます！これからも [ねがい] を いのっています。',
    },
  },

  // ==========================================
  // LESSON 18: これをどうぞ
  // ==========================================
  {
    lessonNumber: 18,
    topicNumber: 9,
    topicTitle: 'トピック9 お祝い',
    title: 'だい18か これを どうぞ',
    romajiTitle: 'Dai 18-ka: Kore o douzo',
    englishTitle: 'Lesson 18: Please Accept This',
    vocabulary: {
      title: 'もじとことば (Giving & Receiving Gifts)',
      keyWords: [
        { word: 'プレゼント', kana: 'プレゼント', romaji: 'purezento', meaning: 'Present / Gift', category: 'Gifts' },
        { word: '花束 (はなたば)', kana: 'はなたば', romaji: 'hanataba', meaning: 'Bouquet of flowers', category: 'Gifts' },
        { word: 'お菓子 (おかし)', kana: 'おかし', romaji: 'okashi', meaning: 'Sweets / Confectionery', category: 'Gifts' },
        { word: 'あげます', kana: 'あげます', romaji: 'agemasu', meaning: 'To give', category: 'Verbs' },
        { word: 'もらいます', kana: 'もらいます', romaji: 'moraimasu', meaning: 'To receive', category: 'Verbs' },
        { word: '大切に します', kana: 'たいせつに します', romaji: 'taisetsu ni shimasu', meaning: 'To treasure / cherish', category: 'Phrases' },
      ],
      exercises: [
        {
          id: 'b-l18-v1',
          instruction: 'プレゼントを 渡すときの 表現を えらびましょう。(Giving gift phrase)',
          prompt: 'プレゼントを さしだすとき ➔ (　　)',
          type: 'choice',
          options: ['これ、どうぞ。ほんの気持ちです。', 'これ、買ってください。', 'これを 食べてはいけません。', 'さようなら。'],
          correctAnswer: 'これ、どうぞ。ほんの気持ちです。',
          explanation: 'Standard polite gifting phrase is "これ、どうぞ。ほんの気持ちです。" (Please accept this small token).',
        },
      ],
    },
    grammar: {
      rules: [
        {
          pattern: '〜を どうぞ / [人] に [物] を あげます・もらいます',
          meaning: 'Giving and receiving gifts politely',
          explanation: 'Core gifting mechanics and showing gratitude.',
          examples: [
            { japanese: 'これ、お祝いです。どうぞ。', romaji: 'Kore, oiwai desu. Douzo.', english: 'This is a celebration gift. Please take it.' },
            { japanese: '友だちに すてきな 時計を もらいました。', romaji: 'Tomodachi ni suteki na tokei o moraimashita.', english: 'I received a wonderful watch from a friend.' },
          ],
        },
      ],
      exercises: [
        {
          id: 'b-l18-g1',
          instruction: 'ただしい 助詞を えらびましょう。(Giver marker with moraimasu)',
          prompt: '先生 ( a に　b を ) 本を もらいました。',
          type: 'choice',
          options: ['に', 'を'],
          correctAnswer: 'に',
          explanation: 'The giver from whom you receive something takes に with もらいます.',
        },
      ],
    },
    listening: {
      trackTitle: 'Audio 171-174: プレゼントの 受け渡し',
      situation: 'Handing a gift to a host family before departing.',
      dialogueScript: [
        { speaker: '留学生', japanese: 'お母さん、今まで 本当に お世話になりました。これ、私の 国の お茶です。どうぞ。', romaji: 'Okaasan, ima made hontou ni osewa ni narimashita. Kore, watashi no kuni no ocha desu. Douzo.', english: 'Mother, thank you so much for taking such good care of me until now. This is tea from my home country. Please accept it.' },
        { speaker: 'ホストマザー', japanese: 'まあ、ありがとう！わざわざ 気を 使わせて ごめんなさいね。大切に いただくわ。', romaji: 'Maa, arigatou! Wazawaza ki o tsukawasete gomen nasai ne. Taisetsu ni itadaku wa.', english: 'Oh my, thank you! I\'m so touched you went out of your way. I will savor it gratefully.' },
      ],
      exercises: [
        {
          id: 'b-l18-l1',
          instruction: '留学生は 何を プレゼントしましたか。(What was the gift?)',
          prompt: '贈り物の 品物：',
          type: 'choice',
          options: ['自分の 国の お茶', '時計', '花束', '日本の チョコレート'],
          correctAnswer: '自分の 国の お茶',
          explanation: 'Student said: "これ、私の 国の お茶です。どうぞ。"',
        },
      ],
    },
    reading: {
      textTitle: 'どっかい: お礼の 手紙 (Thank You Letter for Gift)',
      genre: 'Formal Letter',
      passage: [
        { japanese: '拝啓　先日は 素敵な お誕生日プレゼントを いただき、心より 感謝申し上げます。', romaji: 'Haikei: Senjitsu wa suteki na otanjoubi purezento o itadaki, kokoro yori kansha moushiagemasu.', english: 'Dear: Thank you from the bottom of my heart for the wonderful birthday present the other day.' },
        { japanese: 'いただいた ペンは とても 書きやすく、毎日 仕事で 大切に 使わせて いただいております。', romaji: 'Itadaita pen wa totemo kakiyasuku, mainichi shigoto de taisetsu ni tsukawasete itadaite orimasu.', english: 'The pen you gave is very smooth to write with, and I cherish using it daily at work.' },
        { japanese: '寒さ厳しき折、どうぞ ご自愛ください。　敬具', romaji: 'Samusa kibishiki ori, douzo gojiai kudasai. Keigu', english: 'In this severe cold weather, please take good care of yourself. Sincerely,' },
      ],
      exercises: [
        {
          id: 'b-l18-r1',
          instruction: 'プレゼントは何でしたか。(What was the gift received?)',
          prompt: 'もらった もの：',
          type: 'choice',
          options: ['ペン (Pen)', '本 (Book)', 'お菓子 (Sweets)', 'カップ (Cup)'],
          correctAnswer: 'ペン (Pen)',
          explanation: 'Letter states: "いただいた ペンは とても 書きやすく..."',
        },
      ],
    },
    writing: {
      theme: 'さくぶん: お礼と 感謝の メモ (Gift Thank-You Note)',
      promptInstruction: 'プレゼントを くれた 人に、感謝の 気持ちを 伝える メモを かきましょう。',
      scaffoldQuestions: ['1. 何を もらいましたか。', '2. そのプレゼントを どう使っていますか、どう思いましたか。'],
      modelEssay: {
        japanese: 'マリアさん、昨日は 素敵な 写真立てを ありがとうございました。さっそく 部屋に 飾りました。みんなで 撮った 写真を 入れて、毎日 ながめて います。大切に しますね。本当に ありがとう！',
        romaji: 'Maria-san, kinou wa suteki na shashintate o arigatou gozaimashita. Sassoku heya ni kazarimashita. Minna de totta shashin o irete, mainichi nagamete imasu. Taisetsu ni shimasu ne. Hontou ni arigatou!',
        english: 'Maria-san, thank you so much for the wonderful photo frame yesterday! I immediately displayed it in my room. I placed the picture we all took inside and look at it every day. I will treasure it. Thank you so much!',
      },
      sampleAnswer: '[なまえ] さん、すてきな [プレゼント] を ありがとうございました。たいせつに つかいます。',
    },
  },
];
