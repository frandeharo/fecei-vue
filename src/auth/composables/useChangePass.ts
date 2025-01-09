import { useDialog } from "primevue";
import type { DynamicDialogCloseOptions } from "primevue/dynamicdialogoptions";
import { defineAsyncComponent } from "vue";
import useAuth from "./useAuth";


const ChangePasswordDialog = defineAsyncComponent(() => import('../components/ChangePasswordDialog.vue'));

const useChangePass = () => {

  const dialog = useDialog();
  const { changePassword } = useAuth();

  const changePassDialog = () => {

    dialog.open(ChangePasswordDialog, {
      props: {
        header: 'Cambiar contraseña',
        style: { width: '35vw' },
        breakpoints: {
          '960px':  '50vw',
          '640px': '75vw',
          '480px': '100vw'
        }
      },
      onClose: (options?: DynamicDialogCloseOptions) => {
        if (options?.data){
          changePassword(options.data.password);
        }
      }
    })
  }

  return {
    changePassDialog
  }

};



export default useChangePass;
