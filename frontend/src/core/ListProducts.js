import React, {useState,useEffect} from 'react';
import Layout from './Layout'
import { getCategories,getFilterdData} from './apiCore'
import Card from  './Card';
import Filters from './Filters';
import PriceRange from './PriceRange'
import "./ListProducts.css"
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";


const ListProduct =()=>{

    const [values,setValues] = useState({minValue: '', maxValue: ''});
    const [categories, setCategories] = useState([]);
    const [myFilters,setMyfilters] = useState({ filters: {category :[], price: []} });
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(8)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [FilterdRes, setFilterdRes] = useState([])

    const Category = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        Category()
        loadFilterdData()
    }, []);

    const handleFilters = (filters,filterBy) => {
        console.log(filters,filterBy);
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        loadFilterdData(myFilters.filters)
        setMyfilters(newFilters);
    };

    const loadFilterdData =  newFilters => {
        getFilterdData(skip,limit,newFilters).then(data =>{
            if(data.error) {
                setError(data.error)
            }else{
                setFilterdRes(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMoreItems =  newFilters => {
        let toskip = skip+limit
        getFilterdData(toskip,limit,myFilters.filters).then(data =>{
            if(data.error) {
                setError(data.error)
            }else{
                setFilterdRes([...FilterdRes,...data.data])
                setSize(data.size)
                setSkip(toskip)
            }
        })
    }

    const buttonLoadMore =()=>{
        return(
            size > 0 && size >= limit && (
                <button onClick = {loadMoreItems} className="loadMore">More Items</button>
            )
            
        )

    }

    return ( <Layout>
        <div className="jumbotron">
            <div className="row">
                <aside className="col-md-2">
                    <article className="filter-group">
                        <h6 className="title"> Category Wise  </h6>
                        <div className="inner">
                            <ul className="list-menu">
                                <Filters categories={categories} handleFilters={filters => handleFilters(filters, "catgy")}></Filters>
                            </ul>
                        </div> 
                    </article> 
                    <article className="filter-group">
                        <h6 className="title"> Price range </h6>            
                        <PriceRange values={values} handleFilters={filters => handleFilters(filters, "price")}></PriceRange>                 
	            </article>   
                </aside >
             
                <div className="col-10">
                    <div className="container">
                        <h3 className="mb-3"> Filterd Results</h3>
                        <div  className="row row-sm">
                            {FilterdRes.map((product,i) =>(
                                <Card key={i} product={product}cardType={''}/>
                            ))}
                        </div>
                        <hr/>
                        
                        {buttonLoadMore()}

                    </div>
                </div>
               
            </div>            
    </div>
        <ScrollUpButton />
    </Layout>
    
    );    

}

export default ListProduct