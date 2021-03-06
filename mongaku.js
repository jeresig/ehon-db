"use strict";

const genres = [
    "せりふ正本",
    "ぞくよう",
    "よしこの節",
    "上方絵本",
    "中本型読本",
    "交通",
    "京都",
    "人名録",
    "人形浄瑠璃",
    "人情本",
    "人物",
    "人物画譜",
    "人物絵本",
    "仏教",
    "仏教 絵画",
    "仏書",
    "仏経",
    "仮名草子",
    "伝記",
    "俗謡",
    "俳書",
    "俳画",
    "俳諧",
    "俳諧 絵画",
    "俳諧絵本",
    "典籍",
    "列伝",
    "劇書",
    "動物",
    "医学",
    "医学図鑑",
    "占術",
    "印譜",
    "厳島神社",
    "台帳",
    "台詞集",
    "合巻",
    "合巻(複製)",
    "合巻ヵ",
    "名所写真集",
    "名所図会",
    "名所図絵",
    "名所案内",
    "名所狂歌絵本",
    "名所絵",
    "名所絵本",
    "咄本",
    "和歌",
    "和歌絵本",
    "商業",
    "噺本",
    "図案",
    "図案帖",
    "国学",
    "地図",
    "地誌",
    "地誌絵本",
    "声明",
    "声色",
    "声色本",
    "外国地誌",
    "太閤記",
    "奈良絵本",
    "妖怪",
    "子供絵本",
    "孝子説話",
    "官板",
    "実録",
    "実録体小説",
    "実録本",
    "室町物語",
    "宮島",
    "富本正本（稽古本）",
    "寛政０２",
    "将棋",
    "小説",
    "屏風",
    "山水",
    "川柳",
    "工芸",
    "常磐津",
    "年中行事",
    "年代記",
    "年表",
    "座方文書",
    "庭園",
    "彩色絵本",
    "役者絵本",
    "役者絵本（江戸）",
    "役者評判記",
    "役者貼込帖",
    "役者追善本",
    "往来物",
    "心学",
    "忠臣蔵",
    "悉曇",
    "戦争絵",
    "戯文",
    "手本",
    "摺物集",
    "故実",
    "教授",
    "教科書",
    "教義本",
    "教訓",
    "文",
    "文字",
    "料理",
    "新聞",
    "日記",
    "明治戯作",
    "易学",
    "春本",
    "春本（合羽摺）",
    "春画",
    "暦",
    "書画",
    "書画人伝",
    "書目",
    "書道",
    "曹洞",
    "有職故実",
    "本",
    "本本",
    "本草",
    "染見本",
    "根本",
    "植物",
    "歌舞伎",
    "歌舞伎付帳",
    "歌舞伎台本",
    "歌舞伎筋書本",
    "歌舞伎舞台",
    "歌謡",
    "歌謡ヵ",
    "歌集",
    "正本",
    "武家",
    "武者",
    "武者絵",
    "武者絵本",
    "武鑑",
    "歴史絵本",
    "段物集",
    "法令",
    "法制",
    "法帖",
    "注釈",
    "洒落本",
    "浄瑠璃",
    "浄瑠璃注釈",
    "浮世絵",
    "浮世絵貼込帳",
    "浮世草子",
    "滑稽本",
    "漆工",
    "演劇",
    "演劇書",
    "漢学",
    "漢籍",
    "漢詩",
    "漢詩本",
    "漫画",
    "物語",
    "狂文",
    "狂歌",
    "狂歌本",
    "狂歌絵入本",
    "狂歌絵本",
    "狂言筋書",
    "狂詩",
    "狂詩集",
    "玩具本（目付絵）",
    "画報",
    "画帖",
    "画帳",
    "画手本",
    "画譜",
    "画譜絵手本",
    "画集",
    "番付",
    "百人一首",
    "盆画",
    "目録",
    "相法",
    "真宗",
    "真言",
    "研究書",
    "祭礼",
    "祭祀",
    "禅宗",
    "稽古本合綴",
    "稿本",
    "筋書",
    "節用集",
    "系図",
    "紀行",
    "紅絵",
    "紋帳",
    "紋章",
    "細見",
    "経済",
    "絵て本",
    "絵入",
    "絵入根本",
    "絵入浄瑠璃",
    "絵入狂歌本",
    "絵入狂言本",
    "絵半切",
    "絵図",
    "絵尽し",
    "絵手本",
    "絵手本 人物",
    "絵本",
    "絵本(合羽摺)",
    "絵本役割",
    "絵本番付",
    "絵本（合羽摺）",
    "絵画",
    "絵画 漢詩 和歌",
    "絵馬",
    "総記",
    "織見本",
    "繪手本",
    "美人絵本",
    "義太夫",
    "義太夫正本",
    "義太夫稽古本",
    "考証",
    "肉筆浮世絵集",
    "肖像",
    "能楽",
    "能画",
    "脚本",
    "舞踊",
    "舞踊絵本",
    "芝居絵本(合羽摺)",
    "芝居絵本（墨摺）",
    "花街",
    "花街名鑑",
    "花道",
    "花鳥",
    "花鳥画譜",
    "花鳥絵",
    "花鳥絵本",
    "芸妓評判記",
    "芸能",
    "茶番",
    "茶番台本",
    "茶道",
    "草双紙",
    "華道",
    "薄物正本見立戯作",
    "衛手本",
    "袋",
    "見聞記",
    "見聞誌",
    "言語遊戯",
    "評判記",
    "詩歌",
    "語学",
    "説話",
    "読本",
    "読本？",
    "講談",
    "謡曲",
    "謡本",
    "貨幣",
    "買物独案内",
    "貼込帖",
    "赤本",
    "軍記",
    "軍記物",
    "軍記物語",
    "辞典",
    "辞書",
    "遊女絵本",
    "遊戯",
    "道中記",
    "都々逸",
    "都踊",
    "酒呑童子",
    "野郎評判記",
    "銅版画",
    "銅版画（複製）",
    "長唄",
    "長唄正本",
    "随筆",
    "雑",
    "雑俳",
    "雑芸",
    "雑誌",
    "雛型本",
    "雛形本",
    "青本",
    "風俗",
    "風俗図",
    "風俗絵本",
    "高野版",
    "鸚鵡石",
    "黄表紙",
    "黄表紙？",
    "黒本",
    "Fairy tale",
];

