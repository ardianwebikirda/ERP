Ext.define('ERPh.module.MasterHR.store.JobStatus',{
	extend 		: 'Ext.data.Store',
	model 		: 'ERPh.module.MasterHR.model.JobStatus',
	requires 	: [
		'ERPh.module.MasterHR.model.JobStatus'
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
			read 	: BASE_URL + 'MasterHR/c_jobstatus/getJobStatus'
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

