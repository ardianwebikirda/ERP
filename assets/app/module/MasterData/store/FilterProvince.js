Ext.define('ERPh.module.MasterData.store.FilterProvince',{
	extend 		: 'Ext.data.Store',
	model 		: 'ERPh.module.MasterData.model.FilterProvince',
	requires 	: [
		'ERPh.module.MasterData.model.FilterProvince'
	],
	autoLoad	: true,
	autoSync 	: false,
	root 		: {
		expanded 	: false		
	},
	proxy 		: {
		type 		: 'ajax',
		api 		: {
			read 	: BASE_URL + 'MasterData/c_province/filterProvince'
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

