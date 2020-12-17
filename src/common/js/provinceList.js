/* eslint-disable */

const provinceList = [
  {
    "areaName": "北京",
    "childrenList": [
      {
        "areaName": "朝阳区",
        "childrenList": [
          {
            "areaName": "三环以内",
            "areaId": 1
          },
          {
            "areaName": "三环到四环之间",
            "areaId": 2
          },
          {
            "areaName": "四环到五环之间",
            "areaId": 3
          },
          {
            "areaName": "五环到六环之间",
            "areaId": 4
          },
          {
            "areaName": "管庄",
            "areaId": 5
          },
          {
            "areaName": "北苑",
            "areaId": 6
          },
          {
            "areaName": "定福庄",
            "areaId": 7
          }
        ],
        "areaId": 1
      },
      {
        "areaName": "海淀区",
        "childrenList": [{
            "areaName": "三环以内",
            "areaId": 8
          },
          {
            "areaName": "三环到四环之间",
            "areaId": 9
          },
          {
            "areaName": "四环到五环之间",
            "areaId": 10
          },
          {
            "areaName": "五环到六环之间",
            "areaId": 11
          },
          {
            "areaName": "六环以外",
            "areaId": 12
          },
          {
            "areaName": "西三旗",
            "areaId": 13
          },
          {
            "areaName": "西二旗",
            "areaId": 14
          }
        ],
        "areaId": 2
      },
      {
        "areaName": "西城区",
        "childrenList": [{
            "areaName": "内环到二环里",
            "areaId": 15
          },
          {
            "areaName": "二环到三环",
            "areaId": 16
          }
        ],
        "areaId": 3
      },
      {
        "areaName": "东城区",
        "childrenList": [{
          "areaName": "内环到三环里",
          "areaId": 17
        }],
        "areaId": 4
      },
      {
        "areaName": "崇文区",
        "childrenList": [{
            "areaName": "一环到二环",
            "areaId": 18
          },
          {
            "areaName": "二环到三环",
            "areaId": 19
          }
        ],
        "areaId": 5
      },
      {
        "areaName": "宣武区",
        "childrenList": [{
          "areaName": "内环到三环里",
          "areaId": 20
        }],
        "areaId": 6
      },
      {
        "areaName": "丰台区",
        "childrenList": [{
            "areaName": "四环到五环之间",
            "areaId": 21
          },
          {
            "areaName": "二环到三环",
            "areaId": 22
          },
          {
            "areaName": "三环到四环之间",
            "areaId": 23
          },
          {
            "areaName": "五环到六环之间",
            "areaId": 24
          },
          {
            "areaName": "六环之外",
            "areaId": 25
          }
        ],
        "areaId": 7
      },
      {
        "areaName": "石景山区",
        "childrenList": [{
            "areaName": "四环到五环内",
            "areaId": 26
          },
          {
            "areaName": "石景山城区",
            "areaId": 27
          },
          {
            "areaName": "八大处科技园区",
            "areaId": 28
          }
        ],
        "areaId": 8
      },
      {
        "areaName": "门头沟",
        "childrenList": [{
            "areaName": "城区",
            "areaId": 29
          },
          {
            "areaName": "龙泉镇",
            "areaId": 30
          },
          {
            "areaName": "永定镇",
            "areaId": 31
          },
          {
            "areaName": "大台镇",
            "areaId": 32
          },
          {
            "areaName": "潭柘寺镇",
            "areaId": 33
          },
          {
            "areaName": "王平镇",
            "areaId": 34
          },
          {
            "areaName": "军庄镇",
            "areaId": 35
          },
          {
            "areaName": "妙峰山镇",
            "areaId": 36
          },
          {
            "areaName": "雁翅镇",
            "areaId": 37
          },
          {
            "areaName": "斋堂镇",
            "areaId": 38
          },
          {
            "areaName": "清水镇",
            "areaId": 39
          }
        ],
        "areaId": 9
      },
      {
        "areaName": "房山区",
        "childrenList": [{
            "areaName": "城区",
            "areaId": 40
          },
          {
            "areaName": "大安山乡",
            "areaId": 41
          },
          {
            "areaName": "大石窝镇",
            "areaId": 42
          },
          {
            "areaName": "窦店镇",
            "areaId": 43
          },
          {
            "areaName": "佛子庄乡",
            "areaId": 44
          },
          {
            "areaName": "韩村河镇",
            "areaId": 45
          },
          {
            "areaName": "河北镇",
            "areaId": 46
          },
          {
            "areaName": "良乡镇",
            "areaId": 47
          },
          {
            "areaName": "琉璃河镇",
            "areaId": 48
          },
          {
            "areaName": "南窖乡",
            "areaId": 49
          },
          {
            "areaName": "蒲洼乡",
            "areaId": 50
          },
          {
            "areaName": "青龙湖镇",
            "areaId": 51
          },
          {
            "areaName": "十渡镇",
            "areaId": 52
          },
          {
            "areaName": "石楼镇",
            "areaId": 53
          },
          {
            "areaName": "史家营乡",
            "areaId": 54
          },
          {
            "areaName": "霞云岭乡",
            "areaId": 55
          },
          {
            "areaName": "新镇",
            "areaId": 56
          },
          {
            "areaName": "阎村镇",
            "areaId": 57
          },
          {
            "areaName": "燕山地区",
            "areaId": 58
          },
          {
            "areaName": "张坊镇",
            "areaId": 59
          },
          {
            "areaName": "长沟镇",
            "areaId": 60
          },
          {
            "areaName": "长阳镇",
            "areaId": 61
          },
          {
            "areaName": "周口店镇",
            "areaId": 62
          }
        ],
        "areaId": 10
      },
      {
        "areaName": "通州区",
        "childrenList": [{
            "areaName": "六环内（马驹桥镇）",
            "areaId": 63
          },
          {
            "areaName": "六环外（马驹桥镇）",
            "areaId": 64
          },
          {
            "areaName": "永顺镇",
            "areaId": 65
          },
          {
            "areaName": "梨园镇",
            "areaId": 66
          },
          {
            "areaName": "宋庄镇",
            "areaId": 67
          },
          {
            "areaName": "漷县镇",
            "areaId": 68
          },
          {
            "areaName": "张家湾镇",
            "areaId": 69
          },
          {
            "areaName": "西集镇",
            "areaId": 70
          },
          {
            "areaName": "永乐店镇",
            "areaId": 71
          },
          {
            "areaName": "潞城镇",
            "areaId": 72
          },
          {
            "areaName": "台湖镇",
            "areaId": 73
          },
          {
            "areaName": "于家务乡",
            "areaId": 74
          },
          {
            "areaName": "中仓街道",
            "areaId": 75
          },
          {
            "areaName": "新华街道",
            "areaId": 76
          },
          {
            "areaName": "玉桥街道",
            "areaId": 77
          },
          {
            "areaName": "北苑街道",
            "areaId": 78
          },
          {
            "areaName": "次渠镇",
            "areaId": 79
          }
        ],
        "areaId": 11
      },
      {
        "areaName": "大兴区",
        "childrenList": [{
            "areaName": "四环至五环之间",
            "areaId": 80
          },
          {
            "areaName": "六环以外",
            "areaId": 81
          },
          {
            "areaName": "五环至六环之间",
            "areaId": 82
          },
          {
            "areaName": "亦庄经济开发区",
            "areaId": 83
          }
        ],
        "areaId": 12
      },
      {
        "areaName": "顺义区",
        "childrenList": [{
            "areaName": "北石槽镇",
            "areaId": 84
          },
          {
            "areaName": "北务镇",
            "areaId": 85
          },
          {
            "areaName": "北小营镇",
            "areaId": 86
          },
          {
            "areaName": "大孙各庄镇",
            "areaId": 87
          },
          {
            "areaName": "高丽营镇",
            "areaId": 88
          },
          {
            "areaName": "光明街道",
            "areaId": 89
          },
          {
            "areaName": "后沙峪地区",
            "areaId": 90
          },
          {
            "areaName": "空港街道",
            "areaId": 91
          },
          {
            "areaName": "李桥镇",
            "areaId": 92
          },
          {
            "areaName": "李遂镇",
            "areaId": 93
          },
          {
            "areaName": "龙湾屯镇",
            "areaId": 94
          },
          {
            "areaName": "马坡地区",
            "areaId": 95
          },
          {
            "areaName": "木林镇",
            "areaId": 96
          },
          {
            "areaName": "南彩镇",
            "areaId": 97
          },
          {
            "areaName": "南法信地区",
            "areaId": 98
          },
          {
            "areaName": "牛栏山地区",
            "areaId": 99
          },
          {
            "areaName": "仁和地区",
            "areaId": 100
          },
          {
            "areaName": "胜利街道",
            "areaId": 101
          },
          {
            "areaName": "石园街道",
            "areaId": 102
          },
          {
            "areaName": "双丰街道",
            "areaId": 103
          },
          {
            "areaName": "天竺地区",
            "areaId": 104
          },
          {
            "areaName": "旺泉街道",
            "areaId": 105
          },
          {
            "areaName": "杨镇地区",
            "areaId": 106
          },
          {
            "areaName": "张镇",
            "areaId": 107
          },
          {
            "areaName": "赵全营镇",
            "areaId": 108
          }
        ],
        "areaId": 13
      },
      {
        "areaName": "怀柔区",
        "childrenList": [{
            "areaName": "郊区",
            "areaId": 109
          },
          {
            "areaName": "城区以内",
            "areaId": 110
          }
        ],
        "areaId": 14
      },
      {
        "areaName": "密云区",
        "childrenList": [{
            "areaName": "城区以外",
            "areaId": 111
          },
          {
            "areaName": "城区",
            "areaId": 112
          }
        ],
        "areaId": 15
      },
      {
        "areaName": "昌平区",
        "childrenList": [{
            "areaName": "城区以外",
            "areaId": 113
          },
          {
            "areaName": "六环以内",
            "areaId": 114
          },
          {
            "areaName": "城区",
            "areaId": 115
          }
        ],
        "areaId": 16
      },
      {
        "areaName": "平谷区",
        "childrenList": [{
            "areaName": "城区以外",
            "areaId": 116
          },
          {
            "areaName": "城区",
            "areaId": 117
          }
        ],
        "areaId": 17
      },
      {
        "areaName": "延庆县",
        "childrenList": [{
            "areaName": "延庆镇",
            "areaId": 118
          },
          {
            "areaName": "城区",
            "areaId": 119
          },
          {
            "areaName": "康庄镇",
            "areaId": 120
          },
          {
            "areaName": "八达岭镇",
            "areaId": 121
          },
          {
            "areaName": "永宁镇",
            "areaId": 122
          },
          {
            "areaName": "旧县镇",
            "areaId": 123
          },
          {
            "areaName": "张山营镇",
            "areaId": 124
          },
          {
            "areaName": "四海镇",
            "areaId": 125
          },
          {
            "areaName": "千家店镇",
            "areaId": 126
          },
          {
            "areaName": "沈家营镇",
            "areaId": 127
          },
          {
            "areaName": "大榆树镇",
            "areaId": 128
          },
          {
            "areaName": "井庄镇",
            "areaId": 129
          },
          {
            "areaName": "大庄科乡",
            "areaId": 130
          },
          {
            "areaName": "刘斌堡乡",
            "areaId": 131
          },
          {
            "areaName": "香营乡",
            "areaId": 132
          },
          {
            "areaName": "珍珠泉乡",
            "areaId": 133
          }
        ],
        "areaId": 18
      }
    ],
    "areaId": 1
  },
  {
    "areaName": "上海",
    "childrenList": [{
        "areaName": "黄浦区",
        "childrenList": [{
          "areaName": "城区",
          "areaId": 134
        }],
        "areaId": 19
      },
      {
        "areaName": "徐汇区",
        "childrenList": [{
          "areaName": "城区",
          "areaId": 135
        }],
        "areaId": 20
      },
      {
        "areaName": "长宁区",
        "childrenList": [{
          "areaName": "城区",
          "areaId": 136
        }],
        "areaId": 21
      },
      {
        "areaName": "静安区",
        "childrenList": [{
          "areaName": "城区",
          "areaId": 137
        }],
        "areaId": 22
      },
      {
        "areaName": "闸北区",
        "childrenList": [{
          "areaName": "城区",
          "areaId": 138
        }],
        "areaId": 23
      },
      {
        "areaName": "虹口区",
        "childrenList": [{
          "areaName": "城区",
          "areaId": 139
        }],
        "areaId": 24
      },
      {
        "areaName": "杨浦区",
        "childrenList": [{
          "areaName": "城区",
          "areaId": 140
        }],
        "areaId": 25
      },
      {
        "areaName": "宝山区",
        "childrenList": [{
            "areaName": "罗店镇",
            "areaId": 141
          },
          {
            "areaName": "大场镇",
            "areaId": 142
          },
          {
            "areaName": "杨行镇",
            "areaId": 143
          },
          {
            "areaName": "月浦镇",
            "areaId": 144
          },
          {
            "areaName": "罗泾镇",
            "areaId": 145
          },
          {
            "areaName": "顾村镇",
            "areaId": 146
          },
          {
            "areaName": "高境镇",
            "areaId": 147
          },
          {
            "areaName": "庙行镇",
            "areaId": 148
          },
          {
            "areaName": "淞南镇",
            "areaId": 149
          },
          {
            "areaName": "宝山城市工业园区",
            "areaId": 150
          },
          {
            "areaName": "城区",
            "areaId": 151
          }
        ],
        "areaId": 26
      },
      {
        "areaName": "闵行区",
        "childrenList": [{
            "areaName": "城区",
            "areaId": 152
          },
          {
            "areaName": "莘庄镇",
            "areaId": 153
          },
          {
            "areaName": "七宝镇",
            "areaId": 154
          },
          {
            "areaName": "浦江镇",
            "areaId": 155
          },
          {
            "areaName": "梅陇镇",
            "areaId": 156
          },
          {
            "areaName": "虹桥镇",
            "areaId": 157
          },
          {
            "areaName": "马桥镇",
            "areaId": 158
          },
          {
            "areaName": "吴泾镇",
            "areaId": 159
          },
          {
            "areaName": "华漕镇",
            "areaId": 160
          },
          {
            "areaName": "颛桥镇",
            "areaId": 161
          }
        ],
        "areaId": 27
      },
      {
        "areaName": "嘉定区",
        "childrenList": [{
            "areaName": "城区",
            "areaId": 162
          },
          {
            "areaName": "南翔镇",
            "areaId": 163
          },
          {
            "areaName": "马陆镇",
            "areaId": 164
          },
          {
            "areaName": "华亭镇",
            "areaId": 165
          },
          {
            "areaName": "江桥镇",
            "areaId": 166
          },
          {
            "areaName": "菊园新区",
            "areaId": 167
          },
          {
            "areaName": "安亭镇",
            "areaId": 168
          },
          {
            "areaName": "徐行镇",
            "areaId": 169
          },
          {
            "areaName": "外冈镇",
            "areaId": 170
          },
          {
            "areaName": "嘉定工业区",
            "areaId": 171
          }
        ],
        "areaId": 28
      },
      {
        "areaName": "浦东新区",
        "childrenList": [{
            "areaName": "城区",
            "areaId": 172
          },
          {
            "areaName": "川沙新镇",
            "areaId": 173
          },
          {
            "areaName": "高桥镇",
            "areaId": 174
          },
          {
            "areaName": "北蔡镇",
            "areaId": 175
          },
          {
            "areaName": "合庆镇",
            "areaId": 176
          },
          {
            "areaName": "唐镇",
            "areaId": 177
          },
          {
            "areaName": "曹路镇",
            "areaId": 178
          },
          {
            "areaName": "金桥镇",
            "areaId": 179
          },
          {
            "areaName": "高行镇",
            "areaId": 180
          },
          {
            "areaName": "高东镇",
            "areaId": 181
          },
          {
            "areaName": "张江镇",
            "areaId": 182
          },
          {
            "areaName": "三林镇",
            "areaId": 183
          },
          {
            "areaName": "南汇新城镇",
            "areaId": 184
          },
          {
            "areaName": "祝桥镇",
            "areaId": 185
          },
          {
            "areaName": "新场镇",
            "areaId": 186
          },
          {
            "areaName": "惠南镇",
            "areaId": 187
          },
          {
            "areaName": "康桥镇",
            "areaId": 188
          },
          {
            "areaName": "宣桥镇",
            "areaId": 189
          },
          {
            "areaName": "书院镇",
            "areaId": 190
          },
          {
            "areaName": "大团镇",
            "areaId": 191
          },
          {
            "areaName": "周浦镇",
            "areaId": 192
          },
          {
            "areaName": "芦潮港镇",
            "areaId": 193
          },
          {
            "areaName": "泥城镇",
            "areaId": 194
          },
          {
            "areaName": "航头镇",
            "areaId": 195
          },
          {
            "areaName": "万祥镇",
            "areaId": 196
          },
          {
            "areaName": "老港镇",
            "areaId": 197
          }
        ],
        "areaId": 29
      },
      {
        "areaName": "青浦区",
        "childrenList": [{
            "areaName": "朱家角镇",
            "areaId": 198
          },
          {
            "areaName": "赵巷镇",
            "areaId": 199
          },
          {
            "areaName": "徐泾镇",
            "areaId": 200
          },
          {
            "areaName": "华新镇",
            "areaId": 201
          },
          {
            "areaName": "重固镇",
            "areaId": 202
          },
          {
            "areaName": "白鹤镇",
            "areaId": 203
          },
          {
            "areaName": "练塘镇",
            "areaId": 204
          },
          {
            "areaName": "金泽镇",
            "areaId": 205
          },
          {
            "areaName": "城区",
            "areaId": 206
          }
        ],
        "areaId": 30
      },
      {
        "areaName": "松江区",
        "childrenList": [{
            "areaName": "城区",
            "areaId": 207
          },
          {
            "areaName": "泗泾镇",
            "areaId": 208
          },
          {
            "areaName": "佘山镇",
            "areaId": 209
          },
          {
            "areaName": "车墩镇",
            "areaId": 210
          },
          {
            "areaName": "新桥镇",
            "areaId": 211
          },
          {
            "areaName": "洞泾镇",
            "areaId": 212
          },
          {
            "areaName": "九亭镇",
            "areaId": 213
          },
          {
            "areaName": "泖港镇",
            "areaId": 214
          },
          {
            "areaName": "石湖荡镇",
            "areaId": 215
          },
          {
            "areaName": "新浜镇",
            "areaId": 216
          },
          {
            "areaName": "叶榭镇",
            "areaId": 217
          },
          {
            "areaName": "小昆山镇",
            "areaId": 218
          }
        ],
        "areaId": 31
      },
      {
        "areaName": "金山区",
        "childrenList": [{
            "areaName": "城区",
            "areaId": 219
          },
          {
            "areaName": "金山工业区",
            "areaId": 220
          },
          {
            "areaName": "朱泾镇",
            "areaId": 221
          },
          {
            "areaName": "枫泾镇",
            "areaId": 222
          },
          {
            "areaName": "张堰镇",
            "areaId": 223
          },
          {
            "areaName": "亭林镇",
            "areaId": 224
          },
          {
            "areaName": "吕巷镇",
            "areaId": 225
          },
          {
            "areaName": "廊下镇",
            "areaId": 226
          },
          {
            "areaName": "金山卫镇",
            "areaId": 227
          },
          {
            "areaName": "漕泾镇",
            "areaId": 228
          },
          {
            "areaName": "山阳镇",
            "areaId": 229
          }
        ],
        "areaId": 32
      },
      {
        "areaName": "奉贤区",
        "childrenList": [{
            "areaName": "南桥镇",
            "areaId": 230
          },
          {
            "areaName": "奉城镇",
            "areaId": 231
          },
          {
            "areaName": "四团镇",
            "areaId": 232
          },
          {
            "areaName": "柘林镇",
            "areaId": 233
          },
          {
            "areaName": "庄行镇",
            "areaId": 234
          },
          {
            "areaName": "金汇镇",
            "areaId": 235
          },
          {
            "areaName": "青村镇",
            "areaId": 236
          },
          {
            "areaName": "海湾镇",
            "areaId": 237
          }
        ],
        "areaId": 33
      },
      {
        "areaName": "普陀区",
        "childrenList": [{
          "areaName": "城区",
          "areaId": 238
        }],
        "areaId": 34
      },
      {
        "areaName": "崇明县",
        "childrenList": [{
            "areaName": "堡镇",
            "areaId": 239
          },
          {
            "areaName": "庙镇",
            "areaId": 240
          },
          {
            "areaName": "陈家镇",
            "areaId": 241
          },
          {
            "areaName": "城桥镇",
            "areaId": 242
          },
          {
            "areaName": "东平镇",
            "areaId": 243
          },
          {
            "areaName": "港西镇",
            "areaId": 244
          },
          {
            "areaName": "港沿镇",
            "areaId": 245
          },
          {
            "areaName": "建设镇",
            "areaId": 246
          },
          {
            "areaName": "绿华镇",
            "areaId": 247
          },
          {
            "areaName": "三星镇",
            "areaId": 248
          },
          {
            "areaName": "竖新镇",
            "areaId": 249
          },
          {
            "areaName": "向化镇",
            "areaId": 250
          },
          {
            "areaName": "新海镇",
            "areaId": 251
          },
          {
            "areaName": "新河镇",
            "areaId": 252
          },
          {
            "areaName": "中兴镇",
            "areaId": 253
          },
          {
            "areaName": "长兴乡",
            "areaId": 254
          },
          {
            "areaName": "横沙乡",
            "areaId": 255
          },
          {
            "areaName": "新村乡",
            "areaId": 256
          }
        ],
        "areaId": 35
      }
    ],
    "areaId": 2
  },
  {
    "areaName": "天津",
    "childrenList": [{
        "areaName": "东丽区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 257
        }],
        "areaId": 36
      },
      {
        "areaName": "和平区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 258
        }],
        "areaId": 37
      },
      {
        "areaName": "河北区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 259
        }],
        "areaId": 38
      },
      {
        "areaName": "河东区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 260
        }],
        "areaId": 39
      },
      {
        "areaName": "河西区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 261
        }],
        "areaId": 40
      },
      {
        "areaName": "红桥区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 262
        }],
        "areaId": 41
      },
      {
        "areaName": "蓟县",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 263
        }],
        "areaId": 42
      },
      {
        "areaName": "静海县",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 264
        }],
        "areaId": 43
      },
      {
        "areaName": "南开区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 265
        }],
        "areaId": 44
      },
      {
        "areaName": "塘沽区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 266
        }],
        "areaId": 45
      },
      {
        "areaName": "西青区",
        "childrenList": [{
            "areaName": "其它地区",
            "areaId": 267
          },
          {
            "areaName": "杨柳青",
            "areaId": 268
          }
        ],
        "areaId": 46
      },
      {
        "areaName": "武清区",
        "childrenList": [{
            "areaName": "杨村镇、下朱庄内",
            "areaId": 269
          },
          {
            "areaName": "其它地区",
            "areaId": 270
          }
        ],
        "areaId": 47
      },
      {
        "areaName": "津南区",
        "childrenList": [{
            "areaName": "咸水沽镇、海河教育园，海河科技园",
            "areaId": 271
          },
          {
            "areaName": "双港，辛庄",
            "areaId": 272
          },
          {
            "areaName": "其他地区",
            "areaId": 273
          }
        ],
        "areaId": 48
      },
      {
        "areaName": "汉沽区",
        "childrenList": [{
            "areaName": "汉沽区街里、汉沽开发区",
            "areaId": 274
          },
          {
            "areaName": "其它地区",
            "areaId": 275
          }
        ],
        "areaId": 49
      },
      {
        "areaName": "大港区",
        "childrenList": [{
            "areaName": "大港油田",
            "areaId": 276
          },
          {
            "areaName": "主城区内",
            "areaId": 277
          },
          {
            "areaName": "主城区外",
            "areaId": 278
          }
        ],
        "areaId": 50
      },
      {
        "areaName": "北辰区",
        "childrenList": [{
            "areaName": "外环内",
            "areaId": 279
          },
          {
            "areaName": "外环外双街镇，河北工大新校，屈店工业园",
            "areaId": 280
          },
          {
            "areaName": "外环外其它地区",
            "areaId": 281
          }
        ],
        "areaId": 51
      },
      {
        "areaName": "宝坻区",
        "childrenList": [{
            "areaName": "城关镇、马家店开发区、天宝工业园",
            "areaId": 282
          },
          {
            "areaName": "其它地区",
            "areaId": 283
          }
        ],
        "areaId": 52
      },
      {
        "areaName": "宁河县",
        "childrenList": [{
            "areaName": "芦台镇、经济开发区、贸易开发区",
            "areaId": 284
          },
          {
            "areaName": "其它地区",
            "areaId": 285
          }
        ],
        "areaId": 53
      }
    ],
    "areaId": 3
  },
  {
    "areaName": "重庆",
    "childrenList": [{
        "areaName": "万州区",
        "childrenList": [{
            "areaName": "陈家坝街道",
            "areaId": 286
          },
          {
            "areaName": "钟鼓楼街道",
            "areaId": 287
          },
          {
            "areaName": "周家坝街道",
            "areaId": 288
          },
          {
            "areaName": "百安坝街道",
            "areaId": 289
          },
          {
            "areaName": "高笋塘街道",
            "areaId": 290
          },
          {
            "areaName": "双河口街道",
            "areaId": 291
          },
          {
            "areaName": "龙都街道",
            "areaId": 292
          },
          {
            "areaName": "牌楼街道",
            "areaId": 293
          },
          {
            "areaName": "沙河街道",
            "areaId": 294
          },
          {
            "areaName": "太白街道",
            "areaId": 295
          },
          {
            "areaName": "五桥街道",
            "areaId": 296
          },
          {
            "areaName": "白土镇",
            "areaId": 297
          },
          {
            "areaName": "白羊镇",
            "areaId": 298
          },
          {
            "areaName": "大周镇",
            "areaId": 299
          },
          {
            "areaName": "弹子镇",
            "areaId": 300
          },
          {
            "areaName": "分水镇",
            "areaId": 301
          },
          {
            "areaName": "甘宁镇",
            "areaId": 302
          },
          {
            "areaName": "高峰镇",
            "areaId": 303
          },
          {
            "areaName": "高梁镇",
            "areaId": 304
          },
          {
            "areaName": "后山镇",
            "areaId": 305
          },
          {
            "areaName": "李河镇",
            "areaId": 306
          },
          {
            "areaName": "龙驹镇",
            "areaId": 307
          },
          {
            "areaName": "龙沙镇",
            "areaId": 308
          },
          {
            "areaName": "罗田镇",
            "areaId": 309
          },
          {
            "areaName": "孙家镇",
            "areaId": 310
          },
          {
            "areaName": "太安镇",
            "areaId": 311
          },
          {
            "areaName": "太龙镇",
            "areaId": 312
          },
          {
            "areaName": "天城镇",
            "areaId": 313
          },
          {
            "areaName": "武陵镇",
            "areaId": 314
          },
          {
            "areaName": "响水镇",
            "areaId": 315
          },
          {
            "areaName": "小周镇",
            "areaId": 316
          },
          {
            "areaName": "新田镇",
            "areaId": 317
          },
          {
            "areaName": "新乡镇",
            "areaId": 318
          },
          {
            "areaName": "熊家镇",
            "areaId": 319
          },
          {
            "areaName": "余家镇",
            "areaId": 320
          },
          {
            "areaName": "长岭镇",
            "areaId": 321
          },
          {
            "areaName": "长坪镇",
            "areaId": 322
          },
          {
            "areaName": "长滩镇",
            "areaId": 323
          },
          {
            "areaName": "走马镇",
            "areaId": 324
          },
          {
            "areaName": "瀼渡镇",
            "areaId": 325
          },
          {
            "areaName": "茨竹乡",
            "areaId": 326
          },
          {
            "areaName": "柱山乡",
            "areaId": 327
          },
          {
            "areaName": "燕山乡",
            "areaId": 328
          },
          {
            "areaName": "溪口乡",
            "areaId": 329
          },
          {
            "areaName": "普子乡",
            "areaId": 330
          },
          {
            "areaName": "地宝乡",
            "areaId": 331
          },
          {
            "areaName": "铁峰乡",
            "areaId": 332
          },
          {
            "areaName": "黄柏乡",
            "areaId": 333
          },
          {
            "areaName": "九池乡",
            "areaId": 334
          },
          {
            "areaName": "梨树乡",
            "areaId": 335
          },
          {
            "areaName": "郭村乡",
            "areaId": 336
          },
          {
            "areaName": "恒合乡",
            "areaId": 337
          }
        ],
        "areaId": 54
      },
      {
        "areaName": "涪陵区",
        "childrenList": [{
            "areaName": "荔枝街道",
            "areaId": 338
          },
          {
            "areaName": "敦仁街道",
            "areaId": 339
          },
          {
            "areaName": "江北街道",
            "areaId": 340
          },
          {
            "areaName": "江东街道",
            "areaId": 341
          },
          {
            "areaName": "崇义街道",
            "areaId": 342
          },
          {
            "areaName": "李渡镇",
            "areaId": 343
          },
          {
            "areaName": "白涛镇",
            "areaId": 344
          },
          {
            "areaName": "百胜镇",
            "areaId": 345
          },
          {
            "areaName": "堡子镇",
            "areaId": 346
          },
          {
            "areaName": "焦石镇",
            "areaId": 347
          },
          {
            "areaName": "蔺市镇",
            "areaId": 348
          },
          {
            "areaName": "龙桥镇",
            "areaId": 349
          },
          {
            "areaName": "龙潭镇",
            "areaId": 350
          },
          {
            "areaName": "马武镇",
            "areaId": 351
          },
          {
            "areaName": "南沱镇",
            "areaId": 352
          },
          {
            "areaName": "青羊镇",
            "areaId": 353
          },
          {
            "areaName": "清溪镇",
            "areaId": 354
          },
          {
            "areaName": "石沱镇",
            "areaId": 355
          },
          {
            "areaName": "新妙镇",
            "areaId": 356
          },
          {
            "areaName": "义和镇",
            "areaId": 357
          },
          {
            "areaName": "增福乡",
            "areaId": 358
          },
          {
            "areaName": "珍溪镇",
            "areaId": 359
          },
          {
            "areaName": "镇安镇",
            "areaId": 360
          },
          {
            "areaName": "致韩镇",
            "areaId": 361
          },
          {
            "areaName": "土地坡乡",
            "areaId": 362
          },
          {
            "areaName": "武陵山乡",
            "areaId": 363
          },
          {
            "areaName": "中峰乡",
            "areaId": 364
          },
          {
            "areaName": "梓里乡",
            "areaId": 365
          },
          {
            "areaName": "丛林乡",
            "areaId": 366
          },
          {
            "areaName": "大木乡",
            "areaId": 367
          },
          {
            "areaName": "惠民乡",
            "areaId": 368
          },
          {
            "areaName": "酒店乡",
            "areaId": 369
          },
          {
            "areaName": "聚宝乡",
            "areaId": 370
          },
          {
            "areaName": "卷洞乡",
            "areaId": 371
          },
          {
            "areaName": "两汇乡",
            "areaId": 372
          },
          {
            "areaName": "罗云乡",
            "areaId": 373
          },
          {
            "areaName": "明家乡",
            "areaId": 374
          },
          {
            "areaName": "仁义乡",
            "areaId": 375
          },
          {
            "areaName": "山窝乡",
            "areaId": 376
          },
          {
            "areaName": "石和乡",
            "areaId": 377
          },
          {
            "areaName": "石龙乡",
            "areaId": 378
          },
          {
            "areaName": "太和乡",
            "areaId": 379
          },
          {
            "areaName": "天台乡",
            "areaId": 380
          },
          {
            "areaName": "同乐乡",
            "areaId": 381
          },
          {
            "areaName": "新村乡",
            "areaId": 382
          }
        ],
        "areaId": 55
      },
      {
        "areaName": "梁平县",
        "childrenList": [{
            "areaName": "梁山镇",
            "areaId": 383
          },
          {
            "areaName": "柏家镇",
            "areaId": 384
          },
          {
            "areaName": "碧山镇",
            "areaId": 385
          },
          {
            "areaName": "大观镇",
            "areaId": 386
          },
          {
            "areaName": "福禄镇",
            "areaId": 387
          },
          {
            "areaName": "合兴镇",
            "areaId": 388
          },
          {
            "areaName": "和林镇",
            "areaId": 389
          },
          {
            "areaName": "虎城镇",
            "areaId": 390
          },
          {
            "areaName": "回龙镇",
            "areaId": 391
          },
          {
            "areaName": "金带镇",
            "areaId": 392
          },
          {
            "areaName": "聚奎镇",
            "areaId": 393
          },
          {
            "areaName": "礼让镇",
            "areaId": 394
          },
          {
            "areaName": "龙门镇",
            "areaId": 395
          },
          {
            "areaName": "明达镇",
            "areaId": 396
          },
          {
            "areaName": "蟠龙镇",
            "areaId": 397
          },
          {
            "areaName": "屏锦镇",
            "areaId": 398
          },
          {
            "areaName": "仁贤镇",
            "areaId": 399
          },
          {
            "areaName": "石安镇",
            "areaId": 400
          },
          {
            "areaName": "文化镇",
            "areaId": 401
          },
          {
            "areaName": "新盛镇",
            "areaId": 402
          },
          {
            "areaName": "荫平镇",
            "areaId": 403
          },
          {
            "areaName": "袁驿镇",
            "areaId": 404
          },
          {
            "areaName": "云龙镇",
            "areaId": 405
          },
          {
            "areaName": "竹山镇",
            "areaId": 406
          },
          {
            "areaName": "安胜乡",
            "areaId": 407
          },
          {
            "areaName": "铁门乡",
            "areaId": 408
          },
          {
            "areaName": "紫照乡",
            "areaId": 409
          },
          {
            "areaName": "曲水乡",
            "areaId": 410
          },
          {
            "areaName": "龙胜乡",
            "areaId": 411
          },
          {
            "areaName": "城北乡",
            "areaId": 412
          },
          {
            "areaName": "城东乡",
            "areaId": 413
          },
          {
            "areaName": "复平乡",
            "areaId": 414
          },
          {
            "areaName": "县城内",
            "areaId": 415
          }
        ],
        "areaId": 56
      },
      {
        "areaName": "南川区",
        "childrenList": [{
            "areaName": "东城街道",
            "areaId": 416
          },
          {
            "areaName": "南城街道",
            "areaId": 417
          },
          {
            "areaName": "西城街道",
            "areaId": 418
          },
          {
            "areaName": "太平场镇",
            "areaId": 419
          },
          {
            "areaName": "大观镇",
            "areaId": 420
          },
          {
            "areaName": "大有镇",
            "areaId": 421
          },
          {
            "areaName": "合溪镇",
            "areaId": 422
          },
          {
            "areaName": "金山镇",
            "areaId": 423
          },
          {
            "areaName": "鸣玉镇",
            "areaId": 424
          },
          {
            "areaName": "南平镇",
            "areaId": 425
          },
          {
            "areaName": "三泉镇",
            "areaId": 426
          },
          {
            "areaName": "神童镇",
            "areaId": 427
          },
          {
            "areaName": "石墙镇",
            "areaId": 428
          },
          {
            "areaName": "水江镇",
            "areaId": 429
          },
          {
            "areaName": "头渡镇",
            "areaId": 430
          },
          {
            "areaName": "兴隆镇",
            "areaId": 431
          },
          {
            "areaName": "冷水关乡",
            "areaId": 432
          },
          {
            "areaName": "德隆乡",
            "areaId": 433
          },
          {
            "areaName": "峰岩乡",
            "areaId": 434
          },
          {
            "areaName": "福寿乡",
            "areaId": 435
          },
          {
            "areaName": "古花乡",
            "areaId": 436
          },
          {
            "areaName": "河图乡",
            "areaId": 437
          },
          {
            "areaName": "民主乡",
            "areaId": 438
          },
          {
            "areaName": "木凉乡",
            "areaId": 439
          },
          {
            "areaName": "乾丰乡",
            "areaId": 440
          },
          {
            "areaName": "庆元乡",
            "areaId": 441
          },
          {
            "areaName": "石莲乡",
            "areaId": 442
          },
          {
            "areaName": "石溪乡",
            "areaId": 443
          },
          {
            "areaName": "铁村乡",
            "areaId": 444
          },
          {
            "areaName": "土溪乡",
            "areaId": 445
          },
          {
            "areaName": "鱼泉乡",
            "areaId": 446
          },
          {
            "areaName": "中桥乡",
            "areaId": 447
          }
        ],
        "areaId": 57
      },
      {
        "areaName": "潼南县",
        "childrenList": [{
            "areaName": "桂林街道",
            "areaId": 448
          },
          {
            "areaName": "梓潼街道",
            "areaId": 449
          },
          {
            "areaName": "柏梓镇",
            "areaId": 450
          },
          {
            "areaName": "宝龙镇",
            "areaId": 451
          },
          {
            "areaName": "崇龛镇",
            "areaId": 452
          },
          {
            "areaName": "古溪镇",
            "areaId": 453
          },
          {
            "areaName": "龙形镇",
            "areaId": 454
          },
          {
            "areaName": "米心镇",
            "areaId": 455
          },
          {
            "areaName": "群力镇",
            "areaId": 456
          },
          {
            "areaName": "上和镇",
            "areaId": 457
          },
          {
            "areaName": "双江镇",
            "areaId": 458
          },
          {
            "areaName": "太安镇",
            "areaId": 459
          },
          {
            "areaName": "塘坝镇",
            "areaId": 460
          },
          {
            "areaName": "卧佛镇",
            "areaId": 461
          },
          {
            "areaName": "五桂镇",
            "areaId": 462
          },
          {
            "areaName": "小渡镇",
            "areaId": 463
          },
          {
            "areaName": "新胜镇",
            "areaId": 464
          },
          {
            "areaName": "玉溪镇",
            "areaId": 465
          },
          {
            "areaName": "别口乡",
            "areaId": 466
          },
          {
            "areaName": "田家乡",
            "areaId": 467
          },
          {
            "areaName": "寿桥乡",
            "areaId": 468
          },
          {
            "areaName": "县城内",
            "areaId": 469
          }
        ],
        "areaId": 58
      },
      {
        "areaName": "大足区",
        "childrenList": [{
            "areaName": "龙岗街道",
            "areaId": 470
          },
          {
            "areaName": "棠香街道",
            "areaId": 471
          },
          {
            "areaName": "龙滩子街道",
            "areaId": 472
          },
          {
            "areaName": "龙水镇",
            "areaId": 473
          },
          {
            "areaName": "智凤镇",
            "areaId": 474
          },
          {
            "areaName": "宝顶镇",
            "areaId": 475
          },
          {
            "areaName": "中敖镇",
            "areaId": 476
          },
          {
            "areaName": "三驱镇",
            "areaId": 477
          },
          {
            "areaName": "宝兴镇",
            "areaId": 478
          },
          {
            "areaName": "玉龙镇",
            "areaId": 479
          },
          {
            "areaName": "石马镇",
            "areaId": 480
          },
          {
            "areaName": "拾万镇",
            "areaId": 481
          },
          {
            "areaName": "回龙镇",
            "areaId": 482
          },
          {
            "areaName": "金山镇",
            "areaId": 483
          },
          {
            "areaName": "万古镇",
            "areaId": 484
          },
          {
            "areaName": "国梁镇",
            "areaId": 485
          },
          {
            "areaName": "雍溪镇",
            "areaId": 486
          },
          {
            "areaName": "珠溪镇",
            "areaId": 487
          },
          {
            "areaName": "龙石镇",
            "areaId": 488
          },
          {
            "areaName": "邮亭镇",
            "areaId": 489
          },
          {
            "areaName": "铁山镇",
            "areaId": 490
          },
          {
            "areaName": "高升镇",
            "areaId": 491
          },
          {
            "areaName": "季家镇",
            "areaId": 492
          },
          {
            "areaName": "古龙镇",
            "areaId": 493
          },
          {
            "areaName": "高坪镇",
            "areaId": 494
          },
          {
            "areaName": "双路镇",
            "areaId": 495
          },
          {
            "areaName": "通桥镇",
            "areaId": 496
          }
        ],
        "areaId": 59
      },
      {
        "areaName": "黔江区",
        "childrenList": [{
            "areaName": "城西街道",
            "areaId": 497
          },
          {
            "areaName": "城东街道",
            "areaId": 498
          },
          {
            "areaName": "城南街道",
            "areaId": 499
          },
          {
            "areaName": "正阳街道",
            "areaId": 500
          },
          {
            "areaName": "舟白街道",
            "areaId": 501
          },
          {
            "areaName": "阿蓬江镇",
            "areaId": 502
          },
          {
            "areaName": "小南海镇",
            "areaId": 503
          },
          {
            "areaName": "鹅池镇",
            "areaId": 504
          },
          {
            "areaName": "冯家镇",
            "areaId": 505
          },
          {
            "areaName": "黑溪镇",
            "areaId": 506
          },
          {
            "areaName": "黄溪镇",
            "areaId": 507
          },
          {
            "areaName": "金溪镇",
            "areaId": 508
          },
          {
            "areaName": "黎水镇",
            "areaId": 509
          },
          {
            "areaName": "邻鄂镇",
            "areaId": 510
          },
          {
            "areaName": "马喇镇",
            "areaId": 511
          },
          {
            "areaName": "石会镇",
            "areaId": 512
          },
          {
            "areaName": "石家镇",
            "areaId": 513
          },
          {
            "areaName": "濯水镇",
            "areaId": 514
          },
          {
            "areaName": "白石乡",
            "areaId": 515
          },
          {
            "areaName": "白土乡",
            "areaId": 516
          },
          {
            "areaName": "金洞乡",
            "areaId": 517
          },
          {
            "areaName": "蓬东乡",
            "areaId": 518
          },
          {
            "areaName": "沙坝乡",
            "areaId": 519
          },
          {
            "areaName": "杉岭乡",
            "areaId": 520
          },
          {
            "areaName": "水市乡",
            "areaId": 521
          },
          {
            "areaName": "水田乡",
            "areaId": 522
          },
          {
            "areaName": "太极乡",
            "areaId": 523
          },
          {
            "areaName": "五里乡",
            "areaId": 524
          },
          {
            "areaName": "新华乡",
            "areaId": 525
          },
          {
            "areaName": "中塘乡",
            "areaId": 526
          }
        ],
        "areaId": 60
      },
      {
        "areaName": "武隆县",
        "childrenList": [{
            "areaName": "仙女山镇",
            "areaId": 527
          },
          {
            "areaName": "巷口镇",
            "areaId": 528
          },
          {
            "areaName": "白马镇",
            "areaId": 529
          },
          {
            "areaName": "火炉镇",
            "areaId": 530
          },
          {
            "areaName": "江口镇",
            "areaId": 531
          },
          {
            "areaName": "平桥镇",
            "areaId": 532
          },
          {
            "areaName": "桐梓镇",
            "areaId": 533
          },
          {
            "areaName": "土坎镇",
            "areaId": 534
          },
          {
            "areaName": "鸭江镇",
            "areaId": 535
          },
          {
            "areaName": "羊角镇",
            "areaId": 536
          },
          {
            "areaName": "长坝镇",
            "areaId": 537
          },
          {
            "areaName": "白云乡",
            "areaId": 538
          },
          {
            "areaName": "沧沟乡",
            "areaId": 539
          },
          {
            "areaName": "凤来乡",
            "areaId": 540
          },
          {
            "areaName": "浩口乡",
            "areaId": 541
          },
          {
            "areaName": "和顺乡",
            "areaId": 542
          },
          {
            "areaName": "后坪乡",
            "areaId": 543
          },
          {
            "areaName": "黄莺乡",
            "areaId": 544
          },
          {
            "areaName": "接龙乡",
            "areaId": 545
          },
          {
            "areaName": "庙垭乡",
            "areaId": 546
          },
          {
            "areaName": "石桥乡",
            "areaId": 547
          },
          {
            "areaName": "双河乡",
            "areaId": 548
          },
          {
            "areaName": "铁矿乡",
            "areaId": 549
          },
          {
            "areaName": "土地乡",
            "areaId": 550
          },
          {
            "areaName": "文复乡",
            "areaId": 551
          },
          {
            "areaName": "赵家乡",
            "areaId": 552
          },
          {
            "areaName": "县城内",
            "areaId": 553
          }
        ],
        "areaId": 61
      },
      {
        "areaName": "丰都县",
        "childrenList": [{
            "areaName": "三合街道",
            "areaId": 554
          },
          {
            "areaName": "南天湖镇",
            "areaId": 555
          },
          {
            "areaName": "许明寺镇",
            "areaId": 556
          },
          {
            "areaName": "包鸾镇",
            "areaId": 557
          },
          {
            "areaName": "董家镇",
            "areaId": 558
          },
          {
            "areaName": "高家镇",
            "areaId": 559
          },
          {
            "areaName": "虎威镇",
            "areaId": 560
          },
          {
            "areaName": "江池镇",
            "areaId": 561
          },
          {
            "areaName": "龙河镇",
            "areaId": 562
          },
          {
            "areaName": "名山镇",
            "areaId": 563
          },
          {
            "areaName": "三元镇",
            "areaId": 564
          },
          {
            "areaName": "社坛镇",
            "areaId": 565
          },
          {
            "areaName": "十直镇",
            "areaId": 566
          },
          {
            "areaName": "树人镇",
            "areaId": 567
          },
          {
            "areaName": "双路镇",
            "areaId": 568
          },
          {
            "areaName": "武平镇",
            "areaId": 569
          },
          {
            "areaName": "兴义镇",
            "areaId": 570
          },
          {
            "areaName": "湛普镇",
            "areaId": 571
          },
          {
            "areaName": "镇江镇",
            "areaId": 572
          },
          {
            "areaName": "太平坝乡",
            "areaId": 573
          },
          {
            "areaName": "双龙场乡",
            "areaId": 574
          },
          {
            "areaName": "保合乡",
            "areaId": 575
          },
          {
            "areaName": "崇兴乡",
            "areaId": 576
          },
          {
            "areaName": "都督乡",
            "areaId": 577
          },
          {
            "areaName": "暨龙乡",
            "areaId": 578
          },
          {
            "areaName": "栗子乡",
            "areaId": 579
          },
          {
            "areaName": "龙孔乡",
            "areaId": 580
          },
          {
            "areaName": "青龙乡",
            "areaId": 581
          },
          {
            "areaName": "仁沙乡",
            "areaId": 582
          },
          {
            "areaName": "三坝乡",
            "areaId": 583
          },
          {
            "areaName": "三建乡",
            "areaId": 584
          },
          {
            "areaName": "县城内",
            "areaId": 585
          }
        ],
        "areaId": 62
      },
      {
        "areaName": "奉节县",
        "childrenList": [{
            "areaName": "永安镇",
            "areaId": 586
          },
          {
            "areaName": "白帝镇",
            "areaId": 587
          },
          {
            "areaName": "草堂镇",
            "areaId": 588
          },
          {
            "areaName": "大树镇",
            "areaId": 589
          },
          {
            "areaName": "汾河镇",
            "areaId": 590
          },
          {
            "areaName": "公平镇",
            "areaId": 591
          },
          {
            "areaName": "甲高镇",
            "areaId": 592
          },
          {
            "areaName": "康乐镇",
            "areaId": 593
          },
          {
            "areaName": "青龙镇",
            "areaId": 594
          },
          {
            "areaName": "吐祥镇",
            "areaId": 595
          },
          {
            "areaName": "新民镇",
            "areaId": 596
          },
          {
            "areaName": "兴隆镇",
            "areaId": 597
          },
          {
            "areaName": "羊市镇",
            "areaId": 598
          },
          {
            "areaName": "朱衣镇",
            "areaId": 599
          },
          {
            "areaName": "竹园镇",
            "areaId": 600
          },
          {
            "areaName": "安坪乡",
            "areaId": 601
          },
          {
            "areaName": "冯坪乡",
            "areaId": 602
          },
          {
            "areaName": "鹤峰乡",
            "areaId": 603
          },
          {
            "areaName": "红土乡",
            "areaId": 604
          },
          {
            "areaName": "康坪乡",
            "areaId": 605
          },
          {
            "areaName": "龙桥乡",
            "areaId": 606
          },
          {
            "areaName": "平安乡",
            "areaId": 607
          },
          {
            "areaName": "石岗乡",
            "areaId": 608
          },
          {
            "areaName": "太和乡",
            "areaId": 609
          },
          {
            "areaName": "五马乡",
            "areaId": 610
          },
          {
            "areaName": "新政乡",
            "areaId": 611
          },
          {
            "areaName": "岩湾乡",
            "areaId": 612
          },
          {
            "areaName": "云雾乡",
            "areaId": 613
          },
          {
            "areaName": "长安乡",
            "areaId": 614
          },
          {
            "areaName": "县城内",
            "areaId": 615
          },
          {
            "areaName": "永乐镇",
            "areaId": 616
          }
        ],
        "areaId": 63
      },
      {
        "areaName": "开县",
        "childrenList": [{
            "areaName": "汉丰街道",
            "areaId": 617
          },
          {
            "areaName": "白鹤街道",
            "areaId": 618
          },
          {
            "areaName": "丰乐街道",
            "areaId": 619
          },
          {
            "areaName": "镇东街道",
            "areaId": 620
          },
          {
            "areaName": "九龙山镇",
            "areaId": 621
          },
          {
            "areaName": "大进镇",
            "areaId": 622
          },
          {
            "areaName": "敦好镇",
            "areaId": 623
          },
          {
            "areaName": "高桥镇",
            "areaId": 624
          },
          {
            "areaName": "郭家镇",
            "areaId": 625
          },
          {
            "areaName": "和谦镇",
            "areaId": 626
          },
          {
            "areaName": "河堰镇",
            "areaId": 627
          },
          {
            "areaName": "厚坝镇",
            "areaId": 628
          },
          {
            "areaName": "临江镇",
            "areaId": 629
          },
          {
            "areaName": "南门镇",
            "areaId": 630
          },
          {
            "areaName": "南雅镇",
            "areaId": 631
          },
          {
            "areaName": "渠口镇",
            "areaId": 632
          },
          {
            "areaName": "铁桥镇",
            "areaId": 633
          },
          {
            "areaName": "温泉镇",
            "areaId": 634
          },
          {
            "areaName": "义和镇",
            "areaId": 635
          },
          {
            "areaName": "长沙镇",
            "areaId": 636
          },
          {
            "areaName": "赵家镇",
            "areaId": 637
          },
          {
            "areaName": "镇安镇",
            "areaId": 638
          },
          {
            "areaName": "中和镇",
            "areaId": 639
          },
          {
            "areaName": "竹溪镇",
            "areaId": 640
          },
          {
            "areaName": "三汇口乡",
            "areaId": 641
          },
          {
            "areaName": "白桥乡",
            "areaId": 642
          },
          {
            "areaName": "大德乡",
            "areaId": 643
          },
          {
            "areaName": "关面乡",
            "areaId": 644
          },
          {
            "areaName": "金峰乡",
            "areaId": 645
          },
          {
            "areaName": "麻柳乡",
            "areaId": 646
          },
          {
            "areaName": "满月乡",
            "areaId": 647
          },
          {
            "areaName": "谭家乡",
            "areaId": 648
          },
          {
            "areaName": "天和乡",
            "areaId": 649
          },
          {
            "areaName": "巫山镇",
            "areaId": 650
          },
          {
            "areaName": "五通乡",
            "areaId": 651
          },
          {
            "areaName": "紫水乡",
            "areaId": 652
          },
          {
            "areaName": "县城内",
            "areaId": 653
          },
          {
            "areaName": "云枫街道",
            "areaId": 654
          },
          {
            "areaName": "文峰街道",
            "areaId": 655
          },
          {
            "areaName": "白桥镇",
            "areaId": 656
          },
          {
            "areaName": "大德镇",
            "areaId": 657
          },
          {
            "areaName": "金峰镇",
            "areaId": 658
          },
          {
            "areaName": "谭家镇",
            "areaId": 659
          },
          {
            "areaName": "天和镇",
            "areaId": 660
          },
          {
            "areaName": "白泉乡",
            "areaId": 661
          }
        ],
        "areaId": 64
      },
      {
        "areaName": "云阳县",
        "childrenList": [{
            "areaName": "双江街道",
            "areaId": 662
          },
          {
            "areaName": "青龙街道",
            "areaId": 663
          },
          {
            "areaName": "云阳镇",
            "areaId": 664
          },
          {
            "areaName": "巴阳镇",
            "areaId": 665
          },
          {
            "areaName": "凤鸣镇",
            "areaId": 666
          },
          {
            "areaName": "高阳镇",
            "areaId": 667
          },
          {
            "areaName": "故陵镇",
            "areaId": 668
          },
          {
            "areaName": "红狮镇",
            "areaId": 669
          },
          {
            "areaName": "黄石镇",
            "areaId": 670
          },
          {
            "areaName": "江口镇",
            "areaId": 671
          },
          {
            "areaName": "龙角镇",
            "areaId": 672
          },
          {
            "areaName": "路阳镇",
            "areaId": 673
          },
          {
            "areaName": "南溪镇",
            "areaId": 674
          },
          {
            "areaName": "农坝镇",
            "areaId": 675
          },
          {
            "areaName": "盘龙镇",
            "areaId": 676
          },
          {
            "areaName": "平安镇",
            "areaId": 677
          },
          {
            "areaName": "渠马镇",
            "areaId": 678
          },
          {
            "areaName": "人和镇",
            "areaId": 679
          },
          {
            "areaName": "桑坪镇",
            "areaId": 680
          },
          {
            "areaName": "沙市镇",
            "areaId": 681
          },
          {
            "areaName": "双土镇",
            "areaId": 682
          },
          {
            "areaName": "鱼泉镇",
            "areaId": 683
          },
          {
            "areaName": "云安镇",
            "areaId": 684
          },
          {
            "areaName": "洞鹿乡",
            "areaId": 685
          },
          {
            "areaName": "后叶乡",
            "areaId": 686
          },
          {
            "areaName": "龙洞乡",
            "areaId": 687
          },
          {
            "areaName": "毛坝乡",
            "areaId": 688
          },
          {
            "areaName": "泥溪乡",
            "areaId": 689
          },
          {
            "areaName": "票草乡",
            "areaId": 690
          },
          {
            "areaName": "普安乡",
            "areaId": 691
          },
          {
            "areaName": "栖霞乡",
            "areaId": 692
          },
          {
            "areaName": "清水乡",
            "areaId": 693
          },
          {
            "areaName": "上坝乡",
            "areaId": 694
          },
          {
            "areaName": "石门乡",
            "areaId": 695
          },
          {
            "areaName": "双龙乡",
            "areaId": 696
          },
          {
            "areaName": "水口乡",
            "areaId": 697
          },
          {
            "areaName": "外郎乡",
            "areaId": 698
          },
          {
            "areaName": "新津乡",
            "areaId": 699
          },
          {
            "areaName": "堰坪乡",
            "areaId": 700
          },
          {
            "areaName": "养鹿乡",
            "areaId": 701
          },
          {
            "areaName": "耀灵乡",
            "areaId": 702
          },
          {
            "areaName": "云硐乡",
            "areaId": 703
          },
          {
            "areaName": "县城内",
            "areaId": 704
          }
        ],
        "areaId": 65
      },
      {
        "areaName": "忠县",
        "childrenList": [{
            "areaName": "忠州镇",
            "areaId": 705
          },
          {
            "areaName": "拔山镇",
            "areaId": 706
          },
          {
            "areaName": "白石镇",
            "areaId": 707
          },
          {
            "areaName": "东溪镇",
            "areaId": 708
          },
          {
            "areaName": "复兴镇",
            "areaId": 709
          },
          {
            "areaName": "官坝镇",
            "areaId": 710
          },
          {
            "areaName": "花桥镇",
            "areaId": 711
          },
          {
            "areaName": "黄金镇",
            "areaId": 712
          },
          {
            "areaName": "金鸡镇",
            "areaId": 713
          },
          {
            "areaName": "马灌镇",
            "areaId": 714
          },
          {
            "areaName": "任家镇",
            "areaId": 715
          },
          {
            "areaName": "汝溪镇",
            "areaId": 716
          },
          {
            "areaName": "三汇镇",
            "areaId": 717
          },
          {
            "areaName": "石宝镇",
            "areaId": 718
          },
          {
            "areaName": "石黄镇",
            "areaId": 719
          },
          {
            "areaName": "双桂镇",
            "areaId": 720
          },
          {
            "areaName": "乌杨镇",
            "areaId": 721
          },
          {
            "areaName": "新生镇",
            "areaId": 722
          },
          {
            "areaName": "洋渡镇",
            "areaId": 723
          },
          {
            "areaName": "野鹤镇",
            "areaId": 724
          },
          {
            "areaName": "永丰镇",
            "areaId": 725
          },
          {
            "areaName": "金声乡",
            "areaId": 726
          },
          {
            "areaName": "磨子乡",
            "areaId": 727
          },
          {
            "areaName": "善广乡",
            "areaId": 728
          },
          {
            "areaName": "石子乡",
            "areaId": 729
          },
          {
            "areaName": "涂井乡",
            "areaId": 730
          },
          {
            "areaName": "兴峰乡",
            "areaId": 731
          },
          {
            "areaName": "新立镇",
            "areaId": 732
          },
          {
            "areaName": "县城内",
            "areaId": 733
          }
        ],
        "areaId": 66
      },
      {
        "areaName": "巫溪县",
        "childrenList": [{
            "areaName": "城厢镇",
            "areaId": 734
          },
          {
            "areaName": "凤凰镇",
            "areaId": 735
          },
          {
            "areaName": "古路镇",
            "areaId": 736
          },
          {
            "areaName": "尖山镇",
            "areaId": 737
          },
          {
            "areaName": "宁厂镇",
            "areaId": 738
          },
          {
            "areaName": "上磺镇",
            "areaId": 739
          },
          {
            "areaName": "文峰镇",
            "areaId": 740
          },
          {
            "areaName": "下堡镇",
            "areaId": 741
          },
          {
            "areaName": "徐家镇",
            "areaId": 742
          },
          {
            "areaName": "朝阳洞乡",
            "areaId": 743
          },
          {
            "areaName": "大河乡",
            "areaId": 744
          },
          {
            "areaName": "峰灵乡",
            "areaId": 745
          },
          {
            "areaName": "花台乡",
            "areaId": 746
          },
          {
            "areaName": "兰英乡",
            "areaId": 747
          },
          {
            "areaName": "菱角乡",
            "areaId": 748
          },
          {
            "areaName": "蒲莲乡",
            "areaId": 749
          },
          {
            "areaName": "胜利乡",
            "areaId": 750
          },
          {
            "areaName": "双阳乡",
            "areaId": 751
          },
          {
            "areaName": "塘坊乡",
            "areaId": 752
          },
          {
            "areaName": "天星乡",
            "areaId": 753
          },
          {
            "areaName": "天元乡",
            "areaId": 754
          },
          {
            "areaName": "田坝乡",
            "areaId": 755
          },
          {
            "areaName": "通城乡",
            "areaId": 756
          },
          {
            "areaName": "土城乡",
            "areaId": 757
          },
          {
            "areaName": "乌龙乡",
            "areaId": 758
          },
          {
            "areaName": "鱼鳞乡",
            "areaId": 759
          },
          {
            "areaName": "长桂乡",
            "areaId": 760
          },
          {
            "areaName": "中岗乡",
            "areaId": 761
          },
          {
            "areaName": "中梁乡",
            "areaId": 762
          },
          {
            "areaName": "县城内",
            "areaId": 763
          }
        ],
        "areaId": 67
      },
      {
        "areaName": "巫山县",
        "childrenList": [{
            "areaName": "巫峡镇",
            "areaId": 764
          },
          {
            "areaName": "大昌镇",
            "areaId": 765
          },
          {
            "areaName": "福田镇",
            "areaId": 766
          },
          {
            "areaName": "官渡镇",
            "areaId": 767
          },
          {
            "areaName": "官阳镇",
            "areaId": 768
          },
          {
            "areaName": "龙溪镇",
            "areaId": 769
          },
          {
            "areaName": "骡坪镇",
            "areaId": 770
          },
          {
            "areaName": "庙堂乡",
            "areaId": 771
          },
          {
            "areaName": "庙宇镇",
            "areaId": 772
          },
          {
            "areaName": "双龙镇",
            "areaId": 773
          },
          {
            "areaName": "铜鼓镇",
            "areaId": 774
          },
          {
            "areaName": "抱龙镇",
            "areaId": 775
          },
          {
            "areaName": "大溪乡",
            "areaId": 776
          },
          {
            "areaName": "当阳乡",
            "areaId": 777
          },
          {
            "areaName": "邓家乡",
            "areaId": 778
          },
          {
            "areaName": "笃坪乡",
            "areaId": 779
          },
          {
            "areaName": "红椿乡",
            "areaId": 780
          },
          {
            "areaName": "建平乡",
            "areaId": 781
          },
          {
            "areaName": "金坪乡",
            "areaId": 782
          },
          {
            "areaName": "两坪乡",
            "areaId": 783
          },
          {
            "areaName": "龙井乡",
            "areaId": 784
          },
          {
            "areaName": "培石乡",
            "areaId": 785
          },
          {
            "areaName": "平河乡",
            "areaId": 786
          },
          {
            "areaName": "曲尺乡",
            "areaId": 787
          },
          {
            "areaName": "三溪乡",
            "areaId": 788
          },
          {
            "areaName": "竹贤乡",
            "areaId": 789
          },
          {
            "areaName": "县城内",
            "areaId": 790
          }
        ],
        "areaId": 68
      },
      {
        "areaName": "石柱县",
        "childrenList": [{
            "areaName": "南宾镇",
            "areaId": 791
          },
          {
            "areaName": "黄水镇",
            "areaId": 792
          },
          {
            "areaName": "临溪镇",
            "areaId": 793
          },
          {
            "areaName": "龙沙镇",
            "areaId": 794
          },
          {
            "areaName": "马武镇",
            "areaId": 795
          },
          {
            "areaName": "沙子镇",
            "areaId": 796
          },
          {
            "areaName": "王场镇",
            "areaId": 797
          },
          {
            "areaName": "西沱镇",
            "areaId": 798
          },
          {
            "areaName": "下路镇",
            "areaId": 799
          },
          {
            "areaName": "沿溪镇",
            "areaId": 800
          },
          {
            "areaName": "渔池镇",
            "areaId": 801
          },
          {
            "areaName": "悦崃镇",
            "areaId": 802
          },
          {
            "areaName": "大歇乡",
            "areaId": 803
          },
          {
            "areaName": "枫木乡",
            "areaId": 804
          },
          {
            "areaName": "河嘴乡",
            "areaId": 805
          },
          {
            "areaName": "黄鹤乡",
            "areaId": 806
          },
          {
            "areaName": "金铃乡",
            "areaId": 807
          },
          {
            "areaName": "金竹乡",
            "areaId": 808
          },
          {
            "areaName": "冷水乡",
            "areaId": 809
          },
          {
            "areaName": "黎场乡",
            "areaId": 810
          },
          {
            "areaName": "六塘乡",
            "areaId": 811
          },
          {
            "areaName": "龙潭乡",
            "areaId": 812
          },
          {
            "areaName": "桥头乡",
            "areaId": 813
          },
          {
            "areaName": "三河乡",
            "areaId": 814
          },
          {
            "areaName": "三益乡",
            "areaId": 815
          },
          {
            "areaName": "石家乡",
            "areaId": 816
          },
          {
            "areaName": "万朝乡",
            "areaId": 817
          },
          {
            "areaName": "王家乡",
            "areaId": 818
          },
          {
            "areaName": "洗新乡",
            "areaId": 819
          },
          {
            "areaName": "新乐乡",
            "areaId": 820
          },
          {
            "areaName": "中益乡",
            "areaId": 821
          },
          {
            "areaName": "县城内",
            "areaId": 822
          }
        ],
        "areaId": 69
      },
      {
        "areaName": "彭水县",
        "childrenList": [{
            "areaName": "汉葭街道",
            "areaId": 823
          },
          {
            "areaName": "保家镇",
            "areaId": 824
          },
          {
            "areaName": "高谷镇",
            "areaId": 825
          },
          {
            "areaName": "黄家镇",
            "areaId": 826
          },
          {
            "areaName": "连湖镇",
            "areaId": 827
          },
          {
            "areaName": "龙射镇",
            "areaId": 828
          },
          {
            "areaName": "鹿角镇",
            "areaId": 829
          },
          {
            "areaName": "普子镇",
            "areaId": 830
          },
          {
            "areaName": "桑柘镇",
            "areaId": 831
          },
          {
            "areaName": "万足镇",
            "areaId": 832
          },
          {
            "areaName": "郁山镇",
            "areaId": 833
          },
          {
            "areaName": "梅子垭乡",
            "areaId": 834
          },
          {
            "areaName": "鞍子乡",
            "areaId": 835
          },
          {
            "areaName": "大垭乡",
            "areaId": 836
          },
          {
            "areaName": "棣棠乡",
            "areaId": 837
          },
          {
            "areaName": "靛水乡",
            "areaId": 838
          },
          {
            "areaName": "朗溪乡",
            "areaId": 839
          },
          {
            "areaName": "联合乡",
            "areaId": 840
          },
          {
            "areaName": "龙塘乡",
            "areaId": 841
          },
          {
            "areaName": "龙溪乡",
            "areaId": 842
          },
          {
            "areaName": "芦塘乡",
            "areaId": 843
          },
          {
            "areaName": "鹿鸣乡",
            "areaId": 844
          },
          {
            "areaName": "平安乡",
            "areaId": 845
          },
          {
            "areaName": "迁乔乡",
            "areaId": 846
          },
          {
            "areaName": "乔梓乡",
            "areaId": 847
          },
          {
            "areaName": "润溪乡",
            "areaId": 848
          },
          {
            "areaName": "三义乡",
            "areaId": 849
          },
          {
            "areaName": "善感乡",
            "areaId": 850
          },
          {
            "areaName": "石柳乡",
            "areaId": 851
          },
          {
            "areaName": "石盘乡",
            "areaId": 852
          },
          {
            "areaName": "双龙乡",
            "areaId": 853
          },
          {
            "areaName": "太原乡",
            "areaId": 854
          },
          {
            "areaName": "桐楼乡",
            "areaId": 855
          },
          {
            "areaName": "小厂乡",
            "areaId": 856
          },
          {
            "areaName": "新田乡",
            "areaId": 857
          },
          {
            "areaName": "岩东乡",
            "areaId": 858
          },
          {
            "areaName": "长滩乡",
            "areaId": 859
          },
          {
            "areaName": "诸佛乡",
            "areaId": 860
          },
          {
            "areaName": "走马乡",
            "areaId": 861
          },
          {
            "areaName": "县城内",
            "areaId": 862
          }
        ],
        "areaId": 70
      },
      {
        "areaName": "垫江县",
        "childrenList": [{
            "areaName": "桂溪镇",
            "areaId": 863
          },
          {
            "areaName": "澄溪镇",
            "areaId": 864
          },
          {
            "areaName": "高安镇",
            "areaId": 865
          },
          {
            "areaName": "高峰镇",
            "areaId": 866
          },
          {
            "areaName": "鹤游镇",
            "areaId": 867
          },
          {
            "areaName": "普顺镇",
            "areaId": 868
          },
          {
            "areaName": "沙坪镇",
            "areaId": 869
          },
          {
            "areaName": "太平镇",
            "areaId": 870
          },
          {
            "areaName": "五洞镇",
            "areaId": 871
          },
          {
            "areaName": "新民镇",
            "areaId": 872
          },
          {
            "areaName": "砚台镇",
            "areaId": 873
          },
          {
            "areaName": "永安镇",
            "areaId": 874
          },
          {
            "areaName": "周嘉镇",
            "areaId": 875
          },
          {
            "areaName": "白家乡",
            "areaId": 876
          },
          {
            "areaName": "包家乡",
            "areaId": 877
          },
          {
            "areaName": "曹回乡",
            "areaId": 878
          },
          {
            "areaName": "大石乡",
            "areaId": 879
          },
          {
            "areaName": "杠家乡",
            "areaId": 880
          },
          {
            "areaName": "黄沙乡",
            "areaId": 881
          },
          {
            "areaName": "裴兴乡",
            "areaId": 882
          },
          {
            "areaName": "三溪乡",
            "areaId": 883
          },
          {
            "areaName": "沙河乡",
            "areaId": 884
          },
          {
            "areaName": "永平乡",
            "areaId": 885
          },
          {
            "areaName": "长龙乡",
            "areaId": 886
          },
          {
            "areaName": "坪山镇",
            "areaId": 887
          },
          {
            "areaName": "县城内",
            "areaId": 888
          }
        ],
        "areaId": 71
      },
      {
        "areaName": "酉阳县",
        "childrenList": [{
            "areaName": "钟多镇",
            "areaId": 889
          },
          {
            "areaName": "苍岭镇",
            "areaId": 890
          },
          {
            "areaName": "车田乡",
            "areaId": 891
          },
          {
            "areaName": "大溪镇",
            "areaId": 892
          },
          {
            "areaName": "丁市镇",
            "areaId": 893
          },
          {
            "areaName": "泔溪镇",
            "areaId": 894
          },
          {
            "areaName": "龚滩镇",
            "areaId": 895
          },
          {
            "areaName": "黑水镇",
            "areaId": 896
          },
          {
            "areaName": "后溪镇",
            "areaId": 897
          },
          {
            "areaName": "李溪镇",
            "areaId": 898
          },
          {
            "areaName": "龙潭镇",
            "areaId": 899
          },
          {
            "areaName": "麻旺镇",
            "areaId": 900
          },
          {
            "areaName": "小河镇",
            "areaId": 901
          },
          {
            "areaName": "兴隆镇",
            "areaId": 902
          },
          {
            "areaName": "酉酬镇",
            "areaId": 903
          },
          {
            "areaName": "南腰界乡",
            "areaId": 904
          },
          {
            "areaName": "后坪坝乡",
            "areaId": 905
          },
          {
            "areaName": "板溪乡",
            "areaId": 906
          },
          {
            "areaName": "官清乡",
            "areaId": 907
          },
          {
            "areaName": "花田乡",
            "areaId": 908
          },
          {
            "areaName": "江丰乡",
            "areaId": 909
          },
          {
            "areaName": "可大乡",
            "areaId": 910
          },
          {
            "areaName": "浪坪乡",
            "areaId": 911
          },
          {
            "areaName": "两罾乡",
            "areaId": 912
          },
          {
            "areaName": "毛坝乡",
            "areaId": 913
          },
          {
            "areaName": "庙溪乡",
            "areaId": 914
          },
          {
            "areaName": "木叶乡",
            "areaId": 915
          },
          {
            "areaName": "楠木乡",
            "areaId": 916
          },
          {
            "areaName": "偏柏乡",
            "areaId": 917
          },
          {
            "areaName": "清泉乡",
            "areaId": 918
          },
          {
            "areaName": "双泉乡",
            "areaId": 919
          },
          {
            "areaName": "天馆乡",
            "areaId": 920
          },
          {
            "areaName": "铜鼓乡",
            "areaId": 921
          },
          {
            "areaName": "涂市乡",
            "areaId": 922
          },
          {
            "areaName": "万木乡",
            "areaId": 923
          },
          {
            "areaName": "五福乡",
            "areaId": 924
          },
          {
            "areaName": "宜居乡",
            "areaId": 925
          },
          {
            "areaName": "腴地乡",
            "areaId": 926
          },
          {
            "areaName": "板桥乡",
            "areaId": 927
          },
          {
            "areaName": "县城内",
            "areaId": 928
          }
        ],
        "areaId": 72
      },
      {
        "areaName": "秀山县",
        "childrenList": [{
            "areaName": "清溪场镇",
            "areaId": 929
          },
          {
            "areaName": "中和镇",
            "areaId": 930
          },
          {
            "areaName": "隘口镇",
            "areaId": 931
          },
          {
            "areaName": "峨溶镇",
            "areaId": 932
          },
          {
            "areaName": "官庄镇",
            "areaId": 933
          },
          {
            "areaName": "洪安镇",
            "areaId": 934
          },
          {
            "areaName": "兰桥镇",
            "areaId": 935
          },
          {
            "areaName": "龙池镇",
            "areaId": 936
          },
          {
            "areaName": "梅江镇",
            "areaId": 937
          },
          {
            "areaName": "平凯镇",
            "areaId": 938
          },
          {
            "areaName": "溶溪镇",
            "areaId": 939
          },
          {
            "areaName": "石堤镇",
            "areaId": 940
          },
          {
            "areaName": "石耶镇",
            "areaId": 941
          },
          {
            "areaName": "雅江镇",
            "areaId": 942
          },
          {
            "areaName": "巴家乡",
            "areaId": 943
          },
          {
            "areaName": "保安乡",
            "areaId": 944
          },
          {
            "areaName": "岑溪乡",
            "areaId": 945
          },
          {
            "areaName": "大溪乡",
            "areaId": 946
          },
          {
            "areaName": "干川乡",
            "areaId": 947
          },
          {
            "areaName": "膏田乡",
            "areaId": 948
          },
          {
            "areaName": "官舟乡",
            "areaId": 949
          },
          {
            "areaName": "海洋乡",
            "areaId": 950
          },
          {
            "areaName": "里仁乡",
            "areaId": 951
          },
          {
            "areaName": "妙泉乡",
            "areaId": 952
          },
          {
            "areaName": "平马乡",
            "areaId": 953
          },
          {
            "areaName": "宋农乡",
            "areaId": 954
          },
          {
            "areaName": "溪口乡",
            "areaId": 955
          },
          {
            "areaName": "孝溪乡",
            "areaId": 956
          },
          {
            "areaName": "涌洞乡",
            "areaId": 957
          },
          {
            "areaName": "中平乡",
            "areaId": 958
          },
          {
            "areaName": "钟灵乡",
            "areaId": 959
          },
          {
            "areaName": "县城内",
            "areaId": 960
          }
        ],
        "areaId": 73
      },
      {
        "areaName": "城口县",
        "childrenList": [{
            "areaName": "葛城镇",
            "areaId": 961
          },
          {
            "areaName": "巴山镇",
            "areaId": 962
          },
          {
            "areaName": "高观镇",
            "areaId": 963
          },
          {
            "areaName": "庙坝镇",
            "areaId": 964
          },
          {
            "areaName": "明通镇",
            "areaId": 965
          },
          {
            "areaName": "坪坝镇",
            "areaId": 966
          },
          {
            "areaName": "修齐镇",
            "areaId": 967
          },
          {
            "areaName": "北屏乡",
            "areaId": 968
          },
          {
            "areaName": "东安乡",
            "areaId": 969
          },
          {
            "areaName": "高楠乡",
            "areaId": 970
          },
          {
            "areaName": "高燕乡",
            "areaId": 971
          },
          {
            "areaName": "河鱼乡",
            "areaId": 972
          },
          {
            "areaName": "厚坪乡",
            "areaId": 973
          },
          {
            "areaName": "鸡鸣乡",
            "areaId": 974
          },
          {
            "areaName": "岚天乡",
            "areaId": 975
          },
          {
            "areaName": "蓼子乡",
            "areaId": 976
          },
          {
            "areaName": "龙田乡",
            "areaId": 977
          },
          {
            "areaName": "明中乡",
            "areaId": 978
          },
          {
            "areaName": "双河乡",
            "areaId": 979
          },
          {
            "areaName": "咸宜乡",
            "areaId": 980
          },
          {
            "areaName": "沿河乡",
            "areaId": 981
          },
          {
            "areaName": "治平乡",
            "areaId": 982
          },
          {
            "areaName": "周溪乡",
            "areaId": 983
          },
          {
            "areaName": "左岚乡",
            "areaId": 984
          },
          {
            "areaName": "县城内",
            "areaId": 985
          }
        ],
        "areaId": 74
      },
      {
        "areaName": "璧山县",
        "childrenList": [{
            "areaName": "县城内",
            "areaId": 986
          },
          {
            "areaName": "璧城街道",
            "areaId": 987
          },
          {
            "areaName": "璧泉街道",
            "areaId": 988
          },
          {
            "areaName": "青杠街道",
            "areaId": 989
          },
          {
            "areaName": "来凤街道",
            "areaId": 990
          },
          {
            "areaName": "丁家街道",
            "areaId": 991
          },
          {
            "areaName": "大路街道",
            "areaId": 992
          },
          {
            "areaName": "八塘镇",
            "areaId": 993
          },
          {
            "areaName": "七塘镇",
            "areaId": 994
          },
          {
            "areaName": "河边镇",
            "areaId": 995
          },
          {
            "areaName": "福禄镇",
            "areaId": 996
          },
          {
            "areaName": "大兴镇",
            "areaId": 997
          },
          {
            "areaName": "正兴镇",
            "areaId": 998
          },
          {
            "areaName": "广普镇",
            "areaId": 999
          },
          {
            "areaName": "三合镇",
            "areaId": 1000
          },
          {
            "areaName": "健龙镇",
            "areaId": 1001
          }
        ],
        "areaId": 75
      },
      {
        "areaName": "荣昌县",
        "childrenList": [{
            "areaName": "县城内",
            "areaId": 1002
          },
          {
            "areaName": "昌元街道",
            "areaId": 1003
          },
          {
            "areaName": "昌洲街道",
            "areaId": 1004
          },
          {
            "areaName": "广顺街道",
            "areaId": 1005
          },
          {
            "areaName": "安富街道",
            "areaId": 1006
          },
          {
            "areaName": "峰高街道",
            "areaId": 1007
          },
          {
            "areaName": "双河街道",
            "areaId": 1008
          },
          {
            "areaName": "直升镇",
            "areaId": 1009
          },
          {
            "areaName": "路孔镇",
            "areaId": 1010
          },
          {
            "areaName": "清江镇",
            "areaId": 1011
          },
          {
            "areaName": "仁义镇",
            "areaId": 1012
          },
          {
            "areaName": "河包镇",
            "areaId": 1013
          },
          {
            "areaName": "古昌镇",
            "areaId": 1014
          },
          {
            "areaName": "吴家镇",
            "areaId": 1015
          },
          {
            "areaName": "观胜镇",
            "areaId": 1016
          },
          {
            "areaName": "铜鼓镇",
            "areaId": 1017
          },
          {
            "areaName": "清流镇",
            "areaId": 1018
          },
          {
            "areaName": "盘龙镇",
            "areaId": 1019
          },
          {
            "areaName": "远觉镇",
            "areaId": 1020
          },
          {
            "areaName": "清升镇",
            "areaId": 1021
          },
          {
            "areaName": "荣隆镇",
            "areaId": 1022
          },
          {
            "areaName": "龙集镇",
            "areaId": 1023
          }
        ],
        "areaId": 76
      },
      {
        "areaName": "铜梁县",
        "childrenList": [{
            "areaName": "县城内",
            "areaId": 1024
          },
          {
            "areaName": "巴川街道",
            "areaId": 1025
          },
          {
            "areaName": "东城街道",
            "areaId": 1026
          },
          {
            "areaName": "南城街道",
            "areaId": 1027
          },
          {
            "areaName": "土桥镇",
            "areaId": 1028
          },
          {
            "areaName": "二坪镇",
            "areaId": 1029
          },
          {
            "areaName": "水口镇",
            "areaId": 1030
          },
          {
            "areaName": "安居镇",
            "areaId": 1031
          },
          {
            "areaName": "白羊镇",
            "areaId": 1032
          },
          {
            "areaName": "平滩镇",
            "areaId": 1033
          },
          {
            "areaName": "石鱼镇",
            "areaId": 1034
          },
          {
            "areaName": "福果镇",
            "areaId": 1035
          },
          {
            "areaName": "维新镇",
            "areaId": 1036
          },
          {
            "areaName": "高楼镇",
            "areaId": 1037
          },
          {
            "areaName": "大庙镇",
            "areaId": 1038
          },
          {
            "areaName": "围龙镇",
            "areaId": 1039
          },
          {
            "areaName": "华兴镇",
            "areaId": 1040
          },
          {
            "areaName": "永嘉镇",
            "areaId": 1041
          },
          {
            "areaName": "安溪镇",
            "areaId": 1042
          },
          {
            "areaName": "西河镇",
            "areaId": 1043
          },
          {
            "areaName": "太平镇",
            "areaId": 1044
          },
          {
            "areaName": "旧县镇",
            "areaId": 1045
          },
          {
            "areaName": "虎峰镇",
            "areaId": 1046
          },
          {
            "areaName": "少云镇",
            "areaId": 1047
          },
          {
            "areaName": "蒲吕镇",
            "areaId": 1048
          },
          {
            "areaName": "侣俸镇",
            "areaId": 1049
          },
          {
            "areaName": "小林乡",
            "areaId": 1050
          },
          {
            "areaName": "双山乡",
            "areaId": 1051
          },
          {
            "areaName": "庆隆乡",
            "areaId": 1052
          }
        ],
        "areaId": 77
      },
      {
        "areaName": "合川区",
        "childrenList": [{
            "areaName": "南津街道",
            "areaId": 1053
          },
          {
            "areaName": "合阳城街道",
            "areaId": 1054
          },
          {
            "areaName": "钓鱼城街道",
            "areaId": 1055
          },
          {
            "areaName": "草街街道",
            "areaId": 1056
          },
          {
            "areaName": "盐井街道",
            "areaId": 1057
          },
          {
            "areaName": "云门街道",
            "areaId": 1058
          },
          {
            "areaName": "大石街道",
            "areaId": 1059
          },
          {
            "areaName": "沙鱼镇",
            "areaId": 1060
          },
          {
            "areaName": "官渡镇",
            "areaId": 1061
          },
          {
            "areaName": "涞滩镇",
            "areaId": 1062
          },
          {
            "areaName": "肖家镇",
            "areaId": 1063
          },
          {
            "areaName": "古楼镇",
            "areaId": 1064
          },
          {
            "areaName": "三庙镇",
            "areaId": 1065
          },
          {
            "areaName": "二郎镇",
            "areaId": 1066
          },
          {
            "areaName": "龙凤镇",
            "areaId": 1067
          },
          {
            "areaName": "隆兴镇",
            "areaId": 1068
          },
          {
            "areaName": "铜溪镇",
            "areaId": 1069
          },
          {
            "areaName": "双凤镇",
            "areaId": 1070
          },
          {
            "areaName": "狮滩镇",
            "areaId": 1071
          },
          {
            "areaName": "清平镇",
            "areaId": 1072
          },
          {
            "areaName": "土场镇",
            "areaId": 1073
          },
          {
            "areaName": "小沔镇",
            "areaId": 1074
          },
          {
            "areaName": "三汇镇",
            "areaId": 1075
          },
          {
            "areaName": "香龙镇",
            "areaId": 1076
          },
          {
            "areaName": "钱塘镇",
            "areaId": 1077
          },
          {
            "areaName": "龙市镇",
            "areaId": 1078
          },
          {
            "areaName": "燕窝镇",
            "areaId": 1079
          },
          {
            "areaName": "太和镇",
            "areaId": 1080
          },
          {
            "areaName": "渭沱镇",
            "areaId": 1081
          },
          {
            "areaName": "双槐镇",
            "areaId": 1082
          }
        ],
        "areaId": 78
      },
      {
        "areaName": "巴南区",
        "childrenList": [{
            "areaName": "鱼洞街道",
            "areaId": 1083
          },
          {
            "areaName": "花溪街道",
            "areaId": 1084
          },
          {
            "areaName": "龙洲湾街道",
            "areaId": 1085
          },
          {
            "areaName": "李家沱街道",
            "areaId": 1086
          },
          {
            "areaName": "南泉街道",
            "areaId": 1087
          },
          {
            "areaName": "一品街道",
            "areaId": 1088
          },
          {
            "areaName": "南彭街道",
            "areaId": 1089
          },
          {
            "areaName": "惠民街道",
            "areaId": 1090
          },
          {
            "areaName": "麻柳嘴镇",
            "areaId": 1091
          },
          {
            "areaName": "天星寺镇",
            "areaId": 1092
          },
          {
            "areaName": "双河口镇",
            "areaId": 1093
          },
          {
            "areaName": "界石镇",
            "areaId": 1094
          },
          {
            "areaName": "安澜镇",
            "areaId": 1095
          },
          {
            "areaName": "跳石镇",
            "areaId": 1096
          },
          {
            "areaName": "木洞镇",
            "areaId": 1097
          },
          {
            "areaName": "丰盛镇",
            "areaId": 1098
          },
          {
            "areaName": "二圣镇",
            "areaId": 1099
          },
          {
            "areaName": "东泉镇",
            "areaId": 1100
          },
          {
            "areaName": "姜家镇",
            "areaId": 1101
          },
          {
            "areaName": "接龙镇",
            "areaId": 1102
          },
          {
            "areaName": "石滩镇",
            "areaId": 1103
          },
          {
            "areaName": "石龙镇",
            "areaId": 1104
          }
        ],
        "areaId": 79
      },
      {
        "areaName": "北碚区",
        "childrenList": [{
            "areaName": "北温泉街道",
            "areaId": 1105
          },
          {
            "areaName": "龙凤桥街道",
            "areaId": 1106
          },
          {
            "areaName": "天生街道",
            "areaId": 1107
          },
          {
            "areaName": "东阳街道",
            "areaId": 1108
          },
          {
            "areaName": "朝阳街道",
            "areaId": 1109
          },
          {
            "areaName": "蔡家岗镇",
            "areaId": 1110
          },
          {
            "areaName": "童家溪镇",
            "areaId": 1111
          },
          {
            "areaName": "施家梁镇",
            "areaId": 1112
          },
          {
            "areaName": "金刀峡镇",
            "areaId": 1113
          },
          {
            "areaName": "澄江镇",
            "areaId": 1114
          },
          {
            "areaName": "水土镇",
            "areaId": 1115
          },
          {
            "areaName": "歇马镇",
            "areaId": 1116
          },
          {
            "areaName": "天府镇",
            "areaId": 1117
          },
          {
            "areaName": "复兴镇",
            "areaId": 1118
          },
          {
            "areaName": "静观镇",
            "areaId": 1119
          },
          {
            "areaName": "柳荫镇",
            "areaId": 1120
          },
          {
            "areaName": "三圣镇",
            "areaId": 1121
          }
        ],
        "areaId": 80
      },
      {
        "areaName": "江津区",
        "childrenList": [{
            "areaName": "几江街道",
            "areaId": 1122
          },
          {
            "areaName": "德感街道",
            "areaId": 1123
          },
          {
            "areaName": "鼎山街道",
            "areaId": 1124
          },
          {
            "areaName": "双福街道",
            "areaId": 1125
          },
          {
            "areaName": "四面山镇",
            "areaId": 1126
          },
          {
            "areaName": "支坪镇",
            "areaId": 1127
          },
          {
            "areaName": "白沙镇",
            "areaId": 1128
          },
          {
            "areaName": "珞璜镇",
            "areaId": 1129
          },
          {
            "areaName": "柏林镇",
            "areaId": 1130
          },
          {
            "areaName": "蔡家镇",
            "areaId": 1131
          },
          {
            "areaName": "慈云镇",
            "areaId": 1132
          },
          {
            "areaName": "杜市镇",
            "areaId": 1133
          },
          {
            "areaName": "广兴镇",
            "areaId": 1134
          },
          {
            "areaName": "嘉平镇",
            "areaId": 1135
          },
          {
            "areaName": "贾嗣镇",
            "areaId": 1136
          },
          {
            "areaName": "李市镇",
            "areaId": 1137
          },
          {
            "areaName": "龙华镇",
            "areaId": 1138
          },
          {
            "areaName": "石蟆镇",
            "areaId": 1139
          },
          {
            "areaName": "石门镇",
            "areaId": 1140
          },
          {
            "areaName": "塘河镇",
            "areaId": 1141
          },
          {
            "areaName": "吴滩镇",
            "areaId": 1142
          },
          {
            "areaName": "西湖镇",
            "areaId": 1143
          },
          {
            "areaName": "夏坝镇",
            "areaId": 1144
          },
          {
            "areaName": "先锋镇",
            "areaId": 1145
          },
          {
            "areaName": "永兴镇",
            "areaId": 1146
          },
          {
            "areaName": "油溪镇",
            "areaId": 1147
          },
          {
            "areaName": "中山镇",
            "areaId": 1148
          },
          {
            "areaName": "朱杨镇",
            "areaId": 1149
          }
        ],
        "areaId": 81
      },
      {
        "areaName": "渝北区",
        "childrenList": [{
            "areaName": "双凤桥街道",
            "areaId": 1150
          },
          {
            "areaName": "双龙湖街道",
            "areaId": 1151
          },
          {
            "areaName": "大竹林街道",
            "areaId": 1152
          },
          {
            "areaName": "天宫殿街道",
            "areaId": 1153
          },
          {
            "areaName": "翠云街道",
            "areaId": 1154
          },
          {
            "areaName": "人和街道",
            "areaId": 1155
          },
          {
            "areaName": "鸳鸯街道",
            "areaId": 1156
          },
          {
            "areaName": "礼嘉街道",
            "areaId": 1157
          },
          {
            "areaName": "回兴街道",
            "areaId": 1158
          },
          {
            "areaName": "龙山街道",
            "areaId": 1159
          },
          {
            "areaName": "龙塔街道",
            "areaId": 1160
          },
          {
            "areaName": "龙溪街道",
            "areaId": 1161
          },
          {
            "areaName": "两路街道",
            "areaId": 1162
          },
          {
            "areaName": "王家街道",
            "areaId": 1163
          },
          {
            "areaName": "悦来街道",
            "areaId": 1164
          },
          {
            "areaName": "玉峰山镇",
            "areaId": 1165
          },
          {
            "areaName": "茨竹镇",
            "areaId": 1166
          },
          {
            "areaName": "大盛镇",
            "areaId": 1167
          },
          {
            "areaName": "大塆镇",
            "areaId": 1168
          },
          {
            "areaName": "古路镇",
            "areaId": 1169
          },
          {
            "areaName": "龙兴镇",
            "areaId": 1170
          },
          {
            "areaName": "洛碛镇",
            "areaId": 1171
          },
          {
            "areaName": "木耳镇",
            "areaId": 1172
          },
          {
            "areaName": "石船镇",
            "areaId": 1173
          },
          {
            "areaName": "统景镇",
            "areaId": 1174
          },
          {
            "areaName": "兴隆镇",
            "areaId": 1175
          }
        ],
        "areaId": 82
      },
      {
        "areaName": "长寿区",
        "childrenList": [{
            "areaName": "凤城街道",
            "areaId": 1176
          },
          {
            "areaName": "晏家街道",
            "areaId": 1177
          },
          {
            "areaName": "渡舟街道",
            "areaId": 1178
          },
          {
            "areaName": "江南街道",
            "areaId": 1179
          },
          {
            "areaName": "长寿湖镇",
            "areaId": 1180
          },
          {
            "areaName": "邻封镇",
            "areaId": 1181
          },
          {
            "areaName": "但渡镇",
            "areaId": 1182
          },
          {
            "areaName": "云集镇",
            "areaId": 1183
          },
          {
            "areaName": "双龙镇",
            "areaId": 1184
          },
          {
            "areaName": "龙河镇",
            "areaId": 1185
          },
          {
            "areaName": "石堰镇",
            "areaId": 1186
          },
          {
            "areaName": "云台镇",
            "areaId": 1187
          },
          {
            "areaName": "海棠镇",
            "areaId": 1188
          },
          {
            "areaName": "葛兰镇",
            "areaId": 1189
          },
          {
            "areaName": "新市镇",
            "areaId": 1190
          },
          {
            "areaName": "八颗镇",
            "areaId": 1191
          },
          {
            "areaName": "洪湖镇",
            "areaId": 1192
          },
          {
            "areaName": "万顺镇",
            "areaId": 1193
          }
        ],
        "areaId": 83
      },
      {
        "areaName": "永川区",
        "childrenList": [{
            "areaName": "中山路街道",
            "areaId": 1194
          },
          {
            "areaName": "胜利路街道",
            "areaId": 1195
          },
          {
            "areaName": "南大街街道",
            "areaId": 1196
          },
          {
            "areaName": "卫星湖街道",
            "areaId": 1197
          },
          {
            "areaName": "茶山竹海街道",
            "areaId": 1198
          },
          {
            "areaName": "大安街道",
            "areaId": 1199
          },
          {
            "areaName": "陈食街道",
            "areaId": 1200
          },
          {
            "areaName": "板桥镇",
            "areaId": 1201
          },
          {
            "areaName": "宝峰镇",
            "areaId": 1202
          },
          {
            "areaName": "临江镇",
            "areaId": 1203
          },
          {
            "areaName": "红炉镇",
            "areaId": 1204
          },
          {
            "areaName": "吉安镇",
            "areaId": 1205
          },
          {
            "areaName": "金龙镇",
            "areaId": 1206
          },
          {
            "areaName": "来苏镇",
            "areaId": 1207
          },
          {
            "areaName": "青峰镇",
            "areaId": 1208
          },
          {
            "areaName": "三教镇",
            "areaId": 1209
          },
          {
            "areaName": "双石镇",
            "areaId": 1210
          },
          {
            "areaName": "松溉镇",
            "areaId": 1211
          },
          {
            "areaName": "五间镇",
            "areaId": 1212
          },
          {
            "areaName": "仙龙镇",
            "areaId": 1213
          },
          {
            "areaName": "永荣镇",
            "areaId": 1214
          },
          {
            "areaName": "朱沱镇",
            "areaId": 1215
          },
          {
            "areaName": "何埂镇",
            "areaId": 1216
          }
        ],
        "areaId": 84
      },
      {
        "areaName": "江北区",
        "childrenList": [{
            "areaName": "内环以内",
            "areaId": 1217
          },
          {
            "areaName": "寸滩街道",
            "areaId": 1218
          },
          {
            "areaName": "郭家沱街道",
            "areaId": 1219
          },
          {
            "areaName": "铁山坪街道",
            "areaId": 1220
          },
          {
            "areaName": "鱼嘴镇",
            "areaId": 1221
          },
          {
            "areaName": "复盛镇",
            "areaId": 1222
          },
          {
            "areaName": "五宝镇",
            "areaId": 1223
          },
          {
            "areaName": "大石坝街道",
            "areaId": 1224
          }
        ],
        "areaId": 85
      },
      {
        "areaName": "南岸区",
        "childrenList": [{
            "areaName": "内环以内",
            "areaId": 1225
          },
          {
            "areaName": "茶园新区",
            "areaId": 1226
          },
          {
            "areaName": "鸡冠石镇",
            "areaId": 1227
          },
          {
            "areaName": "长生桥镇",
            "areaId": 1228
          },
          {
            "areaName": "峡口镇",
            "areaId": 1229
          },
          {
            "areaName": "广阳镇",
            "areaId": 1230
          },
          {
            "areaName": "迎龙镇",
            "areaId": 1231
          },
          {
            "areaName": "海棠溪街道",
            "areaId": 1232
          }
        ],
        "areaId": 86
      },
      {
        "areaName": "九龙坡区",
        "childrenList": [{
            "areaName": "内环以内",
            "areaId": 1233
          },
          {
            "areaName": "白市驿镇",
            "areaId": 1234
          },
          {
            "areaName": "铜罐驿镇",
            "areaId": 1235
          },
          {
            "areaName": "华岩镇",
            "areaId": 1236
          },
          {
            "areaName": "巴福镇",
            "areaId": 1237
          },
          {
            "areaName": "含谷镇",
            "areaId": 1238
          },
          {
            "areaName": "金凤镇",
            "areaId": 1239
          },
          {
            "areaName": "石板镇",
            "areaId": 1240
          },
          {
            "areaName": "陶家镇",
            "areaId": 1241
          },
          {
            "areaName": "西彭镇",
            "areaId": 1242
          },
          {
            "areaName": "走马镇",
            "areaId": 1243
          }
        ],
        "areaId": 87
      },
      {
        "areaName": "沙坪坝区",
        "childrenList": [{
            "areaName": "内环以内",
            "areaId": 1244
          },
          {
            "areaName": "陈家桥镇",
            "areaId": 1245
          },
          {
            "areaName": "歌乐山镇",
            "areaId": 1246
          },
          {
            "areaName": "青木关镇",
            "areaId": 1247
          },
          {
            "areaName": "回龙坝镇",
            "areaId": 1248
          },
          {
            "areaName": "大学城",
            "areaId": 1249
          },
          {
            "areaName": "虎溪镇",
            "areaId": 1250
          },
          {
            "areaName": "西永镇",
            "areaId": 1251
          },
          {
            "areaName": "土主镇",
            "areaId": 1252
          },
          {
            "areaName": "井口镇",
            "areaId": 1253
          },
          {
            "areaName": "曾家镇",
            "areaId": 1254
          },
          {
            "areaName": "凤凰镇",
            "areaId": 1255
          },
          {
            "areaName": "中梁镇",
            "areaId": 1256
          }
        ],
        "areaId": 88
      },
      {
        "areaName": "大渡口区",
        "childrenList": [{
            "areaName": "内环以内",
            "areaId": 1257
          },
          {
            "areaName": "茄子溪街道",
            "areaId": 1258
          },
          {
            "areaName": "建胜镇",
            "areaId": 1259
          },
          {
            "areaName": "跳磴镇",
            "areaId": 1260
          }
        ],
        "areaId": 89
      },
      {
        "areaName": "綦江区",
        "childrenList": [{
            "areaName": "古南街道",
            "areaId": 1261
          },
          {
            "areaName": "文龙街道",
            "areaId": 1262
          },
          {
            "areaName": "万盛街道",
            "areaId": 1263
          },
          {
            "areaName": "东林街道",
            "areaId": 1264
          },
          {
            "areaName": "三江街道",
            "areaId": 1265
          },
          {
            "areaName": "安稳镇",
            "areaId": 1266
          },
          {
            "areaName": "打通镇",
            "areaId": 1267
          },
          {
            "areaName": "丁山镇",
            "areaId": 1268
          },
          {
            "areaName": "东溪镇",
            "areaId": 1269
          },
          {
            "areaName": "扶欢镇",
            "areaId": 1270
          },
          {
            "areaName": "赶水镇",
            "areaId": 1271
          },
          {
            "areaName": "郭扶镇",
            "areaId": 1272
          },
          {
            "areaName": "横山镇",
            "areaId": 1273
          },
          {
            "areaName": "隆盛镇",
            "areaId": 1274
          },
          {
            "areaName": "三角镇",
            "areaId": 1275
          },
          {
            "areaName": "石壕镇",
            "areaId": 1276
          },
          {
            "areaName": "石角镇",
            "areaId": 1277
          },
          {
            "areaName": "新盛镇",
            "areaId": 1278
          },
          {
            "areaName": "永城镇",
            "areaId": 1279
          },
          {
            "areaName": "永新镇",
            "areaId": 1280
          },
          {
            "areaName": "中峰镇",
            "areaId": 1281
          },
          {
            "areaName": "篆塘镇",
            "areaId": 1282
          },
          {
            "areaName": "丛林镇",
            "areaId": 1283
          },
          {
            "areaName": "关坝镇",
            "areaId": 1284
          },
          {
            "areaName": "黑山镇",
            "areaId": 1285
          },
          {
            "areaName": "金桥镇",
            "areaId": 1286
          },
          {
            "areaName": "南桐镇",
            "areaId": 1287
          },
          {
            "areaName": "青年镇",
            "areaId": 1288
          },
          {
            "areaName": "石林镇",
            "areaId": 1289
          },
          {
            "areaName": "万东镇",
            "areaId": 1290
          }
        ],
        "areaId": 90
      },
      {
        "areaName": "渝中区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 1291
        }],
        "areaId": 91
      },
      {
        "areaName": "高新区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 1292
        }],
        "areaId": 92
      },
      {
        "areaName": "北部新区",
        "childrenList": [{
          "areaName": "全境",
          "areaId": 1293
        }],
        "areaId": 93
      }
    ],
    "areaId": 4
  },
  {
    "areaName": "河北",
    "childrenList": [{
        "areaName": "石家庄市",
        "childrenList": [{
            "areaName": "辛集市",
            "areaId": 1294
          },
          {
            "areaName": "晋州市",
            "areaId": 1295
          },
          {
            "areaName": "新乐市",
            "areaId": 1296
          },
          {
            "areaName": "井陉县",
            "areaId": 1297
          },
          {
            "areaName": "栾城县",
            "areaId": 1298
          },
          {
            "areaName": "行唐县",
            "areaId": 1299
          },
          {
            "areaName": "灵寿县",
            "areaId": 1300
          },
          {
            "areaName": "高邑县",
            "areaId": 1301
          },
          {
            "areaName": "赵县",
            "areaId": 1302
          },
          {
            "areaName": "赞皇县",
            "areaId": 1303
          },
          {
            "areaName": "深泽县",
            "areaId": 1304
          },
          {
            "areaName": "无极县",
            "areaId": 1305
          },
          {
            "areaName": "元氏县",
            "areaId": 1306
          },
          {
            "areaName": "井陉矿区",
            "areaId": 1307
          },
          {
            "areaName": "平山县",
            "areaId": 1308
          },
          {
            "areaName": "藁城市",
            "areaId": 1309
          },
          {
            "areaName": "鹿泉市",
            "areaId": 1310
          },
          {
            "areaName": "正定县",
            "areaId": 1311
          },
          {
            "areaName": "新华区",
            "areaId": 1312
          },
          {
            "areaName": "桥西区",
            "areaId": 1313
          },
          {
            "areaName": "桥东区",
            "areaId": 1314
          },
          {
            "areaName": "裕华区",
            "areaId": 1315
          },
          {
            "areaName": "长安区",
            "areaId": 1316
          }
        ],
        "areaId": 94
      },
      {
        "areaName": "邯郸市",
        "childrenList": [{
            "areaName": "邯郸县",
            "areaId": 1317
          },
          {
            "areaName": "峰峰矿区",
            "areaId": 1318
          },
          {
            "areaName": "曲周县",
            "areaId": 1319
          },
          {
            "areaName": "馆陶县",
            "areaId": 1320
          },
          {
            "areaName": "魏县",
            "areaId": 1321
          },
          {
            "areaName": "成安县",
            "areaId": 1322
          },
          {
            "areaName": "大名县",
            "areaId": 1323
          },
          {
            "areaName": "涉县",
            "areaId": 1324
          },
          {
            "areaName": "鸡泽县",
            "areaId": 1325
          },
          {
            "areaName": "邱县",
            "areaId": 1326
          },
          {
            "areaName": "广平县",
            "areaId": 1327
          },
          {
            "areaName": "肥乡县",
            "areaId": 1328
          },
          {
            "areaName": "磁县",
            "areaId": 1329
          },
          {
            "areaName": "临漳县",
            "areaId": 1330
          },
          {
            "areaName": "永年县",
            "areaId": 1331
          },
          {
            "areaName": "丛台区",
            "areaId": 1332
          },
          {
            "areaName": "邯山区",
            "areaId": 1333
          },
          {
            "areaName": "复兴区",
            "areaId": 1334
          },
          {
            "areaName": "武安市",
            "areaId": 1335
          }
        ],
        "areaId": 95
      },
      {
        "areaName": "邢台市",
        "childrenList": [{
            "areaName": "邢台县",
            "areaId": 1336
          },
          {
            "areaName": "南宫市",
            "areaId": 1337
          },
          {
            "areaName": "沙河市",
            "areaId": 1338
          },
          {
            "areaName": "柏乡县",
            "areaId": 1339
          },
          {
            "areaName": "任县",
            "areaId": 1340
          },
          {
            "areaName": "清河县",
            "areaId": 1341
          },
          {
            "areaName": "隆尧县",
            "areaId": 1342
          },
          {
            "areaName": "临城县",
            "areaId": 1343
          },
          {
            "areaName": "广宗县",
            "areaId": 1344
          },
          {
            "areaName": "临西县",
            "areaId": 1345
          },
          {
            "areaName": "内丘县",
            "areaId": 1346
          },
          {
            "areaName": "平乡县",
            "areaId": 1347
          },
          {
            "areaName": "巨鹿县",
            "areaId": 1348
          },
          {
            "areaName": "新河县",
            "areaId": 1349
          },
          {
            "areaName": "南和县",
            "areaId": 1350
          },
          {
            "areaName": "宁晋县",
            "areaId": 1351
          },
          {
            "areaName": "威县",
            "areaId": 1352
          },
          {
            "areaName": "桥西区",
            "areaId": 1353
          },
          {
            "areaName": "桥东区",
            "areaId": 1354
          }
        ],
        "areaId": 96
      },
      {
        "areaName": "保定市",
        "childrenList": [{
            "areaName": "安国市",
            "areaId": 1355
          },
          {
            "areaName": "满城县",
            "areaId": 1356
          },
          {
            "areaName": "清苑县",
            "areaId": 1357
          },
          {
            "areaName": "涞水县",
            "areaId": 1358
          },
          {
            "areaName": "阜平县",
            "areaId": 1359
          },
          {
            "areaName": "定兴县",
            "areaId": 1360
          },
          {
            "areaName": "唐县",
            "areaId": 1361
          },
          {
            "areaName": "高阳县",
            "areaId": 1362
          },
          {
            "areaName": "容城县",
            "areaId": 1363
          },
          {
            "areaName": "涞源县",
            "areaId": 1364
          },
          {
            "areaName": "望都县",
            "areaId": 1365
          },
          {
            "areaName": "易县",
            "areaId": 1366
          },
          {
            "areaName": "曲阳县",
            "areaId": 1367
          },
          {
            "areaName": "蠡县",
            "areaId": 1368
          },
          {
            "areaName": "顺平县",
            "areaId": 1369
          },
          {
            "areaName": "博野县",
            "areaId": 1370
          },
          {
            "areaName": "雄县",
            "areaId": 1371
          },
          {
            "areaName": "新市区",
            "areaId": 1372
          },
          {
            "areaName": "北市区",
            "areaId": 1373
          },
          {
            "areaName": "南市区",
            "areaId": 1374
          },
          {
            "areaName": "安新县",
            "areaId": 1375
          },
          {
            "areaName": "涿州市",
            "areaId": 1376
          },
          {
            "areaName": "定州市",
            "areaId": 1377
          },
          {
            "areaName": "徐水县",
            "areaId": 1378
          },
          {
            "areaName": "高碑店市",
            "areaId": 1379
          }
        ],
        "areaId": 97
      },
      {
        "areaName": "张家口市",
        "childrenList": [{
            "areaName": "宣化县",
            "areaId": 1380
          },
          {
            "areaName": "康保县",
            "areaId": 1381
          },
          {
            "areaName": "张北县",
            "areaId": 1382
          },
          {
            "areaName": "阳原县",
            "areaId": 1383
          },
          {
            "areaName": "赤城县",
            "areaId": 1384
          },
          {
            "areaName": "怀安县",
            "areaId": 1385
          },
          {
            "areaName": "怀来县",
            "areaId": 1386
          },
          {
            "areaName": "崇礼县",
            "areaId": 1387
          },
          {
            "areaName": "尚义县",
            "areaId": 1388
          },
          {
            "areaName": "蔚县",
            "areaId": 1389
          },
          {
            "areaName": "涿鹿县",
            "areaId": 1390
          },
          {
            "areaName": "万全县",
            "areaId": 1391
          },
          {
            "areaName": "下花园区",
            "areaId": 1392
          },
          {
            "areaName": "沽源县",
            "areaId": 1393
          },
          {
            "areaName": "宣化区",
            "areaId": 1394
          },
          {
            "areaName": "桥西区",
            "areaId": 1395
          },
          {
            "areaName": "桥东区",
            "areaId": 1396
          }
        ],
        "areaId": 98
      },
      {
        "areaName": "承德市",
        "childrenList": [{
            "areaName": "兴隆县",
            "areaId": 1397
          },
          {
            "areaName": "平泉县",
            "areaId": 1398
          },
          {
            "areaName": "滦平县",
            "areaId": 1399
          },
          {
            "areaName": "丰宁县",
            "areaId": 1400
          },
          {
            "areaName": "围场县",
            "areaId": 1401
          },
          {
            "areaName": "宽城县",
            "areaId": 1402
          },
          {
            "areaName": "隆化县",
            "areaId": 1403
          },
          {
            "areaName": "承德县",
            "areaId": 1404
          },
          {
            "areaName": "双滦区",
            "areaId": 1405
          },
          {
            "areaName": "鹰手营子矿区",
            "areaId": 1406
          },
          {
            "areaName": "双桥区",
            "areaId": 1407
          }
        ],
        "areaId": 99
      },
      {
        "areaName": "秦皇岛市",
        "childrenList": [{
            "areaName": "卢龙县",
            "areaId": 1408
          },
          {
            "areaName": "青龙县",
            "areaId": 1409
          },
          {
            "areaName": "昌黎县",
            "areaId": 1410
          },
          {
            "areaName": "北戴河区",
            "areaId": 1411
          },
          {
            "areaName": "抚宁县",
            "areaId": 1412
          },
          {
            "areaName": "海港区",
            "areaId": 1413
          },
          {
            "areaName": "山海关区",
            "areaId": 1414
          }
        ],
        "areaId": 100
      },
      {
        "areaName": "唐山市",
        "childrenList": [{
            "areaName": "遵化市",
            "areaId": 1415
          },
          {
            "areaName": "丰南区",
            "areaId": 1416
          },
          {
            "areaName": "迁西县",
            "areaId": 1417
          },
          {
            "areaName": "滦南县",
            "areaId": 1418
          },
          {
            "areaName": "玉田县",
            "areaId": 1419
          },
          {
            "areaName": "曹妃甸区",
            "areaId": 1420
          },
          {
            "areaName": "乐亭县",
            "areaId": 1421
          },
          {
            "areaName": "滦县",
            "areaId": 1422
          },
          {
            "areaName": "古冶区",
            "areaId": 1423
          },
          {
            "areaName": "开平区",
            "areaId": 1424
          },
          {
            "areaName": "路北区",
            "areaId": 1425
          },
          {
            "areaName": "路南区",
            "areaId": 1426
          },
          {
            "areaName": "迁安市",
            "areaId": 1427
          },
          {
            "areaName": "丰润区",
            "areaId": 1428
          }
        ],
        "areaId": 101
      },
      {
        "areaName": "沧州市",
        "childrenList": [{
            "areaName": "沧县",
            "areaId": 1429
          },
          {
            "areaName": "泊头市",
            "areaId": 1430
          },
          {
            "areaName": "河间市",
            "areaId": 1431
          },
          {
            "areaName": "献县",
            "areaId": 1432
          },
          {
            "areaName": "肃宁县",
            "areaId": 1433
          },
          {
            "areaName": "青县",
            "areaId": 1434
          },
          {
            "areaName": "东光县",
            "areaId": 1435
          },
          {
            "areaName": "吴桥县",
            "areaId": 1436
          },
          {
            "areaName": "南皮县",
            "areaId": 1437
          },
          {
            "areaName": "盐山县",
            "areaId": 1438
          },
          {
            "areaName": "海兴县",
            "areaId": 1439
          },
          {
            "areaName": "孟村县",
            "areaId": 1440
          },
          {
            "areaName": "运河区",
            "areaId": 1441
          },
          {
            "areaName": "新华区",
            "areaId": 1442
          },
          {
            "areaName": "任丘市",
            "areaId": 1443
          },
          {
            "areaName": "黄骅市",
            "areaId": 1444
          }
        ],
        "areaId": 102
      },
      {
        "areaName": "廊坊市",
        "childrenList": [{
            "areaName": "固安县",
            "areaId": 1445
          },
          {
            "areaName": "永清县",
            "areaId": 1446
          },
          {
            "areaName": "香河县",
            "areaId": 1447
          },
          {
            "areaName": "大城县",
            "areaId": 1448
          },
          {
            "areaName": "文安县",
            "areaId": 1449
          },
          {
            "areaName": "大厂县",
            "areaId": 1450
          },
          {
            "areaName": "安次区",
            "areaId": 1451
          },
          {
            "areaName": "广阳区",
            "areaId": 1452
          },
          {
            "areaName": "开发区",
            "areaId": 1453
          },
          {
            "areaName": "三河市",
            "areaId": 1454
          },
          {
            "areaName": "霸州市",
            "areaId": 1455
          }
        ],
        "areaId": 103
      },
      {
        "areaName": "衡水市",
        "childrenList": [{
            "areaName": "冀州市",
            "areaId": 1456
          },
          {
            "areaName": "深州市",
            "areaId": 1457
          },
          {
            "areaName": "饶阳县",
            "areaId": 1458
          },
          {
            "areaName": "枣强县",
            "areaId": 1459
          },
          {
            "areaName": "故城县",
            "areaId": 1460
          },
          {
            "areaName": "阜城县",
            "areaId": 1461
          },
          {
            "areaName": "安平县",
            "areaId": 1462
          },
          {
            "areaName": "武邑县",
            "areaId": 1463
          },
          {
            "areaName": "景县",
            "areaId": 1464
          },
          {
            "areaName": "武强县",
            "areaId": 1465
          },
          {
            "areaName": "桃城区",
            "areaId": 1466
          }
        ],
        "areaId": 104
      }
    ],
    "areaId": 5
  },
  {
    "areaName": "山西",
    "childrenList": [{
        "areaName": "太原市",
        "childrenList": [{
            "areaName": "阳曲县",
            "areaId": 1467
          },
          {
            "areaName": "古交市",
            "areaId": 1468
          },
          {
            "areaName": "娄烦县",
            "areaId": 1469
          },
          {
            "areaName": "清徐县",
            "areaId": 1470
          },
          {
            "areaName": "小店区",
            "areaId": 1471
          },
          {
            "areaName": "迎泽区",
            "areaId": 1472
          },
          {
            "areaName": "晋源区",
            "areaId": 1473
          },
          {
            "areaName": "万柏林区",
            "areaId": 1474
          },
          {
            "areaName": "尖草坪区",
            "areaId": 1475
          },
          {
            "areaName": "杏花岭区",
            "areaId": 1476
          }
        ],
        "areaId": 105
      },
      {
        "areaName": "大同市",
        "childrenList": [{
            "areaName": "大同县",
            "areaId": 1477
          },
          {
            "areaName": "天镇县",
            "areaId": 1478
          },
          {
            "areaName": "灵丘县",
            "areaId": 1479
          },
          {
            "areaName": "阳高县",
            "areaId": 1480
          },
          {
            "areaName": "左云县",
            "areaId": 1481
          },
          {
            "areaName": "浑源县",
            "areaId": 1482
          },
          {
            "areaName": "广灵县",
            "areaId": 1483
          },
          {
            "areaName": "新荣区",
            "areaId": 1484
          },
          {
            "areaName": "南郊区",
            "areaId": 1485
          },
          {
            "areaName": "矿区",
            "areaId": 1486
          },
          {
            "areaName": "城区",
            "areaId": 1487
          }
        ],
        "areaId": 106
      },
      {
        "areaName": "阳泉市",
        "childrenList": [{
            "areaName": "盂县",
            "areaId": 1488
          },
          {
            "areaName": "平定县",
            "areaId": 1489
          },
          {
            "areaName": "郊区",
            "areaId": 1490
          },
          {
            "areaName": "矿区",
            "areaId": 1491
          },
          {
            "areaName": "城区",
            "areaId": 1492
          }
        ],
        "areaId": 107
      },
      {
        "areaName": "晋城市",
        "childrenList": [{
            "areaName": "高平市",
            "areaId": 1493
          },
          {
            "areaName": "阳城县",
            "areaId": 1494
          },
          {
            "areaName": "沁水县",
            "areaId": 1495
          },
          {
            "areaName": "陵川县",
            "areaId": 1496
          },
          {
            "areaName": "泽州县",
            "areaId": 1497
          },
          {
            "areaName": "城区",
            "areaId": 1498
          }
        ],
        "areaId": 108
      },
      {
        "areaName": "朔州市",
        "childrenList": [{
            "areaName": "山阴县",
            "areaId": 1499
          },
          {
            "areaName": "右玉县",
            "areaId": 1500
          },
          {
            "areaName": "应县",
            "areaId": 1501
          },
          {
            "areaName": "怀仁县",
            "areaId": 1502
          },
          {
            "areaName": "朔城区",
            "areaId": 1503
          },
          {
            "areaName": "平鲁区",
            "areaId": 1504
          }
        ],
        "areaId": 109
      },
      {
        "areaName": "晋中市",
        "childrenList": [{
            "areaName": "介休市",
            "areaId": 1505
          },
          {
            "areaName": "昔阳县",
            "areaId": 1506
          },
          {
            "areaName": "祁县",
            "areaId": 1507
          },
          {
            "areaName": "左权县",
            "areaId": 1508
          },
          {
            "areaName": "寿阳县",
            "areaId": 1509
          },
          {
            "areaName": "太谷县",
            "areaId": 1510
          },
          {
            "areaName": "和顺县",
            "areaId": 1511
          },
          {
            "areaName": "灵石县",
            "areaId": 1512
          },
          {
            "areaName": "平遥县",
            "areaId": 1513
          },
          {
            "areaName": "榆社县",
            "areaId": 1514
          },
          {
            "areaName": "榆次区",
            "areaId": 1515
          }
        ],
        "areaId": 110
      },
      {
        "areaName": "忻州市",
        "childrenList": [{
            "areaName": "原平市",
            "areaId": 1516
          },
          {
            "areaName": "代县",
            "areaId": 1517
          },
          {
            "areaName": "神池县",
            "areaId": 1518
          },
          {
            "areaName": "五寨县",
            "areaId": 1519
          },
          {
            "areaName": "五台县",
            "areaId": 1520
          },
          {
            "areaName": "偏关县",
            "areaId": 1521
          },
          {
            "areaName": "宁武县",
            "areaId": 1522
          },
          {
            "areaName": "静乐县",
            "areaId": 1523
          },
          {
            "areaName": "繁峙县",
            "areaId": 1524
          },
          {
            "areaName": "河曲县",
            "areaId": 1525
          },
          {
            "areaName": "保德县",
            "areaId": 1526
          },
          {
            "areaName": "定襄县",
            "areaId": 1527
          },
          {
            "areaName": "忻府区",
            "areaId": 1528
          },
          {
            "areaName": "岢岚县",
            "areaId": 1529
          }
        ],
        "areaId": 111
      },
      {
        "areaName": "吕梁市",
        "childrenList": [{
            "areaName": "离石区",
            "areaId": 1530
          },
          {
            "areaName": "孝义市",
            "areaId": 1531
          },
          {
            "areaName": "汾阳市",
            "areaId": 1532
          },
          {
            "areaName": "文水县",
            "areaId": 1533
          },
          {
            "areaName": "中阳县",
            "areaId": 1534
          },
          {
            "areaName": "兴县",
            "areaId": 1535
          },
          {
            "areaName": "临县",
            "areaId": 1536
          },
          {
            "areaName": "方山县",
            "areaId": 1537
          },
          {
            "areaName": "柳林县",
            "areaId": 1538
          },
          {
            "areaName": "岚县",
            "areaId": 1539
          },
          {
            "areaName": "交口县",
            "areaId": 1540
          },
          {
            "areaName": "交城县",
            "areaId": 1541
          },
          {
            "areaName": "石楼县",
            "areaId": 1542
          }
        ],
        "areaId": 112
      },
      {
        "areaName": "临汾市",
        "childrenList": [{
            "areaName": "侯马市",
            "areaId": 1543
          },
          {
            "areaName": "霍州市",
            "areaId": 1544
          },
          {
            "areaName": "汾西县",
            "areaId": 1545
          },
          {
            "areaName": "吉县",
            "areaId": 1546
          },
          {
            "areaName": "安泽县",
            "areaId": 1547
          },
          {
            "areaName": "浮山县",
            "areaId": 1548
          },
          {
            "areaName": "大宁县",
            "areaId": 1549
          },
          {
            "areaName": "古县",
            "areaId": 1550
          },
          {
            "areaName": "隰县",
            "areaId": 1551
          },
          {
            "areaName": "襄汾县",
            "areaId": 1552
          },
          {
            "areaName": "翼城县",
            "areaId": 1553
          },
          {
            "areaName": "永和县",
            "areaId": 1554
          },
          {
            "areaName": "乡宁县",
            "areaId": 1555
          },
          {
            "areaName": "洪洞县",
            "areaId": 1556
          },
          {
            "areaName": "蒲县",
            "areaId": 1557
          },
          {
            "areaName": "曲沃县",
            "areaId": 1558
          },
          {
            "areaName": "尧都区",
            "areaId": 1559
          }
        ],
        "areaId": 113
      },
      {
        "areaName": "运城市",
        "childrenList": [{
            "areaName": "河津市",
            "areaId": 1560
          },
          {
            "areaName": "永济市",
            "areaId": 1561
          },
          {
            "areaName": "新绛县",
            "areaId": 1562
          },
          {
            "areaName": "平陆县",
            "areaId": 1563
          },
          {
            "areaName": "垣曲县",
            "areaId": 1564
          },
          {
            "areaName": "绛县",
            "areaId": 1565
          },
          {
            "areaName": "稷山县",
            "areaId": 1566
          },
          {
            "areaName": "芮城县",
            "areaId": 1567
          },
          {
            "areaName": "夏县",
            "areaId": 1568
          },
          {
            "areaName": "临猗县",
            "areaId": 1569
          },
          {
            "areaName": "万荣县",
            "areaId": 1570
          },
          {
            "areaName": "闻喜县",
            "areaId": 1571
          },
          {
            "areaName": "盐湖区",
            "areaId": 1572
          }
        ],
        "areaId": 114
      },
      {
        "areaName": "长治市",
        "childrenList": [{
            "areaName": "长治县",
            "areaId": 1573
          },
          {
            "areaName": "潞城市",
            "areaId": 1574
          },
          {
            "areaName": "郊区",
            "areaId": 1575
          },
          {
            "areaName": "襄垣县",
            "areaId": 1576
          },
          {
            "areaName": "屯留县",
            "areaId": 1577
          },
          {
            "areaName": "平顺县",
            "areaId": 1578
          },
          {
            "areaName": "黎城县",
            "areaId": 1579
          },
          {
            "areaName": "壶关县",
            "areaId": 1580
          },
          {
            "areaName": "长子县",
            "areaId": 1581
          },
          {
            "areaName": "武乡县",
            "areaId": 1582
          },
          {
            "areaName": "沁县",
            "areaId": 1583
          },
          {
            "areaName": "沁源县",
            "areaId": 1584
          },
          {
            "areaName": "城区",
            "areaId": 1585
          }
        ],
        "areaId": 115
      }
    ],
    "areaId": 6
  },
  {
    "areaName": "河南",
    "childrenList": [{
        "areaName": "郑州市",
        "childrenList": [{
            "areaName": "新密市",
            "areaId": 1586
          },
          {
            "areaName": "登封市",
            "areaId": 1587
          },
          {
            "areaName": "上街区",
            "areaId": 1588
          },
          {
            "areaName": "惠济区",
            "areaId": 1589
          },
          {
            "areaName": "金水区",
            "areaId": 1590
          },
          {
            "areaName": "管城区",
            "areaId": 1591
          },
          {
            "areaName": "二七区",
            "areaId": 1592
          },
          {
            "areaName": "中原区",
            "areaId": 1593
          },
          {
            "areaName": "郑东新区",
            "areaId": 1594
          },
          {
            "areaName": "新郑市",
            "areaId": 1595
          },
          {
            "areaName": "巩义市",
            "areaId": 1596
          },
          {
            "areaName": "荥阳市",
            "areaId": 1597
          },
          {
            "areaName": "中牟县",
            "areaId": 1598
          },
          {
            "areaName": "经济开发区",
            "areaId": 1599
          },
          {
            "areaName": "高新技术开发区",
            "areaId": 1600
          }
        ],
        "areaId": 116
      },
      {
        "areaName": "开封市",
        "childrenList": [{
            "areaName": "开封县",
            "areaId": 1601
          },
          {
            "areaName": "杞县",
            "areaId": 1602
          },
          {
            "areaName": "兰考县",
            "areaId": 1603
          },
          {
            "areaName": "尉氏县",
            "areaId": 1604
          },
          {
            "areaName": "通许县",
            "areaId": 1605
          },
          {
            "areaName": "金明区",
            "areaId": 1606
          },
          {
            "areaName": "龙亭区",
            "areaId": 1607
          },
          {
            "areaName": "顺河区",
            "areaId": 1608
          },
          {
            "areaName": "鼓楼区",
            "areaId": 1609
          },
          {
            "areaName": "禹王台区",
            "areaId": 1610
          }
        ],
        "areaId": 117
      },
      {
        "areaName": "洛阳市",
        "childrenList": [{
            "areaName": "偃师市",
            "areaId": 1611
          },
          {
            "areaName": "孟津县",
            "areaId": 1612
          },
          {
            "areaName": "汝阳县",
            "areaId": 1613
          },
          {
            "areaName": "伊川县",
            "areaId": 1614
          },
          {
            "areaName": "洛宁县",
            "areaId": 1615
          },
          {
            "areaName": "宜阳县",
            "areaId": 1616
          },
          {
            "areaName": "栾川县",
            "areaId": 1617
          },
          {
            "areaName": "新安县",
            "areaId": 1618
          },
          {
            "areaName": "吉利区",
            "areaId": 1619
          },
          {
            "areaName": "涧西区",
            "areaId": 1620
          },
          {
            "areaName": "瀍河区",
            "areaId": 1621
          },
          {
            "areaName": "老城区",
            "areaId": 1622
          },
          {
            "areaName": "西工区",
            "areaId": 1623
          },
          {
            "areaName": "嵩县",
            "areaId": 1624
          },
          {
            "areaName": "伊滨区",
            "areaId": 1625
          },
          {
            "areaName": "洛龙区",
            "areaId": 1626
          }
        ],
        "areaId": 118
      },
      {
        "areaName": "平顶山市",
        "childrenList": [{
            "areaName": "汝州市",
            "areaId": 1627
          },
          {
            "areaName": "舞钢市",
            "areaId": 1628
          },
          {
            "areaName": "郏县",
            "areaId": 1629
          },
          {
            "areaName": "叶县",
            "areaId": 1630
          },
          {
            "areaName": "鲁山县",
            "areaId": 1631
          },
          {
            "areaName": "宝丰县",
            "areaId": 1632
          },
          {
            "areaName": "石龙区",
            "areaId": 1633
          },
          {
            "areaName": "湛河区",
            "areaId": 1634
          },
          {
            "areaName": "卫东区",
            "areaId": 1635
          },
          {
            "areaName": "新华区",
            "areaId": 1636
          }
        ],
        "areaId": 119
      },
      {
        "areaName": "焦作市",
        "childrenList": [{
            "areaName": "沁阳市",
            "areaId": 1637
          },
          {
            "areaName": "孟州市",
            "areaId": 1638
          },
          {
            "areaName": "修武县",
            "areaId": 1639
          },
          {
            "areaName": "温县",
            "areaId": 1640
          },
          {
            "areaName": "武陟县",
            "areaId": 1641
          },
          {
            "areaName": "博爱县",
            "areaId": 1642
          },
          {
            "areaName": "山阳区",
            "areaId": 1643
          },
          {
            "areaName": "解放区",
            "areaId": 1644
          },
          {
            "areaName": "马村区",
            "areaId": 1645
          },
          {
            "areaName": "中站区",
            "areaId": 1646
          }
        ],
        "areaId": 120
      },
      {
        "areaName": "鹤壁市",
        "childrenList": [{
            "areaName": "浚县",
            "areaId": 1647
          },
          {
            "areaName": "淇县",
            "areaId": 1648
          },
          {
            "areaName": "鹤山区",
            "areaId": 1649
          },
          {
            "areaName": "山城区",
            "areaId": 1650
          },
          {
            "areaName": "淇滨区",
            "areaId": 1651
          }
        ],
        "areaId": 121
      },
      {
        "areaName": "新乡市",
        "childrenList": [{
            "areaName": "卫辉市",
            "areaId": 1652
          },
          {
            "areaName": "辉县市",
            "areaId": 1653
          },
          {
            "areaName": "新乡县",
            "areaId": 1654
          },
          {
            "areaName": "获嘉县",
            "areaId": 1655
          },
          {
            "areaName": "原阳县",
            "areaId": 1656
          },
          {
            "areaName": "长垣县",
            "areaId": 1657
          },
          {
            "areaName": "延津县",
            "areaId": 1658
          },
          {
            "areaName": "封丘县",
            "areaId": 1659
          },
          {
            "areaName": "凤泉区",
            "areaId": 1660
          },
          {
            "areaName": "牧野区",
            "areaId": 1661
          },
          {
            "areaName": "红旗区",
            "areaId": 1662
          },
          {
            "areaName": "卫滨区",
            "areaId": 1663
          }
        ],
        "areaId": 122
      },
      {
        "areaName": "安阳市",
        "childrenList": [{
            "areaName": "林州市",
            "areaId": 1664
          },
          {
            "areaName": "安阳县",
            "areaId": 1665
          },
          {
            "areaName": "滑县",
            "areaId": 1666
          },
          {
            "areaName": "汤阴县",
            "areaId": 1667
          },
          {
            "areaName": "内黄县",
            "areaId": 1668
          },
          {
            "areaName": "龙安区",
            "areaId": 1669
          },
          {
            "areaName": "殷都区",
            "areaId": 1670
          },
          {
            "areaName": "文峰区",
            "areaId": 1671
          },
          {
            "areaName": "开发区",
            "areaId": 1672
          },
          {
            "areaName": "北关区",
            "areaId": 1673
          }
        ],
        "areaId": 123
      },
      {
        "areaName": "濮阳市",
        "childrenList": [{
            "areaName": "濮阳县",
            "areaId": 1674
          },
          {
            "areaName": "南乐县",
            "areaId": 1675
          },
          {
            "areaName": "台前县",
            "areaId": 1676
          },
          {
            "areaName": "清丰县",
            "areaId": 1677
          },
          {
            "areaName": "范县",
            "areaId": 1678
          },
          {
            "areaName": "华龙区",
            "areaId": 1679
          }
        ],
        "areaId": 124
      },
      {
        "areaName": "许昌市",
        "childrenList": [{
            "areaName": "禹州市",
            "areaId": 1680
          },
          {
            "areaName": "长葛市",
            "areaId": 1681
          },
          {
            "areaName": "许昌县",
            "areaId": 1682
          },
          {
            "areaName": "鄢陵县",
            "areaId": 1683
          },
          {
            "areaName": "襄城县",
            "areaId": 1684
          },
          {
            "areaName": "魏都区",
            "areaId": 1685
          }
        ],
        "areaId": 125
      },
      {
        "areaName": "漯河市",
        "childrenList": [{
            "areaName": "郾城区",
            "areaId": 1686
          },
          {
            "areaName": "临颍县",
            "areaId": 1687
          },
          {
            "areaName": "召陵区",
            "areaId": 1688
          },
          {
            "areaName": "舞阳县",
            "areaId": 1689
          },
          {
            "areaName": "源汇区",
            "areaId": 1690
          }
        ],
        "areaId": 126
      },
      {
        "areaName": "三门峡市",
        "childrenList": [{
            "areaName": "义马市",
            "areaId": 1691
          },
          {
            "areaName": "灵宝市",
            "areaId": 1692
          },
          {
            "areaName": "陕县",
            "areaId": 1693
          },
          {
            "areaName": "卢氏县",
            "areaId": 1694
          },
          {
            "areaName": "渑池县",
            "areaId": 1695
          },
          {
            "areaName": "湖滨区",
            "areaId": 1696
          }
        ],
        "areaId": 127
      },
      {
        "areaName": "南阳市",
        "childrenList": [{
            "areaName": "邓州市",
            "areaId": 1697
          },
          {
            "areaName": "桐柏县",
            "areaId": 1698
          },
          {
            "areaName": "方城县",
            "areaId": 1699
          },
          {
            "areaName": "淅川县",
            "areaId": 1700
          },
          {
            "areaName": "镇平县",
            "areaId": 1701
          },
          {
            "areaName": "唐河县",
            "areaId": 1702
          },
          {
            "areaName": "南召县",
            "areaId": 1703
          },
          {
            "areaName": "内乡县",
            "areaId": 1704
          },
          {
            "areaName": "新野县",
            "areaId": 1705
          },
          {
            "areaName": "社旗县",
            "areaId": 1706
          },
          {
            "areaName": "西峡县",
            "areaId": 1707
          },
          {
            "areaName": "卧龙区",
            "areaId": 1708
          },
          {
            "areaName": "宛城区",
            "areaId": 1709
          }
        ],
        "areaId": 128
      },
      {
        "areaName": "商丘市",
        "childrenList": [{
            "areaName": "永城市",
            "areaId": 1710
          },
          {
            "areaName": "宁陵县",
            "areaId": 1711
          },
          {
            "areaName": "虞城县",
            "areaId": 1712
          },
          {
            "areaName": "民权县",
            "areaId": 1713
          },
          {
            "areaName": "夏邑县",
            "areaId": 1714
          },
          {
            "areaName": "柘城县",
            "areaId": 1715
          },
          {
            "areaName": "睢县",
            "areaId": 1716
          },
          {
            "areaName": "睢阳区",
            "areaId": 1717
          },
          {
            "areaName": "梁园区",
            "areaId": 1718
          }
        ],
        "areaId": 129
      },
      {
        "areaName": "周口市",
        "childrenList": [{
            "areaName": "项城市",
            "areaId": 1719
          },
          {
            "areaName": "商水县",
            "areaId": 1720
          },
          {
            "areaName": "淮阳县",
            "areaId": 1721
          },
          {
            "areaName": "太康县",
            "areaId": 1722
          },
          {
            "areaName": "鹿邑县",
            "areaId": 1723
          },
          {
            "areaName": "西华县",
            "areaId": 1724
          },
          {
            "areaName": "扶沟县",
            "areaId": 1725
          },
          {
            "areaName": "沈丘县",
            "areaId": 1726
          },
          {
            "areaName": "郸城县",
            "areaId": 1727
          },
          {
            "areaName": "东新区",
            "areaId": 1728
          },
          {
            "areaName": "经济开发区",
            "areaId": 1729
          },
          {
            "areaName": "川汇区",
            "areaId": 1730
          }
        ],
        "areaId": 130
      },
      {
        "areaName": "驻马店市",
        "childrenList": [{
            "areaName": "确山县",
            "areaId": 1731
          },
          {
            "areaName": "新蔡县",
            "areaId": 1732
          },
          {
            "areaName": "上蔡县",
            "areaId": 1733
          },
          {
            "areaName": "泌阳县",
            "areaId": 1734
          },
          {
            "areaName": "西平县",
            "areaId": 1735
          },
          {
            "areaName": "遂平县",
            "areaId": 1736
          },
          {
            "areaName": "汝南县",
            "areaId": 1737
          },
          {
            "areaName": "平舆县",
            "areaId": 1738
          },
          {
            "areaName": "正阳县",
            "areaId": 1739
          },
          {
            "areaName": "驿城区",
            "areaId": 1740
          }
        ],
        "areaId": 131
      },
      {
        "areaName": "信阳市",
        "childrenList": [{
            "areaName": "潢川县",
            "areaId": 1741
          },
          {
            "areaName": "淮滨县",
            "areaId": 1742
          },
          {
            "areaName": "息县",
            "areaId": 1743
          },
          {
            "areaName": "新县",
            "areaId": 1744
          },
          {
            "areaName": "固始县",
            "areaId": 1745
          },
          {
            "areaName": "罗山县",
            "areaId": 1746
          },
          {
            "areaName": "光山县",
            "areaId": 1747
          },
          {
            "areaName": "商城县",
            "areaId": 1748
          },
          {
            "areaName": "平桥区",
            "areaId": 1749
          },
          {
            "areaName": "浉河区",
            "areaId": 1750
          }
        ],
        "areaId": 132
      },
      {
        "areaName": "济源市",
        "childrenList": [{
            "areaName": "玉泉街道",
            "areaId": 1751
          },
          {
            "areaName": "北海街道",
            "areaId": 1752
          },
          {
            "areaName": "天坛街道",
            "areaId": 1753
          },
          {
            "areaName": "沁园街道",
            "areaId": 1754
          },
          {
            "areaName": "济水街道",
            "areaId": 1755
          },
          {
            "areaName": "五龙口镇",
            "areaId": 1756
          },
          {
            "areaName": "下冶镇",
            "areaId": 1757
          },
          {
            "areaName": "轵城镇",
            "areaId": 1758
          },
          {
            "areaName": "王屋镇",
            "areaId": 1759
          },
          {
            "areaName": "思礼镇",
            "areaId": 1760
          },
          {
            "areaName": "邵原镇",
            "areaId": 1761
          },
          {
            "areaName": "坡头镇",
            "areaId": 1762
          },
          {
            "areaName": "梨林镇",
            "areaId": 1763
          },
          {
            "areaName": "克井镇",
            "areaId": 1764
          },
          {
            "areaName": "大峪镇",
            "areaId": 1765
          },
          {
            "areaName": "承留镇",
            "areaId": 1766
          }
        ],
        "areaId": 133
      }
    ],
    "areaId": 7
  },
  {
    "areaName": "辽宁",
    "childrenList": [{
        "areaName": "沈阳市",
        "childrenList": [{
            "areaName": "苏家屯区",
            "areaId": 1767
          },
          {
            "areaName": "新民市",
            "areaId": 1768
          },
          {
            "areaName": "法库县",
            "areaId": 1769
          },
          {
            "areaName": "辽中县",
            "areaId": 1770
          },
          {
            "areaName": "康平县",
            "areaId": 1771
          },
          {
            "areaName": "皇姑区",
            "areaId": 1772
          },
          {
            "areaName": "铁西区",
            "areaId": 1773
          },
          {
            "areaName": "大东区",
            "areaId": 1774
          },
          {
            "areaName": "沈河区",
            "areaId": 1775
          },
          {
            "areaName": "东陵区",
            "areaId": 1776
          },
          {
            "areaName": "于洪区",
            "areaId": 1777
          },
          {
            "areaName": "和平区",
            "areaId": 1778
          },
          {
            "areaName": "浑南新区",
            "areaId": 1779
          },
          {
            "areaName": "沈北新区",
            "areaId": 1780
          },
          {
            "areaName": "道义开发区",
            "areaId": 1781
          }
        ],
        "areaId": 134
      },
      {
        "areaName": "大连市",
        "childrenList": [{
            "areaName": "普兰店市",
            "areaId": 1782
          },
          {
            "areaName": "瓦房店市",
            "areaId": 1783
          },
          {
            "areaName": "庄河市",
            "areaId": 1784
          },
          {
            "areaName": "长海县",
            "areaId": 1785
          },
          {
            "areaName": "沙河口区",
            "areaId": 1786
          },
          {
            "areaName": "西岗区",
            "areaId": 1787
          },
          {
            "areaName": "中山区",
            "areaId": 1788
          },
          {
            "areaName": "甘井子区",
            "areaId": 1789
          },
          {
            "areaName": "高新园区",
            "areaId": 1790
          },
          {
            "areaName": "大连开发区",
            "areaId": 1791
          },
          {
            "areaName": "金州区",
            "areaId": 1792
          },
          {
            "areaName": "旅顺口区",
            "areaId": 1793
          }
        ],
        "areaId": 135
      },
      {
        "areaName": "鞍山市",
        "childrenList": [{
            "areaName": "台安县",
            "areaId": 1794
          },
          {
            "areaName": "海城市",
            "areaId": 1795
          },
          {
            "areaName": "岫岩县",
            "areaId": 1796
          },
          {
            "areaName": "铁东区",
            "areaId": 1797
          },
          {
            "areaName": "立山区",
            "areaId": 1798
          },
          {
            "areaName": "铁西区",
            "areaId": 1799
          },
          {
            "areaName": "千山区",
            "areaId": 1800
          }
        ],
        "areaId": 136
      },
      {
        "areaName": "抚顺市",
        "childrenList": [{
            "areaName": "抚顺县",
            "areaId": 1801
          },
          {
            "areaName": "新宾县",
            "areaId": 1802
          },
          {
            "areaName": "清原县",
            "areaId": 1803
          },
          {
            "areaName": "望花区",
            "areaId": 1804
          },
          {
            "areaName": "东洲区",
            "areaId": 1805
          },
          {
            "areaName": "新抚区",
            "areaId": 1806
          },
          {
            "areaName": "顺城区",
            "areaId": 1807
          }
        ],
        "areaId": 137
      },
      {
        "areaName": "本溪市",
        "childrenList": [{
            "areaName": "桓仁县",
            "areaId": 1808
          },
          {
            "areaName": "南芬区",
            "areaId": 1809
          },
          {
            "areaName": "本溪县",
            "areaId": 1810
          },
          {
            "areaName": "平山区",
            "areaId": 1811
          },
          {
            "areaName": "溪湖区",
            "areaId": 1812
          },
          {
            "areaName": "明山区",
            "areaId": 1813
          }
        ],
        "areaId": 138
      },
      {
        "areaName": "丹东市",
        "childrenList": [{
            "areaName": "宽甸县",
            "areaId": 1814
          },
          {
            "areaName": "元宝区",
            "areaId": 1815
          },
          {
            "areaName": "振兴区",
            "areaId": 1816
          },
          {
            "areaName": "振安区",
            "areaId": 1817
          },
          {
            "areaName": "东港市",
            "areaId": 1818
          },
          {
            "areaName": "凤城市",
            "areaId": 1819
          }
        ],
        "areaId": 139
      },
      {
        "areaName": "锦州市",
        "childrenList": [{
            "areaName": "义县",
            "areaId": 1820
          },
          {
            "areaName": "凌海市",
            "areaId": 1821
          },
          {
            "areaName": "北镇市",
            "areaId": 1822
          },
          {
            "areaName": "黑山县",
            "areaId": 1823
          },
          {
            "areaName": "古塔区",
            "areaId": 1824
          },
          {
            "areaName": "凌河区",
            "areaId": 1825
          },
          {
            "areaName": "太和区",
            "areaId": 1826
          },
          {
            "areaName": "经济技术开发区",
            "areaId": 1827
          }
        ],
        "areaId": 140
      },
      {
        "areaName": "葫芦岛市",
        "childrenList": [{
            "areaName": "绥中县",
            "areaId": 1828
          },
          {
            "areaName": "建昌县",
            "areaId": 1829
          },
          {
            "areaName": "南票区",
            "areaId": 1830
          },
          {
            "areaName": "龙港区",
            "areaId": 1831
          },
          {
            "areaName": "连山区",
            "areaId": 1832
          },
          {
            "areaName": "兴城市",
            "areaId": 1833
          }
        ],
        "areaId": 141
      },
      {
        "areaName": "营口市",
        "childrenList": [{
            "areaName": "大石桥市",
            "areaId": 1834
          },
          {
            "areaName": "盖州市",
            "areaId": 1835
          },
          {
            "areaName": "老边区",
            "areaId": 1836
          },
          {
            "areaName": "西市区",
            "areaId": 1837
          },
          {
            "areaName": "站前区",
            "areaId": 1838
          },
          {
            "areaName": "鲅鱼圈区",
            "areaId": 1839
          }
        ],
        "areaId": 142
      },
      {
        "areaName": "盘锦市",
        "childrenList": [{
            "areaName": "盘山县",
            "areaId": 1840
          },
          {
            "areaName": "大洼县",
            "areaId": 1841
          },
          {
            "areaName": "兴隆台区",
            "areaId": 1842
          },
          {
            "areaName": "双台子区",
            "areaId": 1843
          }
        ],
        "areaId": 143
      },
      {
        "areaName": "阜新市",
        "childrenList": [{
            "areaName": "阜新县",
            "areaId": 1844
          },
          {
            "areaName": "彰武县",
            "areaId": 1845
          },
          {
            "areaName": "清河门区",
            "areaId": 1846
          },
          {
            "areaName": "新邱区",
            "areaId": 1847
          },
          {
            "areaName": "海州区",
            "areaId": 1848
          },
          {
            "areaName": "太平区",
            "areaId": 1849
          },
          {
            "areaName": "细河区",
            "areaId": 1850
          }
        ],
        "areaId": 144
      },
      {
        "areaName": "辽阳市",
        "childrenList": [{
            "areaName": "辽阳县",
            "areaId": 1851
          },
          {
            "areaName": "太子河区",
            "areaId": 1852
          },
          {
            "areaName": "弓长岭区",
            "areaId": 1853
          },
          {
            "areaName": "宏伟区",
            "areaId": 1854
          },
          {
            "areaName": "白塔区",
            "areaId": 1855
          },
          {
            "areaName": "文圣区",
            "areaId": 1856
          },
          {
            "areaName": "灯塔市",
            "areaId": 1857
          }
        ],
        "areaId": 145
      },
      {
        "areaName": "朝阳市",
        "childrenList": [{
            "areaName": "凌源市",
            "areaId": 1858
          },
          {
            "areaName": "北票市",
            "areaId": 1859
          },
          {
            "areaName": "喀喇沁左翼县",
            "areaId": 1860
          },
          {
            "areaName": "朝阳县",
            "areaId": 1861
          },
          {
            "areaName": "建平县",
            "areaId": 1862
          },
          {
            "areaName": "龙城区",
            "areaId": 1863
          },
          {
            "areaName": "双塔区",
            "areaId": 1864
          }
        ],
        "areaId": 146
      },
      {
        "areaName": "铁岭市",
        "childrenList": [{
            "areaName": "银州区",
            "areaId": 1865
          },
          {
            "areaName": "清河区",
            "areaId": 1866
          },
          {
            "areaName": "开原市",
            "areaId": 1867
          },
          {
            "areaName": "铁岭县",
            "areaId": 1868
          },
          {
            "areaName": "西丰县",
            "areaId": 1869
          },
          {
            "areaName": "昌图县",
            "areaId": 1870
          },
          {
            "areaName": "调兵山市",
            "areaId": 1871
          }
        ],
        "areaId": 147
      }
    ],
    "areaId": 8
  },
  {
    "areaName": "吉林",
    "childrenList": [{
        "areaName": "长春市",
        "childrenList": [{
            "areaName": "榆树市",
            "areaId": 1872
          },
          {
            "areaName": "九台市",
            "areaId": 1873
          },
          {
            "areaName": "农安县",
            "areaId": 1874
          },
          {
            "areaName": "德惠市",
            "areaId": 1875
          },
          {
            "areaName": "双阳区",
            "areaId": 1876
          },
          {
            "areaName": "朝阳区",
            "areaId": 1877
          },
          {
            "areaName": "南关区",
            "areaId": 1878
          },
          {
            "areaName": "宽城区",
            "areaId": 1879
          },
          {
            "areaName": "二道区",
            "areaId": 1880
          },
          {
            "areaName": "绿园区",
            "areaId": 1881
          },
          {
            "areaName": "净月区",
            "areaId": 1882
          },
          {
            "areaName": "汽车产业开发区",
            "areaId": 1883
          },
          {
            "areaName": "高新技术开发区",
            "areaId": 1884
          },
          {
            "areaName": "经济技术开发区",
            "areaId": 1885
          }
        ],
        "areaId": 148
      },
      {
        "areaName": "吉林市",
        "childrenList": [{
            "areaName": "舒兰市",
            "areaId": 1886
          },
          {
            "areaName": "桦甸市",
            "areaId": 1887
          },
          {
            "areaName": "蛟河市",
            "areaId": 1888
          },
          {
            "areaName": "磐石市",
            "areaId": 1889
          },
          {
            "areaName": "永吉县",
            "areaId": 1890
          },
          {
            "areaName": "昌邑区",
            "areaId": 1891
          },
          {
            "areaName": "龙潭区",
            "areaId": 1892
          },
          {
            "areaName": "船营区",
            "areaId": 1893
          },
          {
            "areaName": "丰满区",
            "areaId": 1894
          }
        ],
        "areaId": 149
      },
      {
        "areaName": "四平市",
        "childrenList": [{
            "areaName": "公主岭市",
            "areaId": 1895
          },
          {
            "areaName": "双辽市",
            "areaId": 1896
          },
          {
            "areaName": "梨树县",
            "areaId": 1897
          },
          {
            "areaName": "伊通县",
            "areaId": 1898
          },
          {
            "areaName": "铁东区",
            "areaId": 1899
          },
          {
            "areaName": "铁西区",
            "areaId": 1900
          }
        ],
        "areaId": 150
      },
      {
        "areaName": "通化市",
        "childrenList": [{
            "areaName": "梅河口市",
            "areaId": 1901
          },
          {
            "areaName": "集安市",
            "areaId": 1902
          },
          {
            "areaName": "通化县",
            "areaId": 1903
          },
          {
            "areaName": "辉南县",
            "areaId": 1904
          },
          {
            "areaName": "柳河县",
            "areaId": 1905
          },
          {
            "areaName": "二道江区",
            "areaId": 1906
          },
          {
            "areaName": "东昌区",
            "areaId": 1907
          }
        ],
        "areaId": 151
      },
      {
        "areaName": "白山市",
        "childrenList": [{
            "areaName": "临江市",
            "areaId": 1908
          },
          {
            "areaName": "江源区",
            "areaId": 1909
          },
          {
            "areaName": "靖宇县",
            "areaId": 1910
          },
          {
            "areaName": "抚松县",
            "areaId": 1911
          },
          {
            "areaName": "长白县",
            "areaId": 1912
          },
          {
            "areaName": "浑江区",
            "areaId": 1913
          }
        ],
        "areaId": 152
      },
      {
        "areaName": "松原市",
        "childrenList": [{
            "areaName": "乾安县",
            "areaId": 1914
          },
          {
            "areaName": "长岭县",
            "areaId": 1915
          },
          {
            "areaName": "扶余县",
            "areaId": 1916
          },
          {
            "areaName": "宁江区",
            "areaId": 1917
          },
          {
            "areaName": "前郭县",
            "areaId": 1918
          }
        ],
        "areaId": 153
      },
      {
        "areaName": "白城市",
        "childrenList": [{
            "areaName": "大安市",
            "areaId": 1919
          },
          {
            "areaName": "洮南市",
            "areaId": 1920
          },
          {
            "areaName": "通榆县",
            "areaId": 1921
          },
          {
            "areaName": "镇赉县",
            "areaId": 1922
          },
          {
            "areaName": "洮北区",
            "areaId": 1923
          }
        ],
        "areaId": 154
      },
      {
        "areaName": "延边州",
        "childrenList": [{
            "areaName": "图们市",
            "areaId": 1924
          },
          {
            "areaName": "敦化市",
            "areaId": 1925
          },
          {
            "areaName": "珲春市",
            "areaId": 1926
          },
          {
            "areaName": "龙井市",
            "areaId": 1927
          },
          {
            "areaName": "和龙市",
            "areaId": 1928
          },
          {
            "areaName": "汪清县",
            "areaId": 1929
          },
          {
            "areaName": "安图县",
            "areaId": 1930
          },
          {
            "areaName": "延吉市",
            "areaId": 1931
          }
        ],
        "areaId": 155
      },
      {
        "areaName": "辽源市",
        "childrenList": [{
            "areaName": "龙山区",
            "areaId": 1932
          },
          {
            "areaName": "西安区",
            "areaId": 1933
          },
          {
            "areaName": "东丰县",
            "areaId": 1934
          },
          {
            "areaName": "东辽县",
            "areaId": 1935
          }
        ],
        "areaId": 156
      }
    ],
    "areaId": 9
  },
  {
    "areaName": "黑龙江",
    "childrenList": [{
        "areaName": "哈尔滨市",
        "childrenList": [{
            "areaName": "阿城区",
            "areaId": 1936
          },
          {
            "areaName": "尚志市",
            "areaId": 1937
          },
          {
            "areaName": "双城市",
            "areaId": 1938
          },
          {
            "areaName": "五常市",
            "areaId": 1939
          },
          {
            "areaName": "方正县",
            "areaId": 1940
          },
          {
            "areaName": "宾县",
            "areaId": 1941
          },
          {
            "areaName": "依兰县",
            "areaId": 1942
          },
          {
            "areaName": "巴彦县",
            "areaId": 1943
          },
          {
            "areaName": "通河县",
            "areaId": 1944
          },
          {
            "areaName": "木兰县",
            "areaId": 1945
          },
          {
            "areaName": "延寿县",
            "areaId": 1946
          },
          {
            "areaName": "呼兰区",
            "areaId": 1947
          },
          {
            "areaName": "松北区",
            "areaId": 1948
          },
          {
            "areaName": "道里区",
            "areaId": 1949
          },
          {
            "areaName": "南岗区",
            "areaId": 1950
          },
          {
            "areaName": "道外区",
            "areaId": 1951
          },
          {
            "areaName": "香坊区",
            "areaId": 1952
          },
          {
            "areaName": "平房区",
            "areaId": 1953
          }
        ],
        "areaId": 157
      },
      {
        "areaName": "齐齐哈尔市",
        "childrenList": [{
            "areaName": "梅里斯区",
            "areaId": 1954
          },
          {
            "areaName": "昂昂溪区",
            "areaId": 1955
          },
          {
            "areaName": "富拉尔基区",
            "areaId": 1956
          },
          {
            "areaName": "碾子山区",
            "areaId": 1957
          },
          {
            "areaName": "讷河市",
            "areaId": 1958
          },
          {
            "areaName": "富裕县",
            "areaId": 1959
          },
          {
            "areaName": "拜泉县",
            "areaId": 1960
          },
          {
            "areaName": "甘南县",
            "areaId": 1961
          },
          {
            "areaName": "依安县",
            "areaId": 1962
          },
          {
            "areaName": "克山县",
            "areaId": 1963
          },
          {
            "areaName": "龙江县",
            "areaId": 1964
          },
          {
            "areaName": "克东县",
            "areaId": 1965
          },
          {
            "areaName": "泰来县",
            "areaId": 1966
          },
          {
            "areaName": "建华区",
            "areaId": 1967
          },
          {
            "areaName": "龙沙区",
            "areaId": 1968
          },
          {
            "areaName": "铁锋区",
            "areaId": 1969
          }
        ],
        "areaId": 158
      },
      {
        "areaName": "鹤岗市",
        "childrenList": [{
            "areaName": "萝北县",
            "areaId": 1970
          },
          {
            "areaName": "绥滨县",
            "areaId": 1971
          },
          {
            "areaName": "兴山区",
            "areaId": 1972
          },
          {
            "areaName": "向阳区",
            "areaId": 1973
          },
          {
            "areaName": "工农区",
            "areaId": 1974
          },
          {
            "areaName": "南山区",
            "areaId": 1975
          },
          {
            "areaName": "兴安区",
            "areaId": 1976
          },
          {
            "areaName": "东山区",
            "areaId": 1977
          }
        ],
        "areaId": 159
      },
      {
        "areaName": "双鸭山市",
        "childrenList": [{
            "areaName": "集贤县",
            "areaId": 1978
          },
          {
            "areaName": "宝清县",
            "areaId": 1979
          },
          {
            "areaName": "友谊县",
            "areaId": 1980
          },
          {
            "areaName": "饶河县",
            "areaId": 1981
          },
          {
            "areaName": "尖山区",
            "areaId": 1982
          },
          {
            "areaName": "岭东区",
            "areaId": 1983
          },
          {
            "areaName": "四方台区",
            "areaId": 1984
          },
          {
            "areaName": "宝山区",
            "areaId": 1985
          }
        ],
        "areaId": 160
      },
      {
        "areaName": "鸡西市",
        "childrenList": [{
            "areaName": "密山市",
            "areaId": 1986
          },
          {
            "areaName": "虎林市",
            "areaId": 1987
          },
          {
            "areaName": "鸡东县",
            "areaId": 1988
          },
          {
            "areaName": "恒山区",
            "areaId": 1989
          },
          {
            "areaName": "滴道区",
            "areaId": 1990
          },
          {
            "areaName": "梨树区",
            "areaId": 1991
          },
          {
            "areaName": "城子河区",
            "areaId": 1992
          },
          {
            "areaName": "麻山区",
            "areaId": 1993
          },
          {
            "areaName": "鸡冠区",
            "areaId": 1994
          }
        ],
        "areaId": 161
      },
      {
        "areaName": "大庆市",
        "childrenList": [{
            "areaName": "萨尔图区",
            "areaId": 1995
          },
          {
            "areaName": "龙凤区",
            "areaId": 1996
          },
          {
            "areaName": "让胡路区",
            "areaId": 1997
          },
          {
            "areaName": "红岗区",
            "areaId": 1998
          },
          {
            "areaName": "大同区",
            "areaId": 1999
          },
          {
            "areaName": "林甸县",
            "areaId": 2000
          },
          {
            "areaName": "肇州县",
            "areaId": 2001
          },
          {
            "areaName": "肇源县",
            "areaId": 2002
          },
          {
            "areaName": "杜尔伯特县",
            "areaId": 2003
          }
        ],
        "areaId": 162
      },
      {
        "areaName": "伊春市",
        "childrenList": [{
            "areaName": "铁力市",
            "areaId": 2004
          },
          {
            "areaName": "嘉荫县",
            "areaId": 2005
          },
          {
            "areaName": "伊春区",
            "areaId": 2006
          },
          {
            "areaName": "南岔区",
            "areaId": 2007
          },
          {
            "areaName": "友好区",
            "areaId": 2008
          },
          {
            "areaName": "西林区",
            "areaId": 2009
          },
          {
            "areaName": "翠峦区",
            "areaId": 2010
          },
          {
            "areaName": "新青区",
            "areaId": 2011
          },
          {
            "areaName": "美溪区",
            "areaId": 2012
          },
          {
            "areaName": "金山屯区",
            "areaId": 2013
          },
          {
            "areaName": "五营区",
            "areaId": 2014
          },
          {
            "areaName": "乌马河区",
            "areaId": 2015
          },
          {
            "areaName": "汤旺河区",
            "areaId": 2016
          },
          {
            "areaName": "带岭区",
            "areaId": 2017
          },
          {
            "areaName": "乌伊岭区",
            "areaId": 2018
          },
          {
            "areaName": "红星区",
            "areaId": 2019
          },
          {
            "areaName": "上甘岭区",
            "areaId": 2020
          }
        ],
        "areaId": 163
      },
      {
        "areaName": "牡丹江市",
        "childrenList": [{
            "areaName": "海林市",
            "areaId": 2021
          },
          {
            "areaName": "宁安市",
            "areaId": 2022
          },
          {
            "areaName": "穆棱市",
            "areaId": 2023
          },
          {
            "areaName": "林口县",
            "areaId": 2024
          },
          {
            "areaName": "东宁县",
            "areaId": 2025
          },
          {
            "areaName": "爱民区",
            "areaId": 2026
          },
          {
            "areaName": "东安区",
            "areaId": 2027
          },
          {
            "areaName": "阳明区",
            "areaId": 2028
          },
          {
            "areaName": "西安区",
            "areaId": 2029
          },
          {
            "areaName": "绥芬河市",
            "areaId": 2030
          }
        ],
        "areaId": 164
      },
      {
        "areaName": "佳木斯市",
        "childrenList": [{
            "areaName": "同江市",
            "areaId": 2031
          },
          {
            "areaName": "富锦市",
            "areaId": 2032
          },
          {
            "areaName": "桦川县",
            "areaId": 2033
          },
          {
            "areaName": "抚远县",
            "areaId": 2034
          },
          {
            "areaName": "桦南县",
            "areaId": 2035
          },
          {
            "areaName": "汤原县",
            "areaId": 2036
          },
          {
            "areaName": "前进区",
            "areaId": 2037
          },
          {
            "areaName": "向阳区",
            "areaId": 2038
          },
          {
            "areaName": "东风区",
            "areaId": 2039
          },
          {
            "areaName": "郊区",
            "areaId": 2040
          }
        ],
        "areaId": 165
      },
      {
        "areaName": "七台河市",
        "childrenList": [{
            "areaName": "勃利县",
            "areaId": 2041
          },
          {
            "areaName": "桃山区",
            "areaId": 2042
          },
          {
            "areaName": "新兴区",
            "areaId": 2043
          },
          {
            "areaName": "茄子河区",
            "areaId": 2044
          }
        ],
        "areaId": 166
      },
      {
        "areaName": "黑河市",
        "childrenList": [{
            "areaName": "北安市",
            "areaId": 2045
          },
          {
            "areaName": "五大连池市",
            "areaId": 2046
          },
          {
            "areaName": "逊克县",
            "areaId": 2047
          },
          {
            "areaName": "孙吴县",
            "areaId": 2048
          },
          {
            "areaName": "嫩江县",
            "areaId": 2049
          },
          {
            "areaName": "爱辉区",
            "areaId": 2050
          }
        ],
        "areaId": 167
      },
      {
        "areaName": "绥化市",
        "childrenList": [{
            "areaName": "安达市",
            "areaId": 2051
          },
          {
            "areaName": "肇东市",
            "areaId": 2052
          },
          {
            "areaName": "海伦市",
            "areaId": 2053
          },
          {
            "areaName": "绥棱县",
            "areaId": 2054
          },
          {
            "areaName": "兰西县",
            "areaId": 2055
          },
          {
            "areaName": "明水县",
            "areaId": 2056
          },
          {
            "areaName": "青冈县",
            "areaId": 2057
          },
          {
            "areaName": "庆安县",
            "areaId": 2058
          },
          {
            "areaName": "望奎县",
            "areaId": 2059
          },
          {
            "areaName": "北林区",
            "areaId": 2060
          }
        ],
        "areaId": 168
      },
      {
        "areaName": "大兴安岭地区",
        "childrenList": [{
            "areaName": "呼玛县",
            "areaId": 2061
          },
          {
            "areaName": "塔河县",
            "areaId": 2062
          },
          {
            "areaName": "漠河县",
            "areaId": 2063
          },
          {
            "areaName": "加格达奇区",
            "areaId": 2064
          },
          {
            "areaName": "松岭区",
            "areaId": 2065
          },
          {
            "areaName": "呼中区",
            "areaId": 2066
          },
          {
            "areaName": "新林区",
            "areaId": 2067
          }
        ],
        "areaId": 169
      }
    ],
    "areaId": 10
  },
  {
    "areaName": "内蒙古",
    "childrenList": [{
        "areaName": "呼和浩特市",
        "childrenList": [{
            "areaName": "土默特左旗",
            "areaId": 2068
          },
          {
            "areaName": "和林格尔县",
            "areaId": 2069
          },
          {
            "areaName": "武川县",
            "areaId": 2070
          },
          {
            "areaName": "托克托县",
            "areaId": 2071
          },
          {
            "areaName": "清水河县",
            "areaId": 2072
          },
          {
            "areaName": "玉泉区",
            "areaId": 2073
          },
          {
            "areaName": "赛罕区",
            "areaId": 2074
          },
          {
            "areaName": "回民区",
            "areaId": 2075
          },
          {
            "areaName": "新城区",
            "areaId": 2076
          }
        ],
        "areaId": 170
      },
      {
        "areaName": "包头市",
        "childrenList": [{
            "areaName": "固阳县",
            "areaId": 2077
          },
          {
            "areaName": "土默特右旗",
            "areaId": 2078
          },
          {
            "areaName": "达茂联合旗",
            "areaId": 2079
          },
          {
            "areaName": "石拐区",
            "areaId": 2080
          },
          {
            "areaName": "白云矿区",
            "areaId": 2081
          },
          {
            "areaName": "东河区",
            "areaId": 2082
          },
          {
            "areaName": "九原区",
            "areaId": 2083
          },
          {
            "areaName": "青山区",
            "areaId": 2084
          },
          {
            "areaName": "昆都仑区",
            "areaId": 2085
          }
        ],
        "areaId": 171
      },
      {
        "areaName": "乌海市",
        "childrenList": [{
            "areaName": "海勃湾区",
            "areaId": 2086
          },
          {
            "areaName": "海南区",
            "areaId": 2087
          },
          {
            "areaName": "乌达区",
            "areaId": 2088
          }
        ],
        "areaId": 172
      },
      {
        "areaName": "赤峰市",
        "childrenList": [{
            "areaName": "宁城县",
            "areaId": 2089
          },
          {
            "areaName": "敖汉旗",
            "areaId": 2090
          },
          {
            "areaName": "喀喇沁旗",
            "areaId": 2091
          },
          {
            "areaName": "翁牛特旗",
            "areaId": 2092
          },
          {
            "areaName": "巴林右旗",
            "areaId": 2093
          },
          {
            "areaName": "林西县",
            "areaId": 2094
          },
          {
            "areaName": "克什克腾旗",
            "areaId": 2095
          },
          {
            "areaName": "巴林左旗",
            "areaId": 2096
          },
          {
            "areaName": "阿鲁科尔沁旗",
            "areaId": 2097
          },
          {
            "areaName": "元宝山区",
            "areaId": 2098
          },
          {
            "areaName": "松山区",
            "areaId": 2099
          },
          {
            "areaName": "红山区",
            "areaId": 2100
          }
        ],
        "areaId": 173
      },
      {
        "areaName": "乌兰察布市",
        "childrenList": [{
            "areaName": "集宁区",
            "areaId": 2101
          },
          {
            "areaName": "丰镇市",
            "areaId": 2102
          },
          {
            "areaName": "兴和县",
            "areaId": 2103
          },
          {
            "areaName": "卓资县",
            "areaId": 2104
          },
          {
            "areaName": "商都县",
            "areaId": 2105
          },
          {
            "areaName": "凉城县",
            "areaId": 2106
          },
          {
            "areaName": "化德县",
            "areaId": 2107
          },
          {
            "areaName": "察哈尔右翼前旗",
            "areaId": 2108
          },
          {
            "areaName": "察哈尔右翼中旗",
            "areaId": 2109
          },
          {
            "areaName": "察哈尔右翼后旗",
            "areaId": 2110
          },
          {
            "areaName": "四子王旗",
            "areaId": 2111
          }
        ],
        "areaId": 174
      },
      {
        "areaName": "锡林郭勒盟",
        "childrenList": [{
            "areaName": "锡林浩特市",
            "areaId": 2112
          },
          {
            "areaName": "二连浩特市",
            "areaId": 2113
          },
          {
            "areaName": "多伦县",
            "areaId": 2114
          },
          {
            "areaName": "阿巴嘎旗",
            "areaId": 2115
          },
          {
            "areaName": "西乌珠穆沁旗",
            "areaId": 2116
          },
          {
            "areaName": "东乌珠穆沁旗",
            "areaId": 2117
          },
          {
            "areaName": "苏尼特右旗",
            "areaId": 2118
          },
          {
            "areaName": "苏尼特左旗",
            "areaId": 2119
          },
          {
            "areaName": "太仆寺旗",
            "areaId": 2120
          },
          {
            "areaName": "正镶白旗",
            "areaId": 2121
          },
          {
            "areaName": "正蓝旗",
            "areaId": 2122
          },
          {
            "areaName": "镶黄旗",
            "areaId": 2123
          }
        ],
        "areaId": 175
      },
      {
        "areaName": "呼伦贝尔市",
        "childrenList": [{
            "areaName": "海拉尔区",
            "areaId": 2124
          },
          {
            "areaName": "满洲里市",
            "areaId": 2125
          },
          {
            "areaName": "牙克石市",
            "areaId": 2126
          },
          {
            "areaName": "扎兰屯市",
            "areaId": 2127
          },
          {
            "areaName": "根河市",
            "areaId": 2128
          },
          {
            "areaName": "额尔古纳市",
            "areaId": 2129
          },
          {
            "areaName": "陈巴尔虎旗",
            "areaId": 2130
          },
          {
            "areaName": "阿荣旗",
            "areaId": 2131
          },
          {
            "areaName": "新巴尔虎左旗",
            "areaId": 2132
          },
          {
            "areaName": "新巴尔虎右旗",
            "areaId": 2133
          },
          {
            "areaName": "鄂伦春旗",
            "areaId": 2134
          },
          {
            "areaName": "莫力达瓦旗",
            "areaId": 2135
          },
          {
            "areaName": "鄂温克族旗",
            "areaId": 2136
          }
        ],
        "areaId": 176
      },
      {
        "areaName": "鄂尔多斯市",
        "childrenList": [{
            "areaName": "东胜区",
            "areaId": 2137
          },
          {
            "areaName": "准格尔旗",
            "areaId": 2138
          },
          {
            "areaName": "伊金霍洛旗",
            "areaId": 2139
          },
          {
            "areaName": "乌审旗",
            "areaId": 2140
          },
          {
            "areaName": "杭锦旗",
            "areaId": 2141
          },
          {
            "areaName": "鄂托克旗",
            "areaId": 2142
          },
          {
            "areaName": "鄂托克前旗",
            "areaId": 2143
          },
          {
            "areaName": "达拉特旗",
            "areaId": 2144
          },
          {
            "areaName": "康巴什新区",
            "areaId": 2145
          }
        ],
        "areaId": 177
      },
      {
        "areaName": "巴彦淖尔市",
        "childrenList": [{
            "areaName": "临河区",
            "areaId": 2146
          },
          {
            "areaName": "五原县",
            "areaId": 2147
          },
          {
            "areaName": "磴口县",
            "areaId": 2148
          },
          {
            "areaName": "杭锦后旗",
            "areaId": 2149
          },
          {
            "areaName": "乌拉特中旗",
            "areaId": 2150
          },
          {
            "areaName": "乌拉特后旗 ",
            "areaId": 2151
          },
          {
            "areaName": "乌拉特前旗",
            "areaId": 2152
          }
        ],
        "areaId": 178
      },
      {
        "areaName": "阿拉善盟",
        "childrenList": [{
            "areaName": "阿拉善右旗",
            "areaId": 2153
          },
          {
            "areaName": "阿拉善左旗",
            "areaId": 2154
          },
          {
            "areaName": "额济纳旗",
            "areaId": 2155
          }
        ],
        "areaId": 179
      },
      {
        "areaName": "兴安盟",
        "childrenList": [{
            "areaName": "乌兰浩特市",
            "areaId": 2156
          },
          {
            "areaName": "阿尔山市",
            "areaId": 2157
          },
          {
            "areaName": "突泉县",
            "areaId": 2158
          },
          {
            "areaName": "扎赍特旗",
            "areaId": 2159
          },
          {
            "areaName": "科尔沁右翼前旗",
            "areaId": 2160
          },
          {
            "areaName": "科尔沁右翼中旗",
            "areaId": 2161
          }
        ],
        "areaId": 180
      },
      {
        "areaName": "通辽市",
        "childrenList": [{
            "areaName": "霍林郭勒市",
            "areaId": 2162
          },
          {
            "areaName": "开鲁县",
            "areaId": 2163
          },
          {
            "areaName": "库伦旗",
            "areaId": 2164
          },
          {
            "areaName": "奈曼旗",
            "areaId": 2165
          },
          {
            "areaName": "扎鲁特旗",
            "areaId": 2166
          },
          {
            "areaName": "科尔沁左翼中旗",
            "areaId": 2167
          },
          {
            "areaName": "科尔沁左翼后旗",
            "areaId": 2168
          },
          {
            "areaName": "科尔沁区",
            "areaId": 2169
          }
        ],
        "areaId": 181
      }
    ],
    "areaId": 11
  },
  {
    "areaName": "江苏",
    "childrenList": [{
        "areaName": "南京市",
        "childrenList": [{
            "areaName": "江宁区",
            "areaId": 2170
          },
          {
            "areaName": "高淳区",
            "areaId": 2171
          },
          {
            "areaName": "六合区",
            "areaId": 2172
          },
          {
            "areaName": "溧水区",
            "areaId": 2173
          },
          {
            "areaName": "玄武区",
            "areaId": 2174
          },
          {
            "areaName": "秦淮区",
            "areaId": 2175
          },
          {
            "areaName": "建邺区",
            "areaId": 2176
          },
          {
            "areaName": "鼓楼区",
            "areaId": 2177
          },
          {
            "areaName": "栖霞区",
            "areaId": 2178
          },
          {
            "areaName": "雨花台区",
            "areaId": 2179
          },
          {
            "areaName": "浦口区",
            "areaId": 2180
          }
        ],
        "areaId": 182
      },
      {
        "areaName": "徐州市",
        "childrenList": [{
            "areaName": "铜山区",
            "areaId": 2181
          },
          {
            "areaName": "睢宁县",
            "areaId": 2182
          },
          {
            "areaName": "沛县",
            "areaId": 2183
          },
          {
            "areaName": "丰县",
            "areaId": 2184
          },
          {
            "areaName": "贾汪区",
            "areaId": 2185
          },
          {
            "areaName": "金山桥开发区",
            "areaId": 2186
          },
          {
            "areaName": "铜山经济技术开发区",
            "areaId": 2187
          },
          {
            "areaName": "八段工业园区",
            "areaId": 2188
          },
          {
            "areaName": "鼓楼区",
            "areaId": 2189
          },
          {
            "areaName": "邳州市",
            "areaId": 2190
          },
          {
            "areaName": "泉山区",
            "areaId": 2191
          },
          {
            "areaName": "新沂市",
            "areaId": 2192
          },
          {
            "areaName": "云龙区",
            "areaId": 2193
          }
        ],
        "areaId": 183
      },
      {
        "areaName": "连云港市",
        "childrenList": [{
            "areaName": "赣榆县",
            "areaId": 2194
          },
          {
            "areaName": "灌云县",
            "areaId": 2195
          },
          {
            "areaName": "东海县",
            "areaId": 2196
          },
          {
            "areaName": "灌南县",
            "areaId": 2197
          },
          {
            "areaName": "连云区",
            "areaId": 2198
          },
          {
            "areaName": "海州区",
            "areaId": 2199
          },
          {
            "areaName": "新浦区",
            "areaId": 2200
          }
        ],
        "areaId": 184
      },
      {
        "areaName": "淮安市",
        "childrenList": [{
            "areaName": "楚州区",
            "areaId": 2201
          },
          {
            "areaName": "洪泽县",
            "areaId": 2202
          },
          {
            "areaName": "金湖县",
            "areaId": 2203
          },
          {
            "areaName": "盱眙县",
            "areaId": 2204
          },
          {
            "areaName": "经济开发区",
            "areaId": 2205
          },
          {
            "areaName": "清河区",
            "areaId": 2206
          },
          {
            "areaName": "淮阴区",
            "areaId": 2207
          },
          {
            "areaName": "清浦区",
            "areaId": 2208
          },
          {
            "areaName": "涟水县",
            "areaId": 2209
          }
        ],
        "areaId": 185
      },
      {
        "areaName": "宿迁市",
        "childrenList": [{
            "areaName": "宿豫区",
            "areaId": 2210
          },
          {
            "areaName": "泗洪县",
            "areaId": 2211
          },
          {
            "areaName": "宿城区",
            "areaId": 2212
          },
          {
            "areaName": "沭阳县",
            "areaId": 2213
          },
          {
            "areaName": "泗阳县",
            "areaId": 2214
          },
          {
            "areaName": "宿迁经济开发区",
            "areaId": 2215
          }
        ],
        "areaId": 186
      },
      {
        "areaName": "盐城市",
        "childrenList": [{
            "areaName": "东台市",
            "areaId": 2216
          },
          {
            "areaName": "大丰市",
            "areaId": 2217
          },
          {
            "areaName": "建湖县",
            "areaId": 2218
          },
          {
            "areaName": "响水县",
            "areaId": 2219
          },
          {
            "areaName": "阜宁县",
            "areaId": 2220
          },
          {
            "areaName": "滨海县",
            "areaId": 2221
          },
          {
            "areaName": "射阳县",
            "areaId": 2222
          },
          {
            "areaName": "亭湖区",
            "areaId": 2223
          },
          {
            "areaName": "盐都区",
            "areaId": 2224
          }
        ],
        "areaId": 187
      },
      {
        "areaName": "扬州市",
        "childrenList": [{
            "areaName": "广陵区",
            "areaId": 2225
          },
          {
            "areaName": "邗江区",
            "areaId": 2226
          },
          {
            "areaName": "宝应县",
            "areaId": 2227
          },
          {
            "areaName": "仪征市",
            "areaId": 2228
          },
          {
            "areaName": "高邮市",
            "areaId": 2229
          },
          {
            "areaName": "江都区",
            "areaId": 2230
          }
        ],
        "areaId": 188
      },
      {
        "areaName": "泰州市",
        "childrenList": [{
            "areaName": "泰兴市",
            "areaId": 2231
          },
          {
            "areaName": "靖江市",
            "areaId": 2232
          },
          {
            "areaName": "兴化市",
            "areaId": 2233
          },
          {
            "areaName": "高港区",
            "areaId": 2234
          },
          {
            "areaName": "海陵区",
            "areaId": 2235
          },
          {
            "areaName": "姜堰市",
            "areaId": 2236
          }
        ],
        "areaId": 189
      },
      {
        "areaName": "南通市",
        "childrenList": [{
            "areaName": "通州区",
            "areaId": 2237
          },
          {
            "areaName": "如东县",
            "areaId": 2238
          },
          {
            "areaName": "海安县",
            "areaId": 2239
          },
          {
            "areaName": "港闸区",
            "areaId": 2240
          },
          {
            "areaName": "崇川区",
            "areaId": 2241
          },
          {
            "areaName": "南通经济技术开发区",
            "areaId": 2242
          },
          {
            "areaName": "如皋市",
            "areaId": 2243
          },
          {
            "areaName": "海门市",
            "areaId": 2244
          },
          {
            "areaName": "启东市",
            "areaId": 2245
          }
        ],
        "areaId": 190
      },
      {
        "areaName": "镇江市",
        "childrenList": [{
            "areaName": "扬中市",
            "areaId": 2246
          },
          {
            "areaName": "丹徒区",
            "areaId": 2247
          },
          {
            "areaName": "润州区",
            "areaId": 2248
          },
          {
            "areaName": "京口区",
            "areaId": 2249
          },
          {
            "areaName": "镇江新区",
            "areaId": 2250
          },
          {
            "areaName": "丹阳市",
            "areaId": 2251
          },
          {
            "areaName": "句容市",
            "areaId": 2252
          },
          {
            "areaName": "丹徒新区",
            "areaId": 2253
          }
        ],
        "areaId": 191
      },
      {
        "areaName": "常州市",
        "childrenList": [{
            "areaName": "金坛市",
            "areaId": 2254
          },
          {
            "areaName": "溧阳市",
            "areaId": 2255
          },
          {
            "areaName": "新北区",
            "areaId": 2256
          },
          {
            "areaName": "戚墅堰区",
            "areaId": 2257
          },
          {
            "areaName": "钟楼区",
            "areaId": 2258
          },
          {
            "areaName": "天宁区",
            "areaId": 2259
          },
          {
            "areaName": "武进区",
            "areaId": 2260
          }
        ],
        "areaId": 192
      },
      {
        "areaName": "无锡市",
        "childrenList": [{
            "areaName": "崇安区",
            "areaId": 2261
          },
          {
            "areaName": "南长区",
            "areaId": 2262
          },
          {
            "areaName": "北塘区",
            "areaId": 2263
          },
          {
            "areaName": "锡山区",
            "areaId": 2264
          },
          {
            "areaName": "惠山区",
            "areaId": 2265
          },
          {
            "areaName": "新区",
            "areaId": 2266
          },
          {
            "areaName": "江阴市",
            "areaId": 2267
          },
          {
            "areaName": "宜兴市",
            "areaId": 2268
          },
          {
            "areaName": "滨湖区",
            "areaId": 2269
          }
        ],
        "areaId": 193
      },
      {
        "areaName": "苏州市",
        "childrenList": [{
            "areaName": "常熟市",
            "areaId": 2270
          },
          {
            "areaName": "张家港市",
            "areaId": 2271
          },
          {
            "areaName": "相城区",
            "areaId": 2272
          },
          {
            "areaName": "金阊区",
            "areaId": 2273
          },
          {
            "areaName": "虎丘区",
            "areaId": 2274
          },
          {
            "areaName": "平江区",
            "areaId": 2275
          },
          {
            "areaName": "沧浪区",
            "areaId": 2276
          },
          {
            "areaName": "工业园区",
            "areaId": 2277
          },
          {
            "areaName": "高新区",
            "areaId": 2278
          },
          {
            "areaName": "太仓市",
            "areaId": 2279
          },
          {
            "areaName": "吴江区",
            "areaId": 2280
          },
          {
            "areaName": "吴中区",
            "areaId": 2281
          },
          {
            "areaName": "昆山市",
            "areaId": 2282
          }
        ],
        "areaId": 194
      }
    ],
    "areaId": 12
  },
  {
    "areaName": "山东",
    "childrenList": [{
        "areaName": "济南市",
        "childrenList": [{
            "areaName": "长清区",
            "areaId": 2283
          },
          {
            "areaName": "平阴县",
            "areaId": 2284
          },
          {
            "areaName": "济阳县",
            "areaId": 2285
          },
          {
            "areaName": "商河县",
            "areaId": 2286
          },
          {
            "areaName": "高新区",
            "areaId": 2287
          },
          {
            "areaName": "历城区",
            "areaId": 2288
          },
          {
            "areaName": "天桥区",
            "areaId": 2289
          },
          {
            "areaName": "槐荫区",
            "areaId": 2290
          },
          {
            "areaName": "历下区",
            "areaId": 2291
          },
          {
            "areaName": "市中区",
            "areaId": 2292
          },
          {
            "areaName": "章丘市",
            "areaId": 2293
          }
        ],
        "areaId": 195
      },
      {
        "areaName": "青岛市",
        "childrenList": [{
            "areaName": "莱西市",
            "areaId": 2294
          },
          {
            "areaName": "四方区",
            "areaId": 2295
          },
          {
            "areaName": "市北区",
            "areaId": 2296
          },
          {
            "areaName": "市南区",
            "areaId": 2297
          },
          {
            "areaName": "李沧区",
            "areaId": 2298
          },
          {
            "areaName": "黄岛区",
            "areaId": 2299
          },
          {
            "areaName": "即墨市",
            "areaId": 2300
          },
          {
            "areaName": "城阳区",
            "areaId": 2301
          },
          {
            "areaName": "崂山区",
            "areaId": 2302
          },
          {
            "areaName": "胶州市",
            "areaId": 2303
          },
          {
            "areaName": "平度市",
            "areaId": 2304
          }
        ],
        "areaId": 196
      },
      {
        "areaName": "淄博市",
        "childrenList": [{
            "areaName": "高青县",
            "areaId": 2305
          },
          {
            "areaName": "沂源县",
            "areaId": 2306
          },
          {
            "areaName": "桓台县",
            "areaId": 2307
          },
          {
            "areaName": "周村区",
            "areaId": 2308
          },
          {
            "areaName": "淄川区",
            "areaId": 2309
          },
          {
            "areaName": "博山区",
            "areaId": 2310
          },
          {
            "areaName": "临淄区",
            "areaId": 2311
          },
          {
            "areaName": "张店区",
            "areaId": 2312
          }
        ],
        "areaId": 197
      },
      {
        "areaName": "枣庄市",
        "childrenList": [{
            "areaName": "山亭区",
            "areaId": 2313
          },
          {
            "areaName": "台儿庄区",
            "areaId": 2314
          },
          {
            "areaName": "峄城区",
            "areaId": 2315
          },
          {
            "areaName": "薛城区",
            "areaId": 2316
          },
          {
            "areaName": "市中区",
            "areaId": 2317
          },
          {
            "areaName": "滕州市",
            "areaId": 2318
          }
        ],
        "areaId": 198
      },
      {
        "areaName": "东营市",
        "childrenList": [{
            "areaName": "河口区",
            "areaId": 2319
          },
          {
            "areaName": "广饶县",
            "areaId": 2320
          },
          {
            "areaName": "利津县",
            "areaId": 2321
          },
          {
            "areaName": "垦利县",
            "areaId": 2322
          },
          {
            "areaName": "东营区",
            "areaId": 2323
          }
        ],
        "areaId": 199
      },
      {
        "areaName": "潍坊市",
        "childrenList": [{
            "areaName": "青州市",
            "areaId": 2324
          },
          {
            "areaName": "诸城市",
            "areaId": 2325
          },
          {
            "areaName": "安丘市",
            "areaId": 2326
          },
          {
            "areaName": "高密市",
            "areaId": 2327
          },
          {
            "areaName": "昌邑市",
            "areaId": 2328
          },
          {
            "areaName": "昌乐县",
            "areaId": 2329
          },
          {
            "areaName": "临朐县",
            "areaId": 2330
          },
          {
            "areaName": "坊子区",
            "areaId": 2331
          },
          {
            "areaName": "潍城区",
            "areaId": 2332
          },
          {
            "areaName": "奎文区",
            "areaId": 2333
          },
          {
            "areaName": "高新区",
            "areaId": 2334
          },
          {
            "areaName": "寒亭区",
            "areaId": 2335
          },
          {
            "areaName": "寿光市",
            "areaId": 2336
          }
        ],
        "areaId": 200
      },
      {
        "areaName": "烟台市",
        "childrenList": [{
            "areaName": "莱阳市",
            "areaId": 2337
          },
          {
            "areaName": "招远市",
            "areaId": 2338
          },
          {
            "areaName": "蓬莱市",
            "areaId": 2339
          },
          {
            "areaName": "栖霞市",
            "areaId": 2340
          },
          {
            "areaName": "海阳市",
            "areaId": 2341
          },
          {
            "areaName": "长岛县",
            "areaId": 2342
          },
          {
            "areaName": "芝罘区",
            "areaId": 2343
          },
          {
            "areaName": "莱山区",
            "areaId": 2344
          },
          {
            "areaName": "福山区",
            "areaId": 2345
          },
          {
            "areaName": "牟平区",
            "areaId": 2346
          },
          {
            "areaName": "龙口市",
            "areaId": 2347
          },
          {
            "areaName": "莱州市",
            "areaId": 2348
          },
          {
            "areaName": "开发区",
            "areaId": 2349
          }
        ],
        "areaId": 201
      },
      {
        "areaName": "威海市",
        "childrenList": [{
            "areaName": "乳山市",
            "areaId": 2350
          },
          {
            "areaName": "环翠区",
            "areaId": 2351
          },
          {
            "areaName": "荣成市",
            "areaId": 2352
          },
          {
            "areaName": "文登市",
            "areaId": 2353
          }
        ],
        "areaId": 202
      },
      {
        "areaName": "莱芜市",
        "childrenList": [{
            "areaName": "莱城区",
            "areaId": 2354
          },
          {
            "areaName": "钢城区",
            "areaId": 2355
          }
        ],
        "areaId": 203
      },
      {
        "areaName": "德州市",
        "childrenList": [{
            "areaName": "乐陵市",
            "areaId": 2356
          },
          {
            "areaName": "禹城市",
            "areaId": 2357
          },
          {
            "areaName": "陵县",
            "areaId": 2358
          },
          {
            "areaName": "宁津县",
            "areaId": 2359
          },
          {
            "areaName": "武城县",
            "areaId": 2360
          },
          {
            "areaName": "庆云县",
            "areaId": 2361
          },
          {
            "areaName": "平原县",
            "areaId": 2362
          },
          {
            "areaName": "临邑县",
            "areaId": 2363
          },
          {
            "areaName": "夏津县",
            "areaId": 2364
          },
          {
            "areaName": "德城区",
            "areaId": 2365
          },
          {
            "areaName": "齐河县",
            "areaId": 2366
          }
        ],
        "areaId": 204
      },
      {
        "areaName": "临沂市",
        "childrenList": [{
            "areaName": "沂南县",
            "areaId": 2367
          },
          {
            "areaName": "沂水县",
            "areaId": 2368
          },
          {
            "areaName": "苍山县",
            "areaId": 2369
          },
          {
            "areaName": "费县",
            "areaId": 2370
          },
          {
            "areaName": "平邑县",
            "areaId": 2371
          },
          {
            "areaName": "蒙阴县",
            "areaId": 2372
          },
          {
            "areaName": "临沭县",
            "areaId": 2373
          },
          {
            "areaName": "莒南县",
            "areaId": 2374
          },
          {
            "areaName": "郯城县",
            "areaId": 2375
          },
          {
            "areaName": "罗庄区",
            "areaId": 2376
          },
          {
            "areaName": "兰山区",
            "areaId": 2377
          },
          {
            "areaName": "河东区",
            "areaId": 2378
          }
        ],
        "areaId": 205
      },
      {
        "areaName": "聊城市",
        "childrenList": [{
            "areaName": "临清市",
            "areaId": 2379
          },
          {
            "areaName": "阳谷县",
            "areaId": 2380
          },
          {
            "areaName": "茌平县",
            "areaId": 2381
          },
          {
            "areaName": "莘县",
            "areaId": 2382
          },
          {
            "areaName": "东阿县",
            "areaId": 2383
          },
          {
            "areaName": "冠县",
            "areaId": 2384
          },
          {
            "areaName": "高唐县",
            "areaId": 2385
          },
          {
            "areaName": "东昌府区",
            "areaId": 2386
          }
        ],
        "areaId": 206
      },
      {
        "areaName": "滨州市",
        "childrenList": [{
            "areaName": "邹平县",
            "areaId": 2387
          },
          {
            "areaName": "沾化县",
            "areaId": 2388
          },
          {
            "areaName": "惠民县",
            "areaId": 2389
          },
          {
            "areaName": "博兴县",
            "areaId": 2390
          },
          {
            "areaName": "阳信县",
            "areaId": 2391
          },
          {
            "areaName": "无棣县",
            "areaId": 2392
          },
          {
            "areaName": "北海新区",
            "areaId": 2393
          },
          {
            "areaName": "滨城区",
            "areaId": 2394
          }
        ],
        "areaId": 207
      },
      {
        "areaName": "菏泽市",
        "childrenList": [{
            "areaName": "单县",
            "areaId": 2395
          },
          {
            "areaName": "曹县",
            "areaId": 2396
          },
          {
            "areaName": "定陶县",
            "areaId": 2397
          },
          {
            "areaName": "巨野县",
            "areaId": 2398
          },
          {
            "areaName": "成武县",
            "areaId": 2399
          },
          {
            "areaName": "东明县",
            "areaId": 2400
          },
          {
            "areaName": "郓城县",
            "areaId": 2401
          },
          {
            "areaName": "鄄城县",
            "areaId": 2402
          },
          {
            "areaName": "牡丹区",
            "areaId": 2403
          }
        ],
        "areaId": 208
      },
      {
        "areaName": "日照市",
        "childrenList": [{
            "areaName": "五莲县",
            "areaId": 2404
          },
          {
            "areaName": "莒县",
            "areaId": 2405
          },
          {
            "areaName": "岚山区",
            "areaId": 2406
          },
          {
            "areaName": "新市区",
            "areaId": 2407
          },
          {
            "areaName": "东港区",
            "areaId": 2408
          }
        ],
        "areaId": 209
      },
      {
        "areaName": "泰安市",
        "childrenList": [{
            "areaName": "东平县",
            "areaId": 2409
          },
          {
            "areaName": "宁阳县",
            "areaId": 2410
          },
          {
            "areaName": "岱岳区",
            "areaId": 2411
          },
          {
            "areaName": "泰山区",
            "areaId": 2412
          },
          {
            "areaName": "肥城市",
            "areaId": 2413
          },
          {
            "areaName": "新泰市",
            "areaId": 2414
          }
        ],
        "areaId": 210
      },
      {
        "areaName": "济宁市",
        "childrenList": [{
            "areaName": "梁山县",
            "areaId": 2415
          },
          {
            "areaName": "兖州市",
            "areaId": 2416
          },
          {
            "areaName": "微山县",
            "areaId": 2417
          },
          {
            "areaName": "汶上县",
            "areaId": 2418
          },
          {
            "areaName": "泗水县",
            "areaId": 2419
          },
          {
            "areaName": "嘉祥县",
            "areaId": 2420
          },
          {
            "areaName": "鱼台县",
            "areaId": 2421
          },
          {
            "areaName": "金乡县",
            "areaId": 2422
          },
          {
            "areaName": "任城区",
            "areaId": 2423
          },
          {
            "areaName": "邹城市",
            "areaId": 2424
          },
          {
            "areaName": "市中区",
            "areaId": 2425
          },
          {
            "areaName": "曲阜市",
            "areaId": 2426
          },
          {
            "areaName": "高新区",
            "areaId": 2427
          }
        ],
        "areaId": 211
      }
    ],
    "areaId": 13
  },
  {
    "areaName": "安徽",
    "childrenList": [{
        "areaName": "铜陵市",
        "childrenList": [{
            "areaName": "铜官山区",
            "areaId": 2428
          },
          {
            "areaName": "郊区",
            "areaId": 2429
          },
          {
            "areaName": "狮子山区",
            "areaId": 2430
          },
          {
            "areaName": "铜陵县",
            "areaId": 2431
          }
        ],
        "areaId": 212
      },
      {
        "areaName": "合肥市",
        "childrenList": [{
            "areaName": "肥东县",
            "areaId": 2432
          },
          {
            "areaName": "庐江县",
            "areaId": 2433
          },
          {
            "areaName": "包河区",
            "areaId": 2434
          },
          {
            "areaName": "蜀山区",
            "areaId": 2435
          },
          {
            "areaName": "瑶海区",
            "areaId": 2436
          },
          {
            "areaName": "庐阳区",
            "areaId": 2437
          },
          {
            "areaName": "经济技术开发区",
            "areaId": 2438
          },
          {
            "areaName": "高新技术开发区",
            "areaId": 2439
          },
          {
            "areaName": "北城新区",
            "areaId": 2440
          },
          {
            "areaName": "滨湖新区",
            "areaId": 2441
          },
          {
            "areaName": "政务文化新区",
            "areaId": 2442
          },
          {
            "areaName": "新站综合开发试验区",
            "areaId": 2443
          },
          {
            "areaName": "肥西县",
            "areaId": 2444
          },
          {
            "areaName": "巢湖市",
            "areaId": 2445
          },
          {
            "areaName": "长丰县",
            "areaId": 2446
          }
        ],
        "areaId": 213
      },
      {
        "areaName": "淮南市",
        "childrenList": [{
            "areaName": "凤台县",
            "areaId": 2447
          },
          {
            "areaName": "田家庵区",
            "areaId": 2448
          },
          {
            "areaName": "大通区",
            "areaId": 2449
          },
          {
            "areaName": "谢家集区",
            "areaId": 2450
          },
          {
            "areaName": "八公山区",
            "areaId": 2451
          },
          {
            "areaName": "潘集区",
            "areaId": 2452
          },
          {
            "areaName": "淮南高新技术开发区",
            "areaId": 2453
          }
        ],
        "areaId": 214
      },
      {
        "areaName": "淮北市",
        "childrenList": [{
            "areaName": "杜集区",
            "areaId": 2454
          },
          {
            "areaName": "烈山区",
            "areaId": 2455
          },
          {
            "areaName": "濉溪县",
            "areaId": 2456
          },
          {
            "areaName": "相山区",
            "areaId": 2457
          }
        ],
        "areaId": 215
      },
      {
        "areaName": "芜湖市",
        "childrenList": [{
            "areaName": "芜湖县",
            "areaId": 2458
          },
          {
            "areaName": "繁昌县",
            "areaId": 2459
          },
          {
            "areaName": "南陵县",
            "areaId": 2460
          },
          {
            "areaName": "无为县",
            "areaId": 2461
          },
          {
            "areaName": "镜湖区",
            "areaId": 2462
          },
          {
            "areaName": "弋江区",
            "areaId": 2463
          },
          {
            "areaName": "鸠江区",
            "areaId": 2464
          },
          {
            "areaName": "三山区",
            "areaId": 2465
          }
        ],
        "areaId": 216
      },
      {
        "areaName": "蚌埠市",
        "childrenList": [{
            "areaName": "怀远县",
            "areaId": 2466
          },
          {
            "areaName": "固镇县",
            "areaId": 2467
          },
          {
            "areaName": "五河县",
            "areaId": 2468
          },
          {
            "areaName": "蚌山区",
            "areaId": 2469
          },
          {
            "areaName": "淮上区",
            "areaId": 2470
          },
          {
            "areaName": "龙子湖区",
            "areaId": 2471
          },
          {
            "areaName": "禹会区",
            "areaId": 2472
          }
        ],
        "areaId": 217
      },
      {
        "areaName": "马鞍山市",
        "childrenList": [{
            "areaName": "当涂县",
            "areaId": 2473
          },
          {
            "areaName": "含山县",
            "areaId": 2474
          },
          {
            "areaName": "和县",
            "areaId": 2475
          },
          {
            "areaName": "博望区",
            "areaId": 2476
          },
          {
            "areaName": "花山区",
            "areaId": 2477
          },
          {
            "areaName": "雨山区",
            "areaId": 2478
          }
        ],
        "areaId": 218
      },
      {
        "areaName": "安庆市",
        "childrenList": [{
            "areaName": "桐城市",
            "areaId": 2479
          },
          {
            "areaName": "宿松县",
            "areaId": 2480
          },
          {
            "areaName": "枞阳县",
            "areaId": 2481
          },
          {
            "areaName": "太湖县",
            "areaId": 2482
          },
          {
            "areaName": "怀宁县",
            "areaId": 2483
          },
          {
            "areaName": "岳西县",
            "areaId": 2484
          },
          {
            "areaName": "望江县",
            "areaId": 2485
          },
          {
            "areaName": "潜山县",
            "areaId": 2486
          },
          {
            "areaName": "开发区",
            "areaId": 2487
          },
          {
            "areaName": "大观区",
            "areaId": 2488
          },
          {
            "areaName": "宜秀区",
            "areaId": 2489
          },
          {
            "areaName": "迎江区",
            "areaId": 2490
          }
        ],
        "areaId": 219
      },
      {
        "areaName": "黄山市",
        "childrenList": [{
            "areaName": "休宁县",
            "areaId": 2491
          },
          {
            "areaName": "歙县",
            "areaId": 2492
          },
          {
            "areaName": "黟县",
            "areaId": 2493
          },
          {
            "areaName": "祁门县",
            "areaId": 2494
          },
          {
            "areaName": "黄山区",
            "areaId": 2495
          },
          {
            "areaName": "徽州区",
            "areaId": 2496
          },
          {
            "areaName": "屯溪区",
            "areaId": 2497
          }
        ],
        "areaId": 220
      },
      {
        "areaName": "滁州市",
        "childrenList": [{
            "areaName": "明光市",
            "areaId": 2498
          },
          {
            "areaName": "全椒县",
            "areaId": 2499
          },
          {
            "areaName": "来安县",
            "areaId": 2500
          },
          {
            "areaName": "定远县",
            "areaId": 2501
          },
          {
            "areaName": "凤阳县",
            "areaId": 2502
          },
          {
            "areaName": "南谯区",
            "areaId": 2503
          },
          {
            "areaName": "琅琊区",
            "areaId": 2504
          },
          {
            "areaName": "天长市",
            "areaId": 2505
          }
        ],
        "areaId": 221
      },
      {
        "areaName": "阜阳市",
        "childrenList": [{
            "areaName": "界首市",
            "areaId": 2506
          },
          {
            "areaName": "太和县",
            "areaId": 2507
          },
          {
            "areaName": "阜南县",
            "areaId": 2508
          },
          {
            "areaName": "颍上县",
            "areaId": 2509
          },
          {
            "areaName": "临泉县",
            "areaId": 2510
          },
          {
            "areaName": "经济开发区",
            "areaId": 2511
          },
          {
            "areaName": "颍泉区",
            "areaId": 2512
          },
          {
            "areaName": "颍州区",
            "areaId": 2513
          },
          {
            "areaName": "颍东区",
            "areaId": 2514
          }
        ],
        "areaId": 222
      },
      {
        "areaName": "亳州市",
        "childrenList": [{
            "areaName": "利辛县",
            "areaId": 2515
          },
          {
            "areaName": "蒙城县",
            "areaId": 2516
          },
          {
            "areaName": "涡阳县",
            "areaId": 2517
          },
          {
            "areaName": "谯城区",
            "areaId": 2518
          }
        ],
        "areaId": 223
      },
      {
        "areaName": "宿州市",
        "childrenList": [{
            "areaName": "灵璧县",
            "areaId": 2519
          },
          {
            "areaName": "泗县",
            "areaId": 2520
          },
          {
            "areaName": "萧县",
            "areaId": 2521
          },
          {
            "areaName": "砀山县",
            "areaId": 2522
          },
          {
            "areaName": "经济开发区",
            "areaId": 2523
          },
          {
            "areaName": "埇桥区",
            "areaId": 2524
          }
        ],
        "areaId": 224
      },
      {
        "areaName": "池州市",
        "childrenList": [{
            "areaName": "东至县",
            "areaId": 2525
          },
          {
            "areaName": "石台县",
            "areaId": 2526
          },
          {
            "areaName": "青阳县",
            "areaId": 2527
          },
          {
            "areaName": "贵池区",
            "areaId": 2528
          }
        ],
        "areaId": 225
      },
      {
        "areaName": "六安市",
        "childrenList": [{
            "areaName": "寿县",
            "areaId": 2529
          },
          {
            "areaName": "霍山县",
            "areaId": 2530
          },
          {
            "areaName": "金寨县",
            "areaId": 2531
          },
          {
            "areaName": "霍邱县",
            "areaId": 2532
          },
          {
            "areaName": "舒城县",
            "areaId": 2533
          },
          {
            "areaName": "金安区",
            "areaId": 2534
          },
          {
            "areaName": "裕安区",
            "areaId": 2535
          }
        ],
        "areaId": 226
      },
      {
        "areaName": "宣城市",
        "childrenList": [{
            "areaName": "泾县",
            "areaId": 2536
          },
          {
            "areaName": "旌德县",
            "areaId": 2537
          },
          {
            "areaName": "宁国市",
            "areaId": 2538
          },
          {
            "areaName": "郎溪县",
            "areaId": 2539
          },
          {
            "areaName": "广德县",
            "areaId": 2540
          },
          {
            "areaName": "绩溪县",
            "areaId": 2541
          },
          {
            "areaName": "宣州区",
            "areaId": 2542
          }
        ],
        "areaId": 227
      }
    ],
    "areaId": 14
  },
  {
    "areaName": "浙江",
    "childrenList": [{
        "areaName": "宁波市",
        "childrenList": [{
            "areaName": "慈溪市",
            "areaId": 2543
          },
          {
            "areaName": "奉化市",
            "areaId": 2544
          },
          {
            "areaName": "宁海县",
            "areaId": 2545
          },
          {
            "areaName": "象山县",
            "areaId": 2546
          },
          {
            "areaName": "海曙区",
            "areaId": 2547
          },
          {
            "areaName": "江东区",
            "areaId": 2548
          },
          {
            "areaName": "高新科技开发区",
            "areaId": 2549
          },
          {
            "areaName": "北仑区",
            "areaId": 2550
          },
          {
            "areaName": "镇海区",
            "areaId": 2551
          },
          {
            "areaName": "鄞州区",
            "areaId": 2552
          },
          {
            "areaName": "江北区",
            "areaId": 2553
          },
          {
            "areaName": "余姚市",
            "areaId": 2554
          }
        ],
        "areaId": 228
      },
      {
        "areaName": "杭州市",
        "childrenList": [{
            "areaName": "余杭区",
            "areaId": 2555
          },
          {
            "areaName": "萧山区",
            "areaId": 2556
          },
          {
            "areaName": "富阳市",
            "areaId": 2557
          },
          {
            "areaName": "桐庐县",
            "areaId": 2558
          },
          {
            "areaName": "建德市",
            "areaId": 2559
          },
          {
            "areaName": "淳安县",
            "areaId": 2560
          },
          {
            "areaName": "江干区",
            "areaId": 2561
          },
          {
            "areaName": "滨江区",
            "areaId": 2562
          },
          {
            "areaName": "上城区",
            "areaId": 2563
          },
          {
            "areaName": "下城区",
            "areaId": 2564
          },
          {
            "areaName": "拱墅区",
            "areaId": 2565
          },
          {
            "areaName": "西湖区",
            "areaId": 2566
          },
          {
            "areaName": "下沙区",
            "areaId": 2567
          },
          {
            "areaName": "临安市",
            "areaId": 2568
          }
        ],
        "areaId": 229
      },
      {
        "areaName": "温州市",
        "childrenList": [{
            "areaName": "文成县",
            "areaId": 2569
          },
          {
            "areaName": "平阳县",
            "areaId": 2570
          },
          {
            "areaName": "泰顺县",
            "areaId": 2571
          },
          {
            "areaName": "洞头县",
            "areaId": 2572
          },
          {
            "areaName": "苍南县",
            "areaId": 2573
          },
          {
            "areaName": "龙湾区",
            "areaId": 2574
          },
          {
            "areaName": "茶山高教园区",
            "areaId": 2575
          },
          {
            "areaName": "瑞安市",
            "areaId": 2576
          },
          {
            "areaName": "乐清市",
            "areaId": 2577
          },
          {
            "areaName": "鹿城区",
            "areaId": 2578
          },
          {
            "areaName": "瓯海区",
            "areaId": 2579
          },
          {
            "areaName": "永嘉县",
            "areaId": 2580
          }
        ],
        "areaId": 230
      },
      {
        "areaName": "嘉兴市",
        "childrenList": [{
            "areaName": "海宁市",
            "areaId": 2581
          },
          {
            "areaName": "海盐县",
            "areaId": 2582
          },
          {
            "areaName": "南湖区",
            "areaId": 2583
          },
          {
            "areaName": "秀洲区",
            "areaId": 2584
          },
          {
            "areaName": "桐乡市",
            "areaId": 2585
          },
          {
            "areaName": "平湖市",
            "areaId": 2586
          },
          {
            "areaName": "嘉善县",
            "areaId": 2587
          }
        ],
        "areaId": 231
      },
      {
        "areaName": "湖州市",
        "childrenList": [{
            "areaName": "长兴县",
            "areaId": 2588
          },
          {
            "areaName": "德清县",
            "areaId": 2589
          },
          {
            "areaName": "安吉县",
            "areaId": 2590
          },
          {
            "areaName": "南浔区",
            "areaId": 2591
          },
          {
            "areaName": "吴兴区",
            "areaId": 2592
          }
        ],
        "areaId": 232
      },
      {
        "areaName": "绍兴市",
        "childrenList": [{
            "areaName": "诸暨市",
            "areaId": 2593
          },
          {
            "areaName": "上虞区",
            "areaId": 2594
          },
          {
            "areaName": "嵊州市",
            "areaId": 2595
          },
          {
            "areaName": "新昌县",
            "areaId": 2596
          },
          {
            "areaName": "柯桥区",
            "areaId": 2597
          },
          {
            "areaName": "越城区",
            "areaId": 2598
          }
        ],
        "areaId": 233
      },
      {
        "areaName": "金华市",
        "childrenList": [{
            "areaName": "金东区",
            "areaId": 2599
          },
          {
            "areaName": "兰溪市",
            "areaId": 2600
          },
          {
            "areaName": "婺城区",
            "areaId": 2601
          },
          {
            "areaName": "义乌市",
            "areaId": 2602
          },
          {
            "areaName": "东阳市",
            "areaId": 2603
          },
          {
            "areaName": "永康市",
            "areaId": 2604
          },
          {
            "areaName": "武义县",
            "areaId": 2605
          },
          {
            "areaName": "浦江县",
            "areaId": 2606
          },
          {
            "areaName": "磐安县",
            "areaId": 2607
          }
        ],
        "areaId": 234
      },
      {
        "areaName": "衢州市",
        "childrenList": [{
            "areaName": "江山市",
            "areaId": 2608
          },
          {
            "areaName": "常山县",
            "areaId": 2609
          },
          {
            "areaName": "开化县",
            "areaId": 2610
          },
          {
            "areaName": "龙游县",
            "areaId": 2611
          },
          {
            "areaName": "柯城区",
            "areaId": 2612
          },
          {
            "areaName": "衢江区",
            "areaId": 2613
          }
        ],
        "areaId": 235
      },
      {
        "areaName": "丽水市",
        "childrenList": [{
            "areaName": "龙泉市",
            "areaId": 2614
          },
          {
            "areaName": "缙云县",
            "areaId": 2615
          },
          {
            "areaName": "遂昌县",
            "areaId": 2616
          },
          {
            "areaName": "松阳县",
            "areaId": 2617
          },
          {
            "areaName": "景宁县",
            "areaId": 2618
          },
          {
            "areaName": "云和县",
            "areaId": 2619
          },
          {
            "areaName": "青田县",
            "areaId": 2620
          },
          {
            "areaName": "庆元县",
            "areaId": 2621
          },
          {
            "areaName": "莲都区",
            "areaId": 2622
          }
        ],
        "areaId": 236
      },
      {
        "areaName": "台州市",
        "childrenList": [{
            "areaName": "临海市",
            "areaId": 2623
          },
          {
            "areaName": "三门县",
            "areaId": 2624
          },
          {
            "areaName": "天台县",
            "areaId": 2625
          },
          {
            "areaName": "仙居县",
            "areaId": 2626
          },
          {
            "areaName": "黄岩区",
            "areaId": 2627
          },
          {
            "areaName": "椒江区",
            "areaId": 2628
          },
          {
            "areaName": "路桥区",
            "areaId": 2629
          },
          {
            "areaName": "温岭市",
            "areaId": 2630
          },
          {
            "areaName": "玉环县",
            "areaId": 2631
          }
        ],
        "areaId": 237
      },
      {
        "areaName": "舟山市",
        "childrenList": [{
            "areaName": "岱山县",
            "areaId": 2632
          },
          {
            "areaName": "嵊泗县",
            "areaId": 2633
          },
          {
            "areaName": "普陀区",
            "areaId": 2634
          },
          {
            "areaName": "定海区",
            "areaId": 2635
          }
        ],
        "areaId": 238
      }
    ],
    "areaId": 15
  },
  {
    "areaName": "福建",
    "childrenList": [{
        "areaName": "福州市",
        "childrenList": [{
            "areaName": "长乐市",
            "areaId": 2636
          },
          {
            "areaName": "平潭县",
            "areaId": 2637
          },
          {
            "areaName": "连江县",
            "areaId": 2638
          },
          {
            "areaName": "罗源县",
            "areaId": 2639
          },
          {
            "areaName": "永泰县",
            "areaId": 2640
          },
          {
            "areaName": "闽清县",
            "areaId": 2641
          },
          {
            "areaName": "台江区",
            "areaId": 2642
          },
          {
            "areaName": "鼓楼区",
            "areaId": 2643
          },
          {
            "areaName": "晋安区",
            "areaId": 2644
          },
          {
            "areaName": "仓山区",
            "areaId": 2645
          },
          {
            "areaName": "马尾区",
            "areaId": 2646
          },
          {
            "areaName": "福清市",
            "areaId": 2647
          },
          {
            "areaName": "闽侯县",
            "areaId": 2648
          }
        ],
        "areaId": 239
      },
      {
        "areaName": "厦门市",
        "childrenList": [{
            "areaName": "思明区",
            "areaId": 2649
          },
          {
            "areaName": "湖里区",
            "areaId": 2650
          },
          {
            "areaName": "翔安区",
            "areaId": 2651
          },
          {
            "areaName": "海沧区",
            "areaId": 2652
          },
          {
            "areaName": "集美区",
            "areaId": 2653
          },
          {
            "areaName": "同安区",
            "areaId": 2654
          }
        ],
        "areaId": 240
      },
      {
        "areaName": "三明市",
        "childrenList": [{
            "areaName": "永安市",
            "areaId": 2655
          },
          {
            "areaName": "明溪县",
            "areaId": 2656
          },
          {
            "areaName": "将乐县",
            "areaId": 2657
          },
          {
            "areaName": "大田县",
            "areaId": 2658
          },
          {
            "areaName": "宁化县",
            "areaId": 2659
          },
          {
            "areaName": "建宁县",
            "areaId": 2660
          },
          {
            "areaName": "沙县",
            "areaId": 2661
          },
          {
            "areaName": "尤溪县",
            "areaId": 2662
          },
          {
            "areaName": "清流县",
            "areaId": 2663
          },
          {
            "areaName": "泰宁县",
            "areaId": 2664
          },
          {
            "areaName": "梅列区",
            "areaId": 2665
          },
          {
            "areaName": "三元区",
            "areaId": 2666
          }
        ],
        "areaId": 241
      },
      {
        "areaName": "莆田市",
        "childrenList": [{
            "areaName": "仙游县",
            "areaId": 2667
          },
          {
            "areaName": "涵江区",
            "areaId": 2668
          },
          {
            "areaName": "秀屿区",
            "areaId": 2669
          },
          {
            "areaName": "城厢区",
            "areaId": 2670
          },
          {
            "areaName": "荔城区",
            "areaId": 2671
          }
        ],
        "areaId": 242
      },
      {
        "areaName": "泉州市",
        "childrenList": [{
            "areaName": "石狮市",
            "areaId": 2672
          },
          {
            "areaName": "南安市",
            "areaId": 2673
          },
          {
            "areaName": "惠安县",
            "areaId": 2674
          },
          {
            "areaName": "安溪县",
            "areaId": 2675
          },
          {
            "areaName": "德化县",
            "areaId": 2676
          },
          {
            "areaName": "永春县",
            "areaId": 2677
          },
          {
            "areaName": "泉港区",
            "areaId": 2678
          },
          {
            "areaName": "金门县",
            "areaId": 2679
          },
          {
            "areaName": "洛江区",
            "areaId": 2680
          },
          {
            "areaName": "鲤城区",
            "areaId": 2681
          },
          {
            "areaName": "丰泽区",
            "areaId": 2682
          },
          {
            "areaName": "晋江市",
            "areaId": 2683
          }
        ],
        "areaId": 243
      },
      {
        "areaName": "漳州市",
        "childrenList": [{
            "areaName": "龙海市",
            "areaId": 2684
          },
          {
            "areaName": "平和县",
            "areaId": 2685
          },
          {
            "areaName": "南靖县",
            "areaId": 2686
          },
          {
            "areaName": "诏安县",
            "areaId": 2687
          },
          {
            "areaName": "漳浦县",
            "areaId": 2688
          },
          {
            "areaName": "华安县",
            "areaId": 2689
          },
          {
            "areaName": "云霄县",
            "areaId": 2690
          },
          {
            "areaName": "东山县",
            "areaId": 2691
          },
          {
            "areaName": "长泰县",
            "areaId": 2692
          },
          {
            "areaName": "芗城区",
            "areaId": 2693
          },
          {
            "areaName": "龙文区",
            "areaId": 2694
          }
        ],
        "areaId": 244
      },
      {
        "areaName": "南平市",
        "childrenList": [{
            "areaName": "建瓯市",
            "areaId": 2695
          },
          {
            "areaName": "邵武市",
            "areaId": 2696
          },
          {
            "areaName": "武夷山市",
            "areaId": 2697
          },
          {
            "areaName": "建阳市",
            "areaId": 2698
          },
          {
            "areaName": "松溪县",
            "areaId": 2699
          },
          {
            "areaName": "顺昌县",
            "areaId": 2700
          },
          {
            "areaName": "浦城县",
            "areaId": 2701
          },
          {
            "areaName": "政和县",
            "areaId": 2702
          },
          {
            "areaName": "光泽县",
            "areaId": 2703
          },
          {
            "areaName": "延平区",
            "areaId": 2704
          }
        ],
        "areaId": 245
      },
      {
        "areaName": "龙岩市",
        "childrenList": [{
            "areaName": "漳平市",
            "areaId": 2705
          },
          {
            "areaName": "长汀县",
            "areaId": 2706
          },
          {
            "areaName": "武平县",
            "areaId": 2707
          },
          {
            "areaName": "永定县",
            "areaId": 2708
          },
          {
            "areaName": "上杭县",
            "areaId": 2709
          },
          {
            "areaName": "连城县",
            "areaId": 2710
          },
          {
            "areaName": "新罗区",
            "areaId": 2711
          }
        ],
        "areaId": 246
      },
      {
        "areaName": "宁德市",
        "childrenList": [{
            "areaName": "福安市",
            "areaId": 2712
          },
          {
            "areaName": "福鼎市",
            "areaId": 2713
          },
          {
            "areaName": "寿宁县",
            "areaId": 2714
          },
          {
            "areaName": "霞浦县",
            "areaId": 2715
          },
          {
            "areaName": "柘荣县",
            "areaId": 2716
          },
          {
            "areaName": "屏南县",
            "areaId": 2717
          },
          {
            "areaName": "古田县",
            "areaId": 2718
          },
          {
            "areaName": "周宁县",
            "areaId": 2719
          },
          {
            "areaName": "蕉城区",
            "areaId": 2720
          },
          {
            "areaName": "东侨开发区",
            "areaId": 2721
          }
        ],
        "areaId": 247
      }
    ],
    "areaId": 16
  },
  {
    "areaName": "湖北",
    "childrenList": [{
        "areaName": "武汉市",
        "childrenList": [{
            "areaName": "江岸区",
            "areaId": 2722
          },
          {
            "areaName": "武昌区",
            "areaId": 2723
          },
          {
            "areaName": "江汉区",
            "areaId": 2724
          },
          {
            "areaName": "硚口区",
            "areaId": 2725
          },
          {
            "areaName": "武汉经济技术开发区",
            "areaId": 2726
          },
          {
            "areaName": "蔡甸区",
            "areaId": 2727
          },
          {
            "areaName": "江夏区",
            "areaId": 2728
          },
          {
            "areaName": "新洲区",
            "areaId": 2729
          },
          {
            "areaName": "黄陂区",
            "areaId": 2730
          },
          {
            "areaName": "汉阳区",
            "areaId": 2731
          },
          {
            "areaName": "青山区",
            "areaId": 2732
          },
          {
            "areaName": "洪山区",
            "areaId": 2733
          },
          {
            "areaName": "汉南区",
            "areaId": 2734
          },
          {
            "areaName": "东西湖区",
            "areaId": 2735
          }
        ],
        "areaId": 248
      },
      {
        "areaName": "黄石市",
        "childrenList": [{
            "areaName": "黄石港区",
            "areaId": 2736
          },
          {
            "areaName": "铁山区",
            "areaId": 2737
          },
          {
            "areaName": "大冶市",
            "areaId": 2738
          },
          {
            "areaName": "阳新县",
            "areaId": 2739
          },
          {
            "areaName": "下陆区",
            "areaId": 2740
          },
          {
            "areaName": "西塞山区",
            "areaId": 2741
          },
          {
            "areaName": "经济技术开发区",
            "areaId": 2742
          }
        ],
        "areaId": 249
      },
      {
        "areaName": "襄阳市",
        "childrenList": [{
            "areaName": "老河口市",
            "areaId": 2743
          },
          {
            "areaName": "枣阳市",
            "areaId": 2744
          },
          {
            "areaName": "宜城市",
            "areaId": 2745
          },
          {
            "areaName": "南漳县",
            "areaId": 2746
          },
          {
            "areaName": "保康县",
            "areaId": 2747
          },
          {
            "areaName": "谷城县",
            "areaId": 2748
          },
          {
            "areaName": "樊城区",
            "areaId": 2749
          },
          {
            "areaName": "襄城区",
            "areaId": 2750
          },
          {
            "areaName": "襄州区",
            "areaId": 2751
          }
        ],
        "areaId": 250
      },
      {
        "areaName": "十堰市",
        "childrenList": [{
            "areaName": "丹江口市",
            "areaId": 2752
          },
          {
            "areaName": "房县",
            "areaId": 2753
          },
          {
            "areaName": "竹山县",
            "areaId": 2754
          },
          {
            "areaName": "竹溪县",
            "areaId": 2755
          },
          {
            "areaName": "郧县",
            "areaId": 2756
          },
          {
            "areaName": "郧西县",
            "areaId": 2757
          },
          {
            "areaName": "茅箭区",
            "areaId": 2758
          },
          {
            "areaName": "张湾区",
            "areaId": 2759
          }
        ],
        "areaId": 251
      },
      {
        "areaName": "荆州市",
        "childrenList": [{
            "areaName": "江陵县",
            "areaId": 2760
          },
          {
            "areaName": "洪湖市",
            "areaId": 2761
          },
          {
            "areaName": "石首市",
            "areaId": 2762
          },
          {
            "areaName": "松滋市",
            "areaId": 2763
          },
          {
            "areaName": "监利县",
            "areaId": 2764
          },
          {
            "areaName": "公安县",
            "areaId": 2765
          },
          {
            "areaName": "沙市区",
            "areaId": 2766
          },
          {
            "areaName": "荆州区",
            "areaId": 2767
          }
        ],
        "areaId": 252
      },
      {
        "areaName": "宜昌市",
        "childrenList": [{
            "areaName": "当阳市",
            "areaId": 2768
          },
          {
            "areaName": "枝江市",
            "areaId": 2769
          },
          {
            "areaName": "夷陵区",
            "areaId": 2770
          },
          {
            "areaName": "秭归县",
            "areaId": 2771
          },
          {
            "areaName": "兴山县",
            "areaId": 2772
          },
          {
            "areaName": "远安县",
            "areaId": 2773
          },
          {
            "areaName": "五峰土家族自治县",
            "areaId": 2774
          },
          {
            "areaName": "长阳土家族自治县",
            "areaId": 2775
          },
          {
            "areaName": "宜都市",
            "areaId": 2776
          },
          {
            "areaName": "猇亭区",
            "areaId": 2777
          },
          {
            "areaName": "点军区",
            "areaId": 2778
          },
          {
            "areaName": "伍家岗区",
            "areaId": 2779
          },
          {
            "areaName": "西陵区",
            "areaId": 2780
          }
        ],
        "areaId": 253
      },
      {
        "areaName": "孝感市",
        "childrenList": [{
            "areaName": "汉川市",
            "areaId": 2781
          },
          {
            "areaName": "云梦县",
            "areaId": 2782
          },
          {
            "areaName": "大悟县",
            "areaId": 2783
          },
          {
            "areaName": "孝昌县",
            "areaId": 2784
          },
          {
            "areaName": "孝南区",
            "areaId": 2785
          },
          {
            "areaName": "应城市",
            "areaId": 2786
          },
          {
            "areaName": "安陆市",
            "areaId": 2787
          }
        ],
        "areaId": 254
      },
      {
        "areaName": "黄冈市",
        "childrenList": [{
            "areaName": "红安县",
            "areaId": 2788
          },
          {
            "areaName": "罗田县",
            "areaId": 2789
          },
          {
            "areaName": "黄梅县",
            "areaId": 2790
          },
          {
            "areaName": "英山县",
            "areaId": 2791
          },
          {
            "areaName": "团风县",
            "areaId": 2792
          },
          {
            "areaName": "黄州区",
            "areaId": 2793
          },
          {
            "areaName": "蕲春县",
            "areaId": 2794
          },
          {
            "areaName": "麻城市",
            "areaId": 2795
          },
          {
            "areaName": "武穴市",
            "areaId": 2796
          },
          {
            "areaName": "浠水县",
            "areaId": 2797
          }
        ],
        "areaId": 255
      },
      {
        "areaName": "咸宁市",
        "childrenList": [{
            "areaName": "嘉鱼县",
            "areaId": 2798
          },
          {
            "areaName": "通山县",
            "areaId": 2799
          },
          {
            "areaName": "崇阳县",
            "areaId": 2800
          },
          {
            "areaName": "通城县",
            "areaId": 2801
          },
          {
            "areaName": "咸安区",
            "areaId": 2802
          },
          {
            "areaName": "赤壁市",
            "areaId": 2803
          }
        ],
        "areaId": 256
      },
      {
        "areaName": "恩施州",
        "childrenList": [{
            "areaName": "恩施市",
            "areaId": 2804
          },
          {
            "areaName": "利川市",
            "areaId": 2805
          },
          {
            "areaName": "建始县",
            "areaId": 2806
          },
          {
            "areaName": "来凤县",
            "areaId": 2807
          },
          {
            "areaName": "巴东县",
            "areaId": 2808
          },
          {
            "areaName": "鹤峰县",
            "areaId": 2809
          },
          {
            "areaName": "宣恩县",
            "areaId": 2810
          },
          {
            "areaName": "咸丰县",
            "areaId": 2811
          }
        ],
        "areaId": 257
      },
      {
        "areaName": "鄂州市",
        "childrenList": [{
            "areaName": "梁子湖区",
            "areaId": 2812
          },
          {
            "areaName": "华容区",
            "areaId": 2813
          },
          {
            "areaName": "鄂城区",
            "areaId": 2814
          }
        ],
        "areaId": 258
      },
      {
        "areaName": "荆门市",
        "childrenList": [{
            "areaName": "京山县",
            "areaId": 2815
          },
          {
            "areaName": "钟祥市",
            "areaId": 2816
          },
          {
            "areaName": "沙洋县",
            "areaId": 2817
          },
          {
            "areaName": "掇刀区",
            "areaId": 2818
          },
          {
            "areaName": "东宝区",
            "areaId": 2819
          }
        ],
        "areaId": 259
      },
      {
        "areaName": "随州市",
        "childrenList": [{
            "areaName": "广水市",
            "areaId": 2820
          },
          {
            "areaName": "曾都区",
            "areaId": 2821
          },
          {
            "areaName": "随县",
            "areaId": 2822
          }
        ],
        "areaId": 260
      },
      {
        "areaName": "潜江市",
        "childrenList": [{
            "areaName": "园林",
            "areaId": 2823
          },
          {
            "areaName": "杨市",
            "areaId": 2824
          },
          {
            "areaName": "周矶",
            "areaId": 2825
          },
          {
            "areaName": "广华",
            "areaId": 2826
          },
          {
            "areaName": "泰丰",
            "areaId": 2827
          },
          {
            "areaName": "竹根滩镇",
            "areaId": 2828
          },
          {
            "areaName": "高石碑镇",
            "areaId": 2829
          },
          {
            "areaName": "积玉口镇",
            "areaId": 2830
          },
          {
            "areaName": "渔洋镇",
            "areaId": 2831
          },
          {
            "areaName": "王场镇",
            "areaId": 2832
          },
          {
            "areaName": "熊口镇",
            "areaId": 2833
          },
          {
            "areaName": "老新镇",
            "areaId": 2834
          },
          {
            "areaName": "浩口镇",
            "areaId": 2835
          },
          {
            "areaName": "张金镇",
            "areaId": 2836
          },
          {
            "areaName": "龙湾镇",
            "areaId": 2837
          },
          {
            "areaName": "江汉石油管理局",
            "areaId": 2838
          },
          {
            "areaName": "潜江经济开发区",
            "areaId": 2839
          },
          {
            "areaName": "西大垸管理区",
            "areaId": 2840
          },
          {
            "areaName": "运粮湖管理区",
            "areaId": 2841
          },
          {
            "areaName": "周矶管理区",
            "areaId": 2842
          },
          {
            "areaName": "后湖管理区",
            "areaId": 2843
          },
          {
            "areaName": "熊口管理区",
            "areaId": 2844
          },
          {
            "areaName": "总口管理区",
            "areaId": 2845
          },
          {
            "areaName": "高场原种场",
            "areaId": 2846
          },
          {
            "areaName": "浩口原种场",
            "areaId": 2847
          }
        ],
        "areaId": 261
      },
      {
        "areaName": "天门市",
        "childrenList": [{
            "areaName": "侨乡街道开发区",
            "areaId": 2848
          },
          {
            "areaName": "竟陵街道",
            "areaId": 2849
          },
          {
            "areaName": "杨林街道",
            "areaId": 2850
          },
          {
            "areaName": "佛子山镇",
            "areaId": 2851
          },
          {
            "areaName": "多宝镇",
            "areaId": 2852
          },
          {
            "areaName": "拖市镇",
            "areaId": 2853
          },
          {
            "areaName": "张港镇",
            "areaId": 2854
          },
          {
            "areaName": "蒋场镇",
            "areaId": 2855
          },
          {
            "areaName": "汪场镇",
            "areaId": 2856
          },
          {
            "areaName": "渔薪镇",
            "areaId": 2857
          },
          {
            "areaName": "黄潭镇",
            "areaId": 2858
          },
          {
            "areaName": "岳口镇",
            "areaId": 2859
          },
          {
            "areaName": "横林镇",
            "areaId": 2860
          },
          {
            "areaName": "彭市镇",
            "areaId": 2861
          },
          {
            "areaName": "麻洋镇",
            "areaId": 2862
          },
          {
            "areaName": "多祥镇",
            "areaId": 2863
          },
          {
            "areaName": "干驿镇",
            "areaId": 2864
          },
          {
            "areaName": "马湾镇",
            "areaId": 2865
          },
          {
            "areaName": "卢市镇",
            "areaId": 2866
          },
          {
            "areaName": "小板镇",
            "areaId": 2867
          },
          {
            "areaName": "九真镇",
            "areaId": 2868
          },
          {
            "areaName": "皂市镇",
            "areaId": 2869
          },
          {
            "areaName": "胡市镇",
            "areaId": 2870
          },
          {
            "areaName": "石河镇",
            "areaId": 2871
          },
          {
            "areaName": "净潭乡",
            "areaId": 2872
          },
          {
            "areaName": "蒋湖农场",
            "areaId": 2873
          },
          {
            "areaName": "白茅湖农场",
            "areaId": 2874
          },
          {
            "areaName": "沉湖管委会",
            "areaId": 2875
          }
        ],
        "areaId": 262
      },
      {
        "areaName": "仙桃市",
        "childrenList": [{
            "areaName": "龙华山街道",
            "areaId": 2876
          },
          {
            "areaName": "沙嘴街道",
            "areaId": 2877
          },
          {
            "areaName": "干河街道",
            "areaId": 2878
          },
          {
            "areaName": "郑场镇",
            "areaId": 2879
          },
          {
            "areaName": "毛嘴镇",
            "areaId": 2880
          },
          {
            "areaName": "豆河镇",
            "areaId": 2881
          },
          {
            "areaName": "三伏潭镇",
            "areaId": 2882
          },
          {
            "areaName": "胡场镇",
            "areaId": 2883
          },
          {
            "areaName": "长埫口镇",
            "areaId": 2884
          },
          {
            "areaName": "西流河镇",
            "areaId": 2885
          },
          {
            "areaName": "沙湖镇",
            "areaId": 2886
          },
          {
            "areaName": "杨林尾镇",
            "areaId": 2887
          },
          {
            "areaName": "彭场镇",
            "areaId": 2888
          },
          {
            "areaName": "张沟镇",
            "areaId": 2889
          },
          {
            "areaName": "郭河镇",
            "areaId": 2890
          },
          {
            "areaName": "沔城镇",
            "areaId": 2891
          },
          {
            "areaName": "通海口镇",
            "areaId": 2892
          },
          {
            "areaName": "陈场镇",
            "areaId": 2893
          },
          {
            "areaName": "工业园区",
            "areaId": 2894
          },
          {
            "areaName": "九合垸原种场",
            "areaId": 2895
          },
          {
            "areaName": "沙湖原种场",
            "areaId": 2896
          },
          {
            "areaName": "排湖渔场",
            "areaId": 2897
          },
          {
            "areaName": "五湖渔场",
            "areaId": 2898
          },
          {
            "areaName": "赵西垸林场",
            "areaId": 2899
          },
          {
            "areaName": "刘家垸林场",
            "areaId": 2900
          },
          {
            "areaName": "畜禽良种场",
            "areaId": 2901
          }
        ],
        "areaId": 263
      },
      {
        "areaName": "神农架林区",
        "childrenList": [{
            "areaName": "松柏镇",
            "areaId": 2902
          },
          {
            "areaName": "阳日镇",
            "areaId": 2903
          },
          {
            "areaName": "木鱼镇",
            "areaId": 2904
          },
          {
            "areaName": "红坪镇",
            "areaId": 2905
          },
          {
            "areaName": "新华镇",
            "areaId": 2906
          },
          {
            "areaName": "宋洛乡",
            "areaId": 2907
          },
          {
            "areaName": "九湖乡",
            "areaId": 2908
          },
          {
            "areaName": "下谷坪乡",
            "areaId": 2909
          }
        ],
        "areaId": 264
      }
    ],
    "areaId": 17
  },
  {
    "areaName": "湖南",
    "childrenList": [{
        "areaName": "长沙市",
        "childrenList": [{
            "areaName": "望城区",
            "areaId": 2910
          },
          {
            "areaName": "芙蓉区",
            "areaId": 2911
          },
          {
            "areaName": "岳麓区",
            "areaId": 2912
          },
          {
            "areaName": "雨花区",
            "areaId": 2913
          },
          {
            "areaName": "开福区",
            "areaId": 2914
          },
          {
            "areaName": "天心区",
            "areaId": 2915
          },
          {
            "areaName": "浏阳市",
            "areaId": 2916
          },
          {
            "areaName": "长沙县",
            "areaId": 2917
          },
          {
            "areaName": "宁乡县",
            "areaId": 2918
          }
        ],
        "areaId": 265
      },
      {
        "areaName": "株洲市",
        "childrenList": [{
            "areaName": "醴陵市",
            "areaId": 2919
          },
          {
            "areaName": "株洲县",
            "areaId": 2920
          },
          {
            "areaName": "攸县",
            "areaId": 2921
          },
          {
            "areaName": "茶陵县",
            "areaId": 2922
          },
          {
            "areaName": "炎陵县",
            "areaId": 2923
          },
          {
            "areaName": "天元区",
            "areaId": 2924
          },
          {
            "areaName": "石峰区",
            "areaId": 2925
          },
          {
            "areaName": "芦淞区",
            "areaId": 2926
          },
          {
            "areaName": "荷塘区",
            "areaId": 2927
          }
        ],
        "areaId": 266
      },
      {
        "areaName": "湘潭市",
        "childrenList": [{
            "areaName": "湘乡市",
            "areaId": 2928
          },
          {
            "areaName": "湘潭县",
            "areaId": 2929
          },
          {
            "areaName": "韶山市",
            "areaId": 2930
          },
          {
            "areaName": "雨湖区",
            "areaId": 2931
          },
          {
            "areaName": "岳塘区",
            "areaId": 2932
          }
        ],
        "areaId": 267
      },
      {
        "areaName": "韶山市",
        "childrenList": [{
          "areaName": "韶山市区内",
          "areaId": 2933
        }],
        "areaId": 268
      },
      {
        "areaName": "衡阳市",
        "childrenList": [{
            "areaName": "常宁市",
            "areaId": 2934
          },
          {
            "areaName": "衡阳县",
            "areaId": 2935
          },
          {
            "areaName": "耒阳市",
            "areaId": 2936
          },
          {
            "areaName": "衡东县",
            "areaId": 2937
          },
          {
            "areaName": "衡南县",
            "areaId": 2938
          },
          {
            "areaName": "衡山县",
            "areaId": 2939
          },
          {
            "areaName": "祁东县",
            "areaId": 2940
          },
          {
            "areaName": "南岳区",
            "areaId": 2941
          },
          {
            "areaName": "蒸湘区",
            "areaId": 2942
          },
          {
            "areaName": "石鼓区",
            "areaId": 2943
          },
          {
            "areaName": "珠晖区",
            "areaId": 2944
          },
          {
            "areaName": "雁峰区",
            "areaId": 2945
          }
        ],
        "areaId": 269
      },
      {
        "areaName": "邵阳市",
        "childrenList": [{
            "areaName": "武冈市",
            "areaId": 2946
          },
          {
            "areaName": "邵东县",
            "areaId": 2947
          },
          {
            "areaName": "洞口县",
            "areaId": 2948
          },
          {
            "areaName": "新邵县",
            "areaId": 2949
          },
          {
            "areaName": "绥宁县",
            "areaId": 2950
          },
          {
            "areaName": "新宁县",
            "areaId": 2951
          },
          {
            "areaName": "邵阳县",
            "areaId": 2952
          },
          {
            "areaName": "隆回县",
            "areaId": 2953
          },
          {
            "areaName": "城步县",
            "areaId": 2954
          },
          {
            "areaName": "大祥区",
            "areaId": 2955
          },
          {
            "areaName": "双清区",
            "areaId": 2956
          },
          {
            "areaName": "北塔区",
            "areaId": 2957
          }
        ],
        "areaId": 270
      },
      {
        "areaName": "岳阳市",
        "childrenList": [{
            "areaName": "临湘市",
            "areaId": 2958
          },
          {
            "areaName": "汨罗市",
            "areaId": 2959
          },
          {
            "areaName": "岳阳县",
            "areaId": 2960
          },
          {
            "areaName": "湘阴县",
            "areaId": 2961
          },
          {
            "areaName": "华容县",
            "areaId": 2962
          },
          {
            "areaName": "平江县",
            "areaId": 2963
          },
          {
            "areaName": "君山区",
            "areaId": 2964
          },
          {
            "areaName": "云溪区",
            "areaId": 2965
          },
          {
            "areaName": "岳阳楼区",
            "areaId": 2966
          }
        ],
        "areaId": 271
      },
      {
        "areaName": "常德市",
        "childrenList": [{
            "areaName": "津市市",
            "areaId": 2967
          },
          {
            "areaName": "澧县",
            "areaId": 2968
          },
          {
            "areaName": "临澧县",
            "areaId": 2969
          },
          {
            "areaName": "桃源县",
            "areaId": 2970
          },
          {
            "areaName": "汉寿县",
            "areaId": 2971
          },
          {
            "areaName": "石门县",
            "areaId": 2972
          },
          {
            "areaName": "安乡县",
            "areaId": 2973
          },
          {
            "areaName": "鼎城区",
            "areaId": 2974
          },
          {
            "areaName": "武陵区",
            "areaId": 2975
          }
        ],
        "areaId": 272
      },
      {
        "areaName": "张家界市",
        "childrenList": [{
            "areaName": "慈利县",
            "areaId": 2976
          },
          {
            "areaName": "桑植县",
            "areaId": 2977
          },
          {
            "areaName": "武陵源区",
            "areaId": 2978
          },
          {
            "areaName": "永定区",
            "areaId": 2979
          }
        ],
        "areaId": 273
      },
      {
        "areaName": "郴州市",
        "childrenList": [{
            "areaName": "资兴市",
            "areaId": 2980
          },
          {
            "areaName": "宜章县",
            "areaId": 2981
          },
          {
            "areaName": "安仁县",
            "areaId": 2982
          },
          {
            "areaName": "汝城县",
            "areaId": 2983
          },
          {
            "areaName": "嘉禾县",
            "areaId": 2984
          },
          {
            "areaName": "临武县",
            "areaId": 2985
          },
          {
            "areaName": "桂东县",
            "areaId": 2986
          },
          {
            "areaName": "永兴县",
            "areaId": 2987
          },
          {
            "areaName": "桂阳县",
            "areaId": 2988
          },
          {
            "areaName": "北湖区",
            "areaId": 2989
          },
          {
            "areaName": "苏仙区",
            "areaId": 2990
          }
        ],
        "areaId": 274
      },
      {
        "areaName": "益阳市",
        "childrenList": [{
            "areaName": "南县",
            "areaId": 2991
          },
          {
            "areaName": "桃江县",
            "areaId": 2992
          },
          {
            "areaName": "安化县",
            "areaId": 2993
          },
          {
            "areaName": "沅江市",
            "areaId": 2994
          },
          {
            "areaName": "赫山区",
            "areaId": 2995
          },
          {
            "areaName": "资阳区",
            "areaId": 2996
          }
        ],
        "areaId": 275
      },
      {
        "areaName": "永州市",
        "childrenList": [{
            "areaName": "祁阳县",
            "areaId": 2997
          },
          {
            "areaName": "双牌县",
            "areaId": 2998
          },
          {
            "areaName": "道县",
            "areaId": 2999
          },
          {
            "areaName": "江永县",
            "areaId": 3000
          },
          {
            "areaName": "江华县",
            "areaId": 3001
          },
          {
            "areaName": "宁远县",
            "areaId": 3002
          },
          {
            "areaName": "新田县",
            "areaId": 3003
          },
          {
            "areaName": "蓝山县",
            "areaId": 3004
          },
          {
            "areaName": "东安县",
            "areaId": 3005
          },
          {
            "areaName": "零陵区",
            "areaId": 3006
          },
          {
            "areaName": "冷水滩区",
            "areaId": 3007
          }
        ],
        "areaId": 276
      },
      {
        "areaName": "怀化市",
        "childrenList": [{
            "areaName": "洪江市",
            "areaId": 3008
          },
          {
            "areaName": "会同县",
            "areaId": 3009
          },
          {
            "areaName": "溆浦县",
            "areaId": 3010
          },
          {
            "areaName": "辰溪县",
            "areaId": 3011
          },
          {
            "areaName": "靖州县",
            "areaId": 3012
          },
          {
            "areaName": "通道县",
            "areaId": 3013
          },
          {
            "areaName": "芷江县",
            "areaId": 3014
          },
          {
            "areaName": "新晃县",
            "areaId": 3015
          },
          {
            "areaName": "麻阳县",
            "areaId": 3016
          },
          {
            "areaName": "沅陵县",
            "areaId": 3017
          },
          {
            "areaName": "中方县",
            "areaId": 3018
          },
          {
            "areaName": "鹤城区",
            "areaId": 3019
          }
        ],
        "areaId": 277
      },
      {
        "areaName": "娄底市",
        "childrenList": [{
            "areaName": "冷水江市",
            "areaId": 3020
          },
          {
            "areaName": "涟源市",
            "areaId": 3021
          },
          {
            "areaName": "新化县",
            "areaId": 3022
          },
          {
            "areaName": "双峰县",
            "areaId": 3023
          },
          {
            "areaName": "娄星区",
            "areaId": 3024
          }
        ],
        "areaId": 278
      },
      {
        "areaName": "湘西州",
        "childrenList": [{
            "areaName": "吉首市",
            "areaId": 3025
          },
          {
            "areaName": "古丈县",
            "areaId": 3026
          },
          {
            "areaName": "龙山县",
            "areaId": 3027
          },
          {
            "areaName": "永顺县",
            "areaId": 3028
          },
          {
            "areaName": "泸溪县",
            "areaId": 3029
          },
          {
            "areaName": "凤凰县",
            "areaId": 3030
          },
          {
            "areaName": "花垣县",
            "areaId": 3031
          },
          {
            "areaName": "保靖县",
            "areaId": 3032
          }
        ],
        "areaId": 279
      }
    ],
    "areaId": 18
  },
  {
    "areaName": "广东",
    "childrenList": [{
        "areaName": "广州市",
        "childrenList": [{
            "areaName": "天河区",
            "areaId": 3033
          },
          {
            "areaName": "海珠区",
            "areaId": 3034
          },
          {
            "areaName": "荔湾区",
            "areaId": 3035
          },
          {
            "areaName": "越秀区",
            "areaId": 3036
          },
          {
            "areaName": "番禺区",
            "areaId": 3037
          },
          {
            "areaName": "花都区",
            "areaId": 3038
          },
          {
            "areaName": "萝岗区",
            "areaId": 3039
          },
          {
            "areaName": "白云区",
            "areaId": 3040
          },
          {
            "areaName": "南沙区",
            "areaId": 3041
          },
          {
            "areaName": "黄埔区",
            "areaId": 3042
          },
          {
            "areaName": "增城市",
            "areaId": 3043
          },
          {
            "areaName": "从化市",
            "areaId": 3044
          },
          {
            "areaName": "广州大学城",
            "areaId": 3045
          }
        ],
        "areaId": 280
      },
      {
        "areaName": "深圳市",
        "childrenList": [{
            "areaName": "南山区",
            "areaId": 3046
          },
          {
            "areaName": "罗湖区",
            "areaId": 3047
          },
          {
            "areaName": "福田区",
            "areaId": 3048
          },
          {
            "areaName": "宝安区",
            "areaId": 3049
          },
          {
            "areaName": "光明新区",
            "areaId": 3050
          },
          {
            "areaName": "坪山新区",
            "areaId": 3051
          },
          {
            "areaName": "大鹏新区",
            "areaId": 3052
          },
          {
            "areaName": "龙岗区",
            "areaId": 3053
          },
          {
            "areaName": "盐田区",
            "areaId": 3054
          },
          {
            "areaName": "龙华新区",
            "areaId": 3055
          }
        ],
        "areaId": 281
      },
      {
        "areaName": "珠海市",
        "childrenList": [{
            "areaName": "斗门区",
            "areaId": 3056
          },
          {
            "areaName": "金湾区",
            "areaId": 3057
          },
          {
            "areaName": "香洲区",
            "areaId": 3058
          }
        ],
        "areaId": 282
      },
      {
        "areaName": "汕头市",
        "childrenList": [{
            "areaName": "南澳县",
            "areaId": 3059
          },
          {
            "areaName": "龙湖区",
            "areaId": 3060
          },
          {
            "areaName": "金平区",
            "areaId": 3061
          },
          {
            "areaName": "澄海区",
            "areaId": 3062
          },
          {
            "areaName": "潮阳区",
            "areaId": 3063
          },
          {
            "areaName": "潮南区",
            "areaId": 3064
          },
          {
            "areaName": "濠江区",
            "areaId": 3065
          }
        ],
        "areaId": 283
      },
      {
        "areaName": "韶关市",
        "childrenList": [{
            "areaName": "南雄市",
            "areaId": 3066
          },
          {
            "areaName": "乐昌市",
            "areaId": 3067
          },
          {
            "areaName": "仁化县",
            "areaId": 3068
          },
          {
            "areaName": "始兴县",
            "areaId": 3069
          },
          {
            "areaName": "翁源县",
            "areaId": 3070
          },
          {
            "areaName": "新丰县",
            "areaId": 3071
          },
          {
            "areaName": "乳源瑶族自治县",
            "areaId": 3072
          },
          {
            "areaName": "曲江区",
            "areaId": 3073
          },
          {
            "areaName": "武江区",
            "areaId": 3074
          },
          {
            "areaName": "浈江区",
            "areaId": 3075
          }
        ],
        "areaId": 284
      },
      {
        "areaName": "河源市",
        "childrenList": [{
            "areaName": "和平县",
            "areaId": 3076
          },
          {
            "areaName": "龙川县",
            "areaId": 3077
          },
          {
            "areaName": "紫金县",
            "areaId": 3078
          },
          {
            "areaName": "连平县",
            "areaId": 3079
          },
          {
            "areaName": "源城区",
            "areaId": 3080
          },
          {
            "areaName": "东源县",
            "areaId": 3081
          }
        ],
        "areaId": 285
      },
      {
        "areaName": "梅州市",
        "childrenList": [{
            "areaName": "兴宁市",
            "areaId": 3082
          },
          {
            "areaName": "梅县",
            "areaId": 3083
          },
          {
            "areaName": "蕉岭县",
            "areaId": 3084
          },
          {
            "areaName": "大埔县",
            "areaId": 3085
          },
          {
            "areaName": "丰顺县",
            "areaId": 3086
          },
          {
            "areaName": "五华县",
            "areaId": 3087
          },
          {
            "areaName": "平远县",
            "areaId": 3088
          },
          {
            "areaName": "梅江区",
            "areaId": 3089
          }
        ],
        "areaId": 286
      },
      {
        "areaName": "惠州市",
        "childrenList": [{
            "areaName": "龙门县",
            "areaId": 3090
          },
          {
            "areaName": "惠阳区",
            "areaId": 3091
          },
          {
            "areaName": "大亚湾区",
            "areaId": 3092
          },
          {
            "areaName": "惠城区",
            "areaId": 3093
          },
          {
            "areaName": "惠东县",
            "areaId": 3094
          },
          {
            "areaName": "博罗县",
            "areaId": 3095
          }
        ],
        "areaId": 287
      },
      {
        "areaName": "汕尾市",
        "childrenList": [{
            "areaName": "陆河县",
            "areaId": 3096
          },
          {
            "areaName": "海丰县",
            "areaId": 3097
          },
          {
            "areaName": "城区",
            "areaId": 3098
          },
          {
            "areaName": "陆丰市",
            "areaId": 3099
          }
        ],
        "areaId": 288
      },
      {
        "areaName": "东莞市",
        "childrenList": [{
            "areaName": "中堂镇",
            "areaId": 3100
          },
          {
            "areaName": "东坑镇",
            "areaId": 3101
          },
          {
            "areaName": "道滘镇",
            "areaId": 3102
          },
          {
            "areaName": "沙田镇",
            "areaId": 3103
          },
          {
            "areaName": "高埗镇",
            "areaId": 3104
          },
          {
            "areaName": "石龙镇",
            "areaId": 3105
          },
          {
            "areaName": "石排镇",
            "areaId": 3106
          },
          {
            "areaName": "企石镇",
            "areaId": 3107
          },
          {
            "areaName": "石碣镇",
            "areaId": 3108
          },
          {
            "areaName": "洪梅镇",
            "areaId": 3109
          },
          {
            "areaName": "麻涌镇",
            "areaId": 3110
          },
          {
            "areaName": "桥头镇",
            "areaId": 3111
          },
          {
            "areaName": "望牛墩镇",
            "areaId": 3112
          },
          {
            "areaName": "茶山镇",
            "areaId": 3113
          },
          {
            "areaName": "谢岗镇",
            "areaId": 3114
          },
          {
            "areaName": "松山湖",
            "areaId": 3115
          },
          {
            "areaName": "莞城区",
            "areaId": 3116
          },
          {
            "areaName": "南城区",
            "areaId": 3117
          },
          {
            "areaName": "长安镇",
            "areaId": 3118
          },
          {
            "areaName": "寮步镇",
            "areaId": 3119
          },
          {
            "areaName": "大岭山镇",
            "areaId": 3120
          },
          {
            "areaName": "常平镇",
            "areaId": 3121
          },
          {
            "areaName": "厚街镇",
            "areaId": 3122
          },
          {
            "areaName": "万江区",
            "areaId": 3123
          },
          {
            "areaName": "樟木头镇",
            "areaId": 3124
          },
          {
            "areaName": "大朗镇",
            "areaId": 3125
          },
          {
            "areaName": "塘厦镇",
            "areaId": 3126
          },
          {
            "areaName": "凤岗镇",
            "areaId": 3127
          },
          {
            "areaName": "清溪镇",
            "areaId": 3128
          },
          {
            "areaName": "横沥镇",
            "areaId": 3129
          },
          {
            "areaName": "东城区",
            "areaId": 3130
          },
          {
            "areaName": "黄江镇",
            "areaId": 3131
          },
          {
            "areaName": "虎门镇",
            "areaId": 3132
          }
        ],
        "areaId": 289
      },
      {
        "areaName": "中山市",
        "childrenList": [{
            "areaName": "南朗镇",
            "areaId": 3133
          },
          {
            "areaName": "小榄镇",
            "areaId": 3134
          },
          {
            "areaName": "古镇",
            "areaId": 3135
          },
          {
            "areaName": "坦洲镇",
            "areaId": 3136
          },
          {
            "areaName": "黄圃镇",
            "areaId": 3137
          },
          {
            "areaName": "三乡镇",
            "areaId": 3138
          },
          {
            "areaName": "东凤镇",
            "areaId": 3139
          },
          {
            "areaName": "横栏镇",
            "areaId": 3140
          },
          {
            "areaName": "三角镇",
            "areaId": 3141
          },
          {
            "areaName": "南头镇",
            "areaId": 3142
          },
          {
            "areaName": "沙溪镇",
            "areaId": 3143
          },
          {
            "areaName": "五桂山镇",
            "areaId": 3144
          },
          {
            "areaName": "阜沙镇",
            "areaId": 3145
          },
          {
            "areaName": "东升镇",
            "areaId": 3146
          },
          {
            "areaName": "板芙镇",
            "areaId": 3147
          },
          {
            "areaName": "神湾镇",
            "areaId": 3148
          },
          {
            "areaName": "港口镇",
            "areaId": 3149
          },
          {
            "areaName": "大涌镇",
            "areaId": 3150
          },
          {
            "areaName": "火炬开发区",
            "areaId": 3151
          },
          {
            "areaName": "民众镇",
            "areaId": 3152
          },
          {
            "areaName": "东区街道",
            "areaId": 3153
          },
          {
            "areaName": "西区街道",
            "areaId": 3154
          },
          {
            "areaName": "南区街道",
            "areaId": 3155
          },
          {
            "areaName": "石岐区街道",
            "areaId": 3156
          },
          {
            "areaName": "沙朗镇",
            "areaId": 3157
          }
        ],
        "areaId": 290
      },
      {
        "areaName": "江门市",
        "childrenList": [{
            "areaName": "台山市",
            "areaId": 3158
          },
          {
            "areaName": "新会区",
            "areaId": 3159
          },
          {
            "areaName": "鹤山市",
            "areaId": 3160
          },
          {
            "areaName": "江海区",
            "areaId": 3161
          },
          {
            "areaName": "蓬江区",
            "areaId": 3162
          },
          {
            "areaName": "开平市",
            "areaId": 3163
          },
          {
            "areaName": "恩平市",
            "areaId": 3164
          }
        ],
        "areaId": 291
      },
      {
        "areaName": "佛山市",
        "childrenList": [{
            "areaName": "顺德区",
            "areaId": 3165
          },
          {
            "areaName": "禅城区",
            "areaId": 3166
          },
          {
            "areaName": "高明区",
            "areaId": 3167
          },
          {
            "areaName": "三水区",
            "areaId": 3168
          },
          {
            "areaName": "南海区",
            "areaId": 3169
          }
        ],
        "areaId": 292
      },
      {
        "areaName": "阳江市",
        "childrenList": [{
            "areaName": "阳春市",
            "areaId": 3170
          },
          {
            "areaName": "阳西县",
            "areaId": 3171
          },
          {
            "areaName": "江城区",
            "areaId": 3172
          },
          {
            "areaName": "阳东县",
            "areaId": 3173
          }
        ],
        "areaId": 293
      },
      {
        "areaName": "湛江市",
        "childrenList": [{
            "areaName": "雷州市",
            "areaId": 3174
          },
          {
            "areaName": "吴川市",
            "areaId": 3175
          },
          {
            "areaName": "徐闻县",
            "areaId": 3176
          },
          {
            "areaName": "坡头区",
            "areaId": 3177
          },
          {
            "areaName": "赤坎区",
            "areaId": 3178
          },
          {
            "areaName": "霞山区",
            "areaId": 3179
          },
          {
            "areaName": "经济技术开发区",
            "areaId": 3180
          },
          {
            "areaName": "麻章区",
            "areaId": 3181
          },
          {
            "areaName": "遂溪县",
            "areaId": 3182
          },
          {
            "areaName": "廉江市",
            "areaId": 3183
          }
        ],
        "areaId": 294
      },
      {
        "areaName": "茂名市",
        "childrenList": [{
            "areaName": "信宜市",
            "areaId": 3184
          },
          {
            "areaName": "茂南区",
            "areaId": 3185
          },
          {
            "areaName": "电白县",
            "areaId": 3186
          },
          {
            "areaName": "高州市",
            "areaId": 3187
          },
          {
            "areaName": "化州市",
            "areaId": 3188
          },
          {
            "areaName": "茂港区",
            "areaId": 3189
          }
        ],
        "areaId": 295
      },
      {
        "areaName": "肇庆市",
        "childrenList": [{
            "areaName": "广宁县",
            "areaId": 3190
          },
          {
            "areaName": "德庆县",
            "areaId": 3191
          },
          {
            "areaName": "怀集县",
            "areaId": 3192
          },
          {
            "areaName": "封开县",
            "areaId": 3193
          },
          {
            "areaName": "鼎湖区",
            "areaId": 3194
          },
          {
            "areaName": "端州区",
            "areaId": 3195
          },
          {
            "areaName": "四会市",
            "areaId": 3196
          },
          {
            "areaName": "高要市",
            "areaId": 3197
          }
        ],
        "areaId": 296
      },
      {
        "areaName": "云浮市",
        "childrenList": [{
            "areaName": "云安县",
            "areaId": 3198
          },
          {
            "areaName": "新兴县",
            "areaId": 3199
          },
          {
            "areaName": "郁南县",
            "areaId": 3200
          },
          {
            "areaName": "云城区",
            "areaId": 3201
          },
          {
            "areaName": "罗定市",
            "areaId": 3202
          }
        ],
        "areaId": 297
      },
      {
        "areaName": "清远市",
        "childrenList": [{
            "areaName": "连州市",
            "areaId": 3203
          },
          {
            "areaName": "佛冈县",
            "areaId": 3204
          },
          {
            "areaName": "阳山县",
            "areaId": 3205
          },
          {
            "areaName": "清新县",
            "areaId": 3206
          },
          {
            "areaName": "连山县",
            "areaId": 3207
          },
          {
            "areaName": "连南县",
            "areaId": 3208
          },
          {
            "areaName": "清城区",
            "areaId": 3209
          },
          {
            "areaName": "英德市",
            "areaId": 3210
          }
        ],
        "areaId": 298
      },
      {
        "areaName": "潮州市",
        "childrenList": [{
            "areaName": "饶平县",
            "areaId": 3211
          },
          {
            "areaName": "枫溪区",
            "areaId": 3212
          },
          {
            "areaName": "湘桥区",
            "areaId": 3213
          },
          {
            "areaName": "潮安县",
            "areaId": 3214
          }
        ],
        "areaId": 299
      },
      {
        "areaName": "揭阳市",
        "childrenList": [{
            "areaName": "揭西县",
            "areaId": 3215
          },
          {
            "areaName": "惠来县",
            "areaId": 3216
          },
          {
            "areaName": "东山区",
            "areaId": 3217
          },
          {
            "areaName": "普宁市",
            "areaId": 3218
          },
          {
            "areaName": "榕城区",
            "areaId": 3219
          },
          {
            "areaName": "揭东县",
            "areaId": 3220
          }
        ],
        "areaId": 300
      }
    ],
    "areaId": 19
  },
  {
    "areaName": "广西",
    "childrenList": [{
        "areaName": "南宁市",
        "childrenList": [{
            "areaName": "武鸣县",
            "areaId": 3221
          },
          {
            "areaName": "邕宁区",
            "areaId": 3222
          },
          {
            "areaName": "宾阳县",
            "areaId": 3223
          },
          {
            "areaName": "横县",
            "areaId": 3224
          },
          {
            "areaName": "上林县",
            "areaId": 3225
          },
          {
            "areaName": "隆安县",
            "areaId": 3226
          },
          {
            "areaName": "马山县",
            "areaId": 3227
          },
          {
            "areaName": "良庆区",
            "areaId": 3228
          },
          {
            "areaName": "江南区",
            "areaId": 3229
          },
          {
            "areaName": "兴宁区",
            "areaId": 3230
          },
          {
            "areaName": "青秀区",
            "areaId": 3231
          },
          {
            "areaName": "西乡塘区",
            "areaId": 3232
          }
        ],
        "areaId": 301
      },
      {
        "areaName": "柳州市",
        "childrenList": [{
            "areaName": "柳江县",
            "areaId": 3233
          },
          {
            "areaName": "柳城县",
            "areaId": 3234
          },
          {
            "areaName": "鹿寨县",
            "areaId": 3235
          },
          {
            "areaName": "融安县",
            "areaId": 3236
          },
          {
            "areaName": "三江县",
            "areaId": 3237
          },
          {
            "areaName": "融水县",
            "areaId": 3238
          },
          {
            "areaName": "鱼峰区",
            "areaId": 3239
          },
          {
            "areaName": "城中区",
            "areaId": 3240
          },
          {
            "areaName": "柳南区",
            "areaId": 3241
          },
          {
            "areaName": "柳北区",
            "areaId": 3242
          }
        ],
        "areaId": 302
      },
      {
        "areaName": "桂林市",
        "childrenList": [{
            "areaName": "阳朔县",
            "areaId": 3243
          },
          {
            "areaName": "临桂县",
            "areaId": 3244
          },
          {
            "areaName": "灵川县",
            "areaId": 3245
          },
          {
            "areaName": "全州县",
            "areaId": 3246
          },
          {
            "areaName": "平乐县",
            "areaId": 3247
          },
          {
            "areaName": "兴安县",
            "areaId": 3248
          },
          {
            "areaName": "灌阳县",
            "areaId": 3249
          },
          {
            "areaName": "荔浦县",
            "areaId": 3250
          },
          {
            "areaName": "资源县",
            "areaId": 3251
          },
          {
            "areaName": "永福县",
            "areaId": 3252
          },
          {
            "areaName": "龙胜县",
            "areaId": 3253
          },
          {
            "areaName": "恭城县",
            "areaId": 3254
          },
          {
            "areaName": "象山区",
            "areaId": 3255
          },
          {
            "areaName": "雁山区",
            "areaId": 3256
          },
          {
            "areaName": "秀峰区",
            "areaId": 3257
          },
          {
            "areaName": "叠彩区",
            "areaId": 3258
          },
          {
            "areaName": "七星区",
            "areaId": 3259
          }
        ],
        "areaId": 303
      },
      {
        "areaName": "梧州市",
        "childrenList": [{
            "areaName": "岑溪市",
            "areaId": 3260
          },
          {
            "areaName": "苍梧县",
            "areaId": 3261
          },
          {
            "areaName": "藤县",
            "areaId": 3262
          },
          {
            "areaName": "蒙山县",
            "areaId": 3263
          },
          {
            "areaName": "万秀区",
            "areaId": 3264
          },
          {
            "areaName": "蝶山区",
            "areaId": 3265
          },
          {
            "areaName": "长洲区",
            "areaId": 3266
          }
        ],
        "areaId": 304
      },
      {
        "areaName": "北海市",
        "childrenList": [{
            "areaName": "合浦县",
            "areaId": 3267
          },
          {
            "areaName": "铁山港区",
            "areaId": 3268
          },
          {
            "areaName": "海城区",
            "areaId": 3269
          },
          {
            "areaName": "银海区",
            "areaId": 3270
          }
        ],
        "areaId": 305
      },
      {
        "areaName": "防城港市",
        "childrenList": [{
            "areaName": "东兴市",
            "areaId": 3271
          },
          {
            "areaName": "上思县",
            "areaId": 3272
          },
          {
            "areaName": "防城区",
            "areaId": 3273
          },
          {
            "areaName": "港口区",
            "areaId": 3274
          }
        ],
        "areaId": 306
      },
      {
        "areaName": "钦州市",
        "childrenList": [{
            "areaName": "浦北县",
            "areaId": 3275
          },
          {
            "areaName": "灵山县",
            "areaId": 3276
          },
          {
            "areaName": "钦北区",
            "areaId": 3277
          },
          {
            "areaName": "钦南区",
            "areaId": 3278
          }
        ],
        "areaId": 307
      },
      {
        "areaName": "贵港市",
        "childrenList": [{
            "areaName": "桂平市",
            "areaId": 3279
          },
          {
            "areaName": "平南县",
            "areaId": 3280
          },
          {
            "areaName": "覃塘区",
            "areaId": 3281
          },
          {
            "areaName": "港南区",
            "areaId": 3282
          },
          {
            "areaName": "港北区",
            "areaId": 3283
          }
        ],
        "areaId": 308
      },
      {
        "areaName": "玉林市",
        "childrenList": [{
            "areaName": "北流市",
            "areaId": 3284
          },
          {
            "areaName": "容县",
            "areaId": 3285
          },
          {
            "areaName": "博白县",
            "areaId": 3286
          },
          {
            "areaName": "陆川县",
            "areaId": 3287
          },
          {
            "areaName": "兴业县",
            "areaId": 3288
          },
          {
            "areaName": "玉州区",
            "areaId": 3289
          }
        ],
        "areaId": 309
      },
      {
        "areaName": "贺州市",
        "childrenList": [{
            "areaName": "钟山县",
            "areaId": 3290
          },
          {
            "areaName": "昭平县",
            "areaId": 3291
          },
          {
            "areaName": "富川县",
            "areaId": 3292
          },
          {
            "areaName": "平桂管理区",
            "areaId": 3293
          },
          {
            "areaName": "八步区",
            "areaId": 3294
          }
        ],
        "areaId": 310
      },
      {
        "areaName": "百色市",
        "childrenList": [{
            "areaName": "右江区",
            "areaId": 3295
          },
          {
            "areaName": "平果县",
            "areaId": 3296
          },
          {
            "areaName": "乐业县",
            "areaId": 3297
          },
          {
            "areaName": "田阳县",
            "areaId": 3298
          },
          {
            "areaName": "西林县",
            "areaId": 3299
          },
          {
            "areaName": "田林县",
            "areaId": 3300
          },
          {
            "areaName": "德保县",
            "areaId": 3301
          },
          {
            "areaName": "靖西县",
            "areaId": 3302
          },
          {
            "areaName": "田东县",
            "areaId": 3303
          },
          {
            "areaName": "那坡县",
            "areaId": 3304
          },
          {
            "areaName": "隆林县",
            "areaId": 3305
          },
          {
            "areaName": "凌云县",
            "areaId": 3306
          }
        ],
        "areaId": 311
      },
      {
        "areaName": "河池市",
        "childrenList": [{
            "areaName": "宜州市",
            "areaId": 3307
          },
          {
            "areaName": "天峨县",
            "areaId": 3308
          },
          {
            "areaName": "凤山县",
            "areaId": 3309
          },
          {
            "areaName": "南丹县",
            "areaId": 3310
          },
          {
            "areaName": "东兰县",
            "areaId": 3311
          },
          {
            "areaName": "巴马县",
            "areaId": 3312
          },
          {
            "areaName": "环江县",
            "areaId": 3313
          },
          {
            "areaName": "罗城县",
            "areaId": 3314
          },
          {
            "areaName": "大化县",
            "areaId": 3315
          },
          {
            "areaName": "都安县",
            "areaId": 3316
          },
          {
            "areaName": "金城江区",
            "areaId": 3317
          }
        ],
        "areaId": 312
      },
      {
        "areaName": "来宾市",
        "childrenList": [{
            "areaName": "兴宾区",
            "areaId": 3318
          },
          {
            "areaName": "合山市",
            "areaId": 3319
          },
          {
            "areaName": "忻城县",
            "areaId": 3320
          },
          {
            "areaName": "武宣县",
            "areaId": 3321
          },
          {
            "areaName": "象州县",
            "areaId": 3322
          },
          {
            "areaName": "金秀县",
            "areaId": 3323
          }
        ],
        "areaId": 313
      },
      {
        "areaName": "崇左市",
        "childrenList": [{
            "areaName": "江州区",
            "areaId": 3324
          },
          {
            "areaName": "凭祥市",
            "areaId": 3325
          },
          {
            "areaName": "扶绥县",
            "areaId": 3326
          },
          {
            "areaName": "大新县",
            "areaId": 3327
          },
          {
            "areaName": "天等县",
            "areaId": 3328
          },
          {
            "areaName": "宁明县",
            "areaId": 3329
          },
          {
            "areaName": "龙州县",
            "areaId": 3330
          }
        ],
        "areaId": 314
      }
    ],
    "areaId": 20
  },
  {
    "areaName": "江西",
    "childrenList": [{
        "areaName": "南昌市",
        "childrenList": [{
            "areaName": "南昌县",
            "areaId": 3331
          },
          {
            "areaName": "进贤县",
            "areaId": 3332
          },
          {
            "areaName": "安义县",
            "areaId": 3333
          },
          {
            "areaName": "新建县",
            "areaId": 3334
          },
          {
            "areaName": "湾里区",
            "areaId": 3335
          },
          {
            "areaName": "青云谱区",
            "areaId": 3336
          },
          {
            "areaName": "西湖区",
            "areaId": 3337
          },
          {
            "areaName": "东湖区",
            "areaId": 3338
          },
          {
            "areaName": "高新区",
            "areaId": 3339
          },
          {
            "areaName": "昌北区",
            "areaId": 3340
          },
          {
            "areaName": "青山湖区",
            "areaId": 3341
          },
          {
            "areaName": "红谷滩新区",
            "areaId": 3342
          }
        ],
        "areaId": 315
      },
      {
        "areaName": "景德镇市",
        "childrenList": [{
            "areaName": "乐平市",
            "areaId": 3343
          },
          {
            "areaName": "浮梁县",
            "areaId": 3344
          },
          {
            "areaName": "珠山区",
            "areaId": 3345
          },
          {
            "areaName": "昌江区",
            "areaId": 3346
          }
        ],
        "areaId": 316
      },
      {
        "areaName": "萍乡市",
        "childrenList": [{
            "areaName": "湘东区",
            "areaId": 3347
          },
          {
            "areaName": "莲花县",
            "areaId": 3348
          },
          {
            "areaName": "上栗县",
            "areaId": 3349
          },
          {
            "areaName": "芦溪县",
            "areaId": 3350
          },
          {
            "areaName": "安源区",
            "areaId": 3351
          }
        ],
        "areaId": 317
      },
      {
        "areaName": "新余市",
        "childrenList": [{
            "areaName": "分宜县",
            "areaId": 3352
          },
          {
            "areaName": "渝水区",
            "areaId": 3353
          }
        ],
        "areaId": 318
      },
      {
        "areaName": "九江市",
        "childrenList": [{
            "areaName": "九江县",
            "areaId": 3354
          },
          {
            "areaName": "瑞昌市",
            "areaId": 3355
          },
          {
            "areaName": "星子县",
            "areaId": 3356
          },
          {
            "areaName": "武宁县",
            "areaId": 3357
          },
          {
            "areaName": "彭泽县",
            "areaId": 3358
          },
          {
            "areaName": "永修县",
            "areaId": 3359
          },
          {
            "areaName": "修水县",
            "areaId": 3360
          },
          {
            "areaName": "湖口县",
            "areaId": 3361
          },
          {
            "areaName": "德安县",
            "areaId": 3362
          },
          {
            "areaName": "都昌县",
            "areaId": 3363
          },
          {
            "areaName": "共青城市",
            "areaId": 3364
          },
          {
            "areaName": "经济技术开发区",
            "areaId": 3365
          },
          {
            "areaName": "八里湖新区",
            "areaId": 3366
          },
          {
            "areaName": "庐山风景名胜区",
            "areaId": 3367
          },
          {
            "areaName": "庐山区",
            "areaId": 3368
          },
          {
            "areaName": "浔阳区",
            "areaId": 3369
          }
        ],
        "areaId": 319
      },
      {
        "areaName": "鹰潭市",
        "childrenList": [{
            "areaName": "余江县",
            "areaId": 3370
          },
          {
            "areaName": "贵溪市",
            "areaId": 3371
          },
          {
            "areaName": "月湖区",
            "areaId": 3372
          },
          {
            "areaName": "龙虎山风景旅游区",
            "areaId": 3373
          }
        ],
        "areaId": 320
      },
      {
        "areaName": "上饶市",
        "childrenList": [{
            "areaName": "德兴市",
            "areaId": 3374
          },
          {
            "areaName": "广丰县",
            "areaId": 3375
          },
          {
            "areaName": "鄱阳县",
            "areaId": 3376
          },
          {
            "areaName": "婺源县",
            "areaId": 3377
          },
          {
            "areaName": "余干县",
            "areaId": 3378
          },
          {
            "areaName": "横峰县",
            "areaId": 3379
          },
          {
            "areaName": "弋阳县",
            "areaId": 3380
          },
          {
            "areaName": "铅山县",
            "areaId": 3381
          },
          {
            "areaName": "玉山县",
            "areaId": 3382
          },
          {
            "areaName": "万年县",
            "areaId": 3383
          },
          {
            "areaName": "信州区",
            "areaId": 3384
          },
          {
            "areaName": "上饶县",
            "areaId": 3385
          }
        ],
        "areaId": 321
      },
      {
        "areaName": "宜春市",
        "childrenList": [{
            "areaName": "丰城市",
            "areaId": 3386
          },
          {
            "areaName": "樟树市",
            "areaId": 3387
          },
          {
            "areaName": "高安市",
            "areaId": 3388
          },
          {
            "areaName": "铜鼓县",
            "areaId": 3389
          },
          {
            "areaName": "靖安县",
            "areaId": 3390
          },
          {
            "areaName": "宜丰县",
            "areaId": 3391
          },
          {
            "areaName": "奉新县",
            "areaId": 3392
          },
          {
            "areaName": "万载县",
            "areaId": 3393
          },
          {
            "areaName": "上高县",
            "areaId": 3394
          },
          {
            "areaName": "袁州区",
            "areaId": 3395
          }
        ],
        "areaId": 322
      },
      {
        "areaName": "抚州市",
        "childrenList": [{
            "areaName": "南丰县",
            "areaId": 3396
          },
          {
            "areaName": "乐安县",
            "areaId": 3397
          },
          {
            "areaName": "金溪县",
            "areaId": 3398
          },
          {
            "areaName": "南城县",
            "areaId": 3399
          },
          {
            "areaName": "东乡县",
            "areaId": 3400
          },
          {
            "areaName": "资溪县",
            "areaId": 3401
          },
          {
            "areaName": "宜黄县",
            "areaId": 3402
          },
          {
            "areaName": "崇仁县",
            "areaId": 3403
          },
          {
            "areaName": "黎川县",
            "areaId": 3404
          },
          {
            "areaName": "广昌县",
            "areaId": 3405
          },
          {
            "areaName": "临川区",
            "areaId": 3406
          }
        ],
        "areaId": 323
      },
      {
        "areaName": "吉安市",
        "childrenList": [{
            "areaName": "井冈山市",
            "areaId": 3407
          },
          {
            "areaName": "吉安县",
            "areaId": 3408
          },
          {
            "areaName": "永丰县",
            "areaId": 3409
          },
          {
            "areaName": "永新县",
            "areaId": 3410
          },
          {
            "areaName": "新干县",
            "areaId": 3411
          },
          {
            "areaName": "泰和县",
            "areaId": 3412
          },
          {
            "areaName": "峡江县",
            "areaId": 3413
          },
          {
            "areaName": "遂川县",
            "areaId": 3414
          },
          {
            "areaName": "安福县",
            "areaId": 3415
          },
          {
            "areaName": "吉水县",
            "areaId": 3416
          },
          {
            "areaName": "万安县",
            "areaId": 3417
          },
          {
            "areaName": "青原区",
            "areaId": 3418
          },
          {
            "areaName": "吉州区",
            "areaId": 3419
          }
        ],
        "areaId": 324
      },
      {
        "areaName": "赣州市",
        "childrenList": [{
            "areaName": "南康市",
            "areaId": 3420
          },
          {
            "areaName": "瑞金市",
            "areaId": 3421
          },
          {
            "areaName": "石城县",
            "areaId": 3422
          },
          {
            "areaName": "安远县",
            "areaId": 3423
          },
          {
            "areaName": "赣县",
            "areaId": 3424
          },
          {
            "areaName": "宁都县",
            "areaId": 3425
          },
          {
            "areaName": "寻乌县",
            "areaId": 3426
          },
          {
            "areaName": "兴国县",
            "areaId": 3427
          },
          {
            "areaName": "定南县",
            "areaId": 3428
          },
          {
            "areaName": "上犹县",
            "areaId": 3429
          },
          {
            "areaName": "于都县",
            "areaId": 3430
          },
          {
            "areaName": "龙南县",
            "areaId": 3431
          },
          {
            "areaName": "崇义县",
            "areaId": 3432
          },
          {
            "areaName": "大余县",
            "areaId": 3433
          },
          {
            "areaName": "信丰县",
            "areaId": 3434
          },
          {
            "areaName": "全南县",
            "areaId": 3435
          },
          {
            "areaName": "会昌县",
            "areaId": 3436
          },
          {
            "areaName": "章贡区",
            "areaId": 3437
          }
        ],
        "areaId": 325
      }
    ],
    "areaId": 21
  },
  {
    "areaName": "四川",
    "childrenList": [{
        "areaName": "成都市",
        "childrenList": [{
            "areaName": "高新西区",
            "areaId": 3438
          },
          {
            "areaName": "新都区",
            "areaId": 3439
          },
          {
            "areaName": "温江区",
            "areaId": 3440
          },
          {
            "areaName": "龙泉驿区",
            "areaId": 3441
          },
          {
            "areaName": "青白江区",
            "areaId": 3442
          },
          {
            "areaName": "彭州市",
            "areaId": 3443
          },
          {
            "areaName": "崇州市",
            "areaId": 3444
          },
          {
            "areaName": "邛崃市",
            "areaId": 3445
          },
          {
            "areaName": "都江堰市",
            "areaId": 3446
          },
          {
            "areaName": "郫县",
            "areaId": 3447
          },
          {
            "areaName": "新津县",
            "areaId": 3448
          },
          {
            "areaName": "双流县",
            "areaId": 3449
          },
          {
            "areaName": "大邑县",
            "areaId": 3450
          },
          {
            "areaName": "蒲江县",
            "areaId": 3451
          },
          {
            "areaName": "金堂县",
            "areaId": 3452
          },
          {
            "areaName": "青羊区",
            "areaId": 3453
          },
          {
            "areaName": "锦江区",
            "areaId": 3454
          },
          {
            "areaName": "金牛区",
            "areaId": 3455
          },
          {
            "areaName": "武侯区",
            "areaId": 3456
          },
          {
            "areaName": "成华区",
            "areaId": 3457
          },
          {
            "areaName": "高新区",
            "areaId": 3458
          }
        ],
        "areaId": 326
      },
      {
        "areaName": "自贡市",
        "childrenList": [{
            "areaName": "荣县",
            "areaId": 3459
          },
          {
            "areaName": "富顺县",
            "areaId": 3460
          },
          {
            "areaName": "自流井区",
            "areaId": 3461
          },
          {
            "areaName": "沿滩区",
            "areaId": 3462
          },
          {
            "areaName": "大安区",
            "areaId": 3463
          },
          {
            "areaName": "贡井区",
            "areaId": 3464
          }
        ],
        "areaId": 327
      },
      {
        "areaName": "攀枝花市",
        "childrenList": [{
            "areaName": "米易县",
            "areaId": 3465
          },
          {
            "areaName": "盐边县",
            "areaId": 3466
          },
          {
            "areaName": "仁和区",
            "areaId": 3467
          },
          {
            "areaName": "西区",
            "areaId": 3468
          },
          {
            "areaName": "东区",
            "areaId": 3469
          }
        ],
        "areaId": 328
      },
      {
        "areaName": "泸州市",
        "childrenList": [{
            "areaName": "泸县",
            "areaId": 3470
          },
          {
            "areaName": "合江县",
            "areaId": 3471
          },
          {
            "areaName": "叙永县",
            "areaId": 3472
          },
          {
            "areaName": "古蔺县",
            "areaId": 3473
          },
          {
            "areaName": "纳溪区",
            "areaId": 3474
          },
          {
            "areaName": "江阳区",
            "areaId": 3475
          },
          {
            "areaName": "龙马潭区",
            "areaId": 3476
          }
        ],
        "areaId": 329
      },
      {
        "areaName": "绵阳市",
        "childrenList": [{
            "areaName": "盐亭县",
            "areaId": 3477
          },
          {
            "areaName": "三台县",
            "areaId": 3478
          },
          {
            "areaName": "平武县",
            "areaId": 3479
          },
          {
            "areaName": "北川县",
            "areaId": 3480
          },
          {
            "areaName": "安县",
            "areaId": 3481
          },
          {
            "areaName": "梓潼县",
            "areaId": 3482
          },
          {
            "areaName": "江油市",
            "areaId": 3483
          },
          {
            "areaName": "涪城区",
            "areaId": 3484
          },
          {
            "areaName": "游仙区",
            "areaId": 3485
          },
          {
            "areaName": "高新区",
            "areaId": 3486
          },
          {
            "areaName": "经开区",
            "areaId": 3487
          }
        ],
        "areaId": 330
      },
      {
        "areaName": "德阳市",
        "childrenList": [{
            "areaName": "罗江县",
            "areaId": 3488
          },
          {
            "areaName": "中江县",
            "areaId": 3489
          },
          {
            "areaName": "广汉市",
            "areaId": 3490
          },
          {
            "areaName": "什邡市",
            "areaId": 3491
          },
          {
            "areaName": "旌阳区",
            "areaId": 3492
          },
          {
            "areaName": "绵竹市",
            "areaId": 3493
          }
        ],
        "areaId": 331
      },
      {
        "areaName": "广元市",
        "childrenList": [{
            "areaName": "青川县",
            "areaId": 3494
          },
          {
            "areaName": "旺苍县",
            "areaId": 3495
          },
          {
            "areaName": "剑阁县",
            "areaId": 3496
          },
          {
            "areaName": "苍溪县",
            "areaId": 3497
          },
          {
            "areaName": "元坝区",
            "areaId": 3498
          },
          {
            "areaName": "朝天区",
            "areaId": 3499
          },
          {
            "areaName": "利州区",
            "areaId": 3500
          }
        ],
        "areaId": 332
      },
      {
        "areaName": "遂宁市",
        "childrenList": [{
            "areaName": "射洪县",
            "areaId": 3501
          },
          {
            "areaName": "蓬溪县",
            "areaId": 3502
          },
          {
            "areaName": "大英县",
            "areaId": 3503
          },
          {
            "areaName": "安居区",
            "areaId": 3504
          },
          {
            "areaName": "船山区",
            "areaId": 3505
          }
        ],
        "areaId": 333
      },
      {
        "areaName": "内江市",
        "childrenList": [{
            "areaName": "资中县",
            "areaId": 3506
          },
          {
            "areaName": "隆昌县",
            "areaId": 3507
          },
          {
            "areaName": "威远县",
            "areaId": 3508
          },
          {
            "areaName": "市中区",
            "areaId": 3509
          },
          {
            "areaName": "东兴区",
            "areaId": 3510
          }
        ],
        "areaId": 334
      },
      {
        "areaName": "乐山市",
        "childrenList": [{
            "areaName": "五通桥区",
            "areaId": 3511
          },
          {
            "areaName": "沙湾区",
            "areaId": 3512
          },
          {
            "areaName": "金口河区",
            "areaId": 3513
          },
          {
            "areaName": "夹江县",
            "areaId": 3514
          },
          {
            "areaName": "井研县",
            "areaId": 3515
          },
          {
            "areaName": "犍为县",
            "areaId": 3516
          },
          {
            "areaName": "沐川县",
            "areaId": 3517
          },
          {
            "areaName": "峨边县",
            "areaId": 3518
          },
          {
            "areaName": "马边县",
            "areaId": 3519
          },
          {
            "areaName": "市中区",
            "areaId": 3520
          },
          {
            "areaName": "峨眉山市",
            "areaId": 3521
          }
        ],
        "areaId": 335
      },
      {
        "areaName": "宜宾市",
        "childrenList": [{
            "areaName": "宜宾县",
            "areaId": 3522
          },
          {
            "areaName": "南溪区",
            "areaId": 3523
          },
          {
            "areaName": "江安县",
            "areaId": 3524
          },
          {
            "areaName": "长宁县",
            "areaId": 3525
          },
          {
            "areaName": "兴文县",
            "areaId": 3526
          },
          {
            "areaName": "珙县",
            "areaId": 3527
          },
          {
            "areaName": "高县",
            "areaId": 3528
          },
          {
            "areaName": "屏山县",
            "areaId": 3529
          },
          {
            "areaName": "筠连县",
            "areaId": 3530
          },
          {
            "areaName": "翠屏区",
            "areaId": 3531
          }
        ],
        "areaId": 336
      },
      {
        "areaName": "广安市",
        "childrenList": [{
            "areaName": "岳池县",
            "areaId": 3532
          },
          {
            "areaName": "武胜县",
            "areaId": 3533
          },
          {
            "areaName": "邻水县",
            "areaId": 3534
          },
          {
            "areaName": "广安区",
            "areaId": 3535
          },
          {
            "areaName": "华蓥市",
            "areaId": 3536
          }
        ],
        "areaId": 337
      },
      {
        "areaName": "南充市",
        "childrenList": [{
            "areaName": "仪陇县",
            "areaId": 3537
          },
          {
            "areaName": "蓬安县",
            "areaId": 3538
          },
          {
            "areaName": "营山县",
            "areaId": 3539
          },
          {
            "areaName": "南部县",
            "areaId": 3540
          },
          {
            "areaName": "顺庆区",
            "areaId": 3541
          },
          {
            "areaName": "高坪区",
            "areaId": 3542
          },
          {
            "areaName": "嘉陵区",
            "areaId": 3543
          },
          {
            "areaName": "西充县",
            "areaId": 3544
          },
          {
            "areaName": "阆中市",
            "areaId": 3545
          }
        ],
        "areaId": 338
      },
      {
        "areaName": "达州市",
        "childrenList": [{
            "areaName": "通川区",
            "areaId": 3546
          },
          {
            "areaName": "达县",
            "areaId": 3547
          },
          {
            "areaName": "大竹县",
            "areaId": 3548
          },
          {
            "areaName": "渠县",
            "areaId": 3549
          },
          {
            "areaName": "万源市",
            "areaId": 3550
          },
          {
            "areaName": "宣汉县",
            "areaId": 3551
          },
          {
            "areaName": "开江县",
            "areaId": 3552
          }
        ],
        "areaId": 339
      },
      {
        "areaName": "巴中市",
        "childrenList": [{
            "areaName": "南江县",
            "areaId": 3553
          },
          {
            "areaName": "平昌县",
            "areaId": 3554
          },
          {
            "areaName": "通江县",
            "areaId": 3555
          },
          {
            "areaName": "巴州区",
            "areaId": 3556
          }
        ],
        "areaId": 340
      },
      {
        "areaName": "雅安市",
        "childrenList": [{
            "areaName": "芦山县",
            "areaId": 3557
          },
          {
            "areaName": "石棉县",
            "areaId": 3558
          },
          {
            "areaName": "名山区",
            "areaId": 3559
          },
          {
            "areaName": "天全县",
            "areaId": 3560
          },
          {
            "areaName": "荥经县",
            "areaId": 3561
          },
          {
            "areaName": "汉源县",
            "areaId": 3562
          },
          {
            "areaName": "宝兴县",
            "areaId": 3563
          },
          {
            "areaName": "雨城区",
            "areaId": 3564
          }
        ],
        "areaId": 341
      },
      {
        "areaName": "眉山市",
        "childrenList": [{
            "areaName": "仁寿县",
            "areaId": 3565
          },
          {
            "areaName": "彭山县",
            "areaId": 3566
          },
          {
            "areaName": "洪雅县",
            "areaId": 3567
          },
          {
            "areaName": "丹棱县",
            "areaId": 3568
          },
          {
            "areaName": "青神县",
            "areaId": 3569
          },
          {
            "areaName": "东坡区",
            "areaId": 3570
          }
        ],
        "areaId": 342
      },
      {
        "areaName": "资阳市",
        "childrenList": [{
            "areaName": "安岳县",
            "areaId": 3571
          },
          {
            "areaName": "乐至县",
            "areaId": 3572
          },
          {
            "areaName": "雁江区",
            "areaId": 3573
          },
          {
            "areaName": "简阳市",
            "areaId": 3574
          }
        ],
        "areaId": 343
      },
      {
        "areaName": "阿坝州",
        "childrenList": [{
            "areaName": "马尔康县",
            "areaId": 3575
          },
          {
            "areaName": "九寨沟县",
            "areaId": 3576
          },
          {
            "areaName": "红原县",
            "areaId": 3577
          },
          {
            "areaName": "阿坝县",
            "areaId": 3578
          },
          {
            "areaName": "理县",
            "areaId": 3579
          },
          {
            "areaName": "若尔盖县",
            "areaId": 3580
          },
          {
            "areaName": "金川县",
            "areaId": 3581
          },
          {
            "areaName": "小金县",
            "areaId": 3582
          },
          {
            "areaName": "黑水县",
            "areaId": 3583
          },
          {
            "areaName": "松潘县",
            "areaId": 3584
          },
          {
            "areaName": "壤塘县",
            "areaId": 3585
          },
          {
            "areaName": "茂县",
            "areaId": 3586
          },
          {
            "areaName": "汶川县",
            "areaId": 3587
          }
        ],
        "areaId": 344
      },
      {
        "areaName": "甘孜州",
        "childrenList": [{
            "areaName": "康定县",
            "areaId": 3588
          },
          {
            "areaName": "泸定县",
            "areaId": 3589
          },
          {
            "areaName": "九龙县",
            "areaId": 3590
          },
          {
            "areaName": "丹巴县",
            "areaId": 3591
          },
          {
            "areaName": "道孚县",
            "areaId": 3592
          },
          {
            "areaName": "炉霍县",
            "areaId": 3593
          },
          {
            "areaName": "色达县",
            "areaId": 3594
          },
          {
            "areaName": "甘孜县",
            "areaId": 3595
          },
          {
            "areaName": "新龙县",
            "areaId": 3596
          },
          {
            "areaName": "白玉县",
            "areaId": 3597
          },
          {
            "areaName": "德格县",
            "areaId": 3598
          },
          {
            "areaName": "石渠县",
            "areaId": 3599
          },
          {
            "areaName": "雅江县",
            "areaId": 3600
          },
          {
            "areaName": "理塘县",
            "areaId": 3601
          },
          {
            "areaName": "巴塘县",
            "areaId": 3602
          },
          {
            "areaName": "稻城县",
            "areaId": 3603
          },
          {
            "areaName": "乡城县",
            "areaId": 3604
          },
          {
            "areaName": "得荣县",
            "areaId": 3605
          }
        ],
        "areaId": 345
      },
      {
        "areaName": "凉山州",
        "childrenList": [{
            "areaName": "美姑县",
            "areaId": 3606
          },
          {
            "areaName": "昭觉县",
            "areaId": 3607
          },
          {
            "areaName": "会理县",
            "areaId": 3608
          },
          {
            "areaName": "会东县",
            "areaId": 3609
          },
          {
            "areaName": "普格县",
            "areaId": 3610
          },
          {
            "areaName": "宁南县",
            "areaId": 3611
          },
          {
            "areaName": "德昌县",
            "areaId": 3612
          },
          {
            "areaName": "冕宁县",
            "areaId": 3613
          },
          {
            "areaName": "盐源县",
            "areaId": 3614
          },
          {
            "areaName": "金阳县",
            "areaId": 3615
          },
          {
            "areaName": "布拖县",
            "areaId": 3616
          },
          {
            "areaName": "雷波县",
            "areaId": 3617
          },
          {
            "areaName": "越西县",
            "areaId": 3618
          },
          {
            "areaName": "喜德县",
            "areaId": 3619
          },
          {
            "areaName": "甘洛县",
            "areaId": 3620
          },
          {
            "areaName": "木里县",
            "areaId": 3621
          },
          {
            "areaName": "西昌市",
            "areaId": 3622
          }
        ],
        "areaId": 346
      }
    ],
    "areaId": 22
  },
  {
    "areaName": "海南",
    "childrenList": [{
        "areaName": "海口市",
        "childrenList": [{
            "areaName": "秀英区",
            "areaId": 3623
          },
          {
            "areaName": "龙华区",
            "areaId": 3624
          },
          {
            "areaName": "琼山区",
            "areaId": 3625
          },
          {
            "areaName": "美兰区",
            "areaId": 3626
          }
        ],
        "areaId": 347
      },
      {
        "areaName": "儋州市",
        "childrenList": [{
            "areaName": "那大镇",
            "areaId": 3627
          },
          {
            "areaName": "和庆镇",
            "areaId": 3628
          },
          {
            "areaName": "南丰镇",
            "areaId": 3629
          },
          {
            "areaName": "大成镇",
            "areaId": 3630
          },
          {
            "areaName": "雅星镇",
            "areaId": 3631
          },
          {
            "areaName": "兰洋镇",
            "areaId": 3632
          },
          {
            "areaName": "光村镇",
            "areaId": 3633
          },
          {
            "areaName": "木棠镇",
            "areaId": 3634
          },
          {
            "areaName": "海头镇",
            "areaId": 3635
          },
          {
            "areaName": "峨蔓镇",
            "areaId": 3636
          },
          {
            "areaName": "三都镇",
            "areaId": 3637
          },
          {
            "areaName": "王五镇",
            "areaId": 3638
          },
          {
            "areaName": "白马井镇",
            "areaId": 3639
          },
          {
            "areaName": "中和镇",
            "areaId": 3640
          },
          {
            "areaName": "排浦镇",
            "areaId": 3641
          },
          {
            "areaName": "东成镇",
            "areaId": 3642
          },
          {
            "areaName": "新州镇",
            "areaId": 3643
          },
          {
            "areaName": "洋浦经济开发区",
            "areaId": 3644
          },
          {
            "areaName": "富克镇",
            "areaId": 3645
          },
          {
            "areaName": "西培农场",
            "areaId": 3646
          },
          {
            "areaName": "西联农场",
            "areaId": 3647
          },
          {
            "areaName": "蓝洋农场",
            "areaId": 3648
          },
          {
            "areaName": "八一农场",
            "areaId": 3649
          },
          {
            "areaName": "西华农场",
            "areaId": 3650
          },
          {
            "areaName": "西庆农场",
            "areaId": 3651
          },
          {
            "areaName": "西流农场",
            "areaId": 3652
          },
          {
            "areaName": "新盈农场",
            "areaId": 3653
          },
          {
            "areaName": "龙山农场",
            "areaId": 3654
          },
          {
            "areaName": "红岭农场",
            "areaId": 3655
          },
          {
            "areaName": "热作学院",
            "areaId": 3656
          }
        ],
        "areaId": 348
      },
      {
        "areaName": "琼海市",
        "childrenList": [{
            "areaName": "嘉积镇",
            "areaId": 3657
          },
          {
            "areaName": "万泉镇",
            "areaId": 3658
          },
          {
            "areaName": "石壁镇",
            "areaId": 3659
          },
          {
            "areaName": "中原镇",
            "areaId": 3660
          },
          {
            "areaName": "博鳌镇",
            "areaId": 3661
          },
          {
            "areaName": "阳江镇",
            "areaId": 3662
          },
          {
            "areaName": "龙江镇",
            "areaId": 3663
          },
          {
            "areaName": "潭门镇",
            "areaId": 3664
          },
          {
            "areaName": "塔洋镇",
            "areaId": 3665
          },
          {
            "areaName": "长坡镇",
            "areaId": 3666
          },
          {
            "areaName": "大路镇",
            "areaId": 3667
          },
          {
            "areaName": "会山镇",
            "areaId": 3668
          },
          {
            "areaName": "彬村山华侨农场",
            "areaId": 3669
          },
          {
            "areaName": "东太农场",
            "areaId": 3670
          },
          {
            "areaName": "东红农场",
            "areaId": 3671
          },
          {
            "areaName": "东升农场",
            "areaId": 3672
          },
          {
            "areaName": "南俸农场",
            "areaId": 3673
          }
        ],
        "areaId": 349
      },
      {
        "areaName": "万宁市",
        "childrenList": [{
            "areaName": "万城镇",
            "areaId": 3674
          },
          {
            "areaName": "龙滚镇",
            "areaId": 3675
          },
          {
            "areaName": "和乐镇",
            "areaId": 3676
          },
          {
            "areaName": "后安镇",
            "areaId": 3677
          },
          {
            "areaName": "大茂镇",
            "areaId": 3678
          },
          {
            "areaName": "东澳镇",
            "areaId": 3679
          },
          {
            "areaName": "礼纪镇",
            "areaId": 3680
          },
          {
            "areaName": "长丰镇",
            "areaId": 3681
          },
          {
            "areaName": "山根镇",
            "areaId": 3682
          },
          {
            "areaName": "北大镇",
            "areaId": 3683
          },
          {
            "areaName": "南桥镇",
            "areaId": 3684
          },
          {
            "areaName": "三更罗镇",
            "areaId": 3685
          },
          {
            "areaName": "六连林场",
            "areaId": 3686
          },
          {
            "areaName": "东兴农场",
            "areaId": 3687
          },
          {
            "areaName": "东和农场",
            "areaId": 3688
          },
          {
            "areaName": "新中农场",
            "areaId": 3689
          },
          {
            "areaName": "兴隆华侨农场",
            "areaId": 3690
          }
        ],
        "areaId": 350
      },
      {
        "areaName": "东方市",
        "childrenList": [{
            "areaName": "八所镇",
            "areaId": 3691
          },
          {
            "areaName": "东河镇",
            "areaId": 3692
          },
          {
            "areaName": "大田镇",
            "areaId": 3693
          },
          {
            "areaName": "感城镇",
            "areaId": 3694
          },
          {
            "areaName": "板桥镇",
            "areaId": 3695
          },
          {
            "areaName": "三家镇",
            "areaId": 3696
          },
          {
            "areaName": "四更镇",
            "areaId": 3697
          },
          {
            "areaName": "新龙镇",
            "areaId": 3698
          },
          {
            "areaName": "天安乡",
            "areaId": 3699
          },
          {
            "areaName": "江边乡",
            "areaId": 3700
          },
          {
            "areaName": "广坝农场",
            "areaId": 3701
          },
          {
            "areaName": "东方华侨农场",
            "areaId": 3702
          }
        ],
        "areaId": 351
      },
      {
        "areaName": "三亚市",
        "childrenList": [{
            "areaName": "海棠湾镇",
            "areaId": 3703
          },
          {
            "areaName": "吉阳镇",
            "areaId": 3704
          },
          {
            "areaName": "凤凰镇",
            "areaId": 3705
          },
          {
            "areaName": "天涯镇",
            "areaId": 3706
          },
          {
            "areaName": "育才镇",
            "areaId": 3707
          },
          {
            "areaName": "崖城镇",
            "areaId": 3708
          },
          {
            "areaName": "河西区",
            "areaId": 3709
          },
          {
            "areaName": "河东区",
            "areaId": 3710
          },
          {
            "areaName": "南田农场",
            "areaId": 3711
          },
          {
            "areaName": "南新农场",
            "areaId": 3712
          },
          {
            "areaName": "南岛农场",
            "areaId": 3713
          },
          {
            "areaName": "立才农场",
            "areaId": 3714
          },
          {
            "areaName": "南滨农场",
            "areaId": 3715
          }
        ],
        "areaId": 352
      },
      {
        "areaName": "文昌市",
        "childrenList": [{
            "areaName": "文城镇",
            "areaId": 3716
          },
          {
            "areaName": "重兴镇",
            "areaId": 3717
          },
          {
            "areaName": "蓬莱镇",
            "areaId": 3718
          },
          {
            "areaName": "会文镇",
            "areaId": 3719
          },
          {
            "areaName": "东路镇",
            "areaId": 3720
          },
          {
            "areaName": "潭牛镇",
            "areaId": 3721
          },
          {
            "areaName": "东阁镇",
            "areaId": 3722
          },
          {
            "areaName": "文教镇",
            "areaId": 3723
          },
          {
            "areaName": "东郊镇",
            "areaId": 3724
          },
          {
            "areaName": "龙楼镇",
            "areaId": 3725
          },
          {
            "areaName": "昌洒镇",
            "areaId": 3726
          },
          {
            "areaName": "翁田镇",
            "areaId": 3727
          },
          {
            "areaName": "抱罗镇",
            "areaId": 3728
          },
          {
            "areaName": "冯坡镇",
            "areaId": 3729
          },
          {
            "areaName": "锦山镇",
            "areaId": 3730
          },
          {
            "areaName": "铺前镇",
            "areaId": 3731
          },
          {
            "areaName": "公坡镇",
            "areaId": 3732
          },
          {
            "areaName": "迈号镇",
            "areaId": 3733
          },
          {
            "areaName": "清谰镇",
            "areaId": 3734
          },
          {
            "areaName": "南阳镇",
            "areaId": 3735
          },
          {
            "areaName": "新桥镇",
            "areaId": 3736
          },
          {
            "areaName": "头苑镇",
            "areaId": 3737
          },
          {
            "areaName": "宝芳乡",
            "areaId": 3738
          },
          {
            "areaName": "龙马乡",
            "areaId": 3739
          },
          {
            "areaName": "湖山乡",
            "areaId": 3740
          },
          {
            "areaName": "东路农场",
            "areaId": 3741
          },
          {
            "areaName": "南阳农场",
            "areaId": 3742
          },
          {
            "areaName": "罗豆农场",
            "areaId": 3743
          },
          {
            "areaName": "橡胶研究所",
            "areaId": 3744
          }
        ],
        "areaId": 353
      },
      {
        "areaName": "五指山市",
        "childrenList": [{
            "areaName": "通什镇",
            "areaId": 3745
          },
          {
            "areaName": "南圣镇",
            "areaId": 3746
          },
          {
            "areaName": "毛阳镇",
            "areaId": 3747
          },
          {
            "areaName": "番阳镇",
            "areaId": 3748
          },
          {
            "areaName": "畅好乡",
            "areaId": 3749
          },
          {
            "areaName": "毛道乡",
            "areaId": 3750
          },
          {
            "areaName": "水满乡",
            "areaId": 3751
          },
          {
            "areaName": "畅好农场",
            "areaId": 3752
          }
        ],
        "areaId": 354
      },
      {
        "areaName": "临高县",
        "childrenList": [{
            "areaName": "临城镇",
            "areaId": 3753
          },
          {
            "areaName": "波莲镇",
            "areaId": 3754
          },
          {
            "areaName": "东英镇",
            "areaId": 3755
          },
          {
            "areaName": "博厚镇",
            "areaId": 3756
          },
          {
            "areaName": "皇桐镇",
            "areaId": 3757
          },
          {
            "areaName": "多文镇",
            "areaId": 3758
          },
          {
            "areaName": "和舍镇",
            "areaId": 3759
          },
          {
            "areaName": "南宝镇",
            "areaId": 3760
          },
          {
            "areaName": "新盈镇",
            "areaId": 3761
          },
          {
            "areaName": "调楼镇",
            "areaId": 3762
          },
          {
            "areaName": "加来镇",
            "areaId": 3763
          },
          {
            "areaName": "红华农场",
            "areaId": 3764
          },
          {
            "areaName": "加来农场",
            "areaId": 3765
          },
          {
            "areaName": "城区",
            "areaId": 3766
          }
        ],
        "areaId": 355
      },
      {
        "areaName": "澄迈县",
        "childrenList": [{
            "areaName": "金江镇",
            "areaId": 3767
          },
          {
            "areaName": "老城镇",
            "areaId": 3768
          },
          {
            "areaName": "瑞溪镇",
            "areaId": 3769
          },
          {
            "areaName": "永发镇",
            "areaId": 3770
          },
          {
            "areaName": "加乐镇",
            "areaId": 3771
          },
          {
            "areaName": "文儒镇",
            "areaId": 3772
          },
          {
            "areaName": "中兴镇",
            "areaId": 3773
          },
          {
            "areaName": "仁兴镇",
            "areaId": 3774
          },
          {
            "areaName": "福山镇",
            "areaId": 3775
          },
          {
            "areaName": "桥头镇",
            "areaId": 3776
          },
          {
            "areaName": "大丰镇",
            "areaId": 3777
          },
          {
            "areaName": "红光农场",
            "areaId": 3778
          },
          {
            "areaName": "西达农场",
            "areaId": 3779
          },
          {
            "areaName": "金安农场",
            "areaId": 3780
          },
          {
            "areaName": "城区",
            "areaId": 3781
          }
        ],
        "areaId": 356
      },
      {
        "areaName": "定安县",
        "childrenList": [{
            "areaName": "定城镇",
            "areaId": 3782
          },
          {
            "areaName": "新竹镇",
            "areaId": 3783
          },
          {
            "areaName": "龙湖镇",
            "areaId": 3784
          },
          {
            "areaName": "雷鸣镇",
            "areaId": 3785
          },
          {
            "areaName": "龙门镇",
            "areaId": 3786
          },
          {
            "areaName": "龙河镇",
            "areaId": 3787
          },
          {
            "areaName": "岭口镇",
            "areaId": 3788
          },
          {
            "areaName": "翰林镇",
            "areaId": 3789
          },
          {
            "areaName": "富文镇",
            "areaId": 3790
          },
          {
            "areaName": "黄竹镇",
            "areaId": 3791
          },
          {
            "areaName": "金鸡岭农场",
            "areaId": 3792
          },
          {
            "areaName": "中瑞农场",
            "areaId": 3793
          },
          {
            "areaName": "南海农场",
            "areaId": 3794
          },
          {
            "areaName": "城区",
            "areaId": 3795
          }
        ],
        "areaId": 357
      },
      {
        "areaName": "屯昌县",
        "childrenList": [{
            "areaName": "屯城镇",
            "areaId": 3796
          },
          {
            "areaName": "新兴镇",
            "areaId": 3797
          },
          {
            "areaName": "枫木镇",
            "areaId": 3798
          },
          {
            "areaName": "乌坡镇",
            "areaId": 3799
          },
          {
            "areaName": "南吕镇",
            "areaId": 3800
          },
          {
            "areaName": "南坤镇",
            "areaId": 3801
          },
          {
            "areaName": "坡心镇",
            "areaId": 3802
          },
          {
            "areaName": "西昌镇",
            "areaId": 3803
          },
          {
            "areaName": "中建农场",
            "areaId": 3804
          },
          {
            "areaName": "中坤农场",
            "areaId": 3805
          },
          {
            "areaName": "县城内",
            "areaId": 3806
          }
        ],
        "areaId": 358
      },
      {
        "areaName": "昌江县",
        "childrenList": [{
            "areaName": "石碌镇",
            "areaId": 3807
          },
          {
            "areaName": "叉河镇",
            "areaId": 3808
          },
          {
            "areaName": "十月田镇",
            "areaId": 3809
          },
          {
            "areaName": "乌烈镇",
            "areaId": 3810
          },
          {
            "areaName": "昌化镇",
            "areaId": 3811
          },
          {
            "areaName": "海尾镇",
            "areaId": 3812
          },
          {
            "areaName": "七叉镇",
            "areaId": 3813
          },
          {
            "areaName": "王下乡",
            "areaId": 3814
          },
          {
            "areaName": "海南矿业公司",
            "areaId": 3815
          },
          {
            "areaName": "霸王岭林场",
            "areaId": 3816
          },
          {
            "areaName": "红林农场",
            "areaId": 3817
          },
          {
            "areaName": "城区",
            "areaId": 3818
          }
        ],
        "areaId": 359
      },
      {
        "areaName": "白沙县",
        "childrenList": [{
            "areaName": "牙叉镇",
            "areaId": 3819
          },
          {
            "areaName": "七坊镇",
            "areaId": 3820
          },
          {
            "areaName": "邦溪镇",
            "areaId": 3821
          },
          {
            "areaName": "打安镇",
            "areaId": 3822
          },
          {
            "areaName": "细水乡",
            "areaId": 3823
          },
          {
            "areaName": "元门乡",
            "areaId": 3824
          },
          {
            "areaName": "南开乡",
            "areaId": 3825
          },
          {
            "areaName": "阜龙乡",
            "areaId": 3826
          },
          {
            "areaName": "青松乡",
            "areaId": 3827
          },
          {
            "areaName": "金波乡",
            "areaId": 3828
          },
          {
            "areaName": "荣邦乡",
            "areaId": 3829
          },
          {
            "areaName": "白沙农场",
            "areaId": 3830
          },
          {
            "areaName": "龙江农场",
            "areaId": 3831
          },
          {
            "areaName": "邦溪农场",
            "areaId": 3832
          },
          {
            "areaName": "城区",
            "areaId": 3833
          }
        ],
        "areaId": 360
      },
      {
        "areaName": "琼中县",
        "childrenList": [{
            "areaName": "营根镇",
            "areaId": 3834
          },
          {
            "areaName": "湾岭镇",
            "areaId": 3835
          },
          {
            "areaName": "黎母山镇",
            "areaId": 3836
          },
          {
            "areaName": "和平镇",
            "areaId": 3837
          },
          {
            "areaName": "长征镇",
            "areaId": 3838
          },
          {
            "areaName": "红毛镇",
            "areaId": 3839
          },
          {
            "areaName": "中平镇",
            "areaId": 3840
          },
          {
            "areaName": "上安乡",
            "areaId": 3841
          },
          {
            "areaName": "什运乡",
            "areaId": 3842
          },
          {
            "areaName": "吊罗山乡",
            "areaId": 3843
          },
          {
            "areaName": "黎母山林业公司",
            "areaId": 3844
          },
          {
            "areaName": "阳江农场",
            "areaId": 3845
          },
          {
            "areaName": "乌石农场",
            "areaId": 3846
          },
          {
            "areaName": "加钗农场",
            "areaId": 3847
          },
          {
            "areaName": "长征农场",
            "areaId": 3848
          },
          {
            "areaName": "城区",
            "areaId": 3849
          }
        ],
        "areaId": 361
      },
      {
        "areaName": "陵水县",
        "childrenList": [{
            "areaName": "椰林镇",
            "areaId": 3850
          },
          {
            "areaName": "光坡镇",
            "areaId": 3851
          },
          {
            "areaName": "三才镇",
            "areaId": 3852
          },
          {
            "areaName": "英州镇",
            "areaId": 3853
          },
          {
            "areaName": "隆广镇",
            "areaId": 3854
          },
          {
            "areaName": "文罗镇",
            "areaId": 3855
          },
          {
            "areaName": "本号镇",
            "areaId": 3856
          },
          {
            "areaName": "新村镇",
            "areaId": 3857
          },
          {
            "areaName": "黎安镇",
            "areaId": 3858
          },
          {
            "areaName": "提蒙乡",
            "areaId": 3859
          },
          {
            "areaName": "群英乡",
            "areaId": 3860
          },
          {
            "areaName": "吊罗山林业公司",
            "areaId": 3861
          },
          {
            "areaName": "岭门农场",
            "areaId": 3862
          },
          {
            "areaName": "南平农场",
            "areaId": 3863
          },
          {
            "areaName": "城区",
            "areaId": 3864
          }
        ],
        "areaId": 362
      },
      {
        "areaName": "保亭县",
        "childrenList": [{
            "areaName": "保城镇",
            "areaId": 3865
          },
          {
            "areaName": "什玲镇",
            "areaId": 3866
          },
          {
            "areaName": "加茂镇",
            "areaId": 3867
          },
          {
            "areaName": "响水镇",
            "areaId": 3868
          },
          {
            "areaName": "新政镇",
            "areaId": 3869
          },
          {
            "areaName": "三道镇",
            "areaId": 3870
          },
          {
            "areaName": "六弓乡",
            "areaId": 3871
          },
          {
            "areaName": "南林乡",
            "areaId": 3872
          },
          {
            "areaName": "毛感乡",
            "areaId": 3873
          },
          {
            "areaName": "保亭研究所",
            "areaId": 3874
          },
          {
            "areaName": "新星农场",
            "areaId": 3875
          },
          {
            "areaName": "金江农场",
            "areaId": 3876
          },
          {
            "areaName": "三道农场",
            "areaId": 3877
          }
        ],
        "areaId": 363
      },
      {
        "areaName": "乐东县",
        "childrenList": [{
            "areaName": "抱由镇",
            "areaId": 3878
          },
          {
            "areaName": "万冲镇",
            "areaId": 3879
          },
          {
            "areaName": "大安镇",
            "areaId": 3880
          },
          {
            "areaName": "志仲镇",
            "areaId": 3881
          },
          {
            "areaName": "千家镇",
            "areaId": 3882
          },
          {
            "areaName": "九所镇",
            "areaId": 3883
          },
          {
            "areaName": "利国镇",
            "areaId": 3884
          },
          {
            "areaName": "黄流镇",
            "areaId": 3885
          },
          {
            "areaName": "佛罗镇",
            "areaId": 3886
          },
          {
            "areaName": "尖峰镇",
            "areaId": 3887
          },
          {
            "areaName": "莺歌海镇",
            "areaId": 3888
          },
          {
            "areaName": "尖峰岭林业公司",
            "areaId": 3889
          },
          {
            "areaName": "莺歌海盐场",
            "areaId": 3890
          },
          {
            "areaName": "山荣农场",
            "areaId": 3891
          },
          {
            "areaName": "乐光农场",
            "areaId": 3892
          },
          {
            "areaName": "保国农场",
            "areaId": 3893
          },
          {
            "areaName": "城区",
            "areaId": 3894
          }
        ],
        "areaId": 364
      },
      {
        "areaName": "三沙市",
        "childrenList": [{
            "areaName": "西沙群岛",
            "areaId": 3895
          },
          {
            "areaName": "南沙群岛",
            "areaId": 3896
          },
          {
            "areaName": "中沙群岛",
            "areaId": 3897
          }
        ],
        "areaId": 365
      }
    ],
    "areaId": 23
  },
  {
    "areaName": "贵州",
    "childrenList": [{
        "areaName": "贵阳市",
        "childrenList": [{
            "areaName": "清镇市",
            "areaId": 3898
          },
          {
            "areaName": "开阳县",
            "areaId": 3899
          },
          {
            "areaName": "修文县",
            "areaId": 3900
          },
          {
            "areaName": "息烽县",
            "areaId": 3901
          },
          {
            "areaName": "乌当区",
            "areaId": 3902
          },
          {
            "areaName": "南明区",
            "areaId": 3903
          },
          {
            "areaName": "白云区",
            "areaId": 3904
          },
          {
            "areaName": "云岩区",
            "areaId": 3905
          },
          {
            "areaName": "花溪区",
            "areaId": 3906
          },
          {
            "areaName": "小河区",
            "areaId": 3907
          },
          {
            "areaName": "观山湖区",
            "areaId": 3908
          }
        ],
        "areaId": 366
      },
      {
        "areaName": "六盘水市",
        "childrenList": [{
            "areaName": "盘县",
            "areaId": 3909
          },
          {
            "areaName": "六枝特区",
            "areaId": 3910
          },
          {
            "areaName": "水城县",
            "areaId": 3911
          },
          {
            "areaName": "钟山区",
            "areaId": 3912
          }
        ],
        "areaId": 367
      },
      {
        "areaName": "遵义市",
        "childrenList": [{
            "areaName": "赤水市",
            "areaId": 3913
          },
          {
            "areaName": "仁怀市",
            "areaId": 3914
          },
          {
            "areaName": "遵义县",
            "areaId": 3915
          },
          {
            "areaName": "桐梓县",
            "areaId": 3916
          },
          {
            "areaName": "绥阳县",
            "areaId": 3917
          },
          {
            "areaName": "习水县",
            "areaId": 3918
          },
          {
            "areaName": "凤冈县",
            "areaId": 3919
          },
          {
            "areaName": "正安县",
            "areaId": 3920
          },
          {
            "areaName": "湄潭县",
            "areaId": 3921
          },
          {
            "areaName": "余庆县",
            "areaId": 3922
          },
          {
            "areaName": "道真县",
            "areaId": 3923
          },
          {
            "areaName": "务川县",
            "areaId": 3924
          },
          {
            "areaName": "红花岗区",
            "areaId": 3925
          },
          {
            "areaName": "汇川区",
            "areaId": 3926
          }
        ],
        "areaId": 368
      },
      {
        "areaName": "铜仁市",
        "childrenList": [{
            "areaName": "碧江区",
            "areaId": 3927
          },
          {
            "areaName": "德江县",
            "areaId": 3928
          },
          {
            "areaName": "江口县",
            "areaId": 3929
          },
          {
            "areaName": "思南县",
            "areaId": 3930
          },
          {
            "areaName": "万山区",
            "areaId": 3931
          },
          {
            "areaName": "石阡县",
            "areaId": 3932
          },
          {
            "areaName": "玉屏侗族自治县",
            "areaId": 3933
          },
          {
            "areaName": "松桃苗族自治县",
            "areaId": 3934
          },
          {
            "areaName": "印江土家族苗族自治县",
            "areaId": 3935
          },
          {
            "areaName": "沿河土家族自治县",
            "areaId": 3936
          }
        ],
        "areaId": 369
      },
      {
        "areaName": "毕节市",
        "childrenList": [{
            "areaName": "黔西县",
            "areaId": 3937
          },
          {
            "areaName": "大方县",
            "areaId": 3938
          },
          {
            "areaName": "织金县",
            "areaId": 3939
          },
          {
            "areaName": "金沙县",
            "areaId": 3940
          },
          {
            "areaName": "赫章县",
            "areaId": 3941
          },
          {
            "areaName": "纳雍县",
            "areaId": 3942
          },
          {
            "areaName": "威宁彝族回族苗族自治县",
            "areaId": 3943
          },
          {
            "areaName": "七星关区",
            "areaId": 3944
          }
        ],
        "areaId": 370
      },
      {
        "areaName": "安顺市",
        "childrenList": [{
            "areaName": "西秀区",
            "areaId": 3945
          },
          {
            "areaName": "普定县",
            "areaId": 3946
          },
          {
            "areaName": "平坝县",
            "areaId": 3947
          },
          {
            "areaName": "镇宁布依族苗族自治县",
            "areaId": 3948
          },
          {
            "areaName": "关岭布依族苗族自治县",
            "areaId": 3949
          },
          {
            "areaName": "紫云苗族布依族自治县",
            "areaId": 3950
          }
        ],
        "areaId": 371
      },
      {
        "areaName": "黔西南州",
        "childrenList": [{
            "areaName": "兴义市",
            "areaId": 3951
          },
          {
            "areaName": "望谟县",
            "areaId": 3952
          },
          {
            "areaName": "兴仁县",
            "areaId": 3953
          },
          {
            "areaName": "普安县",
            "areaId": 3954
          },
          {
            "areaName": "册亨县",
            "areaId": 3955
          },
          {
            "areaName": "晴隆县",
            "areaId": 3956
          },
          {
            "areaName": "贞丰县",
            "areaId": 3957
          },
          {
            "areaName": "安龙县",
            "areaId": 3958
          }
        ],
        "areaId": 372
      },
      {
        "areaName": "黔东南州",
        "childrenList": [{
            "areaName": "凯里市",
            "areaId": 3959
          },
          {
            "areaName": "施秉市",
            "areaId": 3960
          },
          {
            "areaName": "从江县",
            "areaId": 3961
          },
          {
            "areaName": "锦屏县",
            "areaId": 3962
          },
          {
            "areaName": "镇远县",
            "areaId": 3963
          },
          {
            "areaName": "麻江县",
            "areaId": 3964
          },
          {
            "areaName": "台江县",
            "areaId": 3965
          },
          {
            "areaName": "天柱县",
            "areaId": 3966
          },
          {
            "areaName": "黄平县",
            "areaId": 3967
          },
          {
            "areaName": "榕江县",
            "areaId": 3968
          },
          {
            "areaName": "剑河县",
            "areaId": 3969
          },
          {
            "areaName": "三穗县",
            "areaId": 3970
          },
          {
            "areaName": "雷山县",
            "areaId": 3971
          },
          {
            "areaName": "黎平县",
            "areaId": 3972
          },
          {
            "areaName": "岑巩县",
            "areaId": 3973
          },
          {
            "areaName": "丹寨县",
            "areaId": 3974
          }
        ],
        "areaId": 373
      },
      {
        "areaName": "黔南州",
        "childrenList": [{
            "areaName": "都匀市",
            "areaId": 3975
          },
          {
            "areaName": "福泉市",
            "areaId": 3976
          },
          {
            "areaName": "贵定县",
            "areaId": 3977
          },
          {
            "areaName": "惠水县",
            "areaId": 3978
          },
          {
            "areaName": "罗甸县",
            "areaId": 3979
          },
          {
            "areaName": "瓮安县",
            "areaId": 3980
          },
          {
            "areaName": "荔波县",
            "areaId": 3981
          },
          {
            "areaName": "龙里县",
            "areaId": 3982
          },
          {
            "areaName": "平塘县",
            "areaId": 3983
          },
          {
            "areaName": "长顺县",
            "areaId": 3984
          },
          {
            "areaName": "独山县",
            "areaId": 3985
          },
          {
            "areaName": "三都县",
            "areaId": 3986
          }
        ],
        "areaId": 374
      }
    ],
    "areaId": 24
  },
  {
    "areaName": "云南",
    "childrenList": [{
        "areaName": "昆明市",
        "childrenList": [{
            "areaName": "东川区",
            "areaId": 3987
          },
          {
            "areaName": "安宁市",
            "areaId": 3988
          },
          {
            "areaName": "富民县",
            "areaId": 3989
          },
          {
            "areaName": "嵩明县",
            "areaId": 3990
          },
          {
            "areaName": "晋宁县",
            "areaId": 3991
          },
          {
            "areaName": "宜良县",
            "areaId": 3992
          },
          {
            "areaName": "禄劝县",
            "areaId": 3993
          },
          {
            "areaName": "石林县",
            "areaId": 3994
          },
          {
            "areaName": "寻甸县",
            "areaId": 3995
          },
          {
            "areaName": "盘龙区",
            "areaId": 3996
          },
          {
            "areaName": "五华区",
            "areaId": 3997
          },
          {
            "areaName": "官渡区",
            "areaId": 3998
          },
          {
            "areaName": "西山区",
            "areaId": 3999
          },
          {
            "areaName": "呈贡区",
            "areaId": 4000
          }
        ],
        "areaId": 375
      },
      {
        "areaName": "曲靖市",
        "childrenList": [{
            "areaName": "马龙县",
            "areaId": 4001
          },
          {
            "areaName": "宣威市",
            "areaId": 4002
          },
          {
            "areaName": "富源县",
            "areaId": 4003
          },
          {
            "areaName": "会泽县",
            "areaId": 4004
          },
          {
            "areaName": "陆良县",
            "areaId": 4005
          },
          {
            "areaName": "师宗县",
            "areaId": 4006
          },
          {
            "areaName": "罗平县",
            "areaId": 4007
          },
          {
            "areaName": "沾益县",
            "areaId": 4008
          },
          {
            "areaName": "麒麟区",
            "areaId": 4009
          }
        ],
        "areaId": 376
      },
      {
        "areaName": "玉溪市",
        "childrenList": [{
            "areaName": "红塔区",
            "areaId": 4010
          },
          {
            "areaName": "华宁县",
            "areaId": 4011
          },
          {
            "areaName": "澄江县",
            "areaId": 4012
          },
          {
            "areaName": "易门县",
            "areaId": 4013
          },
          {
            "areaName": "通海县",
            "areaId": 4014
          },
          {
            "areaName": "江川县",
            "areaId": 4015
          },
          {
            "areaName": "元江县",
            "areaId": 4016
          },
          {
            "areaName": "新平县",
            "areaId": 4017
          },
          {
            "areaName": "峨山县",
            "areaId": 4018
          }
        ],
        "areaId": 377
      },
      {
        "areaName": "昭通市",
        "childrenList": [{
            "areaName": "昭阳区",
            "areaId": 4019
          },
          {
            "areaName": "镇雄县",
            "areaId": 4020
          },
          {
            "areaName": "永善县",
            "areaId": 4021
          },
          {
            "areaName": "大关县",
            "areaId": 4022
          },
          {
            "areaName": "盐津县",
            "areaId": 4023
          },
          {
            "areaName": "彝良县",
            "areaId": 4024
          },
          {
            "areaName": "水富县",
            "areaId": 4025
          },
          {
            "areaName": "巧家县",
            "areaId": 4026
          },
          {
            "areaName": "威信县",
            "areaId": 4027
          },
          {
            "areaName": "鲁甸县",
            "areaId": 4028
          },
          {
            "areaName": "绥江县",
            "areaId": 4029
          }
        ],
        "areaId": 378
      },
      {
        "areaName": "普洱市",
        "childrenList": [{
            "areaName": "思茅区",
            "areaId": 4030
          },
          {
            "areaName": "宁洱县",
            "areaId": 4031
          },
          {
            "areaName": "景东县",
            "areaId": 4032
          },
          {
            "areaName": "镇沅县",
            "areaId": 4033
          },
          {
            "areaName": "景谷县",
            "areaId": 4034
          },
          {
            "areaName": "墨江县",
            "areaId": 4035
          },
          {
            "areaName": "澜沧县",
            "areaId": 4036
          },
          {
            "areaName": "西盟县",
            "areaId": 4037
          },
          {
            "areaName": "江城县",
            "areaId": 4038
          },
          {
            "areaName": "孟连县",
            "areaId": 4039
          }
        ],
        "areaId": 379
      },
      {
        "areaName": "临沧市",
        "childrenList": [{
            "areaName": "临翔区",
            "areaId": 4040
          },
          {
            "areaName": "镇康县",
            "areaId": 4041
          },
          {
            "areaName": "凤庆县",
            "areaId": 4042
          },
          {
            "areaName": "云县",
            "areaId": 4043
          },
          {
            "areaName": "永德县",
            "areaId": 4044
          },
          {
            "areaName": "耿马县",
            "areaId": 4045
          },
          {
            "areaName": "双江县",
            "areaId": 4046
          },
          {
            "areaName": "沧源县",
            "areaId": 4047
          }
        ],
        "areaId": 380
      },
      {
        "areaName": "保山市",
        "childrenList": [{
            "areaName": "隆阳区",
            "areaId": 4048
          },
          {
            "areaName": "施甸县",
            "areaId": 4049
          },
          {
            "areaName": "昌宁县",
            "areaId": 4050
          },
          {
            "areaName": "龙陵县",
            "areaId": 4051
          },
          {
            "areaName": "腾冲县",
            "areaId": 4052
          }
        ],
        "areaId": 381
      },
      {
        "areaName": "丽江市",
        "childrenList": [{
            "areaName": "玉龙县",
            "areaId": 4053
          },
          {
            "areaName": "华坪县",
            "areaId": 4054
          },
          {
            "areaName": "永胜县",
            "areaId": 4055
          },
          {
            "areaName": "宁蒗县",
            "areaId": 4056
          },
          {
            "areaName": "古城区",
            "areaId": 4057
          }
        ],
        "areaId": 382
      },
      {
        "areaName": "文山州",
        "childrenList": [{
            "areaName": "文山市",
            "areaId": 4058
          },
          {
            "areaName": "麻栗坡县",
            "areaId": 4059
          },
          {
            "areaName": "砚山县",
            "areaId": 4060
          },
          {
            "areaName": "广南县",
            "areaId": 4061
          },
          {
            "areaName": "马关县",
            "areaId": 4062
          },
          {
            "areaName": "富宁县",
            "areaId": 4063
          },
          {
            "areaName": "西畴县",
            "areaId": 4064
          },
          {
            "areaName": "丘北县",
            "areaId": 4065
          }
        ],
        "areaId": 383
      },
      {
        "areaName": "红河州",
        "childrenList": [{
            "areaName": "个旧市",
            "areaId": 4066
          },
          {
            "areaName": "开远市",
            "areaId": 4067
          },
          {
            "areaName": "弥勒县",
            "areaId": 4068
          },
          {
            "areaName": "红河县",
            "areaId": 4069
          },
          {
            "areaName": "绿春县",
            "areaId": 4070
          },
          {
            "areaName": "蒙自市",
            "areaId": 4071
          },
          {
            "areaName": "泸西县",
            "areaId": 4072
          },
          {
            "areaName": "建水县",
            "areaId": 4073
          },
          {
            "areaName": "元阳县",
            "areaId": 4074
          },
          {
            "areaName": "石屏县",
            "areaId": 4075
          },
          {
            "areaName": "金平县",
            "areaId": 4076
          },
          {
            "areaName": "屏边县",
            "areaId": 4077
          },
          {
            "areaName": "河口县",
            "areaId": 4078
          }
        ],
        "areaId": 384
      },
      {
        "areaName": "西双版纳州",
        "childrenList": [{
            "areaName": "景洪市",
            "areaId": 4079
          },
          {
            "areaName": "勐海县",
            "areaId": 4080
          },
          {
            "areaName": "勐腊县",
            "areaId": 4081
          }
        ],
        "areaId": 385
      },
      {
        "areaName": "楚雄州",
        "childrenList": [{
            "areaName": "元谋县",
            "areaId": 4082
          },
          {
            "areaName": "南华县",
            "areaId": 4083
          },
          {
            "areaName": "牟定县",
            "areaId": 4084
          },
          {
            "areaName": "武定县",
            "areaId": 4085
          },
          {
            "areaName": "大姚县",
            "areaId": 4086
          },
          {
            "areaName": "双柏县",
            "areaId": 4087
          },
          {
            "areaName": "禄丰县",
            "areaId": 4088
          },
          {
            "areaName": "永仁县",
            "areaId": 4089
          },
          {
            "areaName": "姚安县",
            "areaId": 4090
          },
          {
            "areaName": "楚雄市",
            "areaId": 4091
          }
        ],
        "areaId": 386
      },
      {
        "areaName": "大理州",
        "childrenList": [{
            "areaName": "剑川县",
            "areaId": 4092
          },
          {
            "areaName": "弥渡县",
            "areaId": 4093
          },
          {
            "areaName": "云龙县",
            "areaId": 4094
          },
          {
            "areaName": "洱源县",
            "areaId": 4095
          },
          {
            "areaName": "鹤庆县",
            "areaId": 4096
          },
          {
            "areaName": "宾川县",
            "areaId": 4097
          },
          {
            "areaName": "祥云县",
            "areaId": 4098
          },
          {
            "areaName": "永平县",
            "areaId": 4099
          },
          {
            "areaName": "巍山县",
            "areaId": 4100
          },
          {
            "areaName": "漾濞县",
            "areaId": 4101
          },
          {
            "areaName": "南涧县",
            "areaId": 4102
          },
          {
            "areaName": "大理市",
            "areaId": 4103
          }
        ],
        "areaId": 387
      },
      {
        "areaName": "德宏州",
        "childrenList": [{
            "areaName": "芒市",
            "areaId": 4104
          },
          {
            "areaName": "瑞丽市",
            "areaId": 4105
          },
          {
            "areaName": "盈江县",
            "areaId": 4106
          },
          {
            "areaName": "梁河县",
            "areaId": 4107
          },
          {
            "areaName": "陇川县",
            "areaId": 4108
          }
        ],
        "areaId": 388
      },
      {
        "areaName": "怒江州",
        "childrenList": [{
            "areaName": "泸水县",
            "areaId": 4109
          },
          {
            "areaName": "福贡县",
            "areaId": 4110
          },
          {
            "areaName": "兰坪县",
            "areaId": 4111
          },
          {
            "areaName": "贡山县",
            "areaId": 4112
          }
        ],
        "areaId": 389
      },
      {
        "areaName": "迪庆州",
        "childrenList": [{
            "areaName": "香格里拉县",
            "areaId": 4113
          },
          {
            "areaName": "德钦县",
            "areaId": 4114
          },
          {
            "areaName": "维西县",
            "areaId": 4115
          }
        ],
        "areaId": 390
      }
    ],
    "areaId": 25
  },
  {
    "areaName": "西藏",
    "childrenList": [{
        "areaName": "拉萨市",
        "childrenList": [{
            "areaName": "城关区",
            "areaId": 4116
          },
          {
            "areaName": "林周县",
            "areaId": 4117
          },
          {
            "areaName": "当雄县",
            "areaId": 4118
          },
          {
            "areaName": "尼木县",
            "areaId": 4119
          },
          {
            "areaName": "曲水县",
            "areaId": 4120
          },
          {
            "areaName": "堆龙德庆县",
            "areaId": 4121
          },
          {
            "areaName": "达孜县",
            "areaId": 4122
          },
          {
            "areaName": "墨竹工卡县",
            "areaId": 4123
          }
        ],
        "areaId": 391
      },
      {
        "areaName": "那曲地区",
        "childrenList": [{
            "areaName": "索县",
            "areaId": 4124
          },
          {
            "areaName": "那曲县",
            "areaId": 4125
          },
          {
            "areaName": "嘉黎县",
            "areaId": 4126
          },
          {
            "areaName": "比如县",
            "areaId": 4127
          },
          {
            "areaName": "聂荣县",
            "areaId": 4128
          },
          {
            "areaName": "安多县",
            "areaId": 4129
          },
          {
            "areaName": "申扎县",
            "areaId": 4130
          },
          {
            "areaName": "班戈县",
            "areaId": 4131
          },
          {
            "areaName": "巴青县",
            "areaId": 4132
          },
          {
            "areaName": "尼玛县",
            "areaId": 4133
          }
        ],
        "areaId": 392
      },
      {
        "areaName": "山南地区",
        "childrenList": [{
            "areaName": "贡嘎县",
            "areaId": 4134
          },
          {
            "areaName": "扎囊县",
            "areaId": 4135
          },
          {
            "areaName": "乃东县",
            "areaId": 4136
          },
          {
            "areaName": "桑日县",
            "areaId": 4137
          },
          {
            "areaName": "琼结县",
            "areaId": 4138
          },
          {
            "areaName": "曲松县",
            "areaId": 4139
          },
          {
            "areaName": "措美县",
            "areaId": 4140
          },
          {
            "areaName": "洛扎县",
            "areaId": 4141
          },
          {
            "areaName": "加查县",
            "areaId": 4142
          },
          {
            "areaName": "隆子县",
            "areaId": 4143
          },
          {
            "areaName": "错那县",
            "areaId": 4144
          },
          {
            "areaName": "浪卡子县",
            "areaId": 4145
          }
        ],
        "areaId": 393
      },
      {
        "areaName": "昌都地区",
        "childrenList": [{
            "areaName": "昌都县",
            "areaId": 4146
          },
          {
            "areaName": "江达县",
            "areaId": 4147
          },
          {
            "areaName": "贡觉县",
            "areaId": 4148
          },
          {
            "areaName": "类乌齐县",
            "areaId": 4149
          },
          {
            "areaName": "丁青县",
            "areaId": 4150
          },
          {
            "areaName": "察雅县",
            "areaId": 4151
          },
          {
            "areaName": "八宿县",
            "areaId": 4152
          },
          {
            "areaName": "左贡县",
            "areaId": 4153
          },
          {
            "areaName": "芒康县",
            "areaId": 4154
          },
          {
            "areaName": "洛隆县",
            "areaId": 4155
          },
          {
            "areaName": "边坝县",
            "areaId": 4156
          }
        ],
        "areaId": 394
      },
      {
        "areaName": "日喀则地区",
        "childrenList": [{
            "areaName": "聂拉木县",
            "areaId": 4157
          },
          {
            "areaName": "昂仁县",
            "areaId": 4158
          },
          {
            "areaName": "日喀则市",
            "areaId": 4159
          },
          {
            "areaName": "南木林县",
            "areaId": 4160
          },
          {
            "areaName": "江孜县",
            "areaId": 4161
          },
          {
            "areaName": "定日县",
            "areaId": 4162
          },
          {
            "areaName": "萨迦县　",
            "areaId": 4163
          },
          {
            "areaName": "拉孜县",
            "areaId": 4164
          },
          {
            "areaName": "谢通门县",
            "areaId": 4165
          },
          {
            "areaName": "白朗县",
            "areaId": 4166
          },
          {
            "areaName": "仁布县",
            "areaId": 4167
          },
          {
            "areaName": "康马县",
            "areaId": 4168
          },
          {
            "areaName": "定结县",
            "areaId": 4169
          },
          {
            "areaName": "仲巴县",
            "areaId": 4170
          },
          {
            "areaName": "亚东县",
            "areaId": 4171
          },
          {
            "areaName": "吉隆县",
            "areaId": 4172
          },
          {
            "areaName": "萨嘎县",
            "areaId": 4173
          },
          {
            "areaName": "岗巴县",
            "areaId": 4174
          }
        ],
        "areaId": 395
      },
      {
        "areaName": "阿里地区",
        "childrenList": [{
            "areaName": "噶尔县",
            "areaId": 4175
          },
          {
            "areaName": "普兰县",
            "areaId": 4176
          },
          {
            "areaName": "札达县　",
            "areaId": 4177
          },
          {
            "areaName": "日土县",
            "areaId": 4178
          },
          {
            "areaName": "革吉县",
            "areaId": 4179
          },
          {
            "areaName": "改则县",
            "areaId": 4180
          },
          {
            "areaName": "措勤县",
            "areaId": 4181
          }
        ],
        "areaId": 396
      },
      {
        "areaName": "林芝地区",
        "childrenList": [{
            "areaName": "林芝县",
            "areaId": 4182
          },
          {
            "areaName": "工布江达县",
            "areaId": 4183
          },
          {
            "areaName": "米林县",
            "areaId": 4184
          },
          {
            "areaName": "墨脱县",
            "areaId": 4185
          },
          {
            "areaName": "波密县",
            "areaId": 4186
          },
          {
            "areaName": "察隅县",
            "areaId": 4187
          },
          {
            "areaName": "朗县",
            "areaId": 4188
          }
        ],
        "areaId": 397
      }
    ],
    "areaId": 26
  },
  {
    "areaName": "陕西",
    "childrenList": [{
        "areaName": "西安市",
        "childrenList": [{
            "areaName": "高陵县",
            "areaId": 4189
          },
          {
            "areaName": "蓝田县",
            "areaId": 4190
          },
          {
            "areaName": "户县",
            "areaId": 4191
          },
          {
            "areaName": "周至县",
            "areaId": 4192
          },
          {
            "areaName": "雁塔区",
            "areaId": 4193
          },
          {
            "areaName": "未央区",
            "areaId": 4194
          },
          {
            "areaName": "长安区",
            "areaId": 4195
          },
          {
            "areaName": "灞桥区",
            "areaId": 4196
          },
          {
            "areaName": "碑林区",
            "areaId": 4197
          },
          {
            "areaName": "莲湖区",
            "areaId": 4198
          },
          {
            "areaName": "临潼区",
            "areaId": 4199
          },
          {
            "areaName": "阎良区",
            "areaId": 4200
          },
          {
            "areaName": "杨凌农业示范区",
            "areaId": 4201
          },
          {
            "areaName": "新城区",
            "areaId": 4202
          }
        ],
        "areaId": 398
      },
      {
        "areaName": "铜川市",
        "childrenList": [{
            "areaName": "印台区",
            "areaId": 4203
          },
          {
            "areaName": "宜君县",
            "areaId": 4204
          },
          {
            "areaName": "王益区",
            "areaId": 4205
          },
          {
            "areaName": "耀州区",
            "areaId": 4206
          }
        ],
        "areaId": 399
      },
      {
        "areaName": "宝鸡市",
        "childrenList": [{
            "areaName": "岐山县",
            "areaId": 4207
          },
          {
            "areaName": "太白县",
            "areaId": 4208
          },
          {
            "areaName": "凤翔县",
            "areaId": 4209
          },
          {
            "areaName": "陇县",
            "areaId": 4210
          },
          {
            "areaName": "麟游县",
            "areaId": 4211
          },
          {
            "areaName": "千阳县",
            "areaId": 4212
          },
          {
            "areaName": "扶风县",
            "areaId": 4213
          },
          {
            "areaName": "凤县",
            "areaId": 4214
          },
          {
            "areaName": "眉县",
            "areaId": 4215
          },
          {
            "areaName": "渭滨区",
            "areaId": 4216
          },
          {
            "areaName": "金台区",
            "areaId": 4217
          },
          {
            "areaName": "陈仓区",
            "areaId": 4218
          }
        ],
        "areaId": 400
      },
      {
        "areaName": "咸阳市",
        "childrenList": [{
            "areaName": "兴平市",
            "areaId": 4219
          },
          {
            "areaName": "礼泉县",
            "areaId": 4220
          },
          {
            "areaName": "泾阳县",
            "areaId": 4221
          },
          {
            "areaName": "永寿县",
            "areaId": 4222
          },
          {
            "areaName": "三原县",
            "areaId": 4223
          },
          {
            "areaName": "彬县",
            "areaId": 4224
          },
          {
            "areaName": "旬邑县",
            "areaId": 4225
          },
          {
            "areaName": "长武县",
            "areaId": 4226
          },
          {
            "areaName": "乾县",
            "areaId": 4227
          },
          {
            "areaName": "武功县",
            "areaId": 4228
          },
          {
            "areaName": "淳化县",
            "areaId": 4229
          },
          {
            "areaName": "秦都区",
            "areaId": 4230
          },
          {
            "areaName": "渭城区",
            "areaId": 4231
          },
          {
            "areaName": "杨陵区",
            "areaId": 4232
          }
        ],
        "areaId": 401
      },
      {
        "areaName": "渭南市",
        "childrenList": [{
            "areaName": "韩城市",
            "areaId": 4233
          },
          {
            "areaName": "华阴市",
            "areaId": 4234
          },
          {
            "areaName": "蒲城县",
            "areaId": 4235
          },
          {
            "areaName": "华县",
            "areaId": 4236
          },
          {
            "areaName": "潼关县",
            "areaId": 4237
          },
          {
            "areaName": "大荔县",
            "areaId": 4238
          },
          {
            "areaName": "澄城县",
            "areaId": 4239
          },
          {
            "areaName": "合阳县",
            "areaId": 4240
          },
          {
            "areaName": "白水县",
            "areaId": 4241
          },
          {
            "areaName": "富平县",
            "areaId": 4242
          },
          {
            "areaName": "临渭区",
            "areaId": 4243
          }
        ],
        "areaId": 402
      },
      {
        "areaName": "延安市",
        "childrenList": [{
            "areaName": "安塞县",
            "areaId": 4244
          },
          {
            "areaName": "洛川县",
            "areaId": 4245
          },
          {
            "areaName": "子长县",
            "areaId": 4246
          },
          {
            "areaName": "黄陵县",
            "areaId": 4247
          },
          {
            "areaName": "延长县",
            "areaId": 4248
          },
          {
            "areaName": "宜川县",
            "areaId": 4249
          },
          {
            "areaName": "延川县",
            "areaId": 4250
          },
          {
            "areaName": "甘泉县",
            "areaId": 4251
          },
          {
            "areaName": "富县",
            "areaId": 4252
          },
          {
            "areaName": "志丹县",
            "areaId": 4253
          },
          {
            "areaName": "黄龙县",
            "areaId": 4254
          },
          {
            "areaName": "吴起县",
            "areaId": 4255
          },
          {
            "areaName": "宝塔区",
            "areaId": 4256
          }
        ],
        "areaId": 403
      },
      {
        "areaName": "汉中市",
        "childrenList": [{
            "areaName": "南郑县",
            "areaId": 4257
          },
          {
            "areaName": "城固县",
            "areaId": 4258
          },
          {
            "areaName": "洋县",
            "areaId": 4259
          },
          {
            "areaName": "佛坪县",
            "areaId": 4260
          },
          {
            "areaName": "留坝县",
            "areaId": 4261
          },
          {
            "areaName": "镇巴县",
            "areaId": 4262
          },
          {
            "areaName": "西乡县",
            "areaId": 4263
          },
          {
            "areaName": "勉县",
            "areaId": 4264
          },
          {
            "areaName": "略阳县",
            "areaId": 4265
          },
          {
            "areaName": "宁强县",
            "areaId": 4266
          },
          {
            "areaName": "汉台区",
            "areaId": 4267
          }
        ],
        "areaId": 404
      },
      {
        "areaName": "榆林市",
        "childrenList": [{
            "areaName": "清涧县",
            "areaId": 4268
          },
          {
            "areaName": "绥德县",
            "areaId": 4269
          },
          {
            "areaName": "佳县",
            "areaId": 4270
          },
          {
            "areaName": "神木县",
            "areaId": 4271
          },
          {
            "areaName": "府谷县",
            "areaId": 4272
          },
          {
            "areaName": "子洲县",
            "areaId": 4273
          },
          {
            "areaName": "横山县",
            "areaId": 4274
          },
          {
            "areaName": "米脂县",
            "areaId": 4275
          },
          {
            "areaName": "吴堡县",
            "areaId": 4276
          },
          {
            "areaName": "定边县",
            "areaId": 4277
          },
          {
            "areaName": "靖边县",
            "areaId": 4278
          },
          {
            "areaName": "榆阳区",
            "areaId": 4279
          }
        ],
        "areaId": 405
      },
      {
        "areaName": "商洛市",
        "childrenList": [{
            "areaName": "商州区",
            "areaId": 4280
          },
          {
            "areaName": "镇安县",
            "areaId": 4281
          },
          {
            "areaName": "山阳县",
            "areaId": 4282
          },
          {
            "areaName": "洛南县",
            "areaId": 4283
          },
          {
            "areaName": "商南县",
            "areaId": 4284
          },
          {
            "areaName": "丹凤县",
            "areaId": 4285
          },
          {
            "areaName": "柞水县",
            "areaId": 4286
          }
        ],
        "areaId": 406
      },
      {
        "areaName": "安康市",
        "childrenList": [{
            "areaName": "紫阳县",
            "areaId": 4287
          },
          {
            "areaName": "岚皋县",
            "areaId": 4288
          },
          {
            "areaName": "旬阳县",
            "areaId": 4289
          },
          {
            "areaName": "镇坪县",
            "areaId": 4290
          },
          {
            "areaName": "平利县",
            "areaId": 4291
          },
          {
            "areaName": "宁陕县",
            "areaId": 4292
          },
          {
            "areaName": "汉阴县",
            "areaId": 4293
          },
          {
            "areaName": "石泉县",
            "areaId": 4294
          },
          {
            "areaName": "白河县",
            "areaId": 4295
          },
          {
            "areaName": "汉滨区",
            "areaId": 4296
          }
        ],
        "areaId": 407
      }
    ],
    "areaId": 27
  },
  {
    "areaName": "甘肃",
    "childrenList": [{
        "areaName": "兰州市",
        "childrenList": [{
            "areaName": "永登县",
            "areaId": 4297
          },
          {
            "areaName": "榆中县",
            "areaId": 4298
          },
          {
            "areaName": "皋兰县",
            "areaId": 4299
          },
          {
            "areaName": "西固区",
            "areaId": 4300
          },
          {
            "areaName": "红古区",
            "areaId": 4301
          },
          {
            "areaName": "七里河区",
            "areaId": 4302
          },
          {
            "areaName": "安宁区",
            "areaId": 4303
          },
          {
            "areaName": "城关区",
            "areaId": 4304
          }
        ],
        "areaId": 408
      },
      {
        "areaName": "金昌市",
        "childrenList": [{
            "areaName": "永昌县",
            "areaId": 4305
          },
          {
            "areaName": "金川区",
            "areaId": 4306
          }
        ],
        "areaId": 409
      },
      {
        "areaName": "白银市",
        "childrenList": [{
            "areaName": "白银区",
            "areaId": 4307
          },
          {
            "areaName": "平川区",
            "areaId": 4308
          },
          {
            "areaName": "靖远县",
            "areaId": 4309
          },
          {
            "areaName": "景泰县",
            "areaId": 4310
          },
          {
            "areaName": "会宁县",
            "areaId": 4311
          }
        ],
        "areaId": 410
      },
      {
        "areaName": "天水市",
        "childrenList": [{
            "areaName": "甘谷县",
            "areaId": 4312
          },
          {
            "areaName": "武山县",
            "areaId": 4313
          },
          {
            "areaName": "清水县",
            "areaId": 4314
          },
          {
            "areaName": "秦安县",
            "areaId": 4315
          },
          {
            "areaName": "张家川县",
            "areaId": 4316
          },
          {
            "areaName": "麦积区",
            "areaId": 4317
          },
          {
            "areaName": "秦州区",
            "areaId": 4318
          }
        ],
        "areaId": 411
      },
      {
        "areaName": "嘉峪关市",
        "childrenList": [{
            "areaName": "雄关区",
            "areaId": 4319
          },
          {
            "areaName": "长城区",
            "areaId": 4320
          },
          {
            "areaName": "镜铁区",
            "areaId": 4321
          }
        ],
        "areaId": 412
      },
      {
        "areaName": "平凉市",
        "childrenList": [{
            "areaName": "华亭县",
            "areaId": 4322
          },
          {
            "areaName": "崇信县",
            "areaId": 4323
          },
          {
            "areaName": "泾川县",
            "areaId": 4324
          },
          {
            "areaName": "灵台县",
            "areaId": 4325
          },
          {
            "areaName": "镇原县",
            "areaId": 4326
          },
          {
            "areaName": "庄浪县",
            "areaId": 4327
          },
          {
            "areaName": "崆峒区",
            "areaId": 4328
          },
          {
            "areaName": "静宁县",
            "areaId": 4329
          }
        ],
        "areaId": 413
      },
      {
        "areaName": "庆阳市",
        "childrenList": [{
            "areaName": "西峰区",
            "areaId": 4330
          },
          {
            "areaName": "镇原县",
            "areaId": 4331
          },
          {
            "areaName": "合水县",
            "areaId": 4332
          },
          {
            "areaName": "华池县",
            "areaId": 4333
          },
          {
            "areaName": "环县",
            "areaId": 4334
          },
          {
            "areaName": "宁县",
            "areaId": 4335
          },
          {
            "areaName": "正宁县",
            "areaId": 4336
          },
          {
            "areaName": "庆城县",
            "areaId": 4337
          }
        ],
        "areaId": 414
      },
      {
        "areaName": "陇南市",
        "childrenList": [{
            "areaName": "成县",
            "areaId": 4338
          },
          {
            "areaName": "礼县",
            "areaId": 4339
          },
          {
            "areaName": "康县",
            "areaId": 4340
          },
          {
            "areaName": "武都区",
            "areaId": 4341
          },
          {
            "areaName": "文县",
            "areaId": 4342
          },
          {
            "areaName": "两当县",
            "areaId": 4343
          },
          {
            "areaName": "徽县",
            "areaId": 4344
          },
          {
            "areaName": "宕昌县",
            "areaId": 4345
          },
          {
            "areaName": "西和县",
            "areaId": 4346
          }
        ],
        "areaId": 415
      },
      {
        "areaName": "武威市",
        "childrenList": [{
            "areaName": "凉州区",
            "areaId": 4347
          },
          {
            "areaName": "古浪县",
            "areaId": 4348
          },
          {
            "areaName": "天祝县",
            "areaId": 4349
          },
          {
            "areaName": "民勤县",
            "areaId": 4350
          }
        ],
        "areaId": 416
      },
      {
        "areaName": "张掖市",
        "childrenList": [{
            "areaName": "甘州区",
            "areaId": 4351
          },
          {
            "areaName": "山丹县",
            "areaId": 4352
          },
          {
            "areaName": "临泽县",
            "areaId": 4353
          },
          {
            "areaName": "高台县",
            "areaId": 4354
          },
          {
            "areaName": "肃南县",
            "areaId": 4355
          },
          {
            "areaName": "民乐县",
            "areaId": 4356
          }
        ],
        "areaId": 417
      },
      {
        "areaName": "酒泉市",
        "childrenList": [{
            "areaName": "玉门市",
            "areaId": 4357
          },
          {
            "areaName": "敦煌市",
            "areaId": 4358
          },
          {
            "areaName": "金塔县",
            "areaId": 4359
          },
          {
            "areaName": "阿克塞县",
            "areaId": 4360
          },
          {
            "areaName": "肃北县",
            "areaId": 4361
          },
          {
            "areaName": "瓜州县",
            "areaId": 4362
          },
          {
            "areaName": "肃州区",
            "areaId": 4363
          }
        ],
        "areaId": 418
      },
      {
        "areaName": "甘南州",
        "childrenList": [{
            "areaName": "合作市",
            "areaId": 4364
          },
          {
            "areaName": "夏河县",
            "areaId": 4365
          },
          {
            "areaName": "碌曲县",
            "areaId": 4366
          },
          {
            "areaName": "舟曲县",
            "areaId": 4367
          },
          {
            "areaName": "玛曲县",
            "areaId": 4368
          },
          {
            "areaName": "迭部县",
            "areaId": 4369
          },
          {
            "areaName": "临潭县",
            "areaId": 4370
          },
          {
            "areaName": "卓尼县",
            "areaId": 4371
          }
        ],
        "areaId": 419
      },
      {
        "areaName": "临夏州",
        "childrenList": [{
            "areaName": "临夏县",
            "areaId": 4372
          },
          {
            "areaName": "康乐县",
            "areaId": 4373
          },
          {
            "areaName": "永靖县",
            "areaId": 4374
          },
          {
            "areaName": "和政县",
            "areaId": 4375
          },
          {
            "areaName": "东乡族自治县",
            "areaId": 4376
          },
          {
            "areaName": "积石山县",
            "areaId": 4377
          },
          {
            "areaName": "临夏市",
            "areaId": 4378
          },
          {
            "areaName": "广河县",
            "areaId": 4379
          }
        ],
        "areaId": 420
      },
      {
        "areaName": "定西市",
        "childrenList": [{
            "areaName": "岷县",
            "areaId": 4380
          },
          {
            "areaName": "安定区",
            "areaId": 4381
          },
          {
            "areaName": "通渭县",
            "areaId": 4382
          },
          {
            "areaName": "临洮县",
            "areaId": 4383
          },
          {
            "areaName": "漳县",
            "areaId": 4384
          },
          {
            "areaName": "渭源县",
            "areaId": 4385
          },
          {
            "areaName": "陇西县",
            "areaId": 4386
          }
        ],
        "areaId": 421
      }
    ],
    "areaId": 28
  },
  {
    "areaName": "青海",
    "childrenList": [{
        "areaName": "西宁市",
        "childrenList": [{
            "areaName": "湟中县",
            "areaId": 4387
          },
          {
            "areaName": "湟源县",
            "areaId": 4388
          },
          {
            "areaName": "大通县",
            "areaId": 4389
          },
          {
            "areaName": "城中区",
            "areaId": 4390
          },
          {
            "areaName": "城东区",
            "areaId": 4391
          },
          {
            "areaName": "城西区",
            "areaId": 4392
          },
          {
            "areaName": "城北区",
            "areaId": 4393
          }
        ],
        "areaId": 422
      },
      {
        "areaName": "海东地区",
        "childrenList": [{
            "areaName": "平安县",
            "areaId": 4394
          },
          {
            "areaName": "乐都县",
            "areaId": 4395
          },
          {
            "areaName": "民和县",
            "areaId": 4396
          },
          {
            "areaName": "互助县",
            "areaId": 4397
          },
          {
            "areaName": "化隆县",
            "areaId": 4398
          },
          {
            "areaName": "循化县",
            "areaId": 4399
          }
        ],
        "areaId": 423
      },
      {
        "areaName": "海北州",
        "childrenList": [{
            "areaName": "海晏县",
            "areaId": 4400
          },
          {
            "areaName": "祁连县",
            "areaId": 4401
          },
          {
            "areaName": "刚察县",
            "areaId": 4402
          },
          {
            "areaName": "门源县",
            "areaId": 4403
          }
        ],
        "areaId": 424
      },
      {
        "areaName": "黄南州",
        "childrenList": [{
            "areaName": "尖扎县",
            "areaId": 4404
          },
          {
            "areaName": "同仁县",
            "areaId": 4405
          },
          {
            "areaName": "泽库县",
            "areaId": 4406
          },
          {
            "areaName": "河南县",
            "areaId": 4407
          }
        ],
        "areaId": 425
      },
      {
        "areaName": "海南州",
        "childrenList": [{
            "areaName": "共和县",
            "areaId": 4408
          },
          {
            "areaName": "同德县",
            "areaId": 4409
          },
          {
            "areaName": "贵德县",
            "areaId": 4410
          },
          {
            "areaName": "兴海县",
            "areaId": 4411
          },
          {
            "areaName": "贵南县",
            "areaId": 4412
          }
        ],
        "areaId": 426
      },
      {
        "areaName": "果洛州",
        "childrenList": [{
            "areaName": "玛沁县",
            "areaId": 4413
          },
          {
            "areaName": "甘德县",
            "areaId": 4414
          },
          {
            "areaName": "达日县",
            "areaId": 4415
          },
          {
            "areaName": "班玛县",
            "areaId": 4416
          },
          {
            "areaName": "久治县",
            "areaId": 4417
          },
          {
            "areaName": "玛多县",
            "areaId": 4418
          }
        ],
        "areaId": 427
      },
      {
        "areaName": "玉树州",
        "childrenList": [{
            "areaName": "玉树县",
            "areaId": 4419
          },
          {
            "areaName": "称多县",
            "areaId": 4420
          },
          {
            "areaName": "囊谦县",
            "areaId": 4421
          },
          {
            "areaName": "杂多县",
            "areaId": 4422
          },
          {
            "areaName": "治多县",
            "areaId": 4423
          },
          {
            "areaName": "曲麻莱县",
            "areaId": 4424
          }
        ],
        "areaId": 428
      },
      {
        "areaName": "海西州",
        "childrenList": [{
            "areaName": "德令哈市",
            "areaId": 4425
          },
          {
            "areaName": "乌兰县",
            "areaId": 4426
          },
          {
            "areaName": "天峻县",
            "areaId": 4427
          },
          {
            "areaName": "都兰县",
            "areaId": 4428
          },
          {
            "areaName": "大柴旦行委",
            "areaId": 4429
          },
          {
            "areaName": "冷湖行委",
            "areaId": 4430
          },
          {
            "areaName": "茫崖行委",
            "areaId": 4431
          },
          {
            "areaName": "格尔木市",
            "areaId": 4432
          }
        ],
        "areaId": 429
      }
    ],
    "areaId": 29
  },
  {
    "areaName": "宁夏",
    "childrenList": [{
        "areaName": "银川市",
        "childrenList": [{
            "areaName": "灵武市",
            "areaId": 4433
          },
          {
            "areaName": "永宁县",
            "areaId": 4434
          },
          {
            "areaName": "贺兰县",
            "areaId": 4435
          },
          {
            "areaName": "兴庆区",
            "areaId": 4436
          },
          {
            "areaName": "金凤区",
            "areaId": 4437
          },
          {
            "areaName": "西夏区",
            "areaId": 4438
          }
        ],
        "areaId": 430
      },
      {
        "areaName": "石嘴山市",
        "childrenList": [{
            "areaName": "平罗县",
            "areaId": 4439
          },
          {
            "areaName": "惠农区",
            "areaId": 4440
          },
          {
            "areaName": "大武口区",
            "areaId": 4441
          }
        ],
        "areaId": 431
      },
      {
        "areaName": "吴忠市",
        "childrenList": [{
            "areaName": "青铜峡市",
            "areaId": 4442
          },
          {
            "areaName": "同心县",
            "areaId": 4443
          },
          {
            "areaName": "盐池县",
            "areaId": 4444
          },
          {
            "areaName": "红寺堡开发区",
            "areaId": 4445
          },
          {
            "areaName": "利通区",
            "areaId": 4446
          }
        ],
        "areaId": 432
      },
      {
        "areaName": "固原市",
        "childrenList": [{
            "areaName": "西吉县",
            "areaId": 4447
          },
          {
            "areaName": "隆德县",
            "areaId": 4448
          },
          {
            "areaName": "泾源县",
            "areaId": 4449
          },
          {
            "areaName": "彭阳县",
            "areaId": 4450
          },
          {
            "areaName": "原州区",
            "areaId": 4451
          }
        ],
        "areaId": 433
      },
      {
        "areaName": "中卫市",
        "childrenList": [{
            "areaName": "中宁县",
            "areaId": 4452
          },
          {
            "areaName": "海原县",
            "areaId": 4453
          },
          {
            "areaName": "沙坡头区",
            "areaId": 4454
          }
        ],
        "areaId": 434
      }
    ],
    "areaId": 30
  },
  {
    "areaName": "新疆",
    "childrenList": [{
        "areaName": "乌鲁木齐市",
        "childrenList": [{
            "areaName": "乌鲁木齐县",
            "areaId": 4455
          },
          {
            "areaName": "头屯河区",
            "areaId": 4456
          },
          {
            "areaName": "达坂城区",
            "areaId": 4457
          },
          {
            "areaName": "米东区",
            "areaId": 4458
          },
          {
            "areaName": "天山区",
            "areaId": 4459
          },
          {
            "areaName": "新市区",
            "areaId": 4460
          },
          {
            "areaName": "沙依巴克区",
            "areaId": 4461
          },
          {
            "areaName": "水磨沟区",
            "areaId": 4462
          }
        ],
        "areaId": 435
      },
      {
        "areaName": "克拉玛依市",
        "childrenList": [{
            "areaName": "克拉玛依区",
            "areaId": 4463
          },
          {
            "areaName": "独山子区",
            "areaId": 4464
          },
          {
            "areaName": "白碱滩区",
            "areaId": 4465
          },
          {
            "areaName": "乌尔禾区",
            "areaId": 4466
          }
        ],
        "areaId": 436
      },
      {
        "areaName": "石河子市",
        "childrenList": [{
          "areaName": "石河子市",
          "areaId": 4467
        }],
        "areaId": 437
      },
      {
        "areaName": "吐鲁番地区",
        "childrenList": [{
            "areaName": "吐鲁番市",
            "areaId": 4468
          },
          {
            "areaName": "托克逊县",
            "areaId": 4469
          },
          {
            "areaName": "鄯善县",
            "areaId": 4470
          }
        ],
        "areaId": 438
      },
      {
        "areaName": "哈密地区",
        "childrenList": [{
            "areaName": "哈密市",
            "areaId": 4471
          },
          {
            "areaName": "巴里坤县",
            "areaId": 4472
          },
          {
            "areaName": "伊吾县",
            "areaId": 4473
          }
        ],
        "areaId": 439
      },
      {
        "areaName": "和田地区",
        "childrenList": [{
            "areaName": "和田市",
            "areaId": 4474
          },
          {
            "areaName": "墨玉县",
            "areaId": 4475
          },
          {
            "areaName": "洛浦县",
            "areaId": 4476
          },
          {
            "areaName": "策勒县",
            "areaId": 4477
          },
          {
            "areaName": "于田县",
            "areaId": 4478
          },
          {
            "areaName": "民丰县",
            "areaId": 4479
          },
          {
            "areaName": "皮山县",
            "areaId": 4480
          },
          {
            "areaName": "和田县",
            "areaId": 4481
          }
        ],
        "areaId": 440
      },
      {
        "areaName": "阿克苏地区",
        "childrenList": [{
            "areaName": "阿克苏市",
            "areaId": 4482
          },
          {
            "areaName": "温宿县",
            "areaId": 4483
          },
          {
            "areaName": "沙雅县",
            "areaId": 4484
          },
          {
            "areaName": "拜城县",
            "areaId": 4485
          },
          {
            "areaName": "阿瓦提县",
            "areaId": 4486
          },
          {
            "areaName": "库车县",
            "areaId": 4487
          },
          {
            "areaName": "柯坪县",
            "areaId": 4488
          },
          {
            "areaName": "新和县",
            "areaId": 4489
          },
          {
            "areaName": "乌什县",
            "areaId": 4490
          },
          {
            "areaName": "阿拉尔市",
            "areaId": 4491
          }
        ],
        "areaId": 441
      },
      {
        "areaName": "喀什地区",
        "childrenList": [{
            "areaName": "喀什市",
            "areaId": 4492
          },
          {
            "areaName": "巴楚县",
            "areaId": 4493
          },
          {
            "areaName": "泽普县",
            "areaId": 4494
          },
          {
            "areaName": "伽师县",
            "areaId": 4495
          },
          {
            "areaName": "叶城县",
            "areaId": 4496
          },
          {
            "areaName": "岳普湖县",
            "areaId": 4497
          },
          {
            "areaName": "疏附县",
            "areaId": 4498
          },
          {
            "areaName": "疏勒县",
            "areaId": 4499
          },
          {
            "areaName": "英吉沙县",
            "areaId": 4500
          },
          {
            "areaName": "麦盖提县",
            "areaId": 4501
          },
          {
            "areaName": "莎车县",
            "areaId": 4502
          },
          {
            "areaName": "塔什库尔干县",
            "areaId": 4503
          }
        ],
        "areaId": 442
      },
      {
        "areaName": "克孜勒苏州",
        "childrenList": [{
            "areaName": "阿图什市",
            "areaId": 4504
          },
          {
            "areaName": "阿合奇县",
            "areaId": 4505
          },
          {
            "areaName": "乌恰县",
            "areaId": 4506
          },
          {
            "areaName": "阿克陶县",
            "areaId": 4507
          }
        ],
        "areaId": 443
      },
      {
        "areaName": "巴音郭楞州",
        "childrenList": [{
            "areaName": "库尔勒市",
            "areaId": 4508
          },
          {
            "areaName": "尉犁县",
            "areaId": 4509
          },
          {
            "areaName": "和静县",
            "areaId": 4510
          },
          {
            "areaName": "博湖县",
            "areaId": 4511
          },
          {
            "areaName": "和硕县",
            "areaId": 4512
          },
          {
            "areaName": "轮台县",
            "areaId": 4513
          },
          {
            "areaName": "若羌县",
            "areaId": 4514
          },
          {
            "areaName": "且末县",
            "areaId": 4515
          },
          {
            "areaName": "焉耆县",
            "areaId": 4516
          }
        ],
        "areaId": 444
      },
      {
        "areaName": "昌吉州",
        "childrenList": [{
            "areaName": "昌吉市",
            "areaId": 4517
          },
          {
            "areaName": "阜康市",
            "areaId": 4518
          },
          {
            "areaName": "奇台县",
            "areaId": 4519
          },
          {
            "areaName": "玛纳斯县",
            "areaId": 4520
          },
          {
            "areaName": "吉木萨尔县",
            "areaId": 4521
          },
          {
            "areaName": "呼图壁县",
            "areaId": 4522
          },
          {
            "areaName": "木垒县",
            "areaId": 4523
          }
        ],
        "areaId": 445
      },
      {
        "areaName": "博尔塔拉州",
        "childrenList": [{
            "areaName": "博乐市",
            "areaId": 4524
          },
          {
            "areaName": "精河县",
            "areaId": 4525
          },
          {
            "areaName": "温泉县",
            "areaId": 4526
          }
        ],
        "areaId": 446
      },
      {
        "areaName": "伊犁州",
        "childrenList": [{
            "areaName": "伊宁市",
            "areaId": 4527
          },
          {
            "areaName": "特克斯县",
            "areaId": 4528
          },
          {
            "areaName": "尼勒克县",
            "areaId": 4529
          },
          {
            "areaName": "昭苏县",
            "areaId": 4530
          },
          {
            "areaName": "新源县",
            "areaId": 4531
          },
          {
            "areaName": "霍城县",
            "areaId": 4532
          },
          {
            "areaName": "察布查尔县",
            "areaId": 4533
          },
          {
            "areaName": "巩留县",
            "areaId": 4534
          },
          {
            "areaName": "奎屯市",
            "areaId": 4535
          },
          {
            "areaName": "伊宁县",
            "areaId": 4536
          }
        ],
        "areaId": 447
      },
      {
        "areaName": "塔城地区",
        "childrenList": [{
            "areaName": "塔城市",
            "areaId": 4537
          },
          {
            "areaName": "乌苏市",
            "areaId": 4538
          },
          {
            "areaName": "额敏县",
            "areaId": 4539
          },
          {
            "areaName": "裕民县",
            "areaId": 4540
          },
          {
            "areaName": "沙湾县",
            "areaId": 4541
          },
          {
            "areaName": "托里县",
            "areaId": 4542
          },
          {
            "areaName": "和布克赛尔县",
            "areaId": 4543
          }
        ],
        "areaId": 448
      },
      {
        "areaName": "阿勒泰地区",
        "childrenList": [{
            "areaName": "阿勒泰市",
            "areaId": 4544
          },
          {
            "areaName": "富蕴县",
            "areaId": 4545
          },
          {
            "areaName": "青河县",
            "areaId": 4546
          },
          {
            "areaName": "吉木乃县",
            "areaId": 4547
          },
          {
            "areaName": "布尔津县",
            "areaId": 4548
          },
          {
            "areaName": "福海县",
            "areaId": 4549
          },
          {
            "areaName": "哈巴河县",
            "areaId": 4550
          },
          {
            "areaName": "北屯市",
            "areaId": 4551
          }
        ],
        "areaId": 449
      },
      {
        "areaName": "五家渠市",
        "childrenList": [{
          "areaName": "五家渠市",
          "areaId": 4552
        }],
        "areaId": 450
      },
      {
        "areaName": "博尔塔拉蒙古自治州阿拉山口口岸",
        "areaId": 451
      },
      {
        "areaName": "阿拉尔市",
        "childrenList": [{
          "areaName": "阿拉尔市",
          "areaId": 4553
        }],
        "areaId": 452
      },
      {
        "areaName": "图木舒克市",
        "childrenList": [{
          "areaName": "图木舒克市",
          "areaId": 4554
        }],
        "areaId": 453
      }
    ],
    "areaId": 31
  },
  {
    "areaName": "台湾",
    "childrenList": [{
      "areaName": "台湾",
      "childrenList": [{
        "areaName": "台湾市区内",
        "areaId": 4555
      }],
      "areaId": 454
    }],
    "areaId": 32
  },
  {
    "areaName": "香港",
    "childrenList": [{
      "areaName": "香港特别行政区",
      "childrenList": [{
        "areaName": "香港市区内",
        "areaId": 4556
      }],
      "areaId": 455
    }],
    "areaId": 33
  },
  {
    "areaName": "澳门",
    "childrenList": [{
      "areaName": "澳门市",
      "childrenList": [{
        "areaName": "澳门市区内",
        "areaId": 4557
      }],
      "areaId": 456
    }],
    "areaId": 34
  }
]

export default provinceList;
