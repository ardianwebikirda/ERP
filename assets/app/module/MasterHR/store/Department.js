Ext.define('ERPh.module.MasterHR.store.Department',{
	extend 		: 'Ext.data.Store',
	model 		: 'ERPh.module.MasterHR.model.Department',
	requires 	: [
		'ERPh.module.MasterHR.model.Department'
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
			read 	: BASE_URL + 'MasterHR/c_department/getDepartment'
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

