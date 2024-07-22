export const sanitize = (input: Record<string, any>) => {
  const output = { ...input }
  Object.keys(output).forEach(key => {
    if (output[key] === undefined && key !== 'id') output[key] = null
  })
  console.log('output', output)
  return output
}
