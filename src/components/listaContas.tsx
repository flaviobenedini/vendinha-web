import { valorReais } from "@/utils/utils";
import { Button, Layout, Space, Table, Tooltip } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { TableProps } from "antd/lib";
import { useEffect, useState } from "react";

export const ListaContas = (props: any) => {
  const { contas, pagas } = props;

  interface DataType {
    id: number;
    clienteId: number;
    descricao: string;
    valor: number;
    paga: boolean;
    dataCriacao: Date;
    dataPagamento: Date;
    cliente: {
      id: number;
      nome: string;
      cpf: string;
      nascimento: Date;
      email: string;
    };
  }

  const [columns, setColumns] = useState<TableProps<DataType>["columns"]>([]);

  const actions = (item: DataType) => {
    return (
      <>
        {!pagas && (
          <Tooltip title="Marcar como paga">
            <Button type="primary" shape="circle">
              $
            </Button>
          </Tooltip>
        )}
        {pagas && (
          <Tooltip title="Editar">
            <Button type="primary" shape="circle">
              <EditFilled />
            </Button>
          </Tooltip>
        )}
      </>
    );
  };

  const handleColumns = () => {
    let columns: TableProps<DataType>["columns"] = [];

    if (pagas)
      setColumns([
        {
          title: "Codigo",
          dataIndex: "id",
          width: "5%",
        },
        {
          title: "Cliente",
          dataIndex: "cliente",
          render: (cliente) => cliente.nome,
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
          title: "Data de Pagamento",
          dataIndex: "dataPagamento",
          render: (value) => new Date(value).toLocaleDateString(),
        },
        {
          title: "",
          dataIndex: "",
          render: (item) => actions(item),
        },
      ]);
    else
      setColumns([
        {
          title: "Codigo",
          dataIndex: "id",
          width: "5%",
        },
        {
          title: "Cliente",
          dataIndex: "cliente",
          render: (cliente) => cliente.nome,
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
          title: "",
          dataIndex: "",
          render: (item) => actions(item),
        },
      ]);
  };

  useEffect(() => {
    handleColumns();
  }, [contas]);

  return (
    <Layout>
      <Layout.Content
        style={{
          padding: "24px",
          backgroundColor: "#fff",
        }}
      >
        <Table
          style={{ paddingTop: "20px" }}
          columns={columns}
          dataSource={contas}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Layout.Content>
    </Layout>
  );
};
