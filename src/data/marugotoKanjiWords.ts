export interface KanjiWord {
  id: number;
  kanji: string;
  kana: string; // Hiragana or Katakana reading
  romaji: string;
  meaning: string;
  section: '入門' | '初級1';
  topicNumber: number;
  topicName: string;
  lessonNumber: number;
}

export const MARUGOTO_KANJI_WORDS: KanjiWord[] = [
  // =================== 入門 (にゅうもん) ===================
  // トピック3 たべもの
  { id: 1, kanji: '魚', kana: 'さかな', romaji: 'sakana', meaning: 'Fish', section: '入門', topicNumber: 3, topicName: 'たべもの', lessonNumber: 5 },
  { id: 2, kanji: '肉', kana: 'にく', romaji: 'niku', meaning: 'Meat', section: '入門', topicNumber: 3, topicName: 'たべもの', lessonNumber: 5 },
  { id: 3, kanji: '卵', kana: 'たまご', romaji: 'tamago', meaning: 'Egg', section: '入門', topicNumber: 3, topicName: 'たべもの', lessonNumber: 5 },
  { id: 4, kanji: '水', kana: 'みず', romaji: 'mizu', meaning: 'Water', section: '入門', topicNumber: 3, topicName: 'たべもの', lessonNumber: 5 },
  { id: 5, kanji: '食べます', kana: 'たべます', romaji: 'tabemasu', meaning: 'To eat', section: '入門', topicNumber: 3, topicName: 'たべもの', lessonNumber: 6 },
  { id: 6, kanji: '飲みます', kana: 'のみます', romaji: 'nomimasu', meaning: 'To drink', section: '入門', topicNumber: 3, topicName: 'たべもの', lessonNumber: 6 },

  // トピック4 いえ
  { id: 7, kanji: '大きい', kana: 'おおきい', romaji: 'ookii', meaning: 'Big / Large', section: '入門', topicNumber: 4, topicName: 'いえ', lessonNumber: 8 },
  { id: 8, kanji: '小さい', kana: 'ちいさい', romaji: 'chiisai', meaning: 'Small / Little', section: '入門', topicNumber: 4, topicName: 'いえ', lessonNumber: 8 },
  { id: 9, kanji: '新しい', kana: 'あたらしい', romaji: 'atarashii', meaning: 'New', section: '入門', topicNumber: 4, topicName: 'いえ', lessonNumber: 8 },
  { id: 10, kanji: '古い', kana: 'ふるい', romaji: 'furui', meaning: 'Old', section: '入門', topicNumber: 4, topicName: 'いえ', lessonNumber: 8 },

  // トピック5 せいかつ
  { id: 11, kanji: '〜時', kana: '〜じ', romaji: '~ji (e.g. 5-ji)', meaning: 'O\'clock (e.g. 5 o\'clock)', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 9 },
  { id: 12, kanji: '〜分', kana: '〜ふん／ぷん', romaji: '~fun / ~pun', meaning: 'Minutes (e.g. 5:15)', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 9 },
  { id: 13, kanji: '〜半', kana: '〜はん', romaji: '~han', meaning: 'Half past (e.g. 7:30)', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 9 },
  { id: 14, kanji: '月', kana: 'げつ', romaji: 'getsu', meaning: 'Monday / Moon', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 10 },
  { id: 15, kanji: '火', kana: 'か', romaji: 'ka', meaning: 'Tuesday / Fire', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 10 },
  { id: 16, kanji: '水', kana: 'すい', romaji: 'sui', meaning: 'Wednesday / Water', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 10 },
  { id: 17, kanji: '木', kana: 'もく', romaji: 'moku', meaning: 'Thursday / Tree', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 10 },
  { id: 18, kanji: '金', kana: 'きん', romaji: 'kin', meaning: 'Friday / Gold', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 10 },
  { id: 19, kanji: '土', kana: 'ど', romaji: 'do', meaning: 'Saturday / Earth', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 10 },
  { id: 20, kanji: '日', kana: 'にち', romaji: 'nichi', meaning: 'Sunday / Sun', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 10 },
  { id: 21, kanji: '〜よう日', kana: '〜ようび', romaji: '~youbi (e.g. getsuyoubi)', meaning: 'Day of the week', section: '入門', topicNumber: 5, topicName: 'せいかつ', lessonNumber: 10 },

  // トピック6 やすみのひ 1
  { id: 22, kanji: '言います', kana: 'いいます', romaji: 'iimasu', meaning: 'To say', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 11 },
  { id: 23, kanji: '話します', kana: 'はなします', romaji: 'hanashimasu', meaning: 'To speak / talk', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 11 },
  { id: 24, kanji: '読みます', kana: 'よみます', romaji: 'yomimasu', meaning: 'To read', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 11 },
  { id: 25, kanji: '見ます', kana: 'みます', romaji: 'mimasu', meaning: 'To watch / see', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 11 },
  { id: 26, kanji: '聞きます', kana: 'ききます', romaji: 'kikimasu', meaning: 'To listen / hear', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 11 },
  { id: 27, kanji: '書きます', kana: 'かきます', romaji: 'kakimasu', meaning: 'To write', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 11 },
  { id: 28, kanji: '一', kana: 'いち', romaji: 'ichi', meaning: 'One', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 29, kanji: '二', kana: 'に', romaji: 'ni', meaning: 'Two', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 30, kanji: '三', kana: 'さん', romaji: 'san', meaning: 'Three', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 31, kanji: '四', kana: 'よん／し', romaji: 'yon / shi', meaning: 'Four', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 32, kanji: '五', kana: 'ご', romaji: 'go', meaning: 'Five', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 33, kanji: '六', kana: 'ろく', romaji: 'roku', meaning: 'Six', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 34, kanji: '七', kana: 'なな／しち', romaji: 'nana / shichi', meaning: 'Seven', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 35, kanji: '八', kana: 'はち', romaji: 'hachi', meaning: 'Eight', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 36, kanji: '九', kana: 'きゅう／く', romaji: 'kyuu / ku', meaning: 'Nine', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 37, kanji: '十', kana: 'じゅう', romaji: 'juu', meaning: 'Ten', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 38, kanji: '〜年', kana: '〜ねん', romaji: '~nen', meaning: 'Year', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 39, kanji: '〜月', kana: '〜がつ', romaji: '~gatsu', meaning: 'Month', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },
  { id: 40, kanji: '〜日', kana: '〜にち', romaji: '~nichi', meaning: 'Day / Date', section: '入門', topicNumber: 6, topicName: 'やすみのひ 1', lessonNumber: 12 },

  // トピック7 まち
  { id: 41, kanji: '東', kana: 'ひがし', romaji: 'higashi', meaning: 'East', section: '入門', topicNumber: 7, topicName: 'まち', lessonNumber: 13 },
  { id: 42, kanji: '西', kana: 'にし', romaji: 'nishi', meaning: 'West', section: '入門', topicNumber: 7, topicName: 'まち', lessonNumber: 13 },
  { id: 43, kanji: '南', kana: 'みなみ', romaji: 'minami', meaning: 'South', section: '入門', topicNumber: 7, topicName: 'まち', lessonNumber: 13 },
  { id: 44, kanji: '北', kana: 'きた', romaji: 'kita', meaning: 'North', section: '入門', topicNumber: 7, topicName: 'まち', lessonNumber: 13 },
  { id: 45, kanji: '〜口', kana: '〜ぐち', romaji: '~guchi', meaning: 'Exit / Entrance', section: '入門', topicNumber: 7, topicName: 'まち', lessonNumber: 13 },
  { id: 46, kanji: '東口', kana: 'ひがしぐち', romaji: 'higashiguchi', meaning: 'East Exit', section: '入門', topicNumber: 7, topicName: 'まち', lessonNumber: 13 },
  { id: 47, kanji: '西口', kana: 'にしぐち', romaji: 'nishiguchi', meaning: 'West Exit', section: '入門', topicNumber: 7, topicName: 'まち', lessonNumber: 13 },
  { id: 48, kanji: '南口', kana: 'みなみぐち', romaji: 'minamiguchi', meaning: 'South Exit', section: '入門', topicNumber: 7, topicName: 'まち', lessonNumber: 13 },
  { id: 49, kanji: '北口', kana: 'きたぐち', romaji: 'kitaguchi', meaning: 'North Exit', section: '入門', topicNumber: 7, topicName: 'まち', lessonNumber: 13 },

  // トピック8 かいもの
  { id: 50, kanji: '買います', kana: 'かいます', romaji: 'kaimasu', meaning: 'To buy', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },
  { id: 51, kanji: '買いもの', kana: 'かいもの', romaji: 'kaimono', meaning: 'Shopping', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },
  { id: 52, kanji: 'お金', kana: 'おかね', romaji: 'okane', meaning: 'Money', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },
  { id: 53, kanji: '〜円', kana: '〜えん', romaji: '~en', meaning: 'Yen', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },
  { id: 54, kanji: '百', kana: 'ひゃく', romaji: 'hyaku', meaning: 'Hundred (100)', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },
  { id: 55, kanji: '千', kana: 'せん', romaji: 'sen', meaning: 'Thousand (1,000)', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },
  { id: 56, kanji: '万', kana: 'まん', romaji: 'man', meaning: 'Ten thousand (10,000)', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },
  { id: 57, kanji: '百円', kana: 'ひゃくえん', romaji: 'hyakuen', meaning: '100 Yen', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },
  { id: 58, kanji: '千円', kana: 'せんえん', romaji: 'sen\'en', meaning: '1,000 Yen', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },
  { id: 59, kanji: '一万円', kana: 'いちまんえん', romaji: 'ichiman\'en', meaning: '10,000 Yen', section: '入門', topicNumber: 8, topicName: 'かいもの', lessonNumber: 16 },

  // トピック9 やすみのひ 2
  { id: 60, kanji: '行きます', kana: 'いきます', romaji: 'ikimasu', meaning: 'To go', section: '入門', topicNumber: 9, topicName: 'やすみのひ 2', lessonNumber: 18 },
  { id: 61, kanji: '来ます', kana: 'きます', romaji: 'kimasu', meaning: 'To come', section: '入門', topicNumber: 9, topicName: 'やすみのひ 2', lessonNumber: 18 },
  { id: 62, kanji: '会います', kana: 'あいます', romaji: 'aimasu', meaning: 'To meet', section: '入門', topicNumber: 9, topicName: 'やすみのひ 2', lessonNumber: 18 },
  { id: 63, kanji: '休みます', kana: 'やすみます', romaji: 'yasumimasu', meaning: 'To rest / take a day off', section: '入門', topicNumber: 9, topicName: 'やすみのひ 2', lessonNumber: 18 },
  { id: 64, kanji: '日本', kana: 'にほん／にっぽん', romaji: 'nihon / nippon', meaning: 'Japan', section: '入門', topicNumber: 9, topicName: 'やすみのひ 2', lessonNumber: 18 },
  { id: 65, kanji: '東京', kana: 'とうきょう', romaji: 'toukyou', meaning: 'Tokyo', section: '入門', topicNumber: 9, topicName: 'やすみのひ 2', lessonNumber: 18 },

  // =================== 初級(しょきゅう) 1 ===================
  // トピック1 私とかぞく (Lesson 1 & 2)
  { id: 66, kanji: '私', kana: 'わたし', romaji: 'watashi', meaning: 'I / Me', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },
  { id: 67, kanji: '父', kana: 'ちち', romaji: 'chichi', meaning: 'Father (my father)', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },
  { id: 68, kanji: '母', kana: 'はは', romaji: 'haha', meaning: 'Mother (my mother)', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },
  { id: 69, kanji: '子ども', kana: 'こども', romaji: 'kodomo', meaning: 'Child / Children', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },
  { id: 70, kanji: '男', kana: 'おとこ', romaji: 'otoko', meaning: 'Man / Male', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },
  { id: 71, kanji: '女', kana: 'おんな', romaji: 'onna', meaning: 'Woman / Female', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },
  { id: 72, kanji: '人', kana: 'ひと', romaji: 'hito', meaning: 'Person', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },
  { id: 73, kanji: 'お父さん', kana: 'おとうさん', romaji: 'otousan', meaning: 'Father (someone\'s)', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },
  { id: 74, kanji: 'お母さん', kana: 'おかあさん', romaji: 'okaasan', meaning: 'Mother (someone\'s)', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },
  { id: 75, kanji: '何人', kana: 'なんにん', romaji: 'nannin', meaning: 'How many people', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 1 },

  { id: 76, kanji: '国', kana: 'くに', romaji: 'kuni', meaning: 'Country', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 77, kanji: '外国', kana: 'がいこく', romaji: 'gaikoku', meaning: 'Foreign country', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 78, kanji: '〜語', kana: '〜ご', romaji: '~go', meaning: 'Language (suffix)', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 79, kanji: '日本語', kana: 'にほんご', romaji: 'nihongo', meaning: 'Japanese language', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 80, kanji: '英語', kana: 'えいご', romaji: 'eigo', meaning: 'English language', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 81, kanji: '中国語', kana: 'ちゅうごくご', romaji: 'chuugokugo', meaning: 'Chinese language', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 82, kanji: '〜人', kana: '〜じん', romaji: '~jin', meaning: 'Nationality / Person of', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 83, kanji: '日本人', kana: 'にほんじん', romaji: 'nihonjin', meaning: 'Japanese person', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 84, kanji: '好き', kana: 'すき', romaji: 'suki', meaning: 'Liked / Fond of', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 85, kanji: '本', kana: 'ほん', romaji: 'hon', meaning: 'Book', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 86, kanji: '読書', kana: 'どくしょ', romaji: 'dokusho', meaning: 'Reading books', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },
  { id: 87, kanji: '何', kana: 'なに', romaji: 'nani', meaning: 'What', section: '初級1', topicNumber: 1, topicName: '私とかぞく', lessonNumber: 2 },

  // トピック2 きせつと天気 (Lesson 3 & 4)
  { id: 88, kanji: '春', kana: 'はる', romaji: 'haru', meaning: 'Spring', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 3 },
  { id: 89, kanji: '夏', kana: 'なつ', romaji: 'natsu', meaning: 'Summer', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 3 },
  { id: 90, kanji: '秋', kana: 'あき', romaji: 'aki', meaning: 'Autumn / Fall', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 3 },
  { id: 91, kanji: '冬', kana: 'ふゆ', romaji: 'fuyu', meaning: 'Winter', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 3 },
  { id: 92, kanji: '今', kana: 'いま', romaji: 'ima', meaning: 'Now', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 3 },
  { id: 93, kanji: '花', kana: 'はな', romaji: 'hana', meaning: 'Flower', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 3 },
  { id: 94, kanji: '海', kana: 'うみ', romaji: 'umi', meaning: 'Sea / Ocean', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 3 },
  { id: 95, kanji: '山', kana: 'やま', romaji: 'yama', meaning: 'Mountain', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 3 },
  { id: 96, kanji: '川', kana: 'かわ', romaji: 'kawa', meaning: 'River', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 3 },

  { id: 97, kanji: '今日', kana: 'きょう', romaji: 'kyou', meaning: 'Today', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 4 },
  { id: 98, kanji: '天気', kana: 'てんき', romaji: 'tenki', meaning: 'Weather', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 4 },
  { id: 99, kanji: '晴れ', kana: 'はれ', romaji: 'hare', meaning: 'Clear / Sunny weather', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 4 },
  { id: 100, kanji: '雨', kana: 'あめ', romaji: 'ame', meaning: 'Rain', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 4 },
  { id: 101, kanji: '雪', kana: 'ゆき', romaji: 'yuki', meaning: 'Snow', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 4 },
  { id: 102, kanji: '雲', kana: 'くも', romaji: 'kumo', meaning: 'Cloud', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 4 },
  { id: 103, kanji: '風', kana: 'かぜ', romaji: 'kaze', meaning: 'Wind', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 4 },
  { id: 104, kanji: '空', kana: 'そら', romaji: 'sora', meaning: 'Sky', section: '初級1', topicNumber: 2, topicName: 'きせつと天気', lessonNumber: 4 },

  // トピック3 私の町 (Lesson 5 & 6)
  { id: 105, kanji: '町', kana: 'まち', romaji: 'machi', meaning: 'Town / City', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 5 },
  { id: 106, kanji: '店', kana: 'みせ', romaji: 'mise', meaning: 'Shop / Store', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 5 },
  { id: 107, kanji: '人気', kana: 'にんき', romaji: 'ninki', meaning: 'Popularity', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 5 },
  { id: 108, kanji: '多い', kana: 'おおい', romaji: 'ooi', meaning: 'Many / Numerous', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 5 },
  { id: 109, kanji: '少ない', kana: 'すくない', romaji: 'sukunai', meaning: 'Few / Little', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 5 },
  { id: 110, kanji: '高い', kana: 'たかい', romaji: 'takai', meaning: 'Expensive / High', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 5 },
  { id: 111, kanji: '安い', kana: 'やすい', romaji: 'yasui', meaning: 'Cheap / Inexpensive', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 5 },
  { id: 112, kanji: '広い', kana: 'ひろい', romaji: 'hiroi', meaning: 'Spacious / Wide', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 5 },

  { id: 113, kanji: '道', kana: 'みち', romaji: 'michi', meaning: 'Road / Street / Way', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },
  { id: 114, kanji: '通り', kana: 'とおり', romaji: 'toori', meaning: 'Avenue / Thoroughfare', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },
  { id: 115, kanji: '右', kana: 'みぎ', romaji: 'migi', meaning: 'Right', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },
  { id: 116, kanji: '左', kana: 'ひだり', romaji: 'hidari', meaning: 'Left', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },
  { id: 117, kanji: '一つ', kana: 'ひとつ', romaji: 'hitotsu', meaning: 'One thing', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },
  { id: 118, kanji: '二つ', kana: 'ふたつ', romaji: 'futatsu', meaning: 'Two things', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },
  { id: 119, kanji: '赤い', kana: 'あかい', romaji: 'akai', meaning: 'Red', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },
  { id: 120, kanji: '青い', kana: 'あおい', romaji: 'aoi', meaning: 'Blue', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },
  { id: 121, kanji: '黒い', kana: 'くろい', romaji: 'kuroi', meaning: 'Black', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },
  { id: 122, kanji: '白い', kana: 'しろい', romaji: 'shiroi', meaning: 'White', section: '初級1', topicNumber: 3, topicName: '私の町', lessonNumber: 6 },

  // トピック4 出かける (Lesson 7 & 8)
  { id: 123, kanji: '時間', kana: 'じかん', romaji: 'jikan', meaning: 'Time', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 7 },
  { id: 124, kanji: '場所', kana: 'ばしょ', romaji: 'basho', meaning: 'Place / Location', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 7 },
  { id: 125, kanji: '駅', kana: 'えき', romaji: 'eki', meaning: 'Station', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 7 },
  { id: 126, kanji: '日', kana: 'ひ', romaji: 'hi', meaning: 'Day / Date', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 7 },
  { id: 127, kanji: '出かけます', kana: 'でかけます', romaji: 'dekakemasu', meaning: 'To go out', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 7 },
  { id: 128, kanji: '待ちます', kana: 'まちます', romaji: 'machimasu', meaning: 'To wait', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 7 },
  { id: 129, kanji: '止まります', kana: 'とまります', romaji: 'tomarimasu', meaning: 'To stop', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 7 },

  { id: 130, kanji: '食事', kana: 'しょくじ', romaji: 'shokuji', meaning: 'Meal / Dining', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 8 },
  { id: 131, kanji: '仕事', kana: 'しごと', romaji: 'shigoto', meaning: 'Job / Work', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 8 },
  { id: 132, kanji: '前', kana: 'まえ', romaji: 'mae', meaning: 'Before / Front', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 8 },
  { id: 133, kanji: '後', kana: 'あと', romaji: 'ato', meaning: 'After / Behind', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 8 },
  { id: 134, kanji: '朝', kana: 'あさ', romaji: 'asa', meaning: 'Morning', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 8 },
  { id: 135, kanji: '昼', kana: 'ひる', romaji: 'hiru', meaning: 'Noon / Daytime', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 8 },
  { id: 136, kanji: '夜', kana: 'よる', romaji: 'yoru', meaning: 'Night', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 8 },
  { id: 137, kanji: '乗ります', kana: 'のります', romaji: 'norimasu', meaning: 'To ride / board', section: '初級1', topicNumber: 4, topicName: '出かける', lessonNumber: 8 },

  // トピック5 外国語と外国文化 (Lesson 9 & 10)
  { id: 138, kanji: '学校', kana: 'がっこう', romaji: 'gakkou', meaning: 'School', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 9 },
  { id: 139, kanji: '小学校', kana: 'しょうがっこう', romaji: 'shougakkou', meaning: 'Elementary school', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 9 },
  { id: 140, kanji: '中学校', kana: 'ちゅうがっこう', romaji: 'chuugakkou', meaning: 'Junior high school', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 9 },
  { id: 141, kanji: '高校', kana: 'こうこう', romaji: 'koukou', meaning: 'High school', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 9 },
  { id: 142, kanji: '大学', kana: 'だいがく', romaji: 'daigaku', meaning: 'University', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 9 },
  { id: 143, kanji: '先生', kana: 'せんせい', romaji: 'sensei', meaning: 'Teacher', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 9 },
  { id: 144, kanji: '学生', kana: 'がくせい', romaji: 'gakusei', meaning: 'Student', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 9 },
  { id: 145, kanji: '〜年生', kana: '〜ねんせい', romaji: '~nensei (e.g. ichi-nensei)', meaning: 'School grade / year (e.g. 1st year)', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 9 },
  { id: 146, kanji: '勉強', kana: 'べんきょう', romaji: 'benkyou', meaning: 'Study', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 9 },

  { id: 147, kanji: '文化', kana: 'ぶんか', romaji: 'bunka', meaning: 'Culture', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 10 },
  { id: 148, kanji: '音楽', kana: 'おんがく', romaji: 'ongaku', meaning: 'Music', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 10 },
  { id: 149, kanji: '旅行', kana: 'りょこう', romaji: 'ryokou', meaning: 'Travel / Trip', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 10 },
  { id: 150, kanji: '留学', kana: 'りゅうがく', romaji: 'ryuugaku', meaning: 'Study abroad', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 10 },
  { id: 151, kanji: '友だち', kana: 'ともだち', romaji: 'tomodachi', meaning: 'Friend', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 10 },
  { id: 152, kanji: '楽しい', kana: 'たのしい', romaji: 'tanoshii', meaning: 'Fun / Enjoyable', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 10 },
  { id: 153, kanji: '週', kana: 'しゅう', romaji: 'shuu', meaning: 'Week', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 10 },
  { id: 154, kanji: '〜回', kana: '〜かい', romaji: '~kai (e.g. ni-kai)', meaning: 'Times / Occurrences (e.g. 2 times)', section: '初級1', topicNumber: 5, topicName: '外国語と外国文化', lessonNumber: 10 },

  // トピック6 そとで食べる (Lesson 11 & 12)
  { id: 155, kanji: '食べ物', kana: 'たべもの', romaji: 'tabemono', meaning: 'Food', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 11 },
  { id: 156, kanji: '飲み物', kana: 'のみもの', romaji: 'nomimono', meaning: 'Beverage / Drink', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 11 },
  { id: 157, kanji: 'お茶', kana: 'おちゃ', romaji: 'ocha', meaning: 'Tea / Green tea', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 11 },
  { id: 158, kanji: 'お酒', kana: 'おさけ', romaji: 'osake', meaning: 'Alcohol / Sake', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 11 },
  { id: 159, kanji: '作ります', kana: 'つくります', romaji: 'tsukurimasu', meaning: 'To make / cook', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 11 },
  { id: 160, kanji: '持っていきます', kana: 'もっていきます', romaji: 'motte ikimasu', meaning: 'To take / bring along', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 11 },
  { id: 161, kanji: 'お願いします', kana: 'おねがいします', romaji: 'onegaishimasu', meaning: 'Please / Thank you in advance', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 11 },

  { id: 162, kanji: '料理', kana: 'りょうり', romaji: 'ryouri', meaning: 'Cuisine / Cooking', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 12 },
  { id: 163, kanji: '味', kana: 'あじ', romaji: 'aji', meaning: 'Taste / Flavor', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 12 },
  { id: 164, kanji: '色', kana: 'いろ', romaji: 'iro', meaning: 'Color', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 12 },
  { id: 165, kanji: '野菜', kana: 'やさい', romaji: 'yasai', meaning: 'Vegetable', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 12 },
  { id: 166, kanji: '少し', kana: 'すこし', romaji: 'sukoshi', meaning: 'A little', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 12 },
  { id: 167, kanji: '中', kana: 'なか', romaji: 'naka', meaning: 'Inside / Middle', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 12 },
  { id: 168, kanji: '入っています', kana: 'はいっています', romaji: 'haitte imasu', meaning: 'Is inside / contained', section: '初級1', topicNumber: 6, topicName: 'そとで食べる', lessonNumber: 12 },

  // トピック7 出張 (Lesson 13 & 14)
  { id: 169, kanji: '会社', kana: 'かいしゃ', romaji: 'kaisha', meaning: 'Company', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 13 },
  { id: 170, kanji: '本社', kana: 'ほんしゃ', romaji: 'honsha', meaning: 'Headquarters / Main office', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 13 },
  { id: 171, kanji: '支社', kana: 'ししゃ', romaji: 'shisha', meaning: 'Branch office', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 13 },
  { id: 172, kanji: '出張', kana: 'しゅっちょう', romaji: 'shucchou', meaning: 'Business trip', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 13 },
  { id: 173, kanji: '空港', kana: 'くうこう', romaji: 'kuukou', meaning: 'Airport', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 13 },
  { id: 174, kanji: '出発', kana: 'しゅっぱつ', romaji: 'shuppatsu', meaning: 'Departure', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 13 },
  { id: 175, kanji: '到着', kana: 'とうちゃく', romaji: 'touchaku', meaning: 'Arrival', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 13 },
  { id: 176, kanji: '午前', kana: 'ごぜん', romaji: 'gozen', meaning: 'A.M. / Morning', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 13 },
  { id: 177, kanji: '午後', kana: 'ごご', romaji: 'gogo', meaning: 'P.M. / Afternoon', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 13 },

  { id: 178, kanji: '自分', kana: 'じぶん', romaji: 'jibun', meaning: 'Oneself / Myself', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 14 },
  { id: 179, kanji: '電話', kana: 'でんわ', romaji: 'denwa', meaning: 'Telephone / Phone call', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 14 },
  { id: 180, kanji: '電気', kana: 'でんき', romaji: 'denki', meaning: 'Electricity / Light', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 14 },
  { id: 181, kanji: '電車', kana: 'でんしゃ', romaji: 'densha', meaning: 'Train', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 14 },
  { id: 182, kanji: '車', kana: 'くるま', romaji: 'kuruma', meaning: 'Car', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 14 },
  { id: 183, kanji: '送ります', kana: 'おくります', romaji: 'okurimasu', meaning: 'To send / see off', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 14 },
  { id: 184, kanji: '使います', kana: 'つかいます', romaji: 'tsukaimasu', meaning: 'To use', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 14 },
  { id: 185, kanji: '借ります', kana: 'かります', romaji: 'karimasu', meaning: 'To borrow', section: '初級1', topicNumber: 7, topicName: '出張', lessonNumber: 14 },

  // トピック8 けんこう (Lesson 15 & 16)
  { id: 186, kanji: '体', kana: 'からだ', romaji: 'karada', meaning: 'Body', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 15 },
  { id: 187, kanji: '頭', kana: 'あたま', romaji: 'atama', meaning: 'Head', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 15 },
  { id: 188, kanji: '目', kana: 'め', romaji: 'me', meaning: 'Eye', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 15 },
  { id: 189, kanji: '口', kana: 'くち', romaji: 'kuchi', meaning: 'Mouth', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 15 },
  { id: 190, kanji: '耳', kana: 'みみ', romaji: 'mimi', meaning: 'Ear', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 15 },
  { id: 191, kanji: '手', kana: 'て', romaji: 'te', meaning: 'Hand', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 15 },
  { id: 192, kanji: '足', kana: 'あし', romaji: 'ashi', meaning: 'Foot / Leg', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 15 },
  { id: 193, kanji: '上', kana: 'うえ', romaji: 'ue', meaning: 'Up / Above', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 15 },
  { id: 194, kanji: '下', kana: 'した', romaji: 'shita', meaning: 'Down / Below', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 15 },

  { id: 195, kanji: '毎〜', kana: 'まい〜', romaji: 'mai~', meaning: 'Every ~ (prefix)', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },
  { id: 196, kanji: '毎朝', kana: 'まいあさ', romaji: 'maiasa', meaning: 'Every morning', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },
  { id: 197, kanji: '毎日', kana: 'まいにち', romaji: 'mainichi', meaning: 'Every day', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },
  { id: 198, kanji: '週末', kana: 'しゅうまつ', romaji: 'shuumatsu', meaning: 'Weekend', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },
  { id: 199, kanji: '元気', kana: 'げんき', romaji: 'genki', meaning: 'Healthy / Energetic', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },
  { id: 200, kanji: '外', kana: 'そと', romaji: 'soto', meaning: 'Outside', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },
  { id: 201, kanji: '起きます', kana: 'おきます', romaji: 'okimasu', meaning: 'To wake up / get up', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },
  { id: 202, kanji: '歩きます', kana: 'あるきます', romaji: 'arukimasu', meaning: 'To walk', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },
  { id: 203, kanji: '走ります', kana: 'はしります', romaji: 'hashirimasu', meaning: 'To run', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },
  { id: 204, kanji: '泳ぎます', kana: 'およぎます', romaji: 'oyogimasu', meaning: 'To swim', section: '初級1', topicNumber: 8, topicName: 'けんこう', lessonNumber: 16 },

  // トピック9 お祝い (Lesson 17 & 18)
  { id: 205, kanji: 'お祝い', kana: 'おいわい', romaji: 'oiwai', meaning: 'Celebration / Congratulatory gift', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 17 },
  { id: 206, kanji: '誕生日', kana: 'たんじょうび', romaji: 'tanjoubi', meaning: 'Birthday', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 17 },
  { id: 207, kanji: '結婚', kana: 'けっこん', romaji: 'kekkon', meaning: 'Marriage / Wedding', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 17 },
  { id: 208, kanji: '絵', kana: 'え', romaji: 'e', meaning: 'Picture / Painting', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 17 },
  { id: 209, kanji: '写真', kana: 'しゃしん', romaji: 'shashin', meaning: 'Photograph', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 17 },
  { id: 210, kanji: '時計', kana: 'とけい', romaji: 'tokei', meaning: 'Clock / Watch', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 17 },
  { id: 211, kanji: '着ます', kana: 'きます', romaji: 'kimasu', meaning: 'To wear / put on', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 17 },

  { id: 212, kanji: '先〜', kana: 'せん〜', romaji: 'sen~', meaning: 'Previous / Last (prefix)', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
  { id: 213, kanji: '先週', kana: 'せんしゅう', romaji: 'senshuu', meaning: 'Last week', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
  { id: 214, kanji: '今〜', kana: 'こん〜', romaji: 'kon~', meaning: 'This (prefix)', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
  { id: 215, kanji: '今月', kana: 'こんげつ', romaji: 'kongetsu', meaning: 'This month', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
  { id: 216, kanji: '来〜', kana: 'らい〜', romaji: 'rai~', meaning: 'Next (prefix)', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
  { id: 217, kanji: '来年', kana: 'らいねん', romaji: 'rainen', meaning: 'Next year', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
  { id: 218, kanji: '今年', kana: 'ことし', romaji: 'kotoshi', meaning: 'This year', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
  { id: 219, kanji: '去年', kana: 'きょねん', romaji: 'kyonen', meaning: 'Last year', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
  { id: 220, kanji: '家', kana: 'いえ', romaji: 'ie', meaning: 'House / Home', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
  { id: 221, kanji: '思います', kana: 'おもいます', romaji: 'omoimasu', meaning: 'To think', section: '初級1', topicNumber: 9, topicName: 'お祝い', lessonNumber: 18 },
];
