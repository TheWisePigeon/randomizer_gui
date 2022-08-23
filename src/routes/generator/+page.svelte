<script lang="ts">
  import axios from "axios";
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
  let fields = ['String', 'bruh', 'test']
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
    {#each fields as field}
      <div>
        {field}
      </div>
    {/each}
  </div>
  <div>
    {#await fetchFields}
      <p>Loading fields</p>
    {:then data}
      <p>{data}</p>
    {/await}
  </div>
</div>