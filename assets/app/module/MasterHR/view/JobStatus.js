Ext.define('ERPh.module.MasterHR.view.JobStatus',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'JobStatus',
	iconCls		: 'icon-layout_edit',
	alias 		: 'widget.JobStatus',
	id 			: 'JobStatus',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterHR.view.grid.GridJobStatus',
		'ERPh.module.MasterHR.view.form.FormJobStatus'
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
		{ xtype : 'gridjobstatus', flex : 1.3 },
		{ xtype : 'formjobstatus', flex : 0.8 }
	]	
});