<script>
  import { fields } from "../stores/fields";
  /**@type {any}*/
  let chosenFields;
  fields.subscribe((value) => {
    chosenFields = value;
  });
  export /**
   * @type {any}
   */
  let name;
  function handleClick() {
    if(chosenFields.includes(name)){
        alert('Its in')
        return
    }
    alert('Its not in')
  }
</script>

<button class="bg-gray-600 rounded-md p-2" on:click={handleClick}>
  {name}
</button>
