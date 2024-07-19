import Api, { IRequest } from "../api/Api";

export const createCliente = async (cliente: any): Promise<any> => {
  const response = await Api.post({
    url: `/clientes`,
    body: cliente,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 201) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};

export const updateCliente = async (cliente: any, id: number): Promise<any> => {
  const response = await Api.patch({
    url: `/clientes/${id}`,
    body: cliente,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};

export const getClientes = async (): Promise<any> => {
  const response = await Api.get({
    url: `/clientes`,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};

export const getClienteNomes = async (): Promise<any> => {
  const response = await Api.get({
    url: `/clientes/nomes`,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};

export const getClienteById = async (id: number): Promise<any> => {
  const response = await Api.get({
    url: `/clientes/${id}`,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};

export const deleteCliente = async (id: number): Promise<any> => {
  const response = await Api.delete({
    url: `/clientes/${id}`,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};
