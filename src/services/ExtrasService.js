import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ExtrasService{
async getAll(){
  const res = await api.get('api/ads')
  logger.log(res.data)
  AppState.extras
}
}


export const extrasService = new ExtrasService()