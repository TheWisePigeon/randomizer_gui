<script lang="ts">
  import axios from "axios";
  import fs from "fs";
  let model: String;
  let config = "default";
  let rowCount: Number;
  let format: String;
  let numberOnlyRegex: string = "/[1-9]/g";
  $: max = rowCount > 100;
  async function generate() {
    let data = {
      model: model,
      config: config,
      rowCount: rowCount,
      format: format,
    };

    let result = await axios
      .post("http://localhost:5000", data)
      .then((res) => res.data);

    fs.writeFile(`data.${format}`, result, () => {
      console.log("File saved");
    });
  }
</script>

<div
  class=" w-3/5 h-3/4 bg-rose-400 rounded-lg flex flex-col justify-between items-center p-5 text-white font-bold font-mono text-2xl"
>
  <div class=" flex flex-col items-center">
    <div>Step 1: Choose a model</div>
    <p class=" text-base">
      We currently support only one model which is <strong>User</strong> model. More
      models coming
    </p>
    <div>
      <select name="model" bind:value={model} id="" class=" text-rose-400">
        <option value="User">User</option>
      </select>
    </div>
  </div>
  <div class=" flex flex-col items-center">
    Step 2: Configure your model
    <p class="text-base text-center">
      The configuration allows you to add or remove fields. <br />We don't
      support custom fields yet, but they will be coming very soon
    </p>
    <!-- <div class=" flex justify-center w-3/5">
        <div class="flex ">
            <p class="">Default</p>
            <input type="checkbox" checked name="default" value="default" id="">
        </div>
    </div> -->
  </div>
  <div class=" flex flex-col items-center">
    Step 3: Choose the output format and the number of rows
    <p class="text-base text-center">
      We support CSV and JSON formats. User can generate up to 100 rows per
      model.
    </p>
    <div class=" flex justify-between space-x-2 ">
      <div>
        <input
          bind:value={rowCount}
          class="w-10 text-black focus:outline-none"
          pattern={numberOnlyRegex}
          type="text"
        /><br />
        {#if max}
          <span class=" text-red-600 text-xs">Max 100 rows</span>
        {/if}
      </div>
      <div>
        <select name="format" bind:value={format} class="text-black" id="">
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </div>
    </div>
  </div>
  <div>
    <button on:click={generate} class=" bg-white text-rose-400 p-2 rounded-2xl">
      Get Data
    </button>
  </div>
</div>
