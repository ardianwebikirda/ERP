Ext.define('ERPh.module.MasterData.view.Bank',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Bank',
	iconCls		: 'icon-money',
	alias 		: 'widget.Bank',
	id 			: 'Bank',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterData.view.grid.GridBank',
		'ERPh.module.MasterData.view.form.FormBank'
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
		{ xtype : 'gridbank', flex : 1.3 },
		{ xtype : 'formbank', flex : 0.8 }
	]	
});