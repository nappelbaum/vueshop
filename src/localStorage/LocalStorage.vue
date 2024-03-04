<script>
export default class LocalStorage {
  static setItem(cart) {
    localStorage.setItem(
      '58958138cart',
      JSON.stringify(
        cart.map((item) => ({
          id: item.id,
          qty: item.isAdded,
          selectedOptions: item.selectedOptions
        }))
      )
    )
  }

  static deleteCart() {
    localStorage.removeItem('58958138cart')
  }

  static getCart() {
    if (localStorage.getItem('58958138cart')) {
      return JSON.parse(localStorage.getItem('58958138cart'))
    } else {
      return []
    }
  }
}
</script>
