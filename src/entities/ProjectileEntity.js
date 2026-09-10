"use strict";

/* 抛物线抛射物（喷出的岩浆 / 落石） */

class ProjectileEntity extends Entity {
  constructor(scene, x, y, tex, w, h, vx, vy, gravity) {
    super(scene, 'free', x, y, tex, w, h);
    this.sprite.setDisplaySize(w, h);
    this.vx = vx;
    this.vy = vy;
    this.grav = gravity;
    this.spin = 200;
  }

  update(dt, scrollSpeed) {
    this.vy += this.grav * dt;
    this.x += (this.vx - scrollSpeed) * dt;
    this.y += this.vy * dt;

    this.sprite.setPosition(this.x, this.y);
    this.sprite.angle += this.spin * dt;
  }

  offscreen() {
    if (this.y > GAME_H + 150) return true;
    return super.offscreen();
  }
}
