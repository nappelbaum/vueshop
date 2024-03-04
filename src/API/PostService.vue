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
      return err.message
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
}
</script>
