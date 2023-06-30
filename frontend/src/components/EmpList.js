import React, { useEffect, useState } from "react";
import EmpService from "../services/EmpService";
import AddEmployee from "./AddEmployee";
import { Link } from "react-router-dom";

export default function EmpList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmp();
  }, []);

  const getAllEmp = () => {
    EmpService.getAllEmp()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dltEmp = (id) => {
    EmpService.deleteEmployee(id)
      .then((response) => {
        getAllEmp();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-4 mb-4">
        <span className="h3 text-center">List Of Employee</span>
        <Link to="/add-emp" className="mx-5 btn btn-dark ">
          Add Employee
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
          </tr>
        </thead>

        {employees.length === 0 ? (
          <h3 className="text-center">Empty</h3>
        ) : (
          employees.map((employee) => (
            <tbody>
              <tr key={employee.id}>
                <th scope="row">{employee.id}</th>
                <td>{employee.fname}</td>
                <td>{employee.lname}</td>
                <td>{employee.email}</td>
                <td>
                  <Link
                    to={`/edit-emp/${employee.id}`}
                    className="btn btn-warning mx-3"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => {
                      dltEmp(employee.id);
                    }}
                    className=" btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))
        )}
      </table>
    </div>
  );
}
