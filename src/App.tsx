import { Provider } from "react-redux";

import { initStore } from "./stores/store";
import ButtonFormModal from "./components/ButtonFormModal";

function App() {
  const store = initStore();
  return (
    <Provider store={store}>
      <ButtonFormModal />
    </Provider>
  );
}
export default App;
