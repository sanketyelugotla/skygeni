// src/redux/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database_url } from "../context/ContextProvider"
import axios from "axios";


// Thunks
export const fetchACVData = createAsyncThunk("data/fetchACVData", async () => {
	const response = await axios.get(`${database_url}/data/getDataByACV`);
	return response.data.data;
});

export const fetchOpportunityData = createAsyncThunk("data/fetchOpportunityData", async () => {
	const response = await axios.get(`${database_url}/data/getDataByOpportunityCount`);
	return response.data.data;
});

// Slice
const dataSlice = createSlice({
	name: "data",
	initialState: {
		acvData: [],
		opportunityData: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// ACV
			.addCase(fetchACVData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchACVData.fulfilled, (state, action) => {
				state.loading = false;
				state.acvData = action.payload;
			})
			.addCase(fetchACVData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Opportunity Count
			.addCase(fetchOpportunityData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOpportunityData.fulfilled, (state, action) => {
				state.loading = false;
				state.opportunityData = action.payload;
			})
			.addCase(fetchOpportunityData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default dataSlice.reducer;
