import { createContext, useContext, useEffect, useReducer } from 'react'
import { setAppliedJobs } from '../redux/jobs/jobsSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

interface IJobStatusContext {
  applied: number
  inProgress: number
  offered: number
  jobs: any[]
  dispatch: any
  loading: boolean
}

const JobStatusContext = createContext({} as IJobStatusContext)

const initialState = {
  jobs: [],
  applied: 0,
  inProgress: 0,
  offered: 0,
  loading: true
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'getJobs':
      return {
        ...state,
        jobs: action.payload,
        loading: false
      }
    case 'applied':
      return {
        ...state,
        applied: action.payload
      }
    case 'inProgress':
      return {
        ...state,
        inProgress: action.payload
      }
    case 'offered':
      return {
        ...state,
        offered: action.payload
      }
    default:
      return state
  }
}

const JobStatusProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [{ applied, inProgress, offered, jobs, loading }, dispatch] =
    useReducer(reducer, initialState)
  const dispatchRedux = useAppDispatch()

  const { currentUser } = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch({
      type: 'offered',
      payload: jobs.filter(
        (job: any) =>
          job.candidate_status === 'Offered' ||
          job.candidate_status === 'Selected' ||
          job.candidate_status === 'Placed'
      ).length
    })
    dispatch({
      type: 'applied',
      payload: jobs.filter(
        (job: any) =>
          job.candidate_status === 'Applied' ||
          job.candidate_status === 'Assigned'
      ).length
    })
    dispatch({
      type: 'inProgress',
      payload: jobs.filter(
        (job: any) =>
          job.candidate_status === 'Interview Scheduled' ||
          job.candidate_status === 'Interview Not Attended' ||
          job.candidate_status === 'Interview Rescheduled' ||
          job.candidate_status === 'On Hold'
      ).length
    })
  }, [jobs])

  useEffect(() => {
    fetch(`/api/v1/crm/jobs/history/${currentUser?.slug}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'getJobs', payload: data.data.all })
        const appliedJobsSlug = data.data.all.map((job: any) => job.job_slug)
        dispatchRedux(setAppliedJobs(appliedJobsSlug))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <JobStatusContext.Provider
      value={{ applied, inProgress, offered, jobs, dispatch, loading }}>
      {children}
    </JobStatusContext.Provider>
  )
}

function useJobStatus() {
  const context = useContext(JobStatusContext)
  if (context === undefined)
    throw new Error(
      'JobStatusContext was used outside of the JobStatusProvider'
    )
  return context
}

export { JobStatusProvider, useJobStatus }
