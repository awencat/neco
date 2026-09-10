# assets/

目前游戏**不依赖任何外部素材**——所有贴图都由 `src/gfx/TextureFactory.js` 用 `Phaser.GameObjects.Graphics` 在运行时程序化绘制并烘焙成纹理。

这个目录留作**替换真实美术资源**的位置。

## 替换步骤

1. 把图片按下面的文件名放进本目录。
2. 打开 `src/scenes/BootScene.js`，在 `preload()` 中加载：

   ```js
   preload() {
     this.load.image('tex_wall', 'assets/wall.png');
     this.load.spritesheet('player_blue', 'assets/player_blue.png', {
       frameWidth: 20, frameHeight: 20,
     });
   }
   ```

3. 在 `src/gfx/TextureFactory.js` 的 `build()` 中注释掉对应的 `makeXxx(scene)` 调用，避免纹理 key 被程序化贴图覆盖。

> 注意：只要 `preload()` 里已经加载了同名 key，`generateTexture` 就会因 key 冲突而报错，所以第 3 步必须做。

## 纹理 key 与规格清单

| key | 尺寸 (px) | 对应文件建议 | 说明 |
| --- | --- | --- | --- |
| `tex_clouds` | 480 × 260 | `clouds.png` | 远景云层，可平铺，**白/灰系**（代码会用 `setTint` 染色） |
| `tex_hills` | 480 × 200 | `hills.png` | 近景山丘，可平铺，白色系（会被染色） |
| `tex_ground` | 128 × 64 | `ground.png` | 地面，横向可平铺，白色系（会被染色） |
| `tex_player_blue_0` / `_1` | 20 × 20 | `player_blue.png` | 蓝翼 2 帧动画，对应 spritesheet `player_blue` |
| `tex_player_green_0` / `_1` | 20 × 20 | `player_green.png` | 绿羽 |
| `tex_player_red_0` / `_1` | 20 × 20 | `player_red.png` | 红隼 |
| `tex_emerald` | 12 × 12 | `emerald.png` | 绿宝石（会以 baseY 上下浮动 + 缩放） |
| `tex_wall` | 64 × 64 | `wall.png` | 墙式障碍，代码会 `setDisplaySize` 拉伸，**建议九宫格或可拉伸贴图** |
| `tex_island` | 72 × 40 | `island.png` | 浮空岛，显示为 120 × 60 |
| `tex_lava` | 30 × 30 | `lava.png` | 岩浆球，显示为 36–38 px；**保留原色，不被 tint** |
| `tex_vine` | 32 × 32 | `vine.png` | 藤蔓，显示会被拉伸成 40 × (220–476)（会被染色） |
| `tex_enemy` | 34 × 26 | `enemy.png` | 直升机敌人 |
