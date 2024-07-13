<!-- src/lib/ClerkProviderWrapper.svelte -->
<script>
  import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/svelte';
</script>

<ClerkProvider>
  <header>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
  <slot></slot>
</ClerkProvider>

<style>
  /* Add any global styles here */
</style>
