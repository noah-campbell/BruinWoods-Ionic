(function() {
    'use strict';

    angular
        .module('app')
        .controller('ScheduleCtrl', ScheduleCtrl);

    ScheduleCtrl.$inject = ['$ionicScrollDelegate', 'scheduleFactory', '$scope', '$ionicPopup'];

    /* @ngInject */
    function ScheduleCtrl($ionicScrollDelegate, scheduleFactory, $scope, $ionicPopup) {
        var vm = this;
        var startHour = 6;
        var endHour = 23;
        var usehalfhour = true;

        vm.timerleft = '0px';
        vm.hours = getHours();
        vm.categories = getRooms();
        vm.events = [];

        vm.rooms = getRooms();
        vm.popup = popup;

        function activate() {

            getEvents();
        }
        activate();

        function popup(event) {
            console.log(event)
            var alertPopup = $ionicPopup.alert({
                title: event.eventname,
                template: '<label>Location : </label>' + event.room + '<br/><label>Time : </label>' + event.dateformat + ", " + event.starthour + ' - ' + event.endhour + '<br><label>Description : </label>' + event.description,
                buttons: [
                    { text: 'Cancel' }, {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            saveEvent(event.id)
                        }
                    }
                ]
            });
        }

        function saveEvent(id) {
            scheduleFactory.saveEvent(id)
                .then(function(){
                    
                }, function(err){
                    console.log(err);
                })
        }

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

        function getDays(startTime, endTime) {
            var tmp = [];
            var date1 = moment(startTime);
            var date2 = moment(endTime);


            for (var i = date1; i.isBefore(date2); i.add(1, 'day').calendar()) {
                tmp.push({
                    longdate: i.format("dddd, MMM. DD YYYY"),
                    dateformat: new Date(i).toLocaleDateString()
                })

            }
            tmp.push({
                longdate: date2.format("dddd, MMM. DD YYYY"),
                dateformat: new Date(date2).toLocaleDateString()
            });
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
                    vm.days = getDays(vm.schedule[0].startDate, vm.schedule[0].endDate);
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
        }
    }

})();