const trimID = (id) => id.replace(/\d+(?:\([a-z]\))?[a-z]?.jpg/i, "");

module.exports = {
    getTitle: (i18n) => i18n.gettext("Ehon Database"),
    getShortTitle: (i18n) => i18n.gettext("Ehon"),

    converters: {
        default: require("./utils/converter.js"),
    },

    filterImageSimilarity(sourceImage, matches) {
        // Filter out matches that are from the same artwork
        // This is a rough heuristic and will work for most images
        const sourceID = trimID(sourceImage._id);
        let newMatches = matches.filter(
            ({image}) => sourceID !== trimID(image._id),
        );

        // Let some really obscure matches through
        if (newMatches.length < 3) {
            return newMatches;
        }

        // Must be at least a 5% match otherwise
        newMatches = matches.filter(({score}) => score >= 5);

        // Filter out images that have too many remaining matches
        // 10 is arbitrarily picked here.
        if (newMatches.length >= 10) {
            return [];
        }

        return newMatches;
    },

    filterRecordSimilarity(sourceRecord, sourceImages, similarRecord) {
        // If there are only a few images then we just assume that it's
        // an authentic match
        if (sourceImages.length < 3 || similarRecord.images.length < 3) {
            return true;
        }

        // We find out how many images, except the first and the last, have
        // a similar match
        const matches = sourceImages
            .filter((image, i) => i > 0 && i < sourceImages.length - 1)
            .filter((image) => image.similarImages.length > 0);

        // If there are no matches from the other images then we just ignore
        // all of the similar records
        if (matches.length === 0) {
            return false;
        }

        // Get just the matching IDs of the remaining images
        const matchIds = matches
            .map((image) => image.similarImages)
            .reduce((a, b) => a.concat(b), [])
            .map((image) => image._id);

        // Filter to records that only match non-first/last images
        return (
            similarRecord.images
                .filter(
                    (image, i) => i > 0 && i < similarRecord.images.length - 1,
                )
                .filter((image) => matchIds.includes(image)).length > 0
        );
    },

    types: {
        books: {
            imagesRequired: true,
            allowDirectoryUpload: true,
            bookStyleComparison: true,

            name: (i18n) => i18n.gettext("Books"),

            filters: ["genres"],
            display: ["title", "creator", "genres"],

            sorts: {
                "created.asc": (i18n) => i18n.gettext("Oldest first"),
                "created.desc": (i18n) => i18n.gettext("Added recently"),
            },

            model: {
                // The title of the record.
                title: {
                    type: "SimpleString",
                    title: (i18n) => i18n.gettext("Title"),
                    recommended: true,
                },

                creator: {
                    type: "SimpleString",
                    title: (i18n) => i18n.gettext("Creator"),
                    multiple: true,
                },

                // Genres classifying the record
                genres: {
                    type: "FixedString",
                    title: (i18n) => i18n.gettext("Genres"),
                    values: genres,
                    multiple: true,
                    filterMultiple: true,
                    allowUnknown: true,
                },

                url: {
                    type: "URL",
                    title: (i18n) => i18n.gettext("More details"),
                    recommended: true,
                },
            },
        },
    },
};
