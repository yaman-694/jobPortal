import { ChangeEvent, FormEvent, useState } from 'react'

import { useParams } from 'react-router-dom'
import { UserInformation } from '../interface'

export default function Onboarding() {
  const { id } = useParams()
  const [formData, setFormData] = useState<UserInformation>({
    role: '',
    skills: '',
    experience: 'junior',
    contract: 'full',
    location: '',
    education: '',
    resume: null
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, resume: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    data.append('role', formData.role)
    data.append('skills', formData.skills)
    data.append('experience', formData.experience)
    data.append('contract', formData.contract)
    data.append('location', formData.location)
    data.append('education', formData.education)
    data.append('resume', formData.resume as File)
    const response = await fetch(`/api/v1/crm/create/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: data
    })
    const res = await response.json()
    console.log(res)
  }

  return (
    <div className='container'>
      <h1>OnboardingForm</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Skills:
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </label>

        <br />
        <label>
          Work Experience:
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}>
            <option value="junior">0-1</option>
            <option value="mid-level">1-2</option>
            <option value="senior">3-4</option>
          </select>
        </label>

        <br />

        <label>
          Searching Form:
          <select
            name="contract"
            value={formData.contract}
            onChange={handleChange}>
            <option value="full">Full time</option>
            <option value="part-time">Part time</option>
            <option value="internship">Internship</option>
          </select>
        </label>

        <br />

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Education:
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Resume:
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </label>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
