import React, {useState,useEffect} from 'react';

const PriceRange =({price,handleFilters}) => {

    const [values,setValues] = useState({minValue: '', maxValue: ''});
    const {minValue,maxValue} = values

    const handleChange = minValue => event =>{
        setValues({...values,[minValue]: event.target.value });
    };

    const handleClick =() => {
        let arr = [];
        arr.push(Number(values.minValue));
        arr.push(Number(values.maxValue))
        console.log(arr)
        handleFilters(arr);
    }

    return (
        <div>
        <div className="form-row">
        <div className="form-group col-md-6">
            <label>Min</label>
            <input onChange={handleChange('minValue')} className="form-control" placeholder="₹0" type="number" name = "minValue" value={minValue} />
        </div>
        <div className="form-group text-right col-md-6">
            <label>Max</label>
            <input className="form-control" placeholder="₹10000" type="number"  name ="maxValue" value={maxValue} onChange={handleChange('maxValue')}/>
        </div>
    </div> 
    <button onClick = {handleClick} className="btn btn-block btn-primary">Apply</button>
    </div>
    
       
  )
}

export default PriceRange