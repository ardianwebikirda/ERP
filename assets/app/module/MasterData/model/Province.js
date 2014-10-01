Ext.define('ERPh.module.MasterData.model.Province',{
	extend 	: 'Ext.data.Model',
	fields 	: [
		{name : 'id', type : 'string'},
		{name : 'id_country', type : 'string'},
		{name : 'namecountry', type : 'string'},
		{name : 'code', type : 'string'},
		{name : 'name', type : 'string'},
		{name : 'codearea', type : 'string'}
	]
});