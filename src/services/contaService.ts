import Api, { IRequest } from "../api/Api";

export const createConta = async (conta: any): Promise<any> => {
  const response = await Api.post({
    url: `/contas`,
    body: conta,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 201) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};

export const getContas = async (status: boolean): Promise<any> => {
  const statusConta = status ? "paga" : "naopaga";
  console.log(statusConta);
  const response = await Api.get({
    url: `/contas/status/${statusConta}`,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};

export const getDividasTotal = async (): Promise<any> => {
  const response = await Api.get({
    url: `/contas/totaldividas`,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};

export const pagarConta = async (id: number): Promise<any> => {
  const response = await Api.patch({
    url: `/contas/pagar/${id}`,
  });

  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};
