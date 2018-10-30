export const options = {
  blade: '刃',
  bow: '弓',
  gun: '銃',
  whip: '鞭',
  special: 'コラボキャラ',  
}

export default {
  blade: {
    label: '刃',
    adjustment: {
      atk: 1,
      def: 1,
      avd: 8.5,
    },
  },
  // 自然主義弓
  bow: {
    label: '弓',
    adjustment: {
      atk: 1.1,
      def: 1.4,
      avd: 1,
    },
  },
  // 自然主義以外の弓
  bow_alt: {
    label: '弓',
    adjustment: {
      atk: 1.1,
      def: 1.4,
      avd: 1,
    },
  },
  gun: {
    label: '銃',
    adjustment: {
      atk: 0.8,
      def: 1.2,
      avd: 1.4,
    },
  },
  whip: {
    label: '鞭',
    adjustment: {
      atk: 1.3,
      def: 1.1,
      avd: 8,
    },
  },
  alchemy: {
    label: '錬',
    as: 'bow',
  },
  fight: {
    label: '闘',
    as: 'blade',
  },
}
