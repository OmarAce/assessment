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
function fireEmployee() {}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
function promoteEmployee() {}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
function demoteEmployee() {}
