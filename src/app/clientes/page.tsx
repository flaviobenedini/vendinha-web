"use client";
import React, { use, useEffect, useState } from "react";
import { Button, Layout, Space, Table, TableProps } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import {
  createCliente,
  deleteCliente,
  getClientes,
} from "@/services/clienteService";
import { getAge, strToCpf, valorReais } from "@/utils/utils";
import { ModalNovoClientes } from "@/components/novoCliente";
import { ModalRemover } from "@/components/modalRemover";
import sendNotification from "@/utils/notification.utils";
import Link from "next/link";
import { getDividasTotal } from "@/services/contaService";

const Clientes = () => {
  interface DataType {
    id: number;
    nome: string;
    cpf: string;
    nascimento: Date;
    email: string;
    contas: [];
  }

  const [data, setData] = useState<DataType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalRemover, setOpenModalRemover] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<DataType | null>(null);
  const [dividaTotal, setdividaTotal] = useState(0);

  const getAllClientes = async () => {
    getClientes()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDividas = async () => {
    getDividasTotal()
      .then((response) => {
        setdividaTotal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removerCliente = (id: number) => {
    deleteCliente(id)
      .then((response) => {
        sendNotification("success", response.data.message);
        setOpenModalRemover(false);
        getAllClientes();
      })
      .catch((error) => {
        sendNotification("error", error.response.data.message);
      });
  };

  const submitForm = (values: DataType) => {
    values.nascimento = new Date(values.nascimento);
    values.cpf = values.cpf.replace(/\D/g, "");
    createCliente(values)
      .then((response) => {
        sendNotification("success", response.data.message);
        getAllClientes();
      })
      .catch((error) => {
        console.log(error);
        sendNotification("error", error.response.data.message);
      });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Codigo",
      dataIndex: "id",
      width: "5%",
    },
    {
      title: "Nome",
      dataIndex: "nome",
    },
    {
      title: "Idade",
      dataIndex: "nascimento",
      render: (value) => `${getAge(value)} anos`,
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      render: (value) => strToCpf(value),
    },
    {
      title: "E-Mail",
      dataIndex: "email",
    },
    {
      title: "Dívida",
      dataIndex: "divida",
      render: (value) => valorReais(value),
    },
    {
      title: "",
      dataIndex: "",
      render: (item) => actions(item),
    },
  ];

  const actions = (item: DataType) => {
    const hasContas = item.contas.length > 0;
    return (
      <>
        <div
          style={{ display: "flex", justifyContent: "space-around", width: 80 }}
        >
          <Link href={`/clientes/details/${item.id}`}>
            <Button type="primary" shape="circle" icon={<EditFilled />} />
          </Link>
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteFilled />}
            disabled={hasContas}
            onClick={() => {
              setSelectedCliente(item);
              setOpenModalRemover(true);
            }}
          />
        </div>
      </>
    );
  };

  useEffect(() => {
    getAllClientes();
    getDividas();
  }, []);

  return (
    <>
      <Layout>
        <Layout.Content
          style={{
            borderRadius: "24px",
            padding: "24px",
            backgroundColor: "#fff",
          }}
        >
          <Space
            direction="horizontal"
            style={{ width: "100%" }}
            size={"large"}
          >
            <h2>Clientes</h2>
            <Button type="primary" onClick={() => setOpenModal(true)}>
              Novo Cliente
            </Button>
          </Space>
          <Table
            style={{ paddingTop: "20px" }}
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
          <Space>Total em dívidas:{valorReais(dividaTotal)}</Space>
        </Layout.Content>
      </Layout>
      <ModalNovoClientes
        open={openModal}
        setOpenModal={setOpenModal}
        submitForm={submitForm}
      />
      <ModalRemover
        open={openModalRemover}
        setOpenModal={setOpenModalRemover}
        submitForm={removerCliente}
        cliente={selectedCliente}
      />
    </>
  );
};

export default Clientes;
