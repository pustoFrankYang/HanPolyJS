import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import "../styles.css";

const fields = ['tupa', 'unt-tz', 'qieyun', 'unicode', 'mc', 'pu', 'ct', 'sh', 'mn', 'kr', 'vn', 'jp_go', 'jp_kan', 'jp_tou', 'jp_kwan', 'jp_other'];

function createData(k, v) {
    if (k == '字 Han')
        v = <span style={{ fontSize: 36 }}>{String.fromCodePoint(Number('0x' + v))}</span>;
    v = v ? v.replaceAll ? v.replaceAll(',', ', ') : v : '';
    let marks = [];
    for (let p = 0; v && p < v.length; p++) {
        if (v[p] == '*') {
            marks.push('*')
        }
        if (v[p] == '|') {
            marks.push('|')
        }
    }
    let newV = null;
    if (marks.length && marks.length % 2 == 0) {
        // if v starts with * or |, an empty element will be parts[0]
        // |ling5|, *liong5*, |ging5|, [long1]
        // 0:"", 1:"ling5", 2:", ", 3:"liong5", 4:", ", 5:"ging5", 6:", [long1]"
        let parts = v.split(/[\*\|]/)
        newV = <>{parts.map((part, i) => {
            if (i % 2)
                return (marks[i] == '*' ? <span key={i} style={{ fontWeight: '900' }}>{`${part}`}</span> : <span key={i} style={{ color: 'grey' }}>{`${part}`}</span>)
            return (<span key={i}>{`${part}`}</span>)
        })}</>
    } else {
        newV = v;
    }
    return { k, newV };
}

const HanCard = ({ rowdata }) => {
    const cells = [
        createData('字 Han', rowdata[fields.indexOf('unicode')]),
        createData(<abbr title="TUPA, Tshet-uinh Phonetic Alphabet">切拼 TUPA</abbr>, rowdata[fields.indexOf('tupa')]),
        createData(<abbr title="切韻通俗擬音 Tshet-uinh thoung-zuok Reconstruction by unt">通擬 unt-tz</abbr>, rowdata[fields.indexOf('unt-tz')]),
        createData(<abbr title="Phonological properties in Qieyun, 切韻音韻地位描述">韻述 Qieyun</abbr>, rowdata[fields.indexOf('qieyun')]),
        createData(<abbr title="Middle Chinese Transcription (polyhedron's 古韻羅馬字)">古韻 Kyonh</abbr>, rowdata[fields.indexOf('mc')]),
        createData(<abbr title="Putonghua, Mandarin Chinese">普 cmn</abbr>, rowdata[fields.indexOf('pu')]),
        createData(<abbr title="Cantonese, Yue Chinese">粵 yue</abbr>, rowdata[fields.indexOf('ct')]),
        createData(<abbr title="Shanghainese, Wu Chinese">吳 wuu</abbr>, rowdata[fields.indexOf('sh')]),
        createData(<abbr title="Hokkien, Southern Min Chinese">閩 nan</abbr>, rowdata[fields.indexOf('mn')]),
        createData(<abbr title="Korean">韓 ko</abbr>, rowdata[fields.indexOf('kr')]),
        createData(<abbr title="Vietnamese">越 vi</abbr>, rowdata[fields.indexOf('vn')]),
        createData(<abbr title="Japanese Go-on (呉音, 'Wu sound')">日·呉 ja-go</abbr>, rowdata[fields.indexOf('jp_go')]),
        createData(<abbr title="Japanese Kan-on (漢音, 'Han sound')">日·漢 ja-kan</abbr>, rowdata[fields.indexOf('jp_kan')])
    ]
    if (rowdata[fields.indexOf('jp_tou')])
        cells.push(createData(<abbr title="Japanese Tō-on (唐音, 'Tang sound')">日·唐 ja-to</abbr>, rowdata[fields.indexOf('jp_tou')]))
    if (rowdata[fields.indexOf('jp_kwan')])
        cells.push(createData(<abbr title="Japanese Kan'yō-on (慣用音, 'customary sound')">日·慣 ja-kwan</abbr>, rowdata[fields.indexOf('jp_kwan')]))
    if (rowdata[fields.indexOf('jp_other')])
        cells.push(createData(<abbr title="Japanese Other sounds">日·他 ja-other</abbr>, rowdata[fields.indexOf('jp_other')]))

    return (
        <div>
            <Card raised className="card-container" sx={{ minWidth: 275 }}>
                <div className="card-content">
                    <CardContent>
                        <Table size="small" aria-label="a dense table">
                            <colgroup>
                                <col style={{ width: '30%' }} />
                                <col style={{ width: '70%' }} />
                            </colgroup>
                            <TableBody>
                                {cells.map((row, i) => (
                                    <TableRow
                                        key={i}
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell scope="row" key={i + 'cell1'}>
                                            {row.k}
                                        </TableCell>
                                        <TableCell key={i + 'cell2'} align="left" style={{
                                            whiteSpace: "normal",
                                            wordWrap: "break-word"
                                        }}> {row.newV} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default HanCard;