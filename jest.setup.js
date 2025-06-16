require('@testing-library/jest-dom');

// Simplify Next.js Image in tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const React = require('react');
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', props);
  }
}));
