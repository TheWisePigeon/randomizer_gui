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

<div class=" w-3/5">
  <p>Choose fields to add to your model down below</p>
  
  <div class=" w-3/5">
    {#await fetchFields}
      <p>Loading fields</p>
    {:then data}
      <div class=" w-3/5 flex justify-between">
        {#each data as d}
          <Field name={d} />
        {/each}
      </div>
    {/await}
  </div>
</div>