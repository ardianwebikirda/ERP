Ext.define('ERPh.module.MasterHR.view.JobTitle',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Job Title',
	iconCls		: 'icon-medal_bronze_1',
	alias 		: 'widget.JobTitle',
	id 			: 'JobTitle',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterHR.view.grid.GridJobTitle',
		'ERPh.module.MasterHR.view.form.FormJobTitle'
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
		{ xtype : 'gridjobtitle', flex : 1.3 },
		{ xtype : 'formjobtitle', flex : 0.8 }
	]	
});