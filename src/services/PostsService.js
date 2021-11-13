import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService{
async getAll(){
  const res = await api.get('api/posts')
  logger.log(res.data)
  AppState.posts = res.data.posts
}
//  FIXME get likes to work
async like(id){
  await api.post('api/posts/',id,'/like')
}
async create(data){
   await api.post('api/posts', data)
   AppState.posts = AppState.posts
  // logger.log(res.data)
  // AppState.posts = res.data
}
async remove(id){
  await api.delete('api/posts/', id)
  AppState.posts = AppState.posts.filter(p => p.id !== AppState.posts.id)
  AppState.posts = AppState.posts
}

}


export const postsService = new PostsService()