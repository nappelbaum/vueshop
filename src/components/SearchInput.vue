<script setup>
const emit = defineEmits(['onChangeSearchInput'])
</script>

<template>
  <div class="px-2 py-1 outline-none border rounded-md font-body text-base font-normal" @click.stop>
    <form method="get" class="flex items-center">
      <div class="mr-3 cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
          <path
            class="fill-slate-700"
            d="M11 3a9 9 0 017.336 14.214l4.725 4.725a1.5 1.5 0 01-2.008 2.225l-.114-.103-4.725-4.725A9 9 0 1111 3zm0 2a7 7 0 100 14 7 7 0 000-14z"
            fill-rule="nonzero"
          ></path>
        </svg>
      </div>
      <input
        @input="(e) => emit('onChangeSearchInput', e)"
        class="w-100 outline-none flex-grow placeholder:text-gray-700"
        id="headerSearch"
        type="search"
        name="keyword"
        autocomplete="off"
        maxlength="2048"
        placeholder="Поиск"
      />
    </form>
  </div>
</template>
