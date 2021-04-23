angular.module("app")
.controller("qnaController", function($scope, qnaService, $rootScope) { 
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList("",1);
    });

    $scope.view = "list"; //처음에는 list가 보여짐
    $scope.getView = () => {
      switch($scope.view) {
        case "list": return "views/qna/list.html"
        case "read": return "views/qna/read.html"
        case "update": return "views/qna/update.html"
      }
    };

    $scope.getList = (keyword, pageNo) => {
        qnaService.list(keyword, pageNo)
      .then((response) => { //데이터가 성공적으로 오게 되면 response 객체 얻음
        $scope.pager = response.data.pager; //상태변수에 담음. 왜? 상태변수에 담지 않으면 바인딩을 할 수가 없음. 상태 변수에 반드시 저장!!!!
        $scope.qna = response.data.qna;
        $scope.pageRange = []; //배열 선언
        for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
          $scope.pageRange.push(i);
        }
        $scope.view = "list";
      });
    };

    $scope.read = (keyword,qnaNo) => {
      console.log(keyword);
        qnaService.read(qnaNo)
        .then((response) => {
          $scope.qna = response.data;
          $scope.view = "read"; //read라는 view를 보여주기
          $scope.keyword=keyword;
        });
    };

  $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo);
      $scope.view = "list";
  };

  $scope.updateQnaForm = () => {
    $scope.view = "update";
  };

  $scope.updateQna = (qna) => {
   
    
     if(qna.answerContent){
      qnaService.update(qna)
        .then((response) => {
          $scope.read(qna.qnaNo);
          $scope.view = "read";
        });
      }
  };

  $scope.deleteQna = (qnaNo) => {
    console.log(qnaNo);
    qnaService.delete(qnaNo)
      .then((response) => {
        $scope.getList(1); //1페이지로 돌아옴
        $scope.view = "list";
      });
  };
  });