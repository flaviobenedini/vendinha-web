import { Button, DatePicker, Form, FormProps, Input, Modal } from "antd";
import { MaskedInput } from "antd-mask-input";
import locale from "antd/es/date-picker/locale/pt_BR";

export const ModalNovoClientes = (props: any) => {
  const { open, setOpenModal, submitForm } = props;

  type FieldType = {
    nome?: string;
    cpf?: string;
    email?: string;
    nascimento?: Date;
  };

  const [form] = Form.useForm<FieldType>();

  const onCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        submitForm(values);
        form.resetFields();
        setOpenModal(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={open}
      title={"Cadastrar novo Cliente"}
      onCancel={() => onCancel()}
      onOk={() => onOk()}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item<FieldType>
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Nome é obrigatório!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="CPF"
          name="cpf"
          rules={[{ required: true, message: "CPF é obrigatorio!" }]}
        >
          <MaskedInput mask={"000.000.000-00"} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Data de Nascimento"
          name="nascimento"
          rules={[
            { required: true, message: "Data de Nascimento é obrigatório!" },
          ]}
        >
          <DatePicker
            locale={locale}
            style={{ width: "100%" }}
            format={"DD/MM/YYYY"}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Por favor, insira um e-mail válido!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
