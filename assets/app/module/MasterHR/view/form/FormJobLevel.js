Ext.define('ERPh.module.MasterHR.view.form.FormJobLevel',{
	extend 		: 'Ext.form.Panel',
	title 		: 'Form JobLevel',
	alias 		: 'widget.formjoblevel',
	id 			: 'formjoblevel',
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
			name 		: 'name',
			fieldLabel 	: 'Job Level Name',
			anchor 		: '100%'
		},
		{
			xtype 		: 'numberfield',
			name 		: 'level',
			fieldLabel 	: 'Level',
			anchor 		: '100%'
		}
	],
	tbar 		: [
		{xtype : 'button', iconCls : 'icon-disk', text : 'Save', action : 'save'},
		{xtype : 'button', iconCls : 'icon-pencil', text : 'Update', action : 'update', disabled : true},
		{xtype : 'button', iconCls : 'icon-error', text : 'Reset', action : 'reset'}
	]
});