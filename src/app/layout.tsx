"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, Space, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  path?: string
): MenuItem {
  return {
    key,
    icon,
    label,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Clientes", "1", <UserOutlined />, "/clientes"),
  getItem("Contas", "2", <FileTextOutlined />, "/contas"),
];

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <html lang="pt-br">
      <body>
        <AntdRegistry>
          <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
            <Layout.Header
              style={{
                backgroundColor: colorBgContainer,
                borderRadius: borderRadiusLG,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Space
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 style={{ margin: 0 }}>Pendruas na Vendinha</h2>
              </Space>
            </Layout.Header>
            <Layout>
              <Layout.Sider
                theme="light"
                trigger={null}
                collapsible
                collapsed={collapsed}
                width="250"
                style={{
                  backgroundColor: colorBgContainer,
                  paddingTop: "20px",
                }}
              >
                <Menu mode="inline" selectedKeys={selectedKeys}>
                  {items.map((menuItem) => (
                    <Menu.Item key={menuItem?.key} icon={menuItem?.icon}>
                      <Link
                        href={menuItem?.path}
                        onClick={() =>
                          setSelectedKeys([menuItem?.key?.toString()])
                        }
                      >
                        {menuItem?.label}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu>
              </Layout.Sider>
              <Layout
                className="site-layout"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "24px",
                }}
              >
                <Layout.Content
                  style={{
                    margin: "16px 16px 16px 16px",
                    minHeight: 280,
                  }}
                >
                  {children}
                </Layout.Content>
                <Layout.Footer style={{ color: "#000", textAlign: "center" }}>
                  © 2024. Penduras na Vendinha
                </Layout.Footer>
              </Layout>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
