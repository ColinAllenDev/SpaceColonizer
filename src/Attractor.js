/* The points in space that promote growth through attraction */
/* <position>: The position of the attractor in space */
/* <influenceNodes>: The nodes the attractor is influencing */ 
const attrDist = 1;
const killDist = 0.25;

const minHeight = 2;

class Attractor {
    constructor(position) {
        this.position = position;
        this.influenceNodes = [];
    }

    // TODO: Add shape parameter
    Draw() {
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({color: 0xffff00});
        const mesh = new THREE.Mesh(geometry, material);

        Main.AddToScene(mesh);
        mesh.position.set(this.position.x, this.position.y, this.position.z);
    }

    /* ===== GETTERS ===== */
    static GetMinHeight() {
        return minHeight;
    }
}