/* A single point in a branch 
 * <position> the nodes position in space
 * <influencedBy> list of attractors influencing the node
 * <parent> the parent node
 * <isTip> is this the tip of the node branch?
*/
class Node {
    constructor(parent, position, direction) {
        // Member Variables
        this.parent = parent;
        this.position = position;
        this.direction = direction;
        
        this.influencedBy = [];
    }

    Draw() {
        if(this.parent != null) {
            const branch = new THREE.SplineCurve([
                new THREE.Vector2(this.parent.position.x, this.parent.position.y),
                new THREE.Vector2(this.position.x, this.position.y)
            ]);
            const points = branch.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({color: 0xff0000});
            const object = new THREE.Line(geometry, material);

            scene.add(object);
        } 
    }

}