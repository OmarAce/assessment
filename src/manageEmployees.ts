import { getEmployee } from "./getEmployees"

export type Employee = {
    name:string
    jobTitle:string
    boss:string|null
    salary:string
}

export class TreeNode {
    name: string
    boss: string
    descendants: TreeNode[]

    constructor(name:string, boss:string) {
        this.name = name
        this.boss = boss
        this.descendants = []
    }
}

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */
 export function generateCompanyStructure(employeesArr:Employee[]) : TreeNode {
    const root = new TreeNode(employeesArr[0].name, employeesArr[0].boss)
    console.log('Generating employee tree...')
    employeesArr.forEach(employee => {
        if(employee.boss !== null)
            hireEmployee(root,employee,employee.boss,"initialization")
    });
    return root;
}

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */

 export function hireEmployee(tree: TreeNode, newEmployee: Employee, bossName: string, initialization?: string) : void {
    //Retrieves Name from Email
    let employeeName = newEmployee.name.split('@')[0];
    employeeName = employeeName.charAt(0).toUpperCase() + employeeName.slice(1)
    const bossNode = getEmployee(tree,bossName);
    bossNode.node.descendants.push(new TreeNode(employeeName, newEmployee.boss))
    //Added to have expected output to console to ignore logs of company structure generation, completely optional
    if (!initialization){
        console.log(`[hireEmployee]: Added new employee (${employeeName}) with ${bossName} as their boss`)
    }
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */

 export function fireEmployee(tree: TreeNode, firedName:string, replacementName?:string) : void {
    const firedEmployeeNode = getEmployee(tree,firedName);
    if(!firedEmployeeNode){
        console.log(`Could not find any employee with the name: ${firedName}`)
    }
    else{
        const bossNode = getEmployee(tree,firedEmployeeNode.node.boss)
        let replacementNode : TreeNode;
    
        if(firedEmployeeNode.node.descendants.length == 0){
            bossNode.node.descendants = bossNode.node.descendants.filter(descendant => descendant.name !== firedName)
        }
        else{
            if(replacementName){ 
                replacementNode = firedEmployeeNode.node
                firedEmployeeNode.node.name = replacementName;
                firedEmployeeNode.node.descendants.push(...replacementNode.descendants)
                firedEmployeeNode.node.descendants.forEach(descendant => descendant.boss = replacementNode.name)
                firedEmployeeNode.node.descendants = firedEmployeeNode.node.descendants.filter(descendant => descendant.name !== replacementNode.name)

            }
            if(!replacementName){
            // Select random descendant

            replacementNode = firedEmployeeNode.node.descendants[Math.floor(Math.random() * firedEmployeeNode.node.descendants.length)]
            
            // Override firedEmployee with a random descendant
            firedEmployeeNode.node.name = replacementNode.name;
            firedEmployeeNode.node.descendants.push(...replacementNode.descendants)
            firedEmployeeNode.node.descendants.forEach(descendant => descendant.boss = replacementNode.name)
            firedEmployeeNode.node.descendants = firedEmployeeNode.node.descendants.filter(descendant => descendant.name !== replacementNode.name)
            }
            
        }
        console.log(`[fireEmployee]: Fired ${firedName} and replaced with ${replacementNode.name}`);
    }   
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */

 export function promoteEmployee(tree: TreeNode, employeeName:string) : void {

    const employeeNode = getEmployee(tree,employeeName);
    if(employeeNode.node.boss != null){

        const bossNode = getEmployee(tree,employeeNode.node.boss)
    
        employeeNode.node.name = bossNode.node.name
        employeeNode.node.boss = employeeName
        bossNode.node.name = employeeName
    
        bossNode.node.descendants.forEach(descendant => {
            descendant.boss = employeeName
        });

        console.log(`[promoteEmployee]: Promoted ${employeeName} and made ${employeeNode.node.name} his/her subordinate`);        
    }
}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */

 export function demoteEmployee(tree: TreeNode, employeeName:string, subordinateName: string) : void {
    const subordinateEmployeeNode = getEmployee(tree,subordinateName);
    const subordinateBossEmployeeNode = getEmployee(tree,subordinateEmployeeNode.node.boss);
    const demotedEmployeeNode = getEmployee(tree,employeeName);

    demotedEmployeeNode.node.name = subordinateName
    demotedEmployeeNode.node.descendants.push(...subordinateEmployeeNode.node.descendants,new TreeNode(employeeName,subordinateName))
    demotedEmployeeNode.node.descendants.forEach(descendant => { descendant.boss = subordinateName });

    subordinateBossEmployeeNode.node.descendants = subordinateBossEmployeeNode.node.descendants.filter(descendant => descendant.name !== subordinateName)

    console.log(`[demotedEmployee]: Demoted employee (demoted ${employeeName} and replaced with ${subordinateName})`);
}
