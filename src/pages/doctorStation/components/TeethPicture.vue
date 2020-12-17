<template>
  <div class="select">
    <el-tabs class="mini_eltabs" v-model="activeName" type="card" @tab-click='toggle_tab'>
      <el-tab-pane label="恒牙" name="adult">
        <div>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange('adult')">全选</el-checkbox>
        <el-checkbox v-model="CheckTop" @change="handleCheckTopChange('adult')">上颚</el-checkbox>
        <el-checkbox v-model="CheckBottom" @change="handleCheckBottomChange('adult')">下颚</el-checkbox>
        </div>
        <div class="adult">
          <div class="top">
            <div class="left_up block">
              <div class="img_item" v-for="(item, i) in pictures.adult.left_up" :key="i" @click="add_tooth(1, item.key)" :class="{ 'selected': selected_left_top.find(v => v === item.key) }">
                <img :src="item.url" alt="">
                <span class="name">{{item.key}}</span>
              </div>
            </div>

            <div class="line_vertical"></div>

            <div class="right_up block">
              <div class="img_item" v-for="(item, i) in pictures.adult.right_up" :key="i" @click="add_tooth(2, item.key)" :class="{ 'selected': selected_right_top.find(v => v === item.key) }">
                <img :src="item.url" alt="">
                <span class="name">{{item.key}}</span>
              </div>
            </div>
          </div>

          <p class="line_horizontal"></p>

          <div class="bottom">
            <div class="left_down block">
              <div class="img_item" v-for="(item, i) in pictures.adult.left_down" :key="i" @click="add_tooth(3, item.key)" :class="{ 'selected': selected_left_bottom.find(v => v === item.key) }">
                <img :src="item.url" alt="">
                <span class="name">{{item.key}}</span>
              </div>
            </div>

            <div class="line_vertical"></div>

            <div class="right_down block">
              <div class="img_item" v-for="(item, i) in pictures.adult.right_down" :key="i" @click="add_tooth(4, item.key)" :class="{ 'selected': selected_right_bottom.find(v => v === item.key) }">
                <img :src="item.url" alt="">
                <span class="name">{{item.key}}</span>
              </div>
            </div>
          </div>
        </div>
        
      </el-tab-pane>
      <el-tab-pane label="乳牙" name="child">
        <div>
        <el-checkbox v-model="childAll" @change="handleCheckAllChange('child')">全选</el-checkbox>
        <el-checkbox v-model="childTop" @change="handleCheckTopChange('child')">上颚</el-checkbox>
        <el-checkbox v-model="childBottom" @change="handleCheckBottomChange('child')">下颚</el-checkbox>
        </div>
        <div class="child">
          <div class="top">
            <div class="left_up block">
              <div class="img_item" v-for="(item, i) in pictures.child.left_up" :key="i" @click="add_tooth(1, item.key)" :class="{ 'selected': selected_left_top.find(v => v === item.key) }">
                <img :src="item.url" alt="">
                <span class="name">{{item.key}}</span>
              </div>
            </div>

            <div class="line_vertical"></div>

            <div class="right_up block">
              <div class="img_item" v-for="(item, i) in pictures.child.right_up" :key="i" @click="add_tooth(2, item.key)" :class="{ 'selected': selected_right_top.find(v => v === item.key) }">
                <img :src="item.url" alt="">
                <span class="name">{{item.key}}</span>
              </div>
            </div>
          </div>

          <p class="line_horizontal"></p>

          <div class="bottom">
            <div class="left_down block">
              <div class="img_item" v-for="(item, i) in pictures.child.left_down" :key="i" @click="add_tooth(3, item.key)" :class="{ 'selected': selected_left_bottom.find(v => v === item.key) }">
                <img :src="item.url" alt="">
                <span class="name">{{item.key}}</span>
              </div>
            </div>

            <div class="line_vertical"></div>

            <div class="right_down block">
              <div class="img_item" v-for="(item, i) in pictures.child.right_down" :key="i" @click="add_tooth(4, item.key)" :class="{ 'selected': selected_right_bottom.find(v => v === item.key) }">
                <img :src="item.url" alt="">
                <span class="name">{{item.key}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const roman_int = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
};
export default {
  data() {
    return {
      CheckTop: false, // 恒牙上颚
      CheckBottom: false, // 恒牙下颚
      checkAll: false, // 恒牙全选
      childTop: false, // 乳牙上颚
      childBottom: false, // 乳牙下颚
      childAll: false, // 乳牙全选
      activeName: 'adult',
      pictures: {
        adult: {
          left_up: [
            { key: 8, url: '/static/teeth-img/tooth-left-up-8.png' },
            { key: 7, url: '/static/teeth-img/tooth-left-up-7.png' },
            { key: 6, url: '/static/teeth-img/tooth-left-up-6.png' },
            { key: 5, url: '/static/teeth-img/tooth-left-up-5.png' },
            { key: 4, url: '/static/teeth-img/tooth-left-up-4.png' },
            { key: 3, url: '/static/teeth-img/tooth-left-up-3.png' },
            { key: 2, url: '/static/teeth-img/tooth-left-up-2.png' },
            { key: 1, url: '/static/teeth-img/tooth-left-up-1.png' },
          ],
          right_up: [
            { key: 1, url: '/static/teeth-img/tooth-right-up-1.png' },
            { key: 2, url: '/static/teeth-img/tooth-right-up-2.png' },
            { key: 3, url: '/static/teeth-img/tooth-right-up-3.png' },
            { key: 4, url: '/static/teeth-img/tooth-right-up-4.png' },
            { key: 5, url: '/static/teeth-img/tooth-right-up-5.png' },
            { key: 6, url: '/static/teeth-img/tooth-right-up-6.png' },
            { key: 7, url: '/static/teeth-img/tooth-right-up-7.png' },
            { key: 8, url: '/static/teeth-img/tooth-right-up-8.png' },
          ],
          left_down: [
            { key: 8, url: '/static/teeth-img/tooth-left-down-8.png' },
            { key: 7, url: '/static/teeth-img/tooth-left-down-7.png' },
            { key: 6, url: '/static/teeth-img/tooth-left-down-6.png' },
            { key: 5, url: '/static/teeth-img/tooth-left-down-5.png' },
            { key: 4, url: '/static/teeth-img/tooth-left-down-4.png' },
            { key: 3, url: '/static/teeth-img/tooth-left-down-3.png' },
            { key: 2, url: '/static/teeth-img/tooth-left-down-2.png' },
            { key: 1, url: '/static/teeth-img/tooth-left-down-1.png' },
          ],
          right_down: [
            { key: 1, url: '/static/teeth-img/tooth-right-down-1.png' },
            { key: 2, url: '/static/teeth-img/tooth-right-down-2.png' },
            { key: 3, url: '/static/teeth-img/tooth-right-down-3.png' },
            { key: 4, url: '/static/teeth-img/tooth-right-down-4.png' },
            { key: 5, url: '/static/teeth-img/tooth-right-down-5.png' },
            { key: 6, url: '/static/teeth-img/tooth-right-down-6.png' },
            { key: 7, url: '/static/teeth-img/tooth-right-down-7.png' },
            { key: 8, url: '/static/teeth-img/tooth-right-down-8.png' },
          ],
        },
        child: {
          left_up: [
            { key: 'V', url: '/static/teeth-img/tooth-left-up-5.png' },
            { key: 'IV', url: '/static/teeth-img/tooth-left-up-4.png' },
            { key: 'III', url: '/static/teeth-img/tooth-left-up-3.png' },
            { key: 'II', url: '/static/teeth-img/tooth-left-up-2.png' },
            { key: 'I', url: '/static/teeth-img/tooth-left-up-1.png' },
          ],
          right_up: [
            { key: 'I', url: '/static/teeth-img/tooth-right-up-1.png' },
            { key: 'II', url: '/static/teeth-img/tooth-right-up-2.png' },
            { key: 'III', url: '/static/teeth-img/tooth-right-up-3.png' },
            { key: 'IV', url: '/static/teeth-img/tooth-right-up-4.png' },
            { key: 'V', url: '/static/teeth-img/tooth-right-up-5.png' },
          ],
          left_down: [
            { key: 'V', url: '/static/teeth-img/tooth-left-down-5.png' },
            { key: 'IV', url: '/static/teeth-img/tooth-left-down-4.png' },
            { key: 'III', url: '/static/teeth-img/tooth-left-down-3.png' },
            { key: 'II', url: '/static/teeth-img/tooth-left-down-2.png' },
            { key: 'I', url: '/static/teeth-img/tooth-left-down-1.png' },
          ],
          right_down: [
            { key: 'I', url: '/static/teeth-img/tooth-right-down-1.png' },
            { key: 'II', url: '/static/teeth-img/tooth-right-down-2.png' },
            { key: 'III', url: '/static/teeth-img/tooth-right-down-3.png' },
            { key: 'IV', url: '/static/teeth-img/tooth-right-down-4.png' },
            { key: 'V', url: '/static/teeth-img/tooth-right-down-5.png' },
          ],
        },
      },
      selected_left_top: [],
      selected_right_top: [],
      selected_left_bottom: [],
      selected_right_bottom: [],
      ChildKey: ['I', 'II', 'III', 'IV', 'V'],
    };
  },
  methods: {
    // 清除已选的牙位 全部 ,上颚 ,下颚
    clearChoosed(type) {
      if (type === 'all') {
        this.selected_left_top = [];
        this.selected_right_top = [];
        this.selected_left_bottom = [];
        this.selected_right_bottom = [];
      } else if (type === 'top') {
        this.selected_left_top = [];
        this.selected_right_top = [];
      } else {
        this.selected_left_bottom = [];
        this.selected_right_bottom = [];
      }
    },
    // 选择牙位,全选, 上颚,下颚
    Choosed(type, i) {
      if (type === 'all') {
        this.add_to_arr_with_norepeat(this.selected_left_top, i, 1);
        this.add_to_arr_with_norepeat(this.selected_right_top, i, 2);
        this.add_to_arr_with_norepeat(this.selected_left_bottom, i, 3);
        this.add_to_arr_with_norepeat(this.selected_right_bottom, i, 4);
      } else if (type === 'top') {
        this.add_to_arr_with_norepeat(this.selected_left_top, i, 1);
        this.add_to_arr_with_norepeat(this.selected_right_top, i, 2);
      } else {
        this.add_to_arr_with_norepeat(this.selected_left_bottom, i, 3);
        this.add_to_arr_with_norepeat(this.selected_right_bottom, i, 4);
      }
    },
    toggle_tab() {
      this.checkAll = false;
      this.CheckTop = false;
      this.CheckBottom = false;
      this.childAll = false;
      this.childTop = false;
      this.childBottom = false;
      this.selected_left_top = [];
      this.selected_right_top = [];
      this.selected_left_bottom = [];
      this.selected_right_bottom = [];
    },
    // 选择牙位
    add_tooth(type, key) {
      switch (type) {
        case 1: this.add_to_arr_with_norepeat(this.selected_left_top, key, type); break;
        case 2: this.add_to_arr_with_norepeat(this.selected_right_top, key, type); break;
        case 3: this.add_to_arr_with_norepeat(this.selected_left_bottom, key, type); break;
        case 4: this.add_to_arr_with_norepeat(this.selected_right_bottom, key, type); break;
        default: break;
      }
      // 获取恒牙上颚的长度
      const adultTopArr = this.pictures.adult.left_up.concat(this.pictures.adult.right_up);
      // 恒牙下颚的长度
      const adultBottomArr = this.pictures.adult.left_down.concat(this.pictures.adult.right_down);
      // 乳牙上颚的长度
      const childTopArr = this.pictures.child.left_up.concat(this.pictures.child.right_up);
      // 乳牙下颚的长度
      const childBottomArr = this.pictures.child.left_down.concat(this.pictures.child.right_down);
      // 已选上颚牙位的长度
      const selectedTopArr = this.selected_left_top.concat(this.selected_right_top);
      // 已选下颚牙位的长度
      const selectedBottomArr = this.selected_left_bottom.concat(this.selected_right_bottom);
      if (adultTopArr.length === selectedTopArr.length && selectedTopArr.length <= adultTopArr.length) {
        this.CheckTop = true;
      } else {
        this.CheckTop = false;
      }
      if (adultBottomArr.length === selectedBottomArr.length && selectedBottomArr.length <= adultBottomArr.length) {
        this.CheckBottom = true;
      } else {
        this.CheckBottom = false;
      }
      if (childTopArr.length === selectedTopArr.length && selectedTopArr.length <= childTopArr.length) {
        this.childTop = true;
      } else {
        this.childTop = false;
      }
      if (childBottomArr.length === selectedBottomArr.length && selectedBottomArr.length <= childBottomArr.length) {
        this.childBottom = true;
      } else {
        this.childBottom = false;
      }
      if (this.CheckTop === true && this.CheckBottom === true) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      if (this.childTop === true && this.childBottom === true) {
        this.childAll = true;
      } else {
        this.childAll = false;
      }
    },
    // 全选
    handleCheckAllChange(type) {
      // if (this.childAll === true) {
      //   this.childAll = false;
      // }
      this.CheckTop = this.checkAll;
      this.CheckBottom = this.checkAll;
      this.childTop = this.childAll;
      this.childBottom = this.childAll;
      if (this.checkAll === false && this.childAll === false) {
        this.clearChoosed('all');
        return;
      }
      this.clearChoosed('all');
      if (type === 'adult') {
        for (let i = 1; i < 9; i++) {
          this.Choosed('all', i);
        }
      }
      if (type === 'child') {
        this.childTop = this.childAll;
        this.childBottom = this.childAll;
        this.ChildKey.forEach((i) => {
          this.Choosed('all', i);
        });
      }
    },
    // 牙位 上颚全选
    handleCheckTopChange(type) {
      this.handle(this.CheckTop, this.childTop, 'top', type);
    },
    // 牙位 下颚全选
    handleCheckBottomChange(type) {
      this.handle(this.CheckBottom, this.childBottom, 'bottom', type);
    },
    add_to_arr_with_norepeat(arr, key, type) {
      const i = arr.findIndex(v => v === key);
      if (i > -1) {
        arr.splice(i, 1);
        return;
      }
      arr.push(key);
      switch (type) {
        case 1:
          if (this.activeName === 'adult') {
            arr.sort((a, b) => b - a);
          } else {
            arr.sort((a, b) => roman_int[b] - roman_int[a]);
          }
          break;
        case 2:
          if (this.activeName === 'adult') {
            arr.sort((a, b) => a - b);
          } else {
            arr.sort((a, b) => roman_int[a] - roman_int[b]);
          }
          break;
        case 3:
          if (this.activeName === 'adult') {
            arr.sort((a, b) => b - a);
          } else {
            arr.sort((a, b) => roman_int[b] - roman_int[a]);
          }
          break;
        case 4:
          if (this.activeName === 'adult') {
            arr.sort((a, b) => a - b);
          } else {
            arr.sort((a, b) => roman_int[a] - roman_int[b]);
          }
          break;
        default: break;
      }
    },
    handle(adultChoose, childChoose, type, type2) {
      // 取消上颚选中框时,清除所有已选的上颚或下颚牙位
      if (adultChoose === false && childChoose === false) {
        this.checkAll = false;
        this.childAll = false;
        this.clearChoosed(type);
        return;
      }
      this.clearChoosed(type);
      if (type2 === 'adult') {
        if (this.CheckBottom === true && this.CheckTop === true) {
          this.checkAll = true;
        } else {
          this.checkAll = false;
        }
        for (let i = 1; i < 9; i++) {
          this.Choosed(type, i);
        }
      }
      if (type2 === 'child') {
        if (this.childTop === true && this.childBottom === true) {
          this.childAll = true;
        } else {
          this.childAll = false;
        }
        this.ChildKey.forEach((i) => {
          this.Choosed(type, i);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.select{
  .adult, .child{
    .top, .bottom{
      display: flex;
      .block{
        flex: 1 1 auto;
        display: flex;
        .img_item{
          margin-left: 6px;
          padding-bottom: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          border: 1px solid transparent;
          &.selected{
            border: 1px solid $mainColor;
            .name{
              border: none;
              background: $mainColor;
              color: #fff;
            }
          }
          img{
            width: 44px;
            height: 124px;
          }
          .name{
            margin-top: 12px;
            padding: 6px;
            border: 1px solid $color-silver;
            border-radius: 5px;
          }
        }
      }
      .line_vertical{
        margin: 0 6px;
        border-left: 1px solid $color-silver;
      }
    }
    .line_horizontal{
      margin: 30px 0;
      border-bottom: 1px solid $color-silver;
    }
  }
}
</style>
