import { useState, KeyboardEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Button from "mgz-ui/dist/src/Button";
import CustomModalLayout from "mgz-ui/dist/src/CustomModalLayout";
import Modal from "mgz-ui/dist/src/Modal";
import Input from "mgz-ui/dist/src/Input";
import Loader from "mgz-ui/dist/src/Loader";
import PageForm from "../FormModal/FormModal";
import Text from "mgz-ui/dist/src/Text";
import { newFormModal } from "../../stores/ReduxStore";
import { st, classes } from "./ButtonFormModal.st.css";

export type ButtonFormModalProps = {
  openModal?: boolean;
};

const ButtonFormModal = ({ openModal }: ButtonFormModalProps) => {
  const data = useSelector(
    (state: { new_form_modal: InitDataType }) => state.new_form_modal
  );
  const nameTypeSelect = data.nameTypeSelectForm;
  const inputNameFormStore: string | undefined = data.inputNameFormStore;
  const arrFormSelect = data.arrFormSelect;
  const [isOpenModal, setOpenModal] = useState<boolean | undefined>(openModal);
  const [inputNameForm, setInputNameForm] = useState<string | undefined>("");
  const [message, setMessage] = useState<string>("");
  const [isMessage, setIsMessage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isSelect = !_.isEmpty(arrFormSelect) ? true : false;

  const dispatch = useDispatch();

  const openFormModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleCreateForm = async () => {
    const newForm: Data = {
      id: uuidv4(),
      name: inputNameForm,
      type: nameTypeSelect,
      fieldForm: nameTypeSelect ? arrFormSelect : [],
    };

    const arrForm: Data[] | undefined = _.cloneDeep(data.arrDataNewForm);

    const response = await axios.post("http://localhost:3006/post-new-form", {
      ...newForm,
      arrForm: arrForm,
    });

    if (response.data.code === 0) {
      if (!_.isUndefined(arrForm)) {
        if (nameTypeSelect !== "Import Form") {
          setIsLoading(true);

          setTimeout(() => {
            setIsLoading(false);

            setMessage("abc");

            setIsMessage(false);
          }, 1000);
        }
        if (!isSelect) {
          if (
            nameTypeSelect === "Use Template" ||
            nameTypeSelect === "Duplicate Existing"
          ) {
            setIsLoading(true);

            setTimeout(() => {
              setIsLoading(false);

              setMessage(
                `Please! Select form ${
                  (nameTypeSelect === "Use Template" && "template") ||
                  (nameTypeSelect === "Duplicate Existing" && "duplicate")
                } to view`
              );

              setIsMessage(false);
            }, 1000);
          }
        } else {
          newForm && arrForm.push(newForm);

          setIsLoading(true);

          setTimeout(() => {
            setIsLoading(false);
            setMessage(response.data.message);
          }, 1000);

          dispatch(newFormModal(arrForm));
        }
      }
      setIsMessage(true);
    } else {
      setIsMessage(false);
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setMessage(response.data.message);
      }, 1000);
    }
  };
  console.log(nameTypeSelect);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateForm();
    }
  };
  useEffect(() => {
    if (inputNameFormStore !== "") {
      setInputNameForm(inputNameFormStore);
    }
  }, [inputNameFormStore]);

  return (
    <div className={st(classes.root)}>
      <Button onClick={openFormModal} className={st(classes.btnOpenModal)}>
        Add New Form
      </Button>
      <Modal isOpen={!_.isUndefined(isOpenModal) && isOpenModal}>
        <CustomModalLayout
          showFooterDivider
          showHeaderDivider
          onCloseButtonClick={closeModal}
          title="Create New Form"
          removeContentPadding
          footnote={
            <div className={st(classes.footerModal)}>
              <div className={st(classes.inputFormModal)}>
                <Input
                  size="medium"
                  placeholder="Add form name..."
                  value={inputNameForm}
                  onChange={(e) => setInputNameForm(e.target.value)}
                  clearButton
                  onClear={() => setInputNameForm("")}
                  onKeyDown={handleKeyDown}
                />

                {message !== "" && !isLoading && (
                  <Text skin={isMessage ? "success" : "error"}>{message}</Text>
                )}

                {message === "" && (
                  <Text skin={isMessage ? "success" : "error"}>{message}</Text>
                )}
              </div>

              <div className={st(classes.actionBtnModal)}>
                <Button priority="secondary" size="small" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  size="small"
                  onClick={handleCreateForm}
                  // disabled={
                  //   inputNameForm === "" ||
                  //   (isSelect === false && nameTypeSelect === "Use Template") ||
                  //   (nameTypeSelect === "Import Form" && inputFile === "")
                  //     ? true
                  //     : false
                  // }
                >
                  {isLoading ? <Loader size="tiny" /> : "Create Form"}
                </Button>
              </div>
            </div>
          }
          content={<PageForm />}
        />
      </Modal>
    </div>
  );
};

export default ButtonFormModal;
