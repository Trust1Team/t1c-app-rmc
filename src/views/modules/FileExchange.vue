<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-12 flex justify-end m-4"><img src="@/assets/images/t1c-logo-full.png" alt="" class="logo" /></div>
    <div class="col-span-12 text-center font-medium text-3xl text-gray-500 my-2 px-2">{{ $t("modules.File-exchange Module") }}</div>
    <!-- <div class="col-span-12 grid grid-cols-12" v-if="fileExchangeActive">
      <div class="col-span-12 text-center my-2 text-lg">{{ $t("modules.File-exchange use") }} <b class="text-gray-600">{{ $t("modules.Entity") }}*</b>{{ $t("modules.And a") }} <b class="text-gray-600">{{ $t("modules.Type") }}*</b></div>
      <div class="col-span-12 flex justify-center mt-8">
        <div class="intro-y box flex flex-col justify-center align-items-center py-4 configuration-card border-4 border-gray-400">
          <div class=" text-center text-gray-700 font-bold mb-4 font-medium text-lg border-b border-gray-300 pb-4">{{ $t("modules.File-exchange Data") }}</div>
          <div class="rounded flex justify-center px-10">
            <input
              class="form-control bg-gray-200 border-0 my-4"
              type="text"
              v-model="entityName"
              :placeholder="$t('modules.Entity name')"
            />
          </div>
          <div class="rounded flex justify-center px-10">
            <input
              class="form-control bg-gray-200 border-0 my-4"
              type="text"
              v-model="typeName"
              :placeholder="$t('modules.Type name')"
            />
          </div>
          <div class="text-center my-4">
            <button class="btn bg-gray-400 text-white px-20" @click="fileExchangeActive = true">{{ $t("modules.Create") }}</button>
          </div>
        </div>
      </div>
      <div class="col-span-12 mt-20 border-t border-gray-300 flex flex-col">
        <div class="flex pt-10 pl-4">
          <span class="question-icon"><i class="far fa-question-circle fa-5x"></i></span>
          <div class="pl-8">
            <p class="text-gray-500"><b class="text-gray-600">{{ $t("modules.Entity") }}</b>: {{ $t("modules.Entity description") }}</p>
            <p class="mt-4 text-gray-500"><b class="text-gray-600">{{ $t("modules.Type") }}</b>: {{ $t("modules.Type description") }}</p>
          </div>
        </div>
      </div>
    </div> -->
    <div v-if="!typeExists" class="col-span-12">
      <div class="text-center my-4">
        <p>To use the file-exchange module, please first choose a directory to map</p>
      </div>
      <div class="text-center my-4">
        <button class="btn bg-gray-400 text-white px-20" @click="createType()">{{ $t("modules.Create") }}</button>
      </div>
    </div>
    <div class="col-span-12 grid grid-cols-12" v-if="typeExists">
      <div class="col-span-12 my-4 text-center">
        <p class="text-gray-600">{{ $t("modules.Entity") }}: &ensp; {{ entityName }}</p>
        <p class="text-gray-600">{{ $t("modules.Type") }}: &ensp; {{ typeName }}</p>
      </div>
      <div class="col-span-12 flex mt-5" v-if="copyActive">
        <span>Enter the desired name of the copied file: &ensp;</span>
        <input
          class="form-control border-0 mx-3 create-folder-input w-1/5"
          type="text"
          v-model="copyName"
          placeholder="New file name"
        />
        <span>Choose the folder to copy into: &ensp;</span>
        <select class="form-control" @change="(e) => toRelPath.push(e.target.value)">
          <option value="">Root</option>
          <option v-for="(folder, index) in rootFolders" v-bind:key="index" :value="folder.name">{{ folder.name }}</option>
        </select>
        <button class="btn btn-primary" @click="copyFile(copyName)">Copy</button>
      </div>
        <div class="col-span-12 flex mt-5" v-if="moveActive">
        <span>Choose the folder to move into: &ensp;</span>
        <select class="form-control" @change="(e) => toRelPath.push(e.target.value)">
          <option value="">Root</option>
          <option v-for="(folder, index) in rootFolders" v-bind:key="index" :value="folder.name">{{ folder.name }}</option>
        </select>
        <button class="btn btn-primary" @click="moveFile()">Move</button>
      </div>
      <div class="col-span-12 flex justify-center mt-10">
        <div class="intro-y box file-exchange-container bg-gray-300 p-2">
          <div class="flex bg-white rounded pl-2 pt-2">
            <button class="btn border-0 mx-1 file-exchange-tab" :class="activeTab === 'Open Folder' ? 'bg-gray-300' : ''"><i class="fas fa-folder-open"></i>&ensp; Open folder</button>
            <button class="btn border-0 mx-1 file-exchange-tab" disabled><i class="fas fa-upload"></i>&ensp;Upload</button>
            <button class="btn border-0 mx-1 file-exchange-tab" disabled><i class="fas fa-download"></i>&ensp;Download</button>
            <button class="btn border-0 mx-1 file-exchange-tab" @click="copyActive = true"><i class="far fa-copy"></i>&ensp;Copy</button>
            <button class="btn border-0 mx-1 file-exchange-tab" @click="moveActive = true"><i class="fas fa-arrows-alt"></i>&ensp;Move</button>
            <button class="btn border-0 mx-1 file-exchange-tab" @click="deleteType()"><i class="far fa-trash-alt"></i>&ensp;Delete</button>
            <div class="ml-auto self-center text-gray-500 pr-4"><span @click="fetchTypeInfo([])" style="cursor: pointer"><i class="fas fa-sync-alt"></i></span></div>
          </div>
          <div class="flex">
            <div class="intro-y box mt-2 first-block">
              <div class="text-center my-3 px-2">
                <button class="btn btn-primary w-full" @click="createFolderActive = true" v-if="!createFolderActive">
                  <i class="far fa-plus-square"></i>&ensp;Create Folder
                </button>
              </div>
              <input
                class="form-control bg-gray-200 border-0 mx-3 create-folder-input"
                type="text"
                v-model="createFolderName"
                :placeholder="$t('modules.Type name')"
                v-if="createFolderActive"
              />
              <div class="text-center my-3 px-2 flex" v-if="createFolderActive">
                <button class="btn bg-gray-500 text-white w-1/2 mx-1" @click="cancelFolderCreation()">Cancel</button>
                <button class="btn btn-primary mx-1 w-1/2" @click="createFolder">Create</button>
              </div>
              <div class="my-3 px-4 flex" v-for="(file, index) in rootFiles" v-bind:key="index"
                :class="selectedFile === file ? 'bg-gray-200' : ''"
                @click="!file.isDir ? selectedFile = file : selectedFile = {}, reset(0)"
                :style="!file.isDir ? 'cursor: pointer' : ''"
              >
                <i class="fas fa-folder pt-1 folder-icon" v-if="file.isDir"></i>
                <i class="fas fa-file pt-1 file-icon" v-if="!file.isDir"></i>
                &ensp;{{ file.name }}
                <div class="ml-auto"><span v-if="file.isDir" @click="fetchTypeInfo([file.name]), folderName = file.name, subFolderName = ''" style="cursor: pointer"><i class="fas fa-chevron-right"></i></span></div>
              </div>
            </div>
            <div class="intro-y box mt-2 second-block ml-4 grid grid-cols-12">
              <div class="col-span-6">
                <div class="my-3 px-4 flex pr-5" v-for="(file, index) in folderFiles" v-bind:key="index"
                  :class="selectedFile === file ? 'bg-gray-200' : ''"
                  @click="!file.isDir ? selectedFile = file : '', reset(1)"
                >
                  <div  :style="!file.isDir ? 'cursor: pointer' : ''">
                    <i class="fas fa-folder pt-1 folder-icon" v-if="file.isDir"></i>
                    <i class="fas fa-file pt-1 file-icon" v-if="!file.isDir"></i>
                    &ensp;{{ file.name }}
                  </div>
                  <div class="ml-auto"><span v-if="file.isDir" @click="fetchTypeInfo([folderName, file.name])" style="cursor: pointer"><i class="fas fa-chevron-right"></i></span></div>
                </div>
              </div>
              <div class="col-span-6">
                <div class="my-3 px-4 flex" v-for="(file, index) in subFolderFiles" v-bind:key="index" :class="selectedFile === file ? 'bg-gray-200' : ''" @click="!file.isDir ? selectedFile = file : ''">
                  <div  :style="!file.isDir ? 'cursor: pointer' : ''">
                    <i class="fas fa-folder pt-1 folder-icon" v-if="file.isDir"></i>
                    <i class="fas fa-file pt-1 file-icon" v-if="!file.isDir"></i>
                    &ensp;{{ file.name }}
                  </div>
                  <div class="ml-auto"><span v-if="file.isDir" @click="fetchTypeInfo([folderName,file.name])" style="cursor: pointer"><i class="fas fa-chevron-right"></i></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileExchangeService from '@/services/FileExchangeService'
