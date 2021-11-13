import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService{
async getAll(){
  const res = await api.get('api/posts')
  logger.log(res.data)
  AppState.posts = res.data.posts
}

// REVIEW how to get the data to render with computed? reactive? watcheffect?
async like(id){
  await api.post(`api/posts/${id}/like`)
  this.getAll()
}
async create(newpost){
  const res = await api.post('api/posts', newpost)
   AppState.posts = [...AppState.posts, res.data]
   this.getAll()
  // logger.log(res.data)
  // AppState.posts = res.data
}
async remove(id){
  await api.delete('api/posts/' + id)
  AppState.posts = AppState.posts.filter(p => p.id !== AppState.posts.id)
  AppState.posts = AppState.posts
  this.getAll()
}

}


export const postsService = new PostsService()