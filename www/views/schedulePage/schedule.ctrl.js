(function() {
    'use strict';

    angular
        .module('app')
        .controller('ScheduleCtrl', ScheduleCtrl);

    ScheduleCtrl.$inject = ['$ionicScrollDelegate', 'scheduleFactory', '$scope'];

    /* @ngInject */
    function ScheduleCtrl($ionicScrollDelegate, scheduleFactory, $scope) {
        var vm = this;
        var startHour = 6;
        var endHour = 23;
        var usehalfhour = true;

        vm.timerleft = '0px';
        vm.hours = getHours();
        vm.categories = getRooms();
        vm.events = [];
        vm.days = getDays();
        vm.rooms = getRooms();


        function activate() {

            getEvents();
        }
        activate();


        function getHours() {
            var hours = [];
            for (var i = startHour; i <= endHour; i++) {
                hours.push(('0' + i).slice(-2) + ':00');
                if (usehalfhour && i < endHour) {
                    hours.push(('0' + i).slice(-2) + ':30');
                }
            }
            return hours;
        }


        function getRooms() {
            var rooms = ['Library', 'Pool'];
            var margin = 16;

            var tmp = [];
            for (var i = 0; i < rooms.length; i++) {
                tmp.push({ id: (i + 1), name: rooms[i], left: margin + '%' });
                margin += 32;
            }

            return tmp;
        }

        function getDays() {
            var tmp = [];
            var date1 = new Date();
            var date2 = new Date();
            date2.setDate(date2.getDate() + 1);
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            var monthname = new Array(12);
            monthname[0] = "January";
            monthname[1] = "February";
            monthname[2] = "March";
            monthname[3] = "April";
            monthname[4] = "May";
            monthname[5] = "June";
            monthname[6] = "July";
            monthname[7] = "August";
            monthname[8] = "September";
            monthname[9] = "October";
            monthname[10] = "November";
            monthname[11] = "December";


            tmp.push({ day: weekday[date1.getDay()], longdate: weekday[date1.getDay()] + ', ' + monthname[date1.getMonth()] + ' ' + date1.getDate() + ', ' + date1.getFullYear(), datevalue: date1, dateformat: date1.toLocaleDateString() });
            tmp.push({ day: weekday[date2.getDay()], longdate: weekday[date2.getDay()] + ', ' + monthname[date2.getMonth()] + ' ' + date2.getDate() + ', ' + date2.getFullYear(), datevalue: date2, dateformat: date2.toLocaleDateString() });
            console.log(tmp);
            return tmp;
        }

        vm.gotScrolled = function() {
            vm.timerleft = $ionicScrollDelegate.getScrollPosition().left + 'px';
            $scope.$apply();
        };

        function getEvents() {
            /*var tmp = [];*/
            var date1 = new Date();
            var events = [];

            //make get request for schedule.
            scheduleFactory.getSchedule()
                .then(function(schedule) {
                    vm.schedule = schedule;
                    console.log("schedules" + JSON.stringify(schedule[0]));
                    vm.schedule[0].eventIds.forEach(function(event) {
                        var Event = {
                            id: event._id,
                            eventname: event.name,
                            starthour: new Date(event.startTime).getHours() + ':' + new Date(event.startTime).getMinutes(),
                            endhour: new Date(event.endTime).getHours() + ':' + new Date(event.endTime).getMinutes(),
                            room: event.location,
                            description: event.description,
                            dateformat: new Date(event.startTime).toLocaleDateString(),
                        }

                        for (var i = 0; i < vm.rooms.length; i++) {
                            if (event.location == vm.rooms[i].name) {
                                console.log(vm.rooms[i].name);
                                Event.left = vm.rooms[i].left;
                                //Event.color = vm.rooms[i].color;
                            }
                        }

                        Event.height = ((new Date(event.endTime) - new Date(event.startTime)) / 36000) + 'px';
                        var hours = Math.floor(new Date(event.startTime).getHours() - 6) * 2;
                        var minutes = (Math.floor(new Date(event.startTime).getMinutes()) / 30);
                        var intervals = hours + minutes;
                        Event.top = (23 + (intervals * 50)) + 'px';

                        vm.events.push(Event);
                    });
                    console.log(vm.events);

                })
        };

        /*tmp.push({ eventname: 'Presentation 1', starthour: '08:00', endhour: '09:30', eventtype: 'ion-mic-c', room: 'Morpheus', left: (60 + 0 * 120) + 'px', top: (23 + 1 * 100) + 'px', height: (1.5 * 100) + 'px', color: 'rgba(0,157,151,0.75)', dateformat: date1.toLocaleDateString() });
        tmp.push({ eventname: 'Coffee Break', starthour: '09:30', endhour: '10:00', eventtype: 'ion-coffee', room: 'Morpheus', left: (60 + 0 * 120) + 'px', top: (23 + 2.5 * 100) + 'px', height: (0.5 * 100) + 'px', color: 'rgba(255,169,0,0.75)', dateformat: date1.toLocaleDateString() });
        tmp.push({ eventname: 'Presentation 2', starthour: '10:00', endhour: '11:45', eventtype: 'ion-mic-c', room: 'Morpheus', left: (60 + 0 * 120) + 'px', top: (23 + 3 * 100) + 'px', height: (1.75 * 100) + 'px', color: 'rgba(0,157,151,0.75)', dateformat: date1.toLocaleDateString() });
        tmp.push({ eventname: 'Networking + Coffee', starthour: '12:00', endhour: '14:00', eventtype: 'ion-chatbubbles', room: 'Morpheus', left: (60 + 0 * 120) + 'px', top: (23 + 5 * 100) + 'px', height: (1.75 * 100) + 'px', color: 'rgba(18,67,172,0.75)', dateformat: date1.toLocaleDateString() });
        tmp.push({ eventname: 'Presentation 3', starthour: '14:30', endhour: '18:00', eventtype: 'ion-mic-c', room: 'Morpheus', left: (60 + 0 * 120) + 'px', top: (23 + 7.5 * 100) + 'px', height: (2.5 * 100) + 'px', color: 'rgba(0,157,151,0.75)', dateformat: date1.toLocaleDateString() });
        tmp.push({ eventname: 'Dinner', starthour: '19:00', endhour: '21:00', eventtype: 'ion-wineglass', room: 'Morpheus', left: (60 + 0 * 120) + 'px', top: (23 + 12 * 100) + 'px', height: (2 * 100) + 'px', color: 'rgba(255,113,0,0.75)', dateformat: date1.toLocaleDateString() });

        tmp.push({ eventname: 'Presentation 4', starthour: '08:00', endhour: '11:00', eventtype: 'ion-mic-c', room: 'Trinity', left: (60 + 2 * 120) + 'px', top: (23 + 1 * 100) + 'px', height: (3 * 100) + 'px', color: 'rgba(0,157,151,0.75)', dateformat: date1.toLocaleDateString() });
        tmp.push({ eventname: 'Presentation 5', starthour: '11:00', endhour: '12:00', eventtype: 'ion-mic-c', room: 'Trinity', left: (60 + 2 * 120) + 'px', top: (23 + 4 * 100) + 'px', height: (1 * 100) + 'px', color: 'rgba(0,157,151,0.75)', dateformat: date1.toLocaleDateString() });
        tmp.push({ eventname: 'Networking + Coffee', starthour: '12:00', endhour: '14:00', eventtype: 'ion-chatbubbles', room: 'Trinity', left: (60 + 2 * 120) + 'px', top: (23 + 5 * 100) + 'px', height: (1.75 * 100) + 'px', color: 'rgba(18,67,172,0.75)', dateformat: date1.toLocaleDateString() });
        tmp.push({ eventname: 'Presentation 6', starthour: '14:30', endhour: '16:00', eventtype: 'ion-mic-c', room: 'Trinity', left: (60 + 2 * 120) + 'px', top: (23 + 7.5 * 100) + 'px', height: (1.5 * 100) + 'px', color: 'rgba(0,157,151,0.75)', dateformat: date1.toLocaleDateString() });*/
        //
        //
        //Presentation - 0,157,151 -- ion-mic-c
        //Networking 18,67,172 -- ion-chatbubbles
        //Coffee Break 255,169,0, --ion-coffee
        //Dinner 255,113,0 --ion-wineglass

    };

})();
