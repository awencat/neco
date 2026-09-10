"use strict";

/* 脆弱障碍（藤蔓） */

class VineEntity extends Entity {
  constructor(scene, x, y, w, h) {
    super(scene, 'fragile', x, y, 'tex_vine', w, h);
    this.sprite.setDisplaySize(w, h);
    this.breakable = true;
    if (scene.biome && scene.biome.grassTint !== undefined) {
      this.sprite.setTint(scene.biome.grassTint);
    }
  }
}
