import App from "../../App";

describe("test component", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
  });

  it.only("get form template", () => {
    cy.fixture("templates")
      .then(function (data) {
        cy.intercept("GET", "/get-form-template", { body: data });
      })
      .as("data");
  });

  it("create form successfully", () => {
    // cy.intercept("GET", "/get-form-template", { fixture: "templates.json" });
    // cy.intercept("/get-form-template", { fixture: "templates.json" });

    cy.intercept("POST", "/post-new-form", {
      message: "Success",
      code: 0,
    });

    cy.get('[data-hook="btn-open-modal"]').click();
    cy.get("input").type("form1");
    cy.contains("Create Form").click();
    cy.contains("Success").should("be.exist");
  });

  it("create form unsuccessfully", () => {
    cy.intercept("POST", "/post-new-form", {
      message: "Duplicate",
      code: 2,
    });

    cy.get('[data-hook="btn-open-modal"]').click();
    cy.get("input").type("form1");
    cy.contains("Create Form").click();
    cy.contains("Duplicate").should("be.exist");
  });
});
