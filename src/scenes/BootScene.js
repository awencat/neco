"use strict";

/* =========================================================================
 * [I] BootScene —— 生成占位素材、注册动画
 * ========================================================================= */

class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  preload() {
    // ★ 后期替换真实素材时在此 load（详见 assets/README.md）：
    // this.load.image('tex_wall', 'assets/wall.png');
    // this.load.spritesheet('player_blue', 'assets/player_blue.png', { frameWidth: 20, frameHeight: 20 });
  }

  create() {
    TextureFactory.build(this);
    this.createAnimations();
    this.scene.start('MenuScene');
  }

  createAnimations() {
    Object.keys(CHARACTERS).forEach(key => {
      if (this.anims.exists('fly_' + key)) return;
      this.anims.create({
        key: 'fly_' + key,
        frames: [
          { key: `tex_player_${key}_0` },
          { key: `tex_player_${key}_1` },
        ],
        frameRate: 9,
        repeat: -1,
      });
    });
  }
}
