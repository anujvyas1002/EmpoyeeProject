import AddEmployee from "./components/AddEmployee";
import EmployeeState from "./context/employees/EmployeeState";
import UpdateEmpoyee from "./components/UpdateEmployee";
// import EmployeeTable from "./components/EmployeeTable";


function App() {
  return (
    <div >
      
      <EmployeeState>
            <AddEmployee/>
            <UpdateEmpoyee/>
      </EmployeeState>
    </div>
  );
}

export default App;
