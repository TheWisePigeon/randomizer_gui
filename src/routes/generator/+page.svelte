<script lang="ts">
  import axios from "axios";
  import Field from "../../components/field.svelte";
  const fetchFields = (
    async () => {
      const fields = axios.get('http://localhost:5000/fields')
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
  <input type="text" class=" rounded-md focus:outline-none" placeholder="">
  <p class=" underline font-bold text-white">Download as</p>
  <div class=" flex justify-between">
    <button class=" bg-green-400 p-2 rounded-md m-2 w-16 text-center">CSV</button>
    <button class=" bg-green-400 p-2 rounded-md m-2 w-16 text-center">JSON</button>
  </div>
</div>