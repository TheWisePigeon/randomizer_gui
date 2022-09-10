<script lang="ts">
  import Field from "../components/field.svelte";
  import { fields } from "../stores/stores";
  import axios from "axios";
  let fieldsArray:{
    name: string,
    type: string
  }[]

  fields.subscribe((value) => {
    fieldsArray = value;
  });

  let generatorsArray: ArrayLike<unknown>;
  const generators = Promise.resolve(
    axios.get("http://127.0.0.1:5500/generators")
  );

  generators.then((value) => {
    generatorsArray = value.data.generators as ArrayLike<unknown>
  });

  let name : string
  let type : string
  const addField = ()=>{
    fields.update(
        fields=>[...fields, {name: name, type: type }]
    )
  }
</script>
<div class=" w-2/5  justify-center h-screen">
  <div class="text-center">Describe your user schema</div>
  <div class=" flex justify-between my-4">
    <input bind:value="{name}" class=" bg-transparent border-white border-b focus:outline-none" type="text" name="" id="" placeholder="Field" />
    {#if generatorsArray != null}
    <select bind:value="{type}" class=" bg-transparent border-white border-b" name="type" id="">
      {#each generatorsArray as generator}
        <option class=" bg-slate-700" value={generator}>{generator}</option>
      {/each}
    </select>
  {/if}
    <button on:click="{addField}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  </div>
  <div class=" flex justify-between" />
  {#each fieldsArray as field}
    <Field name={field.name} type={field.type} />
  {/each}
</div>
