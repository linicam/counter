var $ = require('jquery');
// var _ = require('underscore');
var moment = require('moment');
// var Pikaday = require('pikaday');
require('../css/bootstrap.css');
var basetemplates = require('../templates/base/base.handlebars');
var histemplates = require('../templates/base/history.handlebars');
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
        }, 1000);
    }
});
$('input#end').click(function () {
    var duration;
    if (counting) {
        $('.counter .action').text('结束计时！')
        counting = false;
        endTime = moment();
        durationInterval && clearInterval(durationInterval);

        duration = countDuraToMoment(startTime, endTime);
        totalTime = countDura(startTime, totalTime);
        $('.history-list').prepend(basetemplates({
            duration: duration.format('HH:mm:ss'),
            startTime: startTime.format('YYYY年MM月DD日 HH时mm分ss秒 dddd'),
            endTime: endTime.format('YYYY年MM月DD日 HH时mm分ss秒 dddd')
        }));

        $('.total-time').text(formatTotal(totalTime));

        initDura();
    }
});
$('input#add-button').click(function () {
    addedTime += (+$('#add-time').val());
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

$('.content').show();

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
    var timeString = '此次登录总计用时：' + (!year && '') + (!month && '') + (!hour && '') + (!minute && '') + second;
    return timeString;
}