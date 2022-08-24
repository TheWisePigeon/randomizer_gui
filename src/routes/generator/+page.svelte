<script lang="ts">
  import axios from "axios"
  import Field from "../../components/field.svelte"
  import { fields } from "../../stores/fields"
  import fileDownload from 'js-file-download';
  

  let chosenFields: string[]
  fields.subscribe((value) => {
    chosenFields = value;
  });

  const generate =async () => {
    let object = {
      "fields": chosenFields,
      "format": format,
      "rowCount": rows
    }
    if(!format){
      alert('Please choose a format')
      return
    }
    console.log(object)
    let result = await axios.post(
      'https://blooming-gorge-76891.herokuapp.com/generate',
      object
    ).then(
      res=>res.data
    ).catch(
      err=>err
    )
    
    fileDownload(result, `data.${format}`)
    
  }

  const fetchFields = (
    async () => {
      const fields = axios.get('https://blooming-gorge-76891.herokuapp.com/fields')
        .then(
          res=>{
            return res.data
          }
        )
        .catch(
          err=>err
        )
      return fields
    } 
  )()
  let format: String
  const setFormat = (e:Event)=>{
    let value = (e.target as HTMLInputElement).value
    format = value
    
  }
  let rows: Number = 50
  $: rowsMax = rows>100
  $: chosenFormat = format
</script>

<div class=" w-3/5 text-center m-auto">
  <p>Choose fields to add to your model down below</p>
  
  <div class=" overflow-y-scroll h-42">
    {#await fetchFields}
      <p>Loading fields</p>
    {:then data}
      <div class="grid-cols-3 grid m-5">
        {#each data as d}
          <Field name={d} />
        {/each}
      </div>
    {/await}
  </div>
</div>
<div class=" m-auto flex justify-start flex-col">
  <p class="font-bold">Number of rows</p>
  <input type="text" class=" text-black text-center rounded-md focus:outline-none w-16 m-auto caret-green-600" bind:value="{rows}" >
  {#if rowsMax}
    <span class="text-red-500 text-xs">rows can't exceed 100</span>
  {/if}
  <p class=" underline font-bold text-white">Download as</p>
  <div class=" flex justify-between">
    <button on:click="{setFormat}" value="json" class={` p-2 rounded-md m-2 w-16 text-center ${chosenFormat=='json'?'bg-green-400':'bg-slate-500'}`}>JSON</button>
    <button on:click="{setFormat}" value="csv" class={` p-2 rounded-md m-2 w-16 text-center ${chosenFormat=='csv'?'bg-green-400':'bg-slate-500'}`}>CSV</button>
  </div>
  <button on:click="{generate}" class=" bg-green-400 rounded-md p-2 m-2">
    GENERATE
  </button>
</div>