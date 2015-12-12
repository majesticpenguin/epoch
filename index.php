<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">

<link rel='stylesheet' type='text/css' href='css/epoch.css' />
<link rel='stylesheet' type='text/css' href="//majesticpenguin.com/fonts/ProductSans/font.css" />
<link rel='stylesheet' type='text/css' href="//majesticpenguin.com/fonts/MPFont/font.css" />
<link rel='stylesheet' type='text/css' href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />

<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/hammer.min.js"></script>
<script src="js/jquery.hammer.js"></script>
<script src="js/moment.js"></script>
<script src="js/epoch.js"></script>

<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
    <h1 style="white-space:nowrap;font-weight:normal;transform:scaleY(1.2);color:#FFF;font-size:7rem;margin:0;">EP<strong>ō</strong>CH<span style="font-weight:normal;font-size:3rem;line-height:3rem;vertical-align:text-top;">js</span></h1>
    <input type="text" class="epoch" />
    <input type="text" class="epoch" value="04/13/2010 08:23 AM" /><br />
    <a href="//majesticpenguin.com" style="color:#888;text-decoration:none;font-size:1.5rem;line-height: 3rem;">Majestic Penguin |</a> <a href="https://github.com/majesticpenguin/datetimepicker" style="color:#888;text-decoration:none;font-size:1.5rem;line-height: 3rem;">GitHub</a>
</div>

<i class="mp-logo" style="position:absolute;color: #292929;font-size: 50em;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: -1;"></i>

<script>
var epoch = new Epoch({
    trigger: '.epoch'
});
</script>
