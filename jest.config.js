module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^framer-motion/dist/framer-motion$': 'framer-motion'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  }
};
