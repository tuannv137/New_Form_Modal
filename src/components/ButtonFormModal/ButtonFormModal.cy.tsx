import App from "../../App";

describe("test component", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
  });

  it.only("get form template", () => {
    cy.intercept("GET", "/get-form-template", (req) => {
      console.log(req);
    });
    cy.intercept("GET", "/get-new-form", { forceNetworkError: true });
  });

  it("create form successfully", () => {
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
