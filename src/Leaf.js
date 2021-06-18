/* The points in space that promote growth through attraction */
/* <position>: The position of the leaf in space */
/* <reached>: Has the leaf been reached by a branch? */
const minHeight = 2;

class Leaf {
    constructor(position) {  
        // Components
        this.geometry = new THREE.CircleGeometry(minDist, 12);
        this.material = new THREE.MeshBasicMaterial({color: 0xffff00});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        // Variables
        this.position = position;
        this.reached = false;
    }

    // TODO: Add shape parameter
    Draw() {
        Main.AddToScene(this.mesh);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }

    ChangeColor(color) {
        this.material.color.setHex(color);
    }

    /* ===== GETTERS ===== */
    static GetMinHeight() {
        return minHeight;
    }
}