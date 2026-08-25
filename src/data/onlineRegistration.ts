import raw from '../content/onlineRegistration.json'

export type OnlineRegistration = {
  /** false hides the /register-online page and the banner on the form page */
  enabled: boolean
  /** GoStudioPro live-schedule widget URL (the responsive `_resp` variant) */
  portalUrl: string
  bannerHeadline: string
  bannerBody: string
  bannerButtonLabel: string
}

const onlineRegistration = raw as OnlineRegistration

export default onlineRegistration
