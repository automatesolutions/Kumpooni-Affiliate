import { Image } from 'react-native-image-crop-picker'
import ImageResizer from '@bam.tech/react-native-image-resizer'
import { isAndroid } from '#/platform/detection'
import uuid from 'react-native-uuid'
import RNFS, { CachesDirectoryPath } from 'react-native-fs'

export interface DownloadAndResizeOpts {
  uri: string
  width: number
  height: number
  mode: 'contain' | 'cover' | 'stretch'
  maxSize: number
  timeout: number
}

export async function compressIfNeeded(
  img: Image,
  maxSize: number = 1000000,
): Promise<Image> {
  const origUri = `file://${img.path}`
  if (img.size < maxSize) {
    return img
  }
  const resizedImage = await doResize(origUri, {
    width: img.width,
    height: img.height,
    mode: 'stretch',
    maxSize,
  })
  const finalImageMovedPath = await moveToPermanentPath(
    resizedImage.path,
    '.jpg',
  )
  const finalImg = {
    ...resizedImage,
    path: finalImageMovedPath,
  }
  return finalImg
}

interface DoResizeOpts {
  width: number
  height: number
  mode: 'contain' | 'cover' | 'stretch'
  maxSize: number
}
async function doResize(localUri: string, opts: DoResizeOpts): Promise<Image> {
  for (let i = 0; i < 9; i++) {
    const quality = 100 - i * 10
    const resizeRes = await ImageResizer.createResizedImage(
      localUri,
      opts.width,
      opts.height,
      'JPEG',
      quality,
      undefined,
      undefined,
      undefined,
      { mode: opts.mode },
    )
    if (resizeRes.size < opts.maxSize) {
      return {
        path: normalizePath(resizeRes.path),
        mime: 'image/jpeg',
        size: resizeRes.size,
        width: resizeRes.width,
        height: resizeRes.height,
      }
    } else {
      safeDeleteAsync(resizeRes.path)
    }
  }
  throw new Error(
    `This image is too big! We couldn't compress it down to ${opts.maxSize} bytes`,
  )
}

async function moveToPermanentPath(path: string, ext = 'jpg'): Promise<string> {
  /*
  Since this package stores images in a temp directory, we need to move the file to a permanent location.
  Relevant: IOS bug when trying to open a second time:
  https://github.com/ivpusic/react-native-image-crop-picker/issues/1199
  */
  const filename = uuid.v4()

  // cacheDirectory will not ever be null on native, but it could be on web. This function only ever gets called on
  // native so we assert as a string.
  const destinationPath = joinPath(
    CachesDirectoryPath as string,
    filename + ext,
  )
  await RNFS.copyFile(normalizePath(path), normalizePath(destinationPath))
  safeDeleteAsync(path)
  return normalizePath(destinationPath)
}

function normalizePath(str: string, allPlatforms = false): string {
  if (isAndroid || allPlatforms) {
    if (!str.startsWith('file://')) {
      return `file://${str}`
    }
  }
  return str
}

export async function safeDeleteAsync(path: string) {
  console.log('safeDeleteAsync')
  // Normalize is necessary for Android, otherwise it doesn't delete.
  const normalizedPath = normalizePath(path)

  try {
    await Promise.allSettled([
      RNFS.unlink(normalizedPath),
      RNFS.unlink(normalizedPath.replace(/\.jpe?g$/, '.bin')),
    ])
  } catch (e) {
    console.error('Failed to delete file', e)
  }
}

function joinPath(a: string, b: string) {
  if (a.endsWith('/')) {
    if (b.startsWith('/')) {
      return a.slice(0, -1) + b
    }
    return a + b
  } else if (b.startsWith('/')) {
    return a + b
  }
  return a + '/' + b
}
