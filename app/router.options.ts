import type { RouterConfig } from 'nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
}
