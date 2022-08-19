<template>
  <div class="dialog">
    <div class="dialog__content pop-up__container">
      <div class="pop-up__content">
        <div class="icon__message">
          <div
            class="icon icon-48"
            :class="{
              icon__warning: popUpType == 'warning' || popUpType == 'delete',
              icon__alert: popUpType == 'alert',
              icon__question: popUpType == 'Close',
            }"
          ></div>
        </div>
        
        <div class="pop-up__message">
          <div v-for="item in errorMsg" :key="item" class="pop-up__text">
            {{ item }}
          </div>
        </div>
      </div>

      <div
        v-if="popUpType == 'warning' || popUpType == 'alert'"
        class="pop-up__footer"
        :class="{ right: popUpType == 'warning', center: popUpType == 'alert' }"
      >
        <div class="btn button-primary" @click="btnCloseOnClick">Đóng</div>
      </div>

      <div v-if="popUpType == 'Close'" class="pop-up__footer space_between">
        <div class="btn button-secondary" @click="btnCloseOnClick">Hủy</div>
        <div class="button__right">
          <div class="btn button-secondary" @click="btnCloseDialogOnClick">
            Không
          </div>
          <div class="btn button-primary" @click="btnSaveOnClick">Có</div>
        </div>
      </div>

      <div v-if="popUpType == 'delete'" class="pop-up__footer space_between">
        <div class="btn button-secondary" @click="btnCloseOnClick">Hủy</div>
        <div class="btn button-primary" @click="btnDeleteOnClick">Có</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PopUp",
  props: ["showPopUp", "errorMsg", "popUpType"],
  methods: {
    /**
     * Hàm thực hiện đóng pop-up
     * AUTHOR: YENVTH
     * CreatedDate: 10/08/2022
     */
    btnCloseOnClick() {
      try {
        this.showPopUp(false);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm thực hiện đóng pop-up và đóng dialog nhân viên
     * AUTHOR: YENVTH
     * CreatedDate: 10/08/2022
     */
    btnCloseDialogOnClick() {
      this.showPopUp(false);
      this.$emit("closeDialog", "exit");
    },
    /**
     * Hàm gọi đến hàm btnSaveOnClick() ở component EmployeeDetail
     * AUTHOR: YENVTH
     * CreatedDate: 10/08/2022
     */
    btnSaveOnClick() {
      this.$emit("saveData");
    },
    /**
     * Hàm gọi đến hàm deleteEmployeeById() ở component EmployeeList
     * AUTHOR: YENVTH
     * CreatedDate: 10/08/2022
     */
    btnDeleteOnClick() {
      this.$emit("delete", true);
    },
  },
};
</script>
