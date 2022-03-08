const expect = require("chai").expect;
const nunjucks = require("nunjucks")
nunjucks.configure('views', {
  autoescape: true
});

describe("todo", () => {
  it("initializes", () => {
    const app = nunjucks.render("todo.html", {"name": "foo", "completed": false})
    expect(app).to.equal(
      "<div>foo:false</div>"
    );
  });
});