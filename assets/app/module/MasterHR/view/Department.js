Ext.define('ERPh.module.MasterHR.view.Department',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Department',
	iconCls		: 'icon-application_home',
	alias 		: 'widget.Department',
	id 			: 'Department',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterHR.view.grid.GridDepartment',
		'ERPh.module.MasterHR.view.form.FormDepartment'
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
		{ xtype : 'griddepartment', flex : 1.3 },
		{ xtype : 'formdepartment', flex : 0.8 }
	]	
});