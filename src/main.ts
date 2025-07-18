import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import './styles.css'

import { createRouter } from '@/router.ts'

import './components/ui/layout.ts'

import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/rating/rating.js'

import 'fa-icons'
import { fetchNewNotifications } from './lib/notifications.ts'
import { userBrightId } from './states/user.ts'

@customElement('my-app')
export class MyApp extends LitElement {
  interval: ReturnType<typeof setInterval> | undefined

  private router = createRouter(this)

  constructor() {
    super()
  }

  connectedCallback(): void {
    super.connectedCallback()
    const brightId = userBrightId.get()

    if (!brightId) return

    fetchNewNotifications(brightId)

    this.interval = setInterval(
      () => {
        if (brightId) fetchNewNotifications(brightId)
      },
      5 * 60 * 1000
    )
  }

  disconnectedCallback(): void {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
    return html` <app-layout> ${this.router.outlet()} </app-layout>`
  }
}
