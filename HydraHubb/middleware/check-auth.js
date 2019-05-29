//this is check-auth middleware
export default function(context) {
  // in initAuth we are forwarding it the req
  context.store.dispatch('initAuth', context.req)
  console.log('WE ARE GRABBING USER INFO')
  context.store.dispatch('grabUserInfo', context.req)
  // context.store.dispatch('currentUser')
}
