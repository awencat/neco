"use strict";

/* =========================================================================
 * [B] 角色数据
 * ========================================================================= */

const CHARACTERS = {
  blue: {
    name: '蓝翼', desc: '均衡型',
    gravityMul: 1.00, flapMul: 1.00, dashCdMul: 1.00,
    color: 0x3b7dd8, dark: 0x22487f, accent: 0x9fd8ff,
  },
  green: {
    name: '绿羽', desc: '滑翔更久',
    gravityMul: 0.86, flapMul: 0.94, dashCdMul: 1.15,
    color: 0x3faa5a, dark: 0x1f6b34, accent: 0xb6f2a0,
  },
  red: {
    name: '红隼', desc: '冲刺更快',
    gravityMul: 1.10, flapMul: 1.05, dashCdMul: 0.65,
    color: 0xd84a3b, dark: 0x8c2418, accent: 0xffc9a0,
  },
};
