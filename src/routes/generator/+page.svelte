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

<div>
  <p>Generate your data </p>
  <div class=" flex flex-col justify-around" >
    <select name="fields" id="fields">
      <option value="email">email</option>
      <option value="name">name</option>
      <option value="password">password</option>
      <option value="address">address</option>
      <option value="phone">phone</option>
    </select>
  </div>
  <div>
    {#await fetchFields}
      <p>Loading fields</p>
    {:then data}
      <div>
        {#each data as d}
          <Field name={d} />
        {/each}
      </div>
    {/await}
  </div>
</div>