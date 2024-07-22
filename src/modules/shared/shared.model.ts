// export const updateProductSchema = z.object(
//   id: z.string(),
//   name: z.string().min(1, {
//     message: 'Must be at least 1 character',
//   }),
//   description: z.string().optional(),
//   categoryId: z.string(),
//   subcategoryId: z.string().optional().nullable(),
//   price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
//     message: 'Must be a valid price',
//   }),
//   inventory: z.number(),
//   images: z
//     .custom<File[] | undefined | null>()
//     .optional()
//     .nullable()
//     .default(null),
// })
