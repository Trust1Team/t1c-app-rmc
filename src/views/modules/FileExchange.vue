<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-12 flex justify-end m-4"><img src="@/assets/images/t1c-logo-full.png" alt="" class="logo" /></div>
    <div class="col-span-12 text-center font-medium text-3xl text-gray-500 my-2 px-2">{{ $t("modules.File-exchange Module") }}</div>
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
      <div class="col-span-12 flex mt-5 grid grid-cols-12" v-if="copyActive">
        <div class="col-span-12 grid grid-cols-12 pl-20">
          <span class="col-span-4 pt-2"><b>Enter the desired name of the copied file:</b>&ensp;</span>
          <input
            class="form-control border-0 mx-3 col-span-3"
            type="text"
            v-model="copyName"
            placeholder="New file name"
          />
        </div>
        <div class="col-span-12 grid grid-cols-12 mt-3 pl-20">
          <span class="col-span-4 pt-2"><b>Choose the folder to copy file into:</b> &ensp;</span>
          <select class="form-control col-span-3 mx-3" @change="(e) => {toRelPath = [e.target.value], fetchTypeInfo(toRelPath)}">
            <option value="">Root</option>
            <option v-for="(folder, index) in rootFolders" v-bind:key="index" :value="folder.name">{{ folder.name }}</option>
          </select>
          <div class="col-span-4 flex grid grid-cols-12 ml-10" v-if="toRelPath.length > 0">
            <span class="col-span-4 pt-2"><b>Subfolder: &ensp;</b></span>
            <select class="form-control col-span-7" @change="(e) => toRelPath[1] = e.target.value">
              <option value="" selected>None</option>
              <option v-for="(folder, index) in subFolders" v-bind:key="index" :value="folder.name">{{ folder.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-span-12 flex justify-center mt-5">
          <button class="btn bg-gray-500 text-white mx-1" @click="reset(2)">Cancel</button>
          <button class="btn btn-primary" @click="copyFile(copyName), reset(2)">Copy</button>
        </div>
      </div>
      <div class="col-span-12 mt-5 grid grid-cols-12" v-if="moveActive">
        <div class="flex col-span-7 grid grid-cols-12 pl-20">
          <span class="col-span-4 pt-2"><b>Folder to move file into: &ensp;</b></span>
          <select class="form-control col-span-4" @change="(e) => {toRelPath = [e.target.value], fetchTypeInfo(toRelPath)}">
            <option value="">Root</option>
            <option v-for="(folder, index) in rootFolders" v-bind:key="index" :value="folder.name">{{ folder.name }}</option>
          </select>
        </div>
        <div class="col-span-5 flex grid grid-cols-12" v-if="toRelPath.length > 0">
          <span class="col-span-4 pt-2"><b>Subfolder: &ensp;</b></span>
          <select class="form-control col-span-7" @change="(e) => toRelPath[1] = e.target.value">
            <option value="" selected>None</option>
            <option v-for="(folder, index) in subFolders" v-bind:key="index" :value="folder.name">{{ folder.name }}</option>
          </select>
        </div>
        <div class="col-span-12 flex justify-center mt-5">
          <button class="btn bg-gray-500 text-white mx-1" @click="reset(2)">Cancel</button>
          <button class="btn btn-primary" @click="moveFile(), reset(2)">Move</button>
        </div>
      </div>

      <div class="col-span-12 flex justify-center mt-10">
        <div class="intro-y box file-exchange-container bg-gray-300 p-2">
          <div class="flex bg-white rounded pl-2 pt-2">
            <button class="btn border-0 mx-1 file-exchange-tab" :class="activeTab === 'Open Folder' ? 'bg-gray-300' : ''"><i class="fas fa-folder-open"></i>&ensp; Open folder</button>
            <button class="btn border-0 mx-1 file-exchange-tab" disabled><i class="fas fa-upload"></i>&ensp;Upload</button>
            <button class="btn border-0 mx-1 file-exchange-tab" disabled><i class="fas fa-download"></i>&ensp;Download</button>
            <button class="btn border-0 mx-1 file-exchange-tab" @click="reset(2), copyActive = true" :disabled="Object.keys(this.selectedFile).length == 0"><i class="far fa-copy"></i>&ensp;Copy</button>
            <button class="btn border-0 mx-1 file-exchange-tab" @click="reset(2), moveActive = true" :disabled="Object.keys(this.selectedFile).length == 0"><i class="fas fa-arrows-alt"></i>&ensp;Move</button>
            <button class="btn border-0 mx-1 file-exchange-tab" @click="deleteType()"><i class="far fa-trash-alt"></i>&ensp;Delete Type</button>
            <div class="ml-auto self-center text-gray-500 pr-4"><span @click="refreshData()" style="cursor: pointer"><i class="fas fa-sync-alt"></i></span></div>
          </div>

          <div class="flex">
            <div class="intro-y box mt-2 first-block">
              <div class="text-center my-3 px-2">
                <button class="btn btn-primary w-full" @click="reset(2), createFolderActive = true" v-if="!createFolderActive">
                  <i class="far fa-plus-square"></i>&ensp;Create Folder
                </button>
              </div>
              <div v-if="createFolderActive">
                <input
                  class="form-control bg-gray-200 border-0 mx-3 create-folder-input mb-3"
                  type="text"
                  v-model="createFolderName"
                  :placeholder="$t('modules.Type name')"
                />
                <span class="col-span-4 px-5"><b>Folder to create into: &ensp;</b></span>
                <select class="form-control bg-gray-200 border-0 mx-3 create-folder-input" @change="(e) => {toRelPath = [e.target.value], fetchTypeInfo(toRelPath)}">
                  <option value="" selected>Root</option>
                  <option v-for="(folder, index) in rootFolders" v-bind:key="index" :value="folder.name">{{ folder.name }}</option>
                </select>
                <div class="text-center my-3 px-2 flex">
                  <button class="btn bg-gray-500 text-white w-1/2 mx-1" @click="reset(2)">Cancel</button>
                  <button class="btn btn-primary mx-1 w-1/2" @click="createFolder(), reset(2)">Create</button>
                </div>
              </div>
              <div class="my-3 px-4 flex" v-for="(file, index) in rootFiles" v-bind:key="index"
                :class="selectedFile === file ? 'bg-gray-200' : ''"
                @click="!file.isDir ? (selectedFile = file, reset(0)) : selectedFile = {}"
                :style="!file.isDir ? 'cursor: pointer' : ''"
              >
                <i class="fas fa-folder pt-1 folder-icon" v-if="file.isDir"></i>
                <i class="fas fa-file pt-1 file-icon" v-if="!file.isDir"></i>
                &ensp;{{ file.name }}
                <div class="ml-auto"><span v-if="file.isDir" @click="fetchTypeInfo([file.name]), folderName = file.name, subFolderName = ''" style="cursor: pointer"><i class="fas fa-chevron-right"></i></span></div>
              </div>
            </div>

            <div class="intro-y box mt-2 second-block ml-4">
              <div class="border-b border-gray-300 flex current-path items-center px-5 h-14">{{ folderName }} &ensp;&ensp;<span v-if="subFolderName !== ''"><i class="fas fa-chevron-right"></i></span>&ensp;&ensp;{{ subFolderName }} </div>
              <div class="grid grid-cols-12">
                <div class="col-span-6 border-r border-gray-300">
                  <div class="p-3 text-center" v-if="folderName !== '' && folderFiles.length === 0">No files in this directory</div>
                  <div class="my-3 px-4 flex pr-5" v-for="(file, index) in folderFiles" v-bind:key="index"
                    :class="selectedFile === file ? 'bg-gray-200' : ''"
                    @click="!file.isDir ? (selectedFile = file, reset(1)) : selectedFile = {}"
                  >
                    <div  :style="!file.isDir ? 'cursor: pointer' : ''">
                      <i class="fas fa-folder pt-1 folder-icon" v-if="file.isDir"></i>
                      <i class="fas fa-file pt-1 file-icon" v-if="!file.isDir"></i>
                      &ensp;{{ file.name }}
                    </div>
                    <div class="ml-auto"><span v-if="file.isDir" @click="fetchTypeInfo([folderName, file.name]), selectedFile = {}" style="cursor: pointer"><i class="fas fa-chevron-right"></i></span></div>
                  </div>
                </div>
                <div class="col-span-6">
                  <div class="p-3 text-center" v-if="subFolderName !== '' && subFolderFiles.length === 0">No files in this directory</div>
                  <div class="my-3 px-4 flex" v-for="(file, index) in subFolderFiles" v-bind:key="index" :class="selectedFile === file ? 'bg-gray-200' : ''" @click="!file.isDir ? selectedFile = file : ''">
                    <div  :style="!file.isDir ? 'cursor: pointer' : ''">
                      <i class="fas fa-folder pt-1 folder-icon" v-if="file.isDir"></i>
                      <i class="fas fa-file pt-1 file-icon" v-if="!file.isDir"></i>
                      &ensp;{{ file.name }}
                    </div>
                    <div class="ml-auto"><span v-if="file.isDir" @click="fetchTypeInfo([folderName,file.name]), subFolderName = file.name, selectedFile = {}" style="cursor: pointer"><i class="fas fa-chevron-right"></i></span></div>
                  </div>
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
      toRelPath: [],
      subFolders: [],
      copyName: ''
    }
  },
  created() {
    FileExchangeService.existType().then(res => {
      if (res.data.data === true) {
        this.typeExists = true
        this.fetchTypeInfo([])
      }
    })
  },
  methods: {
    createFolder() {
      if (this.createFolderName !== '') {
        this.toRelPath.push(this.createFolderName)
        FileExchangeService.createFolder(this.toRelPath).then(
          (res) => {
            this.toast.success('Folder successfully created')
          },
          (err) => {
            this.toast.error("Folder couldn't be created", err)
          }
        )
        this.fetchTypeInfo([])
        this.createFolderName = ''
        this.createFolderActive = false
      } else {
        this.toast.error('Folder name cannot be empty')
      }
    },
    fetchTypeInfo(relPath) {
      console.log(this.selectedFile)
      FileExchangeService.fetchTypeInfo(relPath).then(
        (res) => {
          const filesData = []
          res.data.data.files.forEach(file => {
            filesData.push({ name: file.name, isDir: file.isDir })
          })
          if (this.toRelPath.length === 1) {
            this.subFolders = filesData.filter(file => file.isDir === true)
          } else if (relPath.length === 0) {
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
          this.toast.error("Data couldn't be fetched", err)
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
    reset(value) {
      if (value === 0) {
        this.folderName = ''
        this.subFolderName = ''
        this.folderFiles = []
        this.subFolderFiles = []
      } else if (value === 1) {
        this.subFolderName = ''
        this.subFolderFiles = []
      } else if (value === 2) {
        this.copyActive = false
        this.moveActive = false
        this.createFolderActive = false
        this.createFolderName = ''
        this.toRelPath = []
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
            this.toast.success('File successfully copied')
            this.copyName = ''
            this.refreshData()
          },
          (err) => {
            this.toast.error("File couldn't be copied", err)
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
        .then(() => {
          this.toast.success('File successfully moved')
          this.refreshData()
        },
        (err) => {
          this.toast.error("File couldn't be moved", err)
        }
        )
    },
    refreshData() {
      this.fetchTypeInfo([])
      if (this.folderName !== '') {
        this.fetchTypeInfo([this.folderName])
      }
      if (this.subFolderName !== '') {
        this.fetchTypeInfo([this.folderName, this.subFolderName])
      }
    }
  },
  computed: {
    rootFolders() {
      return this.rootFiles.filter(file => file.isDir === true)
    }
  }
}
</script>
