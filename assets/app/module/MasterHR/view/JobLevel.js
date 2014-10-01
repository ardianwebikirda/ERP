Ext.define('ERPh.module.MasterHR.view.JobLevel',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'JobLevel',
	iconCls		: 'icon-medal_gold_1',
	alias 		: 'widget.JobLevel',
	id 			: 'JobLevel',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterHR.view.grid.GridJobLevel',
		'ERPh.module.MasterHR.view.form.FormJobLevel'
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
		{ xtype : 'gridjoblevel', flex : 1.3 },
		{ xtype : 'formjoblevel', flex : 0.8 }
	]	
});