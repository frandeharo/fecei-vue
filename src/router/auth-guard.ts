import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAuthenticatedGuard = async (_to: any, _from: any, next: any) => {
  const auth = useAuthStore()
  const { status } = storeToRefs(auth)
  await auth.checkStatus()

  const pass = status.value === 'authenticated' ? true : false
  if (pass) next()
  else next({ name: 'login' })
}

export default isAuthenticatedGuard
