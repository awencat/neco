# 像素飞行 · Pixel Glider

一个用 **JavaScript + Phaser 3** 写的 2D 横版飞行躲避小游戏。原始版本是单个 HTML 大文件，现已拆分为 `index.html` + `src/` 模块目录 + `assets/` 素材目录。

## 运行

**直接双击 `index.html` 即可**，不需要本地服务器、不需要构建步骤。

`index.html` 用普通 `<script>`（非 ES Module）按依赖顺序加载 `src/` 下的各文件，因此 `file://` 协议下也能正常运行。

只有一点例外：Phaser 3 是从 CDN 加载的，所以**首次运行需要联网**。若要完全离线，把 `phaser.min.js` 下载到本地（如 `vendor/phaser.min.js`），再把 `index.html` 里那行 CDN `<script src>` 换成本地路径即可。

> 当然，用本地服务器（`py -m http.server 8080`、`npx serve .`、VS Code Live Server）或部署到静态托管也一样能跑，只是并非必需。

### 加载顺序（重要）

各文件的顶层 `const` / `class` 处于同一个全局词法作用域，互相直接可见——这也是不需要 import/export 的原因。代价是**顺序不能乱**：被依赖的文件必须排在依赖它的文件前面。`index.html` 中每个 `<script>` 上方都注明了该文件依赖谁。

新增模块时请插到正确位置；`src/main.js` 必须始终是最后一个，因为它在加载时就会执行 `new Phaser.Game()`。


## 目录结构

```
index.html                     页面外壳：加载 Phaser CDN，再按依赖顺序加载 src 下各脚本
assets/                        美术资源目录（当前为空，见其 README）
src/
  main.js                      [L] 入口：PhaserConfig + new Phaser.Game()
  style.css                    页面样式
  config/
    constants.js               [A] 画布尺寸 / 地面高度 / ★ TUNING 全部可调参数
    characters.js              [B] CHARACTERS 三个角色数值
    biomes.js                  [C] Biome 类 + BIOMES 六个生物群系
  utils/
    helpers.js                 [D] makeGfx / bake / shadeColor / makeButton
  gfx/
    TextureFactory.js          [E] 程序化生成全部占位贴图
  entities/                    [F] 实体系统（一文件一类）
    Entity.js                  基类：位置、速度、包围盒、回收
    WallEntity.js              墙式障碍
    FloaterEntity.js           自由障碍（浮空岛 / 漂浮岩浆）
    VineEntity.js              脆弱障碍（藤蔓，可被冲刺击碎）
    EnemyEntity.js             敌人（直升机会追踪玩家高度）
    ProjectileEntity.js        抛物线抛射物
    EmeraldEntity.js           绿宝石
  systems/
    BackgroundManager.js       [G] 三层视差背景 + 群系换色
    SpawnManager.js            [H] 按生物群系权重生成障碍 / 宝石
  scenes/
    BootScene.js               [I] 生成贴图、注册 fly_* 动画
    MenuScene.js               [I] 主菜单
    CharacterSelectScene.js    [I] 选角界面
    GameScene.js               [J] 核心玩法主循环
    GameOverScene.js           [K] 结算界面
```

## 玩法

- **鼠标点击 / 触摸屏幕** —— 上升（风筝式物理，有惯性和风扰）
- **空格** —— 冲刺（短暂无敌，可击碎藤蔓和敌人、加分）
- **P** —— 暂停 / 继续

撞到墙体、浮空岛、岩浆会扣 1 点生命（受伤后 1.5 秒无敌，撞地也会扣血）。吃绿宝石 +10 分，冲刺击碎脆弱障碍 / 敌人 +15 分，飞行距离也计分。

每 30 秒切换一次生物群系（平原 → 海边 → 森林 → 洞穴 → 下界荒地 → 玄武岩三角洲，循环），不同群系的天空 / 地面配色、障碍类型权重、生成密度都不同，难度递增。

## 调参

所有可调数值集中在 **`src/config/constants.js` → `TUNING`**，每项都有中文注释：

- `TUNING.world` —— 卷轴速度、加速时间点（`accelStartTime`，改成 120 即 2 分钟后才开始加速）、视差系数
- `TUNING.flight` —— 重力、空气阻尼、拍翅冲量、风力
- `TUNING.dash` —— 冲刺冷却 / 时长 / 倍率
- `TUNING.spawn` —— 生成间隔衰减、障碍概率曲线
- `TUNING.score` —— 各类得分
- `TUNING.health` —— 生命上限、无敌时间
- `TUNING.biome` —— 群系持续时长、过场淡入淡出

角色数值在 `src/config/characters.js`，生物群系在 `src/config/biomes.js`。

## 替换美术资源

当前所有贴图都是 `src/gfx/TextureFactory.js` 用 Graphics 画出来的占位图。要换成真实图片，步骤和纹理 key / 尺寸清单见 [`assets/README.md`](assets/README.md)。

## 原始文件

`deepseek_html_20260910_8f659b.html` 是拆分前的单文件版本，保留作为对照，确认新版没问题后可以删除。
