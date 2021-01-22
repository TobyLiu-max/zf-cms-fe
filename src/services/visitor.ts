import axios from 'axios';

export async function fetchVisitorList(url: string, params: any = '') {
  const { data } = await axios.get(url, { params });
  return data;
}

export async function deleteVisitor(url: string) {
  const { data } = await axios.delete(url);
  return data;
}

export async function createVisitor(url: string, params: any) {
  const { data } = await axios.post(url, params);
  return data;
}
