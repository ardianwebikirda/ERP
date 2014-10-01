Ext.define('ERPh.module.MasterData.view.Province',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Province',
	iconCls		: 'icon-flag_blue',
	alias 		: 'widget.Province',
	id 			: 'Province',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterData.view.grid.GridProvince',
		'ERPh.module.MasterData.view.form.FormProvince'
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
		{ xtype : 'gridprovince', flex : 1.3 },
		{ xtype : 'formprovince', flex : 0.8 }
	]	
});