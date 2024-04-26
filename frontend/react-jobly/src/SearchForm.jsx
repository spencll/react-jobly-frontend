import React, {useState} from "react";
import JoblyApi from './api';
import { useLocation } from 'react-router-dom';

// Submission would be the search terms
// Sends API get request to company or job and returns Search list


// Bringing down functions for changing state as props
function SearchForm({setCompanies, setJobs}) {

    const location = useLocation();

    // Initial value depends on route
    let INITIAL_VALUE;
    location.pathname === '/companies' ? 
  INITIAL_VALUE= {
        name: "",
        minEmployees: 0,
        maxEmployees: 999999
      } : INITIAL_VALUE= {
        title: "",
        minSalary: "",
        hasEquity: false
      } 
  // Used for clearing form 

    // state for form input
    const [formData, setFormData] = useState(INITIAL_VALUE);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    

    // matches input value to what was typed
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value})
    };

    // changing hasEquity to true/false and showing check mark accordingly
    const handleCheckBoxChange = (event) => {
        const { name, checked } = event.target;
        setFormData({ ...formData, [name]: checked})
      };

    //More option toggle
    const toggleMoreOptions = () => {
        setShowMoreOptions(!showMoreOptions);
      };

    // Prevents empty submission/category. Adds item to appropriate state array. Clears input and redirect to changed menu.
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (location.pathname === '/companies'){
        try {
            const companiesData = await JoblyApi.searchCompanies(formData);
            setCompanies(companiesData); 
          } catch (error) {
            console.error('Error fetching companies:', error);
          }
        }
        else {
        try {
            const jobsData = await JoblyApi.searchJobs(formData);
            setJobs(jobsData); 
          } catch (error) {
            console.error('Error fetching jobs:', error);
          }
        }
      setFormData(INITIAL_VALUE)
    };
  
    return (
      <form onSubmit={handleSubmit} >
        <h1>Search!</h1>
        {location.pathname === '/companies' ? (<><label htmlFor="name" >Name (required) </label>
        <input
        id="name"
        name="name"
        placeholder="name"
        value={formData.name}
        onChange={handleChange}
      /></>) : (<><label htmlFor="title" >Title (required) </label>
      <input
      id="title"
      name="title"
      placeholder="title"
      value={formData.title}
      onChange={handleChange}
    /></>)}

<button type="button" onClick={toggleMoreOptions}>
        {showMoreOptions ? 'Less Options' : 'More Options'}
      </button>

         {/* Additional search options */}
         {showMoreOptions && (
        <>
          
          {/* Additional search for companies */}
          {location.pathname === '/companies' ? (<> <label htmlFor="minEmployees">Minimum # of employees</label>
          <input
            id="minEmployees"
            name="minEmployees"
            placeholder="Minimum employees"
            value={formData.minEmployees}
            onChange={handleChange}
          /> 
          
          <label htmlFor="maxEmployees">Maximum # of employees</label>
          <input
            id="maxEmployees"
            name="maxEmployees"
            placeholder="Maximum employees"
            value={formData.maxEmployees}
            onChange={handleChange}
          /> 

              {/* Additional search for jobs */}
          </>) : (<> <label htmlFor="minSalary">Minimum salary</label>
          <input
            id="minSalary"
            name="minSalary"
            placeholder="Minimum salary"
            value={formData.minSalary}
            onChange={handleChange}
          /> 
          
          <label htmlFor="hasEquity">Has equity</label>
          <input
    type="checkbox"
    id="hasEquity"
    name="hasEquity"
    checked={formData.hasEquity}
    onChange={handleCheckBoxChange}
/>
          
          
          </>) }
         
        </>
      )}

        <button type="submit">Search!</button>
      </form>
    );
  }
  
// end

export default SearchForm
