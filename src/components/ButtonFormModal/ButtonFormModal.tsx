import { useState, KeyboardEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Button from "mgz-ui/dist/src/Button";
import Text from "mgz-ui/dist/src/Text";
import Modal from "mgz-ui/dist/src/Modal";
import Loader from "mgz-ui/dist/src/Loader";
import CustomModalLayout from "mgz-ui/dist/src/CustomModalLayout";
import Input from "mgz-ui/dist/src/Input";
import PageForm from "../FormModal/FormModal";
import { initArrDataTemplate, newFormModal } from "../../stores/ReduxStore";
import { st, classes } from "./ButtonFormModal.st.css";

export type ButtonFormModalProps = {
  openModal?: boolean;
};

const ButtonFormModal = ({ openModal }: ButtonFormModalProps) => {
  const data = useSelector(
    (state: { new_form_modal: InitDataType }) => state.new_form_modal
  );
  const nameTypeSelect = data.nameTypeSelectForm;
  const inputFile = data.inputFile;
  const inputNameFormStore: string | undefined = data.inputNameFormStore;
  let dataTemplate = data.dataTemplate;

  const [isOpenModal, setOpenModal] = useState<boolean | undefined>(openModal);
  const [inputNameForm, setInputNameForm] = useState<string | undefined>("");
  const [message, setMessage] = useState<string>("");
  const [isMessage, setIsMessage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    };

    const arrForm: Data[] | undefined = _.cloneDeep(data.arrDataNewForm);

    const response = await axios.post("http://localhost:3006/post-new-form", {
      ...newForm,
      arrForm: arrForm,
    });

    if (response.data.code === 0) {
      if (!_.isUndefined(arrForm)) {
        arrForm.push(newForm);

        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);

          setMessage(response.data.message);
        }, 1000);

        dispatch(newFormModal(arrForm));
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
    // setInputNameForm("");
  };

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

  useEffect(() => {
    if (inputNameForm === "") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dataTemplate = _.map(dataTemplate, (item) => ({
        ...item,
        isSelect: false,
      }));

      dispatch(initArrDataTemplate(dataTemplate));
    }
  }, [inputNameForm, dispatch]);

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
                  disabled={inputNameForm === "" ? true : false}
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
