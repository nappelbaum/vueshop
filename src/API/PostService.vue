<script>
import axios from 'axios'

export default class PostService {
  static async getItems(filters) {
    try {
      const params = {}

      if (filters.sortBy) params.sortBy = filters.sortBy
      if (filters.searchQuery) params.keyword = `${filters.searchQuery}*`

      const res = await axios.get('https://app.ecwid.com/api/v3/58958138/products', {
        headers: {
          Authorization: 'Bearer public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD'
        },
        params
      })

      return res.data.items
    } catch (err) {
      console.log(err)
      return { err: err.message }
    }
  }

  static async getCategories() {
    try {
      const res = await axios.get('https://app.ecwid.com/api/v3/58958138/categories', {
        headers: {
          Authorization: 'Bearer public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD'
        }
      })

      return res.data.items
    } catch (err) {
      console.log(err)
    }
  }

  static async getItemsForCart(ids) {
    try {
      const res = await axios.get(
        `https://app.ecwid.com/api/v3/58958138/products?productId=${ids}`,
        {
          headers: {
            Authorization: 'Bearer public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD'
          }
        }
      )

      return res.data.items
    } catch (err) {
      console.log(err)
      return []
    }
  }

  static async getItem(id) {
    try {
      const res = await axios.get(`https://app.ecwid.com/api/v3/58958138/products/${id}`, {
        headers: {
          Authorization: 'Bearer public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD'
        }
      })

      return res.data
    } catch (err) {
      console.log(err)
      return err.message
    }
  }

  static async getCategory(id) {
    try {
      const res = await axios.get(`https://app.ecwid.com/api/v3/58958138/categories/${id}`, {
        headers: {
          Authorization: 'Bearer public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD'
        }
      })

      return res.data
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  static async authAPI(data) {
    try {
      const res = await axios.post('https://vueshop.bohohome.ru/php/test.php', data)
      return res.data
    } catch (err) {
      return err.message
    }
  }

  static async testWP(data) {
    try {
      const res = await axios.post('https://vueshop.bohohome.ru/php/wp.php', data)
      return res.data
    } catch (err) {
      return err.message
    }
  }

  // static async setImages(array) {
  //   const promises = array.map(async (post) => {
  //     if (post?._links['wp:featuredmedia']) {
  //       const images = await axios(post?._links['wp:featuredmedia'][0]?.href)
  //       return {
  //         ...post,
  //         imgs: images.data
  //       }
  //     } else return post
  //   })

  //   const res = await Promise.all(promises)
  //   return res
  // }

  static async getSkillsWP() {
    try {
      const res = await axios('https://aroma.bohohome.ru/wp-json/wp/v2/posts/')
      return res.data
    } catch (err) {
      return err.message
    }
  }

  static async getMediaWP() {
    try {
      const res = await axios('https://aroma.bohohome.ru/wp-json/wp/v2/media/')
      return res.data
    } catch (err) {
      return err.message
    }
  }

  static async getSkillsWithMediaWP() {
    try {
      const promises = [PostService.getSkillsWP(), PostService.getMediaWP()]
      const res = await Promise.all(promises)
      return res
    } catch (err) {
      return err.message
    }
  }
}
</script>
