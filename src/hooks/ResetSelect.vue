<script>
export default function resetSelectOptions(prodOptions) {
  if (prodOptions) {
    return prodOptions.map((option) => {
      const selectChoices = option.choices.map((choise, i) => ({
        text: choise.text,
        active: i ? false : true
      }))
      return {
        name: option.name,
        state: selectChoices
      }
    })
  } else return []
}
</script>
