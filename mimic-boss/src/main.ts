import { createRemoteApp, getRoutingLoader } from '@camomile.js/sdk'

import { routes } from './routes'

const url = 'http://camomile.daysnap.cn/assets/remoteEntry.js'
// const url = 'http://localhost:8000/assets/remoteEntry.js'

createRemoteApp({
  url,
  remote: 'hostApp',
}).bootstrap(() => {
  const routingLoader = getRoutingLoader()
  return async (ctx) => {
    const data = await routingLoader(ctx)
    const system = data.find((item) => item.path === '/system')
    if (system) {
      routes.push(system)
    }
    return routes
  }
})
