import { useState } from "react";
import _ from "lodash";
import Button from "mgz-ui/dist/src/Button";
import Modal from "mgz-ui/dist/src/Modal";
import CustomModalLayout from "mgz-ui/dist/src/CustomModalLayout";
import Page from "mgz-ui/dist/src/Page";
import Input from "mgz-ui/dist/src/Input";
import Card from "mgz-ui/dist/src/Card";
import Box from "mgz-ui/dist/src/Box";
import { st, classes } from "./ButtonFormModal.st.css";
import FormModal from "../PageForm/PageForm";
import PageForm from "../FormModal/FormModal";

export type ButtonFormModalProps = {
  openModal?: boolean;
};

const ButtonFormModal = ({ openModal }: ButtonFormModalProps) => {
  const [isOpenModal, setOpenModal] = useState<boolean | undefined>(openModal);
  const [inputNameForm, setInputNameForm] = useState<string>("");

  const openFormModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleCreateForm = () => {
    console.log(inputNameForm);
  };

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
              <Input
                size="small"
                placeholder="Add form name..."
                value={inputNameForm}
                onChange={(e) => setInputNameForm(e.target.value)}
                clearButton
                onClear={() => setInputNameForm("")}
              />
              <div className={st(classes.actionBtnModal)}>
                <Button priority="secondary" size="small" onClick={closeModal}>
                  Cancel
                </Button>
                <Button size="small" onClick={handleCreateForm}>
                  Create Form
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
