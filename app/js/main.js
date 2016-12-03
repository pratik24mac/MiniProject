(function() {
    'use strict';
    angular.module('miniApp', ['datatables'])
        .controller('miniController', miniController);
    miniController.$inject = ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http'];

    function miniController($scope, DTOptionsBuilder, DTColumnBuilder, $http) {
        $scope.tableData = [];
        $scope.getDate = [];
        $http.get('data.json')
            .success(function(data, status, headers, config) {
                $scope.tableData = data.appointments;
                $.each($scope.tableData, function(i, item) {
                    let rawdate = new Date($scope.tableData[i].appointment.appointmentStartTS);
                    let date = [{
                        foo: rawdate.getDate()
                    }, {
                        foo: rawdate.getMonth()
                    }, {
                        foo: rawdate.getFullYear()
                    }].map(function(elem) {
                        return elem.foo
                    }).join('/');
                    let time = [{
                        foo: rawdate.getHours()
                    }, {
                        foo: rawdate.getMinutes()
                    }].map(function(elem) {
                        return elem.foo
                    }).join(':');
                    $scope.tableData[i].appointment.appointmentStartTS = date;
                    $scope.tableData[i].appointment.appointmentStartTime = time;
                });
            });
        $scope.dtInstance = {};
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(5).withOption('order', [0, 'asc']);

        $scope.dtInstanceCallback = function(dtInstance) {
            var datatableObj = dtInstance.DataTable;
            $scope.tableInstance = datatableObj;
        }
        $scope.searchCity = function() {
            var query = $scope.city_search;
            $scope.tableInstance.search(query).draw();
        }

    }
})();