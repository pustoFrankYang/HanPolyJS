import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import "../styles.css";

const fields = ['tupa', 'qieyun', 'unicode', 'mc', 'pu', 'ct', 'sh', 'mn', 'kr', 'vn', 'jp_go', 'jp_kan', 'jp_tou', 'jp_kwan', 'jp_other'];

function createData( k, v ) {
    if (k == '字 Han')
        v = <span style={{ fontSize: 36}}>{String.fromCodePoint(Number('0x' + v))}</span>;
    return { k, v };
  }

const HanCard = ({ rowdata }) => {
    const cells = [
        createData('字 Han', rowdata[fields.indexOf('unicode')]),
        createData(<abbr title="TUPA, Tshet-uinh Phonetic Alphabet">切拼 TUPA</abbr>, rowdata[fields.indexOf('tupa')]),
        createData(<abbr title="Phonological properties in Qieyun, 最简描述">切韵地位 Qieyun</abbr>, rowdata[fields.indexOf('qieyun')]),
        createData(<abbr title="Middle Chinese Transcription (polyhedron's 中古漢語拼音)">中古 MCP</abbr>, rowdata[fields.indexOf('mc')]),
        createData(<abbr title="Putonghua, Mandarin Chinese">普 mandarin</abbr>, rowdata[fields.indexOf('pu')]),
        createData(<abbr title="Cantonese, Yue Chinese">粵 canton</abbr>, rowdata[fields.indexOf('ct')]),
        createData(<abbr title="Shanghainese, Wu Chinese">吳 sh</abbr>, rowdata[fields.indexOf('sh')]),
        createData(<abbr title="Hokkien, Southern Min Chinese">閩 mn</abbr>, rowdata[fields.indexOf('mn')]),
        createData(<abbr title="Korean">韓 kr</abbr>, rowdata[fields.indexOf('kr')]),
        createData(<abbr title="Vietnamese">越 vn</abbr>, rowdata[fields.indexOf('vn')]),
        createData(<abbr title="Japanese Go-on (呉音, 'Wu sound')">日·呉 jp-go</abbr>, rowdata[fields.indexOf('jp_go')]),
        createData(<abbr title="Japanese Kan-on (漢音, 'Han sound')">日·漢 jp-kan</abbr>, rowdata[fields.indexOf('jp_kan')])
    ]
    if (rowdata[10])
        cells.push(createData(<abbr title="Japanese Tō-on (唐音, 'Tang sound')">日·唐 jp-to</abbr>, rowdata[fields.indexOf('jp_tou')]))
    if (rowdata[11])
        cells.push(createData(<abbr title="Japanese Kan'yō-on (慣用音, 'customary sound')">日·慣 jp-kwan</abbr>, rowdata[fields.indexOf('jp_kwan')]))    
    if (rowdata[12])
        cells.push(createData(<abbr title="Japanese Other">日·他 jp-other</abbr>, rowdata[fields.indexOf('jp_other')]))

    return (
        <div>
        <Card raised className="card-container" sx={{ minWidth: 275 }}>
        <div className="card-content">
        <CardContent>
        <Table size="small" aria-label="a dense table">
            <colgroup>
                <col style={{width:'30%'}}/>
                <col style={{width:'70%'}}/>
            </colgroup>
            <TableBody>
                {cells.map(
                    (row, i) => (
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
                                    }}> {row.v ? row.v.replaceAll ? row.v.replaceAll(',', ', '): row.v : ''} </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
        </CardContent>
        </div>
        </Card>
        </div>
    )
}

export default HanCard;