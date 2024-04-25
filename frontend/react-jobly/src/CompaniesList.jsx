import "./CompaniesList.css";
import { Link } from 'react-router-dom';
import SearchForm from "./SearchForm";

function CompaniesList({ companies, setCompanies}) {

    return (<>
      <SearchForm setCompanies={setCompanies} />
      <div className="companies-list">
        {companies.map((company, index) => (
             <Link to={`/companies/${company.handle}`} key={index} className="company-link">
          <div className="company-card" key={index}>
            <h2 className="company-name">{company.name}</h2>
            <div className="company-details">
              <p>{company.description}</p>
              <p># of employees: {company.numEmployees}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
      </>
    );
  }

  
  
  export default CompaniesList