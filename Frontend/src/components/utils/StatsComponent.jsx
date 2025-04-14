import React from 'react';

// Copy icon
import { TbCopy } from "react-icons/tb";

// Material ui components
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
    useMediaQuery,
    useTheme
} from '@mui/material';

// Styled components for structure and responsiveness
const SummaryTableContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    // padding: '0.8rem',
    borderRadius: '8px',
    marginTop: '1rem',
    [theme.breakpoints.down('sm')]: {
        padding: 0,
        margin: '1rem 0',
    },
    [theme.breakpoints.up('4k')]: {
        margin: "1rem",
    },
}));

const StyledTable = styled(Table)(({ theme }) => ({
    width: '100%',
    borderCollapse: 'collapse',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: '1px solid #ddd',
    textAlign: 'right',
    padding: '0.5rem 1.4rem',
    [theme.breakpoints.down('sm')]: {
        padding: '0.2rem 0.5rem',
        fontSize: "0.8rem"
    },
    [theme.breakpoints.up('4k')]: {
        padding: '0.7em 1.4rem',
        fontSize: "2rem"
    },
}));

const LeftTableCell = styled(StyledTableCell)(({ theme }) => ({
    width: '10rem',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        width: 'auto',
        fontSize: "0.8rem"
    },
}));

const StyledTableHeaderCell = styled(StyledTableCell)(({ theme }) => ({
    textAlign: 'center',
    fontSize: '1.04rem',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
        fontSize: "0.9rem",
    },
    [theme.breakpoints.up('4k')]: {
        fontSize: '2.2rem',
        lineHeight: '2.4rem',
    },
}));

const LeftStyledTableHeader = styled(LeftTableCell)(({ theme }) => ({
    fontSize: '1.04rem',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
        fontSize: "0.9rem",
    },
    [theme.breakpoints.up('4k')]: {
        fontSize: '2.2rem',
        lineHeight: '2.4rem',
    },
}));

const RedHeaderCell = styled(StyledTableHeaderCell)(({ theme }) => ({
    color: 'white',
    backgroundColor: '#c65911',
}));

const CreamHeaderCell = styled(StyledTableHeaderCell)(({ theme }) => ({
    color: 'white',
    backgroundColor: '#70ad47',
}));

const GreenTableCell = styled(StyledTableCell)(({ theme }) => ({
    color: 'white',
    backgroundColor: '#548236',
}));

const TotalTableRow = styled(TableRow)(({ theme }) => ({
    fontWeight: 600,
}));

const CopyIcon = styled(TbCopy)(({ theme }) => ({
    alignSelf: 'flex-end',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#818080',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        fontSize: "1.3rem",
    },
    [theme.breakpoints.up('4k')]: {
        fontSize: '4rem',
    },
}));

export default function StatsComponent({ data, isOpp }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return data.length > 0 && (
        <SummaryTableContainer>
            <CopyIcon />
            <TableContainer>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <LeftStyledTableHeader>Stage</LeftStyledTableHeader>
                            <StyledTableHeaderCell>Came to Stage</StyledTableHeaderCell>
                            <RedHeaderCell>
                                Lost / Disqualified <br /> from stage
                            </RedHeaderCell>
                            <CreamHeaderCell>
                                Moved to next <br /> stage
                            </CreamHeaderCell>
                            <StyledTableHeaderCell>Win Rate %</StyledTableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow
                                key={item.label}
                                sx={{
                                    '&:nth-of-type(even)': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                }}
                            >
                                <LeftTableCell>{item.label}</LeftTableCell>
                                <StyledTableCell>
                                    {isOpp ? item.count : item.acv.toLocaleString('en', { useGrouping: true })}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {item.disqualified >= 0 ? item.disqualified.toLocaleString('en', { useGrouping: true }) : '-'}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {item?.qualified?.toLocaleString('en', { useGrouping: true }) || '-'}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {`${item.wonPercent}%` || '-'}
                                </StyledTableCell>
                            </TableRow>
                        ))}
                        <TotalTableRow>
                            <LeftTableCell>Total</LeftTableCell>
                            <StyledTableCell>-</StyledTableCell>
                            <GreenTableCell>
                                {isOpp ?
                                    (data[0].count - data[data.length - 1].count).toLocaleString('en', { useGrouping: true })
                                    :
                                    ((data[0].acv - data[data.length - 1].acv).toLocaleString('en', { useGrouping: true }))
                                }
                            </GreenTableCell>
                            <StyledTableCell>-</StyledTableCell>
                            <StyledTableCell>-</StyledTableCell>
                        </TotalTableRow>
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </SummaryTableContainer>
    );
}