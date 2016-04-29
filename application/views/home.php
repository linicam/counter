<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="zh-cn">
<head>
    <link rel="stylesheet" href="/assets/static/index.css">
    <meta charset="utf-8">
    <title>Welcome to Linicam's Counter</title>
</head>
<body>
<?php echo date('Y-m-d'); ?>
<div id="container">
    <div class="content">
        <div class="header">
            <div>
                <input type="button" id="start" value="开始">
                <input type="button" id="end" value="停止">
                <span id="now"></span>
            </div>
            <div>
                <input type="text" id="add-time" placeholder="请输入增加时长（分钟）">
                <input type="button" id="add-button" value="确认">
                <h5 class="added-time"></h5>
            </div>
        </div>
        <div class="counter">
            <h3 class="lasts">00:00:00</h3>
            <h5 class="action"></h5>
            <h4 class="total-time"></h4>
        </div>
        <div class="history">
        </div>
        <div class="search">
            <input type="text" id="startDate" placeholder="选择开始日期">
            <input type="text" id="endDate" placeholder="选择结束日期">
            <input type="button" value="搜索">
        </div>
        <div class="history-list">
        </div>
    </div>
</div>

<script src="assets/static/common.js"></script>
<script src="assets/static/bundle.js"></script>
</body>
</html>