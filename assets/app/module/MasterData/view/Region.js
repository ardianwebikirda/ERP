Ext.define('ERPh.module.MasterData.view.Region',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Region',
	iconCls		: 'icon-flag_green',
	alias 		: 'widget.Region',
	id 			: 'Region',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterData.view.grid.GridRegion',
		'ERPh.module.MasterData.view.form.FormRegion'
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
		{ xtype : 'gridregion', flex : 1.3 },
		{ xtype : 'formregion', flex : 0.8 }
	]	
});