import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initStore } from "../stores/ReduxStore";
import Title from "./Title";

function Content(props?: InitDataType) {
    const dispatch = useDispatch();

    useEffect(() => {
        props?.title && dispatch(initStore({ title: props.title }));
    }, [dispatch, props?.title]);

    return <Title />;
}

export default Content;
