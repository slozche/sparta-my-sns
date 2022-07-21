import React from 'react';
import { Grid } from '@mui/material';

const Main = () => {
    return (
        <div>
            <h1>메인페이지입니다</h1>
            <Grid
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={6} md={8}>
                </Grid>
            </Grid>
        </div>
    );
};

export default Main;