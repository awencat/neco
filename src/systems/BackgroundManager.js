"use strict";

/* =========================================================================
 * [G] 背景管理器
 * ========================================================================= */

class BackgroundManager {
  constructor(scene) {
    this.scene = scene;

    this.bgFar = scene.add.tileSprite(0, 40, GAME_W, 300, 'tex_clouds')
      .setOrigin(0).setDepth(1).setAlpha(0.85).setTileScale(1.3, 1.3);

    this.bgNear = scene.add.tileSprite(0, GROUND_Y - 200, GAME_W, 200, 'tex_hills')
      .setOrigin(0).setDepth(2).setTileScale(1.5, 1);

    this.ground = scene.add.tileSprite(0, GROUND_Y, GAME_W, GROUND_H, 'tex_ground')
      .setOrigin(0).setDepth(3);

    this.grassStrip = scene.add.rectangle(0, GROUND_Y, GAME_W, 12, 0x5db03c)
      .setOrigin(0, 0).setDepth(4);
  }

  applyBiome(biome, instant) {
    this.bgFar.setTint(biome.cloudTint);
    this.bgNear.setTint(biome.hillTint);
    this.ground.setTint(biome.groundTint);
    this.grassStrip.setFillStyle(biome.grassTint);
    this.scene.cameras.main.setBackgroundColor(biome.skyColor);
  }

  update(dt, scrollSpeed) {
    this.bgFar.tilePositionX  += scrollSpeed * TUNING.world.bgFarFactor  * dt;
    this.bgNear.tilePositionX += scrollSpeed * TUNING.world.bgNearFactor * dt;
    this.ground.tilePositionX += scrollSpeed * dt;
  }
}
