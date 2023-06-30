package com.javaguides.springReact.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaguides.springReact.modal.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
	//gets all CRUD methods from the parent
	

}
