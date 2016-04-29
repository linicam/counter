// expose
// require('expose?$!expose?jQuery!../lib/jquery-1.12.3.min.js');
require('expose?_!underscore');
require('expose?$!expose?jQuery!jquery');

var moment = require('moment');
var egeui = require('egeui');
var base = require('./base.js');
var topNotify = base.topNotify;
var basetemplates = require('../templates/base/base.handlebars');
var histemplates = require('../templates/base/history.handlebars');
var itemtemplates = require('../templates/base/item.handlebars');

require('../css/bootstrap.css');
require('../css/main.css');
require('../css/pikaday/pikaday.css');

moment.locale('zh-cn', {
    weekdays: '星期一_星期二_星期三_星期四_星期五_星期六_星期天'.split('_')
});

var counting = false;
var startTime, endTime;
var totalTime = moment.duration(0);
var now, durationInterval, addedTime = 0;

//bind events
$('input#start').click(function () {
    if (!counting){
        $('.counter .action').text('开始计时！')
        counting = true;
        startTime = moment();

        durationInterval = setInterval(function () {
            counting && $('.counter .lasts').text(countDuraToMoment(startTime).format('HH:mm:ss'));
        }, 500);
    }
});
$('input#end').click(function () {
    var data;
    var duration;
    if (counting) {
        endTime = moment();
        duration = countDuraToMoment(startTime, endTime);
        if (duration.get('seconds') < 3){
            topNotify('单次计时不能小于3秒');
            return false;
        }
        totalTime = countDura(startTime, totalTime);

        data = {
            lasts: duration.format('HH:mm:ss'),
            start: startTime.format('YYYY年MM月DD日 HH时mm分ss秒 dddd'),
            end: endTime.format('YYYY年MM月DD日 HH时mm分ss秒 dddd')
        };
        $('.history-list').prepend(itemtemplates(data));
        saveTime(data);

        $('.total-time').text(formatTotal(totalTime));

        initDura();
        counting = false;
        $('.counter .action').text('结束计时！');
        durationInterval && clearInterval(durationInterval);
    }
});
$('input#add-button').click(function () {
    addedTime += (+$('#add-time').val());
    addTime({
        time: addedTime
    });
    $('.added-time').text('此次增加时长：' + addedTime + '分钟');
    $('#add-time').val('');
})

//init display
//header
now = moment().format('YYYY年MM月DD日 HH时mm分ss秒 dddd');
$('.header #now').text(now);
setInterval(function () {
    now = moment().format('YYYY年MM月DD日 HH时mm分ss秒 dddd');
    $('.header #now').text(now);
}, 1000);

//content
$('.total-time').text(formatTotal(totalTime));
$('.added-time').text('此次增加时长：0分钟');

//history
$('.history').append(histemplates({
    used_time: '',
    gained_time: '',
    res_time: ''
}));

//lists
getHistory().done(function (lists) {
    _.each(lists, function (i) {
        $('.history-list').prepend(itemtemplates(i));
    });
    $('.content').show();
});


//helpers
function initDura() {
    $('.counter .lasts').text('00:00:00');
}

function countDura(start, total) {
    return total.add(moment().diff(start), 'ms');
}

function countDuraToMoment(start, end) {
    return moment(moment.duration(end && end).add(moment().diff(start), 'ms')._data);
}

function formatTotal(totalTime) {
    var year, month, hour, minute, second;
    year = totalTime.years() && (totalTime.years() + '年');
    month = totalTime.months() && (totalTime.months() + '个月');
    hour = totalTime.hours() && (totalTime.hours() + '小时');
    minute = totalTime.minutes() && (totalTime.minutes() + '分钟');
    second = totalTime.seconds() + '秒';
    return ('此次登录总计用时：' + (!year && '') + (!month && '') + (!hour && '') + (!minute && '') + second);
}

function saveTime(data) {
    _.extend(data, {
        h: data.lasts.split(':')[0],
        m: data.lasts.split(':')[1],
        s: data.lasts.split(':')[2]
    });
    console.log(data)
    base.ajax({
        url: 'index.php/counter/save',
        type: 'json',
        data: data,
        success: function() {
            topNotify('上传成功！');
        },
        error: function () {
            topNotify('上传失败！');
        }
    });
}

function addTime(data) {
    base.ajax({
        url: 'index.php/counter/addTime',
        type: 'json',
        data: data,
        success: function() {
            topNotify('增加成功！');
        },
        error: function () {
            topNotify('增加失败！');
        }
    });
}

function getHistory(date) {
    var dfd = $.Deferred();
    base.ajax({
        url: 'index.php/counter/get',
        type: 'json',
        data: {
            date: date ? date : 0
        },
        success: function (res) {
            if (res.success) {
                return dfd.resolve(res.lists);
            } else {
                return dfd.reject();
            }
        }
    });
    return dfd.promise();
}