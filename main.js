/* Program Entry Point */

// Configuration
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 100;

// Components
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();

class Main {
    
    // Initialization
    static init() {
        // Event Listeners
        window.addEventListener('resize', this.onResizeWindow, false);

        // Set renderer size (set to false if we wanna scale with the window)
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

        // Position Camera
        camera.position.set(0, 0, 2);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    // The render 'loop'
    static render() {
        // Render Scene
        renderer.render(scene, camera);
    }

    // Resize window event listener
    static onResizeWindow() {
        console.log(canvas.clientWidth);

        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        Main.render();
    }

    // Add object to scene
    static AddToScene(obj) {
        scene.add(obj);
    }
}

Main.init();
Main.render();