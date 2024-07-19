"use client";
import { getClienteById, updateCliente } from "@/services/clienteService";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Layout,
  Space,
  Table,
  Tooltip,
} from "antd";
import { MaskedInput } from "antd-mask-input";
import React, { use, useEffect, useState } from "react";
import locale from "antd/es/date-picker/locale/pt_BR";
import { strToCpf, valorReais } from "@/utils/utils";
import moment from "moment";
import Link from "next/link";
import sendNotification from "@/utils/notification.utils";
import { pagarConta } from "@/services/contaService";

const ClientesDetails = ({ params }: { params: { id: string } }) => {
  interface DataType {
    id?: number;
    nome: string;
    cpf: string;
    nascimento: Date;
    email: string;
    contas?: [];
  }

  type FieldType = {
    nome?: string;
    cpf?: string;
    email?: string;
    nascimento?: Date;
  };

  const [form] = Form.useForm<FieldType>();

  const [data, setData] = useState<DataType[]>([]);
  const [initialValues, setInitialValues] = useState<FieldType>({});

  const columns = [
    {
      title: "Codigo",
      dataIndex: "id",
      width: "5%",
    },
    {
      title: "Valor",
      dataIndex: "valor",
      render: (value) => valorReais(value),
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
    },
    {
      title: "Data de Criação",
      dataIndex: "dataCriacao",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "paga",
      render: (value) => (value ? "Paga" : "Não Paga"),
    },
    {
      title: "Data do Pagamento",
      dataIndex: "dataPagamento",
      render: (value) => (value ? new Date(value).toLocaleDateString() : null),
    },
    {
      title: "",
      dataIndex: "",
      render: (item) => actions(item),
    },
  ];

  const actions = (item: any) => {
    return (
      <Tooltip title="Marcar como paga">
        <Button
          type="primary"
          shape="circle"
          disabled={item.paga}
          onClick={() => handlePayment(item.id)}
        >
          $
        </Button>
      </Tooltip>
    );
  };

  const getCliente = async () => {
    const id: number = Number(params.id);
    getClienteById(id)
      .then((response) => {
        setData(response.data);
        form.setFieldsValue({
          nome: response.data.nome,
          cpf: strToCpf(response.data.cpf),
          email: response.data.email,
          nascimento: moment(response.data.nascimento),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitForm = () => {
    const id: number = Number(params.id);
    let values: FieldType = form.getFieldsValue();
    form
      .validateFields()
      .then(() => {
        values.nascimento = new Date(values.nascimento);
        values.cpf = values.cpf.replace(/\D/g, "");
        updateCliente(values, id)
          .then((response) => {
            sendNotification("success", response.data.message);
            getCliente();
          })
          .catch((error) => {
            sendNotification("error", error.response.data.message);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePayment = (id: number) => {
    pagarConta(id)
      .then((response) => {
        sendNotification("success", response.data.message);
        getCliente();
      })
      .catch((error) => {
        sendNotification("error", error.response.data.message);
      });
  };

  useEffect(() => {
    getCliente();
  }, []);

  return (
    <Layout>
      <Layout.Content
        style={{
          borderRadius: "24px",
          padding: "24px",
          backgroundColor: "#fff",
        }}
      >
        <Space direction="horizontal" style={{ width: "100%" }} size={"large"}>
          <h2>Detalhes do Cliente</h2>
        </Space>
        <Form
          form={form}
          layout="vertical"
          style={{ width: "40%" }}
          // initialValues={initialValues}
        >
          <Form.Item<FieldType>
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Nome é obrigatório!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="CPF" name="cpf">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email é obrigatório!" },
              {
                type: "email",
                message: "Por favor, insira um e-mail válido!",
              },
            ]}
          >
            <Input />
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
        </Form>
        <Space
          direction="horizontal"
          align="end"
          style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button type="primary" onClick={() => submitForm()}>
            Salvar
          </Button>
          <Link href="/clientes">
            <Button type="default">Cancelar</Button>
          </Link>
        </Space>
        <h3>Contas:</h3>
        <Table
          style={{ paddingTop: "20px" }}
          columns={columns}
          dataSource={data.contas}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Layout.Content>
    </Layout>
  );
};

export default ClientesDetails;
