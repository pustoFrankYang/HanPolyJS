import Grid from '@mui/material/Grid';
import React from 'react';
import "../styles.css";
import HanCard from './HanCard';

const HansContainer = ({ columns, data }) => {
    return (
        <div>
            <Grid container className="hans-container" spacing={1}
                direction="row" justifyContent="flex-start"
                alignItems="stretch">
                {data.map((row, i) =>
                    <Grid key={i} item xs={12} sm={4}>
                        <HanCard key={i} rowdata={row} />
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default HansContainer;