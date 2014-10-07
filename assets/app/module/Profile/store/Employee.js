Ext.define('ERPh.module.Profile.store.Employee',{
	extend 		: 'Ext.data.Store',
	model 		: 'ERPh.module.Profile.model.Employee',
	requires 	: ['ERPh.module.Profile.model.Employee'],
	autoLoad 	: true,
	autoSync 	: false,
	root 		: {
		expanded : false
	},
	proxy 		: {
		type 	: 'ajax',
		api 	: {
			read 	: BASE_URL + 'Profile/c_employee/getEmployee'		
		},
		actionMethods	: {
			read 		: 'POST'
		},
		reader          : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success',
            totalProperty   : 'total'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            root            : 'data',
            encode          : true
        }
	}
});