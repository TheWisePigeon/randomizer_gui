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
  $: fieldIn = chosenFields.includes(name)
  function handleClick() {
    if(chosenFields.includes(name)){
        let updated = chosenFields.filter(
(            /** @type {any} */ field) => field!==name
        )
        fields.update(
            state=>updated
        )
        return
    }
    fields.update(
        state=>[...state, name]
    )
  }
</script>

<button class={`bg-gray-600 rounded-md m-2 p-2 ${fieldIn? 'bg-green-400':''} `} on:click={handleClick}>
  {name}
</button>
