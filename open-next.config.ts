import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// ponytail: config default — la landing es prerendered, sin ISR ni revalidación;
// agregar kvIncrementalCache solo si algún día hay páginas dinámicas cacheadas.
export default defineCloudflareConfig()
