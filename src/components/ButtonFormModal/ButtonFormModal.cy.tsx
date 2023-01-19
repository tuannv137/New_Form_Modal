import { Provider } from "react-redux";
import App from "../../App";
import ButtonFormModal from "./ButtonFormModal";
import { initStore } from "../../stores/store";

const store = initStore();
describe("test component", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });
  it("playground", () => {
    cy.mount(
      <Provider store={store}>
        <ButtonFormModal />
      </Provider>
    );

    cy.get('[data-hook="btn-open-modal"]');
    //.click();
  });
});
