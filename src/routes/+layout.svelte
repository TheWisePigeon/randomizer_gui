<script>
  import "../app.css";
  import Navbar from "../components/navbar.svelte";
</script>

<Navbar/>
<div class=" flex h-screen w-full justify-center items-center bg-fuchsia-400">
  <slot />
</div>
