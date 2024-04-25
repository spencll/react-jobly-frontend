import JoblyApi from '../../../backend/helpers/api'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./CompanyDetails.css"

function CompanyDetails() {

    // Parem extraction
    const {handle} = useParams()
    // Company state 
    const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyDetails();
  }, [handle]);

    return (
          <div className="company-card">
            <h2 className="company-name">{company.name}</h2>
            <div className="company-details">
              <p>{company.description}</p>
              <p># of employees: {company.numEmployees}</p>
            </div>
          </div>
        )
  }

  export default CompanyDetails