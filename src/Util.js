class Util {
    // TODO: Maybe change these cirlce functions into a shape object? Idk
    static GetRandomPointInCircle(center, radius) {
        var r = radius * Math.sqrt(THREE.MathUtils.randFloat(0, 1));
        var theta = THREE.MathUtils.randFloat(0, 1) * 2 * Math.PI;

        var vector = new THREE.Vector2(center.x + r * Math.cos(theta), center.y + r * Math.sin(theta));
        return vector;
    }

    static IsPointInCircle(point, center, radius) {
        var x = Math.pow((point.x - center.x), 2);
        var y = Math.pow((point.y - center.y), 2);
        if(x + y < Math.pow(radius, 2)) {
            return true;
        } else {
            return false;
        }
    }
}