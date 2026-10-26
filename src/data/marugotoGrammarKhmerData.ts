/**
 * Comprehensive Grammar Explanations with Khmer (ភាសាខ្មែរ) & English for Marugoto A2-1 Rikai Lessons 1–18
 */

export interface GrammarConjugationRow {
  formName: string; // e.g. "Positive (affirmative)", "Negative", "Past", "Question"
  khmerFormName: string; // e.g. "ស្រប", "បដិសេធ", "អតីតកាល", "សំណួរ"
  japanese: string;
  romaji: string;
  english: string;
  khmer: string;
}

export interface GrammarExampleItem {
  japanese: string;
  romaji: string;
  english: string;
  khmer: string; // Khmer translation
}

export interface GrammarPracticeItem {
  id: string;
  instruction: string;
  khmerInstruction: string;
  prompt: string;
  type: 'choice' | 'fill' | 'order';
  options: string[];
  correctAnswer: string;
  explanationEn: string;
  explanationKm: string;
}

export interface DetailedGrammarPoint {
  id: string;
  pattern: string; // e.g. "〜に すんでいます / 〜で はたらいています"
  englishMeaning: string;
  englishExplanation: string;
  khmerExplanation: string; // Khmer detailed explanation
  formationRulesEn: string[];
  formationRulesKm: string[]; // Khmer rules
  usageNotesEn?: string;
  usageNotesKm?: string; // Khmer usage notes
  conjugationTable?: GrammarConjugationRow[];
  particleFunctions?: { particle: string; functionEn: string; functionKm: string; example: string }[];
  examples: GrammarExampleItem[];
  commonMistakes?: { wrong: string; correct: string; reasonEn: string; reasonKm: string }[];
  comparison?: { otherPattern: string; distinctionEn: string; distinctionKm: string };
  practiceExercises: GrammarPracticeItem[];
}

export interface LessonGrammarExplanation {
  lessonNumber: number;
  topicNumber: number;
  lessonTitleJp: string;
  lessonTitleEn: string;
  lessonTitleKm: string;
  grammarPoints: DetailedGrammarPoint[];
}

