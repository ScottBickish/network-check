import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService{
async getProfile(id){
  const res = await api.get(`api/profiles/${id}`)

  AppState.profile = res.data
}
async getProfilePostId(id){
const res = await api.get(`api/profiles/${id}/posts`)
AppState.newer = res.data.newer
AppState.older = res.data.older
AppState.propost = res.data
}
}


export const profilesService = new ProfilesService()