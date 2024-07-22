import { Status } from '#/components/Status'
import { serviceStatusType } from '#/lib/constants'
import { invoiceStatusType } from '#/modules/orders'
import { color } from '#/theme/tokens'

type ServiceStatusProps = {
  status?: (typeof serviceStatusType)[0]
}

export function ServiceStatus({ status }: ServiceStatusProps) {
  switch (status) {
    case 'Active':
      return (
        <Status
          color={color.green_50}
          textStyle={{
            color: color.green_800,
          }}>
          {status}
        </Status>
      )
    case 'Inactive':
      return (
        <Status
          color={color.red_50}
          textStyle={[
            {
              color: color.red_800,
            },
          ]}>
          {status}
        </Status>
      )
    case 'Draft':
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
    case 'Deleted':
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
    default:
      return null
  }
}

// redtext = #a53333
// redbg = #fee2e2
// greenBg = '#dcfce7'
// greenTxt = '#4f9067'
