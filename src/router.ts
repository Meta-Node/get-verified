import { Router } from '@lit-labs/router'
import { signal } from '@lit-labs/signals'
import { html, type ReactiveControllerHost } from 'lit'

export const router = signal(null as null | Router)

if (!('URLPattern' in globalThis)) {
  await import('urlpattern-polyfill')
}

export const pushRouter = (path: string) => {
  history.pushState('', '', path)
  router.get()?.goto(path)
}

export const createRouter = (classThis: ReactiveControllerHost & HTMLElement) => {
  const routerValue = new Router(classThis, [
    {
      path: '/',
      enter: async () => {
        await import('@/routes/index.ts')
        return true
      },
      render: () => html`<home-page></home-page>`
    },
    {
      path: '/home',
      enter: async () => {
        await import('@/routes/home')
        return true
      },
      render: () =>
        html`<my-home></my-home>
          <app-footer></app-footer> `
    },
    {
      path: '/projects/:id',
      enter: async () => {
        await import('@/routes/verification')
        return true
      },
      render: ({ id }) =>
        html`<verification-page .projectId=${Number(id)}></verification-page>
          <app-footer></app-footer> `
    },
    {
      path: '/activities',
      enter: async () => {
        await import('@/routes/verifiers')
        return true
      },
      render: () =>
        html`<verifiers-page></verifiers-page>
          <app-footer></app-footer> `
    },
    {
      path: '/notifications',
      enter: async () => {
        await import('@/routes/notifications')
        return true
      },
      render: () =>
        html`<notifications-page></notifications-page>
          <app-footer></app-footer> `
    },
    {
      path: '/share',
      enter: async () => {
        await import('@/routes/share')
        return true
      },
      render: () =>
        html`<share-page></share-page>
          <app-footer></app-footer> `
    },
    {
      path: '/profile',
      enter: async () => {
        await import('@/routes/profile')
        return true
      },
      render: () =>
        html`<profile-page></profile-page>
          <app-footer></app-footer> `
    },
    {
      path: '*',
      enter: async () => {
        await import('@/routes/not-found')
        return true
      },
      render: () =>
        html`<not-found></not-found>
          <app-footer></app-footer> `
    }
  ])

  router.set(routerValue)

  return routerValue
}
