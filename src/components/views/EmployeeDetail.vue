<template>
  <div class="dialog">
    <div class="dialog__content">
      <div class="dialog__header">
        <div class="dialog__header--left">
          <div class="tittle1">Thông tin nhân viên</div>
          <div class="checkbox__container">
            <label class="container"
              >Là khách hàng
              <input type="checkbox" />
              <span
                class="checkmark checkbox__checked checkbox__checked--form"
              ></span>
            </label>
          </div>
          <div class="checkbox__container">
            <label class="container"
              >Là nhà cung cấp
              <input type="checkbox" />
              <span
                class="checkmark checkbox__checked checkbox__checked--form"
              ></span>
            </label>
          </div>
        </div>
        <div class="dialog__header--rigt">
          <div class="icon icon-24 icon__help tooltip">
            <span class="tooltip__text">Giúp (F1)</span>
          </div>
          <div
            class="icon icon-24 icon__close tooltip"
            @click="btnCloseOnClick"
          >
            <span class="tooltip__text">Đóng (ESC)</span>
          </div>
        </div>
      </div>
      <div class="dialog__body">
        <div class="dialog__body--content">
          <div class="dialog__body--left">
            <div class="row">
              <div class="col col-w-40">
                <label class="tittle3"
                  >Mã
                  <span class="input--required">*</span>
                </label>
                <input
                  ref="EmployeeCode"
                  :value="employeeCode"
                  required
                  name-property="Mã"
                  type="text"
                  class="input"
                  tabindex="1"
                  :class="{ 'border-red': !employeeCode }"
                  @input="getValue($vent)"
                />
              </div>
              <div class="col col-w-60">
                <label class="tittle3"
                  >Tên <span class="input--required">*</span></label
                >
                <div class="tooltip">
                  <input
                    ref="FullName"
                    :value="employeeName"
                    name-property="Tên"
                    type="text"
                    class="input"
                    tabindex="2"
                    :class="{ 'border-red': !isErrorName }"
                    @input="getValue($event)"
                    tittle="none"
                  />
                  <span
                    v-show="!isErrorName"
                    class="tooltip__text tooltip__text--error"
                    >Tên không được để trống</span
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="tittle3"
                  >Đơn vị <span class="input--required">*</span></label
                >
                <div
                  @click="getValue($event)"
                  name-property="Đơn vị"
                  class="combobox tooltip"
                  :class="{ 'border-red': !isErrorDepartment }"
                >
                  <DepartmentList
                    ref="Department"
                    :DepartmentName="employeeDepartment"
                    :getValue="validateDepartment"
                    :isErrorDepartment="isErrorDepartment"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="tittle3">Chức danh</label>
                <input
                  ref="Position"
                  :value="employeeDetail.positionName"
                  type="text"
                  class="input"
                  tabindex="4"
                />
              </div>
            </div>
          </div>
          <div class="dialog__body--right">
            <div class="row">
              <div class="col col-w-40">
                <label class="tittle3">Ngày sinh</label>
                <input
                  ref="DateOfBirth"
                  :value="formatDate(employeeDetail.dateOfBirth, 'YYYY-MM-DD')"
                  type="date"
                  class="input"
                  tabindex="5"
                />
              </div>
              <div class="col col-w-60 col-gender">
                <label class="tittle3">Giới tính</label>
                <div class="gender">
                  <label class="container radio__container"
                    >Nam
                    <input
                      type="radio"
                      :value="1"
                      v-model="checked"
                      name="radioMale"
                      tabindex="6"
                    />
                    <span class="checkmark radio__checked"></span>
                  </label>
                  <label class="container radio__container"
                    >Nữ
                    <input
                      :value="2"
                      type="radio"
                      name="radio"
                      v-model="checked"
                    />
                    <span class="checkmark radio__checked"></span>
                  </label>
                  <label class="container radio__container"
                    >Khác
                    <input
                      :value="3"
                      type="radio"
                      name="radio"
                      v-model="checked"
                    />
                    <span class="checkmark radio__checked"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col col-w-60">
                <label class="tittle3">Số CMND</label>
                <input
                  ref="IdentityNumber"
                  :value="employeeDetail.identityNumber"
                  type="text"
                  class="input"
                  tabindex="7"
                />
              </div>
              <div class="col col-w-40">
                <label class="tittle3">Ngày Cấp</label>
                <input
                  ref="IdentityDate"
                  :value="
                    formatDate(employeeDetail.identityIssuedDate, 'YYYY-MM-DD')
                  "
                  type="date"
                  class="input"
                  tabindex="8"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="tittle3">Nơi Cấp</label>
                <input
                  ref="IdentityPlace"
                  :value="employeeDetail.identityIssuedPlace"
                  type="text"
                  class="input"
                  tabindex="9"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="tittle3">Địa chỉ</label>
            <input
              ref="Address"
              :value="employeeDetail.address"
              type="text"
              class="input"
              tabindex="10"
            />
          </div>
        </div>
        <div class="row">
          <div class="col col-w-25">
            <label class="tittle3">ĐT di động</label>
            <input
              ref="MobilePhone"
              :value="employeeDetail.mobilePhoneNumber"
              type="text"
              class="input"
              tabindex="11"
            />
          </div>
          <div class="col col-w-25">
            <label class="tittle3">ĐT cố định</label>
            <input
              :value="employeeDetail.landlinePhoneNumber"
              ref="LandlinePhone"
              type="text"
              class="input"
              tabindex="12"
            />
          </div>
          <div class="col col-w-25">
            <label class="tittle3">Email</label>
            <input
              ref="Email"
              :value="employeeDetail.email"
              type="text"
              class="input"
              tabindex="13"
            />
          </div>
        </div>
        <div class="row">
          <div class="col col-w-25">
            <label class="tittle3">Tài khoản ngân hàng</label>
            <input
              :value="employeeDetail.bankAccount"
              ref="bankAccount"
              type="text"
              class="input"
              tabindex="14"
            />
          </div>
          <div class="col col-w-25">
            <label class="tittle3">Tên ngân hàng</label>
            <input
              :value="employeeDetail.bankName"
              ref="bankName"
              type="text"
              class="input"
              tabindex="15"
            />
          </div>
          <div class="col col-w-25">
            <label class="tittle3">Chi nhánh</label>
            <input
              :value="employeeDetail.bankBranch"
              ref="bankBranch"
              type="text"
              class="input"
              tabindex="16"
            />
          </div>
        </div>
        <div class="dialog__footer">
          <button
            class="btn button-secondary"
            @click="btnCloseOnClick"
            tabindex="19"
          >
            Hủy
          </button>
          <div class="button__right">
            <button
              class="btn button-secondary"
              @click="btnSaveOnClick"
              tabindex="17"
            >
              Cất
            </button>
            <button
              class="btn button-primary"
              @click="btnSaveOnClick"
              tabindex="18"
            >
              Cất và Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopUp
    v-show="showPopUp"
    :showPopUp="show"
    :errorMsg="errorMsg"
    :popUpType="popUpType"
    @closeDialog="btnCloseOnClick"
    @saveData="btnSaveOnClick"
  />
