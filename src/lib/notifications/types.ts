type NotificationType =
  | 'new-order'
  | 'canceled-order'
  | 'inprogress-order'
  | 'completed-order'
  | 'important'
  | 'store'
  | 'services'
  | 'updates'

export type NotificationPayload =
  | {
      type: Exclude<NotificationType, 'important'>
      orderId: string
      referenceNo: number
    }
  | {
      type: 'important'
      templateId: number
    }

export interface MinimalNotification {
  data?: {[key: string]: string | object}
  title?: string
  body?: string
}

type NotificationData =
  | {
      type: Exclude<NotificationType, 'important'>
      orderId: string
      referenceNo: number
      picture?: string
    }
  | {
      type: 'important'
      templateId: number
    }
