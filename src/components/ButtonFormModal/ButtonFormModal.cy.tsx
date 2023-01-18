import { Provider } from "react-redux";
import ButtonFormModal from "./ButtonFormModal";
import { initStore } from "../../stores/store";

const store = initStore();

describe("show mount", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });
  it("show mount", () => {
    cy.mount(
      <Provider store={store}>
        <ButtonFormModal openModal={false} />
      </Provider>
    );
  });
});
