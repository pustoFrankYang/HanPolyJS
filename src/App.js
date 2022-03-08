import React, { useState, useEffect } from "react";
import "./styles.css";
import initSqlJs from "sql.js";
import ResultsTable from "./components/ResultsTable"
import {HashRouter as Router} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


import HansContainer from './components/HansContainer'

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

export default function App() {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  


  useEffect(async () => {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../craco.config.js
    try {
      const SQL = await initSqlJs({ locateFile: () => sqlWasm });
      const dataPromise = fetch("https://pustofrankyang.github.io/db/mcpdict.db", {mode:'cors'}).then(res => res.arrayBuffer());
      const [buf] = await Promise.all([dataPromise])
      //   console.log(typeof(mcp))
      setDb(new SQL.Database(new Uint8Array(buf)));
    } catch (err) {
      setError(err);
    }
  }, []);

  if (error) return <pre>{error.toString()}</pre>;
  else if (!db) return <pre>Loading...</pre>;
  else return <SQLRepl db={db} />;
}

function isChinese(s) {
    return /[\u4e00-\u9fa5]/.test(s);
}

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */
function SQLRepl({ db }) {
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [isCardMode, setIsCardMode] = useState(true);

  function exec(sql) {
    if (sql == '') return;
    try {
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker here instead
        let newsql = "";
        if (isChinese(sql)) {
            let unicode = ''
            unicode += sql.charCodeAt(0).toString(16);
            newsql = `SELECT * FROM mcpdict WHERE unicode LIKE '%${unicode}%'`
        } else {
            newsql = `SELECT * FROM mcpdict 
                         WHERE mc LIKE '%${sql}%' 
                         OR pu LIKE '%${sql}%'
                         OR ct LIKE '%${sql}%'
                         OR sh LIKE '%${sql}%'
                         OR mn LIKE '%${sql}%'
                         OR kr LIKE '%${sql}%'
                         OR vn LIKE '%${sql}%'
                         OR jp_go LIKE '%${sql}%'
                         OR jp_kan LIKE '%${sql}%'
                         OR jp_tou LIKE '%${sql}%'
                         OR jp_kwan LIKE '%${sql}%'
                         OR jp_other LIKE '%${sql}%'
                         LIMIT 72`
        }
      setResults(db.exec(newsql)); // an array of objects is returned
      setError(null);
    } catch (err) {
      // exec throws an error when the SQL statement is invalid
      setError(err);
      setResults([]);
    }
  }

  return (
    <div className="App">
      <h1>HanPoly</h1>
      <p>search Chinese characters (Unicode alias: Han)
         and some of their romanization (MC pinyin, pinyin, jyutping etc.)</p>
      <p>(only showing 100 results)</p>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder="Enter a Chinese character or romanization (MC pinyin, pinyin, jyutping etc.)
                     No inspiration ? Try `文` or `myon`"
      />

      <FormControlLabel control={<Switch
            checked={isCardMode}
            onChange={() => setIsCardMode(!isCardMode)}
            name="Use Card Mode"
            color="primary"
          />} label="Use Card Mode" />
      

      <pre className="error">{(error || "").toString()}</pre>

      <pre>
        {
          !isCardMode?(
            // results contains one object per select statement in the query
            results.map(({ columns, values }, i) => (
              <ResultsTable key={i} columns={columns} values={values} />
            ))
          ):(
            results.map(({ columns, values }, i) => (
              <HansContainer key={i} columns={columns} data={values}/>
            ))
          )
        }
      </pre>
    </div>
  );
}