</template>
<script>
import axios from "axios";
import { formatDate } from "../../js/common.js";
import DepartmentList from "./DeparmetList.vue";
import PopUp from "./PopUp.vue";

export default {
  name: "EmployeeDetail",
  components: { DepartmentList, PopUp },
  props: [
    "showDialogFunction",
    "employeeDetail",
    "loadData",
    "isUpdate",
    "employeeId",
    "currentPage",
    "currentPageRecord",
  ],
  data() {
    return {
      isShow: false, //kiểm tra trạng thái ẩn hiện của form
      employeeCode: "", // mã nhân viên
      isErrorCode: true, // kiểm tra giá trị của input mã nhân viên có trống hay không
      errorMsg: [], // list những giá trị bị lỗi
      isError: false, //xác định lỗi cho combobox đơn vị
      showPopUp: false, //hiển thị pop-up
      employeeName: "", // tên nhân viên
      isErrorName: true, // kiểm tra giá trị của input Tên có trống hay không
      employeeDepartment: "", // vị trí nhân viên
      isErrorDepartment: true, //kiểm tra giá trị của input đơn vị có trống hay không
      popUpType: "", //kiểm tra loại pop up cần hiển thị
      isExit: "", //kiểm tra xem có close dialog hay không
      employeeList: {
        createdDate: "2022-08-15T01:37:48.315Z",
        createdBy: "string",
        modifiedDate: "2022-08-15T01:37:48.315Z",
        modifiedBy: "string",
        employeeCode: "string",
        fullName: "string",
        gender: 0,
        dateOfBirth: "2022-08-15T01:37:48.315Z",
        phoneNumber: "string",
        email: "string",
        address: "string",
        identityNumber: "string",
        identityDate: "2022-08-15T01:37:48.315Z",
        identityPlace: "string",
        departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        positionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        positionCode: "string",
        positionName: "string",
        departmentCode: "string",
        departmentName: "string",
      }, //lưu thông tin của employee
      checked: 1, // giá trị của radio box, {1: nam, 2: nữ, 3: khác}
    };
  },
  methods: {
    formatDate, // khởi tạo hàm formatDate từ common.js
    /**
     * Hàm xử lý nút close để đóng form
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    btnCloseOnClick(msg) {
      try {
        this.errorMsg = [];
        this.popUpType = "Close";
        this.errorMsg.push("Dữ liệu đã bị thay đổi. Bạn có muốn cất không?");
        this.showPopUp = true;
        this.isExit = msg;

        if (this.isExit == "exit") {
          this.showDialogFunction(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lưu thông tin từ input
     * AUTHOR: YENVTH
     * CreatedDate: 14/08/2022
     */
    btnSaveOnClick() {
      try {
        this.validate();
        if (this.errorMsg.length != 0) {
          this.popUpType = "alert";
          this.showPopUp = true;
        } else {
          this.getEmployeeList();
          if (this.isUpdate) {
            axios
              .put(
                `https://localhost:7214/api/v1/Employees/${this.employeeId}`,
                this.employeeList
              )
              .then((response) => {
                if (response.data) {
                  this.loadData(this.currentPageRecord, this.currentPage, "");
                  this.showDialogFunction(false);
                }
              })
              .catch((response) => {
                console.log(response);
              });
          } else {
            axios
              .post(
                "https://localhost:7214/api/v1/Employees",
                this.employeeList
              )
              .then((response) => {
                if (response.data) {
                  this.loadData(this.currentPageRecord, this.currentPage, "");
                  this.showDialogFunction(false);
                }
              })
              .catch((response) => {
                console.log(response.response.data);
                if (response.response.data == "e003") {
                  this.errorMsg = [];
                  this.popUpType = "warning";
                  this.errorMsg.push("Mã nhân viên <" +this.employeeCode+"> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.");
                  this.showPopUp = true;
                }
                
              });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * lấy các thông tin của employee từ form
     * AUTHOR: YENVTH
     * CreatedDate: 15/08/2022
     */
    getEmployeeList() {
      try {
        this.employeeList = {
          employeeCode: this.$refs.EmployeeCode.value,
          employeeName: this.$refs.FullName.value,
          dateOfBirth: this.$refs.DateOfBirth.value,
          gender: this.checked,
          identityNumber: this.$refs.IdentityNumber.value,
          identityIssuedDate: this.$refs.IdentityDate.value,
          identityIssuedPlace: this.$refs.IdentityPlace.value,
          email: this.$refs.Email.value,
          address: this.$refs.Address.value,
          mobilePhoneNumber: this.$refs.MobilePhone.value,
          landlinePhoneNumber: this.$refs.LandlinePhone.value,
          positionName: this.$refs.Position.value,
          departmentID: this.$refs.Department.selectedId,
          departmentCode: this.$refs.Department.departmentCode,
          departmentName: this.$refs.Department.departmentName,
          bankAccount: this.$refs.bankAccount.value,
          bankName: this.$refs.bankName.value,
          bankBranch: this.$refs.bankBranch.value,
          createdDate: new Date(),
          createdBy: "admin",
          modifiedDate: new Date(),
          modifiedBy: "admin",
        };
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Validate dữ liệu
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    validate() {
      try {
        this.errorMsg = [];
        if (!this.isErrorCode || !this.employeeCode) {
          this.errorMsg.push("Mã không được để trống");
        }
        if (!this.isErrorName || !this.employeeName) {
          this.errorMsg.push("Tên không được để trống");
        }
        if (!this.isErrorDepartment || !this.departmentName) {
          this.errorMsg.push("Đơn vị không được để trống");
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * lấy dữ liệu nhập vào từ input
     * AUTHOR: YENVTH
     * @param event: lấy ra sự kiện được thực hiện
     * CreatedDate: 09/08/2022
     */
    getValue(event) {
      try {
        this.employeeCode = this.$refs.EmployeeCode.value;
        this.employeeName = this.$refs.FullName.value;
        if (
          event.target.getAttribute("name-property") == "Mã" &&
          !this.employeeCode
        ) {
          this.isErrorCode = false;
        } else {
          this.isErrorCode = true;
        }
        if (
          event.target.getAttribute("name-property") == "Tên" &&
          !this.employeeName
        ) {
          this.isErrorName = false;
        } else {
          this.isErrorName = true;
        }
        if (
          event.target.getAttribute("name-property") == "Đơn vị" &&
          !this.validateDepartment()
        ) {
          this.isErrorDepartment = false;
        } else {
          this.isErrorDepartment = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * lấy giá trị của department từ combobox
     * AUTHOR: YENVTH
     * CreatedDate: 09/08/2022
     */
    validateDepartment() {
      try {
        this.departmentName = this.$refs.Department.departmentName;
        if (!this.departmentName) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *Hàm dùng để ẩn hiển pop up
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    show(show) {
      try {
        this.showPopUp = show;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * load giá trị employeeCode
     * AUTHOR: YENVTH
     * CreatedDate: 09/08/2022
     */
    getEmployeeCode() {
      try {
        if (this.isUpdate) {
          this.employeeCode = this.employeeDetail.employeeCode;
        } else {
          axios
            .get("https://localhost:7214/api/v1/Employees/new-code")
            .then((response) => {
              if (response) {
                this.employeeCode = response.data;
              }
            })
            .catch((error) => console.log(error));
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getEmployeeCode();
    if (this.isUpdate) {
      this.employeeName = this.employeeDetail.employeeName;
      this.employeeDepartment = this.employeeDetail.departmentName;
      this.checked = this.employeeDetail.gender;
    }
  },
  mounted() {
    this.$refs.EmployeeCode.focus();
  },
};
</script>
