import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOpportunityData } from '../redux/dataSlice';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	CircularProgress,
	Box,
	IconButton,
	styled
} from '@mui/material';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	position: 'relative',
	padding: theme.spacing(4),
	boxShadow: theme.shadows[3],
	borderRadius: theme.shape.borderRadius,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	top: theme.spacing(1),
	right: theme.spacing(1),
}));

const CenterCell = styled(TableCell)({
	textAlign: 'center',
});

const LeftCell = styled(TableCell)({
	textAlign: 'left',
});

const RedCell = styled(CenterCell)(({ theme }) => ({
	color: theme.palette.error.main,
}));

const CreamCell = styled(CenterCell)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
}));

const GreenCell = styled(TableCell)(({ theme }) => ({
	color: theme.palette.success.main,
	fontWeight: 'bold',
}));

const TotalRow = styled(TableRow)(({ theme }) => ({
	backgroundColor: theme.palette.grey[100],
	'& td': {
		fontWeight: 'bold',
	},
}));

export default function OpportunityStats() {
	const dispatch = useDispatch();
	const { opportunityData, loading, error } = useSelector((state) => state.data);

	if (loading) return (
		<Box display="flex" justifyContent="center" p={4}>
			<CircularProgress />
		</Box>
	);

	if (error) return (
		<Typography color="error" align="center" p={4}>
			Error loading data: {error}
		</Typography>
	);

	return opportunityData.length > 0 && (
		<StyledTableContainer component={Paper}>
			<StyledIconButton aria-label="copy">
				<CopyIcon />
			</StyledIconButton>

			<Table>
				<TableHead>
					<TableRow>
						<LeftCell>Stage</LeftCell>
						<CenterCell>Came to Stage</CenterCell>
						<RedCell>Lost / Disqualified<br />from stage</RedCell>
						<CreamCell>Moved to next<br />stage</CreamCell>
						<CenterCell>Win Rate %</CenterCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{opportunityData.map((item) => (
						<TableRow key={item.label}>
							<LeftCell>{item.label}</LeftCell>
							<CenterCell>{item.count}</CenterCell>
							<CenterCell>{item.disqualified >= 0 ? item.disqualified : '-'}</CenterCell>
							<CenterCell>{item.qualified || '-'}</CenterCell>
							<CenterCell>{`${item.wonPercent}%` || '-'}</CenterCell>
						</TableRow>
					))}
					<TotalRow>
						<LeftCell>Total</LeftCell>
						<CenterCell>-</CenterCell>
						<GreenCell align="center">
							{opportunityData[0].count - opportunityData[opportunityData.length - 1].count}
						</GreenCell>
						<CenterCell>-</CenterCell>
						<CenterCell>-</CenterCell>
					</TotalRow>
				</TableBody>
			</Table>
		</StyledTableContainer>
	);
}