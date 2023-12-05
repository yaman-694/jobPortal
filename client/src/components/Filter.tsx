export interface Filter {
  job_category: string
  name: string
  country: string
  job_skill: string
  job_type: string
}
interface JobFilterProps {
  filter: Filter
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  jobs: any[]
}

// interface OptionsProps {
//   children: React.ReactNode
// }

// const Options: React.FC<OptionsProps> = ({ children }) => {
//   return (
//     <div className="options">
//       <ul>{children}</ul>
//     </div>
//   )
// }

export const JobFilter: React.FC<JobFilterProps> = ({
  filter,
  setFilter,
  // jobs
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    setFilter({
      ...filter,
      ...data
    })
    // clear input fields
    const inputFields = e.currentTarget.querySelectorAll('input')
    inputFields.forEach(input => (input.value = ''))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      job_type: e.currentTarget.checked ? e.currentTarget.name : ''
    })
  }

  return (
    <div className="jobs__filter">
      <span>Search Filter</span>
      <form className="form__options" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input__fields"
          placeholder="Job Category"
          name="job_category"
          id="job_category"
        />
        {/* <Options>
          {Array.from([...new Set([...jobs])]).map((job: any) => (
            <li key={job.slug}>{job.job_category}</li>
          ))}
        </Options> */}
      </form>
      <form className="form__options" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input__fields"
          placeholder="Job Position"
          name="name"
          id="name"
        />
        {/* <Options>
          {jobs.map((job: any) => (
            <li key={job.slug}>{job.name}</li>
          ))}
        </Options> */}
      </form>
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">Country</label>
        <input type="text" name="country" id="country" />
      </form>
      <form onSubmit={handleSubmit}>
        <label htmlFor="job_skill">Skill</label>
        <input type="text" name="job_skill" id="job_skill" />
      </form>
      <div className="filter__checkBox">
        <span>Job Type</span>
        <div className="check__box">
          <label htmlFor="fullTime">Full-time</label>
          <input
            type="checkbox"
            name="fullTime"
            id="fullTime"
            checked={filter.job_type === 'fullTime'}
            onChange={handleChange}
          />
        </div>

        <div className="check__box">
          <label htmlFor="partTime">Part-time</label>
          <input
            type="checkbox"
            name="partTime"
            id="partTime"
            checked={filter.job_type === 'partTime'}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="filter__active">
        {Object.entries(filter)
          .filter(([_, value]) => value !== '')
          .map(([key, value]) => (
            <span key={key} className="filter__active__item">
              <span>{value as string}</span>
              <button
                className="filter__btnx"
                onClick={() =>
                  setFilter({
                    ...filter,
                    [key]: ''
                  })
                }>
                &times;
              </button>
            </span>
          ))}
      </div>
    </div>
  )
}
