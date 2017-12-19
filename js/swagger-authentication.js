/*
 * Orange angular-swagger-ui - v0.3.1
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular.module('swaggerUi')

	.service('swaggerAuthentication', function($q, $location, $http, swaggerModel, swaggerModules, swaggerTranslator) {

		var urlDemo, loggedIn = false, loggingError = false;
		var account = {
			"username": "leroy.cyr@demo.open-paas.org",
			"password": "secret",
			"rememberme": true,
			"recaptcha": {
				"data": {},
				"needed": false
			}
		}, accountProfile = null;

		this.execute = function(swaggerUrl, swaggerData) {
			var deferred = $q.defer();

			if (!loggedIn) {
				var scheme = swaggerData.schemes && swaggerData.schemes.length && swaggerData.schemes[0] || 'https';
				urlDemo = scheme + '://' + swaggerData.host + swaggerData.basePath + '/login';

				login(urlDemo, account, function(data) {
					loggedIn = true;
					loggingError = false;
					accountProfile = data;
					deferred.resolve(data);
				});
			} else {
				deferred.resolve(accountProfile);
			}

			return deferred.promise;
		};

		function login(urlDemo, credentials, cbSuccess) {
			var req = {
				method: 'POST',
				url: urlDemo,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: credentials
			}

			$http(req)
				.success(cbSuccess)
				.error(function(data, status) {
					loggingError = true;
				});
		}
	})

	.service('swaggerLogin', function($q, $location, $http, swaggerModel, swaggerModules, swaggerTranslator) {
		var urlDemo, loggedIn = false, loggingError = false;
		var account = {
			"username": "leroy.cyr@demo.open-paas.org",
			"password": "secret",
			"rememberme": true,
			"recaptcha": {
				"data": {},
				"needed": false
			}
		}, accountProfile = null;

		this.execute = function(response) {
			var deferred = $q.defer();

				login(urlDemo + '?continue=' + response.url, account, function(data) {
					loggedIn = true;
					loggingError = false;
					accountProfile = data;
					console.log(data);
					deferred.resolve(data);
				});

			return deferred.promise;
		};

		function login(urlDemo, credentials, cbSuccess) {
			var req = {
				method: 'GET',
				url: 'http://localhost:8080/api/user/activitystreams',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}
			var strin = 'Basic ' + btoa('user0@open-paas.org' + ':' + 'secret');
			$http.defaults.headers.common['Authorization'] = strin;

			$http(req)
				.success(cbSuccess)
				.error(function(data, status) {
					loggingError = true;
				});
		}
	})

	.service('swaggerJohns', function($q, $location, $http, swaggerModel, swaggerModules, swaggerTranslator) {

		var urlDemo, loggedIn = false, loggingError = false;
		var account = {
			"username": "leroy.cyr@demo.open-paas.org",
			"password": "secret",
			"rememberme": true,
			"recaptcha": {
				"data": {},
				"needed": false
			}
		}, accountProfile = null;

		this.execute = function(options) {
			var deferred = $q.defer();

			var strin = 'Basic ' + btoa(account.username  + ':' + account.password);
			options.headers['Authorization'] = strin;

			deferred.resolve(options);

			return deferred.promise;
		}

	})

	.run(function(swaggerModules, swaggerAuthentication, swaggerLogin, swaggerJohns) {
//		swaggerModules.add(swaggerModules.BEFORE_PARSE, swaggerLogin);
		swaggerModules.add(swaggerModules.BEFORE_EXPLORER_LOAD, swaggerJohns);
	});