export const MARUGOTO_GRAMMAR_KHMER: LessonGrammarExplanation[] = [
  // =========================================================================
  // LESSON 1: 東京に すんでいます
  // =========================================================================
  {
    lessonNumber: 1,
    topicNumber: 1,
    lessonTitleJp: 'だい1か 東京に すんでいます',
    lessonTitleEn: 'Lesson 1: I Live in Tokyo',
    lessonTitleKm: 'មេរៀនទី ១៖ ខ្ញុំរស់នៅទីក្រុងតូក្យូ',
    grammarPoints: [
      {
        id: 'g1-1',
        pattern: 'N(ទីកន្លែង) に すんでいます / N(កន្លែងធ្វើការ) で はたらいています',
        englishMeaning: 'Live in [place] / Work at [workplace]',
        englishExplanation: 'Use 〜に すんでいます (Verb-ています) to express where you currently reside as an ongoing state. Use 〜で はたらいています to indicate where you carry out work activities.',
        khmerExplanation: 'ទម្រង់「〜に すんでいます」ប្រើសម្រាប់បញ្ជាក់ពីទីកន្លែងដែលយើងកំពុងរស់នៅ (ជាសភាពបន្ត) ដោយប្រើធ្នាក់「に」។ ចំណែក「〜で はたらいています」ប្រើសម្រាប់បញ្ជាក់ពីទីកន្លែងដែលយើងធ្វើការងារសកម្ម ដោយប្រើធ្នាក់「で」។',
        formationRulesEn: [
          'Place + に + すんでいます (Live in...)',
          'Company / Workplace + で + はたらいています (Work at...)',
        ],
        formationRulesKm: [
          'ទីកន្លែងរស់នៅ + に + すんでいます (រស់នៅ...)',
          'កន្លែងធ្វើការ/ក្រុមហ៊ុន + で + はたらいています (ធ្វើការនៅ...)',
        ],
        usageNotesEn: 'すむ (to live) indicates settling in a location, so the particle に marks the point of existence. はたらく (to work) is an action, so で marks the location where the action occurs.',
        usageNotesKm: 'កិរិយាសព្ទ すむ (រស់នៅ) បង្ហាញពីទីតាំងស្ថិតនៅ ដូច្នេះត្រូវប្រើធ្នាក់ に។ រីឯ はたらく (ធ្វើការ) ជាសកម្មភាព ដូច្នេះត្រូវប្រើធ្នាក់ で ដើម្បីបញ្ជាក់ពីកន្លែងធ្វើសកម្មភាព។',
        conjugationTable: [
          { formName: 'Affirmative (ស្រប)', khmerFormName: 'ទម្រង់ស្រប', japanese: 'すんでいます / はたらいています', romaji: 'sunde imasu / hataraite imasu', english: 'live in / work at', khmer: 'រស់នៅ / ធ្វើការនៅ' },
          { formName: 'Negative (បដិសេធ)', khmerFormName: 'ទម្រង់បដិសេធ', japanese: 'すんでいません / はたらいていません', romaji: 'sunde imasen / hataraite imasen', english: 'do not live / do not work', khmer: 'មិនរស់នៅ / មិនធ្វើការ' },
          { formName: 'Question (សំណួរ)', khmerFormName: 'ទម្រង់សំណួរ', japanese: 'どこに すんでいますか / どこで はたらいていますか', romaji: 'doko ni sunde imasu ka / doko de hataraite imasu ka', english: 'Where do you live? / Where do you work?', khmer: 'តើអ្នករស់នៅឯណា? / តើអ្នកធ្វើការនៅឯណា?' },
        ],
        particleFunctions: [
          { particle: 'に', functionEn: 'Marks destination or static location of living', functionKm: 'បញ្ជាក់ទីតាំងរស់នៅ', example: '東京に すんでいます' },
          { particle: 'で', functionEn: 'Marks the location where an activity takes place', functionKm: 'បញ្ជាក់ទីកន្លែងដែលសកម្មភាពប្រព្រឹត្តទៅ', example: 'ホテルで はたらいています' },
        ],
        examples: [
          { japanese: '私は 東京に すんでいます。', romaji: 'Watashi wa Toukyou ni sunde imasu.', english: 'I live in Tokyo.', khmer: 'ខ្ញុំរស់នៅទីក្រុងតូក្យូ។' },
          { japanese: '兄は 中国に すんでいます。車の 会社で はたらいています。', romaji: 'Ani wa Chuugoku ni sunde imasu. Kuruma no kaisha de hataraite imasu.', english: 'My older brother lives in China. He works at a car company.', khmer: 'បងប្រុសរបស់ខ្ញុំរស់នៅប្រទេសចិន។ គាត់ធ្វើការនៅក្រុមហ៊ុនឡាន។' },
          { japanese: '母は 仕事は していません。主婦です。', romaji: 'Haha wa shigoto wa shite imasen. Shufu desu.', english: 'My mother is not working. She is a homemaker.', khmer: 'ម្ដាយរបស់ខ្ញុំមិនធ្វើការទេ។ គាត់ជាមេផ្ទះ។' },
        ],
        commonMistakes: [
          { wrong: '東京で すんでいます。', correct: '東京に すんでいます。', reasonEn: 'すむ takes particle に, not で.', reasonKm: 'កិរិយាសព្ទ すむ ត្រូវប្រើជាមួយធ្នាក់ に មិនមែន で ទេ។' },
          { wrong: 'ホテルに はたらいています。', correct: 'ホテルで はたらいています。', reasonEn: 'はたらく takes particle で, not に.', reasonKm: 'កិរិយាសព្ទ はたらく ជាសកម្មភាពការងារ ត្រូវប្រើធ្នាក់ で។' },
        ],
        comparison: {
          otherPattern: '〜に います (Be in a place)',
          distinctionEn: '〜に います only means existing in a place right now, while 〜に すんでいます means residing permanently or semi-permanently.',
          distinctionKm: '〜に います មានន័យត្រឹមតែនៅទីនោះបណ្ដោះអាសន្ន រីឯ 〜に すんでいます មានន័យថារស់នៅទីនោះយូរអង្វែង។',
        },
        practiceExercises: [
          {
            id: 'gp1-1-1',
            instruction: 'Choose the correct particle.',
            khmerInstruction: 'ជ្រើសរើសធ្នាក់ត្រឹមត្រូវ',
            prompt: 'マリアさんは 大阪 (　) すんでいます。',
            type: 'choice',
            options: ['に', 'で', 'を', 'へ'],
            correctAnswer: 'に',
            explanationEn: 'Location of living takes に: 大阪に すんでいます.',
            explanationKm: 'ទីតាំងរស់នៅត្រូវប្រើធ្នាក់ に៖ 大阪に すんでいます (រស់នៅអូសាកា)។',
          },
          {
            id: 'gp1-1-2',
            instruction: 'Choose the correct particle for work location.',
            khmerInstruction: 'ជ្រើសរើសធ្នាក់សម្រាប់កន្លែងធ្វើការ',
            prompt: '父は 銀行 (　) はたらいています。',
            type: 'choice',
            options: ['で', 'に', 'と', 'が'],
            correctAnswer: 'で',
            explanationEn: 'Location of active employment takes で: 銀行で はたらいています.',
            explanationKm: 'កន្លែងធ្វើការងារត្រូវប្រើធ្នាក់ で៖ 銀行で はたらいています (ធ្វើការនៅធនាគារ)។',
          },
        ],
      },
      {
        id: 'g1-2',
        pattern: 'N(ភាសា) が できます / N(ភាសា) で 話します',
        englishMeaning: 'Can speak [language] / Speak in [language]',
        englishExplanation: 'Use が できます to express language ability. Use で 話します to specify the language medium used for conversation.',
        khmerExplanation: 'ទម្រង់「〜が できます」ប្រើដើម្បីបញ្ជាក់ពីសមត្ថភាពចេះភាសា (ចេះភាសា...)។ រីឯ「〜で 話します」ប្រើដើម្បីបញ្ជាក់ពីភាសាដែលយកមកប្រើក្នុងការសន្ទនា (និយាយជាភាសា...)។',
        formationRulesEn: [
          'Language + が + できます (Can speak / understand [language])',
          'Language + で + 話します (Speak using [language])',
        ],
        formationRulesKm: [
          'ឈ្មោះភាសា + が + できます (ចេះភាសា...)',
          'ឈ្មោះភាសា + で + 話します (និយាយជាភាសា...)',
        ],
        usageNotesEn: 'できます expresses capability/potential. The particle が marks the target of ability. で marks the tool/instrument or medium.',
        usageNotesKm: 'できます បង្ហាញពីសមត្ថភាព ដែលទាមទារធ្នាក់ が។ ចំណែក で ដើរតួជាឧបករណ៍ ឬមធ្យោបាយក្នុងការប្រាស្រ័យទាក់ទង។',
        examples: [
          { japanese: '私は 日本語と 英語が できます。', romaji: 'Watashi wa nihongo to eigo ga dekimasu.', english: 'I can speak Japanese and English.', khmer: 'ខ្ញុំចេះភាសាជប៉ុន និងភាសាអង់គ្លេស។' },
          { japanese: '家族とは クメール語で 話します。', romaji: 'Kazoku to wa Kumeerugo de hanashimasu.', english: 'I speak with my family in Khmer.', khmer: 'ខ្ញុំនិយាយជាមួយក្រុមគ្រួសារជាភាសាខ្មែរ។' },
        ],
        practiceExercises: [
          {
            id: 'gp1-2-1',
            instruction: 'Select the right particle for ability.',
            khmerInstruction: 'ជ្រើសរើសធ្នាក់សម្រាប់សមត្ថភាពភាសា',
            prompt: 'キムさんは 韓国語 (　) できます。',
            type: 'choice',
            options: ['が', 'を', 'に', 'で'],
            correctAnswer: 'が',
            explanationEn: 'Ability target takes が: 韓国語が できます.',
            explanationKm: 'គោលនៃសមត្ថភាពត្រូវប្រើធ្នាក់ が៖ 韓国語が できます (ចេះភាសាកូរ៉េ)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 2: しゅみは クラシックを 聞くことです
  // =========================================================================
  {
    lessonNumber: 2,
    topicNumber: 1,
    lessonTitleJp: 'だい2か しゅみは クラシックを 聞くことです',
    lessonTitleEn: 'Lesson 2: My Hobby is Listening to Classical Music',
    lessonTitleKm: 'មេរៀនទី ២៖ ចំណង់ចំណូលចិត្តរបស់ខ្ញុំគឺស្ដាប់ភ្លេងបុរាណ',
    grammarPoints: [
      {
        id: 'g2-1',
        pattern: 'しゅみは V-ること です (Nominalized Verb + こと)',
        englishMeaning: 'My hobby is doing [verb]',
        englishExplanation: 'In Japanese, the predicate after 〜は must be a noun when describing a hobby. To turn a verb into a noun phrase, add こと to its dictionary form (e.g. きく ➔ きくこと).',
        khmerExplanation: 'នៅក្នុងភាសាជប៉ុន ដើម្បីប្រាប់ពីចំណង់ចំណូលចិត្ត យើងត្រូវបម្លែងកិរិយាសព្ទឲ្យទៅជានាម ដោយយកកិរិយាសព្ទទម្រង់វចនានុក្រម (Dictionary form) បូកនឹង「こと」 (ឧទាហរណ៍៖ 聞く ➔ 聞くこと = ការស្ដាប់)។',
        formationRulesEn: [
          'しゅみは + Verb (Dictionary form) + こと + です',
          'Examples: 見る ➔ 見ること, 撮る ➔ 撮ること, 作る ➔ 作ること',
        ],
        formationRulesKm: [
          'しゅみは + កិរិយាសព្ទ (Dictionary form) + こと + です',
          'ឧទាហរណ៍៖ 食べる ➔ 食べること (ការញ៉ាំ), 泳ぐ ➔ 泳ぐこと (ការហែលទឹក)',
        ],
        usageNotesEn: 'Do NOT say "しゅみは 音楽を 聞きます です". The verb must be nominalized with こと before です.',
        usageNotesKm: 'កុំនិយាយថា「しゅみは 音楽を聞きますです」ឲ្យសោះ! ត្រូវតែបម្លែងកិរិយាសព្ទទៅជាទម្រង់វចនានុក្រម រួចថែម こと សិន។',
        examples: [
          { japanese: '私の しゅみは クラシックを 聞くことです。', romaji: 'Watashi no shumi wa kurashikku o kiku koto desu.', english: 'My hobby is listening to classical music.', khmer: 'ចំណង់ចំណូលចិត្តរបស់ខ្ញុំគឺស្ដាប់ភ្លេងបុរាណ។' },
          { japanese: 'しゅみは 写真を 撮ることです。', romaji: 'Shumi wa shashin o toru koto desu.', english: 'My hobby is taking photos.', khmer: 'ចំណង់ចំណូលចិត្តរបស់ខ្ញុំគឺការថតរូប។' },
          { japanese: 'しゅみは 料理を 作ることです。', romaji: 'Shumi wa ryouri o tsukuru koto desu.', english: 'My hobby is cooking food.', khmer: 'ចំណង់ចំណូលចិត្តរបស់ខ្ញុំគឺការធ្វើម្ហូប។' },
        ],
        practiceExercises: [
          {
            id: 'gp2-1-1',
            instruction: 'Choose the correct form for expressing hobby.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់ត្រឹមត្រូវដើម្បីប្រាប់ពីចំណង់ចំណូលចិត្ត',
            prompt: '私の しゅみは 絵を (　) ことです。',
            type: 'choice',
            options: ['かく', 'かきます', 'かいて', 'かいた'],
            correctAnswer: 'かく',
            explanationEn: 'Must use dictionary form before こと: かくこと.',
            explanationKm: 'ត្រូវប្រើកិរិយាសព្ទទម្រង់វចនានុក្រមមុន こと៖ かく (គូរ) ➔ かくこと (ការគូរ)។',
          },
        ],
      },
      {
        id: 'g2-2',
        pattern: '〜とき (Nのとき / イAとき / ナAなとき)',
        englishMeaning: 'When... / At the time of...',
        englishExplanation: 'Used to indicate the time or stage of life when an action took place. Connects directly to I-adjectives, adds な for Na-adjectives, and adds の for nouns.',
        khmerExplanation: 'ប្រើសម្រាប់បញ្ជាក់ពីពេលវេលា ឬកាលបរិច្ឆេទនៃសកម្មភាពណាមួយ (នៅពេលដែល...)។ បើនាមត្រូវថែម の (កាលនៅក្មេង = こどもの とき) បើគុណនាម Na ត្រូវថែម な (ពេលទំនេរ = ひまな とき)។',
        formationRulesEn: [
          'Noun + の + とき (e.g. こどもの とき)',
          'I-adjective + とき (e.g. わかい とき)',
          'Na-adjective + な + とき (e.g. ひまな とき)',
        ],
        formationRulesKm: [
          'នាម + の + とき (ឧ. こどものとき = កាលនៅក្មេង)',
          'គុណនាម -I + とき (ឧ. わかいとき = កាលនៅក្មេងវ័យ)',
          'គុណនាម -Na + な + とき (ឧ. ひまなとき = ពេលទំនេរ)',
        ],
        examples: [
          { japanese: '子どもの とき、よく サッカーを しました。', romaji: 'Kodomo no toki, yoku sakkaa o shimashita.', english: 'When I was a child, I often played soccer.', khmer: 'កាលនៅពីក្មេង ខ្ញុំតែងតែលេងបាល់ទាត់។' },
          { japanese: 'ひまな とき、何を しますか。', romaji: 'Hima na toki, nani o shimasu ka.', english: 'What do you do when you are free?', khmer: 'ពេលទំនេរ តើអ្នកធ្វើអ្វីដែរ?' },
        ],
        practiceExercises: [
          {
            id: 'gp2-2-1',
            instruction: 'Choose the correct connection with とき.',
            khmerInstruction: 'ជ្រើសរើសការភ្ជាប់ត្រឹមត្រូវជាមួយ とき',
            prompt: 'ひま (　) とき、本を 読みます。',
            type: 'choice',
            options: ['な', 'の', 'に', 'で'],
            correctAnswer: 'な',
            explanationEn: 'ひま is a Na-adjective, so it connects with な: ひまな とき.',
            explanationKm: 'ひま ជាគុណនាម Na ដូច្នេះត្រូវភ្ជាប់ដោយ な៖ ひまな とき (ពេលទំនេរ)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 3: 日本はいま、春です
  // =========================================================================
  {
    lessonNumber: 3,
    topicNumber: 2,
    lessonTitleJp: 'だい3か 日本はいま、春です',
    lessonTitleEn: 'Lesson 3: It is Spring in Japan Now',
    lessonTitleKm: 'មេរៀនទី ៣៖ នៅជប៉ុនឥឡូវជារដូវផ្ការីក',
    grammarPoints: [
      {
        id: 'g3-1',
        pattern: 'イA-く なります / ナA・N-に なります (Becoming / Change of state)',
        englishMeaning: 'Become / Turn into [state]',
        englishExplanation: 'Expresses natural change or gradual transformation. I-adjectives drop い and take く. Nouns and Na-adjectives take に.',
        khmerExplanation: 'ប្រើសម្រាប់បញ្ជាក់ពីការប្រែប្រួលសភាពតាមធម្មជាតិ (ប្រែជា... / ក្លាយជា...)។ គុណនាម -I ប្តូរ い ទៅជា く (あたたかい ➔ あたたかく なります = ប្រែជាកក់ក្ដៅ)។ ចំណែកនាម និងគុណនាម -Na ត្រូវថែម に (はる ➔ はるに なります = ក្លាយជារដូវផ្ការីក)។',
        formationRulesEn: [
          'I-adj (drop い) + く + なります (e.g. あたたかく なります, すずしく なります)',
          'Na-adj + に + なります (e.g. げんきに なります)',
          'Noun + に + なります (e.g. 春に なります, 4月に なります)',
        ],
        formationRulesKm: [
          'គុណនាម -I (លុប い) + く + なります (ប្រែជា...)',
          'គុណនាម -Na / នាម + に + なります (ក្លាយជា...)',
        ],
        examples: [
          { japanese: '3月ごろ、だんだん あたたかく なります。', romaji: 'Sangatsu-goro, dandan atatakaku narimasu.', english: 'Around March, it gradually becomes warm.', khmer: 'ប្រហែលខែមីនា អាកាសធាតុចាប់ផ្ដើមប្រែជាកក់ក្ដៅបន្តិចម្ដងៗ។' },
          { japanese: '秋に なると、すずしく なります。', romaji: 'Aki ni naru to, suzushiku narimasu.', english: 'When it turns into autumn, it becomes cool.', khmer: 'ពេលចូលដល់រដូវស្លឹកឈើជ្រុះ អាកាសធាតុប្រែជាត្រជាក់ស្រួល។' },
        ],
        practiceExercises: [
          {
            id: 'gp3-1-1',
            instruction: 'Select the correct form before なります.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់ត្រឹមត្រូវមុន なります',
            prompt: 'だんだん (　) なります。',
            type: 'choice',
            options: ['さむく', 'さむい', 'さむ', 'さむに'],
            correctAnswer: 'さむく',
            explanationEn: 'さむい drops い to become さむく なります.',
            explanationKm: 'さむい (ត្រជាក់) ត្រូវលុប い ថែម く ➔ さむく なります (ប្រែជាត្រជាក់)។',
          },
        ],
      },
      {
        id: 'g3-2',
        pattern: '〜から (Expressing Reason)',
        englishMeaning: 'Because... / Since...',
        englishExplanation: 'から attaches to a clause to indicate the reason or cause for a preference or action.',
        khmerExplanation: 'ប្រើ「〜から」នៅខាងចុងល្បះដើម្បីបញ្ជាក់ពីមូលហេតុ ឬហេតុផល (ពីព្រោះ... / ដោយសារតែ...)។',
        formationRulesEn: ['Sentence (Reason) + から、Sentence (Result)'],
        formationRulesKm: ['ល្បះបញ្ជាក់ហេតុផល + から、ល្បះបញ្ជាក់លទ្ធផល'],
        examples: [
          { japanese: '果物が おいしいですから、秋が いちばん 好きです。', romaji: 'Kudamono ga oishii desu kara, aki ga ichiban suki desu.', english: 'Because fruits are delicious, I like autumn the most.', khmer: 'ពីព្រោះផ្លែឈើមានរសជាតិឆ្ងាញ់ ដូច្នេះខ្ញុំចូលចិត្តរដូវស្លឹកឈើជ្រុះជាងគេ។' },
        ],
        practiceExercises: [
          {
            id: 'gp3-2-1',
            instruction: 'Choose the correct reason particle.',
            khmerInstruction: 'ជ្រើសរើសធ្នាក់បញ្ជាក់ហេតុផល',
            prompt: 'すずしいです (　)、秋が 好きです。',
            type: 'choice',
            options: ['から', 'けど', 'ので', 'まで'],
            correctAnswer: 'から',
            explanationEn: 'から explains why: "Because it is cool, I like autumn."',
            explanationKm: 'から បញ្ជាក់ហេតុផល៖ ដោយសារត្រជាក់ស្រួល ទើបចូលចិត្តរដូវស្លឹកឈើជ្រុះ។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 4: ここに ごみを すてないでください
  // =========================================================================
  {
    lessonNumber: 4,
    topicNumber: 2,
    lessonTitleJp: 'だい4か すきな きせつは いつですか',
    lessonTitleEn: 'Lesson 4: What is Your Favorite Season?',
    lessonTitleKm: 'មេរៀនទី ៤៖ តើអ្នកចូលចិត្តរដូវណាជាងគេ?',
    grammarPoints: [
      {
        id: 'g4-1',
        pattern: 'イA-くて / ナA・N-で (Connecting Adjectives)',
        englishMeaning: 'And... (Describing multiple traits)',
        englishExplanation: 'To link multiple adjectives or descriptions, change い to くて for I-adjectives, and add で for Na-adjectives and Nouns.',
        khmerExplanation: 'ដើម្បីភ្ជាប់គុណនាមច្រើនបញ្ចូលគ្នា (ហើយ... / ព្រមទាំង...)៖ គុណនាម -I ត្រូវប្តូរ い ទៅជា くて (あたたかくて = កក់ក្ដៅហើយ...)។ ចំណែកគុណនាម -Na និងនាម ត្រូវថែម で (きれいで = ស្រស់ស្អាតហើយ...)។',
        formationRulesEn: [
          'I-adj: [Stem] + くて (e.g. あたたかい ➔ あたたかくて)',
          'Na-adj: [Stem] + で (e.g. 静か ➔ 静かで)',
        ],
        formationRulesKm: [
          'គុណនាម -I: លុប い ថែម くて',
          'គុណនាម -Na: ថែម で',
        ],
        examples: [
          { japanese: '春は あたたかくて、花が きれいです。', romaji: 'Haru wa atatakakute, hana ga kirei desu.', english: 'Spring is warm, and the flowers are beautiful.', khmer: 'រដូវផ្ការីកមានអាកាសធាតុកក់ក្ដៅ ហើយផ្កាក៏ស្រស់ស្អាតទៀតផង។' },
          { japanese: '冬は さむくて、雪が ふります。', romaji: 'Fuyu wa samukute, yuki ga furimasu.', english: 'Winter is cold, and snow falls.', khmer: 'រដូវរងាមានអាកាសធាតុត្រជាក់ ហើយមានធ្លាក់ព្រិលទៀតផង។' },
        ],
        practiceExercises: [
          {
            id: 'gp4-1-1',
            instruction: 'Connect the adjectives correctly.',
            khmerInstruction: 'ភ្ជាប់គុណនាមឲ្យបានត្រឹមត្រូវ',
            prompt: 'この町は 静か (　)、きれいです。',
            type: 'choice',
            options: ['で', 'くて', 'に', 'と'],
            correctAnswer: 'で',
            explanationEn: '静か is a Na-adjective, so it connects with で.',
            explanationKm: '静か (ស្ងប់ស្ងាត់) ជាគុណនាម Na ដូច្នេះភ្ជាប់ដោយ で (静かで)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 5: どんな 町ですか
  // =========================================================================
  {
    lessonNumber: 5,
    topicNumber: 3,
    lessonTitleJp: 'だい5か どんな 町ですか',
    lessonTitleEn: 'Lesson 5: What Kind of Town is It?',
    lessonTitleKm: 'មេរៀនទី ៥៖ តើទីក្រុងនោះមានលក្ខណៈបែបណាដែរ?',
    grammarPoints: [
      {
        id: 'g5-1',
        pattern: 'N に N が あります / います (Existence in Location)',
        englishMeaning: 'There is [object/person] in [place]',
        englishExplanation: 'Use あります for inanimate objects and buildings. Use います for living beings (people and animals).',
        khmerExplanation: 'ទម្រង់「〜に 〜が あります/います」ប្រើដើម្បីប្រាប់ថាមានអ្វីនៅទីណា។ ប្រើ あります សម្រាប់វត្ថុអរូបី អគារ ឬរបស់គ្មានជីវិត។ ប្រើ います សម្រាប់មនុស្ស និងសត្វ (របស់មានជីវិត)។',
        formationRulesEn: [
          'Place + に + Object + が + あります (Inanimate)',
          'Place + に + Person/Animal + が + います (Animate)',
        ],
        formationRulesKm: [
          'ទីកន្លែង + に + វត្ថុគ្មានជីវិត + が + あります',
          'ទីកន្លែង + に + មនុស្ស/សត្វ + が + います',
        ],
        examples: [
          { japanese: '駅の 前に 大きな 公園が あります。', romaji: 'Eki no mae ni ookina kouen ga arimasu.', english: 'There is a large park in front of the station.', khmer: 'នៅខាងមុខស្ថានីយរថភ្លើងមានសួនច្បារដ៏ធំមួយ។' },
          { japanese: '池に 魚が たくさん います。', romaji: 'Ike ni sakana ga takusan imasu.', english: 'There are many fish in the pond.', khmer: 'នៅក្នុងស្រះមានត្រីជាច្រើន។' },
        ],
        practiceExercises: [
          {
            id: 'gp5-1-1',
            instruction: 'Choose between あります and います.',
            khmerInstruction: 'ជ្រើសរើសរវាង あります និង います',
            prompt: '部屋に 猫が (　)。',
            type: 'choice',
            options: ['います', 'あります', 'します', 'です'],
            correctAnswer: 'います',
            explanationEn: '猫 (cat) is a living creature, so use います.',
            explanationKm: '猫 (ឆ្មា) ជាសត្វមានជីវិត ដូច្នេះត្រូវប្រើ います។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 6: この 近くに コンビニは ありますか
  // =========================================================================
  {
    lessonNumber: 6,
    topicNumber: 3,
    lessonTitleJp: 'だい6か この 近くに コンビニは ありますか',
    lessonTitleEn: 'Lesson 6: Is There a Convenience Store Nearby?',
    lessonTitleKm: 'មេរៀនទី ៦៖ តើនៅក្បែរនេះមានហាងទំនិញងាយស្រួលដែរទេ?',
    grammarPoints: [
      {
        id: 'g6-1',
        pattern: 'N(ទីកន្លែង) の [ខាងមុខ/ខាងក្រោយ/ក្បែរ/ខាងក្នុង] に あります',
        englishMeaning: 'Position words: in front of, behind, near, inside...',
        englishExplanation: 'Specifying precise locations relative to reference landmarks using の + positional nouns.',
        khmerExplanation: 'ប្រើពាក្យបញ្ជាក់ទីតាំងដូចជា 前 (ខាងមុខ), 後ろ (ខាងក្រោយ), 隣 (ក្បែរ/ជាប់គ្នា), 近く (ក្បែរៗ) ជាមួយធ្នាក់ の។',
        formationRulesEn: ['Landmark + の + 前 / 後ろ / 隣 / 近く + に + あります'],
        formationRulesKm: ['ទីតាំងគោល + の + 前 / 後ろ / 隣 / 近く + に + あります'],
        examples: [
          { japanese: '銀行の 隣に ポストが あります。', romaji: 'Ginkou no tonari ni posuto ga arimasu.', english: 'There is a mailbox next to the bank.', khmer: 'នៅក្បែរធនាគារមានប្រអប់សំបុត្រមួយ។' },
        ],
        practiceExercises: [
          {
            id: 'gp6-1-1',
            instruction: 'Select the right positional noun.',
            khmerInstruction: 'ជ្រើសរើសពាក្យបញ្ជាក់ទីតាំងត្រឹមត្រូវ',
            prompt: '駅の (　) に タクシー乗り場が あります。',
            type: 'choice',
            options: ['前', 'へ', 'で', 'から'],
            correctAnswer: '前',
            explanationEn: '駅の前 (in front of the station).',
            explanationKm: '駅の前 (នៅខាងមុខស្ថានីយ)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 7: いっしょに 行きませんか
  // =========================================================================
  {
    lessonNumber: 7,
    topicNumber: 4,
    lessonTitleJp: 'だい7か いっしょに 行きませんか',
    lessonTitleEn: 'Lesson 7: Won\'t You Come Along With Us?',
    lessonTitleKm: 'មេរៀនទី ៧៖ តើទៅជាមួយគ្នាទេ?',
    grammarPoints: [
      {
        id: 'g7-1',
        pattern: 'V-ませんか (Polite Invitation) / V-ましょう (Accepting / Proposing)',
        englishMeaning: 'Won\'t you...? / Let\'s...',
        englishExplanation: 'V-ませんか invites someone politely while giving them room to decline comfortably. V-ましょう proposes an action enthusiastically ("Let\'s do it!").',
        khmerExplanation: 'ទម្រង់「〜ませんか」ប្រើដើម្បីអញ្ជើញ ឬបបួលនរណាម្នាក់ដោយគួរសម (តើទៅ...ជាមួយគ្នាទេ?)។ រីឯ「〜ましょう」ប្រើដើម្បីឆ្លើយយល់ព្រម ឬផ្តួចផ្តើមធ្វើអ្វីមួយ (តោះធ្វើ...!)។',
        formationRulesEn: [
          'Verb Stem + ませんか (Invitation)',
          'Verb Stem + ましょう (Let\'s...)',
        ],
        formationRulesKm: [
          'ឫសកិរិយាសព្ទ + ませんか (ការបបួល)',
          'ឫសកិរិយាសព្ទ + ましょう (តោះ... / ធ្វើ...ទៅ)',
        ],
        examples: [
          { japanese: '今週の 土曜日、いっしょに 映画を 見に 行きませんか。', romaji: 'Konshuu no doyoubi, issho ni eiga o mi ni ikimasen ka.', english: 'Won\'t you go to watch a movie together this Saturday?', khmer: 'ថ្ងៃសៅរ៍ចុងសប្ដាហ៍នេះ តើទៅមើលកុនជាមួយគ្នាទេ?' },
          { japanese: 'ええ、ぜひ 行きましょう！', romaji: 'Ee, zehi ikimashou!', english: 'Yes, let\'s definitely go!', khmer: 'បាទ/ចាស! តោះទៅ!' },
        ],
        practiceExercises: [
          {
            id: 'gp7-1-1',
            instruction: 'Choose the polite invitation form.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់បបួលដោយគួរសម',
            prompt: 'いっしょに お茶を (　)。',
            type: 'choice',
            options: ['飲みませんか', '飲みます', '飲まない', '飲みました'],
            correctAnswer: '飲みませんか',
            explanationEn: '飲みませんか invites someone politely for tea.',
            explanationKm: '飲みませんか បង្ហាញពីការបបួលផឹកតែដោយគួរសម។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 8: どうやって 行きますか
  // =========================================================================
  {
    lessonNumber: 8,
    topicNumber: 4,
    lessonTitleJp: 'だい8か どうやって 行きますか',
    lessonTitleEn: 'Lesson 8: How Do You Get There?',
    lessonTitleKm: 'មេរៀនទី ៨៖ តើទៅដោយរបៀបណាដែរ?',
    grammarPoints: [
      {
        id: 'g8-1',
        pattern: 'N(មធ្យោបាយ) で 行きます / どのくらい かかりますか',
        englishMeaning: 'Go by [transport] / How long does it take?',
        englishExplanation: 'で marks transportation means (train, bus, walking is 歩いて without で). どのくらい かかりますか asks for duration.',
        khmerExplanation: 'ធ្នាក់「で」ប្រើសម្រាប់បញ្ជាក់ពីមធ្យោបាយធ្វើដំណើរ (電車で = តាមរថភ្លើង)។ បើដើរដោយថ្មើរជើង ប្រើ「歩いて」ដោយមិនប្រើ で ទេ។ សំណួរ「どのくらい かかりますか」ប្រើសួរថាតើចំណាយពេលប៉ុន្មាន។',
        formationRulesEn: [
          'Transport + で + 行きます / 来ます',
          'Exceptions: 歩いて 行きます (on foot - no particle で)',
        ],
        formationRulesKm: [
          'មធ្យោបាយធ្វើដំណើរ + で + 行きます',
          'ករណីលើកលែង៖ 歩いて (ដើរដោយថ្មើរជើង - មិនប្រើ で ទេ)',
        ],
        examples: [
          { japanese: '新宿まで 電車で 行きます。30分くらい かかります。', romaji: 'Shinjuku made densha de ikimasu. Sanjuppun kurai kakarimasu.', english: 'I go to Shinjuku by train. It takes about 30 minutes.', khmer: 'ខ្ញុំទៅដល់ស៊ីនជូគូតាមរថភ្លើង។ ចំណាយពេលប្រហែល ៣០ នាទី។' },
        ],
        practiceExercises: [
          {
            id: 'gp8-1-1',
            instruction: 'Choose the transport particle.',
            khmerInstruction: 'ជ្រើសរើសធ្នាក់បញ្ជាក់មធ្យោបាយ',
            prompt: 'バス (　) 行きます。',
            type: 'choice',
            options: ['で', 'に', 'を', 'へ'],
            correctAnswer: 'で',
            explanationEn: 'Transportation takes で.',
            explanationKm: 'មធ្យោបាយធ្វើដំណើរប្រើធ្នាក់ で (バスで = តាមឡានក្រុង)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 9: 日本語を 勉強した ことが あります
  // =========================================================================
  {
    lessonNumber: 9,
    topicNumber: 5,
    lessonTitleJp: 'だい9か 日本語を 勉強した ことが あります',
    lessonTitleEn: 'Lesson 9: I Have Studied Japanese Before',
    lessonTitleKm: 'មេរៀនទី ៩៖ ខ្ញុំធ្លាប់រៀនភាសាជប៉ុនពីមុនមក',
    grammarPoints: [
      {
        id: 'g9-1',
        pattern: 'V-た ことが あります / ありません (Past Experience)',
        englishMeaning: 'Have done / Have never done before',
        englishExplanation: 'Use Verb past plain (Ta-form) + ことが あります to express life experience ("I have experienced doing X"). Negative is ことが ありません.',
        khmerExplanation: 'ទម្រង់「V-た ことが あります」ប្រើដើម្បីប្រាប់ពីបទពិសោធន៍ដែលធ្លាប់បានធ្វើកន្លងមកក្នុងឆាកជីវិត (ធ្លាប់...)។ បដិសេធប្រើ「V-た ことが ありません」(មិនដែលធ្លាប់...ទេ)។',
        formationRulesEn: [
          'Verb (Ta-form) + ことが あります (Have experience doing...)',
          'Verb (Ta-form) + ことが ありません (Have never done...)',
        ],
        formationRulesKm: [
          'កិរិយាសព្ទ (ទម្រង់ Ta) + ことが あります (ធ្លាប់...)',
          'កិរិយាសព្ទ (ទម្រង់ Ta) + ことが ありません (មិនដែលធ្លាប់...ទេ)',
        ],
        examples: [
          { japanese: '富士山に 登った ことが あります。', romaji: 'Fujisan ni nobotta koto ga arimasu.', english: 'I have climbed Mount Fuji before.', khmer: 'ខ្ញុំធ្លាប់ឡើងភ្នំហ្វូជីពីមុនមក។' },
          { japanese: '歌舞伎を 見た ことが ありません。', romaji: 'Kabuki o mita koto ga arimasen.', english: 'I have never watched Kabuki.', khmer: 'ខ្ញុំមិនដែលធ្លាប់មើលល្ខោនកាប៊ូគីពីមុនមកទេ។' },
        ],
        practiceExercises: [
          {
            id: 'gp9-1-1',
            instruction: 'Choose the correct form for past experience.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់ត្រឹមត្រូវសម្រាប់បទពិសោធន៍ពីមុន',
            prompt: '日本料理を (　) ことが あります。',
            type: 'choice',
            options: ['食べた', '食べる', '食べて', '食べます'],
            correctAnswer: '食べた',
            explanationEn: 'Experience requires Ta-form: 食べた ことが あります.',
            explanationKm: 'បទពិសោធន៍ត្រូវប្រើទម្រង់ Ta៖ 食べた ことが あります (ធ្លាប់ញ៉ាំ)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 10: どちらが 好きですか
  // =========================================================================
  {
    lessonNumber: 10,
    topicNumber: 5,
    lessonTitleJp: 'だい10か どちらが 好きですか',
    lessonTitleEn: 'Lesson 10: Which One Do You Prefer?',
    lessonTitleKm: 'មេរៀនទី ១០៖ តើអ្នកចូលចិត្តមួយណាជាង?',
    grammarPoints: [
      {
        id: 'g10-1',
        pattern: 'A と B と どちらが 〜ですか / A の ほうが 〜です',
        englishMeaning: 'Between A and B, which is more...? / A is more...',
        englishExplanation: 'Used for two-way comparison. どちら asks "which of the two". の ほうが indicates the favored option.',
        khmerExplanation: 'ប្រើសម្រាប់ប្រៀបធៀបរវាងជម្រើសពីរ (រវាង A និង B តើមួយណា...ជាង?)។ ចម្លើយត្រូវប្រើ「A の ほうが 〜です」(A ... ជាង)។',
        formationRulesEn: [
          'A と B と どちらが [Adjective] ですか',
          'A の ほうが [Adjective] です',
        ],
        formationRulesKm: [
          'A と B と どちらが [គុណនាម] ですか',
          'A の ほうが [គុណនាម] です',
        ],
        examples: [
          { japanese: '肉と 魚と どちらが 好きですか。― 魚の ほうが 好きです。', romaji: 'Niku to sakana to dochira ga suki desu ka? ― Sakana no hou ga suki desu.', english: 'Between meat and fish, which do you like more? ― I prefer fish.', khmer: 'រវាងសាច់ និងត្រី តើអ្នកចូលចិត្តមួយណាជាង? ― ខ្ញុំចូលចិត្តត្រីជាង។' },
        ],
        practiceExercises: [
          {
            id: 'gp10-1-1',
            instruction: 'Select the comparison particle.',
            khmerInstruction: 'ជ្រើសរើសពាក្យប្រៀបធៀបត្រឹមត្រូវ',
            prompt: '夏より 冬の (　) 好きです。',
            type: 'choice',
            options: ['ほうが', 'から', 'でも', 'ので'],
            correctAnswer: 'ほうが',
            explanationEn: '冬の ほうが (Winter is preferred).',
            explanationKm: '冬の ほうが (ចូលចិត្តរដូវរងាជាង)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 11: バーベキューを しましょう
  // =========================================================================
  {
    lessonNumber: 11,
    topicNumber: 6,
    lessonTitleJp: 'だい11か バーベキューを しましょう',
    lessonTitleEn: 'Lesson 11: Let\'s Have a Barbecue!',
    lessonTitleKm: 'មេរៀនទី ១១៖ តោះធ្វើសាច់អាំងបាប៊ីឃ្យូ!',
    grammarPoints: [
      {
        id: 'g11-1',
        pattern: 'V-ようと 思っています (Expressing Intention / Plan)',
        englishMeaning: 'I am thinking of doing [verb]',
        englishExplanation: 'Use Volitional form + と 思っています to express personal intention or plans you have been considering.',
        khmerExplanation: 'ទម្រង់「V-ようと 思っています」ប្រើដើម្បីបង្ហាញពីបំណង ឬគម្រោងដែលយើងកំពុងគិតចង់ធ្វើ (ខ្ញុំកំពុងគិតថានឹង...)។',
        formationRulesEn: ['Verb (Volitional form) + と 思っています'],
        formationRulesKm: ['កិរិយាសព្ទ (ទម្រង់ Volitional) + と 思っています'],
        examples: [
          { japanese: '週末に バーベキューを しようと 思っています。', romaji: 'Shuumatsu ni baabekyuu o shiyou to omotte imasu.', english: 'I am thinking of having a barbecue this weekend.', khmer: 'ខ្ញុំកំពុងគិតថានឹងធ្វើសាច់អាំងនៅចុងសប្ដាហ៍នេះ។' },
        ],
        practiceExercises: [
          {
            id: 'gp11-1-1',
            instruction: 'Select the correct volitional form.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់ Volitional ត្រឹមត្រូវ',
            prompt: '明日 新しい 靴を (　) と 思っています。',
            type: 'choice',
            options: ['買おう', '買います', '買いて', '買う'],
            correctAnswer: '買おう',
            explanationEn: 'Volitional of 買う is 買おう.',
            explanationKm: 'ទម្រង់ Volitional នៃ 買う គឺ 買おう ➔ 買おうと 思っています។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 12: おすすめの メニューは 何ですか
  // =========================================================================
  {
    lessonNumber: 12,
    topicNumber: 6,
    lessonTitleJp: 'だい12か おすすめの メニューは 何ですか',
    lessonTitleEn: 'Lesson 12: What is Your Recommended Menu?',
    lessonTitleKm: 'មេរៀនទី ១២៖ តើមានមុខម្ហូបណាណែនាំដែរទេ?',
    grammarPoints: [
      {
        id: 'g12-1',
        pattern: '〜たら どうですか (Giving a Suggestion)',
        englishMeaning: 'Why don\'t you...? / How about...?',
        englishExplanation: 'Use Verb-たら form + どうですか to suggest a course of action to someone gently.',
        khmerExplanation: 'ទម្រង់「〜たら どうですか」ប្រើដើម្បីផ្ដល់ជាយោបល់ ឬការណែនាំដល់អ្នកដទៃដោយសុភាព (ចុះបើ...យ៉ាងម៉េចដែរ?)។',
        formationRulesEn: ['Verb (Tara-form past) + どうですか'],
        formationRulesKm: ['កិរិយាសព្ទ (ទម្រង់ Tara) + どうですか'],
        examples: [
          { japanese: 'この ラーメンを 食べたら どうですか。とても おいしいですよ。', romaji: 'Kono raamen o tabetara dou desu ka. Totemo oishii desu yo.', english: 'Why don\'t you try this ramen? It\'s very delicious!', khmer: 'ចុះបើញ៉ាំមីរ៉ាមេនមួយនេះវិញយ៉ាងម៉េចដែរ? ឆ្ងាញ់ណាស់ណា៎!' },
        ],
        practiceExercises: [
          {
            id: 'gp12-1-1',
            instruction: 'Choose the suggestion form.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់ផ្ដល់យោបល់',
            prompt: '店の人に (　) どうですか。',
            type: 'choice',
            options: ['聞いたら', '聞く', '聞いて', '聞きます'],
            correctAnswer: '聞いたら',
            explanationEn: '聞く in Tara-form is 聞いたら.',
            explanationKm: '聞く ប្តូរជាទម្រង់ Tara គឺ 聞いたら ➔ 聞いたら どうですか (ចុះបើសួរគេមើល៍?)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 13: 出張の 準備を しています
  // =========================================================================
  {
    lessonNumber: 13,
    topicNumber: 7,
    lessonTitleJp: 'だい13か 出張の 準備を しています',
    lessonTitleEn: 'Lesson 13: I am Preparing for a Business Trip',
    lessonTitleKm: 'មេរៀនទី ១៣៖ ខ្ញុំកំពុងរៀបចំខ្លួនទៅបំពេញបេសកកម្មការងារ',
    grammarPoints: [
      {
        id: 'g13-1',
        pattern: 'もう V-ました / まだ V-ていません (Already vs Not Yet)',
        englishMeaning: 'Have already done / Have not done yet',
        englishExplanation: 'もう indicates an action has already finished. まだ with negative -ていません indicates it hasn\'t happened yet.',
        khmerExplanation: 'ប្រើ「もう 〜ました」ដើម្បីប្រាប់ថាសកម្មភាពបានរួចរាល់ហើយ (រួចហើយ)។ រីឯ「まだ 〜ていません」ប្រាប់ថាមិនទាន់បានធ្វើនៅឡើយទេ (មិនទាន់...ទេ)។',
        formationRulesEn: [
          'もう + Verb (Past Masu-form: ました)',
          'まだ + Verb (Te-form: ていません)',
        ],
        formationRulesKm: [
          'もう + កិរិយាសព្ទ (ました)',
          'まだ + កិរិយាសព្ទ (ていません)',
        ],
        examples: [
          { japanese: 'チケットは もう 買いましたか。― いいえ、まだ 買っていません。', romaji: 'Chiketto wa mou kaimashita ka? ― Iie, mada katte imasen.', english: 'Have you already bought the tickets? ― No, not yet.', khmer: 'តើអ្នកបានទិញសំបុត្ររួចហើយឬនៅ? ― ទេ ខ្ញុំមិនទាន់បានទិញនៅឡើយទេ។' },
        ],
        practiceExercises: [
          {
            id: 'gp13-1-1',
            instruction: 'Select the correct "not yet" form.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់ "មិនទាន់" ត្រឹមត្រូវ',
            prompt: 'ホテルの 予約は まだ (　)。',
            type: 'choice',
            options: ['していません', 'しません', 'しました', 'しています'],
            correctAnswer: 'していません',
            explanationEn: 'まだ requires ていません: まだ していません (haven\'t done yet).',
            explanationKm: 'まだ ត្រូវប្រើជាមួយ ていません៖ まだ していません (មិនទាន់បានកក់ទេ)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 14: メールを 送る ことが できます
  // =========================================================================
  {
    lessonNumber: 14,
    topicNumber: 7,
    lessonTitleJp: 'だい14か メールを 送る ことが できます',
    lessonTitleEn: 'Lesson 14: I Can Send an Email',
    lessonTitleKm: 'មេរៀនទី ១៤៖ ខ្ញុំអាចផ្ញើអ៊ីមែលបាន',
    grammarPoints: [
      {
        id: 'g14-1',
        pattern: 'V-る ことが できます (Potential / Ability with Verb)',
        englishMeaning: 'Can do [verb] / It is possible to do',
        englishExplanation: 'Dictionary form + ことが できます expresses capability to execute an action.',
        khmerExplanation: 'ទម្រង់「កិរិយាសព្ទវចនានុក្រម + ことが できます」ប្រើសម្រាប់បញ្ជាក់ពីសមត្ថភាព ឬលទ្ធភាពអាចធ្វើអ្វីមួយបាន (អាច...បាន)។',
        formationRulesEn: ['Verb (Dictionary form) + ことが できます'],
        formationRulesKm: ['កិរិយាសព្ទ (Dictionary form) + ことが できます'],
        examples: [
          { japanese: 'ここで 無料の Wi-Fiを 使う ことが できます。', romaji: 'Koko de muryou no Wi-Fi o tsukau koto ga dekimasu.', english: 'You can use free Wi-Fi here.', khmer: 'អ្នកអាចប្រើប្រាស់ Wi-Fi ឥតគិតថ្លៃនៅទីនេះបាន។' },
        ],
        practiceExercises: [
          {
            id: 'gp14-1-1',
            instruction: 'Choose the potential verb structure.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់កិរិយាសព្ទសមត្ថភាព',
            prompt: '日本語で レポートを (　) ことが できます。',
            type: 'choice',
            options: ['書く', '書きます', '書いて', '書いた'],
            correctAnswer: '書く',
            explanationEn: 'Must use dictionary form 書く before ことが できます.',
            explanationKm: 'ត្រូវប្រើទម្រង់វចនានុក្រម 書く មុន ことが できます (អាចសរសេរបាន)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 15: 病院に 行った ほうが いいですよ
  // =========================================================================
  {
    lessonNumber: 15,
    topicNumber: 8,
    lessonTitleJp: 'だい15か 病院に 行った ほうが いいですよ',
    lessonTitleEn: 'Lesson 15: You Had Better Go to the Hospital',
    lessonTitleKm: 'មេរៀនទី ១៥៖ អ្នកគួរតែទៅមន្ទីរពេទ្យល្អជាង',
    grammarPoints: [
      {
        id: 'g15-1',
        pattern: 'V-た ほうが いいです / V-ない ほうが いいです (Giving Advice)',
        englishMeaning: 'You should do / You had better not do',
        englishExplanation: 'Use Verb-Ta form + ほうが いいです to strongly advise someone to do something. For negative advice, use Verb-Nai form.',
        khmerExplanation: 'ទម្រង់「V-た ほうが いいです」ប្រើសម្រាប់ផ្ដល់ដំបូន្មានយ៉ាងម៉ឺងម៉ាត់ (គួរតែ...ល្អជាង)។ បើជាដំបូន្មានមិនគួរធ្វើ ប្រើ「V-ない ほうが いいです」(កុំ...ល្អជាង)។',
        formationRulesEn: [
          'Verb (Ta-form past) + ほうが いいです (Should do)',
          'Verb (Nai-form negative) + ほうが いいです (Should not do)',
        ],
        formationRulesKm: [
          'កិរិយាសព្ទ (Ta-form) + ほうが いいです (គួរតែ...)',
          'កិរិយាសព្ទ (Nai-form) + ほうが いいです (មិនគួរ...)',
        ],
        examples: [
          { japanese: '熱が ありますから、今日は 早く 寝た ほうが いいですよ。', romaji: 'Netsu ga arimasu kara, kyou wa hayaku neta hou ga ii desu yo.', english: 'Because you have a fever, you should go to sleep early today.', khmer: 'ដោយសារអ្នកមានកម្ដៅក្ដៅខ្លួន ថ្ងៃនេះគួរតែចូលគេងឲ្យបានលឿនល្អជាង។' },
          { japanese: 'お酒を 飲まない ほうが いいです。', romaji: 'Osake o nomanai hou ga ii desu.', english: 'You had better not drink alcohol.', khmer: 'កុំពិសាគ្រឿងស្រវឹងល្អជាង។' },
        ],
        practiceExercises: [
          {
            id: 'gp15-1-1',
            instruction: 'Select the advice form.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់ផ្ដល់ដំបូន្មាន',
            prompt: '薬を (　) ほうが いいです。',
            type: 'choice',
            options: ['飲んだ', '飲む', '飲んで', '飲みます'],
            correctAnswer: '飲んだ',
            explanationEn: 'Affirmative advice takes Ta-form: 飲んだ ほうが いいです.',
            explanationKm: 'ដំបូន្មានស្របត្រូវប្រើទម្រង់ Ta៖ 飲んだ ほうが いいです (គួរលេបថ្នាំល្អជាង)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 16: 運動するように しています
  // =========================================================================
  {
    lessonNumber: 16,
    topicNumber: 8,
    lessonTitleJp: 'だい16か 運動するように しています',
    lessonTitleEn: 'Lesson 16: I Try to Exercise Regularly',
    lessonTitleKm: 'មេរៀនទី ១៦៖ ខ្ញុំតែងតែព្យាយាមហាត់ប្រាណជាប្រចាំ',
    grammarPoints: [
      {
        id: 'g16-1',
        pattern: 'V-る / V-ない ように しています (Effort to Keep a Habit)',
        englishMeaning: 'Make an effort to do / Try not to do',
        englishExplanation: 'Expresses a conscious, ongoing effort or routine habit you are maintaining.',
        khmerExplanation: 'ទម្រង់「〜ように しています」ប្រើដើម្បីបញ្ជាក់ពីការខិតខំប្រឹងប្រែងធ្វើអ្វីមួយជាទម្លាប់ប្រចាំថ្ងៃ (តែងតែព្យាយាម... / ព្យាយាមមិន...)។',
        formationRulesEn: [
          'Verb (Dictionary form) + ように しています',
          'Verb (Nai-form) + ように しています',
        ],
        formationRulesKm: [
          'កិរិយាសព្ទ (Dictionary form) + ように しています',
          'កិរិយាសព្ទ (Nai-form) + ように しています',
        ],
        examples: [
          { japanese: '毎朝、野菜ジュースを 飲むように しています。', romaji: 'Maiasa, yasai juusu o nomu you ni shite imasu.', english: 'I make an effort to drink vegetable juice every morning.', khmer: 'រៀងរាល់ព្រឹក ខ្ញុំតែងតែព្យាយាមផឹកទឹកបន្លែស្រស់។' },
        ],
        practiceExercises: [
          {
            id: 'gp16-1-1',
            instruction: 'Select the habitual effort form.',
            khmerInstruction: 'ជ្រើសរើសទម្រង់ព្យាយាមបង្កើតទម្លាប់',
            prompt: '甘い ものを 食べない (　) しています。',
            type: 'choice',
            options: ['ように', 'ために', 'ことに', 'そうに'],
            correctAnswer: 'ように',
            explanationEn: '食べないように しています (trying not to eat sweets).',
            explanationKm: '食べないように しています (ព្យាយាមមិនញ៉ាំរបស់ផ្អែម)។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 17: すてきな お祝いですね
  // =========================================================================
  {
    lessonNumber: 17,
    topicNumber: 9,
    lessonTitleJp: 'だい17か すてきな お祝いですね',
    lessonTitleEn: 'Lesson 17: What a Wonderful Celebration!',
    lessonTitleKm: 'មេរៀនទី ១៧៖ ជាការអបអរសាទរដ៏អស្ចារ្យណាស់!',
    grammarPoints: [
      {
        id: 'g17-1',
        pattern: '〜と 思います (Expressing Opinion / Conjecture)',
        englishMeaning: 'I think that...',
        englishExplanation: 'Attach と 思います to a plain-form sentence to state your opinion or conjecture politely.',
        khmerExplanation: 'ទម្រង់「ល្បះទម្រង់ធម្មតា + と 思います」ប្រើដើម្បីបញ្ចេញមតិយោបល់ ឬការគិតផ្ទាល់ខ្លួន (ខ្ញុំគិតថា...)។',
        formationRulesEn: ['Plain form sentence + と 思います'],
        formationRulesKm: ['ល្បះទម្រង់ Plain Form + と 思います'],
        examples: [
          { japanese: '日本の 結婚式は とても きれいだと 思います。', romaji: 'Nihon no kekkonshiki wa totemo kirei da to omoimasu.', english: 'I think Japanese weddings are very beautiful.', khmer: 'ខ្ញុំគិតថាពិធីមង្គលការនៅប្រទេសជប៉ុនគឺស្រស់ស្អាតខ្លាំងណាស់។' },
        ],
        practiceExercises: [
          {
            id: 'gp17-1-1',
            instruction: 'Select the opinion quotation particle.',
            khmerInstruction: 'ជ្រើសរើសធ្នាក់ស្រង់មតិយោបល់',
            prompt: '明日は 雨が ふる (　) 思います。',
            type: 'choice',
            options: ['と', 'を', 'に', 'が'],
            correctAnswer: 'と',
            explanationEn: 'Quotative particle と is used before 思います.',
            explanationKm: 'ធ្នាក់ と ប្រើសម្រាប់ភ្ជាប់មតិយោបល់មុន 思います។',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 18: プレゼントを あげます
  // =========================================================================
  {
    lessonNumber: 18,
    topicNumber: 9,
    lessonTitleJp: 'だい18か 今まで お世話に なりました',
    lessonTitleEn: 'Lesson 18: Thank You for Taking Care of Me',
    lessonTitleKm: 'មេរៀនទី ១៨៖ អរគុណច្រើនដែលបានជួយមើលថែខ្ញុំកន្លងមក',
    grammarPoints: [
      {
        id: 'g18-1',
        pattern: '[人] に [物] を あげます / [人] に [物] を もらいます (Giving and Receiving)',
        englishMeaning: 'Give [thing] to [person] / Receive [thing] from [person]',
        englishExplanation: 'あげます expresses giving to others. もらいます expresses receiving from someone (giver is marked with に or から).',
        khmerExplanation: 'ទម្រង់「〜に 〜を あげます」មានន័យថាឲ្យ ឬជូនកាដូទៅនរណាម្នាក់។ រីឯ「〜に/から 〜を もらいます」មានន័យថាទទួលបានរបស់ពីនរណាម្នាក់ (អ្នកដែលឲ្យមកយើងត្រូវប្រើធ្នាក់ に ឬ から)។',
        formationRulesEn: [
          'Giver は Receiver に Object を あげます (Give)',
          'Receiver は Giver に/から Object を もらいます (Receive)',
        ],
        formationRulesKm: [
          'អ្នកឲ្យ は អ្នកទទួល に របស់ を あげます (ជូន/ឲ្យ)',
          'អ្នកទទួល は អ្នកឲ្យ に/から របស់ を もらいます (ទទួល)',
        ],
        examples: [
          { japanese: '友だちの 誕生日に 時計を あげました。', romaji: 'Tomodachi no tanjoubi ni tokei o agemashita.', english: 'I gave a watch to my friend for their birthday.', khmer: 'ខ្ញុំបានជូននាឡិកាមួយដល់មិត្តភក្តិក្នុងថ្ងៃខួបកំណើតរបស់គាត់។' },
          { japanese: '先生に すてきな 本を もらいました。', romaji: 'Sensei ni suteki na hon o moraimashita.', english: 'I received a wonderful book from my teacher.', khmer: 'ខ្ញុំបានទទួលសៀវភៅដ៏ល្អមួយក្បាលពីលោកគ្រូ។' },
        ],
        practiceExercises: [
          {
            id: 'gp18-1-1',
            instruction: 'Select the giver particle with もらいました.',
            khmerInstruction: 'ជ្រើសរើសធ្នាក់សម្រាប់អ្នកឲ្យជាមួយ もらいました',
            prompt: 'ホストマザー (　) お茶を もらいました。',
            type: 'choice',
            options: ['に', 'を', 'で', 'へ'],
            correctAnswer: 'に',
            explanationEn: 'Person from whom you receive something takes に.',
            explanationKm: 'អ្នកដែលឲ្យមកយើងត្រូវប្រើធ្នាក់ に ជាមួយ もらいました (もらいました = ទទួលបានពី...)។',
          },
        ],
      },
    ],
  },
];
