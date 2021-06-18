/* Manages the growth of branches */
class Tree {
    leaves = [];
    branches = [];
    
    constructor() {}

    Start() {
        // Place leaves in scene
        this.PlantLeaves(5, null);
    }

    // Creates the leaves of the tree at random points within a circle
    PlantLeaves(count, shape) {
        var origin = new THREE.Vector3(0, 2, 0);
        // Place leaves at random points within bounds
        for(var i = 0; i < count; i++) {
            var position = Util.GetRandomPointInCircle(origin, 5);
            var leaf = new Leaf(position);
            
            // Draw and populate list
            leaf.Draw();
            this.leaves.push(leaf);
        }

        // Once leaves are placed, plant branches
        this.PlantBranches();

        // Draw branches
        for(var i = 0; i < this.branches.length; i++) {
            this.branches[i].Draw();
        }
    }
    
    // Creates the 'roots' of the tree until it reaches the closest leaf
    PlantBranches() {
        // Create root branch
        var root = new Branch(null, new THREE.Vector3(0, -8, 0), new THREE.Vector3(0, 1, 0));
        var currentBranch = root;
        this.branches.push(currentBranch);

        var inRange = false;
        while(!inRange) {
            // Iterate leaves and compute distances
            for(var i = 0; i < this.leaves.length; i++) {
                // Distance between root and leaves
                var distance = this.leaves[i].position.distanceTo(currentBranch.position);
                // If we're inside the leaf distance, add to leaves branch
                if(distance < treeRange) {
                    inRange = true;
                }
            }
            
            // If we are out of range of attrDist, create new branches 
            if(!inRange) {
                // TODO: Refactor this
                var newPosition = currentBranch.position.clone().add(currentBranch.direction.clone());

                var newBranch = new Branch(currentBranch, newPosition, currentBranch.direction.clone());
                currentBranch = newBranch;
                this.branches.push(currentBranch);

                currentBranch.Draw();
            }

            // This is here to keep the program from crashing
            console.log(currentBranch.position.y)
            if(currentBranch.position.y >= 9) inRange = true;
        }

        // Start the growth process
        this.GrowTree();
    }

    // Grow the tree
    GrowTree() {
        // For each leaf, determine closest branch inbetween minimum and maximum distance
        for(var i = 0; i < this.leaves.length; i++) {
            var leaf = this.leaves[i];
            var closestBranch = null;
            var closestDistance = 100;
            // Iterate through branches per leaf
            for(var j = 0; j < this.branches.length; j++) {
                var branch = this.branches[j];
                var distance = leaf.position.distanceTo(branch.position);
                // If a node has reached a leaf
                if(distance < minDist) {
                    leaf.reached = true;
                    closestBranch = null;
                    break;
                } else if (distance > maxDist) { // Do nothing here
                // If we're within range, but have no closestBranch yet OR our distance is 
                // less than our current closestDistance, then update our records.
                } else if (closestBranch == null || distance < closestDistance) {
                    closestBranch = branch;
                    closestDistance = distance;
                }
            }

            // If we've found the closest branch, get the average direction vector
            if(closestBranch != null) {
                var newDirection = leaf.position.sub(branch.position);
                
                closestBranch.direction.add(newDirection.clone()); // Add this new direction to the closestBranch's current direction vector
                closestBranch.leafCount++;
            }
        }
    
        // Find leaves that intersected with branches and delete them
        for(var i = this.leaves.length-1; i >= 0; i--) {
            if(this.leaves[i].reached) {
                this.leaves[i].ChangeColor('0xff0000')
                this.leaves.splice(i, 1);
            }
        }

        // Traverse branches for those attracted to leaves, and plant new branches
        for(var i = this.branches.length-1; i >= 0; i--) {
            var branch = this.branches[i];
            if(branch.leafCount > 0) {
                // Get average direction among branches
                branch.direction.divideScalar(branch.leafCount); 
                var newPosition = branch.position.add(branch.direction);
                var newBranch = new Branch(branch, newPosition, branch.direction);

                this.branches.push(newBranch);
            }
            // Reset branch direction and leafCount
            branch.Reset();
        }

        
    }


}


/* ===== ALGORITHM ===== */
// While the distance from a leaf to a branch is greater than the attrDist, create branches
// if the node is not within the shape of the leaf tree, create nodes in +y direction
// if the node is in the shape of the tree, check for closest leaves near each
    // any node can have multiple leaves associated with it, but a leaf can only be associated with a single node
    // take the average direction of the closest leaves and apply it to each new node created
// Once a node is within the killDist, the leaf will be destroyed and the nodes will stop growing