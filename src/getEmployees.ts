import { TreeNode } from "./manageEmployees";

export function getEmployee(tree: TreeNode, employeeName: string) : {node : TreeNode, depth : number} {
    let depth = 0;
    // create a queue and a variable to store the values of nodes visited  
    let queue = []
    // initiate a node variable to store the current node
    let node : TreeNode;
    // push the root node to the queue   
    queue.push(tree)
    // loop as long as there is anything in the queue
    while(queue.length){
        let size = queue.length
        for(let i = 0; i < size; i++){
            // dequeue a node from the queue 
            node = queue.shift()
                        
            if(node.name.toUpperCase() === employeeName.toUpperCase()) {
                return {node:node,depth:depth};
            }
            queue.push(...node.descendants)          
        }        
        depth++;        
    }
}


/**
 * Given an employee, will find the node above (if any).
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function getBoss() {

}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
function getSubordinates() {

}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function findLowestEmployee() {

}