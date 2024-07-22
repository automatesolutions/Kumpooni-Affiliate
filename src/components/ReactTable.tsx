// import { useMemo, useState } from 'react'
// import { View, Text } from 'react-native'
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   flexRender,
//   SortingState,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   VisibilityState,
//   PaginationState,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   createColumnHelper,
// } from '@tanstack/react-table'

// // docs -> https://react-table-v7.tanstack.com/docs/api/useTable
// type Props = {
//   color?: string
//   children: React.ReactNode
// }
// function RText({ children }: React.PropsWithChildren<{}>) {
//   console.log('RTEXT Children', children)
//   return (
//     <Text style={[{ color: '#000', fontWeight: 'bold', flex: 1 }]}>
//       {children}
//     </Text>
//   )
// }
// type Person = {
//   firstName: string
//   lastName: string
//   age: number
//   visits: number
//   status: string
//   progress: number
// }
// const defaultData: Person[] = [
//   {
//     firstName: 'tanner',
//     lastName: 'linsley',
//     age: 24,
//     visits: 100,
//     status: 'In Relationship',
//     progress: 50,
//   },
//   {
//     firstName: 'tandy',
//     lastName: 'miller',
//     age: 40,
//     visits: 40,
//     status: 'Single',
//     progress: 80,
//   },
//   {
//     firstName: 'joe',
//     lastName: 'dirte',
//     age: 45,
//     visits: 20,
//     status: 'Complicated',
//     progress: 10,
//   },
// ]
// export const RTable = () => {
//   const [data, setData] = useState([...defaultData])
//   const columnHelper = createColumnHelper<any>()
//   const columns = [
//     columnHelper.accessor('firstName', {
//       header: () => <Text>Hello World</Text>,
//       cell: info => <Text>{info.getValue()}</Text>,
//     }),
//     columnHelper.accessor(row => row.lastName, {
//       id: 'lastName',
//       cell: info => <Text>{info.getValue()}</Text>,
//       header: () => <Text>Last Name</Text>,
//     }),
//     columnHelper.accessor('age', {
//       header: () => <Text>Age</Text>,
//       cell: info => <Text>{info.getValue()}</Text>,
//     }),
//     columnHelper.accessor('visits', {
//       header: () => <Text>Visits</Text>,
//       cell: info => <Text>{info.getValue()}</Text>,
//     }),
//     columnHelper.accessor('status', {
//       header: () => <Text>{}</Text>,
//       cell: info => <Text>{info.getValue()}</Text>,
//     }),
//     columnHelper.accessor('progress', {
//       header: () => <Text>Profile Progress</Text>,
//       cell: info => <Text>{info.getValue()}</Text>,
//     }),
//   ]

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   //   {
//   //     table.getHeaderGroups().map(headerGroup => (
//   //       <TableRow key={headerGroup.id}>
//   //         {headerGroup.headers.map(header => {
//   //           return (
//   //             <TableHead key={header.id}>
//   //               {header.isPlaceholder
//   //                 ? null
//   //                 : flexRender(
//   //                     header.column.columnDef.header,
//   //                     header.getContext(),
//   //                   )}
//   //             </TableHead>
//   //           )
//   //         })}
//   //       </TableRow>
//   //     ))
//   //   }
//   return (
//     <View style={{ padding: 10 }}>
//       {/* HEAD */}
//       <View style={{ backgroundColor: 'blue' }}>
//         {table.getHeaderGroups().map(headerGroup => (
//           <View
//             key={headerGroup.id}
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//             }}>
//             {headerGroup.headers.map(header => (
//               <View
//                 key={header.id}
//                 style={{
//                   flex: 1,
//                   backgroundColor: 'green',
//                 }}>
//                 {header.isPlaceholder
//                   ? null
//                   : flexRender(
//                       header.column.columnDef.header,
//                       header.getContext(),
//                     )}
//               </View>
//             ))}
//           </View>
//         ))}
//         {/* BODY */}
//         <View style={{ flexDirection: 'row', backgroundColor: 'yellow' }}>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map(row => {
//               console.log('Row', row)

//               return (
//                 <View key={row.id}>
//                   {row.getVisibleCells().map(cell => (
//                     <View key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </View>
//                   ))}
//                 </View>
//               )
//             })
//           ) : (
//             <View>
//               <Text>No results.</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </View>
//   )
// }
