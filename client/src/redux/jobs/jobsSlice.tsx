import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface JobState {
  appliedJobs: string[]
  loading: boolean,
  error: string | null
}

const initialState: JobState = {
  appliedJobs: [],
  loading: false,
  error: null
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    applyToJobStart(state) {
      state.loading = true
    },
    setAppliedJobs(state, action: PayloadAction<string[]>) {
      state.appliedJobs = action.payload
    },
    applyToJobSuccess(state, action: PayloadAction<string>) {
      state.loading = false
      state.appliedJobs.push(action.payload)
    },
    applyToJobFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    signOut(state) {
      state.appliedJobs = []
      state.loading = false
    },
    removeAppliedJob(state, action: PayloadAction<string>) {
      state.appliedJobs = state.appliedJobs.filter(job => job !== action.payload)
    }
  }
})

export const {
  applyToJobStart,
  applyToJobSuccess,
  applyToJobFailure,
  removeAppliedJob,
  signOut,
  setAppliedJobs
} = jobSlice.actions

export default jobSlice.reducer