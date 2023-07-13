 class Node {
    constructor(data, left = null, right = null) {
  this.data = data;
  this.left = left;
  this.right = right;
    }
}
//creates root node
class Tree {
    constructor() {
  this.root = null;
}

add(data) {
    const node = this.root;
    if (node === null) {
        this.root = new Node(data);
        return;
    } else {
        const searchTree = function(node) {
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
    }
}


findMin() {
// set current node to root node.
    let current = this.root;
// while current.left does not equal null
    while (current.left !== null) {
// current node is current.left
        current =  current.left;
    
    }
    return current.data;
}

findMax() {
    let current = this.root;
    while (current.right !=null) {
        current = current.right;
    }
    return current.data;
}

find(data) {
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

levelOrder(root) {
   if(root == null) 
   return;
   
   const queue = [root];
   const result = [];

   while(queue.length) {
    let len = queue.length;
    result.push(queue.map (node => node.val));

    while (len --) {
        let node = queue.shift();
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
   }
   return result;
    } 
        
isPresent(data) {
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

remove(data) {
    this.root = this.removeNode(this.root, data);
}
// recursive function passing in the node and data we want to remove
    removeNode(node, data) {
//is there an empty tree
        if (node == null) {
            return null;
        }
//does data = node.data
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
           let tempNode = node.right;
           while (tempNode.left !== null) {
            tempNode = tempNode.left;
           }
           node.data = tempNode.data;
           node.right = this.removeNode(node.right, tempNode.data);
           return node;
        } else if (data < node.data) {
        node.left = this.removeNode(node.left, data);
      } else {
        node.right = this.removeNode(node.right, data);
      }
      return node;
    }
  
    Inorder(node = this.root) {
      if (node !== null) {
        this.Inorder(node.left);
        console.log(node.data);
        this.Inorder(node.right);
      }
    }

    preorder(node = this.root) {
        if (node !== null) {
          console.log(node.data);
          this.preorder(node.left);
          this.preorder(node.right);
        }
      }

      postorder(node = this.root) {
        if (node !== null) {
          this.postorder(node.left);
          this.postorder(node.right);
          console.log(node.data);
        }
      }


      findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
    };
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left < right) {
            return left +1;
        } else {
            return right +1;
        };
    }


    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1)
    }

    reBalance() {
        
    }


    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left +1;
        } else {
            return right +1;
        };
    }


    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
  }
}
  
  function buildTree () {
  const numbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 645, 324];
  return numbers;
}

  const bst = new Tree();
  const numbers = buildTree();
  
  for (let i = 0; i < numbers.length; i++) {
    bst.add(numbers[i]); // Add each number to the binary search tree
    bst.remove(7);
    bst.remove(67);
    bst.add(109);
  }
  
  console.log("Minimum value:", bst.findMin());
  console.log("Maximum value", bst.findMax());
  console.log("levelOrder" , +  bst.levelOrder());
  console.log("findMinHeight " , bst.findMinHeight());
  console.log("findMaxHeight " , bst.findMaxHeight());
  console.log("isBalanced " , bst.isBalanced());
 
;
  bst.Inorder();
  bst.preorder();
  bst.postorder();
  bst.prettyPrint();
 





  
   