import { visible } from '../content/recital.json'

/**
 * Single source of the "missing flag means visible" rule, shared by the router,
 * nav, and footer.
 *
 * Note: this does not keep recital.json out of the main bundle. The JSON module
 * is shared with the lazy recital pages, so Rollup hoists it into the entry
 * chunk either way. Hiding the recital is a navigation change, not a privacy
 * boundary — unpublished recital content still ships to the browser.
 */
export const recitalVisible: boolean = visible !== false
