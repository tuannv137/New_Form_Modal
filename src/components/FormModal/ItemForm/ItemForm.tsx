import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Box from "mgz-ui/dist/src/Box";
import DropdownLayout from "mgz-ui/dist/src/DropdownLayout";
import Image from "mgz-ui/dist/src/Image";
import Search from "mgz-ui/dist/src/Search";
import { KeyboardEvent, useState } from "react";
import { setInputSearchForm } from "../../../stores/ReduxStore";
import { st, classes } from "./ItemForm.st.css";

export type ItemFormProps = {
  handleClickSelect?: (
    type?: string,
    id?: string,
    typeSelect?:
      | "Start From Scratch"
      | "Use Template"
      | "Duplicate Existing"
      | "Import Form"
  ) => void;
  arrDataNewForm?: Data[];
  arrTemplate?: Data[];
  typeSelect?: "Template" | "Duplicate";
};

const ItemForm = ({
  handleClickSelect,
  arrDataNewForm,
  arrTemplate,
  typeSelect,
}: ItemFormProps) => {
  const data = useSelector(
    (state: { new_form_modal: InitDataType }) => state.new_form_modal
  );
  const arrFormSelect = data.arrFormSelect;
  const [inputSearch, setInputSearch] = useState("");
  const inputSearchForm = data.inputSearchForm;
  let arrData: Data[] | undefined = [];

  const dispatch = useDispatch();

  if (inputSearchForm !== "") {
    arrData = _.filter(
      typeSelect === "Template" ? arrTemplate : arrDataNewForm,
      (item) => _.includes(_.toLower(item.name), _.toLower(inputSearchForm))
    );
  } else {
    arrData = typeSelect === "Template" ? arrTemplate : arrDataNewForm;
  }

  const handleOnClearInput = () => {
    setInputSearch("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(setInputSearchForm(inputSearch));
    }
  };

  const options: any[] = _.map(arrData, (item) => ({
    id: item.id,
    value: item.name,
  }));

  const handleSelectedId = (id?: string) => {
    handleClickSelect && handleClickSelect("ARR_OTHER", id);
  };

  const isSelect = _.some(arrData, ["isSelect", true]);

  return (
    <Box direction="horizontal" className={st(classes.root)}>
      <Box direction="vertical" className={st(classes.left)}>
        <Box className={st(classes.search)}>
          <Search
            size="medium"
            placeholder="Search"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            onClear={handleOnClearInput}
            onKeyDown={handleKeyDown}
          />
        </Box>
        <Box direction="vertical" className={st(classes.listArrData)}>
          {_.size(arrData) > 0 ? (
            <DropdownLayout
              className={st(classes.itemList)}
              maxHeightPixels="415px"
              visible
              inContainer
              options={options}
              selectedId={arrFormSelect && arrFormSelect[0]?.id}
              onSelect={({ id }) => handleSelectedId(_.toString(id))}
            />
          ) : (
            <Box direction="vertical" className={st(classes.dataNotFound)}>
              <Box>{`No results for “${inputSearch}”`}</Box>
              <Box>{`Find ${
                typeSelect === "Template" ? "templates" : "duplicates"
              }  by name.`}</Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        className={st(classes.right, {
          isHaveSelect: _.some(arrData, ["isSelect", true]),
        })}
      >
        {isSelect ? (
          <>
            {_.map(
              arrData,
              (item) =>
                arrFormSelect &&
                item.isSelect === true && (
                  <Box key={item.id}>
                    <Image
                      src={item.url_image}
                      alt={item.name}
                      fit="contain"
                      className={st(classes.image)}
                    />
                  </Box>
                )
            )}
          </>
        ) : (
          `Select Form  ${
            typeSelect === "Template" ? "Template" : "Duplicate"
          } To View`
        )}
      </Box>
    </Box>
  );
};

export default ItemForm;
