Ext.define('ERPh.module.MasterHR.view.form.FormDepartment',{
	extend 		: 'Ext.form.Panel',
	title 		: 'Form Department',
	alias 		: 'widget.formdepartment',
	id 			: 'formdepartment',
	frame 		: true,
	bodyStyle 	: 'padding: 3px',
	margins 	: '0px 0px 5px 0px',
	items 		: [
		{
			xtype 	: 'hidden',
			name 	: 'id'
		},
		{
			xtype 		: 'textfield',
			name 		: 'code',
			fieldLabel 	: 'Code',
			anchor 		: '100%'
		},
		{
			xtype 		: 'textfield',
			name 		: 'name',
			fieldLabel 	: 'Name',
			anchor 		: '100%'
		}		
	],
	tbar 		: [
		{xtype : 'button', iconCls : 'icon-disk', text : 'Save', action : 'save'},
		{xtype : 'button', iconCls : 'icon-pencil', text : 'Update', action : 'update', disabled : true},
		{xtype : 'button', iconCls : 'icon-error', text : 'Reset', action : 'reset'}
	]
});