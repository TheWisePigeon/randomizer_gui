<script>
  import "../app.css";
  import Navbar from "../components/navbar.svelte";
</script>

<Navbar/>
<div class=" flex h-96 w-full justify-around text-center  flex-col bg-fuchsia-400 text-white">
  <slot />
</div>
