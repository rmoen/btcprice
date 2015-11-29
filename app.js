if (Meteor.isClient) {
	angular.module('btcprice', ['angular-meteor']);
	angular.module('btcprice').controller( 'BtcPriceCtrl', ['$scope', 'blockIo', BtcPriceCtrl ] );
	function BtcPriceCtrl($scope, blockIo) {
		$scope.date = {};
		$scope.usd = 0;
		blockIo.getPrices().success(function ( res ) {
			// Set the usd data
			$scope.usd = res.data.prices[0].price;
			// Do something with the other btc currency values
			$scope.data = res.data;
		});
	}
	angular.module('btcprice').config(function (blockIoProvider) {
		 blockIoProvider.blockIoBitcoinApiKey = Meteor.settings.public.bitcoinApiKey;
	});

	angular.module('btcprice').provider('blockIo', function() {
		var self = this;
		this.$get = function($http) {
			return {
				getPrices: function () {
					var url = 'https://block.io/api/v2/get_current_price/?api_key=' + self.blockIoBitcoinApiKey;
					return $http.get(url);
				}
			};
		}
	});


}
