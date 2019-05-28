export default function(context) {
  // in initAuth we are forwarding it the req
  context.store.dispatch('initAuth', context.req)
  context.store.dispatch('currentUser')
}
