import React, {useState,useEffect, Fragment} from 'react';
import {getSearchData} from './apiCore'
import Card from './Card'
import '../style.css';

const Search = () => {
    const [data,setData]= useState([]);
    const { search, results, searched } = data;

    const SearchData = () => {
        console.log(search)
        if(search){
            getSearchData({search:search || undefined}).then(res => {
                if(res.error){
                    console.log(res.error)
                } else {
                    setData({...data, results:res,searched:true})
                }
            })
        }
    }
    // const searchedMeaasge
    const SearchedPrdts = (results = []) =>{
        return(
        <div>
            <h2 className= ' mt-4 mb-4'>
                {/* {searchedMeaasge(searched,results)} */}
            </h2>
            <div className="container">
                    <div className="row row-sm ">    
                    {results.map((product, i) => (     
                            <Card key={i} product={product} />
                    ))}
                    </div>
                </div>   
           </div>
        )
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        SearchData()

    }
    const handleChange = name => event => {
        setData({...data, [name]: event.target.value, searched: false});
    }

    const searchForm = ()=> (
        <form onSubmit={searchSubmit} className="search-header">
            <div className="input-group w-100">
                <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Search" />    
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                        <i className="fa fa-search"></i> Search
                    </button>
                </div>
            </div>
        </form> 
   )

    return(
        <div>
        <div className="col-xl-6 col-lg-5 col-md-4 " style={{marginLeft: 'auto', marginRight:'auto'}}>
            {searchForm()}
        </div>
        
        <div>
            {SearchedPrdts(results)}
        </div>
        </div>
         
      
       
            
    );
}
export default Search