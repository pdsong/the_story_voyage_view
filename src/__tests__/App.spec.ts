import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { createPinia } from 'pinia'
import router from '../router'

describe('App', () => {
  it('mounts renders properly', async () => {
    const pinia = createPinia()
    const wrapper = mount(App, {
      global: {
        plugins: [pinia, router]
      }
    })
    // Push a route so router is ready
    await router.push('/')
    await router.isReady()

    expect(wrapper.text()).toContain('Home')
  })
})
