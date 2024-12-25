/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
  constructor(meshDrawer, trs, parent = null) {
    this.meshDrawer = meshDrawer;
    this.trs = trs;
    this.parent = parent;
    this.children = [];

    if (parent) {
      this.parent.__addChild(this);
    }
  }

  __addChild(node) {
    this.children.push(node);
  }
  draw(mvp, modelView, normalMatrix, modelMatrix) {
    /**
     * @Task1 : Implement the draw function for the SceneNode class using the TRS class.
     */

    // Get the transformation matrix for the current node
    const transformationMatrix = this.trs.getTransformationMatrix();

    // Apply the current node's transformations to the provided matrices
    const transformedModel = MatrixMult(modelMatrix, transformationMatrix);
    const transformedModelView = MatrixMult(modelView, transformationMatrix);
    const transformedMvp = MatrixMult(mvp, transformationMatrix);
    const transformedNormals = MatrixMult(normalMatrix, transformationMatrix); // Assumes normals transformation is uniform scaling

    // Draw the MeshDrawer for the current node
    if (this.meshDrawer) {
      this.meshDrawer.draw(
        transformedMvp,
        transformedModelView,
        transformedNormals,
        transformedModel
      );
    }

    // Recursively draw child nodes
    for (const child of this.children) {
      child.draw(
        transformedMvp,
        transformedModelView,
        transformedNormals,
        transformedModel
      );
    }
  }
}
