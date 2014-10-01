Ext.define('ERPh.module.MasterData.view.Country',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Country',
	iconCls		: 'icon-flag_red',
	alias 		: 'widget.Country',
	id 			: 'Country',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterData.view.grid.GridCountry',
		'ERPh.module.MasterData.view.form.FormCountry'
	],
	height 		: 250,
	width 		: 1000,
	layout 		: {
		type 	: 'hbox',
		layout 	: 'fit',
		align 	: 'stretch'
	}, 
	defaults : {
		flex : 1
	},
	closable 	: true,
	items 		: [
		{ xtype : 'gridcountry', flex : 1.3 },
		{ xtype : 'formcountry', flex : 0.8 }
	]	
});