import { useToast } from 'vue-toastification'

export default {
  name: 'FileExchangeModules',
  setup() {
    const toast = useToast()
    return {
      toast
    }
  },
  data() {
    return {
      entityName: 'RMC',
      typeName: 'test',
      activeTab: 'Open Folder',
      typeExists: false,
      createFolderActive: false,
      copyActive: false,
      moveActive: false,
      createFolderName: '',
      rootFiles: [],
      folderFiles: [],
      subFolderFiles: [],
      folderName: '',
      subFolderName: '',
      selectedFile: {},
      currentRelPath: [],
      toRelPath: [],
      copyName: ''
    }
  },
  created() {
    console.log('test')
    FileExchangeService.existType().then(res => {
      console.log(res)
      if (res.data.data === true) {
        this.typeExists = true
        this.fetchTypeInfo([])
      }
    })
  },
  methods: {
    createFolder() {
      if (this.createFolderName !== '') {
        FileExchangeService.createFolder(this.createFolderName).then(
          (res) => {
            console.log(res)
          },
          (err) => {
            this.toast.error(err)
          }
        )
        this.fetchTypeInfo([])
        this.createFolderName = ''
        this.createFolderActive = false
      } else {
        this.toast.error('Folder name cannot be empty')
      }
    },
    cancelFolderCreation() {
      this.createFolderName = ''
      this.createFolderActive = false
    },
    fetchTypeInfo(relPath) {
      FileExchangeService.fetchTypeInfo(relPath).then(
        (res) => {
          const filesData = []
          res.data.data.files.forEach(file => {
            filesData.push({ name: file.name, isDir: file.isDir })
          })
          if (relPath.length === 0) {
            this.rootFiles = filesData
          } else if (relPath.length === 1) {
            this.folderFiles = filesData
            this.folderName = relPath[0]
          } else {
            this.subFolderFiles = filesData
            this.subFolderName = relPath[1]
          }
        },
        (err) => {
          this.toast.error(err)
        }
      )
    },
    createType() {
      FileExchangeService.createType().then(
        (res) => {
          console.log(res)
          this.typeExists = true
          this.fetchTypeInfo([])
        },
        (err) => {
          this.toast.error(err)
        }
      )
    },
    deleteType() {
      FileExchangeService.deleteType()
        .then(
          (res) => {
            this.toast.success('Type deleted, recreate it to be able to use the file-exchange module')
            this.typeExists = false
            this.rootFiles = []
          },
          (err) => {
            this.toast.error(err)
          }
        )
    },
    selectFile(file) {
      this.selectedFile = file
    },
    reset(number) {
      if (number === 0) {
        this.folderName = ''
        this.subFolderName = ''
        this.folderFiles = []
        this.subFolderFiles = []
      } else if (number === 1) {
        this.subFolderName = ''
        this.subFolderFiles = []
      }
    },
    copyFile(newName) {
      let fromRelPath = []
      if (this.subFolderName !== '') {
        fromRelPath = [this.folderName, this.subFolderName]
      } else if (this.folderName !== '') {
        fromRelPath = [this.folderName]
      } else {
        fromRelPath = []
      }
      FileExchangeService.copyFile(this.selectedFile.name, newName, fromRelPath, this.toRelPath)
        .then(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
    },
    moveFile() {
      let fromRelPath = []
      if (this.subFolderName !== '') {
        fromRelPath = [this.folderName, this.subFolderName]
      } else if (this.folderName !== '') {
        fromRelPath = [this.folderName]
      } else {
        fromRelPath = []
      }
      FileExchangeService.moveFile(this.selectedFile.name, fromRelPath, this.toRelPath)
    }
  },
  computed: {
    rootFolders() {
      return this.rootFiles.filter(file => file.isDir === true)
    }
  }
}
</script>

<style scoped>
.logo {
  width: 300px;
}

.configuration-card {
  width: 40%;
}

.question-icon {
  color: lightgray
}

.file-exchange-container {
  width: 90%
}

.file-exchange-tab {
  color: gray;
  height: 50px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 0 0;
  width:14%
}

.first-block {
  width: 35%;
}
.second-block {
  width: 65%;
}

.file-icon {
  color: lightgray
}

.folder-icon {
  color: lightblue
}

.create-folder-input {
  width: 90%
}
</style>
