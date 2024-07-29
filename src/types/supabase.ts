export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[]

export type Database = {
  public: {
    Tables: {
      address: {
        Row: {
          address_line: string
          barangay_id: number
          city_id: number
          created_at: string
          id: number
          postal_code: number
          province_id: number
          region_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address_line: string
          barangay_id: number
          city_id: number
          created_at?: string
          id?: number
          postal_code: number
          province_id: number
          region_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address_line?: string
          barangay_id?: number
          city_id?: number
          created_at?: string
          id?: number
          postal_code?: number
          province_id?: number
          region_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'address_barangay_id_fkey'
            columns: ['barangay_id']
            isOneToOne: false
            referencedRelation: 'barangay'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'address_city_id_fkey'
            columns: ['city_id']
            isOneToOne: false
            referencedRelation: 'city'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'address_province_id_fkey'
            columns: ['province_id']
            isOneToOne: false
            referencedRelation: 'province'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'address_region_id_fkey'
            columns: ['region_id']
            isOneToOne: false
            referencedRelation: 'regions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'address_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      barangay: {
        Row: {
          barangay_name: string
          city_id: number
          id: number
        }
        Insert: {
          barangay_name: string
          city_id: number
          id?: number
        }
        Update: {
          barangay_name?: string
          city_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'barangay_city_id_fkey'
            columns: ['city_id']
            isOneToOne: false
            referencedRelation: 'city'
            referencedColumns: ['id']
          },
        ]
      }
      brand: {
        Row: {
          created_at: string
          id: number
          img_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          img_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          img_url?: string | null
          name?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: number
          img_url: string | null
          is_archived: boolean
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          img_url?: string | null
          is_archived?: boolean
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          img_url?: string | null
          is_archived?: boolean
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      category: {
        Row: {
          created_at: string | null
          id: number
          name: string
          parent_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          parent_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          parent_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'category_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
        ]
      }
      city: {
        Row: {
          city_name: string
          id: number
          province_id: number
        }
        Insert: {
          city_name: string
          id?: number
          province_id: number
        }
        Update: {
          city_name?: string
          id?: number
          province_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'city_province_id_fkey'
            columns: ['province_id']
            isOneToOne: false
            referencedRelation: 'province'
            referencedColumns: ['id']
          },
        ]
      }
      default_schedule: {
        Row: {
          close_time: string
          day_of_week: number
          id: number
          open_time: string
        }
        Insert: {
          close_time: string
          day_of_week: number
          id?: number
          open_time: string
        }
        Update: {
          close_time?: string
          day_of_week?: number
          id?: number
          open_time?: string
        }
        Relationships: []
      }
      diagnostic: {
        Row: {
          answer: string | null
          created_at: string
          id: number
          title: string | null
          type: Database['public']['Enums']['answer_type'] | null
        }
        Insert: {
          answer?: string | null
          created_at?: string
          id?: number
          title?: string | null
          type?: Database['public']['Enums']['answer_type'] | null
        }
        Update: {
          answer?: string | null
          created_at?: string
          id?: number
          title?: string | null
          type?: Database['public']['Enums']['answer_type'] | null
        }
        Relationships: []
      }
      holiday: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          id: number
          start_date: string
          store_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          id?: number
          start_date: string
          store_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          id?: number
          start_date?: string
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'holiday_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'holiday_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
        ]
      }
      model: {
        Row: {
          brand_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          brand_id?: number | null
          id?: never
          name?: string | null
        }
        Update: {
          brand_id?: number | null
          id?: never
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'model_brand_id_fkey'
            columns: ['brand_id']
            isOneToOne: false
            referencedRelation: 'brand'
            referencedColumns: ['id']
          },
        ]
      }
      notification: {
        Row: {
          category_id: number
          created_at: string
          description: string | null
          id: number
          is_read: boolean | null
          metadata: Json | null
          title: string | null
          type: string
        }
        Insert: {
          category_id: number
          created_at?: string
          description?: string | null
          id?: number
          is_read?: boolean | null
          metadata?: Json | null
          title?: string | null
          type: string
        }
        Update: {
          category_id?: number
          created_at?: string
          description?: string | null
          id?: number
          is_read?: boolean | null
          metadata?: Json | null
          title?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notification_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'notification_category'
            referencedColumns: ['id']
          },
        ]
      }
      notification_category: {
        Row: {
          category_code: string
          created_at: string
          display_name: string
          id: number
          name: string
          parent_id: number | null
          updated_at: string | null
        }
        Insert: {
          category_code: string
          created_at?: string
          display_name: string
          id?: number
          name: string
          parent_id?: number | null
          updated_at?: string | null
        }
        Update: {
          category_code?: string
          created_at?: string
          display_name?: string
          id?: number
          name?: string
          parent_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'notification_category_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'notification_category'
            referencedColumns: ['id']
          },
        ]
      }
      notification_push_token: {
        Row: {
          app_id: string
          created_at: string
          platform: Database['public']['Enums']['platform_type']
          token: string
          user_id: string
        }
        Insert: {
          app_id: string
          created_at?: string
          platform: Database['public']['Enums']['platform_type']
          token: string
          user_id: string
        }
        Update: {
          app_id?: string
          created_at?: string
          platform?: Database['public']['Enums']['platform_type']
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notification_push_token_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      notification_store: {
        Row: {
          category_id: number | null
          created_at: string
          description: string
          id: number
          image_url: string | null
          is_read: boolean
          order_id: string | null
          title: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description: string
          id?: number
          image_url?: string | null
          is_read: boolean
          order_id?: string | null
          title: string
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string
          id?: number
          image_url?: string | null
          is_read?: boolean
          order_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notification_store_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'notification_category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notification_store_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'repair_order'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notification_store_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'repair_orders'
            referencedColumns: ['id']
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean | null
          is_read: boolean
          metadata: Json | null
          read_at: string | null
          repair_order_id: string | null
          store_id: string | null
          type: Database['public']['Enums']['notification_type']
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          is_read?: boolean
          metadata?: Json | null
          read_at?: string | null
          repair_order_id?: string | null
          store_id?: string | null
          type?: Database['public']['Enums']['notification_type']
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          is_read?: boolean
          metadata?: Json | null
          read_at?: string | null
          repair_order_id?: string | null
          store_id?: string | null
          type?: Database['public']['Enums']['notification_type']
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'notifications_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_order'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      notify_list: {
        Row: {
          city: string | null
          created_at: string
          email: string
          full_address: string
          id: number
          region: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email: string
          full_address: string
          id?: number
          region?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string
          full_address?: string
          id?: number
          region?: string | null
        }
        Relationships: []
      }
      parts: {
        Row: {
          active_flag: boolean | null
          brand: string | null
          category_id: number | null
          created_at: string
          description: string | null
          id: number
          manufacturer: string | null
          name: string
          part_no: string | null
          price: number
          sku_number: string | null
          slug: string | null
          specifications: string | null
          store_id: string | null
          technical_notes: string | null
          updated_at: string | null
          warranty: string | null
        }
        Insert: {
          active_flag?: boolean | null
          brand?: string | null
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          manufacturer?: string | null
          name: string
          part_no?: string | null
          price: number
          sku_number?: string | null
          slug?: string | null
          specifications?: string | null
          store_id?: string | null
          technical_notes?: string | null
          updated_at?: string | null
          warranty?: string | null
        }
        Update: {
          active_flag?: boolean | null
          brand?: string | null
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          manufacturer?: string | null
          name?: string
          part_no?: string | null
          price?: number
          sku_number?: string | null
          slug?: string | null
          specifications?: string | null
          store_id?: string | null
          technical_notes?: string | null
          updated_at?: string | null
          warranty?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'parts_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'parts_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'parts_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
        ]
      }
      parts_inventory: {
        Row: {
          available_quantity: number
          created_at: string
          id: number
          original_quantity: number
          part_sku_number: number | null
          price: number
          procurement_date: string
          supplier_price: number | null
        }
        Insert: {
          available_quantity: number
          created_at?: string
          id?: number
          original_quantity: number
          part_sku_number?: number | null
          price?: number
          procurement_date: string
          supplier_price?: number | null
        }
        Update: {
          available_quantity?: number
          created_at?: string
          id?: number
          original_quantity?: number
          part_sku_number?: number | null
          price?: number
          procurement_date?: string
          supplier_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_parts_inventory_part_sku_number_fkey'
            columns: ['part_sku_number']
            isOneToOne: false
            referencedRelation: 'parts'
            referencedColumns: ['id']
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          payment_date: string | null
          payment_method: Database['public']['Enums']['payment_method_type']
          reference_no: string | null
          repair_order_id: string
          store_id: string | null
          udpated_at: string | null
          updated_by: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          payment_date?: string | null
          payment_method: Database['public']['Enums']['payment_method_type']
          reference_no?: string | null
          repair_order_id: string
          store_id?: string | null
          udpated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          payment_date?: string | null
          payment_method?: Database['public']['Enums']['payment_method_type']
          reference_no?: string | null
          repair_order_id?: string
          store_id?: string | null
          udpated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'payments_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'payments_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_order'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'payments_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'payments_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'payments_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'payments_updated_by_fkey'
            columns: ['updated_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      province: {
        Row: {
          id: number
          province_name: string
          region_id: number
        }
        Insert: {
          id?: number
          province_name: string
          region_id: number
        }
        Update: {
          id?: number
          province_name?: string
          region_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'province_region_id_fkey'
            columns: ['region_id']
            isOneToOne: false
            referencedRelation: 'regions'
            referencedColumns: ['id']
          },
        ]
      }
      questions: {
        Row: {
          created_at: string
          diagnostic_id: number
          id: number
          name: string
          options: Json | null
        }
        Insert: {
          created_at?: string
          diagnostic_id: number
          id?: number
          name: string
          options?: Json | null
        }
        Update: {
          created_at?: string
          diagnostic_id?: number
          id?: number
          name?: string
          options?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'questions_diagnostic_id_fkey'
            columns: ['diagnostic_id']
            isOneToOne: false
            referencedRelation: 'diagnostic'
            referencedColumns: ['id']
          },
        ]
      }
      regions: {
        Row: {
          id: number
          region_code: string
          region_name: string
        }
        Insert: {
          id?: number
          region_code: string
          region_name: string
        }
        Update: {
          id?: number
          region_code?: string
          region_name?: string
        }
        Relationships: []
      }
      repair_order: {
        Row: {
          appointment_date: string
          appointment_time: string
          arrival_time: string | null
          created_at: string
          id: string
          internal_notes: string | null
          invoice_status: Database['public']['Enums']['invoice_status'] | null
          priority: string | null
          reference_no: number
          status: Database['public']['Enums']['notification_type'] | null
          store_id: string
          total_cost: number | null
          updated_at: string | null
          user_id: string
          vehicle_id: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          arrival_time?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          invoice_status?: Database['public']['Enums']['invoice_status'] | null
          priority?: string | null
          reference_no?: number
          status?: Database['public']['Enums']['notification_type'] | null
          store_id: string
          total_cost?: number | null
          updated_at?: string | null
          user_id: string
          vehicle_id?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          arrival_time?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          invoice_status?: Database['public']['Enums']['invoice_status'] | null
          priority?: string | null
          reference_no?: number
          status?: Database['public']['Enums']['notification_type'] | null
          store_id?: string
          total_cost?: number | null
          updated_at?: string | null
          user_id?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'repair_order_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_vehicle_id_fkey'
            columns: ['vehicle_id']
            isOneToOne: false
            referencedRelation: 'vehicle'
            referencedColumns: ['id']
          },
        ]
      }
      repair_order_line: {
        Row: {
          created_at: string
          id: number
          name: string | null
          price: number | null
          quantity: number
          repair_order_id: string | null
          service_id: number | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          price?: number | null
          quantity?: number
          repair_order_id?: string | null
          service_id?: number | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          price?: number | null
          quantity?: number
          repair_order_id?: string | null
          service_id?: number | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'repair_order_line_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_order'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_line_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_line_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'service'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_line_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['service_id']
          },
          {
            foreignKeyName: 'repair_order_line_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_line_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
        ]
      }
      repair_order_part: {
        Row: {
          cost: number | null
          created_at: string
          id: number
          name: string
          part_id: number | null
          part_no: string | null
          price: number
          quantity: number
          repair_order_id: string
          repair_order_line_id: number | null
          store_id: string
          unit_measure: string | null
          updated_at: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string
          id?: number
          name: string
          part_id?: number | null
          part_no?: string | null
          price?: number
          quantity?: number
          repair_order_id: string
          repair_order_line_id?: number | null
          store_id: string
          unit_measure?: string | null
          updated_at?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string
          id?: number
          name?: string
          part_id?: number | null
          part_no?: string | null
          price?: number
          quantity?: number
          repair_order_id?: string
          repair_order_line_id?: number | null
          store_id?: string
          unit_measure?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'repair_order_line_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_line_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_part_part_id_fkey'
            columns: ['part_id']
            isOneToOne: false
            referencedRelation: 'parts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_part_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_order'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_part_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_part_repair_order_line_id_fkey'
            columns: ['repair_order_line_id']
            isOneToOne: false
            referencedRelation: 'repair_order_line'
            referencedColumns: ['id']
          },
        ]
      }
      repair_order_status_history: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          repair_order_id: string
          status: Database['public']['Enums']['invoice_status']
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          repair_order_id: string
          status: Database['public']['Enums']['invoice_status']
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          repair_order_id?: string
          status?: Database['public']['Enums']['invoice_status']
        }
        Relationships: [
          {
            foreignKeyName: 'repair_order_status_history_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_status_history_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_order'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_status_history_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_orders'
            referencedColumns: ['id']
          },
        ]
      }
      reviews: {
        Row: {
          content: string | null
          created_at: string
          id: number
          rating: number | null
          repair_order_id: string | null
          service_id: number | null
          store_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          rating?: number | null
          repair_order_id?: string | null
          service_id?: number | null
          store_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          rating?: number | null
          repair_order_id?: string | null
          service_id?: number | null
          store_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_order'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_repair_order_id_fkey'
            columns: ['repair_order_id']
            isOneToOne: false
            referencedRelation: 'repair_orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'service'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['service_id']
          },
          {
            foreignKeyName: 'reviews_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database['public']['Enums']['app_permission']
          role: Database['public']['Enums']['app_role']
        }
        Insert: {
          id?: number
          permission: Database['public']['Enums']['app_permission']
          role: Database['public']['Enums']['app_role']
        }
        Update: {
          id?: number
          permission?: Database['public']['Enums']['app_permission']
          role?: Database['public']['Enums']['app_role']
        }
        Relationships: []
      }
      service: {
        Row: {
          category_id: number
          created_at: string
          deleted_at: string | null
          description: string | null
          id: number
          img_url: string | null
          inclusion: string[] | null
          is_active: boolean
          is_car_required: boolean
          minimum_qty: number | null
          name: string
          price: number
          service_type: Database['public']['Enums']['service_type']
          short_description: string | null
          source_id: number | null
          status: Database['public']['Enums']['serviceStatus']
          store_id: string | null
          type: Database['public']['Enums']['serviceItemType']
          unit_measure: string | null
          updated_at: string | null
        }
        Insert: {
          category_id: number
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          img_url?: string | null
          inclusion?: string[] | null
          is_active?: boolean
          is_car_required?: boolean
          minimum_qty?: number | null
          name: string
          price: number
          service_type?: Database['public']['Enums']['service_type']
          short_description?: string | null
          source_id?: number | null
          status?: Database['public']['Enums']['serviceStatus']
          store_id?: string | null
          type: Database['public']['Enums']['serviceItemType']
          unit_measure?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: number
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          img_url?: string | null
          inclusion?: string[] | null
          is_active?: boolean
          is_car_required?: boolean
          minimum_qty?: number | null
          name?: string
          price?: number
          service_type?: Database['public']['Enums']['service_type']
          short_description?: string | null
          source_id?: number | null
          status?: Database['public']['Enums']['serviceStatus']
          store_id?: string | null
          type?: Database['public']['Enums']['serviceItemType']
          unit_measure?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_service_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_service_source_id_fkey'
            columns: ['source_id']
            isOneToOne: false
            referencedRelation: 'service'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_service_source_id_fkey'
            columns: ['source_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['service_id']
          },
          {
            foreignKeyName: 'public_service_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_service_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
        ]
      }
      service_line: {
        Row: {
          cost: number | null
          created_at: string
          deleted_at: string | null
          discount: number | null
          id: number
          name: string
          part_id: number | null
          part_no: string | null
          price: number | null
          quantity: number | null
          service_id: number
          store_id: string
          type: Database['public']['Enums']['serviceLineType']
          udpated_at: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string
          deleted_at?: string | null
          discount?: number | null
          id?: number
          name: string
          part_id?: number | null
          part_no?: string | null
          price?: number | null
          quantity?: number | null
          service_id: number
          store_id: string
          type: Database['public']['Enums']['serviceLineType']
          udpated_at?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string
          deleted_at?: string | null
          discount?: number | null
          id?: number
          name?: string
          part_id?: number | null
          part_no?: string | null
          price?: number | null
          quantity?: number | null
          service_id?: number
          store_id?: string
          type?: Database['public']['Enums']['serviceLineType']
          udpated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'service_line_part_id_fkey'
            columns: ['part_id']
            isOneToOne: false
            referencedRelation: 'parts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'service_line_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'service'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'service_line_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['service_id']
          },
          {
            foreignKeyName: 'service_line_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'service_line_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
        ]
      }
      store: {
        Row: {
          address: string
          banner_img: string | null
          business_hours: string | null
          city: string
          contact_no: string
          created_at: string
          id: string
          latitude: number
          location: unknown | null
          longitude: number
          merchant_offers: string[] | null
          metadata: Json | null
          name: string
          outside_img: string | null
          store_img: string | null
          store_logo: string | null
          tagline: string | null
        }
        Insert: {
          address: string
          banner_img?: string | null
          business_hours?: string | null
          city: string
          contact_no: string
          created_at?: string
          id?: string
          latitude: number
          location?: unknown | null
          longitude: number
          merchant_offers?: string[] | null
          metadata?: Json | null
          name: string
          outside_img?: string | null
          store_img?: string | null
          store_logo?: string | null
          tagline?: string | null
        }
        Update: {
          address?: string
          banner_img?: string | null
          business_hours?: string | null
          city?: string
          contact_no?: string
          created_at?: string
          id?: string
          latitude?: number
          location?: unknown | null
          longitude?: number
          merchant_offers?: string[] | null
          metadata?: Json | null
          name?: string
          outside_img?: string | null
          store_img?: string | null
          store_logo?: string | null
          tagline?: string | null
        }
        Relationships: []
      }
      store_categories: {
        Row: {
          category_id: number
          created_at: string | null
          store_id: string
        }
        Insert: {
          category_id: number
          created_at?: string | null
          store_id: string
        }
        Update: {
          category_id?: number
          created_at?: string | null
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'store_categories_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_categories_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_categories_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
        ]
      }
      store_closed_dates: {
        Row: {
          closed_date: string
          created_at: string
          description: string | null
          id: number
          store_id: string
        }
        Insert: {
          closed_date: string
          created_at?: string
          description?: string | null
          id?: number
          store_id: string
        }
        Update: {
          closed_date?: string
          created_at?: string
          description?: string | null
          id?: number
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'store_closed_dates_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_closed_dates_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
        ]
      }
      store_notifications: {
        Row: {
          category_id: number
          created_at: string
          description: string | null
          id: number
          is_read: boolean
          metadata: Json | null
          picture: string | null
          store_id: string
          sub_category_id: number | null
          title: string
          user_id: string | null
        }
        Insert: {
          category_id: number
          created_at?: string
          description?: string | null
          id?: number
          is_read?: boolean
          metadata?: Json | null
          picture?: string | null
          store_id: string
          sub_category_id?: number | null
          title: string
          user_id?: string | null
        }
        Update: {
          category_id?: number
          created_at?: string
          description?: string | null
          id?: number
          is_read?: boolean
          metadata?: Json | null
          picture?: string | null
          store_id?: string
          sub_category_id?: number | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'store_notifications_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'notification_category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_notifications_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_notifications_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_notifications_sub_category_id_fkey'
            columns: ['sub_category_id']
            isOneToOne: false
            referencedRelation: 'notification_category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_notifications_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      store_schedule: {
        Row: {
          close_time: string | null
          created_at: string
          day_of_week: number
          id: number
          interval: number | null
          open_time: string | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          close_time?: string | null
          created_at?: string
          day_of_week: number
          id?: number
          interval?: number | null
          open_time?: string | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          close_time?: string | null
          created_at?: string
          day_of_week?: number
          id?: number
          interval?: number | null
          open_time?: string | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'store_schedule_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'store_schedule_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
        ]
      }
      user_notifications: {
        Row: {
          created_at: string
          description: string
          from_id: string | null
          id: number
          is_read: boolean
          metadata: Json | null
          reason: string
          reason_subject: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          from_id?: string | null
          id?: number
          is_read?: boolean
          metadata?: Json | null
          reason: string
          reason_subject?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          from_id?: string | null
          id?: number
          is_read?: boolean
          metadata?: Json | null
          reason?: string
          reason_subject?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_notifications_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      user_roles: {
        Row: {
          role: Database['public']['Enums']['app_role']
          store_id: string
          user_id: string
        }
        Insert: {
          role: Database['public']['Enums']['app_role']
          store_id: string
          user_id: string
        }
        Update: {
          role?: Database['public']['Enums']['app_role']
          store_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_roles_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_roles_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_roles_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          fcm_token: string | null
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          notifications_last_read: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          fcm_token?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          last_name?: string | null
          notifications_last_read?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          fcm_token?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          notifications_last_read?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      vehicle: {
        Row: {
          brand_id: number | null
          created_at: string
          id: string
          model_id: number | null
          plate_no: string | null
          updated_at: string | null
          user_id: string | null
          year_model: string | null
        }
        Insert: {
          brand_id?: number | null
          created_at?: string
          id?: string
          model_id?: number | null
          plate_no?: string | null
          updated_at?: string | null
          user_id?: string | null
          year_model?: string | null
        }
        Update: {
          brand_id?: number | null
          created_at?: string
          id?: string
          model_id?: number | null
          plate_no?: string | null
          updated_at?: string | null
          user_id?: string | null
          year_model?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'vehicle_brand_id_fkey'
            columns: ['brand_id']
            isOneToOne: false
            referencedRelation: 'brand'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'vehicle_model_id_fkey'
            columns: ['model_id']
            isOneToOne: false
            referencedRelation: 'model'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'vehicle_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      notification_details: {
        Row: {
          category_name: string | null
          categoryId: number | null
          notification_id: number | null
          subCategoryId: number | null
          title: string | null
        }
        Relationships: []
      }
      repair_orders: {
        Row: {
          appointment_date: string | null
          appointment_date_str: string | null
          appointment_time: string | null
          brand_img_url: string | null
          created_at: string | null
          first_name: string | null
          id: string | null
          invoice_status: Database['public']['Enums']['invoice_status'] | null
          last_name: string | null
          make: string | null
          model: string | null
          order_line_parts: Json[] | null
          order_line_services: Json[] | null
          parts_total: number | null
          phone: string | null
          reference_no: number | null
          services_total: number | null
          status: Database['public']['Enums']['notification_type'] | null
          store_id: string | null
          total_cost: number | null
          user_id: string | null
          vehicle_id: string | null
          year_model: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'repair_order_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_store_id_fkey'
            columns: ['store_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'repair_order_vehicle_id_fkey'
            columns: ['vehicle_id']
            isOneToOne: false
            referencedRelation: 'vehicle'
            referencedColumns: ['id']
          },
        ]
      }
      store_services: {
        Row: {
          address: string | null
          banner_img: string | null
          business_hours: string | null
          city: string | null
          contact_no: string | null
          id: string | null
          latitude: number | null
          location: unknown | null
          longitude: number | null
          merchant_offers: string[] | null
          metadata: Json | null
          name: string | null
          outside_img: string | null
          price: number | null
          s: Database['public']['Tables']['store']['Row'] | null
          service: Json | null
          service_id: number | null
          source_id: number | null
          store_img: string | null
          store_logo: string | null
          tagline: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_service_source_id_fkey'
            columns: ['source_id']
            isOneToOne: false
            referencedRelation: 'service'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_service_source_id_fkey'
            columns: ['source_id']
            isOneToOne: false
            referencedRelation: 'store_services'
            referencedColumns: ['service_id']
          },
        ]
      }
    }
    Functions: {
      _xid_machine_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission']
        }
        Returns: boolean
      }
      check_notifications: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      create_repair_order: {
        Args: {
          user_id: string
          store_id: string
          appointment_date: string
          appointment_time: string
          services_arg: Json
          vehicle_id?: string
        }
        Returns: Json
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_filtered_services: {
        Args: {
          store_id_param: string
        }
        Returns: {
          id: number
          name: string
          price: number
          description: string
          short_description: string
          inclusion: string[]
          category_id: number
          img_url: string
          service_type: Database['public']['Enums']['service_type']
          is_car_required: boolean
          is_active: boolean
          status: Database['public']['Enums']['serviceStatus']
          type: Database['public']['Enums']['serviceItemType']
          categories: Json
        }[]
      }
      get_high_appointments: {
        Args: Record<PropertyKey, never>
        Returns: {
          disable_date: string
        }[]
      }
      get_nearby_stores: {
        Args: {
          _lat: number
          _lng: number
          _service_ids: number[]
        }
        Returns: {
          id: string
          name: string
          store_img: string
          latitude: number
          longitude: number
          address: string
          city: string
          store_logo: string
          dist_meters: number
          metadata: Json
          service_ids: number[]
          order_total: number
          review_count: number
          rating: number
          services: Json[]
          total: number
        }[]
      }
      get_notification_counts: {
        Args: {
          storeid: string
        }
        Returns: {
          category_id: number
          count: number
          category_name: string
          display_name: string
        }[]
      }
      get_notifications: {
        Args: {
          user_id_param: string
        }
        Returns: {
          date: string
          data: Json
        }[]
      }
      get_open_dates_store: {
        Args: {
          _store_id: string
        }
        Returns: {
          available_slot: string
        }[]
      }
      get_store: {
        Args: {
          store_id: string
        }
        Returns: {
          id: string
          name: string
          store_logo: string
          contact_no: string
          tagline: string
          latitude: number
          longitude: number
          store_img: string
          address: string
          city: string
          metadata: Json
          merchant_offers: string[]
          outside_img: string
          order_total: number
          store_rating: number
          review_count: number
          created_at: string
        }[]
      }
      get_store_available_slots: {
        Args: {
          storeid: string
        }
        Returns: {
          available_date: string
          available_timeslots: string[]
          week_day: string
        }[]
      }
      get_store_fully_book_dates: {
        Args: {
          storeid: string
        }
        Returns: {
          closed_date: string
        }[]
      }
      get_store_holidays: {
        Args: {
          _store_id: string
        }
        Returns: {
          created_at: string
          description: string | null
          end_date: string
          id: number
          start_date: string
          store_id: string
        }[]
      }
      get_store_metrics:
        | {
            Args: {
              _store_id: string
              _period: string
            }
            Returns: {
              total_revenue: number
              total_orders: number
              cars_serviced: number
            }[]
          }
        | {
            Args: {
              _store_id: string
              start_date: string
              end_date: string
            }
            Returns: {
              total_revenue: number
              total_orders: number
              cars_serviced: number
            }[]
          }
      get_store_open_dates: {
        Args: {
          _store_id: string
        }
        Returns: {
          available_slot: string
          week_day: string
        }[]
      }
      is_slot_available: {
        Args: {
          storeid: string
          slotstartdate: string
          slotenddate: string
        }
        Returns: boolean
      }
      reset_notification_last_read: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      search_nearby_stores: {
        Args: {
          _lng: number
          _lat: number
          _search: string
        }
        Returns: {
          id: string
          name: string
          longitude: number
          latitude: number
          business_hours: string
          store_img: string
          contact_no: string
          address: string
          city: string
          outside_img: string
          merchant_offers: string[]
          dist_meters: number
          order_total: number
          review_count: number
          store_rating: number
        }[]
      }
      stores_in_view: {
        Args: {
          min_lat: number
          min_long: number
          max_lat: number
          max_long: number
        }
        Returns: {
          id: string
          name: string
          lat: number
          long: number
        }[]
      }
      xid: {
        Args: {
          _at?: string
        }
        Returns: unknown
      }
      xid_counter: {
        Args: {
          _xid: unknown
        }
        Returns: number
      }
      xid_decode: {
        Args: {
          _xid: unknown
        }
        Returns: number[]
      }
      xid_encode: {
        Args: {
          _id: number[]
        }
        Returns: unknown
      }
      xid_machine: {
        Args: {
          _xid: unknown
        }
        Returns: number[]
      }
      xid_pid: {
        Args: {
          _xid: unknown
        }
        Returns: number
      }
      xid_time: {
        Args: {
          _xid: unknown
        }
        Returns: string
      }
    }
    Enums: {
      answer_type: 'text' | 'image'
      app_permission:
        | 'store.view'
        | 'store.create'
        | 'store.update'
        | 'store.delete'
        | 'service.view'
        | 'service.create'
        | 'service.update'
        | 'service.delete'
        | 'vehicle.view'
        | 'vehicle.create'
        | 'vehicle.update'
        | 'vehicle.delete'
        | 'users.view'
      app_role: 'admin' | 'manager'
      invoice_status:
        | 'Paid'
        | 'Unpaid'
        | 'Partially'
        | 'Void'
        | 'Uncollectible'
        | 'Draft'
        | 'Open'
      notification_type:
        | 'scheduled'
        | 'inprogress'
        | 'awaiting-parts'
        | 'canceled'
        | 'completed'
        | 'new-order'
        | 'canceled-order'
        | 'completed-order'
        | 'store'
        | 'services'
        | 'updates'
        | 'default'
      payment_method_type: 'Cash' | 'Gcash' | 'Bank' | 'Maya' | 'Online Banking'
      platform_type: 'ios' | 'android' | 'web'
      repair_order_status:
        | 'Scheduled'
        | 'In Progress'
        | 'Awaiting Parts'
        | 'Canceled'
        | 'Completed'
      service_type: 'In-Store' | 'Home Service' | 'OrderDelivery'
      serviceItemType: 'Product' | 'Service'
      serviceLineType: 'Part' | 'Labor' | 'Fee'
      serviceStatus: 'Draft' | 'Active' | 'Inactive' | 'Reviewed' | 'Deleted'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never
