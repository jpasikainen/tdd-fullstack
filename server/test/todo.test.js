const expect = require("chai").expect;
const nunjucks = require("nunjucks")
nunjucks.configure('views', {
  autoescape: true
});

describe("todo", () => {
  it("loads", () => {
    const app = nunjucks.render("todo.html", {})
    expect(app).to.equal(
      "<div>\n  todo\n</div>"
    );
  });
});