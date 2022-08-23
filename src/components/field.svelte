<script lang="ts">
  export let name: String;
  function handleClick(){

  }
</script>

<button class="bg-gray-600 rounded-md p-2" on:click="{handleClick}">
  {name}
</button>
