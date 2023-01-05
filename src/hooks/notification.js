import { useQuasar } from 'quasar'

export default function useNotification() {
  const $q = useQuasar()

  function setSuccess({ title }) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top-right',
      message: title
    })
  }
  function setResponseError({ error }) {
    const title = (error && error.response && error.response.data && error.response.data.error && error.response.data.error.message || error.message || 'Failed to authenticate')
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      position: 'top-right',
      message: title
    });
  }

  return {
    setSuccess,
    setResponseError
  }
}