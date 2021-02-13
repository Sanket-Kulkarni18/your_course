import React,{useContext} from 'react';
import {userContext} from '../context/userContext';

const Profilepage=({name})=>{
	const {userState}=useContext(userContext);
	console.log(userState)
	return(
     <></>
		)

}

export default Profilepage;