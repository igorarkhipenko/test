var app = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);

app.config(function($routeProvider, localStorageServiceProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'view/main.html',
		controller: 'mainCtrl'
	})
	.when('/contact/:id', {
		templateUrl: 'view/contact.html',
		controller: 'contactCtrl'
	})
	.otherwise({
		template: 'deez nutz'
	})

	localStorageServiceProvider
	.setStorageType('localStorage')
	.setDefaultToCookie(false)
})

app.controller('mainCtrl', function($scope, ContactFactory, localStorageService) {
	$scope.contacts = ContactFactory.getContactsList();
	
	$scope.addContact = function() {
		if (!$scope.formName || !$scope.formEmail || !$scope.formCity ) return;

		var newContact = {
			name: $scope.formName, 
			email: $scope.formEmail, 
			city: $scope.formCity
		};
		ContactFactory.pushContact(newContact);
		$scope.contacts = ContactFactory.getContactsList();

		$scope.formName = '';
		$scope.formCity = '';
		$scope.formEmail = '';
	}

	$scope.removeContact = function(index) {
		ContactFactory.removeContact(index);
		$scope.contacts = ContactFactory.getContactsList();
	}
})

app.controller('contactCtrl', function($scope, $routeParams, ContactFactory) {
	var contactId = ContactFactory.getContactInfo($routeParams.id);
	console.log(contactId);
})