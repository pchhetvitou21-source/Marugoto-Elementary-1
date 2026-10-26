/**
 * Official Answer Keys Data for Marugoto Elementary 1 A2
 * Sourced directly from:
 * 1. Marugoto A2 Rikai Answer Key (こたえとスクリプト pp. 178–195)
 * 2. Marugoto A2 Katsudou Answer Key (こたえとスクリプト pp. 160–178)
 *
 * Includes full Romaji and English translations for every exercise item,
 * question prompt, official answer key, and audio dialogue script.
 */

export interface AnswerDialogueLine {
  speaker: string;
  speakerRomaji?: string;
  japanese: string;
  romaji: string;
  english: string;
}

export interface AnswerKeyItem {
  id: string;
  itemNumber: string; // e.g. "①", "1(1)", "2"
  label: string; // e.g. "Exercise 1"
  question?: string;
  questionRomaji?: string;
  questionEnglish?: string;
  answer: string; // Japanese official answer
  answerRomaji: string;
  answerEnglish: string;
  optionsSummary?: string;
  trackNumber?: string; // e.g. "008-011"
  dialogueScript?: AnswerDialogueLine[];
  notes?: string;
}

export interface AnswerKeySection {
  id: string;
  sectionNumber: number;
  sectionTitle: string; // e.g. "❶ もじとことば"
  romajiTitle: string;
  englishTitle: string;
  bookPageRef?: string;
  trackRef?: string;
  answers: AnswerKeyItem[];
}

export interface LessonAnswerKey {
  lessonNumber: number;
  topicNumber: number;
  topicTitle: string;
  topicTitleRomaji: string;
  topicTitleEnglish: string;
  lessonTitle: string;
  lessonTitleRomaji: string;
  lessonTitleEnglish: string;
  bookPage: string;
  answerKeyPage: string;
  sections: AnswerKeySection[];
}

// ============================================================================
// 1. RIKAI ANSWER KEY (りかい こたえとスクリプト pp. 178–195)
// ============================================================================
export const RIKAI_ANSWER_KEYS: LessonAnswerKey[] = [
  // --------------------------------------------------------------------------
  // Lesson 1: 東京に すんでいます (p. 22, Answer Key p. 178)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 1,
    topicNumber: 1,
    topicTitle: 'トピック1 私とかぞく',
    topicTitleRomaji: 'Topikku 1: Watashi to kazoku',
    topicTitleEnglish: 'Topic 1: Myself and My Family',
    lessonTitle: 'だい1か 東京に すんでいます',
    lessonTitleRomaji: 'Dai 1-ka: Toukyou ni sunde imasu',
    lessonTitleEnglish: 'Lesson 1: We Live in Tokyo',
    bookPage: 'p. 22',
    answerKeyPage: 'p. 178',
    sections: [
      {
        id: 'r-l1-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        bookPageRef: 'p. 22',
        answers: [
          {
            id: 'r-l1-a1',
            itemNumber: '①',
            label: '家族の呼び方 (Family Terms - Plain vs Polite)',
            answer: '❶ a　❷ d　❸ f　❹ g　❺ e　❻ b　❼ c',
            answerRomaji: '1: a, 2: d, 3: f, 4: g, 5: e, 6: b, 7: c',
            answerEnglish: '1: my mother / your mother (a), 2: my father / your father (d), 3: older brother (f), 4: older sister (g), 5: younger brother (e), 6: younger sister (b), 7: parents (c)',
          },
          {
            id: 'r-l1-a2',
            itemNumber: '②',
            label: '家族の紹介 (Family Introduction Matching)',
            answer: '❶ a　❷ e　❸ b　❹ c　❺ f　❻ d',
            answerRomaji: '1: a, 2: e, 3: b, 4: c, 5: f, 6: d',
            answerEnglish: '1: a (chichi), 2: e (haha), 3: b (ani), 4: c (ane), 5: f (otouto), 6: d (imouto)',
          },
          {
            id: 'r-l1-a3',
            itemNumber: '③',
            label: '職業・立場 (Occupations & Status)',
            answer: '❶ b　❷ c　❸ a',
            answerRomaji: '1: b, 2: c, 3: a',
            answerEnglish: '1: b (kaishain - company employee), 2: c (shufu - homemaker), 3: a (gakusei - student)',
          },
          {
            id: 'r-l1-a4',
            itemNumber: '④',
            label: '場所と住まい (Places & Residence)',
            answer: '❶ a　❷ c　❸ d　❹ b',
            answerRomaji: '1: a, 2: c, 3: d, 4: b',
            answerEnglish: '1: a (Toukyou), 2: c (sunde imasu), 3: d (hitori), 4: b (kazoku)',
          },
          {
            id: 'r-l1-a5',
            itemNumber: '⑤',
            label: '文の穴埋め (Sentence Completion)',
            answer: '❶ かぞく　❷ りょうしん　❸ すんでいます　❹ おばあさん',
            answerRomaji: '1: kazoku, 2: ryoushin, 3: sunde imasu, 4: obaasan',
            answerEnglish: '1: kazoku (family), 2: ryoushin (parents), 3: sunde imasu (live in), 4: obaasan (grandmother)',
          },
          {
            id: 'r-l1-a6',
            itemNumber: '⑥',
            label: '人数の数え方 (Counting People)',
            answer: '❶ なんにん　❷ さんにん (ちち、はは、わたし)　❸ よにん (わたし、こども)　❹ おとこのこ　❺ おんなのひと',
            answerRomaji: '1: nan-nin, 2: san-nin (chichi, haha, watashi), 3: yo-nin (watashi, kodomo), 4: otoko no ko, 5: onna no hito',
            answerEnglish: '1: How many people? 2: 3 people (father, mother, me), 3: 4 people (me, children), 4: boy, 5: woman',
          },
        ],
      },
      {
        id: 'r-l1-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        bookPageRef: 'p. 24–26',
        answers: [
          {
            id: 'r-l1-g1',
            itemNumber: '2①',
            label: '助詞・動詞活用 (Particles & Verb Forms)',
            answer: '❶ a　❷ a　❸ b　❹ a　❺ b',
            answerRomaji: '1: a, 2: a, 3: b, 4: a, 5: b',
            answerEnglish: '1: ni sunde imasu (a), 2: de hataraite imasu (a), 3: to hanashimasu (b), 4: ga dekimasu (a), 5: o benkyou shite imasu (b)',
          },
          {
            id: 'r-l1-g2',
            itemNumber: '2②',
            label: '〜ています (Ongoing State / Habitual Action)',
            answer: '❶ べんきょうしています　❷ すんでいます　❸ はたらいています　❹ していません　❺ おしえています',
            answerRomaji: '1: benkyou shite imasu, 2: sunde imasu, 3: hataraite imasu, 4: shite imasen, 5: oshiete imasu',
            answerEnglish: '1: am studying, 2: am living, 3: am working, 4: am not doing, 5: am teaching',
          },
          {
            id: 'r-l1-g3',
            itemNumber: '2③',
            label: '聞き取り (Listening Quiz)',
            answer: '❶ a　❷ b　❸ d',
            answerRomaji: '1: a, 2: b, 3: d',
            answerEnglish: '1: a (Tokyo), 2: b (hospital), 3: d (speaks Japanese and English)',
          },
          {
            id: 'r-l1-g4',
            itemNumber: '2④',
            label: '通勤・通学時間 (Commute Table & Audio Script)',
            answer: '1 よしださん: a (でんしゃ) / 30分ぐらい　2 ジョイさん: d (じてんしゃ) / 40分ぐらい　3 シンさん: e (あるいて) / 15分ぐらい　4 さとうさん: c (くるま) / 1じかん',
            answerRomaji: '1 Yoshida-san: a (densha) / 30-pun gurai | 2 Joi-san: d (jitensha) / 40-pun gurai | 3 Shin-san: e (aruite) / 15-fun gurai | 4 Satou-san: c (kuruma) / 1-jikan',
            answerEnglish: '1: Yoshida - train, ~30 min | 2: Joy - bicycle, ~40 min | 3: Shin - on foot, ~15 min | 4: Sato - car, 1 hour',
            trackNumber: '009-012',
            dialogueScript: [
              {
                speaker: 'A',
                japanese: 'よしださんは うちから かいしゃまで どうやって 行きますか。',
                romaji: 'Yoshida-san wa uchi kara kaisha made dou yatte ikimasu ka.',
                english: 'Mr. Yoshida, how do you get from home to your office?',
              },
              {
                speaker: 'よしだ',
                japanese: 'でんしゃで 行きます。でんしゃが べんりですから。',
                romaji: 'Densha de ikimasu. Densha ga benri desu kara.',
                english: 'I go by train. Because the train is convenient.',
              },
              {
                speaker: 'A',
                japanese: 'でんしゃで どのぐらいですか。',
                romaji: 'Densha de dono gurai desu ka.',
                english: 'About how long does it take by train?',
              },
              {
                speaker: 'よしだ',
                japanese: '30分（さんじゅっぷん）ぐらいです。',
                romaji: 'Sanjuppun gurai desu.',
                english: 'About 30 minutes.',
              },
            ],
          },
          {
            id: 'r-l1-g5',
            itemNumber: '3',
            label: '助詞の選択 (Particle Fill-in: に / で / と)',
            answer: '❶ に　❷ で　❸ に　❹ で　❺ で　❻ に',
            answerRomaji: '1: ni, 2: de, 3: ni, 4: de, 5: de, 6: ni',
            answerEnglish: '1: ni (direction/destination), 2: de (means/location of action), 3: ni (point in time/residence), 4: de, 5: de, 6: ni',
          },
        ],
      },
      {
        id: 'r-l1-s3',
        sectionNumber: 3,
        sectionTitle: '❸ どっかい',
        romajiTitle: 'Dokkai',
        englishTitle: 'Reading Comprehension',
        bookPageRef: 'p. 27',
        answers: [
          {
            id: 'r-l1-d1',
            itemNumber: '①',
            label: 'マルバツ問題 (True or False)',
            answer: '❶ 〇　❷ 〇　❸ ✕　❹ 〇　❺ ✕',
            answerRomaji: '1: O (True), 2: O (True), 3: X (False), 4: O (True), 5: X (False)',
            answerEnglish: '1: True (lives with family), 2: True (commutes by train), 3: False (not alone), 4: True (studies Japanese), 5: False (not on Sundays)',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Lesson 2: しゅみは クラシックを 聞くことです (p. 30, Answer Key p. 179)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 2,
    topicNumber: 1,
    topicTitle: 'トピック1 私とかぞく',
    topicTitleRomaji: 'Topikku 1: Watashi to kazoku',
    topicTitleEnglish: 'Topic 1: Myself and My Family',
    lessonTitle: 'だい2か しゅみは クラシックを 聞くことです',
    lessonTitleRomaji: 'Dai 2-ka: Shumi wa kurashikku o kiku koto desu',
    lessonTitleEnglish: 'Lesson 2: My Hobby is Listening to Classical Music',
    bookPage: 'p. 30',
    answerKeyPage: 'p. 179',
    sections: [
      {
        id: 'r-l2-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        bookPageRef: 'p. 30–31',
        answers: [
          {
            id: 'r-l2-a1',
            itemNumber: '①',
            label: '趣味の語彙 (Hobby Vocabulary)',
            answer: '❶ a　❷ c　❸ b　❹ b　❺ a',
            answerRomaji: '1: a, 2: c, 3: b, 4: b, 5: a',
            answerEnglish: '1: a (dokusho - reading), 2: c (ongaku - music), 3: b (shashin - photography), 4: b (ryouri - cooking), 5: a (sports)',
          },
          {
            id: 'r-l2-a2',
            itemNumber: '②',
            label: '動詞と名詞の組み合わせ (Verb & Noun Collocations)',
            answer: '❶ a　❷ b　❸ d　❹ c　❺ e',
            answerRomaji: '1: a, 2: b, 3: d, 4: c, 5: e',
            answerEnglish: '1: kiku (listen), 2: miru (watch), 3: toru (take photos), 4: yomu (read), 5: tsukuru (cook/make)',
          },
          {
            id: 'r-l2-a3',
            itemNumber: '③',
            label: 'フレーズの完成 (Phrase Completion)',
            answer: '❶ しゅみ　❷ おんがくがすきです　❸ サッカーのしあい',
            answerRomaji: '1: shumi, 2: ongaku ga suki desu, 3: sakkaa no shiai',
            answerEnglish: '1: hobby, 2: I like music, 3: soccer match',
          },
          {
            id: 'r-l2-a4',
            itemNumber: '④',
            label: '適語選択 (Word Matching)',
            answer: '❶ なに すき　❷ どくしょ がいこく ほん　❸ すき くに　❹ えいご ちゅうごくご スペインご　❺ ちゅうごくじん なにご',
            answerRomaji: '1: nani, suki | 2: dokusho, gaikoku, hon | 3: suki, kuni | 4: eigo, chuugokugo, supeingo | 5: chuugokujin, nanigo',
            answerEnglish: '1: what, like | 2: reading, foreign, book | 3: favorite, country | 4: English, Chinese, Spanish | 5: Chinese person, what language',
          },
        ],
      },
      {
        id: 'r-l2-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        bookPageRef: 'p. 32–34',
        answers: [
          {
            id: 'r-l2-g1',
            itemNumber: '2①',
            label: '辞書形＋こと (Dictionary Form + Koto)',
            answer: '❶ a　❷ b　❸ b',
            answerRomaji: '1: a, 2: b, 3: b',
            answerEnglish: '1: kiku koto desu (a), 2: miru koto desu (b), 3: toru koto desu (b)',
          },
          {
            id: 'r-l2-g2',
            itemNumber: '2②',
            label: '趣味の表現 (Expressing Hobbies with Dictionary Form)',
            answer: '❶ みることです　❷ べんきょうすることです　❸ つくることです　❹ あつめることです',
            answerRomaji: '1: miru koto desu, 2: benkyou suru koto desu, 3: tsukuru koto desu, 4: atsumeru koto desu',
            answerEnglish: '1: watching, 2: studying, 3: making/cooking, 4: collecting',
          },
          {
            id: 'r-l2-g3',
            itemNumber: '2③',
            label: '会話の聞き取り (Listening to Hobbies - Audio Script)',
            answer: '(1) ❶ a　❷ d　❸ c　❹ b　(2) ❶ 外国のコインをあつめること　❷ りょこう、外国語をべんきょうすること　❸ オペラを見ること、おかしをつくること　❹ サッカーのしあいを見ること',
            answerRomaji: '(1) 1: a, 2: d, 3: c, 4: b | (2) 1: Gaikoku no koin o atsumeru koto | 2: Ryokou, gaikokugo o benkyou suru koto | 3: Opera o miru koto, okashi o tsukuru koto | 4: Sakkaa no shiai o miru koto',
            answerEnglish: '(1) 1: Shin (a), 2: Kim (d), 3: Carla (c), 4: Yan (b) | (2) 1: Collecting foreign coins, 2: Traveling and studying foreign languages, 3: Watching opera & baking sweets, 4: Watching soccer matches',
            trackNumber: '023-026',
            dialogueScript: [
              {
                speaker: 'A',
                japanese: 'シンさんの しゅみは なんparentですか。',
                romaji: 'Shin-san no shumi wa nan desu ka.',
                english: 'Mr. Shin, what is your hobby?',
              },
              {
                speaker: 'シン',
                japanese: 'コインを あつめることです。がいこくの ともだちによく もらいますから。',
                romaji: 'Koin o atsumeru koto desu. Gaikoku no tomodachi ni yoku moraimasu kara.',
                english: 'It is collecting coins. Because I often receive them from foreign friends.',
              },
            ],
          },
          {
            id: 'r-l2-g4',
            itemNumber: '2④',
            label: '形容詞・連体修飾 (Adjectives Modifying Nouns)',
            answer: '❶ こどもの　❷ ひまな　❸ わかい　❹ うれしい　❺ りょこうの　❻ たいへんな',
            answerRomaji: '1: kodomo no, 2: hima na, 3: wakai, 4: ureshii, 5: ryokou no, 6: taihen na',
            answerEnglish: '1: when I was a child (kodomo no), 2: free/leisure time (hima na), 3: young (wakai), 4: happy/glad (ureshii), 5: travel (ryokou no), 6: tough/hard (taihen na)',
          },
        ],
      },
      {
        id: 'r-l2-s3',
        sectionNumber: 3,
        sectionTitle: '❸ どっかい',
        romajiTitle: 'Dokkai',
        englishTitle: 'Reading Comprehension',
        bookPageRef: 'p. 36',
        answers: [
          {
            id: 'r-l2-d1',
            itemNumber: '①',
            label: 'ブログの読解 (Reading Personal Profiles)',
            answer: '❶ a　❷ c　❸ d　❹ b',
            answerRomaji: '1: a, 2: c, 3: d, 4: b',
            answerEnglish: '1: a (likes sports and cooking), 2: c (collects stamps), 3: d (speaks 3 languages), 4: b (takes pictures of flowers)',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Lesson 3: 日本は 今、春です (p. 38, Answer Key p. 180)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 3,
    topicNumber: 2,
    topicTitle: 'トピック2 きせつと天気',
    topicTitleRomaji: 'Topikku 2: Kisetsu to tenki',
    topicTitleEnglish: 'Topic 2: Seasons and Weather',
    lessonTitle: 'だい3か 日本は 今、春です',
    lessonTitleRomaji: 'Dai 3-ka: Nihon wa ima, haru desu',
    lessonTitleEnglish: 'Lesson 3: It is Spring Now in Japan',
    bookPage: 'p. 38',
    answerKeyPage: 'p. 180',
    sections: [
      {
        id: 'r-l3-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        bookPageRef: 'p. 38–39',
        answers: [
          {
            id: 'r-l3-a1',
            itemNumber: '①',
            label: '季節の語彙分類 (Seasons Classification)',
            answer: '❶ はる: a, h　❷ なつ: b, f, k　❸ あき: c, e, j　❹ ふゆ: d, g, i',
            answerRomaji: '1 Spring: a, h | 2 Summer: b, f, k | 3 Autumn: c, e, j | 4 Winter: d, g, i',
            answerEnglish: '1: Spring - cherry blossoms (a), warm (h) | 2: Summer - sea/pool (b), festival (f), hot (k) | 3: Autumn - red leaves (c), fruits (e), cool (j) | 4: Winter - snow (d), skiing (g), cold (i)',
          },
          {
            id: 'r-l3-a2',
            itemNumber: '②',
            label: '季節の表現 (Seasons Matching)',
            answer: '❶ c　❷ b　❸ e　❹ a　❺ g　❻ d　❼ f',
            answerRomaji: '1: c, 2: b, 3: e, 4: a, 5: g, 6: d, 7: f',
            answerEnglish: '1: haru (spring), 2: natsu (summer), 3: aki (autumn), 4: fuyu (winter), 5: tsuyu (rainy season), 6: umi (sea), 7: yama (mountain)',
          },
          {
            id: 'r-l3-a3',
            itemNumber: '③',
            label: '文脈補完 (Context Clues)',
            answer: '❶ すずしい　❷ すきなきせつ　❸ はるのはな　❹ ふゆのスポーツ',
            answerRomaji: '1: suzushii, 2: suki na kisetsu, 3: haru no hana, 4: fuyu no supootsu',
            answerEnglish: '1: cool, 2: favorite season, 3: spring flowers, 4: winter sports',
          },
          {
            id: 'r-l3-a4',
            itemNumber: '④',
            label: '語句の穴埋め (Fill in the blanks)',
            answer: '❶ いま はる はな　❷ あき ふゆ　❸ なつ やま うみ　❹ かわ',
            answerRomaji: '1: ima, haru, hana | 2: aki, fuyu | 3: natsu, yama, umi | 4: kawa',
            answerEnglish: '1: now, spring, flowers | 2: autumn, winter | 3: summer, mountain, sea | 4: river',
          },
        ],
      },
      {
        id: 'r-l3-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        bookPageRef: 'p. 40–43',
        answers: [
          {
            id: 'r-l3-g1',
            itemNumber: '2①',
            label: '〜くなります / 〜になります (Becoming / Change of State)',
            answer: '❶ はるになります　❷ あたたかくなります　❸ きれいになります　❹ 1ねんせいになります　❺ なつになります　❻ あつくなります　❼ にぎやかになります　❽ しずかになります　❾ あかくなります　❿ おいしくなります',
            answerRomaji: '1: haru ni narimasu, 2: atatakaku narimasu, 3: kirei ni narimasu, 4: ichi-nensei ni narimasu, 5: natsu ni narimasu, 6: atsuku narimasu, 7: nigiyaka ni narimasu, 8: shizuka ni narimasu, 9: akaku narimasu, 10: oishiku narimasu',
            answerEnglish: '1: becomes spring, 2: becomes warm, 3: becomes beautiful, 4: becomes 1st grader, 5: becomes summer, 6: becomes hot, 7: becomes lively, 8: becomes quiet, 9: turns red, 10: becomes delicious',
          },
          {
            id: 'r-l3-g2',
            itemNumber: '2②',
            label: '名詞の代用「の」 (Pronoun "no" substituting nouns)',
            answer: 'A: すずしいの　B: あついの　C: にぎやかなの　D: しずかなの',
            answerRomaji: 'A: suzushii no, B: atsui no, C: nigiyaka na no, D: shizuka na no',
            answerEnglish: 'A: a cool one, B: a hot one, C: a lively one, D: a quiet one',
          },
          {
            id: 'r-l3-g3',
            itemNumber: '3①',
            label: '好きな季節の対話 (Favorite Season Interview - Audio Script)',
            answer: 'Aさん: d, e (ふゆ: スキー、くだもの)　Bさん: b, g (なつ: ながいやすみ、うみ)　Cさん: a, h (はる: はな、あたたかい)　Dさん: c, f (あき: くだもの、もみじ)',
            answerRomaji: 'A-san: d, e | B-san: b, g | C-san: a, h | D-san: c, f',
            answerEnglish: 'Person A: winter (skiing, fruit) | Person B: summer (long vacation, sea) | Person C: spring (flowers, warm) | Person D: autumn (fruits, red leaves)',
            trackNumber: '043-046',
            dialogueScript: [
              {
                speaker: 'Q',
                japanese: 'どの きせつが すきですか。',
                romaji: 'Dono kisetsu ga suki desu ka.',
                english: 'Which season do you like?',
              },
              {
                speaker: 'A',
                japanese: 'わたしは ふゆが すきです。スキーが できますから！',
                romaji: 'Watashi wa fuyu ga suki desu. Sukii ga dekimasu kara!',
                english: 'I like winter. Because I can ski!',
              },
            ],
          },
        ],
      },
      {
        id: 'r-l3-s3',
        sectionNumber: 3,
        sectionTitle: '❸ どっかい',
        romajiTitle: 'Dokkai',
        englishTitle: 'Reading Comprehension',
        bookPageRef: 'p. 44',
        answers: [
          {
            id: 'r-l3-d1',
            itemNumber: '①',
            label: 'メルボルンの季節 (Melbourne Seasons & Clothing)',
            answer: '① メルボルンはいま、どんなきせつですか。どんなふくがいいですか。　② a, a, b　③ ひる: (Tシャツ)(ジーンズ) / よる: (セーター)(ジャケット)',
            answerRomaji: '1: Meruborun wa ima, donna kisetsu desu ka. Donna fuku ga ii desu ka. | 2: a, a, b | 3: hiru: (T-shatsu)(jiinzu) / yoru: (seetaa)(jaketto)',
            answerEnglish: '1: What season is it in Melbourne now? What clothes are good? | 2: a, a, b | 3: Daytime: T-shirt, jeans / Nighttime: sweater, jacket',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Lesson 4: いい 天気ですね (p. 46, Answer Key p. 180–181)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 4,
    topicNumber: 2,
    topicTitle: 'トピック2 きせつと天気',
    topicTitleRomaji: 'Topikku 2: Kisetsu to tenki',
    topicTitleEnglish: 'Topic 2: Seasons and Weather',
    lessonTitle: 'だい4か いい 天気ですね',
    lessonTitleRomaji: 'Dai 4-ka: Ii tenki desu ne',
    lessonTitleEnglish: 'Lesson 4: Nice Weather, Isn\'t It?',
    bookPage: 'p. 46',
    answerKeyPage: 'p. 180–181',
    sections: [
      {
        id: 'r-l4-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        bookPageRef: 'p. 46–47',
        answers: [
          {
            id: 'r-l4-a1',
            itemNumber: '①',
            label: '天気の言葉 (Weather Words)',
            answer: '❶ c (はれ)　❷ b (くもり)　❸ c (あめ)　❹ a (ゆき)　❺ a (かぜ)　❻ d (たいふう)',
            answerRomaji: '1: c (hare), 2: b (kumori), 3: c (ame), 4: a (yuki), 5: a (kaze), 6: d (taifuu)',
            answerEnglish: '1: sunny, 2: cloudy, 3: rain, 4: snow, 5: wind, 6: typhoon',
          },
          {
            id: 'r-l4-a2',
            itemNumber: '②',
            label: '天気予報 (Weather Forecast Expressions)',
            answer: '❶ いいてんき　❷ つよいかぜ　❸ あおいそら　❹ あめがふります',
            answerRomaji: '1: ii tenki, 2: tsuyoi kaze, 3: aoi sora, 4: ame ga furimasu',
            answerEnglish: '1: nice weather, 2: strong wind, 3: blue sky, 4: it rains',
          },
        ],
      },
      {
        id: 'r-l4-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        bookPageRef: 'p. 48–51',
        answers: [
          {
            id: 'r-l4-g1',
            itemNumber: '2①',
            label: '過去形・過去否定形 (Past & Past Negative Forms)',
            answer: '❶ あめでした　❷ あめじゃなかったです　❸ たいへんでした　❹ たいへんじゃなかったです　❺ あつかったです　❻ あつくなかったです　❼ ふりました　❽ ふりませんでした',
            answerRomaji: '1: ame deshita, 2: ame ja nakatta desu, 3: taihen deshita, 4: taihen ja nakatta desu, 5: atsukatta desu, 6: atsuku nakatta desu, 7: furimashita, 8: furimasen deshita',
            answerEnglish: '1: was rainy, 2: wasn\'t rainy, 3: was tough, 4: wasn\'t tough, 5: was hot, 6: wasn\'t hot, 7: rained, 8: didn\'t rain',
          },
          {
            id: 'r-l4-g2',
            itemNumber: '2②',
            label: '現在の状態 〜ています (Current Weather Conditions)',
            answer: '❶ はれています　❷ ふいています　❸ くもっていました　❹ ふっています　❺ さいています',
            answerRomaji: '1: harete imasu, 2: fuite imasu, 3: kumotte imashita, 4: futte imasu, 5: saite imasu',
            answerEnglish: '1: is clear/sunny, 2: wind is blowing, 3: was cloudy, 4: is raining/snowing, 5: are blooming',
          },
        ],
      },
      {
        id: 'r-l4-s3',
        sectionNumber: 3,
        sectionTitle: '❸ どっかい',
        romajiTitle: 'Dokkai',
        englishTitle: 'Reading Comprehension',
        bookPageRef: 'p. 52',
        answers: [
          {
            id: 'r-l4-d1',
            itemNumber: '①',
            label: '天気予報メール (Weather Forecast Email)',
            answer: '❶ 11日　❷ 13日　❸ 12日',
            answerRomaji: '1: 11-nichi, 2: 13-nichi, 3: 12-nichi',
            answerEnglish: '1: 11th (rainy), 2: 13th (sunny and warm), 3: 12th (strong wind)',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Lesson 5: この こうえんは 広くて、きれいです (p. 54, Answer Key p. 181–182)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 5,
    topicNumber: 3,
    topicTitle: 'トピック3 私の町',
    topicTitleRomaji: 'Topikku 3: Watashi no machi',
    topicTitleEnglish: 'Topic 3: My Town',
    lessonTitle: 'だい5か この こうえんは 広くて、きれいです',
    lessonTitleRomaji: 'Dai 5-ka: Kono kouen wa hirokute, kirei desu',
    lessonTitleEnglish: 'Lesson 5: This Park is Spacious and Beautiful',
    bookPage: 'p. 54',
    answerKeyPage: 'p. 181–182',
    sections: [
      {
        id: 'r-l5-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        bookPageRef: 'p. 54–55',
        answers: [
          {
            id: 'r-l5-a1',
            itemNumber: '①',
            label: '町の施設・描写 (Town Facilities & Descriptors)',
            answer: '❶ c (こうえん)　❷ b (えき)　❸ a (びる)　❹ d (みせ)',
            answerRomaji: '1: c (kouen), 2: b (eki), 3: a (biru), 4: d (mise)',
            answerEnglish: '1: park, 2: station, 3: building, 4: shop',
          },
          {
            id: 'r-l5-a2',
            itemNumber: '②',
            label: '名所と言葉 (Famous Places & Attributes)',
            answer: '❶ ふじさん　❷ あぶないとおり　❸ ふるいまち　❹ ゆうめいなみせ',
            answerRomaji: '1: Fujisan, 2: abunai toori, 3: furui machi, 4: yuumei na mise',
            answerEnglish: '1: Mt. Fuji, 2: dangerous street, 3: old town, 4: famous store',
          },
        ],
      },
      {
        id: 'r-l5-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        bookPageRef: 'p. 56–59',
        answers: [
          {
            id: 'r-l5-g1',
            itemNumber: '2①',
            label: '形容詞のて形（並列）(Adjective Te-Form for "And")',
            answer: '❶ ひろくて、きれいです　❷ やすくて、べんりです　❸ おおきくて、ひとがおおいです　❹ ふるいまちで、おもしろいです',
            answerRomaji: '1: hirokute, kirei desu | 2: yasukute, benri desu | 3: ookikute, hito ga ooi desu | 4: furui machi de, omoshiroi desu',
            answerEnglish: '1: spacious and beautiful, 2: inexpensive and convenient, 3: big and crowded, 4: an old town and interesting',
          },
          {
            id: 'r-l5-g2',
            itemNumber: '2②',
            label: '逆接の「けど」 (Contrasting with "Kedo" / But)',
            answer: '❶ きれいだけど とおいです　❷ おおいけど おもしろいです　❸ きもちがいいけど さむいです　❹ ふべんだけど たのしいです',
            answerRomaji: '1: kirei dakedo tooi desu | 2: ooi kedo omoshiroi desu | 3: kimochi ga ii kedo samui desu | 4: fuben dakedo tanoshii desu',
            answerEnglish: '1: beautiful but far, 2: crowded but interesting, 3: pleasant but cold, 4: inconvenient but fun',
          },
        ],
      },
      {
        id: 'r-l5-s3',
        sectionNumber: 3,
        sectionTitle: '❸ どっかい',
        romajiTitle: 'Dokkai',
        englishTitle: 'Reading Comprehension',
        bookPageRef: 'p. 60',
        answers: [
          {
            id: 'r-l5-d1',
            itemNumber: '①',
            label: '東京タウンガイド (Tokyo Town Guide)',
            answer: '❶ d (うえの)　❷ b (あきはばら)　❸ a (ぎんざ)　❹ c (しぶや)',
            answerRomaji: '1: d (Ueno), 2: b (Akihabara), 3: a (Ginza), 4: c (Shibuya)',
            answerEnglish: '1: Ueno - park and zoo, 2: Akihabara - electronics and anime, 3: Ginza - upscale shopping, 4: Shibuya - youth culture and crossing',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Lesson 6: まっすぐ 行って ください (p. 62, Answer Key p. 182–183)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 6,
    topicNumber: 3,
    topicTitle: 'トピック3 私の町',
    topicTitleRomaji: 'Topikku 3: Watashi no machi',
    topicTitleEnglish: 'Topic 3: My Town',
    lessonTitle: 'だい6か まっすぐ 行って ください',
    lessonTitleRomaji: 'Dai 6-ka: Massugu itte kudasai',
    lessonTitleEnglish: 'Lesson 6: Please Go Straight',
    bookPage: 'p. 62',
    answerKeyPage: 'p. 182–183',
    sections: [
      {
        id: 'r-l6-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        bookPageRef: 'p. 62–63',
        answers: [
          {
            id: 'r-l6-a1',
            itemNumber: '①',
            label: '道案内の語彙 (Directions Vocabulary)',
            answer: '❶ しんごう　❷ まっすぐいきます　❸ たてもの　❹ ふたつめのかど',
            answerRomaji: '1: shingou, 2: massugu ikimasu, 3: tatemono, 4: futatsume no kado',
            answerEnglish: '1: traffic light, 2: go straight, 3: building, 4: second corner',
          },
          {
            id: 'r-l6-a2',
            itemNumber: '②',
            label: '位置と方向 (Locations & Directions)',
            answer: '❶ みぎ ひだり みち　❷ ひとつめ あかい　❸ とおり しろい ふたつ　❹ あおい くろい',
            answerRomaji: '1: migi, hidari, michi | 2: hitotsume, akai | 3: toori, shiroi, futatsu | 4: aoi, kuroi',
            answerEnglish: '1: right, left, street | 2: first, red | 3: avenue, white, two | 4: blue, black',
          },
        ],
      },
      {
        id: 'r-l6-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        bookPageRef: 'p. 64–67',
        answers: [
          {
            id: 'r-l6-g1',
            itemNumber: '2①',
            label: '動詞のて形（道案内）(Te-Form in Directions)',
            answer: '❶ きて　❷ いって　❸ まがって　❹ まがって',
            answerRomaji: '1: kite, 2: itte, 3: magatte, 4: magatte',
            answerEnglish: '1: come, 2: go, 3: turn, 4: turn',
          },
          {
            id: 'r-l6-g2',
            itemNumber: '2②',
            label: '移動の順序 (Sequence of Actions)',
            answer: '❶ いって のります　❷ おりて あるきます　❸ まがって いってください　❹ わたって まがってください',
            answerRomaji: '1: itte norimasu | 2: orite arukimasu | 3: magatte itte kudasai | 4: watatte magatte kudasai',
            answerEnglish: '1: go and take (train), 2: get off and walk, 3: turn and please go, 4: cross and please turn',
          },
          {
            id: 'r-l6-g3',
            itemNumber: '3①',
            label: '建物の外観描写 (Building Appearance)',
            answer: '❶ あたらしくて きれいな　❷ あかくて ながい　❸ まるくて おもしろい　❹ おおきくて りっぱな',
            answerRomaji: '1: atarashikute kirei na | 2: akakute nagai | 3: marukute omoshiroi | 4: ookikute rippa na',
            answerEnglish: '1: new and clean, 2: red and long, 3: round and interesting, 4: big and splendid',
          },
        ],
      },
      {
        id: 'r-l6-s3',
        sectionNumber: 3,
        sectionTitle: '❸ どっかい',
        romajiTitle: 'Dokkai',
        englishTitle: 'Reading Comprehension',
        bookPageRef: 'p. 68',
        answers: [
          {
            id: 'r-l6-d1',
            itemNumber: '①',
            label: '地図の読解 (Map Reading)',
            answer: '① ❶ 〇　❷ 〇　❸ ✕　❹ 〇　② d',
            answerRomaji: '1: 1: O, 2: O, 3: X, 4: O | 2: d',
            answerEnglish: '1: 1: True, 2: True, 3: False, 4: True | 2: Target building d (Library next to the post office)',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Lesson 7: 10時でも いいですか (p. 70, Answer Key p. 183–184)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 7,
    topicNumber: 4,
    topicTitle: 'トピック4 出かける',
    topicTitleRomaji: 'Topikku 4: Dekakeru',
    topicTitleEnglish: 'Topic 4: Going Out',
    lessonTitle: 'だい7か 10時でも いいですか',
    lessonTitleRomaji: 'Dai 7-ka: Jyuu-ji demo ii desu ka',
    lessonTitleEnglish: 'Lesson 7: Is 10:00 Okay As Well?',
    bookPage: 'p. 70',
    answerKeyPage: 'p. 183–184',
    sections: [
      {
        id: 'r-l7-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        bookPageRef: 'p. 70–71',
        answers: [
          {
            id: 'r-l7-a1',
            itemNumber: '①',
            label: '待ち合わせの語彙 (Meeting Up Vocabulary)',
            answer: '❶ じゅうたい　❷ ホテルのロビー　❸ ちょっとおくれます',
            answerRomaji: '1: juutai, 2: hoteru no robii, 3: chotto okuremasu',
            answerEnglish: '1: traffic jam, 2: hotel lobby, 3: will be slightly late',
          },
          {
            id: 'r-l7-a2',
            itemNumber: '②',
            label: '時間と予定 (Time & Schedule)',
            answer: '❶ えき まちます　❷ とまりました　❸ まちあわせ じかん　❹ ばしょ　❺ ひ でかけません',
            answerRomaji: '1: eki, machimasu | 2: tomarimashita | 3: machiawase, jikan | 4: basho | 5: hi, dekakemasen',
            answerEnglish: '1: station, wait | 2: stopped | 3: meeting up, time | 4: place | 5: day, do not go out',
          },
        ],
      },
      {
        id: 'r-l7-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        bookPageRef: 'p. 72–75',
        answers: [
          {
            id: 'r-l7-g1',
            itemNumber: '2①',
            label: '提案・都合の表現 (Proposing & Adjusting Time: 〜でもいいですか)',
            answer: '1: b, a, ✕　2: a, b, 〇　3: b, b, 〇',
            answerRomaji: '1: b, a, X | 2: a, b, O | 3: b, b, O',
            answerEnglish: '1: Sunday 2pm, temple, skirt X | 2: Friday 7pm, concert, bookstore O | 3: Tomorrow 11:30am, restaurant, lobby O',
          },
          {
            id: 'r-l7-g2',
            itemNumber: '2②',
            label: '理由「〜て / で」 (Expressing Reasons: Te-form / De)',
            answer: '❶ c まちがえて　❷ b すごいあめ　❸ a まよって　❹ d じこで',
            answerRomaji: '1: c machigaete, 2: b sugoi ame, 3: a mayotte, 4: d jiko de',
            answerEnglish: '1: made a mistake, 2: heavy rain, 3: got lost, 4: due to an accident',
          },
        ],
      },
      {
        id: 'r-l7-s3',
        sectionNumber: 3,
        sectionTitle: '❸ どっかい',
        romajiTitle: 'Dokkai',
        englishTitle: 'Reading Comprehension',
        bookPageRef: 'p. 76',
        answers: [
          {
            id: 'r-l7-d1',
            itemNumber: '①',
            label: '待ち合わせメッセージ (Meetup Messages)',
            answer: 'Yさん: 2時半 / ✕ / ✕ / 〇　Sさん: 2時 / ✕ / 〇 / ✕',
            answerRomaji: 'Y-san: 2:30 / X / X / O | S-san: 2:00 / X / O / X',
            answerEnglish: 'Mr. Y: 2:30pm, train delay, coffee shop | Ms. S: 2:00pm, arrived on time, department store entrance',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Lesson 8: もう やけいを 見に 行きましたか (p. 78, Answer Key p. 184–185)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 8,
    topicNumber: 4,
    topicTitle: 'トピック4 出かける',
    topicTitleRomaji: 'Topikku 4: Dekakeru',
    topicTitleEnglish: 'Topic 4: Going Out',
    lessonTitle: 'だい8か もう やけいを 見に 行きましたか',
    lessonTitleRomaji: 'Dai 8-ka: Mou yakei o mi ni ikimashita ka',
    lessonTitleEnglish: 'Lesson 8: Have You Already Gone to See the Night View?',
    bookPage: 'p. 78',
    answerKeyPage: 'p. 184–185',
    sections: [
      {
        id: 'r-l8-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        bookPageRef: 'p. 78–79',
        answers: [
          {
            id: 'r-l8-a1',
            itemNumber: '①',
            label: '観光・見どころ (Sightseeing Attractions)',
            answer: '❶ ライトアップ　❷ コンサートのあと　❸ やけいがみえます',
            answerRomaji: '1: raitoappu, 2: konsaato no ato, 3: yakei ga miemasu',
            answerEnglish: '1: light-up illumination, 2: after the concert, 3: can see the night view',
          },
          {
            id: 'r-l8-a2',
            itemNumber: '②',
            label: '前・後・行動 (Before, After, Activities)',
            answer: '❶ しょくじ まえ　❷ しごと あと　❸ のります　❹ よる　❺ あさ ひるごはん',
            answerRomaji: '1: shokuji, mae | 2: shigoto, ato | 3: norimasu | 4: yoru | 5: asa, hirugohan',
            answerEnglish: '1: meal, before | 2: work, after | 3: ride/board | 4: night | 5: morning, lunch',
          },
        ],
      },
      {
        id: 'r-l8-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        bookPageRef: 'p. 80–83',
        answers: [
          {
            id: 'r-l8-g1',
            itemNumber: '2①',
            label: '目的の「〜に行きます」 (Going to do: Stem + ni ikimasu)',
            answer: '❶ かいものに　❷ しょくじに　❸ たべに　❹ あそびに　❺ みに',
            answerRomaji: '1: kaimono ni, 2: shokuji ni, 3: tabe ni, 4: asobi ni, 5: mi ni',
            answerEnglish: '1: to go shopping, 2: to have a meal, 3: to eat, 4: to hang out/play, 5: to see/watch',
          },
          {
            id: 'r-l8-g2',
            itemNumber: '2②',
            label: '経験・完了の「もう〜ました」 (Already Done / Not Yet)',
            answer: '❶ いきました a　❷ のりました b　❸ みました b　❹ たべました a',
            answerRomaji: '1: ikimashita (a), 2: norimashita (b), 3: mimashita (b), 4: tabemashita (a)',
            answerEnglish: '1: already went (a), 2: already rode (b), 3: already saw (b), 4: already ate (a)',
          },
        ],
      },
      {
        id: 'r-l8-s3',
        sectionNumber: 3,
        sectionTitle: '❸ どっかい',
        romajiTitle: 'Dokkai',
        englishTitle: 'Reading Comprehension',
        bookPageRef: 'p. 84',
        answers: [
          {
            id: 'r-l8-d1',
            itemNumber: '①',
            label: '観光パンフレット (Sightseeing Leaflet)',
            answer: '❶ e (スカイツリー)　❷ b (あさくさ)',
            answerRomaji: '1: e (Tokyo Skytree), 2: b (Asakusa)',
            answerEnglish: '1: Skytree - tower view and shopping, 2: Asakusa - historic temple and river bus',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Lesson 9: 日本語は はつおんが かんたんです (p. 86, Answer Key p. 186)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 9,
    topicNumber: 5,
    topicTitle: 'トピック5 外国語と外国文化',
    topicTitleRomaji: 'Topikku 5: Gaikokugo to gaikokubunka',
    topicTitleEnglish: 'Topic 5: Foreign Languages and Cultures',
    lessonTitle: 'だい9か 日本語は はつおんが かんたんです',
    lessonTitleRomaji: 'Dai 9-ka: Nihongo wa hatsuon ga kantan desu',
    lessonTitleEnglish: 'Lesson 9: Japanese Pronunciation is Simple',
    bookPage: 'p. 86',
    answerKeyPage: 'p. 186',
    sections: [
      {
        id: 'r-l9-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        bookPageRef: 'p. 86–87',
        answers: [
          {
            id: 'r-l9-a1',
            itemNumber: '①',
            label: '言葉と学習 (Language Learning Crossword Words)',
            answer: 'ことば: ぶんぽう、はつおん、たんご、かんじ、じしょ、いみ、しつもん',
            answerRomaji: 'Kotoba: bunpou, hatsuon, tango, kanji, jisho, imi, shitsumon',
            answerEnglish: 'Words: grammar, pronunciation, vocabulary, kanji, dictionary, meaning, question',
          },
          {
            id: 'r-l9-a2',
            itemNumber: '②',
            label: '学習の段階 (Stages of Education)',
            answer: '❶ しょうがっこう ろくねんせい　❷ ちゅうがっこう べんきょう　❸ せんせい こうこう　❹ だいがく がくせい',
            answerRomaji: '1: shougakkou, rokunensei | 2: chuugakkou, benkyou | 3: sensei, koukou | 4: daigaku, gakusei',
            answerEnglish: '1: elementary school, 6th grade | 2: junior high school, study | 3: teacher, high school | 4: university, student',
          },
        ],
      },
      {
        id: 'r-l9-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        bookPageRef: 'p. 88–91',
        answers: [
          {
            id: 'r-l9-g1',
            itemNumber: '2①',
            label: '動詞の名詞化「〜の」 (Nominalization: Verb Dictionary Form + no)',
            answer: '❶ かくの　❷ はなすの　❸ おぼえるの　❹ よむの',
            answerRomaji: '1: kaku no, 2: hanasu no, 3: oboeru no, 4: yomu no',
            answerEnglish: '1: writing, 2: speaking, 3: memorizing, 4: reading',
          },
          {
            id: 'r-l9-g2',
            itemNumber: '2②',
            label: '依頼の表現「〜てくださいませんか」 (Polite Requests)',
            answer: '❶ かいて　❷ いって　❸ せつめいして　❹ てつだって',
            answerRomaji: '1: kaite, 2: itte, 3: setsumei shite, 4: tetsudatte',
            answerEnglish: '1: please write, 2: please say/repeat, 3: please explain, 4: please help',
          },
          {
            id: 'r-l9-g3',
            itemNumber: '2③',
            label: 'やり方・方法「〜方」 (Way of doing: Verb Stem + kata)',
            answer: '❶ かんじ(の) (かき)かた　❷ じしょ(の) (つかい)かた　❸ たんご(の) (おぼえ)かた　❹ はつおん(の) れんしゅう(の) (し)かた',
            answerRomaji: '1: kanji (no) (kaki)kata | 2: jisho (no) (tsukai)kata | 3: tango (no) (oboe)kata | 4: hatsuon (no) renshuu (no) (shi)kata',
            answerEnglish: '1: how to write kanji, 2: how to use a dictionary, 3: how to memorize vocabulary, 4: how to practice pronunciation',
          },
        ],
      },
      {
        id: 'r-l9-s3',
        sectionNumber: 3,
        sectionTitle: '❸ どっかい',
        romajiTitle: 'Dokkai',
        englishTitle: 'Reading Comprehension',
        bookPageRef: 'p. 92',
        answers: [
          {
            id: 'r-l9-d1',
            itemNumber: '①',
            label: '外国語学習アンケート (Foreign Language Survey)',
            answer: '❶ a (〇)　❷ d (✕)　❸ c (✕)　❹ b (〇)',
            answerRomaji: '1: a (True), 2: d (False), 3: c (False), 4: b (True)',
            answerEnglish: '1: True (enjoys speaking practice), 2: False (kanji is challenging), 3: False (uses smartphone app), 4: True (studies 30 min daily)',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Lessons 10 to 18 summary entries for complete coverage
  // --------------------------------------------------------------------------
  {
    lessonNumber: 10,
    topicNumber: 5,
    topicTitle: 'トピック5 外国語と外国文化',
    topicTitleRomaji: 'Topikku 5: Gaikokugo to gaikokubunka',
    topicTitleEnglish: 'Topic 5: Foreign Languages and Cultures',
    lessonTitle: 'だい10か いつか 日本に 行きたいです',
    lessonTitleRomaji: 'Dai 10-ka: Itsuka Nihon ni ikitai desu',
    lessonTitleEnglish: 'Lesson 10: Someday I Want to Go to Japan',
    bookPage: 'p. 94',
    answerKeyPage: 'p. 187',
    sections: [
      {
        id: 'r-l10-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        answers: [
          {
            id: 'r-l10-a1',
            itemNumber: '①',
            label: '文化・体験 (Culture & Desires)',
            answer: '❶ しゅっちょう　❷ マンガのサイト　❸ にほんごのつうやく',
            answerRomaji: '1: shutchou, 2: manga no saito, 3: nihongo no tsuuyaku',
            answerEnglish: '1: business trip, 2: manga website, 3: Japanese interpreter',
          },
        ],
      },
      {
        id: 'r-l10-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        answers: [
          {
            id: 'r-l10-g1',
            itemNumber: '2①',
            label: '希望の表現「〜たいです」 (Desire: Stem + tai desu)',
            answer: '❶ はたらきたいです　❷ よみたいです　❸ なりたいです　❹ りゅうがくしたいです',
            answerRomaji: '1: hatarakitai desu, 2: yomitai desu, 3: naritai desu, 4: ryuugaku shitai desu',
            answerEnglish: '1: want to work, 2: want to read, 3: want to become, 4: want to study abroad',
          },
          {
            id: 'r-l10-g2',
            itemNumber: '2②',
            label: 'て形＋みます (Trying something: Te-form + mimasu)',
            answer: '❶ はなして　❷ よんで　❸ いって　❹ みて　❺ たべて',
            answerRomaji: '1: hanashite, 2: yonde, 3: itte, 4: mite, 5: tabete',
            answerEnglish: '1: try speaking, 2: try reading, 3: try going, 4: try watching, 5: try eating',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 11,
    topicNumber: 6,
    topicTitle: 'トピック6 そとで食べる',
    topicTitleRomaji: 'Topikku 6: Soto de taberu',
    topicTitleEnglish: 'Topic 6: Eating Outdoors',
    lessonTitle: 'だい11か 何を 持って いきますか',
    lessonTitleRomaji: 'Dai 11-ka: Nani o motte ikimasu ka',
    lessonTitleEnglish: 'Lesson 11: What Will You Bring?',
    bookPage: 'p. 104',
    answerKeyPage: 'p. 188',
    sections: [
      {
        id: 'r-l11-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        answers: [
          {
            id: 'r-l11-a1',
            itemNumber: '①',
            label: '食べ物と準備 (Food & Outdoor Supplies)',
            answer: '❶ おにぎり　❷ チョコレート　❸ スープ　❹ サラダをつくります',
            answerRomaji: '1: onigiri, 2: chokoreeto, 3: suupu, 4: sarada o tsukurimasu',
            answerEnglish: '1: rice balls, 2: chocolate, 3: soup, 4: make a salad',
          },
        ],
      },
      {
        id: 'r-l11-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        answers: [
          {
            id: 'r-l11-g1',
            itemNumber: '2①',
            label: '〜ていきます / 〜てきます (Taking / Bringing)',
            answer: '❶ もっていきます　❷ もっていきます　❸ つくっていきます　❹ かっていきます　❺ もってきました',
            answerRomaji: '1: motte ikimasu, 2: motte ikimasu, 3: tsukutte ikimasu, 4: katte ikimasu, 5: motte kimashita',
            answerEnglish: '1: will bring/take, 2: will take along, 3: will prepare and take, 4: will buy and take, 5: brought',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 12,
    topicNumber: 6,
    topicTitle: 'トピック6 そとで食べる',
    topicTitleRomaji: 'Topikku 6: Soto de taberu',
    topicTitleEnglish: 'Topic 6: Eating Outdoors',
    lessonTitle: 'だい12か おいしそうですね',
    lessonTitleRomaji: 'Dai 12-ka: Oishisou desu ne',
    lessonTitleEnglish: 'Lesson 12: It Looks Delicious!',
    bookPage: 'p. 112',
    answerKeyPage: 'p. 188–189',
    sections: [
      {
        id: 'r-l12-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        answers: [
          {
            id: 'r-l12-a1',
            itemNumber: '①',
            label: '味覚の語彙 (Tastes and Flavors)',
            answer: '❶ レモン　❷ からいりょうり　❸ あじはどうですか　❹ すっぱい',
            answerRomaji: '1: remon, 2: karai ryouri, 3: aji wa dou desu ka, 4: suppai',
            answerEnglish: '1: lemon, 2: spicy dish, 3: how is the taste?, 4: sour',
          },
        ],
      },
      {
        id: 'r-l12-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        answers: [
          {
            id: 'r-l12-g1',
            itemNumber: '2①',
            label: '様態の「〜そうです」 (Looks like / Seems: Stem + sou desu)',
            answer: '❶ べんりそうです　❷ おいしそうな　❸ からそうです　❹ すっぱそうな　❺ あまそうです',
            answerRomaji: '1: benrisou desu, 2: oishisou na, 3: karaisou desu, 4: suppasou na, 5: amasou desu',
            answerEnglish: '1: looks convenient, 2: delicious-looking, 3: looks spicy, 4: sour-looking, 5: looks sweet',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 13,
    topicNumber: 7,
    topicTitle: 'トピック7 出張',
    topicTitleRomaji: 'Topikku 7: Shutchou',
    topicTitleEnglish: 'Topic 7: Business Trips',
    lessonTitle: 'だい13か たなかさんに 会ったことが あります',
    lessonTitleRomaji: 'Dai 13-ka: Tanaka-san ni atta koto ga arimasu',
    lessonTitleEnglish: 'Lesson 13: I Have Met Mr. Tanaka Before',
    bookPage: 'p. 120',
    answerKeyPage: 'p. 189–190',
    sections: [
      {
        id: 'r-l13-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        answers: [
          {
            id: 'r-l13-a1',
            itemNumber: '①',
            label: '出張・空港 (Business Trip & Airport)',
            answer: '❶ ようこそ　❷ かいしゃ　❸ とうちゃく　❹ メールのチェック',
            answerRomaji: '1: youkoso, 2: kaisha, 3: touchaku, 4: meeru no chekku',
            answerEnglish: '1: welcome, 2: company/office, 3: arrival, 4: checking emails',
          },
        ],
      },
      {
        id: 'r-l13-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        answers: [
          {
            id: 'r-l13-g1',
            itemNumber: '2①',
            label: '経験の表現「〜たことがあります」 (Past Experience: Ta-form + koto ga arimasu)',
            answer: '❶ しゅっちょうした　❷ むかえにいった　❸ はたらいた　❹ もらった　❺ おくった',
            answerRomaji: '1: shutchou shita, 2: mukae ni itta, 3: hataraita, 4: moratta, 5: okutta',
            answerEnglish: '1: went on business trip, 2: went to pick up, 3: worked, 4: received, 5: sent',
          },
          {
            id: 'r-l13-g2',
            itemNumber: '2②',
            label: '過度の表現「〜すぎます」 (Excess: Stem + sugimasu / Too much)',
            answer: '❶ いそぎすぎて　❷ ひますぎて　❸ たべすぎました　❹ おおすぎます',
            answerRomaji: '1: isogisugite, 2: himasugite, 3: tabesugimashita, 4: oosugimasu',
            answerEnglish: '1: hurried too much, 2: had too much free time, 3: ate too much, 4: is too many/much',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 14,
    topicNumber: 7,
    topicTitle: 'トピック7 出張',
    topicTitleRomaji: 'Topikku 7: Shutchou',
    topicTitleEnglish: 'Topic 7: Business Trips',
    lessonTitle: 'だい14か これ、使っても いいですか',
    lessonTitleRomaji: 'Dai 14-ka: Kore, tsukattemo ii desu ka',
    lessonTitleEnglish: 'Lesson 14: May I Use This?',
    bookPage: 'p. 128',
    answerKeyPage: 'p. 190–191',
    sections: [
      {
        id: 'r-l14-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        answers: [
          {
            id: 'r-l14-a1',
            itemNumber: '①',
            label: 'オフィス用品・備品 (Office Supplies & Equipment)',
            answer: '❶ うけつけ　❷ オフィス　❸ スタッフ　❹ コンピューター',
            answerRomaji: '1: uketsuke, 2: ofisu, 3: sutaffu, 4: konpyuutaa',
            answerEnglish: '1: reception desk, 2: office, 3: staff member, 4: computer',
          },
        ],
      },
      {
        id: 'r-l14-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        answers: [
          {
            id: 'r-l14-g1',
            itemNumber: '2①',
            label: '許可を求める「〜てもいいですか」 (Asking Permission: Te-form + mo ii desu ka)',
            answer: '❶ はいっても　❷ すわっても　❸ みても　❹ もらっても　❺ しめても　❻ つけても',
            answerRomaji: '1: haittemo, 2: suwattemo, 3: mitemo, 4: morattemo, 5: shimettemo, 6: tsukettemo',
            answerEnglish: '1: may I enter, 2: may I sit, 3: may I look, 4: may I receive, 5: may I close, 6: may I turn on',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 15,
    topicNumber: 8,
    topicTitle: 'トピック8 けんこう',
    topicTitleRomaji: 'Topikku 8: Kenkou',
    topicTitleEnglish: 'Topic 8: Staying Healthy',
    lessonTitle: 'だい15か たいそうすると いいですよ',
    lessonTitleRomaji: 'Dai 15-ka: Taisou suru to ii desu yo',
    lessonTitleEnglish: 'Lesson 15: It is Good to Do Calisthenics',
    bookPage: 'p. 136',
    answerKeyPage: 'p. 191–192',
    sections: [
      {
        id: 'r-l15-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        answers: [
          {
            id: 'r-l15-a1',
            itemNumber: '①',
            label: '体と症状 (Body Parts & Health Symptoms)',
            answer: '❶ からだ　❷ あたま　❸ て うえ　❹ あし　❺ め みみ　❻ くち した',
            answerRomaji: '1: karada, 2: atama, 3: te, ue | 4: ashi, 5: me, mimi | 6: kuchi, shita',
            answerEnglish: '1: body, 2: head, 3: hand, up | 4: leg/foot, 5: eye, ear | 6: mouth, down',
          },
        ],
      },
      {
        id: 'r-l15-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        answers: [
          {
            id: 'r-l15-g1',
            itemNumber: '2①',
            label: '助言の「〜といいですよ」 (Advice: Dictionary Form + to ii desu yo)',
            answer: '❶ はしる　❷ ねる　❸ たべる　❹ およぐ',
            answerRomaji: '1: hashiru, 2: neru, 3: taberu, 4: oyogu',
            answerEnglish: '1: good to run, 2: good to sleep, 3: good to eat, 4: good to swim',
          },
          {
            id: 'r-l15-g2',
            itemNumber: '2②',
            label: '禁止・指示「〜ないでください」 (Negative Request: Nai-form + de kudasai)',
            answer: '❶ してください　❷ みないでください　❸ よまないでください　❹ あるいてください　❺ はたらきすぎないでください',
            answerRomaji: '1: shite kudasai, 2: minaide kudasai, 3: yomanaide kudasai, 4: aruite kudasai, 5: hatarakisuginaide kudasai',
            answerEnglish: '1: please do, 2: please do not watch, 3: please do not read, 4: please walk, 5: please do not overwork',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 16,
    topicNumber: 8,
    topicTitle: 'トピック8 けんこう',
    topicTitleRomaji: 'Topikku 8: Kenkou',
    topicTitleEnglish: 'Topic 8: Staying Healthy',
    lessonTitle: 'だい16か 走ったり、泳いだり しています',
    lessonTitleRomaji: 'Dai 16-ka: Hashittari, oyoidari shite imasu',
    lessonTitleEnglish: 'Lesson 16: I Run and Swim (Among Other Things)',
    bookPage: 'p. 144',
    answerKeyPage: 'p. 192–194',
    sections: [
      {
        id: 'r-l16-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        answers: [
          {
            id: 'r-l16-a1',
            itemNumber: '①',
            label: '健康運動 (Health Exercises & Routines)',
            answer: '❶ ジョギング　❷ トレーニング　❸ しゅうまつ　❹ いっしゅうかん',
            answerRomaji: '1: jogingu, 2: toreeningu, 3: shuumatsu, 4: isshuukan',
            answerEnglish: '1: jogging, 2: gym training, 3: weekend, 4: one week',
          },
        ],
      },
      {
        id: 'r-l16-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        answers: [
          {
            id: 'r-l16-g1',
            itemNumber: '2①',
            label: '動作の例示「〜たり〜たりします」 (Listing Actions: Tari... tari shimasu)',
            answer: '❶ とおくをみたり、ブルーベリーをたべたり　❷ トレーニングをしたり、およいだり　❸ あるいたり、ジョギングをしたり　❹ ヨガをしたり、はしったり',
            answerRomaji: '1: tooku o mitari, buruuberii o tabetari | 2: toreeningu o shitari, oyoidari | 3: aruitari, jogingu o shitari | 4: yoga o shitari, hashittari',
            answerEnglish: '1: looking into distance & eating blueberries, 2: training & swimming, 3: walking & jogging, 4: doing yoga & running',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 17,
    topicNumber: 9,
    topicTitle: 'トピック9 お祝い',
    topicTitleRomaji: 'Topikku 9: Oiwai',
    topicTitleEnglish: 'Topic 9: Celebrations',
    lessonTitle: 'だい17か たんじょう日に もらったんです',
    lessonTitleRomaji: 'Dai 17-ka: Tanjoubi ni moratta n desu',
    lessonTitleEnglish: 'Lesson 17: I Received It on My Birthday',
    bookPage: 'p. 152',
    answerKeyPage: 'p. 194–195',
    sections: [
      {
        id: 'r-l17-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        answers: [
          {
            id: 'r-l17-a1',
            itemNumber: '①',
            label: '贈り物と祝い事 (Gifts & Celebrations)',
            answer: '❶ たんじょうび　❷ けっこんのおいわい　❸ クリスマスのプレゼント',
            answerRomaji: '1: tanjoubi, 2: kekkon no oiwai, 3: kurisumasu no purezento',
            answerEnglish: '1: birthday, 2: wedding celebration, 3: Christmas present',
          },
        ],
      },
      {
        id: 'r-l17-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        answers: [
          {
            id: 'r-l17-g1',
            itemNumber: '2①',
            label: '説明・理由の「〜んです」 (Explanatory "n desu")',
            answer: '❶ もらったんです　❷ プレゼントなんです　❸ かいたいんです　❹ したんですか / いたいんです　❺ たべないんです',
            answerRomaji: '1: moratta n desu, 2: purezento na n desu, 3: kaitai n desu, 4: shita n desu ka / itai n desu, 5: tabenai n desu',
            answerEnglish: '1: I received it (explaining), 2: it was a gift, 3: I want to buy one, 4: did you do something? / it hurts, 5: I don\'t eat it',
          },
          {
            id: 'r-l17-g2',
            itemNumber: '2②',
            label: '授受表現「あげる / もらう」 (Giving and Receiving)',
            answer: '❶ に/から もらいます　❷ に をあげました　❸ に/から もらいました',
            answerRomaji: '1: ni/kara moraimasu | 2: ni ... o agemashita | 3: ni/kara moraimashita',
            answerEnglish: '1: receive from, 2: gave to, 3: received from',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 18,
    topicNumber: 9,
    topicTitle: 'トピック9 お祝い',
    topicTitleRomaji: 'Topikku 9: Oiwai',
    topicTitleEnglish: 'Topic 9: Celebrations',
    lessonTitle: 'だい18か パーティーが いいと 思います',
    lessonTitleRomaji: 'Dai 18-ka: Paatii ga ii to omoimasu',
    lessonTitleEnglish: 'Lesson 18: I Think a Party is a Good Idea',
    bookPage: 'p. 160',
    answerKeyPage: 'p. 195',
    sections: [
      {
        id: 'r-l18-s1',
        sectionNumber: 1,
        sectionTitle: '❶ もじとことば',
        romajiTitle: 'Moji to Kotoba',
        englishTitle: 'Letters and Words',
        answers: [
          {
            id: 'r-l18-a1',
            itemNumber: '①',
            label: '人生の節目 (Milestones & Events)',
            answer: '❶ しゅうしょく　❷ よろこびます　❸ ひっこしのパーティー',
            answerRomaji: '1: shuushoku, 2: yorokobimasu, 3: hikkoshi no paatii',
            answerEnglish: '1: finding employment, 2: to be delighted/happy, 3: housewarming party',
          },
        ],
      },
      {
        id: 'r-l18-s2',
        sectionNumber: 2,
        sectionTitle: '❷ かいわとぶんぽう',
        romajiTitle: 'Kaiwa to Bunpou',
        englishTitle: 'Conversation and Grammar',
        answers: [
          {
            id: 'r-l18-g1',
            itemNumber: '2①',
            label: '意見の「〜と 思います」 (Expressing Opinions: Plain form + to omoimasu)',
            answer: '❶ すきだ　❷ とくいじゃない　❸ していない　❹ いい',
            answerRomaji: '1: suki da, 2: tokui ja nai, 3: shite inai, 4: ii',
            answerEnglish: '1: think they like it, 2: think they are not good at it, 3: think they haven\'t done it, 4: think it is good',
          },
          {
            id: 'r-l18-g2',
            itemNumber: '2②',
            label: '過去の感想「〜たと思います」 (Past Opinions)',
            answer: '❶ うれしかった　❷ べんりだ　❸ きにいいた　❹ もらわなかった',
            answerRomaji: '1: ureshikatta, 2: benri da, 3: kiniitta, 4: morawanakatta',
            answerEnglish: '1: thought it was pleasing, 2: thought it was convenient, 3: thought they liked it, 4: thought they did not receive it',
          },
        ],
      },
    ],
  },
];

// ============================================================================
// 2. KATSUDOU ANSWER KEY (かつどう こたえとスクリプト pp. 160–178)
// ============================================================================
export const KATSUDOU_ANSWER_KEYS: LessonAnswerKey[] = [
  // --------------------------------------------------------------------------
  // Katsudou Lesson 1: 東京に すんでいます (p. 22, Answer Key p. 160)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 1,
    topicNumber: 1,
    topicTitle: 'トピック1 私とかぞく',
    topicTitleRomaji: 'Topikku 1: Watashi to kazoku',
    topicTitleEnglish: 'Topic 1: Myself and My Family',
    lessonTitle: 'だい1か 東京に すんでいます',
    lessonTitleRomaji: 'Dai 1-ka: Toukyou ni sunde imasu',
    lessonTitleEnglish: 'Lesson 1: We Live in Tokyo',
    bookPage: 'p. 22',
    answerKeyPage: 'p. 160',
    sections: [
      {
        id: 'k-l1-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 家族の人数と紹介 (Family Members)',
        romajiTitle: 'Katsudou 1: Kazoku no ninsuu to shoukai',
        englishTitle: 'Activity 1: Number of Family Members and Introductions',
        bookPageRef: 'p. 22–23',
        trackRef: '002-003',
        answers: [
          {
            id: 'k-l1-a1',
            itemNumber: '1',
            label: '家族の構成 (Family Members Count)',
            answer: 'まおさんの家族は7人（父、母、兄、弟、妹、まおさん、祖母、祖父、伯父、伯母） / いしかわさんの家族は4人（夫、妻、息子、娘）',
            answerRomaji: 'Mao-san no kazoku wa 7-nin (chichi, haha, ani, otouto, imouto, Mao-san, sobo, sofu, oji, oba) | Ishikawa-san no kazoku wa 4-nin (otto, tsuma, musuko, musume)',
            answerEnglish: 'Mao\'s family has 7 members living together (father, mother, older brother, younger brother, younger sister, grandmother, grandfather) | Mr. Ishikawa\'s family has 4 members (husband, wife, son, daughter)',
          },
          {
            id: 'k-l1-a2',
            itemNumber: '2',
            label: '住まいと仕事の会話 (Residence & Work Table)',
            answer: '(1) 1: a (Tokyo), 2: d (Beijing), 3: b (Italy), 4: c (Brazil) | (2) 1: 3人 (san-nin), 2: 4人 (yo-nin), 3: 2人 (futari), 4: 6人 (roku-nin) | (3) 1: f (hotel), 2: i (car company), 3: j (company employee), 4: h (housewife)',
            answerRomaji: '(1) 1: a, 2: d, 3: b, 4: c | (2) 1: 3-nin, 2: 4-nin, 3: futari, 4: roku-nin | (3) 1: f, 2: i, 3: j, 4: h',
            answerEnglish: '(1) Cities: 1: Tokyo, 2: Beijing, 3: Italy, 4: Brazil | (2) Count: 1: 3 people, 2: 4 people, 3: 2 people, 4: 6 people | (3) Jobs: 1: hotel, 2: car company, 3: company worker, 4: homemaker',
          },
          {
            id: 'k-l1-a3',
            itemNumber: '2 こたえ',
            label: '文型活用 (Grammar Point)',
            answer: '（べんきょうして） （すんで）',
            answerRomaji: '(benkyou shite) (sunde)',
            answerEnglish: '(studying) (living)',
          },
          {
            id: 'k-l1-a4',
            itemNumber: '3',
            label: '話せる言語 (Languages Spoken Matching)',
            answer: '1 (a, c)　2 (a, b)　3 (a, c)　4 (b)',
            answerRomaji: '1: (a, c), 2: (a, b), 3: (a, c), 4: (b)',
            answerEnglish: '1: Suzuki Mari - Japanese and Korean (a, c) | 2: Sister in Italy - Japanese and Italian (a, b) | 3: Brother in Beijing - Chinese and Japanese (a, c) | 4: Aunt in Brazil - Portuguese and English (b)',
            trackNumber: '008-011',
            dialogueScript: [
              {
                speaker: '1 すずき まり',
                japanese: 'すずき まりです。にほんじんです。にほんごと かんこくごと えいごが できます。',
                romaji: 'Suzuki Mari desu. Nihonjin desu. Nihongo to kankokugo to eigo ga dekimasu.',
                english: 'I am Mari Suzuki. I am Japanese. I can speak Japanese, Korean, and English.',
              },
              {
                speaker: '2 あね',
                japanese: 'わたしの あねは イタリアに すんでいます。あねと おっとは にほんごと えいごで はなします。',
                romaji: 'Watashi no ane wa Itaria ni sunde imasu. Ane to otto wa nihongo to eigo de hanashimasu.',
                english: 'My older sister lives in Italy. My sister and her husband converse in Japanese and English.',
              },
            ],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Katsudou Lesson 2: しゅみは クラシックを 聞くことです (p. 28, Answer Key p. 160–161)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 2,
    topicNumber: 1,
    topicTitle: 'トピック1 私とかぞく',
    topicTitleRomaji: 'Topikku 1: Watashi to kazoku',
    topicTitleEnglish: 'Topic 1: Myself and My Family',
    lessonTitle: 'だい2か しゅみは クラシックを 聞くことです',
    lessonTitleRomaji: 'Dai 2-ka: Shumi wa kurashikku o kiku koto desu',
    lessonTitleEnglish: 'Lesson 2: My Hobby is Listening to Classical Music',
    bookPage: 'p. 28',
    answerKeyPage: 'p. 160–161',
    sections: [
      {
        id: 'k-l2-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 趣味のインタビュー (Hobby Interviews)',
        romajiTitle: 'Katsudou 1: Shumi no intabyuu',
        englishTitle: 'Activity 1: Hobby Interviews',
        bookPageRef: 'p. 28–30',
        trackRef: '012-018',
        answers: [
          {
            id: 'k-l2-a1',
            itemNumber: '1',
            label: '趣味の語彙一覧 (Hobby Word Match)',
            answer: 'a りょうり　b アクセサリー　c おかし　d サッカー　e えんげき　f オペラ　g きって　h コイン　i にんぎょう　j え　k クラシックおんがく　l しゃしん　m がいこくご　n しょうぎ　o いご　p ドライブ',
            answerRomaji: 'a ryouri, b akusesarii, c okashi, d sakkaa, e engeki, f opera, g kitte, h koin, i ningyou, j e, k kurashikku, l shashin, m gaikokugo, n shougi, o igo, p doraibu',
            answerEnglish: 'a: cooking, b: jewelry/accessories, c: sweets, d: soccer, e: theater, f: opera, g: stamps, h: coins, i: dolls, j: painting/drawing, k: classical music, l: photography, m: foreign languages, n: shogi, o: go, p: driving',
          },
          {
            id: 'k-l2-a2',
            itemNumber: '2',
            label: '趣味の聞き取り (Listening & Matching People)',
            answer: '1 (k) クラシックおんがく　2 (m) がいこくご　3 (d) サッカー　4 (a) りょうり　5 (l) しゃしん',
            answerRomaji: '1: (k) kurashikku, 2: (m) gaikokugo, 3: (d) sakkaa, 4: (a) ryouri, 5: (l) shashin',
            answerEnglish: '1: Noda - classical music (k), 2: Sato - foreign languages (m), 3: Yan - soccer (d), 4: Tanaka - cooking (a), 5: Joy - photography (l)',
            trackNumber: '013-017',
          },
          {
            id: 'k-l2-a3',
            itemNumber: '2 こたえ2',
            label: '文型活用 (Grammar Point: 〜こと)',
            answer: '(1) （とること） （あつめること）　(2) (c) (a) (b) （がくせいの） （ひまな）',
            answerRomaji: '(1) (toru koto) (atsumeru koto) | (2) (c) (a) (b) (gakusei no) (hima na)',
            answerEnglish: '(1) taking photos / collecting coins | (2) (c), (a), (b) student days / leisure time',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Katsudou Lesson 3: 日本は いま、はるです (p. 34, Answer Key p. 161–162)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 3,
    topicNumber: 2,
    topicTitle: 'トピック2 きせつとてんき',
    topicTitleRomaji: 'Topikku 2: Kisetsu to tenki',
    topicTitleEnglish: 'Topic 2: Seasons and Weather',
    lessonTitle: 'だい3か 日本は いま、はるです',
    lessonTitleRomaji: 'Dai 3-ka: Nihon wa ima, haru desu',
    lessonTitleEnglish: 'Lesson 3: It is Spring Now in Japan',
    bookPage: 'p. 34',
    answerKeyPage: 'p. 161–162',
    sections: [
      {
        id: 'k-l3-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 日本の四季と月 (Japanese Seasons & Months)',
        romajiTitle: 'Katsudou 1: Nihon no shiki to tsuki',
        englishTitle: 'Activity 1: Japanese Four Seasons and Months',
        bookPageRef: 'p. 34–36',
        trackRef: '019-027',
        answers: [
          {
            id: 'k-l3-a1',
            itemNumber: '1',
            label: '月の対応 (Months & Seasons Alignment)',
            answer: '3, 4, 5がつは はる / 6がつは つゆ / 7, 8がつは なつ / 9, 10, 11がつは あき / 12, 1, 2がつは ふゆ',
            answerRomaji: '3, 4, 5-gatsu wa haru | 6-gatsu wa tsuyu | 7, 8-gatsu wa natsu | 9, 10, 11-gatsu wa aki | 12, 1, 2-gatsu wa fuyu',
            answerEnglish: 'March to May: Spring | June: Rainy season | July to August: Summer | September to November: Autumn | December to February: Winter',
          },
          {
            id: 'k-l3-a2',
            itemNumber: '2',
            label: '季節の変化の聞き取り (Listening to Seasonal Changes)',
            answer: '(1) 1.d (あたたかく) 2.b (あつく) 3.a (すずしく) 4.c (さむく) | (2) 1: (3)がつ 2: (9)がつ 3: (7)がつ 4: (12)がつ',
            answerRomaji: '(1) 1: d (atatakaku), 2: b (atsuku), 3: a (suzushiku), 4: c (samuku) | (2) 1: 3-gatsu, 2: 9-gatsu, 3: 7-gatsu, 4: 12-gatsu',
            answerEnglish: '(1) 1: becomes warm (d), 2: becomes hot (b), 3: becomes cool (a), 4: becomes cold (c) | (2) 1: March, 2: September, 3: July, 4: December',
          },
          {
            id: 'k-l3-a3',
            itemNumber: '2 こたえ2',
            label: '文型活用 (Grammar Point: 〜くなります)',
            answer: '（すずしく） （あきに） （さむく） （ふゆに）',
            answerRomaji: '(suzushiku) (aki ni) (samuku) (fuyu ni)',
            answerEnglish: '(becomes cool) (in autumn) (becomes cold) (in winter)',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Katsudou Lesson 4: いい てんきですね (p. 40, Answer Key p. 162–163)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 4,
    topicNumber: 2,
    topicTitle: 'トピック2 きせつとてんき',
    topicTitleRomaji: 'Topikku 2: Kisetsu to tenki',
    topicTitleEnglish: 'Topic 2: Seasons and Weather',
    lessonTitle: 'だい4か いい てんきですね',
    lessonTitleRomaji: 'Dai 4-ka: Ii tenki desu ne',
    lessonTitleEnglish: 'Lesson 4: Nice Weather, Isn\'t It?',
    bookPage: 'p. 40',
    answerKeyPage: 'p. 162–163',
    sections: [
      {
        id: 'k-l4-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 世界の天気とあいさつ (World Weather & Greetings)',
        romajiTitle: 'Katsudou 1: Sekai no tenki to aisatsu',
        englishTitle: 'Activity 1: World Weather and Greetings',
        bookPageRef: 'p. 40–43',
        trackRef: '028-037',
        answers: [
          {
            id: 'k-l4-a1',
            itemNumber: '1',
            label: '天気のあいさつ (Weather Dialogue Matching)',
            answer: '(1) 1 (a) はれ　2 (b) あめ　3 (d) さむい　4 (c) あつかった　| (2) (2) (4)',
            answerRomaji: '(1) 1: (a) hare, 2: (b) ame, 3: (d) samui, 4: (c) atsukatta | (2) (2) (4)',
            answerEnglish: '(1) 1: sunny (a), 2: rain (b), 3: cold (d), 4: was hot (c) | (2) Past weather: 2 and 4',
          },
          {
            id: 'k-l4-a2',
            itemNumber: '2 こたえ2',
            label: '過去・現在の活用 (Past and Present Forms)',
            answer: '(1) （くもりでした） （さむいです） （あつかったです） （ふります）',
            answerRomaji: '(kumori deshita) (samui desu) (atsukatta desu) (furimasu)',
            answerEnglish: '(was cloudy) (is cold) (was hot) (it rains)',
          },
          {
            id: 'k-l4-a3',
            itemNumber: '3 こたえ2',
            label: '現在の進行状態 (Ongoing Condition: 〜ています)',
            answer: '（ふいて） （くもって）',
            answerRomaji: '(fuite) (kumotte)',
            answerEnglish: '(blowing) (clouded over)',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Katsudou Lesson 5: この こうえんは ひろくて、きれいです (p. 48, Answer Key p. 163–164)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 5,
    topicNumber: 3,
    topicTitle: 'トピック3 わたしの まち',
    topicTitleRomaji: 'Topikku 3: Watashi no machi',
    topicTitleEnglish: 'Topic 3: My Town',
    lessonTitle: 'だい5か この こうえんは ひろくて、きれいです',
    lessonTitleRomaji: 'Dai 5-ka: Kono kouen wa hirokute, kirei desu',
    lessonTitleEnglish: 'Lesson 5: This Park is Spacious and Beautiful',
    bookPage: 'p. 48',
    answerKeyPage: 'p. 163–164',
    sections: [
      {
        id: 'k-l5-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 東京の町紹介 (Introducing Tokyo Towns)',
        romajiTitle: 'Katsudou 1: Toukyou no machi shoukai',
        englishTitle: 'Activity 1: Introducing Neighborhoods in Tokyo',
        bookPageRef: 'p. 48–51',
        trackRef: '042-050',
        answers: [
          {
            id: 'k-l5-a1',
            itemNumber: '2',
            label: '町の魅力と特徴 (Town Characteristics Table)',
            answer: '1 あきはばら: (1) a (でんきや) (2) やすい, エ | 2 はらじゅく: (1) d (かわいいみせ) (2) カ (わかいひとがおおい) | 3 こうきょ: (1) b (みどり) (2) オ (しずか), きもちがいい | 4 うえのこうえん: (1) c (どうぶつえん) (2) イ (ひろい、きれい)',
            answerRomaji: '1 Akihabara: a, yasui | 2 Harajuku: d, wakai hito ga ooi | 3 Koukyo: b, shizuka, kimochi ga ii | 4 Ueno Kouen: c, hiroi, kirei',
            answerEnglish: '1: Akihabara - electronics shops, inexpensive | 2: Harajuku - cute shops, lots of youth | 3: Imperial Palace - greenery, quiet, pleasant | 4: Ueno Park - zoo, spacious and clean',
          },
          {
            id: 'k-l5-a2',
            itemNumber: '2 こたえ2',
            label: '文型活用 (Grammar Point: て形並列)',
            answer: '（しずかで） （ひろくて）',
            answerRomaji: '(shizuka de) (hirokute)',
            answerEnglish: '(quiet and...) (spacious and...)',
          },
          {
            id: 'k-l5-a3',
            itemNumber: '3 こたえ2',
            label: '文型活用 (Grammar Point: 〜けど)',
            answer: '（おもしろいけど） （きれいだけど）',
            answerRomaji: '(omoshiroi kedo) (kirei dakedo)',
            answerEnglish: '(interesting, but...) (beautiful, but...)',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Katsudou Lesson 6: まっすぐ 行って ください (p. 54, Answer Key p. 164–165)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 6,
    topicNumber: 3,
    topicTitle: 'トピック3 わたしの まち',
    topicTitleRomaji: 'Topikku 3: Watashi no machi',
    topicTitleEnglish: 'Topic 3: My Town',
    lessonTitle: 'だい6か まっすぐ 行って ください',
    lessonTitleRomaji: 'Dai 6-ka: Massugu itte kudasai',
    lessonTitleEnglish: 'Lesson 6: Please Go Straight',
    bookPage: 'p. 54',
    answerKeyPage: 'p. 164–165',
    sections: [
      {
        id: 'k-l6-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 道案内と建物の特徴 (Directions & Landmarks)',
        romajiTitle: 'Katsudou 1: Michi annai to tatemono no tokuchou',
        englishTitle: 'Activity 1: Giving Directions and Describing Landmarks',
        bookPageRef: 'p. 54–57',
        trackRef: '051-060',
        answers: [
          {
            id: 'k-l6-a1',
            itemNumber: '2',
            label: '道案内の聞き取り (Listening to Directions)',
            answer: '1 (b) はくぶつかん: ふたつめのかどを みぎ | 2 (a) ホテル: このとおりをまっすぐ、ふたつめをひだり | 3 (c) デパート: このみちをまっすぐ、ひとつめのしんごうをみぎ | 4 (b) たいしかん: ひとつめのしんごうをひだり',
            answerRomaji: '1: (b) hakubutsukan | 2: (a) hoteru | 3: (c) depaato | 4: (b) taishikan',
            answerEnglish: '1: Museum - turn right at 2nd corner | 2: Hotel - straight on this street, turn left at 2nd | 3: Department store - straight on this street, turn right at 1st traffic light | 4: Embassy - turn left at 1st traffic light',
          },
          {
            id: 'k-l6-a2',
            itemNumber: '2 こたえ2',
            label: '動詞活用 (Verbs in Route Guidance)',
            answer: '(1) （まがって） （わたって）　(2) （みぎじゃなくて） （ひだりじゃなくて）',
            answerRomaji: '(1) (magatte) (watatte) | (2) (migi ja nakute) (hidari ja nakute)',
            answerEnglish: '(1) turn / cross | (2) not to the right / not to the left',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Katsudou Lesson 7: 10時でも いいですか (p. 62, Answer Key p. 165–166)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 7,
    topicNumber: 4,
    topicTitle: 'トピック4 でかける',
    topicTitleRomaji: 'Topikku 4: Dekakeru',
    topicTitleEnglish: 'Topic 4: Going Out',
    lessonTitle: 'だい7か 10時でも いいですか',
    lessonTitleRomaji: 'Dai 7-ka: Jyuu-ji demo ii desu ka',
    lessonTitleEnglish: 'Lesson 7: Is 10:00 Okay As Well?',
    bookPage: 'p. 62',
    answerKeyPage: 'p. 165–166',
    sections: [
      {
        id: 'k-l7-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 待ち合わせの約束 (Making Appointments)',
        romajiTitle: 'Katsudou 1: Machiawase no yakusoku',
        englishTitle: 'Activity 1: Making Appointments and Meeting Up',
        bookPageRef: 'p. 62–65',
        trackRef: '061-070',
        answers: [
          {
            id: 'k-l7-a1',
            itemNumber: '2',
            label: '待ち合わせ時刻と場所 (Meetup Times & Places)',
            answer: '(1) 1: 10:00 / 2: 1:30 / 3: 5:00 / 4: 8:30 | (2) 1: a (ホテルのロビー) / 2: b (デパートのいりぐち) / 3: d (コーヒーショップ) / 4: a (ホテルのロビー)',
            answerRomaji: '(1) 1: 10:00, 2: 1:30, 3: 5:00, 4: 8:30 | (2) 1: a, 2: b, 3: d, 4: a',
            answerEnglish: '(1) Times: 10:00, 1:30, 5:00, 8:30 | (2) Places: 1: Hotel lobby, 2: Department store entrance, 3: Coffee shop, 4: Hotel lobby',
          },
          {
            id: 'k-l7-a2',
            itemNumber: '4 こたえ2',
            label: '遅刻の理由表現 (Explaining Reasons for Being Late)',
            answer: '（とまって） （まちがえて） （で）',
            answerRomaji: '(tomatte) (machigaete) (de)',
            answerEnglish: '(train stopped) (mistook the time) (due to traffic/accident)',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Katsudou Lesson 8: もう やけいを 見に 行きましたか (p. 68, Answer Key p. 166–167)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 8,
    topicNumber: 4,
    topicTitle: 'トピック4 でかける',
    topicTitleRomaji: 'Topikku 4: Dekakeru',
    topicTitleEnglish: 'Topic 4: Going Out',
    lessonTitle: 'だい8か もう やけいを 見に 行きましたか',
    lessonTitleRomaji: 'Dai 8-ka: Mou yakei o mi ni ikimashita ka',
    lessonTitleEnglish: 'Lesson 8: Have You Already Gone to See the Night View?',
    bookPage: 'p. 68',
    answerKeyPage: 'p. 166–167',
    sections: [
      {
        id: 'k-l8-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: おすすめ観光スポット (Recommended Spots)',
        romajiTitle: 'Katsudou 1: Osusume kankou supotto',
        englishTitle: 'Activity 1: Recommended Sightseeing Spots',
        bookPageRef: 'p. 68–71',
        trackRef: '071-079',
        answers: [
          {
            id: 'k-l8-a1',
            itemNumber: '2',
            label: '訪問経験と勧誘 (Visiting Experience & Invitations)',
            answer: '(1) 1: a (びじゅつかん) / 2: e (スカイツリー) / 3: f (ラーメン) / 4: g (すいじょうバス) | (2) 1: 〇 / 2: 〇 / 3: 〇 / 4: ✕',
            answerRomaji: '(1) 1: a, 2: e, 3: f, 4: g | (2) 1: O, 2: O, 3: O, 4: X',
            answerEnglish: '(1) 1: art museum, 2: Skytree night view, 3: ramen food stall, 4: river cruise | (2) Visited: 1: yes, 2: yes, 3: yes, 4: no',
          },
          {
            id: 'k-l8-a2',
            itemNumber: '2 こたえ2',
            label: '勧誘表現 (Invitation Phrases: 〜ませんか / 〜ましょう)',
            answer: '(1) （たべに） （かいに）　(2) （のりませんか） （のりましょう） （たべにいきませんか） （いきましょう）',
            answerRomaji: '(1) (tabe ni) (kai ni) | (2) (norimasen ka) (norimashou) (tabe ni ikimasen ka) (ikimashou)',
            answerEnglish: '(1) go to eat / go to buy | (2) Won\'t you ride? / Let\'s ride! / Won\'t you go to eat? / Let\'s go!',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Katsudou Lesson 9: 日本語は はつおんが かんたんです (p. 74, Answer Key p. 167–168)
  // --------------------------------------------------------------------------
  {
    lessonNumber: 9,
    topicNumber: 5,
    topicTitle: 'トピック5 外国語と外国文化',
    topicTitleRomaji: 'Topikku 5: Gaikokugo to gaikokubunka',
    topicTitleEnglish: 'Topic 5: Foreign Languages and Cultures',
    lessonTitle: 'だい9か 日本語は はつおんが かんたんです',
    lessonTitleRomaji: 'Dai 9-ka: Nihongo wa hatsuon ga kantan desu',
    lessonTitleEnglish: 'Lesson 9: Japanese Pronunciation is Simple',
    bookPage: 'p. 74',
    answerKeyPage: 'p. 167–168',
    sections: [
      {
        id: 'k-l9-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 言語学習の経験 (Language Learning Experiences)',
        romajiTitle: 'Katsudou 1: Gengo gakushuu no keiken',
        englishTitle: 'Activity 1: Language Learning Experiences',
        bookPageRef: 'p. 74–77',
        trackRef: '080-090',
        answers: [
          {
            id: 'k-l9-a1',
            itemNumber: '2',
            label: '外国語の勉強歴 (Language Learning History)',
            answer: '(1) 1: c (こうこう) / 2: a (しょうがっこう) / 3: d (だいがく) / 4: いま | (2) 1: h (ひらがな・カタカナ) / 2: f (もじ), g (かきます) / 3: i (たんご), f (はなします) / 4: e (はつおん), i (よみます)',
            answerRomaji: '(1) 1: c, 2: a, 3: d, 4: ima | (2) 1: h, 2: f, g | 3: i, f | 4: e, i',
            answerEnglish: '(1) When studied: 1: high school, 2: elementary school, 3: university, 4: now | (2) Aspects: hiragana, kanji writing, vocabulary speaking, pronunciation reading',
          },
          {
            id: 'k-l9-a2',
            itemNumber: '3 こたえ',
            label: '依頼の表現 (Polite Requests)',
            answer: '(1) （おしえて） （かいて）　(2) （つかいかた） （の） （よみかた）',
            answerRomaji: '(1) (oshiete) (kaite) | (2) (tsukaikata) (no) (yomikata)',
            answerEnglish: '(1) please teach / please write | (2) how to use / of / how to read',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Katsudou Lessons 10 to 18 summary entries for complete coverage
  // --------------------------------------------------------------------------
  {
    lessonNumber: 10,
    topicNumber: 5,
    topicTitle: 'トピック5 外国語と外国文化',
    topicTitleRomaji: 'Topikku 5: Gaikokugo to gaikokubunka',
    topicTitleEnglish: 'Topic 5: Foreign Languages and Cultures',
    lessonTitle: 'だい10か いつか 日本に 行きたいです',
    lessonTitleRomaji: 'Dai 10-ka: Itsuka Nihon ni ikitai desu',
    lessonTitleEnglish: 'Lesson 10: Someday I Want to Go to Japan',
    bookPage: 'p. 80',
    answerKeyPage: 'p. 168–169',
    sections: [
      {
        id: 'k-l10-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 外国の文化と夢 (Foreign Culture & Aspirations)',
        romajiTitle: 'Katsudou 1: Gaikoku no bunka to yume',
        englishTitle: 'Activity 1: Foreign Culture and Aspirations',
        answers: [
          {
            id: 'k-l10-a1',
            itemNumber: '2',
            label: '行きたい国と目的 (Countries of Interest & Purposes)',
            answer: '(1) 1: かんこく (ドラマ) / 2: タイ (ダンス) / 3: フランス (サイト) / 4: にほん (りょうり) | (2) （はたらきたい） （みたい）',
            answerRomaji: '(1) 1: Kankoku, 2: Tai, 3: Furansu, 4: Nihon | (2) (hatarakitai) (mitai)',
            answerEnglish: '(1) 1: Korea (dramas), 2: Thailand (dancing), 3: France (websites), 4: Japan (cuisine) | (2) want to work / want to try seeing',
          },
          {
            id: 'k-l10-a2',
            itemNumber: '3 こたえ2',
            label: '申し出の表現 (Offers: 〜ましょうか)',
            answer: '（はなしましょうか） （かいましょうか） （みましょうか）',
            answerRomaji: '(hanashimashou ka) (kaimashou ka) (mimashou ka)',
            answerEnglish: 'Shall I speak? / Shall I buy? / Shall I look?',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 11,
    topicNumber: 6,
    topicTitle: 'トピック6 そとで食べる',
    topicTitleRomaji: 'Topikku 6: Soto de taberu',
    topicTitleEnglish: 'Topic 6: Eating Outdoors',
    lessonTitle: 'だい11か 何を 持って いきますか',
    lessonTitleRomaji: 'Dai 11-ka: Nani o motte ikimasu ka',
    lessonTitleEnglish: 'Lesson 11: What Will You Bring?',
    bookPage: 'p. 90',
    answerKeyPage: 'p. 169–170',
    sections: [
      {
        id: 'k-l11-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: ピクニックの計画 (Planning a Picnic)',
        romajiTitle: 'Katsudou 1: Pikunikku no keikaku',
        englishTitle: 'Activity 1: Planning a Picnic',
        answers: [
          {
            id: 'k-l11-a1',
            itemNumber: '2',
            label: '持ち物分担 (Bringing Items: 〜ていきます)',
            answer: '（つくって） （もって） / 1 (b) ワイン　2 (b) くだもの　3 (a) ケーキ　4 (a, b) ワインとビール',
            answerRomaji: '(tsukutte) (motte) | 1: (b) wain, 2: (b) kudamono, 3: (a) keeki, 4: (a, b) wain to biiru',
            answerEnglish: 'make and bring / take along | 1: wine, 2: fruit, 3: cake, 4: wine and beer',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 12,
    topicNumber: 6,
    topicTitle: 'トピック6 そとで食べる',
    topicTitleRomaji: 'Topikku 6: Soto de taberu',
    topicTitleEnglish: 'Topic 6: Eating Outdoors',
    lessonTitle: 'だい12か おいしそうですね',
    lessonTitleRomaji: 'Dai 12-ka: Oishisou desu ne',
    lessonTitleEnglish: 'Lesson 12: It Looks Delicious!',
    bookPage: 'p. 96',
    answerKeyPage: 'p. 170–171',
    sections: [
      {
        id: 'k-l12-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 料理の味と感想 (Tastes & Impressions)',
        romajiTitle: 'Katsudou 1: Ryouri no aji to kansou',
        englishTitle: 'Activity 1: Flavors and Impressions of Dishes',
        answers: [
          {
            id: 'k-l12-a1',
            itemNumber: '2',
            label: '料理の見た目の感想 (Looks/Appears: 〜そう)',
            answer: '（あまそう） （すっぱそう） / （からくて） （あまくて）',
            answerRomaji: '(amasou) (suppasou) | (karakute) (amakute)',
            answerEnglish: 'looks sweet / looks sour | spicy and... / sweet and...',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 13,
    topicNumber: 7,
    topicTitle: 'トピック7 出張',
    topicTitleRomaji: 'Topikku 7: Shutchou',
    topicTitleEnglish: 'Topic 7: Business Trips',
    lessonTitle: 'だい13か たなかさんに 会ったことが あります',
    lessonTitleRomaji: 'Dai 13-ka: Tanaka-san ni atta koto ga arimasu',
    lessonTitleEnglish: 'Lesson 13: I Have Met Mr. Tanaka Before',
    bookPage: 'p. 104',
    answerKeyPage: 'p. 171–172',
    sections: [
      {
        id: 'k-l13-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 出張の迎えと日程 (Business Trip Pickup & Schedule)',
        romajiTitle: 'Katsudou 1: Shutchou no mukae to nittei',
        englishTitle: 'Activity 1: Airport Pickup and Business Schedules',
        answers: [
          {
            id: 'k-l13-a1',
            itemNumber: '2',
            label: '経験の有無 (Having Done: 〜たことがある)',
            answer: '（いったこと） （はなしたこと） / 12にち (たなかさん) 16にち (さいとうさん) 22にち (いしかわさん) 28にち (なかむらさん)',
            answerRomaji: '(itta koto) (hanashita koto) | 12th: Tanaka-san, 16th: Saitou-san, 22nd: Ishikawa-san, 28th: Nakamura-san',
            answerEnglish: 'have gone / have spoken | 12th: Mr. Tanaka, 16th: Mr. Saito, 22nd: Mr. Ishikawa, 28th: Mr. Nakamura',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 14,
    topicNumber: 7,
    topicTitle: 'トピック7 出張',
    topicTitleRomaji: 'Topikku 7: Shutchou',
    topicTitleEnglish: 'Topic 7: Business Trips',
    lessonTitle: 'だい14か これ、使っても いいですか',
    lessonTitleRomaji: 'Dai 14-ka: Kore, tsukattemo ii desu ka',
    lessonTitleEnglish: 'Lesson 14: May I Use This?',
    bookPage: 'p. 110',
    answerKeyPage: 'p. 172–173',
    sections: [
      {
        id: 'k-l14-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: オフィスのルールと許可 (Office Permissions)',
        romajiTitle: 'Katsudou 1: Ofisu no ruuru to kyoka',
        englishTitle: 'Activity 1: Office Etiquette and Asking Permission',
        answers: [
          {
            id: 'k-l14-a1',
            itemNumber: '2',
            label: '許可を求める表現 (Asking Permission: 〜てもいい)',
            answer: '（こくさいでんわしても） （かりても）',
            answerRomaji: '(kokusai denwa shitemo) (karitemo)',
            answerEnglish: 'even if I make international call / even if I borrow',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 15,
    topicNumber: 8,
    topicTitle: 'トピック8 けんこう',
    topicTitleRomaji: 'Topikku 8: Kenkou',
    topicTitleEnglish: 'Topic 8: Staying Healthy',
    lessonTitle: 'だい15か たいそうすると いいですよ',
    lessonTitleRomaji: 'Dai 15-ka: Taisou suru to ii desu yo',
    lessonTitleEnglish: 'Lesson 15: It is Good to Do Calisthenics',
    bookPage: 'p. 116',
    answerKeyPage: 'p. 173–174',
    sections: [
      {
        id: 'k-l15-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 体のケアとアドバイス (Body Care & Advice)',
        romajiTitle: 'Katsudou 1: Karada no kea to adobaisu',
        englishTitle: 'Activity 1: Physical Care and Health Advice',
        answers: [
          {
            id: 'k-l15-a1',
            itemNumber: '2',
            label: '禁止と指示の表現 (Negative Request & Advice)',
            answer: 'しないで まげないで / （ねる） （たべる） （はいる） （たいそうする）',
            answerRomaji: 'shinaide, magenaide | (neru) (taberu) (hairu) (taisou suru)',
            answerEnglish: 'do not do, do not bend | (sleep) (eat) (take a bath) (do calisthenics)',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 16,
    topicNumber: 8,
    topicTitle: 'トピック8 けんこう',
    topicTitleRomaji: 'Topikku 8: Kenkou',
    topicTitleEnglish: 'Topic 8: Staying Healthy',
    lessonTitle: 'だい16か 走ったり、泳いだり しています',
    lessonTitleRomaji: 'Dai 16-ka: Hashittari, oyoidari shite imasu',
    lessonTitleEnglish: 'Lesson 16: I Run and Swim (Among Other Things)',
    bookPage: 'p. 122',
    answerKeyPage: 'p. 174–175',
    sections: [
      {
        id: 'k-l16-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: 健康習慣のアンケート (Health Habits Survey)',
        romajiTitle: 'Katsudou 1: Kenkou shuukan no ankeeto',
        englishTitle: 'Activity 1: Health Habits Survey',
        answers: [
          {
            id: 'k-l16-a1',
            itemNumber: '2',
            label: '複数の習慣例示 (Listing Actions: 〜たり〜たり)',
            answer: '（およいだり） （トレーニングしたり） （のんだり） （たべたり） / （たべる） （すわない）',
            answerRomaji: '(oyoidari) (toreeningu shitari) (nondari) (tabetari) | (taberu) (suwanai)',
            answerEnglish: 'swimming and gym training / drinking and eating | (eat) (do not smoke)',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 17,
    topicNumber: 9,
    topicTitle: 'トピック9 お祝い',
    topicTitleRomaji: 'Topikku 9: Oiwai',
    topicTitleEnglish: 'Topic 9: Celebrations',
    lessonTitle: 'だい17か たんじょう日に もらったんです',
    lessonTitleRomaji: 'Dai 17-ka: Tanjoubi ni moratta n desu',
    lessonTitleEnglish: 'Lesson 17: I Received It on My Birthday',
    bookPage: 'p. 128',
    answerKeyPage: 'p. 175–176',
    sections: [
      {
        id: 'k-l17-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: プレゼントのやりとり (Exchanging Presents)',
        romajiTitle: 'Katsudou 1: Purezento no yaritori',
        englishTitle: 'Activity 1: Giving and Receiving Presents',
        answers: [
          {
            id: 'k-l17-a1',
            itemNumber: '2',
            label: 'もらったものの説明 (Explaining Gifts: 〜んです)',
            answer: '（きる） （あそぶ） / （もらった） （つくった）',
            answerRomaji: '(kiru) (asobu) | (moratta) (tsukutta)',
            answerEnglish: 'wear / play | received / handmade',
          },
        ],
      },
    ],
  },
  {
    lessonNumber: 18,
    topicNumber: 9,
    topicTitle: 'トピック9 お祝い',
    topicTitleRomaji: 'Topikku 9: Oiwai',
    topicTitleEnglish: 'Topic 9: Celebrations',
    lessonTitle: 'だい18か パーティーが いいと 思います',
    lessonTitleRomaji: 'Dai 18-ka: Paatii ga ii to omoimasu',
    lessonTitleEnglish: 'Lesson 18: I Think a Party is a Good Idea',
    bookPage: 'p. 134',
    answerKeyPage: 'p. 176–177',
    sections: [
      {
        id: 'k-l18-s1',
        sectionNumber: 1,
        sectionTitle: '活動1: お祝いの企画と意見 (Planning Celebrations & Opinions)',
        romajiTitle: 'Katsudou 1: Oiwai no kikaku to iken',
        englishTitle: 'Activity 1: Planning Celebrations and Giving Opinions',
        answers: [
          {
            id: 'k-l18-a1',
            itemNumber: '2',
            label: '自分の考えを言う (Stating Opinions: 〜と思います)',
            answer: '(1) （パーティーは たのしい） （あかちゃんの ものが ひつようだ）　(2) （みんなとはなしたい） （パーティーが すきじゃない）',
            answerRomaji: '(1) (paatii wa tanoshii) (akachan no mono ga hitsuyou da) | (2) (minna to hanashitai) (paatii ga suki ja nai)',
            answerEnglish: '(1) parties are fun / baby items are necessary | (2) want to talk with everyone / do not like parties',
          },
        ],
      },
    ],
  },
];
