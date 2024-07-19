import { Button, DatePicker, Form, FormProps, Input, Modal } from "antd";
import { MaskedInput } from "antd-mask-input";
import locale from "antd/es/date-picker/locale/pt_BR";

export const ModalRemover = (props: any) => {
  const { open, setOpenModal, submitForm, cliente } = props;

  type FieldType = {
    nome?: string;
    cpf?: string;
    email?: string;
    nascimento?: Date;
  };

  const [form] = Form.useForm<FieldType>();

  const onCancel = () => {
    setOpenModal(false);
  };

  const onOk = () => {
    submitForm(cliente?.id);
  };

  return (
    <Modal
      open={open}
      title={"Remover"}
      onCancel={() => onCancel()}
      onOk={() => onOk()}
      okText="Sim"
      cancelText="Não"
      okButtonProps={{ danger: true }}
    >
      Tem certeza que quer remover o cliente {cliente?.nome}?
    </Modal>
  );
};
