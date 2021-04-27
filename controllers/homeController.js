angular.module("app")
.controller("homeController", function($scope, ordersService, $rootScope, productService, userService, ordersService, productsRefundService, qnaService, reviewsService) { 
    $scope.$on("$routeChangeSuccess", () => {
        $scope.readProductCount();
        $scope.readUserCount();
        $scope.readOrderCount();
        $scope.readRefundCount();
        $scope.readReviewCount();
        $scope.readQnaCount();
        $scope.bestMain();
      });

     // 상품별 개수 가져오기
     $scope.productCount = [
        {value:""},
        {value:""},
        {value:""},
        {value:""},
        {value:""}
      ];
      $scope.readProductCount = () => {
          productService.readCount(0)
            .then((response) => {
              $scope.productCount[0].value = response.data;
              //console.log($scope.productCount[0].value);
          });
          productService.readCount(1)
            .then((response) => {
              $scope.productCount[1].value = response.data;
              //console.log($scope.productCount[1].value);
          });
          productService.readCount(2)
          .then((response) => {
            $scope.productCount[2].value = response.data;
            //console.log($scope.productCount[2].value);
          });
          productService.readCount(3)
          .then((response) => {
            $scope.productCount[3].value = response.data;
            //console.log($scope.productCount[3].value);
          });
          productService.readCount(4)
          .then((response) => {
            $scope.productCount[4].value = response.data;
            //console.log($scope.productCount[4].value);
          });
      };
      
       //회원 상태별 인원
    $scope.userCount = [
      {value:""},
      {value:""},
      {value:""}
    ];
    $scope.readUserCount = () => {
        userService.readCount(0)
          .then((response) => {
            $scope.userCount[0].value = response.data;
            //console.log("확인",$scope.userCount[0].value);
        });
        userService.readCount(1)
          .then((response) => {
            $scope.userCount[1].value = response.data;
            //console.log($scope.userCount[1].value);
        });
        userService.readCount(2)
        .then((response) => {
          $scope.userCount[2].value = response.data;
          //console.log($scope.userCount[2].value);
        });
    };   
    
    //주문
    $scope.orderCount = [
      {value:""},
      {value:""},
      {value:""}
    ];
    $scope.readOrderCount = () => {
      ordersService.readCount(0)
          .then((response) => {
            $scope.orderCount[0].value = response.data;
            //console.log($scope.orderCount[0].value);
        });
        ordersService.readCount(1)
          .then((response) => {
            $scope.orderCount[1].value = response.data;
            //console.log($scope.orderCount[1].value);
        });
        ordersService.readCount(2)
        .then((response) => {
          $scope.orderCount[2].value = response.data;
          //console.log($scope.orderCount[2].value);
        });
    };  

    //환불
    $scope.refundCount = [
      {value:""},
      {value:""},
      {value:""}
    ];

    $scope.readRefundCount = () => {
      productsRefundService.count(0)
        .then((response) => {
          $scope.refundCount[0].value = response.data;
           //console.log("REFUND",$scope.refundCount[0].value);
        });
      productsRefundService.count(1)
        .then((response) => {
          $scope.refundCount[1].value = response.data;
          //console.log($scope.refundCount[1].value);
        });
      productsRefundService.count(2)
        .then((response) => {
          $scope.refundCount[2].value = response.data;
          //console.log($scope.refundCount[2].value);
        });
    };

    //리뷰
    $scope.reviewCount = [
      {value:""},
      {value:""},
      {value:""}
    ];

    $scope.readReviewCount = () => {
      reviewsService.count(0)
        .then((response) => {
          $scope.reviewCount[0].value = response.data;
          //console.log($scope.reviewCount[0].value);
        });
        reviewsService.count(1)
        .then((response) => {
          $scope.reviewCount[1].value = response.data;
          //console.log($scope.reviewCount[1].value);
        });
        reviewsService.count(2)
        .then((response) => {
          $scope.reviewCount[2].value = response.data;
          //console.log($scope.reviewCount[2].value);
        });
    };

    //문의
    $scope.qnaCount = [
      {value:""},
      {value:""},
      {value:""}
    ];
    $scope.readQnaCount = () => {
      qnaService.readCount(0)
          .then((response) => {
            $scope.qnaCount[0].value = response.data;
            //console.log($scope.qnaCount[0].value);
        });
        qnaService.readCount(1)
          .then((response) => {
            $scope.qnaCount[1].value = response.data;
            //console.log($scope.qnaCount[1].value);
        });
        qnaService.readCount(2)
        .then((response) => {
          $scope.qnaCount[2].value = response.data;
          //console.log($scope.qnaCount[2].value);
        });
    };

    $scope.bestMain = () => {

      productService.bestMain()
        .then((response) => {
          $scope.blist = response.data.blist;
          $scope.nlist = response.data.nlist;
        })
  
    };
  });