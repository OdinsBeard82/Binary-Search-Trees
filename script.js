class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

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
            const searchTree = function (node) {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }

    findMin() {
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    findMax() {
        let current = this.root;
        while (current.right != null) {
            current = current.right;
        }
        return current.data;
    }

    find(data) {
        let current = this.root;
        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
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
        if (root == null) return;

        const queue = [root];
        const result = [];

        while (queue.length) {
            let len = queue.length;
            result.push(queue.map(node => node.data));

            while (len--) {
                let node = queue.shift();
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
        }
        return result;
    }

    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, data) {
        if (node == null) {
            return null;
        }
        if (data == node.data) {
            if (node.left == null && node.right == null) {
                return null;
            }
            if (node.left == null) {
                return node.right;
            }
            if (node.right == null) {
                return node.left;
            }
            let tempNode = node.right;
            while (tempNode.left !== null) {
                tempNode = tempNode.left;
            }
            node.data = tempNode.data;
            node.right = this.removeNode(node.right, tempNode.data);
            return node;
        } else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        } else {
            node.right = this.removeNode(node.right, data);
            return node;
        }
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
        }
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        return Math.min(left, right) + 1;
    }

    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        }
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        return Math.max(left, right) + 1;
    }

    isBalanced() {
        return this.findMinHeight() >= this.findMaxHeight() - 1;
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

    drawNode(ctx, node, x, y, angle, depth) {
        if (node === null) return;

        const radius = 20;
        const xOffset = 60 * Math.pow(0.7, depth);
        const yOffset = 80;

        const leftX = x - xOffset;
        const rightX = x + xOffset;
        const nextY = y + yOffset;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();

        ctx.font = '14px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(node.data, x, y + 5);

        if (node.left) {
            ctx.beginPath();
            ctx.moveTo(x, y + radius);
            ctx.lineTo(leftX, nextY - radius);
            ctx.stroke();
            this.drawNode(ctx, node.left, leftX, nextY, angle - Math.PI / 4, depth + 1);
        }

        if (node.right) {
            ctx.beginPath();
            ctx.moveTo(x, y + radius);
            ctx.lineTo(rightX, nextY - radius);
            ctx.stroke();
            this.drawNode(ctx, node.right, rightX, nextY, angle + Math.PI / 4, depth + 1);
        }
    }

    drawTree(ctx) {
        const canvas = document.getElementById('bstCanvas');
        const startX = canvas.width / 2;
        const startY = 50;
        this.drawNode(ctx, this.root, startX, startY, 0, 0);
    }
}

// Build the tree and visualize it
const bst = new Tree();
const numbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 645, 324];

for (let i = 0; i < numbers.length; i++) {
    bst.add(numbers[i]);
}

// Drawing the tree on the canvas
const canvas = document.getElementById('bstCanvas');
const ctx = canvas.getContext('2d');
bst.drawTree(ctx);

// Debugging outputs in the console
console.log("Minimum value:", bst.findMin());
console.log("Maximum value", bst.findMax());
console.log("Level Order:", bst.levelOrder(bst.root));
console.log("Find Min Height:", bst.findMinHeight());
console.log("Find Max Height:", bst.findMaxHeight());
console.log("Is Balanced:", bst.isBalanced());

bst.Inorder();
bst.preorder();
bst.postorder();
bst.prettyPrint();


// Display tree information
document.getElementById('minValue').innerText = bst.findMin();
document.getElementById('maxValue').innerText = bst.findMax();
document.getElementById('levelOrder').innerText = JSON.stringify(bst.levelOrder(bst.root));
document.getElementById('minHeight').innerText = bst.findMinHeight();
document.getElementById('maxHeight').innerText = bst.findMaxHeight();
