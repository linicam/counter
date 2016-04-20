var $ = require('jquery');
// var _ = require('underscore');
var moment = require('moment');
// var Pikaday = require('pikaday');
require('../css/bootstrap.css');
var templates = require('../templates/base/base.handlebars');
require('../css/main.css');
require('../css/pikaday/pikaday.css');

moment.locale('zh-cn', {
    weekdays: '星期一_星期二_星期三_星期四_星期五_星期六_星期天'.split('_')
});

var counting = false;
var startTime, endTime;
var totalTime = moment.duration(0);
var now, durationInterval;

// var date_selector = new Pikaday({
//     field: $('#date')[0],
//     onSelect: function () {
//         $('.content').append(templates({time: date_selector.toString()}));
//     }
// });

$('input#start').click(function () {
    if (!counting){
        counting = true;
        startTime = moment();

        durationInterval = setInterval(function () {
            if (counting){
                $('.counter .lasts').text(countDuraToMoment(startTime).format('HH:mm:ss'));
            }
        }, 1000);
    }
});
$('input#end').click(function () {
    var duration;
    if (counting) {
        counting = false;
        endTime = moment();
        durationInterval && clearInterval(durationInterval);

        duration = countDuraToMoment(startTime, endTime);
        totalTime = countDura(startTime, totalTime);
        $('.history-list').prepend(templates({
            duration: duration.format('HH:mm:ss'),
            startTime: startTime.format('YYYY年MM月DD日 HH时mm分ss秒 dddd'),
            endTime: endTime.format('YYYY年MM月DD日 HH时mm分ss秒 dddd')
        }));

        $('.total-time').text(
            // (totalTime.years() && (totalTime.years() + '年')) +
            // (totalTime.months() && (totalTime.months() + '个月')) +
            (totalTime.hours() && (totalTime.hours() + '小时')) +
            (totalTime.minutes() && (totalTime.minutes() + '分钟')) + totalTime.seconds() + '秒'
        );

        initDura();
    }
});

now = moment().format('YYYY年MM月DD日 HH时mm分ss秒 dddd');
$('.header #now').text(now);
setInterval(function () {
    now = moment().format('YYYY年MM月DD日 HH时mm分ss秒 dddd');
    $('.header #now').text(now);
}, 1000);


$('.content').show();

function initDura() {
    $('span.lasts').text('00:00:00');
}

function countDura(start, total) {
    return total.add(moment().diff(start), 'ms');
}

function countDuraToMoment(start, end) {
    return moment(moment.duration(end && end).add(moment().diff(start), 'ms')._data);
}