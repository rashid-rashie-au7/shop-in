import React, {useState,useEffect} from 'react';

const Filters =({categories,handleFilters}) => {

    const [checked, setChecked] = useState([]);
    
    const handleChecked = chk => () => {
        const currentCategory = checked.indexOf(chk)
        const newChecked = [...checked]

        if(currentCategory === -1){
            newChecked.push(chk)
        } else {
            newChecked.splice(currentCategory,1)
        }
        setChecked(newChecked)
        handleFilters(newChecked)
    }

    return categories.map((cat, i) =>(
        <li key={i} className="list-unstyled">
            <input type="checkbox" className="form-check-input" onChange={handleChecked(cat.catgy)} value = {checked.indexOf(cat.catgy === -1)}/>
            <label className="form-check-label">{cat.catgy}</label>
        </li>
    ))
}

export default Filters
