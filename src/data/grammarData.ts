import { GrammarPoint } from '../types/japanese';

export const GRAMMAR_DATA: GrammarPoint[] = [
  {
    id: 'g-wa-vs-ga',
    title: 'Topic vs Subject: は (wa) vs が (ga)',
    japanese: '〜は / 〜が',
    furigana: '〜は / 〜が',
    level: 'N5',
    meaning: 'Topic marker (は) vs Specific grammatical subject identifier (が)',
    formation: [
      '[Topic / Known context] + は + [Comment / Description]',
      '[New information / Specific entity] + が + [Action / Predicate]',
    ],
    explanation: 'は marks the overarching topic of the sentence ("As for X..."). It often introduces known information or contrasts. が introduces brand new information, marks the subject of subordinate clauses, or highlights a specific entity answering "who/which" questions (exhaustive listing: "田中さんが来ました" = "It is Tanaka who came").',
    nuanceNotes: 'Key heuristic: In questions asking "Who/What/Which", the question word takes が (誰が来ましたか), and the answer also takes が (田中さんが来ました). When stating general truths or contrasting items, use は.',
    examples: [
      {
        japanese: '私は学生です。',
        english: 'As for me, I am a student.',
        romaji: 'Watashi wa gakusei desu.',
      },
      {
        japanese: '誰がその窓を開けましたか。',
        english: 'Who opened that window? (Who is the specific actor?)',
        romaji: 'Dare ga sono mado o akemashita ka.',
      },
      {
        japanese: '猫は魚が好きです。',
        english: 'As for cats, they like fish.',
        romaji: 'Neko wa sakana ga suki desu.',
      },
    ],
    drill: [
      {
        question: 'Q: 誰____このケーキを作りましたか。 (Who made this cake?)',
        options: ['は', 'が', 'を', 'に'],
        answerIndex: 1,
        explanation: 'Question words (who, what, which) cannot take the topic marker は; they take が because they seek the specific unknown subject.',
      },
      {
        question: 'Q: 私はお茶____好きですが、コーヒーは苦手です。 (I like green tea, but am bad with coffee.)',
        options: ['が', 'を', 'は', 'で'],
        answerIndex: 0,
        explanation: 'Preferences like 好き (suki) and 嫌い (kirai) take the target marker が (〜が好き).',
      },
    ],
  },
  {
    id: 'g-te-imasu',
    title: 'Ongoing Action & Resulting State: 〜ています',
    japanese: 'Verb-て + います',
    furigana: '動詞て形 + います',
    level: 'N5',
    meaning: 'Currently doing (progressive) OR state resulting from a past action (resultative)',
    formation: [
      'Action verbs (食べる, 読む): 読んでいる (currently reading)',
      'Change-of-state verbs (結婚する, 知る, 住む): 結婚している (is married), 知っている (knows), 住んでいる (lives in)',
    ],
    explanation: 'While Japanese learners initially learn 〜ています as "-ing" (progressive), with punctual/instantaneous verbs of state change, it expresses the CONTINUATION OF A RESULTING STATE. For instance, "東京に住んでいます" (I live in Tokyo), "結婚しています" (I am married), and "メガネをかけています" (I am wearing glasses).',
    nuanceNotes: 'Warning: For "to know", Japanese uses "知っています" in the affirmative, but in the negative, you MUST say "知りません" (not 知っていません).',
    examples: [
      {
        japanese: '今、図書館で日本語の本を読んでいます。',
        english: 'Right now, I am reading a Japanese book in the library.',
        romaji: 'Ima, toshokan de nihongo no hon o yonde imasu.',
      },
      {
        japanese: '田中さんは東京の新宿に住んでいます。',
        english: 'Tanaka-san lives in Shinjuku, Tokyo (state resulting from moving there).',
        romaji: 'Tanaka-san wa Toukyou no Shinjuku ni sunde imasu.',
      },
      {
        japanese: 'そのニュースを知っていますか。―いいえ、知りません。',
        english: 'Do you know that news? ― No, I do not know.',
        romaji: 'Sono nyuusu o shitte imasu ka? ― Iie, shirimasen.',
      },
    ],
    drill: [
      {
        question: 'Q: あの先生の名前を知っていますか。―いいえ、まだ＿＿＿＿。',
        options: ['知りません', '知っていません', '知りませんでした', '知っているではありません'],
        answerIndex: 0,
        explanation: 'The negative of 知っています is always 知りません (never 知っていません).',
      },
      {
        question: 'Q: 雨が＿＿＿＿から、傘を持っていきましょう。 (Because it is raining, let\'s take an umbrella.)',
        options: ['降っています', '降ります', '降った', '降れば'],
        answerIndex: 0,
        explanation: '降っています describes the continuous progressive state of rain falling.',
      },
    ],
  },
  {
    id: 'g-kara-node',
    title: 'Reasoning: 〜から vs 〜ので',
    japanese: '〜から / 〜ので',
    furigana: '〜から / 〜ので',
    level: 'N4',
    meaning: 'Because, since (Subjective reason vs Objective / Polite reason)',
    formation: [
      '[Plain or Polite form] + から (Personal reason, justification, suggestion, command)',
      '[Plain form (Noun/Na-adj + な)] + ので (Objective circumstance, polite, soft explanation)',
    ],
    explanation: 'から presents a subjective viewpoint and can precede requests, commands, or personal proposals (暑いから、窓を開けてください). ので, on the other hand, presents the reason as an objective natural cause or circumstance, making it significantly more polite in business and formal requests.',
    nuanceNotes: 'Never use imperative/commands directly after ので. When asking a favor or apologizing in polite society, always prefer ので (遅れてすみません、電車が遅れたので...).',
    examples: [
      {
        japanese: '危ないですから、黄色い線の内側に下がってください。',
        english: 'Because it is dangerous, please step behind the yellow line.',
        romaji: 'Abunai desu kara, kiiroi sen no uchigawa ni sagatte kudasai.',
      },
      {
        japanese: '頭が痛いので、今日は少し早く帰ってもいいですか。',
        english: 'Because I have a headache, may I go home a little early today?',
        romaji: 'Atama ga itai node, kyou wa sukoshi hayaku kaette mo ii desu ka.',
      },
    ],
    drill: [
      {
        question: 'Q: 明日は試験が＿＿＿＿、今夜は早く寝てください。',
        options: ['あるから', 'あるので', 'あって', 'あるなら'],
        answerIndex: 0,
        explanation: 'Commands and strong suggestions (〜てください) naturally pair with から rather than the objective ので.',
      },
    ],
  },
  {
    id: 'g-hou-ga-ii',
    title: 'Giving Advice: 〜たほうがいい / 〜ないほうがいい',
    japanese: 'Verb-た + ほうがいい / Verb-ない + ほうがいい',
    furigana: '動詞た形 + 方がいい / 動詞ない形 + 方がいい',
    level: 'N5',
    meaning: 'You should do / It is better to do (Advice & recommendation)',
    formation: [
      'Verb (Ta-form past) + ほうがいい (You should do X)',
      'Verb (Nai-form negative) + ほうがいい (You shouldn\'t do X)',
    ],
    explanation: 'Used when comparing two potential paths and advising the superior one. In Japanese, the affirmative uses the past Ta-form (食べたほうがいい) because you are conceptualizing the action as already completed and favorable.',
    nuanceNotes: 'This construction carries direct advisory weight. When giving polite advice to a superior or customer, soften with 〜てはいかがでしょうか or 〜たらどうでしょうか instead.',
    examples: [
      {
        japanese: '熱があるなら、今日は病院に行ったほうがいいですよ。',
        english: 'If you have a fever, you should go to the hospital today.',
        romaji: 'Netsu ga aru nara, kyou wa byouin ni itta hou ga ii desu yo.',
      },
      {
        japanese: '夜遅くにお菓子を食べないほうがいいです。',
        english: 'It is better not to eat sweets late at night.',
        romaji: 'Yoru osoku ni okashi o tabenai hou ga ii desu.',
      },
    ],
    drill: [
      {
        question: 'Q: 風邪のときは、温かいお茶を＿＿＿＿ほうがいいです。',
        options: ['飲んだ', '飲む', '飲んで', '飲まない'],
        answerIndex: 0,
        explanation: 'Affirmative recommendation requires Verb-Ta form: 飲んだほうがいいです.',
      },
    ],
  },
  {
    id: 'g-nagara',
    title: 'Simultaneous Actions: 〜ながら',
    japanese: 'Verb [Stem] + ながら',
    furigana: '動詞連用形 + ながら',
    level: 'N4',
    meaning: 'While doing X, simultaneously doing Y (Primary focus on Y)',
    formation: [
      'Verb Stem (Masu-stem without masu) + ながら + Main Verb',
      'Example: 音楽を聞きながら (while listening to music) 勉強する (study)',
    ],
    explanation: 'The action before ながら is secondary; the main primary action is the second verb at the end of the clause. Both actions must be performed by the SAME subject.',
    nuanceNotes: 'If two different people are doing different actions at the same time, use 〜間に (aida ni) instead of ながら.',
    examples: [
      {
        japanese: '毎朝、コーヒーを飲みながら新聞を読みます。',
        english: 'Every morning, while drinking coffee, I read the newspaper.',
        romaji: 'Maiasa, koohii o nominagara shinbun o yomimasu.',
      },
      {
        japanese: '歩きながらスマートフォンを使わないでください。',
        english: 'Please do not use your smartphone while walking.',
        romaji: 'Arukinagara sumaatofon o tsukawanaide kudasai.',
      },
    ],
    drill: [
      {
        question: 'Q: 彼はいつも音楽を＿＿＿＿ながらジョギングをしています。',
        options: ['聞き', '聞いて', '聞く', '聞かない'],
        answerIndex: 0,
        explanation: 'ながら attaches directly to the verb stem (聞きます -> 聞き).',
      },
    ],
  },
  {
    id: 'g-tameni-youni',
    title: 'Purpose: 〜ために vs 〜ように',
    japanese: '〜ために / 〜ように',
    furigana: '〜ために / 〜ように',
    level: 'N3',
    meaning: 'In order to / So that (Volitional action vs State beyond direct control)',
    formation: [
      'Volitional Verb (Dictionary form) / Noun + の + ために (Deliberate goal directly within actor control)',
      'Non-volitional / Potential Verb / Negative Verb + ように (Aiming toward a desirable state or result)',
    ],
    explanation: 'ために requires direct intention and control (e.g. 日本へ行くために貯金する = saving money in order to go to Japan). ように is used with potential forms (話せるように = so that I can speak) or negative verbs (忘れないように = so that I don\'t forget), where the result is an outcome you desire but cannot directly command by a single physical act.',
    nuanceNotes: 'If the verb is in potential form (読める, 話せる, 見える), you MUST use ように, never ために.',
    examples: [
      {
        japanese: '日本で働くために、毎日真面目に日本語を勉強しています。',
        english: 'In order to work in Japan (deliberate volitional goal), I study Japanese diligently every day.',
        romaji: 'Nihon de hataraku tame ni, mainichi majime ni nihongo o benkyou shite imasu.',
      },
      {
        japanese: '後ろの席の人にもよく聞こえるように、大きな声で話しました。',
        english: 'I spoke loudly so that even people in the back seats could hear (potential outcome).',
        romaji: 'Ushiro no seki no hito ni mo yoku kikoeru you ni, ookina koe de hanashimashita.',
      },
    ],
    drill: [
      {
        question: 'Q: 約束の時間を忘れない＿＿＿＿、手帳にメモを書きました。',
        options: ['ように', 'ために', 'ことに', 'そうに'],
        answerIndex: 0,
        explanation: 'With negative verbs (忘れない), you express avoiding an unwanted outcome, so you use ように.',
      },
    ],
  },
];
