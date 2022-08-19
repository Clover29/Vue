<template>
  <div class="content__tittle">
    <div class="tittle1">Nhân Viên</div>
    <button class="btn" @click="btnOnClick">Thêm mới nhân viên</button>
  </div>

  <div class="content__toolbar">
    <div class="toolbar__right">
      <div class="content__input">
        <input
          type="text"
          placeholder="Tìm theo mã, tên nhân viên"
          class="input input__search"
          @input="searchEmployee($event)"
        />
        <div class="icon icon-16 icon__search"></div>
      </div>
      <div class="icon icon-24 icon__refresh tooltip" @click="loadData">
        <span class="tooltip__text">Lấy lại dữ liệu</span>
      </div>
    </div>
    <div class="table-container scroller">
      <div class="table">
        <div class="table-row table__sticky">
          <div class="table-cell table-col-1 table-head">
            <label class="container">
              <input type="checkbox"/>
              <span
                class="checkmark checkbox__checked checkbox__checked--table" 
              ></span>
            </label>
          </div>
          <div class="table-cell table-col-2 table-head">MÃ NHÂN VIÊN</div>
          <div class="table-cell table-col-3 table-head">TÊN NHÂN VIÊN</div>
          <div class="table-cell table-col-4 table-head">GIỚI TÍNH</div>
          <div class="table-cell table-col-5 table-head">NGÀY SINH</div>
          <div class="table-cell table-col-6 table-head">SỐ CMND</div>
          <div class="table-cell table-col-7 table-head">CHỨC DANH</div>
          <div class="table-cell table-col-8 table-head">TÊN ĐƠN VỊ</div>
          <div class="table-cell table-col-9 table-head">SỐ TÀI KHOẢN</div>
          <div class="table-cell table-col-10 table-head">TÊN NGÂN HÀNG</div>
          <div class="table-cell table-col-11 table-head">CHI NHÁNH</div>
          <div class="table-cell table-col-12 table-head">CHỨC NĂNG</div>
        </div>
        <div
          class="table-row"
          v-for="item in empList"
          :key="item.EmployeeId"
          @dblclick="rowOnDbClick(item)"
        >
          <div class="table-cell table-col-1">
            <label class="container">
              <input type="checkbox"/>
              <span
                class="checkmark checkbox__checked checkbox__checked--table"
              ></span>
            </label>
          </div>
          <div class="table-cell table-col-2">{{ item.employeeCode }}</div>
          <div class="table-cell table-col-3">{{ item.employeeName }}</div>
          <div class="table-cell table-col-4">
            {{ formatGender(item.gender)}}
          </div>
          <div class="table-cell table-col-5">
            {{ formatDate(item.dateOfBirth, "DD/MM/YYYY") }}
          </div>
          <div class="table-cell table-col-6">{{ item.identityNumber }}</div>
          <div class="table-cell table-col-7">{{ item.positionName }}</div>
          <div class="table-cell table-col-8">{{ item.departmentName }}</div>
          <div class="table-cell table-col-9">{{ item.bankAccount }}</div>
          <div class="table-cell table-col-10">{{ item.bankName }}</div>
          <div class="table-cell table-col-11">{{ item.bankBranch }}</div>
          <div class="table-cell table-col-12">
            <div class="col-14-cell">
              <div class="cell-change" @click="rowOnDbClick(item)">Sửa</div>
              <div
                class="icon icon-16 icon__dropdown--blue"
                @click="btnOnClickDropDown($event, item)"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="combobox__option"
          v-show="isShowDialog"
          :style="{ top: top + 'px', left: left + 'px' }"
        >
          <div class="combobox__option--row">Nhân bản</div>
          <div class="combobox__option--row" @click="btnDeleteOnClick">Xóa</div>
          <div class="combobox__option--row">Ngưng sử dụng</div>
        </div>
      </div>
      <LoadData v-show="loading" />
    </div>
    <div class="table__paging">
      <div class="table__paging--left">
        Tổng số: <b>{{ totalPageRecord }}</b> bản ghi
      </div>
      <div class="table_paging--right">
        <div class="combobox_container">
          <div class="combobox">
            <input
              id="txtPage"
              readonly
              type="text"
              :value="inputOption"
              class="combo-input"
            />
            <div
              class="icon icon-16 icon__dropdown"
              @click="showDropDown"
            ></div>
            <div class="combobox__option paging__position" v-show="isPaging">
              <div
                v-for="item in pageOption"
                :key="item.id"
                class="combobox__option--row"
                :class="{ row__selected: pageOptionId == item.id }"
                @click="onClickOption(item)"
              >
                {{ item.size }} bản ghi trên 1 trang
              </div>
            </div>
          </div>
        </div>

        <div class="page">
          <div class="page__before">Trước:</div>
          <div class="page-index">
            <div
              class="page-index-1"
              v-for="n in totalPage"
              :key="n"
              :class="{ page__selected: currentPage == n }"
              @click="loadData(currentPageRecord, n, '')"
            >
              {{ n }}
            </div>
          </div>
          <div class="page__after">Sau</div>
        </div>
      </div>
    </div>
  </div>

  <EmployeeDetail
    v-if="isShow"
    :showDialogFunction="showDialog"
    :employeeDetail="employeeSelected"
    :loadData="loadData"
    :isUpdate="isUpdate"
    :employeeId="employeeId"
    :currentPage="currentPage"
    :currentPageRecord="currentPageRecord"
  />
  <PopUp
    v-show="showPopUp"
    :showPopUp="show"
    :errorMsg="errorMsg"
    :popUpType="popUpType"
    @delete="deleteEmployeeById"
  />
