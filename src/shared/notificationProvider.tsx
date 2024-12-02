import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

export const showSuccessMessage = (msg: any) => {
    Store.addNotification({
        title: 'Successful',
        message: msg,
        type: 'success',                         // 'default', 'success', 'info', 'warning'
        container: 'top-right',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {
          duration: 3000 
        }
      })
}

export const showSuccessMessageWithNoTitle = (msg: any) => {
  Store.addNotification({
      message: msg,
      type: 'success',                         // 'default', 'success', 'info', 'warning'
      container: 'top-right',                // where to position the notifications
      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
      dismiss: {
        duration: 3000 
      }
    })
}

export const showWarningMessage = (msg: any) => {
  Store.addNotification({
      title: 'Warning',
      message: msg,
      type: 'warning',                         // 'default', 'success', 'info', 'warning'
      container: 'top-right',                // where to position the notifications
      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
      dismiss: {
        duration: 6000 
      }
    })
}

export const showInfoMessage = (msg: any) => {
  Store.addNotification({
      title: 'Info',
      message: msg,
      type: 'info',                         // 'default', 'success', 'info', 'warning'
      container: 'top-right',                // where to position the notifications
      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
      dismiss: {
        duration: 3000 
      }
    })
}


export const showDefaultMessage = (msg: any) => {
  Store.addNotification({
      title: 'Default',
      message: msg,
      type: 'default',                         // 'default', 'success', 'info', 'warning'
      container: 'top-right',                // where to position the notifications
      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
      dismiss: {
        duration: 3000 
      }
    })
}