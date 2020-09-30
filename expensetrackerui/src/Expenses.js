import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Table, Container, Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';



class Expenses extends Component {


    emptyItem ={
        id:51,
        expenseDate: new Date(),
        description: '',
        amount: 0,
        category: {
            categoryId: 1,
            categoryName: 'Travel'
        }
    }

    constructor(props){
        super(props)
        this.state = {
            date: new Date(),
            isLoading: true,
            categories: [],
            expenses: [],
            item: this.emptyItem
          }

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleDateChange = this.handleDateChange.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const {item }= this.state;        
        await fetch(`/api/1.0/expense`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(item)
        });

        console.log(this.state.item);
        this.props.history.push('/expenses');

    }

    async handleDateChange(date){
        let item={...this.state.item};
        item.expenseDate =date;
        this.setState({item});
        console.log(item);
    }


    async handleChange(event){
        const target= event.target;
        const value= target.value;
        const name = target.name;

        let item = {...this.state.item};
        console.log(item);
        if(name === 'category' ) {
            let category= item.category;
            console.log(category);
            category.categoryId=value;
        }else{
            item[name]=value;
        }
        this.setState({item});
        console.log(this.state.item);

    }

    async remove(id){
        await fetch(`/api/1.0/expense/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(()=>{
            let updatedExpense=[...this.state.expenses].filter( i=> i.id !== id);
            this.setState({expenses : updatedExpense });
        });
    }

      async componentDidMount(){
        const response= await fetch('/api/1.0/categories');
        const body = await response.json();
        this.setState({categories : body, isLoading: false});

        const resExpenses= await fetch('/api/1.0/expenses');
        const bodyExpenses = await resExpenses.json();
        this.setState({expenses : bodyExpenses, isLoading: false});


      }


    render() { 

        const title= <h3>Add Expense</h3>;
        const {categories }= this.state;
        const {expenses, isLoading }= this.state;

        if(isLoading) 
            return(<div>Loading ......</div>) 

        let categoryList = 
            categories.map(category =>
                <option key={category.categoryId} value={category.categoryId}>
                    { category.categoryName}    
                </option>
            )
        
        let rows=
            expenses.map(expense =>
                <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.expenseDate}</td>
                    <td>{expense.category.categoryName}</td>
                    <td><Button size="sm" color="danger" onClick={()=> this.remove(expense.id)}>Delete</Button></td>
                </tr>
            
            )
        

        return ( 
            <div>
                <AppNav/> 
                 
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="text" name="description" id="description" onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="category" >Category</Label>
                            <select name="category" onChange={this.handleChange} autoComplete="name">
                                {categoryList}
                            </select>
                            
                        </FormGroup>

                        <FormGroup>
                            <Label for="date"> Date</Label>
                            <DatePicker selected={this.state.item.expenseDate}  onChange={this.handleDateChange}/>
                        </FormGroup>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3" >
                                <Label for="amount">Amount</Label>
                                <Input type="text" name="amount" id="amount" onChange={this.handleChange} autoComplete="name"/>
                            </FormGroup>
                        </div>
                        

                        <FormGroup>
                            <Button color="primary" type="submit" >Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/" >Cancel</Button>
                        </FormGroup>

                    </Form>
                </Container>


                <Container>
                    <h3> Expense List </h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="40%">Description</th>
                                <th width="15%">Amount</th>
                                <th width="25%">Date</th>
                                <th>Category</th>
                                <th width="10%">Action</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>

                    </Table>
                </Container>

            </div>     
        );
    }
}
 
export default Expenses;