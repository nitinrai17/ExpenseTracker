//import axios from 'axios';

//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/1.0'; 

export const fetchCategoryData = async () => {
		
	try{
		//return await axios.get(`${API_BASE_URL}/categories`);
		return await fetch('/api/1.0/categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

	}catch(error){
		
	}
};

export const saveCategoryData = async (category) => {
		
	try{
		 //await axios.post(`${API_BASE_URL}/category`,category).then(function (response) {
         //   console.log(response);
         //   return response;
		 // });
		 console.log(category);
		 return await fetch(`/api/1.0/category`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(category)
        }).then(function (response) {
			   console.log(response);
			   return response;
			 });
          
	}catch(error){
		
	}
};

export const deleteCategoryData = async (id) => {
		
	try{
		//return await axios.delete(`${API_BASE_URL}/category/${id}`);
		return await fetch(`/api/1.0/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
	}catch(error){
		
	}
};