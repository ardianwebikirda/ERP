Ext.define('ERPh.module.MasterData.store.MinProvince',{
	extend 		: 'Ext.data.Store',
	model 		: 'ERPh.module.MasterData.model.MinProvince',
	requires 	: [
		'ERPh.module.MasterData.model.MinProvince'
	],
	autoLoad	: true,
	autoSync 	: false,
	root 		: {
		expanded 	: false		
	},
	proxy 		: {
		type 		: 'ajax',
		api 		: {
			read 	: BASE_URL + 'MasterData/c_province/viewProvince'
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

