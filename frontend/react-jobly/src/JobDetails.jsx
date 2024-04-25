import JoblyApi from '../../../backend/helpers/api'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./JobDetails.css"

function JobDetails() {

    // Parem extraction
    const {title} = useParams()
    // Job state
    const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await JoblyApi.getJob(title);
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [title]);

    return (
          <div className="job-card">
            <h2 className="job-title">{job.title}</h2>
            <div className="job-details">
              <p>Salary: {job.salary}</p>
              <p>Equity: {job.equity}</p>
            </div>
          </div>
        )
  }

  export default JobDetails