import axios from 'axios';

export async function fetchVisitorList() {
  const { data } = await axios.get('http://localhost:3000/visitor');
  return data;
}
