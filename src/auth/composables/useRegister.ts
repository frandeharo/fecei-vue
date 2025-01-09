import { useAuthStore } from '@/stores/auth.store'
import type { RegisterFrm } from '../interfaces/login'
import { computed } from 'vue'

const useRegister = () => {
  const store = useAuthStore()

  return {
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    hasError: computed(() => store.hasError),
    errorMessage: computed(() => store.errorMessage),
    register: (data: RegisterFrm) => store.register(data.email, data.password, data.nombre),
  }
}

export default useRegister
