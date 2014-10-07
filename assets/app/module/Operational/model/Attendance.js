Ext.define('ERPh.module.Operational.model.Attendance',{
	extend 	: 'Ext.data.Model',
	fields 	: [
		{name : 'id', type : 'string'},
		{name : 'id_employee', type : 'string'},
		{name : 'id_department', type : 'string'},
		{name : 'code', type : 'string'},
		{name : 'trs_date', type : 'date'},
		{name : 'time_in', type : 'string'},
		{name : 'time_out', type : 'string'}
	]	
});