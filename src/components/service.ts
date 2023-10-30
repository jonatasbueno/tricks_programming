import axios from "axios";

export async function getData(cep: string) {
  try {
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    return [response, null]
  } catch (error) {
    return [null, error]
  }
}