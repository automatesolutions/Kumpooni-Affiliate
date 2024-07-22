import { Status } from '#/components/Status'

import { invoiceStatusType } from '../types'

type PaymentStatusProps = {
  status?: (typeof invoiceStatusType)[number] | null
}

const PaymentStatus = ({ status }: PaymentStatusProps) => {
  switch (status) {
    case 'Draft':
      return (
        <Status
          color="gray"
          textStyle={{
            color: 'red',
          }}>
          {status}
        </Status>
      )
    case 'Open':
      return <Status color="yellow">{status}</Status>
    case 'Paid':
      return (
        <Status
          color={'#dcfce7'}
          textStyle={[
            {
              color: '#4f9067',
            },
          ]}>
          {status}
        </Status>
      )
    case 'Partially':
    case 'Uncollectible':
      return <Status color="orange">{status}</Status>
    case 'Unpaid':
      return (
        <Status
          color={'#fee2e2'}
          textStyle={[
            {
              color: '#a53333',
            },
          ]}>
          {status}
        </Status>
      )
    case 'Void':
      return <Status color="red">{status}</Status>
    default:
      return null
  }
}

export default PaymentStatus

// redtext = #a53333
// redbg = #fee2e2
// greenBg = '#dcfce7'
// greenTxt = '#4f9067'
