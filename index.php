<link href='//fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
<style>
@font-face {
    font-family:'datepicker-icons';
    src: url(data:application/font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBYAAAAC8AAAAYGNtYXAXVtKIAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZtsLkNUAAAF4AAAA3GhlYWQHxxV5AAACVAAAADZoaGVhB3ADxwAAAowAAAAkaG10eA4AAKQAAAKwAAAAGGxvY2EAlgBaAAACyAAAAA5tYXhwAAgAFgAAAtgAAAAgbmFtZY+uuhQAAAL4AAAB8nBvc3QAAwAAAAAE7AAAACAAAwNVAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpAQPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6QH//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAFIA0gOuApQAEwAAATYyFxYUBwEGIicBJjQ3NjIXCQEDfAoeCgoK/msKHgr+awoKCh4KAXwBfAKUCgoKHQv+cAsLAZALHQoKCv6SAW4AAAEAUgEGA64CyAATAAATBiInJjQ3ATYyFwEWFAcGIicJAYQKHgoKCgGVCh4KAZUKCgoeCv6E/oQBBgsLCh0KAZEKCv5vCh0KCwsBbf6TAAAAAQAAAAEAAOA/oONfDzz1AAsEAAAAAADSfWjaAAAAANJ9aNoAAAAAA64CyAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAADrgABAAAAAAAAAAAAAAAAAAAABgQAAAAAAAAAAAAAAAIAAAAEAABSBAAAUgAAAAAACgAUAB4ARgBuAAAAAQAAAAYAFAABAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABABAAAAABAAAAAAACAAcAsQABAAAAAAADABAAUQABAAAAAAAEABAAxgABAAAAAAAFAAsAMAABAAAAAAAGABAAgQABAAAAAAAKABoA9gADAAEECQABACAAEAADAAEECQACAA4AuAADAAEECQADACAAYQADAAEECQAEACAA1gADAAEECQAFABYAOwADAAEECQAGACAAkQADAAEECQAKADQBEGRhdGVwaWNrZXItaWNvbnMAZABhAHQAZQBwAGkAYwBrAGUAcgAtAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGRhdGVwaWNrZXItaWNvbnMAZABhAHQAZQBwAGkAYwBrAGUAcgAtAGkAYwBvAG4Ac2RhdGVwaWNrZXItaWNvbnMAZABhAHQAZQBwAGkAYwBrAGUAcgAtAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmRhdGVwaWNrZXItaWNvbnMAZABhAHQAZQBwAGkAYwBrAGUAcgAtAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format('truetype');
}
html{
    font-family: 'Roboto';
    background-color: #222;
}
#datepicker-wrapper{
    background-color: #FFF;
    padding: 20px 20px 10px;
    display: inline-block;
    
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
#calendar-table{
    width: 100%;
    text-align: center;
}
#calendar-table td{
    border-bottom: 1px solid #CCC;
    padding: 8px 10px 6px;
    cursor: pointer;
}
#calendar-table td.current{
    box-shadow: 5px 0 0 #AADBDF inset, -5px 0 0 #AADBDF inset;
}
#calendar-table tr:first-child td{
    border-top: 1px solid #CCC;
}
#calendar-table tr:last-child td{
    border-bottom: 0;
}
#calendar-table thead tr:last-child th{
    border-bottom: 1px solid #CCC;
    padding: 8px 10px 6px;
}
#calendar-table thead th.monthyear{
    font-size: 1.5rem;
    font-weight: normal;
    padding: 15px 0;
    line-height: 1rem;
}
#calendar-table thead th.monthyear span.prev:after{
    content: "\e901";
    font-size: 1.3rem;
    color: #999;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transform: rotate(-90deg);
    display: inline-block;
    float: left;
        /* use !important to prevent issues with browser extensions that change fonts */
        font-family: 'datepicker-icons' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;

        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
}
#calendar-table thead th.monthyear span.next:after{
    content: "\e901";
    font-size: 1.3rem;
    color: #999;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transform: rotate(90deg);
    display: inline-block;
    float: right;
        /* use !important to prevent issues with browser extensions that change fonts */
        font-family: 'datepicker-icons' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;

        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
}
#calendar-table thead:after{
    content: " ";
    height: 2px;
    display: inline-block;
}
#timepicker-wrapper{
    display: table;
    margin: 20px 0 10px;
    width: 100%;
}
#timepicker-wrapper > div{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
#timepicker-wrapper > div:first-child{
    padding-left: 0;
}
#datepicker-wrapper .scroller .up{
    box-shadow: 0 15px 20px 0px #FFF;
}
#datepicker-wrapper .scroller .down{
    box-shadow: 0 -15px 20px 0px #FFF;
}
#datepicker-wrapper .scroller .up,
#datepicker-wrapper .scroller .down{
    font-size: 2.5rem;
    color: #999;
    cursor: pointer;
    position: relative;
    z-index: 2;
        /* use !important to prevent issues with browser extensions that change fonts */
        font-family: 'datepicker-icons' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;

        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
}
#datepicker-wrapper .scroller .up:before{
    content: "\e901";
}
#datepicker-wrapper .scroller .down:before{
    content: "\e900";
}
#datepicker-wrapper .scroller ul{
    margin: 0;
    padding: 0;
    height: 70px;
    overflow: hidden;
    width: 50px;
    font-size: 3rem;
    position: relative;
}
#datepicker-wrapper .scroller ul li{
    padding: 35px 0;
    line-height: 0rem;
    position: relative;
}
#timepicker-wrapper .scroller ul{
    width: unset;
}
#timepicker-wrapper .colon{
    font-size: 3rem;
}
#timepicker-wrapper .period{
    width: 70px;
    padding: 0 20px;
}
#timepicker-wrapper .period div{
    box-shadow: 0px 1px 1px -1px rgba(0,0,0,0.5);
    padding: 7px 16px;
    font-size: 1.6rem;
    border: 1px solid #DDD;
    cursor: pointer;
}
#actions-wrapper{
    text-align: right;
}
#actions-wrapper .button{
    display: inline-block;
    padding: 10px 5px;
    cursor: pointer;
    font-weight: bold;
}
</style>
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/moment.js"></script>
<script>
var Cal = (function($, moment){

    function Cal(options){
        $(document).ready((function(_this, options){
            return function(){
                var $this = _this;                

                $this.init(function(DatePicker){
                    $this = $.extend($this, DatePicker.constructor(options));
                    return $this;
                });
            };
        })(this, options));
    }

    Cal.prototype = {
        
        /**
         * init
         * constructor
         * buildcalendar
         * buildcalendartbody
         * inibuttons
         * updatecalendartbody
         * updatecurrentdate
         */        

        init: function(callback){
            var $this = {

                weekdays: {
                    one: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                },                

                constructor: function(options){
                    options = $.extend(true, {
                        format: 'MM/DD/YYYY hh:mm A' //refer to momentjs docs for fromating
                    }, options);
                    
                    //this extend is only for the constructor
                    $.extend($this, options);

                    $this.buildcalendar();
                    $this.initbuttons();
                },

                buildcalendar: function(){
                    $this.currentDate = moment();
                    var currentDateObj = $this.currentDate.toObject();
                    var currentDateFormated = $this.currentDate.format($this.format);
                    var calendarTableHTML = '';       
                    var calendarHeaderHTML = '';                    

                    /* Numbers Days Grid */
                    calendarTableHTML = $this.buildcalendartbody(currentDateObj);
                
                    /* Weekdays Headers */
                    for(i=0;i<$this.weekdays.one.length;i++){
                        calendarHeaderHTML += '<th>'+$this.weekdays.one[i]+'</th>';   
                    }

                    /* Hours */
                    var hoursHTML = '';
                    var currentHour = $this.currentDate.format('h');
                    for(i=1;i<=12;i++){
                        var current = currentHour == i ? ' current ' : '';
                        hoursHTML += '<li class="'+current+'">'+i+'</li>';
                    }

                    /* Minutes */
                    var minutesHTML = '';
                    var currentMinute = $this.currentDate.format('mm');
                    for(i=0;i<60;i++){
                        var zero = i < 10 ? 0 : '';
                        var current = currentMinute == zero+i ? ' current ' : '';
                        minutesHTML += '<li class="'+current+'">'+zero+i+'</li>';
                    }

                    datepickerHTML = $(' \
                        <div id="datepicker-wrapper"> \
                            <input type="text" class="currentDate" value="'+currentDateFormated+'" /> \
                            <table id="calendar-table" border="0" cellspacing="0" cellpadding="0"> \
                                <thead> \
                                    <tr><th class="monthyear" colspan="7"><span class="prev"></span><span data-month="'+$this.currentDate.format('M')+'" class="month">'+$this.currentDate.format('MMMM')+'</span> <span class="year">'+$this.currentDate.format('YYYY')+'</span><span class="next"></span></th></tr> \
                                    <tr> \
                                        '+calendarHeaderHTML+' \
                                    </tr> \
                                </thead> \
                                <tbody> \
                                    '+calendarTableHTML+' \
                                </tbody> \
                            </table> \
                            <div id="timepicker-wrapper"> \
                                <div class="hour scroller"><div class="up"></div><ul>'+hoursHTML+'</ul><div class="down"></div></div> \
                                <div class="colon">:</div> \
                                <div class="minutes scroller"><div class="up"></div><ul>'+minutesHTML+'</ul><div class="down"></div></div> \
                                <div class="period"><div data-period="am" data-offset="0">AM</div></div> \
                            </div> \
                            <div id="actions-wrapper"> \
                                <div class="button cancel">CANCEL</div> \
                                <div class="button set">SET</div> \
                            </div> \
                        </div> \
                    ');

                    /* SET CURRENT HOUR */
                    datepickerHTML.find('.hour ul li').css({
                        top: '-'+(($this.currentDate.format('h') - 1) * 70)+'px'
                    });

                    /* SET CURRENT MINUTE */
                    datepickerHTML.find('.minutes ul li').css({
                        top: '-'+($this.currentDate.format('m') * 70)+'px'
                    });

                    /* SET CURRENT PERIOD */
                    var periodBtn = datepickerHTML.find('.period').find('div');
                    periodBtn.attr('data-period', $this.currentDate.format('a'))
                        .html($this.currentDate.format('A'));
                    periodBtn.attr('data-offset', (periodBtn.attr('data-period') == 'am' ? '0' : '12'));
                    
                    $this.datepicker = datepickerHTML;
                    $('body').prepend(datepickerHTML);
                },

                buildcalendartbody: function(){
                    var currentDateObj = $this.currentDate.toObject();
                    var totalDays = moment($this.currentDate).daysInMonth();
                    var firstDayOfMonth = moment($this.currentDate).startOf('month').format('d');
                    var lastDayOfMonth = moment($this.currentDate).endOf('month').format('d');
                    var calendarTableHTML = '';

                    /* Numbers Days Grid */
                    for(i=1;i<=totalDays;i++){
                        var eow = moment(currentDateObj.years+'-'+(currentDateObj.months + 1)+'-'+i).endOf('week').format('D');
                        var current = currentDateObj.date == i ? ' current ' : '';

                        calendarTableHTML += '<td class="day'+current+'">'+i+'</td>';
                        calendarTableHTML += eow == i ? '</tr><tr>' : '';
                    }
                    /* Fill Beginning Grid */
                    for(i=0;i<firstDayOfMonth;i++){
                        calendarTableHTML = '<td>&nbsp;</td>'+calendarTableHTML;
                    }
                    /* Fill End Grid */
                    for(i=lastDayOfMonth;i<6;i++){
                        calendarTableHTML += '<td>&nbsp;</td>';
                    }
                    
                    return '<tr>'+calendarTableHTML+'</tr>';
                },
        
                initbuttons: function(){
                    $('#datepicker-wrapper').on('click.scroller.up', '.up', function(event){
                        var ul = $(this).next('ul');
                        var current = ul.find('li.current');
                        var clone = false;

                        if(ul.find('li:first-child').position().top == -Math.abs(((ul.find('li').length - 1) * 70))){
                            clone = ul.find('li:last-child').clone();
                            ul.prepend(clone);
                            ul.find('li').css('top', '0px');
                        };

                        ul.find('li:not(:animated)').animate({
                            top: '-=70px'
                        }, function(){
                            ul.find('li').removeClass('current');
                            current.next('li').addClass('current');

                            if(clone){
                                clone.remove();
                                ul.find('li').css('top', '0px');
                                ul.find('li:first-child').addClass('current');
                            }

                            $this.updatecurrentdate();
                        });

                        event.stopImmediatePropagation();
                    }).on('click.scroller.down', '.down', function(event){
                        var ul = $(this).prev('ul');
                        var current = ul.find('li.current');
                        var clone = false;
        
                        if(ul.find('li:first-child').position().top == 0){
                            ul.find('li').css('top', '-'+(ul.find('li').length * 70)+'px');
                            clone = ul.find('li:first-child').clone();
                            ul.append(clone);
                        }
            
                        ul.find('li:not(:animated)').animate({
                            top: '+=70px'
                        }, function(){
                            ul.find('li').removeClass('current');
                            current.prev('li').addClass('current');

                            if(clone){
                                clone.remove();
                                ul.find('li:last-child').addClass('current');
                            }

                            $this.updatecurrentdate();
                        });

                        event.stopImmediatePropagation();
                    }).on('click.time.period', '.period', function(event){
                        var btn = $(this).find('div');

                        if(btn.attr('data-period') == 'am'){
                            btn.attr('data-period', 'pm')
                                .attr('data-offset', '12').html('PM');
                        }else{
                            btn.attr('data-period', 'am')
                                .attr('data-offset', '0').html('AM');
                        }
                
                        $this.updatecurrentdate();
                        event.stopImmediatePropagation();
                    }).on('click.date.day', '.day', function(event){
                        $('.day').removeClass('current');
                        $(this).addClass('current');

                        $this.updatecurrentdate();
                        event.stopImmediatePropagation();
                    }).on('click.monthyear.prev', '.monthyear .prev', function(event){
                        var spanm = $(this).next('.month');
                        var spany = spanm.next('.year');
                        var monthyear = moment([spany.html(), (moment().month(spanm.html()).format('M') - 1)]).subtract(1, 'M');
                                
                        /*update month*/
                        spanm.attr('data-month', monthyear.format('M')).html(monthyear.format('MMMM'));
                        /*update year*/
                        spany.html(monthyear.format('YYYY'));
                
                        $this.updatecurrentdate(function(){
                            $this.updatecalendartbody();
                        });

                        event.stopImmediatePropagation();
                    }).on('click.monthyear.next', '.monthyear .next', function(event){
                        var spany = $(this).prev('.year');
                        var spanm = spany.prev('.month');
                        var monthyear = moment([spany.html(), (moment().month(spanm.html()).format('M') - 1)]).add(1, 'M');
                                
                        /*update month*/
                        spanm.attr('data-month', monthyear.format('M')).html(monthyear.format('MMMM'));
                        /*update year*/
                        spany.html(monthyear.format('YYYY'));
                
                        $this.updatecurrentdate(function(){
                            $this.updatecalendartbody();
                        });

                        event.stopImmediatePropagation();
                    });
                },

                updatecalendartbody: function(){
                    var calendarTbodyHTML = $this.buildcalendartbody();
                    $this.datepicker.find('tbody').html(calendarTbodyHTML);
                },

                updatecurrentdate: function(callback){
                    var year = $this.datepicker.find('thead .monthyear .year').html();
                    var month = (moment().month($this.datepicker.find('thead .monthyear .month').html()).format('MM') - 1);
                    var day = $this.datepicker.find('tbody td.current').html();
                    var hour = parseInt($this.datepicker.find('#timepicker-wrapper .hour li.current').html()) + parseInt($this.datepicker.find('#timepicker-wrapper .period > div').attr('data-offset'));
                    var minutes = $this.datepicker.find('#timepicker-wrapper .minutes li.current').html();

                    hour = hour == '24' ? '0' : hour;
                    //console.log(year+' '+month+' '+day+' '+hour+' '+minutes);

                    $this.currentDate = moment([year, month, day, hour, minutes]);
                    $this.datepicker.find('input.currentDate').val($this.currentDate.format($this.format));

                    return callback && typeof(callback) === 'function' ? callback() : true; 
                }
            }
    
            return callback && typeof(callback) === 'function' ? callback($this) : $this;
        }
    }   

    return Cal;
})(jQuery, moment);

var cal = new Cal();
</script>
