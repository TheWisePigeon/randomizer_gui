<script>
  import "../app.css";
  import Navbar from "../components/navbar.svelte";
</script>

<Navbar/>
<div class=" bg-slate-700 h-screen w-full overflow-hidden flex justify-center text-lg text-white">
  <slot />
</div>
