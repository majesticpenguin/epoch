<link rel='stylesheet' type='text/css' href='css/datetimepicker-mp.css' />
<link rel='stylesheet' type='text/css' href="//majesticpenguin.com/fonts/ProductSans/font.css" />
<link rel='stylesheet' type='text/css' href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />

<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/moment.js"></script>
<script src="js/datetimepicker-mp.js"></script>

<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
    <h1 style="font-weight:bold;color:#FFF;font-size:5rem;margin:0;"><i class="fa fa-heart"></i> DateTime<span style="font-weight:normal;">Picker</span> <i class="fa fa-thumbs-o-up"></i></h1>
    <input type="text" class="datetimepicker" />
    <input type="text" class="datetimepicker" value="04/13/2010 08:23 AM" />
</div>

<script>
var datetimepicker = new DateTimePicker({
    trigger: '.datetimepicker'
});
</script>
