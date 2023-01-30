import { useState, KeyboardEvent, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Button from "mgz-ui/dist/src/Button";
import Box from "mgz-ui/dist/src/Box";
import CustomModalLayout from "mgz-ui/dist/src/CustomModalLayout";
import Modal from "mgz-ui/dist/src/Modal";
import Input from "mgz-ui/dist/src/Input";
import Loader from "mgz-ui/dist/src/Loader";
import Text from "mgz-ui/dist/src/Text";
import { initArrDataTemplate, initNewForm } from "../../stores/ReduxStoreModal";
import FormModal from "../FormModal";
import { st, classes } from "./ButtonFormModal.st.css";

export type ButtonFormModalProps = {
  openModal?: boolean;
};

const ButtonFormModal = ({ openModal }: ButtonFormModalProps) => {
  const data = useSelector(
    (state: { new_form_modal: InitDataType }) => state.new_form_modal
  );
  const objFile = data.objFile;
  const dataNewForm = data.dataNewForm;
  const dataTemplate = data.dataTemplate;
  const nameTypeSelect = data.nameTypeSelectForm;
  const [isOpenModal, setOpenModal] = useState<boolean | undefined>(openModal);
  const [inputNameForm, setInputNameForm] = useState<string | undefined>("");
  const [message, setMessage] = useState<string>("");
  const [isMessage, setIsMessage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isSelect = _.some(
    nameTypeSelect === "type-2" ? dataTemplate : dataNewForm,
    ["isSelect", true]
  );
  const disableBtn =
    (isSelect === false && nameTypeSelect === "type-2") ||
    (nameTypeSelect === "type-4" &&
      (objFile?.inputFile === "" || objFile?.typeFile === "")) ||
    (isSelect === false && nameTypeSelect === "type-3")
      ? true
      : false;

  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getArrTemplate = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3006/get-form-template"
      );

      if (response) dispatch(initArrDataTemplate(response.data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getArrTemplate();
  }, [getArrTemplate]);

  const getArrDataNewForm = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3006/get-new-form");

      if (response) dispatch(initNewForm(response.data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getArrDataNewForm();
  }, [getArrDataNewForm]);

  const handleCreateForm = async () => {
    try {
      const newForm: Data = {
        id: uuidv4(),
        name: inputNameForm,
        type: nameTypeSelect,
        data: isSelect
          ? _.find(nameTypeSelect === "type-2" ? dataTemplate : dataNewForm, [
              "isSelect",
              true,
            ])?.data
          : "",
        fileImport:
          objFile?.typeFile && nameTypeSelect === "type-4"
            ? objFile.inputFile
            : "",
      };

      const arrForm: Data[] | undefined = _.cloneDeep(data.dataNewForm);

      const response = await axios.post("http://localhost:3006/post-new-form", {
        ...newForm,
        arrForm: arrForm,
      });

      setIsLoading(true);

      if (disableBtn) {
        setIsMessage(false);
        setIsLoading(false);
        if (nameTypeSelect === "type-4" && objFile?.typeFile === "") {
          setMessage("File size is too big please choose another file.");
          return;
        }

        nameTypeSelect === "type-3" &&
          setMessage("Select a form to duplicate.");
        nameTypeSelect === "type-2" || nameTypeSelect === "type-4"
          ? setMessage("Please upload a template file.")
          : setMessage("");
      } else {
        if (response.data.status === true) {
          if (!_.isUndefined(arrForm)) {
            setTimeout(() => {
              setIsMessage(true);
              setIsLoading(false);
              setMessage(response.data.message);
            }, 1000);
            newForm && arrForm.push(newForm);
            dispatch(initNewForm(arrForm));
          }
        } else {
          setTimeout(() => {
            setIsLoading(false);
            setIsMessage(false);
            setMessage(response.data.message);
          }, 1000);
        }
      }
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      !disableBtn && inputNameForm !== "" && handleCreateForm();
    }
  };

  return (
    <div className={st(classes.root)}>
      <Button
        onClick={() => setOpenModal(true)}
        className={st(classes.btnOpenModal)}
        dataHook="btn-open-modal"
      >
        Add New Form
      </Button>
      <Modal
        isOpen={!_.isUndefined(isOpenModal) && isOpenModal}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setOpenModal(false)}
      >
        <CustomModalLayout
          className={st(classes.modalLayout)}
          showFooterDivider
          showHeaderDivider
          onCloseButtonClick={() => setOpenModal(false)}
          title="Create New Form"
          removeContentPadding
          footnote={
            <Box gap={2} className={st(classes.footerModal)}>
              {message !== "" && !isLoading && (
                <Text skin={isMessage ? "success" : "error"}>{message}</Text>
              )}

              {message === "" && (
                <Text skin={isMessage ? "success" : "error"}>{message}</Text>
              )}

              <Input
                size="medium"
                placeholder="Add form name..."
                value={inputNameForm}
                onChange={(e) => setInputNameForm(e.target.value)}
                clearButton
                onClear={() => setInputNameForm("")}
                onKeyDown={handleKeyDown}
              />

              <Button
                size="small"
                onClick={handleCreateForm}
                disabled={disableBtn || !inputNameForm}
              >
                {isLoading ? <Loader size="tiny" /> : "Create Form"}
              </Button>
            </Box>
          }
          content={<FormModal />}
        />
      </Modal>
    </div>
  );
};

export default memo(ButtonFormModal);
