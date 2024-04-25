import "./JobsList.css"
import SearchForm from "./SearchForm"
import JoblyApi from "../../../backend/helpers/api";
import { Link } from "react-router-dom";

function JobsList({jobs, setJobs, userInfo, setUserInfo}) {
    async function apply(id) {
        if (!userInfo.applications.includes(id)) await JoblyApi.applyToJob(userInfo.username,id );
        // After applying for a job, update userInfo state
        const updatedUserInfo = await JoblyApi.getUser(userInfo.username);
        setUserInfo(updatedUserInfo);
      }

    return (<>
       <SearchForm setJobs={setJobs} />

        <div className="job-list">
        {jobs.map((job, index) => (
           <div className="job-card" key={index}>
           <Link to={`/jobs/${job.id}`} className="job-link">
             <h2 className="job-title">{job.title}</h2>
             <div className="job-details">
               <p>{job.companyHandle}</p>
               <p>Salary: {job.salary}</p>
               <p>Equity: {job.equity}</p>
             </div>
           </Link>
           <div className="apply-button-container">
             {!userInfo.applications.includes(job.id) ? (
               <button onClick={() => apply(job.id)}>Apply</button>
             ) : null}
           </div>
         </div>

        ))}
      </div>

      </>
    )
  }

  export default JobsList