import data from './employees.json';
import { getBoss, getSubordinates, findLowestEmployee } from './getEmployees';
import { generateCompanyStructure, hireEmployee, fireEmployee, promoteEmployee, demoteEmployee} from './manageEmployees';

function main() {
    console.log('Normalizing JSON file...')
    const companyTree = generateCompanyStructure(data.employees)
    console.log()
    hireEmployee(companyTree,{name:'Jeb',jobTitle:'Specialist',boss:'Sarah',salary:'5000'},'Sarah')
    fireEmployee(companyTree,'Alicia','Sal');
    promoteEmployee(companyTree,'Jared')
    demoteEmployee(companyTree,'Xavier', 'Maria')
    console.log();
    getBoss(companyTree,'Bill')
    getSubordinates(companyTree,'Maria')

    findLowestEmployee(companyTree,'Nick')
}

main()
