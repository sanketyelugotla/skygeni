import React, { useEffect, useState } from 'react';

// Material ui components
import {
    Box,
    LinearProgress,
    List,
    ListItem,
    Typography
} from '@mui/material';

// For styling and animations
import { styled, keyframes } from '@mui/system';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const growWidth = (value) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${value}%;
  }
`;

// Styled components with animations
const WinRateChartContainer = styled(Box)(({ theme }) => ({
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 5px 10px 2px #00000057',
    paddingBottom: '2rem',
    animation: `${fadeIn} 0.6s ease-out forwards`,
    [theme.breakpoints.up('4k')]: {
        paddingBottom: "3rem"
    },
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
    marginLeft: '2rem',
    letterSpacing: '0.5px',
    lineHeight: '4rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: "1.1rem",
    },
    [theme.breakpoints.up('4k')]: {
        fontSize: "2.2rem",
        margin: "2rem 0 2rem 4rem",
    },
}));

const DividerLine = styled(Box)(({ theme }) => ({
    height: '1px',
    width: '0%',
    backgroundColor: '#0000004f',
    marginBottom: '2rem',
    animation: `${keyframes`
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    `} 0.8s ease-out forwards`,
    animationDelay: '0.3s',
}));

const ChartContent = styled(Box)(({ theme }) => ({
    minWidth: '370px',
    padding: '0 4rem',
    [theme.breakpoints.down('sm')]: {
        padding: '0 1.2rem',
    },
    [theme.breakpoints.up('4k')]: {
        padding: '0 5rem 0 6rem',
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
    opacity: 0,
    animation: `${fadeIn} 0.5s ease-out forwards`,
    [theme.breakpoints.down('sm')]: {
        position: "absolute",
        color: "white",
        left: "0.5rem",
        textAlign: "start"
    },
    [theme.breakpoints.up('4k')]: {
        fontSize: '1.6em',
        width: '6.6rem',
        paddingTop: '0.4rem',
        marginRight: '2rem',
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
    opacity: 0,
    animation: `${fadeIn} 0.5s ease-out forwards`,
    animationDelay: '0.2s',
    [theme.breakpoints.down('sm')]: {
        height: "2rem",
    },
    [theme.breakpoints.up('4k')]: {
        height: "3.5rem",
    },
}));

const ProgressFill = styled(Box)(({ theme, value }) => ({
    position: 'absolute',
    height: '100%',
    width: '0%',
    backgroundColor: '#70ad47',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    transform: 'translateX(-50%)',
    animation: `${growWidth(value)} 1s ease-out forwards`,
    animationDelay: '0.5s',
}));

const BarLabel = styled(Typography)(({ theme }) => ({
    whiteSpace: 'nowrap',
    color: 'white',
    fontSize: '0.9em',
    fontWeight: 600,
    position: 'absolute',
    [theme.breakpoints.up('4k')]: {
        fontSize: '1.5rem',
    },
}));

const PercentText = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    minWidth: '2rem',
    fontSize: '0.9em',
    textAlign: 'left',
    marginLeft: '0.5rem',
    opacity: 0,
    animation: `${fadeIn} 0.5s ease-out forwards`,
    animationDelay: '0.7s',
    [theme.breakpoints.up('4k')]: {
        minWidth: '4rem',
        fontSize: '1.5rem',
        marginLeft: '1rem',
    },
}));

const QualifyPercent = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '0.8em',
    textAlign: 'center',
    marginTop: '0.2rem',
    width: 'calc(100% - 40px)',
    opacity: 0,
    animation: `${fadeIn} 0.5s ease-out forwards`,
    animationDelay: '0.9s',
    [theme.breakpoints.up('4k')]: {
        fontSize: '1.5rem',
        width: 'calc(100% - 5rem)',
    },
}));

const AnimatedListItem = styled(ListItem)(({ theme, index }) => ({
    display: 'flex',
    marginBottom: '0.5rem',
    padding: 0,
    opacity: 0,
    transform: 'translateX(-20px)',
    animation: `${fadeIn} 0.5s ease-out forwards, ${keyframes`
      from {
        transform: translateX(-20px);
      }
      to {
        transform: translateX(0);
      }
    `} 0.5s ease-out forwards`,
    animationDelay: `${index * 0.1 + 0.3}s`,
}));

export default function ChartComponent({ data, title, isChart }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // For getting width of progress bar
    let total = isChart ? data[0].count : data[0].acv;

    return (
        <WinRateChartContainer style={{ opacity: isLoaded ? 1 : 0 }}>
            <ChartTitle variant="h6">{title}</ChartTitle>
            <DividerLine />
            <ChartContent>
                <List>
                    {data.map((item, index) => {
                        const current = isChart ? item.count : item.acv;
                        const percentage = (current / total * 100) || 0;
                        return (
                            <AnimatedListItem key={item.label} index={index}>
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
                            </AnimatedListItem>
                        );
                    })}
                </List>
            </ChartContent>
        </WinRateChartContainer>
    );
}