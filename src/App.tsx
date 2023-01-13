import { Provider } from "react-redux";

import { initStore } from "./stores/store";
import ButtonFormModal from "./components/ButtonFormModal/ButtonFormModal";

function App(props?: { openModal?: boolean }) {
  const store = initStore();
  return (
    <Provider store={store}>
      <ButtonFormModal {...props} />
    </Provider>
  );
}
export default App;
