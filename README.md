# HanPoly

本页为旧版，新版请移步： https://studling.pustot.com/#/zh-ltc/sino-dict

This is archived version. For new version, please visit: https://studling.pustot.com/#/zh-ltc/sino-dict

> 轉型重構，主要係用yaml/csv代替sqlite數據來源，以方便純前端操作，且集成更多方言數據來源（多爲各種RIME倉庫）。

https://hanpoly.pustot.com/

HanPoly, multiple pronunciations and romanizations of Chinese characters, with react (no backend)

Whereby you can search Chinese characters (Unicode alias: Han) (CJKV Unified Ideographs) and some of their romanization (Tshet-uinh Phonetic Alphabet (TUPA, 切韻拼音, by `nk2028`), Kyonh Middle Chinese pinyin (古韻羅馬字, by `polyhedron`), pinyin, jyutping, Japanese romaji etc.)

Chinese character conversion thanks to [OpenCC.js](https://github.com/nk2028/opencc-js). As the most mainly used part, it supports Mainland simplified and HK traditional, but the package [Yitizi](https://github.com/nk2028/yitizi) is more suitable (ahh I didn't know it can be used as a ES6 module!).

Middle Chinese phonology analysis thanks to [Qieyun.js](https://github.com/nk2028/qieyun-js).

⚠️ In order to query the SQLite file from https://github.com/MaigoAkisame/MCPDict , I refered to https://github.com/sql-js/react-sqljs-demo but that made some updating of npm packages more difficult, which I guess is the reason I can't import tupa from [qieyun-examples](https://github.com/nk2028/qieyun-examples) properly and I changed it to be `src/lib/tupa.js` in this project. Since this way of using SQLite may cause further problems, it might be better to change it.

It can now be accessed on: https://pustot.com/hanpoly

Looking forward to your feedback.

# TODO List

- [x] Diaplay a random character from the 3500 most common list
- [x] Transformation of different forms of characters (simplified, traditional, and other forms) (current only simp and trad)
- [x] Add TUPA
- [x] Search multiple characters (or together with romanizations)
- [x] Interprete the formatting symbols in the sqlite, like those form gray font (`*x*` bold, `|x|` gray)
- [x] Add 切韻通俗擬音
- [x] At least add other standards to trad, to be compatible to like 鋭 銳 (weird tho) (now hk & tw & jp & cn per `OpenCC.js`)
- [x] `Yitizi` npm package, see usage in qieyun-autoderiver. 
- [x] Select Variants of Han: Make switches for 不轉化, 僅繁簡 and 異體 (currently toggle "繁/簡/異 Conversion")
- [x] Add "only show Han from 廣韻"
- [x] BugFix: for hans like 䎫 and 㵾 (both not in `CJK Unified Ideographs` block (but in `CJK Unified Ideographs Extension A`) and not in the MCDict SQLite (but in 廣韻！) (should change the workflow to not rely on it but just as complimentary))
- [ ] Show Qieyun.js details on click
- [ ] Also show results (from Qieyun.js) when SQLite not loaded
- [ ] Highlight languages selected from a checkbox
- [ ] Other ways to display, e.g. jp, kr, vn scripts, IPA
- [ ] Better ways to search on the romanizations (including faster, fewer results)
- [ ] My practice (3500 common characters first)
- [ ] Pagination
- [ ] Unify card size
