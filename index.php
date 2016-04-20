<!DOCTYPE html>
<html>
<meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf-8">
<title>TimeCounter</title>
<body>
<div class="content" style="display: none">
    <div class="header">
        <div>
            <input type="button" id="start" value="开始">
            <input type="button" id="end" value="停止">
            <span id="now"></span>
        </div>
        <div>
            <input type="text" id="add-time" placeholder="请输入增加时长（分钟）">
            <input type="button" id="add-button" value="确认">
        </div>
    </div>
    <div class="counter">
        <h3 class="lasts">00:00:00</h3>
        <h5 class="action"></h5>
        <h4 class="total-time"></h4>
        <h4 class="added-time"></h4>
    </div>
    <div class="history">
    </div>
    <div class="search">
        <ul class="history-list">

        </ul>
    </div>
</div>
<script src="./assets/static/common.js"></script>
<script src="./assets/static/bundle.js"></script>
</body>
</html>