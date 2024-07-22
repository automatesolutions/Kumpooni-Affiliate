import AsyncStorage from '@react-native-async-storage/async-storage'

import { Schema, schema } from '#/state/persisted/schema'
import { logger } from '#/logger'

const AUTOMATE_STORAGE = 'AUTOMATE_STORAGE'

export async function write(value: Schema) {
  schema.parse(value)
  await AsyncStorage.setItem(AUTOMATE_STORAGE, JSON.stringify(value))
}

export async function read(): Promise<Schema | undefined> {
  const rawData = await AsyncStorage.getItem(AUTOMATE_STORAGE)
  const objData = rawData ? JSON.parse(rawData) : undefined
  if (schema.safeParse(objData).success) {
    return objData
  }
}

export async function clear() {
  try {
    await AsyncStorage.removeItem(AUTOMATE_STORAGE)
  } catch (e: any) {
    logger.error(`persisted store: failed to clear`, { message: e.toString() })
  }
}
