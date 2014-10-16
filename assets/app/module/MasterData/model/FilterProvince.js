Ext.define('ERPh.module.MasterData.model.FilterProvince',{
	extend 	: 'Ext.data.Model',
	fields 	: [
		{name : 'id', type : 'string'},
		{name : 'id_country', type : 'string'},
		{name : 'code', type : 'string'},
		{name : 'nameprovince', type : 'string'},
		{name : 'phonecode', type : 'string'}
	]
});