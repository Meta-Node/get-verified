import '../components/common/verification-card.ts'
import { css, html, LitElement, type CSSResultGroup } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/common/profile-card.ts'
import { StateController } from '@lit-app/state'
import { userEmail, userFirstName, userLastName, userProfilePicture } from '@/states/user.ts'

@customElement('my-home')
export class HomeElement extends LitElement {
  static styles?: CSSResultGroup = css`
    .status-bar {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    h2 {
      margin-top: 40px;
      margin-left: 12px;
    }

    .profile-card-wrapper {
      position: relative;
    }

    .apps-section {
      text-align: left;
      margin-bottom: 32px;
    }

    .apps-section h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .profile-card-bg {
      position: absolute;
      inset: 3px;
      border-radius: 24px;
      z-index: -10;
    }
  `

  protected render() {
    return html` <div class="body">
      <div class="profile-card-wrapper">
        <profile-card
          .firstName=${userFirstName.get()}
          .lastName=${userLastName.get()}
          .email=${userEmail.get()}
          .image=${userProfilePicture.get()}
        ></profile-card>

        <profile-card
          .firstName=${userFirstName.get()}
          .lastName=${userLastName.get()}
          .email=${userEmail.get()}
          .image=${userProfilePicture.get()}
          class="profile-card-bg"
        ></profile-card>
      </div>

      <div class="apps-section">
        <h2>Apps needing verification</h2>
        <verification-card
          name="UBI Raffle Verification"
          status="In Progress"
          levelRequirement="4"
          stepsCompleted="2"
          totalSteps="5"
          projectId="2"
        ></verification-card>
        <verification-card
          name="Unitap Raffle Verification"
          status="Completed"
          levelRequirement="4"
          stepsCompleted="5"
          totalSteps="5"
          projectId="1"
        ></verification-card>
      </div>
    </div>`
  }
}
