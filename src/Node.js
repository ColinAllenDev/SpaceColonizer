/* A single point in a branch 
 * <position> the nodes position in space
 * <influencedBy> list of attractors influencing the node
 * <parent> the parent node
 * <isTip> is this the tip of the node branch?
*/
class Node {
    constructor(parent, position, isTip) {
        // Member Variables
        this.parent = parent;
        this.position = position;
        this.isTip = isTip;
        
        this.influencedBy = [];
    }
}