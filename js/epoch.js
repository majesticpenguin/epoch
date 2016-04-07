var Epoch = (function($, moment, Hammer){

    function Epoch(options){
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

    Epoch.prototype = {

        /**
         * init
         * constructor
         * buildcalendar
         * buildcalendartbody
         * buildmonthyearbody
         * closeDateTimePicker
         * initbuttons
         * loadtouchevents
         * loadtriggers
         * revealDateTimePicker
         * scrollvalue
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

                months: {
                    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                },

                keycodes: {
                    "48":"0",
                    "49":"1",
                    "50":"2",
                    "51":"3",
                    "52":"4",
                    "53":"5",
                    "54":"6",
                    "55":"7",
                    "56":"8",
                    "57":"9"
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
                        hoursHTML += '<li class="'+current+'" data-value="'+i+'"><input type="text" value="'+i+'" maxlength="2" /></li>';
                    }

                    /* Minutes */
                    var minutesHTML = '';
                    var currentMinute = $this.currentDate.format('mm');
                    for(i=0;i<60;i++){
                        var zero = i < 10 ? 0 : '';
                        var current = currentMinute == zero+i ? ' current ' : '';
                        minutesHTML += '<li class="'+current+'" data-value="'+zero+i+'"><input type="text" value="'+zero+i+'" maxlength="2" /></li>';
                    }

                    $this.datepicker = $(' \
                        <div id="datepicker-wrapper" class="close"> \
                            <input type="hidden" class="currentDate" value="'+currentDateFormated+'" /> \
                            <table id="calendar-header" border="0" cellspacing="0" cellpadding="0"> \
                                <thead><tr><th class="monthyear"><span class="prev"></span><span data-month="" class="month"></span><span class="year"></span><span class="next"></span></th></tr></thead> \
                            </table> \
                            <div id="datetime-monthyear-wrapper"> \
                                <div id="datetime-wrapper" class="animate show"> \
                                    <table id="calendar-table" border="0" cellspacing="0" cellpadding="0"> \
                                        <thead><tr>'+calendarHeaderHTML+'</tr></thead> \
                                        <tbody>'+calendarTableHTML+'</tbody> \
                                    </table> \
                                    <div id="timepicker-wrapper"> \
                                        <div class="hour scroller"><div class="up"></div><ul>'+hoursHTML+'</ul><div class="down"></div></div> \
                                        <div class="colon">:</div> \
                                        <div class="minutes scroller"><div class="up"></div><ul>'+minutesHTML+'</ul><div class="down"></div></div> \
                                        <div class="period"><div data-period="am" data-offset="0">AM</div></div> \
                                    </div> \
                                </div> \
                                <div id="monthyear-wrapper" class="animate hide"></div> \
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

                buildmonthyearbody: function(options, callback){
                    options = $.extend(true, {
                        year: $this.currentDate.format('YYYY'),
                        month: $this.currentDate.format('MM')
                    }, options);
                    var currentMonthYear = $this.currentDate.format('YYYY')+$this.currentDate.format('MM');
                    var calendarMonthYearHTML = '';

                    var i = 1;
                    $($this.months.short).each(function(k, v){
                        var monthNumber = k <= 10 ? '0'+(k + 1) : (k + 1);
                        var currentClass = currentMonthYear == options.year+monthNumber ? ' selected ' : '';
console.log(currentMonthYear);
console.log(options.year+monthNumber);

                        calendarMonthYearHTML += '<td value="'+k+'"><div class="monthyear'+currentClass+'"><div class="year">'+options.year+'</div><div class="month">'+v+'</div></div></td>';
                        calendarMonthYearHTML += i == 3 ? '</tr><tr>' : '';

                        i = i == 3 ? 1 : (i + 1);
                    }).promise().done(function(){
                        $('#monthyear-wrapper').html('').append('<table><tbody><tr>'+calendarMonthYearHTML+'</tr></tbody></table>');
                        return callback && typeof(callback) === 'function' ? callback() : true;
                    });
                },

                closeDateTimePicker: function(callback){
                    var fullHeight = $this.datepicker.outerHeight();
                    var triggerHeight = $($this.triggerObj).outerHeight();
                    var triggerHalf = $($this.triggerObj).outerHeight() / 2;
                    
                    if($this.datepicker.not(':animated')){
                        $this.datepicker.queue(function(next){
                            $this.datepicker.css({
                                height: '0px',
                                transform: 'translateY(0px)',
                                overflow: 'hidden'
                            });

                            next();
                        }).delay(450).queue(function(next){
                            $this.datepicker.css('display', 'none')
                                .delay(15).queue(function(next){
                                    $this.datepicker.removeAttr('style');
                
                                    $this.datepicker.find('.button.cancel').off('click.closedatetimepicker');
                                    $this.datepicker.find('.button.set').off('click.setdatetime');

                                    next();        
                                    return callback && typeof(callback) === 'function' ? callback() : true;
                                });

                            next();
                        });
                    };

                },
        
                initbuttons: function(){
                    var keyTyped = '';

                    $('#datepicker-wrapper').on('click.scroller.up', '.up', function(event){
                        $this.scrollvalue({
                            wrapper: $(this).closest('.scroller'),
                            direction: 'up'
                        });
                        event.stopImmediatePropagation();
                    }).on('click.scroller.down', '.down', function(event){
                        $this.scrollvalue({
                            wrapper: $(this).closest('.scroller'),
                            direction: 'down'
                        });
                        event.stopImmediatePropagation();
                    }).on('click.scroller.value', '.scroller input', function(event){
                        $(this).val($(this).parent('li').attr('data-value'));

                        event.stopImmediatePropagation();
                    }).on('keydown keypress', '.scroller input', function(event){
                        event.preventDefault();

                        event.stopImmediatePropagation();
                    }).on('keyup.scroller.value', '.scroller input', function(event){
                        keyTyped = keyTyped+$this.keycodes[event.keyCode];
                        var _wrapper = $(this).closest('.scroller');
                        var _firstNumber = parseInt(_wrapper.find('ul li:first-child').attr('data-value'), 10);

                        var _keyTyped = parseInt(keyTyped, 10);
                        if(_keyTyped >= _firstNumber){
                            $this.scrollvalue({
                                wrapper: _wrapper,
                                scrollTo: _keyTyped,
                                baseValue: _firstNumber,
                            });
                        }

                        setTimeout(function(){
                            keyTyped = '';
                        }, 500);

                        event.preventDefault();
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
                            $this.monthyear-wrapperupdatecalendartbody();
                        monthyear-wrapper});

                        event.stopImmediatePropagation();
                    }).on('click.monthyear.view', '#calendar-header .month, #calendar-header .year', function(){
                        $this.buildmonthyearbody({
                        }, function(){
                            $('#datetime-wrapper').toggleClass('show hide');
                            $('#monthyear-wrapper').toggleClass('show hide');    
                        });
                    });
                },

                loadtouchevents: function(){
                    $(document).hammer().on('swipeup', '.scroller', function(){
                        $this.scrollvalueup({
                            wrapper: $(this)
                        }); 
                    });
                },
            
                loadtriggers: function(){
                    $($this.trigger).attr('readonly', 'readonly').css('user-select', 'none');

                    $($this.trigger).on('click.datepicker.trigger', function(event){
                        event.stopImmediatePropagation();
                        var datetime = $(this).val().length <= 0 ?  moment() : $(this).val();

                        $this.triggerObj = $(this);
                        if($this.datepicker.is(':visible')){
                            $this.closeDateTimePicker(function(){
                                _reveal();
                            });
                        }else{
                            _reveal();
                        }
                        
                        function _reveal(){
                            $this.setcalendar(datetime, function(){
                                $this.revealDateTimePicker();

                                $this.datepicker.find('.button.cancel').on('click.closedatetimepicker', function(){
                                    $this.closeDateTimePicker();
                                    _destroyCloseTriggers();
                                });

                                $this.datepicker.find('.button.set').on('click.closedatetimepicker', function(){
                                    _updateDatePicker();
                                    $this.closeDateTimePicker();
                                    _destroyCloseTriggers();
                                });

                                $('#datepicker-wrapper').on('mouseover', function(){
                                    $('body').off('click.closedatetimepicker');
                                }).on('mouseout', function(){
                                    $('body').css('z-index', '0')
                                        .on('click.closedatetimepicker', function(){
                                            if($('#datepicker-wrapper').not(':hover')){
                                                _updateDatePicker();
                                                $this.closeDateTimePicker();
                                                _destroyCloseTriggers();
                                            }
                                        });
                                });

                                function _destroyCloseTriggers(){
                                    $this.datepicker.find('.button.cancel').off('click.closedatetimepicker');
                                    $this.datepicker.find('.button.set').off('click.closedatetimepicker');
                                    $('body').off('click.closedatetimepicker');
                                }

                                
                                function _updateDatePicker(){
                                    $this.triggerObj
                                        .val($this.datepicker.find('input.currentDate').val())
                                        .attr('readonly', 'readonly');
                                }
                           });
                        };
                    });/*.on('blur.closedatetimepicker', function(){
                        $this.triggerObj.removeAttr('readonly')
                            .val($this.datepicker.find('input.currentDate').val())
                            .attr('readonly', 'readonly');

                        $this.closeDateTimePicker();
                    });*/
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
                            overflow: 'hidden'
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
                    }).delay(150).queue(function(next){
                        $this.datepicker.css('overflow', 'visible');
                        next();
                    });
                },

                scrollvalue: function(options){
                    options = $.extend(true, {
                        wrapper: false,
                        direction: 'down', //up or down
                        scrollTo: -1,
                        baseValue: 1,
                    }, options);

                    var ul = options.wrapper.find('ul');
                    var current = ul.find('li.current');
                    var cloned = false;
                    var liHeight = 70;

                    var minValue = ul.find('li').first().attr('data-value');
                    var maxValue = ul.find('li').last().attr('data-value');

                    if(options.scrollTo >= 0){
                        if(options.scrollTo < minValue || options.scrollTo > maxValue){
                            return false;
                        }

                        var liTotal = ul.children('li').length;
                        var newTop = -Math.abs(liHeight * (options.scrollTo - options.baseValue));
                        var newValue = options.scrollTo < 10 ? '0'+options.scrollTo : options.scrollTo;

                        ul.children('li').css('top', newTop);
                        ul.children('li').removeClass('current');
                        ul.find('li[data-value="'+newValue+'"]').addClass('current');
                    }else{
                        switch(options.direction){
                            case 'up':
                                var looper = -Math.abs(((ul.find('li').length - 1) * liHeight));
                                var clone = ul.find('li:last-child').clone();
                                var looperTop = '0px';
                                var animationDirection = '-='+liHeight+'px';
                                var nextCurrent = current.next('li');
                                var finalCurrent = ul.find('li:first-child');
                            break;
                            case 'down':
                                var looper = 0;
                                var clone = ul.find('li:first-child').clone();
                                var looperTop = '-'+(ul.find('li').length * liHeight)+'px';
                                var animationDirection = '+='+liHeight+'px';
                                var nextCurrent = current.prev('li');
                                var finalCurrent = ul.find('li:last-child');
                            break;
                        }
        
                        if(ul.find('li:first-child').position().top == looper){
                            cloned = true;
                            options.direction == 'up' ? ul.prepend(clone) : ul.append(clone);
                            ul.find('li').css('top', looperTop);
                        }
            
                        ul.find('li:not(:animated)').animate({
                            top: animationDirection
                        }, function(){
                            ul.children('li').removeClass('current');
                            nextCurrent.addClass('current');

                            if(cloned){
                                clone.remove();
                                finalCurrent.addClass('current');
                                options.direction == 'up' ? ul.find('li').css('top', '0px') : false;
                            }
                        });
                    }

                    $this.updatecurrentdate();
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
                    $this.datepicker.find('#datetime-monthyear-wrapper > #datetime-wrapper tbody').html(calendarTbodyHTML);
                },

                updatecurrentdate: function(callback){
                    var year = $this.datepicker.find('thead .monthyear .year').html();
                    var month = (moment().month($this.datepicker.find('thead .monthyear .month').html()).format('MM'));
                    var day = $this.datepicker.find('tbody td.current').html();
                    var hour = parseInt($this.datepicker.find('#timepicker-wrapper .hour li.current input').val()) + parseInt($this.datepicker.find('#timepicker-wrapper .period > div').attr('data-offset'));
                    var minutes = $this.datepicker.find('#timepicker-wrapper .minutes li.current input').val();

                    hour = hour == '24' ? '0' : hour;
                    month = month - 1;
                    //console.log(year+' '+month+' '+day+' '+hour+' '+minutes);

                    $this.currentDate = moment([year, month, day, hour, minutes]);
                    $this.datepicker.find('input.currentDate').val($this.currentDate.format($this.format));

                    return callback && typeof(callback) === 'function' ? callback() : true; 
                }
            }
    
            return callback && typeof(callback) === 'function' ? callback($this) : $this;
        }
    }   

    return Epoch;
})(jQuery, moment, Hammer);
