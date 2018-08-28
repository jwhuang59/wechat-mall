
const search_msg = require('../../../config').shop_msg
let timeId = null;

Page({
    data: {
        history: [],
        hot: ['面膜', '洁面乳'],
        showKeywords: false,
        keywords: [],
        value: '',
        showResult: false,
    },
    cancelSearch() {
        this.setData({
            showResult: false,
            showKeywords: false,
            value: ''
        })
    },
    searchInput(e) {
        if(!e.detail.value){
            this.setData({
                showKeywords: false
            })
        }else{
            if(!this.data.showKeywords){
                timeId && clearTimeout(timeId);
                timeId = setTimeout(() => {
                    this.setData({
                        showKeywords: true
                    })
                }, 1000)
            }
            let self = this
            wx.request({
              url: search_msg + 'list',
              data: {
                nameLike: e.detail.value
              },
              success: function (res) {
                if (res.data.code == 0) {
                  self.setData({
                    value: e.detail.value,
                    keywords: res.data.data
                  });

                }else{
                  self.setData({
                    value: e.detail.value,
                  });

                }

              }
            })
        }
    },
    keywordHandle(e) {
        const text = e.target.dataset.text;
        let self = this
        wx.request({
          url: search_msg + 'list',
          data: {
            nameLike: text
          },
          success: function (res) {
            if (res.data.code == 0) {
              self.setData({
                value: text,
                keywords: res.data.data
              });

            }else {
              self.setData({
                value: e.detail.value,
              });

            }
          }
        })
        this.setData({
            value: text,
            showKeywords: false,
            showResult: true
        })
        this.historyHandle(text);
    },
    historyHandle(value) {
        let history = this.data.history;
        const idx = history.indexOf(value);
        if (idx === -1) {
            // 搜索记录只保留8个
            if (history.length > 7) {
                history.pop();
            }
        } else {
            history.splice(idx, 1);
        }
        history.unshift(value);
        wx.setStorageSync('history', JSON.stringify(history));
        this.setData({
            history
        });
    },
    onLoad() {
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
            console.log(this.data.history);
        }
    }
})