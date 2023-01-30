import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import AddItem from "mgz-ui/dist/src/AddItem";
import Box from "mgz-ui/dist/src/Box";
import Card from "mgz-ui/dist/src/Card";
import Dropdown from "mgz-ui/dist/src/Dropdown";
import Dropzone from "mgz-ui/dist/src/Dropzone";
import EmptyState from "mgz-ui/dist/src/EmptyState";
import FileUpload from "mgz-ui/dist/src/FileUpload";
import Page from "mgz-ui/dist/src/Page";
import TextButton from "mgz-ui/dist/src/TextButton";
import Text from "mgz-ui/dist/src/Text";
import Upload from "wix-ui-icons-common/Upload";
import Add from "wix-ui-icons-common/Add";
import {
  initArrDataTemplate,
  initNewForm,
  setInputFile,
  setInputNameFormStore,
  setNameTypeSelectForm,
} from "../../stores/ReduxStoreModal";
import FormTemplate from "./FormTemplate/FormTemplate";
import { st, classes } from "./FormModal.st.css";

const FormModal = () => {
  const data = useSelector(
    (state: { new_form_modal: InitDataType }) => state.new_form_modal
  );
  const nameTypeSelect = data.nameTypeSelectForm;
  const dataNewForm = data.dataNewForm;
  const objFile = data.objFile;
  const arrTemplate = data.dataTemplate;
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
    { id: "1", isSelect: false, name: "Start From Scratch" },
    { id: "2", isSelect: false, name: "Use Template" },
    { id: "3", isSelect: false, name: "Duplicate Existing" },
    { id: "4", isSelect: false, name: "Import Form" },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    setArrTypeFrom((preState) =>
      _.map(preState, (item) =>
        "type-" + item.id === nameTypeSelect
          ? { ...item, isSelect: true }
          : { ...item, isSelect: false }
      )
    );
  }, [nameTypeSelect]);

  const handleClickSelect = (type?: string, id?: string) => {
    if (id) {
      if (type === "ARR_TYPE_SELECT") {
        const typeSelect = "type-" + id;
        dispatch(setNameTypeSelectForm(typeSelect));
      } else {
        const arrSelect = _.map(
          nameTypeSelect === "type-2" ? arrTemplate : dataNewForm,
          (item) =>
            item.id === id
              ? { ...item, isSelect: true }
              : { ...item, isSelect: false }
        );

        if (nameTypeSelect === "type-2") {
          const name = _.find(arrTemplate, { id });
          name && name.name && dispatch(setInputNameFormStore(name?.name));
        }
        nameTypeSelect === "type-2" && dispatch(initArrDataTemplate(arrSelect));
        nameTypeSelect === "type-3" && dispatch(initNewForm(arrSelect));
      }
    }
  };

  const handleOnChangeUpload = (file?: FileList) => {
    if (file)
      if (file[0].size <= 5000) {
        dispatch(
          setInputFile({ inputFile: file[0].name, typeFile: file[0].type })
        );
      } else {
        dispatch(setInputFile({ inputFile: file[0].name, typeFile: "" }));
      }
  };

  return (
    <Page className={st(classes.root)} maxWidth={940}>
      <Page.Header title="" subtitle="" />
      <Page.Content>
        <Card className={st(classes.cardFormModal)}>
          <Box className={st(classes.nameTypeSelect)}>
            {_.map(arrTypeForm, (item) => (
              <Box key={item.id}>
                <Box
                  className={st(classes.titleType, {
                    isSelected: item.isSelect,
                  })}
                  onClick={() => handleClickSelect("ARR_TYPE_SELECT", item.id)}
                >
                  <Card.Header title="" subtitle={item.name} />
                </Box>
              </Box>
            ))}
          </Box>
          <Card.Divider />

          <Box
            gap={10 / 6}
            width="100%"
            className={st(classes.contentTypeSelect, {
              typeSelect:
                (nameTypeSelect === "type-1" && 1) ||
                (nameTypeSelect === "type-2" && 2) ||
                (nameTypeSelect === "type-3" && 3) ||
                (nameTypeSelect === "type-4" && 4),
            })}
          >
            <Card.Content>
              {nameTypeSelect === "type-1" && (
                <Box direction="vertical" className={st(classes.formBlank)}>
                  <Add className={st(classes.iconAdd)} width={69} height={69} />
                  <Text className={st(classes.textOne)}>
                    Start from scratch
                  </Text>
                  <Text>Build your own form from scratch.</Text>
                </Box>
              )}

              {(nameTypeSelect === "type-2" || nameTypeSelect === "type-3") && (
                <FormTemplate
                  handleClickSelect={handleClickSelect}
                  arrTemplate={arrTemplate}
                />
              )}

              {nameTypeSelect === "type-4" && (
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
                      padding="50px"
                      borderColor="B20"
                    >
                      <EmptyState
                        title="Drag your images here"
                        subtitle="Or upload images from your computer"
                        image="https://www.wix-style-react.com/storybook/generic_add_item_illustration.svg"
                      >
                        <FileUpload
                          onChange={handleOnChangeUpload}
                          multiple
                          accept=".json, .csv"
                        >
                          {({ openFileUploadDialog }) => (
                            <>
                              <TextButton
                                onClick={openFileUploadDialog}
                                prefixIcon={<Upload />}
                              >
                                {objFile?.inputFile !== ""
                                  ? objFile?.inputFile
                                  : "Upload File"}
                              </TextButton>
                            </>
                          )}
                        </FileUpload>
                      </EmptyState>
                      <Box paddingTop={2} margin="0 auto">
                        <Text skin="standard">
                          Only JSON and CSV file up to 5 MB are supported.
                        </Text>
                      </Box>
                    </Box>
                  </Dropzone.Content>
                </Dropzone>
              )}
            </Card.Content>
          </Box>
        </Card>
      </Page.Content>
    </Page>
  );
};

export default memo(FormModal);
