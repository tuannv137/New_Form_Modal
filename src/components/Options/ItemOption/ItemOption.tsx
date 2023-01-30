import { KeyboardEvent, memo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import $ from "jquery";
import { SquareRatio, SquareRatioChecked } from "@wix/wix-ui-icons-common";
import Text from "mgz-ui/dist/src/Text";
import {
  UiSelect,
  changeElementFocused,
  setIsInputSearchRef,
} from "../../../stores/ReduxStore";
import { st, classes } from "./ItemOption.st.css";

export type ItemOptionProps = {
  opt: DATA_UI;
  handleAddselectOptions?: (e: DATA_UI) => void;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  typeGroup?: "group_single" | "group_tree";
  isSearchOnline?: boolean;
};

const ItemOption = ({
  opt,
  handleAddselectOptions,
  typeRender,
  typeGroup,
  isSearchOnline,
  typeSelect,
}: ItemOptionProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  const selectedData: DATA_UI[] | undefined = dataStore.selectedData;
  const currentRef = useRef<HTMLDivElement>(null);
  const isInputSearchRef = dataStore.isInputSearchRef;
  const hashChild = opt.groupOptions ? true : false;
  const disable = opt?.isGroup ? true : false;
  const dispatch = useDispatch();

  const handleKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if ((e && e.key === "Enter") || e?.code === "Space") {
      e.preventDefault();

      if (typeGroup === "group_single") {
        !disable &&
          !hashChild &&
          _.isFunction(handleAddselectOptions) &&
          handleAddselectOptions(opt);
      } else {
        !disable &&
          _.isFunction(handleAddselectOptions) &&
          handleAddselectOptions(opt);
      }
    }

    if (e && e.code === "Tab") {
      e.preventDefault();
      dispatch(setIsInputSearchRef(!isInputSearchRef));
    }
  };

  const element: HTMLElement | undefined =
    $(currentRef)[0].current || undefined;
  const isHover = element && currentRef && element === dataStore.elementFocused;

  const handleOnMouseMove = useCallback(() => {
    dispatch(changeElementFocused(element));
  }, [dispatch, element]);

  console.log("c");
  return (
    <div
      className={st(classes.root, {
        active: _.find(selectedData, { value: opt.value }) ? true : false,
        isHover,
        isGroup: _.size(opt.groupOptions) && typeGroup && hashChild,
        isDisable: disable,
      })}
      onClick={() => {
        if (typeGroup === "group_single") {
          return (
            !disable &&
            _.isFunction(handleAddselectOptions) &&
            !hashChild &&
            handleAddselectOptions(opt)
          );
        } else {
          return (
            !disable &&
            _.isFunction(handleAddselectOptions) &&
            handleAddselectOptions(opt)
          );
        }
      }}
      key={opt.value}
      onMouseMove={handleOnMouseMove}
      onKeyDown={handleKeyDown}
      ref={currentRef}
      tabIndex={0}
      data-type={
        disable || (typeGroup && hashChild) ? "" : `option-${typeSelect}`
      }
      data-hook="item-options"
    >
      {typeRender === "single" && ""}

      {isSearchOnline &&
        typeRender === "single" &&
        typeSelect === "multi" &&
        !typeGroup &&
        !disable && (
          <>
            {_.find(selectedData, { value: opt.value }) ? (
              <SquareRatioChecked />
            ) : (
              <SquareRatio />
            )}
          </>
        )}

      {!isSearchOnline && typeSelect === "multi" && !typeGroup && !disable && (
        <>
          {_.find(selectedData, { value: opt.value }) ? (
            <SquareRatioChecked />
          ) : (
            <SquareRatio />
          )}
        </>
      )}

      {typeSelect === "multi" && !hashChild && typeGroup && !disable && (
        <>
          {_.find(selectedData, { value: opt.value }) ? (
            <SquareRatioChecked />
          ) : (
            <SquareRatio />
          )}
        </>
      )}

      <Text size="medium" className={st(classes.labelItem)}>
        {opt.label}
      </Text>

      {typeRender === "single" ? (
        ""
      ) : (
        <Text className={st(classes.itemPath)}>
          <>{opt.path !== " / " && opt.path}</>
        </Text>
      )}

      {typeGroup ? (
        <Text className={st(classes.numberGroup)} dataHook="number-group">
          {opt?.groupOptions && _.size(opt?.groupOptions)}
        </Text>
      ) : (
        ""
      )}
    </div>
  );
};

export default memo(ItemOption);
