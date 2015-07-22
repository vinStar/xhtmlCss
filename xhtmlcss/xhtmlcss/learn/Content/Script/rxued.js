//定义命名空间
var rxued;
if (!rxued) rxued = {};


//页面布局
rxued.mainlayout = {
    uLower: function (a, b) {
        var allheight = $("body").eq(0).height();
        var ominHeight = allheight - a.height();
        b.css("height", ominHeight);
    }
};



//表格的样式
rxued.table = {
    LChangeapart: function (a, c1, c2) {
        a.each(function (i) {
            i % 2 == 0 ? a.eq(i).css('backgroundColor', c1) : a.eq(i).css('backgroundColor', c2);
        });
    },
    hoverChage: function (obj, c1) {
        var sColor = "";
        obj.hover(function () {
            sColor = $(this).css("backgroundColor");
            $(this).css("backgroundColor", c1)
        }, function () {
            $(this).css("backgroundColor", sColor)
        });
    },
    towidth: function (tab1, tab2) {
        tab1.width(tab2.width());
    },

    //tb1：表头表格，tb2：数据表格，resultObj：数据表格外面的div    
    countTB: function (maindiv, tb1, tb2, resultObj, fn) {
        if (typeof (fn) == "function") {
            fn();
        }
        var aHeight = 0;
        var ReductionBox = maindiv.find(".j_outerheight"); //所有需要减去高度的元素加上CLASS："j_outerheight"
        for (var i = 0; i < ReductionBox.length; i++) {
            aHeight += ReductionBox.eq(i).outerHeight();
        }
        var ResultHeight = maindiv.eq(0).height() - parseInt(aHeight);
        //alert(ResultHeight);
        resultObj.css("max-height", ResultHeight + 'px');

        //设置最大高度后会产生滚动条，前后t2的全度会变化
        if (tb2.width() > 0) {
            var ominWidth = tb2.outerWidth();
            tb1.width(ominWidth);
        }
    }

};


//iframe - 自动计算高度
rxued.iframe = {
    autoHeight: function (pIframe) {
        var oIframe = $('#' + pIframe, parent.document);
        var oBodyHeight = $("body").eq(0).height();
        //alert(oBodyHeight);
        oIframe.height(oBodyHeight);
    },
    //带高度参数的
    autoHeight2: function (pIframe, h) {
        var oIframe = $('#' + pIframe, parent.document);
        var oBodyHeight = $("body").eq(0).height() + h;
        //alert(oBodyHeight);
        oIframe.height(oBodyHeight);
    }
};


//进度条
/* objWrapClass:包裹obj的class，objInnerClass:被包裹内部滚动条的class，numclass:滚动进度*/
rxued.progress = {
    doProgress: function (objWrapClass, objInnerClass, numclass) {
        $(objWrapClass).each(function (i) {
            var oAllWidth = $(this).width();
            var text = $(this).find(numclass).text().replace(/%/g, "");
            var oWidth = ((text) / 100) * oAllWidth;
            $(this).find(objInnerClass).animate({ "width": oWidth }, 800);
        });

    }
};


//弹出框
rxued.alertbox = {
    showBox1: function (clickobj, showobj1, fn) {
        clickobj.click(function () {
            showobj1.show();
            if (typeof (fn) == "function") {
                fn();
            }
        })
    },
    showBox2: function (clickobj, showobj1, showobj2, fn) {
        clickobj.click(function () {
            showobj1.show();
            showobj2.show();
            if (typeof (fn) == "function") {
                fn();
            }
        })
    },
    showBox3: function (clickobj, showobj1, showobj2, showobj3, fn) {
        clickobj.click(function () {
            showobj1.show();
            showobj2.show();
            showobj3.show();
            if (typeof (fn) == "function") {
                fn();
            }
        })

    },
    hideBox1: function (clickobj, hideobj1, fn) {
        clickobj.click(function () {
            hideobj1.hide();
            if (typeof (fn) == "function") {
                fn();
            }
        })

    },
    hideBox2: function (clickobj, hideobj1, hideobj2, fn) {
        clickobj.click(function () {
            showobj1.hide();
            showobj2.hide();
            if (typeof (fn) == "function") {
                fn();
            }
        })
    },
    hideBox3: function (clickobj, hideobj1, hideobj2, hideobj3, fn) {
        clickobj.click(function () {
            showobj1.hide();
            showobj2.hide()
            showobj3.hide();
            if (typeof (fn) == "function") {
                fn();
            }
        })
    },
    judgeH: function (resultObj, maxH) {
        var aHeight = 0;
        var ReductionBox = $(".j_alertHeight"); //所有需要减去高度的元素加上CLASS："j_alertHeight"
        for (var i = 0; i < ReductionBox.length; i++) {
            aHeight += ReductionBox.eq(i).outerHeight();
        }
        var ResultHeight = $("body").eq(0).height() - parseInt(aHeight) - 10;
        var maxH = maxH;
        ResultHeight = (ResultHeight > maxH) ? maxH : ResultHeight;
        resultObj.css('max-height', ResultHeight);
    }
};


