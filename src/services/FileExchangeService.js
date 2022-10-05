import axios from 'axios'

function apiClient() {
  return axios.create({
    baseURL: window.VUE_APP_ENV_FILE_EXCHANGE_URL
      ? window.VUE_APP_ENV_FILE_EXCHANGE_URL
      : 'https://t1c.t1t.io:55000/v3/modules/fileexchange/apps/file',
    withCredentials: false,
    headers: {
      'X-CSRF-TOKEN': 't1c-js'
    }
  })
}

export default {
  existType() {
    const data = {
      entity: 'RMC',
      type: 'test'
    }
    return apiClient().post('/exist-type', data)
  },

  createType() {
    const data = {
      entity: 'RMC',
      type: 'test',
      modal: true
    }
    return apiClient().post('/create-type', data)
  },

  fetchTypeInfo(relPath) {
    const data = {
      entity: 'RMC',
      type: 'test',
      relPath: relPath
    }
    return apiClient().post('/list-type-content?start=0&size=20&sort=ASC', data)
  },

  getFileInfo(file) {
    const data = {
      entity: 'RMC',
      type: 'test',
      relPath: [],
      fileName: file
    }
    return apiClient().post('/get-file-info', data)
  },

  createFolder(folderName) {
    const data = {
      entity: 'RMC',
      type: 'test',
      relPath: folderName,
      recursive: false
    }
    return apiClient().post('/create-dir', data)
  },

  copyFile(fileName, newFileName, fromRelPath, toRelPath) {
    const data = {
      entity: 'RMC',
      fromType: 'test',
      fromRelPath: fromRelPath,
      toRelPath: toRelPath,
      toType: 'test',
      fileName: fileName,
      newFileName: newFileName
    }
    return apiClient().post('/copy-file', data)
  },

  moveFile(fileName, fromRelPath, toRelPath) {
    const data = {
      entity: 'RMC',
      fromType: 'test',
      fromRelPath: fromRelPath,
      toRelPath: toRelPath,
      toType: 'test',
      fileName: fileName
    }
    return apiClient().post('/move-file', data)
  },

  deleteType() {
    const data = {
      entity: 'RMC',
      type: 'test'
    }
    return apiClient().post('/delete-type', data)
  }
}
