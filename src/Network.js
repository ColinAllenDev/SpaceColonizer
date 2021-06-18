/* Manages the growth of branches */
class Network {
    attractors = [];
    nodes = [];
    
    constructor() {}

    Start() {
        // Place Attractors in scene
        this.PlaceAttractors(25, null);
    }

    PlaceAttractors(count, shape) {
        var origin = new THREE.Vector3(0, 2, 0);
        // Place attractors at random points within bounds
        for(var i = 0; i < count; i++) {
            var position = Util.GetRandomPointInCircle(origin, 5);
            var attractor = new Attractor(position);
            
            // Draw and populate list
            attractor.Draw();
            this.attractors.push(attractor);
        }

        // Once attractors are placed, place nodes
        //this.PlaceNodes();
    }

    PlaceNodes() {
        // Create root node
        var root = new Node(null, new THREE.Vector3(0, -5, 0), new THREE.Vector3(0, 1, 0));
        var currentNode = root;
        this.nodes.push(currentNode);

        var hitAttractor = false;
        while(hitAttractor == false) {
            for(var i = 0; i < this.attractors.length; i++) {
                var distance = this.attractors[i].position.distanceTo(currentNode);
                
                if(distance < attrDist) {
                    hitAttractor = true;
                }
            }

            if(hitAttractor == false) {
                var newNode = new Node(currentNode, currentNode.position.add(currentNode.direction), new THREE.Vector3(0, 1, 0));
                currentNode = newNode;
                this.nodes.push(currentNode);

                currentNode.Draw();
            }
        }

        // While the distance from an attractor to a node is greater than the attrDist, create nodes
        // if the node is not within the shape of the attractor tree, create nodes in +y direction
        // if the node is in the shape of the tree, check for closest attractors near each
            // take the average direction of the closest attractors and apply it to each new node created
        // Once a node is within the killDist, the attractor will be destroyed and the nodes will stop growing
    }
}