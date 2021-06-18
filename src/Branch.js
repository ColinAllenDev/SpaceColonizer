/* A branch with a parent (unless root), position and direction
 * <parent> the parent branch
 * <position> the branches' position in space
 * <direction> the branches' direction vector
 * <influencedBy> list of leaves influencing the branch
*/
class Branch {
    constructor(parent, position, direction) {
        this.parent = parent;
        this.position = position;
        this.direction = direction;
        this.originalDirection = direction.clone();

        this.influencedBy = [];
        this.leafCount = 0; // may remove this
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

    Reset() {
        this.direction = this.originalDirection.clone();
        this.leafCount = 0;
    }

}