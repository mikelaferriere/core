import axios from 'axios'

const VAULT_HOST = 'http://192.168.1.179:8200'

export const fetchSecret = async (token: string, secretPath: string) => {
  return axios.post(`${VAULT_HOST}/v1/cubbyhole${secretPath}`, {
    headers: {
      'X-Vault-Token': token,
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  })
}
