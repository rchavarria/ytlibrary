<!doctype html>
<html lang="en" ng-app="youtubelib">

<head>
  <meta charset="utf-8">
  <title>A Youtube library in PHP and JavaScritp</title>
  
  <!-- style sheets -->
  <link rel="stylesheet" href="css/bootstrap.css"/>
  <link rel="stylesheet" href="css/youtubelib.css"/>
  <link rel="stylesheet" href="css/animations.css"/>
  <script type="text/javascript">
    var USER_NAME = "<? echo $_GET['user'] ?>";
  </script>
</head>

<body>
  <h1 class="text-center">Youtube library</h1>
  <div id="content" ng-controller="LibraryCtrl">
    <div id="left-column">
      <h3 class="text-center">Library: {{ library.name }} 
        <i class="clickable glyphicon glyphicon-plus-sign" ng-click="showSearch()"></i>
      </h3>

      <hr />

      <ul class="list-unstyled" dnd-target="">
        <li class="animate-repeat" ng-repeat="item in library.videos">
          <div class="box">
            <span class="glyphicon glyphicon-remove-sign clickable" ng-click="removeVideo(item.id)"></span>
            <span class="clickable" ng-click="showVideo(item)">{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>
    
    <div id="main-panel">
      <div class="main-panel-content {{ shouldShowVideoClass }}">
        <h4>{{ currentVideo.title }}</h4>
        <iframe width="420" 
                height="315"
                ng-src="{{ currentVideo.url }}"
                frameborder="0"
                allowfullscreen></iframe>
      </div>

      <div class="main-panel-content {{ shouldShowSearchClass }}">
        <form class="form-horizontal" role="form" name="searchForm" novalidate>
          <div class="form-group">
            <label for="searchText" class="col-lg-5 control-label">Search for:</label>
            <div class="col-lg-6">
              <input type="search" class="form-control" name="searchText" 
                     placeholder="Enter text to search"
                     ng-model="criteria.text" 
                     required />
            </div>
          </div>
          <div class="form-group">
            <label for="searchNResults" class="col-lg-5 control-label">Display n first results:</label>
            <div class="col-lg-2">
              <input type="number" class="form-control" name="searchNResults" 
                     min="1" max="5"
                     ng-model="criteria.firstNResults" 
                     required />
            </div>
            <div class="col-lg-offset-3 col-lg-1">
              <button type="submit" class="btn btn-primary" 
                      ng-click="search()" 
                      ng-disabled="searchForm.$invalid">
                <i class="glyphicon glyphicon-search"></i>
              </button>
            </div>
          </div>
          <div class="form-group col-lg-11">
            <div ng-show="searchForm.searchText.$dirty && searchForm.searchText.$invalid" class="error">
              Some text to search should be entered
            </div>
            <div ng-show="searchForm.searchNResults.$invalid" class="error">
              Number of results should be between 1 and 5
            </div>
          </div>
        </form>

        &nbsp;

        <div class="container" ng-repeat="result in searchResults">
          <form name="form-video-{{result.id}}" role="form" class="form-horizontal">
            <div class="form-group">
              <div class="col-lg-11">
                <input type="text" class="form-control" id="title-{{result.id}}" 
                       value="{{ result.title }}" />
              </div>    
              <button type="submit" class="btn btn-default" 
                      ng-click="addVideo('{{ result.id }}')">
                <i class="glyphicon glyphicon-plus-sign" ></i>
              </button>
            </div>
          </form>
          <div class="video-thumbnail text-center">
            <img ng-src="{{ result.thumbnail.sqDefault }}" id="{{result.id}}" dnd-origin="">
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>

  <!-- JavaScript files -->
  <script src="lib/angular/angular.js"></script>
  <script src="lib/angular/angular-animate.js"></script>

  <!-- youtubelib JavaScritp code -->
  <script src="js/youtubelib.js"></script>
  <script src="js/services.js"></script>
  <script src="js/directives.js"></script>
</body>
</html>
