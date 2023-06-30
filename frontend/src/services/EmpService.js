import axios from "axios";

const EMP_REST_URL = "http://localhost:8090/api/v1/employees";

class EmpService{
    getAllEmp() {
        return axios.get(EMP_REST_URL);
    }
    createEmp(employee) {
        return axios.post(EMP_REST_URL,employee)
    }
    getEmpbyID(id) {
        return axios.get(EMP_REST_URL+'/'+id)
    }
    updateEmployee(empId, employee) {
        return axios.put(EMP_REST_URL+'/'+empId,employee)
    }
    deleteEmployee(empId) {
        return axios.delete(EMP_REST_URL+'/'+empId)
    }
}
export default new EmpService();