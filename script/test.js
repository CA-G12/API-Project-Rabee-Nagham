const { search } = require("./functions");
test("search method test", () => {
  expect(search([1, 2, 3], 3)).toEqual([3]);
});
