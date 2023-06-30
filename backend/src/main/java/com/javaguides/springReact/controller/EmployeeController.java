package com.javaguides.springReact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaguides.springReact.exception.ResourceNotFoundException;
import com.javaguides.springReact.modal.Employee;
import com.javaguides.springReact.repo.EmployeeRepo;

import lombok.Delegate;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/employees")
public class EmployeeController {

	@Autowired
	private EmployeeRepo employeeRepo;
	
	@GetMapping
	public List<Employee> getAllEmployees(){
		return employeeRepo.findAll();
	}
	
	//build create employee rest api
	@PostMapping
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepo.save(employee);
	}
	
	//build get emplkoyee by iD
	@GetMapping("{id}")
	public ResponseEntity<Employee> getEmpByID(@PathVariable long id) {
		Employee employee = employeeRepo.findById(id).orElseThrow(
				()->new ResourceNotFoundException("Employee not exist with iD " +id)
		);
		return ResponseEntity.ok(employee);
	}
	
	//build an update employrr
	@PutMapping("{id}")
	public ResponseEntity<Employee> updateEmp(@PathVariable long id,@RequestBody Employee emp){
		Employee employee = employeeRepo.findById(id).orElseThrow(
				()->new ResourceNotFoundException("Employee nOt Found with ID :" +id)
		);
		
		employee.setEmail(emp.getEmail());
		employee.setFname(emp.getFname());
		employee.setLname(emp.getLname());
		
		employeeRepo.save(employee);
		
		return ResponseEntity.ok(employee);
	}
	
	//build delete Employee restAPI
	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id){
		Employee employee = employeeRepo.findById(id).orElseThrow(
				()->new ResourceNotFoundException("Employee Not OFund ID "+id));
		employeeRepo.delete(employee);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}
