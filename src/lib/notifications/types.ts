type NotificationType =
  | 'new-order'
  | 'canceled-order'
  | 'inprogress-order'
  | 'completed-order'
  | 'important'
  | 'store'
  | 'services'
  | 'updates'

type NotificationPayload =
  | {
      type: Exclude<NotificationType, 'important'>
      orderId: number
      referenceNo: number
    }
  | {
      type: 'important'
      templateId: number
    }

type NotificationData =
  | {
      type: Exclude<NotificationType, 'important'>
      orderId: number
      referenceNo: number
      picture?: string
    }
  | {
      type: 'important'
      templateId: number
    }
