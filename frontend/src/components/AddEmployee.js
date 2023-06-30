import React, { useEffect, useState } from "react";
import EmpService from "../services/EmpService";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AddEmployee() {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
    const { id } = useParams();
    
    
  function saveUpdateEmp(e) {
    e.preventDefault();
      const employee = { fname, lname, email };
      
      if (id) {
          
          EmpService.updateEmployee(id, employee).then(response => {
              navigate("/employees")
          }).catch(error => {
              console.log(error)
          })
      } else {
        EmpService.createEmp(employee)
        .then((response) => {
          navigate("/employees");
        })
        .catch((error) => {
          console.log(error);
        });
      }
    console.log(employee);
    setFirstName("");
    setLastName("");
    setEmail("");

   
  }

  useEffect(() => {
    EmpService.getEmpbyID(id)
      .then((response) => {
        setFirstName(response.data.fname);
        setLastName(response.data.lname);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return <h1 className="text-center">Edit Employee</h1>;
    } else {
      return <h1 className="text-center">Add Employee</h1>;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body">
            {title()}
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="fname"
                  value={fname}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="lname"
                  value={lname}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
              <div className="row mt-4">
                <button
                  type="submit"
                  onClick={(e) => saveUpdateEmp(e)}
                  className="btn btn-primary  col-4"
                >
                  Submit
                </button>
                <div className="col-1"></div>
                <Link to="/employees" className="btn btn-dark col-4">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
