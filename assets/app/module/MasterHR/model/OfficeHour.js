Ext.define('ERPh.module.MasterHR.model.OfficeHour',{
	extend 	: 'Ext.data.Model',
	fields 	: [
		{name : 'id', type : 'string'},
		{name : 'name', type : 'string'},
		{name : 'time_in', type : 'string'},
		{name : 'time_out', type : 'string'}
	]
});