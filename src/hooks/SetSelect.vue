<script>
export default function setSelectOptions(prodOptions) {
  return prodOptions.map((option) => {
    const selectChoices = option.choices.map((choise) => ({
      text: choise.text,
      active: false
    }))
    return {
      name: option.name,
      state: selectChoices
    }
  })
}
</script>
