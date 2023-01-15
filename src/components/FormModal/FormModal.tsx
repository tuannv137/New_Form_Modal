import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Page from "mgz-ui/dist/src/Page";
import Card from "mgz-ui/dist/src/Card";
import Box from "mgz-ui/dist/src/Box";
import Layout from "mgz-ui/dist/src/Layout";
import Search from "mgz-ui/dist/src/Search";
import Image from "mgz-ui/dist/src/Image";
// import Cell from "mgz-ui/dist/src/Layout/Cell";
import { Add } from "@wix/wix-ui-icons-common";
import { st, classes } from "./FormModal.st.css";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { initArrDataTemplate } from "../../stores/ReduxStore";

export type FormModalProps = {};
const FormModal = ({}: FormModalProps) => {
  const data = useSelector(
    (state: { new_form_modal: InitDataType }) => state.new_form_modal
  );

  const [arrTypeForm, setArrTypeFrom] = useState<
    { id?: string; isSelect?: boolean; name?: string }[]
  >([
    { id: "1", isSelect: true, name: "Start From Scratch" },
    { id: "2", isSelect: false, name: "Use Template" },
    { id: "3", isSelect: false, name: "Duplicate Existing" },
    { id: "4", isSelect: false, name: "Import Form" },
  ]);

  let arrTemplate: Data[] | undefined = data.dataTemplate;

  const handleClickSelect = (type?: string, id?: string) => {
    if (id) {
      if (type === "ARR_TYPE_SELECT") {
        setArrTypeFrom(
          _.map(arrTypeForm, (item) =>
            item.id === id
              ? { ...item, isSelect: true }
              : { ...item, isSelect: false }
          )
        );
      } else {
        arrTemplate = _.map(arrTemplate, (item) =>
          item.id === id
            ? { ...item, isSelect: true }
            : { ...item, isSelect: false }
        );
        dispatch(initArrDataTemplate(arrTemplate));
      }
    }
  };

  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getArrTemplate = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3006/get-form-template"
      );
      dispatch(initArrDataTemplate(response.data));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getArrTemplate();
  }, [getArrTemplate]);

  console.log(data);

  return (
    <Page className={st(classes.root)}>
      <Page.Content>
        {/* <Box display="block"> */}
        <Card>
          <Box className={st(classes.nameTypeSelect)}>
            {_.map(arrTypeForm, (item) => (
              <Box key={item.id}>
                <div
                  className={st(classes.titleType, {
                    isSelected: item.isSelect,
                  })}
                  onClick={() => handleClickSelect("ARR_TYPE_SELECT", item.id)}
                >
                  <Card.Header title="" subtitle={item.name} />
                </div>
              </Box>
            ))}
          </Box>
          <Card.Divider />
          {_.map(arrTypeForm, (item) => (
            <Box
              width="100%"
              key={item.id}
              className={st(classes.contentTypeSelect, {
                typeSelect: item.id,
                isShow: item.isSelect,
              })}
            >
              {item.name === "Start From Scratch" && item.isSelect === true && (
                <Card.Content>
                  <Box direction="vertical" className={st(classes.formBlank)}>
                    <Add className={st(classes.iconAdd)} />
                    <Box className={st(classes.textOne)}>
                      Start from scratch
                    </Box>
                    <Box>Build your own form from scratch.</Box>
                  </Box>
                </Card.Content>
              )}
              {item.name === "Use Template" && item.isSelect === true && (
                <Card.Content>
                  <Box
                    direction="horizontal"
                    // className={st(classes.useTemplate)}
                  >
                    <Box
                      width="25%"
                      direction="vertical"
                      className={st(classes.templateLeft)}
                    >
                      <Box className={st(classes.search)}>
                        <Search size="medium" placeholder="Search" />
                      </Box>
                      <Box
                        direction="vertical"
                        className={st(classes.listTemplate)}
                      >
                        {_.map(arrTemplate, (item) => (
                          <Box
                            className={st(classes.itemList, {
                              isSelected: item.isSelect,
                            })}
                            onClick={() =>
                              handleClickSelect("ARR_TEMPLATE", item.id)
                            }
                          >
                            {item.name}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box width="75%" className={st(classes.templateRight)}>
                      {arrTemplate &&
                        _.map(
                          arrTemplate,
                          (item) =>
                            item.isSelect === true && (
                              <Image
                                src={item?.url_image}
                                alt={item?.url_image}
                              />
                            )
                        )}
                    </Box>
                  </Box>
                </Card.Content>
              )}
              {item.name === "Duplicate Existing" && item.isSelect === true && (
                <Card.Content>3</Card.Content>
              )}
              {item.name === "Import Form" && item.isSelect === true && (
                <Card.Content>4</Card.Content>
              )}
            </Box>
          ))}
        </Card>
        {/* </Box> */}
      </Page.Content>
    </Page>
  );
};

export default FormModal;
