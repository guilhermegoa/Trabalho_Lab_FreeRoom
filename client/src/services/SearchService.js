import api from './api'

const searchPath = 'search'

const SearchService = {
  searchPath,

  searchPosts: search => api.get(`${searchPath}/posts/${search}`)
}

export default SearchService
