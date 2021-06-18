class Branch extends THREE.Curve {
    constructor(scale = 1) {
        super();
        this.scale = scale;
    }

    GetPoint(root, target = new THREE.Vector3()) {
        return target.set(target.x, target.y, target.z).multiplyScalar(this.scale);
    }
}