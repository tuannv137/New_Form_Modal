import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Input from "mgz-ui/dist/src/Input";
import Text from "mgz-ui/dist/src/Text";
import Search from "wix-ui-icons-common/Search";
import { UiSelect, changeElementFocused } from "../../stores/ReduxStore";
import { st, classes } from "./FilterOptions.st.css";

export type FilterOptionsProps = {
  typeRender?: "single" | "tree";
  typeSearch?: "online" | "offline";
  isSearchOnline?: boolean;
  flatArrDataSelect?: DATA_UI[];
  inputSearch?: string;
  hanldeOnchangeSearch?: (value: string) => void;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoadingInput?: boolean;
};

const FilterOptions = ({
  flatArrDataSelect,
  inputSearch,
  hanldeOnchangeSearch,
  isSearchable,
  isDisabled,
  isLoadingInput,
  isSearchOnline,
}: FilterOptionsProps) => {
  const dataStore: UiSelect = useSelector(
    (state: { ui_select: UiSelect }) => state.ui_select
  );
  const refInputFilter = useRef<Input | null>(null);
  const isInnputRef = dataStore.isInputSearchRef;
  const isLoading = dataStore.isLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    if (refInputFilter && refInputFilter.current) {
      refInputFilter.current.focus();
    }
  }, [isInnputRef]);

  useEffect(() => {
    if (refInputFilter && refInputFilter.current)
      dispatch(changeElementFocused(undefined));
  }, [dispatch]);

  return (
    <div className={st(classes.root)} data-hook="filter-options">
      <div className={st(classes.contentFilter)}>
        <div className={st(classes.actionSearch, { isDisabled })}>
          {isLoadingInput && (
            <span
              className={st(classes.iconLoading, {
                isLoading: isLoading && isSearchOnline,
              })}
            >
              <div className={st(classes.loadingSelect)}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </span>
          )}

          {isSearchable && (
            <div className={classes.searchWapper} data-hook="search-wapper">
              <Search className={st(classes.inconSearch)} />
              <Input
                size="medium"
                className={st(classes.inputFilter)}
                placeholder="Search..."
                onChange={(e) =>
                  _.isFunction(hanldeOnchangeSearch) &&
                  hanldeOnchangeSearch(e.target.value)
                }
                value={inputSearch}
                disabled={isDisabled}
                dataHook="input-search"
                ref={refInputFilter}
                tabIndex={0}
              />
            </div>
          )}

          {inputSearch !== "" && (
            <>
              {!isSearchOnline && (
                <Text
                  className={st(classes.itemsQuality)}
                  dataHook="quality-options"
                >
                  {_.size(flatArrDataSelect)} options
                </Text>
              )}

              {!isLoading && isSearchOnline && (
                <Text
                  className={st(classes.itemsQuality)}
                  dataHook="quality-options"
                >
                  {_.size(flatArrDataSelect)} options
                </Text>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(FilterOptions);
