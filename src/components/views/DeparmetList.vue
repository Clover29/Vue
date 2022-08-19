<template>
  
    <input
      @input="onEditDepartmentName"
      :value="departmentName"
      ref="inputDepartment"
      type="text"
      class="combo-input"
      tabindex="3"
    />
    <span v-show="!isErrorDepartment" class="tooltip__text tooltip__text--error"
      >Đơn vị không được để trống</span
    >
 
  <div
    class="icon icon-16 icon__dropdown"
    @click="btnDropDownOnClick"
    name-property="Đơn vị"
  ></div>
  <div class="combobox-menu scroller" v-show="isShow">
    <div class="table">
      <div class="table-row">
        <div class="cbx-table-cell table-col-7 table-head">Mã đơn vị</div>
        <div class="cbx-table-cell table-col-11 table-head">Tên đơn vị</div>
      </div>
      <div
        class="table-row"
        @click="onClickLoadData(item)"
        v-for="item in deptList"
        :key="item.DepartmentId"
        name-property="Đơn vị"
        :class="{ row__selected: item.departmentID == selectedId }"
      >
        <div class="cbx-table-cell table-col-7">{{ item.departmentCode }}</div>
        <div class="cbx-table-cell table-col-11">{{ item.departmentName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DeparmentList",
  props: ["DepartmentName", "getValue", "isErrorDepartment"],
  data() {
    return {
      isShow: false, // ẩn hiện dropdown list
      selectedId: "", // id của department được chọn
      deptList: [], // danh sách tất cả các phòng ban
      departmentName: this.DepartmentName, // tên phòng ban được chọn
      departmentCode: "", // mã phòng ban được chọn
    };
  },
  methods: {
    /**
     * load danh sách phòng ban
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    loadDepartment() {
      axios
        .get("https://localhost:7214/api/v1/Departments")
        .then((response) => {
          this.deptList = response.data;
        })
        .catch((error) => console.log(error));
    },
    /**
     * Hàm xử lý nút dropdown trong combobox để hiển thị các option
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    btnDropDownOnClick() {
      try {
        this.isShow = !this.isShow;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * xử lý sự kiện click vào từng dòng của dropdown list
     * @param data: thông tin phòng ban được click
     * AUTHOR: YENVTH
     * CreatedDate: 11/08/2022
     */
    onClickLoadData(data) {
      try {
        if (data) {
          this.departmentName = data.departmentName;
          this.isShow = false;
          this.departmentCode = data.departmentCode;
          this.selectedId = data.departmentID;
          this.getValue();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * xử lý sự kiện của thẻ input khi nhập tên phòng ban
     * AUTHOR: YENVTH
     * CreatedDate: 11/08/2022
     */
    onEditDepartmentName() {
      try {
        this.departmentName = this.$refs.inputDepartment.value;
        this.getValue();
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.loadDepartment();
  },
};
</script>