import { Provider } from "react-redux";
import Content from "./components/Content";
import { initStore } from "./stores/store";

function App(props?: InitDataType) {
    const store = initStore();
    return (
        <Provider store={store}>
            <Content {...props} />
        </Provider>
    );
}
export default App;
