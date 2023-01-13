import type { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Text from "mgz-ui/dist/es/src/Text";
import { changeTitle } from "../../stores/ReduxStore";
import { st, classes } from "./Title.st.css";

function Title() {
  const dispatch = useDispatch();
  const title = useSelector(
    (state: { mainStore: InitDataType }) => state.mainStore.title
  );

  const handleChangeTitle = (e?: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTitle({ title: e?.target.value }));
  };

  return (
    <div className={st(classes.root)}>
      Hello <input value={title} onChange={handleChangeTitle} />
      <Text className={classes.title}>Hello {title}</Text>
    </div>
  );
}

export default Title;
