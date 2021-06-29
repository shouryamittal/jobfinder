import React, { useState } from 'react';
import request from '../../utils/request';
import STATUS from '../../utils/statusCodes';

function SearchBar (props) {
    let [query, setQuery] = useState('');
    let [searchBy, setSearchBy] = useState('');
    let [err, setErr] = useState('');
    function handleQuery(e){
        setQuery(e.target.value);
        if(err){
            setErr('');
        }
    }

    async function handleSearch(e) {
        let reqType = e.target.value;
        if(reqType && query) {
            let resp = await request(`/job/search?text=${query}&type=${reqType}`, 'GET');
            let status = resp.status;
            resp = await resp.json();
            if(status === STATUS.SUCCESS){
                props.setData({jobs:resp.data, selectedTabId: 0, jobText: `All result including query: ${query}`});
                setSearchBy(reqType);
                setErr('');
            }
            else {
                setErr(`No Jobs Found`);  
            }
        }
        else{
            setErr(`Enter a search query`);
        }
    }

    return (
        <div className="searchBar">
            <div className="input-group searchInput">
                <input type="text" className="form-control searchInputBar" name="search" value={query} onChange={handleQuery} placeholder="Search Job"/>
                <select className="form-select" value={searchBy} onChange={handleSearch}>
                    <option disabled value=''>Search By</option>
                    <option value="title">Job Title</option>
                    <option value="recruiter">Recruiter's Name</option>
                    <option value="desc">Job Description</option>
                </select>
            </div>
           {err ?  <div className="errClass">{err}</div>:null}
        </div>
    );
}

export default SearchBar;