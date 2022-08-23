<script lang="ts">
  export let name: String;
  function handleClick(){

  }
</script>

<div class="bg-gray-600 rounded-md p-2" on:click="{handleClick}">
  {name}
</div>
