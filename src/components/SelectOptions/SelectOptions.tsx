import {
  KeyboardEvent,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import _ from "lodash";
import OutSideClick from "react-outside-click-handler";
import axios from "axios";
import Button from "mgz-ui/dist/src/Button";
import DismissSmall from "wix-ui-icons-common/DismissSmall";
import Dismiss from "wix-ui-icons-common/Dismiss";
import ChevronUpLarge from "wix-ui-icons-common/ChevronUpLarge";
import ChevronDownLarge from "wix-ui-icons-common/ChevronDownLarge";
import Text from "mgz-ui/dist/src/Text";
import IconButton from "mgz-ui/dist/src/IconButton";
import {
  UiSelect,
  deleteOptionSelected,
  initDataUI,
  initFlatData,
  changeElementFocused,
  setIsLoading,
  addSelectoptions,
} from "../../stores/ReduxStore";
import { dataUiSelect } from "../../../constants";
import FilterOptions from "../FilterOptions";
import Options from "../Options";
import { arrdataRecursive, flatArrData } from "../../ultils";
import { st, classes } from "./SelectOptions.st.css";

export type SelectOptionsProps = {
  typeRender?: "single" | "tree";
  typeSelect?: "single" | "multi";
  typeGroup?: "group_single" | "group_tree";
  showLevel?: number;
  options?: DATA_UI[];
  isSearchOnline?: boolean;
  url?: string;
  arrSelectedData?: string[];
};

const SelectOptions = ({
  typeRender,
  options,
  typeSelect,
  typeGroup,
  showLevel,
  isSearchOnline,
  url,
  arrSelectedData,
}: SelectOptionsProps) => {
  const data: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  const [isShowOptions, setisShowOptions] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [isKeyDowning, setIsKeyDowning] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const isClearable = true;
  const isSearchable = true;
  const isDisabled = false;
  const isLoadingInput = true;
  const optionsSelect: DATA_UI[] | undefined = data.dataOptions;
  const selectedData: DATA_UI[] | undefined = data.selectedData;
  let flatArrDataSelect: DATA_UI[] | undefined = data.flatDataOptions;

  const dispatch = useDispatch();

  const handleShowOptions = () => {
    setisShowOptions(!isShowOptions);
  };

  const handleKeyDownCloseOptions = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e && e.code === "Escape") setisShowOptions(false);
  };

  const handleOutsideCick = () => {
    setisShowOptions(false);
  };

  const handleCloseOptions = () => {
    setisShowOptions(false);
  };

  const getOptions = useCallback(async () => {
    try {
      if (url) {
        const response = await axios.get(url);

        dispatch(initFlatData({ flatData: response.data }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, url]);

  useEffect(() => {
    if (isSearchOnline) {
      getOptions();
    } else {
      dispatch(
        initDataUI({
          dataOptions: arrdataRecursive(options ? options : dataUiSelect),
        })
      );
    }
  }, [dispatch, getOptions, isSearchOnline, options]);

  const flatData = useMemo(() => flatArrData(optionsSelect), [optionsSelect]);

  useEffect(() => {
    dispatch(initFlatData({ flatData: flatData }));
  }, [flatData, dispatch]);

  useEffect(() => {
    let newArrSelected: DATA_UI[] = [];

    if (arrSelectedData) {
      if (typeSelect === "single") {
        _.forEach(flatArrDataSelect, (opt) => {
          if (opt.value === arrSelectedData[0]) {
            newArrSelected.push(opt);
          }
        });
      } else {
        _.forEach(flatArrDataSelect, (opt) => {
          _.forEach(arrSelectedData, (item) => {
            if (opt.value === item) {
              newArrSelected.push(opt);
            }
          });
        });
      }
    }

    !_.isUndefined(newArrSelected) &&
      dispatch(addSelectoptions(newArrSelected));
  }, [arrSelectedData, dispatch, flatArrDataSelect, typeSelect]);

  const hanldeOnchangeSearch = (value: string) => {
    setInputSearch(value);
    setIsFirstLoading(false);
  };

  if (inputSearch !== "") {
    flatArrDataSelect = _.filter(flatArrDataSelect, (item: DATA_UI) =>
      _.includes(_.toLower(item.label), _.toLower(inputSearch))
    );
  }

  if (
    inputSearch === "" &&
    isSearchOnline &&
    _.size(selectedData) &&
    isFirstLoading
  ) {
    flatArrDataSelect = _.cloneDeep(selectedData);
  }

  useEffect(() => {
    if (inputSearch !== "") {
      dispatch(setIsLoading(true));
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 2000);
    }
  }, [dispatch, inputSearch]);

  const deleteOptionAllSelected = (
    e?: MouseEvent<HTMLOrSVGElement>,
    type?: string,
    make?: string
  ) => {
    let arr: DATA_UI[] | undefined = [];
    if (type === "CLEAR_ALL" && make === "All") {
      dispatch(deleteOptionSelected(arr));
    }
    if (type === "DELETE_ITEM") {
      arr = _.cloneDeep(selectedData);
      arr = _.filter(arr, (opt) => opt.value !== make);
    }
    e && e.stopPropagation();
    setIsFirstLoading(false);
    dispatch(deleteOptionSelected(arr));
  };

  useEffect(() => {
    if (data.elementFocused) {
      const currentElement = data.elementFocused;
      $(currentElement)[0]?.focus({ preventScroll: true });
      const listWapperOptions = $(`#wapper-list-option-${typeSelect}`);

      const ElStart = $(currentElement).offset()?.top || 0;
      const ElHeight = $(currentElement).outerHeight() || 40;
      const ElEnd = ElStart + ElHeight;
      const WapStart = listWapperOptions.offset()?.top || 0;
      const WapHeight = listWapperOptions.outerHeight() || 40;
      const WapEnd = WapStart + WapHeight;
      const currentScroll = listWapperOptions.scrollTop() || 0;

      if (ElStart < WapStart) {
        listWapperOptions.scrollTop(currentScroll - (WapStart - ElStart));
      } else if (ElEnd > WapEnd) {
        listWapperOptions.scrollTop(currentScroll + (ElEnd - WapEnd));
      }
    }
  }, [data.elementFocused, typeSelect]);

  const handleKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e && e.code === "ArrowUp") {
      e.preventDefault();
      setIsKeyDowning(true);
      if (data.elementFocused === undefined) {
        const listElement = $(`[data-type="option-${typeSelect}"]`);

        dispatch(changeElementFocused(listElement[_.size(listElement) - 1]));
      } else {
        const currentFocused: HTMLElement | undefined = data.elementFocused;
        const listElement = $(`[data-type="option-${typeSelect}"]`);
        const currentIndex = _.findIndex(listElement, currentFocused);

        if (currentIndex === 0) {
          dispatch(changeElementFocused(listElement[_.size(listElement) - 1]));
        } else {
          dispatch(changeElementFocused(listElement[currentIndex - 1]));
        }
      }
    }

    if (e && e.code === "ArrowDown") {
      e.preventDefault();
      setIsKeyDowning(true);
      if (data.elementFocused === undefined) {
        const listElement = $(`[data-type="option-${typeSelect}"]`);
        dispatch(changeElementFocused(listElement[0]));
      } else {
        const currentFocused: HTMLElement | undefined = data.elementFocused;
        const listElement = $(`[data-type="option-${typeSelect}"]`);
        const currentIndex = _.findIndex(listElement, currentFocused);
        if (currentIndex === _.size(listElement) - 1) {
          dispatch(changeElementFocused(listElement[0]));
        } else {
          dispatch(changeElementFocused(listElement[currentIndex + 1]));
        }
      }
    }
  };

  useEffect(() => {
    if (!isShowOptions || !inputSearch)
      dispatch(changeElementFocused(undefined));
  }, [dispatch, inputSearch, isShowOptions]);

  useEffect(() => {
    if (isShowOptions) {
      $(`#ui_select-${typeSelect}`)[0]?.focus();
    }
  }, [isShowOptions, typeSelect]);

  return (
    <div
      className={st(classes.root)}
      onKeyUp={handleKeyDownCloseOptions}
      id={`ui_select-${typeSelect}`}
      tabIndex={0}
      data-hook="Ui_Select"
    >
      <OutSideClick onOutsideClick={handleOutsideCick}>
        {typeSelect === "multi" && _.size(selectedData) > 0 && (
          <div className={st(classes.delete)}>
            <Dismiss
              className={st(classes.iconDelete, { isClearable })}
              onClick={(e: MouseEvent<HTMLOrSVGElement>) =>
                deleteOptionAllSelected(e, "CLEAR_ALL", "All")
              }
              data-hook="delete-all"
            />
          </div>
        )}
        <div
          className={st(classes.showData, { isShowOptions })}
          onClick={handleShowOptions}
        >
          {_.size(selectedData) > 0 ? (
            <>
              <div className={st(classes.listItemData)}>
                {typeSelect === "single" && (
                  <>
                    {_.map(selectedData, (opt: DATA_UI) => (
                      <Text
                        className={st(classes.itemData, {
                          isSingle: typeSelect === "single",
                        })}
                        key={opt?.value}
                      >
                        {opt?.label}
                      </Text>
                    ))}
                  </>
                )}

                {typeSelect === "multi" && (
                  <>
                    {_.map(selectedData, (opt: DATA_UI) => (
                      <Button
                        className={st(classes.itemData, {
                          isMulti: typeSelect === "multi",
                        })}
                        size="small"
                        key={opt?.value}
                        suffixIcon={
                          <DismissSmall
                            className={st(classes.closeItem)}
                            onClick={(e) =>
                              deleteOptionAllSelected(
                                e,
                                "DELETE_ITEM",
                                opt.value
                              )
                            }
                          />
                        }
                        dataHook="delete-item"
                      >
                        {opt?.label}
                      </Button>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : (
            <Text className={st(classes.text)}>Select...</Text>
          )}

          <IconButton className={st(classes.toggleSelect, { isShowOptions })}>
            {isShowOptions ? <ChevronDownLarge /> : <ChevronUpLarge />}
          </IconButton>
        </div>

        <div
          className={st(classes.options, { isShowOptions })}
          onKeyDown={handleKeyDown}
          onKeyUp={() => setIsKeyDowning(false)}
          id="options-focus"
        >
          <FilterOptions
            typeRender={typeRender}
            flatArrDataSelect={flatArrDataSelect}
            inputSearch={inputSearch}
            hanldeOnchangeSearch={hanldeOnchangeSearch}
            isClearable={isClearable}
            isSearchable={isSearchable}
            isDisabled={isDisabled}
            isLoadingInput={isLoadingInput}
            isSearchOnline={isSearchOnline}
          />

          <Options
            typeRender={typeRender}
            flatArrDataSelect={flatArrDataSelect}
            data={optionsSelect}
            handleCloseOptions={handleCloseOptions}
            typeSelect={typeSelect}
            showLevel={showLevel}
            inputSearch={inputSearch}
            isKeyDowning={isKeyDowning}
            typeGroup={typeGroup}
            isLoadingInput={isLoadingInput}
            isSearchOnline={isSearchOnline}
            setIsFirstLoading={setIsFirstLoading}
            selectedData={selectedData}
          />
        </div>
      </OutSideClick>
    </div>
  );
};

export default memo(SelectOptions);
