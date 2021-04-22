angular.module("app")
  .controller("productsRefundController", function($scope, productsRefundService) {
    $scope.view = "list";
    $scope.getView = () => {
      switch($scope.view) {
        case "list" : return "views/products_refund/list.html";
        case "create" : return "views/products_refund/create.html";
        case "read" : return "views/products_refund/read.html";
        case "update" : return "views/products_refund/update.html";
      }
    };

    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    }); 

    $scope.states = ["환불 중", "환불 완료"];

    $scope.getList = (pageNo) => {
      productsRefundService.list(pageNo)
        .then((response) => { //jQuery에서는 response 대신 data
          $scope.pager = response.data.pager;
          $scope.refunds = response.data.refunds;
          $scope.pageRange = [];
          for(var i = $scope.pager.startPageNo; i <= $scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };

    $scope.read = (orderNo) => {
      productsRefundService.read(orderNo)
        .then((response) => {
          $scope.refund = response.data;
          $scope.view="read";       
        })
    }

    $scope.updateRefundForm = () => {
      $scope.view="update";
    };

    $scope.updateRefund = (refund) => {
      productsRefundService.update(refund)
        .then((response) => {
          $scope.read(refund.orderNo);
          $scope.view="read"
        });
    };

    $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo);
      $scope.view = "list";
    };
  });