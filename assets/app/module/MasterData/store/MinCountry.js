Ext.define('ERPh.module.MasterData.store.MinCountry',{
	extend 		: 'Ext.data.Store',
	model 		: 'ERPh.module.MasterData.model.MinCountry',
	requires 	: [
		'ERPh.module.MasterData.model.MinCountry'
	],
	autoLoad	: true,
	autoSync 	: false,
	root 		: {
		expanded 	: false		
	},
	proxy 		: {
		type 		: 'ajax',
		api 		: {
			read 	: BASE_URL + 'MasterData/c_country/viewCountry'
		},
		actionMethdos	: {
			read 	: 'POST'
		},
		reader		: {
			type 			: 'json',
			root 			: 'data',
			successProerty 	: 'success',
			totalProperty 	: 'total'
		},
		writer 		: {
			type 			: 'json',
			writeAllFields	: true,
			root 			: 'data',
			encode 			: true
		}
	}
});

