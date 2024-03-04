<script>
export default function convertingNumberToString(number) {
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
</script>
