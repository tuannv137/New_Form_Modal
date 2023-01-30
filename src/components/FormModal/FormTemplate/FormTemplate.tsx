import { memo, useState } from "react";
import _ from "lodash";
import Box from "mgz-ui/dist/src/Box";
import DropdownLayout from "mgz-ui/dist/src/DropdownLayout";
import Search from "mgz-ui/dist/src/Search";
import ReactHtmlParser from "react-html-parser";
import { st, classes } from "./FormTemplate.st.css";

export type FormTemplateProps = {
  handleClickSelect?: (type?: string, id?: string) => void;
  arrData?: Data[];
};

const FormTemplate = ({ handleClickSelect, arrData }: FormTemplateProps) => {
  const [inputSearch, setInputSearch] = useState("");
  const isSelect = _.some(arrData, ["isSelect", true]);

  if (inputSearch !== "") {
    arrData = _.filter(arrData, (item) =>
      _.includes(_.toLower(item.name), _.toLower(inputSearch))
    );
  }

  const handleSelectedId = (id?: string) => {
    handleClickSelect && handleClickSelect("ARR_OTHER", id);
  };

  const options: any = _.map(arrData, (item) => ({
    id: item.id,
    value: item.name,
  }));

  return (
    <Box direction="horizontal" className={st(classes.root)}>
      <Box
        direction="vertical"
        className={st(classes.left)}
        width={229}
        height={455}
        borderRight={"2px solid #eee"}
      >
        <Box className={st(classes.search)} padding="14px 20px">
          <Search
            size="medium"
            placeholder="Search"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            onClear={() => setInputSearch("")}
          />
        </Box>
        <Box
          direction="vertical"
          height="500px"
          className={st(classes.listArrData)}
        >
          {_.size(arrData) > 0 ? (
            <DropdownLayout
              className={st(classes.listItem)}
              maxHeightPixels="415px"
              visible
              inContainer
              options={options}
              selectedId={_.find(arrData, ["isSelect", true])?.id}
              onSelect={({ id }) => handleSelectedId(_.toString(id))}
            />
          ) : (
            <Box
              gap={1}
              direction="vertical"
              className={st(classes.dataNotFound)}
              padding="18px 20px"
            >
              <Box
                fontWeight={700}
                fontSize={16}
                wordBreak="break-all"
                overflowY="auto"
                maxHeight="100px"
              >{`No results for “${inputSearch}”`}</Box>
              <Box fontWeight={400} fontSize={16}>
                Find templates by name.
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        className={st(classes.right, {
          isHaveSelect: _.some(arrData, ["isSelect", true]),
        })}
        fontSize={16}
        fontWeight={700}
        width={615}
      >
        {isSelect ? (
          <>
            {_.map(
              arrData,
              (item) =>
                item.isSelect === true && (
                  <Box key={item.id} margin="auto">
                    {item.data && ReactHtmlParser(item.data)}
                  </Box>
                )
            )}
          </>
        ) : (
          `Select Form Template To View`
        )}
      </Box>
    </Box>
  );
};

export default memo(FormTemplate);
