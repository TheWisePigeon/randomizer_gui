<script lang="ts">
  import Field from "../components/field.svelte";
  import { fields } from "../stores/stores";
  import axios from "axios";
  let fieldsArray: {
    name: string ;
    type: string;
  }[];

  fields.subscribe((value) => {
    fieldsArray = value;
  });

  let generatorsArray: ArrayLike<unknown>;
  const generators = Promise.resolve(
    axios.get("http://127.0.0.1:5500/generators")
  );

  generators.then((value) => {
    generatorsArray = value.data.generators as ArrayLike<unknown>;
  });

  let name: string;
  let type: string;
  let format: string
  let rows: number
  const addField = () => {
    if (name == undefined || name=='') {
      alert("Field name can not be empty");
      return false;
    }
    for (const field in fieldsArray) {
      if (fieldsArray[field].name == name) {
        alert("A field with this name already exists");
        return false;
      }
    }
    fields.update((fields) => [...fields, { name: name, type: type }]);
    name='' 
  };

  const generate = ()=>{
    console.log(fieldsArray);
    let postData = {}
    let schema: { [x: string]: string; } = {}
    fieldsArray.forEach(element => {
        schema[element.name]= element.type
    });
    
  }
</script>

<div class=" w-2/5  justify-center h-screen">
  <div class="text-center">
    Describe your user schema. <br /> Enter your field name and choose it's
    type. <br />Once done, click the + button. Click on the trash icon to remove a field
  </div>
  <div class=" h-10" >

  </div>
  <div class=" flex justify-between my-4">
    <input
      bind:value={name}
      class=" bg-transparent text-center border-white border-b focus:outline-none"
      type="text"
      name=""
      id=""
      placeholder="Field"
    />
    {#if generatorsArray != null}
      <select
        bind:value={type}
        class=" bg-transparent border-white border-b"
        name="type"
        id=""
      >
        {#each generatorsArray as generator}
          <option class=" bg-slate-700" value={generator}>{generator}</option>
        {/each}
      </select>
    {/if}
    <button on:click={addField}>
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
  <div class=" h-10">

  </div>
  <p class=" text-center">Schema</p>
  <div
    class=" h-96 overflow-y-scroll space-y-3  border rounded border-white"
  >
    {#each fieldsArray as field}
      <Field name={field.name} type={field.type} />
    {/each}
  </div>
  <div class="mt-3 flex justify-around">
   <div class="">
     <input class=" bg-transparent border-b border-white text-center block" bind:value="{rows}" type="text" name="" id="" placeholder="Number of rows">
     {#if rows>100}
         <span class=" text-red-700">100 rows max</span>
     {/if}
   </div>
    <select class=" bg-transparent border-b border-white " name="" id="">
        <option class=" bg-transparent" value="csv">CSV</option>
        <option class=" bg-transparent" value="json">JSON</option>
    </select>
  </div>
  <div class=" text-center bg-green-700 my-3">
    <button on:click="{generate}" class=" w-full">
      Generate
    </button>
  </div>
</div>
