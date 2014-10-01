Ext.define('ERPh.module.MasterHR.store.MinJobLevel',{
	extend 		: 'Ext.data.Store',
	model 		: 'ERPh.module.MasterHR.model.MinJobLevel',
	requires 	: [
		'ERPh.module.MasterHR.model.MinJobLevel'
	],
	autoLoad	: true,
	autoSync 	: false,
	root 		: {
		expanded 	: false		
	},
	proxy 		: {
		type 		: 'ajax',
		api 		: {
			read 	: BASE_URL + 'MasterHR/c_joblevel/viewJobLevel'
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