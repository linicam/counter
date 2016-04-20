<!DOCTYPE html>
<html>
<meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf-8">
<title>TimeCounter</title>
<body>
<div class="content" style="display: none">
    <div class="header">
        <input type="button" id="start" value="开始">
        <input type="button" id="end" value="停止">
        <span id="now"></span>
    </div>
    <div class="counter">
        <h2 class="lasts">00:00:00</h2>
        <h4 class="total-time"></h4>
    </div>
    <div class="history">
        <ul class="history-list">

        </ul>
    </div>
</div>
<script src="./assets/static/common.js"></script>
<script src="./assets/static/bundle.js"></script>
</body>
</html>