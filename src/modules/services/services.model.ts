import * as z from 'zod'
import { serviceLinePartValidator } from '../parts/parts.model'
import { partLineValidator } from '../orders'

export const serviceType = [
  'In-Store',
  'Home Service',
  'OrderDelivery',
] as const
export const type = ['Product', 'Service'] as const
export const statusType = [
  'Active',
  'Inactive',
  'Draft',
  'Deleted',
  'Reviewed',
] as const
export const serviceValidator = z.object({
  id: z.number(),
  source_id: z.number().optional().nullable(),
  category_id: z.number(),
  description: z.string().optional().nullable(),
  name: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  price: z.coerce.number().gt(0, 'Must be greater than zero'),
  is_car_required: z.boolean(),
  is_active: z.boolean(),
  inclusion: z.array(z.string()).nullable(),
  service_type: z.enum(serviceType),
  type: z.enum(type),
  status: z.enum(statusType),
  categories: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),
  service: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional()
    .nullable(),
})

export const addServiceValidator = z.object({
  id: z.number().optional(),
  categories: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),
  is_car_required: z.boolean(),
  is_active: z.boolean(),
  inclusion: z.array(z.string()).nullable(),
  service_type: z.enum(serviceType),
  source_id: z.number().nullable(),
  type: z.enum(type),
  status: z.enum(statusType),
  category_id: z.number(),
  category_name: z.string().optional(),
  price: z.coerce.number().gt(0, 'Must be greater than zero'),
  description: z.string().nullable(),
  service: z.object({
    id: z.number().optional(),
    name: z.string().min(1, {
      message: 'Must be at least 1 character',
    }),
    source_id: z.number().nullable(),
    category_id: z.number(),
    description: z.string().optional().nullable(),
    price: z.coerce.number().gt(0, 'Must be greater than zero'),
    is_car_required: z.boolean(),
    is_active: z.boolean(),
    inclusion: z.array(z.string()).nullable(),
    service_type: z.enum(serviceType),
    type: z.enum(type),
    status: z.enum(statusType),
    img_url: z.string().optional(),
    parts: z.array(serviceLinePartValidator).optional(),
  }),
})

export const DEFAULT_SERVICE: AddServiceSchema = {
  categories: {
    id: 0,
    name: '',
  },
  price: 0,
  category_id: 0,
  description: null,
  is_car_required: true,
  is_active: true,
  inclusion: [],
  service_type: 'In-Store',
  type: 'Service',
  status: 'Active',
  category_name: '',
  source_id: null,
  service: {
    name: '',
    description: null,
    category_id: 0,
    inclusion: [],
    is_active: false,
    source_id: null,
    is_car_required: true,
    price: 0,
    service_type: 'In-Store',
    status: 'Active',
    type: 'Service',
  },
}

export type ServiceSchema = z.infer<typeof serviceValidator>
export type AddServiceSchema = z.infer<typeof addServiceValidator>
