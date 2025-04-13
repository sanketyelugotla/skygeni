import React from 'react';
import { TbCopy } from "react-icons/tb";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
    useMediaQuery,
    useTheme
} from '@mui/material';

const SummaryTableContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '0.8rem',
    borderRadius: '8px',
    marginTop: '1rem',
    [theme.breakpoints.down('sm')]: {
        padding: 0,
        margin: '1rem 0',
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
    },
}));

const LeftTableCell = styled(StyledTableCell)(({ theme }) => ({
    width: '10rem',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        width: 'auto',
    },
}));

const StyledTableHeaderCell = styled(StyledTableCell)(({ theme }) => ({
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: '1.04rem',
    height: 'auto',
}));

const LeftStyledTableHeader = styled(LeftTableCell)(({ theme }) => ({
    fontSize: '1.04rem',
    height: 'auto',
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto',
    fontWeight: 600,
}));

const CopyIcon = styled(TbCopy)(({ theme }) => ({
    alignSelf: 'flex-end',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#818080',
    cursor: 'pointer',
}));

export default function AcvStats({ data, isOpp }) {
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