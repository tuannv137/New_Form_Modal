import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import AddItem from "mgz-ui/dist/src/AddItem";
import Box from "mgz-ui/dist/src/Box";
import Card from "mgz-ui/dist/src/Card";
import Dropzone from "mgz-ui/dist/src/Dropzone";
import EmptyState from "mgz-ui/dist/src/EmptyState";
import FileUpload from "mgz-ui/dist/src/FileUpload";
import Page from "mgz-ui/dist/src/Page";
import TextButton from "mgz-ui/dist/src/TextButton";
import { Add, Upload } from "@wix/wix-ui-icons-common";
import {
  initArrDataTemplate,
  initArrFormSelect,
  newFormModal,
  setInputFile,
  setInputNameFormStore,
  setNameTypeSelectForm,
} from "../../stores/ReduxStore";
import ItemForm from "./ItemForm/ItemForm";
import { st, classes } from "./FormModal.st.css";

export type FormModalProps = {};

const FormModal = () => {
  const data = useSelector(
    (state: { new_form_modal: InitDataType }) => state.new_form_modal
  );
  const nameTypeSelect = data.nameTypeSelectForm;
  const arrDataNewForm = data.arrDataNewForm;
  let arrFormSelect = data.arrFormSelect;
  const inputFile = data.inputFile;

  const [arrTypeForm, setArrTypeFrom] = useState<
    {
      id?: string;
      isSelect?: boolean;
      name?:
        | "Start From Scratch"
        | "Use Template"
        | "Duplicate Existing"
        | "Import Form";
    }[]
  >([
    { id: "1", isSelect: true, name: "Start From Scratch" },
    { id: "2", isSelect: false, name: "Use Template" },
    { id: "3", isSelect: false, name: "Duplicate Existing" },
    { id: "4", isSelect: false, name: "Import Form" },
  ]);

  let arrTemplate = data.dataTemplate;

  const dispatch = useDispatch();

  const handleClickSelect = (
    type?: string,
    id?: string,
    typeSelect?:
      | "Start From Scratch"
      | "Use Template"
      | "Duplicate Existing"
      | "Import Form"
  ) => {
    if (id) {
      if (type === "ARR_TYPE_SELECT") {
        setArrTypeFrom(
          _.map(arrTypeForm, (item) =>
            item.id === id
              ? { ...item, isSelect: true }
              : { ...item, isSelect: false }
          )
        );
        // arrFormSelect && dispatch(initArrFormSelect([]));
        typeSelect && dispatch(setNameTypeSelectForm(typeSelect));
      } else {
        const arrSelect = _.map(
          nameTypeSelect === "Use Template" ? arrTemplate : arrDataNewForm,
          (item) =>
            item.id === id
              ? { ...item, isSelect: true }
              : { ...item, isSelect: false }
        );

        if (
          nameTypeSelect === "Use Template" ||
          nameTypeSelect === "Duplicate Existing"
        ) {
          const name = _.find(
            nameTypeSelect === "Use Template" ? arrTemplate : arrDataNewForm,
            { id }
          );
          name && name.name && dispatch(setInputNameFormStore(name?.name));
        }
        nameTypeSelect === "Duplicate Existing" &&
          dispatch(newFormModal(arrSelect));
        nameTypeSelect === "Use Template" &&
          dispatch(initArrDataTemplate(arrSelect));
      }
    }
  };

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

  const handleOnChangeUpload = (e: FileList) => {
    dispatch(setInputFile(e[0].name));
  };

  return (
    <Page className={st(classes.root)} maxWidth={940}>
      <Page.Header title="" subtitle="" />
      <Page.Content>
        <Card className={st(classes.cardFormModal)}>
          <Box className={st(classes.nameTypeSelect)}>
            {_.map(arrTypeForm, (item) => (
              <Box key={item.id}>
                <div
                  className={st(classes.titleType, {
                    isSelected: item.isSelect,
                  })}
                  onClick={() =>
                    handleClickSelect("ARR_TYPE_SELECT", item.id, item.name)
                  }
                >
                  <Card.Header title="" subtitle={item.name} />
                </div>
              </Box>
            ))}
          </Box>
          <Card.Divider />

          <Box
            width="100%"
            className={st(classes.contentTypeSelect, {
              typeSelect:
                (nameTypeSelect === "Start From Scratch" && 1) ||
                (nameTypeSelect === "Use Template" && 2) ||
                (nameTypeSelect === "Duplicate Existing" && 3) ||
                (nameTypeSelect === "Import Form" && 4),
            })}
          >
            {nameTypeSelect === "Start From Scratch" && (
              <Card.Content>
                <Box direction="vertical" className={st(classes.formBlank)}>
                  <Add className={st(classes.iconAdd)} />
                  <Box className={st(classes.textOne)}>Start from scratch</Box>
                  <Box>Build your own form from scratch.</Box>
                </Box>
              </Card.Content>
            )}

            {nameTypeSelect === "Use Template" && (
              <Card.Content>
                <ItemForm
                  handleClickSelect={handleClickSelect}
                  arrTemplate={arrTemplate}
                  typeSelect="Template"
                />
              </Card.Content>
            )}

            {nameTypeSelect === "Duplicate Existing" && (
              <Card.Content>
                <ItemForm
                  handleClickSelect={handleClickSelect}
                  arrDataNewForm={arrDataNewForm}
                  typeSelect="Duplicate"
                />
              </Card.Content>
            )}

            {nameTypeSelect === "Import Form" && (
              <Card.Content>
                <Dropzone onDrop={() => {}}>
                  <Dropzone.Overlay>
                    <Box
                      direction="vertical"
                      height="455"
                      boxSizing="border-box"
                      border="dashed 1px"
                      borderRadius="6px"
                      borderColor="B20"
                    >
                      <AddItem theme="filled" size="large">
                        Drop your images here
                      </AddItem>
                    </Box>
                  </Dropzone.Overlay>
                  <Dropzone.Content>
                    <Box
                      direction="vertical"
                      border="dashed 1px"
                      boxSizing="border-box"
                      borderRadius="6px"
                      padding="65px"
                      borderColor="B20"
                    >
                      <EmptyState
                        title="Drag your images here"
                        subtitle="Or upload images from your computer"
                        image="https://www.wix-style-react.com/storybook/generic_add_item_illustration.svg"
                      >
                        <FileUpload onChange={handleOnChangeUpload}>
                          {({ openFileUploadDialog }) => (
                            <TextButton
                              onClick={openFileUploadDialog}
                              prefixIcon={<Upload />}
                            >
                              {inputFile !== "" ? inputFile : "Upload Images"}
                            </TextButton>
                          )}
                        </FileUpload>
                      </EmptyState>
                    </Box>
                  </Dropzone.Content>
                </Dropzone>
              </Card.Content>
            )}
          </Box>
        </Card>
      </Page.Content>
    </Page>
  );
};

export default FormModal;
