import React, { useState } from "react";
import { setFilterValues } from "../../../assets/js/playback";
import '../../../assets/styles/Filters.css'

function Filters({ onFilterSelect }) {
  const [filter, setFilter] = useState({
    type: null,
    coValue: 1,
    resValue: 0,
    collapse: false
  })

  const handleFilterClick = evt => {
    const filterCopy = {...filter};
    const selected = evt.target.id;
    if (filter.type === selected) {
      filterCopy.type = null;
    } else {
      filterCopy.type = selected;
    }

    if(filterCopy.type){
      setFilterValues({...filterCopy});
    }
    onFilterSelect(filterCopy.type);
    setFilter({...filterCopy});
  }

  const handleInputChange = evt => {
    const range = evt.target;
    const filterCopy = {...filter};

    if(range.id === 'filter-cutoff')
      filterCopy.coValue = range.value;
    if(range.id === 'filter-resonance')
      filterCopy.resValue = range.value;

    if(filterCopy.type)
      setFilterValues(filterCopy);

    setFilter({...filterCopy});
  }

  const handleDisplayClick = () => {
    setFilter(prev => ({...prev, collapse: !prev.collapse}));
  }
  

  return (
    <div className="filter">
      <h4>
        Filters 
        <span 
          className="display-option"
          onClick={handleDisplayClick}
        >
          {filter.collapse ? '-' : 'X'}
        </span>
      </h4>
      <div 
        className={`filter-content ${filter.collapse ? 'hide' : ''}`}
      >
        <div className="filter-selection">
          <button 
            className={`filter-type ${filter.type === 'highpass' ? 'active' : ''}`}
            id="highpass"
            onClick={handleFilterClick}
          >
            High Pass
          </button>
          <button 
            className={`filter-type ${filter.type === 'lowpass' ? 'active' : ''}`} 
            id="lowpass"
            onClick={handleFilterClick}
          >
            Low Pass
          </button>
        </div>
        <div className="filter-inputs">
          <label htmlFor="filter-cutoff">Cutoff</label>
          <input type="range" 
            id="filter-cutoff" 
            value={filter.coValue}
            className="rs-range"
            onChange={handleInputChange}
            step=".5"
            min="1"
            max="400"
          />
          <label htmlFor="filter-resonance">Resonance</label>
          <input 
            type="range" 
            id="filter-resonance" 
            value={filter.resValue}
            className="rs-range"
            onChange={handleInputChange}
            step=".1"
            min="0"
            max="10"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters