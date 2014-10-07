Ext.define('ERPh.module.Operational.view.grid.GridAttendance',{
	extend 	: 'Ext.grid.Panel',
	title 	: 'Employee Attendance',
	alias 	: 'widget.gridattendance',
	id 		: 'gridattendance',
	layout	: 'fit',
	tbar 	: [
		{
			xtype 		: 'datefield',
			fieldLabel 	: 'From Date',
			name 		: 'dateform',
			msgTarget	: 'under',
			margins 	: '2px 20px 2px 2px',
			editable 	: false
		},
		{
			xtype 		: 'datefield',
			fieldLabel 	: 'From To',
			name 		: 'dateto',
			msgTarget	: 'under',
			editable 	: false
		}	
	],
	columns 	: [
		{
			text 		: 'NO',
			xtype		: 'rownumberer',
			width		: '4%'
		}
	],
	bbar 	: [
		{xtype : 'button', text : 'Preview', iconCls : 'icon-zoom', action : 'preview'},
		{xtype : 'button', text : 'Report', iconCls : 'icon-page_white_excel', action : 'excelReport'},
		{xtype : 'button', text : 'Report', iconCls : 'icon-page_white_acrobat', action : 'pdfReport'}
	]
});