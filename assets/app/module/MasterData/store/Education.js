Ext.define('ERPh.module.MasterData.store.Education',{
	extend 		: 'Ext.data.Store',
	model 		: 'ERPh.module.MasterData.model.Education',
	requires 	: [
		'ERPh.module.MasterData.model.Education'
	],
	autoLoad	: true,
	autoSync 	: false,
	pageSize 	: 20,
	root 		: {
		expanded 	: false		
	},
	proxy 		: {
		type 		: 'ajax',
		api 		: {
			read 	: BASE_URL + 'MasterData/c_education/getEducation'
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

