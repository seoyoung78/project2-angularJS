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
      $scope.getList(1, "전체" , "전체");
    }); 

    $scope.stateList = ["전체", "환불 중", "환불 완료"];
    $scope.stateVal = "전체";

    $scope.reasonList = ["전체", "고객 변심", "상품 불량", "서비스 불만족", "늦은 배송", "기타"]
    $scope.reasonVal = "전체";

    $scope.getList = (pageNo, stateVal, reasonVal) => {
      productsRefundService.list(pageNo, stateVal, reasonVal)
        .then((response) => { 
          $scope.pager = response.data.pager;
          $scope.refunds = response.data.refunds;
          $scope.pageRange = [];
          for(var i = $scope.pager.startPageNo; i <= $scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };

    $scope.read = (orderNo, stateVal, reasonVal) => {
      productsRefundService.read(orderNo)
        .then((response) => {
          $scope.refund = response.data;
          $scope.view="read"; 
          $scope.stateVal = stateVal;     
          $scope.reasonVal = reasonVal; 
        })
    };

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
      $scope.getList($scope.pager.pageNo, "전체", "전체");
      $scope.view = "list";
      $scope.stateVal = "전체";
      $scope.reasonVal = "전체";
    };
  });