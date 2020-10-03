import React, { Component } from 'react';
import AppNav from './AppNav';
import { Container, Form, FormGroup, Button, Label, Input } from 'reactstrap';


class Home extends Component {
    
    emptyItem={
        categoryName: ''
    }

    state = { 
        isLoading: true,
        categories : [],
        item: this.emptyItem
     }

     constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            categories: [],
            item: this.emptyItem
          }

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(event){
        const target= event.target;
        const value= target.value;
        const name = target.name;

        let item = {...this.state.item};
        item[name]=value;
        this.setState({item});
        console.log(this.state.item);

    }


    async handleSubmit(event){
        event.preventDefault();
        const {item }= this.state;
        console.log(this.state.item.categoryName);
        const response= await fetch(this.state.item.categoryName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        

    }

    
    render() { 
        return ( 
            <div> 
                <AppNav/>
                <h2 style={{display:'flex', justifyContent:'center', alignItems:'center', height:'75vh'}}> 
                    Welcome to Easy Expense Tracker App :) </h2>

                    <Container>
                    <h2>Categories</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="category">URL</Label>
                            <Input type="text" name="categoryName" id="category" onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit" >Save</Button>{' '}
                            
                        </FormGroup>

                    </Form>
                </Container>    
            </div> 
             );
    }
}
 
export default Home;