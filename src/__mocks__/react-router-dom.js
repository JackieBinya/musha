module.exports = {
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: jest.fn(),
};
