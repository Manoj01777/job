import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";


//this context is used to manage central logic and api calls in this single context file
 export const AppContext=createContext()


 export const AppContextProvider=(props)=>
 {
    const[searchFilter,setSearchFilter]=useState(
        {
            title:'',
            location:'',

        }
    )
    const[isSearched,setIsSearched]=useState(false)
    const[jobs,setJobs]=useState([])
    const[showRecruiterLogin,setShowRecruiterLogin]=useState(false)

    //function to fetch job data
    const fetchJobs=async()=>
    {
        setJobs(jobsData)
    }

    useEffect(()=>{
        fetchJobs()
    },[])

    const value=
    {
        searchFilter,setSearchFilter,isSearched,setIsSearched,jobs,jobsData,showRecruiterLogin,setShowRecruiterLogin

    }
    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
 }


 