<template>
    <div class="navbar">
            <div class="navbar__head">
                <div class="navbar__sibar icon icon-24 icon__menu"></div>
                <img src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg" alt="logo">
            </div>
            <div class="navbar__menu scroller">
                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__pie-chart"></div>
                    <div class="menu__text">Tổng quan</div>
                </div>

                <router-link to="/employee" class="navbar__menu--item router-link item__seleccted">
                    <div class="icon icon-24 icon__pocket"></div>
                    <div class="menu__text">Tiền mặt</div>
                </router-link>

                <router-link to="/customer"  class="navbar__menu--item router-link">
                    <div class="icon icon-24 icon__bank"></div>
                    <div class="menu__text">Tiền gửi</div>
                    </router-link>
            

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__bag"></div>
                    <div class="menu__text">Mua hàng</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__cart"></div>
                    <div class="menu__text">Bán hàng</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__bill"></div>
                    <div class="menu__text">Quản lý hóa đơn</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__stock"></div>
                    <div class="menu__text">Kho</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__tool"></div>
                    <div class="menu__text">Công cụ dụng cụ</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__car"></div>
                    <div class="menu__text">Tài sản cố định</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__salary"></div>
                    <div class="menu__text">Tiền lương</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__tax"></div>
                    <div class="menu__text">Thuế</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__sale"></div>
                    <div class="menu__text">Giá thành</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__total"></div>
                    <div class="menu__text">Tổng hợp</div>
                </div>

                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__money"></div>
                    <div class="menu__text">Ngân sách</div>
                </div>
                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__column-chart"></div>
                    <div class="menu__text">Báo cáo</div>
                </div>
                <div class="navbar__menu--item">
                    <div class="icon icon-24 icon__line-chart"></div>
                    <div class="menu__text">Phân tích tài chính</div>
                </div>
            </div>
        </div>
</template>
<style scoped>
@import url(../../css/layout/navbar.css);
</style>