import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { NumericFormat } from "react-number-format";

export const ModalNovaConta = (props: any) => {
  const { open, setOpenModal, submitForm, clientes } = props;

  type FieldType = {
    clienteId?: string;
    valor?: string;
    descricao?: string;
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

  const onChange = (value: string) => {};

  const onSearch = (value: string) => {};

  return (
    <Modal
      open={open}
      title={"Cadastrar nova Conta"}
      onCancel={() => onCancel()}
      onOk={() => onOk()}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item<FieldType>
          label="Cliente"
          name="clienteId"
          rules={[{ required: true, message: "Nome é obrigatório!" }]}
        >
          <Select
            showSearch
            placeholder="Selecione um cliente"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={clientes}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Valor"
          name="valor"
          rules={[{ required: true, message: "Valor é obrigatório!" }]}
        >
          <NumericFormat
            customInput={Input}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            prefix="R$ "
            placeholder="R$ 0,00"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Descrição"
          name="descricao"
          rules={[{ required: true, message: "Descrição é obrigatório!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>{" "}
    </Modal>
  );
};
