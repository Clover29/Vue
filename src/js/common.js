import moment from "moment";

 /**
     * Hàm format giá trị ngày tháng thành dạng DD/MM/YYYY
     * @param value: giá trị date cần format
     * AUTHOR: YENVTH
     * CreatedDate: 08/08/2022
     */
export function formatDate(value,format){
    if (value) {
      return moment(String(value)).format(format);
    }
  }
