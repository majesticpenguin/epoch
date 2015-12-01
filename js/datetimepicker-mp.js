var DateTimePicker = (function($, moment){

    function DateTimePicker(options){
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

    DateTimePicker.prototype = {

        /**
         * init
         * constructor
         * buildcalendar
         * buildcalendartbody
         * closeDateTimePicker
         * inibuttons
         * loadtriggers
         * revealDateTimePicker
         * setcalendar
         * setday
         * sethour
         * setminute
         * setmonthyear
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
                        format: 'MM/DD/YYYY hh:mm A', //refer to momentjs docs for fromating
                        trigger: '' //object(s) that trigger datetimepicker upon focus
                    }, options);
                    
                    //this extend is only for the constructor
                    $.extend($this, options);

                    $this.buildcalendar(function(){
                        $this.initbuttons();
                        $this.loadtriggers();
                    });
                },

                buildcalendar: function(callback){
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

                    $this.datepicker = $(' \
                        <div id="datepicker-wrapper" class="close"> \
                            <input type="hidden" class="currentDate" value="'+currentDateFormated+'" /> \
                            <table id="calendar-table" border="0" cellspacing="0" cellpadding="0"> \
                                <thead> \
                                    <tr><th class="monthyear" colspan="7"><span class="prev"></span><span data-month="" class="month"></span> <span class="year"></span><span class="next"></span></th></tr> \
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

                    /* SET MONTH YEAR */
                    $this.setmonthyear();
                    
                    /* SET DAY */
                    $this.setday();            

                    /* SET CURRENT HOUR */
                    $this.sethour();

                    /* SET CURRENT MINUTE */
                    $this.setminute();

                    /* SET CURRENT PERIOD */
                    var periodBtn = $this.datepicker.find('.period').find('div');
                    periodBtn.attr('data-period', $this.currentDate.format('a'))
                        .html($this.currentDate.format('A'));
                    periodBtn.attr('data-offset', (periodBtn.attr('data-period') == 'am' ? '0' : '12'));
                    
                    $('body').prepend($this.datepicker);
                    return callback && typeof(callback) === 'function' ? callback() : true;
                },

                buildcalendartbody: function(){
                    var currentDateObj = $this.currentDate.toObject();
                    var totalDays = moment($this.currentDate).daysInMonth();
                    var firstDayOfMonth = moment($this.currentDate).startOf('month').format('d');
                    var lastDayOfMonth = moment($this.currentDate).endOf('month').format('d');
                    var calendarTableHTML = '';
                    
                    /* Numbers Days Grid */
                    for(i=1;i<=totalDays;i++){
                        var dow = moment([currentDateObj.years, currentDateObj.months, i]).format('d');
                        var current = currentDateObj.date == i ? ' current ' : '';

                        calendarTableHTML += '<td class="day'+current+'" data-day="'+i+'">'+i+'</td>';
                        calendarTableHTML += dow == 6 ? '</tr><tr>' : '';
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

                closeDateTimePicker: function(callback){
                    var fullHeight = $this.datepicker.outerHeight();
                    var triggerHeight = $($this.triggerObj).outerHeight();
                    var triggerHalf = $($this.triggerObj).outerHeight() / 2;
                    
                    if(!$this.datepicker.hasClass('animating')){
                        $this.datepicker.queue(function(next){
                            $this.datepicker.addClass('animating');
        
                            $this.datepicker.css({
                                height: '0px',
                                transform: 'translateY(0px)'
                            });

                            next();
                        }).delay(450).queue(function(next){
                            $this.datepicker.css('display', 'none')
                                .delay(5).queue(function(next){
                                    $this.datepicker.removeAttr('style')
                                        .removeClass('animating');
                
                                    $this.datepicker.find('.button.cancel').off('click.closedatetimepicker');

                                    next();        
                                    return callback && typeof(callback) === 'function' ? callback() : true;
                                });

                            next();
                        });
                    };

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
            
                loadtriggers: function(){
                    $($this.trigger).on('focus.datepicker.trigger', function(){
                        var datetime = $(this).val().length <= 0 ?  moment() : $(this).val();

                        $this.triggerObj = $(this);

                        if($this.datepicker.position().top > 0){
                            $this.closeDateTimePicker(function(){
                                reveal();
                            });
                        }else{
                            reveal();
                        }
                        
                        function reveal(){
                            $this.setcalendar(datetime, function(){
                                $this.revealDateTimePicker();
                                $this.datepicker.find('.button.cancel').on('click.closedatetimepicker', function(){
                                    $this.closeDateTimePicker();
                                });
                            });
                        };
                    });
                },

                revealDateTimePicker: function(){
                    var fullHeight = $this.datepicker.outerHeight();
                    var fullWidth = $this.datepicker.outerWidth();
                    var triggerY = $($this.triggerObj).offset().top;
                    var triggerX = $($this.triggerObj).offset().left;
                    var triggerYHalf = $($this.triggerObj).outerHeight() / 2;
                    var triggerXHalf = $($this.triggerObj).outerWidth() / 2;

                    $this.datepicker.css('display', 'none').delay(5).queue(function(next){
                        $this.datepicker.css({
                            top: (triggerY + triggerYHalf)+'px',
                            left: (triggerX + triggerXHalf)+'px',
                            marginLeft: '-'+(fullWidth / 2)+'px',
                            height: '0px',
                        });
                        next();
                    }).delay(5).queue(function(next){
                        $this.datepicker.css('display', 'block');
                        next();
                    }).delay(30).queue(function(next){
                        $this.datepicker.css({
                            height: fullHeight+'px',
                            transform: 'translateY(-'+(fullHeight / 2)+'px)'
                        });
                        next();
                    });
                },

                setcalendar: function(datetime, callback){
                    $this.currentDate = moment(new Date(datetime));

                    $this.datepicker.find('input.currentDate').val($this.currentDate.format($this.format));
                    $this.setmonthyear();
                    $this.updatecalendartbody();
                    $this.setday();
                    $this.sethour();
                    $this.setminute();

                    return callback && typeof(callback) === 'function' ? callback() : true;
                },

                setday: function(){
                    $this.datepicker.find('tbody td').removeClass('current').end()
                        .find('tbody td[data-day="'+$this.currentDate.format('D')+'"]').addClass('current');
                },

                sethour: function(){
                    $this.datepicker.find('.hour ul li').css({
                        top: '-'+(($this.currentDate.format('h') - 1) * 70)+'px'
                    });
                },

                setmonthyear: function(){
                    $this.datepicker.find('thead .monthyear')
                        .find('.month').attr('data-month', $this.currentDate.format('M')).html($this.currentDate.format('MMMM'))
                        .next('.year').html($this.currentDate.format('YYYY'));
                },

                setminute: function(){
                    $this.datepicker.find('.minutes ul li').css({
                        top: '-'+($this.currentDate.format('m') * 70)+'px'
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

    return DateTimePicker;
})(jQuery, moment);
