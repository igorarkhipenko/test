app.factory('ContactFactory', function(localStorageService, $window) {
	var initializeContactsList = function() {
		return [
		{ name: 'Igor', email: 'jagger173@gmail.com', city: 'Kharkiv'},
		{ name: 'Katya', email: 'katyatemruk@gmail.com', city: 'Donetsk'},
		{ name: 'Dima', email: 'rstkarenin@mail.ru', city: 'Henzhik'}]
	}

	return {
		getContactsList: function() {
			var contactsList = localStorageService.get('contactsList');

			if (contactsList == null) {
				contactsList = initializeContactsList();
			}

			return contactsList;
		},

		pushContact: function(newContact) {
			var contactsList = this.getContactsList();

			contactsList.push(newContact);
			localStorageService.set('contactsList', contactsList);
		},

		removeContact: function(index) {
			var contactsList = this.getContactsList();

			contactsList.splice(index, 1);
			localStorageService.set('contactsList', contactsList);
		},

		updateContact: function(index, name, email, city) {
			var contactsList = this.getContactsList();
			
			contactsList[index] = { name: name, email: email, city: city };
			localStorageService.set('contactsList', contactsList);
		},

		getContactInfo: function(index) {
			var contactsList = this.getContactsList();

			return contactsList[index];
		},

		clear: function () {
            $window.localStorage.clear();
        }
	}
})