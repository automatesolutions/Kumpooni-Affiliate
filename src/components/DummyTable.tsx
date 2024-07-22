import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { logger } from '#/logger'
type DummyTabletProps = {}
//TData
type User = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: string
}
const columns = [
  {
    header: () => <Text>First Name</Text>,
    accessorKey: 'name.first',
  },
  {
    header: () => <Text>Last Name</Text>,
    accessorKey: 'name.last',
  },
  {
    header: () => <Text>Age</Text>,
    accessorFn: info => info.age,
  },
  //...
]
const defaultData = [
  {
    firstName: 'Tanner',
    lastName: 'Linsley',
    age: 33,
    visits: 100,
    progress: 50,
    status: 'Married',
  },
  {
    firstName: 'Kevin',
    lastName: 'Vandy',
    age: 27,
    visits: 200,
    progress: 100,
    status: 'Single',
  },
]
export function DummyTable(props: DummyTabletProps) {
  const t = useTheme()
  const [data, setData] = useState<User[]>([...defaultData])
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <View style={[]}>
      {/* Header */}
      <View>
        {table.getHeaderGroups().map(headerGroup => (
          <View key={headerGroup.id} style={{ flexDirection: 'row' }}>
            {headerGroup.headers.map(header => {
              return (
                <View key={header.id} style={{ flexDirection: 'row' }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </View>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
