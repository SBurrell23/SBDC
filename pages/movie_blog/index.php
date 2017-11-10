<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>

	<style type="text/css">
		.movieBlogTable{}
		.movieBlogTable thead tr th{padding:6px!important;}
		.movieBlogTable tbody tr td{padding:6px!important;}
		.sortorder:after {content: '\25b2';}
		.sortorder.reverse:after {content: '\25bc';}
		a{color: #546e7a;}
		td a{color:#039be5;}
		.sortorder{color:#546e7a;}
	</style>

	<script type="text/javascript">
		var app = angular.module('movieBlog', []);

		app.controller('movieBlogController', function($scope, $filter, $http) {
			$scope.data = [];
			$scope.getData = function(){
				$http({
				  method: 'GET',
				  params: { 'time': new Date().getTime() },
				  url: './pages/movie_blog/movieData.json'
				}).then(function successCallback(response) {
					console.log(response);
					$scope.resetCount = 0;
					$scope.predicate = '';
					$scope.data = response.data;
				});
			}

			$scope.colorRange = 10;
			$scope.getColor = function(index) {
			    var greenVal = Math.round(Math.min((255.0*1.0)*(index/($scope.colorRange-1)), 255));
			    var redVal = Math.round(Math.min((255.0*5.0)*(($scope.colorRange-1-index)/($scope.colorRange-1))));
			    return "" + redVal + "," + greenVal + ", 0, .4";
			}

			var orderBy = $filter('orderBy');
			$scope.resetCount = 0;
			$scope.order = function(predicate) {
				if($scope.resetCount == 2){
					$scope.resetCount = 0;
				}
				if($scope.predicate === predicate)
					$scope.resetCount++;
				else
					$scope.resetCount = 0;
			
			    $scope.predicate = predicate;
			    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			    $scope.data = orderBy($scope.data, predicate, $scope.reverse);
		  	}
		  	$scope.order('', true);
		});
		app.filter('movieChooserColor', function() {
		  	return function(input){
		  		switch(input){
		  			case 'Mike': return '#AB4BFF';
		  			case 'Steven': return '#4B4BFF';
		  			case 'Gary': return '#FF4BD7';
		  			case 'Both': return input;
		  		}
			}
		});
	</script>

	<br>
    <!-- Page Content -->
    <div class="container" ng-app="movieBlog" ng-controller="movieBlogController" style="min-width:820px;">
	    <!-- header -->
		<h4 class="page-header" style="margin-bottom:-5px;">Mike & Steve's Movie Blog<small ng-cloak> - {{data.length}}</small></h4>
		<div style="margin-top:-48px;margin-bottom:20px;float:right;"><input class="form-control" style="width:320px;" placeholder="Search table..." ng-model="searchText"></div>
		<div ng-cloak>
			<div ng-init='data=<?php echo file_get_contents("./pages/movie_blog/movieData.json"); ?>'>
				
				<table class="table movieBlogTable">
					<thead>
						<tr>
							<th ng-click="order('year');"       style="text-align:left;"><a href="" >Movie </a>            <span class="sortorder" ng-show="predicate === 'year'" ng-class="{reverse:reverse}"></span></th>
							<th ng-click="order('chooser');"    style="text-align:left;"><a href="" >Chooser </a>        <span class="sortorder" ng-show="predicate === 'chooser'" ng-class="{reverse:reverse}"></span></th>
							<th ng-click="order('difference');" style="text-align:center;"><a href="" >Rating Difference </a>    <span class="sortorder" ng-show="predicate === 'difference'" ng-class="{reverse:reverse}"></span></th>
							<th ng-click="order('mean');"       style="text-align:center;"><a href="" >Mean Rating </a>    <span class="sortorder" ng-show="predicate === 'mean'" ng-class="{reverse:reverse}"></span></th>
							<th ng-click="order('mike');"       style="text-align:center;"> <a href="" >Mike's Rating </a>  <span class="sortorder" ng-show="predicate === 'mike'" ng-class="{reverse:reverse}"></span></th>
							<th ng-click="order('steven');"     style="text-align:center;"> <a href="" >Steven's Rating </a><span class="sortorder" ng-show="predicate === 'steven'" ng-class="{reverse:reverse}"></span></th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="movie in data | filter:searchText">
							<td style="text-align:left;   background-color: rgba({{getColor(movie.mean)}});"><a target="_blank"  href="{{movie.link}}">{{movie.title}}</a> ({{movie.year}})</td>
							<td style="text-align:left; background-color: rgba({{getColor(movie.mean)}}); color:{{movie.chooser | movieChooserColor}}">{{movie.chooser}}</td>
							<td style="text-align:center; background-color: rgba({{getColor(movie.mean)}});">{{movie.difference}}</td>
							<td style="text-align:center; background-color: rgba({{getColor(movie.mean)}});">{{movie.mean}}</td>
							<td style="text-align:center;  background-color: rgba({{getColor(movie.mike)}}); border-left:2px solid #DDD;">{{movie.mike}}</td>
							<td style="text-align:center;  background-color: rgba({{getColor(movie.steven)}});">{{movie.steven}}</td>
							
						</tr>
					</tbody>
				</table>
			</div>	
		</div>
		<br>
		<br>
	</div>
