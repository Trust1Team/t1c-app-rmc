<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-9">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">General Report</h2>
            <a
                href=""
                class="ml-auto flex items-center text-theme-1 dark:text-theme-10"
            >
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> Reload Data
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <ShoppingCartIcon class="report-box__icon text-theme-10" />
                    <div class="ml-auto">
                      <Tippy
                          tag="div"
                          class="report-box__indicator bg-theme-9 cursor-pointer"
                          content="33% Higher than last month"
                      >
                        33% <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">4.710</div>
                  <div class="text-base text-gray-600 mt-1">Item Sales</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <CreditCardIcon class="report-box__icon text-theme-11" />
                    <div class="ml-auto">
                      <Tippy
                          tag="div"
                          class="report-box__indicator bg-theme-6 cursor-pointer"
                          content="2% Lower than last month"
                      >
                        2% <ChevronDownIcon class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">3.721</div>
                  <div class="text-base text-gray-600 mt-1">New Orders</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <MonitorIcon class="report-box__icon text-theme-12" />
                    <div class="ml-auto">
                      <Tippy
                          tag="div"
                          class="report-box__indicator bg-theme-9 cursor-pointer"
                          content="12% Higher than last month"
                      >
                        12% <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">2.149</div>
                  <div class="text-base text-gray-600 mt-1">Total Products</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <UserIcon class="report-box__icon text-theme-9" />
                    <div class="ml-auto">
                      <Tippy
                          tag="div"
                          class="report-box__indicator bg-theme-9 cursor-pointer"
                          content="22% Higher than last month"
                      >
                        22% <ChevronUpIcon class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">152.040</div>
                  <div class="text-base text-gray-600 mt-1">Unique Visitor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: General Report -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, provide } from 'vue'

export default defineComponent({
  components: {
  },
  setup() {
    const salesReportFilter = ref()
    const importantNotesRef = ref()

    provide('bind[importantNotesRef]', el => {
      importantNotesRef.value = el
    })

    const prevImportantNotes = () => {
      const el = importantNotesRef.value
      el.tns.goTo('prev')
    }
    const nextImportantNotes = () => {
      const el = importantNotesRef.value
      el.tns.goTo('next')
    }

    return {
      salesReportFilter,
      prevImportantNotes,
      nextImportantNotes
    }
  }
})
</script>
