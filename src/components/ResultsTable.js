import "../styles.css";

const fields = ['qieyun', 'unicode', 'mc', 'pu', 'ct', 'sh', 'mn', 'kr', 'vn', 'jp_go', 'jp_kan', 'jp_tou', 'jp_kwan', 'jp_other'];

/**
 * Renders a single value of the array returned by db.exec(...) as a table
 * @param {import("sql.js").QueryExecResult} props
 */
const ResultsTable = ({ columns, values }) => {
    return (
        <table class="results-table">
          <thead>
            <tr>
                {columns.map((columnName, i) => (
                  <td key={i}>{columnName}</td>
                ))}
            </tr>
          </thead>
    
          <tbody>
            {
              // values is an array of arrays representing the results of the query
              values.map((row, i) => (
                <tr key={i}>
                  {row.map((v, i) => (
                    <td key={i}>{i === fields.indexOf('unicode') ? 
                      String.fromCodePoint(Number('0x' + v)) :
                      v}
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      );
};

export default ResultsTable;