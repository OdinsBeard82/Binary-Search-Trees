//creates root node
class Tree {
    constructor(root = null) {
  this.root = root;
}
}

Tree.prototype.addNode = function(n) {
  if (this.root == null) {
    this.root = n;
  }
};

 class Node {
    constructor(data, parent, left, right = null) {
  this.data = data;
  this.parent = parent;
  this.left = left;
  this.right = right;
    }
}

function buildTree(data) {
    if (node === null) {
        return;
    } else {
        return searchTree(node);
    }
}
function searchTree(node) {
    //if the data is less than node.data then 
    //node goes on tfe left
            if (data < node.data) {
                if (node.left === null) {
                    node.left = new Node(data);
                    return;
                }
//if node.left is not null, then return 
//searchTree(nodeleft), meaning continue searching
                else if (node.left !== null) {
                    return searchTree(node.left);
                }
//if the data is more than node.data, then put the 
//node on the right side.
            } else if (data > node.data) {
                if (node.right === null) {
                    node.right = new Node(data);
                    return;
// if the node.right does not equal null, keep searching
                } else if (node.right !==null) {
                    return searchTree(node.right);
                }
//data is not less than node.data or more than node.data(equal)
//then don't add data to tree
            } else {
                return null;
            }
        };
        return searchTree(node);
    

 function findMin() {
// set current node to root node.
    let current = this.root;
// while current.left does not equal null
    while (current.left !== null) {
// current node is current.left
        current =  current.left;
    
    }
    return current.data;
}

function findMax() {
    let current = this.root;
    while (current.right !=null) {
        current = current.right;
    }
    return current.data;
}

function find(data) {
    let current = this.root;
    while (current.data !== data) {
        if (data < current.data) {
            current = current.right;
        } else {
            current = current.right;
        }
        if (current === null) {
            return null;
        }
    }
    return current;
}

function isPresent(data) {
//set current node to root node
    let current = this.root;
//while current node is not null
    while(current) {
// if data is equal to current.data
        if(data === current.data) {
//the data has been found
            return true;
        }
//is data less than current.data
        if(data < current.data) {
// then current is current.left
            current = current.left;
        } else {
// otherwise current is current.right
            current = current.right;
        }
    }
//if it doesn't show true it is false
    return false;
}

function remove(data) {
// recursive function passing in the node and data we want to remove
    const removeNode = function(node, data) {
//
        if (node == null) {
            return null;
        }
        if (data == node.data) {
            //node has no children
            if (node.left == null && node.right == null) {
                return null;
            }
//node has no left child
           if (node.left == null) {
            return node.right;
           } 
//node has no right child
           if (node.right == null) {
            return node.left;
           }
//node has two children
           var tempNode = node.right;
           while (tempNode.left !== null) {
            tempNode = tempNode.left;
           }
           node.data = tempNode.data;
           node.right = removeNode(node.right, tempNode.data);

        }
    }
}



   





