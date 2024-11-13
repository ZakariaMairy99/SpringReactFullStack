import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState ('')
  const [lastName, setLastName] = useState ('')
  const [email, setEmail] = useState ('')

  const {id} = useParams();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const navigator = useNavigate ();

  useEffect(() =>{
    if(id){
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
      }).catch(error => {
        console.log(error)
      })
    }
  }, [id])

  function saveOrUpdateEmployee(event) {
    event.preventDefault()
    if(validateForm()){
      const employee = {firstName, lastName, email}
      console.log(employee)
      if(id){
        updateEmployee(id, employee).then((response)=>{
          console.log(response.data)
          navigator('/employees')
        }).catch(error => {
          console.log(error)
        })
      }else{
        createEmployee(employee).then((response) => {
          console.log(response.data)
          navigator('/employees')
        }).catch(error => {
          console.log(error)
        })
      }     
    }    
  }

  function validateForm() {
    let isValid = true
    const errorCopy = {...errors}
    if(firstName.trim()){
      errorCopy.firstName = '';
    }else{
      errorCopy.firstName = 'Enter First Name';
      isValid = false
    }
    if(lastName.trim()){
      errorCopy.lastName = '';
    }else{
      errorCopy.lastName = 'Enter Last Name';
      isValid = false
    }
    if(email.trim()){
      errorCopy.email = '';
    }else{
      errorCopy.email = 'Enter Email';
      isValid = false
    }
    setErrors(errorCopy);
    return isValid;
  }

  function pageTitle() {
    if(id){
      return <h2 className='text-center'>Update Employee</h2>
    }else{
      return <h2 className='text-center'>Add Employee</h2>
    }
  }

return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name</label>
                <input
                  type='text'
                  placeholder='Enter First Name'
                  name='firstName'
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name</label>
                <input
                  type='text'
                  placeholder='Enter Last Name'
                  name='lastName'
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email</label>
                <input
                  type='email'
                  placeholder='Enter Email'
                  name='email'
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(event) =>  setEmail(event.target.value)}                  
                />
              </div>
              {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              <button className='btn btn-success mt-2' onClick={saveOrUpdateEmployee}>Save</button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default EmployeeComponent