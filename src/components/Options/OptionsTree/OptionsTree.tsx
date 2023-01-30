import { memo, KeyboardEvent, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import $ from "jquery";
import Text from "mgz-ui/dist/src/Text";
import {
  ChevronDownCircle,
  ChevronUpCircle,
  SquareRatio,
  SquareRatioChecked,
} from "@wix/wix-ui-icons-common";
import {
  UiSelect,
  changeElementFocused,
  setIsInputSearchRef,
} from "../../../stores/ReduxStore";
import { st, classes } from "./OptionsTree.st.css";

export type OptionsTreeProps = {
  data: DATA_UI;
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  isSearchOnline?: boolean;
  handleCloseOptions?: () => void;
  handleAddselectOptions?: (option?: DATA_UI) => void;
  showLevel?: number;
  selectedData?: DATA_UI[];
  isKeyDowning?: boolean;
  typeGroup?: "group_single" | "group_tree";
};

const OptionsTree = ({
  data,
  typeRender,
  typeSelect,
  handleAddselectOptions,
  showLevel,
  selectedData,
  isKeyDowning,
  typeGroup,
}: OptionsTreeProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  const hashChild = data.groupOptions ? true : false;
  const currentRef = useRef<HTMLDivElement>(null);
  const isInputSearchRef = dataStore.isInputSearchRef;
  const disable = data.isGroup;

  const dispatch = useDispatch();

  const getInitShowGroup = () => {
    if (showLevel) {
      if (data.level && data.level < showLevel && data.groupOptions) {
        return true;
      } else return false;
    }
    return;
  };

  const [isShowOption, setIsShowGroup] = useState(getInitShowGroup());

  const handleToglleOptions = () => {
    setIsShowGroup(!isShowOption);
  };

  const isShowCheck = _.find(selectedData, { value: data.value })
    ? true
    : false;

  const handleKeyDownOption = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e) {
      e.preventDefault();
      if ((e.key === "Enter" && !e.shiftKey) || e.code === "Space") {
        if (data.isGroup) {
          return;
        } else {
          if (typeGroup === "group_tree") {
            !disable &&
              !hashChild &&
              _.isFunction(handleAddselectOptions) &&
              handleAddselectOptions(data);
          } else {
            !disable &&
              _.isFunction(handleAddselectOptions) &&
              handleAddselectOptions(data);
          }
        }
      }

      if (e.code === "Tab") {
        dispatch(setIsInputSearchRef(!isInputSearchRef));
      }

      if (e.shiftKey && e.key === "Enter") {
        setIsShowGroup(!isShowOption);
      }
    }
  };

  const element: HTMLElement | undefined =
    $(currentRef)[0].current || undefined;
  const isHover = currentRef && element === dataStore.elementFocused;

  const handleMouseMove = useCallback(() => {
    if (isKeyDowning !== undefined && !isKeyDowning) {
      dispatch(changeElementFocused(element));
    }
  }, [dispatch, element, isKeyDowning]);

  console.log("d");
  return (
    <li
      className={st(classes.root, { isBorder: data.level === 1 })}
      data-hook="options-tree"
    >
      <div
        className={st(classes.itemTrees, {
          isBorder: hashChild && isShowOption,
        })}
      >
        <Text
          onClick={handleToglleOptions}
          className={st(classes.toggleItems)}
          dataHook="toggle-item-tree"
        >
          {isShowOption && hashChild && <ChevronUpCircle />}
          {!isShowOption && hashChild && <ChevronDownCircle />}
        </Text>

        <div
          className={st(classes.itemOptionTree, {
            isShowCheck,
            isHover: isHover,
            isShowOption,
            isGroup: hashChild && typeGroup === "group_tree",
            isDisable: disable,
          })}
          onClick={() => {
            if (typeGroup === "group_tree") {
              return (
                !disable &&
                !hashChild &&
                _.isFunction(handleAddselectOptions) &&
                handleAddselectOptions(data)
              );
            } else {
              return (
                !disable &&
                _.isFunction(handleAddselectOptions) &&
                handleAddselectOptions(data)
              );
            }
          }}
          onKeyDown={handleKeyDownOption}
          tabIndex={0}
          onMouseMove={handleMouseMove}
          data-type={
            disable || (typeGroup && hashChild) ? "" : `option-${typeSelect}`
          }
          ref={currentRef}
          data-hook="item-options-tree"
        >
          {typeSelect === "single" && ""}

          {typeSelect === "multi" &&
            typeGroup === "group_tree" &&
            !hashChild &&
            !disable && (
              <>{isShowCheck ? <SquareRatioChecked /> : <SquareRatio />}</>
            )}

          {typeSelect === "multi" && !typeGroup && !disable && (
            <>{isShowCheck ? <SquareRatioChecked /> : <SquareRatio />}</>
          )}

          <Text className={st(classes.labelItem)}>{data.label}</Text>

          {typeGroup === "group_tree" && !disable && (
            <Text
              className={st(classes.numberGroupTree, {
                isShowNumber: _.size(data?.groupOptions) > 0,
              })}
              dataHook="number-group-tree"
            >
              {data?.groupOptions &&
                _.size(data?.groupOptions) > 0 &&
                _.size(data?.groupOptions)}
            </Text>
          )}
        </div>
      </div>

      {isShowOption && (
        <ul className={st(classes.listItemTree, { isShowOption })}>
          {_.map(data.groupOptions, (opt) => (
            <OptionsTree
              data={opt}
              key={opt.value}
              typeRender={typeRender}
              typeSelect={typeSelect}
              handleAddselectOptions={handleAddselectOptions}
              showLevel={showLevel}
              selectedData={selectedData}
              isKeyDowning={isKeyDowning}
              typeGroup={typeGroup}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(OptionsTree);
