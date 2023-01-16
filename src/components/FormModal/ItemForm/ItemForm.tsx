import _ from "lodash";
import Box from "mgz-ui/dist/src/Box";
import Search from "mgz-ui/dist/src/Search";
import Image from "mgz-ui/dist/src/Image";
import { st, classes } from "./ItemForm.st.css";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export type ItemFormProps = {
  handleClickSelect?: (type?: string, id?: string, typeSelect?: string) => void;
  arrData?: Data[];
  typeSelect?: "Template" | "Duplicate";
};

const ItemForm = ({
  handleClickSelect,
  arrData,
  typeSelect,
}: ItemFormProps) => {
  const [inputSearch, setInputSearch] = useState("");

  if (inputSearch !== "") {
    arrData = _.filter(arrData, (item) =>
      _.includes(_.toLower(item.name), _.toLower(inputSearch))
    );
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInputSearch(e.target.value);
    }
  };

  return (
    <Box direction="horizontal" className={st(classes.root)}>
      <Box direction="vertical" className={st(classes.left)}>
        <Box className={st(classes.search)}>
          <Search
            size="medium"
            placeholder="Search"
            value={inputSearch}
            // onChange={(e) => setInputSearch(e.target.value)}
            tabIndex={-1}
            onClear={() => setInputSearch("")}
            onKeyDown={handleKeyDown}
          />
        </Box>
        <Box direction="vertical" className={st(classes.listArrData)}>
          {_.size(arrData) > 0 ? (
            _.map(arrData, (item) => (
              <Box
                className={st(classes.itemList, {
                  isSelected: item.isSelect,
                })}
                onClick={() =>
                  _.isFunction(handleClickSelect) &&
                  handleClickSelect("ARR_TEMPLATE", item.id)
                }
                key={item.id}
              >
                {item.name}
              </Box>
            ))
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
      <Box className={st(classes.right)}>
        {_.some(arrData, ["isSelect", true]) ? (
          <>
            {_.map(
              arrData,
              (item) =>
                item.isSelect === true && (
                  <Box>
                    <Image
                      src={item?.url_image}
                      alt={item?.name}
                      fit="contain"
                      className={st(classes.image)}
                    />
                  </Box>
                )
            )}
          </>
        ) : (
          <Box className={st(classes.pleaseSelectForm)}>
            {"Select Form Template To View"}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ItemForm;
