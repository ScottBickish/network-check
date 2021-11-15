import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService{
async getAll(){
  const res = await api.get('api/posts')

  AppState.posts = res.data.posts
  AppState.newer = res.data.newer
  AppState.older = res.data.older
}

async search(query){
 const res = await api.get('api/posts?query='+ query)

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

}
async remove(id){
  await api.delete('api/posts/' + id)
  AppState.posts = AppState.posts.filter(p => p.id !== AppState.posts.id)
  AppState.posts = AppState.posts
  this.getAll()
}
  // REVIEW same thing with only profile why wont it refresh its literally the same code
async getPage(url = 'api/posts'){
  const res = await api.get(url)
  AppState.posts = res.data.posts
  AppState.newer = res.data.newer
  AppState.older = res.data.older
  // AppState.posts = res.data.posts
 
  // AppState.page++
  
 
}
async getNewer(url = 'api/posts'){
  const res = await api.get(url)
  AppState.posts = res.data.posts
  AppState.newer = res.data.newer
  AppState.older = res.data.older
//   AppState.posts = res.data.posts
//   AppState.page--
// }
// async getPagePro(page){
//   const res = await api.get('api')
}

}


export const postsService = new PostsService()