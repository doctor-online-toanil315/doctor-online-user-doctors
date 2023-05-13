import axios from 'axios';

export default async function Upload(
  baseUrl: string,
  formData: FormData,
  config: any,
  type: string
) {
  try {
    const data = await axios.post(`${baseUrl}/upload/${type}`, formData, config);
    return data?.data.url;
  } catch (error) {
    console.log(error);
  }
}
