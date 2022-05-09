import data from './employees.json';
import {generateCompanyStructure, hireEmployee, fireEmployee} from './manageEmployees';


function main() {
    console.log('Normalizing JSON file...')
    const companyTree = generateCompanyStructure(data.employees)
    console.log()
    hireEmployee(companyTree,{name:'Jeb',jobTitle:'Specialist',boss:'Sarah',salary:'5000'},'Sarah')
    fireEmployee(companyTree,'Alicia','Sal');
}

main()
