

import { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from './AddUser.module.css';


const AddUser = props => {

    const[enteredUsername,setEnteredUsername] = useState('');
    const[enteredAge,setEnteredAge] = useState('');
    const[error, setError] =  useState();


    const usernameChangeHandler = (event) =>{
        setEnteredUsername(event.target.value);
    }

   const  ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

  

    const addUserHandler = (event) => {
        event.preventDefault();

        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: 'Invalid Input',
                message: 'Please Enter a valid name or Age (non - empty)'
            });
            return;
        }

        if(+enteredAge < 1){
            setError({
                title: 'Invalid Age',
                message: 'Please Enter a valid Age (greater then zero)'
            });
            return;
        }

        props.onAddUser(enteredUsername,enteredAge);
        
        setEnteredUsername('');
        setEnteredAge('');

    }



    return (
        <div>
       {error &&  <ErrorModal onErrorReset={errorHandler} title={error.title} message={error.message} ></ErrorModal> }
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Your Name:</label>
                <input type="text" id="username" value={enteredUsername} onChange={usernameChangeHandler}/>
                <label htmlFor="age">Your age:</label>
                <input type='number' id="age" value={enteredAge} onChange={ageChangeHandler}/>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
        </div>
    )

}

export default AddUser;