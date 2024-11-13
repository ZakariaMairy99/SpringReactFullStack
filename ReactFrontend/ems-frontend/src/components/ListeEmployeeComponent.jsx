import React, { useEffect, useState } from 'react'
import { listEmployees, deleteEmployee  } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListeEmployeeComponent = () => {

  const [employees, setEmployees] = useState([])
  const navigator = useNavigate();

  useEffect (() => {
    getAllEmployees();
  }, [])

  function getAllEmployees(){
    listEmployees().then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      console.log(error)
    })
  }

  function addNewEmployee(){
    navigator('/add-employee');
  }

  function updateEmployee(id){
    navigator(`/edit-employee/${id}`);
  }

  function removeEmploye(id){
    console.log(id);
    deleteEmployee(id).then((response) => {
      getAllEmployees();
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className='container'>
      <h2 className="text-center m-4">Liste des employés</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
      <table className="table table-striped table-hover table-bordered ">
        <thead className="table-dark">
          <tr>
            <th>Id :</th>
            <th>First Name : </th>
            <th>Last Name : </th>
            <th>Email :</th>
            <th>Actions :</th>
          </tr>
        </thead>
        <tbody className="table-group-divider table-light">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button className='btn btn-primary me-2 mb-1' onClick={() => updateEmployee(employee.id)} style={{marginLeft: "10px"}}>Edit</button>
                <button className='btn btn-danger me-2 mb-1' onClick={() => removeEmploye(employee.id)} style={{marginLeft: "10px"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListeEmployeeComponent