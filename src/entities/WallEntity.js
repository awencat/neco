"use strict";

/* 墙式障碍（管道） */

class WallEntity extends Entity {
  constructor(scene, x, fromTop, height, width) {
    const y = fromTop ? height / 2 : GROUND_Y - height / 2;
    super(scene, 'wall', x, y, 'tex_wall', width, height);

    this.sprite.setDisplaySize(width, height);
    this.sprite.setDepth(10);

    if (scene.biome && scene.biome.wallTint !== undefined) {
      this.sprite.setTint(scene.biome.wallTint);
    }
  }
}
