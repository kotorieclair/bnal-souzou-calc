const testBungo = {
  1: {
    name: 'テスト文豪1',
    weapon: 'blade',
  },
  2: {
    name: 'テスト文豪2',
    weapon: 'gun',
  },
};

const testCards = {
  101: {
    name: 'テスト装像1',
    rare: 1,
    status: {
      1: { theme: 160 },
      2: null,
      3: { theme: 320 },
    },
    skill: {
      1: 'スキル1-1',
      2: 'スキル1-2',
      3: 'スキル1-3',
    },
  },
  102: {
    name: 'テスト装像1-2',
    rare: 1,
    status: {
      1: { tech: 30, theme: 96 },
      2: null,
      3: null,
    },
    skill: null,
  },
  201: {
    name: 'テスト装像2',
    rare: 2,
    status: {
      1: { genius: 25, theme: 80 },
      2: { genius: 35, theme: 112 },
      3: { genius: 50, theme: 160 },
    },
    skill: {
      1: 'スキル2-1',
      2: 'スキル2-2',
      3: 'スキル2-3',
    },
  },
  301: {
    name: 'テスト装像3',
    rare: 3,
    status: {
      3: { beauty: 100 },
    },
    skill: null,
  },
};

const expectedCardStatus = {
  101: {
    base: {
      2: { theme: 224 },
    },
  },
  102: {
    base: {
      2: { tech: 42, theme: 135 },
      3: { tech: 60, theme: 192 },
    },
  },
  201: {
    battle: {
      2: { atk: 74, def: 35, avd: 0 },
    },
  },
};

const testStatus = {
  // 太宰
  blade: {
    base: { tech: 168, genius: 170, beauty: 164, theme: 169, truth: 170 },
    battle: { atk: 502, def: 505, avd: 39 },
    totalBase201_3: { tech: 168, genius: (170 + 50), beauty: 164, theme: (169 + 160), truth: 170 },
    finalBattle201_3: { atk: 607, def: 555, avd: 46 },
  },
  // 島崎
  bow: {
    base: { tech: 175, genius: 175, beauty: 168, theme: 171, truth: 177 },
    battle: { atk: 473, def: 376, avd: 352 },
  },
  // 荷風
  bow_alt: {
    base: { tech: 174, genius: 173, beauty: 176, theme: 170, truth: 174 },
    battle: { atk: 474, def: 373, avd: 350 },
  },
  // 朔太郎
  gun: {
    base: { tech: 169, genius: 170, beauty: 169, theme: 170, truth: 163 },
    battle: { atk: 635, def: 421, avd: 241 },
  },
  // 乱歩
  whip: {
    base: { tech: 185, genius: 183, beauty: 181, theme: 176, truth: 176 },
    battle: { atk: 420, def: 497, avd: 46 },
  },
};

export { testBungo, testCards, expectedCardStatus, testStatus };
