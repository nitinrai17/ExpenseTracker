//import axios from 'axios';
import { API_BASE_URL,ACCESS_TOKEN } from '../constants';

//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/1.0'; 

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};


export const fetchCategoryData = async () => {
		
	try{
		
		return await fetch('categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

	}catch(error){
		
	}
};

export function getAllCategories() {
    
    return request({
        url: '/categories',
        method: 'GET'
    });
}

export function createCategory(category) {
    
    return request({
        url: '/categories',
        method: 'POST',
        body: JSON.stringify(category)         
    });
}

export function removeCategory(id) {
    
    return request({
        url: `/categories/${id}`,
        method: 'DELETE'
    });
}


export function getAllExpenses() {
    
    return request({
        url: '/expenses',
        method: 'GET'
    });
}

export function createExpense(expense) {
    
    return request({
        url: '/expenses',
        method: 'POST',
        body: JSON.stringify(expense)         
    });
}

export function removeExpense(id) {
    
    return request({
        url: `/expenses/${id}`,
        method: 'DELETE'
    });
}


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