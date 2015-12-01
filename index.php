<link href='css/datetimepicker-mp.css' rel='stylesheet' type='text/css'>
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/moment.js"></script>
<script src="js/datetimepicker-mp.js"></script>

<div style="position:absolute;top:50%;left:50%;transform:translate(-50%);">
    <input type="text" class="datetimepicker" />
    <input type="text" class="datetimepicker" value="04/13/2010 08:23 AM" />
</div>

<script>
var datetimepicker = new DateTimePicker({
    trigger: '.datetimepicker'
});
</script>
