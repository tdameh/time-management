<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Time Management</title>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/jquery.dataTables.min.css">
        <link rel="stylesheet" href="css/angular-datatables.min.css">
        <link rel="stylesheet" href="css/bootstrap-datepicker.min.css">
        <link rel="stylesheet" href="css/angular-ui-notification.min.css">
    </head>
    <body ng-app="tmApp">
        <div class="container">
            <div ui-view></div>
        </div>        
     
    </body>

    <!-- Application Dependencies -->
    <script src="modules/jquery.min.js"></script>
    <script src="modules/jquery.dataTables.min.js"></script>
    <script src="modules/angular.min.js"></script>
    <script src="modules/angular-resource.min.js"></script>
    <script src="modules/angular-ui-router.min.js"></script>
    <script src="modules/satellizer.min.js"></script>
    <script src="modules/ngStorage.min.js"></script>
    <script src="modules/angular-datatables.min.js"></script>
    <script src="modules/bootstrap-datepicker.min.js"></script>
    <script src="modules/lodash.min.js"></script>
    <script src="modules/angular-ui-notification.min.js"></script>

    <!-- Application Scripts -->
    <script src="scripts/app.js"></script>
    <script src="scripts/authController.js"></script>
    <script src="scripts/taskController.js"></script>
    <script src="scripts/settingController.js"></script>
    <script src="scripts/exportController.js"></script>
</html>