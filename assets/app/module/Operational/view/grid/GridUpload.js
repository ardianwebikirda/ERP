Ext.define('ERPh.module.Operational.view.grid.GridUpload',{
	extend 		: 'Ext.grid.Panel',
	title 		: 'Upload Attendance',
	iconCls 	: 'icon-database_table',
	alias 		: 'widget.gridupload',
	id 			: 'gridupload',
	layout 		: 'fit',
	tbar 		: [
		{
			xtype 		: 'button',
			text 		: 'Spredsheet Dumping',
			iconCls		: 'icon-database_yellow_start',
			action 		: 'dumping'
		},
		{
			xtype 		: 'button',
			text 		: 'Syncronize',
			iconCls		: 'icon-database_gear',
			action 		: 'sync'
		}
	], 
	columns 	: [
		{
			text 		: 'CODE',
			dataIndex	: 'code',
			width		: '25%'
		},
		{
			text 		: 'DATE',
			dataIndex	: 'date',
			width		: '35%'
		},
		{
			text 		: 'TIME',
			dataIndex	: 'time',
			width		: '35%'
		}
	]
});