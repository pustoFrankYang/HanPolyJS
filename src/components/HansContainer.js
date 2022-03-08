import React from 'react'
import Grid from '@mui/material/Grid';
import HanCard from './HanCard'
import "../styles.css";

const HansContainer = ({ columns, data }) => {
    return (
        <div>
            <Grid container className="hans-container" spacing={1}>
                    
                {data.map(
                    (row, i) =>
                    <Grid key={i} item xs={3}>
                        <HanCard key={i} rowdata={row}/>
                    </Grid>
                )}
                
            </Grid>
        </div>
    );
}

export default HansContainer;