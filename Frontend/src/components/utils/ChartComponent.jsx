import React from 'react';

// Material ui components
import {
    Box,
    LinearProgress,
    List,
    ListItem,
    Typography
} from '@mui/material';

// For styling
import { styled } from '@mui/material/styles';

// Styled components for structure and responsiveness

const WinRateChartContainer = styled(Box)(({ theme }) => ({
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 5px 10px 2px #00000057',
    paddingBottom: '2rem',
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
    marginLeft: '2rem',
    letterSpacing: '0.5px',
    lineHeight: '4rem',
}));

const DividerLine = styled(Box)(({ theme }) => ({
    height: '1px',
    width: '100%',
    backgroundColor: '#0000004f',
    marginBottom: '2rem',
}));

const ChartContent = styled(Box)(({ theme }) => ({
    minWidth: '360px',
    padding: '0 4rem',
    [theme.breakpoints.down('lg')]: {
        padding: '0 2rem',
    },
}));

const StageLabel = styled(Typography)(({ theme }) => ({
    zIndex: "10",
    textAlign: 'end',
    width: '4rem',
    alignSelf: "flex-start",
    marginRight: '1rem',
    fontSize: '0.93em',
    paddingTop: '0.3rem',
    [theme.breakpoints.down('sm')]: {
        position: "absolute",
        color: "white",
        left: "0.5rem",
        textAlign: "start"
    },
}));

const ProgressWrapper = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
}));

const ProgressBarWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    flex: 1,
    backgroundColor: '#bfbfbf',
    borderRadius: '3px',
    overflow: 'hidden',
    height: '1.6rem',

    [theme.breakpoints.down('sm')]: {
        height: "2rem",
    },
}));

const ProgressFill = styled(Box)(({ theme, value }) => ({
    position: 'absolute',
    height: '100%',
    width: `${value}%`,
    backgroundColor: '#70ad47',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    transform: 'translateX(-50%)',
}));

const StyledProgressBar = styled(LinearProgress)(({ theme }) => ({
    backgroundColor: '#70ad47',
    height: '100%',
    '& .MuiLinearProgress-bar': {
        backgroundColor: '#70ad47',
    },
}));

const BarLabel = styled(Typography)(({ theme }) => ({
    whiteSpace: 'nowrap',
    color: 'white',
    fontSize: '0.9em',
    fontWeight: 600,
    position: 'absolute',
}));

const PercentText = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    minWidth: '2rem',
    fontSize: '0.9em',
    textAlign: 'left',
    marginLeft: '0.5rem',
}));

const QualifyPercent = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '0.8em',
    textAlign: 'center',
    marginTop: '0.2rem',
    width: 'calc(100% - 40px)',
}));

export default function ChartComponent({ data, title, isChart }) {

    // For getting width of progress bar
    let total = isChart ? data[0].count : data[0].acv;

    return (
        <WinRateChartContainer>
            <ChartTitle variant="h6">{title}</ChartTitle>
            <DividerLine />
            <ChartContent>
                <List>
                    {data.map((item) => {
                        const current = isChart ? item.count : item.acv;
                        const percentage = (current / total * 100) || 0;
                        return (
                            <ListItem key={item.label} sx={{ display: 'flex', mb: 0.5, p: 0 }}>
                                <StageLabel variant="body2">{item.label}</StageLabel>
                                <ProgressWrapper>
                                    <ProgressBarWrapper>
                                        <ProgressContainer>
                                            <Box sx={{
                                                position: 'absolute',
                                                backgroundColor: '#bfbfbf',
                                                width: '100%',
                                                height: '100%'
                                            }} />
                                            <ProgressFill value={percentage}>
                                                <BarLabel>
                                                    {isChart ? item.count : item.acv.toLocaleString('en', { useGrouping: true })}
                                                </BarLabel>
                                            </ProgressFill>
                                        </ProgressContainer>
                                        <PercentText>{item.wonPercent}%</PercentText>
                                    </ProgressBarWrapper>
                                    {item.label !== "Won" && (
                                        <QualifyPercent>{item.qualifyPercent}%</QualifyPercent>
                                    )}
                                </ProgressWrapper>
                            </ListItem>
                        );
                    })}
                </List>
            </ChartContent>
        </WinRateChartContainer>
    );
}