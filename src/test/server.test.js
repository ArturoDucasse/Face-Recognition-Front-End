test("Server is running", async () => {
  expect(
    fetch("https://secret-island-60464.herokuapp.com/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
  ).not.toBe({});
});