</template>
<script>
import axios from "axios";
import { formatDate } from "../../js/common.js";
import EmployeeDetail from "./EmployeeDetail.vue";
import LoadData from "./LoadData.vue";
import PopUp from "./PopUp.vue";
export default {
  name: "EmployeeList",
  components: { EmployeeDetail, LoadData, PopUp },
  data() {
    return {
      showPopUp: false, //hiển thị pop-up
      popUpType: "", //kiểm tra loại pop up cần hiển thị
      errorMsg: [], //hiển thị thông báo pop-up
      isShow: false, //kiểm tra trạng thái ẩn hiện của form
      empList: [], // danh sách nhân viên
      employeeSelected: {}, // object nhân viên được chọn
      loading: false, //kiểm tra trạng thái ẩn hiện của loading
      employeeCode: "", //mã nhân viên
      employeeId: "", //id nhân viên
      isDelete: false, // check xem người dùng có muốn xóa hay không
      isUpdate: false, //kiểm tra xem người dùng muốn sửa hay xóa
      top: 0, // giá trị top của combobox crud
      left: 0, //giá trị left của combobox crud
      isShowDialog: false, // Hiển thị combobox crud
      isPaging: false, //hiển thị combobox paging
      paging: [], //Mảng lưu danh sách trang
      inputOption: "10 bản ghi trên 1 trang", // text hiển thị lựa chọn số bản ghi
      pageOptionId: 0, // lấy giá trị id của pageOption
      pageOption: [
        { id: 0, size: 10 },
        { id: 1, size: 20 },
        { id: 2, size: 30 },
        { id: 3, size: 50 },
        { id: 4, size: 100 },
      ], // danh sách các lựa chọn để hiển thị số lượng bản ghi
      totalPageRecord: 0, // tổng sổ bản ghi
      totalPage: 0, // tổng số trang
      currentPage: 1, // trang hiện tại
      currentPageRecord: 10, // số bản ghi hiện tại trong 1 trang
    };
  },
  methods: {
    formatDate, // khởi tạo hàm formatDate từ common.js
    /**
     * Hàm format lại giới tính của nhân viên
     * @param data: thông tin giới tính của 1 nhân viên
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    formatGender(data) {
      try {
        switch (data) {
          case 1:
            return"Nam";
          case 2:
            return "Nữ";
          case 3:
           return "Khác";
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm thực hiện mở form
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    btnOnClick() {
      try {
        this.isShow = true;
        this.employeeSelected = {};
        this.isUpdate = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm thực hiện đổ dự liệu vào from
     * @param emp : object employee
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    rowOnDbClick(emp) {
      try {
        if (emp) {
          this.isShow = true;
          this.employeeSelected = emp;
          this.employeeId = emp.employeeID;
          this.isUpdate = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm set và truyền giá trị cho component con để set ẩn hiện cho form
     * @param isShow : giá trị dùng để thể hiện trạng thái ẩn hiện của form
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    showDialog(isShow) {
      try {
        this.isShow = isShow;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm load giá trị từ Api
     * @param pageSize: số lượng bản ghi muốn lấy
     * @param pageNumber: trang muốn xem
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    async loadData(pageSize, pageNumber, employeeFillter) {
      try {
        this.loading = true;
        await axios
          .get(
            `https://localhost:7214/api/v1/Employees?keyword=${employeeFillter}&pageSize=${pageSize}&pageNumber=${pageNumber}`
          )
          .then((response) => {
            if (response) {
              this.empList = response.data.data;
              this.totalPage = response.data.totalPage;
              this.totalPageRecord = response.data.totalRecord;
              this.currentPage = response.data.currentPage;
              this.loading = false;
            }
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    },
    getPaging(){

    },
    /**
     * Hàm hiển thị combobox CRUD
     * @param event: lấy ra thẻ div có sự kiện click
     * @param data: lấy ra thông tin của nhân viên muốn xóa
     * AUTHOR: YENVTH
     * CreatedDate: 10/08/2022
     */
    btnOnClickDropDown(event, data) {
      try {
        if (event) {
          this.top = event.target.getBoundingClientRect().top + 30;
          this.left = event.target.getBoundingClientRect().left - 105;
          this.employeeCode = data.employeeCode;
          this.employeeId= data.employeeID;
          this.isShowDialog = !this.isShowDialog;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm hiển thị combobox paging
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
    showDropDown() {
      try {
        this.isPaging = !this.isPaging;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *Hàm fill giá trị số bản ghi muốn hiển thị trên 1 trang vào thẻ input của combobox
     * AUTHOR: YENVTH
     * @param data : object được chọn trong list các option về số bản ghi hiển thị
     * CreatedDate: 08/08/2022
     */
    onClickOption(data) {
      try {
        this.pageOptionId = data.id;
        this.inputOption = data.size + " bản ghi trên 1 trang";
        this.currentPageRecord = data.size;
        this.isPaging = false;
        if (this.currentPageRecord != 10) {
          this.loadData(this.currentPageRecord, this.currentPage, "");
        } else {
          this.loadData(10, this.currentPage, "");
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
     *Hàm thực hiện xóa bản ghi
     * AUTHOR: YENVTH
     * CreatedDate: 13/08/2022
     */
    btnDeleteOnClick() {
      try {
        this.errorMsg = [];
        this.popUpType = "delete";
        this.errorMsg.push(
          "Bạn có thực sự muốn xóa nhân viên <" + this.employeeCode + "> không?"
        );
        this.isShowDialog = false;
        this.showPopUp = true;
        this.deleteEmployeeById();
        
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *Hàm họi api xóa nhân viên theo id
     * AUTHOR: YENVTH
     * CreatedDate: 13/08/2022
     */
    deleteEmployeeById(isdelete) {
      try {
        this.isDelete = isdelete;
        if (this.isDelete) {
          this.showPopUp = false;
          axios
            .delete(
              `https://localhost:7214/api/v1/Employees/${this.employeeId}`
            )
            .then((response) => {
              if (response.data == this.employeeId) {
                this.loadData(this.currentPageRecord, this.currentPage, "");
              }
            })
            .catch(function (error) {
              console.log(error.response);
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
    searchEmployee(event) {
      this.loadData(
        this.currentPageRecord,
        this.currentPage,
        event.target.value
      );
    },
  },
  created() {
    // lấy ra danh sách nhân viên
    this.loadData(10, 1, "");
  },
};
</script>