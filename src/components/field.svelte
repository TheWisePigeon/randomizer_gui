<script>
// @ts-nocheck

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
    fields.update(
        state=>[...state, name]
    )
    alert(chosenFields)
  }
</script>

<button class="bg-gray-600 rounded-md p-2" on:click={handleClick}>
  {name}
</button>
