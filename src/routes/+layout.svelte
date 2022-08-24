<script>
  import "../app.css";
  import Navbar from "../components/navbar.svelte";
</script>

<Navbar/>
<div class=" flex h-[800px] w-full justify-start items-center text-center  flex-col bg-slate-400 text-white">
  <slot />
</div>
