import store from '@/infrastructure/store';

const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  const notification = {
    type: '',
    text: ''
  }

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    console.log('Fallback: Copying cert command was ' + msg)
    notification.type = 'success'
    notification.text = 'Fallback: Copying cert command was ' + msg
    store.dispatch('notification/add', notification)
  } catch (err) {
    notification.type = 'error'
    notification.text = 'Fallback: Oops, unable to copy: ' + err
    store.dispatch('notification/add', notification)
  }

  document.body.removeChild(textArea);
}

const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }

  const notification = {
    type: '',
    text: ''
  }
  navigator.clipboard.writeText(text).then(
    function () {
      notification.type = 'success'
      notification.text = 'Copy to clipboard successful'
      store.dispatch('notification/add', notification)
    },
    function (error) {
      notification.type = 'error'
      notification.text = ' The text could not be copied: ' + error
      store.dispatch('notification/add', notification)
    }
  )
}

export default {
  fallbackCopyTextToClipboard,
  copyTextToClipboard
}