rxued.check = {
    //全选功能：obj1-全选的复选框，objs-被操作的所有复选框，isRever-是否有反选功能，obj3-反选按钮
    allCheck: function (obj1, objs, isRever, obj3) {
        obj1.click(function () {
            $(this).prop("checked") == true ? objs.prop("checked", true) : objs.prop("checked", false);
        });
        objs.click(function (e) {
            objs.length == objs.filter(":checked").length ? obj1.prop("checked", true) : obj1.prop("checked", false);
            e.stopPropagation();
        });
        if (isRever == true) {
            rxued.check.ReverseCheck(obj3, objs, obj1);
        }
    },
    //反选功能
    ReverseCheck: function (obj3, objs, obj1) {
        obj3.click(function () {
            objs.length == objs.not(":checked").length ? obj1.prop("checked", true) : obj1.prop("checked", false);
            objs.each(function () {
                $(this).prop("checked", !$(this).prop("checked"))
            })
        })
    }
};

rxued.focus = {
    focusBlur: function (obj) {
        //文本框获得焦点和失去焦点是文字显示隐藏
        var oval = $(obj).val();
        $(obj).focus(function () {
            if ($(this).val() == oval) {
                $(this).val("");
            }
        }).blur(function () {
            if ($(this).val() == "") {
                $(this).val(oval);
            }

        });
    }
}
//遮罩层
rxued.layer = {
    maskShow2: function (obj1, obj2) {
        obj1.show();
        if (obj2 != null) {
            obj2.show();
        }
    },
    maskShow3: function (obj1, obj2, obj3) {
        obj1.show();
        obj2.show();
        if (obj3 != null) {
            obj3.show();
        }
    },
    maskHide2: function (obj1, obj2) {
        obj1.hide();
        if (obj2 != null) {
            obj2.hide();
        }
    },
    maskHide3: function (obj1, obj2, obj3) {
        obj1.hide();
        obj2.hide();
        if (obj3 != null) {
            obj3.hide();
        }
    },
    //遮罩层的宽度跟某元素的宽度相同
    tolayerWidth: function (obj, baseObj) {
        obj.css("width", baseObj.width());
    },
    tolayerWH: function (obj, baseObjW, baseObjH) {
        obj.css({ "width": baseObjW.width(), "height": baseObjH.height() });
    },
}



//tab选项卡   tabli 外层对象        tabcur 选中赋予的样式
//调用例子：     rxued.tab.tabchange($("#navBox"),"tabcur")
rxued.tab = {
    tabchange: function (tabli, tabcur, fn) {
        //弹出框中，点击弹出框上的按钮，切换样式
        $(tabli).each(function (index, element) {
            $(this).click(function () {
                $(this).addClass(tabcur).siblings().removeClass(tabcur);

            });
        });

        if (typeof (fn) == "function") {
            fn();
        }
    }

}


//图片轮播  ---常用多个图片轮播,单个可直接调用scrollimgplus.js
rxued.img = {
    scrollimg: function (obj, imglength, scrollsl) {
        var cimgLength = imglength;
        var oUllist = obj.find(".imglist");
        var oLi = obj.find(".imglist li");
        var theLength = cimgLength || oLi.length;
        var oWidth = parseInt(oLi.eq(0).width()) + parseInt(oLi.eq(0).css("margin-left"));
        oUllist.width(oWidth * theLength)
        var iNum = 0;

        obj.find(".aleft").unbind('click');  //确保点击事件的叠加不会发生
        obj.find(".aleft").click(function () {
            if (!oUllist.is(":animated")) {
                if (iNum == 0) {

                }
                else {
                    iNum -= scrollsl;
                    oUllist.animate({ "marginLeft": -oWidth * iNum + 'px' }, 500);
                }
            };
        });
        obj.find(".aright").unbind('click');
        obj.find(".aright").click(function () {
            if (!oUllist.is(":animated")) {
                iNum += scrollsl;
                if (iNum >= theLength) {

                    oUllist.animate({ "marginLeft": 0 + 'px' }, 500);
                    iNum = 0;
                }
                else {

                    if (theLength - iNum < scrollsl) {
                        oUllist.animate({ "marginLeft": -oWidth * (theLength - scrollsl) + 'px' }, 500);
                    }
                    else {
                        oUllist.animate({ "marginLeft": -oWidth * iNum + 'px' }, 500);

                    }

                }
            };
        });

    }
};


//cookie
rxued.cookie = {
    getCookie: function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]); return null;
    },
    setCookie: function (name, value, expires, path, domain, secure) {
        document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
    },
    deleteCookie: function (name) {
        var delexpdate = new Date();
        delexpdate.setTime(delexpdate.getTime() - 1);
        setCookie(name, "", delexpdate);
    }

};




//判断浏览器
rxued.Browser = {
    getBrowserInfo: function () {
        var agent = navigator.userAgent.toLowerCase();

        var regStr_ie = /msie [\d.]+;/gi;
        var regStr_ff = /firefox\/[\d.]+/gi;
        var regStr_chrome = /chrome\/[\d.]+/gi;
        var regStr_saf = /safari\/[\d.]+/gi;
        //Chrome
        if (agent.indexOf("chrome") > 0) {
            return agent.match(regStr_chrome);
        }

            //firefox
        else if (agent.indexOf("firefox") > 0) {
            return agent.match(regStr_ff);
        }

        //Safari
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            return agent.match(regStr_saf);
        }
            //IE
        else {
            return agent.match(regStr_ie);
        }
    }

}













