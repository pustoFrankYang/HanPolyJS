# HanPolyJS

HanPoly with pure react (no independent backend)

Whereby you can search Chinese characters (Unicode alias: Han) (CJKV Unified Ideographs) and some of their romanization (Tshet-uinh Phonetic Alphabet (TUPA, 切韻拼音, by `nk2028`), Kyonh Middle Chinese pinyin (古韻羅馬字, by `polyhedron`), pinyin, jyutping, Japanese romaji etc.)

Chinese character conversion thanks to [OpenCC.js](https://github.com/nk2028/opencc-js). As the most mainly used part, it supports Mainland simplified and HK traditional, but the package [Yitizi](https://github.com/nk2028/yitizi) is more suitable, but only in Node.js.

Middle Chinese phonology analysis thanks to [Qieyun.js](https://github.com/nk2028/qieyun-js).

It can now be accessed on: https://yangchnx.com/hanpoly

Looking forward to your feedback.

# TODO List

- [x] Diaplay a random character from the 3500 most common list
- [x] Transformation of different forms of characters (simplified, traditional, and other forms) (current only simp and trad)
- [ ] Add TUPA
- [ ] Search multiple characters
- [ ] Highlight languages selected from a checkbox
- [ ] Other ways to display, e.g. jp, kr, vn scripts, IPA
- [ ] Interprete the formatting symbols in the sqlite, like those form gray font
- [ ] Better ways to search on the romanizations
- [ ] My practice (3500 common characters first)
- [ ] Pagination
- [ ] Unify card size