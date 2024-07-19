"use client";
import React, { use, useEffect, useState } from "react";
import { Button, Layout, Space, Table, TableProps, Tabs } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { getClienteNomes } from "@/services/clienteService";
import { createConta, getContas } from "@/services/contaService";
import { getAge, limpaValor, strToCpf, valorReais } from "@/utils/utils";
import { ModalNovaConta } from "@/components/novaConta";
import { ListaContas } from "@/components/listaContas";
import sendNotification from "@/utils/notification.utils";

const Contas = () => {
  const [openModal, setOpenModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [contas, setContas] = useState([]);
  const [pagas, setPagas] = useState(false);

  const tabs = [
    {
      label: `Não pagas`,
      key: "1",
      children: <ListaContas contas={contas} pagas={pagas} />,
    },
    {
      label: `Pagas`,
      key: "2",
      children: <ListaContas contas={contas} pagas={pagas} />,
    },
  ];

  const onChangeTab = (key: string) => {
    const status = key === "1" ? false : true;
    setPagas(status);
    getContasByStatus(status);
  };

  const submitForm = async (values: any) => {
    values.valor = limpaValor(values.valor);
    createConta(values)
      .then((response) => {
        getContasByStatus(pagas);
        sendNotification("success", response.data.message);
      })
      .catch((error) => {
        console.log(error);
        sendNotification("error", error.response.data.message);
      });
  };

  const getAllClientes = async () => {
    getClienteNomes()
      .then((response) => {
        console.log(response);
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getContasByStatus = async (paga: boolean) => {
    getContas(paga)
      .then((response) => {
        setContas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllClientes();
    getContasByStatus(false);
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
            <h2>Contas</h2>
            <Button type="primary" onClick={() => setOpenModal(true)}>
              Nova Conta
            </Button>
          </Space>
          <Tabs onChange={onChangeTab} type="card" items={tabs} />
        </Layout.Content>
      </Layout>
      <ModalNovaConta
        open={openModal}
        setOpenModal={setOpenModal}
        submitForm={submitForm}
        clientes={clientes}
      />
    </>
  );
};

export default Contas;
